import { createGStore } from "create-gstore";
import { useCallback, useMemo, useState } from "react";
import { LocalStorageService } from "@/shared/lib/services/storage/local-storage";
import { sortBy } from "@/shared/lib/utils/sort-by";
import type {
  BentoBlock,
  BentoBlockTypeKey,
} from "../bento/blocks/model/types";
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

  const sortedBentoBlocks = useMemo(
    () => sortBy(profile.bento, "order"),
    [profile.bento]
  );

  /**
   * Updates the entire profile
   * @param newProfileOptions - New profile options to update
   */
  const updateProfile = useCallback((newProfileOptions: Partial<Profile>) => {
    setProfile((prev) => {
      const newProfile: Profile = { ...prev, ...newProfileOptions };
      LocalStorageService.setItem("localProfile", newProfile);
      return newProfile;
    });
  }, []);

  /**
   * Updates the main field of the profile (name, description, short description)
   * @param field - Field of the profile to update
   * @param value - New value of the field
   */
  const updateMainField = useCallback(
    <K extends keyof ProfileMainEditableFields>(
      field: K,
      value: ProfileMainEditableFields[K]
    ) => {
      setProfile((prev) => {
        const newProfile: Profile = { ...prev, [field]: value };
        LocalStorageService.setItem("localProfile", newProfile);
        return newProfile;
      });
    },
    []
  );

  /**
   * Updates the theme field of the profile
   * @param field - Field of the theme profile to update
   * @param value - New value of the field
   */
  const updateThemeField = useCallback(
    <K extends keyof ProfileTheme>(field: K, value: ProfileTheme[K]) => {
      setProfile((prev) => {
        const newProfile: Profile = {
          ...prev,
          theme: { ...prev.theme, [field]: value },
        };
        LocalStorageService.setItem("localProfile", newProfile);
        return newProfile;
      });
    },
    []
  );

  // const updateSocialMediaField = () => {};

  // const reorderSocialMedia = () => {};

  // const reorderBentoBlocks = () => {};

  /**
   * Adds a new block to the bento
   * @param block - Block to add
   */
  const addBentoBlock = useCallback((block: BentoBlock<BentoBlockTypeKey>) => {
    setProfile((prev) => {
      const newProfile: Profile = { ...prev, bento: [...prev.bento, block] };
      LocalStorageService.setItem("localProfile", newProfile);
      return newProfile;
    });
  }, []);

  /**
   * Removes a block from the bento
   * @param blockId - ID of the block to remove
   */
  const removeBentoBlock = useCallback((blockId: string) => {
    setProfile((prev) => {
      const newProfile: Profile = {
        ...prev,
        bento: prev.bento.filter((b) => b.id !== blockId),
      };
      LocalStorageService.setItem("localProfile", newProfile);
      return newProfile;
    });
  }, []);

  return {
    profile,
    sortedBentoBlocks,
    updateProfile,
    updateMainField,
    updateThemeField,
    addBentoBlock,
    removeBentoBlock,
  };
});
