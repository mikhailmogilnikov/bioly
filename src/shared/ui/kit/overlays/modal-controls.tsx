import { Trans } from "@lingui/react/macro";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { Slider } from "@/shared/ui/kit/primitives/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export interface ModalDropdownOption<T> {
  label: string;
  value: T;
}

interface ModalDropdownProps<T> {
  isInsideDialog?: boolean;
  label: ReactNode;
  onValueChange: (value: T) => void;
  options: ModalDropdownOption<T>[];
  renderOption?: (option: ModalDropdownOption<T>) => ReactNode;
  renderTrigger?: (value: T, label: string) => ReactNode;
  value: T;
}

export function ModalDropdown<T extends string>({
  value,
  options,
  onValueChange,
  label,
  renderTrigger,
  renderOption,
  isInsideDialog = true,
}: ModalDropdownProps<T>) {
  const currentOption = options.find((o) => o.value === value) ?? options[0];
  const currentLabel = currentOption?.label ?? String(value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 rounded-full bg-default px-4 py-2">
        <ChevronDownIcon className="size-4 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
        {renderTrigger ? (
          renderTrigger(value, currentLabel)
        ) : (
          <p className="font-medium text-base">{currentLabel}</p>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent isInsideDialog={isInsideDialog}>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {options.map((option) => (
          <DropdownMenuItem
            className={cn(option.value === value && "bg-foreground/10")}
            key={option.value}
            onSelect={() => onValueChange(option.value)}
          >
            {renderOption ? renderOption(option) : option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ModalControlRowProps {
  children: ReactNode;
  label: ReactNode;
}

export function ModalControlRow({ label, children }: ModalControlRowProps) {
  return (
    <div className="flex items-center justify-between pr-1">
      <p className="font-medium text-base">{label}</p>
      {children}
    </div>
  );
}

interface ModalSliderProps
  extends Omit<
    React.ComponentProps<typeof Slider>,
    "value" | "onValueChange" | "defaultValue"
  > {
  defaultValue?: number;
  label: ReactNode;
  onValueChange: (value: number) => void;
  value: number;
  valueSuffix?: string;
}

export function ModalSlider({
  label,
  value,
  onValueChange,
  valueSuffix = "",
  className,
  defaultValue,
  ...sliderProps
}: ModalSliderProps) {
  return (
    <div className="squircle-outline flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <p className="font-medium text-base">{label}</p>
        <p className="font-medium text-base opacity-50">
          {value}
          {valueSuffix}{" "}
          {defaultValue && value === defaultValue ? (
            <Trans>(Default)</Trans>
          ) : (
            ""
          )}
        </p>
      </div>
      <Slider
        className={className ?? "mb-1"}
        onValueChange={(v) => onValueChange(v[0] ?? 0)}
        value={[value]}
        {...sliderProps}
      />
    </div>
  );
}
