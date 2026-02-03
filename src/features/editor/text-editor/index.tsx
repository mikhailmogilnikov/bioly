import { EditorContent, type UseEditorOptions, useEditor } from "@tiptap/react";
import type { components } from "@/shared/api/schema/generated";
import { cn } from "@/shared/lib/utils";
import { FormattingMenu } from "./formatting-menu";
import { getBasicTextEditorExtensions } from "./lib/get-extensions";

export function BasicTextEditor({
  className,
  placeholder,
  ref,
  isStatic = false,
  content,
  ...options
}: {
  className?: string;
  placeholder: string;
  ref?: React.RefObject<HTMLDivElement>;
  isStatic?: boolean;
  content?: components["schemas"]["JSONContent"] | null;
} & UseEditorOptions) {
  const editor = useEditor({
    extensions: getBasicTextEditorExtensions({ placeholder, isStatic }),
    content: content ?? "",
    immediatelyRender: false,
    ...options,
  });

  if (!editor) return null;

  return (
    <>
      <FormattingMenu editor={editor} />
      <EditorContent
        className={cn("ProseMirror w-full", className)}
        editor={editor}
        ref={ref}
      />
    </>
  );
}
