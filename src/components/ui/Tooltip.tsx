import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "right";
  className?: string;
}

/**
 * Hover/focus tooltip in the panel language. Shown on hover and on keyboard focus of the wrapped
 * element; content is linked with aria-describedby.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();
  return (
    <span className="relative inline-flex group/tooltip" aria-describedby={id}>
      {children}
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute z-40 whitespace-nowrap rounded-control bg-surface-panel/95 border border-line/10 px-2 py-1 text-2xs font-medium text-fg-body shadow-panel opacity-0 transition-opacity duration-200 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
          side === "top" && "left-1/2 -translate-x-1/2 bottom-full mb-2",
          side === "bottom" && "left-1/2 -translate-x-1/2 top-full mt-2",
          side === "right" && "left-full top-1/2 -translate-y-1/2 ml-3",
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
