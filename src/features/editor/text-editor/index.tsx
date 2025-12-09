import { EditorContent, type UseEditorOptions, useEditor } from "@tiptap/react";
import { cn } from "@/shared/lib/utils";
import { FormattingMenu } from "./formatting-menu";

import { getBasicTextEditorExtensions } from "./get-extensions";

export function BasicTextEditor({
  className,
  placeholder,
  ref,
  ...options
}: {
  className?: string;
  placeholder: string;
  ref?: React.RefObject<HTMLDivElement>;
} & UseEditorOptions) {
  const editor = useEditor({
    extensions: getBasicTextEditorExtensions({ placeholder }),
    content: "",
    immediatelyRender: false,
    ...options,
  });

  if (!editor) return null;

  return (
    <>
      <FormattingMenu editor={editor} />
      <EditorContent
        className={cn("ProseMirror tiptap w-full", className)}
        editor={editor}
        ref={ref}
      />
    </>
  );
}
