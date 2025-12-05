/** biome-ignore-all lint/suspicious/noExplicitAny: tiptap types are not typed */
import { Mark } from "@tiptap/core";

export const Muted = Mark.create({
  name: "muted",

  parseHTML() {
    return [
      {
        tag: 'span[data-muted="true"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", { ...HTMLAttributes, "data-muted": "true" }, 0];
  },

  addCommands() {
    return {
      toggleMuted:
        () =>
        ({ commands }: any) =>
          commands.toggleMark(this.name),
    } as any;
  },
});
