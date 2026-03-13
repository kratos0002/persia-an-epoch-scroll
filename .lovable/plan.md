

# Design Exploration: Horizontal + Vertical Scroll Patterns

## What Pudding Does

Pudding essays use three core scroll patterns, often mixed within a single piece:

1. **Vertical sticky scroll** (what you already have via `StickyScroll`) — text scrolls over a pinned graphic
2. **Scroll-jacked horizontal pan** — vertical scrolling drives a horizontal camera movement across a wide canvas (timeline, map, panorama). The user scrolls normally but the content moves sideways.
3. **Full-width horizontal "chapters"** — a horizontal strip of panels (like a comic or filmstrip) that the user scrolls through, then snaps back to vertical for the next narrative beat.

The key insight: these aren't random — each axis serves a purpose. Vertical = narrative progression (time moves forward). Horizontal = spatial comparison or geographic traversal (space moves sideways).

## Where This Fits the Mongol India Essay

The story has a perfect structural match:

```text
VERTICAL (narrative time)          HORIZONTAL (geographic space)
─────────────────────────          ──────────────────────────────
Hero: "They conquered everything"
    │
    ▼
Genghis at the Indus (1221)
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  THE WAVES — horizontal scroll-driven map pan               │
│  Scroll down → camera pans west-to-east across Hindu Kush   │
│  Each invasion route lights up as you "cross" it             │
│  6 waves, each with a text card that appears/fades           │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Khalji's Shield (vertical, text-heavy reform section)
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  THE BATTLES — horizontal filmstrip                         │
│  3 panels side by side: Kili → Amroha → Ravi                │
│  Each panel = full-screen battle card with stats + map       │
│  Scroll down → slides left through the three battles        │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Why India Survived (vertical, stats)
    │
    ▼
The Price / Epilogue (vertical)
```

## New Scroll Components to Build

### 1. `HorizontalScroll` — scroll-jacked horizontal pan

```text
┌──────────────────────────────────────────────┐
│  Container height: panels.length * 100vh      │
│  Sticky inner: h-screen, overflow-hidden      │
│  Content: flex-row, width = panels * 100vw    │
│  scrollYProgress → translateX(0% to -N*100%)  │
│                                               │
│  ┌────────┬────────┬────────┬────────┐        │
│  │ Panel1 │ Panel2 │ Panel3 │ Panel4 │  ← horizontal strip
│  └────────┴────────┴────────┴────────┘        │
└──────────────────────────────────────────────┘
```

User scrolls vertically as usual. `useScroll` on the tall container maps `scrollYProgress` to a horizontal `translateX` via `useTransform`. Each "panel" is a full-viewport-width slide.

A text overlay fades in/out per panel (same `useInView` pattern as `StickyScroll`).

### 2. `ScrollPanMap` — geographic horizontal pan with route animation

Same mechanical principle as `HorizontalScroll`, but the "content" is a single wide map canvas (SVG or Leaflet) that pans from west (Samarkand) to east (Delhi) as you scroll. Invasion routes draw themselves as the camera crosses their longitude.

## Technical Plan

### New file: `src/components/scroll/HorizontalScroll.tsx`
- Props: `panels: ReactNode[]`, `className?`
- Outer div: `height = panels.length * 100vh` (creates scroll runway)
- Inner sticky div: `h-screen`, clips content
- Inner flex row: `width = panels.length * 100vw`, translated by `useTransform(scrollYProgress, [0, 1], ['0%', `-${(panels.length - 1) * 100}%`])`
- Each panel: `w-screen h-screen flex-shrink-0`
- Optional: dot indicators at bottom showing which panel is active

### New file: `src/components/scroll/ScrollPanMap.tsx`
- Props: `mapWidth: number`, `children: (panProgress: number) => ReactNode`, `overlaySteps: ReactNode[]`
- Same scroll-to-horizontal-translate mechanic
- `panProgress` (0-1) passed to the map render function so routes can draw progressively
- Overlay steps fade in/out based on progress bands (e.g., step 0 visible at 0-0.15, step 1 at 0.2-0.35, etc.)

### Files to modify for the Mongol India essay
- `WavesSection.tsx` — use `ScrollPanMap` with a wide SVG showing the Hindu Kush / Khyber / Punjab geography, invasion routes drawing west-to-east
- `BattlesSection.tsx` — use `HorizontalScroll` with 3 full-screen battle panels (Kili, Amroha, Ravi), each containing a battle map + stats card
- All other sections remain vertical (`StickyScroll`, `RevealOnScroll`)

### Mobile fallback
On screens < 768px, horizontal scroll is notoriously unreliable. The `HorizontalScroll` component will detect `md:` breakpoint and fall back to a standard vertical stack (each panel becomes a full-height vertical section). Same content, just stacked.

### No dependency changes needed
Everything uses `framer-motion`'s `useScroll` and `useTransform` which are already installed.

