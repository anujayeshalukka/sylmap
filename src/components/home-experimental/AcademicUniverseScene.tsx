import type { CSSProperties, Ref } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import EarthScene from "@/components/home/EarthScene";
import UniverseBackground from "@/components/home/UniverseBackground";
import { Badge } from "@/components/ui/Badge";
import { primaryNav } from "@/config/navigation";
import type { SectionId } from "@/config/sections";
import { typography } from "@/styles/tokens";
import { cn } from "@/lib/cn";
import AnimatedOrbitSystem from "./AnimatedOrbitSystem";

/**
 * Label anchors around the globe (sm and up). Left-side labels sit outside the left edge,
 * right-side labels outside the right edge; each drifts outward as it appears.
 */
const labelPlacement: Record<SectionId, { side: "left" | "right"; className: string }> = {
  universities: { side: "left", className: "top-[16%] right-[94%]" },
  compare: { side: "left", className: "top-1/2 right-[104%]" },
  "learning-hub": { side: "left", className: "top-[84%] right-[94%]" },
  programmes: { side: "right", className: "top-[16%] left-[94%]" },
  subjects: { side: "right", className: "top-1/2 left-[104%]" },
  careers: { side: "right", className: "top-[84%] left-[94%]" },
};

/** Order the labels light up in (clockwise from upper-left) */
const revealOrder: SectionId[] = ["universities", "programmes", "subjects", "careers", "learning-hub", "compare"];

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export interface AcademicUniverseSceneProps {
  /** Ref to the progress bar; its CSS animation (2s) defines the intro length */
  progressRef?: Ref<HTMLDivElement>;
}

/**
 * The Academic Universe visual: cosmic background, logo, centred globe entrance, animated
 * orbits with section satellites, category labels and the brand line with a progress bar.
 * All entrance motion is CSS (globals.css, "sylmap-intro-*"), so it starts at first paint
 * without waiting for JavaScript. Timing and session behaviour live in AcademicUniversePreloader.
 */
export default function AcademicUniverseScene({ progressRef }: AcademicUniverseSceneProps) {
  return (
    <>
      <UniverseBackground />

      {/* Logo */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20 sylmap-intro-fade-down">
        <Image src="/sylmap.webp" alt="Sylmap" width={240} height={72} priority className="h-10 sm:h-12 w-auto object-contain" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-4">
        {/* Globe stage */}
        <div className="relative w-[min(72vw,40vh)] h-[min(72vw,40vh)] sm:w-[min(44vw,52vh)] sm:h-[min(44vw,52vh)] min-w-[220px] min-h-[220px] max-w-[520px] max-h-[520px]">
          <div className="absolute inset-0 sylmap-intro-globe">
            <EarthScene />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none sylmap-intro-orbits">
            <AnimatedOrbitSystem className="w-[125%] h-[125%] max-w-none overflow-visible shrink-0" />
          </div>

          {/* Category labels around the globe (sm and up) */}
          <div className="absolute inset-0 hidden sm:block">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const place = labelPlacement[item.id];
              return (
                <div
                  key={item.id}
                  style={delay(550 + revealOrder.indexOf(item.id) * 120)}
                  className={cn(
                    "absolute -translate-y-1/2 flex items-center gap-2.5",
                    place.side === "left" ? "flex-row-reverse text-right sylmap-intro-from-right" : "sylmap-intro-from-left",
                    place.className,
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md shadow-lg shrink-0",
                      item.color.tile,
                    )}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" aria-hidden />
                  </div>
                  <div className="flex flex-col whitespace-nowrap">
                    <span className={cn(typography.labelLg, "text-fg")}>{item.label}</span>
                    <span className={cn(typography.small, "text-fg-secondary hidden lg:block")}>
                      {item.orbitDescription ?? item.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category labels as a compact grid (mobile) */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs sm:hidden">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={delay(550 + revealOrder.indexOf(item.id) * 100)}
                className="flex flex-col items-center gap-1 sylmap-intro-rise"
              >
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border", item.color.tile)}>
                  <Icon className="w-4 h-4 stroke-[2]" aria-hidden />
                </div>
                <span className="text-2xs font-semibold text-fg-body text-center leading-tight">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Brand line + progress */}
        <div className="flex flex-col items-center gap-3 sylmap-intro-rise" style={delay(350)}>
          <Badge
            variant="brand"
            size="lg"
            className="text-center"
            icon={<Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" aria-hidden />}
          >
            <span>India&apos;s AI-Powered Academic Intelligence Platform</span>
          </Badge>
          <div className="w-40 h-0.5 rounded-full bg-line/10 overflow-hidden" aria-hidden>
            <div ref={progressRef} className="h-full bg-gradient-to-r from-accent to-secondary sylmap-intro-progress" />
          </div>
        </div>
      </div>
    </>
  );
}
