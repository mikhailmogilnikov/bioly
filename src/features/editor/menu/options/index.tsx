import { Trans } from "@lingui/react/macro";
import { useRef, useState } from "react";
import { useWebHaptics } from "web-haptics/react";
import { useEditorSettingsModal } from "@/features/editor/menu/options/project-settings/settings-modal-context";
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
  DropdownMenuTrigger,
} from "@/shared/ui/kit/overlays/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/overlays/react-tooltip";
import { ProfileModalNew } from "./profile";
import { ProjectSettingsModal } from "./project-settings";

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MenuItemConfig {
  Icon:
    | typeof CogIcon
    | typeof ActivityIcon
    | typeof UserIcon
    | typeof ChartSplineIcon;
  id: string;
  label: string;
}

const menuItems: MenuItemConfig[] = [
  { id: "settings", label: "", Icon: CogIcon },
  // { id: "activity", label: "Social media links", Icon: ActivityIcon },
  { id: "profile", label: "", Icon: UserIcon },
  // { id: 'analytics', label: 'Analytics', Icon: ChartSplineIcon },
];

export const EditBarMenu = () => {
  const haptic = useWebHaptics();
  const { closeSettingsModal, openSettingsModal, settingsModalState } =
    useEditorSettingsModal();

  const [openModals, setOpenModals] = useState<Record<string, boolean>>({
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
            haptic.trigger("medium");
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
        <DropdownMenuTrigger
          className="pressable size-12 cursor-pointer rounded-full border border-foreground/8 bg-default/50 backdrop-blur-md"
          onClick={() => haptic.trigger("selection")}
        >
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
                onClick={() => {
                  haptic.trigger("selection");
                  itemId === "settings"
                    ? openSettingsModal("settings")
                    : handleToggleModal(itemId, true);
                }}
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
        </DropdownMenuContent>
      </DropdownMenu>

      <ProjectSettingsModal
        initialView={settingsModalState.initialView}
        onOpenChange={closeSettingsModal}
        open={settingsModalState.open}
      />
      <ProfileModalNew
        onOpenChange={() => handleToggleModal("profile", false)}
        open={openModals.profile ?? false}
      />
    </>
  );
};
