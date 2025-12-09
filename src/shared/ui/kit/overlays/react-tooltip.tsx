"use client";

// biome-ignore lint/performance/noNamespaceImport: 1
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";

import { cn } from "@/shared/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal container={document.getElementById("portal-root")}>
      <TooltipPrimitive.Content
        className={cn(
          "motion-scale-in-95 motion-opacity-in-0 motion-ease-in-out-cubic motion-duration-120 data-[side=bottom]:-motion-translate-y-in-25 data-[side=left]:motion-translate-x-in-25 data-[side=right]:motion-translate-x-in-25 data-[side=top]:motion-translate-y-in-25 data-[state=closed]:motion-scale-out-95 data-[state=closed]:motion-opacity-out-0 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance rounded-xl bg-default px-3 py-1.5 font-medium text-foreground text-xs",
          className
        )}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-default fill-default" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
