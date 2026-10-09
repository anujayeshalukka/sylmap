import type { HTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SectionId } from "@/config/sections";
import { sectionColors } from "@/config/sections";

export type BadgeVariant = "default" | "brand" | "ai" | "verified" | "warning" | "danger" | "section";
export type BadgeSize = "sm" | "md" | "lg";

const variants: Record<Exclude<BadgeVariant, "section">, string> = {
  default: "bg-accent-fill/20 text-accent-text border-accent/30",
  /** Platform tag in the hero */
  brand: "bg-accent-fill/10 text-accent-text border-accent/30 shadow-glow-badge",
  /** "Ask Sylmap" response label */
  ai: "bg-accent-fill/20 text-accent-text border-accent/40 shadow-glow-md",
  verified: "bg-success-fill/10 text-success-soft border-success/30",
  warning: "bg-warning-fill/10 text-warning border-warning/30",
  danger: "bg-danger-fill/10 text-danger-text border-danger/30",
};

const sizes: Record<BadgeSize, string> = {
  sm: "gap-1 px-2 py-0.5 rounded-full text-micro",
  md: "gap-1.5 px-2.5 py-1 rounded-control text-xs font-bold",
  lg: "gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Required when variant="section" */
  section?: SectionId;
  icon?: ReactNode;
}

export function Badge({ variant = "default", size = "sm", section, icon, className, children, ...props }: BadgeProps) {
  const tone = variant === "section" && section ? sectionColors[section].tile : variants[variant === "section" ? "default" : variant];
  return (
    <span className={cn("inline-flex items-center border", sizes[size], tone, className)} {...props}>
      {icon}
      {children}
    </span>
  );
}

export interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  /** Pulsing live dot */
  pulse?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
}

/** Live status pill with an optional dismiss control — the active search-intent badge. */
export function StatusBadge({
  label,
  pulse = true,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-inner/90 border border-accent/30 text-2xs font-semibold text-accent-text",
        className,
      )}
      {...props}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full bg-accent", pulse && "animate-pulse")} aria-hidden />
      <span>{label}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-1 text-fg-muted hover:text-fg"
          title={dismissLabel}
          aria-label={dismissLabel}
        >
          <X className="w-3 h-3" aria-hidden />
        </button>
      )}
    </div>
  );
}
