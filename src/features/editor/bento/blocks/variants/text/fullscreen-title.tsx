import { useLingui } from "@lingui/react/macro";
import { motion } from "motion/react";
import { useRefresh } from "muuri-react";
import type { ChangeEvent } from "react";
import { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useProfile } from "@/features/editor/profile/use-profile";
import type { BentoBlock, BentoBlockType } from "../../model/types";

export function FullscreenTitle({ itemId }: { itemId: string }) {
  const { t } = useLingui();

  const { bento, updateProfile } = useProfile(
    (state) => ({
      bento: state.profile.bento,
      updateProfile: state.updateProfile,
    }),
    "shallow"
  );

  const textRef = useRef<HTMLTextAreaElement>(null);

  const bentoItem = bento.find((item) => item.id === itemId) as BentoBlock<
    typeof BentoBlockType.TEXT
  >;

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
      const length = textRef.current.value.length;

      textRef.current.setSelectionRange(length, length);
    }
  }, []);

  useRefresh([bentoItem.properties.content]);

  if (!bentoItem) return null;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 100) return;

    const newBentoItem = {
      ...bentoItem,
      properties: { ...bentoItem.properties, content: e.target.value },
    };

    const newBento = bento.map((item) =>
      item.id === itemId ? newBentoItem : item
    );

    updateProfile({ bento: newBento });
  };

  return (
    <motion.div className="w-full" layout transition={{ duration: 0 }}>
      <TextareaAutosize
        className="wrap-break-word w-full resize-none font-bold outline-none"
        onChange={handleChange}
        placeholder={t`Type your text here`}
        ref={textRef}
        value={bentoItem.properties.content}
      />
    </motion.div>
  );
}
