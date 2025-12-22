import { type CommandProps, Node, type RawCommands } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { SpoilerNodeView } from "@/shared/ui/utils/spoiler/spoiler-node-view";

interface SpoilerOptions {
  isStatic?: boolean;
}

export const Spoiler = Node.create<SpoilerOptions>({
  name: "spoiler",
  group: "inline",
  inline: true,
  content: "inline*",
  addAttributes() {
    return {
      isStatic: {
        default: false,
        parseHTML: (element) =>
          element.getAttribute("data-spoiler-static") === "true",
        renderHTML: (attributes) => ({
          "data-spoiler-static": attributes.isStatic ? "true" : undefined,
        }),
      },
    };
  },
  marks: "",
  selectable: false,
  draggable: false,

  addOptions() {
    return {
      isStatic: false,
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-spoiler-node="true"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const className = ["tiptap-spoiler-node", HTMLAttributes.class]
      .filter(Boolean)
      .join(" ");

    return [
      "span",
      {
        ...HTMLAttributes,
        "data-spoiler-node": "true",
        class: className,
      },
      0,
    ];
  },

  addCommands() {
    return {
      toggleSpoiler:
        () =>
        ({ state, dispatch }: CommandProps) => {
          const { selection, tr, schema } = state;
          const { from, to, empty } = selection;
          const type = schema.nodes[this.name];

          if (!type || empty) return false;

          let inSpoiler = false;
          state.doc.nodesBetween(from, to, (node) => {
            const pmNode = node as { type?: unknown };
            if (pmNode.type === type) inSpoiler = true;
          });

          if (inSpoiler) {
            const lifted = tr;
            state.doc.nodesBetween(from, to, (node, pos: number) => {
              const pmNode = node as {
                type?: unknown;
                nodeSize?: number;
                content?: unknown;
              };
              if (pmNode.type !== type || typeof pmNode.nodeSize !== "number")
                return;
              const start = pos;
              const end = pos + pmNode.nodeSize;
              lifted.replaceWith(start, end, pmNode.content as never);
            });
            if (dispatch) dispatch(lifted);
            return true;
          }

          const slice = tr.doc.slice(from, to);
          tr.replaceRangeWith(
            from,
            to,
            type.create({ isStatic: this.options.isStatic }, slice.content)
          );
          if (dispatch) dispatch(tr);
          return true;
        },
    } as Partial<RawCommands>;
  },

  addNodeView() {
    return ReactNodeViewRenderer(SpoilerNodeView);
  },
});
