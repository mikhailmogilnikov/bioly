"use client";

import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from "@tiptap/react";
import { useEffect, useState } from "react";
import { Spoiler } from "./spoiler";

export const SpoilerNodeView: React.FC<NodeViewProps> = (props) => {
  const { editor } = props;
  const isStatic =
    Boolean(props.node?.attrs?.isStatic) ||
    Boolean(props.extension?.options?.isStatic) ||
    Boolean((props as { isStatic?: boolean }).isStatic);
  const [isFocused, setIsFocused] = useState(editor.isFocused);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    editor.on("focus", handleFocus);
    editor.on("blur", handleBlur);

    return () => {
      editor.off("focus", handleFocus);
      editor.off("blur", handleBlur);
    };
  }, [editor]);

  const shouldMask = isStatic || !isFocused;

  return (
    <NodeViewWrapper
      as="span"
      className="spoiler-node-view inline"
      data-spoiler-node="true"
      style={{ whiteSpace: "normal" }}
    >
      {shouldMask && (
        <Spoiler revealOn="click">
          <NodeViewContent
            // @ts-expect-error - NodeViewContent is not typed correctly
            as="span"
            className="inline"
            style={{ display: "inline" }}
          />
        </Spoiler>
      )}
      {!shouldMask && (
        <span className="rounded-sm bg-foreground/15">
          <NodeViewContent
            // @ts-expect-error - NodeViewContent is not typed correctly
            as="span"
            className="inline"
            style={{ display: "inline" }}
          />
        </span>
      )}
    </NodeViewWrapper>
  );
};
