import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Image, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { WebLayout } from "@/components/layout/WebLayout";
import { SpeechToText } from "@/components/accessibility/SpeechToText";
import { TextToSpeech } from "@/components/accessibility/TextToSpeech";

export default function NewCase() {
  const navigate = useNavigate();
  const [situation, setSituation] = useState("");
  const [ocrEnabled, setOcrEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    if (!situation.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      navigate("/case-analysis");
    }, 1000);
  };

  const handleTranscript = (text: string) => {
    setSituation((prev) => prev + (prev ? " " : "") + text);
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
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                صف موقِفك
              </h1>
              <TextToSpeech text="صف موقفك. اكتب تفاصيل الموقف وسنحلله وفق الأنظمة السعودية" />
            </div>
            <p className="text-lg text-muted-foreground">
              اكتب تفاصيل الموقف وسنحلله وفق الأنظمة السعودية
            </p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-border"
          >
            <div className="space-y-6">
              {/* Situation Textarea */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  وصف الموقف
                </label>
                <div className="relative">
                  <Textarea
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    placeholder="مثال: لم أستلم راتبي لمدة ٣ شهور من صاحب العمل رغم مطالبتي المتكررة..."
                    className="min-h-[200px] text-base bg-white border-gray-300 text-gray-900 resize-none placeholder:text-gray-400 pl-12"
                    dir="rtl"
                  />
                  <div className="absolute left-2 top-2">
                    <SpeechToText onTranscript={handleTranscript} />
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  المرفقات (اختياري)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-6 h-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <FileText className="w-6 h-6" />
                    <span className="text-xs">مستند PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-6 h-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <Image className="w-6 h-6" />
                    <span className="text-xs">صورة</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-6 h-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <Upload className="w-6 h-6" />
                    <span className="text-xs">رفع ملف</span>
                  </Button>
                </div>
              </div>

              {/* OCR Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="text-sm font-medium text-gray-800">
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
