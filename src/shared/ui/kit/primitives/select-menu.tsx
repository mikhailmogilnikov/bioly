"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/overlays/dropdown-menu";

interface SelectMenuProps<T extends string> {
  value: T;
  options: readonly T[];
  onSelect: (value: T) => void;
  labels?: Partial<Record<T, string>>;
  className?: string;
}

function SelectMenu<T extends string>({
  value,
  options,
  onSelect,
  labels,
  className,
}: SelectMenuProps<T>) {
  const getLabel = (option: T) => labels?.[option] ?? option;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group flex h-10 w-full items-center justify-between gap-2 rounded-full bg-default px-4 py-2",
          className
        )}
      >
        <p className="font-medium text-sm first-letter:capitalize">
          {getLabel(value)}
        </p>
        <ChevronDownIcon className="size-4 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8}>
        {options.map((option) => (
          <DropdownMenuItem
            className="justify-between"
            key={option}
            onSelect={() => onSelect(option)}
          >
            <p className="font-medium text-sm first-letter:capitalize">
              {getLabel(option)}
            </p>
            {value === option && <CheckIcon className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SelectMenu };
export type { SelectMenuProps };
