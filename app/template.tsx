"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/Footer";
import { stripLocaleFromPathname } from "@/i18n/routing";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const pathname = usePathname();
  const currentPath = stripLocaleFromPathname(pathname);

  const isHomePage = currentPath === "/";
  const isAboutPage = currentPath === "/about";

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
