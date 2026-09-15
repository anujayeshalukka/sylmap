"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Landmark,
  GraduationCap,
  GitCompare,
  BookOpen,
  FileText,
  Rocket,
} from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navItems = [
    {
      id: "universities",
      title: "Universities",
      icon: Landmark,
      href: "#universities",
    },
    {
      id: "programmes",
      title: "Programmes",
      icon: GraduationCap,
      href: "#programmes",
    },
    {
      id: "compare",
      title: "Compare",
      icon: GitCompare,
      href: "#compare",
    },
    {
      id: "subjects",
      title: "Subjects",
      icon: BookOpen,
      href: "#subjects",
    },
    {
      id: "resources",
      title: "Resources",
      icon: FileText,
      href: "#resources",
    },
    {
      id: "careers",
      title: "Careers",
      icon: Rocket,
      href: "#careers",
    },
  ];

  return (
    <nav className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3.5 right-3.5 sm:left-4 sm:right-4 z-50 md:hidden bg-[#071a42]/92 backdrop-blur-2xl border border-white/10 rounded-[24px] px-2 py-1.5 h-[62px] shadow-[0_8px_32px_rgba(0,0,0,0.65)] flex items-center justify-around max-w-md mx-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          activeHash === item.href ||
          (activeHash === "" && item.id === "universities");

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActiveHash(item.href)}
            title={item.title}
            aria-label={item.title}
            className={`relative flex flex-col items-center justify-center flex-1 h-full rounded-2xl transition-all duration-200 group px-1 ${
              isActive
                ? "text-cyan-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {/* Active background pill highlight */}
            {isActive && (
              <span className="absolute inset-0 bg-cyan-500/15 border border-teal-400/40 rounded-2xl shadow-[0_0_12px_rgba(0,242,254,0.25)] transition-all duration-200" />
            )}

            {/* Icon */}
            <div className={`relative z-10 flex items-center justify-center transition-transform duration-200 ${isActive ? "-translate-y-0.5" : ""}`}>
              <Icon className={`w-5 h-5 stroke-[2] transition-all duration-200 ${isActive ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" : "text-slate-400 group-hover:text-slate-200"}`} />
            </div>

            {/* Active text label (ONLY for active item) */}
            {isActive && (
              <span className="relative z-10 text-[10px] font-semibold text-cyan-300 tracking-tight leading-none mt-0.5 whitespace-nowrap animate-nav-label-in">
                {item.title}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

