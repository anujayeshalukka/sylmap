import {
  BookOpen,
  FileText,
  GitCompare,
  GraduationCap,
  Landmark,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { sectionColors, type SectionColor, type SectionId } from "./sections";

export interface NavItem {
  id: SectionId;
  label: string;
  /** Current target. Homepage anchors until the section pages exist. */
  href: string;
  icon: LucideIcon;
  color: SectionColor;
  /** Short line used on quick-access cards */
  description: string;
  /** Line used on the orbit labels around the Earth (null = not shown on the orbit) */
  orbitDescription: string | null;
}

/** Primary navigation, in display order. Used by the header, drawer, quick access, orbit labels and bottom nav. */
export const primaryNav: NavItem[] = [
  {
    id: "universities",
    label: "Universities",
    href: "#universities",
    icon: Landmark,
    color: sectionColors.universities,
    description: "Explore institutions",
    orbitDescription: "Explore top universities",
  },
  {
    id: "programmes",
    label: "Programmes",
    href: "#programmes",
    icon: GraduationCap,
    color: sectionColors.programmes,
    description: "Browse courses",
    orbitDescription: "Discover programmes",
  },
  {
    id: "compare",
    label: "Compare",
    href: "#compare",
    icon: GitCompare,
    color: sectionColors.compare,
    description: "Compare curricula",
    orbitDescription: null,
  },
  {
    id: "subjects",
    label: "Subjects",
    href: "#subjects",
    icon: BookOpen,
    color: sectionColors.subjects,
    description: "Explore syllabus details",
    orbitDescription: "Detailed syllabus & modules",
  },
  {
    id: "learning-hub",
    label: "Learning Hub",
    href: "#learning-hub",
    icon: FileText,
    color: sectionColors["learning-hub"],
    description: "Study resources & references",
    orbitDescription: "Study resources & references",
  },
  {
    id: "careers",
    label: "Careers",
    href: "#careers",
    icon: Rocket,
    color: sectionColors.careers,
    description: "Explore career paths",
    orbitDescription: "Plan your future",
  },
];

export const navById = Object.fromEntries(primaryNav.map((item) => [item.id, item])) as Record<
  SectionId,
  NavItem
>;

/** Account entry point shown in the header and drawer */
export const accountNav = { loginHref: "/login", profileHref: "/profile" } as const;
