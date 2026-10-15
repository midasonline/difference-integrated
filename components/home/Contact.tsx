"use client";

import { FormEvent, useState } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useI18n } from "@/components/i18n/I18nProvider";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", required = false }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const raised = focused || value.length > 0;

  return (
    <label className="relative block w-full">
      <span
        className={`pointer-events-none absolute start-[22rem] z-[2] font-['Inter'] font-medium text-primary/45 transition-all duration-300 ${
          raised
            ? "top-[11rem] text-[max(12px,11rem)]"
            : "top-1/2 -translate-y-1/2 text-[max(16px,15rem)]"
        }`}
      >
        {label}

        {required ? <span className="text-accent"> *</span> : null}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => setValue(event.target.value)}
        className="h-[68rem] w-full rounded-[6rem] border border-gold/25 bg-light px-[22rem] pb-[10rem] pt-[27rem] font-['Inter'] text-[max(16px,15rem)] font-medium text-primary outline-none transition-all duration-300 focus:border-accent"
      />
    </label>
  );
}

export function Contact() {
  const { dictionary } = useI18n();
  const copy = dictionary.home.contact;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      id="contact"
      className="relative z-[2] bg-white py-[90rem] max-[1025px]:py-[40rem]"
    >
      <div className="di-container">
        <div className="scale-block relative z-[2] overflow-hidden rounded-[20rem] bg-light px-[50rem] pb-[60rem] pt-[45rem] before:hidden after:hidden max-[1025px]:rounded-[10rem] max-[1025px]:px-[20rem] max-[1025px]:pb-[25rem] max-[1025px]:pt-[30rem]">
          <div className="opacity-block mb-[85rem] flex items-center justify-between border-b border-gold/40 pb-[12rem] uppercase max-[1025px]:mb-[55rem]">
            <span className="text-[max(16px,18rem)] text-primary max-[1025px]:hidden">
              {copy.feedback}
            </span>

            <span className="text-[max(16px,18rem)] text-accent">
              {copy.audience}
            </span>
          </div>

          <div className="mb-[80rem] max-[1025px]:mb-[50rem]">
            <h2 className="animated-text w-full text-[190rem] leading-[0.82] tracking-[-.025em] uppercase text-accent max-[1025px]:text-[72rem]">
              {copy.headingAccent}
            </h2>

            <h2 className="animated-text w-full text-[190rem] leading-[0.82] tracking-[-.025em] uppercase text-primary max-[1025px]:text-[72rem]">
              {copy.headingPrimary}
            </h2>
          </div>

          <div className="opacity-block grid grid-cols-[1fr_1fr] items-end gap-[120rem] max-[1025px]:grid-cols-1 max-[1025px]:gap-[45rem]">
            <div>
              <span className="mb-[18rem] block text-[max(16px,15rem)] uppercase tracking-[0.12em] text-accent">
                {copy.introLabel}
              </span>

              <p className="max-w-[560rem] text-[42rem] leading-[1] uppercase text-primary max-[1025px]:max-w-full max-[1025px]:text-[28rem]">
                {copy.introTitle}
              </p>

              <p className="mt-[28rem] max-w-[480rem] font-['Inter'] text-[max(16px,16rem)] font-normal leading-[1.55] text-primary/60 max-[1025px]:max-w-full max-[1025px]:text-[max(16px,15rem)]">
                {copy.introText}
              </p>

              <div className="mt-[55rem] flex items-center gap-[12rem] border-t border-gold/40 pt-[20rem] max-[1025px]:mt-[35rem]">
                <span className="h-[8rem] w-[8rem] shrink-0 rounded-full bg-accent" />

                <span className="text-[max(16px,16rem)] uppercase text-primary">
                  {copy.supportLabel}
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[12rem] bg-primary p-[32rem] max-[1025px]:p-[20rem]">
              <span className="absolute left-0 top-0 h-[3rem] w-full bg-accent" />

              <div className="mb-[28rem] flex items-start justify-between gap-[20rem]">
                <div>
                  <span className="mb-[7rem] block text-[max(13px,13rem)] uppercase tracking-[0.12em] text-accent">
                    {copy.enquiryLabel}
                  </span>

                  <h3 className="text-[40rem] leading-[.9] uppercase text-light max-[1025px]:text-[32rem]">
                    {copy.formTitle}
                  </h3>
                </div>

                <span className="flex h-[40rem] w-[40rem] shrink-0 items-center justify-center rounded-full border border-light/20 text-accent">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-[13rem] w-[13rem]"
                    aria-hidden="true"
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
              </div>

              <form onSubmit={submit} className="flex flex-col gap-[10rem]">
                <div className="grid grid-cols-2 gap-[10rem] max-[700px]:grid-cols-1">
                  <Field label={copy.fullName} name="name" required />

                  <Field label={copy.phone} name="phone" type="tel" required />
                </div>

                <Field label={copy.email} name="email" type="email" />

                <AnimatedButton
                  type="submit"
                  accent
                  className="mt-[4rem] w-full"
                >
                  {copy.submit}
                </AnimatedButton>
              </form>

              <p className="mt-[16rem] font-['Inter'] text-[max(12px,11rem)] font-normal leading-[1.4] text-light/40">
                {copy.responseNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
