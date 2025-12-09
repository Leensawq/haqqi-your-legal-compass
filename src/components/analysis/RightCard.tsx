import { Scale } from "lucide-react";

interface RightCardProps {
  title: string;
  description: string;
  lawReference: string;
}

export function RightCard({ title, description, lawReference }: RightCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Scale className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="mt-1 text-sm text-muted">{description}</p>
          <p className="mt-2 text-xs text-primary">{lawReference}</p>
        </div>
      </div>
    </div>
  );
}
