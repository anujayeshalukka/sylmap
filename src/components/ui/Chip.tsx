import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ChipVariant = "default" | "muted";

const variants: Record<ChipVariant, string> = {
  /** Suggestion chip ("Try searching or asking") */
  default:
    "bg-surface-inner/80 hover:bg-accent-fill/20 text-fg-body hover:text-accent-text border-line/10 hover:border-accent/40 transition-all duration-200",
  /** Quieter chip used inside result cards */
  muted: "bg-surface-inner border-line/10 text-fg-secondary hover:text-accent-text hover:border-accent/40",
};

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  /** Toggle chips: sets aria-pressed and the selected style */
  selected?: boolean;
}

/** Pill-shaped clickable suggestion or filter. */
export function Chip({ variant = "default", selected, className, type = "button", ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium border active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        selected && "bg-accent-fill/20 text-accent-text border-accent/40",
        className,
      )}
      {...props}
    />
  );
}
