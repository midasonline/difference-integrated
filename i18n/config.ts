export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookieName = "DI_LOCALE";

export const localeDetails: Record<
  Locale,
  {
    code: string;
    label: string;
    nativeLabel: string;
    dir: "ltr" | "rtl";
  }
> = {
  en: {
    code: "EN",
    label: "English",
    nativeLabel: "English",
    dir: "ltr",
  },
  ar: {
    code: "AR",
    label: "Arabic",
    nativeLabel: "العربية",
    dir: "rtl",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}
