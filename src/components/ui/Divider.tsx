import { cn } from "@/lib/cn";

export interface DividerProps {
  orientation?: "vertical" | "horizontal";
  /** strong = white/25 (panel header), default = white/20 vertical, white/10 horizontal */
  strong?: boolean;
  className?: string;
}

/** 1px separator. Vertical form is the 14px-tall inline divider (Login | name, Search & Explore | location). */
export function Divider({ orientation = "vertical", strong = false, className }: DividerProps) {
  if (orientation === "horizontal") {
    return <hr className={cn("h-px w-full border-0", strong ? "bg-line/20" : "bg-line/10", className)} />;
  }
  return <span aria-hidden className={cn("w-px h-3.5", strong ? "bg-line/25 shrink-0" : "bg-line/20", className)} />;
}
