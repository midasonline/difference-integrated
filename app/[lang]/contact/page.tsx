"use client";

import { useLayoutEffect, useRef, type ElementType } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FiArrowUpRight,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

import ContactPageForm from "@/components/contact/ContactPageForm";
import { PageTransition } from "@/components/ui/PageTransition";

const ADDRESS =
  "6995 King Fahd Branch Road, Utaiqah Dist, Riyadh 12653 - Unit 34 B, Saudi Arabia";

const EMAIL = "info@differenceintegrated.sa";

const WEBSITE = "https://differenceintegrated.sa";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/difference-integrated/";

const MAP_QUERY = encodeURIComponent(ADDRESS);

const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

type ContactDetailProps = {
  icon: ElementType;
  label: string;
  value: string;
  description?: string;
  href?: string;
  external?: boolean;
};

function ContactDetail({
  icon: Icon,
  label,
  value,
  description,
  href,
  external = false,
}: ContactDetailProps) {
  const content = (
    <>
      <div className="contact-detail__main">
        <div className="contact-detail__icon">
          <Icon />
        </div>

        <div className="contact-detail__content">
          <span className="contact-body contact-detail__label">{label}</span>

          <span className="contact-detail__value">{value}</span>

          {description && (
            <span className="contact-body contact-detail__description">
              {description}
            </span>
          )}
        </div>
      </div>

      {href && <FiArrowUpRight className="contact-detail__arrow" />}
    </>
  );

  const className = "contact-detail contact-reveal";

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {content}
    </a>
  );
}

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const transitionPlug =
        root.querySelector<HTMLElement>(".transition-plug");

      const transitionInner = root.querySelector<HTMLElement>(
        ".transition-plug__inner",
      );

      if (reducedMotion) {
        if (transitionPlug) {
          gsap.set(transitionPlug, {
            yPercent: 105,
          });
        }

        if (transitionInner) {
          gsap.set(transitionInner, {
            height: "0%",
          });
        }

        gsap.set(
          [
            ".contact-hero-line",
            ".contact-hero-copy",
            ".contact-hero-rail",
            ".contact-reveal",
            ".contact-map",
            ".contact-map-heading",
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            yPercent: 0,
            scale: 1,
          },
        );

        return;
      }

      if (transitionPlug) {
        gsap.set(transitionPlug, {
          yPercent: 0,
        });
      }

      if (transitionInner) {
        gsap.set(transitionInner, {
          top: "auto",
          bottom: 0,
          height: "100%",
        });
      }

      gsap.set(".contact-hero-line", {
        opacity: 0,
        yPercent: 110,
      });

      gsap.set(".contact-hero-copy", {
        opacity: 0,
        y: 35,
      });

      gsap.set(".contact-hero-rail", {
        opacity: 0,
        y: 28,
      });

      const entrance = gsap.timeline({
        paused: true,
      });

      if (transitionInner) {
        entrance.fromTo(
          transitionInner,
          {
            top: "auto",
            bottom: 0,
            height: "100%",
          },
          {
            height: "0%",
            duration: 1.55,
            ease: "power4.inOut",
          },
          0,
        );
      }

      if (transitionPlug) {
        entrance.to(
          transitionPlug,
          {
            yPercent: 105,
            duration: 1.55,
            ease: "power4.inOut",
          },
          0.05,
        );
      }

      entrance.to(
        ".contact-hero-line",
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.05,
          stagger: 0.1,
          ease: "power4.out",
        },
        1,
      );

      entrance.to(
        ".contact-hero-copy",
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
        },
        1.25,
      );

      entrance.to(
        ".contact-hero-rail",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        1.4,
      );

      const startEntrance = () => {
        window.scrollTo(0, 0);

        requestAnimationFrame(() => {
          entrance.play(0);
        });
      };

      if (document.readyState === "complete") {
        startEntrance();
      } else {
        window.addEventListener("load", startEntrance, {
          once: true,
        });
      }

      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 38,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.fromTo(
        ".contact-map-heading",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-map-heading",
            start: "top 87%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".contact-map",
        {
          opacity: 0,
          y: 45,
          scale: 0.992,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-map",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="di-contact-page">
      <PageTransition initialCovered />

      <main>
        {/* HERO */}

        <section className="contact-hero">
          <div className="di-container contact-hero__container">
            <div className="contact-hero__main">
              <div className="contact-hero__heading">
                <div className="contact-hero__line-wrap">
                  <h1 className="contact-hero-line">Let&apos;s Plan</h1>
                </div>

                <div className="contact-hero__line-wrap">
                  <h2 className="contact-hero-line contact-hero-line--accent">
                    The Movement.
                  </h2>
                </div>
              </div>

              <div className="contact-hero-copy">
                <div className="contact-hero-copy__rule" />

                <p className="contact-body contact-hero-copy__lead">
                  For transport requirements, project coordination and business
                  enquiries, start with the operating details.
                </p>

                <p className="contact-body contact-hero-copy__text">
                  Tell us what needs to move, where it needs to go, the timing
                  involved and any conditions that shape the operation.
                </p>

                <a
                  href={`mailto:${EMAIL}`}
                  className="contact-hero-copy__email"
                >
                  <span>{EMAIL}</span>

                  <FiArrowUpRight />
                </a>
              </div>
            </div>

            <div className="contact-hero-rail">
              <div className="contact-hero-rail__item">
                <span className="contact-body">Office</span>

                <strong>
                  6995 King Fahd Branch Road, Utaiqah Dist, Riyadh 12653 - Unit
                  34 B, Saudi Arabia
                </strong>
              </div>

              <div className="contact-hero-rail__item">
                <span className="contact-body">E-mail</span>

                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>

              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-hero-rail__location"
              >
                <span>View Location</span>

                <FiArrowUpRight />
              </a>
            </div>
          </div>
        </section>

        {/* INFO */}

        <section className="contact-info">
          <div className="di-container">
            <div className="contact-info__layout">
              <div className="contact-info__intro contact-reveal">
                <span className="contact-info__index">KSA</span>

                <h2>
                  Riyadh
                  <br />
                  Office.
                </h2>

                <p className="contact-body">
                  For project logistics, transportation requirements, business
                  enquiries and operational coordination.
                </p>
              </div>

              <div className="contact-info__details">
                <ContactDetail
                  icon={FiMapPin}
                  label="Office"
                  value="Riyadh, Saudi Arabia"
                  description={ADDRESS}
                  href={MAP_DIRECTIONS_URL}
                  external
                />

                <ContactDetail
                  icon={FiMail}
                  label="E-mail"
                  value={EMAIL}
                  href={`mailto:${EMAIL}`}
                />

                {LINKEDIN_URL ? (
                  <ContactDetail
                    icon={FiLinkedin}
                    label="LinkedIn"
                    value="Difference Integrated"
                    description="Corporate updates, operations and company activity."
                    href={LINKEDIN_URL}
                    external
                  />
                ) : (
                  <ContactDetail
                    icon={FiLinkedin}
                    label="LinkedIn"
                    value="Difference Integrated"
                    description="Corporate LinkedIn profile"
                  />
                )}

                <ContactDetail
                  icon={FiGlobe}
                  label="Website"
                  value="differenceintegrated.sa"
                  href={WEBSITE}
                  external
                />
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}

        <section className="contact-location">
          <div className="di-container">
            <div className="contact-map-heading">
              <div>
                <span className="contact-map-heading__small">Riyadh</span>

                <h2>
                  Find The
                  <br />
                  Office.
                </h2>
              </div>

              <div className="contact-map-heading__right">
                <p className="contact-body">{ADDRESS}</p>

                <a
                  href={MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                  <FiArrowUpRight />
                </a>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                src={MAP_EMBED_URL}
                title="Difference Integrated Riyadh Office"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* FORM TRANSITION */}

        <section className="contact-form-transition">
          <div className="di-container">
            <div className="contact-form-transition__layout contact-reveal">
              <span>Tell us what needs to move.</span>

              <p className="contact-body">
                The clearer the operating requirement, the better we can
                structure the next step.
              </p>
            </div>
          </div>
        </section>

        <ContactPageForm />
      </main>

      <style jsx global>{`
        /* =========================================
           BASE
        ========================================= */

        .di-contact-page {
          width: 100%;
          max-width: 100vw;

          overflow-x: clip;

          background: #fff;

          color: var(--di-primary);
        }

        .di-contact-page .contact-body {
          font-family: "Inter", sans-serif;
        }

        /* =========================================
           HERO
        ========================================= */

        .contact-hero {
          position: relative;

          width: 100%;

          min-height: 100svh;

          display: flex;
          align-items: flex-end;

          padding-top: 175rem;

          background: #fff;
        }

        .contact-hero__container {
          width: 90% !important;
          max-width: 1728px !important;

          margin-inline: auto;

          padding-inline: 0 !important;
        }

        .contact-hero__main {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(0, 1.22fr)
            minmax(320rem, 0.58fr);

          align-items: end;

          gap: clamp(55rem, 5.5vw, 110rem);

          padding-bottom: 82rem;
        }

        .contact-hero__heading {
          width: 100%;
          min-width: 0;
          max-width: 1050rem;
        }

        .contact-hero__line-wrap {
          width: 100%;

          overflow: hidden;

          padding: 0 0 12rem 0;
        }

        .contact-hero-line {
          width: 100%;

          margin: 0;

          color: var(--di-primary);

          font-size: clamp(86rem, 7.4vw, 145rem);

          font-weight: 700;

          line-height: 0.86;

          letter-spacing: -0.05em;

          text-transform: uppercase;

          white-space: nowrap;
        }

        .contact-hero-line--accent {
          color: var(--di-accent);
        }

        .contact-hero-copy {
          width: 100%;
          max-width: 535rem;

          min-width: 0;

          justify-self: end;

          padding-bottom: 6rem;
        }

        .contact-hero-copy__rule {
          width: 100%;
          height: 1px;

          margin-bottom: 28rem;

          background: rgba(25, 37, 91, 0.2);
        }

        .contact-hero-copy__lead {
          margin: 0;

          max-width: 510rem;

          color: var(--di-primary);

          font-size: clamp(16rem, 1.15vw, 20rem);

          line-height: 1.6;
        }

        .contact-hero-copy__text {
          max-width: 500rem;

          margin: 18rem 0 0;

          color: rgba(25, 37, 91, 0.55);

          font-size: 15rem;

          line-height: 1.7;
        }

        .contact-hero-copy__email {
          max-width: 100%;

          display: inline-flex;
          align-items: center;

          gap: 14rem;

          margin-top: 34rem;

          padding-bottom: 7rem;

          border-bottom: 1px solid rgba(25, 37, 91, 0.3);

          color: var(--di-primary);

          font-family: "Inter", sans-serif;

          font-size: 13rem;
          font-weight: 600;

          line-height: 1.4;

          transition:
            color 0.3s ease,
            border-color 0.3s ease;
        }

        .contact-hero-copy__email span {
          min-width: 0;

          overflow-wrap: anywhere;
        }

        .contact-hero-copy__email svg {
          width: 18rem;
          height: 18rem;

          flex-shrink: 0;

          transition: transform 0.3s ease;
        }

        .contact-hero-copy__email:hover {
          color: var(--di-accent);

          border-color: var(--di-accent);
        }

        .contact-hero-copy__email:hover svg {
          transform: translate(3rem, -3rem);
        }

        /* =========================================
           HERO RAIL
        ========================================= */

        .contact-hero-rail {
          width: 100%;
          min-height: 120rem;

          display: grid;

          grid-template-columns:
            minmax(230rem, 0.78fr)
            minmax(300rem, 1.12fr)
            minmax(205rem, 0.45fr);

          align-items: stretch;

          background: var(--di-primary);

          color: #fff;
        }

        .contact-hero-rail__item {
          min-width: 0;

          display: flex;
          flex-direction: column;
          justify-content: center;

          padding: 25rem 32rem;

          border-right: 1px solid rgba(255, 255, 255, 0.14);
        }

        .contact-hero-rail__item > span {
          margin-bottom: 9rem;

          color: rgba(255, 255, 255, 0.43);

          font-size: 10rem;
          font-weight: 600;

          letter-spacing: 0.12em;

          text-transform: uppercase;
        }

        .contact-hero-rail__item strong,
        .contact-hero-rail__item a {
          display: block;

          max-width: 100%;

          color: #fff;

          font-size: 17rem;
          font-weight: 600;

          line-height: 1.4;

          overflow-wrap: anywhere;
        }

        .contact-hero-rail__item a {
          transition: color 0.3s ease;
        }

        .contact-hero-rail__item a:hover {
          color: var(--di-accent);
        }

        .contact-hero-rail__location {
          min-width: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 16rem;

          padding: 24rem 26rem;

          background: var(--di-accent);

          color: #fff;

          font-family: "Inter", sans-serif;

          font-size: 12rem;
          font-weight: 600;

          letter-spacing: 0.08em;

          text-align: center;

          text-transform: uppercase;
        }

        .contact-hero-rail__location svg {
          width: 18rem;
          height: 18rem;

          flex-shrink: 0;

          transition: transform 0.3s ease;
        }

        .contact-hero-rail__location:hover svg {
          transform: translate(3rem, -3rem);
        }

        /* =========================================
           INFO
        ========================================= */

        .contact-info {
          width: 100%;

          padding: 130rem 0;

          background: var(--di-light);
        }

        .contact-info > .di-container {
          width: 90% !important;
          max-width: 1728px !important;

          margin-inline: auto;

          padding-inline: 0 !important;
        }

        .contact-info__layout {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(300rem, 0.68fr)
            minmax(0, 1.32fr);

          gap: clamp(60rem, 7vw, 135rem);
        }

        .contact-info__intro {
          position: sticky;

          top: 150rem;

          align-self: start;

          max-width: 610rem;
        }

        .contact-info__index {
          display: block;

          margin-bottom: 24rem;

          color: var(--di-accent);

          font-family: "Inter", sans-serif;

          font-size: 12rem;
          font-weight: 600;

          letter-spacing: 0.14em;
        }

        .contact-info__intro h2 {
          margin: 0;

          color: var(--di-primary);

          font-size: clamp(58rem, 4.8vw, 88rem);

          font-weight: 700;

          line-height: 0.87;

          letter-spacing: -0.04em;

          text-transform: uppercase;
        }

        .contact-info__intro p {
          max-width: 500rem;

          margin: 32rem 0 0;

          color: rgba(25, 37, 91, 0.58);

          font-size: 16rem;

          line-height: 1.7;
        }

        .contact-info__details {
          width: 100%;
          min-width: 0;

          border-top: 1px solid rgba(25, 37, 91, 0.16);
        }

        /* =========================================
           DETAIL ROW
        ========================================= */

        .contact-detail {
          width: 100%;
          min-width: 0;

          min-height: 132rem;

          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 30rem;

          padding: 30rem 0;

          border-bottom: 1px solid rgba(25, 37, 91, 0.16);

          color: inherit;
        }

        .contact-detail__main {
          width: 100%;
          min-width: 0;

          display: flex;
          align-items: flex-start;

          gap: 23rem;
        }

        .contact-detail__content {
          width: 100%;
          min-width: 0;
        }

        .contact-detail__icon {
          width: 50rem;
          height: 50rem;

          flex: 0 0 50rem;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(25, 37, 91, 0.18);

          color: var(--di-accent);

          transition:
            color 0.3s ease,
            background-color 0.3s ease,
            border-color 0.3s ease;
        }

        .contact-detail__icon svg {
          width: 21rem;
          height: 21rem;
        }

        .contact-detail__label {
          display: block;

          color: rgba(25, 37, 91, 0.42);

          font-size: 11rem;
          font-weight: 600;

          line-height: 1;

          letter-spacing: 0.12em;

          text-transform: uppercase;
        }

        .contact-detail__value {
          display: block;

          width: 100%;

          margin-top: 10rem;

          color: var(--di-primary);

          font-size: clamp(21rem, 1.65vw, 29rem);

          font-weight: 700;

          line-height: 1.12;

          letter-spacing: -0.025em;

          overflow-wrap: anywhere;

          transition: color 0.3s ease;
        }

        .contact-detail__description {
          display: block;

          width: 100%;
          max-width: 650rem;

          margin-top: 10rem;

          color: rgba(25, 37, 91, 0.54);

          font-size: 14rem;
          line-height: 1.6;
        }

        .contact-detail__arrow {
          width: 22rem;
          height: 22rem;

          flex: 0 0 22rem;

          margin-top: 4rem;

          color: rgba(25, 37, 91, 0.25);

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        a.contact-detail:hover .contact-detail__icon {
          color: #fff;

          background: var(--di-accent);

          border-color: var(--di-accent);
        }

        a.contact-detail:hover .contact-detail__value {
          color: var(--di-accent);
        }

        a.contact-detail:hover .contact-detail__arrow {
          color: var(--di-accent);

          transform: translate(3rem, -3rem);
        }

        /* =========================================
           LOCATION
        ========================================= */

        .contact-location {
          width: 100%;

          padding: 130rem 0;

          background: #fff;
        }

        .contact-location > .di-container {
          width: 90% !important;
          max-width: 1728px !important;

          margin-inline: auto;

          padding-inline: 0 !important;
        }

        .contact-map-heading {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(320rem, 0.65fr);

          align-items: end;

          gap: clamp(50rem, 6vw, 110rem);

          margin-bottom: 58rem;
        }

        .contact-map-heading__small {
          display: block;

          margin-bottom: 18rem;

          color: var(--di-accent);

          font-family: "Inter", sans-serif;

          font-size: 12rem;
          font-weight: 600;

          letter-spacing: 0.14em;

          text-transform: uppercase;
        }

        .contact-map-heading h2 {
          margin: 0;

          color: var(--di-primary);

          font-size: clamp(58rem, 5vw, 90rem);

          font-weight: 700;

          line-height: 0.87;

          letter-spacing: -0.04em;

          text-transform: uppercase;
        }

        .contact-map-heading__right {
          width: 100%;
          max-width: 600rem;

          justify-self: end;
        }

        .contact-map-heading__right p {
          margin: 0;

          color: rgba(25, 37, 91, 0.58);

          font-size: 16rem;

          line-height: 1.7;
        }

        .contact-map-heading__right a {
          width: fit-content;

          display: inline-flex;
          align-items: center;

          gap: 12rem;

          margin-top: 22rem;

          color: var(--di-primary);

          font-family: "Inter", sans-serif;

          font-size: 12rem;
          font-weight: 600;

          letter-spacing: 0.08em;

          text-transform: uppercase;

          transition: color 0.3s ease;
        }

        .contact-map-heading__right a svg {
          width: 18rem;
          height: 18rem;

          flex-shrink: 0;

          transition: transform 0.3s ease;
        }

        .contact-map-heading__right a:hover {
          color: var(--di-accent);
        }

        .contact-map-heading__right a:hover svg {
          transform: translate(3rem, -3rem);
        }

        .contact-map {
          position: relative;

          width: 100%;
          height: clamp(500rem, 38vw, 680rem);

          overflow: hidden;

          background: var(--di-light);

          border-top: 1px solid rgba(25, 37, 91, 0.15);

          border-bottom: 1px solid rgba(25, 37, 91, 0.15);
        }

        .contact-map iframe {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          border: 0;

          filter: grayscale(0.08) contrast(0.98);
        }

        /* =========================================
           FORM TRANSITION
        ========================================= */

        .contact-form-transition {
          width: 100%;

          padding: 92rem 0;

          background: var(--di-primary);

          color: #fff;
        }

        .contact-form-transition > .di-container {
          width: 90% !important;
          max-width: 1728px !important;

          margin-inline: auto;

          padding-inline: 0 !important;
        }

        .contact-form-transition__layout {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(0, 1.2fr)
            minmax(300rem, 0.55fr);

          align-items: end;

          gap: clamp(45rem, 6vw, 100rem);
        }

        .contact-form-transition__layout > span {
          max-width: 980rem;

          font-size: clamp(50rem, 4.3vw, 76rem);

          font-weight: 700;

          line-height: 0.9;

          letter-spacing: -0.035em;

          text-transform: uppercase;
        }

        .contact-form-transition__layout p {
          max-width: 500rem;

          margin: 0;

          color: rgba(255, 255, 255, 0.62);

          font-size: 16rem;

          line-height: 1.65;
        }

        /* =========================================
           1440
        ========================================= */

        @media (max-width: 1440px) {
          .contact-hero__main {
            grid-template-columns:
              minmax(0, 1.12fr)
              minmax(330rem, 0.6fr);

            gap: 60rem;
          }

          .contact-hero-line {
            font-size: clamp(80rem, 7vw, 112rem);
          }

          .contact-info__layout {
            gap: 80rem;
          }
        }

        /* =========================================
           1200
        ========================================= */

        @media (max-width: 1200px) {
          .contact-hero__container,
          .contact-info > .di-container,
          .contact-location > .di-container,
          .contact-form-transition > .di-container {
            width: 90% !important;
          }

          .contact-hero__main {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(300rem, 0.52fr);

            gap: 48rem;
          }

          .contact-hero-line {
            font-size: 88rem;
          }

          .contact-hero-rail {
            grid-template-columns:
              0.75fr
              1.15fr
              0.52fr;
          }

          .contact-info__layout {
            grid-template-columns:
              minmax(260rem, 0.62fr)
              minmax(0, 1.38fr);

            gap: 60rem;
          }
        }

        /* =========================================
           1024
        ========================================= */

        @media (max-width: 1024px) {
          .contact-hero {
            min-height: auto;

            padding-top: 155rem;
          }

          .contact-hero__main {
            grid-template-columns: 1fr;

            gap: 48rem;

            padding-bottom: 62rem;
          }

          .contact-hero__heading {
            max-width: 820rem;
          }

          .contact-hero-line {
            font-size: 78rem;

            white-space: normal;
          }

          .contact-hero-copy {
            max-width: 640rem;

            justify-self: start;
          }

          .contact-hero-rail {
            grid-template-columns: 1fr 1fr;
          }

          .contact-hero-rail__location {
            grid-column: 1 / -1;

            min-height: 70rem;
          }

          .contact-info {
            padding: 90rem 0;
          }

          .contact-info__layout {
            grid-template-columns: 1fr;

            gap: 55rem;
          }

          .contact-info__intro {
            position: static;

            max-width: 700rem;
          }

          .contact-map-heading {
            grid-template-columns: 1fr;

            gap: 30rem;
          }

          .contact-map-heading__right {
            justify-self: start;
          }

          .contact-form-transition__layout {
            grid-template-columns: 1fr;

            gap: 28rem;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .contact-hero__container,
          .contact-info > .di-container,
          .contact-location > .di-container,
          .contact-form-transition > .di-container {
            width: 90% !important;
          }

          .contact-hero {
            padding-top: 125rem;
          }

          .contact-hero__main {
            gap: 36rem;

            padding-bottom: 45rem;
          }

          .contact-hero-line {
            font-size: 52rem;

            line-height: 0.94;

            letter-spacing: -0.043em;

            white-space: normal;
          }

          .contact-hero__line-wrap {
            overflow: visible;
          }

          .contact-hero-copy__lead {
            font-size: 17rem;
          }

          .contact-hero-copy__text {
            font-size: 14rem;
          }

          .contact-hero-copy__email {
            width: 100%;

            justify-content: space-between;

            font-size: 12rem;
          }

          .contact-hero-rail {
            display: block;
          }

          .contact-hero-rail__item {
            min-height: 92rem;

            padding: 21rem 20rem;

            border-right: 0;

            border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          }

          .contact-hero-rail__item strong,
          .contact-hero-rail__item a {
            font-size: 15rem;
          }

          .contact-hero-rail__location {
            min-height: 62rem;

            padding: 20rem;
          }

          .contact-info {
            padding: 68rem 0;
          }

          .contact-info__intro h2 {
            font-size: 43rem;
          }

          .contact-detail {
            min-height: 0;

            gap: 15rem;

            padding: 23rem 0;
          }

          .contact-detail__main {
            gap: 14rem;
          }

          .contact-detail__icon {
            width: 42rem;
            height: 42rem;

            flex-basis: 42rem;
          }

          .contact-detail__value {
            font-size: 20rem;
          }

          .contact-detail__description {
            font-size: 13rem;
          }

          .contact-detail__arrow {
            width: 18rem;
            height: 18rem;

            flex-basis: 18rem;
          }

          .contact-location {
            padding: 68rem 0;
          }

          .contact-map-heading {
            margin-bottom: 35rem;
          }

          .contact-map-heading h2 {
            font-size: 43rem;
          }

          .contact-map-heading__right p {
            font-size: 14rem;
          }

          .contact-map {
            height: 410rem;
          }

          .contact-form-transition {
            padding: 60rem 0;
          }

          .contact-form-transition__layout > span {
            font-size: 39rem;
          }

          .contact-form-transition__layout p {
            font-size: 14rem;
          }
        }

        @media (max-width: 380px) {
          .contact-hero-line {
            font-size: 46rem;
          }

          .contact-detail__value {
            font-size: 18rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-hero-line,
          .contact-hero-copy,
          .contact-hero-rail,
          .contact-reveal,
          .contact-map,
          .contact-map-heading {
            opacity: 1 !important;

            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
