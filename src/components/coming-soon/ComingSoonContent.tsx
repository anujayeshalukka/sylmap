"use client";

import { Sparkles } from "lucide-react";

export default function ComingSoonContent() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-4xl mx-auto lg:mx-0 z-30 pt-2 sm:pt-4 pb-4 sm:pb-6">
      {/* Platform Status Pill */}
      <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.1)]">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="tracking-wide uppercase">Academic Intelligence Platform</span>
      </div>

      {/* Primary Headline: COMING SOON */}
      <div className="mb-2 sm:mb-3">
        <h1 className="text-3xl sm:text-5xl lg:text-8xl font-extrabold tracking-tight text-white uppercase font-sans sylmap-heading-glow">
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
            COMING SOON
          </span>
        </h1>
      </div>

      {/* Supporting Message */}
      <h2 className="text-xl sm:text-sm lg:text-xl font-semibold text-white tracking-tight max-w-xl mx-auto lg:mx-0 mb-3 sm:mb-4">
        The academic universe is taking shape.
      </h2>
    </div>
  );
}
