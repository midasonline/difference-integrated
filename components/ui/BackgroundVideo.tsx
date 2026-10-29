"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/components/i18n/I18nProvider";

/** One source at every breakpoint; browser policy may still require a tap. */
export function BackgroundVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsPlay, setNeedsPlay] = useState(false);
  const { locale } = useI18n();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let disposed = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      if (motion.matches) {
        video.pause();
        setNeedsPlay(true);
        return;
      }
      void video
        .play()
        .then(() => {
          if (!disposed) setNeedsPlay(false);
        })
        .catch(() => {
          if (!disposed) setNeedsPlay(true);
        });
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else setNeedsPlay(false);
    });
    observer.observe(video);
    motion.addEventListener("change", play);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", play);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center "
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlaying={() => setNeedsPlay(false)}
      />
      {needsPlay &&
        createPortal(
          <button
            type="button"
            className="background-video__play"
            onClick={() => {
              void videoRef.current?.play().catch(() => setNeedsPlay(true));
            }}
          >
            {locale === "ar" ? "تشغيل الفيديو" : "Play video"}
          </button>,
          document.body,
        )}
    </>
  );
}
