import type { ReactNode } from "react";
import { AlertCircle, AlertTriangle, RefreshCw, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Panel } from "./Panel";
import { Button } from "./Button";

export interface LoadingStateProps {
  message: ReactNode;
  className?: string;
}

/** Ping ring + spinner with a status line. */
export function LoadingState({ message, className }: LoadingStateProps) {
  return (
    <Panel
      variant="loading"
      padded={false}
      role="status"
      aria-live="polite"
      className={cn("p-6 flex flex-col items-center justify-center gap-3", className)}
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" />
        <RefreshCw className="w-6 h-6 text-accent animate-spin" aria-hidden />
      </div>
      <p className="text-xs sm:text-sm font-semibold text-accent-text tracking-wide text-center">{message}</p>
    </Panel>
  );
}

interface MessageStateProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  icon?: LucideIcon;
  className?: string;
}

const tones = {
  warning: { panel: "warning", icon: "bg-warning-fill/10 border-warning/30 text-warning" },
  danger: { panel: "danger", icon: "bg-danger-fill/10 border-danger/30 text-danger" },
} as const;

function MessageState({
  tone,
  title,
  description,
  actions,
  icon: Icon,
  className,
}: MessageStateProps & { tone: keyof typeof tones; icon: LucideIcon }) {
  return (
    <Panel
      variant={tones[tone].panel}
      padded={false}
      role={tone === "danger" ? "alert" : undefined}
      className={cn("p-5 flex flex-col items-center justify-center gap-3 text-center", className)}
    >
      <div className={cn("w-10 h-10 rounded-full border flex items-center justify-center", tones[tone].icon)}>
        <Icon className="w-5 h-5 stroke-[2]" aria-hidden />
      </div>
      <div className="flex flex-col items-center max-w-md">
        <h4 className="text-sm font-bold text-fg">{title}</h4>
        {description && <p className="text-xs text-fg-muted mt-1 leading-relaxed">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap justify-center mt-1">{actions}</div>}
    </Panel>
  );
}

/** No data / information unavailable (amber). */
export function EmptyState({ icon = AlertCircle, ...props }: MessageStateProps) {
  return <MessageState tone="warning" icon={icon} {...props} />;
}

export interface ErrorStateProps extends MessageStateProps {
  onRetry?: () => void;
  retryLabel?: string;
}

/** Something failed (red). V1 addition built on the EmptyState layout. */
export function ErrorState({ icon = AlertTriangle, onRetry, retryLabel = "Try again", actions, ...props }: ErrorStateProps) {
  return (
    <MessageState
      tone="danger"
      icon={icon}
      actions={
        actions ??
        (onRetry && (
          <Button variant="danger" onClick={onRetry}>
            {retryLabel}
          </Button>
        ))
      }
      {...props}
    />
  );
}
