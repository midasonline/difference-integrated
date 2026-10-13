import type { Metadata } from "next";

import PrivacyPolicyClient from "@/app/privacy-policy/PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Difference Integrated",
  description:
    "Learn how Difference Integrated collects, uses, stores, and protects personal information.",
};

export default function LocalizedPrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
