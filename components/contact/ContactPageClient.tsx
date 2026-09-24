"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContactPageForm from "@/components/contact/ContactPageForm";
import { PageTransition } from "@/components/ui/PageTransition";

type Person = {
  role: string;
  name: string;
  image: string;
  email: string;
  phone: string;
};

const people: Person[] = [
  {
    role: "Chief Executive Officer",
    name: "Asad Inam",
    image: "/assets/img/contact/Asad-Inam.webp",       
    email: "ADD EMAIL HERE",
    phone: "ADD PHONE HERE",
  },
  {
    role: "General Manager Operations",
    name: "Fazle Qadir Mirza",
    image: "/assets/img/contact/Fazle.webp",
    email: "ADD EMAIL HERE",
    phone: "ADD PHONE HERE",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-[16rem] w-[16rem]"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M11.5 5.5L16 10L11.5 14.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      data-contact-row
      className="group grid grid-cols-[120rem_1fr_42rem] items-center gap-[18rem] border-t border-[var(--mvp-primary)]/15 py-[22rem] max-[1024px]:grid-cols-[90rem_1fr_42rem] max-[1024px]:gap-[12rem] max-[1024px]:py-[18rem]"
    >
      <span className="font-['Inter'] text-[12rem] font-semibold uppercase tracking-[.03em] text-[var(--mvp-primary)] max-[1024px]:text-[10rem]">
        {label}:
      </span>

      <span className="min-w-0 break-words text-[30rem] font-bold leading-none tracking-[-.025em] text-[var(--mvp-primary)] transition-transform duration-500 group-hover:translate-x-[6rem] max-[1400px]:text-[27rem] max-[1200px]:text-[24rem] max-[1024px]:text-[22rem] max-[600px]:text-[19rem]">
        {value}
      </span>

      <span className="flex h-[40rem] w-[40rem] shrink-0 items-center justify-center rounded-[4rem] bg-[var(--mvp-primary)] text-white transition-all duration-500 group-hover:bg-[var(--mvp-accent)]">
        <ArrowIcon />
      </span>
    </a>
  );
}

function PersonCard({ person, index }: { person: Person; index: number }) {
  const hasRealEmail = person.email.includes("@");
  const hasRealPhone = !person.phone.includes("ADD");

  return (
    <article data-person-card className="min-w-0">
      <div className="relative h-[600rem] overflow-hidden rounded-[12rem] bg-[#f2f2f5] max-[1500px]:h-[560rem] max-[1200px]:h-[500rem] max-[1024px]:h-[540rem] max-[700px]:h-[430rem]">
        <div className="absolute left-[20rem] top-[18rem] z-[3] min-w-[170rem] rounded-[4rem] bg-white px-[20rem] py-[16rem] shadow-[0_10px_30px_rgba(22,37,91,.04)] max-[700px]:left-[14rem] max-[700px]:top-[14rem] max-[700px]:min-w-[150rem] max-[700px]:px-[16rem] max-[700px]:py-[13rem]">
          <span className="mb-[5rem] block font-['Inter'] text-[10rem] font-semibold uppercase leading-none tracking-[.03em] text-[var(--mvp-primary)]">
            {person.role}
          </span>

          <span className="block max-w-[180rem] text-[17rem] font-bold uppercase leading-[1.05] text-[var(--mvp-primary)] max-[700px]:text-[15rem]">
            {person.name}
          </span>
        </div>

        <div
          data-person-image-wrapper
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src={person.image}
            alt={`${person.name} — ${person.role}`}
            fill
            priority={index === 0}
            sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 32vw"
            className="object-cover object-center"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,37,91,0)_58%,rgba(22,37,91,.08)_100%)]" />
      </div>

      <div className="grid min-h-[88rem] grid-cols-2 items-end gap-[26rem] border-b border-[var(--mvp-primary)]/15 py-[22rem] max-[1320px]:grid-cols-1 max-[1320px]:gap-[15rem] max-[1024px]:py-[18rem]">
        <div>
          <span className="mb-[4rem] block font-['Inter'] text-[10rem] font-semibold uppercase tracking-[.03em] text-[var(--mvp-primary)]">
            E-mail:
          </span>

          {hasRealEmail ? (
            <a
              href={`mailto:${person.email}`}
              className="block break-words text-[15rem] font-bold uppercase leading-[1.15] text-[var(--mvp-primary)] transition-colors duration-300 hover:text-[var(--mvp-accent)] max-[700px]:text-[13rem]"
            >
              {person.email}
            </a>
          ) : (
            <span className="block break-words text-[15rem] font-bold uppercase leading-[1.15] text-[var(--mvp-primary)] max-[700px]:text-[13rem]">
              {person.email}
            </span>
          )}
        </div>

        <div className="text-right max-[1320px]:text-left">
          <span className="mb-[4rem] block font-['Inter'] text-[10rem] font-semibold uppercase tracking-[.03em] text-[var(--mvp-primary)]">
            Phone Number:
          </span>

          {hasRealPhone ? (
            <a
              href={`tel:${person.phone.replace(/\s/g, "")}`}
              className="text-[15rem] font-bold uppercase leading-[1.15] text-[var(--mvp-primary)] transition-colors duration-300 hover:text-[var(--mvp-accent)] max-[700px]:text-[13rem]"
            >
              {person.phone}
            </a>
          ) : (
            <span className="text-[15rem] font-bold uppercase leading-[1.15] text-[var(--mvp-primary)] max-[700px]:text-[13rem]">
              {person.phone}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ContactPageClient() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
          delay: 0.1,
        });

        gsap.set("[data-title-line]", {
          yPercent: 110,
          opacity: 0,
        });

        gsap.set("[data-person-card]", {
          y: 70,
          opacity: 0,
        });

        gsap.set("[data-person-image-wrapper]", {
          scale: 1.06,
          yPercent: 8,
        });

        gsap.set("[data-contact-row]", {
          y: 24,
          opacity: 0,
        });

        intro
          .to("[data-title-line]", {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
          })
          .to(
            "[data-person-card]",
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              stagger: 0.12,
              ease: "expo.out",
            },
            "-=0.65",
          )
          .to(
            "[data-person-image-wrapper]",
            {
              scale: 1,
              yPercent: 0,
              duration: 1.2,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=0.95",
          )
          .to(
            "[data-contact-row]",
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
            },
            "-=0.55",
          );

        gsap.utils
          .toArray<HTMLElement>("[data-person-card]")
          .forEach((card, index) => {
            gsap.to(card, {
              y: index === 0 ? -20 : -30,
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          });

        return () => {
          intro.kill();
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

  return (
    <>
      <PageTransition />

      <main
        ref={rootRef}
        className="overflow-x-clip bg-white text-[var(--mvp-primary)]"
      >
        <section className="bg-white pb-[110rem] pt-[190rem] max-[1280px]:pt-[180rem] max-[1024px]:pb-[75rem] max-[1024px]:pt-[150rem] max-[700px]:pt-[135rem]">
          <div className="mvp-container">
            <div className="grid grid-cols-[.9fr_1fr_1fr] gap-[14rem] max-[1024px]:grid-cols-2 max-[1024px]:gap-[20rem] max-[700px]:grid-cols-1">
              <div className="flex min-h-[690rem] flex-col justify-between pr-[105rem] max-[1500px]:pr-[65rem] max-[1280px]:pr-[30rem] max-[1024px]:col-span-2 max-[1024px]:min-h-0 max-[1024px]:pr-0 max-[700px]:col-span-1">
                <div className="max-w-[560rem] max-[1024px]:mb-[70rem] max-[700px]:mb-[50rem]">
                  <div className="overflow-hidden pb-[4rem]">
                    <span
                      data-title-line
                      className="block text-[clamp(90rem,7.2vw,145rem)] font-bold uppercase leading-[.82] tracking-[-.05em] text-[var(--mvp-primary)] max-[700px]:text-[70rem]"
                    >
                      Our
                    </span>
                  </div>

                  <div className="overflow-hidden pb-[10rem]">
                    <span
                      data-title-line
                      className="block text-[clamp(90rem,7.2vw,145rem)] font-bold uppercase leading-[.82] tracking-[-.05em] text-[var(--mvp-primary)] max-[700px]:text-[70rem]"
                    >
                      Contacts
                    </span>
                  </div>
                </div>

                <div className="max-w-[510rem]">
                  <ContactRow
                    label="Phone"
                    value="ADD PHONE"
                    href="#contact-form"
                  />

                  <ContactRow
                    label="WhatsApp"
                    value="ADD WHATSAPP"
                    href="#contact-form"
                  />

                  <div className="h-px w-full bg-[var(--mvp-primary)]/15" />
                </div>
              </div>

              <PersonCard person={people[0]} index={0} />

              <PersonCard person={people[1]} index={1} />
            </div>
          </div>
        </section>

        <ContactPageForm />
      </main>
    </>
  );
}
