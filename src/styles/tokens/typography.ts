/**
 * Typography tokens: size, weight, tracking and leading only. Pair them with a text colour token
 * (text-fg, text-fg-body, text-fg-secondary, text-fg-muted, text-accent-text …).
 *
 * Values are the homepage's as implemented. H2 is the only extrapolated style: the homepage has no H2,
 * so it sits on Tailwind's scale between H1 and H3 using H1's weight and tracking.
 */
export const typography = {
  h1: "text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]",
  h2: "text-2xl sm:text-3xl font-bold tracking-tight leading-tight",
  /** Panel title, e.g. "Search & Explore" */
  h3: "text-sm sm:text-base font-bold tracking-tight",
  /** Result card title */
  h4: "text-sm font-bold",
  /** Item title inside a card */
  h5: "text-xs font-bold",
  body: "text-xs sm:text-sm font-normal leading-relaxed",
  bodySecondary: "text-xs leading-relaxed",
  small: "text-2xs leading-snug",
  label: "text-xs font-bold tracking-wide",
  labelLg: "text-sm font-bold tracking-wide",
  micro: "text-micro",
  nav: "text-sm font-medium",
  navDrawer: "text-lg font-semibold",
  button: "text-xs font-semibold",
  badge: "text-xs font-semibold",
  badgeSm: "text-2xs font-semibold",
  overline: "text-micro uppercase tracking-wider font-bold",
  code: "font-mono text-micro font-semibold",
} as const;

export type TypographyToken = keyof typeof typography;
