import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CaseCard } from "@/components/cases/CaseCard";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MyCases() {
  const { t } = useLanguage();

  const mockCases = [
    {
      id: "1",
      title: t("case.unfairDismissal"),
      category: t("category.work"),
      status: "reviewing" as const,
      date: "2024-01-15",
    },
    {
      id: "2",
      title: t("case.refund"),
      category: t("category.ecommerce"),
      status: "sent" as const,
      date: "2024-01-10",
    },
    {
      id: "3",
      title: t("case.rentalDispute"),
      category: t("category.realestate"),
      status: "closed" as const,
      date: "2023-12-20",
    },
  ];

  const mockNotifications = [
    { id: "1", text: t("notification.updated"), time: t("notification.hourAgo") },
    { id: "2", text: t("notification.received"), time: t("notification.daysAgo") },
  ];

  return (
    <PageLayout title={t("myCases.title")}>
      <div className="space-y-6">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">{t("myCases.notifications")}</h2>
            <Badge className="bg-primary text-primary-foreground">{mockNotifications.length}</Badge>
          </div>
          <div className="space-y-2">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-lg bg-accent/50 p-3 text-sm"
              >
                <p className="text-foreground">{notification.text}</p>
                <p className="mt-1 text-xs text-muted">{notification.time}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cases List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="font-semibold text-foreground">{t("myCases.allCases")}</h2>
          <div className="space-y-3">
            {mockCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <CaseCard {...caseItem} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {mockCases.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted">{t("myCases.noCases")}</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
