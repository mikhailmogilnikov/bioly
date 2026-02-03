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
    gallery: {
      id,
      size: "2x2",
      order,
      style: "plain",
      type: BentoBlockType.GALLERY,
      properties: {
        media: [],
      },
    } as BentoBlock<"gallery">,
    text: {
      id,
      size: "dynamic",
      order,
      style: "transparent",
      type: BentoBlockType.TEXT,
      properties: {
        content: null,
      },
    } as BentoBlock<"text">,
    link: {
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
    } as BentoBlock<"link">,
    map: {
      id,
      size: "2x2",
      order,
      style: "plain",
      type: BentoBlockType.MAP,
      properties: {
        theme: "auto",
        labels: true,
        interactions: false,
        zoom: 11,
        title: "New York, USA",
        titleAlign: "bottom-center",
        latitude: 40.7128,
        longitude: -74.006,
      },
    } as BentoBlock<"map">,
  };

  return defaults[type];
};
