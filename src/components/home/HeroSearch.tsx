"use client";

import { useState, useRef } from "react";
import {
  Search,
  GitCompare,
  Sparkles,
  ArrowRight,
  MapPin,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  X,
} from "lucide-react";

import {
  executeRoutedQuery,
  QueryExecutionResult,
  IntentType,
  SearchResultItem,
} from "@/lib/intentRouter";

type SectionTabType = "search" | "compare";
type CompareCategory = "University" | "College" | "Programme" | "Semester" | "Subject";

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<SectionTabType>("search");
  const [selectedState, setSelectedState] = useState<string>("Karnataka");
  const [searchQuery, setSearchQuery] = useState("");

  // Compare Section State
  const [compareCategory, setCompareCategory] = useState<CompareCategory>("University");
  const [compareFirst, setCompareFirst] = useState("");
  const [compareSecond, setCompareSecond] = useState("");

  // Query Execution State
  const [isLoading, setIsLoading] = useState(false);
  const [queryResult, setQueryResult] = useState<QueryExecutionResult | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const statesList = ["Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Maharashtra"];

  const popularSearches = [
    { label: "VTU CSE", query: "VTU CSE" },
    { label: "AI in Semester 5", query: "AI subjects in Semester 5" },
    { label: "Which universities teach AI?", query: "Which universities teach AI in Semester 5?" },
    { label: "Compare VTU & KTU CSE", query: "Compare VTU and KTU CSE" },
    { label: "Ambiguous: AI", query: "AI" },
    { label: "Ambiguous: CSE", query: "CSE" },
  ];

  const compareOptions: CompareCategory[] = [
    "University",
    "College",
    "Programme",
    "Semester",
    "Subject",
  ];

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

  const handleCompareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compareFirst && !compareSecond) return;
    const formatted = `Compare ${compareFirst || "VTU"} and ${compareSecond || "KTU"} ${compareCategory}`;
    setSearchQuery(formatted);
    handleExecuteSearch(formatted, "ACADEMIC_QUESTION_AIE");
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

  return (
    <div className="w-full max-w-[820px] flex flex-col gap-2 sm:gap-2.5">
      {/* Unified Academic Navigator Shell */}
      <div className="w-full flex flex-col">
        {/* Top Global State Selector & Intent Badge Bar */}
        <div className="flex items-center justify-between pb-1.5 px-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300/90 tracking-wide">
              Explore in:
            </span>
            <div className="relative inline-flex items-center">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 pointer-events-none" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="appearance-none bg-slate-900/90 hover:bg-slate-800/90 border border-teal-500/40 hover:border-cyan-400/60 rounded-lg pl-8 pr-7 py-1 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.15)] cursor-pointer transition-all"
              >
                {statesList.map((st) => (
                  <option key={st} value={st} className="bg-slate-950 text-white font-medium">
                    {st}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
            </div>
          </div>

          {/* Active Intent Status Badge when result is present */}
          {queryResult && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-cyan-400/30 text-[11px] font-semibold text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                {queryResult.intent === "SEARCH_DISCOVERY" && "Search Results"}
                {queryResult.intent === "ACADEMIC_QUESTION_AIE" &&
                  (queryResult.aieAnswer?.isComparison ? "Comparison Response" : "Ask Sylmap / AI Answer")}
                {queryResult.intent === "AMBIGUOUS" && "Clarification Needed"}
              </span>
              <button
                onClick={handleClearResults}
                className="ml-1 text-slate-400 hover:text-white"
                title="Reset search"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Top-Level 2 Tabs: [ Search & Explore ] [ Compare ] */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 z-10 relative">
          {/* Tab 1: SEARCH & EXPLORE */}
          <button
            type="button"
            onClick={() => setActiveTab("search")}
            className={`flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-t-xl sm:rounded-t-2xl transition-all duration-300 text-left ${
              activeTab === "search"
                ? "bg-[#062c30]/95 border-t border-l border-r border-cyan-400/50 border-b-transparent text-white shadow-[0_-5px_20px_rgba(0,242,254,0.15)]"
                : "bg-[#071a42]/75 border-t border-l border-r border-white/20 border-b-transparent hover:border-white/30 text-slate-200 hover:bg-[#092254]/85 hover:text-white"
            }`}
          >
            <Search
              className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
                activeTab === "search" ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" : "text-slate-300"
              }`}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold tracking-tight leading-tight truncate">
                Search &amp; Explore
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300/80 font-normal leading-tight truncate mt-0.5">
                Unified Academic Search &amp; Discovery
              </span>
            </div>
          </button>

          {/* Tab 2: COMPARE */}
          <button
            type="button"
            onClick={() => setActiveTab("compare")}
            className={`flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-t-xl sm:rounded-t-2xl transition-all duration-300 text-left ${
              activeTab === "compare"
                ? "bg-[#062c30]/95 border-t border-l border-r border-cyan-400/50 border-b-transparent text-white shadow-[0_-5px_20px_rgba(0,242,254,0.15)]"
                : "bg-[#071a42]/75 border-t border-l border-r border-white/20 border-b-transparent hover:border-white/30 text-slate-200 hover:bg-[#092254]/85 hover:text-white"
            }`}
          >
            <GitCompare
              className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
                activeTab === "compare" ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" : "text-slate-300"
              }`}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold tracking-tight leading-tight truncate">
                Compare
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300/80 font-normal leading-tight truncate mt-0.5">
                Compare Institutions &amp; Curricula
              </span>
            </div>
          </button>
        </div>

        {/* Glassmorphism Active Content Panel */}
        <div className="w-full rounded-b-2xl rounded-t-none bg-[#040b19]/92 border border-cyan-500/45 backdrop-blur-md p-3.5 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(0,242,254,0.12)] flex flex-col justify-center min-h-[112px] sm:min-h-[120px] transition-all duration-300 -mt-0.5">
          {/* Compare Builder Form (ONLY when Compare tab is active and no active result) */}
          {activeTab === "compare" && !queryResult && (
            <form onSubmit={handleCompareSubmit} className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  Structured Comparison Scope:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {compareOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setCompareCategory(opt)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                        compareCategory === opt
                          ? "bg-teal-500/20 border border-teal-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.25)]"
                          : "bg-slate-900/60 border border-white/10 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full">
                <input
                  type="text"
                  value={compareFirst}
                  onChange={(e) => setCompareFirst(e.target.value)}
                  placeholder={`First ${compareCategory.toLowerCase()} (e.g. VTU)...`}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400 outline-none focus:border-cyan-400 font-medium"
                />
                <span className="text-xs font-bold text-cyan-400 shrink-0 px-0.5">vs</span>
                <input
                  type="text"
                  value={compareSecond}
                  onChange={(e) => setCompareSecond(e.target.value)}
                  placeholder={`Second ${compareCategory.toLowerCase()} (e.g. KTU)...`}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400 outline-none focus:border-cyan-400 font-medium"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 hover:brightness-110 shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all shrink-0"
                >
                  <GitCompare className="w-4 h-4 stroke-[2.5]" />
                  <span>Compare</span>
                </button>
              </div>
            </form>
          )}

          {/* ONE Shared Primary Search & AI Input Bar (In Search & Explore, or when query result active) */}
          {(activeTab === "search" || queryResult) && (
            <form onSubmit={handleSearchSubmit} className="relative w-full group">
              <div className="relative flex items-center w-full rounded-xl bg-slate-950/70 border border-white/20 px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                <div className="pr-3.5 text-cyan-400 group-focus-within:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search or ask anything about academic curricula…"
                  className="w-full py-1 pl-0 pr-14 bg-transparent text-sm sm:text-base text-white placeholder-slate-400 outline-none font-medium"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  aria-label="Execute search"
                  className="absolute right-2.5 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 flex items-center justify-center hover:brightness-110 shadow-[0_0_18px_rgba(0,242,254,0.45)] transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Popular Prompt Chips Row */}
      {!queryResult && !isLoading && (
        <div className="flex items-center gap-2 flex-wrap pt-1 px-1">
          <span className="text-xs text-slate-400 font-semibold mr-1">
            Try searching or asking:
          </span>
          {popularSearches.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => handleTagClick(chip.query)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all duration-200"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* STATE 1: LOADING ANIMATION */}
      {isLoading && (
        <div className="w-full rounded-2xl bg-[#040b19]/90 border border-cyan-500/30 p-6 flex flex-col items-center justify-center gap-3 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative flex items-center justify-center w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
            <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-cyan-300 tracking-wide text-center">
            Analyzing intent &amp; querying Sylmap Knowledge Graph...
          </p>
        </div>
      )}

      {/* STATE 2: AMBIGUOUS QUERY CLARIFICATION STATE */}
      {queryResult && queryResult.intent === "AMBIGUOUS" && !isLoading && (
        <div className="w-full rounded-2xl bg-[#05152a]/95 border border-cyan-400/50 p-4 sm:p-5 flex flex-col gap-4 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
              <HelpCircle className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Multiple options found for &quot;{queryResult.query}&quot;
              </h4>
              <p className="text-xs text-slate-300/90 leading-relaxed mt-0.5">
                Select your intended direction below to get the most accurate search results or grounded AI answer:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {queryResult.ambiguousOptions?.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => {
                  setSearchQuery(opt.targetQuery);
                  handleExecuteSearch(opt.targetQuery, opt.intent);
                }}
                className="group flex flex-col p-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/60 hover:bg-slate-800/80 text-left transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 group-hover:text-white transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    {opt.intent === "SEARCH_DISCOVERY" ? "Search" : "Ask Sylmap"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 group-hover:text-slate-200 mt-1 leading-snug">
                  {opt.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STATE 3: SEARCH DISCOVERY RESULTS STATE */}
      {queryResult && queryResult.intent === "SEARCH_DISCOVERY" && queryResult.hasResults && !isLoading && (
        <div className="w-full rounded-2xl bg-[#040b19]/95 border border-cyan-500/40 p-4 sm:p-5 flex flex-col gap-4 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">
                Search Results ({queryResult.searchResults?.length || 0} matches)
              </h4>
            </div>

            {/* Seamless Transition Button: Search -> Ask Sylmap AI */}
            <button
              type="button"
              onClick={() => handleExecuteSearch(queryResult.query, "ACADEMIC_QUESTION_AIE")}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 hover:text-white hover:bg-cyan-500/30 text-xs font-semibold transition-all shadow-[0_0_12px_rgba(0,242,254,0.15)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Ask Sylmap AI about this query</span>
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {queryResult.searchResults?.map((item: SearchResultItem) => (
              <div
                key={item.id}
                className="flex flex-col p-3 rounded-xl bg-slate-950/70 border border-white/10 hover:border-cyan-400/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-400/20">
                    {item.type}
                  </span>
                  {item.code && (
                    <span className="text-[10px] font-mono font-semibold text-slate-400">
                      {item.code}
                    </span>
                  )}
                </div>
                <h5 className="text-xs font-bold text-white mt-1.5 group-hover:text-cyan-300">
                  {item.title}
                </h5>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATE 4: ASK SYLMAP / GROUNDED AI ANSWER STATE (Result Type Response Card) */}
      {queryResult && queryResult.intent === "ACADEMIC_QUESTION_AIE" && queryResult.hasResults && queryResult.aieAnswer && !isLoading && (
        <div className="w-full rounded-2xl bg-[#040b19]/95 border border-teal-500/40 p-4 sm:p-5 flex flex-col gap-4 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in duration-300">
          {/* Header with "Ask Sylmap" Response Type Label */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-[0_0_12px_rgba(0,242,254,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Ask Sylmap</span>
              </div>
              <span className="text-xs font-semibold text-slate-300">
                {queryResult.aieAnswer.isComparison ? "Curriculum Comparison" : "Grounded AI Answer"}
              </span>
            </div>

            {/* Seamless Transition Button: Ask Sylmap Result -> Search Results */}
            <button
              type="button"
              onClick={() => handleExecuteSearch(queryResult.query, "SEARCH_DISCOVERY")}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 text-xs font-semibold transition-all"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Explore matching search entities</span>
            </button>
          </div>

          {/* Grounded Answer Text */}
          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 whitespace-pre-line font-normal">
            {queryResult.aieAnswer.answer}
          </div>

          {/* Key Insights Bullets */}
          {queryResult.aieAnswer.keyInsights.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col gap-1.5">
              <span className="text-xs font-bold text-cyan-300 tracking-wide">
                Key Curriculum Insights:
              </span>
              <ul className="space-y-1">
                {queryResult.aieAnswer.keyInsights.map((insight, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verified Sources / Citation Display */}
          <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Verified Sylmap Data Sources &amp; Citations:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {queryResult.aieAnswer.sources.map((src, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-400/30 text-xs text-teal-200"
                >
                  <span className="font-semibold text-white">{src.title}</span>
                  <span className="text-[10px] text-teal-300/80 font-mono">({src.scheme})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STATE 5: NO RESULTS / INFORMATION UNAVAILABLE STATE */}
      {queryResult && !queryResult.hasResults && !isLoading && (
        <div className="w-full rounded-2xl bg-[#0b1220]/95 border border-amber-500/30 p-5 flex flex-col items-center justify-center gap-3 text-center backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in duration-300">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <AlertCircle className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="flex flex-col items-center max-w-md">
            <h4 className="text-sm font-bold text-white">
              Information not available in Sylmap
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Sylmap AIE only answers from verified university curricula. No matching records were found for &quot;{queryResult.query}&quot; in {selectedState}.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center mt-1">
            <button
              onClick={() => handleTagClick("VTU CSE")}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40"
            >
              Try &quot;VTU CSE&quot;
            </button>
            <button
              onClick={() => handleTagClick("AI subjects in Semester 5")}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40"
            >
              Try &quot;AI subjects in Semester 5&quot;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
