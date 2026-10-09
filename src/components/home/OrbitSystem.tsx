"use client";

import { Fragment } from "react";
import { sectionColors } from "@/config/sections";
import { brandColors, glow } from "@/styles/tokens";

/** Orbit node anchors (homepage composition), coloured from the section config. */
const nodes = [
  { cx: 210, cy: 240, color: sectionColors.universities.node }, // Top-left (Universities anchor)
  { cx: 590, cy: 220, color: sectionColors.programmes.node }, // Top-right (Programmes anchor)
  { cx: 680, cy: 420, color: sectionColors.subjects.node }, // Right (Subjects anchor)
  { cx: 280, cy: 560, color: sectionColors["learning-hub"].node }, // Bottom-left (Learning Hub anchor)
  { cx: 620, cy: 580, color: sectionColors.careers.node }, // Bottom-right (Careers anchor)
];

export default function OrbitSystem() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {/* SVG Static Elliptical Orbit Rings centered with Earth Visual */}
      <svg
        viewBox="0 0 800 800"
        className="w-[120%] h-[120%] max-w-[900px] max-h-[900px] opacity-75 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle cyan & teal stroke gradients */}
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brandColors.cyan} stopOpacity="0.6" />
            <stop offset="50%" stopColor={brandColors.blue} stopOpacity="0.2" />
            <stop offset="100%" stopColor={brandColors.teal} stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={brandColors.green} stopOpacity="0.5" />
            <stop offset="60%" stopColor={brandColors.cyan} stopOpacity="0.3" />
            <stop offset="100%" stopColor={brandColors.navy} stopOpacity="0.1" />
          </linearGradient>

          {/* Glowing node glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary Equatorial Orbit Ellipse */}
        <ellipse
          cx="400"
          cy="400"
          rx="340"
          ry="140"
          transform="rotate(-22 400 400)"
          stroke="url(#orbitGrad1)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
        />

        {/* Secondary Inclined Orbit Ellipse */}
        <ellipse
          cx="400"
          cy="400"
          rx="320"
          ry="170"
          transform="rotate(35 400 400)"
          stroke="url(#orbitGrad2)"
          strokeWidth="1.25"
        />

        {/* Outer Fine Atmosphere Orbit Ring */}
        <ellipse
          cx="400"
          cy="400"
          rx="380"
          ry="190"
          transform="rotate(-5 400 400)"
          stroke={glow(0.15)}
          strokeWidth="1"
        />

        {/* Static Orbit Node Points (Intersection markers) */}
        <g filter="url(#glow)">
          {nodes.map(({ cx, cy, color }) =>
            color ? (
              <Fragment key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="4" fill={color} />
                <circle cx={cx} cy={cy} r="8" fill={color} fillOpacity="0.25" />
              </Fragment>
            ) : null,
          )}
        </g>
      </svg>
    </div>
  );
}
