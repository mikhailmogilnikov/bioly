import { useLingui } from "@lingui/react/macro";
import { motion } from "motion/react";
import { useRefresh } from "muuri-react";
import type { ChangeEvent } from "react";
import { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useProfile } from "@/features/editor/profile/use-profile";
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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 100) return;

    updateBentoBlockField(textBlock.id, "properties", {
      ...textBlock.properties,
      content: e.target.value,
    });
  };

  return (
    <motion.div className="w-full" layout transition={{ duration: 0 }}>
      <TextareaAutosize
        className="wrap-break-word w-full resize-none font-bold outline-none"
        onChange={handleChange}
        placeholder={t`Type your text here`}
        ref={textRef}
        value={textBlock.properties.content}
      />
    </motion.div>
  );
}
