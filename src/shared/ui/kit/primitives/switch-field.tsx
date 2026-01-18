"use client";

import { type ReactNode, useId } from "react";

import { cn } from "@/shared/lib/utils";

import { Label } from "./label";
import { Switch } from "./switch";

type SwitchFieldProps = Omit<
  React.ComponentProps<typeof Switch>,
  "id" | "children"
> & {
  label: ReactNode;
  id?: string;
  className?: string;
  labelClassName?: string;
};

function SwitchField({
  label,
  id,
  className,
  labelClassName,
  ...switchProps
}: SwitchFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div
      className={cn("flex items-center justify-between gap-3 py-1", className)}
      data-slot="switch-field"
    >
      <Label
        className={cn("h-full w-full leading-snug", labelClassName)}
        htmlFor={fieldId}
      >
        {label}
      </Label>
      <Switch id={fieldId} {...switchProps} />
    </div>
  );
}

export { SwitchField };
export type { SwitchFieldProps };
