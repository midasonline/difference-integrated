import type { Locale } from "@/i18n/config";

export type Dictionary = typeof import("@/i18n/messages/en").default;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/i18n/messages/en").then((module) => module.default),
  ar: () => import("@/i18n/messages/ar").then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
