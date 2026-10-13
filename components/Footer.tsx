"use client";

import { footerColumns } from "@/data/site";
import { useI18n } from "@/components/i18n/I18nProvider";
import { HoverText } from "@/components/ui/HoverText";

export function Footer() {
  const { dictionary, locale, localePath } = useI18n();
  const copy = dictionary.home.footer;
  const isArabic = locale === "ar";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`footer di-footer ${isArabic ? "di-footer--rtl" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="mvp-container">
        <div className="di-footer__inner">
          <div className="di-footer__top">
            <a
              href={localePath("/")}
              className="di-footer__logo-link"
              aria-label="Difference Integrated Logistics"
            >
              <img
                src="/assets/img/DI-Logo-W.svg"
                alt="Difference Integrated Logistics"
                className="di-footer__logo"
              />
            </a>

            <nav
              className="di-footer__nav"
              aria-label={isArabic ? "روابط التذييل" : "Footer navigation"}
            >
              {footerColumns.map((column, columnIndex) => {
                const translatedColumn = copy.columns[columnIndex];

                return (
                  <div
                    key={column.heading}
                    className={`di-footer__column ${
                      columnIndex === 0 ? "di-footer__column--services" : ""
                    }`}
                  >
                    <a
                      href={localePath(column.href)}
                      className="text-hover di-footer__heading"
                    >
                      <HoverText>
                        {translatedColumn?.heading ?? column.heading}
                      </HoverText>
                    </a>

                    <div className="di-footer__links">
                      {column.items.map((item, itemIndex) => (
                        <a
                          key={`${column.heading}-${item}`}
                          href={localePath(column.href)}
                          className="text-hover di-footer__link"
                        >
                          <HoverText>
                            {translatedColumn?.items[itemIndex] ?? item}
                          </HoverText>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="di-footer__brand-wrap" dir="ltr">
            <div
              className={`di-footer__brand text-center mx-auto w-fit  ${isArabic && "leading-relaxed!"}`}
            >
              {isArabic ? "الفرق المتكامل" : "Difference Integrated"}
            </div>
          </div>

          <div className="di-footer__bottom">
            <div className="di-footer__legal">
              <p className="di-footer__rights">{copy.rights}</p>

              <a
                href={localePath("/privacy-policy")}
                className="text-hover di-footer__privacy"
              >
                <HoverText>{copy.privacy}</HoverText>
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="di-footer__up group"
              aria-label={isArabic ? "العودة إلى أعلى الصفحة" : "Back to top"}
            >
              <span className="di-footer__up-label">{copy.up}</span>

              <span className="di-footer__up-icon" aria-hidden="true">
                <svg viewBox="0 0 30 30" className="h-full w-full">
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
    </footer>
  );
}
