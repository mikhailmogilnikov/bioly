import type { components } from "@/shared/api/schema/generated";

export type Profile = components["schemas"]["Profile"];
export type ProfileMainEditableFields = Omit<Profile, "id">;
export type ProfileMeta = components["schemas"]["ProfileMeta"];

// TODO: TEMPORAL
export const DEFAULT_MOCK_PROFILE: Profile = {
  id: "1",
  name: "",
  slug: "example",
  email: "mail@example.com",
  created_at: new Date().toISOString(),
  protected_by_password: false,
  avatar_url: "https://avatars.githubusercontent.com/u/125604210?v=4",
  description: null,

  theme: {
    font: "open-runde",
    theme: "dark",
    show_avatar_blur: false,
    border_radius: 24,
    border_width: 1,
    avatar_size: 11.5,
    avatar_blur_size: 100,
    name_size: 2.1,
  },

  meta: {
    allow_indexing: true,
    meta_lang: "en",
    meta_description: null,
  },

  social_media: [],
  bento: [],
};
