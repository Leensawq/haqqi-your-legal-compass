import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar } from "lucide-react";

interface CaseCardProps {
  id: string;
  title: string;
  category: string;
  status: "sent" | "reviewing" | "closed";
  date: string;
  onClick?: () => void;
}

const statusConfig = {
  sent: { label: "تم الإرسال", className: "bg-accent text-accent-foreground" },
  reviewing: { label: "قيد المراجعة", className: "bg-primary/10 text-primary" },
  closed: { label: "مغلق", className: "bg-muted/20 text-muted" },
};

export function CaseCard({ title, category, status, date, onClick }: CaseCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl bg-card p-4 shadow-sm text-right"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
          <span className="text-xs text-muted">{category}</span>
        </div>
        <h3 className="mt-2 font-semibold text-foreground">{title}</h3>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
        </div>
      </div>
      <ChevronLeft className="h-5 w-5 text-muted" />
    </motion.button>
  );
}
