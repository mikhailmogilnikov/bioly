import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/shared/i18n/i18n";

export default async function NotFoundPage(props: PageProps<"/[lang]">) {
  const lang = (await props.params).lang;
  const i18n = getI18nInstance(lang);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {i18n._(msg`Page not found`)}
    </div>
  );
}
