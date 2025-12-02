import { BentoBlockGalleryFull } from "./gallery-full";
import { BentoBlockGalleryPreview } from "./gallery-preview";

type BentoBlockGalleryProps = {
  isFullscreen: boolean;
};

export const BentoBlockGallery = ({ isFullscreen }: BentoBlockGalleryProps) =>
  isFullscreen ? <BentoBlockGalleryFull /> : <BentoBlockGalleryPreview />;
