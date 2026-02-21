import { Trans, useLingui } from "@lingui/react/macro";
import { clsx } from "clsx";
import { Brush } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useRef } from "react";
import { useEditorSettingsModal } from "@/features/editor/menu/menu/project-settings/settings-modal-context";
import {
  DeleteIcon,
  type DeleteIconHandle,
} from "@/shared/ui/animated-icons/delete";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/overlays/react-tooltip";
import { AnimatePresence } from "@/shared/ui/utils/animate-presence";
import { useProfile } from "../profile/use-profile";

export const EditAvatar = ({
  className,
  blurClassName,
}: {
  className?: string;
  blurClassName?: string;
}) => {
  const {
    name,
    avatar_url,
    show_avatar_blur,
    updateMainField,
    avatar_size,
    avatar_blur_size,
  } = useProfile(
    (state) => ({
      name: state.profile.name,
      avatar_url: state.profile.avatar_url,
      show_avatar_blur: state.profile.theme.show_avatar_blur,
      updateThemeField: state.updateThemeField,
      updateMainField: state.updateMainField,
      avatar_size: state.profile.theme.avatar_size,
      avatar_blur_size: state.profile.theme.avatar_blur_size,
    }),
    "shallow"
  );

  const { t } = useLingui();
  const { openSettingsModal } = useEditorSettingsModal();

  const deleteIconRef = useRef<DeleteIconHandle>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    updateMainField("avatar_url", null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      updateMainField("avatar_url", URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={clsx("relative rounded-full", className)}
      style={{ width: `${avatar_size}rem`, height: `${avatar_size}rem` }}
    >
      <input
        accept="image/*"
        className="hidden"
        multiple={false}
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />
      {avatar_url ? (
        <Image
          alt={name}
          className="motion-opacity-in-0 size-full cursor-pointer select-none rounded-full object-cover shadow-xl"
          draggable={false}
          fill
          key={avatar_url}
          loading="eager"
          onClick={() => fileInputRef.current?.click()}
          src={avatar_url}
        />
      ) : (
        <button
          className="size-full cursor-pointer select-none rounded-full border-3 border-outline border-dashed transition-colors hover:bg-default/50 active:bg-default/80"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <Trans>Add avatar</Trans>
        </button>
      )}

      <AnimatePresence
        className="absolute top-18 left-10 -z-1 size-full"
        inClass="motion-opacity-in-0 motion-scale-in-0"
        outClass="motion-opacity-out-0 motion-scale-out-0"
        show={!!avatar_url && show_avatar_blur}
        style={{
          width: `${avatar_blur_size}%`,
          height: `${avatar_blur_size}%`,
        }}
      >
        {avatar_url ? (
          <Image
            alt={name}
            aria-hidden={true}
            className={clsx(
              "size-full scale-x-175 scale-y-130 select-none rounded-full object-cover opacity-35 blur-2xl will-change-transform",
              blurClassName
            )}
            draggable={false}
            fill
            loading="eager"
            src={avatar_url}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence
        className="motion-ease-in-out-cubic motion-duration-200 absolute top-0 left-0"
        inClass="motion-opacity-in-0 motion-scale-in-0"
        outClass="motion-opacity-out-0 motion-scale-out-0"
        show={!!avatar_url}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="pressable flex size-11 items-center justify-center rounded-full bg-default backdrop-blur-md"
              onClick={handleDelete}
              onMouseEnter={() => deleteIconRef.current?.startAnimation()}
              onMouseLeave={() => deleteIconRef.current?.stopAnimation()}
              type="button"
            >
              <DeleteIcon
                className="text-danger"
                ref={deleteIconRef}
                size={20}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              <Trans>Delete avatar</Trans>
            </p>
          </TooltipContent>
        </Tooltip>
      </AnimatePresence>

      <div className="motion-ease-in-out-cubic motion-duration-200 absolute top-0 right-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label={t`Theme settings`}
              className={clsx(
                "pressable flex size-11 items-center justify-center rounded-full bg-default text-foreground transition-colors"
              )}
              onClick={() => openSettingsModal("theme")}
              type="button"
            >
              <Brush className="size-5.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              <Trans>Theme settings</Trans>
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
