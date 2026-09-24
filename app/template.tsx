"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/Footer";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about";

  return (
    <>
      {children}

      {!isHomePage && !isAboutPage ? (
        <div className="bg-[var(--mvp-dark)]">
          <Footer />
        </div>
      ) : null}
    </>
  );
}
