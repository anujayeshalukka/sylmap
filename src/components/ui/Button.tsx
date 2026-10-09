import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "neutral" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  /** Gradient action — same recipe as the search submit button */
  primary:
    "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-glow-button hover:brightness-110",
  /** Accent outline — "Ask Sylmap AI about this query" */
  secondary:
    "bg-accent-fill/15 border border-accent/40 text-accent-text hover:text-fg hover:bg-accent-fill/30 shadow-glow-sm",
  /** Neutral outline — "Explore matching search entities" */
  neutral:
    "bg-surface-inner border border-line/15 text-fg-secondary hover:text-accent-text hover:border-accent/50",
  /** Borderless — header controls */
  ghost: "text-fg-secondary hover:text-fg hover:bg-line/10",
  /** Destructive / error recovery. V1 addition. */
  danger:
    "bg-danger-fill/15 border border-danger/40 text-danger-text hover:text-fg hover:bg-danger-fill/30",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1 rounded-card text-xs font-semibold",
  md: "px-4 py-2 rounded-card text-sm font-semibold",
};

export function buttonClasses(variant: ButtonVariant = "secondary", size: ButtonSize = "sm") {
  return cn(base, variants[variant], sizes[size]);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
}

export function Button({
  variant = "secondary",
  size = "sm",
  loading = false,
  leadingIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonClasses(variant, size), className)}
      {...props}
    >
      {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" aria-hidden /> : leadingIcon}
      {children}
    </button>
  );
}
