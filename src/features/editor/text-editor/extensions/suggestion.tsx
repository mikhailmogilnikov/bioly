import { computePosition, flip, shift } from "@floating-ui/dom";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { type Editor, posToDOMRect, type Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import { CommandsList, type CommandsListRef } from "../commands-list";

type SuggestionProps = {
  editor: Editor;
  range: Range;
};

export const COMMAND_TITLES: Record<string, MessageDescriptor> = {
  heading: msg`Heading`,
  "bullet-list": msg`Bullet List`,
  "numbered-list": msg`Numbered List`,
  blockquote: msg`Blockquote`,
  "code-block": msg`Code Block`,
  separator: msg`Separator`,
};

const updatePosition = (editor: Editor, element: HTMLElement) => {
  const virtualElement = {
    getBoundingClientRect: () =>
      posToDOMRect(
        editor.view,
        editor.state.selection.from,
        editor.state.selection.to
      ),
  };

  computePosition(virtualElement, element, {
    placement: "bottom-start",
    strategy: "absolute",
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = "max-content";
    element.style.position = strategy;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
};

export const suggestion = {
  items: () => {
    // const checkDetailsDepth = () => {
    //   const $from = editor.state.selection.$from;
    //   let depth = 0;
    //   for (let i = $from.depth; i > 0; i--) {
    //     const node = $from.node(i);
    //     if (node && node.type.name === "details") {
    //       depth += 1;
    //     }
    //   }
    //   return depth;
    // };

    return [
      {
        title: "Heading",
        id: "heading",
        command: ({
          editor: currentEditor,
          range,
        }: {
          editor: Editor;
          range: Range;
        }) => {
          currentEditor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 1 })
            .run();
        },
      },
      {
        title: "Bullet List",
        id: "bullet-list",
        command: ({ editor: currentEditor, range }: SuggestionProps) => {
          currentEditor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleBulletList()
            .run();
        },
      },
      {
        title: "Numbered List",
        id: "numbered-list",
        command: ({ editor: currentEditor, range }: SuggestionProps) => {
          currentEditor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleOrderedList()
            .run();
        },
      },
      {
        title: "Blockquote",
        id: "blockquote",
        command: ({ editor: currentEditor, range }: SuggestionProps) => {
          currentEditor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleBlockquote()
            .run();
        },
      },
      {
        title: "Separator",
        id: "separator",
        command: ({ editor: currentEditor, range }: SuggestionProps) => {
          currentEditor
            .chain()
            .focus()
            .deleteRange(range)
            .setHorizontalRule()
            .run();
        },
      },
      // {
      //   title: "Code Block",
      //   id: "code-block",
      //   command: ({ editor: currentEditor, range }: SuggestionProps) => {
      //     currentEditor
      //       .chain()
      //       .focus()
      //       .deleteRange(range)
      //       .toggleCodeBlock()
      //       .run();
      //   },
      // },
      // {
      //   title: "Details",
      //   command: ({ editor, range }: SuggestionProps) => {
      //     // Проверяем уровень вложенности details
      //     const $from = editor.state.selection.$from;
      //     let depth = 0;

      //     // Проходим по всем уровням вложенности от текущей позиции до корня
      //     for (let i = $from.depth; i > 0; i--) {
      //       const node = $from.node(i);
      //       if (node && node.type.name === "details") {
      //         depth++;
      //       }
      //     }

      //     // Если уже достигнут максимальный уровень вложенности (2 уровня), не создаем
      //     if (depth >= 2) {
      //       return;
      //     }

      //     editor.chain().focus().deleteRange(range).setDetails().run();
      //   },
      //   disabled: checkDetailsDepth() >= 2,
      // },
    ];
    // .filter((item) => {
    //   // Фильтруем по запросу
    //   if (!item.title.toLowerCase().startsWith(query.toLowerCase())) {
    //     return false;
    //   }
    //   return true;
    // })
    // .slice(0, 10);
  },

  render: () => {
    let component: ReactRenderer | null = null;

    return {
      onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
        component = new ReactRenderer(CommandsList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        component.element.style.position = "absolute";
        document.body.appendChild(component.element);
        updatePosition(props.editor, component.element);
      },

      onUpdate(props: { editor: Editor; clientRect: DOMRect }) {
        component?.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        if (component?.element) {
          updatePosition(props.editor, component.element);
        }
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === "Escape") {
          component?.destroy();
          component?.element?.remove();
          return true;
        }

        return (component?.ref as CommandsListRef)?.onKeyDown?.(props);
      },

      onExit() {
        component?.destroy();
        component?.element?.remove();
      },
    };
  },
};
