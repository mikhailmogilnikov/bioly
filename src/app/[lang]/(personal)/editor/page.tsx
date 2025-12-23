import "@/app/css/bento.css";
import "@/app/css/fancybox.css";
import "@/app/css/text-editor.dynamic.css";

import { getI18nInstance } from "@/shared/i18n/i18n";
import { DynamicEditor } from "./dynamic-editor";

export default async function EditorPage(props: PageProps<"/[lang]/editor">) {
  const lang = (await props.params).lang;
  getI18nInstance(lang);

  return <DynamicEditor />;
}
