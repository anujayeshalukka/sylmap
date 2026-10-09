"use client";

import { Landmark, GraduationCap, BookOpen, Compass } from "lucide-react";

export default function AcademicOrbitPills() {
  const pills = [
    {
      label: "Universities",
      icon: Landmark,
      iconBg: "bg-teal-500/20 text-teal-300 border-teal-400/30",
      position: "top-[6%] left-[2%] lg:left-[-2%]",
    },
    {
      label: "Curricula",
      icon: GraduationCap,
      iconBg: "bg-purple-500/20 text-purple-300 border-purple-400/30",
      position: "top-[8%] right-[2%] lg:right-[-2%]",
    },
    {
      label: "Learning Resources",
      icon: BookOpen,
      iconBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
      position: "bottom-[8%] left-[4%] lg:left-[0%]",
    },
    {
      label: "Academic Pathways",
      icon: Compass,
      iconBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
      position: "bottom-[6%] right-[4%] lg:right-[0%]",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 hidden md:block select-none">
      <div className="relative w-full h-full">
        {pills.map((pill, idx) => {
          const Icon = pill.icon;
          return (
            <div
              key={idx}
              className={`absolute ${pill.position} flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-lg pointer-events-auto transition-all duration-300 hover:scale-105 hover:border-cyan-400/40`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border ${pill.iconBg}`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <span className="text-xs font-medium text-slate-200 tracking-wide">
                {pill.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
