"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

type HoverTextProps = {
  children: string;
  secondClassName?: string;
};

export function HoverText({ children, secondClassName = "" }: HoverTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    gsap.registerPlugin(SplitText);

    const firstLine = root.querySelector<HTMLElement>(".text-hover-elem-1");

    const secondLine = root.querySelector<HTMLElement>(".text-hover-elem-2");

    if (!firstLine || !secondLine) return;

    const isRtl = document.documentElement.dir === "rtl";
    const splitConfig = isRtl
      ? { type: "words" as const, wordsClass: "word" }
      : {
          type: "chars,words" as const,
          charsClass: "char",
          wordsClass: "word",
        };

    const firstSplit = new SplitText(firstLine, splitConfig);
    const secondSplit = new SplitText(secondLine, splitConfig);

    const firstTargets = (isRtl ? firstSplit.words : firstSplit.chars) as HTMLElement[];
    const secondTargets = (isRtl ? secondSplit.words : secondSplit.chars) as HTMLElement[];

    gsap.set(firstTargets, {
      yPercent: 0,
    });

    gsap.set(secondTargets, {
      yPercent: 0,
    });

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        stagger: 0.015,
        duration: 0.35,
        ease: "power3.out",
      },
    });

    timeline
      .to(
        firstTargets,
        {
          yPercent: -120,
        },
        0,
      )
      .to(
        secondTargets,
        {
          yPercent: -100,
        },
        0,
      );

    const hoverTarget = root.closest<HTMLElement>(".text-hover") ?? root;

    const handleEnter = () => {
      timeline.play();
    };

    const handleLeave = () => {
      timeline.reverse();
    };

    hoverTarget.addEventListener("mouseenter", handleEnter);

    hoverTarget.addEventListener("mouseleave", handleLeave);

    return () => {
      hoverTarget.removeEventListener("mouseenter", handleEnter);

      hoverTarget.removeEventListener("mouseleave", handleLeave);

      timeline.kill();

      firstSplit.revert();
      secondSplit.revert();
    };
  }, [children]);

  return (
    <span ref={rootRef} className="text-hover-inner">
      <span className="text-hover-elem text-hover-elem-1">{children}</span>

      <span className={`text-hover-elem text-hover-elem-2 ${secondClassName}`}>
        {children}
      </span>
    </span>
  );
}
