"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

export default function MobileBottomNav() {
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3.5 right-3.5 sm:left-4 sm:right-4 z-50 md:hidden bg-surface-panel/92 backdrop-blur-overlay border border-line/10 rounded-dock px-2 py-1.5 h-[62px] shadow-dock flex items-center justify-around max-w-md mx-auto"
    >
      {primaryNav.map((item) => {
        const Icon = item.icon;
        const isActive = activeHash === item.href || (activeHash === "" && item.id === "universities");

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActiveHash(item.href)}
            title={item.label}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex flex-col items-center justify-center flex-1 h-full rounded-panel transition-all duration-200 group px-1",
              isActive ? "text-accent-text" : "text-fg-muted hover:text-fg-body",
            )}
          >
            {/* Active background pill highlight */}
            {isActive && (
              <span className="absolute inset-0 bg-accent-fill/15 border border-secondary/40 rounded-panel shadow-glow-active transition-all duration-200" />
            )}

            {/* Icon */}
            <div
              className={cn(
                "relative z-10 flex items-center justify-center transition-transform duration-200",
                isActive && "-translate-y-0.5",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 stroke-[2] transition-all duration-200",
                  isActive ? "text-accent-text drop-shadow-glow-icon" : "text-fg-muted group-hover:text-fg-body",
                )}
              />
            </div>

            {/* Active text label (ONLY for active item) */}
            {isActive && (
              <span className="relative z-10 text-micro font-semibold text-accent-text tracking-tight leading-none mt-0.5 whitespace-nowrap animate-nav-label-in">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
