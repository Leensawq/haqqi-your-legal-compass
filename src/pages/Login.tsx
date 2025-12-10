import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import haqqiLogo from "@/assets/haqqi-logo.png";

type Step = "national-id" | "nafath-sent" | "otp";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("national-id");
  const [nationalId, setNationalId] = useState("");
  const [otp, setOtp] = useState("");

  // Redirect authenticated users to /home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleContinue = () => {
    if (step === "national-id" && nationalId === "1122334455") {
      setStep("nafath-sent");
      setTimeout(() => setStep("otp"), 2000);
    } else if (step === "otp" && otp.length === 6) {
      login(nationalId);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8" dir="rtl">
      {/* Logo at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <img src={haqqiLogo} alt="حَقّي" className="h-16 w-auto" />
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card rounded-2xl shadow-xl p-8 border border-border"
      >
        {/* Language Toggle */}
        <div className="flex justify-start mb-6">
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
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-card-foreground">
                  تسجيل الدخول عبر الهوية الوطنية
                </h1>
                <p className="text-muted-foreground text-sm">
                  للمواطن السعودي أو المقيم الذي يحمل إقامة سعودية
                </p>
              </div>

              {/* Nafath Logo */}
              <div className="flex justify-center py-4">
                <h2 className="text-5xl font-bold text-primary" style={{ fontFamily: 'Arial, sans-serif' }}>
                  نفاذ
                </h2>
              </div>

              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                يمكن الدخول عن طريق "أبشر" من خلال بوابة النفاذ الوطني الموحد
              </p>

              <div className="space-y-3">
                <label className="block text-right text-sm font-semibold text-card-foreground">
                  رقم الهوية الوطنية
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="رقم الهوية / الإقامة"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="text-right text-base py-6 px-4 bg-background border-border text-foreground placeholder:text-muted-foreground"
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

              <Button
                onClick={handleContinue}
                disabled={nationalId !== "1122334455"}
                className="w-full py-6 text-lg font-semibold rounded-lg"
                size="lg"
              >
                متابعة
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
              <div className="flex justify-center py-4">
                <h2 className="text-5xl font-bold text-primary">
                  نفاذ
                </h2>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-card-foreground">
                  تم إرسال طلب تسجيل الدخول عبر نفاذ
                </h2>
                <p className="text-muted-foreground text-sm">
                  الرجاء إدخال رمز التحقق
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
                <ChevronRight className="w-4 h-4" />
                <span className="text-sm">رجوع</span>
              </button>

              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-card-foreground">
                  أدخل رمز التحقق
                </h1>
                <p className="text-muted-foreground text-sm">
                  تم إرسال طلب تسجيل الدخول عبر نفاذ، الرجاء إدخال رمز التحقق
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="------"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-2xl tracking-[0.75rem] bg-background border-border text-foreground py-6"
                  dir="ltr"
                />

                <Button
                  onClick={handleContinue}
                  disabled={otp.length !== 6}
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
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-muted-foreground"
      >
        جميع الحقوق محفوظة لمنصة حَقّي © 2024
      </motion.p>
    </div>
  );
}
