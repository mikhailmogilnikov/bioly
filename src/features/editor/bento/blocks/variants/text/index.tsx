import { useBlockContext } from "../../../grid/ui/block-context";
import type { BentoBlock, BentoBlockType } from "../../model/types";
import { FullscreenTitle } from "./fullscreen-title";

export const BentoBlockText = ({ isFullscreen }: { isFullscreen: boolean }) => (
  <div className="relative flex size-full items-end justify-start px-1">
    {isFullscreen ? <FullscreenTitle /> : <PreviewTitle />}
  </div>
);

const PreviewTitle = () => {
  const { block } = useBlockContext();

  const textBlock = block as BentoBlock<typeof BentoBlockType.TEXT>;

  if (!textBlock) return null;

  return (
    <h3 className="wrap-break-word w-full whitespace-pre-wrap text-left font-bold">
      {textBlock.properties.content ? (
        textBlock.properties.content
      ) : (
        <span className="opacity-50">Type your text here</span>
      )}
    </h3>
  );
};
