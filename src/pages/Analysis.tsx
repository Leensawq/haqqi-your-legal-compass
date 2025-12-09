import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Save, Send } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { RightCard } from "@/components/analysis/RightCard";
import { ActionStep } from "@/components/analysis/ActionStep";
import { SuccessIndicator } from "@/components/analysis/SuccessIndicator";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Analysis() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const mockRights = [
    {
      title: t("right.compensation.title"),
      description: t("right.compensation.desc"),
      lawReference: t("right.compensation.ref"),
    },
    {
      title: t("right.endOfService.title"),
      description: t("right.endOfService.desc"),
      lawReference: t("right.endOfService.ref"),
    },
    {
      title: t("right.certificate.title"),
      description: t("right.certificate.desc"),
      lawReference: t("right.certificate.ref"),
    },
  ];

  const mockActions = [
    {
      title: t("action.document.title"),
      description: t("action.document.desc"),
    },
    {
      title: t("action.complaint.title"),
      description: t("action.complaint.desc"),
    },
    {
      title: t("action.followup.title"),
      description: t("action.followup.desc"),
    },
  ];

  const handleSave = () => {
    toast({
      title: t("analysis.saved"),
      description: t("analysis.caseSaved"),
    });
  };

  return (
    <PageLayout title={t("analysis.title")}>
      <div className="space-y-6">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-primary/5 p-4"
        >
          <h2 className="font-semibold text-foreground">{t("analysis.summary")}</h2>
          <p className="mt-2 text-sm text-muted">
            {t("analysis.summaryText")}
          </p>
        </motion.div>

        {/* Success Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SuccessIndicator percentage={75} label={t("analysis.successRate")} />
        </motion.div>

        {/* Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="font-semibold text-foreground">{t("analysis.yourRights")}</h2>
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
          <h2 className="font-semibold text-foreground">{t("analysis.recommendedSteps")}</h2>
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
            <FileText className="me-2 h-5 w-5" />
            {t("analysis.generateLetter")}
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleSave} className="py-4">
              <Save className="me-2 h-4 w-4" />
              {t("analysis.saveCase")}
            </Button>
            <Button variant="outline" className="py-4">
              <Send className="me-2 h-4 w-4" />
              {t("analysis.sendToAuthority")}
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
