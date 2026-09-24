"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { heroServices } from "@/data/site";

const AUTOPLAY_DELAY = 5000;
const SLIDE_SPEED = 0.8;

export function HeroServiceSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);

  const titleRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const current = heroServices[active] ?? heroServices[0];

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

    if (!title) return;

    const split = new SplitText(title, {
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

    return () => {
      split.revert();
    };
  }, [current.id]);

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

  return (
    <div
      className="hero-slider w-[545rem] overflow-hidden rounded-[10rem] bg-light text-primary max-[1024px]:hidden"
      style={{
        transform: "translateX(110%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-slider__head flex items-center justify-between px-[40rem] pt-[40rem]">
        <div className="hero-slider__counter text-[20rem]">
          <span className="hero-slider__counter-current inline-block min-w-[20rem] text-accent">
            {String(active + 1).padStart(2, "0")}
          </span>

          <span className="hero-slider__counter-total text-primary/20">
            /{String(heroServices.length).padStart(2, "0")}
          </span>
        </div>

        <h3 className="hero-slider__title text-[15rem] uppercase text-primary">
          Our Services
        </h3>
      </div>

      <div className="hero-slider__progressbar relative left-[40rem] mb-[20rem] mt-[130rem] h-[1rem] w-[calc(100%_-_80rem)] bg-gold/40">
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
          style={{
            transform: `scaleX(${(active + 1) / heroServices.length})`,
          }}
        />
      </div>

      <a
        href="/services"
        className="hero-slider__item-inner group flex items-center justify-between px-[40rem] pb-[40rem] pt-[20rem]"
      >
        <span
          key={`hero-service-${current.id}-${active}`}
          ref={titleRef}
          className="hero-slider__item-title max-w-[330rem] text-[30rem] leading-[.9] uppercase text-primary"
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
