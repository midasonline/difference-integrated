"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother);

    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(0, true);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`group fixed bottom-[30rem] right-[30rem] z-[90] flex h-[68rem] w-[68rem] items-center justify-center overflow-hidden rounded-[6rem] border border-light/20 bg-accent text-light shadow-[0_15px_40px_rgba(20,20,20,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary max-[1024px]:bottom-[18rem] max-[1024px]:right-[18rem] max-[1024px]:h-[54rem] max-[1024px]:w-[54rem] ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[25rem] opacity-0"
      }`}
    >
      <span className="relative flex h-[24rem] w-[24rem] items-center justify-center overflow-hidden max-[1024px]:h-[20rem] max-[1024px]:w-[20rem]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="absolute h-[20rem] w-[20rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[30rem] max-[1024px]:h-[17rem] max-[1024px]:w-[17rem]"
          aria-hidden="true"
        >
          <path
            d="M12 19V5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          <path
            d="M6.5 10.5L12 5L17.5 10.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="absolute h-[20rem] w-[20rem] translate-y-[30rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 max-[1024px]:h-[17rem] max-[1024px]:w-[17rem]"
          aria-hidden="true"
        >
          <path
            d="M12 19V5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          <path
            d="M6.5 10.5L12 5L17.5 10.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
