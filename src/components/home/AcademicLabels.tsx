"use client";

import { primaryNav } from "@/config/navigation";
import type { SectionId } from "@/config/sections";
import { cn } from "@/lib/cn";

/** Placement of each orbit label around the Earth (homepage-specific composition). */
const positions: Partial<Record<SectionId, string>> = {
  universities: "top-[4%] left-[-4%] xl:left-[-8%]", // Upper Left
  programmes: "top-[5%] right-[-2%] xl:right-[-6%]", // Upper Right
  subjects: "top-[48%] right-[-6%] xl:right-[-10%]", // Right Side
  "learning-hub": "bottom-[4%] left-[-2%] xl:left-[-6%]", // Lower Left
  careers: "bottom-[5%] right-[-2%] xl:right-[-4%]", // Lower Right
};

const destinations = primaryNav.filter((item) => item.orbitDescription && positions[item.id]);

export default function AcademicLabels() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block">
      <div className="relative w-full h-full">
        {destinations.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={cn(
                "absolute flex items-center gap-3 pointer-events-auto transition-transform duration-300 hover:scale-105 group cursor-pointer",
                positions[item.id],
              )}
            >
              {/* Circular Glowing Icon Badge */}
              <div
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center border backdrop-blur-md shadow-lg transition-all duration-300 group-hover:shadow-glow-hover",
                  item.color.tile,
                )}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>

              {/* Title & Description Label */}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-fg tracking-wide group-hover:text-accent-text transition-colors">
                  {item.label}
                </span>
                <span className="text-2xs text-fg-secondary font-medium">{item.orbitDescription}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
