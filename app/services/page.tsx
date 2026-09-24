import type { Metadata } from "next";
import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | Difference Integrated",
  description:
    "Explore Difference Integrated construction logistics, material transportation, fleet and freight solutions across Saudi Arabia.",
};

export default function ServicesPage(): React.JSX.Element {
  return <ServicesPageClient />;
}
