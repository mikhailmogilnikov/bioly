import { useCallback } from "react";
import { findBentoItem } from "@/features/editor/profile/find-bento-item";
import { useProfile } from "@/features/editor/profile/use-profile";
import { BentoBlockGallery } from "../variants/gallery";
import { BentoBlockLink } from "../variants/link";
import { BentoBlockText } from "../variants/text";
import { BentoBlockType } from "./types";

export const useRenderBlock = () => {
  const renderBlock = useCallback(
    (blockId: string, { isFullscreen }: { isFullscreen: boolean }) => {
      const block = findBentoItem(blockId, useProfile.getState());

      if (!block) return null;

      switch (block.type) {
        case BentoBlockType.GALLERY:
          return <BentoBlockGallery isFullscreen={isFullscreen} />;
        case BentoBlockType.LINK:
          return <BentoBlockLink />;
        case BentoBlockType.TEXT:
          return <BentoBlockText isFullscreen={isFullscreen} />;
        default:
          return null;
      }
    },
    []
  );

  return {
    renderBlock,
  };
};
