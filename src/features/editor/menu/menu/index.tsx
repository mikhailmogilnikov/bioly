import { Trans, useLingui } from "@lingui/react/macro";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useRef, useState } from "react";
import { buildUrl } from "@/shared/lib/utils/build-url";
import type { ActivityIcon } from "@/shared/ui/animated-icons/activity";
import type { ChartSplineIcon } from "@/shared/ui/animated-icons/chart-spline";
import { MenuIcon, type MenuIconHandle } from "@/shared/ui/animated-icons/menu";
import { CogIcon } from "@/shared/ui/animated-icons/settings";
import { UserIcon } from "@/shared/ui/animated-icons/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/overlays/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/overlays/react-tooltip";
import { Pulse } from "@/shared/ui/kit/primitives/pulse";
import { useProfile } from "../../profile/use-profile";
import { ProfileModalNew } from "./profile";
import { ProjectSettingsModal } from "./project-settings";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MenuItemConfig {
  id: string;
  label: string;
  Icon:
    | typeof CogIcon
    | typeof ActivityIcon
    | typeof UserIcon
    | typeof ChartSplineIcon;
}

const menuItems: MenuItemConfig[] = [
  { id: "settings", label: "", Icon: CogIcon },
  // { id: "activity", label: "Social media links", Icon: ActivityIcon },
  { id: "profile", label: "", Icon: UserIcon },
  // { id: 'analytics', label: 'Analytics', Icon: ChartSplineIcon },
];

export const EditBarMenu = () => {
  const { t } = useLingui();
  const slug = useProfile((state) => state.profile.slug);

  const [openModals, setOpenModals] = useState<Record<string, boolean>>({
    settings: false,
    activity: false,
    profile: false,
    analytics: false,
  });

  const menuIconRef = useRef<MenuIconHandle>(null);
  const itemIconRefs = useRef<Record<string, IconHandle | undefined>>({});

  const handleToggleModal = (key: string, value: boolean) => {
    setOpenModals((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <DropdownMenu
        onOpenChange={(isOpen) => {
          if (isOpen) {
            menuIconRef.current?.startAnimation();

            queueMicrotask(() => {
              for (const ref of Object.values(itemIconRefs.current)) {
                ref?.startAnimation();
              }

              setTimeout(() => {
                itemIconRefs.current.settings?.stopAnimation();
              }, 400);
            });
          } else {
            menuIconRef.current?.stopAnimation();
          }
        }}
      >
        <DropdownMenuTrigger className="pressable size-12 cursor-pointer rounded-full border border-foreground/8 bg-default/50 backdrop-blur-md">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex size-full items-center justify-center">
                <MenuIcon
                  className="text-foreground"
                  ref={menuIconRef}
                  size={24}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                <Trans>Menu</Trans>
              </p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Trans>Menu</Trans>
          </DropdownMenuLabel>

          {menuItems.map(({ id: itemId, Icon }) => {
            const getLabel = () => {
              if (itemId === "settings") {
                return <Trans>Project settings</Trans>;
              }
              if (itemId === "profile") {
                return <Trans>Profile</Trans>;
              }
              return "";
            };

            return (
              <DropdownMenuItem
                key={itemId}
                onClick={() => handleToggleModal(itemId, true)}
                onMouseEnter={() =>
                  itemIconRefs.current[itemId]?.startAnimation()
                }
                onMouseLeave={() =>
                  itemIconRefs.current[itemId]?.stopAnimation()
                }
              >
                <Icon
                  className="opacity-50"
                  ref={(el: IconHandle | null) => {
                    if (el) {
                      itemIconRefs.current[itemId] = el;
                    }
                  }}
                  size={20}
                />
                {getLabel()}
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="relative">
            <Link
              aria-label={t`Go to live page`}
              className="group pr-9"
              href={buildUrl(slug) as Route}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Pulse className="mx-1.5" />
              <Trans>Go to live</Trans>
              <ArrowUpRight className="absolute right-3 size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProjectSettingsModal
        onOpenChange={() => handleToggleModal("settings", false)}
        open={openModals.settings ?? false}
      />
      <ProfileModalNew
        onOpenChange={() => handleToggleModal("profile", false)}
        open={openModals.profile ?? false}
      />
    </>
  );
};
