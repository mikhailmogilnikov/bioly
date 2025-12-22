import type { JSONContent } from "@tiptap/react";
import type {
  BentoBlock,
  BentoBlockTypeKey,
} from "../bento/blocks/model/types";
import type { SocialMediaItem } from "../header/social-media/types";
import type { ProfileTheme } from "./theme.type";

export interface Profile {
  id: string;
  name: string;
  slug: string;
  email: string;
  avatar_url: string | null;
  short_description: string;
  description: JSONContent | null;
  theme: ProfileTheme;
  social_media: SocialMediaItem[];
  bento: BentoBlock<BentoBlockTypeKey>[];
}

export type ProfileMainEditableFields = Omit<Profile, "id">;

// TODO: TEMPORAL
export const DEFAULT_MOCK_PROFILE: Profile = {
  id: "1",
  name: "",
  slug: "example",
  email: "mail@example.com",
  avatar_url: "https://avatars.githubusercontent.com/u/125604210?v=4",
  short_description: "",
  description: null,
  theme: {
    font: "open-runde",
    theme: "dark",
    show_avatar_blur: false,
    border_radius: 24,
    border_width: 1,
  },
  social_media: [],
  bento: [],
};
