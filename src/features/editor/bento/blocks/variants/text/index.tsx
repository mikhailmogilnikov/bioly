import { useProfile } from "@/features/editor/profile/use-profile";
import type { BentoBlock, BentoBlockType } from "../../model/types";
import { FullscreenTitle } from "./fullscreen-title";

type BentoBlockTextProps = {
  itemId: string;
  isFullscreen: boolean;
};

export const BentoBlockText = ({
  itemId,
  isFullscreen,
}: BentoBlockTextProps) => (
  <div className="relative flex size-full items-end justify-start px-1">
    {isFullscreen ? (
      <FullscreenTitle itemId={itemId} />
    ) : (
      <PreviewTitle itemId={itemId} />
    )}
  </div>
);

const PreviewTitle = ({ itemId }: { itemId: string }) => {
  const bento = useProfile((state) => state.profile.bento);

  const bentoItem = bento.find((item) => item.id === itemId) as BentoBlock<
    typeof BentoBlockType.TEXT
  >;

  if (!bentoItem) return null;

  return (
    <h3 className="wrap-break-word w-full whitespace-pre-wrap text-left font-bold">
      {bentoItem.properties.content ? (
        bentoItem.properties.content
      ) : (
        <span className="opacity-50">Type your text here</span>
      )}
    </h3>
  );
};
