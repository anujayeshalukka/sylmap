"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, MapPin, HelpCircle } from "lucide-react";

import {
  executeRoutedQuery,
  QueryExecutionResult,
  IntentType,
  SearchResultItem,
} from "@/lib/intentRouter";
import { Panel } from "@/components/ui/Panel";
import { Select } from "@/components/ui/Select";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { SearchResultCard } from "@/components/sylmap/SearchResultCard";
import { AIAnswerCard } from "@/components/sylmap/AIAnswerCard";
import { typography } from "@/styles/tokens";
import { NEW_SEARCH_EVENT } from "@/lib/searchEvents";
import { cn } from "@/lib/cn";

// Region / State options for geographic expansion (Karnataka default)
const regionList = ["All India", "Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Maharashtra"];

export interface SearchSuggestion {
  label: string;
  query: string;
}

const popularSearches: SearchSuggestion[] = [
  { label: "VTU CSE syllabus", query: "VTU CSE syllabus" },
  { label: "AI in Semester 5", query: "AI subjects in Semester 5" },
  { label: "Which universities teach AI?", query: "Which universities teach AI in Semester 5?" },
  { label: "Compare VTU & KTU CSE", query: "Compare VTU and KTU CSE" },
  { label: "Ambiguous: AI", query: "AI" },
];

interface HeroSearchProps {
  /** Suggested queries shown under the input (defaults to the original homepage set) */
  suggestions?: SearchSuggestion[];
  /** Centre the suggestion chips, for centred layouts */
  centerSuggestions?: boolean;
}

export default function HeroSearch({ suggestions = popularSearches, centerSuggestions = false }: HeroSearchProps) {
  const [selectedState, setSelectedState] = useState<string>("Karnataka");
  const [searchQuery, setSearchQuery] = useState("");

  // Query Execution State
  const [isLoading, setIsLoading] = useState(false);
  const [queryResult, setQueryResult] = useState<QueryExecutionResult | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Execute unified search via application-layer intent router
  const handleExecuteSearch = async (queryToRun: string, forcedIntent?: IntentType) => {
    if (!queryToRun.trim()) return;

    setIsLoading(true);
    setQueryResult(null);

    try {
      const result = await executeRoutedQuery(queryToRun, forcedIntent, selectedState);
      setQueryResult(result);
    } catch (err) {
      console.error("Routing execution error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(searchQuery);
  };

  const handleTagClick = (query: string) => {
    setSearchQuery(query);
    handleExecuteSearch(query);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearResults = () => {
    setQueryResult(null);
    setSearchQuery("");
  };

  // "New Search" from navigation: same as Reset, then focus the input.
  useEffect(() => {
    const onNewSearch = () => {
      setQueryResult(null);
      setSearchQuery("");
      inputRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener(NEW_SEARCH_EVENT, onNewSearch);
    return () => window.removeEventListener(NEW_SEARCH_EVENT, onNewSearch);
  }, []);

  const intentLabel =
    queryResult &&
    (queryResult.intent === "SEARCH_DISCOVERY"
      ? "Search Results"
      : queryResult.intent === "ACADEMIC_QUESTION_AIE"
        ? queryResult.aieAnswer?.isComparison
          ? "Comparison Response"
          : "Ask Sylmap / AI Answer"
        : "Clarification Needed");

  return (
    <div className="w-full max-w-content flex flex-col gap-2.5 sm:gap-3">
      {/* ONE Primary Unified Search Panel (Dark Navy / Blue Foundation) */}
      <Panel variant="primary" className="flex flex-col gap-3">
        {/* Panel Header */}
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-2.5">
          <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
            <h3 className={cn(typography.h3, "text-fg")}>Search &amp; Explore</h3>

            <Divider strong />

            {/* Compact State Context Selector: 📍 Karnataka ▾ */}
            <Select
              aria-label="Explore in"
              leadingIcon={MapPin}
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              options={regionList}
            />
          </div>

          {/* Active Intent Status Badge when result is present */}
          {queryResult && (
            <StatusBadge label={intentLabel} onDismiss={handleClearResults} dismissLabel="Reset search" />
          )}
        </div>

        {/* ONE Primary Shared Input */}
        <SearchInput
          inputRef={inputRef}
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearchSubmit}
          loading={isLoading}
        />
      </Panel>

      {/* Popular Prompt Suggestions Chips (When No Active Result) */}
      {!queryResult && !isLoading && (
        <div className={cn("flex items-center gap-2 flex-wrap pt-0.5 px-1", centerSuggestions && "justify-center")}>
          <span className="text-xs text-fg-secondary font-semibold mr-1">Try searching or asking:</span>
          {suggestions.map((chip) => (
            <Chip key={chip.label} onClick={() => handleTagClick(chip.query)}>
              {chip.label}
            </Chip>
          ))}
        </div>
      )}

      {/* STATE 1: LOADING */}
      {isLoading && <LoadingState message="Analyzing intent & querying Sylmap Knowledge Graph..." />}

      {/* STATE 2: AMBIGUOUS QUERY CLARIFICATION */}
      {queryResult && queryResult.intent === "AMBIGUOUS" && !isLoading && (
        <Panel variant="clarify" className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-card bg-accent-fill/20 border border-accent/40 flex items-center justify-center text-accent-text shrink-0">
              <HelpCircle className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <h4 className={cn(typography.h4, "sm:text-base text-fg flex items-center gap-2")}>
                Multiple options found for &quot;{queryResult.query}&quot;
              </h4>
              <p className="text-xs text-fg-secondary/90 leading-relaxed mt-0.5">
                Select your intended direction below to get the most accurate search results or grounded AI answer:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {queryResult.ambiguousOptions?.map((opt) => (
              <Card
                key={opt.label}
                as="button"
                type="button"
                interactive
                onClick={() => {
                  setSearchQuery(opt.targetQuery);
                  handleExecuteSearch(opt.targetQuery, opt.intent);
                }}
                className="group flex flex-col text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-accent-text group-hover:text-fg transition-colors">
                    {opt.label}
                  </span>
                  <Badge>{opt.intent === "SEARCH_DISCOVERY" ? "Search" : "Ask Sylmap"}</Badge>
                </div>
                <p className="text-2xs text-fg-muted group-hover:text-fg-body mt-1 leading-snug">{opt.description}</p>
              </Card>
            ))}
          </div>
        </Panel>
      )}

      {/* STATE 3: SEARCH DISCOVERY RESULTS */}
      {queryResult && queryResult.intent === "SEARCH_DISCOVERY" && queryResult.hasResults && !isLoading && (
        <Panel variant="result" className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-line/10 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-accent" />
              <h4 className={cn(typography.h4, "text-fg")}>
                Search Results ({queryResult.searchResults?.length || 0} matches)
              </h4>
            </div>

            {/* Seamless Transition Button: Search -> Ask Sylmap AI */}
            <Button
              variant="secondary"
              onClick={() => handleExecuteSearch(queryResult.query, "ACADEMIC_QUESTION_AIE")}
              leadingIcon={<Sparkles className="w-3.5 h-3.5 text-accent-text" />}
            >
              <span>Ask Sylmap AI about this query</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {queryResult.searchResults?.map((item: SearchResultItem) => (
              <SearchResultCard
                key={item.id}
                type={item.type}
                code={item.code}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </div>
        </Panel>
      )}

      {/* STATE 4: ASK SYLMAP / GROUNDED AI ANSWER (Result Type Response Card) */}
      {queryResult &&
        queryResult.intent === "ACADEMIC_QUESTION_AIE" &&
        queryResult.hasResults &&
        queryResult.aieAnswer &&
        !isLoading && (
          <AIAnswerCard
            answer={queryResult.aieAnswer.answer}
            keyInsights={queryResult.aieAnswer.keyInsights}
            sources={queryResult.aieAnswer.sources}
            isComparison={queryResult.aieAnswer.isComparison}
            onExploreSearch={() => handleExecuteSearch(queryResult.query, "SEARCH_DISCOVERY")}
          />
        )}

      {/* STATE 5: NO RESULTS / INFORMATION UNAVAILABLE */}
      {queryResult && !queryResult.hasResults && !isLoading && (
        <EmptyState
          title="Information not available in Sylmap"
          description={
            <>
              Sylmap AIE only answers from verified university curricula. No matching records were found for &quot;
              {queryResult.query}&quot; in {selectedState}.
            </>
          }
          actions={
            <>
              <Chip variant="muted" onClick={() => handleTagClick("VTU CSE syllabus")}>
                Try &quot;VTU CSE syllabus&quot;
              </Chip>
              <Chip variant="muted" onClick={() => handleTagClick("AI subjects in Semester 5")}>
                Try &quot;AI subjects in Semester 5&quot;
              </Chip>
            </>
          }
        />
      )}
    </div>
  );
}
