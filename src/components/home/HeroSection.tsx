import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Shield, FileCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Right side - Text content (RTL: appears first) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-right order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              منصّة حَقّي لمساعدتك في مواقفك القانونية
            </h1>
            <p className="text-lg md:text-xl text-[#E0ECF5] mb-10 leading-relaxed max-w-xl mr-0 ml-auto lg:ml-0">
              نساعدك في فهم حقوقك القانونية وتحليل وضعك وإرشادك للخطوات الصحيحة
            </p>
            
            {/* CTA Area */}
            <div className="flex flex-col items-end gap-4 mb-10">
              <Button 
                onClick={() => navigate("/new-case")} 
                size="lg" 
                className="text-xl px-12 py-8 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                أدخل موقفي الآن
              </Button>
              <button 
                onClick={() => navigate("/new-case?example=true")}
                className="text-primary text-sm hover:underline transition-all duration-200 flex items-center gap-1"
              >
                جرّب مثال جاهز لمشكلة قانونية
              </button>
            </div>

            {/* Trust badges strip */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-end">
                <span>يعتمد على الأنظمة السعودية الرسمية</span>
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span>لا يستبدل الاستشارة القانونية المتخصصة</span>
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
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
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 lg:p-12 shadow-2xl">
                <div className="flex flex-col items-center gap-6">
                  {/* Icons grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary/20 flex items-center justify-center shadow-lg">
                      <Scale className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                    </div>
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg">
                      <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                    </div>
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg">
                      <FileCheck className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                    </div>
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary/20 flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                    </div>
                  </div>
                  
                  {/* Caption */}
                  <p className="text-sm text-muted-foreground text-center mt-4 max-w-[200px]">
                    تحليل آلي يعتمد على الأنظمة السعودية
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full blur-sm" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/20 rounded-full blur-md" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
