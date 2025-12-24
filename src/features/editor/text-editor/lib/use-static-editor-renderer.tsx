import type { JSONContent } from "@tiptap/react";
import { useMemo } from "react";
import { renderStaticEditor } from "./render-static-editor";

export const useStaticEditorRenderer = (
  jsonContent: JSONContent | null,
  options: { placeholder: string }
) => {
  const { placeholder } = options;

  const output = useMemo(() => {
    return renderStaticEditor(jsonContent, { placeholder });
  }, [jsonContent, placeholder]);

  return output;
};
