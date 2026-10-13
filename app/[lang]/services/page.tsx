import type { Metadata } from "next";

import ServicesPageClient from "@/components/services/ServicesPageClient";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type ServicesPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.servicesPage.metadata.title,
    description: dictionary.servicesPage.metadata.description,
  };
}

export default function LocalizedServicesPage(): React.JSX.Element {
  return <ServicesPageClient />;
}
