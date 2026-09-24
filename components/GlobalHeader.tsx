"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { Header, type HeaderVariant } from "@/components/Header";

/*
 * Dark hero pages:
 * white/orange DI-Logo-WO.svg
 * light navigation text
 */
const DARK_HERO_ROUTES = [
  "/",
  "/about",
  "/about-us",
  "/services",
  "/operations",
  "/quality",
  "/global",
  "/vision-2030",
];

/*
 * Light hero pages:
 * DI-Logo-Color.svg
 * primary/navy navigation text
 */
const LIGHT_HERO_ROUTES = ["/contact", "/contacts", "/blog"];

function normalizePath(value: string) {
  if (!value) return "/";

  const cleanPath = value.split("?")[0].split("#")[0];

  if (cleanPath === "/") {
    return "/";
  }

  return cleanPath.replace(/\/+$/, "");
}

function matchesRoute(pathname: string, route: string) {
  const currentPath = normalizePath(pathname);

  const targetPath = normalizePath(route);

  if (targetPath === "/") {
    return currentPath === "/";
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

function getHeaderVariant(pathname: string): HeaderVariant {
  const currentPath = normalizePath(pathname);

  const isLightHero = LIGHT_HERO_ROUTES.some((route) =>
    matchesRoute(currentPath, route),
  );

  if (isLightHero) {
    return "light";
  }

  const isDarkHero = DARK_HERO_ROUTES.some((route) =>
    matchesRoute(currentPath, route),
  );

  if (isDarkHero) {
    return "dark";
  }

  /*
   * Default:
   * use dark hero version.
   */
  return "dark";
}

export function GlobalHeader() {
  const pathname = usePathname();

  const isHome = normalizePath(pathname) === "/";

  const headerVariant = getHeaderVariant(pathname);

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(
      ".global-site-header .header__menu-item[href]",
    );

    const currentPath = normalizePath(pathname);

    links.forEach((link) => {
      const href = link.getAttribute("href");

      link.removeAttribute("data-active-route");

      link.removeAttribute("aria-current");

      if (!href) return;

      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      let targetPath = "/";

      try {
        const url = new URL(href, window.location.origin);

        if (url.origin !== window.location.origin) {
          return;
        }

        targetPath = normalizePath(url.pathname);
      } catch {
        targetPath = normalizePath(href);
      }

      const active =
        targetPath === "/"
          ? currentPath === "/"
          : currentPath === targetPath ||
            currentPath.startsWith(`${targetPath}/`);

      if (active) {
        link.setAttribute("data-active-route", "true");

        link.setAttribute("aria-current", "page");
      }
    });
  }, [pathname]);

  return (
    <>
      <div
        className={`global-site-header ${
          isHome ? "global-site-header--home" : "global-site-header--inner"
        } global-site-header--${headerVariant}`}
        data-header-variant={headerVariant}
      >
        <Header variant={headerVariant} />
      </div>

      <style jsx global>{`
        /*
         * Hide any old Header component
         * still present inside individual pages.
         */
        .global-site-header ~ * .header {
          display: none !important;
        }

        .global-site-header .header__menu-item[data-active-route="true"] {
          box-shadow: inset 0 -1.5px 0 currentColor;
        }
      `}</style>
    </>
  );
}
