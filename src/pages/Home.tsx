import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Heart, Users, GraduationCap, ShoppingCart, Building } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SearchBar } from "@/components/home/SearchBar";
import { CategoryCard } from "@/components/home/CategoryCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    { icon: Briefcase, titleKey: "category.work", descKey: "category.work.desc" },
    { icon: Heart, titleKey: "category.health", descKey: "category.health.desc" },
    { icon: Users, titleKey: "category.family", descKey: "category.family.desc" },
    { icon: GraduationCap, titleKey: "category.education", descKey: "category.education.desc" },
    { icon: ShoppingCart, titleKey: "category.ecommerce", descKey: "category.ecommerce.desc" },
    { icon: Building, titleKey: "category.realestate", descKey: "category.realestate.desc" },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-primary">{t("app.name")}</h1>
          <p className="mt-2 text-muted">{t("app.tagline")}</p>
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
            {t("home.enterSituation")}
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
          <h2 className="mb-4 text-lg font-semibold text-foreground">{t("home.legalCategories")}</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <CategoryCard
                  icon={category.icon}
                  title={t(category.titleKey)}
                  description={t(category.descKey)}
                  onClick={() => navigate(`/create-case?category=${t(category.titleKey)}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
