import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, FileCheck, CheckCircle2, Scale, ChevronLeft, 
  FileText, CreditCard, IdCard, Building2, Receipt,
  Download, ExternalLink, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebLayout } from "@/components/layout/WebLayout";

type AnalysisStep = "analyzing" | "legal-right" | "official-steps" | "checklist" | "success";

const legalSources = [
  { name: "نظام العمل السعودي – المادة 90", checked: false },
  { name: "لائحة حماية الأجور", checked: false },
  { name: "أدلة الشكاوى العمالية", checked: false },
];

const officialSteps = [
  { number: 1, title: "تقديم شكوى تأخر الأجور عبر خدمة ودي", description: "رفع شكوى رسمية عبر منصة ودي الإلكترونية" },
  { number: 2, title: "تعبئة بيانات العامل والمنشأة", description: "إدخال جميع البيانات المطلوبة بدقة" },
  { number: 3, title: "رفع المستندات المطلوبة", description: "إرفاق جميع الوثائق الداعمة للشكوى" },
  { number: 4, title: "متابعة الرد خلال ٣–٥ أيام عمل", description: "انتظار رد الجهة المختصة" },
  { number: 5, title: "التصعيد للجنة الخلافات العمالية", description: "في حال عدم الحل الودي" },
];

const initialChecklistItems = [
  { id: 1, title: "عقد العمل", icon: FileText },
  { id: 2, title: "كشف حساب بنكي آخر ٣ شهور", icon: CreditCard },
  { id: 3, title: "الهوية الوطنية", icon: IdCard },
  { id: 4, title: "رقم السجل التجاري لصاحب العمل", icon: Building2 },
  { id: 5, title: "أي إثبات لتأخر الأجر", icon: Receipt },
];

export default function CaseAnalysis() {
  const navigate = useNavigate();
  const [step, setStep] = useState<AnalysisStep>("analyzing");
  const [progress, setProgress] = useState(0);
  const [checkedSources, setCheckedSources] = useState<boolean[]>([false, false, false]);
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});

  const totalItems = initialChecklistItems.length;
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const checklistProgress = (completedCount / totalItems) * 100;

  const toggleItem = (id: number) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    if (step === "analyzing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep("legal-right"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      legalSources.forEach((_, index) => {
        setTimeout(() => {
          setCheckedSources((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, 1500 + index * 1000);
      });

      return () => clearInterval(interval);
    }
  }, [step]);

  

  return (
    <WebLayout>
      <div className="w-full" dir="rtl">
        <AnimatePresence mode="wait">
          {/* Step 1: Analyzing */}
          {step === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">جاري تحليل حالتك...</h1>
                <p className="text-lg text-foreground/70">نقوم بمراجعة الأنظمة واللوائح ذات الصلة</p>
              </div>

              {/* Progress Bar - RTL Direction */}
              <div className="bg-secondary/30 rounded-2xl p-8 border border-border/50">
                <div className="relative h-4 bg-background/30 rounded-full overflow-hidden mb-6">
                  <div 
                    className="absolute top-0 right-0 h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {/* RTL Progress Labels: بحث → تحليل → جاهز (displayed right to left, starting from بحث on the right) */}
                <div className="flex justify-between text-base font-medium">
                  <span className={`transition-colors ${progress >= 100 ? "text-primary font-bold" : "text-foreground/50"}`}>جاهز</span>
                  <span className={`transition-colors ${progress >= 50 ? "text-primary font-bold" : "text-foreground/50"}`}>تحليل</span>
                  <span className={`transition-colors ${progress > 0 ? "text-primary font-bold" : "text-foreground/50"}`}>بحث</span>
                </div>
              </div>

              {/* Legal Sources */}
              <div className="bg-secondary/30 rounded-2xl p-8 border border-border/50 space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-6">المصادر القانونية</h3>
                {legalSources.map((source, index) => (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className="flex items-center gap-4 p-4 bg-background/20 rounded-xl hover:bg-background/30 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      checkedSources[index] ? "bg-primary" : "bg-muted/50"
                    }`}>
                      {checkedSources[index] ? (
                        <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <Search className="w-4 h-4 text-foreground/50" />
                      )}
                    </div>
                    <span className="text-lg text-foreground">{source.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Legal Right */}
          {step === "legal-right" && (
            <motion.div
              key="legal-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-secondary/30 rounded-2xl p-8 border border-border/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Scale className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">حقك القانوني</h2>
                    <p className="text-base text-primary">نظام العمل السعودي – المادة 90</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xl text-foreground leading-relaxed">
                    بناءً على نظام العمل السعودي، لديك الحق في:
                  </p>
                  <ul className="space-y-3 list-none">
                    <li className="flex items-start gap-4 p-4 bg-background/20 rounded-xl hover:bg-background/30 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-lg text-foreground">استلام راتبك كاملاً في موعده المحدد</span>
                    </li>
                    <li className="flex items-start gap-4 p-4 bg-background/20 rounded-xl hover:bg-background/30 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-lg text-foreground">تقديم شكوى لدى مكتب العمل في حال التأخير</span>
                    </li>
                    <li className="flex items-start gap-4 p-4 bg-background/20 rounded-xl hover:bg-background/30 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-lg text-foreground">المطالبة بالتعويض عن الأضرار الناتجة عن التأخير</span>
                    </li>
                    <li className="flex items-start gap-4 p-4 bg-background/20 rounded-xl hover:bg-background/30 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-lg text-foreground">إنهاء العقد بدون إشعار في حال التأخر أكثر من 60 يوماً</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 py-6 text-lg border-border/50 text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary" onClick={() => navigate("/home")}>
                  <ChevronLeft className="w-5 h-5 ml-2" />
                  الرئيسية
                </Button>
                <Button className="flex-1 py-6 text-lg" onClick={() => setStep("official-steps")}>
                  الخطوات الرسمية
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Official Steps */}
          {step === "official-steps" && (
            <motion.div
              key="official-steps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">الخطوات الرسمية</h1>
                <p className="text-lg text-foreground/70 mt-2">اتبع هذه الخطوات لتقديم شكواك</p>
              </div>

              <div className="space-y-4">
                {officialSteps.map((item, index) => (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-secondary/30 rounded-xl p-6 border border-border/50 flex items-start gap-5 hover:bg-secondary/50 hover:border-primary/30 transition-all cursor-default"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-lg">{item.number}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
                      <p className="text-base text-foreground/70">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full py-6 text-lg" onClick={() => setStep("checklist")}>
                التحقق من المستندات
              </Button>
            </motion.div>
          )}

          {/* Step 4: Checklist */}
          {step === "checklist" && (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">قائمة التحقق قبل التقديم</h1>
                <p className="text-lg text-foreground/70 mt-2">تأكد من توفر جميع المستندات المطلوبة</p>
              </div>

              {/* Progress */}
              <div className="bg-secondary/30 rounded-xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base text-foreground/70">تقدم التحقق</span>
                  <span className="text-base font-bold text-primary">{completedCount} من {totalItems}</span>
                </div>
                <div className="relative h-3 bg-background/30 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${checklistProgress}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-3">
                {initialChecklistItems.map((item, index) => {
                  const isCompleted = completedItems[item.id] || false;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-secondary/30 rounded-xl p-5 border flex items-center gap-4 hover:bg-secondary/50 transition-all cursor-pointer ${
                        isCompleted ? "border-primary/50" : "border-border/50"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary">
                        <item.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <span className="flex-1 font-medium text-lg text-foreground">{item.title}</span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-7 h-7 text-primary" />
                      ) : (
                        <div className="w-7 h-7 rounded-full border-2 border-foreground/30" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <Button className="w-full py-6 text-lg" onClick={() => setStep("success")}>
                أنا جاهز — متابعة
              </Button>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-14 h-14 text-primary" />
                </motion.div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">حالتك جاهزة بالكامل</h1>
                <p className="text-lg text-foreground/70">تم إعداد جميع المستندات والخطوات اللازمة</p>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-xl p-5 border border-primary/50 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg text-foreground">تم تحليل الحالة وفق المادة 90</span>
                </div>
                <div className="bg-secondary/30 rounded-xl p-5 border border-primary/50 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg text-foreground">تم إعداد خطاب الشكوى</span>
                </div>
                <div className="bg-secondary/30 rounded-xl p-5 border border-primary/50 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg text-foreground">تم تجهيز قائمة المستندات الرسمية</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full py-6 text-lg" 
                  size="lg"
                  onClick={() => navigate("/letter-generation")}
                >
                  <Download className="w-5 h-5 ml-2" />
                  تحميل الخطاب والمستندات
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full py-6 text-lg border-border/50 text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary transition-all" 
                  size="lg"
                  onClick={() => window.open("https://www.mol.gov.sa/Services/Complaints", "_blank", "noopener,noreferrer")}
                >
                  <ExternalLink className="w-5 h-5 ml-2" />
                  الانتقال لمنصة البلاغات
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full py-4 text-primary hover:bg-primary/10"
                  onClick={() => navigate("/new-case")}
                >
                  <Plus className="w-5 h-5 ml-2" />
                  حل موقف آخر
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WebLayout>
  );
}
