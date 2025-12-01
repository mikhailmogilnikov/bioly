import { BentoBlockGalleryFull } from "./gallery-full";
import { BentoBlockGalleryPreview } from "./gallery-preview";

type BentoBlockGalleryProps = {
  itemId: string;
  isFullscreen: boolean;
};

export const BentoBlockGallery = ({
  itemId,
  isFullscreen,
}: BentoBlockGalleryProps) =>
  isFullscreen ? (
    <BentoBlockGalleryFull itemId={itemId} />
  ) : (
    <BentoBlockGalleryPreview itemId={itemId} />
  );
