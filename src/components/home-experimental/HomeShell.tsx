"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import AcademicSidebar from "./AcademicSidebar";

interface SidebarState {
  /** Rail has been revealed in this page lifecycle (md and up). Only an explicit hide sets it back to false. */
  isRevealed: boolean;
  /** Rail is labelled (240px) rather than icon-only (64px). Independent of visibility. */
  isExpanded: boolean;
  /** Mobile drawer is open (below md). Independent of the rail. */
  isMobileDrawerOpen: boolean;
  toggleExpanded: () => void;
  collapse: () => void;
  hideSidebar: () => void;
  openMobileDrawer: () => void;
  closeMobileDrawer: () => void;
}

const SidebarContext = createContext<SidebarState | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside <HomeShell>");
  return ctx;
}

/** Scroll depth (px) that reveals the rail. */
const REVEAL_AT = 100;
/** After an explicit hide, the user must return above this point before a scroll can reveal the rail again. */
const REARM_BELOW = 60;

/**
 * Layout shell for the experimental homepage: a fixed left sidebar plus the page content.
 *
 * Visibility (md and up):
 * - Fresh page: hidden, takes no space, so the first view stays clean and centred.
 * - First scroll past REVEAL_AT reveals the rail. From then on it stays visible regardless of
 *   scroll position, page height, New Search or cleared results.
 * - Only the rail's "Hide sidebar" control hides it. Hiding is temporary: the rail returns the
 *   next time the user scrolls down from near the top (past REVEAL_AT after being above REARM_BELOW).
 *   Nothing persists across page loads.
 *
 * Expansion (independent of visibility): lg and up pushes content (64px → 240px) so the rail never
 * covers the search; md overlays content with a scrim. Below md there is no rail; the mobile drawer
 * opens from the header.
 */
export default function HomeShell({ children }: { children: ReactNode }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  /** Whether a qualifying scroll may reveal the rail (false right after an explicit hide made while scrolled down). */
  const armedRef = useRef(true);

  // Reveal on scroll. Only listens while hidden; once revealed, visibility no longer depends on scroll.
  useEffect(() => {
    if (isRevealed) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (!armedRef.current) {
        if (y < REARM_BELOW) armedRef.current = true;
        return;
      }
      if (y > REVEAL_AT) setIsRevealed(true);
    };
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isRevealed]);

  const toggleExpanded = useCallback(() => setIsExpanded((v) => !v), []);
  const collapse = useCallback(() => setIsExpanded(false), []);
  const openMobileDrawer = useCallback(() => setIsMobileDrawerOpen(true), []);
  const closeMobileDrawer = useCallback(() => setIsMobileDrawerOpen(false), []);

  const hideSidebar = useCallback(() => {
    armedRef.current = window.scrollY < REARM_BELOW;
    setIsExpanded(false);
    setIsRevealed(false);
    // The hide button disappears with the rail; hand keyboard focus to the unified search.
    document.querySelector<HTMLInputElement>('main form[role="search"] input')?.focus({ preventScroll: true });
  }, []);

  const value = useMemo(
    () => ({
      isRevealed,
      isExpanded,
      isMobileDrawerOpen,
      toggleExpanded,
      collapse,
      hideSidebar,
      openMobileDrawer,
      closeMobileDrawer,
    }),
    [isRevealed, isExpanded, isMobileDrawerOpen, toggleExpanded, collapse, hideSidebar, openMobileDrawer, closeMobileDrawer],
  );

  return (
    <SidebarContext.Provider value={value}>
      <AcademicSidebar />
      <div
        className={cn(
          "relative transition-[padding] duration-300 ease-standard",
          isRevealed && "md:pl-16",
          isRevealed && isExpanded && "lg:pl-60",
        )}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}
