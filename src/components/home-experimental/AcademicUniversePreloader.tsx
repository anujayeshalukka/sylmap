"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import AcademicUniverseScene from "./AcademicUniverseScene";
import { PRELOADER_COOKIE, PRELOADER_FADE_MS, PRELOADER_INTRO_MS } from "./preloaderSession";

type Phase = "intro" | "exit" | "done";

function markIntroSeen() {
  document.cookie = `${PRELOADER_COOKIE}=1; path=/; SameSite=Lax`;
}

export interface AcademicUniversePreloaderProps {
  /** Decided on the server from the session cookie, so returning visitors never see a flash */
  initiallyVisible: boolean;
}

/**
 * Full-screen "Academic Universe" intro for the experimental homepage.
 *
 * - Plays ~2s once per browser session (session cookie), then fades into the page underneath.
 * - The intro length is the progress bar's CSS animation, which starts at first paint; the overlay
 *   exits when it finishes, so slow hydration never stretches the intro.
 * - Never waits on network or search; the homepage is already rendered beneath it.
 * - Skippable (button or Escape). Hidden for prefers-reduced-motion, and auto-hides via CSS
 *   (globals.css) if JavaScript never runs.
 */
export default function AcademicUniversePreloader({ initiallyVisible }: AcademicUniversePreloaderProps) {
  const [phase, setPhase] = useState<Phase>(initiallyVisible ? "intro" : "done");
  const progressRef = useRef<HTMLDivElement>(null);

  // Remember this session has seen the intro, and exit when the progress animation completes.
  useEffect(() => {
    if (!initiallyVisible) return;
    markIntroSeen();

    let cancelled = false;
    const exit = () => {
      if (!cancelled) setPhase((p) => (p === "intro" ? "exit" : p));
    };

    // Resolves immediately if the CSS animation already finished before hydration.
    const animation = progressRef.current?.getAnimations?.()[0];
    animation?.finished.then(exit, exit);

    // Fallback when there is no running animation (reduced motion: overlay is display:none).
    const fallback = window.setTimeout(exit, PRELOADER_INTRO_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, [initiallyVisible]);

  // Remove the overlay after the fade.
  useEffect(() => {
    if (phase !== "exit") return;
    const timer = window.setTimeout(() => setPhase("done"), PRELOADER_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

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
      role="status"
      aria-label="Loading Sylmap"
      className={cn(
        "sylmap-preloader fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-canvas select-none transition-opacity duration-500 ease-standard",
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
    </div>
  );
}
