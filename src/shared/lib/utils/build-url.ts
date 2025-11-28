import { CONFIG } from "@/shared/model/config";

/**
 * Строит URL для заданного slug
 * @param slug - Slug для построения URL
 * @param withoutHttps - Флаг, указывающий, что https не нужно включать в URL
 * @param domain - Домен для построения URL
 * @returns Сформированный URL
 */
export const buildUrl = (
  slug: string,
  options?: { withoutHttps?: boolean; domain?: string } | undefined
) => {
  const { withoutHttps, domain } = {
    withoutHttps: false,
    domain: CONFIG.domain,
    ...(options ?? {}),
  };
  let result = `${domain}/${slug}`;

  if (!withoutHttps) {
    result = `https://${result}`;
  }

  return result;
};
