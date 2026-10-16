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

/**
 * Longest the controller waits for the overlay's images (logo, globe) before starting the intro anyway,
 * so a slow image never holds the overlay up indefinitely.
 */
export const PRELOADER_READY_MAX_WAIT_MS = 1500;

/**
 * With JavaScript, the entrance waits for a start signal. If it has not started within this budget (plus
 * the ready wait and the whole intro), the CSS safety net hides the overlay so a failed or very slow
 * script can never trap the page behind it.
 */
export const PRELOADER_HYDRATION_BUDGET_MS = 3000;

/**
 * Start signal for the entrance: set on <body> (which suppresses hydration warnings in the root layout)
 * once the overlay is painted and its images are ready. globals.css holds the entrance until it is set.
 */
export const PRELOADER_RUNNING_ATTR = "data-sylmap-intro";

/**
 * Inline start script, rendered inside the server-rendered overlay so it runs as the HTML is parsed,
 * without waiting for the React bundle to download and hydrate. It mirrors whenReadyToAnimate in
 * AcademicUniversePreloader (which covers a client-rendered overlay): wait for the overlay's images
 * (capped), then for a painted frame (requestAnimationFrame does not run in background tabs), then
 * set the start signal, unless the overlay was skipped and removed meanwhile. Plain ES5 string so no
 * build step can change it.
 */
export const PRELOADER_START_SCRIPT = `(function(){var o=document.currentScript&&document.currentScript.parentElement;if(!o)return;var imgs=[].slice.call(o.querySelectorAll("img"));Promise.race([Promise.all(imgs.map(function(i){return i.decode().catch(function(){})})),new Promise(function(r){setTimeout(r,${PRELOADER_READY_MAX_WAIT_MS})})]).then(function(){requestAnimationFrame(function(){requestAnimationFrame(function(){if(o.isConnected)document.body.setAttribute("${PRELOADER_RUNNING_ATTR}","running")})})})})();`;

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
  "--preloader-safety-delay": `${
    PRELOADER_HYDRATION_BUDGET_MS + PRELOADER_READY_MAX_WAIT_MS + PRELOADER_INTRO_MS + PRELOADER_FADE_MS + PRELOADER_AUTOHIDE_MARGIN_MS
  }ms`,
};
