import type { Metadata } from "next";
import { AboutExperience } from "@/components/about/AboutExperience";

export const metadata: Metadata = {
  title: "About Us | Difference Integrated Logistics",
  description:
    "Learn how Difference Integrated supports freight movement, material transportation, fleet operations and project logistics across Saudi Arabia.",
};

export default function AboutPage() {
  return <AboutExperience />;
}
