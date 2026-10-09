import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Shows the error style and sets aria-invalid */
  invalid?: boolean;
  leadingIcon?: ReactNode;
}

/** Text field in the search-input language: dark sunken fill, white/20 border, cyan focus glow. */
export function Input({ invalid = false, leadingIcon, className, ...props }: InputProps) {
  return (
    <div
      className={cn(
        "relative flex items-center w-full rounded-card bg-canvas/80 border px-4 py-2.5 transition-all duration-300",
        invalid
          ? "border-danger/70 focus-within:shadow-[0_0_20px_rgba(248,113,113,0.2)]"
          : "border-line/20 focus-within:border-accent focus-within:shadow-glow-focus",
        props.disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {leadingIcon && <span className="pr-3 text-accent flex items-center">{leadingIcon}</span>}
      <input
        aria-invalid={invalid || undefined}
        className="w-full bg-transparent text-sm text-fg placeholder-slate-400 outline-none font-medium disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}
