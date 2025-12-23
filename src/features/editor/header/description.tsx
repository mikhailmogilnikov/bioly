import { useLingui } from "@lingui/react/macro";
import clsx from "clsx";
import { useProfile } from "../profile/use-profile";
import { BasicTextEditor } from "../text-editor";
import { getEditorJsonPayload } from "../text-editor/lib/get-editor-json-payload";

export const EditDescription = () => {
  const { t } = useLingui();

  const { description, updateMainField } = useProfile(
    (state) => ({
      description: state.profile.description,
      updateMainField: state.updateMainField,
    }),
    "shallow"
  );

  return (
    <BasicTextEditor
      className={clsx("editor-dynamic z-2 px-1", {
        "max-sm:min-h-14": !description,
      })}
      content={description}
      onUpdate={(props) => {
        const payload = getEditorJsonPayload(props.editor.getJSON());

        updateMainField("description", payload);
      }}
      placeholder={t`Add bio... Type "/" for commands.`}
    />
  );
};
