"use client";

import Link from "next/link";
import Image from "next/image";
import { PanelLeftOpen, User } from "lucide-react";
import { accountNav } from "@/config/navigation";
import { Divider } from "@/components/ui/Divider";
import { IconButton } from "@/components/ui/IconButton";
import { useSidebar } from "./HomeShell";

/**
 * Experimental homepage header: logo left, account control right. Section links live in the
 * sidebar. The logo is ~11% smaller than the original header's.
 * On mobile, a menu button opens the sidebar drawer.
 */
export default function SimpleHeader() {
  const { isMobileDrawerOpen, openMobileDrawer } = useSidebar();

  return (
    <header className="relative z-30 w-full py-2.5 sm:py-3 lg:py-3.5 flex items-center justify-between border-b border-line/[0.06]">
      <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-90 leading-none">
        <Image
          src="/sylmap.webp"
          alt="Sylmap"
          width={320}
          height={96}
          priority
          className="h-9 sm:h-[41px] lg:h-[50px] xl:h-[57px] 2xl:h-[64px] w-auto object-contain block"
        />
      </Link>

      <div className="flex items-center gap-2.5 sm:gap-4">
        <Link
          href={accountNav.loginHref}
          className="inline-flex items-center gap-1.5 text-fg-secondary hover:text-accent-text text-xs sm:text-sm font-medium transition-colors py-1 group"
        >
          <User className="w-4 h-4 text-accent group-hover:text-accent-text transition-colors" aria-hidden />
          <Divider className="mx-0.5" />
          <span>Login</span>
        </Link>

        <IconButton
          aria-label="Open menu"
          aria-expanded={isMobileDrawerOpen}
          onClick={openMobileDrawer}
          className="md:hidden -mr-2 text-fg-secondary"
        >
          <PanelLeftOpen className="w-6 h-6 stroke-[2]" aria-hidden />
        </IconButton>
      </div>
    </header>
  );
}
