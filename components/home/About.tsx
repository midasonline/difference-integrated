import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function About() {
  return (
    <section className="py-[130rem] max-[1024px]:pb-[40rem] max-[1024px]:pt-[50rem]">
      <div className="mvp-container">
        <div className="scale-block overflow-hidden rounded-[20rem] bg-[#e9511d] px-[40rem] pb-[20rem] pt-[45rem] text-white max-[1024px]:rounded-[10rem] max-[1024px]:px-[20rem] max-[1024px]:pb-[20rem] max-[1024px]:pt-[30rem]">
          <div className="opacity-block mb-[75rem] flex items-center justify-between border-b border-[#353571] pb-[10rem] uppercase max-[1024px]:mb-[80rem] max-[1024px]:pb-[5rem] max-[1024px]:text-[15rem]">
            <span>About Us</span>
            <span>DIFFERENCE INTEGRATED Logistics</span>
          </div>
          <div className="mb-[90rem] ml-[700rem] mt-[75rem] max-[1024px]:mb-0 max-[1024px]:ml-0 max-[1024px]:mt-0">
            <h2 className="animated-text mb-[20rem] text-[70rem] uppercase max-[1024px]:text-[60rem]">
              BUILT AROUND WHAT NEEDS TO MOVE.
            </h2>
            <div className="opacity-block">
              <p className="mb-[120rem] max-w-[570rem] font-['Inter'] font-normal max-[1024px]:mb-[40rem] max-[1024px]:max-w-full max-[1024px]:text-[18rem]">
                Difference Integrated provides freight movement, material
                transportation, fleet solutions and logistics support across
                Saudi Arabia, backed by an experienced workforce, capable fleet,
                real-time monitoring and compliance-focused operations.{" "}
              </p>
              <AnimatedButton
                href="/about"
                className="inline-flex max-[1024px]:w-full"
              >
                DISCOVER DIFFERENCE INTEGRATED
              </AnimatedButton>
            </div>
          </div>
          <div className="border-t border-[#353571] pt-[15rem] text-center text-[235rem] font-normal leading-none tracking-[-.03em] text-white/5 uppercase max-[1024px]:hidden">
            <div className="ticker">
              <span className="ticker-item">
                FREIGHT • MATERIALS • FLEET • LOGISTICS • SAUDI ARABIA
              </span>
              <span className="ticker-item">Over 20 years on the market</span>
              <span className="ticker-item">Over 20 years on the market</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
