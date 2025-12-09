import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Heart, Users, GraduationCap, ShoppingCart, Building } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SearchBar } from "@/components/home/SearchBar";
import { CategoryCard } from "@/components/home/CategoryCard";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: Briefcase, title: "العمل", description: "حقوق العمال وقانون العمل" },
  { icon: Heart, title: "الصحة", description: "حقوق المرضى والتأمين" },
  { icon: Users, title: "الأسرة", description: "قانون الأحوال الشخصية" },
  { icon: GraduationCap, title: "التعليم", description: "حقوق الطلاب" },
  { icon: ShoppingCart, title: "التجارة الإلكترونية", description: "حماية المستهلك" },
  { icon: Building, title: "العقارات", description: "قوانين الإيجار والملكية" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-primary">حقي</h1>
          <p className="mt-2 text-muted">اعرف حقوقك القانونية بكل سهولة</p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={() => navigate("/create-case")}
            className="w-full py-6 text-lg font-semibold"
            size="lg"
          >
            أدخل موقفي
          </Button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SearchBar />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">التصنيفات القانونية</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                  onClick={() => navigate(`/create-case?category=${category.title}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
