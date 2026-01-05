"use client";

import { useLingui } from "@lingui/react/macro";
import { ChevronDownIcon } from "lucide-react";
import { LOCALES_DATA, type Locale } from "@/shared/i18n/locales-data";
import { cn } from "@/shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../kit/overlays/dropdown-menu";

interface LangPickerProps {
  className?: string;
}

export function LangPicker({ className }: LangPickerProps) {
  const { i18n, t } = useLingui();

  const handleLocaleChange = (locale: Locale) => {
    i18n.activate(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t`Change language`}
        className={cn(
          "group flex items-center gap-2 rounded-full bg-default py-1 pr-4 pl-3",
          className
        )}
      >
        <ChevronDownIcon className="size-4 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
        <p>{LOCALES_DATA[i18n.locale as Locale].flag}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-default">
        {Object.entries(LOCALES_DATA).map(([locale, data]) => (
          <DropdownMenuItem
            className="py-1 text-sm"
            key={locale}
            onSelect={() => handleLocaleChange(locale as Locale)}
          >
            <p>{data.flag}</p>
            <p>{data.name}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
