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
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "qwewqewq",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "213",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "orderedList",
        attrs: {
          start: 1,
          type: null,
        },
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "3213132",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "21321",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "231123321213",
              },
            ],
          },
        ],
      },
      {
        type: "horizontalRule",
      },
      {
        type: "details",
        content: [
          {
            type: "detailsSummary",
            content: [
              {
                type: "text",
                text: "1232132131",
              },
            ],
          },
          {
            type: "detailsContent",
            content: [
              {
                type: "paragraph",
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
    <main className="mx-auto w-full max-w-116 px-4 lg:px-0">
      <div className="ProseMirror tiptap-static w-full text-left">{output}</div>
    </main>
  );
}
