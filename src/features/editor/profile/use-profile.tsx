import { createGStore } from "create-gstore";
import { useState } from "react";
import { LocalStorageService } from "@/shared/lib/services/storage/local-storage";

import {
  DEFAULT_MOCK_PROFILE,
  type Profile,
  type ProfileMainEditableFields,
} from "./profile.type";
import type { ProfileTheme } from "./theme.type";

export const useProfile = createGStore(() => {
  const [profile, setProfile] = useState<Profile>(() => {
    const localProfile = LocalStorageService.getItem("localProfile", "safe");

    return localProfile ?? DEFAULT_MOCK_PROFILE;
  });

  /**
   * Updates the entire profile
   * @param newProfileOptions - New profile options to update
   */
  const updateProfile = (newProfileOptions: Partial<Profile>) => {
    setProfile((prev) => {
      const newProfile: Profile = { ...prev, ...newProfileOptions };
      LocalStorageService.setItem("localProfile", newProfile);
      return newProfile;
    });
  };

  /**
   * Updates the main field of the profile (name, description, short description)
   * @param field - Field of the profile to update
   * @param value - New value of the field
   */
  const updateMainField = <K extends keyof ProfileMainEditableFields>(
    field: K,
    value: ProfileMainEditableFields[K]
  ) => {
    setProfile((prev) => {
      const newProfile: Profile = { ...prev, [field]: value };
      LocalStorageService.setItem("localProfile", newProfile);
      return newProfile;
    });
  };

  /**
   * Updates the theme field of the profile
   * @param field - Field of the theme profile to update
   * @param value - New value of the field
   */
  const updateThemeField = <K extends keyof ProfileTheme>(
    field: K,
    value: ProfileTheme[K]
  ) => {
    setProfile((prev) => {
      const newProfile: Profile = {
        ...prev,
        theme: { ...prev.theme, [field]: value },
      };
      LocalStorageService.setItem("localProfile", newProfile);
      return newProfile;
    });
  };

  // const updateSocialMediaField = () => {};

  // const reorderSocialMedia = () => {};

  // const updateBentoBlockField = () => {};

  // const reorderBentoBlocks = () => {};

  // const updateBentoItem = (
  //   id: string,
  //   properties: Partial<BentoItemProperties<BentoItemType>>
  // ) => {
  //   updateProfile({
  //     bento: profile.bento.map((item) =>
  //       item.id === id
  //         ? { ...item, properties: { ...item.properties, ...properties } }
  //         : item
  //     ),
  //   });
  // };

  return { profile, updateProfile, updateMainField, updateThemeField };
});
