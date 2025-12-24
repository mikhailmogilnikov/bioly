"use client";

import { renderStaticEditor } from "@/features/editor/text-editor/lib/render-static-editor";

export function UserContent() {
  const jsonContent = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "spoiler",
            attrs: {
              isStatic: false,
            },
            content: [
              {
                type: "text",
                text: "Test",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "test",
          },
        ],
      },
    ],
  };

  const output = renderStaticEditor(jsonContent, {
    placeholder: "Hello, world!",
  });

  return (
    <div className="ProseMirror tiptap-static w-full text-left">{output}</div>
  );
}
