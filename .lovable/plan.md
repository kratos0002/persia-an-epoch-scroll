

# Histomap Redesign: Split-Screen with Zoom

## Problem

The current Histomap is a 10,000px tall SVG that the user scrolls through linearly. There is no way to zoom out, see the whole picture, selectively click an era, or get context about what is happening at a given time slice. The experience is disorienting — you scroll through a massive stream with no narrative anchor.

## New Architecture: Split-Screen with Overview/Detail

```text
┌──────────────────────────────────────────────────────┐
│  Header: The Histomap · Current Year                 │
├──────────────────────┬───────────────────────────────┤
│                      │                               │
│   OVERVIEW PANEL     │      DETAIL PANEL             │
│   (Left, ~40%)       │      (Right, ~60%)            │
│                      │                               │
│   Full streamgraph   │   Era context card:           │
│   rendered small     │   - Era name & date range     │
│   (fits viewport)    │   - Major events list         │
│                      │   - Dominant civilizations     │
│   ┌──────────────┐   │   - Key transitions            │
│   │ ▓▓▓▓▓▓▓▓▓▓▓▓ │   │                               │
│   │ ▓▓▓▓▓▓▓▓▓▓▓▓ │   │   Essay cards (if any exist   │
│   │ ▓▓[SELECTED]▓ │←──│   for this time slice)        │
│   │ ▓▓▓▓▓▓▓▓▓▓▓▓ │   │                               │
│   │ ▓▓▓▓▓▓▓▓▓▓▓▓ │   │   Zoomed-in stream slice      │
│   └──────────────┘   │   (magnified view of the       │
│                      │    selected vertical band)     │
│   Click/drag to      │                               │
│   select era band    │                               │
│                      │                               │
├──────────────────────┴───────────────────────────────┤
│  Legend bar                                          │
└──────────────────────────────────────────────────────┘
```

The page is **viewport-height** (no more 10,000px scroll). The left panel shows the entire streamgraph compressed to fit the screen. The user clicks or drags a horizontal selection band on the left to pick a time slice. The right panel shows the zoomed-in detail for that slice.

## Left Panel — Overview Stream

- The full D3 streamgraph rendered at compressed scale (fits ~80vh)
- A **selection band** (draggable horizontal highlight, ~50-100px tall on the overview) marks the currently viewed era
- Click anywhere on the stream to jump; drag the band to scrub through time
- Essay windows shown as small gold dots/marks on the stream edge
- Year labels along the left edge (major ticks every 500 years)
- The selected era band glows with a highlight border

## Right Panel — Detail View

When a time slice is selected, the right panel shows:

1. **Era Header**: Date range in large mono type, era name (e.g. "The Age of Empires", "Colonial Expansion")
2. **Zoomed Stream Slice**: A magnified horizontal cross-section of the streamgraph at the selected year — showing which civilizations are dominant and their relative widths as a proportional bar
3. **Era Context**: 3-5 bullet points describing what is happening in the world at this time — key events, power shifts, transitions. This data will be authored in `histomapData.ts` as an `ERA_ANNOTATIONS` array
4. **Essay Cards**: If any published essays cover this time range, they appear as styled cards with title, subtitle, date range, and "Read" link
5. **Civilization Breakdown**: A small ranked list showing each active civilization's relative power at this exact year, with colored bars

## Data Additions

Add to `histomapData.ts`:

```typescript
interface EraAnnotation {
  startYear: number;
  endYear: number;
  name: string;           // "The Bronze Age", "Pax Romana", etc.
  description: string;    // 2-3 sentences
  keyEvents: string[];    // 3-5 bullet points
}
```

Roughly 15-20 era annotations covering the full timeline, so every position on the stream has context.

## Interaction Model

- **Click on overview** → selection band jumps to that era, right panel updates
- **Drag selection band** → smooth scrubbing, right panel updates in real time
- **Hover on overview stream** → tooltip with year + dominant civ
- **Click essay card** → navigate to essay
- **Keyboard**: Arrow up/down to step through eras

## Component Changes

| Component | Change |
|-----------|--------|
| `Histomap.tsx` | Complete rewrite — split-screen layout, selection state, no more 10k scroll |
| `HistomapStream.tsx` | Add `compact` prop to render at compressed height; add selection band overlay |
| `EraRuler.tsx` | Integrate into left panel edge instead of sticky sidebar |
| `EssayWindow.tsx` | Rewrite as detail-panel card (no more absolute positioning on stream) |
| `HistomapMinimap.tsx` | Remove — the overview IS the minimap now |
| `CivTooltip.tsx` | Keep, attach to overview panel hover |
| `histomapData.ts` | Add `ERA_ANNOTATIONS` data array |

New components:
- `HistomapDetailPanel.tsx` — right panel with era context, zoomed slice, essay cards
- `StreamCrossSection.tsx` — horizontal bar showing civ proportions at a single year
- `SelectionBand.tsx` — draggable highlight on the overview stream

## Mobile Behavior

On mobile (<768px), stack vertically: overview stream at top (~40vh), detail panel below. The selection band becomes a tap target.

