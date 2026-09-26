import type { Metadata } from "next";
import AboutExperience from "@/components/about/AboutExperience";

export const metadata: Metadata = {
  title: "About Us | Difference Integrated",
  description:
    "Learn how Difference Integrated approaches transportation and logistics operations across Saudi Arabia.",
};

export default function AboutPage() {
  return <AboutExperience />;
}
