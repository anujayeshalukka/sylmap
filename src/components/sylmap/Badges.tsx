import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { navById } from "@/config/navigation";
import type { SectionId } from "@/config/sections";
import { Badge } from "@/components/ui/Badge";

export interface AcademicSectionBadgeProps {
  section: SectionId;
  /** Show the section icon (default true) */
  withIcon?: boolean;
  className?: string;
}

/** Pill in the section's colour with its icon, e.g. "Programmes" in purple. */
export function AcademicSectionBadge({ section, withIcon = true, className }: AcademicSectionBadgeProps) {
  const item = navById[section];
  const Icon = item.icon;
  return (
    <Badge
      variant="section"
      section={section}
      className={className}
      icon={withIcon ? <Icon className="w-3 h-3 stroke-[2]" aria-hidden /> : undefined}
    >
      {item.label}
    </Badge>
  );
}

export interface VerificationBadgeProps {
  label?: string;
  /** inline = icon + label (citations heading) · pill = teal badge */
  variant?: "inline" | "pill";
  className?: string;
}

/** Verified-data marker (teal check). */
export function VerificationBadge({ label = "Verified", variant = "pill", className }: VerificationBadgeProps) {
  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-1.5 text-xs font-bold text-fg-secondary", className)}>
        <CheckCircle2 className="w-3.5 h-3.5 text-success" aria-hidden />
        <span>{label}</span>
      </div>
    );
  }
  return (
    <Badge variant="verified" className={className} icon={<CheckCircle2 className="w-3 h-3" aria-hidden />}>
      {label}
    </Badge>
  );
}

export interface CurriculumVersionBadgeProps {
  /** Scheme / version label as published, e.g. "2022 Scheme" */
  scheme: string;
  /** current = cyan · archived = muted */
  status?: "current" | "archived";
  className?: string;
}

/** Monospace curriculum scheme marker. */
export function CurriculumVersionBadge({ scheme, status = "current", className }: CurriculumVersionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-tag border font-mono text-micro font-semibold",
        status === "current"
          ? "text-accent-text bg-accent-fill/10 border-accent/30"
          : "text-fg-muted bg-surface-inner/80 border-line/10",
        className,
      )}
    >
      {scheme}
    </span>
  );
}

export interface SourceChipProps {
  title: string;
  scheme?: string;
  className?: string;
}

/** Citation chip under AI answers. */
export function SourceChip({ title, scheme, className }: SourceChipProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-control bg-success-fill/10 border border-success/30 text-xs text-success-soft",
        className,
      )}
    >
      <span className="font-semibold text-fg">{title}</span>
      {scheme && <span className="text-micro text-success-text/80 font-mono">({scheme})</span>}
    </div>
  );
}
