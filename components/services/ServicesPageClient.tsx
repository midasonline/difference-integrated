"use client";

import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { observeAnimationLayout } from "@/lib/animationLayout";

import { useI18n } from "@/components/i18n/I18nProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import type { Dictionary } from "@/i18n/dictionaries";

/*
 * Desktop Services scroll tuning.
 *
 * Native vertical scroll drives the horizontal service track.
 * When scrolling stops between panels, ScrollTrigger snaps to the
 * nearest complete slide — the same interaction pattern used on Home.
 */
/*
 * Services page scroll tuning.
 *
 * Keep the page in normal document flow so the global Footer stays below
 * the Services page. Smoothness is handled with a longer scroll distance
 * and numeric ScrollTrigger scrub.
 */
const SERVICES_SCROLL_DISTANCE_PER_PANEL = 1.28;
const SERVICES_MIN_SCROLL_SCREENS = 8;
const SERVICES_SCROLL_SCRUB = 0.9;
const SERVICES_SNAP_DELAY = 0.16;

type ServicePoint = {
  title: string;
  text: string;
};

type Service = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  points: ServicePoint[];
  supportingCopy: string;
  image: string;
};

const serviceMedia = [
  {
    number: "01",
    image: "/assets/img/services-page/heavy-dumper-logistics.webp",
  },
  {
    number: "02",
    image: "/assets/img/services-page/sand-transportation.webp",
  },
  {
    number: "03",
    image: "/assets/img/services-page/fuel-tanker-transportation.webp",
  },
  {
    number: "04",
    image: "/assets/img/services-page/fleet-equipment.webp",
  },
  {
    number: "05",
    image: "/assets/img/services-page/construction-logistics.webp",
  },
  {
    number: "06",
    image: "/assets/img/services-page/logistics-coordination.webp",
  },
  {
    number: "07",
    image: "/assets/img/services-page/container-transportation.webp",
  },
  {
    number: "08",
    image: "/assets/img/services-page/bulk-construction-material.webp",
  },
  {
    number: "09",
    image: "/assets/img/services-page/aggregate-transportation.webp",
  },
  {
    number: "10",
    image: "/assets/img/services-page/general-freight.webp",
  },
  {
    number: "11",
    image: "/assets/img/services-page/cattle-transportation.png",
  },
  {
    number: "12",
    image: "/assets/img/services-page/agriculture-transportation.png",
  },
  {
    number: "13",
    image: "/assets/img/services-page/vehicle-transportation.png",
  },
] as const;

type ServicesPageCopy = Dictionary["servicesPage"];

function KeyPointsAccordion({
  points,
}: {
  points: ServicePoint[];
}): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-[var(--di-primary)]/20">
      {points.map((point, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={point.title}
            className="service-keypoint-row border-b border-[var(--di-primary)]/20"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex min-h-[64rem] w-full items-center justify-between gap-[24rem] py-[12rem] text-start"
            >
              <span className="text-[max(16px,20rem)] font-bold uppercase leading-[max(1.35em,20rem)] transition-colors duration-300 group-hover:text-[var(--di-accent)] max-[1025px]:text-[max(16px,18rem)] max-[1025px]:leading-[max(1.35em,18rem)]">
                {point.title}
              </span>

              <span
                className={`flex h-[35rem] w-[35rem] shrink-0 items-center justify-center rounded-[5rem] text-white transition-[background-color,transform] duration-300 ease-out ${
                  isOpen
                    ? "bg-[var(--di-primary)]"
                    : "bg-[var(--di-accent)] group-hover:bg-[var(--di-primary)]"
                }`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-[11rem] w-[11rem] transition-transform duration-300 ease-out ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M12 4V20" />
                  <path d="M4 12H20" />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[650rem] pb-[18rem] pe-[70rem] font-['Inter'] text-[max(16px,15rem)] font-normal leading-[max(1.35em,21rem)] text-[var(--di-primary)]/78 max-[1025px]:pe-[45rem] max-[1025px]:text-[max(14px,14rem)] max-[1025px]:leading-[max(1.35em,20rem)]">
                  {point.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type ServiceNavigatorProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  services: Service[];
  copy: ServicesPageCopy["navigator"];
  isRtl: boolean;
};

function ServiceNavigator({
  activeIndex,
  onSelect,
  services,
  copy,
  isRtl,
}: ServiceNavigatorProps): React.JSX.Element {
  const isVisible = activeIndex >= 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) return;

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const openMenu = () => {
    clearCloseTimer();
    setMenuOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
      closeTimerRef.current = null;
    }, 220);
  };

  const handleSelect = (index: number) => {
    clearCloseTimer();
    setMenuOpen(false);
    onSelect(index);
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`services-quick-nav pointer-events-auto absolute left-[40rem] top-[145rem] z-[60] hidden transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] min-[1025px]:block max-[1500px]:left-[26rem] max-[1500px]:top-[130rem] ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-[24rem] opacity-0"
      }`}
      aria-hidden={!isVisible}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) openMenu();
      }}
      onMouseLeave={scheduleClose}
      onFocusCapture={(event) => {
        if (event.target.matches(":focus-visible")) openMenu();
      }}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;

        if (
          nextTarget instanceof Node &&
          event.currentTarget.contains(nextTarget)
        ) {
          return;
        }

        scheduleClose();
      }}
    >
      <button
        type="button"
        onClick={() => {
          clearCloseTimer();
          setMenuOpen((current) => !current);
        }}
        className={`relative flex h-[60rem] min-w-[220rem] items-center justify-between gap-[22rem] overflow-hidden rounded-[11rem] border px-[18rem] text-start shadow-[0_14px_42px_rgba(0,0,0,.20)] backdrop-blur-[14px] transition-[background-color,border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-[2rem] focus-visible:ring-[var(--di-accent)] ${
          menuOpen
            ? "border-white/70 bg-[rgba(244,241,234,.98)] shadow-[0_20px_55px_rgba(0,0,0,.28)]"
            : "border-white/55 bg-[rgba(244,241,234,.92)] hover:-translate-y-[2rem] hover:border-white/75 hover:bg-[rgba(244,241,234,.98)] hover:shadow-[0_20px_55px_rgba(0,0,0,.28)]"
        }`}
        aria-label={copy.buttonAria}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <span
          className="absolute inset-x-0 top-0 h-[3rem] bg-[var(--di-accent)]"
          aria-hidden="true"
        />

        <span className="text-[max(16px,23rem)] font-bold uppercase leading-none text-[var(--di-primary)]">
          {copy.button}
        </span>

        <span
          className={`flex h-[31rem] w-[31rem] shrink-0 items-center justify-center rounded-full text-white transition-[background-color,transform] duration-300 ${
            menuOpen
              ? "rotate-45 bg-[var(--di-accent)]"
              : "bg-[var(--di-primary)]"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 18 18" fill="none" className="h-[11rem] w-[11rem]">
            <path
              d="M9 3V15"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M3 9H15"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`absolute left-0 top-full w-[500rem] pt-[10rem] transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(.22,1,.36,1)] max-[1500px]:w-[455rem] ${
          menuOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-[8rem] opacity-0"
        }`}
      >
        <div
          role="menu"
          aria-label={copy.menuAria}
          className="overflow-hidden rounded-[15rem] border border-white/65 bg-[rgba(244,241,234,.96)] p-[8rem] shadow-[0_24px_70px_rgba(0,0,0,.30)] backdrop-blur-[18px]"
        >
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={service.number}
                type="button"
                role="menuitem"
                onClick={() => handleSelect(index)}
                className={`group/item relative flex min-h-[52rem] w-full items-center gap-[13rem] rounded-[9rem] px-[14rem] py-[9rem] text-start transition-[background-color,color,transform] duration-250 ${
                  isActive
                    ? "bg-[var(--di-primary)] text-white"
                    : "text-[var(--di-primary)] hover:bg-white/85"
                }`}
                aria-label={`${copy.goToPrefix} ${service.title}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`h-[10rem] w-[10rem] shrink-0 rounded-full border transition-all duration-250 ${
                    isActive
                      ? "border-[var(--di-accent)] bg-[var(--di-accent)] shadow-[0_0_0_4px_rgba(233,81,29,.16)]"
                      : "border-[var(--di-primary)]/45 bg-transparent group-hover/item:border-[var(--di-accent)] group-hover/item:bg-[var(--di-accent)]"
                  }`}
                  aria-hidden="true"
                />

                <span
                  className={`w-[32rem] shrink-0 font-['Inter'] text-[12.5rem] font-semibold tracking-[.05em] ${
                    isActive
                      ? "text-[var(--di-accent)]"
                      : "text-[var(--di-primary)]/65"
                  }`}
                >
                  {service.number}
                </span>

                <span
                  className={`min-w-0 flex-1 text-[18.5rem] font-bold uppercase leading-[1.08] transition-transform duration-250 max-[1500px]:text-[17.5rem] ${
                    isActive
                      ? "text-white"
                      : "text-[var(--di-primary)] group-hover/item:translate-x-[2rem]"
                  }`}
                >
                  {service.title}
                </span>

                <span
                  className={`flex h-[27rem] w-[27rem] shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-250 ${
                    isActive
                      ? "bg-[var(--di-accent)] text-white"
                      : "bg-[var(--di-primary)]/8 text-[var(--di-primary)]/65 group-hover/item:translate-x-[2rem] group-hover/item:bg-[var(--di-accent)] group-hover/item:text-white"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-[10rem] w-[10rem]"
                  >
                    <path
                      d="M3 8H13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 4L13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ServiceButton({
  href,
  label,
}: {
  href: string;
  label: string;
}): React.JSX.Element {
  return (
    <Link
      href={href}
      className="di-btn text-hover w-[545rem] max-w-full max-[1025px]:w-full"
    >
      <span className="di-btn-inner text-hover-inner">
        <span className="text-hover-elem text-hover-elem-1">{label}</span>
        <span className="text-hover-elem text-hover-elem-2">{label}</span>
      </span>
    </Link>
  );
}

function ServicesInquiryForm({
  services,
  copy,
  isRtl,
}: {
  services: Service[];
  copy: ServicesPageCopy["inquiry"];
  isRtl: boolean;
}): React.JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);

  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "sending" || !formRef.current) {
      return;
    }

    const form = formRef.current;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS Services form configuration is missing.");
      setSubmitState("error");
      return;
    }

    try {
      setSubmitState("sending");

      await emailjs.sendForm(serviceId, templateId, form, {
        publicKey,
      });

      setSubmitState("success");

      form.reset();

      window.setTimeout(() => {
        setSubmitState("idle");
      }, 5000);
    } catch (error) {
      console.error("EmailJS Services form submission failed:", error);
      setSubmitState("error");
    }
  };

  const buttonLabel =
    submitState === "sending"
      ? isRtl
        ? "جارٍ الإرسال..."
        : "Sending..."
      : copy.submit;

  const successMessage = isRtl
    ? "شكرًا لك. تم إرسال طلبك بنجاح."
    : "Thank you. Your request has been sent successfully.";

  const errorMessage = isRtl
    ? "تعذر إرسال طلبك. يرجى المحاولة مرة أخرى."
    : "We could not send your request. Please try again.";

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="services-inquiry-section relative overflow-hidden bg-white py-[90rem] text-[var(--di-primary)] min-[1025px]:py-[120rem]"
    >
      <div className="di-container">
        <div className="services-inquiry-frame overflow-hidden rounded-[28rem] bg-[var(--di-light)] px-[30rem] pb-[55rem] pt-[30rem] max-[1025px]:rounded-[18rem] max-[1025px]:px-[20rem] max-[1025px]:pb-[40rem] max-[1025px]:pt-[22rem]">
          <div className="services-inquiry-top flex items-center justify-between border-b border-[var(--di-primary)]/20 pb-[22rem]">
            <span className="text-[max(16px,20rem)] font-bold uppercase leading-none">
              {copy.label}
            </span>

            <span
              className="h-[4rem] w-[110rem] bg-[var(--di-accent)] max-[640px]:w-[70rem]"
              aria-hidden="true"
            />
          </div>

          <div className="services-inquiry-title-wrap overflow-hidden">
            <h2 className="services-inquiry-title mt-[42rem] max-w-[1100rem] text-[96rem] font-bold uppercase leading-[0.86] tracking-[-0.025em] max-[1025px]:mt-[32rem] max-[1025px]:text-[62rem] max-[640px]:text-[46rem]">
              {copy.title}
            </h2>
          </div>

          <form
            ref={formRef}
            className="services-inquiry-form mt-[58rem] grid grid-cols-2 gap-x-[55rem] gap-y-[38rem] max-[760px]:mt-[42rem] max-[760px]:grid-cols-1 max-[760px]:gap-y-[30rem]"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="source"
              value="Difference Integrated Services Page"
            />

            <label className="service-form-field group relative flex flex-col gap-[10rem] overflow-hidden pb-[4rem]">
              <span className="service-form-label font-['Inter'] text-[max(14px,14rem)] font-semibold uppercase tracking-[.08em] text-[var(--di-primary)]/65">
                {copy.fullName}{" "}
                <span className="text-[var(--di-accent)]">*</span>
              </span>

              <input
                type="text"
                name="full_name"
                required
                className="service-form-control h-[58rem] border-0 bg-transparent px-0 font-['Inter'] text-[max(16px,20rem)] font-normal text-[var(--di-primary)] outline-none placeholder:text-[var(--di-primary)]/30"
                placeholder={copy.fullNamePlaceholder}
              />

              <span
                className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--di-primary)]/25"
                aria-hidden="true"
              />

              <span
                className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--di-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
                aria-hidden="true"
              />
            </label>

            <label className="service-form-field group relative flex flex-col gap-[10rem] overflow-hidden pb-[4rem]">
              <span className="service-form-label font-['Inter'] text-[max(14px,14rem)] font-semibold uppercase tracking-[.08em] text-[var(--di-primary)]/65">
                {copy.companyName}
              </span>

              <input
                type="text"
                name="company"
                className="service-form-control h-[58rem] border-0 bg-transparent px-0 font-['Inter'] text-[max(16px,20rem)] font-normal text-[var(--di-primary)] outline-none placeholder:text-[var(--di-primary)]/30"
                placeholder={copy.companyNamePlaceholder}
              />

              <span
                className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--di-primary)]/25"
                aria-hidden="true"
              />

              <span
                className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--di-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
                aria-hidden="true"
              />
            </label>

            <label className="service-form-field group relative flex flex-col gap-[10rem] overflow-hidden pb-[4rem]">
              <span className="service-form-label font-['Inter'] text-[max(14px,14rem)] font-semibold uppercase tracking-[.08em] text-[var(--di-primary)]/65">
                {copy.phone} <span className="text-[var(--di-accent)]">*</span>
              </span>

              <input
                type="tel"
                name="phone"
                required
                className="service-form-control h-[58rem] border-0 bg-transparent px-0 font-['Inter'] text-[max(16px,20rem)] font-normal text-[var(--di-primary)] outline-none placeholder:text-[var(--di-primary)]/30"
                placeholder={copy.phonePlaceholder}
              />

              <span
                className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--di-primary)]/25"
                aria-hidden="true"
              />

              <span
                className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--di-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
                aria-hidden="true"
              />
            </label>

            <label className="service-form-field group relative flex flex-col gap-[10rem] overflow-hidden pb-[4rem]">
              <span className="service-form-label font-['Inter'] text-[max(14px,14rem)] font-semibold uppercase tracking-[.08em] text-[var(--di-primary)]/65">
                {copy.email} <span className="text-[var(--di-accent)]">*</span>
              </span>

              <input
                type="email"
                name="email"
                required
                className="service-form-control h-[58rem] border-0 bg-transparent px-0 font-['Inter'] text-[max(16px,20rem)] font-normal text-[var(--di-primary)] outline-none placeholder:text-[var(--di-primary)]/30"
                placeholder={copy.emailPlaceholder}
              />

              <span
                className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--di-primary)]/25"
                aria-hidden="true"
              />

              <span
                className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--di-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
                aria-hidden="true"
              />
            </label>

            <label className="service-form-field group relative col-span-2 flex flex-col gap-[10rem] overflow-hidden pb-[4rem] max-[760px]:col-span-1">
              <span className="service-form-label font-['Inter'] text-[max(14px,14rem)] font-semibold uppercase tracking-[.08em] text-[var(--di-primary)]/65">
                {copy.serviceRequired}
              </span>

              <select
                name="service"
                defaultValue=""
                className="service-form-control h-[58rem] cursor-pointer border-0 bg-transparent px-0 font-['Inter'] text-[max(16px,20rem)] font-normal text-[var(--di-primary)] outline-none"
              >
                <option value="" disabled>
                  {copy.selectService}
                </option>

                {services.map((service) => (
                  <option key={service.number} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>

              <span
                className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--di-primary)]/25"
                aria-hidden="true"
              />

              <span
                className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--di-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
                aria-hidden="true"
              />
            </label>

            <label className="service-form-field group relative col-span-2 flex flex-col gap-[10rem] overflow-hidden pb-[4rem] max-[760px]:col-span-1">
              <span className="service-form-label font-['Inter'] text-[max(14px,14rem)] font-semibold uppercase tracking-[.08em] text-[var(--di-primary)]/65">
                {copy.requirement}
              </span>

              <textarea
                name="message"
                rows={5}
                className="service-form-control min-h-[145rem] resize-y border-0 bg-transparent px-0 py-[16rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[1.45] text-[var(--di-primary)] outline-none placeholder:text-[var(--di-primary)]/30"
                placeholder={copy.requirementPlaceholder}
              />

              <span
                className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--di-primary)]/25"
                aria-hidden="true"
              />

              <span
                className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--di-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
                aria-hidden="true"
              />
            </label>

            <div className="service-form-submit-wrap col-span-2 mt-[14rem] max-[760px]:col-span-1">
              <button
                type="submit"
                disabled={submitState === "sending"}
                className="di-btn di-btn-accent text-hover w-[390rem] max-w-full disabled:cursor-not-allowed disabled:opacity-60 max-[640px]:w-full"
              >
                <span className="di-btn-inner text-hover-inner">
                  <span className="text-hover-elem text-hover-elem-1">
                    {buttonLabel}
                  </span>

                  <span className="text-hover-elem text-hover-elem-2">
                    {buttonLabel}
                  </span>
                </span>
              </button>
            </div>

            {submitState === "success" ? (
              <div
                className="col-span-2 max-[760px]:col-span-1"
                role="status"
                aria-live="polite"
              >
                <div className="border-l-[3rem] border-[var(--di-accent)] bg-white/65 px-[18rem] py-[14rem] font-['Inter'] text-[max(13px,13rem)] font-medium text-[var(--di-primary)]">
                  {successMessage}
                </div>
              </div>
            ) : submitState === "error" ? (
              <div className="col-span-2 max-[760px]:col-span-1" role="alert">
                <div className="border-l-[3rem] border-[var(--di-accent)] bg-white/65 px-[18rem] py-[14rem] font-['Inter'] text-[max(13px,13rem)] font-medium text-[var(--di-accent)]">
                  {errorMessage}
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPageClient(): React.JSX.Element {
  const { dictionary, locale, localePath } = useI18n();
  const copy = dictionary.servicesPage;
  const isRtl = locale === "ar";

  const services: Service[] = serviceMedia.map((media, index) => ({
    ...media,
    ...copy.services[index],
  }));

  const rootRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const masterTriggerRef = useRef<ReturnType<
    typeof ScrollTrigger.create
  > | null>(null);

  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const serviceTargetTimesRef = useRef<number[]>([]);
  const activeServiceIndexRef = useRef(-1);
  const jumpTweenRef = useRef<gsap.core.Tween | null>(null);

  const [activeServiceIndex, setActiveServiceIndex] = useState(-1);

  const updateActiveService = (index: number) => {
    if (activeServiceIndexRef.current === index) return;

    activeServiceIndexRef.current = index;
    setActiveServiceIndex(index);
  };

  const jumpToService = (index: number) => {
    const service = services[index];

    if (!service) return;

    updateActiveService(index);

    if (window.innerWidth <= 1024) {
      document.getElementById(`service-${service.number}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    const trigger = masterTriggerRef.current;
    const timeline = masterTimelineRef.current;
    const targetTime = serviceTargetTimesRef.current[index];

    if (
      !trigger ||
      !timeline ||
      typeof targetTime !== "number" ||
      timeline.duration() <= 0
    ) {
      return;
    }

    const progress = Math.min(1, Math.max(0, targetTime / timeline.duration()));

    const targetScroll =
      trigger.start + (trigger.end - trigger.start) * progress;

    jumpTweenRef.current?.kill();

    const scrollState = {
      y: window.scrollY,
    };

    jumpTweenRef.current = gsap.to(scrollState, {
      y: targetScroll,
      duration: 0.7,
      ease: "power3.inOut",
      overwrite: true,

      onUpdate: () => {
        window.scrollTo(0, scrollState.y);
      },

      onComplete: () => {
        jumpTweenRef.current = null;
      },
    });
  };

  useLayoutEffect(() => {
    if (
      !rootRef.current ||
      !servicesRef.current ||
      !trackRef.current ||
      !progressWrapRef.current ||
      !progressRef.current
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    window.scrollTo(0, 0);

    const root = rootRef.current;
    const servicesSection = servicesRef.current;
    const track = trackRef.current;
    const progressWrap = progressWrapRef.current;
    const progress = progressRef.current;

    const splits: SplitText[] = [];
    const listeners: Array<() => void> = [];
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".transition-plug", {
          yPercent: 105,
        });

        gsap.set(progressWrap, {
          display: "none",
        });

        return;
      }

      const heroTitle = servicesSection.querySelector<HTMLElement>(
        ".services-main-animated-text",
      );

      const heroCopy = servicesSection.querySelector<HTMLElement>(
        ".services-hero-copy",
      );

      let heroRevealTargets: HTMLElement[] = [];

      if (heroTitle) {
        const heroSplit = new SplitText(heroTitle, {
          type: isRtl ? "words" : "chars,words",

          ...(isRtl
            ? {
                wordsClass: "word",
              }
            : {
                charsClass: "char",
                wordsClass: "word",
              }),
        });

        splits.push(heroSplit);

        heroRevealTargets = (
          isRtl ? heroSplit.words : heroSplit.chars
        ) as HTMLElement[];

        gsap.set(heroRevealTargets, {
          willChange: "transform",
          transformOrigin: "50% 0%",
          scaleY: 0,
          opacity: 0,
        });
      }

      if (heroCopy) {
        gsap.set(heroCopy, {
          opacity: 0,
          y: 28,
        });
      }

      const transitionPlug =
        root.querySelector<HTMLElement>(".transition-plug");

      const transitionInner = root.querySelector<HTMLElement>(
        ".transition-plug__inner",
      );

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

      const entrance = gsap.timeline({
        paused: true,

        defaults: {
          ease: "power4.inOut",
          duration: 2,
        },
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
          },
          0,
        );
      }

      if (transitionPlug) {
        entrance.to(
          transitionPlug,
          {
            yPercent: 105,
          },
          0.05,
        );
      }

      if (heroRevealTargets.length) {
        entrance.to(
          heroRevealTargets,
          {
            ease: "back.out(1.7)",
            opacity: 1,
            scaleY: 1,
            yPercent: 0,
            stagger: isRtl ? 0.06 : 0.03,
            duration: 1,
          },
          ">",
        );
      }

      if (heroCopy) {
        entrance.to(
          heroCopy,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          heroRevealTargets.length ? "<+=0.3" : ">",
        );
      }

      const playEntrance = () => {
        window.scrollTo(0, 0);

        requestAnimationFrame(() => {
          entrance.play(0);
        });
      };

      if (document.readyState === "complete") {
        playEntrance();
      } else {
        window.addEventListener("load", playEntrance, {
          once: true,
        });

        listeners.push(() => {
          window.removeEventListener("load", playEntrance);
        });
      }

      root.querySelectorAll<HTMLElement>(".text-hover").forEach((element) => {
        const lines = element.querySelectorAll<HTMLElement>(".text-hover-elem");

        if (!lines.length) return;

        lines.forEach((line) => {
          const split = new SplitText(line, {
            type: isRtl ? "words" : "chars,words",

            ...(isRtl
              ? {
                  wordsClass: "word",
                }
              : {
                  charsClass: "char",
                  wordsClass: "word",
                }),
          });

          splits.push(split);
        });

        const motionUnit = isRtl ? ".word" : ".char";

        const first = element.querySelectorAll<HTMLElement>(
          `.text-hover-elem-1 ${motionUnit}`,
        );

        const second = element.querySelectorAll<HTMLElement>(
          `.text-hover-elem-2 ${motionUnit}`,
        );

        const timeline = gsap.timeline({
          paused: true,

          defaults: {
            stagger: 0.015,
            duration: 0.35,
            ease: "power3.out",
          },
        });

        if (first.length) {
          timeline.to(first, {
            yPercent: -120,
          });
        }

        if (second.length) {
          timeline.to(
            second,
            {
              yPercent: -100,
            },
            0,
          );
        }

        const enter = () => {
          if (window.innerWidth > 1024) {
            timeline.play();
          }
        };

        const leave = () => {
          if (window.innerWidth > 1024) {
            timeline.reverse();
          }
        };

        element.addEventListener("mouseenter", enter);

        element.addEventListener("mouseleave", leave);

        listeners.push(() => {
          element.removeEventListener("mouseenter", enter);

          element.removeEventListener("mouseleave", leave);

          timeline.kill();
        });
      });

      mm.add("(min-width: 1025px)", () => {
        const servicePanels = gsap.utils.toArray<HTMLElement>(
          "[data-service-panel]",
          servicesSection,
        );

        /*
         * Service panel content stays fully visible.
         * Only horizontal slide movement animates.
         */
        gsap.set(track, {
          x: 0,
        });

        gsap.set(progress, {
          width: "100%",
          scaleX: 0,
          transformOrigin: isRtl ? "right center" : "left center",
        });

        gsap.set(progressWrap, {
          opacity: 1,
        });

        gsap.set(
          servicesSection.querySelectorAll<HTMLElement>(
            ".service-content-sweep",
          ),
          {
            scaleY: 0,
          },
        );

        const master = gsap.timeline({
          paused: true,
        });

        const serviceTargetTimes: number[] = [];
        const serviceActivationTimes: number[] = [];

        servicePanels.forEach((_panel, index) => {
          const moveStart = master.duration();

          master.to(
            track,
            {
              x: () => -(index + 1) * window.innerWidth,
              duration: 1,
              ease: "none",
            },
            moveStart,
          );

          const landingTime = moveStart + 1;

          serviceActivationTimes[index] = moveStart + 0.18;
          serviceTargetTimes[index] = landingTime;
        });

        serviceTargetTimesRef.current = serviceTargetTimes;

        masterTimelineRef.current = master;

        /*
         * HOME-STYLE HORIZONTAL SCROLL
         * ----------------------------
         * No wheel interception, no custom thresholds and no gesture locks.
         *
         * Native vertical scrolling drives the horizontal master timeline.
         * If scrolling stops between two panels, ScrollTrigger snaps to the
         * nearest exact panel position automatically.
         */
        const totalDuration = master.duration();

        const serviceSnapPoints =
          totalDuration > 0
            ? [
                0,
                ...serviceTargetTimes.map((time) =>
                  Math.min(1, Math.max(0, time / totalDuration)),
                ),
              ]
            : [0, 1];

        const snapToNearestPanel = (rawProgress: number) => {
          let closest = serviceSnapPoints[0] ?? 0;
          let smallestDistance = Math.abs(rawProgress - closest);

          serviceSnapPoints.forEach((point) => {
            const distance = Math.abs(rawProgress - point);

            if (distance < smallestDistance) {
              closest = point;
              smallestDistance = distance;
            }
          });

          return closest;
        };

        const masterTrigger = ScrollTrigger.create({
          trigger: servicesSection,
          start: "top top",

          /*
           * Enough physical scroll for controlled movement, but shorter than
           * the old setup so a service does not require excessive wheel input.
           */
          end: () =>
            `+=${Math.max(
              window.innerHeight *
                servicePanels.length *
                SERVICES_SCROLL_DISTANCE_PER_PANEL,
              window.innerHeight * SERVICES_MIN_SCROLL_SCREENS,
            )}`,

          pin: true,
          scrub: SERVICES_SCROLL_SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: master,

          snap: {
            snapTo: snapToNearestPanel,
            delay: SERVICES_SNAP_DELAY,

            duration: {
              min: 0.3,
              max: 0.65,
            },

            ease: "power3.inOut",
            inertia: false,
          },

          onUpdate: (self) => {
            gsap.set(progress, {
              scaleX: self.progress,
            });

            gsap.to(progressWrap, {
              opacity: self.progress > 0.97 ? 0 : 1,
              duration: 0.2,
              overwrite: true,
            });

            const currentTime = master.time();

            let nextActiveIndex = -1;

            serviceActivationTimes.forEach((activationTime, index) => {
              if (currentTime >= activationTime) {
                nextActiveIndex = index;
              }
            });

            updateActiveService(nextActiveIndex);
          },
        });

        masterTriggerRef.current = masterTrigger;

        return () => {
          jumpTweenRef.current?.kill();
          jumpTweenRef.current = null;

          if (masterTriggerRef.current === masterTrigger) {
            masterTriggerRef.current = null;
            masterTimelineRef.current = null;
            serviceTargetTimesRef.current = [];
          }

          masterTrigger.kill();
          master.kill();
        };
      });

      mm.add("(max-width: 1024px)", () => {
        /*
         * Mobile services stay fully visible and use normal native vertical
         * scrolling.
         */
        gsap.set(track, {
          clearProps: "transform",
        });

        gsap.set(progressWrap, {
          display: "none",
        });

        gsap.set(
          servicesSection.querySelectorAll<HTMLElement>(
            ".service-content-sweep",
          ),
          {
            scaleY: 0,
          },
        );
      });

      const inquirySection = root.querySelector<HTMLElement>(
        ".services-inquiry-section",
      );

      const inquiryFrame = root.querySelector<HTMLElement>(
        ".services-inquiry-frame",
      );

      const inquiryTop = root.querySelector<HTMLElement>(
        ".services-inquiry-top",
      );

      const inquiryTitle = root.querySelector<HTMLElement>(
        ".services-inquiry-title",
      );

      const inquiryForm = root.querySelector<HTMLElement>(
        ".services-inquiry-form",
      );

      const inquiryFields = root.querySelectorAll<HTMLElement>(
        ".service-form-field",
      );

      const inquiryLabels = root.querySelectorAll<HTMLElement>(
        ".service-form-label",
      );

      const inquiryControls = root.querySelectorAll<HTMLElement>(
        ".service-form-control",
      );

      const inquiryLines =
        root.querySelectorAll<HTMLElement>(".service-form-line");

      const inquirySubmit = root.querySelector<HTMLElement>(
        ".service-form-submit-wrap",
      );

      if (inquirySection && inquiryFrame) {
        gsap.set(inquiryFrame, {
          scale: 0.72,
          transformOrigin: "50% 50%",
        });

        gsap.to(inquiryFrame, {
          scale: 1,
          ease: "none",

          scrollTrigger: {
            trigger: inquirySection,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        });

        if (inquiryTop) {
          gsap.set(inquiryTop, {
            opacity: 0,
          });

          gsap.to(inquiryTop, {
            opacity: 1,
            duration: 1,
            ease: "power4.inOut",

            scrollTrigger: {
              trigger: inquiryTop,
              start: "center 92%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryTitle) {
          const inquiryTitleSplit = new SplitText(inquiryTitle, {
            type: "chars,words",
            charsClass: "char",
            wordsClass: "word",
          });

          splits.push(inquiryTitleSplit);

          gsap.set(inquiryTitleSplit.chars, {
            willChange: "transform",
            transformOrigin: "50% 0%",
            scaleY: 0,
            opacity: 0,
          });

          gsap.to(inquiryTitleSplit.chars, {
            scaleY: 1,
            opacity: 1,
            duration: 0.85,
            stagger: 0.025,
            ease: "back.out(1.7)",

            scrollTrigger: {
              trigger: inquiryTitle,

              start: "center bottom-=5%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryForm) {
          gsap.set(inquiryForm, {
            opacity: 0,
          });

          gsap.to(inquiryForm, {
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",

            scrollTrigger: {
              trigger: inquiryForm,
              start: "top 88%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryFields.length) {
          gsap.set(inquiryFields, {
            y: 58,
            opacity: 0,

            clipPath: "inset(0 0 100% 0)",
          });

          gsap.to(inquiryFields, {
            y: 0,
            opacity: 1,

            clipPath: "inset(0 0 0% 0)",

            duration: 0.85,
            stagger: 0.075,
            ease: "power4.out",

            scrollTrigger: {
              trigger: inquiryForm ?? inquirySection,

              start: "top 84%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryLabels.length) {
          gsap.set(inquiryLabels, {
            x: 28,
            opacity: 0,
          });

          gsap.to(inquiryLabels, {
            x: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.055,
            ease: "power3.out",

            scrollTrigger: {
              trigger: inquiryForm ?? inquirySection,

              start: "top 82%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryControls.length) {
          gsap.set(inquiryControls, {
            y: 24,
            opacity: 0,
          });

          gsap.to(inquiryControls, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",

            scrollTrigger: {
              trigger: inquiryForm ?? inquirySection,

              start: "top 80%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryLines.length) {
          gsap.set(inquiryLines, {
            scaleX: 0,

            transformOrigin: "left center",
          });

          gsap.to(inquiryLines, {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "power4.out",

            scrollTrigger: {
              trigger: inquiryForm ?? inquirySection,

              start: "top 78%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquirySubmit) {
          gsap.set(inquirySubmit, {
            y: 55,
            opacity: 0,
            scale: 0.94,

            transformOrigin: "left center",
          });

          gsap.to(inquirySubmit, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",

            scrollTrigger: {
              trigger: inquirySubmit,
              start: "top 92%",

              toggleActions: "play none none none",
            },
          });
        }
      }
    }, root);

    const stopObservingLayout = observeAnimationLayout(root);

    return () => {
      stopObservingLayout();

      jumpTweenRef.current?.kill();
      jumpTweenRef.current = null;

      listeners.forEach((cleanup) => cleanup());

      splits.forEach((split) => {
        split.revert();
      });

      mm.revert();
      ctx.revert();
    };
  }, [locale]);

  return (
    <div ref={rootRef} className="services-page">
      <PageTransition initialCovered />

      <main className="overflow-x-clip bg-white text-[var(--di-primary)]">
        <section
          ref={servicesRef}
          dir="ltr"
          className="hero-services relative min-[1025px]:h-[100svh]"
        >
          <ServiceNavigator
            activeIndex={activeServiceIndex}
            onSelect={jumpToService}
            services={services}
            copy={copy.navigator}
            isRtl={isRtl}
          />

          <div
            ref={trackRef}
            dir="ltr"
            className="hero-services__x-scroll relative left-0 flex w-full flex-col min-[1025px]:h-full min-[1025px]:w-max min-[1025px]:flex-row"
          >
            <section
              dir={isRtl ? "rtl" : "ltr"}
              data-services-panel
              className="relative flex h-[100svh] min-h-[650rem] w-full shrink-0 items-end overflow-hidden pb-[35rem] lg:pb-0 min-[1025px]:w-screen"
            >
              <div className="absolute h-full w-full hidden md:block">
                <Image
                  src="/assets/img/services-page/service-page-hero-desktop.webp"
                  alt={copy.hero.imageAlt}
                  fill
                  priority
                  quality={82}
                  sizes="100vw"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute h-full w-full block md:hidden">
                <Image
                  src="/assets/img/services-page/hero-mobile.png"
                  alt={copy.hero.imageAlt}
                  fill
                  priority
                  quality={82}
                  sizes="100vw"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,55,.18)_0%,rgba(10,18,55,.38)_48%,rgba(10,18,55,.82)_100%)]" />

              <div className="di-container lg:pb-140! relative z-[2] flex w-full items-end justify-between gap-[70rem] max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-[30rem]">
                <h1 className="services-main-animated-text shrink-0 text-[200rem] uppercase leading-[0.8] tracking-[-0.025em] text-white max-[1025px]:text-[80rem]">
                  {copy.hero.title}
                </h1>

                <div className="services-hero-copy mb-[10rem] max-w-[650rem] text-white max-[1025px]:mb-0">
                  <h2 className="services-hero-heading mb-[18rem] text-[60rem] font-bold uppercase leading-[54rem] max-[1025px]:text-[38rem] max-[1025px]:leading-[36rem]">
                    {copy.hero.heading}
                  </h2>

                  <div className="space-y-[12rem] font-['Inter'] text-[max(16px,20rem)] font-normal leading-[max(1.35em,27rem)] max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
                    {copy.hero.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {services.map((service) => (
              <section
                key={service.number}
                dir={isRtl ? "rtl" : "ltr"}
                id={`service-${service.number}`}
                data-services-panel
                data-service-panel
                className="flex h-auto min-h-[650rem] w-full shrink-0 flex-col bg-white min-[1025px]:h-[100svh] min-[1025px]:w-screen min-[1025px]:flex-row"
              >
                <div className="service-visual-shell relative flex h-[395rem] w-full shrink-0 items-end overflow-hidden px-[20rem] py-[20rem] min-[1025px]:h-full min-[1025px]:w-[50vw] min-[1025px]:px-[40rem] min-[1025px]:pb-[34rem]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="service-visual-image object-cover object-center"
                  />

                  <div className="service-visual-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                  <div className="relative z-[2] flex items-end gap-[65rem] text-white max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-[10rem]">
                    <div className="service-number-wrap flex items-end gap-[8rem]">
                      <span className="text-[150rem] leading-[0.8] max-[1025px]:text-[100rem]">
                        {service.number}
                      </span>

                      <span className="mb-[8rem] font-['Inter'] text-[max(16px,16rem)] font-medium leading-none text-white/75 max-[1025px]:mb-[4rem]">
                        / {services.length}
                      </span>
                    </div>

                    <h2 className="service-image-title max-w-[610rem] text-[60rem] font-bold uppercase leading-[54rem] max-[1025px]:max-w-[340rem] max-[1025px]:text-[40rem] max-[1025px]:leading-[38rem]">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <div className="service-copy-panel relative flex flex-1 flex-col justify-between overflow-hidden bg-white px-[clamp(42rem,4.6vw,96rem)] pb-[38rem] pt-[clamp(102rem,7vw,128rem)] min-[1025px]:h-full min-[1025px]:w-[50vw] max-[1025px]:gap-[35rem] max-[1025px]:px-[20rem] max-[1025px]:pb-[80rem] max-[1025px]:pt-[40rem]">
                  <span
                    className="service-content-sweep pointer-events-none absolute inset-y-0 left-0 z-[3] w-[8rem] bg-[var(--di-accent)] max-[1025px]:inset-x-0 max-[1025px]:bottom-auto max-[1025px]:h-[5rem] max-[1025px]:w-full"
                    aria-hidden="true"
                  />

                  <div className="service-copy-inner max-w-[720rem]">
                    <h3 className="service-tagline text-[56rem] font-bold uppercase leading-[0.92] tracking-[-0.012em] max-[1025px]:text-[38rem] max-[1025px]:leading-[36rem]">
                      {service.tagline}
                    </h3>

                    <p className="service-description mt-[18rem] max-w-[700rem] font-['Inter'] text-[max(16px,19rem)] font-normal leading-[max(1.35em,27rem)] text-[var(--di-primary)]/88 max-[1025px]:text-[max(16px,16rem)] max-[1025px]:leading-[max(1.35em,23rem)]">
                      {service.description}
                    </p>

                    <div className="mt-[26rem]">
                      <p className="service-keypoints-label mb-[10rem] text-[max(16px,18rem)] font-bold uppercase tracking-[0.04em]">
                        {copy.labels.keyPoints}
                      </p>

                      <KeyPointsAccordion points={service.points} />
                    </div>

                    <p className="service-supporting mt-[20rem] max-w-[680rem] font-['Inter'] text-[max(16px,16rem)] font-normal leading-[max(1.35em,23rem)] text-[var(--di-primary)]/76 max-[1025px]:text-[max(16px,15rem)] max-[1025px]:leading-[max(1.35em,21rem)]">
                      {service.supportingCopy}
                    </p>
                  </div>

                  <div className="service-cta mt-[26rem] max-w-[545rem]">
                    <ServiceButton
                      href={localePath("/contact")}
                      label={copy.labels.orderService}
                    />
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div
            ref={progressWrapRef}
            className="pointer-events-none absolute bottom-0 left-0 z-30 hidden h-[2rem] w-full bg-[#F4F4F7] min-[1025px]:block"
          >
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full bg-[var(--di-accent)]"
            />
          </div>
        </section>

        <ServicesInquiryForm
          services={services}
          copy={copy.inquiry}
          isRtl={isRtl}
        />
      </main>
    </div>
  );
}
