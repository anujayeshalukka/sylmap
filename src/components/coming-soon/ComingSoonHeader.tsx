"use client";

import Image from "next/image";
import Link from "next/link";

export default function ComingSoonHeader() {
  return (
    <header className="relative z-30 w-full py-4 sm:py-6 flex flex-col items-center lg:items-start justify-center lg:justify-start border-b border-white/[0.04] bg-transparent">
      {/* Brand Identity / Logo */}
      <Link
        href="/"
        className="inline-flex items-center transition-all duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-lg"
      >
        <Image
          src="/sylmap.webp"
          alt="Sylmap"
          width={340}
          height={90}
          priority
          quality={95}
          className="h-10 sm:h-12 lg:h-14 xl:h-16 w-auto object-contain transition-all block drop-shadow-[0_0_20px_rgba(0,242,254,0.2)]"
        />
      </Link>
    </header>
  );
}
