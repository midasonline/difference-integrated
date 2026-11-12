"use client";

import Image from "next/image";
import { UIEvent, useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/components/i18n/I18nProvider";

function AdvantageCard({ heading, text }: { heading: string; text: string }) {
  return (
    <article
      data-advantage-card
      className="advantages__scrollbox-item shrink-0 max-[1025px]:snap-start"
    >
      <div className="advantage-card flex min-h-[320rem] w-[730rem] items-center justify-between rounded-[10rem] bg-light pl-[90rem] pr-[42rem] max-[1025px]:min-h-[240rem] max-[1025px]:w-[335rem] max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-[10rem] max-[1025px]:px-[40rem] max-[1025px]:py-[40rem]">
        <h3 className="max-w-[260rem] text-[60rem] leading-[.85] uppercase text-accent max-[1025px]:max-w-full max-[1025px]:text-[40rem]">
          {heading}
        </h3>

        <p className="max-w-[240rem] font-['Inter'] leading-none text-primary max-[1025px]:max-w-[225rem] max-[1025px]:text-[max(16px,16rem)]">
          {text}
        </p>
      </div>
    </article>
  );
}

export function Advantages() {
  const rootRef = useRef<HTMLElement>(null);

  const [progress, setProgress] = useState(0);

  const { dictionary } = useI18n();

  const copy = dictionary.home.advantages;

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-advantages-image]", {
          scale: 1.08,
          opacity: 0,
        });

        gsap.set("[data-advantages-heading]", {
          y: 70,
          opacity: 0,
        });

        gsap.set("[data-advantage-card]", {
          y: 55,
          opacity: 0,
        });

        gsap.set("[data-advantages-progress]", {
          scaleX: 0,
          transformOrigin: "left center",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            once: true,
          },

          defaults: {
            ease: "power4.out",
          },
        });

        timeline
          .to("[data-advantages-image]", {
            scale: 1,
            opacity: 1,
            duration: 1.15,
          })

          .to(
            "[data-advantages-heading]",
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
            },
            "-=0.8",
          )

          .to(
            "[data-advantage-card]",
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
            },
            "-=0.55",
          )

          .to(
            "[data-advantages-progress]",
            {
              scaleX: 1,
              duration: 0.8,
            },
            "-=0.65",
          );

        return () => {
          timeline.kill();
        };
      });

      return () => {
        mm.revert();
      };
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const node = event.currentTarget;

    const max = node.scrollWidth - node.clientWidth;

    setProgress(max > 0 ? Math.min(1, Math.abs(node.scrollLeft) / max) : 0);
  };

  return (
    <section
      ref={rootRef}
      id="why-us"
      className="advantages relative max-h-screen bg-white pb-[50rem] pt-[140rem] after:absolute after:inset-x-0 after:bottom-[-1rem] after:h-[3rem] after:bg-white max-[1025px]:max-h-none max-[1025px]:py-[40rem]"
    >
      <div className="di-container">
        <div className="flex items-start justify-between gap-[50rem] max-[1025px]:flex-col max-[1025px]:items-stretch max-[1025px]:gap-[35rem]">
          {/* LEFT IMAGE */}

          <div className="w-[730rem] shrink-0 max-[1500px]:w-[650rem] max-[1200px]:w-[560rem] max-[1025px]:w-full">
            <div
              data-advantages-image
              className="relative h-[760rem] w-full overflow-hidden rounded-[10rem] bg-primary max-[1025px]:h-[560rem] max-[700px]:h-[460rem] max-[500px]:h-[390rem]"
            >
              <Image
                src="/assets/img/services-page/fleet-equipment.webp"
                alt="Difference Integrated fleet operations"
                fill
                sizes="(max-width: 1025px) 100vw, 45vw"
                className="object-cover object-center"
              />

              {/* 30% BLACK OVERLAY */}

              <div className="absolute inset-0 bg-black/50" />

              {/* EXISTING HEADING */}

              <div className="absolute inset-x-[38rem] top-1/2 -translate-y-1/2 z-[2] overflow-hidden">
                <h2
                  data-advantages-heading
                  className="animated-text text-[105rem] leading-[1] tracking-[-.035em] uppercase text-white 2xl:text-[165rem]! xl:text-[92rem] lg:text-[82rem] md:text-[62rem] sm:text-[52rem]"
                >
                  {copy.title}
                </h2>
              </div>
            </div>

            {/* DESKTOP PROGRESS */}

            <div className="relative mt-[24rem] h-[2rem] w-full bg-gold/30 max-[1025px]:hidden">
              <div
                data-advantages-progress
                className="advantages__progressbar-fill absolute inset-y-0 left-0 w-[10%] origin-left bg-accent"
              />
            </div>
          </div>

          {/* RIGHT CARDS */}

          <div
            className="advantages__scrollbox no-scrollbar max-[1025px]:w-full max-[1025px]:overflow-x-auto max-[1025px]:snap-x max-[1025px]:snap-mandatory"
            onScroll={onScroll}
          >
            <div className="advantages__track flex flex-col gap-[10rem] max-[1025px]:flex-row">
              {copy.items.map((item) => (
                <AdvantageCard key={item.heading} {...item} />
              ))}
            </div>
          </div>

          {/* MOBILE PROGRESS */}

          <div className="relative hidden h-[4rem] w-full bg-light max-[1025px]:block">
            <div
              className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
              style={{
                transform: `scaleX(${progress})`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
