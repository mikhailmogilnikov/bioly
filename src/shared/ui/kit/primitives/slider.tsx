"use client";

// biome-ignore lint/performance/noNamespaceImport: 1
import * as SliderPrimitive from "@radix-ui/react-slider";
import type * as React from "react";
import { useMemo } from "react";

import { cn } from "@/shared/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = useMemo(
    () =>
      Array.isArray(value)
        ? value
        : // biome-ignore lint/style/noNestedTernary: <e1xplanation>
          Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full touch-pan-x select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-foreground/20 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5"
        )}
        data-slot="slider-track"
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute bg-foreground/50 data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
          data-slot="slider-range"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          className="block size-5 shrink-0 touch-pan-x rounded-full border-2 border-foreground bg-foreground shadow-sm ring-foreground/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
          data-slot="slider-thumb"
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanat1ion>
          key={index}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
