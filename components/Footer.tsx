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
      <div className="di-container">
        <div className="di-footer__inner">
          <div className="di-footer__top">
            <div className="max-w-[360rem] shrink-0">
              <a
                href={localePath("/")}
                className="di-footer__logo-link"
                aria-label="Difference Integrated Logistics"
              >
                <img
                  src="/assets/img/DI-Logo-WO.svg"
                  alt="Difference Integrated Logistics"
                  className="di-footer__logo"
                />
              </a>
              <br></br>
              <br></br>

              <address className="mt-[22rem] max-w-[340rem] not-italic text-[14rem] leading-[1.65] text-white/70 max-[1024px]:mt-[18rem] max-[640px]:mt-[16rem] max-[640px]:text-[13rem]">
                6995 King Fahd Branch Road, Utaiqah Dist, Riyadh 12653 - Unit 34
                B, Saudi Arabia
              </address>
            </div>

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
              className={`di-footer__brand text-nowrap text-center mx-auto w-fit ${
                isArabic && "leading-relaxed!"
              }`}
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
          </div>
        </div>
      </div>
    </footer>
  );
}
