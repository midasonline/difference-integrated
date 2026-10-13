import type { Metadata } from "next";

import AboutExperience from "@/components/about/AboutExperience";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.about.metadata.title,
    description: dictionary.about.metadata.description,
  };
}

export default function LocalizedAboutPage() {
  return <AboutExperience />;
}
