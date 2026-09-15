"use client";

export default function UniverseBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Looping Cosmic Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/universe-bg.png"
        className="object-cover object-center w-full h-full scale-105 opacity-90 transition-opacity duration-1000"
      >
        <source src="/sylmapbgvideo.mp4" type="video/mp4" />
      </video>

      {/* Subtle Atmospheric Vignette & Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-slate-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/30 to-slate-950/80" />
    </div>
  );
}
