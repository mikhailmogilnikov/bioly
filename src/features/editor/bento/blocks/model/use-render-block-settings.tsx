import { useCallback } from "react";
import { findBentoItem } from "@/features/editor/profile/find-bento-item";
import { useProfile } from "@/features/editor/profile/use-profile";
import { BentoBlockGalleryOptions } from "../variants/gallery/options";
import { BentoBlockLinkOptions } from "../variants/link/options";
import { BentoBlockMapOptions } from "../variants/map/options";
import { BentoBlockTextOptions } from "../variants/text/options";
import { BentoBlockType } from "./types";

export const useRenderBlockSettings = () => {
  const renderBlockSettings = useCallback((blockId: string) => {
    const block = findBentoItem(blockId, useProfile.getState());

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
  }, []);

  return {
    renderBlockSettings,
  };
};
