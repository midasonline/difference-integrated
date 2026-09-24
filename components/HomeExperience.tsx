"use client";

import { useRef } from "react";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/ui/Preloader";
import { PageTransition } from "@/components/ui/PageTransition";
import { HeroVideoScene } from "@/components/home/HeroVideoScene";
import { Advantages } from "@/components/home/Advantages";
import { Services } from "@/components/home/Services";
import { FooterVideoScene } from "@/components/home/FooterVideoScene";
import { useMvpAnimations } from "@/lib/useMvpAnimations";

export function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useMvpAnimations(rootRef);

  return (
    <div ref={rootRef}>
      <Preloader />

      <PageTransition />

      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content" className="overflow-hidden">
          <HeroVideoScene />

          <Advantages />

          <Services />

          <FooterVideoScene />
        </div>
      </div>
    </div>
  );
}
