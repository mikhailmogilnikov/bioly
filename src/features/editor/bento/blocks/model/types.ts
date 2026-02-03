import type { components } from "@/shared/api/schema/generated";

export const BentoBlockSize: Record<
  string,
  components["schemas"]["BentoBlockSize"]
> = {
  TWO_BY_TWO: "2x2",
  FOUR_BY_ONE: "4x1",
  TWO_BY_FOUR: "2x4",
  FOUR_BY_TWO: "4x2",
  FOUR_BY_FOUR: "4x4",
  DYNAMIC: "dynamic",
} as const;

export type BentoBlockSize = components["schemas"]["BentoBlockSize"];

export const BentoBlockStyle: Record<
  string,
  components["schemas"]["BentoBlockStyle"]
> = {
  PLAIN: "plain",
  SHADOW: "shadow",
  OUTLINE: "outline",
  TRANSPARENT: "transparent",
} as const;

export type BentoBlockStyle = components["schemas"]["BentoBlockStyle"];

export const BentoBlockStyleClassNames: Record<BentoBlockStyle, string> = {
  plain: "squircle",
  shadow: "squircle-shadow",
  outline: "squircle-outline",
  transparent: "",
} as const;

export const BentoBlockType: Record<
  string,
  components["schemas"]["BentoBlockType"]
> = {
  GALLERY: "gallery",
  LINK: "link",
  TEXT: "text",
  MAP: "map",
} as const;

export type BentoBlockTypeKey = components["schemas"]["BentoBlockType"];

export type BentoBlockProperties<T extends BentoBlockTypeKey> =
  T extends "gallery"
    ? components["schemas"]["BentoBlockPropertiesGallery"]
    : T extends "link"
      ? components["schemas"]["BentoBlockPropertiesLink"]
      : T extends "text"
        ? components["schemas"]["BentoBlockPropertiesText"]
        : T extends "map"
          ? components["schemas"]["BentoBlockPropertiesMap"]
          : never;

export type BentoBlock<T extends BentoBlockTypeKey> = T extends "gallery"
  ? components["schemas"]["BentoBlockGallery"]
  : T extends "link"
    ? components["schemas"]["BentoBlockLink"]
    : T extends "text"
      ? components["schemas"]["BentoBlockText"]
      : T extends "map"
        ? components["schemas"]["BentoBlockMap"]
        : never;
