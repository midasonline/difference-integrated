"use client";

import { FormEvent, useState } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

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
        className={`pointer-events-none absolute left-[22rem] z-[2] font-['Inter'] font-medium text-primary/45 transition-all duration-300 ${
          raised
            ? "top-[11rem] text-[11rem]"
            : "top-1/2 -translate-y-1/2 text-[15rem]"
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
        className="h-[68rem] w-full rounded-[6rem] border border-gold/25 bg-light px-[22rem] pb-[10rem] pt-[27rem] font-['Inter'] text-[15rem] font-medium text-primary outline-none transition-all duration-300 focus:border-accent"
      />
    </label>
  );
}

export function Contact() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      id="contact"
      className="relative z-[2] bg-white py-[90rem] max-[1024px]:py-[40rem]"
    >
      <div className="mvp-container">
        <div className="scale-block relative z-[2] overflow-hidden rounded-[20rem] bg-light px-[50rem] pb-[60rem] pt-[45rem] before:hidden after:hidden max-[1024px]:rounded-[10rem] max-[1024px]:px-[20rem] max-[1024px]:pb-[25rem] max-[1024px]:pt-[30rem]">
          <div className="opacity-block mb-[85rem] flex items-center justify-between border-b border-gold/40 pb-[12rem] uppercase max-[1024px]:mb-[55rem]">
            <span className="text-[18rem] text-primary max-[1024px]:hidden">
              Feedback
            </span>

            <span className="text-[18rem] text-accent">Clients & Partners</span>
          </div>

          <div className="mb-[80rem] max-[1024px]:mb-[50rem]">
            <h2 className="animated-text w-full text-[190rem] leading-[0.82] tracking-[-.025em] uppercase text-accent max-[1024px]:text-[72rem]">
              Moving Forward
            </h2>

            <h2 className="animated-text w-full text-[190rem] leading-[0.82] tracking-[-.025em] uppercase text-primary max-[1024px]:text-[72rem]">
              Together.
            </h2>
          </div>

          <div className="opacity-block grid grid-cols-[1fr_1fr] items-end gap-[120rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[45rem]">
            <div>
              <span className="mb-[18rem] block text-[15rem] uppercase tracking-[0.12em] text-accent">
                Let&apos;s Move
              </span>

              <p className="max-w-[560rem] text-[42rem] leading-[1] uppercase text-primary max-[1024px]:max-w-full max-[1024px]:text-[28rem]">
                Tell us what needs to move, where it needs to go and when it
                needs to arrive.
              </p>

              <p className="mt-[28rem] max-w-[480rem] font-['Inter'] text-[16rem] font-normal leading-[1.55] text-primary/60 max-[1024px]:max-w-full max-[1024px]:text-[15rem]">
                Share your requirements and our team will help coordinate the
                transportation around your cargo, schedule and destination.
              </p>

              <div className="mt-[55rem] flex items-center gap-[12rem] border-t border-gold/40 pt-[20rem] max-[1024px]:mt-[35rem]">
                <span className="h-[8rem] w-[8rem] shrink-0 rounded-full bg-accent" />

                <span className="text-[16rem] uppercase text-primary">
                  Transport & Logistics Support
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[12rem] bg-primary p-[32rem] max-[1024px]:p-[20rem]">
              <span className="absolute left-0 top-0 h-[3rem] w-full bg-accent" />

              <div className="mb-[28rem] flex items-start justify-between gap-[20rem]">
                <div>
                  <span className="mb-[7rem] block text-[13rem] uppercase tracking-[0.12em] text-accent">
                    Quick Enquiry
                  </span>

                  <h3 className="text-[40rem] leading-[.9] uppercase text-light max-[1024px]:text-[32rem]">
                    Plan Your Next Move
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
                  <Field label="Full name" name="name" required />

                  <Field
                    label="Phone number"
                    name="phone"
                    type="tel"
                    required
                  />
                </div>

                <Field label="E-mail address" name="email" type="email" />

                <AnimatedButton
                  type="submit"
                  accent
                  className="mt-[4rem] w-full"
                >
                  LET’S PLAN THE NEXT MOVE.
                </AnimatedButton>
              </form>

              <p className="mt-[16rem] font-['Inter'] text-[11rem] font-normal leading-[1.4] text-light/40">
                Our team will review your request and get back to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
