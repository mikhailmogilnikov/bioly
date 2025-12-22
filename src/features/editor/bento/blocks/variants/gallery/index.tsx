import { BentoBlockGalleryFull } from "./gallery-full";
import { BentoBlockGalleryPreview } from "./gallery-preview";

interface BentoBlockGalleryProps {
  isFullscreen: boolean;
}

export const BentoBlockGallery = ({ isFullscreen }: BentoBlockGalleryProps) =>
  isFullscreen ? <BentoBlockGalleryFull /> : <BentoBlockGalleryPreview />;
