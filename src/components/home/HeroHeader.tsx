"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, X } from "lucide-react";
import MobileNav from "./MobileNav";
import { primaryNav, accountNav } from "@/config/navigation";
import { Divider } from "@/components/ui/Divider";
import { IconButton } from "@/components/ui/IconButton";
import { typography } from "@/styles/tokens";
import { cn } from "@/lib/cn";

interface HeroHeaderProps {
  /** Reserved for focusing the search from the header; not used yet */
  onSearchFocus?: () => void;
  user?: { name: string; avatar?: string } | null;
}

export default function HeroHeader({ user = null }: HeroHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 w-full py-2.5 sm:py-3 lg:py-3.5 flex items-center justify-between border-b border-line/[0.06] bg-transparent">
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
      <nav aria-label="Primary" className={cn("hidden lg:flex items-center gap-7 text-fg-secondary", typography.nav)}>
        {primaryNav.map((link) => (
          <Link key={link.id} href={link.href} className="hover:text-accent-text transition-colors py-1 relative group">
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-secondary transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
          </Link>
        ))}
      </nav>

      {/* Header Actions */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Borderless Account Control (Logged-out & Logged-in) */}
        <Link
          href={user ? accountNav.profileHref : accountNav.loginHref}
          className="inline-flex items-center gap-1.5 text-fg-secondary hover:text-accent-text text-xs sm:text-sm font-medium transition-colors py-1 group"
        >
          {user ? (
            user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={22}
                height={22}
                className="w-5.5 h-5.5 rounded-full object-cover border border-accent/50"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-accent-fill/20 text-accent-text border border-accent/40 flex items-center justify-center text-micro font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )
          ) : (
            <User className="w-4 h-4 text-accent group-hover:text-accent-text transition-colors" />
          )}

          <Divider className="mx-0.5" />

          <span>{user ? user.name : "Login"}</span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <IconButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
          aria-expanded={mobileMenuOpen}
          className="lg:hidden py-2 pl-2 pr-0 text-fg-secondary transition-colors"
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
              aria-hidden
            >
              {/* Top shorter line (right-aligned) */}
              <line x1="10" y1="7" x2="22" y2="7" />
              {/* Bottom longer line (extends left, right-aligned) */}
              <line x1="2" y1="16" x2="22" y2="16" />
            </svg>
          )}
        </IconButton>
      </div>

      {/* Mobile Drawer Overlay */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} links={primaryNav} user={user} />
    </header>
  );
}
