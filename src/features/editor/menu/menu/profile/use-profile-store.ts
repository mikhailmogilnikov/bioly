import { createGStore } from "create-gstore";
import { useState } from "react";

export const useProfileStore = createGStore(() => {
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);

  return {
    newEmail,
    setNewEmail,
    newPassword,
    setNewPassword,
  };
});
