import { Trans } from "@lingui/react/macro";
import { ChevronDownIcon } from "lucide-react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { changeBodyFont } from "@/features/editor/use-init-editor";
import { FONT_CLASSNAMES, FONTS, type Font } from "@/shared/domain/theme";
import { cn } from "@/shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/overlays/dropdown-menu";

export function FontSelector() {
  const updateThemeField = useProfile((state) => state.updateThemeField);

  const currentFont = useProfile((state) => state.profile.theme.font);

  const handleFontChange = (font: Font) => {
    changeBodyFont(font);
    updateThemeField("font", font);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full bg-default px-4 py-2">
        <ChevronDownIcon className="size-4 opacity-50" />
        <p
          className={cn(
            FONT_CLASSNAMES[currentFont],
            "font-medium text-base first-letter:capitalize"
          )}
        >
          {currentFont}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent isInsideDialog>
        <DropdownMenuLabel>
          <Trans>Font</Trans>
        </DropdownMenuLabel>
        {Object.values(FONTS).map((font) => (
          <DropdownMenuItem
            className={cn(font === currentFont && "bg-foreground/10")}
            key={font}
            onSelect={() => handleFontChange(font)}
          >
            <p
              className={cn(
                FONT_CLASSNAMES[font],
                "font-medium text-base first-letter:capitalize"
              )}
            >
              {font}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
