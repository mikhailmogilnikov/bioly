"use client";

import { Menu } from "bloom-menu";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface SelectMenuProps<T extends string> {
  value: T;
  options: readonly T[];
  onSelect: (value: T) => void;
  labels?: Partial<Record<T, string>>;
  className?: string;
  menuWidth?: number;
}

const itemClass =
  "flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-foreground/10 justify-between";

function SelectMenu<T extends string>({
  value,
  options,
  onSelect,
  labels,
  className,
  menuWidth = 160,
}: SelectMenuProps<T>) {
  const getLabel = (option: T) => labels?.[option] ?? option;

  return (
    <Menu.Root anchor="start" direction="bottom">
      <Menu.Container
        buttonRadius={20}
        buttonSize={{ width: 206, height: 40 }}
        className={cn("bg-default shadow-lg ring-1 ring-black/5", className)}
        menuRadius={12}
        menuWidth={menuWidth}
      >
        <Menu.Trigger>
          <span className="flex w-full items-center justify-between gap-2 px-4 py-2">
            <p className="font-medium text-sm first-letter:capitalize">
              {getLabel(value)}
            </p>
            <ChevronDownIcon className="size-4 opacity-50" />
          </span>
        </Menu.Trigger>
        <Menu.Content className="p-2">
          {options.map((option) => (
            <Menu.Item
              className={itemClass}
              key={option}
              onSelect={() => onSelect(option)}
            >
              <p className="font-medium text-sm first-letter:capitalize">
                {getLabel(option)}
              </p>
              {value === option && <CheckIcon className="size-4" />}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Container>
    </Menu.Root>
  );
}

export { SelectMenu };
export type { SelectMenuProps };
