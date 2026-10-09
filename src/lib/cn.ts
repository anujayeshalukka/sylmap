import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge taught the Sylmap theme names from src/styles/tokens.css, so they merge correctly. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["micro", "2xs"],
      radius: ["panel", "card", "control", "tag", "dock"],
      shadow: [
        "panel",
        "panel-glow",
        "dock",
        "card",
        "card-hover",
        "glow-sm",
        "glow-badge",
        "glow-md",
        "glow-active",
        "glow-focus",
        "glow-hover",
        "glow-button",
      ],
      "drop-shadow": ["glow-earth", "glow-icon"],
      blur: ["panel", "overlay"],
      container: ["shell", "content"],
      ease: ["standard", "emphasized"],
      animate: ["nav-label-in", "subtle-float"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
