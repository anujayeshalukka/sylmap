"use client";

import UniverseBackground from "@/components/coming-soon/UniverseBackground";
import EarthScene from "@/components/coming-soon/EarthScene";
import OrbitSystem from "@/components/coming-soon/OrbitSystem";
import AcademicOrbitPills from "@/components/coming-soon/AcademicOrbitPills";
import ComingSoonHeader from "@/components/coming-soon/ComingSoonHeader";
import ComingSoonContent from "@/components/coming-soon/ComingSoonContent";
import ParallaxLayer from "@/components/coming-soon/ParallaxLayer";

export default function ComingSoonPage() {
  return (
    <main className="coming-soon-shell bg-slate-950 text-slate-100 flex flex-col justify-between items-center select-none relative min-h-screen overflow-x-hidden">
      {/* Background Cosmic Atmosphere */}
      <UniverseBackground />

      {/* Main Content Boundary */}
      <div className="relative z-20 flex flex-col min-h-screen justify-between items-center w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
        
        {/* Top Header (Identity) */}
        <ParallaxLayer maxOffset={3.5} className="w-full flex justify-center lg:justify-start">
          <ComingSoonHeader />
        </ParallaxLayer>

        {/* Responsive Content Grid: Mobile = Stacked (Logo -> Earth -> Content), Desktop = Left Content + Right Earth */}
        <div className="flex-1 w-full my-auto py-4 sm:py-6 lg:py-8 flex flex-col lg:grid lg:grid-cols-12 items-center gap-6 lg:gap-8 xl:gap-12">
          
          {/* Left Side Content (Desktop lg:col-span-7 lg:order-1, Mobile order-3) */}
          <div className="order-3 lg:order-1 col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start justify-center w-full">
            <ParallaxLayer maxOffset={4} className="w-full">
              <ComingSoonContent />
            </ParallaxLayer>
          </div>

          {/* Right Side Visual (Desktop lg:col-span-5 lg:order-2, Mobile order-2) */}
          <div className="order-2 lg:order-2 col-span-1 lg:col-span-5 flex items-center justify-center relative w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px]">
            <ParallaxLayer
              maxOffset={9}
              className="relative w-[min(72vw,36vh)] h-[min(72vw,36vh)] sm:w-[min(54vw,42vh)] sm:h-[min(54vw,42vh)] lg:w-[440px] lg:h-[440px] xl:w-[500px] xl:h-[500px] max-w-[560px] max-h-[560px] flex items-center justify-center pointer-events-auto transition-all"
            >
              <EarthScene />
              <OrbitSystem />
              <AcademicOrbitPills />
            </ParallaxLayer>
          </div>
        </div>

        {/* Subtle Footer */}
        <footer className="relative z-30 pt-2 pb-4 text-center lg:text-left w-full text-xs text-slate-300/80 font-medium border-t border-white/[0.04]">
          <p>© {new Date().getFullYear()} Sylmap. Academic Intelligence Engine.</p>
        </footer>
      </div>
    </main>
  );
}
