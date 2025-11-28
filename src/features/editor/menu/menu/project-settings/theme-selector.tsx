import { Trans } from "@lingui/react/macro";
import { ChevronDownIcon } from "lucide-react";
import { THEMES, type Theme, ThemesNames } from "@/shared/domain/theme";
import { cn } from "@/shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/overlays/dropdown-menu";
import { useProfile } from "../../../profile/use-profile";

export function ThemeSelector() {
  const updateThemeField = useProfile((state) => state.updateThemeField);

  const currentTheme = useProfile((state) => state.profile.theme.theme);

  const handleThemeChange = (theme: Theme) => {
    window.document.body.classList.remove(currentTheme);
    window.document.body.classList.add(theme);
    updateThemeField("theme", theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full bg-default px-4 py-2">
        <ChevronDownIcon className="size-4 opacity-50" />
        <div
          className={cn(
            currentTheme,
            "size-6 rounded-full border border-outline bg-linear-to-bl from-background to-default"
          )}
        />

        <p className="font-medium text-base">{ThemesNames[currentTheme]}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent isInsideDialog>
        <DropdownMenuLabel>
          <Trans>Theme</Trans>
        </DropdownMenuLabel>
        {Object.values(THEMES).map((theme) => (
          <DropdownMenuItem
            className={cn(theme === currentTheme && "bg-foreground/10")}
            key={theme}
            onSelect={() => handleThemeChange(theme)}
          >
            <div
              className={cn(
                theme,
                "size-6 rounded-full border border-outline bg-linear-to-bl from-background to-default"
              )}
            />
            <p className="font-medium text-base">{ThemesNames[theme]}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
