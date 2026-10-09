"use client";

import { useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { typography } from "@/styles/tokens";
import { IconButton } from "./IconButton";
import { Panel } from "./Panel";
import { useOverlay } from "./useOverlay";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Centred dialog on a blurred canvas scrim, built on the primary Panel. */
export function Modal({ open, onClose, title, description, children, footer, className }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  useOverlay(open, ref, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-canvas/80 backdrop-blur-panel" onClick={onClose} aria-hidden />
      <Panel
        ref={ref}
        variant="primary"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={cn("relative max-w-lg flex flex-col gap-4", className)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className={cn(typography.h3, "text-fg")}>
              {title}
            </h2>
            {description && (
              <p id={descId} className={cn(typography.bodySecondary, "text-fg-secondary")}>
                {description}
              </p>
            )}
          </div>
          <IconButton aria-label="Close dialog" onClick={onClose} className="-mt-1 -mr-1">
            <X className="w-5 h-5 stroke-[2]" aria-hidden />
          </IconButton>
        </div>
        {children}
        {footer && <div className="flex items-center justify-end gap-2 pt-1">{footer}</div>}
      </Panel>
    </div>
  );
}
