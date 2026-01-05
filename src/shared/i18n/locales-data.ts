import type { CONFIG } from "../model/config";

export type Locale = (typeof CONFIG.locales)[number];

export const LOCALES_DATA: Record<
  Locale,
  {
    name: string;
    flag: string;
  }
> = {
  en: {
    name: "English",
    flag: "🇺🇸",
  },
  ru: {
    name: "Русский",
    flag: "🇷🇺",
  },
} as const;
