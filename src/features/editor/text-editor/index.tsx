import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, type UseEditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/shared/lib/utils";
import { Commands } from "./extensions/commands";
import { Muted } from "./extensions/muted";
import { suggestion } from "./extensions/suggestion";
import { FormattingMenu } from "./formatting-menu";

export const getBasicTextEditorExtensions = (
  options:
    | {
        placeholder?: string;
      }
    | undefined
) => {
  const { placeholder } = options ?? {};

  return [
    StarterKit.configure({
      trailingNode: false,
    }),
    Muted,
    Typography,
    ...(placeholder ? [Placeholder.configure({ placeholder })] : []),
    Commands.configure({
      suggestion,
    }),
  ];
};

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
