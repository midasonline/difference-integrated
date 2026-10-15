"use client";

import { useLayoutEffect, useRef } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { videoSources } from "@/data/site";

export function HeroVideoScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const hero = scene?.querySelector<HTMLElement>(".hero");
    if (!scene || !hero) return;
    const observer = new ResizeObserver(() => {
      scene.style.setProperty("--hero-height", `${hero.offsetHeight}px`);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={sceneRef} className="hero__video-container relative">
      <div className="hero__video-wrapper pointer-events-none absolute inset-x-0 top-0 z-0 h-screen w-full overflow-hidden">
        <div
          className="hero__video-cover absolute left-1/2 top-full h-full w-full overflow-hidden"
          style={{
            transform: "translateX(-50%) scale(.35) rotate(30deg)",
          }}
        >
          <BackgroundVideo
            src={videoSources.hero}
            poster="/assets/img/home/videos/hero-poster.png"
          />

          <div className="absolute inset-0 z-[1] bg-black/35" />
        </div>
      </div>

      <div className="relative z-10">
        <Hero />
        <About />
      </div>
    </div>
  );
}
