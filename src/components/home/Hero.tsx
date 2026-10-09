"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { typography } from "@/styles/tokens";
import { cn } from "@/lib/cn";

export default function Hero() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0">
      {/* Top Badge Tag */}
      <Badge
        variant="brand"
        size="lg"
        className="mb-3 sm:mb-4"
        icon={<Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" aria-hidden />}
      >
        <span>India&apos;s AI-Powered Academic Intelligence Platform</span>
      </Badge>

      {/* Main Headline */}
      <h1 className={cn(typography.h1, "text-fg font-sans")}>
        Navigate the <br className="hidden sm:inline" />
        Academic{" "}
        <span className="bg-gradient-to-r from-[#4CA3FF] via-glow to-[#38EF7D] bg-clip-text text-transparent">
          Universe
        </span>
      </h1>
    </div>
  );
}
