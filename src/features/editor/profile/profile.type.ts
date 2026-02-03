import type { components } from "@/shared/api/schema/generated";

export type Profile = components["schemas"]["Profile"];
export type ProfileMainEditableFields = Omit<Profile, "id">;

// TODO: TEMPORAL
export const DEFAULT_MOCK_PROFILE: Profile = {
  id: "1",
  name: "",
  slug: "example",
  email: "mail@example.com",
  created_at: new Date().toISOString(),
  protected_by_password: false,
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
