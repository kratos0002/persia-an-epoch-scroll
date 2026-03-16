

# Ramayana — Comprehensive Route Expansion

## What Changes

### 1. Expand from 10 stops to ~22 stops

Using the research, the full route includes stops currently missing:

**North India (early exile):**
- Ayodhya → Shringverpur → **Prayagraj (Sangam/Bharadwaj Ashram)** → Chitrakoot → **Atri Ashram (Sati Anasuya)**

**Central India (wilderness years):**
- Dandakaranya → **Agastya Ashram** → Panchavati → **Jatayu Sthal (Lepakshi)** → **Shabari / Pampa Sarovar**

**South India (the war path):**
- Kishkindha → **Kodikkarai** → Rameshwaram → **Dhanushkodi (bridge start)**

**Sri Lanka (the Lanka trail):**
- **Ashok Vatika (Sita Eliya)** → **Ravana Ella / Caves** → **Ussangoda** → **Divurumpola** → Lanka (war site) → Return

That gives us **~22 stages** — enough for a definitive, comprehensive resource.

### 2. No zoom-in — consistent India-view panning

Instead of zooming from zoom 5 → zoom 12 at each stop, the map stays at a **consistent regional zoom (~7-8)** and simply **pans** to center on each stop. The route draws progressively. Markers accumulate (past stops stay visible but dimmed). This feels like a journey map being traced, not a Google Maps dive.

### 3. Rich side panel instead of floating card

Replace the current small floating glass card with a **full-height left-side panel** (~40% width) that contains:

```text
┌─────────────────────┬──────────────────────────────┐
│  LEFT PANEL (40%)   │   MAP (60%)                  │
│                     │                              │
│  ┌───────────────┐  │   [panning Leaflet map with  │
│  │  Stop Number  │  │    route + markers]          │
│  │  TITLE        │  │                              │
│  │  Year / Phase │  │                              │
│  ├───────────────┤  │                              │
│  │  [Image       │  │                              │
│  │   Placeholder]│  │                              │
│  ├───────────────┤  │                              │
│  │  Narrative    │  │                              │
│  │  body text    │  │                              │
│  ├───────────────┤  │                              │
│  │  TODAY        │  │                              │
│  │  Temple name  │  │                              │
│  │  Significance │  │                              │
│  │  Coordinates  │  │                              │
│  └───────────────┘  │                              │
│                     │                              │
│  ── progress bar ── │  ── distance tracker ──      │
└─────────────────────┴──────────────────────────────┘
```

Each stop's data includes:
```ts
{
  id: 'prayagraj',
  center: [25.43, 81.88],
  label: 'Prayagraj — The Confluence',
  phase: 'The Departure',
  year: 'Year 0',
  routeUpTo: 2,
  narrative: {
    title: 'The Confluence',
    body: '...',
    accent: '...',
  },
  today: {
    name: 'Triveni Sangam & Bharadwaj Ashram',
    detail: 'NBPW shards dating to 7th century BCE found at excavation sites near the Sangam.',
    coordinates: '25.43°N, 81.88°E',
  },
  image: {
    src: '/placeholder.svg',  // placeholder for now
    alt: 'Triveni Sangam at Prayagraj',
    caption: 'The confluence of the Ganga, Yamuna, and mythical Saraswati',
  },
}
```

### 4. Files to change

**`src/components/visuals/ramayanaMapData.ts`** — Complete rewrite:
- Expand `STAGES` from 10 to ~22 entries with all new fields (`today`, `image`, `phase`)
- Expand `ROUTE_SEGMENTS` to match all new legs
- Add `phase` groupings for the progress timeline
- Keep zoom consistent at 7-8 for all stops (no deep zoom)

**`src/components/ramayana/RamayanaZoomDive.tsx`** — Major redesign:
- Replace floating card with full left-panel layout (40/60 split)
- Panel includes: stop counter, title, image placeholder, narrative, "Today" block
- Map occupies right 60%
- Past markers stay on map (dimmed) instead of being cleared
- Map pans at consistent zoom, no deep zoom-in
- Section height scales to new stage count

**`src/hooks/useRamayanaScrollSpy.ts`** — Update `RAMAYANA_SECTIONS` array to match all ~22 stages

**`src/components/ramayana/RamayanaProgressTimeline.tsx`** — Update to handle 22 dots (group by phase, smaller dots, phase labels)

**`src/components/ramayana/RamayanaSectionNav.tsx`** — Update to handle 22 sections (group by phase in drawer)

### 5. The 22 stops (full list)

| # | ID | Location | Key Event | Today |
|---|-----|----------|-----------|-------|
| 0 | hero | India wide | Intro | — |
| 1 | ayodhya | Ayodhya, UP | Exile begins | Ram Mandir (2024), Sarayu Ghats |
| 2 | shringverpur | Near Prayagraj | Ganga crossing with Guha | Ancient hydraulic tank (ASI) |
| 3 | prayagraj | Prayagraj, UP | Bharadwaj Ashram visit | Triveni Sangam, NBPW pottery |
| 4 | chitrakoot | UP/MP border | Bharat Milap, sandals on throne | Ramghat, Kamadgiri hill |
| 5 | atri-ashram | Near Chitrakoot | Sage Atri & Anasuya's gifts to Sita | Sati Anasuya Temple |
| 6 | dandakaranya | Chhattisgarh/MP | 10 years among sages | Bastar tribal belt |
| 7 | agastya-ashram | Nashik region | Sage Agastya gives divine weapons | Agastya Ashram ruins |
| 8 | panchavati | Nashik, MH | Shurpanakha, Golden Deer, Sita abducted | Kalaram Temple, Sita Gufa |
| 9 | lepakshi | Andhra Pradesh | Jatayu falls fighting Ravana | Jatayu Earth Centre, Virabhadra Temple |
| 10 | shabari | Near Hampi | Shabari offers tasted berries | Pampa Sarovar |
| 11 | kishkindha | Hampi, Karnataka | Alliance with Hanuman & Sugriva | Anjanadri Hill, Sugriva's Cave |
| 12 | kodikkarai | Tamil Nadu coast | Army marches south | Point Calimere wildlife sanctuary |
| 13 | rameshwaram | Tamil Nadu | Shiva Lingam, bridge construction | Ramanathaswamy Temple |
| 14 | dhanushkodi | Tip of Pamban | Bridge starting point | Ghost town, destroyed by 1964 cyclone |
| 15 | ashok-vatika | Sita Eliya, Sri Lanka | Sita held captive in garden | Sita Amman Temple, Hanuman footprints |
| 16 | ravana-ella | Ella, Sri Lanka | Ravana's cave network | Ravana Falls, cave systems |
| 17 | ussangoda | Southern Sri Lanka | Hanuman's fire scorches the ground | Ussangoda National Park, scorched red soil |
| 18 | lanka-war | Sri Lanka | The war, Ravana falls | — |
| 19 | divurumpola | Central Sri Lanka | Sita's Agni Pariksha (trial by fire) | Divurumpola Buddhist temple |
| 20 | return | India wide | Pushpaka Vimana, Diwali | A billion lamps |
| 21 | epilogue | — | Part 2 teaser | — |

### 6. Implementation order

1. Rewrite `ramayanaMapData.ts` with all 22 stages, expanded data model, new route segments
2. Redesign `RamayanaZoomDive.tsx` with left-panel/right-map split layout, accumulated markers, consistent zoom
3. Update `useRamayanaScrollSpy.ts` with all 22 sections
4. Update `RamayanaProgressTimeline.tsx` to group by phase
5. Update `RamayanaSectionNav.tsx` to group by phase

