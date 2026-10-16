"use client";

import Link from "next/link";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { useSidebar } from "./HomeShell";

/**
 * Compact bottom section navigation for the fresh homepage (md and up; below md the existing floating
 * MobileBottomNav dock plays this role). The six sections come from the shared navigation config and use
 * the same glass dock surface as the mobile dock.
 *
 * It fades out once the first scroll reveals the sidebar (HomeShell) and does not come back. While fading,
 * its row collapses to zero height (grid-rows 1fr → 0fr), so no blank slot is left at the bottom of the
 * page; the hero, centred in the remaining space, eases down rather than jumping. Once hidden it is removed
 * from the tab order and accessibility tree.
 */
export default function HomeSectionNav() {
  const { isBottomNavVisible } = useSidebar();

  return (
    <div
      className={cn(
        "hidden md:grid mt-auto transition-[grid-template-rows] duration-300 ease-standard",
        isBottomNavVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      {/* Clip only while collapsing, so the dock shadow is not cut off while the bar is showing */}
      <div className={cn("min-h-0", !isBottomNavVisible && "overflow-hidden")}>
        <nav
          aria-label="Sections"
          aria-hidden={!isBottomNavVisible || undefined}
          className={cn(
            "flex w-full max-w-3xl mx-auto items-stretch justify-around gap-1 px-2 py-1.5 bg-surface-panel/70 backdrop-blur-overlay border border-line/10 rounded-dock shadow-dock transition-[opacity,transform,visibility] duration-300 ease-standard",
            !isBottomNavVisible && "opacity-0 translate-y-3 invisible pointer-events-none",
          )}
        >
          {primaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                title={item.label}
                tabIndex={isBottomNavVisible ? undefined : -1}
                className="group flex flex-1 min-w-0 flex-col items-center justify-center gap-1 rounded-panel px-1 py-1.5 text-fg-secondary hover:text-fg hover:bg-line/5 transition-colors duration-200"
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-control flex items-center justify-center border shrink-0 transition-transform duration-200 group-hover:scale-105",
                    item.color.tile,
                  )}
                >
                  <Icon className="w-4 h-4 stroke-[2]" aria-hidden />
                </span>
                {/* 14px on tablet; 12px from lg (desktop), with a 14px line box so the bar keeps its height */}
                <span className="text-2xs lg:text-micro font-semibold leading-none lg:leading-3.5 truncate max-w-full">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
