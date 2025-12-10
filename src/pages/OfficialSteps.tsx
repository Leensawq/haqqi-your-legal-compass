import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileText, 
  UserCheck, 
  Upload, 
  Clock, 
  ArrowUpCircle,
  Building2,
  ChevronLeft
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: FileText,
    title: "تقديم شكوى على منصة ودي",
    description: "ابدأ بتسجيل الدخول على منصة ودي التابعة لوزارة الموارد البشرية",
  },
  {
    icon: UserCheck,
    title: "تعبئة بيانات العامل والمنشأة",
    description: "أدخل بياناتك الشخصية وبيانات جهة العمل بدقة",
  },
  {
    icon: Upload,
    title: "رفع المستندات المطلوبة",
    description: "أرفق عقد العمل وكشف الراتب وأي مستندات داعمة",
  },
  {
    icon: Clock,
    title: "متابعة الرد خلال 3–5 أيام",
    description: "سيتم التواصل معك من قبل وزارة الموارد البشرية",
  },
  {
    icon: ArrowUpCircle,
    title: "التصعيد للجنة الخلافات",
    description: "في حال عدم الحل، يمكنك التصعيد للجنة فض المنازعات",
  },
];

export default function OfficialSteps() {
  const navigate = useNavigate();

  return (
    <PageLayout title="الخطوات الرسمية">
      <div className="space-y-6">
        {/* Steps Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-5"
        >
          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-4"
              >
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="absolute right-[19px] top-12 w-0.5 h-[calc(100%-12px)] bg-border" />
                )}
                
                {/* Step Number & Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md">
                    <step.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-primary font-medium">
                      الخطوة {index + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-card-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Authority Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate("/authority")}
            variant="outline"
            className="w-full py-6 text-lg font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            size="lg"
          >
            <Building2 className="w-5 h-5 ml-2" />
            الجهة المختصة
          </Button>
        </motion.div>

        {/* Generate Letter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={() => navigate("/complaint-generator")}
            className="w-full py-6 text-lg font-bold"
            size="lg"
          >
            <FileText className="w-5 h-5 ml-2" />
            إنشاء نموذج الشكوى
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
