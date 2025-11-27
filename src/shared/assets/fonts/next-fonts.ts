import {
  Caveat,
  Inter,
  JetBrains_Mono,
  Montserrat,
  Oswald,
  Vollkorn,
} from "next/font/google";
import localFont from "next/font/local";
import { FONTS, type Font } from "@/shared/domain/theme";

// GOOGLE FONTS

export const interFont = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const montserratFont = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const oswaldFont = Oswald({
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

export const caveatFont = Caveat({
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

export const jetbrainsMonoFont = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const vollkornFont = Vollkorn({
  variable: "--font-vollkorn",
  weight: ["400", "500", "600", "700"],
});

// LOCAL FONTS

export const openRundeFont = localFont({
  src: [
    {
      path: "./open-runde/OpenRunde-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./open-runde/OpenRunde-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./open-runde/OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./open-runde/OpenRunde-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-runde",
  preload: false,
});

export const gilroyFont = localFont({
  src: [
    {
      path: "./gilroy/Gilroy-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./gilroy/Gilroy-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  preload: false,
});

export const FONTS_MAP: Record<Font, typeof interFont> = {
  [FONTS.INTER]: interFont,
  [FONTS.OPEN_RUNDE]: openRundeFont,
  [FONTS.GILROY]: gilroyFont,
  [FONTS.VOLKORN]: vollkornFont,
  [FONTS.JETBRAINS_MONO]: jetbrainsMonoFont,
  [FONTS.MONTSERRAT]: montserratFont,
  [FONTS.OSWALD]: oswaldFont,
  [FONTS.CAVEAT]: caveatFont,
} as const;
