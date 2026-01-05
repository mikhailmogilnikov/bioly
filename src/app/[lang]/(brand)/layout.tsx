import "@/app/css/global.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LinguiClientProvider } from "@/shared/i18n/client-provider";
import { allMessages, getI18nInstance } from "@/shared/i18n/i18n";
import { initLingui } from "@/shared/i18n/init-lingui";
import { cn } from "@/shared/lib/utils";
import { CONFIG } from "@/shared/model/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return CONFIG.locales.map((lang) => ({
    lang,
  }));
}

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "auto",
};

export async function generateMetadata(
  props: LayoutProps<"/[lang]">
): Promise<Metadata> {
  const i18n = getI18nInstance((await props.params).lang);

  return {
    title: CONFIG.title,
    description: i18n._(CONFIG.description),
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const lang = (await params).lang;

  initLingui(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script src="/scripts/init-worklet.js" />
      </head>
      <body
        className={cn(
          "theme-light overflow-x-hidden bg-background text-foreground antialiased",
          brandFont.className
        )}
        style={
          {
            "--radius": "24px",
            "--border-width": "1px",
          } as React.CSSProperties
        }
      >
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]}
        >
          {children}
        </LinguiClientProvider>
      </body>
    </html>
  );
}

const brandFont = localFont({
  src: [
    {
      path: "../../../../public/fonts/open-runde/OpenRunde-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/open-runde/OpenRunde-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/open-runde/OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/open-runde/OpenRunde-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-runde",
});
