"use client";

import Image from "next/image";

export default function EarthScene() {
  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-auto">
      {/* Central Cyan Glow Halo behind Earth */}
      <div className="absolute w-[80%] h-[80%] rounded-full bg-cyan-400/10 blur-[50px] animate-pulse-glow pointer-events-none" />
      
      <Image
        src="/sylmap_earth_transparent.png"
        alt="Sylmap Academic Earth"
        fill
        priority
        quality={95}
        sizes="(max-width: 640px) 240px, (max-width: 1024px) 380px, 500px"
        className="object-contain drop-shadow-[0_0_45px_rgba(0,242,254,0.35)] select-none animate-subtle-float"
      />
    </div>
  );
}
