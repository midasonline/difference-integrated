"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatedButton } from "./AnimatedButton";
import { useI18n } from "@/components/i18n/I18nProvider";

type ContactModalProps = { open: boolean; onClose: () => void };

function ModalField({
  label,
  required = false,
  type = "text",
}: {
  label: string;
  required?: boolean;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const raised = focused || value.length > 0;

  return (
    <label className="relative mb-[10rem] flex w-full font-['Inter']">
      <span
        className={`pointer-events-none absolute start-[40rem] z-[2] font-medium text-[#1f1f61]/40 transition-all duration-300 max-[1025px]:start-[30rem] ${
          raised
            ? "top-[11px] text-[12px]"
            : "top-1/2 -translate-y-1/2 text-[max(16px,16rem)]"
        }`}
      >
        {label}
        {required ? <span className="text-[#1f1f61]"> *</span> : null}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => setValue(event.target.value)}
        className="w-full rounded-[5rem] bg-[#f4f4f7] px-[40rem] py-[33rem] text-[max(16px,16rem)] font-medium text-[#141414] outline-none max-[1025px]:p-[30rem]"
      />
    </label>
  );
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const { dictionary } = useI18n();
  const copy = dictionary.common.contactModal;

  useEffect(() => {
    if (!open) return;

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <div
      className="contact-modal fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-[20rem]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="contact-modal__panel relative w-[740rem] rounded-[10rem] bg-white p-[65rem] max-[1025px]:w-[335rem] max-[1025px]:px-[20rem] max-[1025px]:pb-[40rem] max-[1025px]:pt-[60rem]">
        <button
          type="button"
          aria-label={copy.close}
          onClick={onClose}
          className="contact-modal__close absolute flex items-center justify-center rounded-[5rem] bg-[#f4f4f7] text-[34rem] text-[#1f1f61]"
        >
          ×
        </button>
        <h2 className="mb-[60rem] text-[70rem] leading-[.85] tracking-[-.04em] uppercase text-[#1f1f61] max-[1025px]:mb-[40rem] max-[1025px]:text-[40rem]">
          {copy.title}
        </h2>
        <p className="mb-[15rem] font-['Inter'] text-[max(16px,16rem)] font-medium leading-none tracking-[-.01em] text-[#1f1f61] max-[1025px]:text-[max(13px,13rem)]">
          {copy.intro}
        </p>
        <form onSubmit={submit}>
          <ModalField label={copy.fullName} required />
          <ModalField label={copy.phone} required type="tel" />
          <ModalField label={copy.email} type="email" />
          <AnimatedButton type="submit" accent className="inline-flex w-full">
            {copy.submit}
          </AnimatedButton>
        </form>
      </div>
    </div>
  );
}
