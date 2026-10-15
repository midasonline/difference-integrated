import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Refresh after real layout changes, without reacting to every iOS toolbar tick. */
export function observeAnimationLayout(
  root: HTMLElement,
  canRefresh: () => boolean = () => true,
) {
  let disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let width = window.innerWidth;
  let height = window.innerHeight;
  const refresh = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!disposed && canRefresh()) ScrollTrigger.refresh();
    }, 180);
  };
  const resize = () => {
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;
    const toolbarOnly =
      window.matchMedia("(pointer: coarse)").matches &&
      nextWidth === width &&
      Math.abs(nextHeight - height) < height * 0.25;
    if (toolbarOnly) return;
    width = nextWidth;
    height = nextHeight;
    refresh();
  };
  const mediaLoaded = (event: Event) => {
    if (
      event.target instanceof HTMLImageElement ||
      event.target instanceof HTMLVideoElement
    )
      refresh();
  };
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("orientationchange", refresh, { passive: true });
  root.addEventListener("load", mediaLoaded, true);
  root.addEventListener("loadedmetadata", mediaLoaded, true);
  void document.fonts.ready.then(() => {
    if (!disposed) refresh();
  });
  refresh();
  return () => {
    disposed = true;
    clearTimeout(timer);
    window.removeEventListener("resize", resize);
    window.removeEventListener("orientationchange", refresh);
    root.removeEventListener("load", mediaLoaded, true);
    root.removeEventListener("loadedmetadata", mediaLoaded, true);
  };
}
