import { useLingui } from "@lingui/react/macro";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/shared/lib/utils";
import { Muted } from "./extensions/muted";
import { FormattingMenu } from "./formatting-menu";

export function BasicTextEditor({ className }: { className?: string }) {
  const { t } = useLingui();

  const extensions = [
    StarterKit,
    Muted,
    Placeholder.configure({
      placeholder: t`Add bio... Type "/" for commands.`,
    }),
  ];

  const editor = useEditor({
    extensions,
    content: "",
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <>
      <FormattingMenu editor={editor} />
      <EditorContent
        className={cn("ProseMirror tiptap w-full", className)}
        editor={editor}
      />
    </>
  );
}
