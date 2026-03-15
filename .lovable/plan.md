

# Hormuz Redesign — The Map Is the Story

## Core Idea

One sticky Leaflet map spans the entire essay. Scroll drives era transitions on the map. Floating cards provide narrative. The strait is always visible — what changes is who controls it and what flows through it.

## Current Problems

The essay has **six competing visual contexts**: hero map, fortress SVG, British Gulf map, tanker fire SVG, strait zoom map, chokepoint comparison grid. Each creates its own sticky layer. The reader loses geographic continuity — the very thing the essay is about.

## Architecture

```text
┌─────────────────────────────────────────┐
│  ONE sticky Leaflet map (full screen)   │
│  persists for the entire essay          │
│                                         │
│  Scroll progress (0→1) drives:          │
│    • map zoom / center                  │
│    • markers, routes, overlays          │
│    • era color accent on the map        │
│                                         │
│  Floating cards scroll OVER the map     │
│  with pointer-events-none container     │
└─────────────────────────────────────────┘
```

### Era Stages (driven by scroll progress)

| Stage | Era | Map State | Markers/Overlays |
|-------|-----|-----------|-----------------|
| 0 | Title | Zoom 3, world view | None — just the title overlay |
| 1 | ~3000 BCE | Zoom 5, Gulf | Dilmun, Ur, Magan, Meluhha + trade route polylines |
| 2 | 1507 Portugal | Zoom 7, Hormuz Island | Hormuz Island marker, fortress icon, "Portugal" label |
| 3 | 1820 Britain | Zoom 6, Gulf | Trucial States markers, oil discovery dots appear progressively |
| 4 | 1984 Tanker War | Zoom 6, Gulf | Strike markers (red pulses) for tanker attacks |
| 5 | Today | Zoom 8, Strait | Inbound/outbound shipping lanes, 21-mile width indicator |
| 6 | Chokepoints | Zoom 2, world | Five chokepoint markers with labels |
| 7 | Epilogue | Zoom 5, Gulf | Clean — just the strait highlighted |

### Transition Beats

Between each era, a centered quote fades in as the cards scroll past. These happen naturally in the card flow — no separate component needed.

## Files to Change

| File | Action |
|------|--------|
| `src/pages/Hormuz.tsx` | Simplify — single `HormuzMapStory` component replaces all section imports except epilogue/footer |
| `src/components/hormuz/HormuzMapStory.tsx` | **New** — The entire map-driven essay in one component |
| `src/components/hormuz/HormuzHero.tsx` | Delete (merged into MapStory) |
| `src/components/hormuz/PortugalSection.tsx` | Delete (merged) |
| `src/components/hormuz/BritishGulfSection.tsx` | Delete (merged) |
| `src/components/hormuz/TankerWarSection.tsx` | Delete (merged) |
| `src/components/hormuz/BottleneckSection.tsx` | Delete (merged) |
| `src/components/hormuz/ChokepointsSection.tsx` | Delete (merged) |
| `src/components/hormuz/HormuzEpilogue.tsx` | Keep — epilogue stays as-is after the map story |
| `src/hooks/useHormuzScrollSpy.ts` | Update section IDs to match new era markers |

## HormuzMapStory Structure

One component, ~3000vh tall:
- Sticky Leaflet map (dark Carto tiles, full bleed)
- `useScroll` tracks progress 0→1 across entire section
- Progress mapped to `currentEra` (0–7)
- Each era change triggers `map.flyTo()` + add/remove layers
- ~20 floating narrative cards in a `pointer-events-none` container with `margin-top: -3000vh`
- Cards alternate left/right/center with the existing glassmorphic style
- Every 3–4 cards, a centered italic "transition beat" quote marks the era shift

## What Gets Cut

- Fortress SVG (Portugal) — replaced by map zoomed to Hormuz Island with a fortress marker
- Tanker fire SVG — replaced by red pulse markers on the map showing strike locations
- StraitZoomMap — the main map already zooms to the strait in the "Today" era
- OilFlowGauge — keep as a small overlay widget during the "Today" era, not a separate section
- ChokepointComparison — keep as an overlay grid during the "Chokepoints" era

## What This Achieves

The map never leaves. The reader always knows where they are geographically. The thesis — "this point has been important forever" — is proven visually by watching the same 21 miles get fought over across 5,000 years while never losing sight of it.

