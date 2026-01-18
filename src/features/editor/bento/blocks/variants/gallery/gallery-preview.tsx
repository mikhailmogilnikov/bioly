import Image from "next/image";
import { useEffect, useState } from "react";
import useCarousel from "@/shared/lib/hooks/use-carousel";
import { useBlockContext } from "../../../grid/ui/block-context";
import { GalleryBadge } from "./gallery-badge";

export const BentoBlockGalleryPreview = () => {
  const { id } = useBlockContext();
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
    // <Spoiler
    //   className="size-full"
    //   revealOn="click"
    //   rootClassName="size-full"
    //   spoilerFallback={
    //     <Image
    //       alt="Sample image #1"
    //       className="size-full object-cover opacity-30 blur-xl"
    //       fill
    //       src="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
    //     />
    //   }
    // >
    <div
      className="relative size-full"
      id={`bento-item-${id}-gallery-preview`}
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
          fill
          src="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
        />
      </div>
      <div className="f-carousel__slide h-full" data-fancybox="gallery">
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          fill
          src="https://cdn-images.dzcdn.net/images/cover/5f6b11f19edd3114d611cd0556d8eb83/1900x1900-000000-81-0-0.jpg"
        />
      </div>
      <div className="f-carousel__slide h-full" data-fancybox="gallery">
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          fill
          src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4f/4f/47/4f4f4733-7c38-a86c-d543-a74bc406ea09/198704489945_Cover.jpg/1200x630bb.jpg"
        />
      </div>
      <div className="f-carousel__slide h-full" data-fancybox="gallery">
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          fill
          src="https://www.hdwallpapers.in/download/dark__black-1080x1920.jpg"
        />
      </div>
    </div>
    // </Spoiler>
  );
};
