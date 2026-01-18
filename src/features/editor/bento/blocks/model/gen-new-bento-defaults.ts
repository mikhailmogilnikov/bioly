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
    [BentoBlockType.MAP]: {
      id,
      size: "2x2",
      order,
      style: "plain",
      type: BentoBlockType.MAP,
      properties: {
        theme: "auto",
        labels: true,
        interactions: false,
        zoom: 15,
        title: "New York, USA",
        titleAlign: "bottom-left",
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
  };

  return defaults[type];
};
