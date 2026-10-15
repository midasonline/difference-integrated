"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useI18n } from "@/components/i18n/I18nProvider";

export function About() {
  const { dictionary, localePath } = useI18n();
  const copy = dictionary.home.about;

  return (
    <section className="py-[130rem] max-[1025px]:pb-[40rem] max-[1025px]:pt-[50rem]">
      <div className="di-container">
        <div className="scale-block overflow-hidden rounded-[20rem] bg-[#e9511d] px-[40rem] pb-[20rem] pt-[45rem] text-white max-[1025px]:rounded-[10rem] max-[1025px]:px-[20rem] max-[1025px]:pb-[20rem] max-[1025px]:pt-[30rem]">
          <div className="opacity-block mb-[75rem] flex items-center justify-between border-b border-[#353571] pb-[10rem] uppercase max-[1025px]:mb-[80rem] max-[1025px]:pb-[5rem] max-[1025px]:text-[max(16px,15rem)]">
            <span>{copy.label}</span>
            <span>{copy.brand}</span>
          </div>
          <div className="home-about__copy mb-[90rem] ms-[700rem] mt-[75rem] max-[1025px]:mb-0 max-[1025px]:ms-0 max-[1025px]:mt-0">
            <h2 className="animated-text mb-[20rem] text-[70rem] uppercase max-[1025px]:text-[60rem]">
              {copy.title}
            </h2>
            <div className="opacity-block">
              <p className="mb-[120rem] max-w-[570rem] font-['Inter'] font-normal max-[1025px]:mb-[40rem] max-[1025px]:max-w-full max-[1025px]:text-[max(16px,18rem)]">
                {copy.description}
              </p>
              <AnimatedButton
                href={localePath("/about")}
                className="inline-flex max-[1025px]:w-full"
              >
                {copy.button}
              </AnimatedButton>
            </div>
          </div>
          <div className="border-t border-[#353571] pt-[15rem] text-center text-[235rem] font-normal leading-none tracking-[-.03em] text-white/5 uppercase max-[1025px]:hidden">
            <div className="ticker">
              <span className="ticker-item">{copy.tickerPrimary}</span>
              <span className="ticker-item">{copy.tickerSecondary}</span>
              <span className="ticker-item">{copy.tickerSecondary}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
