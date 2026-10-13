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
    window.location.assign(localizePathname(basePath, nextLocale));
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
    /*
     * ScrollSmoother moves #smooth-content with transforms, so window.scrollY
     * alone can briefly report an unreliable position around pinned/footer
     * sections. Use both values and keep the largest real page position.
     */
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

    const revealHomeHeaderImmediately = () => {
      if (!instantRevealOnScrollUp) return;

      /*
       * At the footer/pinned sections, force the sticky/header tone as well
       * as visibility. This prevents white hero header content appearing
       * over a light section while ScrollSmoother catches up.
       */
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

    /*
     * HOME PAGE ONLY:
     * Reveal on upward intent immediately — before ScrollSmoother/native
     * scrolling finishes updating its position.
     */
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY < -1) {
        revealHomeHeaderImmediately();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartY;

      if (currentY - touchStartY > 3) {
        revealHomeHeaderImmediately();
      }

      touchStartY = currentY;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        event.key === "Home"
      ) {
        revealHomeHeaderImmediately();
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

      if (instantRevealOnScrollUp) {
        window.removeEventListener("wheel", handleWheel, true);
        window.removeEventListener("touchstart", handleTouchStart, true);
        window.removeEventListener("touchmove", handleTouchMove, true);
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [instantRevealOnScrollUp]);

  /*

   * DARK variant:

   * Dark hero → light nav + white/orange logo

   *

   * LIGHT variant:

   * Light hero → primary nav + coloured logo

   *

   * Once scrolled:

   * light sticky header + primary nav + coloured logo

   */

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
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, -145%, 0)",

            backgroundColor: scrolled
              ? "rgba(244, 241, 234, 0.96)"
              : "transparent",

            backdropFilter: scrolled ? "blur(14px)" : "none",

            WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",

            boxShadow: scrolled ? "0 8px 30px rgba(25, 37, 91, 0.08)" : "none",

            transition:
              instantRevealOnScrollUp &&
              headerEntered &&
              headerVisible &&
              scrolled
                ? "transform 0.06s linear, background-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease"
                : "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease",

            willChange: "transform",
          }}
        >
          <div className="header__container mvp-container relative z-[2] flex items-center justify-between gap-[20rem] py-[20rem] max-[1600px]:gap-[16rem] max-[1440px]:py-[16rem] max-[1200px]:gap-[10rem] max-[1200px]:py-[14rem] max-[1024px]:py-[12rem] max-[640px]:gap-[6rem] max-[640px]:py-[10rem]">
            <a
              href={localePath("/")}
              className="header__logo flex h-[80rem] shrink-0 items-center justify-center rounded-[5rem] bg-transparent  max-[1440px]:h-[72rem] max-[1200px]:h-[66rem] max-[1024px]:h-[60rem] max-[640px]:h-[52rem]"
            >
              <img
                key={logoSrc}
                src={logoSrc}
                alt="Difference Integrated Logistics"
                className="header__logo-img w-[180rem] max-[1600px]:w-[165rem] max-[1440px]:w-[150rem] max-[1200px]:w-[140rem] max-[1024px]:w-[130rem] max-[640px]:w-[112rem] max-[420px]:w-[102rem]"
              />
            </a>

            <nav className="header__menu flex h-[80rem] min-w-0 items-center justify-center gap-[50rem] whitespace-nowrap rounded-[5rem] bg-transparent px-[40rem] text-[20rem] uppercase max-[1600px]:gap-[38rem] max-[1600px]:px-[30rem] max-[1600px]:text-[18rem] max-[1440px]:h-[72rem] max-[1440px]:gap-[28rem] max-[1440px]:px-[22rem] max-[1440px]:text-[16rem] max-[1200px]:h-[66rem] max-[1200px]:gap-[18rem] max-[1200px]:px-[12rem] max-[1200px]:text-[14rem] max-[1024px]:hidden">
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

            <div className="header__actions flex shrink-0 items-center gap-[10rem] max-[1440px]:gap-[8rem] max-[1200px]:gap-[6rem] max-[640px]:gap-[4rem]">
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="header__hamburger-btn mvp-btn hidden max-[1024px]:inline-flex max-[640px]:min-w-[68rem] max-[640px]:px-[14rem] max-[640px]:text-[12rem] max-[420px]:min-w-[62rem] max-[420px]:px-[10rem]"
              >
                {menuOpen ? common.header.close : common.header.menu}
              </button>

              <AnimatedButton
                className="header__btn inline-flex max-[1024px]:hidden"
                onClick={() => setContactOpen(true)}
              >
                {common.header.contactUs}
              </AnimatedButton>

              <div className="header__lang relative uppercase">
                <button
                  type="button"
                  onClick={() => setLangOpen((value) => !value)}
                  className={`header__lang-heading mvp-btn inline-flex ${
                    langOpen ? "active" : ""
                  }`}
                >
                  <span className="mvp-btn-inner flex items-center justify-center gap-[5rem]">
                    {localeDetails[locale].code}
                    <svg
                      className="h-[12rem] w-[13rem] shrink-0"
                      viewBox="0 0 13 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.267 7.06149L5.84961 11.7365C6.19441 12.0878 6.80452 12.0878 7.15054 11.7365L11.7331 7.06149C12.0902 6.69643 12.0889 6.10663 11.7295 5.74406C11.37 5.38148 10.7905 5.38148 10.4322 5.74654L7.41586 8.82221V0.931267C7.41586 0.415966 7.00504 0 6.49885 0C5.99266 0 5.58184 0.415966 5.58184 0.931267V8.82221L2.56671 5.74654C2.38698 5.56401 2.15223 5.47337 1.91625 5.47337C1.68272 5.47337 1.44796 5.56401 1.26945 5.74406C0.911205 6.10663 0.909982 6.69643 1.267 7.06149Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`header__lang-dropdown absolute top-full mt-[10rem] flex w-full flex-col items-center rounded-[5rem] bg-light transition-all duration-500 max-[1024px]:mt-[5rem] ${
                    langOpen
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-[200%] opacity-0"
                  }`}
                >
                  <div className="header__lang-list flex flex-col items-start gap-[12rem] py-[20rem] max-[1024px]:gap-[7rem]">
                    {locales.map((itemLocale) => (
                      <button
                        key={itemLocale}
                        type="button"
                        onClick={() => handleLanguageChange(itemLocale)}
                        className={`header__lang-item text-hover text-[16rem] ${
                          itemLocale === locale ? "text-accent" : ""
                        }`}
                        aria-label={`${common.header.language}: ${localeDetails[itemLocale].nativeLabel}`}
                      >
                        <HoverText>{localeDetails[itemLocale].code}</HoverText>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`header__hamburger mvp-container pointer-events-auto fixed inset-0 -z-[1] hidden min-h-[100dvh] flex-col overflow-y-auto bg-primary pb-[max(20rem,env(safe-area-inset-bottom))] pt-[105rem] transition-transform duration-700 max-[1024px]:flex max-[640px]:pt-[88rem] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="relative flex flex-1 flex-col items-center justify-center gap-[25rem] pb-[80rem] text-center text-[30rem] uppercase text-light max-[768px]:gap-[20rem] max-[768px]:text-[27rem] max-[640px]:gap-[16rem] max-[640px]:pb-[55rem] max-[640px]:text-[24rem] max-[420px]:gap-[14rem] max-[420px]:text-[21rem]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={getLocalizedHref(item.href)}
                onClick={() => setMenuOpen(false)}
                className="transition-colors duration-300 hover:text-accent"
              >
                {navigationLabels[item.label] ?? item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto w-full pb-[10rem] max-[640px]:pb-[6rem]">
            <AnimatedButton
              className="inline-flex"
              onClick={() => {
                setMenuOpen(false);

                setContactOpen(true);
              }}
            >
              {common.header.contactUs}
            </AnimatedButton>
          </div>
        </div>

        <div className="pointer-events-auto">
          <ContactModal
            open={contactOpen}
            onClose={() => setContactOpen(false)}
          />
        </div>
      </header>

      <style jsx global>{`
        .header .header__menu-item {
          color: var(--header-nav-color) !important;

          transition:
            color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .header .header__menu-item[data-active-route="true"] {
          color: var(--mvp-accent) !important;

          box-shadow: inset 0 -1.5px 0 var(--mvp-accent);
        }

        .header .header__menu-item[data-active-route="true"] .text-hover-elem {
          color: var(--mvp-accent) !important;
        }

        .header__logo-img {
          display: block;

          height: auto;

          max-width: 100%;
        }

        @media (max-width: 1600px) and (min-width: 1025px) {
          .header .header__btn {
            height: 74rem;

            padding-left: 42rem;

            padding-right: 42rem;

            font-size: 15rem;
          }

          .header .header__lang-heading {
            width: 76rem;

            height: 74rem;

            font-size: 15rem;
          }
        }

        @media (max-width: 1440px) and (min-width: 1025px) {
          .header .header__btn {
            height: 68rem;

            padding-left: 34rem;

            padding-right: 34rem;

            font-size: 14rem;
          }

          .header .header__lang-heading {
            width: 70rem;

            height: 68rem;

            font-size: 14rem;
          }
        }

        @media (max-width: 1200px) and (min-width: 1025px) {
          .header .header__btn {
            height: 62rem;

            padding-left: 24rem;

            padding-right: 24rem;

            font-size: 13rem;
          }

          .header .header__lang-heading {
            width: 64rem;

            height: 62rem;

            font-size: 13rem;
          }

          .header .header__lang-heading svg {
            width: 10rem;

            height: 10rem;
          }
        }

        @media (max-width: 1024px) {
          .header .header__btn {
            display: none !important;
          }

          .header__scroll-shell {
            width: 100%;
          }

          .header .header__hamburger-btn {
            height: 60rem;
          }

          .header .header__lang-heading {
            width: 60rem;

            height: 60rem;
          }

          .header__lang-dropdown {
            min-width: 60rem;

            right: 0;
          }
        }

        @media (max-width: 640px) {
          .header .header__hamburger-btn {
            height: 52rem;

            min-width: 68rem;

            padding-left: 14rem;

            padding-right: 14rem;

            font-size: 12rem;
          }

          .header .header__lang-heading {
            width: 52rem;

            height: 52rem;

            font-size: 13rem;
          }

          .header .header__lang-heading svg {
            width: 9rem;

            height: 9rem;
          }

          .header__lang-dropdown {
            min-width: 52rem;
          }

          .header__lang-list {
            padding-top: 14rem;

            padding-bottom: 14rem;
          }

          .header__lang-item {
            font-size: 13rem !important;
          }
        }

        @media (max-width: 420px) {
          .header .header__hamburger-btn {
            height: 48rem;

            min-width: 62rem;

            padding-left: 10rem;

            padding-right: 10rem;

            font-size: 11rem;
          }

          .header .header__lang-heading {
            width: 48rem;

            height: 48rem;

            font-size: 12rem;
          }

          .header__lang-dropdown {
            min-width: 48rem;
          }
        }
      `}</style>
    </>
  );
}
