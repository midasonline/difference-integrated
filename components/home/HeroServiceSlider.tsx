"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import { heroServices } from "@/data/site";

const AUTOPLAY_DELAY = 5000;
const SLIDE_SPEED = 0.8;

const SERVICE_ICONS: Record<string, string> = {
  "Construction Logistics":
    "/assets/img/home/service-icons/Construction-Logistics-Services.svg",

  "Sand Transportation":
    "/assets/img/home/service-icons/Sand-Transportation.svg",

  "Heavy Dumper Logistics":
    "/assets/img/home/service-icons/Heavy-Dumper-Logistics.svg",

  "Logistics Coordination":
    "/assets/img/home/service-icons/customer-support.svg",

  "Container Transportation":
    "/assets/img/home/service-icons/Container-Transportation.svg",

  "Bulk Construction Material Transport":
    "/assets/img/home/service-icons/Bulk-Construction-Material-Transport.svg",

  "Fleet & Equipment": "/assets/img/home/service-icons/Fleet-Equipment.svg",

  "Fleet & Machinery": "/assets/img/home/service-icons/Fleet-Equipment.svg",

  "Aggregate & Construction Material Transportation":
    "/assets/img/home/service-icons/Aggregate-Construction-Material-Transportation.svg",
};

type IconMaskStyle = CSSProperties & {
  WebkitMaskImage?: string;
  maskImage?: string;
  WebkitMaskRepeat?: string;
  maskRepeat?: string;
  WebkitMaskPosition?: string;
  maskPosition?: string;
  WebkitMaskSize?: string;
  maskSize?: string;
};

export function HeroServiceSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);

  const titleRef = useRef<HTMLSpanElement>(null);
  const iconStageRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const current = heroServices[active] ?? heroServices[0];

  const currentIcon = current ? SERVICE_ICONS[current.title] : undefined;

  useEffect(() => {
    const startSlider = () => {
      setActive(0);
      setStarted(true);
    };

    window.addEventListener("mvp:hero-slider-start", startSlider);

    return () => {
      window.removeEventListener("mvp:hero-slider-start", startSlider);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    const title = titleRef.current;
    const iconStage = iconStageRef.current;
    const icon = iconRef.current;

    let split: SplitText | null = null;

    if (title) {
      split = new SplitText(title, {
        type: "chars,words",
        charsClass: "char",
        wordsClass: "word",
      });

      gsap.set(split.chars, {
        opacity: 0,
        scaleY: 0,
        yPercent: 25,
        transformOrigin: "50% 0%",
        willChange: "transform, opacity",
      });

      gsap.to(split.chars, {
        opacity: 1,
        scaleY: 1,
        yPercent: 0,
        duration: 0.5,
        stagger: 0.015,
        ease: "back.out(1.4)",
      });
    }

    if (iconStage) {
      gsap.fromTo(
        iconStage,
        {
          opacity: 0,
          y: 10,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }

    if (icon) {
      gsap.fromTo(
        icon,
        {
          opacity: 0,
          scale: 0.72,
          rotate: -5,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.65,
          delay: 0.05,
          ease: "back.out(1.5)",
          overwrite: true,
        },
      );
    }

    return () => {
      split?.revert();
    };
  }, [current.id, currentIcon]);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: (active + 1) / heroServices.length,
      transformOrigin: "left center",
      duration: SLIDE_SPEED,
      ease: "power2.out",
      overwrite: true,
    });
  }, [active]);

  useEffect(() => {
    if (!started || paused) return;

    const timer = window.setTimeout(() => {
      setActive((currentIndex) => {
        return (currentIndex + 1) % heroServices.length;
      });
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [active, paused, started]);

  const iconMaskStyle: IconMaskStyle | undefined = currentIcon
    ? {
        WebkitMaskImage: `url("${currentIcon}")`,
        maskImage: `url("${currentIcon}")`,

        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",

        WebkitMaskPosition: "center",
        maskPosition: "center",

        WebkitMaskSize: "contain",
        maskSize: "contain",
      }
    : undefined;

  return (
    <div
      className="hero-slider w-[545rem] overflow-hidden rounded-[10rem] bg-light text-primary max-[1024px]:hidden"
      style={{
        transform: "translateX(110%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* TOP: ICON LEFT + LABEL RIGHT */}
      <div className="hero-slider__head flex min-h-[135rem] items-start justify-between px-[40rem] pt-[36rem]">
        {currentIcon ? (
          <div
            key={`hero-icon-${current.id}-${active}`}
            ref={iconStageRef}
            className="relative flex h-[86rem] w-[86rem] shrink-0 items-center justify-center rounded-[10rem] border border-accent/20 bg-accent/[0.055]"
          >
            <div className="pointer-events-none absolute inset-[8rem] rounded-[7rem] border border-accent/10" />

            <span className="pointer-events-none absolute right-[8rem] top-[8rem] h-[4rem] w-[4rem] rounded-full bg-accent" />

            <div
              ref={iconRef}
              aria-hidden="true"
              className="relative z-[2] h-[50rem] w-[50rem] bg-accent"
              style={iconMaskStyle}
            />
          </div>
        ) : (
          <div className="h-[86rem] w-[86rem]" />
        )}

        <h3 className="hero-slider__title pt-[4rem] text-[15rem] uppercase text-primary">
          Our Services
        </h3>
      </div>

      {/* PROGRESS */}
      <div className="hero-slider__progressbar relative left-[40rem] mb-[20rem] mt-[10rem] h-[1rem] w-[calc(100%_-_80rem)] bg-gold/40">
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
          style={{
            transform: `scaleX(${(active + 1) / heroServices.length})`,
          }}
        />
      </div>

      {/* SERVICE TITLE */}
      <a
        href="/services"
        className="hero-slider__item-inner group flex min-h-[110rem] items-center justify-between px-[40rem] pb-[40rem] pt-[20rem]"
      >
        <span
          key={`hero-service-${current.id}-${active}`}
          ref={titleRef}
          className="hero-slider__item-title max-w-[360rem] text-[30rem] leading-[.9] uppercase text-primary"
        >
          {current.title}
        </span>

        <span className="hero-slider__item-box hero-slider__arrow-box flex h-[40rem] w-[40rem] shrink-0 items-center justify-center overflow-hidden rounded-[5rem]">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-slider__arrow h-[14rem] w-[14rem]"
            aria-hidden="true"
          >
            <path
              d="M3 8H13"
              stroke="var(--mvp-light)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M9 4L13 8L9 12"
              stroke="var(--mvp-light)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}
