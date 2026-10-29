"use client";

import Link from "next/link";
import { useEffect } from "react";

type PolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
};

const policySections: PolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "The information we collect depends on how you interact with our website and services.",
      "When you contact us or submit an inquiry, we may collect information such as:",
    ],
    bullets: [
      "Your name",
      "Company name",
      "Email address",
      "Phone number",
      "Project or service location",
      "Transportation or logistics requirements",
      "Material or cargo information",
      "Preferred schedule or timeline",
      "Information included in messages, forms, or other communications",
    ],
    afterBullets: [
      "We may also collect certain technical information automatically when you use our website, including device information, browser type, IP address, pages visited, and general website activity.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    paragraphs: [
      "We use the information we receive to manage legitimate business and website activities, including to:",
    ],
    bullets: [
      "Respond to questions and inquiries",
      "Review transportation and logistics requirements",
      "Prepare quotations or service proposals",
      "Coordinate project and service discussions",
      "Communicate with clients and business contacts",
      "Improve our website and digital experience",
      "Maintain website performance and security",
      "Keep appropriate operational and business records",
      "Meet applicable legal and regulatory requirements",
    ],
    afterBullets: [
      "We only use personal information for purposes that are relevant to the reason it was collected or as otherwise permitted by applicable law.",
    ],
  },
  {
    id: "project-service-information",
    title: "Project and Service Information",
    paragraphs: [
      "Transportation and logistics inquiries may require operational details so our team can properly understand the requirement.",
      "This information may include cargo or material type, quantity, route, project location, site conditions, required timeline, and other details relevant to transportation planning or logistics coordination.",
      "Please provide only the information reasonably necessary for us to review your requirement.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Website Technologies",
    paragraphs: [
      "Our website may use cookies and similar technologies to support functionality, security, performance, and website analytics.",
      "Cookies may help us understand how visitors interact with the website and allow us to improve its usability and performance.",
      "You can manage or disable cookies through your browser settings. Some website features may not function as intended if certain cookies are disabled.",
    ],
  },
  {
    id: "sharing-information",
    title: "How We Share Information",
    paragraphs: [
      "Difference Integrated does not sell personal information.",
      "Information may be shared where reasonably necessary with authorized employees, technology providers, hosting providers, professional advisers, or other service providers that support our business and website operations.",
      "We may also disclose information when required to comply with applicable laws, regulations, legal processes, or requests from authorized government or regulatory bodies.",
      "Any sharing of information is limited to what is reasonably necessary for the relevant purpose.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We take reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, misuse, loss, alteration, or disclosure.",
      "Access to personal information is limited to individuals or service providers who require it for legitimate business purposes.",
      "While we take appropriate steps to protect information, no website, communication method, or electronic storage system can guarantee complete security.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected.",
      "Retention periods may depend on the nature of the inquiry, business relationship, service requirement, operational records, contractual obligations, and applicable legal or regulatory requirements.",
      "Information that is no longer required may be deleted, anonymized, or otherwise securely handled.",
    ],
  },
  {
    id: "privacy-rights",
    title: "Your Privacy Rights",
    paragraphs: [
      "Subject to applicable laws in the Kingdom of Saudi Arabia, you may have certain rights regarding your personal information.",
      "These may include the right to:",
    ],
    bullets: [
      "Request information about the personal data we hold",
      "Request access to your personal information",
      "Request correction of inaccurate or incomplete information",
      "Request deletion where applicable",
      "Withdraw consent where processing is based on consent",
      "Raise a concern regarding the way your information is handled",
    ],
    afterBullets: [
      "We may need to verify your identity before completing certain privacy-related requests.",
    ],
  },
  {
    id: "saudi-data-protection",
    title: "Saudi Data Protection Requirements",
    paragraphs: [
      "Difference Integrated handles personal information in accordance with applicable laws and regulations in the Kingdom of Saudi Arabia, including relevant requirements under the Saudi Personal Data Protection Law.",
      "Where required, personal information will be processed, stored, transferred, and retained in accordance with applicable regulatory requirements.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    paragraphs: [
      "Some websites, hosting, communications, or technology providers may process information outside the Kingdom of Saudi Arabia.",
      "Where international transfers occur, appropriate measures will be taken where required to protect personal information and comply with applicable Saudi data protection requirements.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites or services.",
      "Difference Integrated does not control the privacy practices, security, or content of third-party websites. We encourage visitors to review the privacy policies of those websites before providing personal information.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    paragraphs: [
      "Difference Integrated's website and services are intended for professional and commercial use.",
      "We do not knowingly seek to collect personal information from children through this website.",
      "If we become aware that information has been submitted by a child without appropriate authorization, we will take reasonable steps to address the matter in accordance with applicable law.",
    ],
  },
  {
    id: "communications",
    title: "Communications",
    paragraphs: [
      "If you contact Difference Integrated regarding a service, quotation, project, or transportation requirement, we may use the contact information you provide to respond and continue communication regarding that request.",
      "Operational or service-related communications may continue where necessary to manage an active inquiry, project, or business relationship.",
    ],
  },
  {
    id: "policy-changes",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in our website, business practices, technology, or applicable legal requirements.",
      "Any updated version will be published on this page with a revised Last Updated date.",
      "We encourage visitors to review this page periodically.",
    ],
  },
];

/* =========================================================
   SVG ICONS
========================================================= */

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />

      <path
        d="M8.2 12.2L10.6 14.6L15.9 9.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrivacyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3L26 7V14C26 20.5 22.2 25.9 16 29C9.8 25.9 6 20.5 6 14V7L16 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M12 15.5L14.7 18.2L20.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   HERO
========================================================= */

function PrivacyHero() {
  return (
    <section
      id="hero"
      className="
        hero-about
        relative
        flex
        h-screen
        min-h-[760px]
        flex-col
        justify-end
        bg-cover
        bg-center
        text-white
        max-[1025px]:min-h-[680px]
      "
      style={{
        backgroundImage: "url('/assets/img/about/privacy-policy.webp')",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#19255b]/50" />

      <div className="hero-about__container di-container relative z-[2] pb-[110rem] max-[1025px]:pb-[40rem]">
        <div
          className="
            hero-about__head
            main-animated-text
            relative
            mb-[155rem]
            flex
            items-end
            justify-between
            pb-[10rem]

            max-[1025px]:mb-[40rem]
            max-[1025px]:flex-col
            max-[1025px]:items-stretch
          "
        >
          <h1
            className="
              hero-about__title
              text-[170rem]
              leading-[.8]
              uppercase
              max-[1025px]:mb-[75rem]
              max-[1025px]:text-[70rem]
            "
          >
            Privacy Policy
          </h1>

          <div
            className="
              hero-about__abb
              flex
              w-[1100rem]
              items-center
              justify-between
              text-[40rem]
              leading-[.9]
              max-[1025px]:w-full
              max-[1025px]:text-[max(16px,20rem)]
            "
          >
            <div className="hero-about__abb-wrapper flex gap-[160rem] max-[1025px]:gap-[20rem]">
              <span className="hero-about__abb-item">D.</span>
              <span className="hero-about__abb-item">I.</span>
            </div>

            <span className="hero-about__abb-text text-[40rem] leading-[.9] uppercase max-[1025px]:text-[max(16px,20rem)]">
              Logistics
            </span>
          </div>

          <span className="main-animated-line absolute bottom-0 left-0 h-[1rem] w-0 bg-white/30" />
        </div>

        <div
          className="
            hero-about__container-inner
            main-opacity-block
            ms-[740rem]
            flex
            max-w-[720rem]
            flex-col
            gap-[20rem]

            max-[1025px]:ms-0
            max-[1025px]:max-w-none
            max-[1025px]:gap-[10rem]
          "
        >
          <h2 className="text-[30rem] font-bold leading-[.9] uppercase max-[1025px]:mb-[10rem] max-[1025px]:text-[max(16px,20rem)]">
            YOUR INFORMATION. HANDLED RESPONSIBLY.
          </h2>

          <p className="font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] max-[1025px]:text-[max(14px,14rem)] max-[1025px]:leading-[max(1.35em,20rem)]">
            Difference Integrated respects your privacy and is committed to
            handling personal information responsibly. This Privacy Policy
            explains how we collect, use, store, and protect information when
            you visit our website, contact our team, or submit a transportation
            or logistics inquiry.
          </p>

          <p className="font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] max-[1025px]:text-[max(14px,14rem)] max-[1025px]:leading-[max(1.35em,20rem)]">
            By using this website or providing information to Difference
            Integrated, you acknowledge the practices described in this Privacy
            Policy.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DIRECTORY
========================================================= */

function PolicyDirectory() {
  return (
    <section className="relative overflow-hidden bg-white py-[130rem] max-[1025px]:py-[75rem]">
      <div className="di-container">
        <div className="grid grid-cols-[.72fr_1.28fr] gap-[120rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[55rem]">
          <div className="privacy-reveal privacy-reveal-left" data-reveal>
            <div className="mb-[28rem] flex items-center gap-[18rem]">
              <PrivacyIcon className="privacy-icon-reveal h-[30rem] w-[30rem] text-[var(--di-accent)] max-[1025px]:h-[24rem] max-[1025px]:w-[24rem]" />

              <span className="text-[max(13px,13rem)] font-medium uppercase tracking-[.12em] text-[var(--di-accent)] max-[1025px]:text-[max(12px,11rem)]">
                Privacy Policy
              </span>
            </div>

            <h2 className="max-w-[650rem] text-[82rem] font-bold leading-[.86] uppercase text-[var(--di-primary)] max-[1025px]:text-[48rem]">
              HOW WE
              <br />
              HANDLE YOUR
              <br />
              INFORMATION.
            </h2>

            <p className="mt-[38rem] max-w-[580rem] font-['Inter'] text-[max(16px,19rem)] leading-[max(1.35em,29rem)] text-black/60 max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,24rem)]">
              A clear overview of how personal information is collected, used,
              protected, retained, and managed across our website and business
              interactions.
            </p>
          </div>

          <div
            className="privacy-directory grid grid-cols-2 gap-x-[70rem] max-[700px]:grid-cols-1"
            data-reveal
          >
            {policySections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="
                  privacy-directory-item
                  group
                  flex
                  min-h-[76rem]
                  items-center
                  justify-between
                  gap-[25rem]
                  border-b
                  border-[var(--di-primary)]/15
                  py-[18rem]

                  font-['Inter']
                  text-[max(16px,16rem)]
                  font-medium
                  leading-[max(1.35em,21rem)]
                  text-[var(--di-primary)]

                  transition-colors
                  duration-300

                  hover:border-[var(--di-accent)]
                  hover:text-[var(--di-accent)]

                  max-[1025px]:min-h-[62rem]
                  max-[1025px]:py-[14rem]
                  max-[1025px]:text-[max(14px,14rem)]
                "
                style={{
                  transitionDelay: `${index * 35}ms`,
                }}
              >
                <span>{section.title}</span>

                <ArrowIcon className="h-[21rem] w-[21rem] shrink-0 transition-transform duration-300 group-hover:translate-x-[5rem]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   POLICY SECTION
========================================================= */

function PolicyBlock({
  section,
  index,
}: {
  section: PolicySection;
  index: number;
}) {
  const dark = (index + 1) % 4 === 0;

  return (
    <section
      id={section.id}
      className={`
        privacy-section
        relative
        scroll-mt-[110rem]
        overflow-hidden
        py-[95rem]
        max-[1025px]:py-[64rem]

        ${
          dark
            ? "bg-[var(--di-primary)] text-white"
            : "bg-[var(--di-light)] text-[var(--di-primary)]"
        }
      `}
    >
      <div className="di-container">
        <div
          className="
            grid
            grid-cols-[.74fr_1.26fr]
            gap-[120rem]
            max-[1025px]:grid-cols-1
            max-[1025px]:gap-[38rem]
          "
        >
          {/* TITLE */}
          <div className="privacy-reveal privacy-reveal-left" data-reveal>
            <h2
              className="
                max-w-[640rem]
                text-[58rem]
                font-bold
                leading-[.9]
                uppercase

                max-[1025px]:text-[39rem]
                max-[600px]:text-[34rem]
              "
            >
              {section.title}
            </h2>
          </div>

          {/* BODY */}
          <div
            className="privacy-reveal privacy-reveal-right max-w-[800rem] font-['Inter']"
            data-reveal
          >
            <div
              className={`
                space-y-[22rem]
                text-[max(16px,18rem)]
                font-normal
                leading-[max(1.35em,29rem)]

                max-[1025px]:space-y-[17rem]
                max-[1025px]:text-[max(16px,16rem)]
                max-[1025px]:leading-[max(1.35em,24rem)]

                ${dark ? "text-white/72" : "text-black/68"}
              `}
            >
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="privacy-copy"
                  style={{
                    transitionDelay: `${paragraphIndex * 70}ms`,
                  }}
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <div
                  className={`
                    privacy-bullet-list
                    mt-[32rem]
                    overflow-hidden
                    rounded-[10rem]
                    border

                    ${
                      dark
                        ? "border-white/15 bg-white/[0.035]"
                        : "border-[var(--di-primary)]/10 bg-white/45"
                    }

                    max-[1025px]:rounded-[7rem]
                  `}
                >
                  {section.bullets.map((item, bulletIndex) => (
                    <div
                      key={bulletIndex}
                      className={`
                        privacy-bullet-row
                        group
                        flex
                        items-start
                        gap-[17rem]
                        px-[22rem]
                        py-[17rem]

                        transition-colors
                        duration-300

                        ${
                          bulletIndex !== section.bullets!.length - 1
                            ? dark
                              ? "border-b border-white/10"
                              : "border-b border-[var(--di-primary)]/10"
                            : ""
                        }

                        ${dark ? "hover:bg-white/[0.04]" : "hover:bg-white/80"}

                        max-[1025px]:px-[18rem]
                        max-[1025px]:py-[14rem]
                      `}
                      style={{
                        transitionDelay: `${bulletIndex * 45}ms`,
                      }}
                    >
                      <CheckIcon className="privacy-check-icon mt-[2rem] h-[20rem] w-[20rem] shrink-0 text-[var(--di-accent)]" />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.afterBullets?.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="privacy-copy pt-[5rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MID PAGE STATEMENT
========================================================= */

function PrivacyStatement() {
  return (
    <section className="relative overflow-hidden bg-white py-[140rem] max-[1025px]:py-[85rem]">
      <div className="di-container">
        <div className="mx-auto max-w-[1540rem]">
          <div className="privacy-statement-title" data-reveal>
            <h2
              className="
                max-w-[1350rem]
                text-[105rem]
                font-bold
                leading-[.84]
                uppercase
                text-[var(--di-primary)]

                max-[1025px]:text-[58rem]
                max-[600px]:text-[45rem]
              "
            >
              INFORMATION.
              <br />
              RESPONSIBILITY.
              <br />
              <span className="text-[var(--di-accent)]">CLEAR HANDLING.</span>
            </h2>
          </div>

          <div className="mt-[65rem] grid grid-cols-[1fr_.9fr] gap-[120rem] max-[1025px]:mt-[45rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[45rem]">
            <div
              className="privacy-reveal privacy-reveal-left max-w-[680rem] font-['Inter'] text-[max(16px,20rem)] leading-[max(1.35em,29rem)] text-black/65 max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,24rem)]"
              data-reveal
            >
              <p>
                Personal information is handled according to the purpose for
                which it is collected and the requirements that apply to that
                interaction.
              </p>
            </div>

            <div className="privacy-principles grid gap-[16rem]" data-reveal>
              {[
                "Collect with purpose.",
                "Use responsibly.",
                "Protect information.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="privacy-principle flex items-center gap-[20rem] font-['Inter'] text-[max(16px,24rem)] font-semibold uppercase leading-[1.1] text-[var(--di-primary)] max-[1025px]:text-[max(16px,20rem)]"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <PrivacyIcon className="privacy-icon-reveal h-[28rem] w-[28rem] shrink-0 text-[var(--di-accent)]" />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PrivacyPolicyClient() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (reduceMotion) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;

          element.classList.add("is-visible");

          currentObserver.unobserve(element);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <main className="privacy-page overflow-hidden">
        <PrivacyHero />

        <PolicyDirectory />

        {policySections.slice(0, 7).map((section, index) => (
          <PolicyBlock key={section.id} section={section} index={index} />
        ))}

        <PrivacyStatement />

        {policySections.slice(7).map((section, index) => (
          <PolicyBlock key={section.id} section={section} index={index + 7} />
        ))}
      </main>

      {/* =====================================================
          PRIVACY POLICY SCROLL ANIMATIONS
      ===================================================== */}

      <style jsx global>{`
        /*
         * -----------------------------------------------------
         * BASIC REVEALS
         * -----------------------------------------------------
         */

        .privacy-reveal {
          opacity: 0;
          will-change: transform, opacity;
          transition:
            opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .privacy-reveal-left {
          transform: translate3d(-54rem, 0, 0);
        }

        .privacy-reveal-right {
          transform: translate3d(54rem, 0, 0);
        }

        .privacy-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /*
         * -----------------------------------------------------
         * DIRECTORY
         * -----------------------------------------------------
         */

        .privacy-directory-item {
          opacity: 0;
          transform: translate3d(0, 28rem, 0);
          will-change: transform, opacity;
        }

        .privacy-directory.is-visible .privacy-directory-item {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition:
            opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            color 0.3s ease,
            border-color 0.3s ease;
        }

        /*
         * -----------------------------------------------------
         * BODY COPY
         * -----------------------------------------------------
         */

        .privacy-copy {
          opacity: 0;
          transform: translate3d(0, 18rem, 0);
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .privacy-reveal.is-visible .privacy-copy {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /*
         * -----------------------------------------------------
         * BULLET / INFORMATION ROWS
         * -----------------------------------------------------
         */

        .privacy-bullet-row {
          opacity: 0;
          transform: translate3d(28rem, 0, 0);
          will-change: transform, opacity;
        }

        .privacy-reveal.is-visible .privacy-bullet-row {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition:
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.3s ease;
        }

        .privacy-check-icon {
          transform: scale(0.55);
          opacity: 0;
          transition:
            opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .privacy-reveal.is-visible .privacy-check-icon {
          opacity: 1;
          transform: scale(1);
        }

        /*
         * -----------------------------------------------------
         * SVG PRIVACY ICONS
         * -----------------------------------------------------
         */

        .privacy-icon-reveal {
          transform: scale(0.7) rotate(-8deg);
          opacity: 0;
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .is-visible .privacy-icon-reveal {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /*
         * -----------------------------------------------------
         * BIG STATEMENT
         * clip-path rather than generic fade
         * -----------------------------------------------------
         */

        .privacy-statement-title {
          clip-path: inset(0 0 100% 0);
          transform: translate3d(0, 42rem, 0);
          will-change: clip-path, transform;
          transition:
            clip-path 1.05s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1.05s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .privacy-statement-title.is-visible {
          clip-path: inset(0 0 0% 0);
          transform: translate3d(0, 0, 0);
        }

        /*
         * -----------------------------------------------------
         * PRINCIPLES
         * -----------------------------------------------------
         */

        .privacy-principle {
          opacity: 0;
          transform: translate3d(42rem, 0, 0);
          will-change: transform, opacity;
        }

        .privacy-principles.is-visible .privacy-principle {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .privacy-principles.is-visible .privacy-icon-reveal {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /*
         * -----------------------------------------------------
         * POLICY SECTION SOFT COLOR TRANSITION
         * -----------------------------------------------------
         */

        .privacy-section {
          position: relative;
        }

        .privacy-section::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(
            90deg,
            rgba(233, 81, 29, 0.025),
            transparent 30%,
            transparent
          );
          transition: opacity 0.7s ease;
        }

        .privacy-section:hover::after {
          opacity: 1;
        }

        /*
         * -----------------------------------------------------
         * RESPONSIVE
         * -----------------------------------------------------
         */

        @media (max-width: 1024px) {
          .privacy-reveal-left,
          .privacy-reveal-right {
            transform: translate3d(0, 30rem, 0);
          }

          .privacy-bullet-row,
          .privacy-principle {
            transform: translate3d(0, 22rem, 0);
          }

          .privacy-reveal.is-visible,
          .privacy-reveal.is-visible .privacy-bullet-row,
          .privacy-principles.is-visible .privacy-principle {
            transform: translate3d(0, 0, 0);
          }
        }

        /*
         * -----------------------------------------------------
         * ACCESSIBILITY
         * -----------------------------------------------------
         */

        @media (prefers-reduced-motion: reduce) {
          .privacy-reveal,
          .privacy-directory-item,
          .privacy-copy,
          .privacy-bullet-row,
          .privacy-check-icon,
          .privacy-icon-reveal,
          .privacy-statement-title,
          .privacy-principle {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
