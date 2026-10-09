"use client";

import type { FormEvent, Ref } from "react";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "./IconButton";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
  submitLabel?: string;
  className?: string;
}

/** The one Sylmap search field: search icon, shared input, round gradient submit. */
export function SearchInput({
  value,
  onChange,
  onSubmit,
  loading = false,
  placeholder = "Search or ask anything about academic curricula…",
  inputRef,
  submitLabel = "Execute search or question",
  className,
}: SearchInputProps) {
  return (
    <form onSubmit={onSubmit} role="search" className={cn("relative w-full group", className)}>
      <div className="relative flex items-center w-full rounded-card bg-canvas/80 border border-line/20 px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 focus-within:border-accent focus-within:shadow-glow-focus">
        <div className="pr-3 text-accent group-focus-within:text-accent-text transition-colors flex items-center gap-1.5">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" aria-hidden />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full py-1 pl-0 pr-14 bg-transparent text-sm sm:text-base text-fg placeholder-slate-400 outline-none font-medium"
        />

        <IconButton
          type="submit"
          variant="primary"
          loading={loading}
          aria-label={submitLabel}
          className="absolute right-2.5 sm:right-3"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" aria-hidden />
        </IconButton>
      </div>
    </form>
  );
}
