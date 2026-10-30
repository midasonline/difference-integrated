"use client";

import { useLayoutEffect, useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import type { ReactNode } from "react";
import {
  FiArrowUpRight,
  FiClock,
  FiFileText,
  FiShield,
  FiTool,
  FiUserCheck,
} from "react-icons/fi";

import { PageTransition } from "@/components/ui/PageTransition";

type SafetyItem = {
  number: string;
  title: string;
  description: string;
  icon: IconType;
};

type SafetyCopy = {
  hero: {
    titlePrimary: string;
    titleAccent: string;
    intro: string[];
    backgroundImage: string;
  };

  compliance: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon: IconType;
    }[];
  };

  standards: {
    title: string;
    description: string;
    items: SafetyItem[];
  };
};

const pageCopy: Record<"en" | "ar", SafetyCopy> = {
  en: {
    hero: {
      titlePrimary: "Safety First.",
      titleAccent: "Compliance Always.",
      intro: [
        "Safe transportation requires disciplined operations, qualified personnel, reliable equipment, and strict adherence to regulations.",
        "Difference Integrated maintains a compliance-driven approach across its transportation operations.",
      ],
      backgroundImage: "/assets/img/safety-compliance/hero-bg.webp",
    },

    compliance: {
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
      titlePrimary: "السلامة أولاً.",
      titleAccent: "والامتثال دائماً.",
      intro: [
        "يتطلب النقل الآمن عمليات منضبطة، وكوادر مؤهلة، ومعدات موثوقة، والالتزام الصارم باللوائح.",
        "تحافظ دفرنس إنتغريتد على نهج قائم على الامتثال في جميع عمليات النقل الخاصة بها.",
      ],
      backgroundImage: "/assets/img/safety-compliance/hero-bg.webp",
    },

    compliance: {
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
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-[12rem]">
      <span className="h-[8rem] w-[8rem] rounded-full bg-[var(--di-accent)]" />

      <span
        className={`text-[13rem] font-medium uppercase tracking-[.12em] max-[1024px]:text-[11rem] ${
          light ? "text-white/75" : "text-[var(--di-accent)]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function SafetyHero({
  content,
  isArabic,
}: {
  content: SafetyCopy["hero"];
  isArabic: boolean;
}) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--di-primary)] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${content.backgroundImage})`,
        }}
      />

      <div className="absolute inset-0 bg-[rgba(25,37,91,0.72)]" />

      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,20,20,0.28)] via-[rgba(20,20,20,0.12)] to-[rgba(20,20,20,0.18)]" />

      <div className="di-container relative z-[2] flex min-h-[100svh] items-end pb-[90rem] pt-[180rem] max-[1024px]:pb-[60rem] max-[1024px]:pt-[145rem]">
        <div className="grid w-full grid-cols-[1.1fr_0.9fr] items-end gap-[100rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[45rem]">
          <div className="max-w-[980rem]">
            <div className="safety-hero-eyebrow">
              {/* <SectionEyebrow light>Safety & Compliance</SectionEyebrow> */}
            </div>

            <div className="mt-[28rem]">
              <div className="safety-title-mask">
                <h1
                  className={`safety-title-line text-[140rem] font-bold leading-[0.84] tracking-[-0.04em] text-white max-[1440px]:text-[115rem] max-[1024px]:text-[72rem] max-[640px]:text-[52rem] ${
                    isArabic ? "leading-[1.02]" : ""
                  }`}
                >
                  {content.titlePrimary}
                </h1>
              </div>

              <div className="safety-title-mask mt-[8rem]">
                <h2
                  className={`safety-title-line text-[140rem] font-bold leading-[0.84] tracking-[-0.04em] text-[var(--di-accent)] max-[1440px]:text-[115rem] max-[1024px]:text-[72rem] max-[640px]:text-[52rem] ${
                    isArabic ? "leading-[1.02]" : ""
                  }`}
                >
                  {content.titleAccent}
                </h2>
              </div>
            </div>
          </div>

          <div className="safety-hero-copy max-w-[620rem] justify-self-end max-[1024px]:justify-self-start">
            <div className="rounded-[18rem] border border-white/12 bg-white/8 p-[32rem] backdrop-blur-[10px] max-[1024px]:rounded-[14rem] max-[1024px]:p-[22rem]">
              <div className="safety-body space-y-[18rem] text-[19rem] font-normal leading-[1.6] text-white/86 max-[1024px]:text-[16rem]">
                {content.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplianceSection({ content }: { content: SafetyCopy["compliance"] }) {
  return (
    <section className="bg-[var(--di-light)] py-[130rem] max-[1024px]:py-[80rem]">
      <div className="di-container">
        <div className="grid grid-cols-[.9fr_1.1fr] gap-[125rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[65rem]">
          <div className="safety-reveal" data-safety-reveal>
            <h2 className="mt-[30rem] max-w-[780rem] text-[86rem] font-bold uppercase leading-[.86] tracking-[-.025em] text-[var(--di-primary)] max-[1024px]:text-[52rem] max-[600px]:text-[42rem]">
              {content.title}
            </h2>

            <p className="safety-body mt-[38rem] max-w-[680rem] text-[19rem] font-normal leading-[1.65] text-[var(--di-primary)]/65 max-[1024px]:text-[16rem]">
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
                  <div className="flex h-[58rem] w-[58rem] items-center justify-center rounded-[12rem] border border-[var(--di-accent)]/20 bg-[var(--di-accent)]/6 text-[var(--di-accent)] transition-colors duration-300 group-hover:bg-[var(--di-accent)] group-hover:text-white max-[640px]:h-[46rem] max-[640px]:w-[46rem]">
                    <Icon className="h-[23rem] w-[23rem] max-[640px]:h-[19rem] max-[640px]:w-[19rem]" />
                  </div>

                  <div>
                    <span className="safety-body text-[11rem] font-medium tracking-[.14em] text-[var(--di-primary)]/35">
                      0{index + 1}
                    </span>

                    <h3 className="mt-[8rem] text-[31rem] font-bold leading-[1] text-[var(--di-primary)] max-[1024px]:text-[26rem]">
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
    <section className="relative overflow-hidden bg-white py-[130rem] max-[1024px]:py-[80rem]">
      <div className="di-container">
        <div
          className="safety-reveal grid grid-cols-[.9fr_1.1fr] items-end gap-[100rem] border-b border-[var(--di-primary)]/20 pb-[60rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[30rem]"
          data-safety-reveal
        >
          <div>
            <h2 className="mt-[28rem] max-w-[800rem] text-[82rem] font-bold uppercase leading-[.86] tracking-[-.025em] text-[var(--di-primary)] max-[1024px]:text-[52rem] max-[600px]:text-[42rem]">
              {content.title}
            </h2>
          </div>

          <p className="safety-body max-w-[680rem] justify-self-end text-[18rem] font-normal leading-[1.65] text-[var(--di-primary)]/62 max-[1024px]:justify-self-start max-[1024px]:text-[16rem]">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-2 max-[850px]:grid-cols-1">
          {content.items.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className={`safety-standard group relative min-h-[430rem] overflow-hidden border-b border-[var(--di-primary)]/20 px-[48rem] py-[45rem] max-[1024px]:min-h-[360rem] max-[1024px]:px-[30rem] max-[1024px]:py-[35rem] max-[600px]:min-h-0 max-[600px]:px-0 ${
                  index % 2 === 0
                    ? "min-[851px]:border-r min-[851px]:border-[var(--di-primary)]/20"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-[30rem]">
                  <div className="flex h-[56rem] w-[56rem] items-center justify-center rounded-[12rem] bg-[var(--di-accent)]/8 text-[var(--di-accent)] transition-colors duration-300 group-hover:bg-[var(--di-accent)] group-hover:text-white">
                    <Icon className="h-[23rem] w-[23rem]" />
                  </div>

                  <span
                    className="text-[78rem] font-bold leading-[.8] tracking-[-.04em] text-[var(--di-primary)]/[.055] transition-colors duration-300 group-hover:text-[var(--di-accent)]/10 max-[1024px]:text-[60rem]"
                    dir="ltr"
                  >
                    {item.number}
                  </span>
                </div>

                <div className="mt-[72rem] max-[1024px]:mt-[50rem] max-[600px]:mt-[35rem]">
                  <h3 className="max-w-[500rem] text-[38rem] font-bold leading-[.96] text-[var(--di-primary)] max-[1024px]:text-[30rem]">
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

export default function SafetyCompliancePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const params = useParams<{
    lang?: string | string[];
  }>();

  const rawLang = Array.isArray(params?.lang) ? params.lang[0] : params?.lang;

  const isArabic = rawLang?.toLowerCase() === "ar";

  const content = pageCopy[isArabic ? "ar" : "en"];

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const transitionPlug =
        root.querySelector<HTMLElement>(".transition-plug");

      const transitionInner = root.querySelector<HTMLElement>(
        ".transition-plug__inner",
      );

      /*
       * REDUCED MOTION
       */
      if (reducedMotion) {
        if (transitionPlug) {
          gsap.set(transitionPlug, {
            yPercent: 105,
          });
        }

        if (transitionInner) {
          gsap.set(transitionInner, {
            height: "0%",
          });
        }

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
            opacity: 1,
            x: 0,
            y: 0,
            yPercent: 0,
          },
        );

        return;
      }

      /*
       * ABOUT-STYLE SHUTTER
       */
      if (transitionPlug) {
        gsap.set(transitionPlug, {
          yPercent: 0,
        });
      }

      if (transitionInner) {
        gsap.set(transitionInner, {
          top: "auto",
          bottom: 0,
          height: "100%",
        });
      }

      /*
       * HERO INITIAL STATE
       */
      gsap.set(".safety-hero-eyebrow", {
        opacity: 0,
        y: 22,
      });

      gsap.set(".safety-title-line", {
        opacity: 0,
        yPercent: 110,
      });

      gsap.set(".safety-hero-copy", {
        opacity: 0,
        y: 40,
      });

      /*
       * SHUTTER + HERO ENTRY
       */
      const entrance = gsap.timeline({
        paused: true,
      });

      if (transitionInner) {
        entrance.fromTo(
          transitionInner,
          {
            top: "auto",
            bottom: 0,
            height: "100%",
          },
          {
            height: "0%",
            duration: 1.6,
            ease: "power4.inOut",
          },
          0,
        );
      }

      if (transitionPlug) {
        entrance.to(
          transitionPlug,
          {
            yPercent: 105,
            duration: 1.6,
            ease: "power4.inOut",
          },
          0.05,
        );
      }

      entrance.to(
        ".safety-hero-eyebrow",
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        1.02,
      );

      entrance.to(
        ".safety-title-line",
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.05,
          stagger: 0.13,
          ease: "power4.out",
        },
        1.05,
      );

      entrance.to(
        ".safety-hero-copy",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        1.35,
      );

      const startEntrance = () => {
        window.scrollTo(0, 0);

        requestAnimationFrame(() => {
          entrance.play(0);
        });
      };

      if (document.readyState === "complete") {
        startEntrance();
      } else {
        window.addEventListener("load", startEntrance, {
          once: true,
        });

        cleanups.push(() => {
          window.removeEventListener("load", startEntrance);
        });
      }

      /*
       * EXISTING SECTION REVEALS
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
      const featureRows = gsap.utils.toArray<HTMLElement>(
        ".safety-feature-row",
      );

      if (featureRows.length > 0) {
        gsap.fromTo(
          featureRows,
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
              trigger: featureRows[0],
              start: "top 84%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      /*
       * STANDARD BLOCKS
       */
      const standards = gsap.utils.toArray<HTMLElement>(".safety-standard");

      if (standards.length > 0) {
        gsap.fromTo(
          standards,
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
              trigger: standards[0],
              start: "top 86%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      cleanups.push(() => {
        window.removeEventListener("resize", handleResize);
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      cleanups.forEach((cleanup) => {
        cleanup();
      });

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
      <PageTransition initialCovered />

      <main>
        <SafetyHero content={content.hero} isArabic={isArabic} />

        <ComplianceSection content={content.compliance} />

        <StandardsSection content={content.standards} />
      </main>

      <style jsx global>{`
        .safety-page:not(.safety-page--rtl) .safety-body {
          font-family: "Inter", sans-serif;
        }

        .safety-page--rtl .safety-body {
          font-family: inherit;
        }

        .safety-page--rtl {
          text-align: right;
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
