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
import { Container } from "@/components/ui/Container";
import { layout, motion } from "@/styles/tokens";
import { cn } from "@/lib/cn";

export default function HomePage() {
  return (
    <main className="home-shell bg-canvas text-fg-default flex flex-col justify-between select-none relative min-h-screen">
      {/* Layer 0: Universe Background (Completely Static) */}
      <UniverseBackground />

      {/* Layer 10 & 2: Outer Content Boundary & Single Unified Responsive Hero Grid */}
      <Container className="relative z-20 flex flex-col min-h-screen justify-between pb-2 sm:pb-3 lg:pb-4 pt-0">
        {/* Top Header Navigation */}
        <ParallaxLayer maxOffset={motion.parallaxDepth.header}>
          <HeroHeader />
        </ParallaxLayer>

        {/* Unified Hero Two-Column Grid: Left Content (7/12) + Right Earth Composition (5/12) */}
        <div className={cn(layout.grid, "flex-1 items-center my-auto py-4 sm:py-6 lg:py-8 min-h-0")}>
          {/* Left Column: Platform Badge, Headline & Search UI */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-center lg:items-start gap-4 sm:gap-5 w-full max-w-content mx-auto lg:mx-0">
            <ParallaxLayer
              maxOffset={motion.parallaxDepth.hero}
              className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 w-full"
            >
              <Hero />
              <HeroSearch />
            </ParallaxLayer>
          </div>

          {/* Right Column: Bounded Earth + Orbit + Academic Labels Visual Composition */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative w-full h-full min-h-[340px] max-h-[560px] pointer-events-none pr-1 xl:pr-4">
            <ParallaxLayer
              maxOffset={motion.parallaxDepth.earth}
              className="relative w-[min(44vw,56vh)] h-[min(44vw,56vh)] min-w-[320px] min-h-[320px] max-w-[640px] max-h-[640px] flex items-center justify-center pointer-events-auto"
            >
              <EarthScene />
              <OrbitSystem />
              <AcademicLabels />
            </ParallaxLayer>
          </div>
        </div>

        {/* Bottom Quick Access Shortcuts */}
        <ParallaxLayer maxOffset={motion.parallaxDepth.quickAccess} className={cn(layout.bottomNavClearance, "w-full")}>
          <QuickAccess />
        </ParallaxLayer>
      </Container>
    </main>
  );
}
