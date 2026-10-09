import type { ReactNode } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { sectionColors, type SectionId } from "@/config/sections";
import { Card } from "@/components/ui/Card";

export interface EntityMeta {
  label: string;
  value: ReactNode;
}

export interface EntityCardProps {
  /** Section that owns this entity; sets the icon tile colour */
  section: SectionId;
  icon: LucideIcon;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Small line above the title (type tag, code, semester number …) */
  eyebrow?: ReactNode;
  meta?: EntityMeta[];
  /** Badges row (scheme, verification, status …) */
  badges?: ReactNode;
  footer?: ReactNode;
  href?: string;
  selected?: boolean;
  className?: string;
}

/**
 * Base layout for every academic entity card (university, programme, semester, subject, module,
 * curriculum, resource, project, career): section icon tile, eyebrow, title, subtitle, meta, badges.
 */
export function EntityCard({
  section,
  icon: Icon,
  title,
  subtitle,
  eyebrow,
  meta,
  badges,
  footer,
  href,
  selected,
  className,
}: EntityCardProps) {
  return (
    <Card
      as={href ? "a" : "article"}
      href={href}
      interactive={Boolean(href)}
      selected={selected}
      className={cn("group flex flex-col gap-2.5", className)}
    >
      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "w-8 h-8 rounded-card flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105",
            sectionColors[section].tile,
          )}
        >
          <Icon className="w-4 h-4 stroke-[2]" aria-hidden />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          {eyebrow && <div className="flex items-center gap-2 mb-0.5">{eyebrow}</div>}
          <h3 className="text-sm font-bold text-fg leading-snug group-hover:text-accent-text transition-colors">
            {title}
          </h3>
          {subtitle && <p className="text-2xs text-fg-muted mt-0.5 leading-snug">{subtitle}</p>}
        </div>
        {href && (
          <ChevronRight
            className="w-3.5 h-3.5 text-fg-faint group-hover:text-accent-text group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
            aria-hidden
          />
        )}
      </div>

      {meta && meta.length > 0 && (
        <dl className="grid grid-cols-2 gap-x-3 gap-y-1">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col min-w-0">
              <dt className="text-micro uppercase tracking-wider font-bold text-fg-faint">{m.label}</dt>
              <dd className="text-xs text-fg-secondary truncate">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {badges && <div className="flex flex-wrap items-center gap-1.5">{badges}</div>}
      {footer && <div className="pt-2 border-t border-line/10">{footer}</div>}
    </Card>
  );
}
