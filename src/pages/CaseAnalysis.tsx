import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, FileCheck, CheckCircle2, Scale, ChevronLeft, 
  FileText, CreditCard, IdCard, Building2, Receipt,
  Download, ExternalLink, Plus, AlertCircle, ShieldCheck,
  BookOpen, Lightbulb, ClipboardList, Phone, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WebLayout } from "@/components/layout/WebLayout";
import { useAuth } from "@/contexts/AuthContext";
import { TextToSpeech } from "@/components/accessibility/TextToSpeech";

type AnalysisStep = "analyzing" | "legal-right" | "official-steps" | "checklist" | "success";

const saudiRegions = [
  "الرياض",
  "مكة المكرمة", 
  "المدينة المنورة",
  "الشرقية",
  "القصيم",
  "عسير",
  "تبوك",
  "حائل",
  "الحدود الشمالية",
  "جازان",
  "نجران",
  "الباحة",
  "الجوف",
];

// AI Analysis Interface
interface AIAnalysis {
  reassuranceMessage?: string;
  empathyMessage?: string;
  isUserRight?: boolean;
  userRights?: string[];
  userObligations?: string[];
  legalRight: {
    title: string;
    reference: string;
    rights: string[];
  };
  legalSources: string[];
  officialSteps: { number: number; title: string; description: string }[];
  futureTips?: string[];
  complaintLetter: {
    recipient: string;
    subject: string;
    body: string;
    legalReference: string;
  };
  responsibleAuthority?: {
    name: string;
    contact: string;
    website: string;
  };
}

const initialChecklistItems = [
  { id: 1, title: "عقد العمل", icon: FileText },
  { id: 2, title: "كشف حساب بنكي آخر ٣ شهور", icon: CreditCard },
  { id: 3, title: "الهوية الوطنية", icon: IdCard },
  { id: 4, title: "رقم السجل التجاري لصاحب العمل", icon: Building2 },
  { id: 5, title: "أي إثبات لتأخر الأجر", icon: Receipt },
];

export default function CaseAnalysis() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<AnalysisStep>("analyzing");
  const [progress, setProgress] = useState(0);
  const [checkedSources, setCheckedSources] = useState<boolean[]>([]);
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});
  const [showValidationWarning, setShowValidationWarning] = useState(false);

  // AI Analysis State
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);

  // Load analysis from localStorage
  useEffect(() => {
    const storedAnalysis = localStorage.getItem('caseAnalysis');
    if (storedAnalysis) {
      try {
        const parsed = JSON.parse(storedAnalysis);
        setAnalysis(parsed);
        setCheckedSources(new Array(parsed.legalSources?.length || 0).fill(false));
      } catch (e) {
        console.error('Failed to parse analysis:', e);
      }
    }
  }, []);

  // Form state with prefill from profile
  const [formData, setFormData] = useState({
    fullName: "محمد أحمد",
    nationalId: user?.nationalId || "",
    region: "",
    city: "",
    phone: "0501234567",
    email: "mohammed@example.com",
    employer: "",
    jobTitle: "",
  });

  const totalItems = initialChecklistItems.length;
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const checklistProgress = (completedCount / totalItems) * 100;

  const toggleItem = (id: number) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.nationalId.trim().length === 10 &&
      formData.region !== "" &&
      formData.city.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== ""
    );
  };

  const handleContinue = () => {
    if (!isFormValid()) {
      setShowValidationWarning(true);
      return;
    }
    setShowValidationWarning(false);
    // Save user data to localStorage for letter generation
    localStorage.setItem('userData', JSON.stringify(formData));
    
    // Save case to localStorage
    const caseSituation = localStorage.getItem('caseSituation') || '';
    const caseTitle = caseSituation.substring(0, 50) + (caseSituation.length > 50 ? '...' : '');
    
    const newCase = {
      id: crypto.randomUUID(),
      title: caseTitle || 'قضية جديدة',
      category: analysis?.legalRight?.reference?.includes('العمل') ? 'العمل' : 'عام',
      description: caseSituation,
      status: 'تم الإرسال',
      status_type: 'sent',
      submitted_at: new Date().toISOString(),
      has_followup: false
    };
    
    // Get existing cases and add new one
    const existingCases = JSON.parse(localStorage.getItem('userCases') || '[]');
    existingCases.unshift(newCase);
    localStorage.setItem('userCases', JSON.stringify(existingCases));
    
    setStep("success");
  };

  useEffect(() => {
    if (step === "analyzing" && analysis) {
      const sources = analysis.legalSources || [];
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

      sources.forEach((_, index) => {
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
  }, [step, analysis]);

  

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
                <p className="text-lg text-foreground/70">جاري التحليل بناء على اللوائح والأنظمة السعودية المعتمدة</p>
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
                {(analysis?.legalSources || []).map((source, index) => (
                  <motion.div
                    key={source}
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
                    <span className="text-lg text-foreground">{source}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Legal Right - New Structure */}
          {step === "legal-right" && (
            <motion.div
              key="legal-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* 1) طمأنة أولية */}
              <div className="bg-primary/10 rounded-2xl p-6 border border-primary/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary mb-2">نفهم موقفك ونوضح لك حقوقك بوضوح</h3>
                    <div className="flex items-start gap-2">
                      <TextToSpeech text={analysis?.reassuranceMessage || "واضح من وصفك أنك مريت بموقف مزعج، ومن حقك تفهم وضعك النظامي بكل بساطة ووضوح. خلني أوضح لك الصورة بدون تعقيد، وبأسلوب يساعدك تعرف وش لك وش عليك."} />
                      <p className="text-base text-foreground leading-relaxed">
                        {analysis?.reassuranceMessage || "واضح من وصفك أنك مريت بموقف مزعج، ومن حقك تفهم وضعك النظامي بكل بساطة ووضوح. خلني أوضح لك الصورة بدون تعقيد، وبأسلوب يساعدك تعرف وش لك وش عليك."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2) وش لك؟ وش عليك؟ */}
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">وش لك؟ وش عليك؟</h3>
                </div>
                
                {/* وش لك من حقوق؟ */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                    وش لك من حقوق؟
                  </h4>
                  <ul className="space-y-2">
                    {(analysis?.userRights || analysis?.legalRight?.rights || []).map((right, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-base text-foreground">{right}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* وش قد يكون عليك؟ */}
                {(analysis?.userObligations && analysis.userObligations.length > 0) && (
                  <div>
                    <h4 className="text-base font-bold text-foreground/80 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
                      وش قد يكون عليك؟
                    </h4>
                    <ul className="space-y-2">
                      {analysis.userObligations.map((obligation, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                          <AlertTriangle className="w-5 h-5 text-foreground/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-base text-foreground">{obligation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="text-sm text-foreground/60 mt-4 italic">
                  هذا تقييم عام… والتحليل النهائي يكون مستند على الأنظمة الرسمية.
                </p>
              </div>

              {/* 3) وش المفروض يصير؟ */}
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">وش المفروض يصير؟</h3>
                    <p className="text-sm text-primary">{analysis?.legalRight?.reference}</p>
                  </div>
                </div>
                
                <div className="bg-background/20 rounded-xl p-4 mb-4">
                  <p className="text-base text-foreground mb-3">
                    بحسب <span className="font-bold text-primary">{analysis?.legalRight?.reference}</span>، المفروض يتم:
                  </p>
                  <ul className="space-y-2">
                    {(analysis?.legalRight?.rights || []).map((right, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-base text-foreground">{right}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-foreground/70">
                  <strong>المصادر القانونية:</strong>
                  <ul className="mt-2 space-y-1">
                    {(analysis?.legalSources || []).map((source, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-primary" />
                        <span>{source}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 5) نصائح مستقبلية */}
              {(analysis?.futureTips && analysis.futureTips.length > 0) && (
                <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">نصائح مستقبلية ذكية</h3>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">عشان تكون جاهز وتتفادى أي مشكلة مشابهة مستقبلًا:</p>
                  <ul className="space-y-2">
                    {analysis.futureTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg border border-border/20">
                        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-base text-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-foreground/60 mt-4 italic">
                    "وإذا صار أي شيء مشابه… اكتب لي الوضع، وأنا أحلله لك خلال ثواني."
                  </p>
                </div>
              )}

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

          {/* Step 3: Official Steps - 🟫 وش تسوي الآن؟ */}
          {step === "official-steps" && (
            <motion.div
              key="official-steps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">وش تسوي الآن؟</h1>
                    <p className="text-base text-foreground/70">علشان تحمي حقك وتبدأ بالطريقة الصحيحة</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {(analysis?.officialSteps || []).map((item, index) => (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background/20 rounded-xl p-5 border border-border/30 flex items-start gap-5 hover:bg-background/30 hover:border-primary/30 transition-all"
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

                {/* Responsible Authority */}
                {analysis?.responsibleAuthority && (
                  <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/30">
                    <h4 className="font-bold text-foreground mb-2">الجهة المختصة:</h4>
                    <div className="space-y-2 text-base">
                      <p className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{analysis.responsibleAuthority.name}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-primary" strokeWidth={1.5} />
                        <span className="text-foreground">{analysis.responsibleAuthority.contact}</span>
                      </p>
                      {analysis.responsibleAuthority.website && (
                        <a 
                          href={analysis.responsibleAuthority.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>زيارة الموقع الرسمي</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
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

              {/* Basic Info Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">بياناتك الأساسية</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">الاسم الكامل *</label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="bg-gray-50 border-gray-300 text-gray-900"
                      dir="rtl"
                    />
                  </div>

                  {/* National ID */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">رقم الهوية الوطنية *</label>
                    <Input
                      value={formData.nationalId}
                      onChange={(e) => setFormData(prev => ({ ...prev, nationalId: e.target.value }))}
                      placeholder="10 أرقام"
                      maxLength={10}
                      className="bg-gray-50 border-gray-300 text-gray-900"
                      dir="ltr"
                    />
                  </div>

                  {/* Region */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">المنطقة *</label>
                    <Select value={formData.region} onValueChange={(val) => setFormData(prev => ({ ...prev, region: val }))}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900">
                        <SelectValue placeholder="اختر المنطقة" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 z-50">
                        {saudiRegions.map((region) => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">المدينة *</label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className="bg-gray-50 border-gray-300 text-gray-900"
                      dir="rtl"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">رقم الجوال *</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+966 أو 05"
                      className="bg-gray-50 border-gray-300 text-gray-900"
                      dir="ltr"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">البريد الإلكتروني *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-50 border-gray-300 text-gray-900"
                      dir="ltr"
                    />
                  </div>

                  {/* Employer (Optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">جهة العمل <span className="text-gray-400">(اختياري)</span></label>
                    <Input
                      value={formData.employer}
                      onChange={(e) => setFormData(prev => ({ ...prev, employer: e.target.value }))}
                      className="bg-gray-50 border-gray-300 text-gray-900"
                      dir="rtl"
                    />
                  </div>

                  {/* Job Title (Optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">المسمى الوظيفي <span className="text-gray-400">(اختياري)</span></label>
                    <Input
                      value={formData.jobTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                      className="bg-gray-50 border-gray-300 text-gray-900"
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Validation Warning */}
                {showValidationWarning && !isFormValid() && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">من فضلك أكمل بياناتك الأساسية قبل المتابعة</span>
                  </motion.div>
                )}
              </motion.div>

              <Button className="w-full py-6 text-lg" onClick={handleContinue}>
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
