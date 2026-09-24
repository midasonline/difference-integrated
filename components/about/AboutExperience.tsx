"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { Footer } from "@/components/Footer";
import { Services } from "@/components/home/Services";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { PageTransition } from "@/components/ui/PageTransition";
import { Contact } from "@/components/home/Contact";

const goals = [
  {
    number: "01",
    heading: "PREPARE",
    text: "Understand the movement before dispatch begins, from load conditions and site access to timing and vehicle requirements.",
  },
  {
    number: "02",
    heading: "CONTROL",
    text: "Keep each stage connected so operational changes can be managed without losing sight of the delivery objective.",
  },
  {
    number: "03",
    heading: "DELIVER",
    text: "Complete each movement with the discipline required by the cargo, project environment, and receiving site.",
  },
];

const operationFactors = [
  {
    number: "01",
    heading: "THE LOAD SETS THE REQUIREMENTS.",
    text: "Different materials, cargo types, weights, and handling conditions call for different transport decisions.",
  },
  {
    number: "02",
    heading: "THE SITE CHANGES THE PLAN.",
    text: "Access points, unloading areas, operating hours, and active site conditions affect how a movement is prepared.",
  },
  {
    number: "03",
    heading: "THE VEHICLE HAS TO FIT THE JOB.",
    text: "Fleet selection depends on the load, route, handling requirements, and destination - not simply availability.",
  },
  {
    number: "04",
    heading: "TIMING CONNECTS TO EVERYTHING ELSE.",
    text: "Delivery windows, construction sequences, receiving teams, and site activity all depend on transport arriving when expected.",
  },
  {
    number: "05",
    heading: "COMMUNICATION CANNOT STOP AT DISPATCH.",
    text: "Clients, drivers, operations teams, and receiving locations need to stay aligned while the movement is underway.",
  },
  {
    number: "06",
    heading: "COMPLIANCE STARTS BEFORE DEPARTURE.",
    text: "Applicable transport requirements and operating procedures are considered as part of the job from the beginning.",
  },
];

const facts = [
  {
    heading: "KSA",
    title: "THE OPERATING ENVIRONMENT",
    text: "Transport planning informed by Saudi routes, project locations, working conditions, and delivery requirements.",
  },
  {
    heading: "B2B",
    title: "THE BUSINESS REQUIREMENT",
    text: "Support structured around contractors, developers, industrial teams, procurement functions, and businesses managing ongoing transport activity.",
  },
  {
    heading: "FIELD",
    title: "THE CONDITIONS ON THE GROUND",
    text: "Decisions shaped by what happens at loading points, on the road, and inside active project sites.",
  },
];

function AboutHero() {
  return (
    <section
      id="hero"
      className="hero-about flex h-screen min-h-[760px] flex-col justify-end bg-cover bg-center text-white max-[1024px]:min-h-[680px]"
      style={{ backgroundImage: "url('/assets/img/about/about-hero.png')" }}
    >
      <div className="hero-about__container mvp-container relative z-[2] pb-[110rem] max-[1024px]:pb-[40rem]">
        <div className="hero-about__head main-animated-text relative mb-[190rem] flex items-end justify-between pb-[10rem] max-[1024px]:mb-[40rem] max-[1024px]:flex-col max-[1024px]:items-stretch">
          <h1 className="hero-about__title text-[200rem] leading-[.8] uppercase max-[1024px]:mb-[90rem] max-[1024px]:text-[80rem]">
            About us
          </h1>

          <div className="hero-about__abb flex w-[1100rem] items-center justify-between text-[40rem] leading-[.9] max-[1024px]:w-full max-[1024px]:text-[20rem]">
            <div className="hero-about__abb-wrapper flex gap-[160rem] max-[1024px]:gap-[20rem]">
              <span className="hero-about__abb-item">D.</span>
              <span className="hero-about__abb-item">I.</span>
            </div>

            <span className="hero-about__abb-text text-[40rem] leading-[.9] uppercase max-[1024px]:text-[20rem]">
              Logistics
            </span>
          </div>

          <span className="main-animated-line absolute bottom-0 left-0 h-[1rem] w-0 bg-white/20" />
        </div>

        <div className="hero-about__container-inner main-opacity-block ml-[740rem] flex max-w-[650rem] flex-col gap-[20rem] max-[1024px]:ml-0 max-[1024px]:max-w-none max-[1024px]:gap-[10rem]">
          <h2 className="text-[30rem] font-bold leading-[.9] uppercase max-[1024px]:mb-[10rem] max-[1024px]:text-[20rem]">
            LOGISTICS SHAPED BY THE REALITIES ON THE GROUND.
          </h2>

          <p className="font-['Inter'] text-[20rem] font-normal leading-[27rem] max-[1024px]:text-[14rem] max-[1024px]:leading-[20rem]">
            Difference Integrated supports transport operations where load requirements, site conditions, timing, and coordination all need to work together.
          </p>

          <p className="font-['Inter'] text-[20rem] font-normal leading-[27rem] max-[1024px]:text-[14rem] max-[1024px]:leading-[20rem]">
            Across Saudi Arabia, we bring structure to the movement behind construction, infrastructure, commercial, and industrial activity.
          </p>
        </div>
      </div>
    </section>
  );
}

function BrandStatement() {
  return (
    <section className="reading-block min-h-screen bg-white py-[180rem] max-[1024px]:min-h-0 max-[1024px]:py-[90rem]">
      <div className="mvp-container">
        <div className="reading-block__text mx-auto max-w-[1540rem]">
          <h2 className="mb-[70rem] max-w-[1250rem] text-[125rem] font-bold leading-[.84] uppercase max-[1024px]:mb-[40rem] max-[1024px]:text-[64rem]">
            BEFORE THE ROAD, <br />THERE&apos;S THE OPERATION.
          </h2>

          <div className="grid grid-cols-[1fr_.9fr] gap-[120rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[45rem]">
            <div className="max-w-[680rem] space-y-[24rem] font-['Inter'] text-[20rem] font-normal leading-[27rem] normal-case max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
              <p>
                Every movement starts with understanding the load, the site, access conditions, timing, vehicle requirements, and the people involved.
              </p>
              <p>
                Difference Integrated connects those details before dispatch begins, helping reduce disruption at loading points, on the road, and at the destination.
              </p>
            </div>

            <div className="flex flex-col gap-[18rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1024px]:gap-[12rem] max-[1024px]:text-[38rem] max-[1024px]:leading-[36rem]">
              <p>PLAN WITH CONTEXT.</p>
              <p>COORDINATE WITH CLARITY.</p>
              <p>EXECUTE WITH CONTROL.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section id="our-story" className="bg-white py-[90rem] max-[1024px]:py-[45rem]">
      <div className="mvp-container">
        <div className="scale-block overflow-hidden rounded-[20rem] bg-[var(--mvp-primary)] px-[40rem] pb-[20rem] pt-[45rem] text-white max-[1024px]:rounded-[10rem] max-[1024px]:px-[20rem] max-[1024px]:pt-[30rem]">
          <div className="opacity-block flex items-center justify-between border-b border-white/15 pb-[10rem] uppercase max-[1024px]:text-[15rem]">
            <span>WHO WE ARE</span>
            <span>Difference Integrated</span>
          </div>

          <div className="opacity-block grid grid-cols-2 px-[80rem] max-[1024px]:grid-cols-1 max-[1024px]:px-0">
            <div className="border-r border-white/15 py-[90rem] pr-[90rem] max-[1024px]:border-b max-[1024px]:border-r-0 max-[1024px]:py-[35rem] max-[1024px]:pr-0">
              <h2 className="animated-text mb-[28rem] text-[70rem] font-bold leading-[.9] uppercase max-[1024px]:text-[60rem]">
                WE PLAN FOR MORE <br />THAN THE DISTANCE.
              </h2>

              <p className="mb-[18rem] max-w-[570rem] font-['Inter'] text-[20rem] font-normal leading-[27rem] max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
                Difference Integrated is a Saudi transportation and logistics company focused on the practical requirements behind every movement.
              </p>
            </div>

            <div className="py-[90rem] pl-[90rem] max-[1024px]:py-[35rem] max-[1024px]:pl-0">
              <div className="mb-[55rem] max-w-[620rem] space-y-[24rem] font-['Inter'] text-[20rem] font-normal leading-[27rem] max-[1024px]:mb-[35rem] max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
                <p>
                  Vehicle suitability, loading conditions, site access, delivery sequencing, driver readiness, and communication all influence how the job is handled.
                </p>
                <p>
                  That means the transport plan is shaped around the actual requirements of the assignment rather than treated as a standard trip from one point to another.
                </p>
              </div>

              <AnimatedButton href="/#services" className="inline-flex max-[1024px]:w-full">
                EXPLORE OUR CAPABILITIES
              </AnimatedButton>
            </div>
          </div>

          <div className="border-t border-white/15 pt-[15rem] text-center text-[210rem] font-normal leading-none tracking-[-.03em] text-white/5 uppercase max-[1024px]:hidden">
            <div className="ticker">
              <span className="ticker-item">Built for Saudi logistics</span>
              <span className="ticker-item">Built for Saudi logistics</span>
              <span className="ticker-item">Built for Saudi logistics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Goals() {
  return (
    <section id="goals" className="bg-white py-[120rem] max-[1024px]:py-[60rem]">
      <div className="mvp-container">
        <h2 className="animated-text mb-[70rem] text-[180rem] leading-[.8] uppercase max-[1024px]:mb-[40rem] max-[1024px]:text-[80rem]">
          OUR MAIN GOALS
        </h2>

        <div className="grid grid-cols-3 gap-[10rem] max-[1024px]:grid-cols-1">
          {goals.map((goal) => (
            <article key={goal.number} className="scale-block flex min-h-[560rem] flex-col justify-between rounded-[20rem] bg-[var(--mvp-light)] p-[55rem] max-[1024px]:min-h-[330rem] max-[1024px]:rounded-[10rem] max-[1024px]:p-[30rem]">
              <span className="text-[140rem] leading-none text-[var(--mvp-primary)] max-[1024px]:text-[80rem]">
                {goal.number}
              </span>

              <div>
                <h3 className="mb-[18rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1024px]:text-[42rem] max-[1024px]:leading-[40rem]">
                  {goal.heading}
                </h3>
                <p className="max-w-[440rem] font-['Inter'] text-[20rem] font-normal leading-[27rem] max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
                  {goal.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatShapesEveryOperation() {
  return (
    <section id="advantages" className="advantages relative max-h-screen overflow-hidden bg-white pb-[50rem] pt-[140rem] max-[1024px]:max-h-none max-[1024px]:overflow-visible max-[1024px]:py-[60rem]">
      <div className="mvp-container">
        <div className="flex items-start justify-between gap-[70rem] max-[1024px]:flex-col max-[1024px]:gap-[40rem]">
          <div className="flex h-[760rem] w-[42%] flex-col justify-between max-[1024px]:h-auto max-[1024px]:w-full">
            <h2 className="animated-text text-[155rem] leading-[.8] uppercase max-[1024px]:text-[80rem]">
              WHAT SHAPES <br />EVERY OPERATION
            </h2>

            <div className="relative h-[2rem] w-full overflow-hidden bg-[var(--mvp-primary)]/15 max-[1024px]:hidden">
              <div className="advantages__progressbar-fill absolute inset-y-0 left-0 w-0 bg-[var(--mvp-primary)]" />
            </div>
          </div>

          <div className="advantages__scrollbox w-[52%] max-[1024px]:w-full">
            <div className="flex flex-col gap-[10rem]">
              {operationFactors.map((item) => (
                <article key={item.number} className="advantages__scrollbox-item grid min-h-[360rem] grid-cols-[95rem_minmax(0,580rem)] content-center gap-x-[45rem] rounded-[20rem] bg-[var(--mvp-primary)] px-[55rem] py-[45rem] text-white max-[1024px]:min-h-0 max-[1024px]:grid-cols-[60rem_minmax(0,1fr)] max-[1024px]:gap-x-[24rem] max-[1024px]:rounded-[10rem] max-[1024px]:p-[30rem]">
                  <span className="self-start text-[72rem] leading-none max-[1024px]:text-[50rem]">
                    {item.number}
                  </span>

                  <div className="max-w-[580rem]">
                    <h3 className="mb-[22rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1024px]:mb-[15rem] max-[1024px]:text-[38rem] max-[1024px]:leading-[36rem]">
                      {item.heading}
                    </h3>
                    <p className="font-['Inter'] text-[20rem] font-normal leading-[27rem] normal-case max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
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
  return (
    <section className="reading-block min-h-screen bg-white py-[180rem] max-[1024px]:min-h-0 max-[1024px]:py-[90rem]">
      <div className="mvp-container">
        <div className="grid grid-cols-[.7fr_1.3fr] gap-[100rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[35rem]">
          <h2 className="text-[150rem] leading-[.8] uppercase max-[1024px]:text-[80rem]">
            OUR MISSION
          </h2>

          <div className="reading-block__text max-w-[900rem]">
            <h3 className="mb-[45rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1024px]:mb-[30rem] max-[1024px]:text-[42rem] max-[1024px]:leading-[40rem]">
              to bring clarity and structure to transport operations by connecting the details that matter before, during, and at the end of every trip.
            </h3>
            <h3 className="mb-[45rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1024px]:mb-[30rem] max-[1024px]:text-[42rem] max-[1024px]:leading-[40rem]">
              We support projects and businesses across Saudi Arabia with an approach built around preparation, coordination, field execution, and accountability.
            </h3>

            {/* <div className="space-y-[24rem] font-['Inter'] text-[20rem] font-normal leading-[27rem] normal-case max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
              <p>
                Our mission is to bring clarity and structure to transport operations by connecting the details that matter before, during, and at the end of every trip.
              </p>
              <p>
                We support projects and businesses across Saudi Arabia with an approach built around preparation, coordination, field execution, and accountability.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="bg-white py-[90rem] max-[1024px]:py-[45rem]">
      <div className="mvp-container">
        <div className="scale-block flex min-h-[760rem] flex-col items-center justify-center rounded-[20rem] bg-[var(--mvp-light)] px-[70rem] py-[90rem] text-center max-[1024px]:min-h-[520rem] max-[1024px]:rounded-[10rem] max-[1024px]:px-[24rem] max-[1024px]:py-[55rem]">
          <p className="mb-[55rem] text-[32rem] uppercase max-[1024px]:mb-[35rem] max-[1024px]:text-[20rem]">
            DIFFERENCE INTEGRATED
          </p>

          <h2 className="animated-text max-w-[1500rem] text-[165rem] leading-[.82] uppercase max-[1024px]:text-[70rem]">
            THE ROAD IS ONLY ONE PART OF THE JOB.
          </h2>

          <div className="mt-[55rem] max-w-[900rem] space-y-[18rem] font-['Inter'] text-[20rem] font-normal leading-[27rem] max-[1024px]:mt-[35rem] max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
            <p>
              Loading conditions, fleet readiness, timing, communication, site access, and final handoff all determine how well a movement is completed.
            </p>
            <p>
              That is why we look at the operation as a whole.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section className="bg-white py-[120rem] max-[1024px]:py-[60rem]">
      <div className="mvp-container">
        <h2 className="animated-text mb-[70rem] text-[180rem] leading-[.8] uppercase max-[1024px]:mb-[40rem] max-[1024px]:text-[80rem]">
          WHAT WE PLAN AROUND
        </h2>

        <div className="grid grid-cols-3 gap-[10rem] max-[1024px]:grid-cols-1">
          {facts.map((fact) => (
            <article key={fact.heading} className="scale-block flex min-h-[590rem] flex-col justify-between rounded-[20rem] bg-[var(--mvp-primary)] p-[55rem] text-white max-[1024px]:min-h-[400rem] max-[1024px]:rounded-[10rem] max-[1024px]:p-[30rem]">
              <span className="text-[120rem] leading-none max-[1024px]:text-[80rem]">
                {fact.heading}
              </span>

              <div>
                <h3 className="mb-[22rem] text-[60rem] font-bold leading-[54rem] uppercase max-[1024px]:text-[40rem] max-[1024px]:leading-[38rem]">
                  {fact.title}
                </h3>
                <p className="max-w-[480rem] font-['Inter'] text-[20rem] font-normal leading-[27rem] normal-case max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
                  {fact.text}
                </p>
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

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    window.scrollTo(0, 0);

    const splits: SplitText[] = [];
    const listeners: Array<() => void> = [];
    const mm = gsap.matchMedia();
    let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;

    const ctx = gsap.context(() => {
      const mainAnimated = gsap.utils.toArray<HTMLElement>(
        ".main-animated-text",
      );

      mainAnimated.forEach((element) => {
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

      gsap.utils.toArray<HTMLElement>(".reading-block").forEach((section) => {
        const text = section.querySelector<HTMLElement>(".reading-block__text");
        if (!text) return;

        const split = new SplitText(text, {
          type: "chars,words",
          charsClass: "char",
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
            pin: true,
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
          normalizeScroll: true,
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

          const serviceProgress = services.querySelector<HTMLElement>(
            ".services__progressbar-fill",
          );

          const getServicesEnd = () =>
            `+=${window.innerHeight * Math.max(serviceItems.length - 2, 4)}`;

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
            const servicesTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: services,
                start: "center center",
                end: getServicesEnd,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });

            servicesTimeline.to(serviceItems[0], { scale: 0.8 }, 0);

            serviceItems.slice(1).forEach((item, index) => {
              servicesTimeline.to(
                item,
                { transform: "translate(-50%, -50%)" },
                index === 0 ? "<" : ">",
              );

              if (index < serviceItems.length - 2) {
                servicesTimeline.to(item, { scale: 0.8 }, ">");
              }
            });
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
          normalizeScroll: true,
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

      const heroChars = document.querySelectorAll<HTMLElement>(
        ".hero-about .main-animated-text .char",
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

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh);
      listeners.push(() => window.removeEventListener("resize", refresh));

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => {
      listeners.forEach((cleanup) => cleanup());
      splits.forEach((split) => split.revert());
      mm.revert();
      ctx.revert();
      smoother?.kill();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <PageTransition initialCovered />
      <div id="smooth-wrapper">
        <div
          id="smooth-content"
          className="overflow-hidden bg-white text-[var(--mvp-primary)]"
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
          <div className="bg-[var(--mvp-dark)]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
