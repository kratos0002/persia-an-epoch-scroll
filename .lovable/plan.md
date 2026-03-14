

# "The Throat of the World" — The Strait of Hormuz

## Concept

A 3,000-year story of the world's most contested waterway — from Dilmun traders to modern carrier groups. The signature visual: a scroll-driven Leaflet zoom starting at a satellite view of the Persian Gulf, narrowing to the 21-mile strait with tanker traffic lanes, then pulling back out to a global chokepoints comparison.

This connects directly to the existing Persia essay — same geography, same civilizational thread.

## Narrative Arc (8 sections)

```text
Hero → The Gulf → Portugal → Britain → The Tanker War → The Bottleneck → Chokepoints → Epilogue
```

| # | Section ID | Label | Year | Hook |
|---|-----------|-------|------|------|
| 0 | `hormuz-hero` | The Throat of the World | — | "Every empire that ever ruled the East held this strait. Every one that lost it fell." |
| 1 | `ancient-gulf` | The Prize | ~3000 BCE | Dilmun traders, Mesopotamian copper/pearl trade, why the Gulf was always contested |
| 2 | `portugal-seizes` | Portugal Seizes the Throat | 1507 | Albuquerque takes Hormuz — the first European chokepoint strategy. Fort built on barren island. |
| 3 | `british-gulf` | Britain's Invisible Empire | 1820–1971 | Trucial States, piracy suppression as pretext, oil discovery transforms everything, 1971 withdrawal |
| 4 | `tanker-war` | The Tanker War | 1984–1988 | Iran-Iraq war spillover, reflagged Kuwaiti tankers, mines, USS Vincennes incident |
| 5 | `bottleneck` | The 21-Mile Bottleneck | Today | 21% of global oil, shipping lanes, why every carrier group rotates through |
| 6 | `chokepoints` | The World's Chokepoints | Present | Comparative visual: Hormuz, Malacca, Suez, Bab el-Mandeb, Panama — five passages controlling global trade |
| 7 | `hormuz-epilogue` | The Throat Remains | — | 3,000 years and the geography hasn't changed. The same 21 miles still hold. |

## Color Palette

- **Primary**: Persian Gulf teal — `hsl(195, 55%, 35%)` (deep water)
- **Accent**: Oil black/amber — `hsl(35, 80%, 50%)` (tanker gold), `hsl(0, 0%, 12%)` (crude)
- **Highlight**: Strategic red — `hsl(0, 65%, 50%)` (chokepoint markers)
- **Background**: Deep navy — `hsl(215, 45%, 8%)`
- **Text**: Same Playfair Display + Source Sans 3

## Signature Visuals

### 1. The Strait Zoom (Section 5 — `bottleneck`)
Leaflet map with 4 scroll-driven `flyTo` stages:
- **Stage 0**: Full Persian Gulf (zoom 5, center [27, 52])
- **Stage 1**: Strait of Hormuz approaches (zoom 8, center [26.5, 56.2])
- **Stage 2**: The 21-mile strait itself (zoom 11, center [26.56, 56.25]) — overlay shows inbound/outbound tanker lanes as dashed polylines, with Oman/Iran labels
- **Stage 3**: Close on the traffic separation scheme (zoom 13) — annotated with "2-mile wide inbound lane", "2-mile buffer", "2-mile wide outbound lane"

### 2. Chokepoints Comparison (Section 6)
Custom SVG/canvas component showing a world map with 5 chokepoints highlighted:
- **Hormuz**: 21 mi, 21% of oil
- **Malacca**: 1.7 mi at narrowest, 25% of trade
- **Suez**: 205m wide, 12% of trade
- **Bab el-Mandeb**: 18 mi, Red Sea gateway
- **Panama**: 110 ft above sea level, 5% of trade

Each rendered as a "card" that animates in on scroll, with a connecting line to its position on a minimal world outline. Animated counter showing daily barrel/ship throughput.

### 3. Oil Flow Gauge (Section 5)
Animated "pipeline" visual showing 21 million barrels/day flowing through — a horizontal bar that fills on scroll with a real-time-style counter.

### 4. Tanker War Timeline (Section 4)
Horizontal timeline ribbon (reuse `TimelineRibbon` pattern) showing key incidents: Earnest Will, Praying Mantis, Iran Air 655. Each node expands on hover/click.

### 5. Albuquerque's Fort (Section 2)
SVG illustration of the fortress on Hormuz island — barren rock in the strait, Portuguese flag, cannons pointed at passing dhows. Scroll-reveal.

### 6. Trucial States Map (Section 3)
Small map showing the seven Trucial States (now UAE) along the Gulf coast, with British treaty markers. Transitions to show oil discovery locations appearing one by one.

## File Structure

```text
src/pages/Hormuz.tsx
src/hooks/useHormuzScrollSpy.ts
src/components/hormuz/
  HormuzHero.tsx
  HormuzSectionNav.tsx
  HormuzProgressTimeline.tsx
  AncientGulfSection.tsx
  PortugalSection.tsx
  BritishGulfSection.tsx
  TankerWarSection.tsx
  BottleneckSection.tsx
  ChokepointsSection.tsx
  HormuzEpilogue.tsx
src/components/visuals/
  StraitZoomMap.tsx          — Leaflet zoom wrapper for the strait
  ChokepointComparison.tsx  — Global chokepoints SVG comparison
  OilFlowGauge.tsx          — Animated barrel-flow visual
  hormuzMapData.ts          — Strait coordinates, tanker lanes, city markers
```

## Integration

- Route: `/hormuz` in `App.tsx`
- Story card #12 in `Home.tsx`, status `'coming-soon'`
- Edition entry in `editions.ts`
- Card metadata: color `hsl(195, 55%, 35%)`, era `3000 BCE`, sortYear `-3000`, tags `['Zoom Map', 'Chokepoints', '3000 BCE–Today']`

## Implementation Order

1. Scaffold: page, scroll spy, section nav, progress timeline
2. Hero section
3. Ancient Gulf + Portugal sections (narrative + fort SVG)
4. British Gulf + Tanker War sections (timeline ribbon)
5. Bottleneck section with the signature strait zoom map
6. Chokepoints comparison visual
7. Epilogue + integration into Home/router

~15 new files, same incremental pattern as Nutmeg.

