

# Ramayana — "Full-Bleed Zoom Dive" Layout

## The Idea

One persistent full-bleed Leaflet map covers the entire essay. As the reader scrolls, the map continuously **flies between locations** along the 2,500km exile route — zooming in close at each stop, then pulling back out to reveal the next leg. Narrative cards float over the map as glass-panel overlays, appearing and disappearing at each stage.

This extends the Nutmeg `BandaSection` pattern (3 zoom stages, one sticky map, overlay cards) from a single section to the **entire page** — 10+ zoom stages spanning all of India and Sri Lanka.

**What makes it different from every other essay:**
- No section breaks, no `EraTransition` beats, no alternating dark/light backgrounds — just one continuous geographic descent
- The route polyline **draws itself progressively** as the reader scrolls
- The map starts at zoom 5 (all of India) and ends at zoom 14 (a single temple)
- Narrative cards position themselves contextually — sometimes bottom-left, sometimes bottom-right, sometimes centered — depending on where the map focus is

## Architecture

```text
┌──────────────────────────────────────────┐
│  Ramayana.tsx (single page)              │
│  ┌────────────────────────────────────┐  │
│  │  <section height="~100vh * stages">│  │
│  │    sticky full-bleed Leaflet map   │  │
│  │    + overlay card layer (z-10)     │  │
│  │    + route polyline (animated)     │  │
│  │    + progress footsteps indicator  │  │
│  │    + location marker at each stop  │  │
│  └────────────────────────────────────┘  │
│  Hero (above map) + Epilogue (below)     │
└──────────────────────────────────────────┘
```

## Zoom Stages (data-driven)

Each stage in `ramayanaMapData.ts`:
```ts
{ id: 'ayodhya', center: [26.80, 82.19], zoom: 12,
  label: 'Ayodhya', year: '~500 BCE',
  cardPosition: 'bottom-left',  // where the overlay card sits
  routeUpTo: 0,                 // draw route segments 0..N
  markers: [{ coords, label, color }] }
```

~10 stages: `hero-wide` → `ayodhya` → `shringverpur` → `chitrakoot` → `dandakaranya` → `panchavati` → `kishkindha` → `rameshwaram` → `lanka` → `return-wide`

Between stops, the map `flyTo`s with a 2s duration. The route polyline grows segment-by-segment.

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Ramayana.tsx` | Page: hero block + zoom-dive map section + epilogue |
| `src/hooks/useRamayanaScrollSpy.ts` | Scroll spy with `RAMAYANA_SECTIONS` |
| `src/components/ramayana/RamayanaHero.tsx` | Title section above the map |
| `src/components/ramayana/RamayanaEpilogue.tsx` | Epilogue + Part 2 teaser |
| `src/components/ramayana/RamayanaZoomDive.tsx` | **Core component**: sticky Leaflet map + scroll-driven zoom stages + overlay cards + animated route |
| `src/components/ramayana/RamayanaProgressTimeline.tsx` | Right-side dot nav |
| `src/components/ramayana/RamayanaSectionNav.tsx` | Hamburger drawer |
| `src/components/visuals/ramayanaMapData.ts` | All coordinates, route polylines, zoom stages, card content |

## Files to Update

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/ramayana` route |
| `src/pages/Home.tsx` | Add Essay XIII story card |
| `src/lib/editions.ts` | Add `ramayana` edition |

## The Core Component: `RamayanaZoomDive`

Extends the Banda pattern:
- **One sticky Leaflet map** (dark_nolabels tiles, no controls)
- **Scroll progress → stage index**: `scrollYProgress` mapped to `currentStage` (0–9)
- **On stage change**: `map.flyTo(stage.center, stage.zoom, { duration: 2 })`
- **Animated route**: A polyline that grows — on each stage, add the next segment to the polyline with a saffron glow
- **Stage markers**: DivIcon markers (like Banda's fort marker) appear at the current stop, removed on transition
- **Overlay narrative cards**: Positioned via `stage.cardPosition`, glass-panel style (`backdrop-blur`, dark bg), animated in/out with framer-motion `AnimatePresence`
- **Footsteps progress**: A thin bottom bar showing overall journey progress (like Banda's stage label, but as a distance indicator: "Ayodhya → Lanka: 2,500 km")

## Visual Identity

- **Palette**: Saffron `hsl(25, 85%, 52%)`, Earth `hsl(25, 30%, 10%)`, Sandstone `hsl(35, 40%, 85%)`, Forest `hsl(140, 35%, 30%)`
- **Tile layer**: `dark_nolabels` (same as Banda) — lets the route and markers pop
- **Route color**: Saffron with a wide glow underline (6px glow + 2px dashed line, like Nutmeg's SVG route but as a Leaflet polyline)
- **Card style**: Rounded glass panels with saffron accent borders

## Implementation Order

1. Map data file (coordinates, stages, route segments)
2. `RamayanaZoomDive` core component
3. Hero + Epilogue
4. Page + routing + scroll spy + nav
5. Home card + editions entry

