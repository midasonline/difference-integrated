import type { Metadata } from "next";
import { headers } from "next/headers";

import { GlobalHeader } from "@/components/GlobalHeader";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { defaultLocale, isLocale, localeDetails } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import "./globals.css";

export const metadata: Metadata = {
  title: "Difference Integrated Logistics",
  description:
    "Heavy transport, material movement and logistics solutions across Saudi Arabia.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-di-locale");
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const direction = localeDetails[locale].dir;

  return (
    <html lang={locale} dir={direction}>
      <body>
        <I18nProvider locale={locale} dictionary={dictionary}>
          <GlobalHeader />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
