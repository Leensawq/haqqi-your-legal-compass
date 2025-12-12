import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Heart, Users, Wallet, Home as HomeIcon, ShoppingCart, BookOpen, Globe, Baby, Accessibility } from "lucide-react";
import { WebLayout } from "@/components/layout/WebLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { TextToSpeech } from "@/components/accessibility/TextToSpeech";
const categories = [{
  icon: Briefcase,
  title: "حقوق العمل",
  description: "الرواتب والإجازات والفصل التعسفي"
}, {
  icon: Users,
  title: "حقوق الأسرة",
  description: "الحضانة والنفقة والطلاق"
}, {
  icon: Heart,
  title: "الحقوق الصحية",
  description: "التأمين والأخطاء الطبية"
}, {
  icon: Wallet,
  title: "الحقوق المالية",
  description: "القروض والديون والتأمين"
}, {
  icon: HomeIcon,
  title: "السكن",
  description: "الإيجار والعقارات"
}, {
  icon: ShoppingCart,
  title: "التجارة الإلكترونية",
  description: "حقوق المستهلك والاحتيال"
}, {
  icon: Globe,
  title: "الاتفاقيات الدولية",
  description: "المواثيق والمعاهدات الدولية"
}, {
  icon: Baby,
  title: "حقوق الطفل",
  description: "حماية الطفل وتعزيز رفاهيته"
}, {
  icon: Accessibility,
  title: "حقوق ذوي الإعاقة",
  description: "الإعاقات البصرية والسمعية والحركية"
}];
export default function Home() {
  const navigate = useNavigate();
  return <WebLayout>
      <div className="space-y-4" dir="rtl">
        <HeroSection />

        <motion.section initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
          <div className="text-center mb-5">
            <div className="flex items-center gap-1.5 justify-center mb-1.5">
              <BookOpen className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-bold text-foreground md:text-3xl">أكاديمية حَقّي</h2>
              <TextToSpeech text="أكاديمية حقي. الحق يبدأ بالمعرفة. تصفح فئات الحقوق المختلفة مثل حقوق العمل وحقوق الأسرة والحقوق الصحية." />
            </div>
            <p className="text-muted-foreground text-xl">الحق يبدأ بالمعرفة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => <motion.div key={category.title} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.05 * index
          }} onClick={() => navigate(`/academy?category=${encodeURIComponent(category.title)}`)} className="bg-card rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-300 border border-border hover:border-primary/50 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-sm font-bold text-card-foreground mb-1">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </motion.section>
      </div>
    </WebLayout>;
}