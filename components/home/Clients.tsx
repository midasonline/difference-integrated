"use client";

import { clients } from "@/data/site";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Clients() {
  const { dictionary } = useI18n();
  const copy = dictionary.home.clients;

  return (
    <section className="clients py-[120rem] pb-[90rem] max-[1025px]:py-[80rem] max-[1025px]:pb-[40rem]">
      <div className="di-container">
        <h2 className="animated-text mb-[65rem] max-w-[730rem] text-[200rem] leading-[.8] uppercase max-[1025px]:mb-[40rem] max-[1025px]:max-w-full max-[1025px]:text-[80rem]">
          <span className="text-accent">{copy.partners}</span>{" "}
          <span className="text-light">{copy.clients}</span>
        </h2>

        <div className="flex flex-wrap gap-[10rem] max-[1025px]:gap-[15rem]">
          {clients.map((client, index) => (
            <article
              key={client.number}
              className={`clients__card relative flex h-[385rem] w-[545rem] items-center justify-center rounded-[20rem] border border-light/10 bg-light/[.05] backdrop-blur-[50rem] max-[1025px]:h-[120rem] max-[1025px]:w-[160rem] max-[1025px]:rounded-[5rem] max-[1025px]:backdrop-blur-[15rem] ${
                index === 0 ? "ml-[740rem] max-[1025px]:ml-0" : ""
              }`}
            >
              <span className="absolute left-[40rem] top-[40rem] text-[max(16px,20rem)] text-light/50 max-[1025px]:left-[12rem] max-[1025px]:top-[12rem] max-[1025px]:text-[max(12px,12rem)]">
                {client.number}
              </span>

              <img
                src={client.logo}
                alt={client.alt}
                className="w-[230rem] max-[1025px]:w-[100rem]"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
