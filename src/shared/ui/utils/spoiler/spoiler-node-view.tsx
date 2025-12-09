import type { NodeViewProps } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import { Spoiler } from "./spoiler";

export const SpoilerNodeView: React.FC<NodeViewProps> = ({ editor }) => {
  const [hidden, setHidden] = useState(true);

  const handleSpoilerClick = (e: React.MouseEvent) => {
    // Проверяем, есть ли выделение текста в DOM (для мобильных устройств)
    // Это нужно проверять первым, так как на мобильных устройствах выделение может быть в DOM, но не в состоянии редактора
    const domSelection = window.getSelection();
    if (domSelection && domSelection.toString().length > 0) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Проверяем, есть ли выделение текста в редакторе
    const { selection: editorSelection } = editor.state;
    const { empty } = editorSelection;

    // Если текст выделен, предотвращаем клик на спойлер
    if (!empty) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Если текст не выделен, переключаем состояние спойлера
    setHidden((s) => !s);
  };

  return (
    <NodeViewWrapper
      as="span"
      className="spoiler-node-view"
      contentEditable={false}
      style={{ display: "inline", whiteSpace: "normal" }}
    >
      <Spoiler hidden={hidden} onClick={handleSpoilerClick} revealOn={false}>
        <NodeViewContent
          // @ts-expect-error - NodeViewContent is not typed correctly
          as="span"
          className="content"
          style={{ display: "inline" }}
        />
      </Spoiler>
    </NodeViewWrapper>
  );
};
