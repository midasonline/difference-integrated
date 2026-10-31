import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Teampage from "@/components/team/ContactPageClient";

type ContactPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.contactPage.metadata.title,
    description: dictionary.contactPage.metadata.description,
  };
}

export default function LocalizedContactPage(): React.JSX.Element {
  return <Teampage />;
}
