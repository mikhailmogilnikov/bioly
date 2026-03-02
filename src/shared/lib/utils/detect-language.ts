/** biome-ignore-all lint/performance/useTopLevelRegex: we need to use top-level regexes for performance reasons */
import { franc } from "franc";

/** ISO 639-3 (franc) → ISO 639-1 (our LANG_OPTIONS) */
const ISO_639_3_TO_639_1: Record<string, string> = {
  eng: "en",
  rus: "ru",
  deu: "de",
  fra: "fr",
  spa: "es",
  ita: "it",
  por: "pt",
  jpn: "ja",
  zho: "zh",
  cmn: "zh",
  kor: "ko",
  ara: "ar",
  nld: "nl",
  pol: "pl",
  tur: "tr",
  ukr: "uk",
  vie: "vi",
  tha: "th",
  ind: "id",
  hin: "hi",
  swe: "sv",
};

const SUPPORTED_LANG_CODES = new Set(Object.values(ISO_639_3_TO_639_1));

/** Только наши языки — franc иначе может вернуть koi, bel и т.п. вместо rus */
const FRANC_ONLY = Object.keys(ISO_639_3_TO_639_1) as string[];

/** Минимальная длина текста для надёжного определения (franc рекомендует ~20+ символов) */
const MIN_TEXT_LENGTH = 10;

/**
 * Извлекает plain text из TipTap JSONContent (рекурсивно собирает text из узлов)
 */
export function extractTextFromJsonContent(
  json: { content?: unknown[]; text?: string } | null | undefined
): string {
  if (!json) return "";

  if (typeof json.text === "string") {
    return json.text;
  }

  if (Array.isArray(json.content)) {
    return json.content
      .map((node) => extractTextFromJsonContent(node as typeof json))
      .filter(Boolean)
      .join(" ");
  }

  return "";
}

/**
 * Определяет язык по тексту (name + description + meta_description).
 * Возвращает ISO 639-1 код или null, если определить не удалось.
 */
export function detectLanguageFromText(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.length < MIN_TEXT_LENGTH) return null;

  const detected = franc(trimmed, {
    minLength: MIN_TEXT_LENGTH,
    only: FRANC_ONLY,
  });
  if (detected === "und") return null;

  let resolved = detected;
  if (detected === "ukr" || detected === "rus") {
    const hasUkr = /[їєґі]/u.test(trimmed);
    const hasRus = /[ёыэ]/u.test(trimmed);
    const hasRusOnly = /[и]/u.test(trimmed) && !/[і]/u.test(trimmed);
    if (hasUkr && !hasRus) resolved = "ukr";
    else if (hasRus && !hasUkr) resolved = "rus";
    else if (detected === "ukr" && hasRusOnly && !hasUkr) resolved = "rus";
  }

  const iso6391 = ISO_639_3_TO_639_1[resolved];
  return iso6391 && SUPPORTED_LANG_CODES.has(iso6391) ? iso6391 : null;
}
