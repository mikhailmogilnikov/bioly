import { useCallback } from "react";
import { useBlockContext } from "../../grid/ui/block-context";
import { BentoBlockGalleryOptions } from "../variants/gallery/options";
import { BentoBlockLinkOptions } from "../variants/link/options";
import { BentoBlockMapOptions } from "../variants/map/options";
import { BentoBlockTextOptions } from "../variants/text/options";
import { BentoBlockType } from "./types";

export const useRenderBlockSettings = () => {
  const { block } = useBlockContext();

  const renderBlockSettings = useCallback(() => {
    if (!block) return null;

    switch (block.type) {
      case BentoBlockType.GALLERY:
        return <BentoBlockGalleryOptions />;
      case BentoBlockType.TEXT:
        return <BentoBlockTextOptions />;
      case BentoBlockType.LINK:
        return <BentoBlockLinkOptions />;
      case BentoBlockType.MAP:
        return <BentoBlockMapOptions />;
      default:
        return null;
    }
  }, [block]);

  return {
    renderBlockSettings,
  };
};
