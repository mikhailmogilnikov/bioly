import { msg } from "@lingui/core/macro";

export const CONFIG = {
  title: "Bioly",
  description: msg`Share everything important on one beautiful page.`,

  domain: process.env.NEXT_PUBLIC_DOMAIN || "",

  locales: ["en", "ru"],
  defaultLocale: "en",

  BREAKPOINT_MOBILE: "(max-width: 767px)",
} as const;
