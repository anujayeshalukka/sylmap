"use client";

import UniverseBackground from "./UniverseBackground";
import EarthScene from "./EarthScene";
import OrbitSystem from "./OrbitSystem";
import AcademicLabels from "./AcademicLabels";
import HeroHeader from "./HeroHeader";
import Hero from "./Hero";
import HeroSearch from "./HeroSearch";
import QuickAccess from "./QuickAccess";
import ParallaxLayer from "./ParallaxLayer";

export default function HomePage() {
  return (
    <main className="home-shell bg-slate-950 text-slate-100 flex flex-col justify-between select-none relative min-h-screen">
      {/* Layer 0: Universe Background (Completely Static) */}
      <UniverseBackground />

      {/* Layer 10 & 2: Outer Content Boundary & Single Unified Responsive Hero Grid */}
      <div className="relative z-20 flex flex-col min-h-screen justify-between w-full px-4 sm:px-8 lg:px-10 xl:px-[7.5vw] 2xl:px-[6vw] max-w-[1920px] mx-auto pb-2 sm:pb-3 lg:pb-4 pt-0">
        {/* Top Header Navigation (Parallax Depth: ~3.5px) */}
        <ParallaxLayer maxOffset={3.5}>
          <HeroHeader />
        </ParallaxLayer>

        {/* Unified Hero Two-Column Grid: Left Content (~55%) + Right Earth Composition (~45%) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 my-auto py-4 sm:py-6 lg:py-8 min-h-0">
          {/* Left Column: Platform Badge, Headline, Subtitle & Search UI (Parallax Depth: ~7px) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center lg:items-start gap-4 sm:gap-5 w-full max-w-[820px] mx-auto lg:mx-0">
            <ParallaxLayer maxOffset={7} className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 w-full">
              <Hero />
              <HeroSearch />
            </ParallaxLayer>
          </div>

          {/* Right Column: Bounded Earth + Orbit + Academic Labels Visual Composition (Enlarged Further) */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative w-full h-full min-h-[340px] max-h-[560px] pointer-events-none pr-1 xl:pr-4">
            {/* Bounded Earth Group Container (Parallax Depth: ~10px) */}
            <ParallaxLayer
              maxOffset={10}
              className="relative w-[min(44vw,56vh)] h-[min(44vw,56vh)] min-w-[320px] min-h-[320px] max-w-[640px] max-h-[640px] flex items-center justify-center pointer-events-auto"
            >
              <EarthScene />
              <OrbitSystem />
              <AcademicLabels />
            </ParallaxLayer>
          </div>
        </div>

        {/* Bottom Quick Access Shortcuts (Parallax Depth: ~5px) */}
        <ParallaxLayer maxOffset={5} className="pb-24 md:pb-4 w-full">
          <QuickAccess />
        </ParallaxLayer>
      </div>
    </main>
  );
}
