import { Trans } from "@lingui/react/macro";
import { clsx } from "clsx";
import Image from "next/image";
import { type ChangeEvent, useEffect, useEffectEvent, useRef } from "react";
import {
  DeleteIcon,
  type DeleteIconHandle,
} from "@/shared/ui/animated-icons/delete";
import {
  SparklesIcon,
  type SparklesIconHandle,
} from "@/shared/ui/animated-icons/sparkles";
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
  className: string;

  blurClassName: string;
}) => {
  const {
    name,
    avatar_url,
    show_avatar_blur,
    updateThemeField,
    updateMainField,
  } = useProfile(
    (state) => ({
      name: state.profile.name,
      avatar_url: state.profile.avatar_url,
      show_avatar_blur: state.profile.theme.show_avatar_blur,
      updateThemeField: state.updateThemeField,
      updateMainField: state.updateMainField,
    }),
    "shallow"
  );

  const deleteIconRef = useRef<DeleteIconHandle>(null);
  const sparklesIconRef = useRef<SparklesIconHandle>(null);

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

  const startSparklesAnimation = useEffectEvent(() => {
    if (show_avatar_blur) {
      sparklesIconRef.current?.startAnimation();
    }
  });

  useEffect(() => {
    startSparklesAnimation();
  }, []);

  const handleToggleBlur = () => {
    if (show_avatar_blur) {
      sparklesIconRef.current?.stopAnimation();
    } else {
      sparklesIconRef.current?.startAnimation();
    }

    updateThemeField("show_avatar_blur", !show_avatar_blur);
  };

  return (
    <div className={clsx("relative rounded-full", className)}>
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
        className="-z-1 absolute top-18 left-10 size-full"
        inClass="motion-opacity-in-0 motion-scale-in-0"
        outClass="motion-opacity-out-0 motion-scale-out-0"
        show={!!avatar_url && show_avatar_blur}
      >
        {avatar_url && (
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
        )}
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

      <AnimatePresence
        className="motion-ease-in-out-cubic motion-duration-200 absolute top-0 right-0"
        inClass="motion-opacity-in-0 motion-scale-in-0"
        outClass="motion-opacity-out-0 motion-scale-out-0"
        show={!!avatar_url}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={clsx(
                "pressable flex size-11 items-center justify-center rounded-full transition-colors",
                {
                  "bg-foreground text-background": show_avatar_blur,
                  "bg-default text-foreground": !show_avatar_blur,
                }
              )}
              onClick={handleToggleBlur}
              type="button"
            >
              <SparklesIcon ref={sparklesIconRef} size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              <Trans>Toggle avatar blur</Trans>
            </p>
          </TooltipContent>
        </Tooltip>
      </AnimatePresence>
    </div>
  );
};
