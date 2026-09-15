"use client";

import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0">
      {/* Top Badge Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.15)]">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>India&apos;s AI-Powered Academic Intelligence Platform</span>
      </div>

      {/* Main Headline matching reference typography and text colors */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans">
        Navigate the <br className="hidden sm:inline" />
        Academic{" "}
        <span className="bg-gradient-to-r from-[#4CA3FF] via-[#00F2FE] to-[#38EF7D] bg-clip-text text-transparent">
          Universe
        </span>
      </h1>
    </div>
  );
}
