import type { ProfileTheme } from "./theme.type";

export type Profile = {
  id: string;
  name: string;
  slug: string;
  email: string;
  avatar_url: string;
  short_description: string;
  description: string;

  theme: ProfileTheme;
  // TODO: replace with the actual types
  social_media: unknown[];
  bento: unknown[];
};

export type ProfileMainEditableFields = Pick<
  Profile,
  "name" | "short_description" | "description"
>;

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
