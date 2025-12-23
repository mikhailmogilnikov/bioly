import type { JSONContent } from "@tiptap/react";

export const getEditorJsonPayload = (jsonContent: JSONContent | null) => {
  const payload: JSONContent | null = jsonContent;
  const content = payload?.content;

  if (!(content && Array.isArray(content) && content.length > 0)) return null;

  const isOnlyEmptyParagraph =
    content.length === 1 &&
    JSON.stringify(content?.[0]) === '{"type":"paragraph"}';

  if (isOnlyEmptyParagraph) return null;

  return payload;
};
