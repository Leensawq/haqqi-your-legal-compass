import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Clock, CheckCircle2, AlertCircle, FileText, ChevronLeft, MessageCircleQuestion } from "lucide-react";
import { WebLayout } from "@/components/layout/WebLayout";
import { TextToSpeech } from "@/components/accessibility/TextToSpeech";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: 1, text: "تم تحديث حالة قضية تأخر الراتب", time: "منذ ساعتين" },
  { id: 2, text: "تم استلام رد من وزارة الموارد البشرية", time: "منذ يوم" },
];

const cases = [
  { id: 1, title: "تأخر صرف الراتب", category: "العمل", status: "قيد المراجعة", statusType: "pending", date: "2024-01-15" },
  { id: 2, title: "نزاع إيجار", category: "السكن", status: "تم الإرسال", statusType: "sent", date: "2024-01-10" },
  { id: 3, title: "شكوى منتج معيب", category: "التجارة الإلكترونية", status: "مغلقة", statusType: "closed", date: "2024-01-05" },
];

const getStatusColor = (statusType: string) => {
  switch (statusType) {
    case "pending": return "bg-warning/10 text-warning";
    case "sent": return "bg-primary/10 text-primary";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (statusType: string) => {
  switch (statusType) {
    case "pending": return Clock;
    case "sent": return AlertCircle;
    case "closed": return CheckCircle2;
    default: return FileText;
  }
};

export default function MyCases() {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const handleNoResponse = (caseId: number) => {
    // Navigate to letter generation for follow-up
    navigate("/letter-generation");
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
                <span className="text-primary-foreground">{n.text}</span>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">جميع القضايا</h2>
          <div className="grid gap-4">
            {cases.map((c, i) => {
              const Icon = getStatusIcon(c.statusType);
              const isExpanded = selectedCase === c.id;
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
                          <span className={`flex items-center gap-1 px-2 py-1 rounded ${getStatusColor(c.statusType)}`}>
                            <Icon className="w-3 h-3" />
                            {c.status}
                          </span>
                          <span>آخر تحديث: {new Date(c.date).toLocaleDateString("ar-SA")}</span>
                        </div>
                      </div>
                      <ChevronLeft className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Expanded Section with "No Response" Button */}
                  {isExpanded && c.statusType === "sent" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 border-t border-border/50"
                    >
                      <div className="pt-4">
                        <Button
                          onClick={() => handleNoResponse(c.id)}
                          variant="outline"
                          className="w-full py-4 text-base border-warning/50 text-warning hover:bg-warning/10 hover:border-warning"
                        >
                          <MessageCircleQuestion className="w-5 h-5 ml-2" />
                          ما لقيت تجاوب؟ أرسل خطاب متابعة
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
