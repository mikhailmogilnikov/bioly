import { useLingui } from "@lingui/react/macro";
import { motion } from "motion/react";
import { useRefresh } from "muuri-react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { BasicTextEditor } from "@/features/editor/text-editor";
import { getEditorJsonPayload } from "@/features/editor/text-editor/lib/get-editor-json-payload";
import { useBlockContext } from "../../../grid/ui/block-context";

export function FullscreenTitle() {
  const { block } = useBlockContext<"text">();

  const { t } = useLingui();

  const { updateBentoBlockField } = useProfile(
    (state) => ({
      updateBentoBlockField: state.updateBentoBlockField,
    }),
    "shallow"
  );

  useRefresh([block?.properties?.content]);

  if (!block) return null;

  return (
    <motion.div className="w-full" layout transition={{ duration: 0 }}>
      <BasicTextEditor
        autofocus="end"
        className="editor-dynamic"
        content={block.properties?.content}
        onUpdate={(props) => {
          const payload = getEditorJsonPayload(props.editor.getJSON());

          updateBentoBlockField(block.id, "properties", {
            ...block.properties,
            content: payload,
          });
        }}
        placeholder={t`Type your text here`}
      />
    </motion.div>
  );
}
