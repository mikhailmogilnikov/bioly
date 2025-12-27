import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button, type ButtonProps } from "@/shared/ui/kit/primitives/button";

interface BackButtonProps extends ButtonProps {}

export function BackButton({ children, className, ...props }: BackButtonProps) {
  return (
    <Button
      className={cn(
        "group mt-2 flex items-center gap-1 rounded-xl font-medium text-foreground/50 text-sm hover:text-foreground/50",
        className
      )}
      size="sm"
      type="button"
      variant="ghost"
      {...props}
    >
      <ChevronLeftIcon className="-ml-1 size-4 transition-transform group-hover:-translate-x-0.5" />
      {children}
    </Button>
  );
}
