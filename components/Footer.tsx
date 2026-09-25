"use client";

import { footerColumns } from "@/data/site";
import { HoverText } from "@/components/ui/HoverText";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer bg-transparent pt-[120rem] text-[#f4f1ea] max-[1024px]:pt-[80rem]">
      <div className="mvp-container">
        <div className="flex flex-col gap-[275rem] max-[1024px]:gap-[60rem]">
          <div className="flex items-start justify-between max-[1024px]:flex-col max-[1024px]:items-stretch">
            <a
              href="/"
              className="flex max-[1024px]:hidden"
            >
              <img
                src="/assets/img/DI-Logo-W.svg"
                alt="MVP"
                className="w-[250rem]"
              />
            </a>

            <nav className="flex w-[1100rem] justify-between gap-[170rem] max-[1024px]:w-full max-[1024px]:flex-col max-[1024px]:gap-[40rem]">
              {footerColumns.map((column) => (
                <div key={column.heading} className="flex flex-col">
                  <a
                    href={column.href}
                    className="text-hover mb-[60rem] text-[30rem] uppercase max-[1024px]:mb-[20rem] max-[1024px]:text-[20rem]"
                  >
                    <HoverText>{column.heading}</HoverText>
                  </a>

                  {column.items.map((item) => (
                    <a
                      key={item}
                      href={column.href}
                      className="text-hover mb-[10rem] text-[18rem] font-normal last:mb-0 max-[1024px]:text-[16rem] max-[1024px]:leading-[1.1]"
                    >
                      <HoverText>{item}</HoverText>
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-[30rem] flex border-t border-[#f4f1ea]/20 pt-[30rem] text-[240rem] leading-[.9] uppercase max-[1024px]:mb-[15rem] max-[1024px]:pt-[15rem] max-[1024px]:text-[47rem]">
              Difference Integrated
            </div>

            <div className="flex items-center justify-between border-t border-[#f4f1ea]/20 py-[20rem] max-[1024px]:pb-[20rem] max-[1024px]:pt-[15rem]">
              <div className="flex w-[1100rem] items-center justify-between max-[1024px]:w-auto">
                <div className="w-[360rem] text-[12rem] uppercase max-[1024px]:w-auto max-[1024px]:text-[10rem] max-[1024px]:text-[#f4f1ea]/50">
                  M.V.P. Trans-logistics 2025 all rights reserved.
                </div>

                <a
                  href="/privacy-policy"
                  className="text-hover text-[12rem] uppercase max-[1024px]:hidden"
                >
                  <HoverText>Privacy Policy</HoverText>
                </a>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                className="group flex items-center gap-[15rem] text-[12rem] uppercase text-[#f4f1ea] max-[1024px]:gap-[10rem] max-[1024px]:text-[10rem]"
              >
                <span className="transition-colors duration-300 group-hover:text-[#e9511d]">
                  Up
                </span>

                <span className="flex h-[30rem] w-[30rem] items-center justify-center rounded-[2rem] border border-[#f4f1ea]/20 bg-[#f4f1ea]/10 text-[#f4f1ea] transition-all duration-300 group-hover:border-[#e9511d] group-hover:bg-[#e9511d] group-hover:text-[#f4f1ea]">
                  <svg
                    viewBox="0 0 30 30"
                    className="h-full w-full"
                    aria-hidden="true"
                  >
                    <path
                      d="M15 9l6 7-1.5 1.3L16 13.2V22h-2v-8.8l-3.5 4.1L9 16l6-7z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
