"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { usePathname } from "next/navigation";

import { navItems } from "@/data/site";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { HoverText } from "@/components/ui/HoverText";
import { ContactModal } from "@/components/ui/ContactModal";
import { useI18n } from "@/components/i18n/I18nProvider";

import {
  localeCookieName,
  localeDetails,
  locales,
  type Locale,
} from "@/i18n/config";

import { localizePathname, stripLocaleFromPathname } from "@/i18n/routing";

export type HeaderVariant = "dark" | "light";

type HeaderProps = {
  variant?: HeaderVariant;
  instantRevealOnScrollUp?: boolean;
};

type HeaderStyle = CSSProperties & {
  "--header-nav-color": string;
};

export function Header({
  variant = "dark",
  instantRevealOnScrollUp = false,
}: HeaderProps) {
  const pathname = usePathname();

  const { locale, dictionary, localePath } = useI18n();

  const common = dictionary.common;

  const [langOpen, setLangOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [contactOpen, setContactOpen] = useState(false);

  const [headerEntered, setHeaderEntered] = useState(false);

  const [headerVisible, setHeaderVisible] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);

  const ticking = useRef(false);

  const overlayOpenRef = useRef(false);

  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigationLabels: Record<string, string> = {
    Home: common.navigation.home,
    "About Us": common.navigation.about,
    Services: common.navigation.services,
    Blog: common.navigation.blog,
    Contacts: common.navigation.contact,
  };

  const getLocalizedHref = (href: string) =>
    href.startsWith("/") ? localePath(href) : href;

  const handleLanguageChange = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      setLangOpen(false);
      return;
    }

    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    const basePath = stripLocaleFromPathname(pathname);

    const nextPath = localizePathname(basePath, nextLocale);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    setLangOpen(false);

    window.requestAnimationFrame(() => {
      window.location.assign(nextPath);
    });
  };

  useEffect(() => {
    overlayOpenRef.current = menuOpen || langOpen || contactOpen;

    if (overlayOpenRef.current) {
      setHeaderVisible(true);
    }
  }, [menuOpen, langOpen, contactOpen]);

  useEffect(() => {
    let frame = 0;

    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    let revealed = false;

    const revealHeader = () => {
      if (revealed) return;

      revealed = true;

      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
      }

      revealTimerRef.current = setTimeout(() => {
        setHeaderEntered(true);
      }, 250);
    };

    const handleHeroReady = () => {
      revealHeader();
    };

    window.addEventListener("mvp:hero-slider-start", handleHeroReady, {
      once: true,
    });

    const hasHomePreloader = Boolean(document.querySelector(".preloader"));

    if (!hasHomePreloader) {
      const checkPageTransition = () => {
        const transition =
          document.querySelector<HTMLElement>(".transition-plug");

        if (!transition) {
          revealTimerRef.current = setTimeout(revealHeader, 700);

          return;
        }

        const rect = transition.getBoundingClientRect();

        const style = window.getComputedStyle(transition);

        const opacity = Number.parseFloat(style.opacity || "1");

        const cleared =
          rect.height <= 2 ||
          rect.bottom <= 2 ||
          rect.top >= window.innerHeight - 2 ||
          opacity <= 0.02 ||
          style.display === "none" ||
          style.visibility === "hidden";

        if (cleared) {
          revealTimerRef.current = setTimeout(revealHeader, 700);

          return;
        }

        frame = window.requestAnimationFrame(checkPageTransition);
      };

      frame = window.requestAnimationFrame(checkPageTransition);
    }

    fallbackTimer = setTimeout(() => {
      revealHeader();
    }, 6500);

    return () => {
      window.removeEventListener("mvp:hero-slider-start", handleHeroReady);

      window.cancelAnimationFrame(frame);

      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }

      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const getReliableScrollY = () => {
      const nativeY = Math.max(
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
      );

      const smoothContent = document.getElementById("smooth-content");

      if (!smoothContent) {
        return nativeY;
      }

      const smoothY = Math.max(-smoothContent.getBoundingClientRect().top, 0);

      return Math.max(nativeY, smoothY);
    };

    lastScrollY.current = getReliableScrollY();

    setScrolled(lastScrollY.current > 60);

    let touchStartY = 0;

    const revealImmediately = () => {
      if (!instantRevealOnScrollUp) {
        return;
      }

      const currentScrollY = getReliableScrollY();

      if (currentScrollY > 40) {
        setScrolled(true);
      }

      setHeaderVisible(true);
    };

    const updateHeader = () => {
      const currentScrollY = getReliableScrollY();

      const difference = currentScrollY - lastScrollY.current;

      const shouldBeScrolled = currentScrollY > 60;

      setScrolled((current) =>
        current === shouldBeScrolled ? current : shouldBeScrolled,
      );

      if (overlayOpenRef.current) {
        setHeaderVisible(true);

        lastScrollY.current = currentScrollY;

        ticking.current = false;

        return;
      }

      if (currentScrollY <= 40) {
        setHeaderVisible(true);

        lastScrollY.current = currentScrollY;

        ticking.current = false;

        return;
      }

      if (Math.abs(difference) < 4) {
        ticking.current = false;

        return;
      }

      if (difference < 0) {
        setHeaderVisible(true);
      } else if (currentScrollY > 100) {
        setHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;

      ticking.current = false;
    };

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(updateHeader);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY < -1) {
        revealImmediately();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartY;

      if (currentY - touchStartY > 3) {
        revealImmediately();
      }

      touchStartY = currentY;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        event.key === "Home"
      ) {
        revealImmediately();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    if (instantRevealOnScrollUp) {
      window.addEventListener("wheel", handleWheel, {
        passive: true,
        capture: true,
      });

      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
        capture: true,
      });

      window.addEventListener("touchmove", handleTouchMove, {
        passive: true,
        capture: true,
      });

      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("wheel", handleWheel, true);

      window.removeEventListener("touchstart", handleTouchStart, true);

      window.removeEventListener("touchmove", handleTouchMove, true);

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [instantRevealOnScrollUp]);

  const useLightContent = variant === "dark" && !scrolled;

  const logoSrc = useLightContent
    ? "/assets/img/DI-Logo-WO.svg"
    : "/assets/img/DI-Logo-Color.svg";

  const headerStyle: HeaderStyle = {
    "--header-nav-color": useLightContent
      ? "var(--mvp-light)"
      : "var(--mvp-primary)",
  };

  return (
    <>
      <header
        className="header pointer-events-none fixed inset-x-0 top-0 z-[999]"
        style={headerStyle}
        data-header-variant={variant}
        data-header-tone={useLightContent ? "light" : "dark"}
        data-header-scrolled={scrolled ? "true" : "false"}
      >
        <div
          className="header__scroll-shell pointer-events-auto"
          style={{
            transform:
              headerEntered && headerVisible
                ? "translate3d(0,0,0)"
                : "translate3d(0,-145%,0)",

            backgroundColor: scrolled ? "rgba(244,241,234,.96)" : "transparent",

            backdropFilter: scrolled ? "blur(14px)" : "none",

            WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",

            boxShadow: scrolled ? "0 8px 30px rgba(25,37,91,.08)" : "none",

            transition:
              instantRevealOnScrollUp &&
              headerEntered &&
              headerVisible &&
              scrolled
                ? "transform .06s linear, background-color .35s ease, box-shadow .35s ease, backdrop-filter .35s ease"
                : "transform 1.25s cubic-bezier(.16,1,.3,1), background-color .35s ease, box-shadow .35s ease, backdrop-filter .35s ease",

            willChange: "transform",
          }}
        >
          <div className="header__container">
            <a href={localePath("/")} className="header__logo">
              <img
                key={logoSrc}
                src={logoSrc}
                alt="Difference Integrated Logistics"
                className="header__logo-img"
              />
            </a>

            <nav className="header__menu">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={getLocalizedHref(item.href)}
                  className="header__menu-item text-hover"
                >
                  <HoverText secondClassName="text-accent">
                    {navigationLabels[item.label] ?? item.label}
                  </HoverText>
                </a>
              ))}
            </nav>

            <div className="header__actions">
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="header__hamburger-btn"
              >
                {menuOpen ? common.header.close : common.header.menu}
              </button>

              <AnimatedButton
                className="header__contact-btn"
                onClick={() => setContactOpen(true)}
              >
                {common.header.contactUs}
              </AnimatedButton>

              <div className="header__lang">
                <button
                  type="button"
                  onClick={() => setLangOpen((value) => !value)}
                  className={`header__lang-heading ${langOpen ? "active" : ""}`}
                >
                  <span className="header__lang-inner">
                    {localeDetails[locale].code}

                    <svg viewBox="0 0 13 12" fill="none" aria-hidden="true">
                      <path
                        d="M1.267 7.06149L5.84961 11.7365C6.19441 12.0878 6.80452 12.0878 7.15054 11.7365L11.7331 7.06149C12.0902 6.69643 12.0889 6.10663 11.7295 5.74406C11.37 5.38148 10.7905 5.38148 10.4322 5.74654L7.41586 8.82221V0.931267C7.41586 0.415966 7.00504 0 6.49885 0C5.99266 0 5.58184 0.415966 5.58184 0.931267V8.82221L2.56671 5.74654C2.38698 5.56401 2.15223 5.47337 1.91625 5.47337C1.68272 5.47337 1.44796 5.56401 1.26945 5.74406C0.911205 6.10663 0.909982 6.69643 1.267 7.06149Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`header__lang-dropdown ${
                    langOpen ? "header__lang-dropdown--open" : ""
                  }`}
                >
                  {locales.map((itemLocale) => (
                    <button
                      key={itemLocale}
                      type="button"
                      onClick={() => handleLanguageChange(itemLocale)}
                      className={`header__lang-item ${
                        itemLocale === locale ? "header__lang-item--active" : ""
                      }`}
                    >
                      {localeDetails[itemLocale].code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`header__mobile-menu ${
            menuOpen
              ? "header__mobile-menu--open"
              : locale === "ar"
                ? "header__mobile-menu--closed-ar"
                : "header__mobile-menu--closed"
          }`}
        >
          <nav className="header__mobile-nav">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={getLocalizedHref(item.href)}
                onClick={() => setMenuOpen(false)}
              >
                {navigationLabels[item.label] ?? item.label}
              </a>
            ))}
          </nav>

          <AnimatedButton
            className="header__mobile-contact-btn"
            onClick={() => {
              setMenuOpen(false);

              setContactOpen(true);
            }}
          >
            {common.header.contactUs}
          </AnimatedButton>
        </div>

        <div className="pointer-events-auto">
          <ContactModal
            open={contactOpen}
            onClose={() => setContactOpen(false)}
          />
        </div>
      </header>

      <style jsx global>{`
        /* =========================================
           MAIN HEADER WIDTH
           THIS CONTROLS THE 90% WIDTH
        ========================================= */

        .header__scroll-shell {
          width: 100%;
        }

        .header__container {
          width: 90% !important;

          max-width: none !important;

          margin-inline: auto !important;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 24px;

          padding: 18px 0;
        }

        /* =========================================
           LOGO
        ========================================= */

        .header__logo {
          display: flex;

          align-items: center;

          flex: 0 0 auto;
        }

        .header__logo-img {
          display: block;

          width: 154px;

          height: auto;
        }

        /* =========================================
           DESKTOP NAV
        ========================================= */

        .header__menu {
          flex: 1;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 38px;

          min-width: 0;

          white-space: nowrap;

          color: var(--header-nav-color);

          font-size: 24px;

          line-height: 1;

          text-transform: uppercase;
        }

        .header__menu-item {
          color: var(--header-nav-color) !important;

          transition: color 0.3s ease;
        }

        .header__menu-item:hover {
          color: var(--mvp-accent) !important;
        }

        /* =========================================
           ACTIONS
        ========================================= */

        .header__actions {
          display: flex;

          align-items: center;

          gap: 9px;

          flex: 0 0 auto;
        }

        /* =========================================
           CONTACT BUTTON
        ========================================= */

        .header__contact-btn {
          display: inline-flex !important;

          height: 58px !important;

          padding-inline: 32px !important;

          border-radius: 5px !important;

          font-size: 20px !important;

          line-height: 1 !important;

          white-space: nowrap;
        }

        /* =========================================
           MENU BUTTON
        ========================================= */

        .header__hamburger-btn {
          display: none;

          align-items: center;

          justify-content: center;

          min-width: 76px;

          height: 48px;

          padding: 0 15px;

          border: 1px solid currentColor;

          border-radius: 5px;

          background: var(--mvp-light);

          color: var(--mvp-primary);

          font-size: 20px;

          line-height: 1;

          text-transform: uppercase;

          white-space: nowrap;

          cursor: pointer;
        }

        /* =========================================
           LANGUAGE
        ========================================= */

        .header__lang {
          position: relative;

          flex: 0 0 auto;
        }

        .header__lang-heading {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          width: 58px;

          height: 58px;

          padding: 0;

          border: 1px solid currentColor;

          border-radius: 5px;

          background: var(--mvp-light);

          color: var(--mvp-primary);

          cursor: pointer;
        }

        .header__lang-inner {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 5px;

          font-size: 20px;

          line-height: 1;
        }

        .header__lang-inner svg {
          width: 9px;

          height: 9px;
        }

        /* =========================================
           LANGUAGE DROPDOWN
        ========================================= */

        .header__lang-dropdown {
          position: absolute;

          top: calc(100% + 6px);

          right: 0;

          width: 58px;

          display: flex;

          flex-direction: column;

          padding: 7px 0;

          border-radius: 5px;

          background: var(--mvp-light);

          opacity: 0;

          visibility: hidden;

          pointer-events: none;

          transform: translateY(-5px);

          transition:
            opacity 0.25s ease,
            transform 0.25s ease,
            visibility 0.25s ease;
        }

        [dir="rtl"] .header__lang-dropdown {
          right: auto;

          left: 0;
        }

        .header__lang-dropdown--open {
          opacity: 1;

          visibility: visible;

          pointer-events: auto;

          transform: translateY(0);
        }

        .header__lang-item {
          width: 100%;

          padding: 7px 3px;

          color: var(--mvp-primary);

          font-size: 12px;

          line-height: 1;

          text-align: center;

          text-transform: uppercase;
        }

        .header__lang-item:hover,
        .header__lang-item--active {
          color: var(--mvp-accent);
        }

        /* =========================================
           MOBILE MENU PANEL
        ========================================= */

        .header__mobile-menu {
          pointer-events: auto;

          position: fixed;

          inset: 0;

          z-index: -1;

          display: none;

          width: 100%;

          min-height: 100dvh;

          flex-direction: column;

          justify-content: space-between;

          padding: 90px 5% max(18px, env(safe-area-inset-bottom));

          background: var(--mvp-primary);

          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header__mobile-menu--closed {
          transform: translateX(100%);
        }

        .header__mobile-menu--closed-ar {
          transform: translateX(-100%);
        }

        .header__mobile-menu--open {
          transform: translateX(0);
        }

        .header__mobile-nav {
          flex: 1;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 20px;

          color: var(--mvp-light);

          font-size: 28px;

          line-height: 1.1;

          text-align: center;

          text-transform: uppercase;
        }

        [dir="rtl"] .header__mobile-nav {
          font-family: Tahoma, Arial, "Segoe UI", sans-serif;

          font-size: 26px;

          line-height: 1.5;

          letter-spacing: 0;

          text-transform: none;
        }

        .header__mobile-contact-btn {
          width: min(100%, 340px) !important;

          min-height: 48px !important;

          margin-inline: auto;

          padding-inline: 20px !important;

          font-size: 14px !important;
        }

        /* =========================================
           LAPTOP
           1366 AND BELOW
        ========================================= */

        @media (max-width: 1366px) {
          .header__container {
            gap: 18px;

            padding: 14px 0;
          }

          .header__logo-img {
            width: 132px;
          }

          .header__menu {
            gap: 25px;

            font-size: 13px;
          }

          .header__contact-btn {
            height: 50px !important;

            padding-inline: 24px !important;

            font-size: 12px !important;
          }

          .header__lang-heading {
            width: 50px;

            height: 50px;
          }

          .header__lang-inner {
            font-size: 11px;
          }
        }

        /* =========================================
           SMALL LAPTOP / TABLET
        ========================================= */

        @media (max-width: 1100px) {
          .header__container {
            min-height: 64px;

            gap: 10px;

            padding: 9px 0;
          }

          .header__menu,
          .header__contact-btn {
            display: none !important;
          }

          .header__hamburger-btn {
            display: inline-flex;

            min-width: 70px;

            height: 44px;

            padding-inline: 12px;

            font-size: 11px;
          }

          .header__lang-heading {
            width: 45px;

            height: 44px;
          }

          .header__lang-inner {
            font-size: 10.5px;
          }

          .header__lang-inner svg {
            width: 8px;

            height: 8px;
          }

          .header__lang-dropdown {
            width: 45px;
          }

          .header__logo-img {
            width: 116px;
          }

          .header__mobile-menu {
            display: flex;
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 768px) {
          .header__container {
            min-height: 58px;

            gap: 7px;

            padding: 7px 0;
          }

          .header__logo-img {
            width: 102px;
          }

          .header__actions {
            gap: 5px;
          }

          .header__hamburger-btn {
            min-width: 64px;

            height: 40px;

            padding-inline: 9px;

            font-size: 10px;

            border-radius: 4px;
          }

          .header__lang-heading {
            width: 41px;

            height: 40px;

            border-radius: 4px;
          }

          .header__lang-inner {
            gap: 3px;

            font-size: 10px;
          }

          .header__lang-inner svg {
            width: 7px;

            height: 7px;
          }

          .header__lang-dropdown {
            width: 41px;

            top: calc(100% + 5px);
          }

          .header__lang-item {
            padding-block: 6px;

            font-size: 10px;
          }

          .header__mobile-menu {
            padding: 76px 5% max(16px, env(safe-area-inset-bottom));
          }

          .header__mobile-nav {
            gap: 17px;

            font-size: 25px;
          }

          [dir="rtl"] .header__mobile-nav {
            font-size: 23px;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 480px) {
          .header__container {
            min-height: 54px;

            gap: 5px;

            padding: 6px 0;
          }

          .header__logo-img {
            width: 88px;
          }

          .header__hamburger-btn {
            min-width: 58px;

            height: 36px;

            padding-inline: 7px;

            font-size: 9px;
          }

          .header__lang-heading {
            width: 37px;

            height: 36px;
          }

          .header__lang-inner {
            gap: 3px;

            font-size: 9px;
          }

          .header__lang-inner svg {
            width: 6px;

            height: 6px;
          }

          .header__lang-dropdown {
            width: 37px;
          }

          .header__lang-item {
            font-size: 9px;
          }

          .header__mobile-menu {
            padding: 66px 5% max(14px, env(safe-area-inset-bottom));
          }

          .header__mobile-nav {
            gap: 14px;

            font-size: 22px;
          }

          [dir="rtl"] .header__mobile-nav {
            font-size: 21px;

            line-height: 1.45;
          }

          .header__mobile-contact-btn {
            min-height: 44px !important;

            font-size: 12px !important;
          }
        }

        /* =========================================
           VERY SMALL MOBILE
        ========================================= */

        @media (max-width: 380px) {
          .header__logo-img {
            width: 82px;
          }

          .header__hamburger-btn {
            min-width: 54px;

            height: 34px;

            padding-inline: 6px;

            font-size: 8.5px;
          }

          .header__lang-heading {
            width: 35px;

            height: 34px;
          }

          .header__lang-inner {
            font-size: 8.5px;
          }

          .header__lang-dropdown {
            width: 35px;
          }
        }
      `}</style>
    </>
  );
}
