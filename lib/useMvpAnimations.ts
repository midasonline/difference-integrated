"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { stripLocaleFromPathname } from "@/i18n/routing";
import { observeAnimationLayout } from "./animationLayout";

const SERVICES_SNAP_DELAY = 1;

const SITE_ENTRY_ROUTE_KEY = "di-site-entry-route-v1";
const HOME_FULL_INTRO_PLAYED_KEY = "di-home-full-intro-played-v1";

type IntroRuntimeWindow = Window & {
  __DI_HOME_INTRO_MODE__?: "full" | "simple";
};

function normalizeRoutePath(value: string): string {
  if (!value) return "/";

  const cleanPath = value.split("?")[0].split("#")[0];

  if (cleanPath === "/") return "/";

  return cleanPath.replace(/\/+$/, "") || "/";
}

function getOrCreateSiteEntryRoute(currentPath: string): string {
  try {
    const storedRoute = window.sessionStorage.getItem(SITE_ENTRY_ROUTE_KEY);

    if (storedRoute) {
      return normalizeRoutePath(storedRoute);
    }

    window.sessionStorage.setItem(SITE_ENTRY_ROUTE_KEY, currentPath);

    return currentPath;
  } catch {
    return currentPath;
  }
}

function hasHomeFullIntroPlayed(): boolean {
  try {
    return window.sessionStorage.getItem(HOME_FULL_INTRO_PLAYED_KEY) === "1";
  } catch {
    return false;
  }
}

function markHomeFullIntroPlayed(): void {
  try {
    window.sessionStorage.setItem(HOME_FULL_INTRO_PLAYED_KEY, "1");
  } catch {
    // Storage can be unavailable in restricted/private environments.
  }
}

export function useMvpAnimations(rootRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    window.scrollTo(0, 0);

    const root = rootRef.current;

    const runtimeWindow = window as IntroRuntimeWindow;

    const currentPath = normalizeRoutePath(
      stripLocaleFromPathname(window.location.pathname),
    );

    const entryRoute = getOrCreateSiteEntryRoute(currentPath);

    /*
     * FULL INTRO:
     * Only when the user entered the site directly on Home
     * and the full intro has not already played in this tab.
     *
     * SIMPLE INTRO:
     * About / Services / any inner page -> Home.
     */
    if (!runtimeWindow.__DI_HOME_INTRO_MODE__) {
      runtimeWindow.__DI_HOME_INTRO_MODE__ =
        currentPath === "/" && entryRoute === "/" && !hasHomeFullIntroPlayed()
          ? "full"
          : "simple";

      if (runtimeWindow.__DI_HOME_INTRO_MODE__ === "full") {
        markHomeFullIntroPlayed();
      }
    }

    const shouldPlayFullIntro =
      currentPath === "/" && runtimeWindow.__DI_HOME_INTRO_MODE__ === "full";

    root.dataset.introMode = shouldPlayFullIntro ? "full" : "simple";

    let disposed = false;
    let introComplete = false;
    let ctx: gsap.Context | undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const splits: SplitText[] = [];

    const listeners: Array<() => void> = [];

    // Arabic must stay shaped as complete words.
    // Splitting Arabic into individual characters breaks
    // the joining forms and makes the text look corrupted.
    const isRtl = document.documentElement.dir === "rtl";

    const revealUnitClass = isRtl ? ".word" : ".char";

    const splitForMotion = (element: HTMLElement) => {
      const split = new SplitText(element, {
        type: isRtl ? "words" : "chars,words",

        ...(isRtl
          ? {
              wordsClass: "word",
            }
          : {
              charsClass: "char",
              wordsClass: "word",
            }),
      });

      splits.push(split);

      return (isRtl ? split.words : split.chars) as HTMLElement[];
    };

    const mm = gsap.matchMedia();

    let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

    const initialize = () => {
      if (disposed) return;

      ctx = gsap.context(() => {
        root.dataset.introState = "playing";

        if (reducedMotion) {
          gsap.set(".preloader", {
            display: "none",
          });

          gsap.set(".hero__video-cover", {
            top: "50%",
            transform: "translate(-50%, -50%)",
          });

          gsap.set(".hero-slider, .hero__btn, .hero .main-animated-text", {
            autoAlpha: 1,
            xPercent: 0,
            yPercent: 0,
          });

          root.dataset.introState = "complete";

          runtimeWindow.__DI_HOME_INTRO_MODE__ = "simple";

          window.dispatchEvent(new Event("mvp:hero-ready"));

          gsap.set(".main-animated-line", {
            width: "100%",
          });

          const frame = requestAnimationFrame(() =>
            window.dispatchEvent(new Event("mvp:hero-slider-start")),
          );

          listeners.push(() => cancelAnimationFrame(frame));

          return;
        }

        gsap.set(".hero-slider", {
          autoAlpha: 0,
          xPercent: isRtl ? -110 : 110,
        });

        gsap.set(".hero__btn", {
          autoAlpha: 0,
        });

        gsap.utils
          .toArray<HTMLElement>(".main-animated-text")
          .forEach((element) => {
            const revealTargets = splitForMotion(element);

            gsap.set(revealTargets, {
              willChange: "transform",
              transformOrigin: "50% 0%",
              scaleY: 0,
              opacity: 0,
            });
          });

        gsap.set(".hero .main-animated-text", {
          visibility: "visible",
        });

        gsap.utils.toArray<HTMLElement>(".animated-text").forEach((element) => {
          const revealTargets = splitForMotion(element);

          gsap.set(revealTargets, {
            willChange: "transform",
            transformOrigin: "50% 0%",
            scaleY: 0,
            opacity: 0,
          });

          gsap.to(revealTargets, {
            ease: "back",
            opacity: 1,
            scaleY: 1,
            yPercent: 0,

            stagger: isRtl ? 0.06 : 0.03,

            scrollTrigger: {
              trigger: element,
              start: "center bottom-=5%",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".text-hover").forEach((element) => {
          const lines =
            element.querySelectorAll<HTMLElement>(".text-hover-elem");

          if (!lines.length) return;

          lines.forEach((line) => {
            splitForMotion(line);
          });

          const first = element.querySelectorAll<HTMLElement>(
            `.text-hover-elem-1 ${revealUnitClass}`,
          );

          const second = element.querySelectorAll<HTMLElement>(
            `.text-hover-elem-2 ${revealUnitClass}`,
          );

          const timeline = gsap.timeline({
            paused: true,

            defaults: {
              stagger: 0.015,
              duration: 0.35,
              ease: "power3.out",
            },
          });

          if (first.length) {
            timeline.to(first, {
              yPercent: -120,
            });
          }

          if (second.length) {
            timeline.to(
              second,
              {
                yPercent: -100,
              },
              0,
            );
          }

          const enter = () => {
            if (window.matchMedia("(hover: hover)").matches) {
              timeline.play();
            }
          };

          const leave = () => {
            if (window.matchMedia("(hover: hover)").matches) {
              timeline.reverse();
            }
          };

          element.addEventListener("mouseenter", enter);

          element.addEventListener("mouseleave", leave);

          listeners.push(() => {
            element.removeEventListener("mouseenter", enter);

            element.removeEventListener("mouseleave", leave);

            timeline.kill();
          });
        });

        gsap.utils.toArray<HTMLElement>(".opacity-block").forEach((element) => {
          gsap.set(element, {
            opacity: 0,
          });

          gsap.to(element, {
            opacity: 1,
            duration: 1,
            ease: "power4.inOut",

            scrollTrigger: {
              trigger: element,
              start: "center 92%",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".scale-block").forEach((element) => {
          gsap.set(element, {
            scale: 0.7,
          });

          gsap.to(element, {
            scale: 1,
            ease: "none",

            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          });
        });

        mm.add("(min-width: 1025px)", () => {
          smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",

            smooth: 2.5,
            speed: 0.7,

            normalizeScroll: {
              allowNestedScroll: true,
            },
          });

          smoother.paused(!introComplete);

          ScrollTrigger.create({
            trigger: ".hero__video-wrapper",

            endTrigger: ".hero__video-container",

            start: "top top",
            end: "bottom top",

            scrub: true,
            pin: true,
          });

          ScrollTrigger.create({
            trigger: ".footer__video-wrapper",

            endTrigger: ".footer__video-container",

            start: "top top",
            end: "bottom bottom",

            scrub: true,
            pin: true,
          });

          const advantagesScrollbox = document.querySelector<HTMLElement>(
            ".advantages__scrollbox",
          );

          const advantageItem = document.querySelector<HTMLElement>(
            ".advantages__scrollbox-item",
          );

          if (
            advantagesScrollbox &&
            advantageItem &&
            window.innerHeight >= 600
          ) {
            const distance = () =>
              Math.max(
                0,

                advantagesScrollbox.offsetHeight -
                  advantageItem.offsetHeight * 2,
              );

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".advantages",
                  start: "top top",
                  end: "bottom+=100% top",
                  scrub: true,
                  pin: true,
                  invalidateOnRefresh: true,
                },
              })
              .to(
                advantagesScrollbox,

                {
                  y: () => -distance(),

                  ease: "none",
                },

                0,
              )
              .to(
                ".advantages__progressbar-fill",

                {
                  width: "100%",
                  ease: "none",
                },

                0,
              );
          }

          /*
           * =========================================
           * SERVICES
           *
           * Right-side cards scroll as before.
           * Left panel remains fixed.
           * Left-side image scrolls vertically
           * with the corresponding service card.
           * =========================================
           */

          const serviceItems =
            gsap.utils.toArray<HTMLElement>(".services__item");

          const serviceVisuals =
            gsap.utils.toArray<HTMLElement>(".services__visual");

          if (serviceItems.length > 0) {
            const serviceSteps = Math.max(serviceItems.length - 1, 1);

            serviceVisuals.forEach((visual, index) => {
              gsap.set(visual, {
                yPercent: index === 0 ? 0 : 100,

                opacity: 1,
                force3D: true,
              });
            });

            const servicesTimeline = gsap.timeline({
              defaults: {
                duration: 1,
                ease: "none",
              },

              scrollTrigger: {
                trigger: ".services",

                start: "center center",

                end: () => `bottom+=${serviceSteps * 80}% bottom`,

                pin: true,
                scrub: true,

                snap: {
                  snapTo: (progress) =>
                    Math.round(progress * serviceSteps) / serviceSteps,

                  delay: SERVICES_SNAP_DELAY,

                  duration: {
                    min: 0.35,
                    max: 0.8,
                  },

                  ease: "power3.inOut",

                  inertia: false,
                },

                invalidateOnRefresh: true,
              },
            });

            servicesTimeline.to(
              ".services__progressbar-fill",

              {
                width: "100%",

                duration: serviceSteps,

                ease: "none",
              },

              0,
            );

            serviceItems.forEach((item, index) => {
              if (index === 0) return;

              const previousItem = serviceItems[index - 1];

              const previousVisual = serviceVisuals[index - 1];

              const currentVisual = serviceVisuals[index];

              const step = index - 1;

              servicesTimeline.to(
                previousItem,

                {
                  scale: 0.8,
                  duration: 1,
                  ease: "none",
                },

                step,
              );

              servicesTimeline.to(
                item,

                {
                  transform: "translate(-50%, -50%)",

                  duration: 1,
                  ease: "none",
                },

                step,
              );

              if (previousVisual) {
                servicesTimeline.to(
                  previousVisual,

                  {
                    yPercent: -100,
                    duration: 1,
                    ease: "none",
                    force3D: true,
                  },

                  step,
                );
              }

              if (currentVisual) {
                servicesTimeline.to(
                  currentVisual,

                  {
                    yPercent: 0,
                    duration: 1,
                    ease: "none",
                    force3D: true,
                  },

                  step,
                );
              }
            });
          }

          return () => {
            smoother?.kill();
            smoother = null;
          };
        });

        mm.add("(max-width: 1024px)", () => {
          smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",

            smooth: 1,
            speed: 1,

            normalizeScroll: {
              allowNestedScroll: true,
            },

            ignoreMobileResize: true,
          });

          smoother.paused(!introComplete);

          return () => {
            smoother?.kill();
            smoother = null;
          };
        });

        const counter = {
          value: 0,
        };

        const heroChars = root.querySelectorAll(
          `.hero .main-animated-text ${revealUnitClass}`,
        );

        const progress = root.querySelector<HTMLElement>(
          ".preloader__progress-number",
        );

        const completeIntro = () => {
          if (introComplete) return;

          introComplete = true;

          root.dataset.introState = "complete";

          /*
           * After the first Home intro finishes,
           * all later Home visits in this document
           * must use the simple entrance.
           */
          runtimeWindow.__DI_HOME_INTRO_MODE__ = "simple";

          smoother?.paused(false);

          ScrollTrigger.refresh();

          window.dispatchEvent(new Event("mvp:hero-slider-start"));
        };

        if (shouldPlayFullIntro) {
          /*
           * FIRST SITE ENTRY DIRECTLY ON HOME
           *
           * Keep the existing full loader.
           */

          const timeline = gsap.timeline({
            defaults: {
              ease: "power3.inOut",
            },

            onComplete: completeIntro,
          });

          timeline
            .to(
              ".hero__video-cover",

              {
                top: "50%",

                transform: "translate(-50%, -50%) scale(0.35) rotate(0deg)",

                duration: 1.2,
              },

              0,
            )

            .to(
              ".preloader__container-line",

              {
                width: "100%",
                duration: 2,
              },

              0,
            )

            .to(
              counter,

              {
                value: 100,

                duration: 2,

                ease: "none",

                onUpdate: () => {
                  if (progress) {
                    progress.textContent = String(Math.ceil(counter.value));
                  }
                },
              },

              0,
            )

            .to(
              ".preloader",

              {
                autoAlpha: 0,

                duration: 0.4,

                onComplete: () => {
                  gsap.set(".preloader", {
                    display: "none",
                  });
                },
              },

              2,
            )

            .to(
              ".hero__video-cover",

              {
                transform: "translate(-50%, -50%) scale(1) rotate(0deg)",

                duration: 1.3,
              },

              2,
            )

            .call(
              () => {
                window.dispatchEvent(new Event("mvp:hero-ready"));
              },

              [],

              3.3,
            )

            .to(
              heroChars,

              {
                ease: "back.out(1.4)",

                opacity: 1,

                scaleY: 1,

                yPercent: 0,

                stagger: {
                  amount: 0.5,
                },

                duration: 0.7,
              },

              3.3,
            )

            .to(
              ".main-animated-line",

              {
                width: "100%",
                duration: 0.8,
              },

              3.3,
            )

            .to(
              ".hero-slider",

              {
                autoAlpha: 1,
                xPercent: 0,
                duration: 0.9,
              },

              3.5,
            )

            .to(
              ".hero__btn",

              {
                autoAlpha: 1,
                y: 0,
                yPercent: 0,
                duration: 0.9,
              },

              3.5,
            );
        } else {
          /*
           * ABOUT / SERVICES / INNER PAGE -> HOME
           *
           * Do NOT run 0-100 counter.
           * Do NOT shrink/expand hero video.
           *
           * Use the existing preloader background only
           * as a short transition curtain.
           */

          gsap.set(
            [
              ".preloader .main-animated-text",
              ".preloader__container-line",
              ".preloader__progress-number",
            ],

            {
              autoAlpha: 0,
            },
          );

          gsap.set(".preloader", {
            display: "block",
            autoAlpha: 1,
            yPercent: 0,
          });

          gsap.set(".hero__video-cover", {
            top: "50%",

            transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
          });

          const simpleEntrance = gsap.timeline({
            defaults: {
              ease: "power4.inOut",
            },

            onComplete: completeIntro,
          });

          simpleEntrance
            .to(
              ".preloader",

              {
                yPercent: 105,

                duration: 0.9,

                onComplete: () => {
                  gsap.set(".preloader", {
                    display: "none",
                  });
                },
              },

              0,
            )

            .call(
              () => {
                window.dispatchEvent(new Event("mvp:hero-ready"));
              },

              [],

              0.4,
            )

            .to(
              heroChars,

              {
                ease: "back.out(1.4)",

                opacity: 1,

                scaleY: 1,

                yPercent: 0,

                stagger: {
                  amount: 0.35,
                },

                duration: 0.65,
              },

              0.4,
            )

            .to(
              ".main-animated-line",

              {
                width: "100%",
                duration: 0.7,
              },

              0.4,
            )

            .to(
              ".hero-slider",

              {
                autoAlpha: 1,
                xPercent: 0,
                duration: 0.75,
              },

              0.6,
            )

            .to(
              ".hero__btn",

              {
                autoAlpha: 1,
                y: 0,
                yPercent: 0,
                duration: 0.75,
              },

              0.6,
            );
        }

        listeners.push(observeAnimationLayout(root, () => introComplete));
      }, root);
    };

    // Wait only for layout-critical fonts,
    // never window.load.
    if (reducedMotion || document.fonts.status === "loaded") {
      initialize();
    } else {
      void document.fonts.ready.then(initialize);
    }

    return () => {
      disposed = true;

      listeners.forEach((cleanup) => cleanup());

      splits.forEach((split) => split.revert());

      mm.revert();

      ctx?.revert();

      smoother?.kill();
    };
  }, [rootRef]);
}
