"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Sparkles, User } from "lucide-react";
import { accountNav } from "@/config/navigation";
import { Drawer } from "@/components/ui/Drawer";
import { IconButton } from "@/components/ui/IconButton";
import { Divider } from "@/components/ui/Divider";
import { typography } from "@/styles/tokens";
import { cn } from "@/lib/cn";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
  user?: { name: string; avatar?: string } | null;
}

export default function MobileNav({ isOpen, onClose, links, user = null }: MobileNavProps) {
  return (
    <Drawer open={isOpen} onClose={onClose} label="Main menu" className="lg:hidden">
      {/* Drawer Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-line/10">
        <div className="flex items-center">
          <Image src="/sylmap.webp" alt="Sylmap" width={240} height={72} className="h-9 sm:h-11 w-auto object-contain" />
        </div>
        <IconButton onClick={onClose} aria-label="Close menu">
          <X className="w-6 h-6 stroke-[2]" />
        </IconButton>
      </div>

      {/* Main Navigation Links */}
      <nav aria-label="Primary" className="flex-1 my-8 flex flex-col gap-5">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            className={cn(
              typography.navDrawer,
              "text-fg-body hover:text-accent-text transition-colors flex items-center justify-between py-2 border-b border-line/5",
            )}
          >
            <span>{link.label}</span>
            <span className="text-xs text-fg-faint font-mono">→</span>
          </Link>
        ))}
      </nav>

      {/* Secondary Actions & Tag */}
      <div className="flex flex-col gap-3 pt-6 border-t border-line/10">
        <div className="flex items-center gap-2 text-xs text-accent/90 font-medium mb-1">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Academic Discovery</span>
        </div>

        <Link
          href={user ? accountNav.profileHref : accountNav.loginHref}
          onClick={onClose}
          className="w-full py-2.5 rounded-card font-medium text-sm text-fg-body hover:text-accent-text flex items-center justify-center gap-2 transition-colors border-t border-line/10 pt-4"
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
            <User className="w-4 h-4 text-accent" />
          )}

          <Divider className="mx-0.5" />

          <span>{user ? user.name : "Login"}</span>
        </Link>
      </div>
    </Drawer>
  );
}
