import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import haqqiLogo from "@/assets/haqqi-logo.png";

type Step = "national-id" | "nafath-sent" | "otp";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("national-id");
  const [nationalId, setNationalId] = useState("");
  const [otp, setOtp] = useState("");

  const handleContinue = () => {
    // Manual login with ID 1122334455
    if (step === "national-id" && nationalId === "1122334455") {
      setStep("nafath-sent");
      setTimeout(() => setStep("otp"), 2000);
    } else if (step === "otp" && otp.length === 4) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" dir="rtl">
      {/* Left Side - Login Form */}
      <div className="flex-1 bg-card flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Language Toggle */}
          <div className="flex justify-start mb-8">
            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">English</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === "national-id" && (
              <motion.div
                key="national-id"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-right space-y-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-card-foreground">
                    تسجيل الدخول
                  </h1>
                  <p className="text-muted-foreground text-sm lg:text-base">
                    للمواطن السعودي أو المقيم الذي يحمل إقامة سعودية
                  </p>
                </div>

                {/* Nafath Logo */}
                <div className="flex justify-center py-8">
                  <h2 className="text-5xl lg:text-7xl font-bold text-primary" style={{ fontFamily: 'Arial, sans-serif' }}>
                    نفاذ
                  </h2>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm lg:text-base text-right leading-relaxed">
                  يمكن الدخول عن طريق "أبشر" من خلال بوابة النفاذ الوطني الموحد لتستفيد من الخدمات الإلكترونية المقدمة من منصة حَقّي
                </p>

                {/* Input Field */}
                <div className="space-y-3">
                  <label className="block text-right text-sm font-semibold text-card-foreground">
                    رقم بطاقة الأحوال/الإقامة
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="رقم الهوية / الإقامة"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="text-right text-base py-6 px-4 bg-background border-border text-card-foreground placeholder:text-muted-foreground"
                      dir="rtl"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xs font-bold">ID</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    للتجربة استخدم: 1122334455
                  </p>
                </div>

                {/* Login Button */}
                <Button
                  onClick={handleContinue}
                  disabled={nationalId !== "1122334455"}
                  className="w-full py-6 text-lg font-semibold rounded-lg"
                  size="lg"
                >
                  تسجيل الدخول
                </Button>
              </motion.div>
            )}

            {step === "nafath-sent" && (
              <motion.div
                key="nafath-sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-6 py-8"
              >
                <div className="flex justify-center py-8">
                  <h2 className="text-5xl lg:text-7xl font-bold text-primary">
                    نفاذ
                  </h2>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-card-foreground">
                    تم إرسال طلب تسجيل الدخول عبر نفاذ
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    يرجى التحقق من تطبيق نفاذ على جوالك
                  </p>
                </div>
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setStep("national-id")}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm">رجوع</span>
                </button>

                <div className="text-right space-y-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-card-foreground">
                    أدخل رمز التحقق
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    تم إرسال رمز التحقق إلى جوالك
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="----"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="text-center text-2xl tracking-[1rem] bg-background border-border text-card-foreground py-6"
                    dir="ltr"
                  />

                  <Button
                    onClick={handleContinue}
                    disabled={otp.length !== 4}
                    className="w-full py-6 text-lg font-semibold"
                    size="lg"
                  >
                    تأكيد الدخول
                  </Button>

                  <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors">
                    إعادة إرسال الرمز
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="relative z-10 flex flex-col justify-between p-16 text-primary-foreground w-full">
          {/* Logo */}
          <div className="flex justify-end">
            <img src={haqqiLogo} alt="حَقّي" className="h-16 w-auto" />
          </div>

          {/* Main Content */}
          <div className="text-right space-y-6">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              منصة حَقّي للحقوق القانونية
            </h2>
            <p className="text-lg xl:text-xl opacity-90 leading-relaxed max-w-lg mr-auto">
              منصة حَقّي هي منصتك الموثوقة لفهم حقوقك القانونية وتحليل وضعك وإنشاء الخطابات الرسمية
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors cursor-pointer">
                <span className="text-sm">in</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors cursor-pointer">
                <span className="text-sm">X</span>
              </div>
            </div>
            <p className="text-sm opacity-75">
              جميع الحقوق محفوظة لمنصة حَقّي @ 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
