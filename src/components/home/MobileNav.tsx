"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Sparkles, User } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
  user?: { name: string; avatar?: string } | null;
}

export default function MobileNav({ isOpen, onClose, links, user = null }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-950/95 backdrop-blur-2xl p-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      {/* Drawer Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center">
          <Image
            src="/sylmap.webp"
            alt="Sylmap"
            width={240}
            height={72}
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </div>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-6 h-6 stroke-[2]" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 my-8 flex flex-col gap-5">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="text-lg font-semibold text-slate-200 hover:text-cyan-300 transition-colors flex items-center justify-between py-2 border-b border-white/5"
          >
            <span>{link.label}</span>
            <span className="text-xs text-slate-500 font-mono">→</span>
          </Link>
        ))}
      </div>

      {/* Secondary Actions & Tag */}
      <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-cyan-400/90 font-medium mb-1">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Academic Discovery</span>
        </div>

        <Link
          href={user ? "/profile" : "/login"}
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-medium text-sm text-slate-200 hover:text-cyan-300 flex items-center justify-center gap-2 transition-colors border-t border-white/10 pt-4"
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
            <User className="w-4 h-4 text-cyan-400" />
          )}

          <span className="w-px h-3.5 bg-white/20 mx-0.5" />

          <span>{user ? user.name : "Login"}</span>
        </Link>
      </div>
    </div>
  );
}
