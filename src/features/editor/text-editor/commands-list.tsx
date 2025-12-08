import { Trans, useLingui } from "@lingui/react/macro";
import type { Editor, Range } from "@tiptap/core";
import {
  ChevronDown,
  Code2,
  Heading1,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { useEffect, useImperativeHandle, useState } from "react";
import { COMMAND_TITLES } from "./extensions/suggestion";

export type CommandsListRef = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

type CommandsListProps = {
  items: Array<{
    title: string;
    id: string;
    command: (props: { editor: Editor; range: Range }) => void;
    disabled?: boolean;
  }>;
  command: (item: {
    title: string;
    id: string;
    command: (props: { editor: Editor; range: Range }) => void;
    disabled?: boolean;
  }) => void;
  ref?: React.RefObject<CommandsListRef>;
};

export const CommandsList = ({ items, command, ref }: CommandsListProps) => {
  const { i18n } = useLingui();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Находим первый не-disabled элемент
    const firstEnabledIndex = items.findIndex((item) => !item.disabled);

    setSelectedIndex(firstEnabledIndex >= 0 ? firstEnabledIndex : 0);
  }, [items]);

  const selectItem = (index: number) => {
    const item = items[index];
    if (item && !item.disabled) {
      command(item);
    }
  };

  const onKeyDown = ({ event }: { event: KeyboardEvent }) => {
    if (event.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        let newIndex = (prev + items.length - 1) % items.length;
        // Пропускаем disabled элементы
        let attempts = 0;
        while (items[newIndex]?.disabled && attempts < items.length) {
          newIndex = (newIndex + items.length - 1) % items.length;
          attempts += 1;
        }
        return newIndex;
      });
      return true;
    }

    if (event.key === "ArrowDown") {
      setSelectedIndex((prev) => {
        let newIndex = (prev + 1) % items.length;
        // Пропускаем disabled элементы
        let attempts = 0;
        while (items[newIndex]?.disabled && attempts < items.length) {
          newIndex = (newIndex + 1) % items.length;
          attempts += 1;
        }
        return newIndex;
      });
      return true;
    }

    if (event.key === "Enter") {
      selectItem(selectedIndex);
      return true;
    }

    return false;
  };

  useImperativeHandle(ref, () => ({
    onKeyDown,
  }));

  const getIcon = (id: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      heading: <Heading1 size={16} />,
      "bullet-list": <List size={16} />,
      "numbered-list": <ListOrdered size={16} />,
      blockquote: <Quote size={16} />,
      "code-block": <Code2 size={16} />,
      details: <ChevronDown size={16} />,
    };
    return iconMap[id] || null;
  };

  if (items.length === 0) {
    return (
      <div className="relative flex flex-col gap-1 overflow-auto rounded-lg border border-foreground/10 bg-background p-2 shadow-lg">
        <p className="px-3 py-2 text-foreground/60">
          <Trans>No result</Trans>
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-51 flex max-h-[300px] min-w-[200px] flex-col gap-1 overflow-auto rounded-2xl border border-outline bg-background p-2">
      {items.map((item, index) => {
        const isSelected = index === selectedIndex;
        const isDisabled = item.disabled;
        let buttonClassName =
          "flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors";

        if (isDisabled) {
          buttonClassName += " cursor-not-allowed opacity-50";
        } else if (isSelected) {
          buttonClassName += " bg-foreground/10 text-foreground";
        } else {
          buttonClassName +=
            " bg-transparent text-foreground/80 hover:bg-foreground/5";
        }

        return (
          <button
            className={buttonClassName}
            disabled={isDisabled}
            key={item.command.toString()}
            onClick={() => selectItem(index)}
            type="button"
          >
            {getIcon(item.id)}
            <span>{i18n._(COMMAND_TITLES[item.id])}</span>
          </button>
        );
      })}
      <div className="max-w-50 p-1.5">
        <p className="text-foreground/50 text-xs">
          <Trans>
            Tip: you can select fragment of text and apply additional styling to
            it.
          </Trans>
        </p>
      </div>
    </div>
  );
};
