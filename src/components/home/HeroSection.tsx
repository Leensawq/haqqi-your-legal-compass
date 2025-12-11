import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Shield, FileCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12 items-center">
          
          {/* Right side - Text content (RTL: appears first) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="order-1 text-right"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
              منصّة حَقّي لمساعدتك في مواقفك القانونية
            </h1>
            
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mt-4 mr-0 ml-auto lg:ml-0">
              نساعدك في فهم حقوقك القانونية وتحليل وضعك وإرشادك للخطوات الصحيحة
            </p>
            
            {/* CTA Button */}
            <Button 
              onClick={() => navigate("/new-case")} 
              size="lg" 
              className="text-sm px-6 py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] mt-6"
            >
              أدخل موقفي الآن
            </Button>
          </motion.div>

          {/* Left side - Illustration panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Main illustration card */}
              <div className="bg-primary/10 backdrop-blur-sm border border-border/50 rounded-2xl p-6 lg:p-8 shadow-xl min-w-[200px] lg:min-w-[240px]">
                <div className="flex flex-col items-center gap-5">
                  {/* Icons grid */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center shadow-md hover:bg-primary/20 transition-colors">
                      <Scale className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center shadow-md hover:bg-primary/20 transition-colors">
                      <Shield className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center shadow-md hover:bg-primary/20 transition-colors">
                      <FileCheck className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center shadow-md hover:bg-primary/20 transition-colors">
                      <CheckCircle className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Caption */}
                  <p className="text-xs text-muted-foreground text-center px-2">
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
