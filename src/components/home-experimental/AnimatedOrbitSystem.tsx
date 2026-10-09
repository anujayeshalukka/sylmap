"use client";

import { sectionColors, type SectionId } from "@/config/sections";
import { brandColors, glow } from "@/styles/tokens";

/**
 * Animated version of the homepage OrbitSystem: same three orbit ellipses, gradients and
 * glow filter, plus moving satellites (one per academic section) and flowing dashes.
 * Motion is SVG-native (SMIL), so it costs no JavaScript per frame.
 */

interface Orbit {
  rx: number;
  ry: number;
  rotate: number;
}

// Same geometry as src/components/home/OrbitSystem.tsx
const orbits: Orbit[] = [
  { rx: 340, ry: 140, rotate: -22 },
  { rx: 320, ry: 170, rotate: 35 },
  { rx: 380, ry: 190, rotate: -5 },
];

/** Closed ellipse path centred on (400, 400), used as the satellites' motion path. */
const ellipsePath = ({ rx, ry }: Orbit) =>
  `M ${400 - rx} 400 a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;

const satellites: Array<{ section: SectionId; orbit: number; duration: number; offset: number }> = [
  { section: "universities", orbit: 0, duration: 14, offset: 0 },
  { section: "careers", orbit: 0, duration: 14, offset: 7 },
  { section: "programmes", orbit: 1, duration: 18, offset: 3 },
  { section: "learning-hub", orbit: 1, duration: 18, offset: 12 },
  { section: "subjects", orbit: 2, duration: 22, offset: 5 },
  { section: "compare", orbit: 2, duration: 22, offset: 16 },
];

export default function AnimatedOrbitSystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 800" className={className} fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="preloaderOrbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={brandColors.cyan} stopOpacity="0.6" />
          <stop offset="50%" stopColor={brandColors.blue} stopOpacity="0.2" />
          <stop offset="100%" stopColor={brandColors.teal} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="preloaderOrbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={brandColors.green} stopOpacity="0.5" />
          <stop offset="60%" stopColor={brandColors.cyan} stopOpacity="0.3" />
          <stop offset="100%" stopColor={brandColors.navy} stopOpacity="0.1" />
        </linearGradient>
        <filter id="preloaderGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Very slow drift of the whole system */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 400 400"
          to="360 400 400"
          dur="240s"
          repeatCount="indefinite"
        />

        {/* Primary equatorial orbit (dashed, flowing) */}
        <ellipse
          cx="400"
          cy="400"
          rx={orbits[0].rx}
          ry={orbits[0].ry}
          transform={`rotate(${orbits[0].rotate} 400 400)`}
          stroke="url(#preloaderOrbitGrad1)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="1.6s" repeatCount="indefinite" />
        </ellipse>

        {/* Secondary inclined orbit */}
        <ellipse
          cx="400"
          cy="400"
          rx={orbits[1].rx}
          ry={orbits[1].ry}
          transform={`rotate(${orbits[1].rotate} 400 400)`}
          stroke="url(#preloaderOrbitGrad2)"
          strokeWidth="1.25"
        />

        {/* Outer atmosphere orbit */}
        <ellipse
          cx="400"
          cy="400"
          rx={orbits[2].rx}
          ry={orbits[2].ry}
          transform={`rotate(${orbits[2].rotate} 400 400)`}
          stroke={glow(0.15)}
          strokeWidth="1"
        />

        {/* Satellites: one per academic section, in the section hue */}
        <g filter="url(#preloaderGlow)">
          {satellites.map(({ section, orbit, duration, offset }) => (
            <g key={section} transform={`rotate(${orbits[orbit].rotate} 400 400)`}>
              <g className={sectionColors[section].svgFill}>
                <circle r="9" fillOpacity="0.25">
                  <animate attributeName="r" values="7;10;7" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle r="4" />
                <animateMotion
                  dur={`${duration}s`}
                  begin={`-${offset}s`}
                  repeatCount="indefinite"
                  path={ellipsePath(orbits[orbit])}
                />
              </g>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
