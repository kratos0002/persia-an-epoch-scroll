

# Redesign: House of Wisdom — Pudding-Level

## The Problem

Almost every section is the same: `RevealOnScroll` → centered heading → paragraph → paragraph. Only the Translation section has a sticky visual. The rest is a blog post with fade animations. No scroll-driven mechanics, no unique visual identity per section, no immersion.

## The Fix: Every Section Gets Its Own Visual Mechanic

### 1. Hero — Scroll-Driven Calligraphy Stroke Drawing
Keep the structure but replace the static Arabic text with an SVG path that **draws** as you scroll (stroke-dashoffset driven by scrollYProgress). The English title and subtitle fade in after the calligraphy completes. Much more dramatic entry.

### 2. Round City — StickyScroll + Scroll-Driven City Builder
Convert to `StickyScroll`. The sticky graphic is the concentric-circles SVG, but **scroll-driven**: 
- Step 0: Empty desert, outer wall draws
- Step 1: Second wall draws, gates appear
- Step 2: Inner wall, palace center glows
- Step 3: Population counter animates, city pulses with life

The SVG circles use `stroke-dashoffset` animated by `activeStep`. Not a static diagram — a city being built before your eyes.

### 3. Harun — StickyScroll + Manuscript Shelf Visual
New component: `ManuscriptShelf.tsx`. An SVG bookshelf that fills as you scroll:
- Step 0: Empty shelf, introductory text
- Step 1: Greek scrolls appear (gold), "manuscripts from Byzantium"
- Step 2: Persian texts appear (teal), Sanskrit texts (amber)
- Step 3: Shelf overflowing, "one building couldn't hold it all"

Each scroll/book is a small SVG rectangle with a colored spine and a tooltip label. They animate in with staggered framer-motion.

### 4. Translation — KnowledgeGraph (keep, but enhance)
Already the best section. Enhance: add animated stroke-dasharray on edges so lines "draw" instead of appearing. Add a subtle pulse animation on nodes. Keep as-is otherwise.

### 5. Scholars — StickyScroll + Scholar Spotlight
New component: `ScholarSpotlight.tsx`. A full-bleed sticky visual showing one scholar at a time:
- Large name in display font, their field, and a key visual icon (compass for optics, equation for algebra, gear for automata)
- Background shifts color subtly per scholar
- Each step card shows the scholar's story

This replaces the repetitive border-left card list.

### 6. Inventions — StickyScroll + Flow Diagram
New component: `KnowledgeFlow.tsx`. A horizontal SVG pipeline:
- Step 0: "Greek texts" node on left
- Step 1: Arrow draws to "Arabic translation" node, counter ticks up
- Step 2: Arrow draws to "Arabic innovation" — new branches sprout (algebra, optics, medicine)
- Step 3: Final arrow to "Latin translation" → "European Renaissance"

Scroll drives the flow left-to-right. Each stage lights up and branches. Counters animate at each step.

### 7. Ripple — StickyScroll + InteractiveMap with Animated Routes
Use the existing `InteractiveMap` centered on Baghdad, with `StickyScroll`:
- Step 0: Baghdad highlighted, intro text
- Step 1: Toledo highlighted, route line draws west
- Step 2: Palermo highlighted, route draws through Mediterranean
- Step 3: All routes visible, Arabic word grid appears in the text card

This is the same pattern that works in the Persia essay (map + sticky scroll).

### 8. Destruction — Scroll-Driven Graph Shatter
Instead of a static `isDestroyed={true}`, make destruction **scroll-driven**:
- Use `StickyScroll` with the KnowledgeGraph as the sticky visual
- `activeStep` 0: Full healthy graph, "February 1258" text
- `activeStep` 1: Graph starts breaking — nodes drift, edges fade (pass `destructionProgress` interpolated from scroll)
- `activeStep` 2: Graph fully shattered, counters appear in card
- `activeStep` 3: Quote, aftermath

New prop on KnowledgeGraph: `destructionProgress: number` (0-1) for continuous disintegration instead of binary toggle.

### 9. Epilogue — Reassembly Animation
Keep structure but add: the KnowledgeGraph renders again at the top, this time with `isDestroyed` transitioning from true to false as you scroll in — the nodes slowly reassemble. "Knowledge cannot be un-known" hits differently when you watch the graph rebuild.

## New Components

| Component | Type | Purpose |
|-----------|------|---------|
| `ManuscriptShelf.tsx` | SVG visual | Scroll-driven bookshelf that fills with colored manuscripts |
| `ScholarSpotlight.tsx` | SVG visual | Full-bleed scholar portrait with name, field, icon |
| `KnowledgeFlow.tsx` | SVG visual | Horizontal flow diagram: Greek → Arabic → Latin → Europe |

## Modified Components

| Component | Change |
|-----------|--------|
| `KnowledgeGraph.tsx` | Add `destructionProgress` prop for continuous shatter (replaces binary `isDestroyed`) |
| `WisdomHero.tsx` | SVG stroke-drawing calligraphy on scroll |
| `RoundCitySection.tsx` | Convert to StickyScroll + animated SVG city builder |
| `HarunSection.tsx` | Convert to StickyScroll + ManuscriptShelf |
| `TranslationSection.tsx` | Enhance edge animations |
| `ScholarsSection.tsx` | Convert to StickyScroll + ScholarSpotlight |
| `InventionsSection.tsx` | Convert to StickyScroll + KnowledgeFlow |
| `RippleSection.tsx` | Convert to StickyScroll + InteractiveMap |
| `DestructionSection.tsx` | Convert to StickyScroll + scroll-driven KnowledgeGraph shatter |
| `WisdomEpilogue.tsx` | Add graph reassembly animation |

## Section Count: 9 sections, 7 use StickyScroll, 0 are just "text fading in"

Every section now has a unique full-bleed visual that responds to scroll. No two sections feel the same.

