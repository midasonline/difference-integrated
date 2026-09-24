import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { HeroServiceSlider } from "@/components/home/HeroServiceSlider";

export function Hero() {
  return (
    <section
      id="hero"
      className="hero relative flex h-screen flex-col justify-end"
    >
      <div className="hero__container mvp-container relative z-[2] pb-[80rem] max-[1024px]:pb-[40rem]">
        <div className="hero__head main-animated-text relative mb-[100rem] flex items-center justify-between pb-[15rem] text-light max-[1024px]:mb-[80rem] max-[1024px]:pb-[10rem]">
          <div className="hero__abb flex w-full items-center justify-between text-[40rem] leading-[.9] max-[1024px]:text-[20rem]">
            <div className="hero__abb-wrapper flex gap-[10rem] max-[1024px]:gap-[20rem]">
              <span className="hero__abb-item inline-block w-[360rem] max-[1024px]:w-auto">
                D.
              </span>

              <span className="hero__abb-item inline-block w-[360rem] max-[1024px]:w-auto">
                I.
              </span>

              {/* <span className="hero__abb-item inline-block w-[360rem] max-[1024px]:w-auto">
                P.
              </span> */}
            </div>

            <span className="hero__abb-text text-[40rem] uppercase max-[1024px]:text-[20rem]">
              TRANSPORT & LOGISTICS
            </span>
          </div>

          <span className="hero__head-line main-animated-line absolute bottom-0 left-0 h-[1rem] w-0 bg-light/15" />
        </div>

        <div className="hero__container-inner flex items-center justify-between max-[1024px]:flex-col max-[1024px]:items-stretch">
          <h1 className="hero__title main-animated-text max-w-[1100rem] text-[100rem] leading-[.9] uppercase text-light max-[1024px]:mb-[40rem] max-[1024px]:text-[40rem]">
            WE MOVE MORE THAN CARGO WE KEEP OPERATIONS MOVING.
          </h1>

          <AnimatedButton href="/services" className="hero__btn">
            Our services
          </AnimatedButton>

          <HeroServiceSlider />
        </div>
      </div>
    </section>
  );
}
