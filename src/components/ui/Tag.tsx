import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { sectionColors, type SectionId } from "@/config/sections";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colours the tag with a section hue instead of the cyan accent */
  section?: SectionId;
}

/** Small uppercase type label (6px radius), e.g. PROGRAMME, SUBJECT. */
export function Tag({ section, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "text-micro uppercase tracking-wider font-bold px-2 py-0.5 rounded-tag border",
        section ? sectionColors[section].tile : "text-accent bg-accent-fill/10 border-accent/20",
        className,
      )}
      {...props}
    />
  );
}
