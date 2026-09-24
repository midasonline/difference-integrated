export function Preloader() {
  return (
    <div className="preloader fixed inset-0 z-[70] flex h-screen items-end pb-[35rem]">
      <div className="mvp-container w-full">
        <div className="relative flex w-full items-end justify-between border-b border-transparent pb-[10rem] text-[30rem] leading-[.9] uppercase max-[1024px]:text-[20rem]">
          <div className="main-animated-text">Difference Integrated Logistics</div>
          <div className="main-animated-text text-right"><span className="preloader__progress-number">0</span>%</div>
          <span className="preloader__container-line absolute bottom-0 left-0 h-[1rem] w-0 bg-[rgba(31,31,97,.15)]" />
        </div>
      </div>
    </div>
  );
}
