"use client";

import { useLayoutEffect, useRef } from "react";

import Image from "next/image";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { observeAnimationLayout } from "@/lib/animationLayout";

import { Footer } from "@/components/Footer";
import { Contact } from "@/components/home/Contact";
import { Services } from "@/components/home/Services";
import { useI18n } from "@/components/i18n/I18nProvider";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { PageTransition } from "@/components/ui/PageTransition";

const SERVICES_SNAP_DELAY = 0.5;

const goalMedia = [
  "/assets/img/about/goals/prepare.webp",
  "/assets/img/about/goals/control.webp",
  "/assets/img/about/goals/deliver.webp",
];

const factMedia = [
  "/assets/img/about/plan-around/ksa.webp",
  "/assets/img/about/plan-around/b2b.webp",
  "/assets/img/about/plan-around/field.webp",
];

function AboutHero() {
  const { dictionary } = useI18n();
  const copy = dictionary.about.hero;

  return (
    <section
      id="hero"
      className="hero-about relative flex h-screen min-h-[760px] flex-col justify-end overflow-hidden bg-cover bg-center text-white max-[1025px]:min-h-[680px]"
      style={{
        backgroundImage: "url('/assets/img/about/about-hero.webp')",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#19255b]/70" />

      <div className="hero-about__container di-container relative z-[2] pb-[110rem] max-[1025px]:pb-[40rem]">
        <div className="hero-about__head main-animated-text relative mb-[190rem] flex items-end justify-between pb-[10rem] max-[1025px]:mb-[40rem] max-[1025px]:flex-col max-[1025px]:items-stretch">
          <h1 className="hero-about__title text-[200rem] leading-[.8] uppercase max-[1025px]:mb-[90rem] max-[1025px]:text-[80rem]">
            {copy.title}
          </h1>

          <div className="hero-about__abb flex w-[1100rem] items-center justify-between text-[40rem] leading-[.9] max-[1025px]:w-full max-[1025px]:text-[max(16px,20rem)]">
            <div
              dir="ltr"
              className="hero-about__abb-wrapper flex gap-[160rem] max-[1025px]:gap-[20rem]"
            >
              <span className="hero-about__abb-item">D.</span>
              <span className="hero-about__abb-item">I.</span>
            </div>

            <span className="hero-about__abb-text text-[40rem] leading-[.9] uppercase max-[1025px]:text-[max(16px,20rem)]">
              {copy.eyebrow}
            </span>
          </div>

          <span className="main-animated-line absolute bottom-0 left-0 h-[1rem] w-0 bg-white/20" />
        </div>

        <div className="hero-about__container-inner main-opacity-block ms-[740rem] flex max-w-[650rem] flex-col gap-[20rem] max-[1025px]:ms-0 max-[1025px]:max-w-none max-[1025px]:gap-[10rem]">
          <h2 className="about-hero__statement text-[30rem] font-bold leading-[.9] uppercase max-[1025px]:mb-[10rem] max-[1025px]:text-[max(16px,20rem)]">
            {copy.statement}
          </h2>

          {copy.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] max-[1025px]:text-[max(14px,14rem)] max-[1025px]:leading-[max(1.35em,20rem)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStatement() {
  const { dictionary } = useI18n();
  const copy = dictionary.about.brandStatement;

  return (
    <section className="reading-block min-h-screen bg-white py-[180rem] max-[1025px]:min-h-0 max-[1025px]:py-[90rem]">
      <div className="di-container">
        <div className="reading-block__text w-full">
          <h2 className="about-brand-statement__title mb-[70rem] max-w-[1250rem] text-[125rem] font-bold leading-[.84] uppercase max-[1025px]:mb-[40rem] max-[1025px]:text-[64rem]">
            {copy.title[0]} <br />
            {copy.title[1]}
          </h2>

          <div className="grid grid-cols-[1fr_.9fr] gap-[120rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[45rem]">
            <div className="max-w-[680rem] space-y-[24rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] normal-case max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="about-brand-statement__pillars flex flex-col gap-[18rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1025px]:gap-[12rem] max-[1025px]:text-[38rem] max-[1025px]:leading-[36rem]">
              {copy.pillars.map((pillar) => (
                <p key={pillar}>{pillar}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  const { dictionary, localePath } = useI18n();
  const copy = dictionary.about.ourStory;

  return (
    <section
      id="our-story"
      className="bg-white py-[90rem] max-[1025px]:py-[45rem]"
    >
      <div className="di-container">
        <div className="scale-block overflow-hidden rounded-[20rem] bg-[var(--di-primary)] px-[40rem] pb-[20rem] pt-[45rem] text-white max-[1025px]:rounded-[10rem] max-[1025px]:px-[20rem] max-[1025px]:pt-[30rem]">
          <div className="opacity-block flex items-center justify-between border-b border-white/15 pb-[10rem] uppercase max-[1025px]:text-[max(16px,15rem)]">
            <span>{copy.label}</span>
            <span>{copy.brand}</span>
          </div>

          <div className="opacity-block grid grid-cols-2 px-[80rem] max-[1025px]:grid-cols-1 max-[1025px]:px-0">
            <div className="about-story__primary border-r border-white/15 py-[90rem] pr-[90rem] max-[1025px]:border-b max-[1025px]:border-r-0 max-[1025px]:py-[35rem] max-[1025px]:pr-0">
              <h2 className="about-story__title animated-text mb-[28rem] text-[70rem] font-bold leading-[.9] uppercase max-[1025px]:text-[60rem]">
                {copy.heading[0]} <br />
                {copy.heading[1]}
              </h2>

              <p className="mb-[18rem] max-w-[570rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
                {copy.intro}
              </p>
            </div>

            <div className="about-story__secondary py-[90rem] pl-[90rem] max-[1025px]:py-[35rem] max-[1025px]:pl-0">
              <div className="mb-[55rem] max-w-[620rem] space-y-[24rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] max-[1025px]:mb-[35rem] max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <AnimatedButton
                href={`${localePath("/")}#services`}
                className="inline-flex max-[1025px]:w-full"
              >
                {copy.button}
              </AnimatedButton>
            </div>
          </div>

          <div className="border-t border-white/15 pt-[15rem] text-center text-[210rem] font-normal leading-none tracking-[-.03em] text-white/5 uppercase max-[1025px]:hidden">
            <div className="ticker">
              <span className="ticker-item">{copy.ticker}</span>
              <span className="ticker-item">{copy.ticker}</span>
              <span className="ticker-item">{copy.ticker}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Goals() {
  const { dictionary } = useI18n();
  const copy = dictionary.about.goals;

  return (
    <section
      id="goals"
      className="bg-white py-[120rem] max-[1025px]:py-[60rem]"
    >
      <div className="di-container">
        <h2 className="about-goals__title animated-text mb-[70rem] text-[180rem] leading-[.8] uppercase max-[1025px]:mb-[40rem] max-[1025px]:text-[80rem]">
          {copy.title}
        </h2>

        <div className="grid grid-cols-3 gap-[10rem] max-[1025px]:grid-cols-1">
          {copy.items.map((goal, index) => (
            <article
              key={goal.heading}
              className="scale-block group relative min-h-[620rem] overflow-hidden rounded-[20rem] max-[1025px]:min-h-[460rem] max-[1025px]:rounded-[10rem]"
            >
              <Image
                src={goalMedia[index] ?? goalMedia[0]}
                alt={goal.heading}
                fill
                sizes="(min-width: 1025px) 33vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]"
              />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(25,37,91,.16)_0%,rgba(25,37,91,.28)_42%,rgba(25,37,91,.88)_100%)]" />

              <div className="relative z-[2] flex min-h-[620rem] flex-col justify-between p-[55rem] text-white max-[1025px]:min-h-[460rem] max-[1025px]:p-[30rem]">
                <span
                  dir="ltr"
                  className="text-[130rem] leading-none max-[1025px]:text-[80rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="about-card__title mb-[18rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1025px]:text-[42rem] max-[1025px]:leading-[40rem]">
                    {goal.heading}
                  </h3>

                  <p className="max-w-[460rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] text-white/90 max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
                    {goal.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatShapesEveryOperation() {
  const { dictionary } = useI18n();
  const copy = dictionary.about.operationFactors;

  return (
    <section
      id="advantages"
      className="advantages relative max-h-screen overflow-hidden bg-white pb-[50rem] pt-[140rem] max-[1025px]:max-h-none max-[1025px]:overflow-visible max-[1025px]:py-[60rem]"
    >
      <div className="di-container">
        <div className="flex items-start justify-between gap-[70rem] max-[1025px]:flex-col max-[1025px]:gap-[40rem]">
          <div className="flex h-[760rem] w-[42%] flex-col justify-between max-[1025px]:h-auto max-[1025px]:w-full">
            <h2 className="about-operation__title animated-text text-[155rem] leading-[.8] uppercase max-[1025px]:text-[80rem]">
              {copy.title[0]} <br />
              {copy.title[1]}
            </h2>

            <div className="relative h-[2rem] w-full overflow-hidden bg-[var(--di-primary)]/15 max-[1025px]:hidden">
              <div className="advantages__progressbar-fill absolute inset-y-0 left-0 w-0 bg-[var(--di-primary)]" />
            </div>
          </div>

          <div className="advantages__scrollbox w-[52%] max-[1025px]:w-full">
            <div className="flex flex-col gap-[10rem]">
              {copy.items.map((item, index) => (
                <article
                  key={item.heading}
                  className="advantages__scrollbox-item grid min-h-[360rem] grid-cols-[95rem_minmax(0,580rem)] content-center gap-x-[45rem] rounded-[20rem] bg-[var(--di-primary)] px-[55rem] py-[45rem] text-white max-[1025px]:min-h-0 max-[1025px]:grid-cols-[60rem_minmax(0,1fr)] max-[1025px]:gap-x-[24rem] max-[1025px]:rounded-[10rem] max-[1025px]:p-[30rem]"
                >
                  <span
                    dir="ltr"
                    className="self-start text-[72rem] leading-none max-[1025px]:text-[50rem]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="max-w-[580rem]">
                    <h3 className="mb-[22rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1025px]:mb-[15rem] max-[1025px]:text-[38rem] max-[1025px]:leading-[36rem]">
                      {item.heading}
                    </h3>

                    <p className="font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] normal-case max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const { dictionary } = useI18n();
  const copy = dictionary.about.mission;

  return (
    <section className="reading-block min-h-screen bg-white py-[180rem] max-[1025px]:min-h-0 max-[1025px]:py-[90rem]">
      <div className="di-container">
        <div className="grid grid-cols-[.7fr_1.3fr] gap-[100rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[35rem]">
          <h2 className="about-mission__title text-[150rem] leading-[.8] uppercase max-[1025px]:text-[80rem]">
            {copy.title}
          </h2>

          <div className="reading-block__text max-w-[900rem]">
            {copy.statements.map((statement) => (
              <h3
                key={statement}
                className="about-mission__statement mb-[45rem] text-[60rem] font-bold leading-[54rem] uppercase last:mb-0 max-[1025px]:mb-[30rem] max-[1025px]:text-[42rem] max-[1025px]:leading-[40rem]"
              >
                {statement}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  const { dictionary } = useI18n();
  const copy = dictionary.about.statement;

  return (
    <section className="bg-white py-[90rem] max-[1025px]:py-[45rem]">
      <div className="di-container">
        <div className="scale-block flex min-h-[760rem] flex-col items-center justify-center rounded-[20rem] bg-[var(--di-light)] px-[70rem] py-[90rem] text-center max-[1025px]:min-h-[520rem] max-[1025px]:rounded-[10rem] max-[1025px]:px-[24rem] max-[1025px]:py-[55rem]">
          <p className="mb-[55rem] text-[32rem] uppercase max-[1025px]:mb-[35rem] max-[1025px]:text-[max(16px,20rem)]">
            {copy.label}
          </p>

          <h2 className="about-statement__title animated-text max-w-[1500rem] text-[165rem] leading-[.82] uppercase max-[1025px]:text-[70rem]">
            {copy.title}
          </h2>

          <div className="mt-[55rem] max-w-[900rem] space-y-[18rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] max-[1025px]:mt-[35rem] max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Facts() {
  const { dictionary } = useI18n();
  const copy = dictionary.about.facts;

  return (
    <section className="bg-white py-[120rem] max-[1025px]:py-[60rem]">
      <div className="di-container">
        <h2 className="about-facts__title animated-text mb-[70rem] text-[180rem] leading-[.8] uppercase max-[1025px]:mb-[40rem] max-[1025px]:text-[80rem]">
          {copy.title}
        </h2>

        <div className="grid grid-cols-3 gap-[10rem] max-[1025px]:grid-cols-1">
          {copy.items.map((fact, index) => (
            <article
              key={fact.heading}
              className="scale-block group relative min-h-[590rem] overflow-hidden rounded-[20rem] max-[1025px]:min-h-[460rem] max-[1025px]:rounded-[10rem]"
            >
              <Image
                src={factMedia[index] ?? factMedia[0]}
                alt={fact.title}
                fill
                sizes="(min-width: 1025px) 33vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.045]"
              />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(25,37,91,.18)_0%,rgba(25,37,91,.30)_40%,rgba(25,37,91,.93)_100%)] transition-all duration-500 group-hover:bg-[linear-gradient(180deg,rgba(25,37,91,.25)_0%,rgba(25,37,91,.43)_40%,rgba(25,37,91,.97)_100%)]" />

              <div className="relative z-[2] flex min-h-[590rem] flex-col justify-between p-[55rem] text-white max-[1025px]:min-h-[460rem] max-[1025px]:p-[30rem]">
                <span
                  dir={
                    fact.heading === "KSA" || fact.heading === "B2B"
                      ? "ltr"
                      : undefined
                  }
                  className="about-fact__eyebrow text-[120rem] leading-none max-[1025px]:text-[80rem]"
                >
                  {fact.heading}
                </span>

                <div className="max-w-[500rem]">
                  <div className="mb-[20rem] h-[3rem] w-[58rem] bg-[var(--di-accent)] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-[95rem]" />

                  <h3 className="about-card__title text-[60rem] font-bold leading-[54rem] uppercase transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-[14rem] max-[1025px]:mb-[18rem] max-[1025px]:translate-y-0 max-[1025px]:text-[40rem] max-[1025px]:leading-[38rem]">
                    {fact.title}
                  </h3>

                  <div className="grid translate-y-[24rem] opacity-0 transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] [grid-template-rows:0fr] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[grid-template-rows:1fr] max-[1025px]:translate-y-0 max-[1025px]:opacity-100 max-[1025px]:[grid-template-rows:1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-[5rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] text-white/90 max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
                        {fact.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { locale } = useI18n();

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    window.scrollTo(0, 0);

    const splits: SplitText[] = [];
    const listeners: Array<() => void> = [];
    const mm = gsap.matchMedia();
    const isRtl = locale === "ar";
    const revealUnitClass = isRtl ? ".word" : ".char";

    let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

    const splitForMotion = (element: HTMLElement) => {
      const split = new SplitText(element, {
        type: isRtl ? "words" : "chars,words",
        ...(isRtl
          ? { wordsClass: "word" }
          : { charsClass: "char", wordsClass: "word" }),
      });

      splits.push(split);

      return (isRtl ? split.words : split.chars) as HTMLElement[];
    };

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".transition-plug", { yPercent: 105 });
        gsap.set(".main-animated-line", { width: "100%" });
        return;
      }
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

      gsap.utils.toArray<HTMLElement>(".reading-block").forEach((section) => {
        const text = section.querySelector<HTMLElement>(".reading-block__text");
        if (!text) return;

        const split = new SplitText(text, {
          type: "words",
          wordsClass: "word",
        });

        splits.push(split);

        gsap.set(split.words, {
          willChange: "opacity",
          opacity: 0.1,
        });

        gsap.to(split.words, {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "bottom+=50% bottom",
            scrub: true,
            pin: section.offsetHeight <= window.innerHeight,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".opacity-block").forEach((element) => {
        gsap.set(element, { opacity: 0 });

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

      gsap.utils
        .toArray<HTMLElement>(".main-opacity-block")
        .forEach((element) => {
          gsap.set(element, { opacity: 0 });
        });

      gsap.utils.toArray<HTMLElement>(".scale-block").forEach((element) => {
        gsap.set(element, { scale: 0.7 });

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
          normalizeScroll: { allowNestedScroll: true },
        });

        const scrollbox = document.querySelector<HTMLElement>(
          ".advantages__scrollbox",
        );
        const firstItem = document.querySelector<HTMLElement>(
          ".advantages__scrollbox-item",
        );

        if (scrollbox && firstItem) {
          const distance = () =>
            Math.max(0, scrollbox.offsetHeight - firstItem.offsetHeight * 2);

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
            .to(scrollbox, { y: () => -distance(), ease: "none" }, 0)
            .to(
              ".advantages__progressbar-fill",
              { width: "100%", ease: "none" },
              0,
            );
        }

        const services = document.querySelector<HTMLElement>(".services");

        if (services) {
          const serviceItems = Array.from(
            services.querySelectorAll<HTMLElement>(".services__item"),
          );
          const serviceVisuals = Array.from(
            services.querySelectorAll<HTMLElement>(".services__visual"),
          );
          const serviceProgress = services.querySelector<HTMLElement>(
            ".services__progressbar-fill",
          );
          const getServicesEnd = () =>
            `+=${window.innerHeight * Math.max(serviceItems.length - 2, 4)}`;

          serviceVisuals.forEach((visual, index) => {
            gsap.set(visual, {
              yPercent: index === 0 ? 0 : 100,
              opacity: 1,
              force3D: true,
            });
          });

          if (serviceProgress) {
            gsap.to(serviceProgress, {
              width: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: services,
                start: "center center",
                end: getServicesEnd,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          }

          if (serviceItems.length > 0) {
            let serviceSnapPoints: number[] = [0, 1];

            const servicesTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: services,
                start: "center center",
                end: getServicesEnd,
                pin: true,
                scrub: true,
                snap: {
                  snapTo: (progress) => {
                    let closest = serviceSnapPoints[0] ?? 0;
                    let smallestDistance = Math.abs(progress - closest);

                    serviceSnapPoints.forEach((point) => {
                      const distance = Math.abs(progress - point);
                      if (distance < smallestDistance) {
                        closest = point;
                        smallestDistance = distance;
                      }
                    });

                    return closest;
                  },
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

            const serviceTargetTimes: number[] = [0];

            servicesTimeline.to(
              serviceItems[0],
              {
                scale: 0.8,
              },
              0,
            );

            serviceItems.slice(1).forEach((item, index) => {
              const currentIndex = index + 1;
              const previousVisual = serviceVisuals[currentIndex - 1];
              const currentVisual = serviceVisuals[currentIndex];

              servicesTimeline.to(
                item,
                {
                  transform: "translate(-50%, -50%)",
                },
                index === 0 ? "<" : ">",
              );

              if (previousVisual) {
                servicesTimeline.to(
                  previousVisual,
                  {
                    yPercent: -100,
                    force3D: true,
                  },
                  "<",
                );
              }

              if (currentVisual) {
                servicesTimeline.to(
                  currentVisual,
                  {
                    yPercent: 0,
                    force3D: true,
                  },
                  "<",
                );
              }

              serviceTargetTimes.push(servicesTimeline.duration());

              if (index < serviceItems.length - 2) {
                servicesTimeline.to(
                  item,
                  {
                    scale: 0.8,
                  },
                  ">",
                );
              }
            });

            const totalDuration = servicesTimeline.duration();

            if (totalDuration > 0) {
              serviceSnapPoints = serviceTargetTimes.map((time) =>
                Math.min(1, Math.max(0, time / totalDuration)),
              );
            }
          }
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
          normalizeScroll: { allowNestedScroll: true },
          ignoreMobileResize: true,
        });

        return () => {
          smoother?.kill();
          smoother = null;
        };
      });

      gsap.set(".transition-plug", { yPercent: 0 });
      gsap.set(".transition-plug__inner", {
        top: "auto",
        bottom: 0,
        height: "100%",
      });

      const heroRevealTargets = document.querySelectorAll<HTMLElement>(
        `.hero-about .main-animated-text ${revealUnitClass}`,
      );

      const entrance = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power4.inOut",
          duration: 2,
        },
      });

      entrance
        .fromTo(
          ".transition-plug__inner",
          { top: "auto", bottom: 0, height: "100%", duration: 0 },
          { height: "0%" },
          0,
        )
        .to(".transition-plug", { yPercent: 105 }, 0.05)
        .to(
          heroRevealTargets,
          {
            ease: "back",
            opacity: 1,
            scaleY: 1,
            yPercent: 0,
            stagger: isRtl ? 0.06 : 0.03,
            duration: 1,
          },
          ">",
        )
        .to(".main-animated-line", { width: "100%" }, "<")
        .to(".main-opacity-block", { opacity: 1, duration: 1 }, "<+=1");

      const start = () => {
        window.scrollTo(0, 0);
        entrance.play(0);
      };

      if (document.readyState === "complete") {
        requestAnimationFrame(start);
      } else {
        window.addEventListener("load", start, { once: true });
        listeners.push(() => window.removeEventListener("load", start));
      }

      listeners.push(observeAnimationLayout(rootRef.current!));
    }, rootRef);

    return () => {
      listeners.forEach((cleanup) => cleanup());
      splits.forEach((split) => split.revert());
      mm.revert();
      ctx.revert();
      smoother?.kill();
    };
  }, [locale]);

  return (
    <div ref={rootRef} className="about-page">
      <PageTransition initialCovered />

      <div id="smooth-wrapper">
        <div
          id="smooth-content"
          className="overflow-hidden bg-white text-[var(--di-primary)]"
        >
          <AboutHero />
          <BrandStatement />
          <OurStory />
          <Goals />
          <WhatShapesEveryOperation />
          <Mission />
          <Statement />
          <Facts />
          <Services />
          <Contact />

          <div className="bg-[var(--di-dark)]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutExperience;
