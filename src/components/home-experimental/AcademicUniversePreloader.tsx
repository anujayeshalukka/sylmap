"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import AcademicUniverseScene from "./AcademicUniverseScene";
import {
  PRELOADER_COOKIE,
  PRELOADER_CSS_VARS,
  PRELOADER_FADE_MS,
  PRELOADER_INTRO_MS,
  PRELOADER_READY_MAX_WAIT_MS,
  PRELOADER_RUNNING_ATTR,
  PRELOADER_START_SCRIPT,
} from "./preloaderSession";

type Phase = "intro" | "exit" | "done";

function markIntroSeen() {
  document.cookie = `${PRELOADER_COOKIE}=1; path=/; SameSite=Lax`;
}

const isStarted = () => document.body.getAttribute(PRELOADER_RUNNING_ATTR) === "running";
const signalStart = () => document.body.setAttribute(PRELOADER_RUNNING_ATTR, "running");
const clearStart = () => document.body.removeAttribute(PRELOADER_RUNNING_ATTR);

/** True once the CSS safety net has started fading the overlay (JavaScript arrived very late). */
function isAutoHidden(overlay: HTMLElement) {
  return overlay
    .getAnimations()
    .some(
      (a) =>
        (a as CSSAnimation).animationName.startsWith("sylmap-preloader-autohide") && (a.effect?.getComputedTiming().progress ?? 0) > 0,
    );
}

/**
 * Resolves when the overlay is ready to animate: its images (logo, globe) are decoded, capped at
 * PRELOADER_READY_MAX_WAIT_MS, and a frame has been painted. requestAnimationFrame does not run in a
 * background tab, so this also waits until the page is actually on screen. Mirrors PRELOADER_START_SCRIPT.
 */
async function whenReadyToAnimate(overlay: HTMLElement) {
  const images = Array.from(overlay.querySelectorAll("img"));
  await Promise.race([
    Promise.all(images.map((img) => img.decode().catch(() => undefined))),
    new Promise((resolve) => window.setTimeout(resolve, PRELOADER_READY_MAX_WAIT_MS)),
  ]);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

const subscribeNoop = () => () => {};

export interface AcademicUniversePreloaderProps {
  /** Decided on the server from the session cookie, so returning visitors never see a flash */
  initiallyVisible: boolean;
}

/**
 * Full-screen "Academic Universe" intro for the experimental homepage.
 *
 * - Plays 2.7s (PRELOADER_INTRO_MS) once per browser session (session cookie), then fades out over
 *   0.5s into the page underneath (~3.2s in total).
 * - The entrance animations are held at their first frame (globals.css) until the overlay is painted
 *   and its images are ready; only then does the 2.7s start, so a slow first paint or a background tab
 *   can no longer use up the intro unseen. An inline script gives that start signal while the HTML is
 *   parsed, so it does not wait for hydration; this component does the same for a client-rendered
 *   overlay. The overlay exits when the progress bar's animation finishes.
 * - Never waits on network or search; the homepage is already rendered beneath it.
 * - Skippable (button or Escape) at any point, including before it starts. Skipped for
 *   prefers-reduced-motion. A CSS safety net hides it if JavaScript never runs or arrives very late.
 */
export default function AcademicUniversePreloader({ initiallyVisible }: AcademicUniversePreloaderProps) {
  const [phase, setPhase] = useState<Phase>(initiallyVisible ? "intro" : "done");
  /** The entrance is playing (the start signal is set). */
  const [isRunning, setIsRunning] = useState(false);
  /** True only while hydrating server HTML: the inline start script exists (and has run) only there. */
  const isServerMarkup = useSyncExternalStore(subscribeNoop, () => false, () => true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Remember this session has seen the intro, then follow (or give) the start signal.
  useEffect(() => {
    if (!initiallyVisible) return;
    markIntroSeen();

    const overlay = overlayRef.current;
    if (!overlay) return;

    let cancelled = false;
    const start = async () => {
      // Reduced motion hides the overlay (display:none), and a late script must not replay the intro
      // over a page the safety net has already revealed: finish straight away in both cases.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isAutoHidden(overlay)) {
        setPhase("done");
        return;
      }
      if (!isStarted()) {
        await whenReadyToAnimate(overlay);
        // Skipped and removed while waiting: no stale start signal for a later intro.
        if (cancelled || !overlay.isConnected) return;
        signalStart();
      }
      setIsRunning(true);
    };
    void start();

    return () => {
      cancelled = true;
    };
  }, [initiallyVisible]);

  // Exit when the progress animation completes; it only plays once the start signal is set.
  useEffect(() => {
    if (!isRunning) return;

    let cancelled = false;
    const exit = () => {
      if (!cancelled) setPhase((p) => (p === "intro" ? "exit" : p));
    };

    const animation = progressRef.current?.getAnimations?.()[0];
    // Fallback only when there is no animation to follow (e.g. a browser without the Web Animations API).
    const fallback = animation ? undefined : window.setTimeout(exit, PRELOADER_INTRO_MS);
    animation?.finished.then(exit, exit);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, [isRunning]);

  // Remove the overlay after the fade.
  useEffect(() => {
    if (phase !== "exit") return;
    const timer = window.setTimeout(() => setPhase("done"), PRELOADER_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Clear the start signal once the overlay is gone, so a later replay starts from the first frame.
  useEffect(() => {
    if (phase === "done" && initiallyVisible) clearStart();
  }, [phase, initiallyVisible]);

  // Escape skips the intro.
  useEffect(() => {
    if (phase !== "intro") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhase("exit");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading Sylmap"
      style={{ ...PRELOADER_CSS_VARS, transitionDuration: `${PRELOADER_FADE_MS}ms` } as CSSProperties}
      className={cn(
        "sylmap-preloader fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-canvas select-none transition-opacity ease-standard",
        phase === "exit" && "opacity-0 pointer-events-none",
      )}
    >
      <AcademicUniverseScene progressRef={progressRef} />

      <Button
        variant="ghost"
        onClick={() => setPhase("exit")}
        className="absolute z-20 right-4 sm:right-8 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:bottom-8 rounded-full"
      >
        Skip intro
      </Button>

      {/* Last child, so the overlay's images are already in the DOM when it runs */}
      {isServerMarkup && <script dangerouslySetInnerHTML={{ __html: PRELOADER_START_SCRIPT }} />}
    </div>
  );
}
