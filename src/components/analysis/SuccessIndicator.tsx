interface SuccessIndicatorProps {
  percentage: number;
  label: string;
}

export function SuccessIndicator({ percentage, label }: SuccessIndicatorProps) {
  const getColor = () => {
    if (percentage >= 70) return "text-primary bg-primary";
    if (percentage >= 40) return "text-accent-foreground bg-accent";
    return "text-destructive bg-destructive";
  };

  return (
    <div className="rounded-xl bg-card p-4 text-center">
      <div className="relative mx-auto h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted/20"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            className={getColor().split(" ")[0]}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{percentage}%</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-muted">{label}</p>
    </div>
  );
}
