"use client";

import type * as React from "react";

import { cn } from "@/shared/lib/utils";

export const inputBaseClasses =
  "h-11 w-full min-w-0 rounded-xl border border-outline bg-default/50 px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-foreground/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-link focus-visible:ring-[3px] focus-visible:ring-link/50 aria-invalid:border-danger aria-invalid:ring-danger/20";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(inputBaseClasses, className)}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
