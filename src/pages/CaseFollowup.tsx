import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, FileText, Send, CheckCircle2 } from "lucide-react";
import { WebLayout } from "@/components/layout/WebLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function CaseFollowup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId");
  const caseTitle = searchParams.get("title") || "القضية";
  
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "حجم الملف كبير",
          description: "يجب أن يكون حجم الملف أقل من 5 ميجابايت",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!caseId) {
      toast({
        title: "خطأ",
        description: "لم يتم العثور على معرف القضية",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "خطأ",
          description: "يجب تسجيل الدخول أولاً",
          variant: "destructive",
        });
        return;
      }

      let fileUrl = null;
      let fileName = null;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/${caseId}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('case-followups')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('case-followups')
          .getPublicUrl(filePath);

        fileUrl = urlData.publicUrl;
        fileName = file.name;
      }

      const { error: insertError } = await supabase
        .from('case_followups')
        .insert({
          case_id: caseId,
          user_id: user.id,
          file_url: fileUrl,
          file_name: fileName,
          notes: notes,
          submitted_to_authority: true,
        });

      if (insertError) {
        throw insertError;
      }

      // Update the case status
      const { error: updateError } = await supabase
        .from('cases')
        .update({ 
          status: 'تم الإحالة لهيئة حقوق الإنسان',
          status_type: 'escalated'
        })
        .eq('id', caseId);

      if (updateError) {
        throw updateError;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting followup:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال المتابعة",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <WebLayout>
        <div className="max-w-2xl mx-auto" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-8 border border-border text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground mb-4">
              تم إرسال القضية بنجاح
            </h1>
            <p className="text-muted-foreground mb-8">
              تم إرسال القضية إلى هيئة حقوق الإنسان وسيتم التواصل معك قريباً
            </p>
            <Button
              onClick={() => navigate("/my-cases")}
              className="bg-primary hover:bg-primary/90"
            >
              العودة إلى قضاياتي
            </Button>
          </motion.div>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout>
      <div className="max-w-2xl mx-auto space-y-6" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">متابعة القضية</h1>
          <p className="text-muted-foreground mt-2">{caseTitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 border border-border space-y-6"
        >
          {/* File Upload */}
          <div className="space-y-3">
            <Label className="text-card-foreground font-medium">
              رفع صورة خطاب المتابعة
            </Label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <span className="text-card-foreground">{file.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      اضغط لرفع صورة أو ملف PDF
                    </p>
                    <p className="text-xs text-muted-foreground">
                      الحد الأقصى 5 ميجابايت
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label htmlFor="notes" className="text-card-foreground font-medium">
              ملاحظات
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أضف أي ملاحظات إضافية حول المتابعة..."
              className="min-h-[120px] bg-background border-border text-foreground"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              "جاري الإرسال..."
            ) : (
              <>
                <Send className="w-5 h-5 ml-2" />
                إرسال إلى هيئة حقوق الإنسان
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </WebLayout>
  );
}
