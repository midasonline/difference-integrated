import type { Metadata } from "next";
import { GlobalHeader } from "@/components/GlobalHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Difference Integrated Logistics",
  description:
    "Heavy transport, material movement and logistics solutions across Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalHeader />

        {children}
      </body>
    </html>
  );
}
