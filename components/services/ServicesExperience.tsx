"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { differenceServices } from "@/data/difference-services";

function ProjectButton(): React.JSX.Element {
  return (
    <Link
      href="/contact"
      className="mvp-btn mvp-btn-accent mt-auto min-[1025px]:w-fit"
    >
      <span className="mvp-btn-inner flex items-center gap-[14rem]">
        Discuss Your Project
        <ArrowUpRight
          className="h-[18rem] w-[18rem] shrink-0"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export default function ServicesExperience(): React.JSX.Element {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !trackRef.current || !progressRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1025px)", () => {
      const getDistance = (): number =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.set(track, {
        x: 0,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },

        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          track,
          {
            x: () => -getDistance(),
          },
          0,
        )
        .to(
          progress,
          {
            scaleX: 1,
          },
          0,
        );

      const handleLoad = (): void => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("load", handleLoad, {
        once: true,
      });

      return () => {
        window.removeEventListener("load", handleLoad);

        timeline.scrollTrigger?.kill();
        timeline.kill();

        gsap.set(track, {
          clearProps: "transform",
        });

        gsap.set(progress, {
          clearProps: "transform",
        });
      };
    });

    return () => {
      matchMedia.revert();
    };
  }, []);

  return (
    <main className="overflow-x-clip bg-[var(--mvp-light)] text-[var(--mvp-primary)]">
      <section
        ref={rootRef}
        className="relative min-[1025px]:h-[100svh]"
        aria-label="Difference Integrated services"
      >
        <div
          ref={trackRef}
          className="flex w-full flex-col min-[1025px]:h-full min-[1025px]:w-max min-[1025px]:flex-row"
        >
          {/* HERO */}
          <section className="relative flex min-h-[100svh] w-full overflow-hidden bg-[var(--mvp-primary)] text-[var(--mvp-light)] min-[1025px]:h-[100svh] min-[1025px]:min-h-[600px] min-[1025px]:w-screen min-[1025px]:shrink-0">
            <Image
              src="/assets/img/services/desktop/hero-bg.png"
              alt="Difference Integrated logistics services"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-55"
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,37,91,.96)_0%,rgba(25,37,91,.72)_43%,rgba(25,37,91,.28)_100%)]" />

            <div className="mvp-container relative z-10 flex min-h-[100svh] w-full flex-col justify-between pb-[48rem] pt-[150rem] max-[1024px]:pb-[32rem] max-[1024px]:pt-[120rem]">
              <div className="max-w-[720rem]">
                <p className="mb-[28rem] font-['Inter'] text-[15rem] font-medium uppercase tracking-[.18em] text-[var(--mvp-accent)] max-[1024px]:text-[13rem]">
                  Difference Integrated · Saudi Arabia
                </p>

                <p className="max-w-[620rem] font-['Inter'] text-[22rem] font-normal leading-[1.45] text-[var(--mvp-light)]/82 max-[1024px]:text-[18rem]">
                  Heavy transport, material movement, fleet operations and
                  coordinated logistics support for construction, infrastructure
                  and freight requirements.
                </p>
              </div>

              <div className="flex items-end justify-between gap-[30rem] max-[700px]:block">
                <h1 className="max-w-[1450rem] text-[clamp(104rem,15vw,290rem)] font-bold uppercase leading-[.76] tracking-[-.035em]">
                  Our
                  <br />
                  Services
                </h1>

                <div className="mb-[16rem] flex items-center gap-[14rem] font-['Inter'] text-[13rem] font-medium uppercase tracking-[.15em] text-[var(--mvp-light)]/70 max-[700px]:mt-[30rem]">
                  <span className="h-[2rem] w-[54rem] bg-[var(--mvp-accent)]" />
                  Scroll to explore
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          {differenceServices.map((service) => (
            <section
              key={service.number}
              id={`service-${service.number}`}
              className="flex w-full flex-col bg-[var(--mvp-light)] min-[1025px]:h-[100svh] min-[1025px]:min-h-[600px] min-[1025px]:w-screen min-[1025px]:shrink-0 min-[1025px]:flex-row"
            >
              {/* IMAGE SIDE */}
              <div className="relative h-[58svh] min-h-[430px] overflow-hidden bg-[var(--mvp-primary)] min-[1025px]:h-full min-[1025px]:min-h-0 min-[1025px]:w-[49.75vw] min-[1025px]:shrink-0">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,37,91,.08)_0%,rgba(25,37,91,.18)_48%,rgba(25,37,91,.86)_100%)]" />

                <div className="absolute inset-x-[40rem] bottom-[44rem] z-10 max-[1024px]:inset-x-[20rem] max-[1024px]:bottom-[24rem]">
                  <div className="mb-[18rem] flex items-center gap-[16rem]">
                    <span className="font-['Inter'] text-[16rem] font-medium tracking-[.16em] text-[var(--mvp-accent)]">
                      {service.number}
                    </span>

                    <span className="h-[1rem] w-[72rem] bg-[var(--mvp-accent)]" />
                  </div>

                  <h2 className="max-w-[820rem] text-[clamp(48rem,4.6vw,92rem)] font-bold uppercase leading-[.9] tracking-[-.02em] text-white max-[1024px]:text-[52rem] max-[640px]:text-[42rem]">
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* CONTENT SIDE */}
              <div className="flex min-h-[520px] flex-1 flex-col bg-[var(--mvp-light)] px-[clamp(28rem,5vw,105rem)] pb-[52rem] pt-[58rem] min-[1025px]:h-full min-[1025px]:min-h-0 min-[1025px]:pb-[55rem] min-[1025px]:pt-[115rem] max-[1024px]:px-[20rem] max-[1024px]:py-[44rem]">
                <div className="mb-[42rem] flex items-center justify-between gap-[20rem] border-b border-[var(--mvp-primary)]/18 pb-[20rem]">
                  <span className="font-['Inter'] text-[13rem] font-semibold uppercase tracking-[.17em] text-[var(--mvp-accent)]">
                    Service {service.number}
                  </span>

                  <span className="font-['Inter'] text-[13rem] font-medium uppercase tracking-[.13em] text-[var(--mvp-primary)]/55">
                    Difference Integrated
                  </span>
                </div>

                <div className="max-w-[690rem]">
                  <p className="font-['Inter'] text-[clamp(22rem,1.65vw,32rem)] font-medium leading-[1.35] text-[var(--mvp-primary)]">
                    {service.description}
                  </p>

                  {service.details ? (
                    <p className="mt-[25rem] font-['Inter'] text-[17rem] font-normal leading-[1.6] text-[var(--mvp-primary)]/70 max-[1024px]:text-[16rem]">
                      {service.details}
                    </p>
                  ) : null}

                  <div className="mt-[42rem]">
                    <p className="mb-[15rem] font-['Inter'] text-[13rem] font-semibold uppercase tracking-[.16em] text-[var(--mvp-primary)]/55">
                      Operational support
                    </p>

                    <ul className="divide-y divide-[var(--mvp-primary)]/14 border-y border-[var(--mvp-primary)]/14">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-[16rem] py-[14rem] font-['Inter'] text-[15rem] font-medium leading-[1.35] text-[var(--mvp-primary)]"
                        >
                          <span
                            className="h-[7rem] w-[7rem] shrink-0 bg-[var(--mvp-accent)]"
                            aria-hidden="true"
                          />

                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ProjectButton />
              </div>
            </section>
          ))}
        </div>

        {/* SCROLL PROGRESS */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden h-[3rem] bg-[var(--mvp-primary)]/15 min-[1025px]:block">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-[var(--mvp-accent)]"
          />
        </div>
      </section>

      {/* END CTA */}
      <section className="bg-[var(--mvp-primary)] px-[20rem] py-[85rem] text-[var(--mvp-light)] min-[1025px]:px-[40rem] min-[1025px]:py-[110rem]">
        <div className="mx-auto flex max-w-[1500rem] items-end justify-between gap-[50rem] max-[850px]:flex-col max-[850px]:items-start">
          <div className="max-w-[900rem]">
            <p className="mb-[20rem] font-['Inter'] text-[13rem] font-semibold uppercase tracking-[.18em] text-[var(--mvp-accent)]">
              Project logistics support
            </p>

            <h2 className="text-[clamp(58rem,6vw,118rem)] font-bold uppercase leading-[.88] tracking-[-.025em]">
              Build the right logistics plan for your project.
            </h2>
          </div>

          <Link
            href="/contact"
            className="mvp-btn mvp-btn-accent min-[851px]:w-fit"
          >
            <span className="mvp-btn-inner flex items-center gap-[14rem]">
              Contact Logistics Team
              <ArrowUpRight
                className="h-[18rem] w-[18rem] shrink-0"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
