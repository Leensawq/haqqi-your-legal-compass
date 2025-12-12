import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

interface UserData {
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
}

export default function LetterGeneration() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("وزارة الموارد البشرية");
  const [letterContent, setLetterContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    nationalId: "",
    phone: "",
    email: ""
  });

  // Load AI-generated letter and user data from localStorage
  useEffect(() => {
    const storedAnalysis = localStorage.getItem('caseAnalysis');
    const storedUserData = localStorage.getItem('userData');
    
    let userName = "مقدم الشكوى";
    let userNationalId = "";
    
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        userName = parsed.fullName || userName;
        userNationalId = parsed.nationalId || "";
        setUserData(parsed);
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
    
    if (storedAnalysis) {
      try {
        const analysis = JSON.parse(storedAnalysis);
        const letter: ComplaintLetter = analysis.complaintLetter;
        if (letter) {
          setRecipient(letter.recipient || "وزارة الموارد البشرية");
          
          // Build full letter content with actual user name
          const fullLetter = `السلام عليكم ورحمة الله وبركاته،

إلى سعادة ${letter.recipient}،

الموضوع: ${letter.subject}

${letter.body}

استناداً إلى: ${letter.legalReference}

وتفضلوا بقبول فائق الاحترام والتقدير،

مقدم الشكوى: ${userName}
رقم الهوية: ${userNationalId}
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
    localStorage.removeItem('userData');
    navigate('/home');
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


        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={handleSend} className="w-full py-4">
            إرسال الخطاب
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}