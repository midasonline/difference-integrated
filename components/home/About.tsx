"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useI18n } from "@/components/i18n/I18nProvider";

export function About() {
  const { dictionary, localePath } = useI18n();
  const copy = dictionary.home.about;

  return (
    <section className="py-[130rem] max-[1024px]:pb-[40rem] max-[1024px]:pt-[50rem]">
      <div className="mvp-container">
        <div className="scale-block overflow-hidden rounded-[20rem] bg-[#e9511d] px-[40rem] pb-[20rem] pt-[45rem] text-white max-[1024px]:rounded-[10rem] max-[1024px]:px-[20rem] max-[1024px]:pb-[20rem] max-[1024px]:pt-[30rem]">
          <div className="opacity-block mb-[75rem] flex items-center justify-between border-b border-[#353571] pb-[10rem] uppercase max-[1024px]:mb-[80rem] max-[1024px]:pb-[5rem] max-[1024px]:text-[15rem]">
            <span>{copy.label}</span>
            <span>{copy.brand}</span>
          </div>
          <div className="mb-[90rem] ml-[700rem] mt-[75rem] max-[1024px]:mb-0 max-[1024px]:ml-0 max-[1024px]:mt-0">
            <h2 className="animated-text mb-[20rem] text-[70rem] uppercase max-[1024px]:text-[60rem]">
              {copy.title}
            </h2>
            <div className="opacity-block">
              <p className="mb-[120rem] max-w-[570rem] font-['Inter'] font-normal max-[1024px]:mb-[40rem] max-[1024px]:max-w-full max-[1024px]:text-[18rem]">
                {copy.description}
              </p>
              <AnimatedButton
                href={localePath("/about")}
                className="inline-flex max-[1024px]:w-full"
              >
                {copy.button}
              </AnimatedButton>
            </div>
          </div>
          <div className="border-t border-[#353571] pt-[15rem] text-center text-[235rem] font-normal leading-none tracking-[-.03em] text-white/5 uppercase max-[1024px]:hidden">
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
