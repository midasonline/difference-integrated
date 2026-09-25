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

    const splits: SplitText[] = [];
    const listeners: Array<() => void> = [];
    const mm = gsap.matchMedia();

    let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

    const ctx = gsap.context(() => {
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

      gsap.utils.toArray<HTMLElement>(".text-hover").forEach((element) => {
        const lines = element.querySelectorAll<HTMLElement>(".text-hover-elem");

        if (!lines.length) return;

        lines.forEach((line) => {
          const split = new SplitText(line, {
            type: "chars,words",
            charsClass: "char",
            wordsClass: "word",
          });

          splits.push(split);
        });

        const first = element.querySelectorAll<HTMLElement>(
          ".text-hover-elem-1 .char",
        );

        const second = element.querySelectorAll<HTMLElement>(
          ".text-hover-elem-2 .char",
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

        const enter = () => timeline.play();
        const leave = () => timeline.reverse();

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
          normalizeScroll: true,
        });

        smoother.paused(true);

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
         * =========================================
         * SERVICES
         *
         * Right-side cards scroll as before.
         * Left panel remains fixed.
         * Left-side image now scrolls vertically
         * with the corresponding service card.
         * No fade transition is used.
         * =========================================
         */

        const serviceItems = gsap.utils.toArray<HTMLElement>(".services__item");

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

            /*
             * Previous right-side card scales down.
             */
            servicesTimeline.to(
              previousItem,
              {
                scale: 0.8,
                duration: 1,
                ease: "none",
              },
              step,
            );

            /*
             * New right-side card moves up into position.
             */
            servicesTimeline.to(
              item,
              {
                transform: "translate(-50%, -50%)",
                duration: 1,
                ease: "none",
              },
              step,
            );

            /*
             * Previous left-side image scrolls upward
             * and leaves the fixed image box.
             */
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

            /*
             * Current left-side image enters from below.
             */
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

        const headerContainer =
          document.querySelector<HTMLElement>(".header__container");

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
        )

        .to(
          ".header",
          {
            transform: "translateY(0%)",
          },
          ">-=1",
        )

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

      const refresh = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", refresh);

      listeners.push(() => {
        window.removeEventListener("resize", refresh);
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
