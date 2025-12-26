import { Auth } from "@/features/auth";
import { getI18nInstance } from "@/shared/i18n/i18n";

export default async function LoginPage(props: PageProps<"/[lang]/login">) {
  const lang = (await props.params).lang;
  getI18nInstance(lang);

  return <Auth />;
}
