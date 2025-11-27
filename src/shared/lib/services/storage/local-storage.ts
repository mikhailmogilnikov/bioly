import TypedLocalStore from "typed-local-store";

// import type { Profile } from "~/services/edit-profile/model/profile-provider";

// export interface LocalStorageSchema {
//   localProfile: Profile;
// }

export const LocalStorageService = new TypedLocalStore({
  storage: "localStorage",
});
