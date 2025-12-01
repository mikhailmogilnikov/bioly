import { Trans } from "@lingui/react/macro";
import { PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/overlays/react-tooltip";
import { SvgIcon } from "@/shared/ui/kit/primitives/svg-icon";
import { useProfile } from "../../profile/use-profile";
import { EditSocialMediaModal } from "./modal";
import { SocialMedia } from "./types";

export function EditSocialMedia() {
  const socialMedia = useProfile((state) => state.profile.social_media);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const content = useMemo(() => {
    if (socialMedia.length === 0) {
      return (
        <button
          className="mt-2 flex cursor-pointer select-none items-center gap-2 rounded-full border-2 border-outline border-dashed px-4 py-2 font-medium text-foreground/50 transition-colors hover:bg-default/50 hover:text-foreground active:bg-default/80"
          onClick={handleOpenModal}
          type="button"
        >
          <PlusIcon className="size-4" />
          <Trans>Add social media</Trans>
        </button>
      );
    }

    const sortedSocialMedia = socialMedia.sort((a, b) => a.order - b.order);

    return (
      <div className="mt-3 flex w-full flex-wrap gap-3 px-1">
        {sortedSocialMedia.map((item) => {
          const { url } = SocialMedia[item.platform];

          return (
            <Tooltip key={item.platform}>
              <TooltipTrigger asChild>
                <a
                  className="flex size-6 shrink-0 items-center justify-center gap-2 rounded-md opacity-100 transition-opacity hover:opacity-70"
                  href={url + item.slug}
                  key={item.platform}
                  target="_blank"
                >
                  <SvgIcon className="size-full" icon={item.platform} />
                </a>
              </TooltipTrigger>
              <TooltipContent>{SocialMedia[item.platform].name}</TooltipContent>
            </Tooltip>
          );
        })}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex size-6 items-center justify-center rounded-md hover:bg-default/50"
              onClick={handleOpenModal}
              type="button"
            >
              <PlusIcon className="w-full opacity-50" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <Trans>Add social media</Trans>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }, [socialMedia, handleOpenModal]);

  return (
    <>
      {content}
      <EditSocialMediaModal onOpenChange={handleCloseModal} open={openModal} />
    </>
  );
}
