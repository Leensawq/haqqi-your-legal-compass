import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export function CategoryCard({ icon: Icon, title, description, onClick }: CategoryCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex w-full flex-col items-center gap-3 rounded-xl bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
        <Icon className="h-6 w-6 text-accent-foreground" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted">{description}</p>
      </div>
    </motion.button>
  );
}
