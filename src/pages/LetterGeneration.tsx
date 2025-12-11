import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Send, Edit3 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { TextToSpeech } from "@/components/accessibility/TextToSpeech";
import { SpeechToText } from "@/components/accessibility/SpeechToText";

interface ComplaintLetter {
  recipient: string;
  subject: string;
  body: string;
  legalReference: string;
}

const defaultLetterTemplate = `السلام عليكم ورحمة الله وبركاته،

إلى سعادة مدير إدارة الموارد البشرية المحترم،

الموضوع: شكوى بخصوص الفصل التعسفي

أتقدم إليكم بهذه الشكوى بصفتي موظفًا سابقًا في شركة [اسم الشركة]، حيث تم إنهاء خدماتي بتاريخ [التاريخ] دون سبب مشروع وبما يخالف أحكام نظام العمل.

وبناءً على ما سبق، أطالب بما يلي:
1. التعويض عن الفصل التعسفي
2. صرف مستحقات نهاية الخدمة
3. تزويدي بشهادة خبرة

وتفضلوا بقبول فائق الاحترام والتقدير،

مقدم الشكوى: محمد أحمد العتيبي
رقم الهوية: 1098765432
التاريخ: ${new Date().toLocaleDateString('ar-SA')}`;

export default function LetterGeneration() {
  const [recipient, setRecipient] = useState("وزارة الموارد البشرية");
  const [letterContent, setLetterContent] = useState(defaultLetterTemplate);
  const [isEditing, setIsEditing] = useState(false);

  // Load AI-generated letter from localStorage
  useEffect(() => {
    const storedAnalysis = localStorage.getItem('caseAnalysis');
    if (storedAnalysis) {
      try {
        const analysis = JSON.parse(storedAnalysis);
        const letter: ComplaintLetter = analysis.complaintLetter;
        if (letter) {
          setRecipient(letter.recipient || "وزارة الموارد البشرية");
          
          // Build full letter content
          const fullLetter = `السلام عليكم ورحمة الله وبركاته،

إلى سعادة ${letter.recipient}،

الموضوع: ${letter.subject}

${letter.body}

استناداً إلى: ${letter.legalReference}

وتفضلوا بقبول فائق الاحترام والتقدير،

مقدم الشكوى: محمد أحمد العتيبي
رقم الهوية: 1098765432
التاريخ: ${new Date().toLocaleDateString('ar-SA')}`;
          
          setLetterContent(fullLetter);
        }
      } catch (e) {
        console.error('Failed to parse letter:', e);
      }
    }
  }, []);

  const handleDownload = () => {
    toast({
      title: "جاري التحميل",
      description: "سيتم تحميل الخطاب بصيغة PDF",
    });
  };

  const handleSend = () => {
    toast({
      title: "تم الإرسال",
      description: "تم إرسال الخطاب بنجاح",
    });
    // Clear case data and navigate to home
    localStorage.removeItem('caseAnalysis');
    localStorage.removeItem('caseSituation');
    window.location.href = '/home';
  };

  return (
    <PageLayout title="إنشاء خطاب رسمي">
      <div className="space-y-6">
        {/* Recipient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground">الجهة المستلمة</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="bg-card"
          />
        </motion.div>

        {/* Letter Preview/Edit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">محتوى الخطاب</label>
              <TextToSpeech text={letterContent} />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary"
            >
              <Edit3 className="ml-1 h-4 w-4" />
              {isEditing ? "معاينة" : "تعديل"}
            </Button>
          </div>
          {isEditing ? (
            <div className="relative">
              <Textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                className="min-h-[400px] bg-white font-arabic text-base leading-relaxed text-[#000000] placeholder:text-[#6B7280] pl-12"
                style={{ lineHeight: '1.6', fontSize: '16px' }}
              />
              <div className="absolute left-2 top-2">
                <SpeechToText onTranscript={(text) => setLetterContent(prev => prev + " " + text)} />
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-white p-4 text-base leading-relaxed whitespace-pre-wrap text-[#000000] border border-gray-200"
              style={{ lineHeight: '1.6', fontSize: '16px' }}>
              {letterContent}
            </div>
          )}
        </motion.div>


        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button onClick={handleDownload} variant="outline" className="py-4">
            <Download className="ml-2 h-4 w-4" />
            تحميل PDF
          </Button>
          <Button onClick={handleSend} className="py-4">
            <Send className="ml-2 h-4 w-4" />
            إرسال الخطاب
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
