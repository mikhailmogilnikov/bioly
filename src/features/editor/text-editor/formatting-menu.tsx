import { useLingui } from "@lingui/react/macro";
import { type Editor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  BoldIcon,
  CodeIcon,
  Contrast,
  EyeOff,
  ItalicIcon,
  Link2Icon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

type FormattingMenuProps = {
  editor: Editor;
};

export function FormattingMenu({ editor }: FormattingMenuProps) {
  const { t } = useLingui();

  const {
    isBold,
    isItalic,
    isStrikethrough,
    isUnderline,
    isCode,
    isMuted,
    isLink,
    isSpoiler,
  } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrikethrough: ctx.editor.isActive("strike"),
      isUnderline: ctx.editor.isActive("underline"),
      isCode: ctx.editor.isActive("code"),
      isMuted: ctx.editor.isActive("muted"),
      isLink: ctx.editor.isActive("link"),
      isSpoiler: ctx.editor.isActive("spoiler"),
    }),
  });

  const handleLinkClick = () => {
    const prevLink = editor.getAttributes("link")?.href;

    if (prevLink) {
      editor.chain().focus().unsetLink().run();
    } else {
      // biome-ignore lint/suspicious/noAlert: TODO: Add a link input component
      const url = prompt("Enter the URL for the link");

      if (url) {
        editor.chain().focus().toggleLink({ href: url }).run();
      }
    }
  };

  const iconClass = "size-4 shrink-0";

  const menuItems = [
    {
      label: t`Bold`,
      icon: <BoldIcon className={iconClass} />,
      isActive: isBold,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: t`Italic`,
      icon: <ItalicIcon className={iconClass} />,
      isActive: isItalic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: t`Strikethrough`,
      icon: <StrikethroughIcon className={iconClass} />,
      isActive: isStrikethrough,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: t`Underline`,
      icon: <UnderlineIcon className={iconClass} />,
      isActive: isUnderline,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      label: t`Code`,
      icon: <CodeIcon className={iconClass} />,
      isActive: isCode,
      onClick: () => editor.chain().focus().toggleCode().run(),
    },
    {
      label: t`Muted`,
      icon: <Contrast className={iconClass} />,
      isActive: isMuted,
      onClick: () => editor.chain().focus().toggleMark("muted").run(),
    },
    {
      label: t`Link`,
      icon: <Link2Icon className={iconClass} />,
      isActive: isLink,
      onClick: handleLinkClick,
    },
    {
      label: t`Spoiler`,
      icon: <EyeOff className={iconClass} />,
      isActive: isSpoiler,
      // @ts-expect-error - toggleSpoiler is not typed correctly
      onClick: () => editor.chain().focus().toggleSpoiler().run(),
    },
  ];

  return (
    <BubbleMenu
      className="z-10 grid grid-cols-4 gap-1 rounded-lg border border-outline bg-background p-1"
      editor={editor}
      options={{ placement: "top" }}
    >
      {menuItems.map(({ label, icon, isActive, onClick }) => (
        <button
          aria-label={label}
          className={cn(
            "flex size-7 shrink-0 items-center justify-center gap-2 rounded-lg hover:bg-foreground/10",
            {
              "bg-foreground/20": isActive,
            }
          )}
          key={label}
          onClick={onClick}
          type="button"
        >
          {icon}
        </button>
      ))}
    </BubbleMenu>
  );
}
