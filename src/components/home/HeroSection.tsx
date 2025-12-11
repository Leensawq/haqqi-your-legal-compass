import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Shield, FileCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-10 lg:py-16 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Right side - Text content (RTL: appears first) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-right order-1"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-4 leading-tight">
              منصّة حَقّي لمساعدتك في مواقفك القانونية
            </h1>
            <p className="text-sm md:text-base text-[#E0ECF5] mb-6 leading-relaxed max-w-lg mr-0 ml-auto lg:ml-0">
              نساعدك في فهم حقوقك القانونية وتحليل وضعك وإرشادك للخطوات الصحيحة
            </p>
            
            {/* CTA Area */}
            <div className="flex flex-col items-end gap-2.5 mb-6">
              <Button 
                onClick={() => navigate("/new-case")} 
                size="lg" 
                className="text-sm px-6 py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                أدخل موقفي الآن
              </Button>
              <button 
                onClick={() => navigate("/new-case?example=true")}
                className="text-primary text-xs hover:underline transition-all duration-200 flex items-center gap-1"
              >
                جرّب مثال جاهز لمشكلة قانونية
              </button>
            </div>

            {/* Trust badges strip */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 justify-end">
                <span>يعتمد على الأنظمة السعودية الرسمية</span>
                <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <span>لا يستبدل الاستشارة القانونية المتخصصة</span>
                <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              </div>
            </div>
          </motion.div>

          {/* Left side - Illustration panel (RTL: appears second) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Main illustration card */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 lg:p-8 shadow-xl">
                <div className="flex flex-col items-center gap-4">
                  {/* Icons grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/20 flex items-center justify-center shadow-md">
                      <Scale className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center shadow-md">
                      <Shield className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center shadow-md">
                      <FileCheck className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/20 flex items-center justify-center shadow-md">
                      <CheckCircle className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Caption */}
                  <p className="text-xs text-muted-foreground text-center mt-2 max-w-[180px]">
                    تحليل آلي يعتمد على الأنظمة السعودية
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary/30 rounded-full blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-md" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
