"use client";

import Image from "next/image";

export default function EarthScene() {
  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-auto">
      <Image
        src="/sylmap_earth_transparent.png"
        alt="Sylmap Earth"
        fill
        priority
        quality={95}
        sizes="(max-width: 768px) 300px, 500px"
        className="object-contain drop-shadow-[0_0_35px_rgba(0,242,254,0.25)] select-none"
      />
    </div>
  );
}
