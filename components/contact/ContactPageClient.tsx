"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContactPageForm from "@/components/contact/ContactPageForm";
import { useI18n } from "@/components/i18n/I18nProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactPageCopy = Dictionary["contactPage"];
type PersonCopy = ContactPageCopy["people"][number];

type PersonMedia = {
  image: string;
};

const peopleMedia: PersonMedia[] = [
  {
    image: "/assets/img/contact/Asad-Inam.webp",
  },
  {
    image: "/assets/img/contact/Fazle.webp",
  },
];

function ArrowIcon({ isRtl = false }: { isRtl?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`h-[16rem] w-[16rem] ${isRtl ? "scale-x-[-1]" : ""}`}
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
  isRtl,
}: {
  label: string;
  value: string;
  href: string;
  isRtl: boolean;
}) {
  return (
    <a
      href={href}
      data-contact-row
      className="group grid grid-cols-[120rem_1fr_42rem] items-center gap-[18rem] border-t border-[var(--di-primary)]/15 py-[22rem] max-[1025px]:grid-cols-[90rem_1fr_42rem] max-[1025px]:gap-[12rem] max-[1025px]:py-[18rem]"
    >
      <span className="font-['Inter'] text-[max(12px,12rem)] font-semibold uppercase tracking-[.03em] text-[var(--di-primary)] max-[1025px]:text-[max(12px,10rem)]">
        {label}:
      </span>

      <span
        className={`contact-page__contact-value min-w-0 break-words text-[30rem] font-bold leading-none tracking-[-.025em] text-[var(--di-primary)] transition-transform duration-500 max-[1400px]:text-[27rem] max-[1200px]:text-[max(16px,24rem)] max-[1025px]:text-[max(16px,22rem)] max-[600px]:text-[max(16px,19rem)] ${
          isRtl
            ? "group-hover:-translate-x-[6rem]"
            : "group-hover:translate-x-[6rem]"
        }`}
      >
        {value}
      </span>

      <span className="flex h-[40rem] w-[40rem] shrink-0 items-center justify-center rounded-[4rem] bg-[var(--di-primary)] text-white transition-all duration-500 group-hover:bg-[var(--di-accent)]">
        <ArrowIcon isRtl={isRtl} />
      </span>
    </a>
  );
}

function PersonCard({
  person,
  media,
  index,
  labels,
  isRtl,
}: {
  person: PersonCopy;
  media: PersonMedia;
  index: number;
  labels: ContactPageCopy["labels"];
  isRtl: boolean;
}) {
  const hasRealEmail = person.email.includes("@");
  const hasRealPhone = /\d/.test(person.phone);

  return (
    <article data-person-card className="min-w-0">
      <div className="relative h-[600rem] overflow-hidden rounded-[12rem] bg-[#f2f2f5] max-[1500px]:h-[560rem] max-[1200px]:h-[500rem] max-[1025px]:h-[540rem] max-[700px]:h-[430rem]">
        <div
          className={`absolute top-[18rem] z-[3] min-w-[170rem] rounded-[4rem] bg-white px-[20rem] py-[16rem] shadow-[0_10px_30px_rgba(22,37,91,.04)] max-[700px]:top-[14rem] max-[700px]:min-w-[150rem] max-[700px]:px-[16rem] max-[700px]:py-[13rem] ${
            isRtl
              ? "right-[20rem] max-[700px]:right-[14rem]"
              : "left-[20rem] max-[700px]:left-[14rem]"
          }`}
        >
          <span className="contact-person-role mb-[5rem] block font-['Inter'] text-[max(12px,10rem)] font-semibold uppercase leading-none tracking-[.03em] text-[var(--di-primary)]">
            {person.role}
          </span>

          <span
            dir="ltr"
            className={`contact-person-name block max-w-[180rem] text-[max(16px,17rem)] font-bold uppercase leading-[1.05] text-[var(--di-primary)] max-[700px]:text-[max(16px,15rem)] ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            {person.name}
          </span>
        </div>

        <div
          data-person-image-wrapper
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src={media.image}
            alt={`${person.name} — ${person.role}`}
            fill
            priority={index === 0}
            sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 32vw"
            className="object-cover object-center"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,37,91,0)_58%,rgba(22,37,91,.08)_100%)]" />
      </div>

      <div className="grid min-h-[88rem] grid-cols-2 items-end gap-[26rem] border-b border-[var(--di-primary)]/15 py-[22rem] max-[1320px]:grid-cols-1 max-[1320px]:gap-[15rem] max-[1025px]:py-[18rem]">
        <div>
          <span className="mb-[4rem] block font-['Inter'] text-[max(12px,10rem)] font-semibold uppercase tracking-[.03em] text-[var(--di-primary)]">
            {labels.email}:
          </span>

          {hasRealEmail ? (
            <a
              href={`mailto:${person.email}`}
              dir="ltr"
              className={`block break-words text-[max(16px,15rem)] font-bold uppercase leading-[1.15] text-[var(--di-primary)] transition-colors duration-300 hover:text-[var(--di-accent)] max-[700px]:text-[max(13px,13rem)] ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {person.email}
            </a>
          ) : (
            <span className="block break-words text-[max(16px,15rem)] font-bold uppercase leading-[1.15] text-[var(--di-primary)] max-[700px]:text-[max(13px,13rem)]">
              {person.email}
            </span>
          )}
        </div>

        <div
          className={`${
            isRtl
              ? "text-left max-[1320px]:text-right"
              : "text-right max-[1320px]:text-left"
          }`}
        >
          <span className="mb-[4rem] block font-['Inter'] text-[max(12px,10rem)] font-semibold uppercase tracking-[.03em] text-[var(--di-primary)]">
            {labels.phoneNumber}:
          </span>

          {hasRealPhone ? (
            <a
              href={`tel:${person.phone.replace(/\s/g, "")}`}
              dir="ltr"
              className="text-[max(16px,15rem)] font-bold uppercase leading-[1.15] text-[var(--di-primary)] transition-colors duration-300 hover:text-[var(--di-accent)] max-[700px]:text-[max(13px,13rem)]"
            >
              {person.phone}
            </a>
          ) : (
            <span className="text-[max(16px,15rem)] font-bold uppercase leading-[1.15] text-[var(--di-primary)] max-[700px]:text-[max(13px,13rem)]">
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
  const { dictionary, locale } = useI18n();
  const copy = dictionary.contactPage;
  const isRtl = locale === "ar";

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
  }, [locale]);

  return (
    <>
      <PageTransition />

      <main
        ref={rootRef}
        className="contact-page overflow-x-clip bg-white text-[var(--di-primary)]"
      >
        <section className="bg-white pb-[110rem] pt-[190rem] max-[1280px]:pt-[180rem] max-[1025px]:pb-[75rem] max-[1025px]:pt-[150rem] max-[700px]:pt-[135rem]">
          <div className="di-container">
            <div className="grid grid-cols-[.9fr_1fr_1fr] gap-[14rem] max-[1025px]:grid-cols-2 max-[1025px]:gap-[20rem] max-[700px]:grid-cols-1">
              <div
                className={`flex min-h-[690rem] flex-col justify-between max-[1025px]:col-span-2 max-[1025px]:min-h-0 max-[1025px]:px-0 max-[700px]:col-span-1 ${
                  isRtl
                    ? "pl-[105rem] max-[1500px]:pl-[65rem] max-[1280px]:pl-[30rem]"
                    : "pr-[105rem] max-[1500px]:pr-[65rem] max-[1280px]:pr-[30rem]"
                }`}
              >
                <div className="max-w-[560rem] max-[1025px]:mb-[70rem] max-[700px]:mb-[50rem]">
                  {copy.hero.title.map((line) => (
                    <div key={line} className="overflow-hidden pb-[10rem]">
                      <span
                        data-title-line
                        className="contact-page__title block text-[clamp(90rem,7.2vw,145rem)] font-bold uppercase leading-[.82] tracking-[-.05em] text-[var(--di-primary)] max-[700px]:text-[70rem]"
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="max-w-[510rem]">
                  <ContactRow
                    label={copy.hero.phoneLabel}
                    value={copy.hero.phoneValue}
                    href="#contact-form"
                    isRtl={isRtl}
                  />

                  <ContactRow
                    label={copy.hero.whatsappLabel}
                    value={copy.hero.whatsappValue}
                    href="#contact-form"
                    isRtl={isRtl}
                  />

                  <div className="h-px w-full bg-[var(--di-primary)]/15" />
                </div>
              </div>

              <PersonCard
                person={copy.people[0]}
                media={peopleMedia[0]}
                index={0}
                labels={copy.labels}
                isRtl={isRtl}
              />

              <PersonCard
                person={copy.people[1]}
                media={peopleMedia[1]}
                index={1}
                labels={copy.labels}
                isRtl={isRtl}
              />
            </div>
          </div>
        </section>

        <ContactPageForm />
      </main>
    </>
  );
}
