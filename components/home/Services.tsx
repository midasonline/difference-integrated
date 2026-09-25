import Image from "next/image";

import { services } from "@/data/site";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

type ServiceImageFit = "cover" | "contain" | "fill";

/*
 * IMAGE FIT OPTION
 *
 * "cover"   = box completely fill hoga, thori cropping ho sakti hai
 * "contain" = poori image nazar aayegi, empty space aa sakti hai
 * "fill"    = poora box fill hoga, image stretch ho sakti hai
 *
 * Recommended: "cover"
 */
const SERVICE_IMAGE_FIT: ServiceImageFit = "cover";

const serviceImageFitClass: Record<ServiceImageFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
};

function ServiceCard({
  item,
  index,
}: {
  item: (typeof services)[number];
  index: number;
}) {
  const accentCard = item.accent;

  return (
    <article
      className={`services__item services__item-${index + 1} absolute left-1/2 top-1/2 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[20rem] ${
        accentCard ? "bg-accent" : "bg-light"
      }`}
      style={{
        transform:
          index === 0 ? "translate(-50%, -50%)" : "translate(-50%, 100%)",
      }}
    >
      <div className="services__item-inner flex items-center gap-[100rem]">
        <span
          className={`services__item-number text-[260rem] leading-none tracking-[-.02em] ${
            accentCard ? "text-light" : "text-accent"
          }`}
        >
          {item.number}
        </span>

        <div className="services__item-wrapper w-[460rem]">
          <h3
            className={`services__item-heading mb-[26rem] text-[60rem] leading-[.9] uppercase ${
              accentCard ? "text-light" : "text-primary"
            }`}
          >
            {item.heading}
          </h3>

          <p
            className={`services__item-text max-w-[250rem] font-['Inter'] text-[20rem] leading-none ${
              accentCard ? "text-light" : "text-primary"
            }`}
          >
            {item.text}
          </p>
        </div>
      </div>

      <a
        href="/services"
        aria-label={item.heading}
        className={`service-card__action group absolute bottom-[55rem] left-1/2 z-[20] flex h-[85rem] min-h-[85rem] w-[85rem] min-w-[85rem] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[5rem] border-0 p-0 transition-colors duration-300 ease-out ${
          accentCard
            ? "bg-light hover:bg-primary"
            : "bg-primary hover:bg-accent"
        }`}
      >
        <span className="relative z-[2] block h-[20rem] w-[20rem] transition-transform duration-300 ease-out group-hover:rotate-180">
          <span
            className={`absolute left-1/2 top-1/2 block h-[2rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
              accentCard ? "bg-accent group-hover:bg-light" : "bg-light"
            }`}
          />

          <span
            className={`absolute left-1/2 top-1/2 block h-[20rem] w-[2rem] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
              accentCard ? "bg-accent group-hover:bg-light" : "bg-light"
            }`}
          />
        </span>
      </a>
    </article>
  );
}

export function Services() {
  return (
    <section className="services bg-white py-[180rem] max-[1024px]:pb-[80rem] max-[1024px]:pt-[40rem]">
      <div className="mvp-container">
        <div className="services__container flex h-[920rem] gap-[10rem] max-[1024px]:h-auto max-[1024px]:gap-0">
          <div className="services__container-inner relative isolate flex w-[915rem] flex-col justify-between overflow-hidden rounded-[20rem] bg-primary px-[60rem] pb-[55rem] pt-[120rem] text-light max-[1024px]:w-full max-[1024px]:rounded-[10rem] max-[1024px]:px-[20rem] max-[1024px]:pb-[20rem] max-[1024px]:pt-[50rem]">
            <div className="services__visuals absolute inset-0 z-0 overflow-hidden bg-primary">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`services__visual services__visual-${index + 1} absolute inset-0`}
                  style={{
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.heading}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1025px) 50vw, 100vw"
                    className={`${serviceImageFitClass[SERVICE_IMAGE_FIT]} object-center`}
                  />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 z-[1] bg-primary/30" />

            <h2 className="services__title animated-text relative z-[3] max-w-[730rem] text-[200rem] leading-[.8] tracking-[-.03em] uppercase text-light max-[1024px]:mb-[60rem] max-[1024px]:max-w-full max-[1024px]:text-[80rem]">
              Our Services
            </h2>

            <AnimatedButton
              href="/services"
              className="services__btn relative z-[3]"
            >
              All our services
            </AnimatedButton>

            <div className="services__progressbar relative z-[3] h-[2rem] w-full bg-light/10">
              <div
                className="services__progressbar-fill absolute inset-y-0 left-0 origin-left bg-accent"
                style={{
                  width: `${100 / services.length}%`,
                }}
              />
            </div>
          </div>

          <div className="services__items relative w-[915rem]">
            {services.map((item, index) => (
              <ServiceCard key={item.number} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
