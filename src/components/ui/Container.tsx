import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { layout } from "@/styles/tokens";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** shell = 1920px page shell with gutters · content = ~820px column */
  size?: "shell" | "content";
  as?: ElementType;
}

/** Standard width container. Pages use this instead of defining their own widths. */
export function Container({ size = "shell", as: Tag = "div", className, ...props }: ContainerProps) {
  return <Tag className={cn(size === "shell" ? layout.shell : layout.content, className)} {...props} />;
}
