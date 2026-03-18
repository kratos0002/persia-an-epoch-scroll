

# Ibn Battuta Essay: Design Language — "The Rihla Folio"

## Concept

Ibn Battuta's story is fundamentally about **movement through a connected world** — the 14th-century Islamic commonwealth as a functional global network. The design should evoke the **traveler's journal**: worn leather bindings, ink on handmade paper, marginalia, compass roses, and the warm tones of the medieval Islamic manuscript tradition.

Unlike Berlin's cold institutional cartography, this essay is **warm, expansive, and intimate** — the reader follows a single man's 29-year odyssey through monsoon routes, Saharan crossings, and Mongol steppes. The visual language draws from **Islamic geometric art, Maghrebi calligraphy, and medieval portolan charts** (the navigational maps of the Mediterranean and Indian Ocean).

## Palette: "Leather, Ink, and Saffron"

```text
PARCHMENT:     hsl(38, 35%, 88%)    — worn travel journal paper
LEATHER:       hsl(25, 45%, 22%)    — book binding, dark warm brown
INK:           hsl(30, 15%, 15%)    — iron gall ink (warm black, not blue-black)
SAFFRON:       hsl(38, 80%, 55%)    — gold leaf, Islamic illumination
LAPIS:         hsl(215, 55%, 42%)   — lapis lazuli blue (mosque tiles, ocean)
HENNA:         hsl(15, 60%, 45%)    — terracotta/henna red accents
MONSOON:       hsl(195, 40%, 50%)   — Indian Ocean, monsoon routes
SAND:          hsl(40, 30%, 72%)    — Saharan crossing, desert terrain
EMERALD:       hsl(155, 40%, 35%)   — Islam, growth, garden cities
```

This is a **warm light-mode essay** (like Ramayana) but less jewel-toned — more naturalistic, more traveled and worn. The warmth of leather and desert sand rather than temple gold.

## Typography

- **Titles**: Playfair Display (existing) — works for scholarly gravitas
- **Body**: Cormorant Garamond (existing)
- **Accent/Quotes**: Consider adding a subtle Arabic-script watermark treatment (like Ramayana's Devanagari "राम") using "بطوطة" (Battuta) as a background motif
- **Data/Distances**: IBM Plex Mono or existing monospace for coordinates and distance statistics

## Signature Visual Motif: The Compass Rose

Where Ramayana uses a lotus mandala and Berlin uses an empty chair, Ibn Battuta uses a **compass rose** — the eight-pointed Islamic star (rub el hizb ✳) that doubles as both a navigational instrument and an Islamic geometric symbol. This appears in the progress timeline, section transitions, and hero.

A secondary motif: **the astrolabe** — the navigational instrument of the medieval Islamic world.

## Map Strategy: The Core Visual

This essay is fundamentally a **route-tracing narrative** (like Ramayana) but on a hemispheric scale — 117,000 km across ~40 modern nations. The primary map component should be:

- A **Leaflet map** centered on the Eastern Hemisphere (~[15, 50]) at zoom ~3
- The route draws itself as a polyline in phases (7 phases = 7 scroll segments)
- Each major stop gets a marker with popup (city name, date, key observation)
- **Monsoon wind arrows** appear on the Indian Ocean during maritime phases
- The map tile uses `light_nolabels` with a warm sepia filter (`sepia(0.25) saturate(0.8)`) for the portolan chart feel

The 40/60 split-screen layout (like Ramayana) is the right pattern: scrollable narrative left, sticky route map right.

## Section Architecture

| Section | Visual | Concept |
|---------|--------|---------|
| **Hero** | Warm dark (`LEATHER`) with compass rose SVG drawing itself. Arabic watermark "ابن بطوطة" | "The man who walked the world" |
| **Tangier: The Genesis** | Light parchment. Map shows Tangier with radiating dotted lines suggesting the routes to come | The Marinid context, the Maliki passport |
| **Phase 1: North Africa → Mecca** | Split-panel: route draws across the Maghrib. Cards for Alexandria, Cairo, Damascus | The first pilgrimage |
| **Phase 2: Iraq, Persia, East Africa** | Route extends south along the Swahili Coast. Monsoon arrows appear | Kilwa, Mogadishu, the Indian Ocean world |
| **Phase 3: Anatolia & the Golden Horde** | Route swings north through Anatolia to Crimea. Constantinople detour | The fityan, Uzbeg Khan, Hagia Sophia |
| **Phase 4: Delhi** | Dark section (tension). Route crosses Hindu Kush to Delhi. Cards for Tughluq's paradoxes | 7 years of luxury and terror |
| **Phase 5: Maldives → China** | Route extends to its eastern extreme. Maritime emphasis | The debated China visit |
| **Phase 6: The Black Death Return** | Dark, somber. Death toll counters (AnimatedCounter). Route retraces westward | Cairo: 24,000 dead per day |
| **Phase 7: Al-Andalus & Mali** | Route completes the circle south across the Sahara | The final journey, the dictation of the Rihla |
| **The Islamic Commonwealth** | Data visualization: network diagram showing trade routes, shared institutions | Why one man could travel 117,000 km |
| **Comparative Scale** | AnimatedCounters: 117,000 km vs Marco Polo's 24,000, vs Earth's circumference | The quantitative achievement |
| **Epilogue** | Compass rose completes. Quote: "I set out alone..." The route map shows all 7 phases simultaneously | The complete odyssey |

## Unique Components

1. **`CompassRose`** — SVG eight-pointed Islamic star, used as recurring motif in timeline and transitions
2. **`RouteMap`** — Leaflet map with scroll-driven polyline drawing (7 phases), monsoon wind arrows, and city markers
3. **`PhaseCard`** — Split-panel narrative card with phase number, date range, and distance covered
4. **`RihlaQuote`** — Styled blockquote component with leather-bound border treatment and Arabic calligraphic accent
5. **`MonsoonDiagram`** — SVG showing the Indian Ocean wind patterns (NE/SW monsoon) that dictated maritime travel
6. **`BlackDeathCounters`** — AnimatedCounter display for daily death tolls with somber styling
7. **`ComparativeScale`** — Visual comparison of travel distances (bar chart or proportional circles)
8. **`IslamicNetwork`** — Network/node diagram showing the institutions (madrasas, zawiyas, qadi courts) that enabled the journey

## What Makes It Different

| Element | Existing Essays | This Essay |
|---------|----------------|------------|
| Scale | Regional/continental | **Hemispheric** — Morocco to China |
| Palette | Cold institutional (Berlin) or jewel-toned (Ramayana) | **Warm naturalistic** — leather, sand, ink |
| Map | Territory fill (Berlin) or 22-stop route (Ramayana) | **7-phase polyline** across 40 nations |
| Motif | Empty chair (Berlin), lotus (Ramayana) | **Compass rose / astrolabe** |
| Emotional register | Bureaucratic horror (Berlin), devotional (Ramayana) | **Wonder and wanderlust** with undercurrents of loneliness |
| Data | Ethnic partition stats (Berlin) | **Distance, death tolls, trade volumes** |
| Background | Survey grid (Berlin), paper grain (Ramayana) | **Portolan chart lines** — rhumb lines radiating from compass roses |

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/IbnBattuta.tsx` | Page shell |
| `src/components/battuta/BattutaHero.tsx` | Hero with compass rose and Arabic watermark |
| `src/components/battuta/RouteMap.tsx` | Core Leaflet map with 7-phase polyline |
| `src/components/battuta/PhaseCard.tsx` | Narrative cards for each travel phase |
| `src/components/battuta/RihlaQuote.tsx` | Styled quote component |
| `src/components/battuta/MonsoonDiagram.tsx` | Wind pattern SVG |
| `src/components/battuta/BlackDeathCounters.tsx` | Death toll animated counters |
| `src/components/battuta/ComparativeScale.tsx` | Distance comparison visualization |
| `src/components/battuta/IslamicNetwork.tsx` | Trade/institution network diagram |
| `src/components/battuta/BattutaEpilogue.tsx` | Closing section |
| `src/components/battuta/BattutaProgressTimeline.tsx` | Right-side nav with compass rose motif |
| `src/components/battuta/BattutaSectionNav.tsx` | Hamburger drawer |
| `src/components/visuals/battutaMapData.ts` | Route coordinates, city data, phase definitions |
| `src/hooks/useBattutaScrollSpy.ts` | Scroll spy |

## Implementation Order

1. Data file — route coordinates for all ~30 major stops, 7 phase definitions, city metadata
2. `RouteMap` — core Leaflet map with scroll-driven polyline
3. Hero + Epilogue
4. Phase content sections (7 phases)
5. Black Death counters + Comparative Scale
6. Islamic Commonwealth network diagram
7. Page shell + routing + scroll spy + nav
8. Home card + editions entry

