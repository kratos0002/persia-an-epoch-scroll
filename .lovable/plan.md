

# Hormuz Essay — Intro & Flow Redesign

## Problems Identified

1. **Hero is too sparse** — Just text on a dark background with faint shimmer lines. No visual that sets geographic context. The reader doesn't know *where* they are.
2. **AncientGulfSection cards bleed into the hero** — The `sticky` map + negative-margin cards from AncientGulf visually collide with the hero's sticky content. Both sections use `sticky top-0` and there's no visual separation.
3. **No "prologue" beat** — The best essays (Persia) have a brief prologue that sets stakes before the first narrative section. Hormuz jumps from a generic title straight into "~3000 BCE — The Prize" with no breathing room.
4. **Section transitions are abrupt** — Each section immediately starts its own sticky context without a transitional beat. The fortress SVG, the Leaflet map, the tanker fire — they all stack without visual bridges.

## Plan

### 1. Redesign Hero with a Visual Map Reveal

Replace the empty hero with a **scroll-driven Leaflet map** that starts zoomed out on the world and zooms into the Persian Gulf as the title fades. This immediately tells the reader "this is about a place."

- Start at zoom ~2 (world view), center on the Middle East
- As user scrolls through the hero's 150vh, the map `flyTo` zooms to ~5 (Persian Gulf level)
- Title, subtitle, and "21 miles" indicator overlay the map with the existing dark overlay
- The map then becomes the *same* map used by AncientGulfSection — seamless handoff

### 2. Merge Hero + AncientGulf into One Flowing Section

Instead of two separate sections with competing sticky elements, combine them into a single long scrollytelling section (~450vh):

- **Phase 1 (0–150vh)**: Title fades in over the world map, map zooms to Persian Gulf. Title fades out as user scrolls.
- **Phase 2 (150–450vh)**: Trade routes draw in, city markers appear, narrative cards float over the map. This is the current AncientGulf content but now sharing the same sticky map.

This eliminates the collision and creates a single, continuous visual flow from "here's the world" → "here's the Gulf" → "here's why it mattered."

### 3. Add Transition Beats Between Major Sections

Between Portugal → British and British → Tanker War, add brief "era transition" moments — a full-screen text beat (similar to the Persia `EraTransition` component pattern):

- A centered line like *"For three centuries, Portugal held the throat. Then came oil."* before British Gulf
- *"The Gulf had always been about trade. Now it was about survival."* before Tanker War

These are simple `h-screen flex items-center justify-center` divs with a fade-in quote. No new components needed — just inline `motion.div` blocks.

### 4. Fix Bottleneck Section ID Typo

The current section has `id="botlneck"` (typo) — should be `id="bottleneck"`. This breaks the scroll spy navigation.

## Files to Change

| File | Change |
|------|--------|
| `HormuzHero.tsx` | **Rewrite** — Add Leaflet map background with scroll-driven zoom from world to Gulf |
| `AncientGulfSection.tsx` | **Rewrite** — Remove its own Leaflet map, instead receive the map handoff from hero via scroll continuation. The section becomes floating cards only, with the hero's map still sticky behind them |
| `Hormuz.tsx` | **Minor** — Remove AncientGulfSection as separate import, merge into hero flow. Add transition beats between sections |
| `BottleneckSection.tsx` | **Minor** — Fix `id="botlneck"` typo |

## Approach Detail

**HormuzHero + AncientGulf merger**: One component `HormuzHero.tsx` that is `~500vh` tall:
- Sticky Leaflet map fills the screen for the entire duration
- First 150vh: title overlay, map zooms from world → Gulf
- Next 300vh: title gone, trade routes animate in, 3 narrative cards scroll over the map
- Final card is the "Geography doesn't change" quote

**Transition beats**: Add two `<div>` blocks directly in `Hormuz.tsx` between PortugalSection/BritishGulfSection and BritishGulfSection/TankerWarSection. Each is a simple centered italic quote with `whileInView` animation. About 15 lines each.

This keeps the total file count the same while dramatically improving the opening flow.

