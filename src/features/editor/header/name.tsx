import { useLingui } from "@lingui/react/macro";
import type { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useProfile } from "../profile/use-profile";

export const EditName = () => {
  const { t } = useLingui();
  const { name, updateMainField } = useProfile(
    (state) => ({
      name: state.profile.name,
      updateMainField: state.updateMainField,
    }),
    "shallow"
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateMainField("name", e.target.value);
  };

  return (
    <TextareaAutosize
      className="z-1 mt-4 w-full resize-none overflow-hidden px-1 font-bold text-[2.1rem] outline-none"
      id="name"
      onChange={handleChange}
      placeholder={t`Your name`}
      value={name}
    />
  );
};
