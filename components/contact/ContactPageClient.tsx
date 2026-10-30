"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiX } from "react-icons/fi";

import ContactPageForm from "@/components/contact/ContactPageForm";
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
  onOpenProfile,
}: {
  person: PersonCopy;
  media: PersonMedia;
  index: number;
  labels: ContactPageCopy["labels"];
  isRtl: boolean;
  onOpenProfile: () => void;
}) {
  const hasRealEmail = person.email.includes("@");

  return (
    <article data-person-card className="min-w-0">
      <button
        type="button"
        onClick={onOpenProfile}
        aria-label={`View ${person.name} profile`}
        className="group relative block h-[600rem] w-full cursor-pointer overflow-hidden rounded-[12rem] bg-[#f2f2f5] text-left max-[1500px]:h-[560rem] max-[1200px]:h-[500rem] max-[1025px]:h-[540rem] max-[700px]:h-[430rem]"
      >
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
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,37,91,0)_58%,rgba(22,37,91,.08)_100%)]" />

        <div
          className={`pointer-events-none absolute bottom-[20rem] z-[4] overflow-hidden ${
            isRtl ? "right-[20rem]" : "left-[20rem]"
          }`}
        >
          <span className="block translate-y-[140%] bg-[var(--di-primary)] px-[16rem] py-[10rem] font-['Inter'] text-[11rem] font-semibold uppercase tracking-[.06em] text-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
            {isRtl ? "عرض الملف الشخصي" : "View Profile"}
          </span>
        </div>
      </button>

      <div className="min-h-[88rem] border-b border-[var(--di-primary)]/15 py-[22rem] max-[1025px]:py-[18rem]">
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
      </div>
    </article>
  );
}

function ProfileModal({
  person,
  media,
  profile,
  isRtl,
  onClose,
}: {
  person: PersonCopy;
  media: PersonMedia;
  profile: ProfileContent;
  isRtl: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!modalRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      gsap.set(".profile-modal-backdrop", {
        opacity: 0,
      });

      gsap.set(".profile-modal-panel", {
        opacity: 0,
        y: 40,
        scale: 0.985,
      });

      gsap.set(".profile-modal-image", {
        scale: 1.05,
      });

      gsap.set(".profile-modal-content", {
        opacity: 0,
        y: 25,
      });

      timeline
        .to(".profile-modal-backdrop", {
          opacity: 1,
          duration: 0.35,
        })
        .to(
          ".profile-modal-panel",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
          },
          "-=0.18",
        )
        .to(
          ".profile-modal-image",
          {
            scale: 1,
            duration: 1,
          },
          "-=0.55",
        )
        .to(
          ".profile-modal-content",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.7",
        );
    }, modalRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-[28rem] max-[700px]:p-0"
      role="dialog"
      aria-modal="true"
      aria-label={`${person.name} profile`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close profile"
        className="profile-modal-backdrop absolute inset-0 bg-[#0b1029]/78 backdrop-blur-[6px]"
      />

      <div className="profile-modal-panel relative z-[2] grid h-[min(860rem,90vh)] w-full max-w-[1540rem] grid-cols-[.72fr_1.28fr] overflow-hidden bg-white shadow-[0_30px_100px_rgba(10,20,50,.3)] max-[1024px]:grid-cols-[.8fr_1.2fr] max-[700px]:h-[100svh] max-[700px]:grid-cols-1 max-[700px]:grid-rows-[42vh_1fr]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className={`absolute top-[24rem] z-[10] flex h-[48rem] w-[48rem] items-center justify-center rounded-full bg-white text-[var(--di-primary)] shadow-[0_8px_30px_rgba(22,37,91,.12)] transition-colors duration-300 hover:bg-[var(--di-accent)] hover:text-white max-[700px]:top-[16rem] ${
            isRtl
              ? "left-[24rem] max-[700px]:left-[16rem]"
              : "right-[24rem] max-[700px]:right-[16rem]"
          }`}
        >
          <FiX className="h-[22rem] w-[22rem]" />
        </button>

        <div className="relative min-h-0 overflow-hidden bg-[#eef0f4]">
          <Image
            src={media.image}
            alt={`${person.name} — ${person.role}`}
            fill
            sizes="(max-width: 700px) 100vw, 40vw"
            className="profile-modal-image object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,37,91,0)_55%,rgba(22,37,91,.26)_100%)]" />
        </div>

        <div className="profile-modal-content min-h-0 overflow-y-auto">
          <div className="px-[72rem] pb-[80rem] pt-[70rem] max-[1200px]:px-[48rem] max-[1024px]:px-[38rem] max-[700px]:px-[24rem] max-[700px]:pb-[55rem] max-[700px]:pt-[38rem]">
            <span className="font-['Inter'] text-[12rem] font-semibold uppercase tracking-[.08em] text-[var(--di-accent)]">
              {person.role}
            </span>

            <h2
              dir="ltr"
              className={`mt-[13rem] max-w-[760rem] text-[70rem] font-bold uppercase leading-[.88] tracking-[-.035em] text-[var(--di-primary)] max-[1200px]:text-[58rem] max-[700px]:text-[42rem] ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {person.name}
            </h2>

            <div className="mt-[35rem] h-[3rem] w-[55rem] bg-[var(--di-accent)]" />

            <div className="mt-[40rem] space-y-[24rem] font-['Inter'] text-[16rem] font-normal leading-[1.75] text-[var(--di-primary)]/72 max-[700px]:mt-[30rem] max-[700px]:text-[15rem]">
              {profile.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${person.name}-${paragraphIndex}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPageClient() {
  const rootRef = useRef<HTMLElement>(null);

  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  const { dictionary, locale } = useI18n();

  const copy = dictionary.contactPage;

  const isRtl = locale === "ar";

  useEffect(() => {
    if (selectedProfile === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProfile(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProfile]);

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
                    label={copy.labels.email}
                    value={copy.people[0].email}
                    href={`mailto:${copy.people[0].email}`}
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
                onOpenProfile={() => setSelectedProfile(0)}
              />

              <PersonCard
                person={copy.people[1]}
                media={peopleMedia[1]}
                index={1}
                labels={copy.labels}
                isRtl={isRtl}
                onOpenProfile={() => setSelectedProfile(1)}
              />
            </div>
          </div>
        </section>

        <ContactPageForm />
      </main>

      {selectedProfile !== null && (
        <ProfileModal
          person={copy.people[selectedProfile]}
          media={peopleMedia[selectedProfile]}
          profile={profileContent[selectedProfile]}
          isRtl={isRtl}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </>
  );
}
