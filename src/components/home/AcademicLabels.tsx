"use client";

import { Landmark, GraduationCap, BookOpen, FileText, Rocket } from "lucide-react";

export default function AcademicLabels() {
  const destinations = [
    {
      id: "universities",
      title: "Universities",
      desc: "Explore top universities",
      icon: Landmark,
      color: "teal",
      iconBg: "bg-teal-500/20 text-teal-300 border-teal-400/30",
      position: "top-[4%] left-[-4%] xl:left-[-8%]", // Upper Left
    },
    {
      id: "programmes",
      title: "Programmes",
      desc: "Discover programmes",
      icon: GraduationCap,
      color: "purple",
      iconBg: "bg-purple-500/20 text-purple-300 border-purple-400/30",
      position: "top-[5%] right-[-2%] xl:right-[-6%]", // Upper Right
    },
    {
      id: "subjects",
      title: "Subjects",
      desc: "Detailed syllabus & modules",
      icon: BookOpen,
      color: "blue",
      iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      position: "top-[48%] right-[-6%] xl:right-[-10%]", // Right Side
    },
    {
      id: "learning-hub",
      title: "Learning Hub",
      desc: "Study resources & references",
      icon: FileText,
      color: "amber",
      iconBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
      position: "bottom-[4%] left-[-2%] xl:left-[-6%]", // Lower Left
    },
    {
      id: "careers",
      title: "Careers",
      desc: "Plan your future",
      icon: Rocket,
      color: "emerald",
      iconBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
      position: "bottom-[5%] right-[-2%] xl:right-[-4%]", // Lower Right
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block">
      <div className="relative w-full h-full">
        {destinations.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`absolute ${item.position} flex items-center gap-3 pointer-events-auto transition-transform duration-300 hover:scale-105 group cursor-pointer`}
            >
              {/* Circular Glowing Icon Badge */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center border backdrop-blur-md shadow-lg ${item.iconBg} transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.3)]`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>

              {/* Title & Description Label */}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-300 font-medium">
                  {item.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
