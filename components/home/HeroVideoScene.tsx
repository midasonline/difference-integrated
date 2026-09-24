import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { videoSources } from "@/data/site";

export function HeroVideoScene() {
  return (
    <div className="hero__video-container relative">
      <div className="hero__video-wrapper pointer-events-none absolute inset-x-0 top-0 z-0 h-screen w-full overflow-hidden">
        <div
          className="hero__video-cover hero-mobile-poster absolute left-1/2 top-full h-full w-full overflow-hidden"
          style={{
            transform: "translateX(-50%) scale(.35) rotate(30deg)",
          }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover object-center max-[1024px]:hidden"
            loop
            autoPlay
            preload="auto"
            muted
            playsInline
            src={videoSources.hero}
            poster="/assets/img/home/videos/hero-poster.png"
          />

          <div className="absolute inset-0 z-[1] bg-black/35 max-[1024px]:hidden" />
        </div>
      </div>

      <div className="relative z-10">
        <Hero />
        <About />
      </div>
    </div>
  );
}
