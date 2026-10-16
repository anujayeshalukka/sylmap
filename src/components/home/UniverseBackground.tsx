"use client";

import { useEffect, useState } from "react";

const VIDEO_SRC = "/sylmapbgvideo.mp4";

export interface UniverseBackgroundProps {
  /**
   * When the looping background video loads. The poster (the video's still) shows until it plays.
   * - "eager" (default): loads with the page, as on the approved homepage.
   * - "after-load": starts after the window load event, so the large video does not compete with the
   *   page's scripts and images for the first paint.
   * - "poster": never loads the video; for short-lived layers such as the preloader overlay, which would
   *   otherwise download a second copy of the same video.
   */
  video?: "eager" | "after-load" | "poster";
}

export default function UniverseBackground({ video = "eager" }: UniverseBackgroundProps) {
  const [videoReady, setVideoReady] = useState(video === "eager");

  useEffect(() => {
    if (video !== "after-load") return;
    const start = () => setVideoReady(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [video]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Looping Cosmic Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/universe-bg.png"
        // Deferred modes set src directly: unlike adding a <source> later, setting src starts loading.
        src={video !== "eager" && videoReady ? VIDEO_SRC : undefined}
        className="object-cover object-center w-full h-full scale-105 opacity-90 transition-opacity duration-1000"
      >
        {video === "eager" && <source src={VIDEO_SRC} type="video/mp4" />}
      </video>

      {/* Subtle Atmospheric Vignette & Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-canvas/90 via-canvas/40 to-canvas/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/80 via-transparent to-canvas/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-canvas/30 to-canvas/80" />
    </div>
  );
}
