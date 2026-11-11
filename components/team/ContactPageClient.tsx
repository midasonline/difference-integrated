"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/components/i18n/I18nProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactPageCopy = Dictionary["contactPage"];
type PersonCopy = ContactPageCopy["people"][number];

type PersonMedia = {
  image: string;
};

type ProfileContent = {
  paragraphs: string[];
};

const peopleMedia: PersonMedia[] = [
  {
    image: "/assets/img/contact/Asad-Inam.webp",
  },
  {
    image: "/assets/img/contact/Fazle.webp",
  },
];

const profileContent: ProfileContent[] = [
  {
    paragraphs: [
      "Asad Inam is an accomplished business leader, engineer, and entrepreneur with extensive experience in logistics, construction, marketing, and business strategy. His multidisciplinary expertise has enabled him to build and lead successful ventures across multiple industries, delivering large-scale projects and sustainable business growth.",

      "He holds a Bachelor of Engineering (BEng) in Chemical Engineering from University College London (UCL), one of the world's leading universities and consistently ranked among the top 10 universities globally. His engineering background provides a strong analytical foundation for managing complex operations, optimizing logistics, and delivering large-scale infrastructure support.",

      "Beyond Difference Integrated Logistics, Asad serves as the Chief Executive Officer of Communication Spot, a marketing, communications, and business consultancy that has successfully delivered strategic campaigns, branding initiatives, and high-profile event management projects for public and private sector organizations. Under his leadership, the company has achieved an annual business turnover exceeding PKR 3 billion (USD 11 million) and has built a reputation for delivering impactful, results-driven solutions.",

      "One of the notable milestones under his leadership includes the successful planning and execution of initiatives supporting the Green Pakistan Initiative, demonstrating his capability to manage large-scale, multi-stakeholder projects with precision and excellence.",

      "Asad also leads Construction Star, where he has overseen the successful delivery of construction and infrastructure projects valued at more than PKR 1 billion (approximately USD 3 million). His experience spans project management, operational planning, business development, and stakeholder engagement across multiple industries.",

      "As CEO of Difference Integrated Logistics, Asad is committed to building a modern logistics company founded on operational excellence, safety, reliability, and customer-centric service. His vision is to establish the company as a trusted logistics partner supporting Saudi Arabia's ambitious infrastructure development and the objectives of Vision 2030.",
    ],
  },

  {
    paragraphs: [
      "Fazle Qadir Mirza is a seasoned operations executive with over 25 years of leadership experience in logistics, fleet management, security operations, risk governance, regulatory coordination, and business continuity. Throughout his distinguished career, he has successfully led complex operational environments where discipline, precision, compliance, and effective execution were essential to organizational success.",

      "His professional background spans large-scale transport operations, fleet administration, operational governance, stakeholder engagement, and security management. He has managed multidisciplinary teams, coordinated with government and regulatory authorities, and implemented operational frameworks that enhanced efficiency, strengthened compliance, and ensured the uninterrupted delivery of critical services.",

      "Prior to joining Difference Integrated Saudi Arabia, Fazle Qadir held senior leadership responsibilities across logistics, security, and operational management functions, gaining extensive experience in fleet deployment, asset utilization, risk mitigation, manpower supervision, and crisis management. His ability to combine strategic oversight with practical field experience has earned him a reputation for delivering operational excellence in demanding and high-pressure environments.",

      "Fazle Qadir Mirza holds a Master of Science (MSc) in Criminology and has further strengthened his professional expertise through specialized international training, including the Combined Defence Intelligence Research and Analysis Course in Australia and the International Foundation for Protection Officers (SSMP) certification for the MENASA region.",

      "At Difference Integrated Saudi Arabia, Fazle Qadir supports the company's transportation and fleet operations, including fleet deployment, logistics planning, driver management, safety compliance, regulatory coordination, operational reporting, and client service delivery. His operational experience supports efficient, reliable, and professional service execution.",

      "With a leadership philosophy founded on discipline, accountability, continuous improvement, and customer satisfaction, Mr. Fazle plays a pivotal role in strengthening Difference Integrated Saudi Arabia's position as a trusted logistics partner supporting construction, infrastructure, industrial, and development projects across the Kingdom.",
    ],
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
      className="group grid grid-cols-[120rem_1fr_42rem] items-center gap-[18rem] border-t border-[var(--di-primary)]/15 py-[22rem] max-[1025px]:grid-cols-[90rem_1fr_42rem] max-[1025px]:gap-[12rem] max-[1025px]:py-[18rem] max-[600px]:grid-cols-[1fr_42rem]"
    >
      <span className="font-['Inter'] text-[max(12px,12rem)] font-semibold uppercase tracking-[.03em] text-[var(--di-primary)] max-[600px]:hidden">
        {label}:
      </span>

      <span
        className={`contact-page__contact-value min-w-0 break-words text-[30rem] font-bold leading-[1.05] tracking-[-.025em] text-[var(--di-primary)] transition-transform duration-500 max-[1400px]:text-[27rem] max-[1200px]:text-[max(16px,24rem)] max-[1025px]:text-[max(16px,22rem)] max-[600px]:text-[max(16px,19rem)] ${
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

function LeadershipProfile({
  person,
  media,
  profile,
  index,
  isRtl,
}: {
  person: PersonCopy;
  media: PersonMedia;
  profile: ProfileContent;
  index: number;
  isRtl: boolean;
}) {
  const imageOnLeft = index % 2 === 0;

  return (
    <article
      data-profile-section
      className="border-t border-[var(--di-primary)]/15 py-[95rem] max-[1200px]:py-[80rem] max-[1025px]:py-[65rem] max-[700px]:py-[50rem]"
    >
      <div
        className={`grid grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] items-start gap-[90rem] max-[1400px]:gap-[65rem] max-[1200px]:gap-[50rem] max-[900px]:grid-cols-1 max-[900px]:gap-[38rem] ${
          isRtl ? "direction-rtl" : ""
        }`}
      >
        <div
          data-profile-image
          className={`relative h-[760rem] min-h-[620rem] overflow-hidden rounded-[12rem] bg-[#eef0f4] max-[1400px]:h-[700rem] max-[1200px]:h-[640rem] max-[900px]:order-1 max-[900px]:h-[620rem] max-[700px]:h-[500rem] max-[500px]:h-[430rem] ${
            imageOnLeft ? "order-1" : "order-2"
          }`}
        >
          <Image
            src={media.image}
            alt={`${person.name} — ${person.role}`}
            fill
            priority={index === 0}
            sizes="(max-width: 900px) 100vw, 48vw"
            className="object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,37,91,0)_62%,rgba(22,37,91,.12)_100%)]" />
        </div>

        <div
          data-profile-content
          className={`min-w-0 pt-[18rem] max-[900px]:order-2 max-[900px]:pt-0 ${
            imageOnLeft ? "order-2" : "order-1"
          }`}
        >
          <div className="border-b border-[var(--di-primary)]/15 pb-[28rem]">
            <h2
              dir="ltr"
              className={`max-w-[820rem] break-words text-[74rem] font-bold uppercase leading-[.92] tracking-[-.04em] text-[var(--di-primary)] max-[1400px]:text-[66rem] max-[1200px]:text-[58rem] max-[700px]:text-[44rem] ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {person.name}
            </h2>

            <span className="mt-[14rem] block font-['Inter'] text-[12rem] font-semibold uppercase leading-[1.3] tracking-[.1em] text-[var(--di-accent)]">
              {person.role}
            </span>
          </div>

          <div className="mt-[38rem] space-y-[22rem] break-words font-['Inter'] text-[16rem] font-normal leading-[1.78] text-[var(--di-primary)]/72 max-[700px]:mt-[30rem] max-[700px]:space-y-[18rem] max-[700px]:text-[15rem]">
            {profile.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${person.name}-${paragraphIndex}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Teampage() {
  const rootRef = useRef<HTMLElement>(null);

  const { dictionary, locale } = useI18n();

  const copy = dictionary.contactPage;

  const isRtl = locale === "ar";

  const titleLines = isRtl ? copy.hero.title : ["Leadership"];

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-title-line]", {
          yPercent: 70,
          opacity: 0,
        });

        gsap.set("[data-contact-row]", {
          y: 20,
          opacity: 0,
        });

        gsap.set("[data-profile-image]", {
          y: 45,
          opacity: 0,
          scale: 1.025,
        });

        gsap.set("[data-profile-content]", {
          y: 45,
          opacity: 0,
        });

        const intro = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
          delay: 0.1,
        });

        intro
          .to("[data-title-line]", {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
          })
          .to(
            "[data-contact-row]",
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.55",
          );

        gsap.utils
          .toArray<HTMLElement>("[data-profile-section]")
          .forEach((section) => {
            const image = section.querySelector<HTMLElement>(
              "[data-profile-image]",
            );

            const content = section.querySelector<HTMLElement>(
              "[data-profile-content]",
            );

            if (!image || !content) return;

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true,
              },
              defaults: {
                ease: "power4.out",
              },
            });

            timeline
              .to(image, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.05,
              })
              .to(
                content,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.9,
                },
                "-=0.72",
              );
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
        <section className="bg-white pb-[40rem] pt-[190rem] max-[1280px]:pt-[180rem] max-[1025px]:pt-[150rem] max-[700px]:pt-[135rem]">
          <div className="di-container">
            <div className="grid grid-cols-[1fr_.82fr] items-end gap-[100rem] pb-[85rem] max-[1200px]:gap-[60rem] max-[900px]:grid-cols-1 max-[900px]:gap-[40rem] max-[700px]:pb-[60rem]">
              <div className="max-w-[760rem]">
                {titleLines.map((line) => (
                  <div key={line} className="overflow-hidden pb-[14rem]">
                    <span
                      data-title-line
                      className="contact-page__title block max-w-full break-words pb-[6rem] text-[clamp(82rem,8vw,155rem)] font-bold uppercase leading-[.86] tracking-[-.05em] text-[var(--di-primary)] max-[700px]:text-[64rem]"
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              <div className="max-w-[590rem] justify-self-end max-[900px]:w-full max-[900px]:max-w-none max-[900px]:justify-self-stretch">
                <ContactRow
                  label={copy.labels.email}
                  value={copy.people[0].email}
                  href={`mailto:${copy.people[0].email}`}
                  isRtl={isRtl}
                />

                <div className="h-px w-full bg-[var(--di-primary)]/15" />
              </div>
            </div>

            {copy.people.map((person, index) => (
              <LeadershipProfile
                key={`${person.name}-${index}`}
                person={person}
                media={peopleMedia[index]}
                profile={profileContent[index]}
                index={index}
                isRtl={isRtl}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
