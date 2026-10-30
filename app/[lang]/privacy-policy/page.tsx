import PrivacyPolicyClient from "@/components/legal/PrivacyPolicyClient";

type PrivacyPolicyPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function PrivacyPolicyPage({
  params,
}: PrivacyPolicyPageProps) {
  const { lang } = await params;

  return <PrivacyPolicyClient lang={lang} />;
}