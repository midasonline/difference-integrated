"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

export function useMvpAnimations(rootRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    window.scrollTo(0, 0);

    const siteHeader =
      document.querySelector<HTMLElement>(".global-site-header .header") ??
      document.querySelector<HTMLElement>(".header");

    const headerContainer =
      document.querySelector<HTMLElement>(
        ".global-site-header .header__container",
      ) ?? document.querySelector<HTMLElement>(".header__container");

    const splits: Array<{
      revert: () => void;
    }> = [];

    const listeners: Array<() => void> = [];

    const mm = gsap.matchMedia();

    let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

    const ctx = gsap.context(() => {
      /*
       * MAIN ANIMATED TEXT
       */
      gsap.utils
        .toArray<HTMLElement>(".main-animated-text")
        .forEach((element) => {
          const split = new SplitText(element, {
            type: "chars,words",
            charsClass: "char",
            wordsClass: "word",
          });

          splits.push(split);

          gsap.set(split.chars, {
            willChange: "transform",
            transformOrigin: "50% 0%",
            scaleY: 0,
            opacity: 0,
          });
        });

      /*
       * SCROLL ANIMATED TEXT
       */
      gsap.utils.toArray<HTMLElement>(".animated-text").forEach((element) => {
        const split = new SplitText(element, {
          type: "chars,words",
          charsClass: "char",
          wordsClass: "word",
        });

        splits.push(split);

        gsap.set(split.chars, {
          willChange: "transform",
          transformOrigin: "50% 0%",
          scaleY: 0,
          opacity: 0,
        });

        gsap.to(split.chars, {
          ease: "back",
          opacity: 1,
          scaleY: 1,
          yPercent: 0,
          stagger: 0.03,

          scrollTrigger: {
            trigger: element,
            start: "center bottom-=5%",
          },
        });
      });

      /*
       * OPACITY BLOCKS
       */
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

      /*
       * SCALE BLOCKS
       */
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

      /*
       * DESKTOP
       */
      mm.add("(min-width: 1025px)", () => {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 2.5,
          speed: 0.7,
          normalizeScroll: true,
        });

        smoother.paused(true);

        /*
         * HERO VIDEO
         */
        const heroVideoWrapper = document.querySelector(".hero__video-wrapper");

        const heroVideoContainer = document.querySelector(
          ".hero__video-container",
        );

        if (heroVideoWrapper && heroVideoContainer) {
          ScrollTrigger.create({
            trigger: heroVideoWrapper,
            endTrigger: heroVideoContainer,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          });
        }

        /*
         * FOOTER VIDEO
         */
        const footerVideoWrapper = document.querySelector(
          ".footer__video-wrapper",
        );

        const footerVideoContainer = document.querySelector(
          ".footer__video-container",
        );

        if (footerVideoWrapper && footerVideoContainer) {
          ScrollTrigger.create({
            trigger: footerVideoWrapper,
            endTrigger: footerVideoContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: true,
          });
        }

        /*
         * ADVANTAGES
         */
        const advantagesScrollbox = document.querySelector<HTMLElement>(
          ".advantages__scrollbox",
        );

        const advantageItem = document.querySelector<HTMLElement>(
          ".advantages__scrollbox-item",
        );

        if (advantagesScrollbox && advantageItem) {
          const distance = () =>
            Math.max(
              0,
              advantagesScrollbox.offsetHeight - advantageItem.offsetHeight * 2,
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
         * SERVICES
         *
         * IMPORTANT:
         * NO HARDCODED 6 SERVICES.
         * Automatically handles all service cards.
         */
        const servicesSection =
          document.querySelector<HTMLElement>(".services");

        const serviceItems = gsap.utils.toArray<HTMLElement>(".services__item");

        if (servicesSection && serviceItems.length > 0) {
          /*
           * Original 6 cards used 400%.
           *
           * 6 cards  = 400%
           * 10 cards = 800%
           *
           * So every extra service gets enough
           * scroll distance to complete its stack.
           */
          const serviceScrollPercent = Math.max(
            400,
            (serviceItems.length - 2) * 100,
          );

          const serviceEnd = `bottom+=${serviceScrollPercent}% bottom`;

          /*
           * PROGRESS BAR
           */
          gsap.to(".services__progressbar-fill", {
            width: "100%",
            ease: "none",

            scrollTrigger: {
              trigger: servicesSection,
              start: "center center",
              end: serviceEnd,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          /*
           * SERVICE STACK
           */
          const servicesTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: servicesSection,
              start: "center center",
              end: serviceEnd,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          /*
           * First card scales down.
           */
          if (serviceItems[0]) {
            servicesTimeline.to(
              serviceItems[0],
              {
                scale: 0.8,
                ease: "none",
              },
              0,
            );
          }

          /*
           * Every remaining card:
           *
           * 02
           * 03
           * 04
           * ...
           * 10
           *
           * comes into the exact same stacked
           * centre position.
           */
          for (let index = 1; index < serviceItems.length; index += 1) {
            const currentItem = serviceItems[index];

            servicesTimeline.to(
              currentItem,
              {
                transform: "translate(-50%, -50%)",
                ease: "none",
              },
              "<",
            );

            /*
             * Scale every card except
             * the final service.
             *
             * Final card stays full size,
             * exactly like old item 06 did.
             */
            if (index < serviceItems.length - 1) {
              servicesTimeline.to(
                currentItem,
                {
                  scale: 0.8,
                  ease: "none",
                },
                ">",
              );
            }
          }
        }

        /*
         * HEADER SCROLL
         */
        if (headerContainer) {
          ScrollTrigger.create({
            trigger: document.body,
            start: "top+=10 top",
            end: "bottom bottom",

            onUpdate: (self) => {
              gsap.to(headerContainer, {
                yPercent: self.direction === 1 ? -105 : 0,

                y: self.direction === 1 ? "-120rem" : 0,

                duration: 0.8,
                ease: "power3.out",
                overwrite: true,
              });
            },
          });
        }

        return () => {
          smoother?.kill();
          smoother = null;
        };
      });

      /*
       * MOBILE
       */
      mm.add("(max-width: 1024px)", () => {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1,
          speed: 1,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });

        smoother.paused(true);

        return () => {
          smoother?.kill();
          smoother = null;
        };
      });

      /*
       * HOME PRELOADER / ENTRANCE
       */
      const counter = {
        value: 0,
      };

      const heroChars = document.querySelectorAll(
        ".hero .main-animated-text .char",
      );

      const preloaderChars = document.querySelectorAll(
        ".preloader .main-animated-text .char",
      );

      const timeline = gsap.timeline({
        paused: true,

        defaults: {
          ease: "power4.inOut",
          duration: 2,
        },
      });

      timeline
        .to(
          ".hero__video-cover",
          {
            top: "50%",
            transform: "translate(-50%, -50%) scale(0.35) rotate(0deg)",
            delay: 1,
          },
          0,
        )

        .to(
          ".preloader__container-line",
          {
            width: "100%",
          },
          "<+=1",
        )

        .to(
          preloaderChars,
          {
            ease: "back",
            opacity: 1,
            scaleY: 1,
            yPercent: 0,
            stagger: 0.03,
            duration: 1,
          },
          "<",
        )

        .to(
          counter,
          {
            value: 100,
            duration: 3,
            ease: "power1.in",

            onUpdate: () => {
              const node = document.querySelector<HTMLElement>(
                ".preloader__progress-number",
              );

              if (node) {
                node.textContent = String(Math.ceil(counter.value));
              }
            },
          },
          ">",
        )

        .to(
          ".preloader",
          {
            opacity: 0,
            duration: 1,

            onComplete: () => {
              const node = document.querySelector<HTMLElement>(".preloader");

              if (node) {
                node.style.display = "none";
              }
            },
          },
          ">",
        )

        .to(
          ".hero__video-cover",
          {
            transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
          },
          "<",
        )

        .to(
          heroChars,
          {
            ease: "back",
            opacity: 1,
            scaleY: 1,
            yPercent: 0,
            stagger: 0.03,
            duration: 1,
          },
          ">",
        )

        .to(
          ".main-animated-line",
          {
            width: "100%",

            onComplete: () => {
              smoother?.paused(false);
            },
          },
          "<",
        );

      /*
       * GLOBAL HEADER
       */
      if (siteHeader) {
        timeline.to(
          siteHeader,
          {
            transform: "translateY(0%)",
          },
          ">-=1",
        );
      }

      timeline
        .to(
          ".hero-slider",
          {
            transform: "translateX(0%)",

            onComplete: () => {
              window.dispatchEvent(new Event("mvp:hero-slider-start"));
            },
          },
          "<",
        )

        .to(
          ".hero__btn",
          {
            transform: "translateY(0%)",
          },
          "<",
        );

      /*
       * START ENTRANCE
       */
      const start = () => {
        timeline.play(0);
      };

      if (document.readyState === "complete") {
        requestAnimationFrame(start);
      } else {
        window.addEventListener("load", start, {
          once: true,
        });

        listeners.push(() => {
          window.removeEventListener("load", start);
        });
      }

      /*
       * REFRESH SCROLLTRIGGER
       */
      const refresh = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", refresh);

      listeners.push(() => {
        window.removeEventListener("resize", refresh);
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, rootRef);

    return () => {
      listeners.forEach((cleanup) => cleanup());

      splits.forEach((split) => split.revert());

      mm.revert();

      ctx.revert();

      smoother?.kill();
    };
  }, [rootRef]);
}
