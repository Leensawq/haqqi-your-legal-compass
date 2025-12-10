import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Heart, Users, Wallet, Home as HomeIcon, ShoppingCart, Search, BookOpen } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import haqqiLogo from "@/assets/haqqi-logo.png";

const categories = [
  { icon: Briefcase, title: "حقوق العمل", description: "نظام العمل واللوائح" },
  { icon: Users, title: "حقوق الأسرة", description: "الأحوال الشخصية" },
  { icon: Heart, title: "حقوق الصحة", description: "التأمين والرعاية" },
  { icon: Wallet, title: "الحقوق المالية", description: "البنوك والتمويل" },
  { icon: HomeIcon, title: "السكن", description: "الإيجار والملكية" },
  { icon: ShoppingCart, title: "التجارة الإلكترونية", description: "حماية المستهلك" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4"
        >
          <img src={haqqiLogo} alt="حَقّي" className="h-20 w-auto mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">
            اعرف حقوقك القانونية بكل سهولة
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="bg-card rounded-xl shadow-sm p-1">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <Input
                placeholder="ابحث عن حق أو مادة نظامية..."
                className="pr-12 py-6 bg-transparent border-0 text-card-foreground placeholder:text-muted"
              />
            </div>
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => navigate("/create-case")}
            className="w-full py-7 text-lg font-bold shadow-lg"
            size="lg"
          >
            أدخل موقفي
          </Button>
        </motion.div>

        {/* Learn Your Rights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">تعلّم حقوقك</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <button
                  onClick={() => navigate(`/academy?category=${category.title}`)}
                  className="w-full bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-right group"
                >
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-card-foreground text-sm mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted">{category.description}</p>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
