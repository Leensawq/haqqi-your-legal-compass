import { CheckCircle2 } from "lucide-react";

interface ActionStepProps {
  step: number;
  title: string;
  description: string;
}

export function ActionStep({ step, title, description }: ActionStepProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
        {step}
      </div>
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
    </div>
  );
}
