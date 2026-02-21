import { Trans } from "@lingui/react/macro";
import { useProfile } from "@/features/editor/profile/use-profile";
import { SwitchField } from "@/shared/ui/kit/primitives/switch-field";

export function HeaderSettings() {
  const { show_avatar_blur, updateThemeField } = useProfile(
    (state) => ({
      show_avatar_blur: state.profile.theme.show_avatar_blur,
      updateThemeField: state.updateThemeField,
    }),
    "shallow"
  );

  const handleChange = (checked: boolean) => {
    updateThemeField("show_avatar_blur", checked);
  };

  return (
    <SwitchField
      checked={show_avatar_blur}
      label={<Trans>Подложка с размытием у аватара</Trans>}
      labelClassName=""
      onCheckedChange={handleChange}
    />
  );
}
