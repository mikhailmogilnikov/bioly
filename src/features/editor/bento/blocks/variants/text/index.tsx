import { Trans, useLingui } from "@lingui/react/macro";
import { renderToReactElement } from "@tiptap/static-renderer";
import { useMemo } from "react";
import { getBasicTextEditorExtensions } from "@/features/editor/text-editor/lib/get-extensions";
import { Spoiler } from "@/shared/ui/utils/spoiler";
import { useBlockContext } from "../../../grid/ui/block-context";
import type { BentoBlock, BentoBlockType } from "../../model/types";
import { FullscreenTitle } from "./fullscreen-text";

export const BentoBlockText = ({ isFullscreen }: { isFullscreen: boolean }) => (
  <div className="relative flex size-full items-end justify-start px-1">
    {isFullscreen ? <FullscreenTitle /> : <PreviewTitle />}
  </div>
);

const PreviewTitle = () => {
  const { t } = useLingui();
  const { block } = useBlockContext();

  const textBlock = block as BentoBlock<typeof BentoBlockType.TEXT>;

  const output = useMemo(() => {
    if (!textBlock.properties.content) return null;

    console.log(textBlock.properties.content);

    return renderToReactElement({
      content: textBlock.properties.content,
      extensions: getBasicTextEditorExtensions({
        placeholder: t`Type your text here`,
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
        },
      },
    });
  }, [textBlock.properties.content, t]);

  if (!output)
    return (
      <p className="text-left text-foreground/50">
        <Trans>Type text here or "/" to open the commands</Trans>
      </p>
    );

  return (
    <div className="ProseMirror tiptap tiptap-static w-full text-left">
      {output}
    </div>
  );
};
