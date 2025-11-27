import "@/app/globals.css";
import type { Metadata } from "next";
import { LinguiClientProvider } from "@/shared/i18n/client-provider";
import { allMessages, getI18nInstance } from "@/shared/i18n/i18n";
import { initLingui } from "@/shared/i18n/initLingui";
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
      <body className={"antialiased"}>
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
