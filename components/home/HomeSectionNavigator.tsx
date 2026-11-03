"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiAward, FiHome, FiInfo, FiMail, FiTruck } from "react-icons/fi";

import type { IconType } from "react-icons";

type SectionId = "home" | "about" | "why-us" | "services" | "contact";

type SectionConfig = {
  id: SectionId;
  label: string;
  icon: IconType;
};

const SECTIONS: SectionConfig[] = [
  {
    id: "home",
    label: "Home",
    icon: FiHome,
  },
  {
    id: "about",
    label: "About",
    icon: FiInfo,
  },
  {
    id: "why-us",
    label: "Why Us",
    icon: FiAward,
  },
  {
    id: "services",
    label: "Services",
    icon: FiTruck,
  },
  {
    id: "contact",
    label: "Contact",
    icon: FiMail,
  },
];

export function HomeSectionNavigator() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const triggersRef = useRef<ScrollTrigger[]>([]);

  const getCurrentScrollY = () => {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      const smoothY = smoother.scrollTop();

      if (Number.isFinite(smoothY)) {
        return Math.max(0, smoothY);
      }
    }

    return Math.max(
      window.scrollY || 0,
      document.documentElement.scrollTop || 0,
      0,
    );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    let setupTimer: ReturnType<typeof setTimeout> | null = null;

    const killNavigationTriggers = () => {
      triggersRef.current.forEach((trigger) => {
        trigger.kill();
      });

      triggersRef.current = [];
    };

    const createNavigationTriggers = () => {
      killNavigationTriggers();

      SECTIONS.forEach((section) => {
        /*
         * Home state is managed
         * separately from actual
         * scroll position.
         */
        if (section.id === "home") {
          return;
        }

        const target = document.getElementById(section.id);

        if (!target) {
          return;
        }

        const trigger = ScrollTrigger.create({
          trigger: target,

          start: "top 45%",

          end: "bottom 45%",

          onEnter: () => {
            setActiveSection(section.id);
          },

          onEnterBack: () => {
            setActiveSection(section.id);
          },
        });

        triggersRef.current.push(trigger);
      });
    };

    const syncTopState = () => {
      const scrollY = getCurrentScrollY();

      /*
       * Exact Home/top zone.
       *
       * This ensures the navigator
       * returns to Home instead of
       * keeping About active.
       */
      if (scrollY <= 60) {
        setActiveSection("home");
      }
    };

    const setupNavigator = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        createNavigationTriggers();

        ScrollTrigger.refresh();

        syncTopState();
      });
    };

    setupNavigator();

    setupTimer = setTimeout(() => {
      setupNavigator();
    }, 1000);

    window.addEventListener("scroll", syncTopState, {
      passive: true,
    });

    return () => {
      if (setupTimer) {
        clearTimeout(setupTimer);
      }

      window.removeEventListener("scroll", syncTopState);

      killNavigationTriggers();
    };
  }, []);

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: SectionId,
  ) => {
    event.preventDefault();

    /*
     * =====================================
     * HOME — SPECIAL CASE
     * =====================================
     *
     * Home must go to the REAL page top,
     * not simply to the #home element.
     *
     * This is what restores:
     * - Home active icon
     * - transparent header
     * - original header colour/logo state
     */
    if (sectionId === "home") {
      setActiveSection("home");

      window.history.replaceState(null, "", "#home");

      const smoother = ScrollSmoother.get();

      if (smoother?.paused()) {
        smoother.paused(false);
      }

      ScrollTrigger.refresh();

      if (smoother) {
        smoother.scrollTo(0, true);
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

      /*
       * Keep checking until the
       * smooth scroll has reached
       * the actual top.
       */
      let frames = 0;

      const syncHomeTop = () => {
        const currentY = getCurrentScrollY();

        if (currentY <= 2 || frames > 180) {
          /*
           * Ensure native scroll
           * state is also exactly 0.
           */
          if (currentY <= 2) {
            window.scrollTo(0, 0);
          }

          setActiveSection("home");

          /*
           * Header already listens
           * to the scroll event.
           *
           * At y=0 this resets:
           * scrolled -> false
           * visible -> true
           */
          window.dispatchEvent(new Event("scroll"));

          ScrollTrigger.update();

          return;
        }

        frames += 1;

        requestAnimationFrame(syncHomeTop);
      };

      requestAnimationFrame(syncHomeTop);

      return;
    }

    /*
     * =====================================
     * OTHER SECTIONS
     * =====================================
     */

    const target = document.getElementById(sectionId);

    if (!target) {
      console.warn(`Section with id "${sectionId}" was not found.`);

      return;
    }

    setActiveSection(sectionId);

    window.history.replaceState(null, "", `#${sectionId}`);

    const smoother = ScrollSmoother.get();

    if (smoother?.paused()) {
      smoother.paused(false);
    }

    ScrollTrigger.refresh();

    requestAnimationFrame(() => {
      const currentSmoother = ScrollSmoother.get();

      if (currentSmoother) {
        currentSmoother.scrollTo(target, true, "top top");

        requestAnimationFrame(() => {
          ScrollTrigger.update();
        });

        setTimeout(() => {
          ScrollTrigger.update();
        }, 100);

        setTimeout(() => {
          ScrollTrigger.update();
        }, 300);

        return;
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      requestAnimationFrame(() => {
        ScrollTrigger.update();
      });
    });
  };

  return (
    <>
      <nav className="home-section-nav" aria-label="Homepage sections">
        <div className="home-section-nav__inner">
          {SECTIONS.map((section) => {
            const active = activeSection === section.id;

            const Icon = section.icon;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) => handleNavigation(event, section.id)}
                className={`home-section-nav__item ${
                  active ? "home-section-nav__item--active" : ""
                }`}
                aria-current={active ? "location" : undefined}
              >
                <span className="home-section-nav__icon">
                  <Icon />
                </span>

                <span className="home-section-nav__label">{section.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <style jsx global>{`
        /* =========================================
           NAVIGATOR
        ========================================= */

        .home-section-nav {
          position: fixed;

          top: 50%;
          right: clamp(10px, 1vw, 20px);

          z-index: 700;

          width: 54px;

          transform: translateY(-50%);

          overflow: hidden;

          border: 1px solid rgba(25, 37, 91, 0.14);

          background: rgba(244, 241, 234, 0.96);

          backdrop-filter: blur(12px);

          -webkit-backdrop-filter: blur(12px);

          transition: width 0.42s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .home-section-nav__inner {
          width: 205px;

          display: flex;
          flex-direction: column;
        }

        /* =========================================
           ITEM
        ========================================= */

        .home-section-nav__item {
          position: relative;

          width: 205px;
          height: 52px;

          display: grid;

          grid-template-columns:
            53px
            minmax(0, 1fr);

          align-items: center;

          border-bottom: 1px solid rgba(25, 37, 91, 0.08);

          background: transparent;

          color: var(--di-primary);

          text-decoration: none;

          cursor: pointer;

          transition: background-color 0.25s ease;
        }

        .home-section-nav__item:last-child {
          border-bottom: 0;
        }

        /* =========================================
           ICON
        ========================================= */

        .home-section-nav__icon {
          width: 53px;
          height: 52px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: rgba(25, 37, 91, 0.58);

          transition:
            color 0.25s ease,
            background-color 0.25s ease,
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .home-section-nav__icon svg {
          width: 19px;
          height: 19px;

          stroke-width: 1.8;
        }

        /* =========================================
           LABEL
        ========================================= */

        .home-section-nav__label {
          min-width: 0;

          opacity: 0;

          transform: translateX(12px);

          color: var(--di-primary);

          font-family: "Inter", sans-serif;

          font-size: 11px;
          font-weight: 600;

          line-height: 1;

          letter-spacing: 0.08em;

          text-transform: uppercase;

          white-space: nowrap;

          transition:
            opacity 0.22s ease,
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            color 0.25s ease;
        }

        /* =========================================
           ACTIVE
        ========================================= */

        .home-section-nav__item--active .home-section-nav__icon {
          color: var(--di-accent);

          background: rgba(233, 81, 29, 0.055);
        }

        .home-section-nav__item--active .home-section-nav__label {
          color: var(--di-accent);
        }

        .home-section-nav__item--active::before {
          content: "";

          position: absolute;

          top: 50%;
          left: 0;

          width: 2px;
          height: 21px;

          background: var(--di-accent);

          transform: translateY(-50%);
        }

        /* =========================================
           DESKTOP HOVER
        ========================================= */

        @media (hover: hover) and (pointer: fine) {
          .home-section-nav:hover,
          .home-section-nav:focus-within {
            width: 205px;
          }

          .home-section-nav:hover .home-section-nav__label,
          .home-section-nav:focus-within .home-section-nav__label {
            opacity: 1;

            transform: translateX(0);
          }

          .home-section-nav__item:hover {
            background: rgba(25, 37, 91, 0.045);
          }

          .home-section-nav__item:hover .home-section-nav__icon,
          .home-section-nav__item:hover .home-section-nav__label {
            color: var(--di-accent);
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1024px) {
          .home-section-nav {
            right: 12px;

            width: 50px;
          }

          .home-section-nav__inner {
            width: 190px;
          }

          .home-section-nav__item {
            width: 190px;
            height: 49px;

            grid-template-columns:
              49px
              minmax(0, 1fr);
          }

          .home-section-nav__icon {
            width: 49px;
            height: 49px;
          }

          .home-section-nav__icon svg {
            width: 18px;
            height: 18px;
          }

          .home-section-nav__label {
            font-size: 10px;
          }

          .home-section-nav:focus-within {
            width: 190px;
          }

          .home-section-nav:focus-within .home-section-nav__label {
            opacity: 1;

            transform: translateX(0);
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 640px) {
          .home-section-nav {
            right: 8px;

            width: 46px;
          }

          .home-section-nav__inner {
            width: 170px;
          }

          .home-section-nav__item {
            width: 170px;
            height: 46px;

            grid-template-columns:
              45px
              minmax(0, 1fr);
          }

          .home-section-nav__icon {
            width: 45px;
            height: 46px;
          }

          .home-section-nav__icon svg {
            width: 17px;
            height: 17px;
          }

          .home-section-nav__label {
            font-size: 9px;

            letter-spacing: 0.07em;
          }

          .home-section-nav:focus-within {
            width: 170px;
          }
        }

        @media (max-width: 380px) {
          .home-section-nav {
            right: 6px;

            width: 43px;
          }

          .home-section-nav__inner {
            width: 158px;
          }

          .home-section-nav__item {
            width: 158px;
            height: 44px;

            grid-template-columns:
              42px
              minmax(0, 1fr);
          }

          .home-section-nav__icon {
            width: 42px;
            height: 44px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-section-nav,
          .home-section-nav * {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
