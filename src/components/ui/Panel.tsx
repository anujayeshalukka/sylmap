import type { ElementType, HTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";

export type PanelVariant = "primary" | "result" | "answer" | "clarify" | "warning" | "danger" | "loading";

const variants: Record<PanelVariant, string> = {
  /** Navy search panel with border glow */
  primary: "bg-surface-panel/95 border-accent-fill/40 shadow-panel-glow",
  /** Search results */
  result: "bg-surface-result/95 border-accent-fill/40 shadow-panel",
  /** Ask Sylmap / grounded AI answer (teal edge) */
  answer: "bg-surface-result/95 border-secondary-fill/40 shadow-panel",
  /** Clarification / ambiguous query */
  clarify: "bg-surface-clarify/95 border-accent/50 shadow-panel",
  /** No data / information unavailable */
  warning: "bg-surface-empty/95 border-warning-fill/30 shadow-panel",
  /** Error. V1 addition. */
  danger: "bg-surface-empty/95 border-danger-fill/30 shadow-panel",
  /** In-progress */
  loading: "bg-surface-result/90 border-accent-fill/30",
};

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  variant?: PanelVariant;
  /** Default: 16px → 20px */
  padded?: boolean;
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}

/** Large rounded surface (16px radius, 1px tinted border, 12px backdrop blur). */
export function Panel({ variant = "result", padded = true, as: Tag = "div", className, ...props }: PanelProps) {
  return (
    <Tag
      className={cn(
        "w-full rounded-panel border backdrop-blur-panel",
        variants[variant],
        padded && "p-4 sm:p-5",
        className,
      )}
      {...props}
    />
  );
}
