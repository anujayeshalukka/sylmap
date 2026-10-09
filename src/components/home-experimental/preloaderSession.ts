/**
 * Preloader session settings, shared by the server page (reads the cookie) and the
 * client preloader (sets it). A session cookie (no Expires/Max-Age) lives until the
 * browser session ends, so the intro plays once per browser session.
 */
export const PRELOADER_COOKIE = "sylmap_intro_seen";

/** How long the intro plays before fading out (ms) */
export const PRELOADER_INTRO_MS = 2000;

/** Fade-out duration (ms); keep in sync with duration-500 on the overlay */
export const PRELOADER_FADE_MS = 500;
