import { Trans } from "@lingui/react/macro";
import AnimateHeight from "react-animate-height";
import { useProfile } from "@/features/editor/profile/use-profile";
import { ModalSlider } from "@/shared/ui/kit/overlays/modal-controls";
import { SwitchField } from "@/shared/ui/kit/primitives/switch-field";

export function HeaderSettings() {
  const {
    show_avatar_blur,
    updateThemeField,
    name_size,
    avatar_size,
    avatar_blur_size,
  } = useProfile(
    (state) => ({
      show_avatar_blur: state.profile.theme.show_avatar_blur,
      updateThemeField: state.updateThemeField,
      name_size: state.profile.theme.name_size,
      avatar_size: state.profile.theme.avatar_size,
      avatar_blur_size: state.profile.theme.avatar_blur_size,
    }),
    "shallow"
  );

  const handleChange = (checked: boolean) => {
    updateThemeField("show_avatar_blur", checked);
  };

  return (
    <>
      <ModalSlider
        defaultValue={2.1}
        label={<Trans>Name font size</Trans>}
        max={3.5}
        min={1}
        onValueChange={(value) => {
          updateThemeField("name_size", value);
        }}
        step={0.1}
        value={name_size}
        valueSuffix="rem"
      />

      <ModalSlider
        defaultValue={11.5}
        label={<Trans>Avatar size</Trans>}
        max={14}
        min={7}
        onValueChange={(value) => {
          updateThemeField("avatar_size", value);
        }}
        step={0.1}
        value={avatar_size}
        valueSuffix="rem"
      />

      <div>
        <SwitchField
          checked={show_avatar_blur}
          label={<Trans>Avatar background with blur</Trans>}
          labelClassName="text-base"
          onCheckedChange={handleChange}
        />

        <AnimateHeight duration={200} height={show_avatar_blur ? "auto" : 0}>
          <div className="h-6" />
          <ModalSlider
            defaultValue={100}
            label={<Trans>Avatar bg blur radius</Trans>}
            max={150}
            min={10}
            onValueChange={(value) =>
              updateThemeField("avatar_blur_size", value)
            }
            step={1}
            value={avatar_blur_size}
            valueSuffix="%"
          />
        </AnimateHeight>
      </div>
    </>
  );
}
