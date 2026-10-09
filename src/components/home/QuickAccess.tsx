"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export default function QuickAccess() {
  return (
    <div className="w-full mt-1 sm:mt-2">
      {/* Subtitle / Description Copy */}
      <p className="text-xs sm:text-sm text-fg-secondary font-normal leading-relaxed mb-2 sm:mb-2.5 text-center md:text-left">
        Discover universities, explore programmes, compare curricula, access Learning Hub
        resources, and plan your academic future — all in one intelligent
        platform.
      </p>

      {/* Desktop & Tablet Navigation Cards (>= 768px) */}
      <div className="hidden md:grid md:grid-cols-6 gap-2.5 sm:gap-3">
        {primaryNav.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              as={Link}
              href={card.href}
              variant="glass"
              interactive
              padded={false}
              className={cn(
                "group flex items-center justify-between p-2.5 sm:p-3 rounded-card sm:rounded-panel",
                card.color.hoverBorder,
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-card flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 flex-shrink-0",
                    card.color.tile,
                  )}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-fg tracking-wide truncate group-hover:text-accent-text transition-colors">
                    {card.label}
                  </span>
                  <span className="hidden xl:inline-block text-micro text-fg-secondary truncate font-normal leading-tight mt-0.5">
                    {card.description}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-fg-faint group-hover:text-accent-text group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
