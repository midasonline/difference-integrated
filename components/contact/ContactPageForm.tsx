"use client";

import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/components/i18n/I18nProvider";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactFormCopy = Dictionary["contactPage"]["form"];

const serviceValues = [
  "Construction Logistics",
  "Sand Transportation",
  "Heavy Dumper Logistics",
  "Logistics Coordination",
  "Goods Transportation",
  "Fleet Solutions",
  "Aggregate Transportation",
  "Tanker Transportation",
  "General Freight",
  "Other Requirement",
] as const;

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  isRtl: boolean;
};

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  isRtl,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const raised = focused || value.length > 0;

  return (
    <label className="group relative block border-b border-[var(--mvp-primary)]/20 pt-[25rem] transition-colors duration-300 focus-within:border-[var(--mvp-accent)]">
      <span
        className={`pointer-events-none absolute font-['Inter'] font-medium uppercase tracking-[.08em] transition-all duration-300 ${
          isRtl ? "right-0" : "left-0"
        } ${
          raised
            ? "top-[5rem] text-[10rem] text-[var(--mvp-accent)]"
            : "top-[28rem] text-[15rem] text-[var(--mvp-primary)]/55"
        }`}
      >
        {label}

        {required && (
          <span
            className={`${
              isRtl ? "mr-[4rem]" : "ml-[4rem]"
            } text-[var(--mvp-accent)]`}
          >
            *
          </span>
        )}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => setValue(event.target.value)}
        className={`h-[72rem] w-full bg-transparent pt-[16rem] font-['Inter'] text-[18rem] text-[var(--mvp-primary)] outline-none max-[700px]:h-[64rem] max-[700px]:text-[16rem] ${
          isRtl ? "text-right" : "text-left"
        }`}
      />
    </label>
  );
}

function SelectField({
  label,
  serviceLabels,
  isRtl,
}: {
  label: string;
  serviceLabels: ContactFormCopy["services"];
  isRtl: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const raised = focused || value.length > 0;

  return (
    <label className="group relative block border-b border-[var(--mvp-primary)]/20 pt-[25rem] transition-colors duration-300 focus-within:border-[var(--mvp-accent)]">
      <span
        className={`pointer-events-none absolute font-['Inter'] font-medium uppercase tracking-[.08em] transition-all duration-300 ${
          isRtl ? "right-0" : "left-0"
        } ${
          raised
            ? "top-[5rem] text-[10rem] text-[var(--mvp-accent)]"
            : "top-[28rem] text-[15rem] text-[var(--mvp-primary)]/55"
        }`}
      >
        {label}
        <span
          className={`${
            isRtl ? "mr-[4rem]" : "ml-[4rem]"
          } text-[var(--mvp-accent)]`}
        >
          *
        </span>
      </span>

      <select
        name="service"
        required
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => setValue(event.target.value)}
        className={`h-[72rem] w-full appearance-none bg-transparent pt-[16rem] font-['Inter'] text-[18rem] text-[var(--mvp-primary)] outline-none max-[700px]:h-[64rem] max-[700px]:text-[16rem] ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        <option value="" disabled />

        {serviceLabels.map((service, index) => (
          <option key={serviceValues[index]} value={serviceValues[index]}>
            {service}
          </option>
        ))}
      </select>

      <svg
        viewBox="0 0 12 8"
        fill="none"
        className={`pointer-events-none absolute bottom-[28rem] h-[8rem] w-[12rem] text-[var(--mvp-primary)] ${
          isRtl ? "left-0" : "right-0"
        }`}
        aria-hidden="true"
      >
        <path
          d="M1 1.25L6 6.25L11 1.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}

function ArrowIcon({ isRtl = false }: { isRtl?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`h-[17rem] w-[17rem] ${isRtl ? "scale-x-[-1]" : ""}`}
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

export default function ContactPageForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const { dictionary, locale } = useI18n();
  const copy = dictionary.contactPage.form;
  const isRtl = locale === "ar";

  const [status, setStatus] = useState<"idle" | "success">("idle");

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-form-label]", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from("[data-form-title-line]", {
          yPercent: 110,
          opacity: 0,
          duration: 0.95,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from("[data-form-copy]", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        gsap.from("[data-form-panel]", {
          y: 70,
          scale: 0.97,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-form-panel]",
            start: "top 86%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("success");

    form.reset();

    window.setTimeout(() => {
      setStatus("idle");
    }, 4500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="bg-[var(--mvp-primary)] py-[120rem] text-white max-[1024px]:py-[75rem]"
    >
      <div className="mvp-container">
        <div className="grid grid-cols-[.8fr_1.2fr] gap-[100rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[55rem]">
          <div>
            <span
              data-form-label
              className="mb-[35rem] block font-['Inter'] text-[13rem] font-medium uppercase tracking-[.15em] text-[var(--mvp-accent)]"
            >
              {/* {copy.label} */}
            </span>

            <h2 className="contact-form-title mb-[40rem] text-[clamp(70rem,6.5vw,125rem)] font-bold uppercase leading-[.82] tracking-[-.04em]">
              {copy.title.map((line) => (
                <span key={line} className="block overflow-hidden pb-[6rem]">
                  <span data-form-title-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <div
              data-form-copy
              className="max-w-[520rem] font-['Inter'] text-[18rem] font-normal leading-[1.5] text-white/70 max-[700px]:text-[16rem]"
            >
              {copy.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={index > 0 ? "mt-[18rem]" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-[65rem] border-t border-white/15 pt-[22rem] max-[1024px]:mt-[40rem]">
              <p className="font-['Inter'] text-[12rem] font-medium uppercase tracking-[.12em] text-white/45">
                {copy.location}
              </p>
            </div>
          </div>

          <div
            data-form-panel
            className="rounded-[12rem] bg-white px-[55rem] py-[55rem] text-[var(--mvp-primary)] max-[700px]:rounded-[8rem] max-[700px]:px-[22rem] max-[700px]:py-[30rem]"
          >
            <div className="mb-[45rem] flex items-center justify-between gap-[20rem] border-b border-[var(--mvp-primary)]/15 pb-[18rem] max-[700px]:mb-[30rem]">
              <span className="font-['Inter'] text-[12rem] font-semibold uppercase tracking-[.12em]">
                {copy.panelTitle}
              </span>

              <span className="font-['Inter'] text-[11rem] font-medium uppercase tracking-[.1em] text-[var(--mvp-primary)]/40">
                {copy.required}
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-x-[38rem] gap-y-[5rem] max-[700px]:grid-cols-1">
                <Field
                  label={copy.fields.fullName}
                  name="full_name"
                  required
                  autoComplete="name"
                  isRtl={isRtl}
                />

                <Field
                  label={copy.fields.companyName}
                  name="company"
                  autoComplete="organization"
                  isRtl={isRtl}
                />

                <Field
                  label={copy.fields.phone}
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  isRtl={isRtl}
                />

                <Field
                  label={copy.fields.email}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  isRtl={isRtl}
                />

                <SelectField
                  label={copy.fields.serviceRequired}
                  serviceLabels={copy.services}
                  isRtl={isRtl}
                />

                <Field
                  label={copy.fields.projectLocation}
                  name="project_location"
                  isRtl={isRtl}
                />

                <Field
                  label={copy.fields.material}
                  name="material"
                  isRtl={isRtl}
                />

                <Field
                  label={copy.fields.timeline}
                  name="timeline"
                  isRtl={isRtl}
                />
              </div>

              <label className="mt-[35rem] block">
                <span className="mb-[14rem] block font-['Inter'] text-[12rem] font-semibold uppercase tracking-[.1em]">
                  {copy.requirementLabel}
                  <span
                    className={`${
                      isRtl ? "mr-[4rem]" : "ml-[4rem]"
                    } text-[var(--mvp-accent)]`}
                  >
                    *
                  </span>
                </span>

                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={copy.requirementPlaceholder}
                  className={`min-h-[150rem] w-full resize-none rounded-[5rem] border border-[var(--mvp-primary)]/15 bg-[#f5f5f7] px-[20rem] py-[18rem] font-['Inter'] text-[16rem] leading-[1.5] text-[var(--mvp-primary)] outline-none transition-colors duration-300 placeholder:text-[var(--mvp-primary)]/35 focus:border-[var(--mvp-accent)] ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                />
              </label>

              <div className="mt-[35rem] flex items-center justify-between gap-[30rem] max-[700px]:flex-col max-[700px]:items-stretch">
                <p className="max-w-[440rem] font-['Inter'] text-[12rem] leading-[1.5] text-[var(--mvp-primary)]/45">
                  {copy.consent}
                </p>

                <button
                  type="submit"
                  className="group flex h-[64rem] min-w-[220rem] items-center justify-between gap-[30rem] rounded-[5rem] bg-[var(--mvp-accent)] px-[24rem] text-[14rem] font-bold uppercase tracking-[.06em] text-white transition-colors duration-500 hover:bg-[var(--mvp-primary)] max-[700px]:w-full"
                >
                  <span>{copy.submit}</span>

                  <span
                    className={`transition-transform duration-500 ${
                      isRtl
                        ? "group-hover:-translate-x-[5rem]"
                        : "group-hover:translate-x-[5rem]"
                    }`}
                  >
                    <ArrowIcon isRtl={isRtl} />
                  </span>
                </button>
              </div>

              <div
                aria-live="polite"
                className={`grid transition-all duration-500 ${
                  status === "success"
                    ? "mt-[25rem] grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="rounded-[5rem] bg-[var(--mvp-primary)] px-[18rem] py-[14rem] font-['Inter'] text-[13rem] text-white">
                    {copy.success}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
