import { clients } from "@/data/site";

export function Clients() {
  return (
    <section className="py-[120rem] pb-[90rem] max-[1024px]:py-[80rem] max-[1024px]:pb-[40rem]">
      <div className="mvp-container">
        <h2 className="animated-text mb-[65rem] max-w-[730rem] text-[200rem] leading-[.8] uppercase max-[1024px]:mb-[40rem] max-[1024px]:max-w-full max-[1024px]:text-[80rem]">
          <span className="text-accent">Partners</span>{" "}
          <span className="text-light">Clients</span>
        </h2>

        <div className="flex flex-wrap gap-[10rem] max-[1024px]:gap-[15rem]">
          {clients.map((client, index) => (
            <article
              key={client.number}
              className={`relative flex h-[385rem] w-[545rem] items-center justify-center rounded-[20rem] border border-light/10 bg-light/[.05] backdrop-blur-[50rem] max-[1024px]:h-[120rem] max-[1024px]:w-[160rem] max-[1024px]:rounded-[5rem] max-[1024px]:backdrop-blur-[15rem] ${
                index === 0 ? "ml-[740rem] max-[1024px]:ml-0" : ""
              }`}
            >
              <span className="absolute left-[40rem] top-[40rem] text-[20rem] text-light/50 max-[1024px]:left-[12rem] max-[1024px]:top-[12rem] max-[1024px]:text-[12rem]">
                {client.number}
              </span>

              <img
                src={client.logo}
                alt={client.alt}
                className="w-[230rem] max-[1024px]:w-[100rem]"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
