import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";

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
              أدخل موقفك الآن
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
              {/* Hero illustration image */}
              <img 
                src={heroIllustration} 
                alt="حقي - منصة الحقوق القانونية" 
                className="w-64 h-64 lg:w-80 lg:h-80 object-contain relative z-10"
              />
              {/* Ground glow effect */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 lg:w-60 h-6 rounded-full blur-xl"
                style={{ background: 'rgba(0, 180, 216, 0.5)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
