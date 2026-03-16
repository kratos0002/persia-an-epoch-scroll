

# Design Language: The Architecture of Partition

## The Concept: "The Cartographer's Table"

Every other essay on this platform draws from the aesthetic of its *subject culture* — Persian gold, Indian miniatures, Japanese ink. This essay has no native aesthetic to draw from because **the African cultures at its center were excluded from the room where it happened**. The design should reflect that: the visual language of **European diplomatic cartography** — the surveyor's grid, the ink pen on vellum, the bureaucratic ledger — imposed on a continent whose own visual richness is visible only in glimpses underneath.

The reader should feel like they are sitting at **Bismarck's conference table at Wilhelmstrasse 77**, leafing through the diplomatic folios, maps, and telegrams that carved up a continent — while the human cost bleeds through the margins.

## Visual Identity

### Palette: "Ink, Vellum, and Red Wax"

```text
VELLUM:       hsl(42, 30%, 92%)    — aged diplomatic paper
INK:          hsl(220, 20%, 12%)   — dark blue-black (fountain pen ink)
RED_WAX:      hsl(0, 65%, 42%)     — sealing wax, treaty stamps, blood
BRASS:        hsl(38, 55%, 48%)    — compass roses, cartographic instruments
TERRITORY:    hsl(35, 40%, 72%)    — colonial map fill (sandy beige)
PRUSSIAN:     hsl(210, 45%, 25%)   — Bismarck's Prussia, conference room walls
CONGO_GREEN:  hsl(140, 30%, 28%)   — Leopold's "Free State" branding
GRID_BLUE:    hsl(210, 35%, 60%)   — latitude/longitude grid lines
```

This is a **light-mode essay** (like Samurai) but colder than Ramayana's warm parchment — it's *institutional* paper, not sacred manuscript. The warmth is absent by design.

### Typography

- **Titles**: Playfair Display (existing) — works perfectly for 19th-century diplomatic gravitas
- **Body**: Cormorant Garamond (existing)
- **Data/Tables/Captions**: A monospaced or slab-serif accent — consider adding **IBM Plex Mono** for treaty articles, coordinates, and statistical tables, evoking typewritten colonial dispatches

### Signature Visual Motif: The Survey Grid

A faint **latitude/longitude grid** that persists across the entire essay as a background texture. Not the warm geometric patterns of Persia or Ramayana — cold, mechanical, measured. CSS `linear-gradient` grid lines at ~2% opacity in `GRID_BLUE`. This grid *is* the violence — it represents the imposition of European cartographic logic onto African space.

## Architecture: Sections and Components

### Core Map: Africa Partition Timelapse

The centerpiece component: a **Leaflet map of Africa** that shows the partition unfolding chronologically. As the reader scrolls through the 1881-1914 period, colored territorial overlays expand to fill the continent — each European power in its diplomatic color (British pink, French blue, German brown, Belgian green, Portuguese orange, Italian yellow). The map starts nearly empty (1870) and ends nearly full (1914).

This uses the existing `StickyScroll` + Leaflet pattern (like Rebellion's `DualWavefrontMap`) but with **polygon overlays** that grow over time rather than wavefront circles.

### Section Structure

| Section | Visual | Concept |
|---------|--------|---------|
| **Hero** | Full-screen dark (`PRUSSIAN`) with a faint survey grid. A single straight line draws itself diagonally across Africa — the most famous arbitrary border | "Wilhelmstrasse 77" title card |
| **The Conference Room** | Split: left text, right seating diagram (SVG) showing 14 delegations around a table, with an **empty chair** labeled "Africa" | The absence of African agency |
| **The General Act** | Treaty articles rendered as typeset legal documents with red-wax seal stamps and margin annotations | Articles 34 & 35 as interactive callouts |
| **The Blank Interior** | StickyScroll + Leaflet: historical 1884 map overlay vs. modern satellite — showing what they *didn't know* | Cartographic ignorance |
| **Pre-Colonial Africa** | A counter-narrative section: rich warm tones break through the cold grid. Cards for each polity (Sokoto, Ashanti, Buganda, Ethiopia) with population counters and governance details | The continent they ignored |
| **The Partition Timelapse** | Core map component: scroll-driven territorial expansion 1881-1914. Colored polygons grow. Split ethnic groups highlighted with red dashed lines | 10% → 90% in 30 years |
| **The Ethnic Fracture** | Data visualization: 177 split groups shown as lines crossing borders. Interactive: click a group to see which states it spans | Michalopoulos & Papaioannou data |
| **The Extraction** | Dark section. Congo rubber quotas, Herero genocide, forced labor. `AnimatedCounter` for death tolls. Deliberately austere — no decorative elements | The human cost |
| **The Direct Line** | Country-by-country cards (Sudan, Rwanda, Somalia, Nigeria, DRC) showing the causal chain from colonial policy to modern conflict. Each card: colonial mechanism → consequence → current displacement stats | Berlin → today |
| **Epilogue** | The survey grid fades. A quote from Salisbury. The empty chair remains. | "Lines on maps where no white man's foot has ever trod" |

### Unique Components to Build

1. **`ConferenceTable`** — SVG seating diagram of the 14 delegations with the empty "Africa" chair. Hover for delegate names and titles.

2. **`PartitionTimelapse`** — Leaflet map with GeoJSON polygon overlays for each colonial territory. Scroll-driven: `scrollYProgress` maps to year (1881-1914), polygons appear/grow as their historical acquisition dates are reached. Each power gets its diplomatic color.

3. **`EthnicFractureMap`** — SVG or Leaflet overlay showing the 177 split ethnic groups as crossing lines on the border. Color-coded by number of states split across (2 = yellow, 3+ = red).

4. **`TreatyArticle`** — A styled blockquote component that renders treaty text in a typeset legal format with a red wax seal SVG, article number in the margin, and annotation callouts.

5. **`EmptyChair`** — A small recurring motif (SVG) that appears in the progress timeline and section transitions — a single empty chair, the essay's visual signature.

6. **`ExtractionLedger`** — Similar to Samurai's `StipendLedger` but for colonial extraction data — rubber quotas, death tolls, displacement figures. Rows that fill in as the reader scrolls.

### Map Tile Strategy

Use `light_nolabels` (CartoDB) with a custom CSS filter to warm it slightly toward the `TERRITORY` tone — `filter: sepia(0.15) saturate(0.85)`. This gives a "colonial survey map" feel without the full watercolor treatment.

### Data Tables

The essay is unusually data-rich (delegation lists, treaty articles, ethnic partition statistics, displacement figures). Render these as **styled tables** with:
- Thin `BRASS` borders
- `IBM Plex Mono` for numbers
- Subtle row striping in `VELLUM` tones
- Red-wax accent dots for key data points

## What Makes It Different from Every Other Essay

| Element | Existing Essays | This Essay |
|---------|----------------|------------|
| Palette | Warm (gold, saffron, parchment) or dark cinematic | Cold institutional — diplomatic paper and ink |
| Map usage | Route tracing (Ramayana) or strategic theater (Rebellion) | **Territorial expansion timelapse** — polygons growing |
| Emotional register | Reverence (Ramayana), tension (Nuclear), grandeur (Persia) | **Clinical bureaucratic horror** — the violence of paperwork |
| Data density | Light (narrative-first) | **Heavy** — treaty articles, ethnic partition stats, displacement data |
| Recurring motif | Lotus (Ramayana), atom (Nuclear), telegraph (Rebellion) | **The empty chair** — Africa's absence from its own partition |
| Background texture | Persian geometric, paper grain, grid | **Survey grid** — latitude/longitude lines |

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Berlin.tsx` | Page shell |
| `src/components/berlin/BerlinHero.tsx` | Hero with survey grid and line-draw |
| `src/components/berlin/ConferenceTable.tsx` | SVG seating diagram |
| `src/components/berlin/TreatyArticle.tsx` | Styled treaty text component |
| `src/components/berlin/PartitionTimelapse.tsx` | Core Leaflet map with scroll-driven territorial overlays |
| `src/components/berlin/EthnicFractureMap.tsx` | 177 split groups visualization |
| `src/components/berlin/PreColonialCards.tsx` | Polity cards (Sokoto, Ashanti, etc.) |
| `src/components/berlin/ExtractionLedger.tsx` | Data table for colonial atrocities |
| `src/components/berlin/DirectLineCards.tsx` | Modern conflict causal chain cards |
| `src/components/berlin/BerlinEpilogue.tsx` | Closing section |
| `src/components/berlin/BerlinProgressTimeline.tsx` | Right-side nav with empty-chair motif |
| `src/components/berlin/BerlinSectionNav.tsx` | Hamburger drawer |
| `src/components/visuals/berlinMapData.ts` | GeoJSON territorial boundaries, delegation data, ethnic partition data |
| `src/hooks/useBerlinScrollSpy.ts` | Scroll spy |

## Implementation Order

1. Map data file (territorial GeoJSON boundaries, delegation data, partition statistics)
2. `PartitionTimelapse` core map component
3. `ConferenceTable` SVG + `TreatyArticle` styled component
4. Hero + Epilogue
5. Pre-colonial, Extraction, and Direct Line content sections
6. Page + routing + scroll spy + nav
7. Home card + editions entry

## Build Error Fix (Pre-existing)

The build errors in `process-email-queue/index.ts` and `send-transactional-email/index.ts` are pre-existing type issues unrelated to this essay. They need explicit type annotations on `.map((msg: any)` and `.filter((id: string)` callbacks, plus casting the Supabase client in the transactional email function. These should be fixed as a separate first step.

