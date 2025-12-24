import { getI18nInstance } from "@/shared/i18n/i18n";

export default async function ExplorePage(props: PageProps<"/[lang]">) {
  const lang = (await props.params).lang;
  getI18nInstance(lang);

  return <div>Explore</div>;
}
