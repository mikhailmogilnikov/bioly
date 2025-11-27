"use client";

// biome-ignore lint/performance/noNamespaceImport: 1
import * as ProgressPrimitive from "@radix-ui/react-progress";
import type * as React from "react";

import { cn } from "@/shared/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-foreground/5",
        className
      )}
      data-slot="progress"
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-link transition-all duration-300"
        data-slot="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
