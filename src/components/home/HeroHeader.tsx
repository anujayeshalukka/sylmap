"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Menu, X } from "lucide-react";
import MobileNav from "./MobileNav";

interface HeroHeaderProps {
  onSearchFocus?: () => void;
  user?: { name: string; avatar?: string } | null;
}

export default function HeroHeader({ onSearchFocus, user = null }: HeroHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Universities", href: "#universities" },
    { label: "Programmes", href: "#programmes" },
    { label: "Compare", href: "#compare" },
    { label: "Subjects", href: "#subjects" },
    { label: "Learning Hub", href: "#learning-hub" },
    { label: "Careers", href: "#careers" },
  ];

  return (
    <header className="relative z-30 w-full py-2.5 sm:py-3 lg:py-3.5 flex items-center justify-between border-b border-white/[0.06] bg-transparent">
      {/* Brand Logo */}
      <div className="flex items-center">
        <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-90 leading-none">
          <Image
            src="/sylmap.webp"
            alt="Sylmap"
            width={320}
            height={96}
            priority
            className="h-10 sm:h-[46px] lg:h-[56px] xl:h-[64px] 2xl:h-[72px] w-auto object-contain transition-all block"
          />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="hover:text-cyan-300 transition-colors py-1 relative group"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>

      {/* Header Actions */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Borderless Account Control (Logged-out & Logged-in) */}
        <Link
          href={user ? "/profile" : "/login"}
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 text-xs sm:text-sm font-medium transition-colors py-1 group"
        >
          {user ? (
            user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={22}
                height={22}
                className="w-5.5 h-5.5 rounded-full object-cover border border-cyan-400/50"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center text-[10px] font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )
          ) : (
            <User className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          )}

          {/* Thin vertical divider */}
          <span className="w-px h-3.5 bg-white/20 mx-0.5" />

          <span>{user ? user.name : "Login"}</span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
          className="lg:hidden py-2 pl-2 pr-0 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 stroke-[2]" />
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              {/* Top shorter line (right-aligned) */}
              <line x1="10" y1="7" x2="22" y2="7" />
              {/* Bottom longer line (extends left, right-aligned) */}
              <line x1="2" y1="16" x2="22" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
