import { Landing } from "@/features/landing";
import { getI18nInstance } from "@/shared/i18n/i18n";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const lang = (await props.params).lang;
  getI18nInstance(lang);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-4">
      <Landing />
    </div>
  );
}
