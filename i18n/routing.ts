import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";

  const [pathOnly] = pathname.split(/[?#]/, 1);
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;

  if (withLeadingSlash === "/") return "/";

  return withLeadingSlash.replace(/\/+$/, "") || "/";
}

export function getLocaleFromPathname(pathname: string): Locale {
  const normalized = normalizePathname(pathname);
  const firstSegment = normalized.split("/").filter(Boolean)[0];

  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocaleFromPathname(pathname: string): string {
  const normalized = normalizePathname(pathname);
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length === 0 || !isLocale(segments[0])) {
    return normalized;
  }

  const withoutLocale = `/${segments.slice(1).join("/")}`;
  return withoutLocale === "/" ? "/" : withoutLocale.replace(/\/+$/, "");
}

export function localizePathname(pathname: string, locale: Locale): string {
  const basePath = stripLocaleFromPathname(pathname);

  if (locale === defaultLocale) {
    return basePath;
  }

  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}
