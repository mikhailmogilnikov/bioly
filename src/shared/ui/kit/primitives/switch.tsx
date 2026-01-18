"use client";

// biome-ignore lint/performance/noNamespaceImport: 1
import * as SwitchPrimitive from "@radix-ui/react-switch";
import type * as React from "react";

import { cn } from "@/shared/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer group inline-flex h-6.5 w-13 shrink-0 items-center rounded-full border border-transparent px-0.5 shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-success data-[state=unchecked]:bg-foreground/20",
        className
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-7 rounded-full bg-white shadow-black/20 shadow-md ring-0 transition-transform group-active:scale-95 data-[state=checked]:translate-x-[calc(100%-10px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground"
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
