import { useLingui } from "@lingui/react/macro";
import { motion } from "motion/react";
import { useRefresh } from "muuri-react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { BasicTextEditor } from "@/features/editor/text-editor";
import { getEditorJsonPayload } from "@/features/editor/text-editor/lib/get-editor-json-payload";
import { useBlockContext } from "../../../grid/ui/block-context";
import type { BentoBlock, BentoBlockType } from "../../model/types";

export function FullscreenTitle() {
  const { block } = useBlockContext();

  const { t } = useLingui();

  const { updateBentoBlockField } = useProfile(
    (state) => ({
      updateBentoBlockField: state.updateBentoBlockField,
    }),
    "shallow"
  );

  const textBlock = block as BentoBlock<typeof BentoBlockType.TEXT>;

  useRefresh([textBlock.properties.content]);

  if (!textBlock) return null;

  return (
    <motion.div className="w-full" layout transition={{ duration: 0 }}>
      <BasicTextEditor
        autofocus="end"
        className="editor-dynamic"
        content={textBlock.properties.content}
        onUpdate={(props) => {
          const payload = getEditorJsonPayload(props.editor.getJSON());

          updateBentoBlockField(textBlock.id, "properties", {
            ...textBlock.properties,
            content: payload,
          });
        }}
        placeholder={t`Type text here or "/" to open the commands`}
      />
    </motion.div>
  );
}
