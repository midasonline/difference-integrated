"use client";

import { UIEvent, useState } from "react";
import { advantages } from "@/data/site";

function AdvantageCard({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) {
  return (
    <article className="advantages__scrollbox-item shrink-0 max-[1024px]:snap-start">
      <div className="flex min-h-[320rem] w-[730rem] items-center justify-between rounded-[10rem] bg-light pl-[90rem] pr-[42rem] max-[1024px]:min-h-[240rem] max-[1024px]:w-[335rem] max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-[10rem] max-[1024px]:px-[40rem] max-[1024px]:py-[40rem]">
        <h3 className="max-w-[260rem] text-[60rem] leading-[.85] uppercase text-accent max-[1024px]:max-w-full max-[1024px]:text-[40rem]">
          {heading}
        </h3>

        <p className="max-w-[240rem] font-['Inter'] leading-none text-primary max-[1024px]:max-w-[225rem] max-[1024px]:text-[16rem]">
          {text}
        </p>
      </div>
    </article>
  );
}

export function Advantages() {
  const [progress, setProgress] = useState(0);

  const onScroll = (
    event: UIEvent<HTMLDivElement>
  ) => {
    const node = event.currentTarget;
    const max =
      node.scrollWidth - node.clientWidth;

    setProgress(
      max > 0
        ? node.scrollLeft / max
        : 0
    );
  };

  return (
    <section className="advantages relative max-h-screen bg-white pb-[50rem] pt-[140rem] after:absolute after:inset-x-0 after:bottom-[-1rem] after:h-[3rem] after:bg-white max-[1024px]:max-h-none max-[1024px]:py-[40rem]">
      <div className="mvp-container">
        <div className="flex items-start justify-between max-[1024px]:flex-col max-[1024px]:items-stretch">
          <div className="flex h-[760rem] flex-col justify-between max-[1024px]:h-auto">
            <h2 className="animated-text max-w-[730rem] text-[200rem] leading-[.8] tracking-[-.03em] uppercase text-accent max-[1024px]:mb-[40rem] max-[1024px]:max-w-full max-[1024px]:text-[80rem] max-[1024px]:tracking-normal">
              BUILT FOR THE 
REALITIES OF TRANSPORT.
            </h2>

            <div className="relative h-[2rem] w-[730rem] bg-gold/30 max-[1024px]:hidden">
              <div className="advantages__progressbar-fill absolute inset-y-0 left-0 w-[10%] origin-left bg-accent" />
            </div>
          </div>

          <div
            className="advantages__scrollbox no-scrollbar max-[1024px]:w-full max-[1024px]:overflow-x-auto max-[1024px]:snap-x max-[1024px]:snap-mandatory"
            onScroll={onScroll}
          >
            <div className="flex flex-col gap-[10rem] max-[1024px]:w-max max-[1024px]:flex-row">
              {advantages.map((item) => (
                <AdvantageCard
                  key={item.heading}
                  {...item}
                />
              ))}
            </div>
          </div>

          <div className="relative mt-[20rem] hidden h-[4rem] w-full bg-light max-[1024px]:block">
            <div
              className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
              style={{
                transform: `scaleX(${progress})`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}