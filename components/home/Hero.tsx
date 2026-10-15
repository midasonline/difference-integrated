"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { HeroServiceSlider } from "@/components/home/HeroServiceSlider";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Hero() {
  const { dictionary, localePath } = useI18n();
  const copy = dictionary.home.hero;

  return (
    <section
      id="hero"
      className="hero relative flex h-screen flex-col justify-end"
    >
      <div className="hero__container di-container relative z-[2] pb-[80rem] max-[1025px]:pb-[40rem]">
        <div className="hero__head main-animated-text relative mb-[100rem] flex items-center justify-between pb-[15rem] text-light max-[1025px]:mb-[80rem] max-[1025px]:pb-[10rem]">
          <div className="hero__abb flex w-full items-center justify-between text-[40rem] leading-[.9] max-[1025px]:text-[max(16px,20rem)]">
            <div
              dir="ltr"
              className="hero__abb-wrapper flex gap-[10rem] max-[1025px]:gap-[20rem]"
            >
              <span className="hero__abb-item inline-block w-[360rem] max-[1025px]:w-auto">
                D.
              </span>

              <span className="hero__abb-item inline-block w-[360rem] max-[1025px]:w-auto">
                I.
              </span>
            </div>

            <span className="hero__abb-text text-[40rem] uppercase max-[1025px]:text-[max(16px,20rem)]">
              {copy.eyebrow}
            </span>
          </div>

          <span className="hero__head-line main-animated-line absolute bottom-0 left-0 h-[1rem] w-0 bg-light/15" />
        </div>

        <div className="hero__container-inner flex items-center justify-between max-[1025px]:flex-col max-[1025px]:items-stretch">
          <h1 className="hero__title main-animated-text max-w-[1100rem] text-[100rem] leading-[.9] uppercase text-light max-[1025px]:mb-[40rem] max-[1025px]:text-[40rem]">
            {copy.title}
          </h1>

          <AnimatedButton href={localePath("/services")} className="hero__btn">
            {copy.servicesButton}
          </AnimatedButton>

          <HeroServiceSlider />
        </div>
      </div>
    </section>
  );
}
