import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useCarousel from "@/shared/lib/hooks/use-carousel";
import useFancybox from "@/shared/lib/hooks/use-fancybox";
import { GalleryBadge } from "./gallery-badge";

type BentoBlockGalleryFullProps = {
  itemId: string;
};

export const BentoBlockGalleryFull = ({
  itemId,
}: BentoBlockGalleryFullProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const pointerDownRef = useRef(false);

  const [fancyboxRef] = useFancybox({
    Carousel: {
      Arrows: {},
      Toolbar: {
        display: {
          left: [],
          right: ["close"],
        },
      },
    },
  });

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
      id={`bento-item-${itemId}-gallery-full`}
      onPointerDown={() => {
        pointerDownRef.current = true;
      }}
      onPointerLeave={() => {
        if (pointerDownRef.current) {
          // onBlock();
          pointerDownRef.current = false;
        }
      }}
      onPointerUp={() => {
        // onUnblock();
        pointerDownRef.current = false;
      }}
      ref={(ref) => {
        carouselRef(ref);
        fancyboxRef?.(ref);
      }}
    >
      <GalleryBadge
        currentIndex={currentIndex}
        total={carouselInstance?.getSlides().length || 0}
      />
      <a
        className="f-carousel__slide h-full"
        data-fancybox="gallery"
        href="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
      >
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          fill
          src="https://i.scdn.co/image/ab67616d0000b27398d711627751989d1ae8b0fb"
        />
      </a>
      <a
        className="f-carousel__slide h-full"
        data-fancybox="gallery"
        href="https://cdn-images.dzcdn.net/images/cover/5f6b11f19edd3114d611cd0556d8eb83/1900x1900-000000-81-0-0.jpg"
      >
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          fill
          src="https://cdn-images.dzcdn.net/images/cover/5f6b11f19edd3114d611cd0556d8eb83/1900x1900-000000-81-0-0.jpg"
        />
      </a>
      <a
        className="f-carousel__slide h-full"
        data-fancybox="gallery"
        href="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4f/4f/47/4f4f4733-7c38-a86c-d543-a74bc406ea09/198704489945_Cover.jpg/1200x630bb.jpg"
      >
        <Image
          alt="Sample image #1"
          className="size-full object-cover"
          fill
          src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4f/4f/47/4f4f4733-7c38-a86c-d543-a74bc406ea09/198704489945_Cover.jpg/1200x630bb.jpg"
        />
      </a>
    </div>
  );
};
