import type { JSONContent } from "@tiptap/react";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { Spoiler } from "@/shared/ui/utils/spoiler";
import { getBasicTextEditorExtensions } from "./get-extensions";

export const renderStaticEditor = (
  jsonContent: JSONContent | null,
  { placeholder }: { placeholder: string }
) => {
  if (!jsonContent) return null;

  return renderToReactElement({
    content: jsonContent,
    extensions: getBasicTextEditorExtensions({
      placeholder,
      isStatic: true,
    }),
    options: {
      nodeMapping: {
        paragraph: ({ children }) => {
          if (!children || (Array.isArray(children) && children.length === 0))
            return (
              <p>
                <br className="ProseMirror-trailingBreak" />
              </p>
            );

          return <p>{children}</p>;
        },
        heading: ({ children, node }) => {
          const level = node.attrs.level as 1 | 2 | 3 | 4 | 5 | 6;
          const Heading = `h${level}`;

          if (!children || (Array.isArray(children) && children.length === 0))
            return (
              // @ts-expect-error - Heading is a valid React component
              <Heading>
                <br className="ProseMirror-trailingBreak" />
              </Heading>
            );

          // @ts-expect-error - Heading is a valid React component
          return <Heading>{children}</Heading>;
        },
        spoiler: ({ children }) => (
          <Spoiler defaultHidden revealOn="click">
            {children}
          </Spoiler>
        ),
        details: ({ children }) => (
          <details className="details" suppressHydrationWarning>
            {children}
          </details>
        ),
      },
    },
  });
};
