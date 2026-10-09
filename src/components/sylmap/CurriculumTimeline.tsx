import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TimelineItem {
  id: string;
  /** Short marker, e.g. "Sem 1", "2022" */
  label: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** current = glowing cyan node · past = muted node · upcoming = outline node */
  status?: "current" | "past" | "upcoming";
}

export interface CurriculumTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const node = {
  current: "bg-glow shadow-glow-active border-glow",
  past: "bg-accent-fill/40 border-accent/40",
  upcoming: "bg-canvas border-line/20",
};

/** Vertical timeline for semesters or curriculum revisions. Nodes echo the homepage orbit nodes. */
export function CurriculumTimeline({ items, className }: CurriculumTimelineProps) {
  return (
    <ol className={cn("relative flex flex-col gap-4 pl-6", className)}>
      <span aria-hidden className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-line/10" />
      {items.map((item) => {
        const status = item.status ?? "past";
        return (
          <li key={item.id} className="relative flex flex-col gap-0.5" aria-current={status === "current" ? "step" : undefined}>
            <span
              aria-hidden
              className={cn("absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2", node[status])}
            />
            <span className="text-micro uppercase tracking-wider font-bold text-accent">{item.label}</span>
            <span className="text-sm font-bold text-fg">{item.title}</span>
            {item.description && <span className="text-xs text-fg-muted leading-relaxed">{item.description}</span>}
          </li>
        );
      })}
    </ol>
  );
}
