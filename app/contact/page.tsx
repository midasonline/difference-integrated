import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Difference Integrated",
  description:
    "Contact Difference Integrated for transportation, project logistics, fleet operations and logistics coordination across Saudi Arabia.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
