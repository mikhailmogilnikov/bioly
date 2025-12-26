import { initLingui } from "@/shared/i18n/init-lingui";
import { ScreenSplitLayout } from "@/shared/ui/layouts/screen-split-layout";

export default async function AuthLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const lang = (await params).lang;

  initLingui(lang);

  return (
    <ScreenSplitLayout
      sideContent={<div className="squircle size-full bg-default" />}
      sideWrapperClassName="p-2"
    >
      {children}
    </ScreenSplitLayout>
  );
}
