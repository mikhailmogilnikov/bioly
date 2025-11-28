import { Trans } from "@lingui/react/macro";
import { LogOut } from "lucide-react";
import { useLocalizedRouter } from "@/shared/lib/hooks/use-localized-router";

export function Logout() {
  const router = useLocalizedRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <button
      className="squircle pressable -mt-2 flex items-center justify-center gap-2 bg-default px-4 py-3 font-medium text-danger"
      onClick={handleLogout}
      type="button"
    >
      <LogOut className="size-4" />
      <Trans>Log out</Trans>
    </button>
  );
}
