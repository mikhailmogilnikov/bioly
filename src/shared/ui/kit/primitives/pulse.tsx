import { cn } from "@/shared/lib/utils";

type PulseColor = "success" | "danger" | "warning" | "link";

export const Pulse = ({
  className,
  color = "link",
}: {
  className?: string;
  color?: PulseColor;
}) => {
  const COLORS: Record<PulseColor, string> = {
    success: "bg-success",
    danger: "bg-danger",
    warning: "bg-warning",
    link: "bg-link",
  };

  const colorClass = COLORS[color as keyof typeof COLORS] || COLORS.link;

  return (
    <div className={cn("relative inline-flex size-2 leading-none", className)}>
      <div
        className={cn(
          "inline-block size-full rounded-full leading-none",
          colorClass
        )}
      />
      <div
        className={cn(
          "absolute size-full animate-ping rounded-full leading-none",
          colorClass
        )}
      />
    </div>
  );
};
