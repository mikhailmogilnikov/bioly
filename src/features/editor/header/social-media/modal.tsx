import { Trans, useLingui } from "@lingui/react/macro";
import { Save } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "@/shared/ui/kit/overlays/adaptive-modal";
import { SvgIcon } from "@/shared/ui/kit/primitives/svg-icon";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import { useProfile } from "../../profile/use-profile";
import { LinkedSocialMediaWidget } from "./linked-social-media";
import { SocialMedia, type SocialMediaPlatform } from "./types";

export function EditSocialMediaModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const { t } = useLingui();
  const socialMedia = useProfile((state) => state.profile.social_media);

  const unlinkedSocialMedia = useMemo(
    () =>
      Object.keys(SocialMedia).filter(
        (platform) =>
          !socialMedia.some(
            (socialMediaItem) => socialMediaItem.platform === platform
          )
      ),
    [socialMedia]
  );

  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <AdaptiveModalHeader>
        <Trans>Social media</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="flex w-full flex-col gap-6 py-1">
          <LinkedSocialMediaWidget />
          {unlinkedSocialMedia.length > 0 && (
            <SectionTitle title={t`Unlinked`}>
              {unlinkedSocialMedia.map((item) => (
                <UnlinkedSocialMedia
                  key={item}
                  platform={item as SocialMediaPlatform}
                />
              ))}
            </SectionTitle>
          )}
        </div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}

const UnlinkedSocialMedia = ({
  platform,
}: {
  platform: SocialMediaPlatform;
}) => {
  const { profile, updateProfile } = useProfile();
  const { url } = SocialMedia[platform];

  const hostname = new URL(url).hostname;

  const [username, setUsername] = useState("");

  const handleSave = () => {
    if (username === "") return;

    updateProfile({
      ...profile,
      social_media: [
        ...profile.social_media,
        { platform, slug: username, order: profile.social_media.length },
      ],
    });
  };

  return (
    <div className="squircle-outline flex justify-between gap-3 px-4 py-3">
      <div className="flex items-center">
        <SvgIcon className="mr-3 size-5 shrink-0" icon={platform} />
        <p className="text-base text-foreground/50">{hostname}/</p>
        <input
          className="w-full font-semibold text-base outline-none placeholder:text-foreground/70"
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"username"}
          type="text"
          value={username}
        />
      </div>
      <button
        className="pressable rounded-full bg-default p-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        disabled={username === ""}
        onClick={handleSave}
        type="button"
      >
        <Save className="size-5" />
      </button>
    </div>
  );
};
