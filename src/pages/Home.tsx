import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Heart, Users, Wallet, Home as HomeIcon, ShoppingCart, Search, BookOpen, Globe, Baby, Accessibility } from "lucide-react";
import { WebLayout } from "@/components/layout/WebLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { icon: Briefcase, title: "حقوق العمل", description: "الرواتب والإجازات والفصل التعسفي" },
  { icon: Users, title: "حقوق الأسرة", description: "الحضانة والنفقة والطلاق" },
  { icon: Heart, title: "الحقوق الصحية", description: "التأمين والأخطاء الطبية" },
  { icon: Wallet, title: "الحقوق المالية", description: "القروض والديون والتأمين" },
  { icon: HomeIcon, title: "السكن", description: "الإيجار والعقارات" },
  { icon: ShoppingCart, title: "التجارة الإلكترونية", description: "حقوق المستهلك والاحتيال" },
  { icon: Globe, title: "الاتفاقيات الدولية", description: "المواثيق والمعاهدات الدولية" },
  { icon: Baby, title: "حقوق الطفل", description: "حماية الطفل وتعزيز رفاهيته" },
  { icon: Accessibility, title: "حقوق ذوي الإعاقة", description: "الإعاقات البصرية والسمعية والحركية" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <WebLayout>
      <div className="space-y-12" dir="rtl">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">منصّة حَقّي لمساعدتك في مواقفك القانونية</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">نساعدك في فهم حقوقك القانونية وتحليل وضعك وإرشادك للخطوات الصحيحة</p>
          <Button onClick={() => navigate("/new-case")} size="lg" className="text-xl px-10 py-8 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow">أدخل موقفي الآن</Button>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input type="text" placeholder="ابحث عن حق أو مادة نظامية…" className="w-full pr-12 py-6 text-base bg-card border-border text-card-foreground rounded-xl" dir="rtl" />
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="text-center mb-8">
            <div className="flex items-center gap-2 justify-center mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">أكاديمية حَقّي</h2>
            </div>
            <p className="text-base text-muted-foreground">الحق يبدأ بالمعرفة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}
                onClick={() => navigate(`/academy?category=${encodeURIComponent(category.title)}`)}
                className="bg-card rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/50 group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </WebLayout>
  );
}
