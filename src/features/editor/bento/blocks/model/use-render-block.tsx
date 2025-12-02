import { useCallback } from "react";
import { findBentoItem } from "@/features/editor/profile/find-bento-item";
import { useProfile } from "@/features/editor/profile/use-profile";
import { BentoBlockGallery } from "../variants/gallery";
import { BentoBlockText } from "../variants/text";
import { BentoBlockType } from "./types";

export const useRenderBlock = () => {
  const renderBlock = useCallback(
    (blockId: string, { isFullscreen }: { isFullscreen: boolean }) => {
      const block = findBentoItem(blockId, useProfile.getState());

      if (!block) return null;

      switch (block.type) {
        case BentoBlockType.GALLERY:
          return (
            <BentoBlockGallery isFullscreen={isFullscreen} itemId={blockId} />
          );
        // case BentoBlockType.LINK:
        //   return (
        //     <BentoBlockLink isFullscreen={isFullscreen} itemId={blockId} />
        //   );
        case BentoBlockType.TEXT:
          return (
            <BentoBlockText isFullscreen={isFullscreen} itemId={blockId} />
          );
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
