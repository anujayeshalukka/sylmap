/**
 * Preloader session settings, shared by the server page (reads the cookie) and the
 * client preloader (sets it). A session cookie (no Expires/Max-Age) lives until the
 * browser session ends, so the intro plays once per browser session.
 */
export const PRELOADER_COOKIE = "sylmap_intro_seen";

/** How long the intro plays before fading out (ms). Total experience = this + PRELOADER_FADE_MS (~3.2s). */
export const PRELOADER_INTRO_MS = 2700;

/** Fade-out duration (ms); the overlay applies it as its transition-duration */
export const PRELOADER_FADE_MS = 500;

/** No-JS safety net: margin (ms) after the normal exit before the CSS auto-hide starts */
export const PRELOADER_AUTOHIDE_MARGIN_MS = 700;

/** Length (ms) the entrance choreography in globals.css ("sylmap-intro-*") was originally authored for. */
export const PRELOADER_BASE_INTRO_MS = 2000;

/**
 * Stretch factor applied to every entrance animation (globe, orbits, logo, labels, brand line,
 * progress bar) so they stay proportionally in sync with PRELOADER_INTRO_MS. The overlay exposes it
 * to CSS as `--intro-pace`; the scene multiplies its inline label delays by it. Continuous motion
 * (satellite orbits, dash flow, pulses) is not an entrance and is intentionally left alone.
 */
export const PRELOADER_PACE = PRELOADER_INTRO_MS / PRELOADER_BASE_INTRO_MS;

/**
 * The timing values globals.css needs, set as inline custom properties on the overlay (server-rendered,
 * so they apply from first paint). This keeps every number in this file; the CSS holds no copies.
 */
export const PRELOADER_CSS_VARS = {
  "--intro-pace": String(PRELOADER_PACE),
  "--intro-ms": `${PRELOADER_INTRO_MS}ms`,
  "--preloader-autohide-delay": `${PRELOADER_INTRO_MS + PRELOADER_FADE_MS + PRELOADER_AUTOHIDE_MARGIN_MS}ms`,
};
