import UniverseBackground from "@/components/home/UniverseBackground";
import HeroSearch, { type SearchSuggestion } from "@/components/home/HeroSearch";
import { Container } from "@/components/ui/Container";
import { typography } from "@/styles/tokens";
import { cn } from "@/lib/cn";
import HomeShell from "./HomeShell";
import SimpleHeader from "./SimpleHeader";

const suggestions: SearchSuggestion[] = [
  { label: "VTU CSE syllabus", query: "VTU CSE syllabus" },
  { label: "AI in Semester 5", query: "AI subjects in Semester 5" },
  { label: "Which universities teach AI?", query: "Which universities teach AI in Semester 5?" },
  { label: "Compare VTU & KTU CSE", query: "Compare VTU and KTU CSE" },
];

/**
 * Experimental simplified homepage: logo + account header, headline, the one unified search and
 * suggested queries. Section destinations live in the left sidebar, which appears on scroll.
 * The globe lives in the preloader. Reuses the original background and search (same intent routing).
 */
export default function SimpleHomePage() {
  return (
    <main className="home-shell bg-canvas text-fg-default relative min-h-screen flex flex-col">
      <UniverseBackground />

      <HomeShell>
        <Container className="relative z-20 flex flex-col min-h-screen pb-2 sm:pb-3 lg:pb-4">
          <SimpleHeader />

          <section className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 py-10 sm:py-14">
            <h1 className={cn(typography.h1, "text-fg text-center max-w-3xl")}>
              Navigate the Academic{" "}
              <span className="bg-gradient-to-r from-[#4CA3FF] via-glow to-[#38EF7D] bg-clip-text text-transparent">
                Universe
              </span>
            </h1>

            {/* ~12% wider than the shared 820px content column; lifts HeroSearch's own max-width for this page only */}
            <div className="w-full max-w-[920px] [&>div]:max-w-none">
              <HeroSearch suggestions={suggestions} centerSuggestions />
            </div>
          </section>

          {/* Mobile: keep content clear of the floating bottom navigation */}
          <div className="h-20 md:hidden" aria-hidden />
        </Container>
      </HomeShell>
    </main>
  );
}
