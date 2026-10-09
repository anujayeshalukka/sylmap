import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export interface SearchResultCardProps {
  /** Entity type label, e.g. "Programme", "Subject" */
  type: string;
  title: string;
  subtitle?: string;
  /** Course / subject code */
  code?: string;
  href?: string;
  className?: string;
}

/** One search hit: type tag, optional code, title, subtitle. */
export function SearchResultCard({ type, title, subtitle, code, href, className }: SearchResultCardProps) {
  return (
    <Card
      as={href ? "a" : "div"}
      href={href}
      variant="result"
      interactive
      className={cn("flex flex-col", className)}
    >
      <div className="flex items-center justify-between gap-2">
        <Tag>{type}</Tag>
        {code && <span className="text-micro font-mono font-semibold text-fg-muted">{code}</span>}
      </div>
      <h5 className="text-xs font-bold text-fg mt-1.5 group-hover:text-accent-text">{title}</h5>
      {subtitle && <p className="text-2xs text-fg-muted mt-0.5 leading-snug">{subtitle}</p>}
    </Card>
  );
}
