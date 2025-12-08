// TODO: TEMPORAL

import {
  type BentoBlock,
  BentoBlockType,
  type BentoBlockTypeKey,
} from "./types";

export const generateNewBentoItemDefaults = (
  order: number,
  type: BentoBlockTypeKey
) => {
  const id = Math.random().toString(36).substring(2, 15);

  const defaults: Record<BentoBlockTypeKey, BentoBlock<BentoBlockTypeKey>> = {
    [BentoBlockType.GALLERY]: {
      id,
      size: "2x2",
      order,
      style: "plain",
      type: BentoBlockType.GALLERY,
      properties: {
        media: [],
      },
    },
    [BentoBlockType.TEXT]: {
      id,
      size: "dynamic",
      order,
      style: "transparent",
      type: BentoBlockType.TEXT,
      properties: {
        content: null,
      },
    },
    [BentoBlockType.LINK]: {
      id,
      size: "2x2",
      order,
      style: "outline",
      type: BentoBlockType.LINK,
      properties: {
        url: "",
        title: "",
        url_valid: false,
      },
    },
  };

  return defaults[type];
};
