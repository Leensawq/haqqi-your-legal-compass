import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

export default function LegalRight() {
  const navigate = useNavigate();

  return (
    <PageLayout title="حقك القانوني">
      <div className="space-y-6">
        {/* Main Right Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary/10 p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">المرجع القانوني</p>
                <h2 className="text-lg font-bold text-card-foreground">
                  المادة 90 — نظام العمل
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">
            {/* Simplified Explanation */}
            <div className="space-y-3">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                تبسيط المادة
              </h3>
              <div className="bg-accent/30 rounded-lg p-4 space-y-3">
                <p className="text-card-foreground leading-relaxed">
                  تأخير الراتب يُعتبر <span className="font-bold text-primary">مخالفة نظامية صريحة</span> وفقاً لنظام العمل السعودي.
                </p>
                <div className="flex items-start gap-3 bg-card rounded-lg p-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-card-foreground">
                    إذا تأخر راتبك <span className="font-bold">٣ أشهر أو أكثر</span>، يحق لك رفع شكوى فورية على صاحب العمل.
                  </p>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="space-y-3">
              <h3 className="font-semibold text-card-foreground">حالة حقك</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-primary">حق مكفول</p>
                </div>
                <div className="bg-accent rounded-lg p-3 text-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Scale className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-accent-foreground">قابل للتنفيذ</p>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="space-y-3">
              <h3 className="font-semibold text-card-foreground">النقاط الأساسية</h3>
              <ul className="space-y-2">
                {[
                  "يجب دفع الأجور في مواعيدها المحددة",
                  "التأخير أكثر من شهر يستوجب التحقيق",
                  "٣ أشهر تأخير = حق ترك العمل مع التعويض",
                  "يمكن المطالبة بالأجور المتأخرة + تعويض",
                ].map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm text-card-foreground">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => navigate("/official-steps")}
            className="w-full py-6 text-lg font-bold"
            size="lg"
          >
            متابعة
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
