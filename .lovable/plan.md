

# Add Maps, Visuals, and Animations to Berlin Essay

## The Problem

The Berlin essay currently has **no maps of Africa at all**. The "Partition Timelapse" is just a year counter with text cards. The "Ethnic Fracture" section is clickable buttons. The "Pre-Colonial" section is plain cards. For an essay about the literal carving up of a continent, the reader never actually *sees* the continent. This is the equivalent of writing about the Ramayana route without showing a map.

## What to Build

### 1. Africa Partition Map (core visual — `PartitionTimelapse.tsx` rewrite)

A **Leaflet map of Africa** centered at `[2, 20]` zoom ~4, using the existing raw-Leaflet pattern (like `DualWavefrontMap`). As the user scrolls through 1830–1914:

- **Colored territory circles/polygons** appear on the map at each colonial acquisition's location, color-coded by power (British pink, French blue, German brown, Belgian green, Portuguese orange, Italian yellow)
- The map uses `light_nolabels` tiles with a `sepia(0.15)` CSS filter for the "colonial survey map" feel
- Layout: **40% left panel** (year counter + event cards) / **60% right map** (sticky Leaflet map) — matching the Ramayana split-panel pattern
- Territories accumulate as the reader scrolls (past ones stay, dimmed)
- A pulsing marker highlights the current territory being discussed

Each `PARTITION_TIMELINE` entry already has approximate lat/lng data available from the `PRE_COLONIAL_POLITIES` data — we'll add `lat/lng` fields to each timeline event for map placement, and use `L.circle()` with ~200km radius in the colonial power's color.

### 2. Pre-Colonial Africa Map (`PreColonialCards.tsx` upgrade)

The polities already have `lat` and `lng` fields. Add a **Leaflet map** showing the 6 pre-colonial polities as warm-toned territory circles with labels. Split layout: map on right, polity cards on left. Clicking a card flies to that polity on the map and shows a popup.

### 3. Ethnic Fracture Map (`EthnicFractureMap.tsx` upgrade)

Add a **Leaflet map of Africa** showing:
- Straight red dashed lines representing geometric borders (44%)
- The 10 listed split ethnic groups shown as colored spans crossing borders
- Click a group name → map flies to the region and highlights the split

### 4. Hero Africa Silhouette Animation (`BerlinHero.tsx` upgrade)

The current hero has a tiny 6%-opacity Africa shape with one line. Upgrade to:
- A much more visible Africa silhouette (15-20% opacity) with accurate outline
- **Multiple partition lines** that draw themselves sequentially across the continent as the user scrolls — not just one diagonal, but the actual geometric borders (horizontal, vertical, diagonal)
- Each line draws in a different colonial power's color

### 5. Animated Counters for Extraction Section

Add `AnimatedCounter` (already exists in the codebase) to the ExtractionLedger for death toll numbers — the numbers should count up as they scroll into view, creating visceral impact.

### 6. Direct Line Cards — Displacement Counter

Add animated counters for the IDP and refugee numbers (parsing "11.6 million" → counter to 11.6M) so the human cost is felt visually.

## Files to Change

| File | Change |
|------|--------|
| `src/components/visuals/berlinMapData.ts` | Add `lat/lng` to each `PARTITION_TIMELINE` event |
| `src/components/berlin/PartitionTimelapse.tsx` | **Full rewrite** — split-panel with Leaflet map showing territories accumulating |
| `src/components/berlin/PreColonialCards.tsx` | Add Leaflet map showing the 6 polities as territory markers |
| `src/components/berlin/EthnicFractureMap.tsx` | Add Leaflet map with border lines and ethnic group spans |
| `src/components/berlin/BerlinHero.tsx` | Multiple animated partition lines, more visible Africa silhouette |
| `src/components/berlin/ExtractionLedger.tsx` | Add `AnimatedCounter` for death tolls |
| `src/components/berlin/DirectLineCards.tsx` | Add animated counters for displacement stats |

## Implementation Order

1. Add lat/lng coordinates to `PARTITION_TIMELINE` in `berlinMapData.ts`
2. Rewrite `PartitionTimelapse.tsx` with Leaflet map (the centerpiece)
3. Upgrade `PreColonialCards.tsx` with map
4. Upgrade `EthnicFractureMap.tsx` with map
5. Upgrade `BerlinHero.tsx` with multi-line animation
6. Add animated counters to `ExtractionLedger.tsx` and `DirectLineCards.tsx`

