import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Image, Upload, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { WebLayout } from "@/components/layout/WebLayout";
import { SpeechToText } from "@/components/accessibility/SpeechToText";
import { TextToSpeech } from "@/components/accessibility/TextToSpeech";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'file';
  preview?: string;
}

export default function NewCase() {
  const navigate = useNavigate();
  const [situation, setSituation] = useState("");
  const [ocrEnabled, setOcrEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!situation.trim()) return;
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-case', {
        body: { situation }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success && data?.analysis) {
        // Store analysis in localStorage temporarily
        localStorage.setItem('caseAnalysis', JSON.stringify(data.analysis));
        localStorage.setItem('caseSituation', situation);
        navigate("/case-analysis");
      } else {
        throw new Error(data?.error || 'حدث خطأ في التحليل');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('حدث خطأ في التحليل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranscript = (text: string) => {
    setSituation((prev) => prev + (prev ? " " : "") + text);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newFile: UploadedFile = {
            id: crypto.randomUUID(),
            name: file.name,
            type: 'image',
            preview: event.target?.result as string
          };
          setUploadedFiles(prev => [...prev, newFile]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: 'file'
      };
      setUploadedFiles(prev => [...prev, newFile]);
    });
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
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
                
                {/* Hidden file inputs */}
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => imageInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 py-6 h-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <Image className="w-6 h-6" />
                    <span className="text-xs">صورة</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 py-6 h-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <Upload className="w-6 h-6" />
                    <span className="text-xs">رفع ملف</span>
                  </Button>
                </div>

                {/* Uploaded files preview */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-sm text-gray-600">الملفات المرفقة ({uploadedFiles.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map(file => (
                        <div 
                          key={file.id} 
                          className="relative group bg-gray-100 rounded-lg p-2 flex items-center gap-2 border border-gray-200"
                        >
                          {file.type === 'image' && file.preview ? (
                            <img src={file.preview} alt={file.name} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                              <Upload className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                          <span className="text-xs text-gray-700 max-w-[100px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
