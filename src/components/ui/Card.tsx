import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "result" | "glass";

const variants: Record<CardVariant, string> = {
  /** Inner card on a panel, e.g. clarification option */
  default: "rounded-card bg-surface-inner/80 border border-line/10",
  /** Sunken card for listed results */
  result: "rounded-card bg-canvas/70 border border-line/10",
  /** Glass navigation card; hover lift + cyan glow come from .sylmap-glass-card */
  glass: "rounded-card sylmap-glass-card border border-line/10",
};

const interactiveByVariant: Record<CardVariant, string> = {
  default: "transition-all duration-200 hover:border-accent/60 hover:bg-surface-hover/80",
  result: "transition-all duration-200 hover:border-accent/40",
  glass: "transition-all duration-300",
};

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  /** Adds hover/selected styling for clickable cards */
  interactive?: boolean;
  /** Marks the card as the chosen option */
  selected?: boolean;
  padded?: boolean;
  as?: ElementType;
  href?: string;
  type?: "button" | "submit";
}

export function Card({
  variant = "default",
  interactive = false,
  selected = false,
  padded = true,
  as: Tag = "div",
  className,
  ...props
}: CardProps) {
  return (
    <Tag
      data-selected={selected || undefined}
      className={cn(
        variants[variant],
        interactive && interactiveByVariant[variant],
        selected && "border-accent/60 bg-accent-fill/10",
        padded && "p-3",
        className,
      )}
      {...props}
    />
  );
}

export function GlassCard(props: Omit<CardProps, "variant">) {
  return <Card variant="glass" {...props} />;
}
