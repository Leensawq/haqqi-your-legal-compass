import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Send, Edit3 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const letterTemplateAr = `السلام عليكم ورحمة الله وبركاته،

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

const letterTemplateEn = `Dear Sir/Madam,

To the Respected Director of Human Resources,

Subject: Complaint Regarding Unfair Dismissal

I am writing to submit this complaint as a former employee of [Company Name], where my services were terminated on [Date] without a legitimate reason and in violation of labor law provisions.

Based on the above, I request the following:
1. Compensation for unfair dismissal
2. Payment of end-of-service benefits
3. Provision of an experience certificate

Yours respectfully,

Complainant: [Name]
ID Number: [ID Number]
Date: [Date]`;

export default function LetterGeneration() {
  const { t, language } = useLanguage();
  const [recipient, setRecipient] = useState(t("letter.defaultRecipient"));
  const [letterContent, setLetterContent] = useState(
    language === "ar" ? letterTemplateAr : letterTemplateEn
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleDownload = () => {
    toast({
      title: t("letter.downloading"),
      description: t("letter.downloadDesc"),
    });
  };

  const handleSend = () => {
    toast({
      title: t("letter.sent"),
      description: t("letter.sentDesc"),
    });
  };

  return (
    <PageLayout title={t("letter.title")}>
      <div className="space-y-6">
        {/* Recipient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground">{t("letter.recipient")}</label>
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
            <label className="text-sm font-medium text-foreground">{t("letter.content")}</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary"
            >
              <Edit3 className="me-1 h-4 w-4" />
              {isEditing ? t("letter.preview") : t("letter.edit")}
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
          <h3 className="text-sm font-medium text-foreground">{t("letter.personalInfo")}</h3>
          <Input placeholder={t("letter.fullName")} className="bg-card" />
          <Input placeholder={t("letter.idNumber")} className="bg-card" />
          <Input placeholder={t("letter.phone")} className="bg-card" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button onClick={handleDownload} variant="outline" className="py-4">
            <Download className="me-2 h-4 w-4" />
            {t("letter.downloadPdf")}
          </Button>
          <Button onClick={handleSend} className="py-4">
            <Send className="me-2 h-4 w-4" />
            {t("letter.send")}
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
