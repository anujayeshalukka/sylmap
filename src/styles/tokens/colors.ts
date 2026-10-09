/**
 * Raw colour values for places that cannot use Tailwind classes (SVG gradients, canvas, inline styles).
 * In JSX/CSS prefer the theme utilities from src/styles/tokens.css (bg-surface-panel, text-accent, …).
 */
export const brandColors = {
  navy: "#0D3B6E",
  navyDark: "#071A42",
  blue: "#185FA5",
  teal: "#0F6E56",
  cyan: "#00F2FE",
  green: "#38EF7D",
  headlineBlue: "#4CA3FF",
} as const;

/** rgba() helper for the primary cyan glow (#00F2FE). */
export const glow = (alpha: number) => `rgba(0, 242, 254, ${alpha})`;
