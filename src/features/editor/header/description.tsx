import { useLingui } from "@lingui/react/macro";
import type { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useProfile } from "../profile/use-profile";

export const EditDescription = () => {
  const { t } = useLingui();

  const { description, updateMainField } = useProfile(
    (state) => ({
      description: state.profile.description,
      updateMainField: state.updateMainField,
    }),
    "shallow"
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateMainField("description", e.target.value);
  };

  return (
    <TextareaAutosize
      className="field-sizing-content z-1 w-full resize-none px-1 text-lg text-muted-foreground outline-none"
      onChange={handleChange}
      placeholder={t`Add bio`}
      value={description}
    />
  );
};
