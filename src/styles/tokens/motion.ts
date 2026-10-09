/** Motion tokens. CSS equivalents: --duration-*, --ease-standard, --ease-emphasized in tokens.css. */
export const motion = {
  duration: { fast: 150, base: 200, card: 250, slow: 300 },
  /** Hover lift used by glass cards */
  liftPx: 2,
  /** Hover scale used by buttons, icon tiles and orbit labels */
  hoverScale: 1.05,
  /** Mouse-parallax spring (desktop, fine pointer, no reduced motion) */
  parallaxSpring: { stiffness: 90, damping: 20, mass: 0.4 },
  /** Parallax depth per homepage layer, in px */
  parallaxDepth: { header: 3.5, hero: 7, earth: 10, quickAccess: 5 },
} as const;
