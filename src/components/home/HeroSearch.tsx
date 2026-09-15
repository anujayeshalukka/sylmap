"use client";

import { useState, useRef } from "react";
import { Search, GitCompare, Sparkles, ArrowRight, MapPin, ChevronDown } from "lucide-react";

type TabType = "search" | "compare" | "ask";
type CompareType = "University" | "College" | "Programme" | "Semester" | "Subject";

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<TabType>("search");
  const [selectedState, setSelectedState] = useState<string>("Karnataka");
  const [searchQuery, setSearchQuery] = useState("");

  // Compare Mode State
  const [compareCategory, setCompareCategory] = useState<CompareType>("University");
  const [compareFirst, setCompareFirst] = useState("");
  const [compareSecond, setCompareSecond] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const statesList = ["Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Maharashtra"];

  const popularSearches = [
    "AI in Semester 5",
    "CSE Syllabus",
    "Top Universities in Karnataka",
    "B.Tech Courses",
  ];

  const compareOptions: CompareType[] = [
    "University",
    "College",
    "Programme",
    "Semester",
    "Subject",
  ];

  const popularComparisons = [
    "VTU vs KTU CSE",
    "AI vs ML Semester 5",
    "Autonomous vs Affiliated",
  ];

  const askExamplePrompts = [
    "Which universities teach AI in Semester 5?",
    "Compare VTU and KTU CSE.",
    "Which subjects are common?",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
  };

  const handleCompareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-[820px] flex flex-col gap-2 sm:gap-2.5">
      {/* Unified Academic Navigator Shell */}
      <div className="w-full flex flex-col">
        {/* Top Global State Selector Bar */}
        <div className="flex items-center justify-between pb-1.5 px-1">
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
        </div>

        {/* Mobile Primary 3 Action Accordion Header (< 768px) */}
        <div className="flex md:hidden items-center gap-1.5 z-10 relative w-full">
          {/* Mobile Tab 1: SEARCH & EXPLORE */}
          <button
            type="button"
            onClick={() => setActiveTab("search")}
            title="Search & Explore"
            aria-label="Search & Explore"
            className={`flex items-center gap-2 py-2 px-2.5 rounded-t-xl transition-all duration-200 text-left ${
              activeTab === "search"
                ? "flex-1 min-w-0 bg-[#062c30]/95 border-t border-l border-r border-cyan-400/50 border-b-transparent text-white shadow-[0_-4px_16px_rgba(0,242,254,0.15)]"
                : "shrink-0 w-11 h-[48px] justify-center bg-[#071a42]/75 border-t border-l border-r border-white/20 border-b-transparent text-slate-100 hover:bg-[#092254]/85 hover:text-white"
            }`}
          >
            <Search
              className={`w-4 h-4 shrink-0 transition-colors ${
                activeTab === "search" ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" : "text-slate-100"
              }`}
            />
            {activeTab === "search" && (
              <div className="flex flex-col min-w-0 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-white tracking-tight leading-tight truncate">
                  Search &amp; Explore
                </span>
                <span className="text-[10px] text-cyan-100/70 font-normal leading-tight truncate mt-0.5">
                  Universities · Programmes
                </span>
              </div>
            )}
          </button>

          {/* Mobile Tab 2: COMPARE */}
          <button
            type="button"
            onClick={() => setActiveTab("compare")}
            title="Compare"
            aria-label="Compare"
            className={`flex items-center gap-2 py-2 px-2.5 rounded-t-xl transition-all duration-200 text-left ${
              activeTab === "compare"
                ? "flex-1 min-w-0 bg-[#062c30]/95 border-t border-l border-r border-cyan-400/50 border-b-transparent text-white shadow-[0_-4px_16px_rgba(0,242,254,0.15)]"
                : "shrink-0 w-11 h-[48px] justify-center bg-[#071a42]/75 border-t border-l border-r border-white/20 border-b-transparent text-slate-100 hover:bg-[#092254]/85 hover:text-white"
            }`}
          >
            <GitCompare
              className={`w-4 h-4 shrink-0 transition-colors ${
                activeTab === "compare" ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" : "text-slate-100"
              }`}
            />
            {activeTab === "compare" && (
              <div className="flex flex-col min-w-0 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-white tracking-tight leading-tight truncate">
                  Compare
                </span>
                <span className="text-[10px] text-cyan-100/70 font-normal leading-tight truncate mt-0.5">
                  Institutions &amp; Curricula
                </span>
              </div>
            )}
          </button>

          {/* Mobile Tab 3: ASK SYLMAP */}
          <button
            type="button"
            onClick={() => setActiveTab("ask")}
            title="Ask Sylmap"
            aria-label="Ask Sylmap"
            className={`flex items-center gap-2 py-2 px-2.5 rounded-t-xl transition-all duration-200 text-left ${
              activeTab === "ask"
                ? "flex-1 min-w-0 bg-[#062c30]/95 border-t border-l border-r border-cyan-400/50 border-b-transparent text-white shadow-[0_-4px_16px_rgba(0,242,254,0.15)]"
                : "shrink-0 w-11 h-[48px] justify-center bg-[#071a42]/75 border-t border-l border-r border-white/20 border-b-transparent text-slate-100 hover:bg-[#092254]/85 hover:text-white"
            }`}
          >
            <Sparkles
              className={`w-4 h-4 shrink-0 transition-colors ${
                activeTab === "ask" ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" : "text-slate-100"
              }`}
            />
            {activeTab === "ask" && (
              <div className="flex flex-col min-w-0 animate-in fade-in duration-200">
                <span className="text-xs font-bold text-white tracking-tight leading-tight truncate">
                  Ask Sylmap
                </span>
                <span className="text-[10px] text-cyan-100/70 font-normal leading-tight truncate mt-0.5">
                  Ask questions
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Desktop & Tablet Primary 3 Action Tabs Header (>= 768px) */}
        <div className="hidden md:grid md:grid-cols-3 gap-2 sm:gap-3 z-10 relative">
          {/* Tab 1: SEARCH & EXPLORE */}
          <button
            type="button"
            onClick={() => setActiveTab("search")}
            className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-t-2xl transition-all duration-300 text-left ${
              activeTab === "search"
                ? "bg-[#062c30]/95 border-t border-l border-r border-cyan-400/50 border-b-transparent text-white shadow-[0_-5px_20px_rgba(0,242,254,0.15)]"
                : "bg-[#071a42]/75 border-t border-l border-r border-white/20 border-b-transparent hover:border-white/30 text-slate-100 hover:bg-[#092254]/85 hover:text-white"
            }`}
          >
            <Search
              className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
                activeTab === "search" ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" : "text-slate-100"
              }`}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold tracking-tight leading-tight truncate">
                Search &amp; Explore
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300/80 font-normal leading-tight truncate mt-0.5">
                Universities · Programmes · Subjects
              </span>
            </div>
          </button>

          {/* Tab 2: COMPARE */}
          <button
            type="button"
            onClick={() => setActiveTab("compare")}
            className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-t-2xl transition-all duration-300 text-left ${
              activeTab === "compare"
                ? "bg-[#062c30]/95 border-t border-l border-r border-cyan-400/50 border-b-transparent text-white shadow-[0_-5px_20px_rgba(0,242,254,0.15)]"
                : "bg-[#071a42]/75 border-t border-l border-r border-white/20 border-b-transparent hover:border-white/30 text-slate-100 hover:bg-[#092254]/85 hover:text-white"
            }`}
          >
            <GitCompare
              className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
                activeTab === "compare" ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" : "text-slate-100"
              }`}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold tracking-tight leading-tight truncate">
                Compare
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300/80 font-normal leading-tight truncate mt-0.5">
                Universities · Colleges · Programmes
              </span>
            </div>
          </button>

          {/* Tab 3: ASK SYLMAP */}
          <button
            type="button"
            onClick={() => setActiveTab("ask")}
            className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-t-2xl transition-all duration-300 text-left ${
              activeTab === "ask"
                ? "bg-[#062c30]/95 border-t border-l border-r border-cyan-400/50 border-b-transparent text-white shadow-[0_-5px_20px_rgba(0,242,254,0.15)]"
                : "bg-[#071a42]/75 border-t border-l border-r border-white/20 border-b-transparent hover:border-white/30 text-slate-100 hover:bg-[#092254]/85 hover:text-white"
            }`}
          >
            <Sparkles
              className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
                activeTab === "ask" ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" : "text-slate-100"
              }`}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold tracking-tight leading-tight truncate">
                Ask Sylmap
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300/80 font-normal leading-tight truncate mt-0.5">
                Ask questions about curricula
              </span>
            </div>
          </button>
        </div>

        {/* Unified Glassmorphism Active Content Panel */}
        <div className="w-full rounded-b-2xl rounded-t-none bg-[#040b19]/92 border border-cyan-500/45 backdrop-blur-md p-3.5 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(0,242,254,0.12)] flex flex-col justify-center min-h-[112px] sm:min-h-[120px] transition-all duration-300 -mt-0.5">
          {/* MODE 1: SEARCH & EXPLORE */}
          {activeTab === "search" && (
            <form onSubmit={handleSearchSubmit} className="relative w-full group">
              <div className="relative flex items-center w-full rounded-xl bg-slate-950/70 border border-white/10 px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                <div className="pr-3.5 text-slate-400 group-focus-within:text-cyan-300 transition-colors">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search universities, programmes, subjects, resources..."
                  className="w-full py-1 pl-0 pr-14 bg-transparent text-sm sm:text-base text-white placeholder-slate-400/80 outline-none font-medium"
                />

                <button
                  type="submit"
                  aria-label="Execute search"
                  className="absolute right-2.5 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 flex items-center justify-center hover:brightness-110 shadow-[0_0_18px_rgba(0,242,254,0.45)] transition-all transform hover:scale-105"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}

          {/* MODE 2: COMPARE */}
          {activeTab === "compare" && (
            <form onSubmit={handleCompareSubmit} className="w-full flex flex-col gap-3">
              {/* Category Option Pills */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  What would you like to compare?
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {compareOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setCompareCategory(opt)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
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

              {/* Inputs Row: Select First | vs | Select Second + Compare Button */}
              <div className="flex items-center gap-2 sm:gap-3 w-full">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={compareFirst}
                    onChange={(e) => setCompareFirst(e.target.value)}
                    placeholder={`Select first ${compareCategory.toLowerCase()}...`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400/70 outline-none focus:border-cyan-400/60 font-medium"
                  />
                </div>

                <span className="text-xs font-bold text-cyan-400 shrink-0 px-1">vs</span>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={compareSecond}
                    onChange={(e) => setCompareSecond(e.target.value)}
                    placeholder={`Select second ${compareCategory.toLowerCase()}...`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-400/70 outline-none focus:border-cyan-400/60 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 hover:brightness-110 shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all shrink-0"
                >
                  <GitCompare className="w-4 h-4 stroke-[2.5]" />
                  <span>Compare</span>
                </button>
              </div>
            </form>
          )}

          {/* MODE 3: ASK SYLMAP */}
          {activeTab === "ask" && (
            <form onSubmit={handleSearchSubmit} className="relative w-full group">
              <div className="relative flex items-center w-full rounded-xl bg-slate-950/70 border border-white/10 px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                <div className="pr-3.5 text-cyan-400 group-focus-within:text-cyan-300 transition-colors">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask about universities, programmes, subjects or curricula..."
                  className="w-full py-1 pl-0 pr-14 bg-transparent text-sm sm:text-base text-white placeholder-slate-400/80 outline-none font-medium"
                />

                <button
                  type="submit"
                  aria-label="Ask question"
                  className="absolute right-2.5 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 flex items-center justify-center hover:brightness-110 shadow-[0_0_18px_rgba(0,242,254,0.45)] transition-all transform hover:scale-105"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Mode-specific chips row */}
      {activeTab === "search" && (
        <div className="flex items-center gap-2 flex-wrap pt-1 px-1">
          <span className="text-xs text-slate-400 font-semibold mr-1">
            Popular searches:
          </span>
          {popularSearches.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleTagClick(chip)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all duration-200"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {activeTab === "compare" && (
        <div className="flex items-center gap-2 flex-wrap pt-1 px-1">
          <span className="text-xs text-slate-400 font-semibold mr-1">
            Popular comparisons:
          </span>
          {popularComparisons.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                const parts = chip.split(" vs ");
                if (parts.length === 2) {
                  setCompareFirst(parts[0]);
                  setCompareSecond(parts[1]);
                }
              }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all duration-200"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {activeTab === "ask" && (
        <div className="flex items-center gap-2 flex-wrap pt-1 px-1">
          <span className="text-xs text-slate-400 font-semibold mr-1">
            Try asking:
          </span>
          {askExamplePrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleTagClick(prompt)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
