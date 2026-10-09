import type { SelectHTMLAttributes } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: Array<SelectOption | string>;
  /** Icon shown inside the left edge, e.g. MapPin for location */
  leadingIcon?: LucideIcon;
}

/** Compact context selector — the "📍 Karnataka ▾" control. */
export function Select({ options, leadingIcon: LeadingIcon, className, ...props }: SelectProps) {
  return (
    <div className="relative inline-flex items-center">
      {LeadingIcon && (
        <LeadingIcon className="w-3.5 h-3.5 text-accent absolute left-2.5 pointer-events-none" aria-hidden />
      )}
      <select
        className={cn(
          "appearance-none bg-surface-inner/90 hover:bg-surface-hover/90 border border-secondary-fill/40 hover:border-accent/60 rounded-control pr-7 py-1 text-xs font-bold text-accent-text focus:outline-none focus:border-accent focus-visible:shadow-glow-focus shadow-glow-sm cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          LeadingIcon ? "pl-8" : "pl-3",
          className,
        )}
        {...props}
      >
        {options.map((opt) => {
          const { value, label } = typeof opt === "string" ? { value: opt, label: opt } : opt;
          return (
            <option key={value} value={value} className="bg-slate-950 text-white font-medium">
              {label}
            </option>
          );
        })}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-fg-muted absolute right-2 pointer-events-none" aria-hidden />
    </div>
  );
}
