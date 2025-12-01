import type { BentoBlockPropertiesGallery } from "../variants/gallery/types";
import type { BentoBlockPropertiesLink } from "../variants/link/types";
import type { BentoBlockPropertiesText } from "../variants/text/types";

export const BentoBlockSize = {
  TWO_BY_TWO: "2x2",
  FOUR_BY_ONE: "4x1",
  TWO_BY_FOUR: "2x4",
  FOUR_BY_TWO: "4x2",
  FOUR_BY_FOUR: "4x4",
  DYNAMIC: "dynamic",
} as const;

export type BentoBlockSize =
  (typeof BentoBlockSize)[keyof typeof BentoBlockSize];

export const BentoBlockStyle = {
  PLAIN: "plain",
  SHADOW: "shadow",
  OUTLINE: "outline",
  TRANSPARENT: "transparent",
} as const;

export type BentoBlockStyle =
  (typeof BentoBlockStyle)[keyof typeof BentoBlockStyle];

export const BentoBlockStyleClassNames: Record<BentoBlockStyle, string> = {
  [BentoBlockStyle.PLAIN]: "squircle",
  [BentoBlockStyle.SHADOW]: "squircle-shadow",
  [BentoBlockStyle.OUTLINE]: "squircle-outline",
  [BentoBlockStyle.TRANSPARENT]: "",
} as const;

export const BentoBlockType = {
  GALLERY: "gallery",
  LINK: "link",
  TEXT: "text",
} as const;

export type BentoBlockTypeKey =
  (typeof BentoBlockType)[keyof typeof BentoBlockType];

export type BentoBlockProperties<T extends BentoBlockTypeKey> =
  T extends typeof BentoBlockType.GALLERY
    ? BentoBlockPropertiesGallery
    : T extends typeof BentoBlockType.LINK
      ? BentoBlockPropertiesLink
      : T extends typeof BentoBlockType.TEXT
        ? BentoBlockPropertiesText
        : never;

export type BentoBlock<T extends BentoBlockTypeKey> = {
  id: string;
  size: BentoBlockSize;
  order: number;
  style: BentoBlockStyle;
  type: T;
  properties: BentoBlockProperties<T>;
};
