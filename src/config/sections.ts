/**
 * The six academic sections and their colour coding. Single source of truth: components read
 * these class strings instead of hard-coding hues. Class strings are written out in full so
 * Tailwind can detect them.
 */
export type SectionId =
  | "universities"
  | "programmes"
  | "compare"
  | "subjects"
  | "learning-hub"
  | "careers";

export interface SectionColor {
  /** Tailwind hue name */
  hue: "teal" | "purple" | "cyan" | "blue" | "amber" | "emerald";
  /** Icon tile / badge recipe: hue-500/20 fill, hue-300 text, hue-400/30 border */
  tile: string;
  fill: string;
  text: string;
  border: string;
  hoverBorder: string;
  /** Orbit node colour on the homepage SVG (null = no node). Kept as implemented. */
  node: string | null;
  /** SVG fill in the section hue (hue-400), e.g. preloader satellites */
  svgFill: string;
}

export const sectionColors: Record<SectionId, SectionColor> = {
  universities: {
    hue: "teal",
    tile: "bg-teal-500/20 text-teal-300 border-teal-400/30",
    fill: "bg-teal-500/20",
    text: "text-teal-300",
    border: "border-teal-400/30",
    hoverBorder: "hover:border-teal-400/50",
    svgFill: "fill-teal-400",
    node: "#00F2FE",
  },
  programmes: {
    hue: "purple",
    tile: "bg-purple-500/20 text-purple-300 border-purple-400/30",
    fill: "bg-purple-500/20",
    text: "text-purple-300",
    border: "border-purple-400/30",
    hoverBorder: "hover:border-purple-400/50",
    svgFill: "fill-purple-400",
    node: "#A855F7",
  },
  compare: {
    hue: "cyan",
    tile: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    fill: "bg-cyan-500/20",
    text: "text-cyan-300",
    border: "border-cyan-400/30",
    hoverBorder: "hover:border-cyan-400/50",
    svgFill: "fill-cyan-400",
    node: null,
  },
  subjects: {
    hue: "blue",
    tile: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    fill: "bg-blue-500/20",
    text: "text-blue-300",
    border: "border-blue-400/30",
    hoverBorder: "hover:border-blue-400/50",
    svgFill: "fill-blue-400",
    node: "#3B82F6",
  },
  "learning-hub": {
    hue: "amber",
    tile: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    fill: "bg-amber-500/20",
    text: "text-amber-300",
    border: "border-amber-400/30",
    hoverBorder: "hover:border-amber-400/50",
    svgFill: "fill-amber-400",
    node: "#EAB308",
  },
  careers: {
    hue: "emerald",
    tile: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    fill: "bg-emerald-500/20",
    text: "text-emerald-300",
    border: "border-emerald-400/30",
    hoverBorder: "hover:border-emerald-400/50",
    svgFill: "fill-emerald-400",
    node: "#10B981",
  },
};
