"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { EyeOff, PanelLeftClose, PanelLeftOpen, SquarePen, X } from "lucide-react";
import { primaryNav, type NavItem } from "@/config/navigation";
import { IconButton } from "@/components/ui/IconButton";
import { Tooltip } from "@/components/ui/Tooltip";
import { useOverlay } from "@/components/ui/useOverlay";
import { requestNewSearch } from "@/lib/searchEvents";
import { typography } from "@/styles/tokens";
import { cn } from "@/lib/cn";
import { useSidebar } from "./HomeShell";

const SIDEBAR_ID = "sylmap-sidebar";

/** Scroll back to the hero and hand focus to the unified search. */
function startNewSearch() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  requestNewSearch();
}

const itemBase =
  "group flex items-center gap-3 h-10 rounded-card text-fg-secondary hover:text-fg hover:bg-line/5 active:bg-line/10 transition-colors duration-200";

function NewSearchItem({ showLabel, onSelect }: { showLabel: boolean; onSelect?: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        onSelect?.();
        startNewSearch();
      }}
      aria-label={showLabel ? undefined : "New search"}
      className={cn(itemBase, showLabel ? "w-full px-1.5" : "w-10 justify-center")}
    >
      <span className="w-7 h-7 rounded-control flex items-center justify-center border border-accent/30 bg-accent-fill/15 text-accent-text shrink-0">
        <SquarePen className="w-3.5 h-3.5 stroke-[2]" aria-hidden />
      </span>
      {showLabel && <span className="text-sm font-semibold text-fg">New Search</span>}
    </button>
  );
}

function SectionItem({ item, showLabel, onSelect }: { item: NavItem; showLabel: boolean; onSelect?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onSelect}
      aria-label={showLabel ? undefined : item.label}
      className={cn(itemBase, showLabel ? "w-full px-1.5" : "w-10 justify-center")}
    >
      <span
        className={cn(
          "w-7 h-7 rounded-control flex items-center justify-center border shrink-0 transition-transform duration-200 group-hover:scale-105",
          item.color.tile,
        )}
      >
        <Icon className="w-3.5 h-3.5 stroke-[2]" aria-hidden />
      </span>
      {showLabel && <span className={cn(typography.nav, "truncate")}>{item.label}</span>}
    </Link>
  );
}

/** In the icon rail, each item gets a right-side tooltip with its name. */
function RailTip({ label, show, children }: { label: string; show: boolean; children: ReactNode }) {
  if (!show) return <>{children}</>;
  return (
    <Tooltip content={label} side="right">
      {children}
    </Tooltip>
  );
}

function SidebarItems({ showLabel, onSelect }: { showLabel: boolean; onSelect?: () => void }) {
  return (
    <>
      <RailTip label="New Search" show={!showLabel}>
        <NewSearchItem showLabel={showLabel} onSelect={onSelect} />
      </RailTip>

      <div className="h-px bg-line/10 my-2" aria-hidden />
      {showLabel && <span className={cn(typography.overline, "text-fg-faint px-2 pb-1")}>Explore</span>}

      <ul className="flex flex-col gap-1">
        {primaryNav.map((item) => (
          <li key={item.id}>
            <RailTip label={item.label} show={!showLabel}>
              <SectionItem item={item} showLabel={showLabel} onSelect={onSelect} />
            </RailTip>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Persistent left sidebar for the experimental homepage (ChatGPT-style), in the Sylmap theme.
 * The rail is revealed by the first scroll and then stays until "Hide sidebar" (see HomeShell);
 * the mobile drawer opens from the header. Destinations come from the shared navigation config;
 * New Search returns to the unified search without changing the sidebar.
 */
export default function AcademicSidebar() {
  const { isRevealed, isExpanded, isMobileDrawerOpen, toggleExpanded, collapse, hideSidebar, closeMobileDrawer } =
    useSidebar();
  const drawerRef = useRef<HTMLDivElement>(null);
  useOverlay(isMobileDrawerOpen, drawerRef, closeMobileDrawer);

  // Tablet overlay: Escape collapses the expanded rail (desktop pushes content, so no scrim there).
  useEffect(() => {
    if (!isExpanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && window.matchMedia("(max-width: 1023px)").matches) collapse();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExpanded, collapse]);

  return (
    <>
      {/* Rail (md and up) */}
      <nav
        id={SIDEBAR_ID}
        aria-label="Sylmap"
        aria-hidden={!isRevealed || undefined}
        className={cn(
          "hidden md:flex fixed inset-y-0 left-0 z-40 flex-col gap-1 py-4 px-3 border-r border-line/10 bg-transparent transition-[width,transform,opacity,visibility] duration-300 ease-standard",
          isExpanded ? "w-60" : "w-16",
          // Until revealed (or after Hide): off-screen, invisible, out of the tab order and pointer events.
          isRevealed ? "translate-x-0 opacity-100 visible" : "-translate-x-full opacity-0 invisible pointer-events-none",
        )}
      >
        <div className={cn("flex items-center mb-3", isExpanded ? "justify-end" : "justify-center")}>
          <IconButton
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={isExpanded}
            aria-controls={SIDEBAR_ID}
            onClick={toggleExpanded}
          >
            {isExpanded ? (
              <PanelLeftClose className="w-5 h-5 stroke-[2]" aria-hidden />
            ) : (
              <PanelLeftOpen className="w-5 h-5 stroke-[2]" aria-hidden />
            )}
          </IconButton>
        </div>

        {/* Tablet overlay closes after a choice so it never sits over the page; desktop keeps its state. */}
        <SidebarItems showLabel={isExpanded} onSelect={() => window.matchMedia("(max-width: 1023px)").matches && collapse()} />

        {/* Explicit hide: the only way the rail goes away once revealed */}
        <div className="mt-auto pt-2 border-t border-line/10">
          <RailTip label="Hide sidebar" show={!isExpanded}>
            <button
              type="button"
              onClick={hideSidebar}
              aria-label={isExpanded ? undefined : "Hide sidebar"}
              className={cn(itemBase, "text-fg-muted", isExpanded ? "w-full px-1.5" : "w-10 justify-center")}
            >
              <span className="w-7 h-7 flex items-center justify-center shrink-0">
                <EyeOff className="w-4 h-4 stroke-[2]" aria-hidden />
              </span>
              {isExpanded && <span className="text-sm font-medium">Hide sidebar</span>}
            </button>
          </RailTip>
        </div>
      </nav>

      {/* Tablet scrim while the transparent rail is expanded over content: dims the page enough for the labels to read */}
      {isExpanded && isRevealed && (
        <div className="hidden md:block lg:hidden fixed inset-0 z-30 bg-canvas/85" onClick={collapse} aria-hidden />
      )}

      {/* Drawer (below md) */}
      {isMobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-[55]">
          <div className="absolute inset-0 bg-canvas/70" onClick={closeMobileDrawer} aria-hidden />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Sylmap navigation"
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] flex flex-col gap-1 px-3 py-4 bg-surface-panel/95 backdrop-blur-overlay border-r border-line/10"
          >
            <div className="flex items-center justify-between mb-3 pl-2">
              <span className={cn(typography.overline, "text-fg-faint")}>Menu</span>
              <IconButton aria-label="Close menu" onClick={closeMobileDrawer}>
                <X className="w-5 h-5 stroke-[2]" aria-hidden />
              </IconButton>
            </div>
            <SidebarItems showLabel onSelect={closeMobileDrawer} />
          </div>
        </div>
      )}
    </>
  );
}
