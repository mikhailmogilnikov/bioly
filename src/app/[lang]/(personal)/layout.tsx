import "@/app/css/global.css";
import "@/app/css/fonts.css";

import type { Metadata } from "next";
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

export async function generateMetadata(
  props: LayoutProps<"/[lang]">
): Promise<Metadata> {
  const i18n = getI18nInstance((await props.params).lang);

  return {
    title: CONFIG.title,
    description: i18n._(CONFIG.description),
  };
}

export default async function PersonalLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const lang = (await params).lang;

  initLingui(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/** biome-ignore lint/nursery/noSyncScripts: sync script is required for worklet */}
        <script src="/scripts/init-worklet.js" />

        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&family=Montserrat:ital,wght@0,400..700;1,400..700&family=Oswald:wght@400..700&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />

        <link href="/fonts/open-runde/open-runde.css" rel="stylesheet" />
        <link href="/fonts/gilroy/stylesheet.css" rel="stylesheet" />
      </head>

      <body
        className={cn(
          "theme-dark min-h-screen overflow-x-hidden overflow-y-scroll bg-background text-foreground antialiased"
        )}
      >
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]}
        >
          {children}
          <div className="relative z-10" id="portal-root" />
        </LinguiClientProvider>
      </body>
    </html>
  );
}
