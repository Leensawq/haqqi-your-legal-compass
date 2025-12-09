import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Camera, FileText, Loader2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const categories = [
  "العمل",
  "الصحة",
  "الأسرة",
  "التعليم",
  "التجارة الإلكترونية",
  "العقارات",
  "أخرى",
];

export default function CreateCase() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [situation, setSituation] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!situation.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء وصف موقفك أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate("/analysis");
  };

  return (
    <PageLayout title="إنشاء قضية جديدة">
      <div className="space-y-6">
        {/* Situation Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground">صف موقفك</label>
          <Textarea
            placeholder="اكتب هنا تفاصيل موقفك أو مشكلتك القانونية..."
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
          <label className="text-sm font-medium text-foreground">التصنيف</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="اختر التصنيف" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
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
          <label className="text-sm font-medium text-foreground">إرفاق ملفات (اختياري)</label>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="flex flex-col gap-2 py-6">
              <Upload className="h-5 w-5" />
              <span className="text-xs">رفع ملف</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 py-6">
              <Camera className="h-5 w-5" />
              <span className="text-xs">صورة</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 py-6">
              <FileText className="h-5 w-5" />
              <span className="text-xs">مستند PDF</span>
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
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                جاري التحليل...
              </>
            ) : (
              "تحليل الموقف"
            )}
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
