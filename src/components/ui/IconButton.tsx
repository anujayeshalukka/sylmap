import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

export type IconButtonVariant = "primary" | "ghost";

const variants: Record<IconButtonVariant, string> = {
  /** Round gradient button with glow — the search submit */
  primary:
    "w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-glow-button transition-all hover:brightness-110 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed",
  /** Borderless square — menu, close */
  ghost: "p-2 rounded-control text-fg-muted hover:text-fg hover:bg-line/10 active:bg-line/15",
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only buttons need an accessible name */
  "aria-label": string;
  variant?: IconButtonVariant;
  loading?: boolean;
  /** Spinner shown while loading (defaults to the RefreshCw spinner) */
  loadingIcon?: ReactNode;
}

export function IconButton({
  variant = "ghost",
  loading = false,
  loadingIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn("flex items-center justify-center", variants[variant], className)}
      {...props}
    >
      {loading ? (loadingIcon ?? <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" aria-hidden />) : children}
    </button>
  );
}
