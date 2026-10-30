"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiClock,
  FiFileText,
  FiShield,
  FiTool,
  FiUserCheck,
} from "react-icons/fi";

type SafetyCompliancePageClientProps = {
  lang: string;
};

type SafetyItem = {
  number: string;
  title: string;
  description: string;
  icon: IconType;
};

type SafetyCopy = {
  hero: {
    eyebrow: string;
    titlePrimary: string;
    titleAccent: string;
    intro: string[];
  };

  compliance: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon: IconType;
    }[];
  };

  standards: {
    eyebrow: string;
    title: string;
    description: string;
    items: SafetyItem[];
  };
};

const copy: Record<"en" | "ar", SafetyCopy> = {
  en: {
    hero: {
      eyebrow: "Safety & Compliance",
      titlePrimary: "Safety First.",
      titleAccent: "Compliance Always.",
      intro: [
        "Safe transportation requires disciplined operations, qualified personnel, reliable equipment, and strict adherence to regulations.",
        "Difference Integrated maintains a compliance-driven approach across its transportation operations.",
      ],
    },

    compliance: {
      eyebrow: "Compliance-Driven Operations",
      title: "Structured Around Safe, Responsible Movement.",
      description:
        "Difference Integrated maintains a compliance-driven approach across its transportation operations, supported by disciplined procedures, qualified personnel, reliable equipment, and strict adherence to applicable regulations.",

      items: [
        {
          title: "Transport Authority Licence",
          description:
            "Difference Integrated operates under the necessary Transport Authority Licence and follows all applicable transportation regulations and compliance standards.",
          icon: FiFileText,
        },
        {
          title: "Operational Planning",
          description:
            "Routes, schedules, vehicle movements, and delivery operations are planned with consideration for applicable restrictions, operating requirements, and project conditions.",
          icon: FiClock,
        },
        {
          title: "Risk Management",
          description:
            "We maintain disciplined operational procedures designed to identify and manage transportation, safety, and operational risks.",
          icon: FiShield,
        },
      ],
    },

    standards: {
      eyebrow: "Operating Standards",
      title: "Safety Is Built Into The Operation.",
      description:
        "From regulatory compliance to vehicle condition and driver procedures, each part of the movement is managed around safe and responsible operation.",

      items: [
        {
          number: "01",
          title: "Transport Authority Licence",
          description:
            "Difference Integrated operates under the necessary Transport Authority Licence and follows all applicable transportation regulations and compliance standards.",
          icon: FiFileText,
        },
        {
          number: "02",
          title: "Operational Planning",
          description:
            "Routes, schedules, vehicle movements, and delivery operations are planned with consideration for applicable restrictions, operating requirements, and project conditions.",
          icon: FiClock,
        },
        {
          number: "03",
          title: "Driver Safety",
          description:
            "Our drivers and operators work under structured operational procedures designed to promote safe vehicle operation and responsible transportation practices.",
          icon: FiUserCheck,
        },
        {
          number: "04",
          title: "Fleet Maintenance",
          description:
            "Vehicles are subject to inspection and preventive maintenance procedures to support safe, reliable, and efficient operation.",
          icon: FiTool,
        },
      ],
    },
  },

  ar: {
    hero: {
      eyebrow: "السلامة والامتثال",
      titlePrimary: "السلامة أولاً.",
      titleAccent: "والامتثال دائماً.",
      intro: [
        "يتطلب النقل الآمن عمليات منضبطة، وكوادر مؤهلة، ومعدات موثوقة، والالتزام الصارم باللوائح.",
        "تحافظ دفرنس إنتغريتد على نهج قائم على الامتثال في جميع عمليات النقل الخاصة بها.",
      ],
    },

    compliance: {
      eyebrow: "عمليات قائمة على الامتثال",
      title: "تنظيم يركز على الحركة الآمنة والمسؤولة.",
      description:
        "تحافظ دفرنس إنتغريتد على نهج قائم على الامتثال في عمليات النقل، مدعوماً بإجراءات منضبطة، وكوادر مؤهلة، ومعدات موثوقة، والالتزام الصارم باللوائح المعمول بها.",

      items: [
        {
          title: "ترخيص هيئة النقل",
          description:
            "تعمل دفرنس إنتغريتد بموجب ترخيص هيئة النقل اللازم وتلتزم بجميع أنظمة النقل ومعايير الامتثال المعمول بها.",
          icon: FiFileText,
        },
        {
          title: "التخطيط التشغيلي",
          description:
            "يتم تخطيط المسارات والجداول وحركة المركبات وعمليات التسليم مع مراعاة القيود والمتطلبات التشغيلية وظروف المشروع.",
          icon: FiClock,
        },
        {
          title: "إدارة المخاطر",
          description:
            "نعتمد إجراءات تشغيلية منضبطة تهدف إلى تحديد وإدارة مخاطر النقل والسلامة والمخاطر التشغيلية.",
          icon: FiShield,
        },
      ],
    },

    standards: {
      eyebrow: "المعايير التشغيلية",
      title: "السلامة جزء من كل عملية.",
      description:
        "من الالتزام التنظيمي إلى حالة المركبات وإجراءات السائقين، تتم إدارة كل مرحلة من مراحل النقل بما يدعم التشغيل الآمن والمسؤول.",

      items: [
        {
          number: "01",
          title: "ترخيص هيئة النقل",
          description:
            "تعمل دفرنس إنتغريتد بموجب ترخيص هيئة النقل اللازم وتلتزم بجميع أنظمة النقل ومعايير الامتثال المعمول بها.",
          icon: FiFileText,
        },
        {
          number: "02",
          title: "التخطيط التشغيلي",
          description:
            "يتم تخطيط المسارات والجداول وحركة المركبات وعمليات التسليم مع مراعاة القيود والمتطلبات التشغيلية وظروف المشروع.",
          icon: FiClock,
        },
        {
          number: "03",
          title: "سلامة السائق",
          description:
            "يعمل السائقون والمشغلون لدينا وفق إجراءات تشغيلية منظمة تدعم القيادة الآمنة وممارسات النقل المسؤولة.",
          icon: FiUserCheck,
        },
        {
          number: "04",
          title: "صيانة الأسطول",
          description:
            "تخضع المركبات للفحص وإجراءات الصيانة الوقائية لدعم التشغيل الآمن والموثوق والفعال.",
          icon: FiTool,
        },
      ],
    },
  },
};

function SectionEyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-[14rem]">
      <span className="h-[3rem] w-[36rem] bg-[var(--di-accent)]" />

      <span
        className={`text-[13rem] font-medium uppercase tracking-[.12em] max-[1025px]:text-[11rem] ${
          light ? "text-white/70" : "text-[var(--di-accent)]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function Hero({
  content,
  isArabic,
}: {
  content: SafetyCopy["hero"];
  isArabic: boolean;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--di-primary)] text-white">
      <div
        className="pointer-events-none absolute inset-y-0 left-[50%] hidden w-[1px] bg-white/10 min-[1025px]:block"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-[-5vw] right-[-1vw] select-none whitespace-nowrap text-[21vw] font-bold uppercase leading-none tracking-[-.06em] text-white/[.025]"
        aria-hidden="true"
      >
        Safety
      </div>

      <div
        className="absolute left-0 top-[28%] h-[2rem] w-[120rem] bg-[var(--di-accent)] max-[1025px]:w-[65rem]"
        aria-hidden="true"
      />

      <div className="di-container relative z-[2] pb-[90rem] pt-[180rem] max-[1025px]:pb-[55rem] max-[1025px]:pt-[150rem]">
        <div className="grid grid-cols-2 items-end gap-[110rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[55rem]">
          <div>
            <div className="safety-hero-eyebrow">
              <SectionEyebrow light>{content.eyebrow}</SectionEyebrow>
            </div>

            <div className="mt-[32rem]">
              <div className="safety-title-mask overflow-hidden">
                <h1
                  className={`safety-title-line text-[145rem] font-bold leading-[.82] tracking-[-.035em] max-[1440px]:text-[120rem] max-[1025px]:text-[70rem] max-[600px]:text-[52rem] ${
                    isArabic ? "leading-[1.05]" : ""
                  }`}
                >
                  {content.titlePrimary}
                </h1>
              </div>

              <div className="safety-title-mask mt-[8rem] overflow-hidden">
                <h2
                  className={`safety-title-line text-[145rem] font-bold leading-[.82] tracking-[-.035em] text-[var(--di-accent)] max-[1440px]:text-[120rem] max-[1025px]:text-[70rem] max-[600px]:text-[52rem] ${
                    isArabic ? "leading-[1.05]" : ""
                  }`}
                >
                  {content.titleAccent}
                </h2>
              </div>
            </div>
          </div>

          <div className="safety-hero-copy max-w-[700rem] justify-self-end max-[1025px]:justify-self-start">
            <div className="mb-[25rem] h-[1px] w-full bg-white/20" />

            <div className="safety-body space-y-[20rem] text-[20rem] font-normal leading-[1.55] text-white/72 max-[1025px]:text-[16rem]">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-[35rem] flex items-center gap-[16rem]">
              <FiShield className="h-[26rem] w-[26rem] text-[var(--di-accent)]" />

              <span className="safety-body text-[13rem] font-medium uppercase tracking-[.1em] text-white/55">
                {content.eyebrow}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplianceSection({ content }: { content: SafetyCopy["compliance"] }) {
  return (
    <section className="bg-[var(--di-light)] py-[130rem] max-[1025px]:py-[80rem]">
      <div className="di-container">
        <div className="grid grid-cols-[.9fr_1.1fr] gap-[125rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[65rem]">
          <div className="safety-reveal" data-safety-reveal>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>

            <h2 className="mt-[30rem] max-w-[780rem] text-[86rem] font-bold uppercase leading-[.86] tracking-[-.025em] text-[var(--di-primary)] max-[1025px]:text-[52rem] max-[600px]:text-[42rem]">
              {content.title}
            </h2>

            <p className="safety-body mt-[38rem] max-w-[680rem] text-[19rem] font-normal leading-[1.65] text-[var(--di-primary)]/65 max-[1025px]:text-[16rem]">
              {content.description}
            </p>
          </div>

          <div className="border-t border-[var(--di-primary)]/20">
            {content.items.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="safety-feature-row group grid grid-cols-[72rem_1fr_36rem] gap-[25rem] border-b border-[var(--di-primary)]/20 py-[32rem] max-[640px]:grid-cols-[50rem_1fr] max-[640px]:gap-[18rem]"
                >
                  <div className="flex h-[58rem] w-[58rem] items-center justify-center border border-[var(--di-accent)]/25 text-[var(--di-accent)] transition-colors duration-300 group-hover:bg-[var(--di-accent)] group-hover:text-white max-[640px]:h-[46rem] max-[640px]:w-[46rem]">
                    <Icon className="h-[23rem] w-[23rem] max-[640px]:h-[19rem] max-[640px]:w-[19rem]" />
                  </div>

                  <div>
                    <span className="safety-body text-[11rem] font-medium tracking-[.14em] text-[var(--di-primary)]/35">
                      0{index + 1}
                    </span>

                    <h3 className="mt-[8rem] text-[31rem] font-bold leading-[1] text-[var(--di-primary)] max-[1025px]:text-[26rem]">
                      {item.title}
                    </h3>

                    <p className="safety-body mt-[15rem] max-w-[650rem] text-[16rem] font-normal leading-[1.6] text-[var(--di-primary)]/62 max-[640px]:text-[15rem]">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-start justify-end max-[640px]:hidden">
                    <FiArrowUpRight className="h-[23rem] w-[23rem] text-[var(--di-primary)]/30 transition-all duration-300 group-hover:-translate-y-[3rem] group-hover:translate-x-[3rem] group-hover:text-[var(--di-accent)]" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StandardsSection({ content }: { content: SafetyCopy["standards"] }) {
  return (
    <section className="relative overflow-hidden bg-white py-[130rem] max-[1025px]:py-[80rem]">
      <div className="di-container">
        <div
          className="safety-reveal grid grid-cols-[.9fr_1.1fr] items-end gap-[100rem] border-b border-[var(--di-primary)]/18 pb-[60rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[30rem]"
          data-safety-reveal
        >
          <div>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>

            <h2 className="mt-[28rem] max-w-[800rem] text-[82rem] font-bold uppercase leading-[.86] tracking-[-.025em] text-[var(--di-primary)] max-[1025px]:text-[52rem] max-[600px]:text-[42rem]">
              {content.title}
            </h2>
          </div>

          <p className="safety-body max-w-[680rem] justify-self-end text-[18rem] font-normal leading-[1.65] text-[var(--di-primary)]/62 max-[1025px]:justify-self-start max-[1025px]:text-[16rem]">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-2 max-[850px]:grid-cols-1">
          {content.items.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className={`
                  safety-standard
                  group
                  relative
                  min-h-[430rem]
                  overflow-hidden
                  border-b
                  border-[var(--di-primary)]/16
                  px-[48rem]
                  py-[45rem]
                  max-[1025px]:min-h-[360rem]
                  max-[1025px]:px-[30rem]
                  max-[1025px]:py-[35rem]
                  max-[600px]:min-h-0
                  max-[600px]:px-0

                  ${
                    index % 2 === 0
                      ? "min-[851px]:border-r min-[851px]:border-[var(--di-primary)]/16"
                      : ""
                  }
                `}
              >
                <div className="flex items-start justify-between gap-[30rem]">
                  <div className="flex h-[56rem] w-[56rem] items-center justify-center bg-[var(--di-accent)]/8 text-[var(--di-accent)] transition-colors duration-300 group-hover:bg-[var(--di-accent)] group-hover:text-white">
                    <Icon className="h-[23rem] w-[23rem]" />
                  </div>

                  <span className="text-[78rem] font-bold leading-[.8] tracking-[-.04em] text-[var(--di-primary)]/[.055] transition-colors duration-300 group-hover:text-[var(--di-accent)]/10 max-[1025px]:text-[60rem]">
                    {item.number}
                  </span>
                </div>

                <div className="mt-[72rem] max-[1025px]:mt-[50rem] max-[600px]:mt-[35rem]">
                  <h3 className="max-w-[500rem] text-[38rem] font-bold leading-[.96] text-[var(--di-primary)] max-[1025px]:text-[30rem]">
                    {item.title}
                  </h3>

                  <p className="safety-body mt-[20rem] max-w-[600rem] text-[16rem] font-normal leading-[1.65] text-[var(--di-primary)]/62 max-[600px]:text-[15rem]">
                    {item.description}
                  </p>
                </div>

                <span
                  className="absolute bottom-0 left-0 h-[3rem] w-0 bg-[var(--di-accent)] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function SafetyCompliancePageClient({
  lang,
}: SafetyCompliancePageClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const isArabic = lang.toLowerCase().startsWith("ar");

  const content = copy[isArabic ? "ar" : "en"];

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(
          [
            ".safety-hero-eyebrow",
            ".safety-title-line",
            ".safety-hero-copy",
            ".safety-reveal",
            ".safety-feature-row",
            ".safety-standard",
          ],
          {
            clearProps: "all",
            opacity: 1,
            x: 0,
            y: 0,
          },
        );

        return;
      }

      /*
       * HERO ENTRANCE
       */
      gsap.set(".safety-hero-eyebrow", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".safety-title-line", {
        opacity: 0,
        yPercent: 110,
      });

      gsap.set(".safety-hero-copy", {
        opacity: 0,
        y: 38,
      });

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      heroTimeline
        .to(
          ".safety-hero-eyebrow",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          0.15,
        )

        .to(
          ".safety-title-line",
          {
            opacity: 1,
            yPercent: 0,
            duration: 1.15,
            stagger: 0.13,
          },
          0.28,
        )

        .to(
          ".safety-hero-copy",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          0.75,
        );

      /*
       * MAIN SECTION REVEALS
       */
      gsap.utils.toArray<HTMLElement>(".safety-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 55,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",

            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /*
       * COMPLIANCE ROWS
       */
      gsap.fromTo(
        ".safety-feature-row",
        {
          opacity: 0,
          x: isArabic ? -45 : 45,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".safety-feature-row",
            start: "top 84%",
            toggleActions: "play none none none",
          },
        },
      );

      /*
       * STANDARD BLOCKS
       */
      gsap.fromTo(
        ".safety-standard",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.11,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".safety-standard",
            start: "top 86%",
            toggleActions: "play none none none",
          },
        },
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [isArabic]);

  return (
    <div
      ref={rootRef}
      className={`safety-page ${isArabic ? "safety-page--rtl" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "en"}
    >
      <main>
        <Hero content={content.hero} isArabic={isArabic} />

        <ComplianceSection content={content.compliance} />

        <StandardsSection content={content.standards} />
      </main>

      <style jsx global>{`
        /*
         * English body copy uses the same body typeface
         * already used throughout the DI website.
         */
        .safety-page:not(.safety-page--rtl) .safety-body {
          font-family: "Inter", sans-serif;
        }

        /*
         * Arabic follows the site's global Arabic
         * typography instead of forcing Inter.
         */
        .safety-page--rtl .safety-body {
          font-family: inherit;
        }

        .safety-page--rtl {
          text-align: right;
        }

        /*
         * Keep the large English watermark visually
         * stable regardless of document direction.
         */
        .safety-page--rtl [aria-hidden="true"] {
          direction: ltr;
        }

        @media (prefers-reduced-motion: reduce) {
          .safety-hero-eyebrow,
          .safety-title-line,
          .safety-hero-copy,
          .safety-reveal,
          .safety-feature-row,
          .safety-standard {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
