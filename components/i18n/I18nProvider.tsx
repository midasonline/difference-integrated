"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePathname } from "@/i18n/routing";

type I18nContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  localePath: (pathname: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
};

export function I18nProvider({
  locale,
  dictionary,
  children,
}: I18nProviderProps) {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dictionary,
      localePath: (pathname: string) => localizePathname(pathname, locale),
    }),
    [dictionary, locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider.");
  }

  return context;
}
