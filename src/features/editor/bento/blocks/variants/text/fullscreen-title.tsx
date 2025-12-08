import { useLingui } from "@lingui/react/macro";
import type { JSONContent } from "@tiptap/react";
import { motion } from "motion/react";
import { useRefresh } from "muuri-react";
import { useEffect, useRef } from "react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { BasicTextEditor } from "@/features/editor/text-editor";
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

  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
      const length = textRef.current.value.length;

      textRef.current.setSelectionRange(length, length);
    }
  }, []);

  useRefresh([textBlock.properties.content]);

  if (!textBlock) return null;

  return (
    <motion.div className="w-full" layout transition={{ duration: 0 }}>
      <BasicTextEditor
        autofocus
        content={textBlock.properties.content}
        onUpdate={(props) => {
          let payload: JSONContent | null = props.editor.getJSON();

          const isEmptyParagraph =
            payload?.content &&
            payload.content.length === 1 &&
            JSON.stringify(payload.content?.[0]) === '{"type":"paragraph"}';

          if (isEmptyParagraph) {
            payload = null;
          }

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
