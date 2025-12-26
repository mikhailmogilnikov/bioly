import Link from "next/link";
import { getI18nInstance } from "@/shared/i18n/i18n";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const lang = (await props.params).lang;
  getI18nInstance(lang);

  return (
    <div className="p-4">
      <Link href="/login">Login</Link>
    </div>
  );
}
