import TypedLocalStore from "typed-local-store";

import type { Profile } from "@/features/editor/profile/profile.type";

export type LocalStorageSchema = {
  localProfile: Profile;
};

export const LocalStorageService = new TypedLocalStore<LocalStorageSchema>({
  storage: "localStorage",
});
