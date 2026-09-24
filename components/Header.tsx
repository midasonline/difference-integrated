"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { navItems } from "@/data/site";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { HoverText } from "@/components/ui/HoverText";
import { ContactModal } from "@/components/ui/ContactModal";

export type HeaderVariant = "dark" | "light";

type HeaderProps = {
  variant?: HeaderVariant;
};

type HeaderStyle = CSSProperties & {
  "--header-nav-color": string;
};

export function Header({ variant = "dark" }: HeaderProps) {
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
    lastScrollY.current = Math.max(window.scrollY, 0);

    setScrolled(lastScrollY.current > 60);

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0);

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

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
              "transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease",

            willChange: "transform",
          }}
        >
          <div className="header__container mvp-container relative z-[2] flex items-center justify-between py-[20rem]">
            <a
              href="/"
              className="header__logo flex h-[80rem] items-center justify-center rounded-[5rem] bg-transparent px-[30rem] max-[1024px]:h-[60rem] max-[1024px]:px-[8rem]"
            >
              <img
                key={logoSrc}
                src={logoSrc}
                alt="Difference Integrated Logistics"
                className="header__logo-img w-[180rem] max-[1024px]:w-[130rem]"
              />
            </a>

            <nav className="header__menu flex h-[80rem] items-center justify-center gap-[50rem] rounded-[5rem] bg-transparent px-[40rem] text-[20rem] uppercase max-[1024px]:hidden">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="header__menu-item text-hover"
                >
                  <HoverText secondClassName="text-accent">
                    {item.label}
                  </HoverText>
                </a>
              ))}
            </nav>

            <div className="header__actions flex gap-[10rem]">
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="header__hamburger-btn mvp-btn hidden max-[1024px]:inline-flex"
              >
                {menuOpen ? "Close" : "Menu"}
              </button>

              <AnimatedButton
                className="header__btn inline-flex max-[1024px]:hidden"
                onClick={() => setContactOpen(true)}
              >
                Contact Us
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
                    Eng
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
                    <a
                      href="https://mvplogistics.eu/uk/main/"
                      className="header__lang-item text-hover text-[16rem]"
                    >
                      <HoverText>Ukr</HoverText>
                    </a>

                    <a
                      href="https://mvplogistics.eu/"
                      className="header__lang-item text-hover text-[16rem]"
                    >
                      <HoverText>Pol</HoverText>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`header__hamburger mvp-container pointer-events-auto fixed inset-0 -z-[1] hidden h-screen flex-col overflow-y-auto bg-primary pb-[20rem] transition-transform duration-700 max-[1024px]:flex ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="relative top-[18vh] flex flex-col items-center gap-[25rem] pb-[180rem] text-[30rem] uppercase text-light">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="transition-colors duration-300 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            <AnimatedButton
              className="inline-flex"
              onClick={() => {
                setMenuOpen(false);
                setContactOpen(true);
              }}
            >
              Contact Us
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
          transition: color 0.3s ease;
        }

        .header .header__menu-item[data-active-route="true"] {
          box-shadow: inset 0 -1.5px 0 currentColor;
        }

        .header__logo-img {
          display: block;
          height: auto;
        }
      `}</style>
    </>
  );
}
