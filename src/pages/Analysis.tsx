import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Save, Send } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { RightCard } from "@/components/analysis/RightCard";
import { ActionStep } from "@/components/analysis/ActionStep";
import { SuccessIndicator } from "@/components/analysis/SuccessIndicator";
import { toast } from "@/hooks/use-toast";

const mockRights = [
  {
    title: "الحق في التعويض",
    description: "يحق لك المطالبة بتعويض عن الأضرار المادية والمعنوية",
    lawReference: "نظام العمل - المادة 77",
  },
  {
    title: "الحق في إنهاء الخدمة",
    description: "يحق لك الحصول على مكافأة نهاية الخدمة كاملة",
    lawReference: "نظام العمل - المادة 84",
  },
  {
    title: "الحق في شهادة الخبرة",
    description: "يلتزم صاحب العمل بتزويدك بشهادة خبرة",
    lawReference: "نظام العمل - المادة 64",
  },
];

const mockActions = [
  {
    title: "توثيق الأدلة",
    description: "احتفظ بنسخ من جميع المراسلات والعقود",
  },
  {
    title: "تقديم شكوى",
    description: "قدم شكوى رسمية لوزارة الموارد البشرية",
  },
  {
    title: "المتابعة",
    description: "تابع حالة شكواك خلال 15 يوم عمل",
  },
];

export default function Analysis() {
  const navigate = useNavigate();

  const handleSave = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ القضية بنجاح",
    });
  };

  return (
    <PageLayout title="نتائج التحليل">
      <div className="space-y-6">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-primary/5 p-4"
        >
          <h2 className="font-semibold text-foreground">ملخص الموقف</h2>
          <p className="mt-2 text-sm text-muted">
            بناءً على تحليل موقفك، يتضح أن لديك عدة حقوق قانونية يمكنك المطالبة بها.
            الوضع يشير إلى انتهاك محتمل لنظام العمل.
          </p>
        </motion.div>

        {/* Success Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SuccessIndicator percentage={75} label="احتمالية النجاح" />
        </motion.div>

        {/* Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="font-semibold text-foreground">حقوقك القانونية</h2>
          {mockRights.map((right, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <RightCard {...right} />
            </motion.div>
          ))}
        </motion.div>

        {/* Recommended Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="font-semibold text-foreground">الخطوات الموصى بها</h2>
          {mockActions.map((action, index) => (
            <ActionStep key={index} step={index + 1} {...action} />
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate("/letter")}
            className="w-full py-6 font-semibold"
            size="lg"
          >
            <FileText className="ml-2 h-5 w-5" />
            إنشاء خطاب رسمي
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleSave} className="py-4">
              <Save className="ml-2 h-4 w-4" />
              حفظ القضية
            </Button>
            <Button variant="outline" className="py-4">
              <Send className="ml-2 h-4 w-4" />
              إرسال للجهة
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
