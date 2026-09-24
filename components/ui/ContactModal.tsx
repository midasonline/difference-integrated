"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatedButton } from "./AnimatedButton";

type ContactModalProps = { open: boolean; onClose: () => void };

function ModalField({ label, required = false, type = "text" }: { label: string; required?: boolean; type?: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const raised = focused || value.length > 0;
  return (
    <label className="relative mb-[10rem] flex w-full font-['Inter']">
      <span className={`pointer-events-none absolute left-[40rem] z-[2] font-medium text-[#1f1f61]/40 transition-all duration-300 max-[1024px]:left-[30rem] ${raised ? "top-[calc(50%_-_23rem)] text-[12rem]" : "top-1/2 -translate-y-1/2 text-[16rem]"}`}>{label}{required ? <span className="text-[#1f1f61]"> *</span> : null}</span>
      <input type={type} required={required} value={value} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(event) => setValue(event.target.value)} className="w-full rounded-[5rem] bg-[#f4f4f7] px-[40rem] py-[33rem] text-[16rem] font-medium text-[#141414] outline-none max-[1024px]:p-[30rem]" />
    </label>
  );
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-[20rem]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="relative w-[740rem] rounded-[10rem] bg-white p-[65rem] max-[1024px]:w-[335rem] max-[1024px]:px-[20rem] max-[1024px]:pb-[40rem] max-[1024px]:pt-[60rem]">
        <button type="button" aria-label="Close contact form" onClick={onClose} className="absolute right-[calc(100%_+_20rem)] top-1/2 flex h-[85rem] w-[85rem] -translate-y-1/2 items-center justify-center rounded-[5rem] bg-[#f4f4f7] text-[34rem] text-[#1f1f61] transition hover:bg-[#1f1f61] hover:text-white max-[1024px]:bottom-[calc(100%_+_10rem)] max-[1024px]:left-1/2 max-[1024px]:right-auto max-[1024px]:top-auto max-[1024px]:h-[65rem] max-[1024px]:w-[65rem] max-[1024px]:-translate-x-1/2 max-[1024px]:translate-y-0">×</button>
        <h2 className="mb-[60rem] text-[70rem] leading-[.85] tracking-[-.04em] uppercase text-[#1f1f61] max-[1024px]:mb-[40rem] max-[1024px]:text-[40rem]">We will get back to you as soon as possible.</h2>
        <p className="mb-[15rem] font-['Inter'] text-[16rem] font-medium leading-none tracking-[-.01em] text-[#1f1f61] max-[1024px]:text-[13rem]">We look forward to speaking with you!</p>
        <form onSubmit={submit}>
          <ModalField label="Full name:" required />
          <ModalField label="Phone number:" required type="tel" />
          <ModalField label="E-mail:" type="email" />
          <AnimatedButton type="submit" accent className="inline-flex w-full">Send a request</AnimatedButton>
        </form>
      </div>
    </div>
  );
}
