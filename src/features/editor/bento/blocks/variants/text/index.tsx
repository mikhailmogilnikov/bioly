import { Trans, useLingui } from "@lingui/react/macro";
import { useStaticEditorRenderer } from "@/features/editor/text-editor/lib/use-static-editor-renderer";
import { useBlockContext } from "../../../grid/ui/block-context";
import { FullscreenTitle } from "./fullscreen-text";

export const BentoBlockText = ({ isFullscreen }: { isFullscreen: boolean }) => (
  <div className="relative flex size-full items-end justify-start px-1">
    {isFullscreen ? <FullscreenTitle /> : <PreviewTitle />}
  </div>
);

const PreviewTitle = () => {
  const { t } = useLingui();
  const { block } = useBlockContext<"text">();

  const output = useStaticEditorRenderer(block?.properties?.content ?? null, {
    placeholder: t`Type your text here`,
  });

  if (!output)
    return (
      <p className="text-left text-foreground/50">
        <Trans>Type your text here</Trans>
      </p>
    );

  return (
    <div className="ProseMirror tiptap-static w-full text-left">{output}</div>
  );
};
