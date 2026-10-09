import { Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { Panel } from "@/components/ui/Panel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SourceChip, VerificationBadge } from "./Badges";

export interface AIAnswerSource {
  title: string;
  scheme?: string;
}

export interface AIAnswerCardProps {
  answer: string;
  keyInsights?: string[];
  sources: AIAnswerSource[];
  /** Shows "Curriculum Comparison" instead of "Grounded AI Answer" */
  isComparison?: boolean;
  /** Switches the same query to search results */
  onExploreSearch?: () => void;
  className?: string;
}

/**
 * Ask Sylmap response card. "Ask Sylmap" is a result type, not a search mode: this card is rendered
 * when the single search input routes a query to an academic answer or comparison.
 */
export function AIAnswerCard({
  answer,
  keyInsights = [],
  sources,
  isComparison = false,
  onExploreSearch,
  className,
}: AIAnswerCardProps) {
  return (
    <Panel variant="answer" className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between border-b border-line/10 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="ai" size="md" icon={<Sparkles className="w-3.5 h-3.5 text-accent-text" aria-hidden />}>
            <span>Ask Sylmap</span>
          </Badge>
          <span className="text-xs font-semibold text-fg-secondary">
            {isComparison ? "Curriculum Comparison" : "Grounded AI Answer"}
          </span>
        </div>

        {onExploreSearch && (
          <Button
            variant="neutral"
            onClick={onExploreSearch}
            leadingIcon={<Search className="w-3.5 h-3.5 text-fg-muted" aria-hidden />}
          >
            <span>Explore matching search entities</span>
          </Button>
        )}
      </div>

      <div className="text-xs sm:text-sm text-fg-body leading-relaxed space-y-2 whitespace-pre-line font-normal">
        {answer}
      </div>

      {keyInsights.length > 0 && (
        <div className="p-3 rounded-card bg-canvas/60 border border-line/10 flex flex-col gap-1.5">
          <span className="text-xs font-bold text-accent-text tracking-wide">Key Curriculum Insights:</span>
          <ul className="space-y-1">
            {keyInsights.map((insight, i) => (
              <li key={i} className="text-xs text-fg-secondary flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2 pt-1 border-t border-line/10">
        <VerificationBadge variant="inline" label="Verified Sylmap Data Sources & Citations:" />
        <div className="flex flex-wrap gap-2">
          {sources.map((src, i) => (
            <SourceChip key={i} title={src.title} scheme={src.scheme} />
          ))}
        </div>
      </div>
    </Panel>
  );
}
