# Sylmap Design System V1

The homepage is the visual source of truth. V1 formalises what it already does into tokens, primitives and Sylmap components. It does not change the look.

| Layer | Where |
| --- | --- |
| Tokens (CSS → Tailwind utilities) | `src/styles/tokens.css` |
| Tokens (TS class recipes, raw colours) | `src/styles/tokens/` (`typography`, `layout`, `spacing`, `motion`, `brandColors`) |
| Global CSS, glass classes, focus and reduced-motion rules | `src/app/globals.css` |
| Section colours | `src/config/sections.ts` |
| Navigation | `src/config/navigation.ts` |
| UI primitives | `src/components/ui/` (import from `@/components/ui`) |
| Sylmap components | `src/components/sylmap/` (import from `@/components/sylmap`) |
| Class merging | `cn()` in `src/lib/cn.ts` (clsx + tailwind-merge, configured for the Sylmap theme names) |

---

## 1. Brand direction

Academic Intelligence × Cosmic Navigation. The page is dark and single-theme: a slate-950 canvas, navy glass panels, and cyan/teal as the only UI accent family. Cosmic imagery (video, Earth, orbits) stays in the background and hero. Glow is used selectively to mark the primary action, focus, the active state, and the brand badge.

## 2. Color tokens

Utilities come from `tokens.css`, e.g. `bg-surface-panel/95`, `text-fg-secondary`, `border-line/10`.

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | slate-950 | Page background, sunken fills |
| `surface-panel` | #071A42 | Search panel, bottom nav (at 92–95%) |
| `surface-result` | #040B19 | Result and answer panels (90–95%) |
| `surface-clarify` | #05152A | Clarification panel |
| `surface-empty` | #0B1220 | No-data and error panels |
| `surface-inner` | slate-900 | Chips, selects, inner cards (80–90%) |
| `surface-hover` | slate-800 | Hover fill for inner surfaces |
| `glow` | #00F2FE | All glows, headline gradient, orbit |
| `accent` | cyan-400 | Icons, focus borders, focus ring |
| `accent-text` | cyan-300 | Accent text and every hover text |
| `accent-fill` | cyan-500 | Tinted fills (10–30%), panel borders (30–40%) |
| `accent-soft` | cyan-200 | Text selection |
| `secondary` / `secondary-fill` | teal-400 / teal-500 | Paired accent, answer border, select border |
| `fg` | white | Headings, titles, input text |
| `fg-default` | slate-100 | Default body colour |
| `fg-body` | slate-200 | Long text, chip text |
| `fg-secondary` | slate-300 | Nav, descriptions |
| `fg-muted` | slate-400 | Placeholders, subtitles, inactive icons |
| `fg-faint` | slate-500 | Chevrons, arrows |
| `line` | white | Borders, always with opacity: `/[0.06]` hairline, `/10` default, `/15–/20` strong, `/25` divider |
| `success` (+`-fill`, `-text`, `-soft`) | teal-400 / 500 / 300 / 200 | Verified data, citations |
| `warning` / `warning-fill` | amber-400 / amber-500 | Information unavailable |
| `danger` (+`-fill`, `-text`) | red-400 / 500 / 300 | Errors. **The only V1 addition**: the homepage had no error colour. |

Gradients: the headline word uses `#4CA3FF → #00F2FE → #38EF7D`. Primary actions use `teal-400 → cyan-400`. The nav underline uses `accent → secondary`. Raw hexes for SVG live in `brandColors`.

## 3. Typography

Font: the `font-sans` system stack, which is what the homepage actually renders. Inter is loaded in `layout.tsx` but not wired up; V1 keeps that unchanged. Weights: 400 / 500 / 600 / 700. Recipes are in `typography`. Pair each with a colour token.

| Token | Classes |
| --- | --- |
| `h1` | 30 → 48 → 60px, bold, tight, leading 1.1 |
| `h2` | 24 → 30px, bold, tight. *Extrapolated: the homepage has no H2.* |
| `h3` (panel title) | 14 → 16px, bold, tight |
| `h4` (card title) | 14px bold |
| `h5` (item title) | 12px bold |
| `body` | 12 → 14px, regular, relaxed |
| `bodySecondary` | 12px relaxed |
| `small` | 11px (`text-2xs`), snug |
| `label` / `labelLg` | 12 / 14px bold, wide |
| `micro` | 10px (`text-micro`) |
| `overline` | 10px uppercase bold wider (type tags) |
| `nav` / `navDrawer` | 14px medium / 18px semibold |
| `button`, `badge` / `badgeSm` | 12px semibold / 11px semibold |
| `code` | mono 10px semibold |

## 4. Spacing

Tailwind's 4px scale; half steps (10px, 14px) are allowed. Recipes are in `spacing`:

| Token | Value |
| --- | --- |
| `panel` | `p-4 sm:p-5` (16 → 20px) |
| `card` | `p-3` (12px) |
| `inline` | `gap-2` (8px) |
| `stack` | `gap-3` (12px) |
| `section` | `gap-4` (16px) |
| `cardGrid` | `gap-2.5 sm:gap-3` |
| `layoutGap` | `gap-6 lg:gap-8` |

## 5. Layout

- **Shell:** `<Container>` (or `layout.shell`): `max-w-shell` (1920px), gutters 16 / 32 / 40px, then 7.5vw / 6vw.
- **Content column:** `<Container size="content">` (or `max-w-content`): 820px.
- **Grid:** `layout.grid`: 1 column, then 12 columns at `lg`, with 24 → 32px gaps. The homepage hero uses a 7/5 split.
- **Breakpoints:** Tailwind defaults: sm 640, md 768, lg 1024, xl 1280, 2xl 1536. Desktop nav, the Earth visual and parallax start at `lg`. The bottom nav shows below `md`.
- **Mobile clearance:** add `layout.bottomNavClearance` (`pb-24 md:pb-4`) under the last content block on every page.
- Below `lg`, content is centred. At `lg` and up, it is left-aligned.

## 6. Radius

| Token | Value | Use |
| --- | --- | --- |
| `rounded-panel` | 16px | Panels, result cards, glass cards (sm+), bottom-nav pills |
| `rounded-card` | 12px | Inner cards, inputs, secondary buttons, icon tiles |
| `rounded-control` | 8px | Selects, small badges, ghost buttons, source chips |
| `rounded-tag` | 6px | Uppercase type tags, version badges |
| `rounded-full` | — | Pills, chips, circles, primary icon button |
| `rounded-dock` | 24px | Mobile bottom navigation |

## 7. Shadows, glow and glass

| Token | Value | Use |
| --- | --- | --- |
| `shadow-panel` | 0 8px 32px rgba(0,0,0,.5) | Result panels |
| `shadow-panel-glow` | panel + 0 0 24px cyan .12 | Primary search panel only |
| `shadow-dock` | 0 8px 32px rgba(0,0,0,.65) | Bottom nav |
| `shadow-card` / `shadow-card-hover` | 0 4px 20px black .3 / 0 8px 28px cyan .15 | Glass card |
| `shadow-glow-sm` | 0 0 12px cyan .15 | Select, secondary button |
| `shadow-glow-badge` | 0 0 15px cyan .15 | Hero brand badge |
| `shadow-glow-md` | 0 0 12px cyan .2 | "Ask Sylmap" label |
| `shadow-glow-active` | 0 0 12px cyan .25 | Selected tab, active nav |
| `shadow-glow-focus` | 0 0 20px cyan .2 | Focused input |
| `shadow-glow-hover` | 0 0 20px cyan .3 | Orbit label hover |
| `shadow-glow-button` | 0 0 18px cyan .45 | Primary action |
| `drop-shadow-glow-earth` / `-icon` | 35px .25 / 8px .6 | Earth image, active nav icon |
| `backdrop-blur-panel` / `-overlay` | 12px / 40px | Panels / drawer, bottom nav |

Glass: `.sylmap-glass-card` (in `globals.css`) is deliberately **unlayered**, so it overrides utilities on the same element. Its hover border is therefore always cyan, which is how the homepage renders today.

## 8. Motion

- **Durations:** 150ms (default `transition-*`), 200ms (chips, cards, nav), 250ms (glass card), 300ms (inputs, underline, nav cards). CSS variables: `--duration-*`.
- **Easing:** `ease-standard` cubic-bezier(.4,0,.2,1); `ease-emphasized` cubic-bezier(.16,1,.3,1).
- **Interactions:** card lift −2px; hover scale 105% on the primary icon button, icon tiles and orbit labels; buttons and chips press to 98%; chevrons nudge 2px.
- **Animations:** `animate-nav-label-in` (180ms) and `animate-subtle-float` (6s). Tailwind's `pulse`, `spin` and `ping` are used for live, loading and loading-ring states.
- **Parallax:** desktop with a fine pointer only. Spring 90 / 20 / 0.4. Depth: header 3.5, hero 7, Earth 10, quick access 5px.
- **Reduced motion:** parallax turns off; pulse, ping and float stop; transitions become instant; the glass card no longer lifts. The loading spinner keeps turning.

## 9. Icons

`lucide-react` outline icons, stroke 2 (2.5 on the submit arrow), coloured with `currentColor`. Sizes: 12 / 14 / 16 / 20 / 24px. Section icons are fixed in `navigation.ts`: Landmark, GraduationCap, GitCompare, BookOpen, FileText and Rocket. Sparkles always means AI / Ask Sylmap. Decorative icons get `aria-hidden`.

## 10. Core components

**Primitives** (`@/components/ui`):

| Component | Variants / props |
| --- | --- |
| `Button` | `primary` · `secondary` · `neutral` · `ghost` · `danger`; `sm` / `md`; `loading`, `leadingIcon` |
| `IconButton` | `primary` (round gradient) · `ghost`; requires `aria-label`; `loading` |
| `Input` | `invalid`, `leadingIcon` |
| `SearchInput` | The single Sylmap search field (icon, input, gradient submit) |
| `Select` | Compact context selector; `leadingIcon` |
| `Panel` | `primary` · `result` · `answer` · `clarify` · `warning` · `danger` · `loading` |
| `Card` / `GlassCard` | `default` · `result` · `glass`; `interactive`, `selected` |
| `Badge` | `default` · `brand` · `ai` · `verified` · `warning` · `danger` · `section`; `sm` / `md` / `lg` |
| `StatusBadge` | Live dot + label + optional dismiss |
| `Tag` | Uppercase type label; optional `section` colour |
| `Chip` | `default` · `muted`; `selected` (toggle) |
| `Divider` | Vertical / horizontal; `strong` |
| `Tabs` | Segmented, keyboard-navigable; `tabPanelProps()` |
| `Tooltip` | Hover and focus; top / bottom |
| `Modal` | Primary panel dialog; focus trap, Escape, focus restore |
| `Drawer` | Full-screen blurred overlay (the mobile menu) |
| `LoadingState` · `EmptyState` · `ErrorState` | Result-state panels |
| `Container` | `shell` · `content` |

**Sylmap components** (`@/components/sylmap`): `SearchResultCard`, `AIAnswerCard`, `SourceChip`, `VerificationBadge`, `CurriculumVersionBadge` and `AcademicSectionBadge`. Entity cards are all built on `EntityCard`: `UniversityCard`, `ProgrammeCard`, `SemesterCard`, `SubjectCard`, `ModuleCard`, `CurriculumCard`, `ResourceCard`, `ProjectCard` and `CareerCard`. Also `CurriculumTimeline` and `CompareTable`. The entity cards set the visual pattern only; their props are display fields, not a data model.

**Search and AI:** there is one search input (`SearchInput`, placeholder "Search or ask anything about academic curricula…"). The app routes each query; the result renders as search results, `AIAnswerCard` (Ask Sylmap / comparison), clarification or `EmptyState`. "Ask Sylmap" is a **result type**, never a separate search box or mode.

## 11. Academic section colours

Defined once in `src/config/sections.ts`. Each section has `tile` (hue-500/20 fill, hue-300 text, hue-400/30 border), `fill`, `text`, `border`, `hoverBorder` and `node`.

| Section | Hue | Orbit node |
| --- | --- | --- |
| Universities | teal | #00F2FE (cyan, as implemented) |
| Programmes | purple | #A855F7 |
| Compare | cyan | — |
| Subjects | blue | #3B82F6 |
| Learning Hub | amber | #EAB308 (yellow, as implemented) |
| Careers | emerald | #10B981 |

Navigation (`primaryNav`) carries the label, href, icon, colour, card description and orbit description. The header, drawer, quick access, orbit labels and bottom nav all read from it.

## 12. Accessibility states

| State | Treatment |
| --- | --- |
| Keyboard focus | 2px `accent` outline with 2px offset (global `:focus-visible`); inputs use a cyan border plus `shadow-glow-focus` |
| Hover | Text → `accent-text`; border → `accent/40–60`; fill → `accent-fill/20` or `surface-hover` |
| Pressed | `active:scale-[0.98]` on buttons and chips |
| Disabled | 50% opacity, `not-allowed` cursor |
| Loading | Spinner, `aria-busy`, `LoadingState` with `role="status"` |
| Error | `danger` tokens, `ErrorState` with `role="alert"`, `Input invalid` with `aria-invalid` |
| Selected | `aria-pressed` / `aria-selected` / `aria-current`, `accent-fill/15–20` fill with `shadow-glow-active` |
| Keyboard navigation | Tabs: arrows / Home / End. Modal and drawer: focus trap, Escape, focus restore |

## 13. Usage rules

1. Use tokens and primitives. Never put hex values or `rgba(0,242,254,…)` in JSX; if a value is missing, add a token.
2. Wrap pages in `<Container>`; never set a new max width.
3. Read section colours and nav items from `src/config`; never re-declare them.
4. Merge classes with `cn()` so the Sylmap token names merge correctly.
5. Use panels for primary regions, `Card` inside panels, and `GlassCard` for navigation shortcuts.
6. Pick one glow per view region: the primary action, the focused or active element, or the brand badge.
7. Keep the cosmic background (`UniverseBackground`) as the page backdrop; Earth and orbits stay hero-only.
8. Every icon-only control needs an `aria-label`.

## 14. Do not

- Introduce new colours, fonts, a light theme, or a second accent hue for UI chrome.
- Add a separate "Ask Sylmap" search box, tab or mode.
- Make every card glow, or add glow to body text.
- Use radii outside the six above.
- Make the UI more sci-fi (extra particles, neon, animated backgrounds) or more minimal (removing glass, glow or imagery).
- Add animations beyond the motion tokens, or animations that ignore reduced motion.
- Move `.sylmap-glass-card` into a Tailwind layer; that changes the homepage hover.
- Hard-code section hues or nav items in components.
