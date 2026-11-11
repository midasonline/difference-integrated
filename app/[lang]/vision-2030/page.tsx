"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

import { PageTransition } from "@/components/ui/PageTransition";

type VisionCopy = {
  hero: {
    titleLine1: string;
    titleLine2: string;
    accent: string;
    intro: string[];
    meta: string;
  };
  context: {
    title: string;
    paragraphs: string[];
    sectors: string[];
  };
  contribution: {
    title: string;
    description: string;
    items: {
      number: string;
      title: string;
      description: string;
    }[];
  };
};

const visionCopy: Record<"en" | "ar", VisionCopy> = {
  en: {
    hero: {
      titleLine1: "Supporting Saudi",
      titleLine2: "Arabia’s",
      accent: "Transformation",
      intro: [
        "Saudi Arabia is undergoing an unprecedented period of economic, infrastructure, industrial, and urban development.",
        "Difference Integrated supports this transformation through dependable transportation and logistics solutions across the Kingdom.",
      ],
      meta: "Saudi Arabia · Vision 2030",
    },

    context: {
      title: "Development depends on movement.",
      paragraphs: [
        "From major construction and infrastructure projects to industrial expansion, commercial development, and new logistics networks, the Kingdom’s transformation depends on the efficient movement of people, materials, equipment, and goods.",
        "Difference Integrated is positioned to support that movement through reliable transportation, operational coordination, and logistics capability across Saudi Arabia.",
      ],
      sectors: [
        "Construction & Infrastructure",
        "Industrial Expansion",
        "Commercial Development",
        "New Logistics Networks",
      ],
    },

    contribution: {
      title: "Moving the Kingdom Forward",
      description:
        "Our contribution goes beyond moving cargo. We support the operational movement behind projects, businesses, and infrastructure that contribute to the Kingdom’s continued development.",
      items: [
        {
          number: "01",
          title: "Construction & Infrastructure",
          description:
            "Transportation and logistics support for major construction, infrastructure, and active project environments.",
        },
        {
          number: "02",
          title: "Industrial & Commercial Development",
          description:
            "Dependable movement of materials, equipment, and goods supporting industrial expansion and commercial activity.",
        },
        {
          number: "03",
          title: "Logistics Networks",
          description:
            "Efficient transportation supporting evolving supply chains and the Kingdom’s wider logistics network.",
        },
      ],
    },
  },

  ar: {
    hero: {
      titleLine1: "دعم",
      titleLine2: "تحول",
      accent: "المملكة العربية السعودية",
      intro: [
        "تشهد المملكة العربية السعودية مرحلة غير مسبوقة من التطور الاقتصادي والبنية التحتية والنمو الصناعي والتوسع العمراني.",
        "تدعم دفرنس إنتغريتد هذا التحول من خلال حلول نقل وخدمات لوجستية موثوقة في مختلف أنحاء المملكة.",
      ],
      meta: "المملكة العربية السعودية · رؤية 2030",
    },

    context: {
      title: "التنمية تعتمد على الحركة.",
      paragraphs: [
        "من مشاريع البناء والبنية التحتية الكبرى إلى التوسع الصناعي والتطوير التجاري وشبكات الخدمات اللوجستية الجديدة، يعتمد تحول المملكة على الحركة الفعالة للأفراد والمواد والمعدات والبضائع.",
        "تتموضع دفرنس إنتغريتد لدعم هذه الحركة من خلال النقل الموثوق والتنسيق التشغيلي والقدرات اللوجستية في مختلف أنحاء المملكة.",
      ],
      sectors: [
        "البناء والبنية التحتية",
        "التوسع الصناعي",
        "التطوير التجاري",
        "الشبكات اللوجستية الجديدة",
      ],
    },

    contribution: {
      title: "ندفع المملكة إلى الأمام",
      description:
        "يتجاوز دورنا مجرد نقل الشحنات. نحن ندعم الحركة التشغيلية خلف المشاريع والأعمال والبنية التحتية التي تساهم في استمرار تطور المملكة.",
      items: [
        {
          number: "01",
          title: "البناء والبنية التحتية",
          description:
            "دعم النقل والخدمات اللوجستية لمشاريع البناء والبنية التحتية وبيئات المشاريع النشطة.",
        },
        {
          number: "02",
          title: "التطوير الصناعي والتجاري",
          description:
            "حركة موثوقة للمواد والمعدات والبضائع لدعم التوسع الصناعي والنشاط التجاري.",
        },
        {
          number: "03",
          title: "الشبكات اللوجستية",
          description:
            "نقل فعال يدعم سلاسل الإمداد المتطورة والشبكة اللوجستية الأوسع في المملكة.",
        },
      ],
    },
  },
};

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-[14rem]">
      <span className="h-[3rem] w-[38rem] shrink-0 bg-[var(--di-accent)]" />
      <span
        className={
          light
            ? "text-[13rem] font-medium uppercase tracking-[.12em] text-white/65 max-[640px]:text-[11rem]"
            : "text-[13rem] font-medium uppercase tracking-[.12em] text-[var(--di-accent)] max-[640px]:text-[11rem]"
        }
      >
        {children}
      </span>
    </div>
  );
}

export default function Vision2030Page() {
  const rootRef = useRef<HTMLDivElement>(null);

  const params = useParams<{
    lang?: string | string[];
  }>();

  const rawLang = Array.isArray(params?.lang) ? params.lang[0] : params?.lang;

  const isArabic = rawLang?.toLowerCase() === "ar";
  const copy = visionCopy[isArabic ? "ar" : "en"];

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const cleanupFunctions: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const transitionPlug =
        root.querySelector<HTMLElement>(".transition-plug");

      const transitionInner = root.querySelector<HTMLElement>(
        ".transition-plug__inner",
      );

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
            ".vision-hero-image",
            ".vision-hero-label",
            ".vision-hero-line",
            ".vision-hero-divider",
            ".vision-hero-copy",
            ".vision-hero-meta",
            ".vision-reveal",
            ".vision-sector",
            ".vision-contribution-row",
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            yPercent: 0,
            scale: 1,
          },
        );

        gsap.set(".vision-hero-divider", {
          width: "100%",
        });

        return;
      }

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

      gsap.set(".vision-hero-image", {
        scale: 1.08,
      });

      gsap.set(".vision-hero-divider", {
        width: 0,
      });

      gsap.set(".vision-hero-line", {
        opacity: 0,
        yPercent: 110,
      });

      gsap.set(".vision-hero-copy", {
        opacity: 0,
        y: 35,
      });

      gsap.set(".vision-hero-meta", {
        opacity: 0,
        y: 12,
      });

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
        ".vision-hero-image",
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        },
        0.3,
      );

      entrance.to(
        ".vision-hero-divider",
        {
          width: "100%",
          duration: 1,
          ease: "power3.inOut",
        },
        1,
      );

      entrance.to(
        ".vision-hero-line",
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        },
        1.05,
      );

      entrance.to(
        ".vision-hero-copy",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        1.35,
      );

      entrance.to(
        ".vision-hero-meta",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        1.55,
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

        cleanupFunctions.push(() => {
          window.removeEventListener("load", startEntrance);
        });
      }

      const revealElements = gsap.utils.toArray<HTMLElement>(".vision-reveal");

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const sectors = gsap.utils.toArray<HTMLElement>(".vision-sector");

      if (sectors.length > 0) {
        gsap.fromTo(
          sectors,
          {
            opacity: 0,
            x: isArabic ? -30 : 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectors[0],
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const contributionRows = gsap.utils.toArray<HTMLElement>(
        ".vision-contribution-row",
      );

      if (contributionRows.length > 0) {
        gsap.fromTo(
          contributionRows,
          {
            opacity: 0,
            y: 34,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contributionRows[0],
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

      cleanupFunctions.push(() => {
        window.removeEventListener("resize", handleResize);
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      cleanupFunctions.forEach((cleanup) => {
        cleanup();
      });

      ctx.revert();
    };
  }, [isArabic]);

  return (
    <div
      ref={rootRef}
      className={
        isArabic ? "vision-2030-page vision-2030-page--rtl" : "vision-2030-page"
      }
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "en"}
    >
      <PageTransition initialCovered />

      <main>
        {/* HERO */}
        <section className="vision-hero relative flex h-screen min-h-[760px] flex-col justify-end overflow-hidden bg-[var(--di-primary)] text-white max-[1025px]:min-h-[720px]">
          <img
            src="/assets/img/vision-2030.webp"
            alt=""
            aria-hidden="true"
            className="vision-hero-image pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-[var(--di-primary)]/70" />

          <div className="di-container relative z-[2] w-full pb-[110rem] pt-[180rem] max-[1025px]:pb-[46rem] max-[1025px]:pt-[145rem]">
            <div className="relative mb-[105rem] flex items-end justify-between pb-[12rem] max-[1025px]:mb-[38rem] max-[1025px]:flex-col max-[1025px]:items-stretch">
              <div className="overflow-hidden pb-[8rem]">
                <h1
                  className={
                    isArabic
                      ? "vision-hero-line text-[180rem] font-bold leading-[1] tracking-[-.035em] max-[1440px]:text-[170rem] max-[1025px]:text-[96rem] max-[700px]:text-[78rem] max-[480px]:text-[68rem]"
                      : "vision-hero-line text-[180rem] font-bold leading-[.8] tracking-[-.04em] uppercase max-[1440px]:text-[170rem] max-[1025px]:text-[96rem] max-[700px]:text-[78rem] max-[480px]:text-[68rem]"
                  }
                >
                  {isArabic ? "رؤية 2030" : "Vision 2030"}
                </h1>
              </div>

              <span className="vision-hero-divider absolute bottom-0 left-0 h-[1rem] w-0 bg-white/20" />
            </div>

            <div className="vision-hero-copy ms-[740rem] flex flex-col gap-[20rem] max-[1025px]:ms-0 max-[1025px]:max-w-none max-[1025px]:gap-[14rem]">
              <h2
                className={
                  isArabic
                    ? "text-[30rem] font-bold leading-[1.15] tracking-[-.015em] max-[1025px]:text-[28rem] max-[600px]:text-[24rem]"
                    : "text-[30rem] font-bold leading-[.95] tracking-[-.02em] uppercase max-[1025px]:text-[28rem] max-[600px]:text-[24rem]"
                }
              >
                {copy.hero.titleLine1} {copy.hero.titleLine2}{" "}
                <span>{copy.hero.accent}</span>
              </h2>

              <div className="space-y-[16rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.45em,28rem)] text-white/88 max-[1025px]:text-[max(16px,17rem)] max-[1025px]:leading-[max(1.45em,24rem)]">
                {copy.hero.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="vision-hero-meta mt-[8rem] flex items-center gap-[15rem]">
                <span className="font-['Inter'] text-[max(12px,12rem)] font-medium uppercase tracking-[.13em] text-white/65">
                  {copy.hero.meta}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* KINGDOM IN MOTION */}
        <section className="bg-[var(--di-light)] py-[130rem] max-[1024px]:py-[80rem]">
          <div className="di-container">
            <div className="grid grid-cols-[.86fr_1.14fr] gap-[130rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[60rem]">
              <div className="vision-reveal">
                <h2 className="mt-[30rem] max-w-[720rem] text-[88rem] font-bold uppercase leading-[.86] tracking-[-.03em] text-[var(--di-primary)] max-[1024px]:text-[54rem] max-[600px]:text-[42rem]">
                  {copy.context.title}
                </h2>
              </div>

              <div>
                <div className="vision-reveal space-y-[22rem] font-['Inter'] text-[18rem] font-normal leading-[1.7] text-[var(--di-primary)]/65 max-[1024px]:text-[16rem]">
                  {copy.context.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-[55rem] border-t border-[var(--di-primary)]/20">
                  {copy.context.sectors.map((sector, index) => (
                    <div
                      key={sector}
                      className="vision-sector group flex min-h-[88rem] items-center justify-between gap-[25rem] border-b border-[var(--di-primary)]/20 py-[20rem]"
                    >
                      <div className="flex items-center gap-[22rem]">
                        <span
                          className="w-[30rem] shrink-0 font-['Inter'] text-[11rem] font-medium tracking-[.12em] text-[var(--di-accent)]"
                          dir="ltr"
                        >
                          0{index + 1}
                        </span>

                        <span className="text-[27rem] font-bold leading-[1] text-[var(--di-primary)] transition-colors duration-300 group-hover:text-[var(--di-accent)] max-[600px]:text-[22rem]">
                          {sector}
                        </span>
                      </div>

                      <FiArrowUpRight className="h-[23rem] w-[23rem] shrink-0 text-[var(--di-primary)]/25 transition-all duration-300 group-hover:-translate-y-[3rem] group-hover:translate-x-[3rem] group-hover:text-[var(--di-accent)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MOVING THE KINGDOM FORWARD */}
        <section className="bg-white py-[130rem] max-[1024px]:py-[80rem]">
          <div className="di-container">
            <div className="vision-reveal grid grid-cols-[.9fr_1.1fr] items-end gap-[100rem] border-b border-[var(--di-primary)]/20 pb-[60rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[30rem]">
              <div>
                <h2 className="mt-[28rem] max-w-[780rem] text-[82rem] font-bold uppercase leading-[.86] tracking-[-.03em] text-[var(--di-primary)] max-[1024px]:text-[52rem] max-[600px]:text-[40rem]">
                  {copy.contribution.title}
                </h2>
              </div>

              <p className="max-w-[680rem] justify-self-end font-['Inter'] text-[18rem] font-normal leading-[1.7] text-[var(--di-primary)]/62 max-[1024px]:justify-self-start max-[1024px]:text-[16rem]">
                {copy.contribution.description}
              </p>
            </div>

            <div>
              {copy.contribution.items.map((item) => (
                <article
                  key={item.number}
                  className="vision-contribution-row group grid grid-cols-[120rem_.8fr_1.2fr_40rem] items-start gap-[45rem] border-b border-[var(--di-primary)]/20 py-[52rem] max-[1024px]:grid-cols-[70rem_1fr] max-[1024px]:gap-[25rem] max-[600px]:grid-cols-[50rem_1fr] max-[600px]:py-[36rem]"
                >
                  <span
                    className="text-[54rem] font-bold leading-[.9] tracking-[-.04em] text-[var(--di-primary)]/10 transition-colors duration-300 group-hover:text-[var(--di-accent)] max-[1024px]:text-[42rem]"
                    dir="ltr"
                  >
                    {item.number}
                  </span>

                  <h3 className="text-[38rem] font-bold leading-[.95] text-[var(--di-primary)] max-[1024px]:text-[30rem]">
                    {item.title}
                  </h3>

                  <p className="max-w-[700rem] font-['Inter'] text-[16rem] font-normal leading-[1.7] text-[var(--di-primary)]/60 max-[1024px]:col-start-2 max-[1024px]:text-[15rem]">
                    {item.description}
                  </p>

                  <FiCheck className="h-[25rem] w-[25rem] text-[var(--di-accent)] max-[1024px]:hidden" />
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
