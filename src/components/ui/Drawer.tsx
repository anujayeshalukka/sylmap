"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useOverlay } from "./useOverlay";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the drawer */
  label: string;
  children: ReactNode;
  className?: string;
}

/** Full-screen blurred overlay drawer — the mobile navigation drawer. */
export function Drawer({ open, onClose, label, children, className }: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOverlay(open, ref, onClose);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-canvas/95 backdrop-blur-overlay p-6 transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
