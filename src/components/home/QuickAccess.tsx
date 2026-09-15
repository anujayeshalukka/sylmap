"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  GraduationCap,
  GitCompare,
  BookOpen,
  FileText,
  Rocket,
  ChevronRight,
} from "lucide-react";

export default function QuickAccess() {
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);

  const cards = [
    {
      id: "universities",
      title: "Universities",
      desc: "Explore institutions",
      icon: Landmark,
      color: "teal",
      iconBg: "bg-teal-500/20 text-teal-300 border-teal-400/30",
      hoverBorder: "hover:border-teal-400/50",
      href: "#universities",
    },
    {
      id: "programmes",
      title: "Programmes",
      desc: "Browse courses",
      icon: GraduationCap,
      color: "purple",
      iconBg: "bg-purple-500/20 text-purple-300 border-purple-400/30",
      hoverBorder: "hover:border-purple-400/50",
      href: "#programmes",
    },
    {
      id: "compare",
      title: "Compare",
      desc: "Institutions & curricula",
      icon: GitCompare,
      color: "cyan",
      iconBg: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
      hoverBorder: "hover:border-cyan-400/50",
      href: "#compare",
    },
    {
      id: "subjects",
      title: "Subjects",
      desc: "View detailed syllabus",
      icon: BookOpen,
      color: "blue",
      iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      hoverBorder: "hover:border-blue-400/50",
      href: "#subjects",
    },
    {
      id: "resources",
      title: "Resources",
      desc: "Notes & PYQs",
      icon: FileText,
      color: "amber",
      iconBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
      hoverBorder: "hover:border-amber-400/50",
      href: "#resources",
    },
    {
      id: "careers",
      title: "Careers",
      desc: "Explore career paths",
      icon: Rocket,
      color: "emerald",
      iconBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
      hoverBorder: "hover:border-emerald-400/50",
      href: "#careers",
    },
  ];

  return (
    <div className="w-full mt-1 sm:mt-2">
      {/* Subtitle / Description Copy */}
      <p className="text-xs sm:text-sm text-slate-300/85 font-normal leading-relaxed mb-2 sm:mb-2.5 text-center md:text-left">
        Discover universities, explore programmes, compare curricula, access
        resources, and plan your academic future — all in one intelligent
        platform.
      </p>

      {/* Desktop & Tablet Navigation Cards (>= 768px) */}
      <div className="hidden md:grid md:grid-cols-6 gap-2.5 sm:gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              href={card.href}
              className={`group flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl sylmap-glass-card border border-white/10 ${card.hoverBorder} transition-all duration-300`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center border ${card.iconBg} transition-transform duration-300 group-hover:scale-105 flex-shrink-0`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white tracking-wide truncate group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </span>
                  <span className="hidden xl:inline-block text-[10px] text-slate-400 truncate font-normal leading-tight mt-0.5">
                    {card.desc}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
