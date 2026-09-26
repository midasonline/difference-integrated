"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { PageTransition } from "@/components/ui/PageTransition";

type ServicePoint = {
  title: string;
  text: string;
};

type Service = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  points: ServicePoint[];
  supportingCopy: string;
  image: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Construction Logistics",
    tagline: "Transport that works with the project schedule.",
    description:
      "Difference Integrated coordinates transport around construction schedules, site access, delivery sequences, and changing material requirements to keep incoming loads aligned with work on site.",
    points: [
      {
        title: "Project Timing",
        text: "Transport activity aligned with construction schedules and delivery priorities.",
      },
      {
        title: "Site Access",
        text: "Entry routes, unloading areas, and active working conditions considered before movement.",
      },
      {
        title: "Delivery Sequence",
        text: "Loads organized according to where and when materials are required.",
      },
      {
        title: "Site Coordination",
        text: "Transport activity kept connected with relevant projects and receiving teams.",
      },
    ],
    supportingCopy:
      "The objective is not simply to reach the site. It is to make each delivery fit the way the site is actually operating.",
    image: "/assets/img/services-page/construction-logistics.webp",
  },
  {
    number: "02",
    title: "Sand Transportation",
    tagline: "Consistency matters when the volume keeps moving.",
    description:
      "DI coordinates repeated sand movements around source locations, loading cycles, turnaround times, site access, and project demand to maintain a consistent flow from source to site.",
    points: [
      {
        title: "Source-to-Site Movement",
        text: "Transport organized between approved supply points and project locations.",
      },
      {
        title: "Load Cycles",
        text: "Loading, transit, unloading, and return activity considered as one continuous operation.",
      },
      {
        title: "Project Demand",
        text: "Delivery frequency adjusted around the volume required on site.",
      },
      {
        title: "Access Conditions",
        text: "Vehicle movement planned around conditions at both loading and receiving points.",
      },
    ],
    supportingCopy:
      "When multiple loads are moving through the same cycle, control over timing and turnaround becomes critical to the operation.",
    image: "/assets/img/services-page/sand-transportation.webp",
  },
  {
    number: "03",
    title: "Heavy Dumper Logistics",
    tagline: "Made for high-volume, repeated movement.",
    description:
      "Difference Integrated coordinates heavy dumper operations around material volume, repeated haul cycles, site conditions, and fleet readiness for demanding construction environments.",
    points: [
      {
        title: "Heavy-Duty Capability",
        text: "Dumper resources suited to demanding bulk material requirements.",
      },
      {
        title: "Repeated Cycles",
        text: "Operations structured around continuous movement over active project schedules.",
      },
      {
        title: "Turnaround Control",
        text: "Loading and unloading conditions are considered to support efficient vehicle cycles.",
      },
      {
        title: "Site Conditions",
        text: "Fleet activity planned around the physical and operational requirements of the project.",
      },
    ],
    supportingCopy:
      "In repeated haulage operations, the efficiency of the cycle matters just as much as the capacity of the vehicle.",
    image: "/assets/img/services-page/heavy-dumper-logistics.webp",
  },
  {
    number: "04",
    title: "Logistics Coordination",
    tagline: "Keeping every part of the movement connected.",
    description:
      "DI connects vehicles, routes, schedules, drivers, and delivery requirements within one operating plan to keep transport activity aligned from dispatch through arrival.",
    points: [
      {
        title: "Movement Scheduling",
        text: "Transport timing is organized around operational and project priorities.",
      },
      {
        title: "Route Coordination",
        text: "Routes considered against destination, timing, access, and movement requirements.",
      },
      {
        title: "Fleet Activity",
        text: "Vehicles and transport resources coordinated around the sequence of the operation.",
      },
      {
        title: "Site Communication",
        text: "Relevant teams kept aligned as movement progressed from dispatch to delivery.",
      },
    ],
    supportingCopy:
      "Coordination is what keeps separate transport activities working as one operation.",
    image: "/assets/img/services-page/logistics-coordination.webp",
  },
  {
    number: "05",
    title: "Container Transportation",
    tagline: "A clear plan from collection to handoff.",
    description:
      "Difference Integrated coordinates container movement around pickup timing, route conditions, destination access, and receiving requirements for a controlled journey from collection to handoff.",
    points: [
      {
        title: "Collection Timing",
        text: "Vehicle scheduling aligned with container availability and pickup requirements.",
      },
      {
        title: "Route Planning",
        text: "Movement considered against destination, timing, and operating conditions.",
      },
      {
        title: "Receiving Access",
        text: "Arrival planned around access and handling conditions at the destination.",
      },
      {
        title: "Delivery Handoff",
        text: "Final movement coordinated around the agreed receiving window.",
      },
    ],
    supportingCopy:
      "The smoother the handoff between pickup, transport, and receiving, the more controlled the overall movement becomes.",
    image: "/assets/img/services-page/container-transportation.webp",
  },
  {
    number: "06",
    title: "Fuel & Tanker Transportation",
    tagline: "Controlled movement from dispatch to delivery.",
    description:
      "DI coordinates tanker movements around scheduling, route conditions, receiving requirements, operating procedures, and applicable regulations to maintain control throughout the journey.",
    points: [
      {
        title: "Planned Dispatch",
        text: "Tanker activity organized around defined movement and delivery requirements.",
      },
      {
        title: "Route Control",
        text: "Routes considered against the nature of the load and operating conditions.",
      },
      {
        title: "Receiving Coordination",
        text: "Arrival aligned with the destination and agreed delivery process.",
      },
      {
        title: "Safety & Compliance",
        text: "Movement handled with attention to applicable transport procedures and regulatory requirements.",
      },
    ],
    supportingCopy:
      "For tanker transportation, how the movement is carried out is as important as where it is going.",
    image: "/assets/img/services-page/fuel-tanker-transportation.webp",
  },
  {
    number: "07",
    title: "Bulk Construction Material Transport",
    tagline: "When the volume increases, the operation changes.",
    description:
      "DI manages high-volume material movement around required quantities, vehicle capacity, delivery cycles, and site consumption to keep supply aligned with project demand.",
    points: [
      {
        title: "High-Volume Requirements",
        text: "Transport structured for materials required in significant quantities.",
      },
      {
        title: "Movement Cycles",
        text: "Loading, transit, unloading, and return activity are treated as a connected process.",
      },
      {
        title: "Site Consumption",
        text: "Delivery frequency is considered against how quickly materials are being used.",
      },
      {
        title: "Fleet Allocation",
        text: "Transport resources assigned according to volume and operating demand.",
      },
    ],
    supportingCopy:
      "Bulk transport works best when the movement rate stays aligned with the rate at which the project requires material.",
    image: "/assets/img/services-page/bulk-construction-material.webp",
  },
  {
    number: "08",
    title: "Fleet & Equipment",
    tagline: "The job should determine the vehicle.",
    description:
      "Difference Integrated assigns fleet resources according to cargo type, route conditions, loading requirements, site access, and the operating demands of each assignment.",
    points: [
      {
        title: "Cargo Requirements",
        text: "Fleet selection is considered against the characteristics of the load.",
      },
      {
        title: "Route Conditions",
        text: "Vehicle suitability reviewed against the movement environment.",
      },
      {
        title: "Site Requirements",
        text: "Access, loading, and unloading conditions considered before deployment.",
      },
      {
        title: "Fleet Readiness",
        text: "Transport resources prepared around the sequence and demands of the assignment.",
      },
    ],
    supportingCopy:
      "The right fleet decision starts with understanding the job, not simply identifying what is available.",
    image: "/assets/img/services-page/fleet-equipment.webp",
  },
  {
    number: "09",
    title: "Aggregate & Construction Material Transportation",
    tagline: "Material supply should follow the pace of the project.",
    description:
      "DI coordinates aggregate and construction material movement around source locations, required quantities, delivery timing, and site conditions to support ongoing project activity.",
    points: [
      {
        title: "Material Movement",
        text: "Transport for aggregates, fill, and related construction materials.",
      },
      {
        title: "Source Coordination",
        text: "Movement organized between loading locations and project sites.",
      },
      {
        title: "Delivery Timing",
        text: "Transport activity aligned with when materials are required.",
      },
      {
        title: "Site Handling",
        text: "Access and unloading conditions considered before arrival.",
      },
    ],
    supportingCopy:
      "The value of a delivery is not only in the quantity moved, but in whether that material reaches the project when it can actually be used.",
    image: "/assets/img/services-page/aggregate-transportation.webp",
  },
  {
    number: "10",
    title: "General Freight & Logistics Solutions",
    tagline: "When the load changes, the plan changes with it.",
    description:
      "Difference Integrated structures general freight movement around cargo type, origin, destination, delivery timing, and handling requirements rather than applying one standard transport approach.",
    points: [
      {
        title: "Cargo Profile",
        text: "Transport requirements assessed according to the nature of the freight.",
      },
      {
        title: "Origin & Destination",
        text: "Collection and receiving conditions considered as part of the movement.",
      },
      {
        title: "Delivery Timing",
        text: "Transport scheduled around the required arrival window.",
      },
      {
        title: "Flexible Support",
        text: "Movement structured for individual, recurring, or ongoing freight requirements.",
      },
    ],
    supportingCopy:
      "There is no single transport formula for general freight. The operating requirement determines the approach.",
    image: "/assets/img/services-page/general-freight.webp",
  },
];

function KeyPointsAccordion({
  points,
}: {
  points: ServicePoint[];
}): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-[var(--mvp-primary)]/20">
      {points.map((point, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={point.title}
            className="service-keypoint-row border-b border-[var(--mvp-primary)]/20"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex min-h-[64rem] w-full items-center justify-between gap-[24rem] py-[12rem] text-left"
            >
              <span className="text-[20rem] font-bold uppercase leading-[20rem] transition-colors duration-300 group-hover:text-[var(--mvp-accent)] max-[1024px]:text-[18rem] max-[1024px]:leading-[18rem]">
                {point.title}
              </span>

              <span
                className={`flex h-[35rem] w-[35rem] shrink-0 items-center justify-center rounded-[5rem] text-white transition-[background-color,transform] duration-300 ease-out ${
                  isOpen
                    ? "bg-[var(--mvp-primary)]"
                    : "bg-[var(--mvp-accent)] group-hover:bg-[var(--mvp-primary)]"
                }`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-[11rem] w-[11rem] transition-transform duration-300 ease-out ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M12 4V20" />
                  <path d="M4 12H20" />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[650rem] pb-[18rem] pr-[70rem] font-['Inter'] text-[15rem] font-normal leading-[21rem] text-[var(--mvp-primary)]/78 max-[1024px]:pr-[45rem] max-[1024px]:text-[14rem] max-[1024px]:leading-[20rem]">
                  {point.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type ServiceNavigatorProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

function ServiceNavigator({
  activeIndex,
  onSelect,
}: ServiceNavigatorProps): React.JSX.Element {
  const isVisible = activeIndex >= 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (!closeTimerRef.current) return;

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const openMenu = () => {
    clearCloseTimer();
    setMenuOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
      closeTimerRef.current = null;
    }, 220);
  };

  const handleSelect = (index: number) => {
    clearCloseTimer();
    setMenuOpen(false);
    onSelect(index);
  };

  return (
    <div
      className={`services-quick-nav pointer-events-auto absolute left-[40rem] top-[145rem] z-[60] hidden transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] min-[1025px]:block max-[1500px]:left-[26rem] max-[1500px]:top-[130rem] ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-[24rem] opacity-0"
      }`}
      aria-hidden={!isVisible}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;

        if (
          nextTarget instanceof Node &&
          event.currentTarget.contains(nextTarget)
        ) {
          return;
        }

        scheduleClose();
      }}
    >
      <button
        type="button"
        onClick={() => {
          clearCloseTimer();
          setMenuOpen((current) => !current);
        }}
        className={`relative flex h-[60rem] min-w-[220rem] items-center justify-between gap-[22rem] overflow-hidden rounded-[11rem] border px-[18rem] text-left shadow-[0_14px_42px_rgba(0,0,0,.20)] backdrop-blur-[14px] transition-[background-color,border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-[2rem] focus-visible:ring-[var(--mvp-accent)] ${
          menuOpen
            ? "border-white/70 bg-[rgba(244,241,234,.98)] shadow-[0_20px_55px_rgba(0,0,0,.28)]"
            : "border-white/55 bg-[rgba(244,241,234,.92)] hover:-translate-y-[2rem] hover:border-white/75 hover:bg-[rgba(244,241,234,.98)] hover:shadow-[0_20px_55px_rgba(0,0,0,.28)]"
        }`}
        aria-label="Show services navigation"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <span
          className="absolute inset-x-0 top-0 h-[3rem] bg-[var(--mvp-accent)]"
          aria-hidden="true"
        />

        <span className="text-[23rem] font-bold uppercase leading-none text-[var(--mvp-primary)]">
          Services
        </span>

        <span
          className={`flex h-[31rem] w-[31rem] shrink-0 items-center justify-center rounded-full text-white transition-[background-color,transform] duration-300 ${
            menuOpen
              ? "rotate-45 bg-[var(--mvp-accent)]"
              : "bg-[var(--mvp-primary)]"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 18 18" fill="none" className="h-[11rem] w-[11rem]">
            <path
              d="M9 3V15"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M3 9H15"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`absolute left-0 top-full w-[500rem] pt-[10rem] transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(.22,1,.36,1)] max-[1500px]:w-[455rem] ${
          menuOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-[8rem] opacity-0"
        }`}
      >
        <div
          role="menu"
          aria-label="Services"
          className="overflow-hidden rounded-[15rem] border border-white/65 bg-[rgba(244,241,234,.96)] p-[8rem] shadow-[0_24px_70px_rgba(0,0,0,.30)] backdrop-blur-[18px]"
        >
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={service.number}
                type="button"
                role="menuitem"
                onClick={() => handleSelect(index)}
                className={`group/item relative flex min-h-[52rem] w-full items-center gap-[13rem] rounded-[9rem] px-[14rem] py-[9rem] text-left transition-[background-color,color,transform] duration-250 ${
                  isActive
                    ? "bg-[var(--mvp-primary)] text-white"
                    : "text-[var(--mvp-primary)] hover:bg-white/85"
                }`}
                aria-label={`Go to ${service.title}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`h-[10rem] w-[10rem] shrink-0 rounded-full border transition-all duration-250 ${
                    isActive
                      ? "border-[var(--mvp-accent)] bg-[var(--mvp-accent)] shadow-[0_0_0_4px_rgba(233,81,29,.16)]"
                      : "border-[var(--mvp-primary)]/45 bg-transparent group-hover/item:border-[var(--mvp-accent)] group-hover/item:bg-[var(--mvp-accent)]"
                  }`}
                  aria-hidden="true"
                />

                <span
                  className={`w-[32rem] shrink-0 font-['Inter'] text-[12.5rem] font-semibold tracking-[.05em] ${
                    isActive
                      ? "text-[var(--mvp-accent)]"
                      : "text-[var(--mvp-primary)]/65"
                  }`}
                >
                  {service.number}
                </span>

                <span
                  className={`min-w-0 flex-1 text-[18.5rem] font-bold uppercase leading-[1.08] transition-transform duration-250 max-[1500px]:text-[17.5rem] ${
                    isActive
                      ? "text-white"
                      : "text-[var(--mvp-primary)] group-hover/item:translate-x-[2rem]"
                  }`}
                >
                  {service.title}
                </span>

                <span
                  className={`flex h-[27rem] w-[27rem] shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-250 ${
                    isActive
                      ? "bg-[var(--mvp-accent)] text-white"
                      : "bg-[var(--mvp-primary)]/8 text-[var(--mvp-primary)]/65 group-hover/item:translate-x-[2rem] group-hover/item:bg-[var(--mvp-accent)] group-hover/item:text-white"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-[10rem] w-[10rem]"
                  >
                    <path
                      d="M3 8H13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 4L13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ServiceButton(): React.JSX.Element {
  return (
    <Link
      href="/contact"
      className="mvp-btn text-hover w-[545rem] max-w-full max-[1024px]:w-full"
    >
      <span className="mvp-btn-inner text-hover-inner">
        <span className="text-hover-elem text-hover-elem-1">
          Order a service
        </span>

        <span className="text-hover-elem text-hover-elem-2">
          Order a service
        </span>
      </span>
    </Link>
  );
}

function ServicesInquiryForm(): React.JSX.Element {
  return (
    <section className="services-inquiry-section relative overflow-hidden bg-white px-[20rem] py-[90rem] text-[var(--mvp-primary)] min-[1025px]:px-[40rem] min-[1025px]:py-[120rem]">
      <div className="services-inquiry-frame mx-auto max-w-[1500rem] overflow-hidden rounded-[28rem] bg-[var(--mvp-light)] px-[30rem] pb-[55rem] pt-[30rem] max-[1024px]:rounded-[18rem] max-[1024px]:px-[20rem] max-[1024px]:pb-[40rem] max-[1024px]:pt-[22rem]">
        <div className="services-inquiry-top flex items-center justify-between border-b border-[var(--mvp-primary)]/20 pb-[22rem]">
          <span className="text-[20rem] font-bold uppercase leading-none">
            Form
          </span>

          <span
            className="h-[4rem] w-[110rem] bg-[var(--mvp-accent)] max-[640px]:w-[70rem]"
            aria-hidden="true"
          />
        </div>

        <div className="services-inquiry-title-wrap overflow-hidden">
          <h2 className="services-inquiry-title mt-[42rem] max-w-[1100rem] text-[96rem] font-bold uppercase leading-[0.86] tracking-[-0.025em] max-[1024px]:mt-[32rem] max-[1024px]:text-[62rem] max-[640px]:text-[46rem]">
            Send Your Request
          </h2>
        </div>

        <form
          className="services-inquiry-form mt-[58rem] grid grid-cols-2 gap-x-[55rem] gap-y-[38rem] max-[760px]:mt-[42rem] max-[760px]:grid-cols-1 max-[760px]:gap-y-[30rem]"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="service-form-field group relative flex flex-col gap-[10rem] overflow-hidden pb-[4rem]">
            <span className="service-form-label font-['Inter'] text-[14rem] font-semibold uppercase tracking-[.08em] text-[var(--mvp-primary)]/65">
              Full Name <span className="text-[var(--mvp-accent)]">*</span>
            </span>

            <input
              type="text"
              name="fullName"
              required
              className="service-form-control h-[58rem] border-0 bg-transparent px-0 font-['Inter'] text-[20rem] font-normal text-[var(--mvp-primary)] outline-none placeholder:text-[var(--mvp-primary)]/30"
              placeholder="Enter your full name"
            />

            <span
              className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--mvp-primary)]/25"
              aria-hidden="true"
            />

            <span
              className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--mvp-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
              aria-hidden="true"
            />
          </label>

          <label className="service-form-field group relative flex flex-col gap-[10rem] overflow-hidden pb-[4rem]">
            <span className="service-form-label font-['Inter'] text-[14rem] font-semibold uppercase tracking-[.08em] text-[var(--mvp-primary)]/65">
              Company Name
            </span>

            <input
              type="text"
              name="companyName"
              className="service-form-control h-[58rem] border-0 bg-transparent px-0 font-['Inter'] text-[20rem] font-normal text-[var(--mvp-primary)] outline-none placeholder:text-[var(--mvp-primary)]/30"
              placeholder="Enter company name"
            />

            <span
              className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--mvp-primary)]/25"
              aria-hidden="true"
            />

            <span
              className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--mvp-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
              aria-hidden="true"
            />
          </label>

          <label className="service-form-field group relative flex flex-col gap-[10rem] overflow-hidden pb-[4rem]">
            <span className="service-form-label font-['Inter'] text-[14rem] font-semibold uppercase tracking-[.08em] text-[var(--mvp-primary)]/65">
              Phone Number <span className="text-[var(--mvp-accent)]">*</span>
            </span>

            <input
              type="tel"
              name="phone"
              required
              className="service-form-control h-[58rem] border-0 bg-transparent px-0 font-['Inter'] text-[20rem] font-normal text-[var(--mvp-primary)] outline-none placeholder:text-[var(--mvp-primary)]/30"
              placeholder="Enter phone number"
            />

            <span
              className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--mvp-primary)]/25"
              aria-hidden="true"
            />

            <span
              className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--mvp-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
              aria-hidden="true"
            />
          </label>

          <label className="service-form-field group relative flex flex-col gap-[10rem] overflow-hidden pb-[4rem]">
            <span className="service-form-label font-['Inter'] text-[14rem] font-semibold uppercase tracking-[.08em] text-[var(--mvp-primary)]/65">
              Email Address <span className="text-[var(--mvp-accent)]">*</span>
            </span>

            <input
              type="email"
              name="email"
              required
              className="service-form-control h-[58rem] border-0 bg-transparent px-0 font-['Inter'] text-[20rem] font-normal text-[var(--mvp-primary)] outline-none placeholder:text-[var(--mvp-primary)]/30"
              placeholder="Enter email address"
            />

            <span
              className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--mvp-primary)]/25"
              aria-hidden="true"
            />

            <span
              className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--mvp-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
              aria-hidden="true"
            />
          </label>

          <label className="service-form-field group relative col-span-2 flex flex-col gap-[10rem] overflow-hidden pb-[4rem] max-[760px]:col-span-1">
            <span className="service-form-label font-['Inter'] text-[14rem] font-semibold uppercase tracking-[.08em] text-[var(--mvp-primary)]/65">
              Service Required
            </span>

            <select
              name="service"
              defaultValue=""
              className="service-form-control h-[58rem] cursor-pointer border-0 bg-transparent px-0 font-['Inter'] text-[20rem] font-normal text-[var(--mvp-primary)] outline-none"
            >
              <option value="" disabled>
                Select a service
              </option>

              {services.map((service) => (
                <option key={service.number} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>

            <span
              className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--mvp-primary)]/25"
              aria-hidden="true"
            />

            <span
              className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--mvp-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
              aria-hidden="true"
            />
          </label>

          <label className="service-form-field group relative col-span-2 flex flex-col gap-[10rem] overflow-hidden pb-[4rem] max-[760px]:col-span-1">
            <span className="service-form-label font-['Inter'] text-[14rem] font-semibold uppercase tracking-[.08em] text-[var(--mvp-primary)]/65">
              Tell Us About Your Requirement
            </span>

            <textarea
              name="requirement"
              rows={5}
              className="service-form-control min-h-[145rem] resize-y border-0 bg-transparent px-0 py-[16rem] font-['Inter'] text-[20rem] font-normal leading-[1.45] text-[var(--mvp-primary)] outline-none placeholder:text-[var(--mvp-primary)]/30"
              placeholder="Tell us what you need"
            />

            <span
              className="service-form-line absolute inset-x-0 bottom-0 h-[1rem] origin-left bg-[var(--mvp-primary)]/25"
              aria-hidden="true"
            />

            <span
              className="service-form-line-accent absolute bottom-0 left-0 h-[2rem] w-full origin-left scale-x-0 bg-[var(--mvp-accent)] transition-transform duration-500 group-focus-within:scale-x-100"
              aria-hidden="true"
            />
          </label>

          <div className="service-form-submit-wrap col-span-2 mt-[14rem] max-[760px]:col-span-1">
            <button
              type="submit"
              className="mvp-btn mvp-btn-accent text-hover w-[390rem] max-w-full max-[640px]:w-full"
            >
              <span className="mvp-btn-inner text-hover-inner">
                <span className="text-hover-elem text-hover-elem-1">
                  Send Your Request
                </span>

                <span className="text-hover-elem text-hover-elem-2">
                  Send Your Request
                </span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function ServicesPageClient(): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const masterTriggerRef = useRef<ReturnType<
    typeof ScrollTrigger.create
  > | null>(null);

  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const serviceTargetTimesRef = useRef<number[]>([]);
  const activeServiceIndexRef = useRef(-1);
  const jumpTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoSnapTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoSnapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoSnappingRef = useRef(false);
  const serviceFullTargetTimesRef = useRef<number[]>([]);

  const [activeServiceIndex, setActiveServiceIndex] = useState(-1);

  const updateActiveService = (index: number) => {
    if (activeServiceIndexRef.current === index) return;

    activeServiceIndexRef.current = index;
    setActiveServiceIndex(index);
  };

  const jumpToService = (index: number) => {
    const service = services[index];

    if (!service) return;

    updateActiveService(index);

    if (window.innerWidth <= 1024) {
      document.getElementById(`service-${service.number}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    const trigger = masterTriggerRef.current;
    const timeline = masterTimelineRef.current;
    const targetTime = serviceTargetTimesRef.current[index];

    if (
      !trigger ||
      !timeline ||
      typeof targetTime !== "number" ||
      timeline.duration() <= 0
    ) {
      return;
    }

    const progress = Math.min(1, Math.max(0, targetTime / timeline.duration()));

    const targetScroll =
      trigger.start + (trigger.end - trigger.start) * progress;

    jumpTweenRef.current?.kill();

    const scrollState = {
      y: window.scrollY,
    };

    jumpTweenRef.current = gsap.to(scrollState, {
      y: targetScroll,
      duration: 0.9,
      ease: "power3.inOut",
      overwrite: true,

      onUpdate: () => {
        window.scrollTo(0, scrollState.y);
      },

      onComplete: () => {
        jumpTweenRef.current = null;
      },
    });
  };

  useLayoutEffect(() => {
    if (
      !rootRef.current ||
      !servicesRef.current ||
      !trackRef.current ||
      !progressWrapRef.current ||
      !progressRef.current
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    window.scrollTo(0, 0);

    const root = rootRef.current;
    const servicesSection = servicesRef.current;
    const track = trackRef.current;
    const progressWrap = progressWrapRef.current;
    const progress = progressRef.current;

    const splits: SplitText[] = [];
    const listeners: Array<() => void> = [];
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const heroTitle = servicesSection.querySelector<HTMLElement>(
        ".services-main-animated-text",
      );

      const heroCopy = servicesSection.querySelector<HTMLElement>(
        ".services-hero-copy",
      );

      let heroChars: HTMLElement[] = [];

      if (heroTitle) {
        const heroSplit = new SplitText(heroTitle, {
          type: "chars,words",
          charsClass: "char",
          wordsClass: "word",
        });

        splits.push(heroSplit);

        heroChars = heroSplit.chars as HTMLElement[];

        gsap.set(heroChars, {
          willChange: "transform",
          transformOrigin: "50% 0%",
          scaleY: 0,
          opacity: 0,
        });
      }

      if (heroCopy) {
        gsap.set(heroCopy, {
          opacity: 0,
          y: 28,
        });
      }

      const transitionPlug =
        root.querySelector<HTMLElement>(".transition-plug");

      const transitionInner = root.querySelector<HTMLElement>(
        ".transition-plug__inner",
      );

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

      const entrance = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power4.inOut",
          duration: 2,
        },
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
          },
          0,
        );
      }

      if (transitionPlug) {
        entrance.to(
          transitionPlug,
          {
            yPercent: 105,
          },
          0.05,
        );
      }

      if (heroChars.length) {
        entrance.to(
          heroChars,
          {
            ease: "back.out(1.7)",
            opacity: 1,
            scaleY: 1,
            yPercent: 0,
            stagger: 0.03,
            duration: 1,
          },
          ">",
        );
      }

      if (heroCopy) {
        entrance.to(
          heroCopy,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          heroChars.length ? "<+=0.3" : ">",
        );
      }

      const playEntrance = () => {
        window.scrollTo(0, 0);

        requestAnimationFrame(() => {
          entrance.play(0);
        });
      };

      if (document.readyState === "complete") {
        playEntrance();
      } else {
        window.addEventListener("load", playEntrance, {
          once: true,
        });

        listeners.push(() => {
          window.removeEventListener("load", playEntrance);
        });
      }

      root.querySelectorAll<HTMLElement>(".text-hover").forEach((element) => {
        const lines = element.querySelectorAll<HTMLElement>(".text-hover-elem");

        if (!lines.length) return;

        lines.forEach((line) => {
          const split = new SplitText(line, {
            type: "chars,words",
            charsClass: "char",
            wordsClass: "word",
          });

          splits.push(split);
        });

        const first = element.querySelectorAll<HTMLElement>(
          ".text-hover-elem-1 .char",
        );

        const second = element.querySelectorAll<HTMLElement>(
          ".text-hover-elem-2 .char",
        );

        const timeline = gsap.timeline({
          paused: true,
          defaults: {
            stagger: 0.015,
            duration: 0.35,
            ease: "power3.out",
          },
        });

        if (first.length) {
          timeline.to(first, {
            yPercent: -120,
          });
        }

        if (second.length) {
          timeline.to(
            second,
            {
              yPercent: -100,
            },
            0,
          );
        }

        const enter = () => {
          if (window.innerWidth > 1024) {
            timeline.play();
          }
        };

        const leave = () => {
          if (window.innerWidth > 1024) {
            timeline.reverse();
          }
        };

        element.addEventListener("mouseenter", enter);

        element.addEventListener("mouseleave", leave);

        listeners.push(() => {
          element.removeEventListener("mouseenter", enter);

          element.removeEventListener("mouseleave", leave);

          timeline.kill();
        });
      });

      const setupPanelSplits = (panel: HTMLElement) => {
        const localSplits: SplitText[] = [];

        const imageTitle = panel.querySelector<HTMLElement>(
          ".service-image-title",
        );

        const tagline = panel.querySelector<HTMLElement>(".service-tagline");

        const description = panel.querySelector<HTMLElement>(
          ".service-description",
        );

        const supporting = panel.querySelector<HTMLElement>(
          ".service-supporting",
        );

        let imageTitleWords: HTMLElement[] = [];

        let taglineWords: HTMLElement[] = [];

        let descriptionLines: HTMLElement[] = [];

        let supportingLines: HTMLElement[] = [];

        if (imageTitle) {
          const split = new SplitText(imageTitle, {
            type: "lines,words",
            linesClass: "service-mask-line",
            wordsClass: "word",
          });

          localSplits.push(split);

          imageTitleWords = split.words as HTMLElement[];

          gsap.set(split.lines, {
            overflow: "hidden",
            perspective: 900,
          });
        }

        if (tagline) {
          const split = new SplitText(tagline, {
            type: "lines,words",
            linesClass: "service-mask-line",
            wordsClass: "word",
          });

          localSplits.push(split);

          taglineWords = split.words as HTMLElement[];

          gsap.set(split.lines, {
            overflow: "hidden",
            perspective: 900,
          });
        }

        if (description) {
          const split = new SplitText(description, {
            type: "lines",
            linesClass: "service-copy-line",
          });

          localSplits.push(split);

          descriptionLines = split.lines as HTMLElement[];
        }

        if (supporting) {
          const split = new SplitText(supporting, {
            type: "lines",
            linesClass: "service-copy-line",
          });

          localSplits.push(split);

          supportingLines = split.lines as HTMLElement[];
        }

        return {
          localSplits,
          imageTitleWords,
          taglineWords,
          descriptionLines,
          supportingLines,
        };
      };

      mm.add("(min-width: 1025px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(
          "[data-services-panel]",
          servicesSection,
        );

        const servicePanels = gsap.utils.toArray<HTMLElement>(
          "[data-service-panel]",
          servicesSection,
        );

        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        const panelSplits: SplitText[] = [];

        gsap.set(track, {
          x: 0,
        });

        gsap.set(progress, {
          width: "100%",
          scaleX: 0,
          transformOrigin: "left center",
        });

        gsap.set(progressWrap, {
          opacity: 1,
        });

        if (reducedMotion) {
          const reducedTimeline = gsap.timeline({
            defaults: {
              ease: "none",
            },
          });

          panels.slice(1).forEach((_, index) => {
            reducedTimeline.to(track, {
              x: () => -(index + 1) * window.innerWidth,
              duration: 1,
              ease: "none",
            });
          });

          const reducedTargetTimes = servicePanels.map((_, index) => index + 1);

          const reducedActivationTimes = servicePanels.map(
            (_, index) => index + 0.5,
          );

          serviceTargetTimesRef.current = reducedTargetTimes;

          masterTimelineRef.current = reducedTimeline;

          const reducedTrigger = ScrollTrigger.create({
            trigger: servicesSection,

            start: "top top",

            end: () =>
              `+=${window.innerWidth * Math.max(1, servicePanels.length)}`,

            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: reducedTimeline,

            onUpdate: (self) => {
              gsap.set(progress, {
                scaleX: self.progress,
              });

              gsap.set(progressWrap, {
                opacity: self.progress > 0.97 ? 0 : 1,
              });

              const currentTime = reducedTimeline.time();

              let nextActiveIndex = -1;

              reducedActivationTimes.forEach((activationTime, index) => {
                if (currentTime >= activationTime) {
                  nextActiveIndex = index;
                }
              });

              updateActiveService(nextActiveIndex);
            },
          });

          masterTriggerRef.current = reducedTrigger;

          return () => {
            if (masterTriggerRef.current === reducedTrigger) {
              masterTriggerRef.current = null;

              masterTimelineRef.current = null;

              serviceTargetTimesRef.current = [];
            }

            reducedTrigger.kill();
            reducedTimeline.kill();
          };
        }

        const master = gsap.timeline({
          paused: true,
        });

        const serviceTargetTimes: number[] = [];

        const serviceActivationTimes: number[] = [];

        const serviceRevealFinishTimes: number[] = [];

        const lockedPanels = new Set<number>();

        const setPanelFinalState = (panel: HTMLElement) => {
          const visualShell = panel.querySelector<HTMLElement>(
            ".service-visual-shell",
          );

          const visualImage = panel.querySelector<HTMLElement>(
            ".service-visual-image",
          );

          const visualOverlay = panel.querySelector<HTMLElement>(
            ".service-visual-overlay",
          );

          const numberWrap = panel.querySelector<HTMLElement>(
            ".service-number-wrap",
          );

          const imageTitleWords = panel.querySelectorAll<HTMLElement>(
            ".service-image-title .word",
          );

          const copyPanel = panel.querySelector<HTMLElement>(
            ".service-copy-panel",
          );

          const copyInner = panel.querySelector<HTMLElement>(
            ".service-copy-inner",
          );

          const taglineWords = panel.querySelectorAll<HTMLElement>(
            ".service-tagline .word",
          );

          const descriptionLines = panel.querySelectorAll<HTMLElement>(
            ".service-description .service-copy-line",
          );

          const keypointLabel = panel.querySelector<HTMLElement>(
            ".service-keypoints-label",
          );

          const keypointRows = panel.querySelectorAll<HTMLElement>(
            ".service-keypoint-row",
          );

          const supportingLines = panel.querySelectorAll<HTMLElement>(
            ".service-supporting .service-copy-line",
          );

          const cta = panel.querySelector<HTMLElement>(".service-cta");

          if (visualShell) {
            gsap.set(visualShell, {
              clipPath: "inset(0 0% 0 0 round 0px)",
            });
          }

          if (visualImage) {
            gsap.set(visualImage, {
              scale: 1,
              xPercent: 0,
              rotateZ: 0,
            });
          }

          if (visualOverlay) {
            gsap.set(visualOverlay, {
              opacity: 1,
            });
          }

          if (numberWrap) {
            gsap.set(numberWrap, {
              xPercent: 0,
              opacity: 1,
              skewX: 0,
              rotateZ: 0,
            });
          }

          if (imageTitleWords.length) {
            gsap.set(imageTitleWords, {
              yPercent: 0,
              rotateX: 0,
              rotateZ: 0,
              opacity: 1,
            });
          }

          if (copyPanel) {
            gsap.set(copyPanel, {
              clipPath: "inset(0 0 0 0%)",
            });
          }

          if (copyInner) {
            gsap.set(copyInner, {
              x: 0,
              opacity: 1,
            });
          }

          if (taglineWords.length) {
            gsap.set(taglineWords, {
              yPercent: 0,
              rotateX: 0,
              rotateZ: 0,
              opacity: 1,
            });
          }

          if (descriptionLines.length) {
            gsap.set(descriptionLines, {
              x: 0,
              y: 0,
              opacity: 1,
            });
          }

          if (keypointLabel) {
            gsap.set(keypointLabel, {
              x: 0,
              opacity: 1,
            });
          }

          if (keypointRows.length) {
            gsap.set(keypointRows, {
              x: 0,
              opacity: 1,
            });
          }

          if (supportingLines.length) {
            gsap.set(supportingLines, {
              y: 0,
              opacity: 1,
            });
          }

          if (cta) {
            gsap.set(cta, {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            });
          }
        };

        servicePanels.forEach((panel, index) => {
          const visualShell = panel.querySelector<HTMLElement>(
            ".service-visual-shell",
          );

          const visualImage = panel.querySelector<HTMLElement>(
            ".service-visual-image",
          );

          const visualOverlay = panel.querySelector<HTMLElement>(
            ".service-visual-overlay",
          );

          const numberWrap = panel.querySelector<HTMLElement>(
            ".service-number-wrap",
          );

          const copyPanel = panel.querySelector<HTMLElement>(
            ".service-copy-panel",
          );

          const copyInner = panel.querySelector<HTMLElement>(
            ".service-copy-inner",
          );

          const contentSweep = panel.querySelector<HTMLElement>(
            ".service-content-sweep",
          );

          const keypointRows = panel.querySelectorAll<HTMLElement>(
            ".service-keypoint-row",
          );

          const keypointLabel = panel.querySelector<HTMLElement>(
            ".service-keypoints-label",
          );

          const cta = panel.querySelector<HTMLElement>(".service-cta");

          const {
            localSplits,
            imageTitleWords,
            taglineWords,
            descriptionLines,
            supportingLines,
          } = setupPanelSplits(panel);

          panelSplits.push(...localSplits);

          if (visualShell) {
            gsap.set(visualShell, {
              clipPath: "inset(0 12% 0 0 round 0px)",
              transformOrigin: "left center",
            });
          }

          if (visualImage) {
            gsap.set(visualImage, {
              scale: 1.07,
              xPercent: 0,
              rotateZ: 0,
              transformOrigin: "50% 50%",
            });
          }

          if (visualOverlay) {
            gsap.set(visualOverlay, {
              opacity: 0.55,
            });
          }

          if (numberWrap) {
            gsap.set(numberWrap, {
              xPercent: 0,
              y: 18,
              opacity: 0,
              skewX: 0,
              rotateZ: 0,
            });
          }

          if (imageTitleWords.length) {
            gsap.set(imageTitleWords, {
              yPercent: 32,
              rotateX: 0,
              opacity: 0,
              transformOrigin: "50% 100%",
              transformPerspective: 900,
            });
          }

          if (copyPanel) {
            gsap.set(copyPanel, {
              clipPath: "inset(0 0 0 0%)",
            });
          }

          if (copyInner) {
            gsap.set(copyInner, {
              x: 0,
              opacity: 0,
            });
          }

          if (contentSweep) {
            gsap.set(contentSweep, {
              scaleY: 0,
              transformOrigin: "top center",
            });
          }

          if (taglineWords.length) {
            gsap.set(taglineWords, {
              yPercent: 34,
              rotateX: 0,
              opacity: 0,
              transformOrigin: "50% 100%",
              transformPerspective: 900,
            });
          }

          if (descriptionLines.length) {
            gsap.set(descriptionLines, {
              y: 22,
              opacity: 0,
            });
          }

          if (keypointLabel) {
            gsap.set(keypointLabel, {
              x: 24,
              opacity: 0,
            });
          }

          if (keypointRows.length) {
            gsap.set(keypointRows, {
              x: 38,
              opacity: 0,
            });
          }

          if (supportingLines.length) {
            gsap.set(supportingLines, {
              y: 18,
              opacity: 0,
            });
          }

          if (cta) {
            gsap.set(cta, {
              y: 30,
              opacity: 0,
              scale: 0.975,
              transformOrigin: "left center",
            });
          }

          const segmentStart = master.duration();

          const moveDuration = 0.82;

          const panelLanding = segmentStart + moveDuration;

          const visualQuickStart = segmentStart + moveDuration * 0.58;

          const quickCopyStart = panelLanding - 0.08;

          const quickCopyFinish = panelLanding + 0.28;

          const detailsStart = panelLanding + 0.3;

          const revealFinish = panelLanding + 1.26;

          const holdDuration = 0.3;

          const segmentEnd = revealFinish + holdDuration;

          serviceActivationTimes[index] = segmentStart + moveDuration * 0.66;

          serviceRevealFinishTimes[index] = revealFinish;

          serviceTargetTimes[index] = quickCopyFinish;

          master.to(
            track,
            {
              x: () => -(index + 1) * window.innerWidth,
              duration: moveDuration,
              ease: "power3.inOut",
            },
            segmentStart,
          );

          if (visualShell) {
            master.to(
              visualShell,
              {
                clipPath: "inset(0 0% 0 0 round 0px)",
                duration: 0.34,
                ease: "power3.out",
              },
              visualQuickStart - 0.05,
            );
          }

          if (visualImage) {
            master.to(
              visualImage,
              {
                scale: 1,
                xPercent: 0,
                rotateZ: 0,
                duration: 0.48,
                ease: "power3.out",
              },
              visualQuickStart - 0.04,
            );
          }

          if (visualOverlay) {
            master.to(
              visualOverlay,
              {
                opacity: 1,
                duration: 0.34,
                ease: "power2.out",
              },
              visualQuickStart,
            );
          }

          if (numberWrap) {
            master.to(
              numberWrap,
              {
                y: 0,
                opacity: 1,
                duration: 0.28,
                ease: "power3.out",
              },
              visualQuickStart + 0.03,
            );
          }

          if (imageTitleWords.length) {
            master.to(
              imageTitleWords,
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.012,
                ease: "power3.out",
              },
              visualQuickStart + 0.07,
            );
          }

          if (copyInner) {
            master.to(
              copyInner,
              {
                opacity: 1,
                duration: 0.24,
                ease: "power2.out",
              },
              quickCopyStart,
            );
          }

          if (contentSweep) {
            master
              .to(
                contentSweep,
                {
                  scaleY: 1,
                  duration: 0.12,
                  ease: "power3.in",
                },
                quickCopyStart,
              )
              .to(
                contentSweep,
                {
                  scaleY: 0,
                  transformOrigin: "bottom center",
                  duration: 0.18,
                  ease: "power3.out",
                },
                quickCopyStart + 0.12,
              );
          }

          if (taglineWords.length) {
            master.to(
              taglineWords,
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.32,
                stagger: 0.012,
                ease: "power3.out",
              },
              quickCopyStart + 0.02,
            );
          }

          if (descriptionLines.length) {
            master.to(
              descriptionLines,
              {
                y: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.018,
                ease: "power2.out",
              },
              quickCopyStart + 0.12,
            );
          }

          if (keypointLabel) {
            master.to(
              keypointLabel,
              {
                x: 0,
                opacity: 1,
                duration: 0.25,
                ease: "power3.out",
              },
              detailsStart,
            );
          }

          if (keypointRows.length) {
            master.to(
              keypointRows,
              {
                x: 0,
                opacity: 1,
                duration: 0.34,
                stagger: 0.11,
                ease: "power3.out",
              },
              detailsStart + 0.1,
            );
          }

          if (supportingLines.length) {
            master.to(
              supportingLines,
              {
                y: 0,
                opacity: 1,
                duration: 0.32,
                stagger: 0.035,
                ease: "power3.out",
              },
              detailsStart + 0.62,
            );
          }

          if (cta) {
            master.to(
              cta,
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.36,
                ease: "back.out(1.3)",
              },
              detailsStart + 0.78,
            );
          }

          master.to(
            {},
            {
              duration: holdDuration,
            },
            revealFinish,
          );

          master.to(
            {},
            {
              duration: 0.001,
            },
            segmentEnd,
          );
        });

        serviceTargetTimesRef.current = serviceTargetTimes;

        serviceFullTargetTimesRef.current = serviceRevealFinishTimes;

        masterTimelineRef.current = master;

        const masterTrigger = ScrollTrigger.create({
          trigger: servicesSection,

          start: "top top",

          end: () => `+=${window.innerWidth * Math.max(master.duration(), 1)}`,

          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: master,

          onUpdate: (self) => {
            gsap.set(progress, {
              scaleX: self.progress,
            });

            gsap.to(progressWrap, {
              opacity: self.progress > 0.97 ? 0 : 1,

              duration: 0.2,
              overwrite: true,
            });

            const currentTime = master.time();

            let nextActiveIndex = -1;

            serviceActivationTimes.forEach((activationTime, index) => {
              if (currentTime >= activationTime) {
                nextActiveIndex = index;
              }
            });

            updateActiveService(nextActiveIndex);

            serviceRevealFinishTimes.forEach((finishTime, index) => {
              if (currentTime >= finishTime) {
                lockedPanels.add(index);
              }
            });

            if (self.direction < 0 && nextActiveIndex >= 0) {
              lockedPanels.add(nextActiveIndex);
            }

            lockedPanels.forEach((panelIndex) => {
              const panel = servicePanels[panelIndex];

              if (panel) {
                setPanelFinalState(panel);
              }
            });
          },
        });

        masterTriggerRef.current = masterTrigger;

        const clearAutoSnapTimer = () => {
          if (!autoSnapTimerRef.current) {
            return;
          }

          clearTimeout(autoSnapTimerRef.current);

          autoSnapTimerRef.current = null;
        };

        const cancelAutoSnapTween = () => {
          if (!isAutoSnappingRef.current) {
            return;
          }

          autoSnapTweenRef.current?.kill();

          autoSnapTweenRef.current = null;

          isAutoSnappingRef.current = false;
        };

        const snapToDominantPanel = () => {
          autoSnapTimerRef.current = null;

          if (
            isAutoSnappingRef.current ||
            window.innerWidth <= 1024 ||
            !masterTriggerRef.current ||
            master.duration() <= 0
          ) {
            return;
          }

          const trigger = masterTriggerRef.current;

          const currentScroll = window.scrollY;

          if (
            currentScroll < trigger.start - 2 ||
            currentScroll > trigger.end + 2
          ) {
            return;
          }

          const trackX = Number(gsap.getProperty(track, "x")) || 0;

          const panelPosition = Math.max(
            0,
            Math.min(
              servicePanels.length,
              Math.abs(trackX) / Math.max(window.innerWidth, 1),
            ),
          );

          const dominantPanel = Math.round(panelPosition);

          const distanceFromAligned = Math.abs(panelPosition - dominantPanel);

          const currentTimelineTime = master.time();

          let targetTime = 0;
          let targetServiceIndex = -1;

          if (dominantPanel > 0) {
            targetServiceIndex = dominantPanel - 1;

            const fullTargetTime =
              serviceFullTargetTimesRef.current[targetServiceIndex];

            if (typeof fullTargetTime !== "number") {
              return;
            }

            const panelIsAligned = distanceFromAligned < 0.025;

            const contentIsComplete =
              currentTimelineTime >= fullTargetTime - 0.025;

            if (panelIsAligned && contentIsComplete) {
              return;
            }

            targetTime = fullTargetTime;
          } else {
            if (distanceFromAligned < 0.025) {
              return;
            }

            targetTime = 0;
          }

          const targetProgress = Math.min(
            1,
            Math.max(0, targetTime / master.duration()),
          );

          const targetScroll =
            trigger.start + (trigger.end - trigger.start) * targetProgress;

          jumpTweenRef.current?.kill();

          autoSnapTweenRef.current?.kill();

          const scrollState = {
            y: window.scrollY,
          };

          isAutoSnappingRef.current = true;

          autoSnapTweenRef.current = gsap.to(scrollState, {
            y: targetScroll,
            duration: 0.95,
            ease: "power3.inOut",
            overwrite: true,

            onUpdate: () => {
              window.scrollTo(0, scrollState.y);
            },

            onComplete: () => {
              autoSnapTweenRef.current = null;

              isAutoSnappingRef.current = false;

              if (targetServiceIndex >= 0) {
                updateActiveService(targetServiceIndex);

                const panel = servicePanels[targetServiceIndex];

                if (panel) {
                  lockedPanels.add(targetServiceIndex);

                  setPanelFinalState(panel);
                }
              } else {
                updateActiveService(-1);
              }
            },
          });
        };

        const scheduleAutoSnap = () => {
          clearAutoSnapTimer();

          if (isAutoSnappingRef.current || window.innerWidth <= 1024) {
            return;
          }

          const trigger = masterTriggerRef.current;

          if (!trigger) return;

          const currentScroll = window.scrollY;

          if (
            currentScroll < trigger.start - 2 ||
            currentScroll > trigger.end + 2
          ) {
            return;
          }

          autoSnapTimerRef.current = setTimeout(() => {
            snapToDominantPanel();
          }, 1000);
        };

        const handleUserInterrupt = () => {
          if (isAutoSnappingRef.current) {
            cancelAutoSnapTween();
          }

          clearAutoSnapTimer();
        };

        window.addEventListener("scroll", scheduleAutoSnap, {
          passive: true,
        });

        window.addEventListener("wheel", handleUserInterrupt, {
          passive: true,
        });

        window.addEventListener("touchstart", handleUserInterrupt, {
          passive: true,
        });

        window.addEventListener("pointerdown", handleUserInterrupt, {
          passive: true,
        });

        return () => {
          window.removeEventListener("scroll", scheduleAutoSnap);

          window.removeEventListener("wheel", handleUserInterrupt);

          window.removeEventListener("touchstart", handleUserInterrupt);

          window.removeEventListener("pointerdown", handleUserInterrupt);

          clearAutoSnapTimer();
          cancelAutoSnapTween();

          if (masterTriggerRef.current === masterTrigger) {
            masterTriggerRef.current = null;

            masterTimelineRef.current = null;

            serviceTargetTimesRef.current = [];

            serviceFullTargetTimesRef.current = [];
          }

          masterTrigger.kill();
          master.kill();

          panelSplits.forEach((split) => split.revert());
        };
      });

      mm.add("(max-width: 1024px)", () => {
        const servicePanels = gsap.utils.toArray<HTMLElement>(
          "[data-service-panel]",
          servicesSection,
        );

        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        const mobileTimelines: gsap.core.Timeline[] = [];

        const mobileSplits: SplitText[] = [];

        gsap.set(track, {
          clearProps: "transform",
        });

        gsap.set(progressWrap, {
          display: "none",
        });

        servicePanels.forEach((panel) => {
          const visualShell = panel.querySelector<HTMLElement>(
            ".service-visual-shell",
          );

          const visualImage = panel.querySelector<HTMLElement>(
            ".service-visual-image",
          );

          const numberWrap = panel.querySelector<HTMLElement>(
            ".service-number-wrap",
          );

          const copyPanel = panel.querySelector<HTMLElement>(
            ".service-copy-panel",
          );

          const contentSweep = panel.querySelector<HTMLElement>(
            ".service-content-sweep",
          );

          const keypointRows = panel.querySelectorAll<HTMLElement>(
            ".service-keypoint-row",
          );

          const keypointLabel = panel.querySelector<HTMLElement>(
            ".service-keypoints-label",
          );

          const cta = panel.querySelector<HTMLElement>(".service-cta");

          const {
            localSplits,
            imageTitleWords,
            taglineWords,
            descriptionLines,
            supportingLines,
          } = setupPanelSplits(panel);

          mobileSplits.push(...localSplits);

          if (reducedMotion) {
            return;
          }

          if (visualShell) {
            gsap.set(visualShell, {
              clipPath: "inset(0 0 22% 0)",
            });
          }

          if (visualImage) {
            gsap.set(visualImage, {
              scale: 1.12,
              yPercent: 5,
            });
          }

          if (numberWrap) {
            gsap.set(numberWrap, {
              xPercent: -45,
              opacity: 0,
            });
          }

          if (imageTitleWords.length) {
            gsap.set(imageTitleWords, {
              yPercent: 125,
              rotateX: -55,
              opacity: 0,
              transformPerspective: 800,
            });
          }

          if (taglineWords.length) {
            gsap.set(taglineWords, {
              yPercent: 120,
              rotateX: -50,
              opacity: 0,
              transformPerspective: 800,
            });
          }

          if (descriptionLines.length) {
            gsap.set(descriptionLines, {
              y: 24,
              opacity: 0,
            });
          }

          if (keypointLabel) {
            gsap.set(keypointLabel, {
              x: 28,
              opacity: 0,
            });
          }

          if (keypointRows.length) {
            gsap.set(keypointRows, {
              x: 45,
              opacity: 0,
            });
          }

          if (supportingLines.length) {
            gsap.set(supportingLines, {
              y: 20,
              opacity: 0,
            });
          }

          if (cta) {
            gsap.set(cta, {
              y: 30,
              opacity: 0,
            });
          }

          if (contentSweep) {
            gsap.set(contentSweep, {
              scaleX: 0,
              transformOrigin: "left center",
            });
          }

          if (visualShell) {
            const visualTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: visualShell,

                start: "top 90%",
                end: "top 42%",
                scrub: 0.7,
              },
            });

            visualTimeline.to(
              visualShell,
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1,
                ease: "power3.inOut",
              },
              0,
            );

            if (visualImage) {
              visualTimeline.to(
                visualImage,
                {
                  scale: 1,
                  yPercent: 0,
                  duration: 1.15,
                  ease: "power3.out",
                },
                0,
              );
            }

            if (numberWrap) {
              visualTimeline.to(
                numberWrap,
                {
                  xPercent: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power4.out",
                },
                0.22,
              );
            }

            if (imageTitleWords.length) {
              visualTimeline.to(
                imageTitleWords,
                {
                  yPercent: 0,
                  rotateX: 0,
                  opacity: 1,
                  duration: 0.65,
                  stagger: 0.035,
                  ease: "power4.out",
                },
                0.25,
              );
            }

            mobileTimelines.push(visualTimeline);
          }

          if (copyPanel) {
            const copyTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: copyPanel,

                start: "top 88%",
                end: "top 38%",
                scrub: 0.7,
              },
            });

            if (contentSweep) {
              copyTimeline
                .to(
                  contentSweep,
                  {
                    scaleX: 1,
                    duration: 0.2,
                    ease: "power3.in",
                  },
                  0,
                )
                .to(
                  contentSweep,
                  {
                    scaleX: 0,
                    transformOrigin: "right center",
                    duration: 0.3,
                    ease: "power3.out",
                  },
                  0.24,
                );
            }

            if (taglineWords.length) {
              copyTimeline.to(
                taglineWords,
                {
                  yPercent: 0,
                  rotateX: 0,
                  opacity: 1,
                  duration: 0.65,
                  stagger: 0.025,
                  ease: "power4.out",
                },
                0.12,
              );
            }

            if (descriptionLines.length) {
              copyTimeline.to(
                descriptionLines,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.45,
                  stagger: 0.04,
                  ease: "power3.out",
                },
                0.3,
              );
            }

            if (keypointLabel) {
              copyTimeline.to(
                keypointLabel,
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.35,
                  ease: "power3.out",
                },
                0.43,
              );
            }

            if (keypointRows.length) {
              copyTimeline.to(
                keypointRows,
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.06,
                  ease: "power3.out",
                },
                0.48,
              );
            }

            if (supportingLines.length) {
              copyTimeline.to(
                supportingLines,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.42,
                  stagger: 0.04,
                  ease: "power3.out",
                },
                0.68,
              );
            }

            if (cta) {
              copyTimeline.to(
                cta,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.42,
                  ease: "back.out(1.4)",
                },
                0.76,
              );
            }

            mobileTimelines.push(copyTimeline);
          }
        });

        return () => {
          mobileTimelines.forEach((timeline) => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          });

          mobileSplits.forEach((split) => split.revert());
        };
      });

      const inquirySection = root.querySelector<HTMLElement>(
        ".services-inquiry-section",
      );

      const inquiryFrame = root.querySelector<HTMLElement>(
        ".services-inquiry-frame",
      );

      const inquiryTop = root.querySelector<HTMLElement>(
        ".services-inquiry-top",
      );

      const inquiryTitle = root.querySelector<HTMLElement>(
        ".services-inquiry-title",
      );

      const inquiryForm = root.querySelector<HTMLElement>(
        ".services-inquiry-form",
      );

      const inquiryFields = root.querySelectorAll<HTMLElement>(
        ".service-form-field",
      );

      const inquiryLabels = root.querySelectorAll<HTMLElement>(
        ".service-form-label",
      );

      const inquiryControls = root.querySelectorAll<HTMLElement>(
        ".service-form-control",
      );

      const inquiryLines =
        root.querySelectorAll<HTMLElement>(".service-form-line");

      const inquirySubmit = root.querySelector<HTMLElement>(
        ".service-form-submit-wrap",
      );

      if (inquirySection && inquiryFrame) {
        gsap.set(inquiryFrame, {
          scale: 0.72,
          transformOrigin: "50% 50%",
        });

        gsap.to(inquiryFrame, {
          scale: 1,
          ease: "none",

          scrollTrigger: {
            trigger: inquirySection,

            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        });

        if (inquiryTop) {
          gsap.set(inquiryTop, {
            opacity: 0,
          });

          gsap.to(inquiryTop, {
            opacity: 1,
            duration: 1,
            ease: "power4.inOut",

            scrollTrigger: {
              trigger: inquiryTop,

              start: "center 92%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryTitle) {
          const inquiryTitleSplit = new SplitText(inquiryTitle, {
            type: "chars,words",
            charsClass: "char",
            wordsClass: "word",
          });

          splits.push(inquiryTitleSplit);

          gsap.set(inquiryTitleSplit.chars, {
            willChange: "transform",

            transformOrigin: "50% 0%",

            scaleY: 0,
            opacity: 0,
          });

          gsap.to(inquiryTitleSplit.chars, {
            scaleY: 1,
            opacity: 1,
            duration: 0.85,
            stagger: 0.025,

            ease: "back.out(1.7)",

            scrollTrigger: {
              trigger: inquiryTitle,

              start: "center bottom-=5%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryForm) {
          gsap.set(inquiryForm, {
            opacity: 0,
          });

          gsap.to(inquiryForm, {
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",

            scrollTrigger: {
              trigger: inquiryForm,

              start: "top 88%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryFields.length) {
          gsap.set(inquiryFields, {
            y: 58,
            opacity: 0,

            clipPath: "inset(0 0 100% 0)",
          });

          gsap.to(inquiryFields, {
            y: 0,
            opacity: 1,

            clipPath: "inset(0 0 0% 0)",

            duration: 0.85,
            stagger: 0.075,
            ease: "power4.out",

            scrollTrigger: {
              trigger: inquiryForm ?? inquirySection,

              start: "top 84%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryLabels.length) {
          gsap.set(inquiryLabels, {
            x: 28,
            opacity: 0,
          });

          gsap.to(inquiryLabels, {
            x: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.055,
            ease: "power3.out",

            scrollTrigger: {
              trigger: inquiryForm ?? inquirySection,

              start: "top 82%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryControls.length) {
          gsap.set(inquiryControls, {
            y: 24,
            opacity: 0,
          });

          gsap.to(inquiryControls, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",

            scrollTrigger: {
              trigger: inquiryForm ?? inquirySection,

              start: "top 80%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquiryLines.length) {
          gsap.set(inquiryLines, {
            scaleX: 0,

            transformOrigin: "left center",
          });

          gsap.to(inquiryLines, {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "power4.out",

            scrollTrigger: {
              trigger: inquiryForm ?? inquirySection,

              start: "top 78%",

              toggleActions: "play none none none",
            },
          });
        }

        if (inquirySubmit) {
          gsap.set(inquirySubmit, {
            y: 55,
            opacity: 0,
            scale: 0.94,

            transformOrigin: "left center",
          });

          gsap.to(inquirySubmit, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,

            ease: "back.out(1.5)",

            scrollTrigger: {
              trigger: inquirySubmit,

              start: "top 92%",

              toggleActions: "play none none none",
            },
          });
        }
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }

      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", handleResize);

      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }

      jumpTweenRef.current?.kill();
      jumpTweenRef.current = null;

      if (autoSnapTimerRef.current) {
        clearTimeout(autoSnapTimerRef.current);

        autoSnapTimerRef.current = null;
      }

      autoSnapTweenRef.current?.kill();

      autoSnapTweenRef.current = null;

      isAutoSnappingRef.current = false;

      listeners.forEach((cleanup) => {
        cleanup();
      });

      splits.forEach((split) => {
        split.revert();
      });

      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <PageTransition initialCovered />

      <main className="overflow-x-clip bg-white text-[var(--mvp-primary)]">
        <section
          ref={servicesRef}
          className="hero-services relative min-[1025px]:h-[100svh]"
        >
          <ServiceNavigator
            activeIndex={activeServiceIndex}
            onSelect={jumpToService}
          />

          <div
            ref={trackRef}
            className="hero-services__x-scroll flex w-full flex-col min-[1025px]:h-full min-[1025px]:w-max min-[1025px]:flex-row"
          >
            <section
              data-services-panel
              className="relative flex h-[100svh] min-h-[650rem] w-full shrink-0 items-end overflow-hidden pb-[35rem] min-[1025px]:w-screen max-[1024px]:pb-[25rem]"
            >
              <Image
                src="/assets/img/services-page/hero-bg.png"
                alt="Difference Integrated logistics services"
                fill
                priority
                quality={82}
                sizes="100vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,55,.18)_0%,rgba(10,18,55,.38)_48%,rgba(10,18,55,.82)_100%)]" />

              <div className="mvp-container relative z-[2] flex w-full items-end justify-between gap-[70rem] max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-[30rem]">
                <h1 className="services-main-animated-text shrink-0 text-[200rem] uppercase leading-[0.8] tracking-[-0.025em] text-white max-[1024px]:text-[80rem]">
                  Our Services
                </h1>

                <div className="services-hero-copy mb-[10rem] max-w-[650rem] text-white max-[1024px]:mb-0">
                  <h2 className="mb-[18rem] text-[60rem] font-bold uppercase leading-[54rem] max-[1024px]:text-[38rem] max-[1024px]:leading-[36rem]">
                    Every movement has its own requirements.
                  </h2>

                  <div className="space-y-[12rem] font-['Inter'] text-[20rem] font-normal leading-[27rem] max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
                    <p>
                      Cargo type, volume, site access, delivery timing, and
                      working conditions all influence how transportation should
                      be handled.
                    </p>

                    <p>
                      Difference Integrated provides specialized transport and
                      logistics services shaped around the operational
                      requirements of each assignment across Saudi Arabia.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {services.map((service) => (
              <section
                key={service.number}
                id={`service-${service.number}`}
                data-services-panel
                data-service-panel
                className="flex h-auto min-h-[650rem] w-full shrink-0 flex-col bg-white min-[1025px]:h-[100svh] min-[1025px]:w-screen min-[1025px]:flex-row"
              >
                <div className="service-visual-shell relative flex h-[395rem] w-full shrink-0 items-end overflow-hidden px-[20rem] py-[20rem] min-[1025px]:h-full min-[1025px]:w-[50vw] min-[1025px]:px-[40rem] min-[1025px]:pb-[34rem]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="service-visual-image object-cover object-center"
                  />

                  <div className="service-visual-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                  <div className="relative z-[2] flex items-end gap-[65rem] text-white max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-[10rem]">
                    <div className="service-number-wrap flex items-end gap-[8rem]">
                      <span className="text-[150rem] leading-[0.8] max-[1024px]:text-[100rem]">
                        {service.number}
                      </span>

                      <span className="mb-[8rem] font-['Inter'] text-[16rem] font-medium leading-none text-white/75 max-[1024px]:mb-[4rem]">
                        / 10
                      </span>
                    </div>

                    <h2 className="service-image-title max-w-[610rem] text-[60rem] font-bold uppercase leading-[54rem] max-[1024px]:max-w-[340rem] max-[1024px]:text-[40rem] max-[1024px]:leading-[38rem]">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <div className="service-copy-panel relative flex flex-1 flex-col justify-between overflow-hidden bg-white px-[clamp(42rem,4.6vw,96rem)] pb-[38rem] pt-[clamp(102rem,7vw,128rem)] min-[1025px]:h-full min-[1025px]:w-[50vw] max-[1024px]:gap-[35rem] max-[1024px]:px-[20rem] max-[1024px]:pb-[80rem] max-[1024px]:pt-[40rem]">
                  <span
                    className="service-content-sweep pointer-events-none absolute inset-y-0 left-0 z-[3] w-[8rem] bg-[var(--mvp-accent)] max-[1024px]:inset-x-0 max-[1024px]:bottom-auto max-[1024px]:h-[5rem] max-[1024px]:w-full"
                    aria-hidden="true"
                  />

                  <div className="service-copy-inner max-w-[720rem]">
                    <h3 className="service-tagline text-[56rem] font-bold uppercase leading-[0.92] tracking-[-0.012em] max-[1024px]:text-[38rem] max-[1024px]:leading-[36rem]">
                      {service.tagline}
                    </h3>

                    <p className="service-description mt-[18rem] max-w-[700rem] font-['Inter'] text-[19rem] font-normal leading-[27rem] text-[var(--mvp-primary)]/88 max-[1024px]:text-[16rem] max-[1024px]:leading-[23rem]">
                      {service.description}
                    </p>

                    <div className="mt-[26rem]">
                      <p className="service-keypoints-label mb-[10rem] text-[18rem] font-bold uppercase tracking-[0.04em]">
                        Key Points
                      </p>

                      <KeyPointsAccordion points={service.points} />
                    </div>

                    <p className="service-supporting mt-[20rem] max-w-[680rem] font-['Inter'] text-[16rem] font-normal leading-[23rem] text-[var(--mvp-primary)]/76 max-[1024px]:text-[15rem] max-[1024px]:leading-[21rem]">
                      {service.supportingCopy}
                    </p>
                  </div>

                  <div className="service-cta mt-[26rem] max-w-[545rem]">
                    <ServiceButton />
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div
            ref={progressWrapRef}
            className="pointer-events-none absolute bottom-0 left-0 z-30 hidden h-[2rem] w-full bg-[#F4F4F7] min-[1025px]:block"
          >
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full bg-[var(--mvp-accent)]"
            />
          </div>
        </section>

        <ServicesInquiryForm />
      </main>
    </div>
  );
}
