import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/shared/i18n/i18n";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const lang = (await props.params).lang;
  const i18n = getI18nInstance(lang);

  return <div>{i18n._(msg`Домашняя страница`)}</div>;
}
