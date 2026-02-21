import { useLingui } from "@lingui/react/macro";
import type { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useProfile } from "../profile/use-profile";

export const EditName = () => {
  const { t } = useLingui();
  const { name, updateMainField, name_size } = useProfile(
    (state) => ({
      name: state.profile.name,
      updateMainField: state.updateMainField,
      name_size: state.profile.theme.name_size,
    }),
    "shallow"
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateMainField("name", e.target.value);
  };

  return (
    <TextareaAutosize
      className="z-1 mt-4 w-full resize-none overflow-hidden px-1 font-bold leading-tight outline-none"
      id="name"
      onChange={handleChange}
      placeholder={t`Your name`}
      style={{ fontSize: `${name_size}rem` }}
      value={name}
    />
  );
};
