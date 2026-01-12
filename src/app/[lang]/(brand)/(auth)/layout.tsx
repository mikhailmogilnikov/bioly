import { initLingui } from "@/shared/i18n/init-lingui";
import { ScreenSplitLayout } from "@/shared/ui/layouts/screen-split-layout";
import { LangPicker } from "@/shared/ui/utils/lang-picker";

export default async function AuthLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const lang = (await params).lang;

  initLingui(lang);

  return (
    <ScreenSplitLayout
      childrenWrapperClassName="relative"
      sideContent={<div className="squircle size-full bg-default" />}
      sideWrapperClassName="p-2"
    >
      <LangPicker className="absolute top-8 right-4 h-min w-min text-lg max-md:py-1.5 md:bottom-2 md:left-1/2 md:-translate-x-1/2" />
      {children}
    </ScreenSplitLayout>
  );
}
