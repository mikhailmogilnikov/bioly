import { useLingui } from "@lingui/react/macro";
import { GripVertical, Save, Trash2 } from "lucide-react";
import { type DragControls, Reorder, useDragControls } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { SvgIcon } from "@/shared/ui/kit/primitives/svg-icon";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import { useProfile } from "../../profile/use-profile";
import type { SocialMediaItem } from "./types";
import { SocialMedia } from "./types";

export function LinkedSocialMedia(
  props: SocialMediaItem & { controls: DragControls }
) {
  const { socialMedia, updateProfile } = useProfile(
    (state) => ({
      socialMedia: state.profile.social_media,
      updateProfile: state.updateProfile,
    }),
    "shallow"
  );

  const { url } = SocialMedia[props.platform];

  const hostname = new URL(url).hostname;

  const [slug, setSlug] = useState(props.slug);

  const handleSave = () => {
    if (slug === "" || slug === props.slug) return;

    const filteredSocialMedia = socialMedia.filter(
      (item) => item.platform !== props.platform
    );

    updateProfile({
      social_media: [...filteredSocialMedia, { ...props, slug }],
    });
  };

  const handleDelete = () => {
    updateProfile({
      social_media: socialMedia.filter(
        (item) => item.platform !== props.platform
      ),
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    props.controls.start(e);
  };

  return (
    <div className="squircle-outline flex select-none justify-between gap-3 px-4 py-3">
      <div className="flex items-center">
        <SvgIcon className="mr-3 size-5 shrink-0" icon={props.platform} />
        <p className="text-base text-foreground/50">{hostname}/</p>
        <input
          className="w-full shrink select-text font-semibold text-base outline-none placeholder:text-foreground/70"
          onChange={(e) => setSlug(e.target.value)}
          placeholder="username"
          type="text"
          value={slug}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className="pressable rounded-full bg-default p-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          disabled={slug === props.slug || slug === ""}
          onClick={handleSave}
          type="button"
        >
          <Save className="size-5" />
        </button>
        <button
          className="pressable rounded-full bg-default p-2"
          onClick={handleDelete}
          type="button"
        >
          <Trash2 className="text-danger" size={20} />
        </button>
        <div
          className="reorder-handle user-select-none size-5 shrink-0 cursor-grab"
          onPointerDown={handlePointerDown}
        >
          <GripVertical className="size-5" />
        </div>
      </div>
    </div>
  );
}

const LinkedSocialMediaItemWrapper = ({
  socialMedia,
}: {
  socialMedia: SocialMediaItem;
}) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      className="touch-pan-y"
      dragControls={controls}
      dragListener={false}
      key={socialMedia.platform}
      value={socialMedia}
    >
      <LinkedSocialMedia {...socialMedia} controls={controls} />
    </Reorder.Item>
  );
};

export function LinkedSocialMediaWidget() {
  const { t } = useLingui();
  const { profile, updateProfile } = useProfile();

  const [items, setItems] = useState(profile.social_media);
  const itemsRef = useRef(items);
  const profileRef = useRef(profile);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const debounced = useDebounceCallback(() => {
    updateProfile({
      ...profileRef.current,
      social_media: itemsRef.current,
    });
  }, 1000);

  useEffect(() => {
    setItems(profile.social_media);
  }, [profile.social_media]);

  const handleReorder = (newItems: SocialMediaItem[]) => {
    const newItemsWithOrder = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setItems(newItemsWithOrder);
    debounced();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {items.length > 0 && (
        <SectionTitle title={t`Linked`}>
          <Reorder.Group
            axis="y"
            className="flex flex-col gap-4"
            onPointerDown={handlePointerDown}
            onReorder={(newItems) => handleReorder(newItems)}
            values={items}
          >
            {items.map((socialMedia) => (
              <LinkedSocialMediaItemWrapper
                key={socialMedia.platform}
                socialMedia={socialMedia}
              />
            ))}
          </Reorder.Group>
        </SectionTitle>
      )}
    </>
  );
}
