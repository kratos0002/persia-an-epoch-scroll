

# Visual Overhaul: Make Ibn Battuta a Visual-First Scrollytelling Essay

## The Problem

The essay is currently a wall of text. The `RouteMap` Leaflet component exists but is **never imported or rendered** anywhere in the page. There is no split-panel layout, no scroll-driven route drawing, no sticky map. Every phase section is just paragraphs with small stop-cards at the bottom. The site's brand is "felt, not summarized" — this essay is entirely summarized.

For comparison, the Ramayana essay uses a 40/60 split-panel with a sticky MapLibre map that draws a route progressively as the user scrolls through 22 stages. Each stage has a narrative panel on the left and the map flies to the relevant location on the right. That is the standard this essay needs to match.

## Architecture: Scroll-Driven Split-Panel with Sticky Map

Rewrite the core essay structure to match the Ramayana pattern:

### 1. **`BattutaZoomDive.tsx`** — The Centerpiece (new file, ~500 lines)

A single component that replaces all 7 `PhaseSection` instances + `BattutaGenesis`. This is the equivalent of `RamayanaZoomDive.tsx`.

**Layout**: Sticky `100vh` frame with 40% left panel (narrative) and 60% right panel (Leaflet map).

**Scroll behavior**: The section height = `(number of stages) * 100vh`. Scroll progress maps to discrete stages. Each stage:
- Flies the map to the relevant coordinates
- Draws the route polyline progressively (accumulating past segments, active segment animating)
- Shows narrative content in the left panel (title, body text, quote)
- Accumulates markers for past stops (dimmed dots) with an active marker (labeled, pulsing)

**Stages**: One stage per major stop (~40 stages across 7 phases). Phase transitions get a full-screen overlay card (like Ramayana's `PhaseCard`) showing the phase name and Arabic text.

**Map details**:
- Sepia-filtered Stamen Toner Lite tiles (already in `RouteMap.tsx`)
- Polyline drawn in the phase's color, past phases dimmed
- Active stop gets a labeled tooltip marker
- Route "head" — a glowing dot at the tip of the drawn line

### 2. **Rewrite `IbnBattuta.tsx` page layout**

```
Hero → BattutaZoomDive → BlackDeathCounters → IslamicNetwork → ComparativeScale → Epilogue
```

Remove the 7 separate `PhaseSection` components and `BattutaGenesis`. The entire journey narrative lives inside `BattutaZoomDive`.

### 3. **Expand `battutaMapData.ts` with stage definitions**

Add a `STAGES` array (like Ramayana's `STAGES_GL`) where each stage has:
- `id`, `phase` (which of the 7 phases), `center` coordinates, `zoom` level
- `markers` array (the stops visible at this stage)
- `narrative` object: `{ title, body, quote? }`
- `routeUpTo` index for progressive route drawing

The existing `PHASES` and `PHASE_CONTENT` data gets restructured into this stage-based format.

### 4. **Keep specialized visual sections intact**

`BlackDeathCounters`, `IslamicNetwork`, `ComparativeScale`, and `BattutaEpilogue` remain as standalone sections below the map dive. These are the data-visualization sections that work well as their own units.

### 5. **Delete `RouteMap.tsx`**

Its logic gets absorbed into `BattutaZoomDive`. No need for a separate map component.

## Files to Change

| File | Action |
|------|--------|
| `src/components/visuals/battutaMapData.ts` | Add `STAGES` array with ~40 stage definitions, narrative content, route data |
| `src/components/battuta/BattutaZoomDive.tsx` | **Create** — 40/60 split-panel with sticky Leaflet map, scroll-driven route + narrative |
| `src/pages/IbnBattuta.tsx` | Replace `BattutaGenesis` + 7 `PhaseSection` with single `BattutaZoomDive` |
| `src/components/battuta/BattutaPhaseSections.tsx` | **Delete** — content moves into `battutaMapData.ts` stages |
| `src/components/battuta/RouteMap.tsx` | **Delete** — logic absorbed into `BattutaZoomDive` |
| `src/hooks/useBattutaScrollSpy.ts` | Update section IDs to reflect new structure |

## Implementation Approach

Use Leaflet (not MapLibre) since the existing `RouteMap` and other essays (Nutmeg, Battuta) already use Leaflet. The route polyline will be drawn using `L.polyline()` with progressive segment slicing based on scroll progress — simpler than Ramayana's turf.js approach but visually equivalent.

The left panel will use `AnimatePresence` for smooth content transitions between stages, matching the Ramayana pattern exactly.

