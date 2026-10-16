/**
 * Typography tokens: size, weight, tracking and leading only. Pair them with a text colour token
 * (text-fg, text-fg-body, text-fg-secondary, text-fg-muted, text-accent-text …).
 *
 * Values are the homepage's as implemented. H2 is the only extrapolated style: the homepage has no H2,
 * so it sits on Tailwind's scale between H1 and H3 using H1's weight and tracking.
 *
 * The typeface (Plus Jakarta Sans) comes from font-sans; recipes never set a font family except `code`.
 * Sizes here are the base scale. Inside a .sylmap-readable page root (src/styles/tokens.css) the same
 * recipes render one step larger, because that class re-points the text-* size tokens.
 */
export const typography = {
  h1: "text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]",
  h2: "text-2xl sm:text-3xl font-bold tracking-tight leading-tight",
  /** Panel title (e.g. modal titles) */
  h3: "text-sm sm:text-base font-bold tracking-tight",
  /**
   * The search panel's "Search & Explore" title. Same as h3 on the base scale (14 → 16px); on .sylmap-readable
   * pages its role tokens hold it at 16px on every width instead of stepping up (src/styles/tokens.css).
   */
  panelTitle: "text-panel-title sm:text-panel-title-sm lg:text-panel-title-lg font-bold tracking-tight",
  /**
   * The one search field's typed text and placeholder. 14 → 16px on the base scale; 16px on every width on
   * .sylmap-readable pages (16px on mobile so iOS does not zoom the field).
   */
  searchInput: "text-search sm:text-search-sm lg:text-search-lg font-medium",
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
