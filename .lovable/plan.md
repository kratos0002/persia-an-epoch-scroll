

# The Histomap: An Interactive Civilization Stream

## Concept

A dedicated `/histomap` page rendering a Sparks-style **streamgraph** — colored flowing bands representing civilizations' relative dominance over ~4,000 years — built as a tall, scroll-driven SVG/Canvas visualization. The key twist: **the essays you've published are "windows" into the stream**. When you scroll to an era covered by a live essay, that segment of the stream illuminates, pulses, and becomes clickable — linking directly into the essay. Uncovered eras remain muted, inviting exploration.

## What Makes This Work for Epoch Lives

The Histomap is not just a page — it becomes a **visual table of contents** for the entire platform. Instead of a flat list of essays, readers see WHERE in the flow of history each story sits, how civilizations overlap, and which gaps remain unfilled. It's both navigation and content.

## Architecture

```text
┌─────────────────────────────────────────────┐
│  THE HISTOMAP                               │
│  Four Thousand Years of Relative Power      │
│                                             │
│  ┌───────────────────────────────────┐      │
│  │  3000 BCE ──── streams begin     │      │
│  │  Egypt ████████████              │      │
│  │  Mesopotamia ██████████          │      │
│  │                                   │      │
│  │  ═══ ESSAY WINDOW ═══════════    │      │  ← Kurukshetra lights up
│  │  │ "The Fractured Yantra"    │   │      │
│  │  ═════════════════════════════    │      │
│  │                                   │      │
│  │  550 BCE ──── Persia expands     │      │
│  │  ═══ ESSAY WINDOW ═══════════    │      │  ← Persia essay lights up
│  │  │ "The Immortal Empire"     │   │      │
│  │  ═════════════════════════════    │      │
│  │                                   │      │
│  │  ... streams flow ...             │      │
│  │                                   │      │
│  │  1947 ──── British India splits   │      │
│  │  ═══ ESSAY WINDOW ═══════════    │      │  ← Radcliffe Line lights up
│  │  │ "The Radcliffe Line"      │   │      │
│  │  ═════════════════════════════    │      │
│  │                                   │      │
│  └───────────────────────────────────┘      │
└─────────────────────────────────────────────┘
```

## The Civilizations (Streams)

Approximately 15-18 major civilization bands, matching the Histomap's scope:

| Stream | Color Family | Peak Era |
|--------|-------------|----------|
| Egypt | Sandy gold | 3000–1000 BCE |
| Mesopotamia / Babylon | Warm ochre | 2500–500 BCE |
| India (Vedic → Mughal → Modern) | Saffron-amber | 1500 BCE–present |
| Persia | Royal purple-gold | 550 BCE–651 CE |
| Greece | Olive-teal | 500–150 BCE |
| Rome | Imperial red | 250 BCE–476 CE |
| China | Jade green | 221 BCE–present |
| Islamic Caliphates | Emerald-gold | 632–1258 CE |
| Mongol Empire | Steppe brown | 1206–1368 |
| Ottoman Empire | Deep crimson | 1299–1922 |
| European Colonial | Navy-grey | 1500–1947 |
| Japan | Vermilion | 1600–present |
| British Empire | Steel blue | 1600–1947 |
| Modern Nation-States | Muted tones | 1947–present |

Each stream's width represents relative power/influence — wide = dominant, narrow = diminished. The streams squeeze and flow around each other like the original Histomap.

## Essay Windows

Each published essay maps to a time range and one or more civilization streams. When the viewport scrolls into that range:

- The relevant stream segment **brightens** from muted (~20% opacity) to full saturation
- A **label card** appears beside or overlaid on the stream with the essay title, subtitle, and a "Read" link
- A subtle **glow/pulse** on the stream edges marks the covered era
- Clicking anywhere in the highlighted zone navigates to the essay

### Essay-to-Stream Mapping

| Essay | Time Range | Streams Highlighted |
|-------|-----------|-------------------|
| Kurukshetra | ~3000 BCE | India |
| Hormuz | 3000 BCE–Today | Persia, Islamic, Ottoman, British |
| Constantinople | 657 BCE–2024 | Greece, Rome, Ottoman |
| Persia | 550 BCE–Today | Persia |
| Buddhism | 528 BCE–Today | India, China |
| Ramayana | ~500 BCE | India |
| Shaktipeeths | Mythic/~200 BCE | India |
| House of Wisdom | 762–1258 CE | Islamic Caliphates |
| Mongol-India | 1221–1327 | Mongol, India |
| Ibn Battuta | 1325–1354 | Islamic Caliphates |
| Nutmeg | 1512–1667 | European Colonial |
| Samurai | 1603–1877 | Japan |
| Napoleon | 1789–1821 | European Colonial |
| Opium Trade | 1757–1842 | British, China |
| 1857 Rebellion | 1857–1858 | British, India |
| Berlin Conference | 1884–1914 | European Colonial |
| Nuclear | 1945–2017 | Multiple (USA, USSR, etc.) |
| India States | 1947–2024 | India |
| Radcliffe Line | 1947 | British, India |

## Visual Treatment

### The Stream Rendering

- **D3 `d3.stack` + `d3.area`** with `curveBasis` interpolation for the flowing organic shapes
- Data is a time-series: ~100 data points from 3000 BCE to 2024 CE, each row giving relative "weight" per civilization
- Total width is always 100% of the container — streams expand/contract relative to each other
- The entire chart is rendered as a **very tall SVG** (roughly 8000–12000px) that the user scrolls through vertically

### Muted vs. Highlighted States

- **Default**: All streams at 25% opacity, desaturated, with thin dark stroke edges — like an aged, faded print
- **Essay-covered zones**: Full saturation, slightly elevated (drop shadow or subtle stroke glow), with a paper-white "window frame" border
- **Hover on any stream**: Tooltip with civilization name and approximate era
- **Active essay window**: Gold border, essay card floating beside it

### The Sidebar/Era Ruler

- A thin **year ruler** on the left edge, ticking every 100 years with major dates marked
- The ruler is sticky — it stays in view as you scroll, with the current era highlighted
- Small **essay dots** on the ruler mark where essays sit, color-coded by status (gold = live, grey = coming soon)

### Navigation HUD

- A small **minimap** in the corner showing the full Histomap at thumbnail scale, with a viewport indicator showing where you are
- Click on the minimap to jump to any era

## Responsive Behavior

- **Desktop (1024+)**: Full-width streamgraph with floating essay cards on the side
- **Tablet (768–1024)**: Streamgraph fills viewport, essay cards overlay on tap
- **Mobile (< 768)**: Streamgraph at full width, horizontally scrollable if needed, or rendered slightly narrower with essay markers as tappable dots

## Technical Implementation

### Data Layer

A single `histomapData.ts` file containing:
- `CIVILIZATIONS`: Array of `{ id, name, color }` objects
- `TIME_SERIES`: Array of `{ year, [civId]: weight }` objects (~100 rows)
- `ESSAY_WINDOWS`: Array of `{ essayId, startYear, endYear, civIds[] }` mapping essays to stream regions

### Components

| File | Purpose |
|------|---------|
| `src/pages/Histomap.tsx` | Page shell, scroll tracking, minimap |
| `src/components/histomap/HistomapStream.tsx` | D3 stacked area chart rendering the streams |
| `src/components/histomap/EssayWindow.tsx` | Highlighted overlay + essay card for each covered era |
| `src/components/histomap/EraRuler.tsx` | Sticky year ruler on the left |
| `src/components/histomap/HistomapMinimap.tsx` | Corner minimap with viewport indicator |
| `src/components/histomap/histomapData.ts` | All civilization weights and essay mappings |

### Scroll Behavior

- `useScroll` from Framer Motion tracks vertical progress
- Progress maps to the current year range visible in the viewport
- Essay windows activate when their year range enters the viewport center
- Smooth `scrollTo` when clicking minimap or era ruler

## Implementation Order

1. **`histomapData.ts`** — civilization definitions + time-series weights (the hardest creative work: getting the relative power curves to feel right)
2. **`HistomapStream.tsx`** — D3 stacked area rendering the full streamgraph
3. **`EraRuler.tsx`** — sticky year ruler
4. **`EssayWindow.tsx`** — highlight overlays + essay cards
5. **`Histomap.tsx`** — page shell + scroll tracking
6. **`HistomapMinimap.tsx`** — navigation minimap
7. **Route + homepage link** — wire into App.tsx, add to navigation

