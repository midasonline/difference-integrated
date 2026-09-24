"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type PageTransitionProps = {
  initialCovered?: boolean;
};

export function PageTransition({
  initialCovered = false,
}: PageTransitionProps) {
  const transitioningRef = useRef(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const samePage =
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search;
      if (samePage && nextUrl.hash) return;
      if (nextUrl.href === window.location.href) return;

      event.preventDefault();

      if (transitioningRef.current) return;
      transitioningRef.current = true;

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.inOut",
          duration: 2,
        },
      });

      timeline
        .set(".transition-plug__inner", { top: 0, bottom: "auto" }, 0)
        .set(".transition-plug", { yPercent: -105 }, 0)
        .set(".transition-plug__inner", { height: 0 }, 0)
        .to(".transition-plug", { yPercent: 0 }, 0)
        .to(".transition-plug__inner", { height: "100%" }, 0.05);

      window.setTimeout(() => {
        window.location.href = nextUrl.href;
      }, 2500);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className="transition-plug pointer-events-none fixed inset-0 z-[60] bg-[var(--mvp-light)]"
      style={{
        transform: initialCovered ? "translateY(0%)" : "translateY(-105%)",
      }}
      aria-hidden="true"
    >
      <div
        className="transition-plug__inner absolute left-0 w-full bg-[var(--mvp-primary)]"
        style={
          initialCovered
            ? { top: "auto", bottom: 0, height: "100%" }
            : { top: 0, bottom: "auto", height: 0 }
        }
      />
    </div>
  );
}
