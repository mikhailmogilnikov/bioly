import Image from "next/image";
import { useEffect, useState } from "react";
import useCarousel from "@/shared/lib/hooks/use-carousel";
import { GalleryBadge } from "./gallery-badge";

type BentoBlockGalleryPreviewProps = {
  itemId: string;
};

export const BentoBlockGalleryPreview = ({
  itemId,
}: BentoBlockGalleryPreviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const [carouselRef, carouselInstance] = useCarousel({});

  useEffect(() => {
    if (carouselInstance) {
      const handleChange = () => {
        const index = carouselInstance.getPageIndex() + 1;

        setCurrentIndex(index);
      };

      carouselInstance.on("change", handleChange);

      return () => {
        carouselInstance.off("change", handleChange);
      };
    }
  }, [carouselInstance]);

  return (
    <div
      className="relative size-full"
      id={`bento-item-${itemId}-gallery-preview`}
      ref={(ref) => {
        carouselRef(ref);
      }}
    >
      <GalleryBadge
        currentIndex={currentIndex}
        total={carouselInstance?.getSlides().length || 0}
      />
      <div className="f-carousel__slide h-full" data-fancybox="gallery">
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          src="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
        />
      </div>
      <div className="f-carousel__slide h-full" data-fancybox="gallery">
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          src="https://cdn-images.dzcdn.net/images/cover/5f6b11f19edd3114d611cd0556d8eb83/1900x1900-000000-81-0-0.jpg"
        />
      </div>
      <div className="f-carousel__slide h-full" data-fancybox="gallery">
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4f/4f/47/4f4f4733-7c38-a86c-d543-a74bc406ea09/198704489945_Cover.jpg/1200x630bb.jpg"
        />
      </div>
    </div>
  );
};
