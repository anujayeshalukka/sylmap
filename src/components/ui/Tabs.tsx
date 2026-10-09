"use client";

import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Accessible name for the tab list */
  label: string;
  /** Stable id prefix; pass the same value to tabPanelProps() for each panel */
  id?: string;
  className?: string;
}

/** Props for the panel that belongs to a tab: <div {...tabPanelProps(tabsId, "search")}>…</div> */
export function tabPanelProps(tabsId: string, itemId: string) {
  return { role: "tabpanel", id: `${tabsId}-panel-${itemId}`, "aria-labelledby": `${tabsId}-tab-${itemId}` } as const;
}

/**
 * Segmented tab list. The selected tab uses the bottom-nav active pill language
 * (cyan-500/15 fill, teal-400/40 border, active glow). Arrow keys, Home and End move between tabs.
 */
export function Tabs({ items, value, onChange, label, id, className }: TabsProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0);
    const current = enabled.indexOf(items.findIndex((item) => item.id === value));
    let next = current;
    if (e.key === "ArrowRight") next = (current + 1) % enabled.length;
    else if (e.key === "ArrowLeft") next = (current - 1 + enabled.length) % enabled.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = enabled.length - 1;
    else return;
    e.preventDefault();
    const index = enabled[next];
    onChange(items[index].id);
    refs.current[index]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-card bg-surface-inner/80 border border-line/10",
        className,
      )}
    >
      {items.map((item, i) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`${baseId}-panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onChange(item.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control border text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
              selected
                ? "bg-accent-fill/15 border-secondary/40 text-accent-text shadow-glow-active"
                : "border-transparent text-fg-secondary hover:text-accent-text active:bg-line/5",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
