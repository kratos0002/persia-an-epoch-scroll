

# Essay 8: The Mosaic Republic — How 565 Became 28

## Concept

A **living map of India** that fragments and reassembles as you scroll through 75 years of state formation. The central visualization is a full-viewport SVG map where borders animate, states merge, split, and recolor in real-time driven by scroll progress. Every scroll position is a different political map of India.

The radical element: **the map IS the narrative**. Not a sidebar illustration — the entire viewport is the map, with text overlaid in floating cards. You literally watch 565 princely states collapse into 28 states + 8 Union Territories.

## The Visualization: MosaicMap

```text
┌──────────────────────────────────────────────┐
│                                              │
│   1947: THE PATCHWORK                        │
│   ┌─┬─┬──┬─┐                                │
│   │J│ │Ba│R│  ← 565 tiny colored tiles       │
│   ├─┤H├──┤a│     each a princely state       │
│   │ │y│  │j│                                 │
│   │G│d│My│ │  As you scroll:                 │
│   ├─┴─┼──┤ │  → tiles merge into provinces   │
│   │  T │Ma│ │  → borders redraw              │
│   │   r│ha│ │  → colors shift by language     │
│   └────┴──┴─┘  → holdouts flash red           │
│                                              │
│   ──── scroll ────                           │
│                                              │
│   2024: 28 STATES + 8 UTs                    │
│   ┌────────────┐                             │
│   │  Clean      │  ← modern political map     │
│   │  linguistic │                             │
│   │  borders    │                             │
│   └────────────┘                             │
└──────────────────────────────────────────────┘
```

### Key mechanics

1. **SVG India map** with simplified but accurate state boundaries for each era. Rendered as `<path>` elements with animated `d` attributes (morphing borders via framer-motion). States are colored by category: princely state, British province, linguistic group, or modern state.

2. **Scroll-driven morphing** — the map smoothly transitions between 7 historical snapshots as the user scrolls. Borders redraw, states merge (paths combine), states split (paths divide). Each transition takes ~1 scroll-viewport of distance.

3. **Spotlight mode** — when the narrative focuses on a specific state (e.g., Hyderabad's annexation), the map zooms into that region, dims everything else, and shows the story in a floating card. The state pulses with a glow.

4. **Counter widget** — a fixed element showing the current count: "States: 565 → 371 → 27 → 14 → 28" that ticks down/up as mergers and splits happen.

5. **Timeline ribbon** — a horizontal ribbon at the bottom showing key dates, with the current year highlighted. As you scroll, a playhead moves across it.

## Palette

```text
British provinces:   hsl(210, 40%, 50%)  — colonial blue
Princely states:     hsl(40, 60%, 55%)   — gold/amber (varying shades)
Holdouts:            hsl(0, 65%, 50%)    — warning red
Hindi belt:          hsl(25, 55%, 50%)   — saffron
Dravidian:           hsl(150, 40%, 40%)  — deep green
Northeast:           hsl(280, 35%, 45%)  — purple
Background:          hsl(220, 20%, 10%)  — dark ink
Text:                hsl(40, 30%, 85%)   — parchment cream
```

## Narrative Arc — 10 Sections

| # | ID | Section | Year | Map State |
|---|-----|---------|------|-----------|
| 1 | `patchwork` | The Patchwork — Hero | 1947 | 565 princely states + British provinces. A mosaic of 600+ entities. "The largest jigsaw puzzle in political history." |
| 2 | `midnight` | Midnight's Cartography | Aug 15, 1947 | British provinces become India/Pakistan. Radcliffe Line drawn. Punjab and Bengal split. Millions displaced. |
| 3 | `patel` | The Iron Man's Persuasion | 1947–48 | Sardar Patel + V.P. Menon. States accede one by one — map tiles merge in waves. 552 of 565 join within a year. Counter ticks down. |
| 4 | `holdouts` | The Three Holdouts | 1947–48 | Junagadh (plebiscite), Hyderabad (Operation Polo), Kashmir (war). Three states flash red. Zoom into each. |
| 5 | `abcd` | The Alphabet States | 1950 | Constitution creates Part A (9 provinces), Part B (8 former princely), Part C (10 commissioner), Part D (Andamans). A messy interim map. |
| 6 | `linguistic` | Drawing by Tongue | 1953–56 | Potti Sriramulu's death. States Reorganisation Commission. The great linguistic redraw — 14 states + 6 UTs. The map transforms dramatically. |
| 7 | `splits` | The Splitters | 1960–2000 | Bombay → Gujarat + Maharashtra (1960). Punjab → Punjab + Haryana (1966). Northeast carved out. Goa (1987). Each split animated. |
| 8 | `new-states` | The Last Redrawing | 2000–2019 | Jharkhand, Chhattisgarh, Uttarakhand (2000). Telangana (2014). J&K reorganized into 2 UTs (2019). |
| 9 | `present` | 28 + 8 | 2024 | The current map. 28 states, 8 Union Territories. Clean, modern borders. Each state labeled. |
| 10 | `epilogue` | "No Map Is Final" | — | Zoom out. The map pulses through all eras rapidly — showing how fluid borders are. The thesis: nations are not given, they are made, one negotiation at a time. |

## New Components

| Component | Purpose |
|-----------|---------|
| `IndiaMap.tsx` | Core SVG map with simplified path data for each era. Accepts `era` prop and morphs between boundary sets. Uses framer-motion `animate` for path transitions. |
| `StateCounter.tsx` | Fixed widget showing current state/UT count with animated number transitions |
| `TimelineRibbon.tsx` | Horizontal bottom bar with era markers and scroll-driven playhead |
| `StateSpotlight.tsx` | Overlay card for zoomed-in state stories (Hyderabad, Kashmir, etc.) |
| `indiaStatesData.ts` | All map path data, state metadata, era definitions, color mappings |
| `IndiaHero.tsx` | Hero section with the patchwork mosaic reveal |
| 7 section components | One per narrative section |
| `IndiaEpilogue.tsx` | Final section with rapid era-cycling animation |
| `useIndiaScrollSpy.ts` | Scroll spy hook |
| `IndiaSectionNav.tsx` | Section navigation drawer |
| `IndiaProgressTimeline.tsx` | Progress sidebar styled as a government file/dossier |

## Technical Approach

- **SVG paths**: Simplified but recognizable India boundaries. Each era has a set of `<path d="...">` elements. For the princely states era, we won't render all 565 individually (impossible) — instead, we render ~40 major states/regions as distinct paths and use a dense grid pattern for the rest to convey the fragmentation visually.
- **Path morphing**: Use framer-motion's `animate` on SVG path `d` attributes. Where states merge, paths combine. Where states split, a single path divides into two with animation.
- **Leaflet NOT used** — pure SVG for full animation control. The map is illustrative, not geographic-precise. Style: clean, diagrammatic, like a political atlas illustration.
- **Color transitions**: Each era assigns colors to states by category (language group, political status). Colors transition smoothly between eras.

## File Structure

```text
src/
  pages/IndiaStates.tsx
  hooks/useIndiaScrollSpy.ts
  components/india/
    IndiaHero.tsx
    MidnightSection.tsx
    PatelSection.tsx
    HoldoutsSection.tsx
    AbcdSection.tsx
    LinguisticSection.tsx
    SplitsSection.tsx
    NewStatesSection.tsx
    PresentSection.tsx
    IndiaEpilogue.tsx
    IndiaSectionNav.tsx
    IndiaProgressTimeline.tsx
  visuals/
    IndiaMap.tsx
    StateCounter.tsx
    TimelineRibbon.tsx
    StateSpotlight.tsx
    indiaStatesData.ts
```

## Modified files
- `App.tsx` — add `/india-states` route
- `Home.tsx` — add story card #8

**Estimated new files: ~18 · Modified files: 2**

