"use client";

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
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#185FA5" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0F6E56" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38EF7D" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#00F2FE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0D3B6E" stopOpacity="0.1" />
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
          stroke="rgba(0, 242, 254, 0.15)"
          strokeWidth="1"
        />

        {/* Static Orbit Node Points (Intersection markers) */}
        <g filter="url(#glow)">
          {/* Top-left node (Universities anchor) */}
          <circle cx="210" cy="240" r="4" fill="#00F2FE" />
          <circle cx="210" cy="240" r="8" fill="#00F2FE" fillOpacity="0.25" />

          {/* Top-right node (Programmes anchor) */}
          <circle cx="590" cy="220" r="4" fill="#A855F7" />
          <circle cx="590" cy="220" r="8" fill="#A855F7" fillOpacity="0.25" />

          {/* Right node (Subjects anchor) */}
          <circle cx="680" cy="420" r="4" fill="#3B82F6" />
          <circle cx="680" cy="420" r="8" fill="#3B82F6" fillOpacity="0.25" />

          {/* Bottom-left node (Resources anchor) */}
          <circle cx="280" cy="560" r="4" fill="#EAB308" />
          <circle cx="280" cy="560" r="8" fill="#EAB308" fillOpacity="0.25" />

          {/* Bottom-right node (Careers anchor) */}
          <circle cx="620" cy="580" r="4" fill="#10B981" />
          <circle cx="620" cy="580" r="8" fill="#10B981" fillOpacity="0.25" />
        </g>
      </svg>
    </div>
  );
}
