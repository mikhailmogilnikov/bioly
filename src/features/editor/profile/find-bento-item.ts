import type { useProfile } from "./use-profile";

export const findBentoItem = (
  id: string,
  store: ReturnType<typeof useProfile.getState>
) => store.profile.bento.find((item) => item.id === id);
