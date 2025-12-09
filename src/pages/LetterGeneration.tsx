import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Send, Edit3 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const letterTemplate = `السلام عليكم ورحمة الله وبركاته،

إلى سعادة مدير إدارة الموارد البشرية المحترم،

الموضوع: شكوى بخصوص الفصل التعسفي

أتقدم إليكم بهذه الشكوى بصفتي موظفًا سابقًا في شركة [اسم الشركة]، حيث تم إنهاء خدماتي بتاريخ [التاريخ] دون سبب مشروع وبما يخالف أحكام نظام العمل.

وبناءً على ما سبق، أطالب بما يلي:
1. التعويض عن الفصل التعسفي
2. صرف مستحقات نهاية الخدمة
3. تزويدي بشهادة خبرة

وتفضلوا بقبول فائق الاحترام والتقدير،

مقدم الشكوى: [الاسم]
رقم الهوية: [رقم الهوية]
التاريخ: [التاريخ]`;

export default function LetterGeneration() {
  const [recipient, setRecipient] = useState("وزارة الموارد البشرية");
  const [letterContent, setLetterContent] = useState(letterTemplate);
  const [isEditing, setIsEditing] = useState(false);

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
            <label className="text-sm font-medium text-foreground">محتوى الخطاب</label>
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
            <Textarea
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              className="min-h-[400px] bg-card font-arabic text-sm leading-relaxed"
            />
          ) : (
            <div className="rounded-xl bg-card p-4 text-sm leading-relaxed whitespace-pre-wrap">
              {letterContent}
            </div>
          )}
        </motion.div>

        {/* User Info Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-medium text-foreground">بياناتك الشخصية</h3>
          <Input placeholder="الاسم الكامل" className="bg-card" />
          <Input placeholder="رقم الهوية" className="bg-card" />
          <Input placeholder="رقم الجوال" className="bg-card" />
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
