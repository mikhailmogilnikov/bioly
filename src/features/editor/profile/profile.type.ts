import type {
  BentoBlock,
  BentoBlockTypeKey,
} from "../bento/blocks/model/types";
import type { SocialMediaItem } from "../header/social-media/types";
import type { ProfileTheme } from "./theme.type";

export type Profile = {
  id: string;
  name: string;
  slug: string;
  email: string;
  avatar_url: string | null;
  short_description: string;
  description: string;
  theme: ProfileTheme;
  social_media: SocialMediaItem[];
  bento: BentoBlock<BentoBlockTypeKey>[];
};

export type ProfileMainEditableFields = Omit<Profile, "id">;

// TODO: TEMPORAL
export const DEFAULT_MOCK_PROFILE: Profile = {
  id: "1",
  name: "",
  slug: "",
  email: "",
  avatar_url: "https://avatars.githubusercontent.com/u/125604210?v=4",
  short_description: "",
  description: "",
  theme: {
    font: "open-runde",
    theme: "dark",
    show_avatar_blur: false,
    border_radius: 0,
    border_width: 0,
  },
  social_media: [],
  bento: [],
};
