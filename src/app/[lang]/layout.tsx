import "@/app/css/global.css";

import type { Metadata } from "next";
import { openRundeFont } from "@/shared/assets/fonts/next-fonts";
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

export default async function RootLayout({
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
      </head>
      <body
        className={cn(
          "theme-dark min-h-screen overflow-y-scroll bg-background text-foreground antialiased",
          openRundeFont.className
        )}
        // TODO: temporal styles for worklet
        style={
          {
            "--smooth": "0.85",
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
