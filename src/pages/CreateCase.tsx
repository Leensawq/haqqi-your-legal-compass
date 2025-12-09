import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Camera, FileText, Loader2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CreateCase() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const [situation, setSituation] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { key: "category.work", value: t("category.work") },
    { key: "category.health", value: t("category.health") },
    { key: "category.family", value: t("category.family") },
    { key: "category.education", value: t("category.education") },
    { key: "category.ecommerce", value: t("category.ecommerce") },
    { key: "category.realestate", value: t("category.realestate") },
    { key: "category.other", value: t("category.other") },
  ];

  const handleAnalyze = async () => {
    if (!situation.trim()) {
      toast({
        title: t("createCase.error"),
        description: t("createCase.describFirst"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate("/analysis");
  };

  return (
    <PageLayout title={t("createCase.title")}>
      <div className="space-y-6">
        {/* Situation Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground">{t("createCase.describeSituation")}</label>
          <Textarea
            placeholder={t("createCase.placeholder")}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="min-h-[150px] resize-none bg-card"
          />
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground">{t("createCase.category")}</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder={t("createCase.selectCategory")} />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {categories.map((cat) => (
                <SelectItem key={cat.key} value={cat.value}>
                  {cat.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Upload Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground">{t("createCase.attachFiles")}</label>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="flex flex-col gap-2 py-6">
              <Upload className="h-5 w-5" />
              <span className="text-xs">{t("createCase.uploadFile")}</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 py-6">
              <Camera className="h-5 w-5" />
              <span className="text-xs">{t("createCase.photo")}</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 py-6">
              <FileText className="h-5 w-5" />
              <span className="text-xs">{t("createCase.pdfDocument")}</span>
            </Button>
          </div>
        </motion.div>

        {/* Analyze Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full py-6 text-lg font-semibold"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="me-2 h-5 w-5 animate-spin" />
                {t("createCase.analyzing")}
              </>
            ) : (
              t("createCase.analyze")
            )}
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
