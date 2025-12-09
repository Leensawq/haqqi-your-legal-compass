import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CaseCard } from "@/components/cases/CaseCard";
import { Badge } from "@/components/ui/badge";

const mockCases = [
  {
    id: "1",
    title: "شكوى فصل تعسفي",
    category: "العمل",
    status: "reviewing" as const,
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "استرداد مبلغ مشتريات",
    category: "التجارة الإلكترونية",
    status: "sent" as const,
    date: "2024-01-10",
  },
  {
    id: "3",
    title: "نزاع عقد إيجار",
    category: "العقارات",
    status: "closed" as const,
    date: "2023-12-20",
  },
];

const mockNotifications = [
  { id: "1", text: "تم تحديث حالة قضيتك رقم #1234", time: "منذ ساعة" },
  { id: "2", text: "تم استلام ردك على الشكوى", time: "منذ يومين" },
];

export default function MyCases() {
  return (
    <PageLayout title="قضاياي">
      <div className="space-y-6">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">الإشعارات</h2>
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
          <h2 className="font-semibold text-foreground">جميع القضايا</h2>
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
            <p className="text-muted">لا توجد قضايا حتى الآن</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
