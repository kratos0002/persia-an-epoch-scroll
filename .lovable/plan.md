

# Hormuz Redesign — Proper Multi-Section Architecture

## Problem

The current implementation is a single 581-line monolithic component (`HormuzMapStory.tsx`) that crams 5,000 years of history into floating cards over one sticky map. It feels like a tech demo, not storytelling. No breathing room, no depth, no custom visuals per era. Every other essay on the platform (Nuclear, Napoleon, Nutmeg, Samurai) uses a modular Hero + Sections + Epilogue pattern with dedicated graphics per section. Hormuz should too.

## Architecture

Follow the Nuclear/Napoleon pattern exactly: separate component files per section, each using `StickyScroll` with a custom graphic or `RevealOnScroll` prose blocks. Delete the monolithic `HormuzMapStory.tsx`.

```text
Hormuz.tsx
  ├── HormuzHero            — Title screen with animated water ripples
  ├── DilmunSection         — ~3000 BCE, ancient trade (StickyScroll + Leaflet map)
  ├── PersianGulfSection    — 550 BCE–1500 CE, imperial lake (StickyScroll + Leaflet map)
  ├── PortugalSection       — 1507–1622, fortress & expulsion (StickyScroll + Leaflet map)
  ├── BritishGulfSection    — 1820–1971, Trucial States & oil (StickyScroll + Leaflet map)
  ├── TankerWarSection      — 1980–1988, fire on the water (StickyScroll + Leaflet map)
  ├── BottleneckSection     — Today, 21 miles (StickyScroll + Leaflet map)
  ├── ChokepointsSection    — Comparative (RevealOnScroll + grid)
  └── HormuzEpilogue        — The throat remains (existing, keep)
```

## Sections — Story & Visuals

### 1. HormuzHero
Full-screen title with subtle animated water lines (like NutmegHero's ocean waves but in teal/navy). "The Throat of the World" title. Subtitle: *"Every empire that ever ruled the East held this strait. Every one that lost it fell."* Essay XII badge.

### 2. DilmunSection (~3000 BCE)
**Thesis**: Before Rome, before Athens, this water carried civilization's first long-distance trade.

**StickyScroll graphic**: Leaflet map zoomed to Gulf (zoom 5), dark Carto tiles. Shows ancient trade routes as dashed amber polylines: Dilmun→Ur, Dilmun→Magan, Dilmun→Meluhha (Indus Valley). City markers with labels.

**Steps (4)**:
- The island of Dilmun (Bahrain) as the world's first entrepôt
- Copper from Magan (Oman), lapis lazuli from Afghanistan, pearls from Gulf beds
- Every ship funneled through the same narrow throat between Arabia and Iran
- The Sumerians called it paradise — but paradise sat at the mouth of a funnel

### 3. PersianGulfSection (550 BCE–1500 CE)
**Thesis**: For two thousand years, whoever ruled Persia ruled the Gulf. Both shores, one empire.

**StickyScroll graphic**: Leaflet map that shifts between Achaemenid territory view → Sassanid territory view → Islamic-era ports based on active step. GeoJSON territory overlays using existing `InteractiveMap` patterns.

**Steps (5)**:
- Darius I's navy — the first Persian fleet patrols the Gulf
- Sassanid Empire controls both coasts. The Gulf becomes a "Persian lake"
- After the Islamic conquest, Arab and Persian sailors dominate. The monsoon trade system connects the Gulf to India, China, East Africa
- The port of Siraf becomes one of the world's greatest trading cities. Old Hormuz rises on the mainland
- New Hormuz: the kingdom moves to an island at the strait's mouth. Marco Polo visits in 1293 and calls it "the greatest market in the world"

### 4. PortugalSection (1507–1622)
**Thesis**: The first European power to seize a chokepoint east of Suez.

**StickyScroll graphic**: Leaflet map zoomed tight on Hormuz Island (zoom 8). Portuguese fortress marker, Bandar Abbas across the water, Portuguese trade route from Goa.

**Steps (4)**:
- Afonso de Albuquerque arrives in 1507. Strategy: control Aden, Hormuz, Malacca — three locks on the Indian Ocean
- The fortress on Hormuz Island. Every ship pays tribute. 115 years of Portuguese control
- Shah Abbas I of Persia allies with the English East India Company. In 1622, they storm the fortress
- The Portuguese are expelled. But the lesson is permanent: *hold the strait, hold the Gulf*

### 5. BritishGulfSection (1820–1971)
**Thesis**: Britain didn't conquer the Gulf. It organized it — then oil made it indispensable.

**StickyScroll graphic**: Leaflet map (zoom 6) showing Trucial States markers (small circles with British red). Oil discovery dots appear progressively with year labels as steps advance.

**Steps (5)**:
- 1820: Britain signs "truces" with Gulf sheikhdoms. Piracy suppression = imperial control without the flag
- The Trucial States: Abu Dhabi, Dubai, Sharjah, Ajman, Umm al-Quwain, Ras al-Khaimah, Fujairah — named for truces, not tribes
- 1932: Oil discovered in Bahrain. Then Saudi Arabia (1938), Kuwait (1938), Abu Dhabi (1958). The Gulf transforms from a shipping lane into the world's energy reserve
- The strait becomes the world's most important bottleneck — not because of spices or pearls, but because of petroleum
- 1971: Britain withdraws east of Suez. The Trucial States become the UAE. Iran seizes three islands near the strait. A new era begins

### 6. TankerWarSection (1980–1988)
**Thesis**: The first time the strait caught fire.

**StickyScroll graphic**: Leaflet map (zoom 6) with red pulsing strike markers for key events. Shipping lanes shown as faint dashed lines.

**Steps (5)**:
- Iran-Iraq War spills into the Gulf. Iraq begins attacking Iranian tankers; Iran retaliates against Gulf shipping
- 546 ships attacked between 1981–1988. Oil prices spike. Insurance rates for Gulf shipping increase tenfold
- Operation Earnest Will: US Navy escorts reflagged Kuwaiti tankers. The largest convoy operation since WWII
- USS Stark hit by Iraqi Exocet missiles (37 dead). USS Samuel B. Roberts strikes an Iranian mine. Operation Praying Mantis — the largest US naval battle since WWII
- Iran Air Flight 655: USS Vincennes shoots down a civilian airliner. 290 dead. The strait's darkest day

### 7. BottleneckSection (Today)
**Thesis**: 21 miles. 21 million barrels. Every single day.

**StickyScroll graphic**: Leaflet map (zoom 9) zoomed into the strait showing inbound (amber) and outbound (teal) shipping lanes with lane labels. Oil gauge overlay with AnimatedCounter.

**Steps (4)**:
- Two shipping lanes, each two miles wide, separated by a two-mile buffer. The Traffic Separation Scheme
- 21 million barrels per day — 21% of global petroleum consumption
- US Fifth Fleet stationed permanently in Bahrain. Iran's Revolutionary Guard operates fast attack boats. Both know: close Hormuz, even briefly, and the world economy shudders
- Every pipeline bypass has failed. The economics always circle back to the same 21 miles

### 8. ChokepointsSection
**Thesis**: The world's economy flows through five narrow passages shaped by tectonic plates millions of years ago.

**RevealOnScroll** with the existing `ChokepointComparison` grid, plus prose above and below. No StickyScroll — a breathing-room section before the epilogue.

### 9. HormuzEpilogue (existing — keep as-is)

## Files

| File | Action |
|------|--------|
| `src/components/hormuz/HormuzMapStory.tsx` | **Delete** |
| `src/components/hormuz/HormuzHero.tsx` | **Create** |
| `src/components/hormuz/DilmunSection.tsx` | **Create** |
| `src/components/hormuz/PersianGulfSection.tsx` | **Create** |
| `src/components/hormuz/PortugalSection.tsx` | **Create** |
| `src/components/hormuz/BritishGulfSection.tsx` | **Create** |
| `src/components/hormuz/TankerWarSection.tsx` | **Create** |
| `src/components/hormuz/BottleneckSection.tsx` | **Create** |
| `src/components/hormuz/ChokepointsSection.tsx` | **Create** |
| `src/components/visuals/HormuzGulfMap.tsx` | **Create** — Reusable Leaflet map graphic for StickyScroll, accepts era-specific config (center, zoom, markers, routes, overlays) |
| `src/components/visuals/hormuzMapData.ts` | **Update** — Add ancient trade data, Persian era territories, Portuguese route |
| `src/hooks/useHormuzScrollSpy.ts` | **Update** — New section IDs matching new components |
| `src/pages/Hormuz.tsx` | **Update** — Import all new sections |
| `src/components/hormuz/HormuzEpilogue.tsx` | **Keep** |
| `src/components/hormuz/HormuzSectionNav.tsx` | **Keep** (update section list) |
| `src/components/hormuz/HormuzProgressTimeline.tsx` | **Keep** (update section list) |

## Shared Map Graphic

Instead of one monolithic map, create `HormuzGulfMap` — a StickyScroll-compatible graphic component that accepts:
- `center`, `zoom` — map position
- `markers` — array of labeled dots
- `routes` — polyline arrays with colors
- `activeStep` — drives progressive marker/route reveal
- `overlays` — optional territory GeoJSON

Each section passes its own era-specific config. The map initializes fresh per section (like how each Nuclear section has its own graphic). This avoids the flyTo jankiness of the monolith.

## Transition Beats

Between each section, use `EraTransition` (already exists in the codebase) with era-appropriate colors and a bridging quote. These provide the breathing room and visual rhythm the current version lacks.

