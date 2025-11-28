import { msg } from "@lingui/core/macro";

export const CONFIG = {
  title: "Bioly",
  description: msg`Поделитесь всем важным на одной странице.`,

  domain: "test.com",

  locales: ["en", "ru"],
  defaultLocale: "en",

  BREAKPOINT_MOBILE: "(max-width: 767px)",
} as const;
