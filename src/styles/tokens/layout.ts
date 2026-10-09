/**
 * Layout and spacing tokens as Tailwind class recipes (4px base scale, Tailwind default breakpoints:
 * sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536).
 */
export const layout = {
  /** 1920px page shell with the homepage gutters */
  shell: "w-full max-w-shell mx-auto px-4 sm:px-8 lg:px-10 xl:px-[7.5vw] 2xl:px-[6vw]",
  /** ~820px reading / search column */
  content: "w-full max-w-content",
  /** 12-column desktop grid, single column below lg */
  grid: "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8",
  /** Space reserved under content on mobile for the floating bottom navigation */
  bottomNavClearance: "pb-24 md:pb-4",
} as const;

export const spacing = {
  /** Panel padding: 16px → 20px */
  panel: "p-4 sm:p-5",
  /** Inner card padding: 12px */
  card: "p-3",
  /** Small inline gap: 8px */
  inline: "gap-2",
  /** Stack inside a panel: 12px */
  stack: "gap-3",
  /** Stack between panel sections: 16px */
  section: "gap-4",
  /** Grid gap for card grids: 10px → 12px */
  cardGrid: "gap-2.5 sm:gap-3",
  /** Layout gap between page regions: 24px → 32px */
  layoutGap: "gap-6 lg:gap-8",
} as const;
