import { useLingui } from "@lingui/react/macro";
import type { JSONContent } from "@tiptap/react";
import { useProfile } from "../profile/use-profile";
import { BasicTextEditor } from "../text-editor";

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
      className="z-2 px-1 max-sm:min-h-14"
      content={description}
      onUpdate={(props) => {
        let payload: JSONContent | null = props.editor.getJSON();

        const isEmptyParagraph =
          payload?.content &&
          payload.content.length === 1 &&
          JSON.stringify(payload.content?.[0]) === '{"type":"paragraph"}';

        if (isEmptyParagraph) {
          payload = null;
        }

        updateMainField("description", payload);
      }}
      placeholder={t`Add bio... Type "/" for commands.`}
    />
  );
};
