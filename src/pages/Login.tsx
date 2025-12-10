import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronLeft } from "lucide-react";
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
    if (step === "national-id" && nationalId.length === 10) {
      setStep("nafath-sent");
      setTimeout(() => setStep("otp"), 2000);
    } else if (step === "otp" && otp.length === 4) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Dark Navy Header */}
      <header className="bg-background py-6 px-4">
        <div className="max-w-lg mx-auto flex items-center justify-center">
          <img src={haqqiLogo} alt="حَقّي" className="h-20 w-auto" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-xl shadow-lg p-8">
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
                    <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold text-card-foreground">
                      تسجيل الدخول عبر الهوية الوطنية
                    </h1>
                    <p className="text-muted text-sm">
                      أدخل رقم هويتك للمتابعة
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">
                        رقم الهوية الوطنية
                      </label>
                      <Input
                        type="text"
                        placeholder="1XXXXXXXXX"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="text-center text-lg tracking-widest bg-input border-border text-card-foreground"
                        dir="ltr"
                      />
                    </div>

                    <Button
                      onClick={handleContinue}
                      disabled={nationalId.length !== 10}
                      className="w-full py-6 text-lg font-semibold"
                      size="lg"
                    >
                      متابعة
                    </Button>
                  </div>
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
                  <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold text-card-foreground">
                      تم إرسال طلب تسجيل الدخول عبر نفاذ
                    </h2>
                    <p className="text-muted text-sm">
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

                  <div className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold text-card-foreground">
                      أدخل رمز التحقق
                    </h1>
                    <p className="text-muted text-sm">
                      تم إرسال رمز التحقق إلى جوالك
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="----"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className="text-center text-2xl tracking-[1rem] bg-input border-border text-card-foreground py-6"
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

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <p className="text-xs text-center">
              خدمة تسجيل الدخول محمية ومتكاملة مع منصة نفاذ الوطنية
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
