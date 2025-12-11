import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Clock, CheckCircle2, AlertCircle, FileText, ChevronLeft, MessageCircleQuestion, AlertTriangle } from "lucide-react";
import { WebLayout } from "@/components/layout/WebLayout";
import { TextToSpeech } from "@/components/accessibility/TextToSpeech";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Case {
  id: string;
  title: string;
  category: string;
  status: string;
  status_type: string;
  submitted_at: string;
  has_followup?: boolean;
}

interface Notification {
  id: number;
  text: string;
  time: string;
}

const notifications: Notification[] = [
  { id: 1, text: "تم تحديث حالة قضية تأخر الراتب", time: "منذ ساعتين" },
  { id: 2, text: "تم استلام رد من وزارة الموارد البشرية", time: "منذ يوم" },
];

const getStatusColor = (statusType: string) => {
  switch (statusType) {
    case "pending": return "bg-warning/10 text-warning";
    case "sent": return "bg-primary/10 text-primary";
    case "escalated": return "bg-destructive/10 text-destructive";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (statusType: string) => {
  switch (statusType) {
    case "pending": return Clock;
    case "sent": return AlertCircle;
    case "escalated": return AlertTriangle;
    case "closed": return CheckCircle2;
    default: return FileText;
  }
};

const daysSinceSubmission = (submittedAt: string): number => {
  const submitted = new Date(submittedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - submitted.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default function MyCases() {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch cases
      const { data: casesData, error: casesError } = await supabase
        .from('cases')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (casesError) throw casesError;

      // Check for followups for each case
      const casesWithFollowups = await Promise.all(
        (casesData || []).map(async (c) => {
          const { data: followups } = await supabase
            .from('case_followups')
            .select('id')
            .eq('case_id', c.id)
            .eq('submitted_to_authority', true)
            .limit(1);

          return {
            ...c,
            has_followup: (followups && followups.length > 0)
          };
        })
      );

      setCases(casesWithFollowups);
    } catch (error) {
      console.error('Error fetching cases:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل القضايا",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNoResponse = (caseItem: Case) => {
    const days = daysSinceSubmission(caseItem.submitted_at);
    
    if (days < 15) {
      toast({
        title: "لم تمر 15 يوم بعد",
        description: `يجب انتظار ${15 - days} أيام إضافية قبل تقديم متابعة`,
        variant: "destructive",
      });
      return;
    }

    navigate(`/case-followup?caseId=${caseItem.id}&title=${encodeURIComponent(caseItem.title)}`);
  };

  return (
    <WebLayout>
      <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">قضاياتي</h1>
            <TextToSpeech text="قضاياتي. تابع جميع قضاياك وتحديثاتها" />
          </div>
          <p className="text-muted-foreground mt-2">تابع جميع قضاياك وتحديثاتها</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Bell className="w-5 h-5 text-primary" /></div>
            <h2 className="text-lg font-bold text-card-foreground">آخر التحديثات</h2>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">{notifications.length}</span>
          </div>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span className="text-foreground">{n.text}</span>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">جميع القضايا</h2>
          
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">جاري التحميل...</div>
          ) : cases.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد قضايا مسجلة حتى الآن
            </div>
          ) : (
            <div className="grid gap-4">
              {cases.map((c, i) => {
                const Icon = getStatusIcon(c.status_type);
                const isExpanded = selectedCase === c.id;
                const days = daysSinceSubmission(c.submitted_at);
                const canSubmitFollowup = days >= 15 && !c.has_followup && c.status_type === 'sent';
                
                return (
                  <motion.div 
                    key={c.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => setSelectedCase(isExpanded ? null : c.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-card-foreground">{c.title}</h3>
                            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">{c.category}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className={`flex items-center gap-1 px-2 py-1 rounded ${getStatusColor(c.status_type)}`}>
                              <Icon className="w-3 h-3" />
                              {c.status}
                            </span>
                            <span>تاريخ التقديم: {new Date(c.submitted_at).toLocaleDateString("ar-SA")}</span>
                            <span>({days} يوم)</span>
                          </div>
                        </div>
                        <ChevronLeft className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    
                    {/* Expanded Section */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 border-t border-border/50"
                      >
                        <div className="pt-4 space-y-3">
                          {c.has_followup ? (
                            <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
                              <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                تم إرسال هذه القضية إلى هيئة حقوق الإنسان
                              </span>
                            </div>
                          ) : c.status_type === 'sent' ? (
                            <Button
                              onClick={() => handleNoResponse(c)}
                              variant="outline"
                              disabled={!canSubmitFollowup}
                              className={`w-full py-4 text-base ${
                                canSubmitFollowup 
                                  ? 'border-warning/50 text-warning hover:bg-warning/10 hover:border-warning'
                                  : 'border-muted text-muted-foreground cursor-not-allowed'
                              }`}
                            >
                              <MessageCircleQuestion className="w-5 h-5 ml-2" />
                              {canSubmitFollowup 
                                ? 'ما لقيت تجاوب؟'
                                : `انتظر ${15 - days} أيام إضافية`
                              }
                            </Button>
                          ) : null}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </WebLayout>
  );
}
