import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Image, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { WebLayout } from "@/components/layout/WebLayout";

const categories = [
  { value: "work", label: "العمل" },
  { value: "family", label: "الأسرة" },
  { value: "health", label: "الصحة" },
  { value: "finance", label: "المالية" },
  { value: "housing", label: "السكن" },
  { value: "ecommerce", label: "التجارة الإلكترونية" },
];

export default function NewCase() {
  const navigate = useNavigate();
  const [situation, setSituation] = useState("");
  const [category, setCategory] = useState("");
  const [ocrEnabled, setOcrEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    if (!situation.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      navigate("/case-analysis");
    }, 1000);
  };

  return (
    <WebLayout>
      <div className="max-w-3xl mx-auto" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              صف موقِفك
            </h1>
            <p className="text-lg text-muted-foreground">
              اكتب تفاصيل الموقف وسنحلله وفق الأنظمة السعودية
            </p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border"
          >
            <div className="space-y-6">
              {/* Situation Textarea */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-card-foreground">
                  وصف الموقف
                </label>
                <Textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="مثال: لم أستلم راتبي لمدة ٣ شهور من صاحب العمل رغم مطالبتي المتكررة..."
                  className="min-h-[200px] text-base bg-background border-border text-card-foreground resize-none"
                  dir="rtl"
                />
              </div>

              {/* Category Select */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-card-foreground">
                  تصنيف القضية (اختياري)
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full bg-background border-border text-card-foreground">
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Attachments */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-card-foreground">
                  المرفقات (اختياري)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-6 h-auto"
                  >
                    <FileText className="w-6 h-6" />
                    <span className="text-xs">مستند PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-6 h-auto"
                  >
                    <Image className="w-6 h-6" />
                    <span className="text-xs">صورة</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-6 h-auto"
                  >
                    <Upload className="w-6 h-6" />
                    <span className="text-xs">رفع ملف</span>
                  </Button>
                </div>
              </div>

              {/* OCR Toggle */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <label className="text-sm font-medium text-card-foreground">
                  تفعيل قراءة النصوص من المرفقات (OCR)
                </label>
                <Switch checked={ocrEnabled} onCheckedChange={setOcrEnabled} />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleAnalyze}
                disabled={!situation.trim() || isLoading}
                className="w-full py-6 text-lg font-semibold rounded-xl"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin ml-2" />
                    جاري التحليل...
                  </>
                ) : (
                  "تحليل الموقف"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </WebLayout>
  );
}
