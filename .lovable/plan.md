

# The Spice That Built Empires — The Nutmeg Wars

## Concept

A new essay about how a single spice — nutmeg — drove centuries of colonial warfare, culminating in the Dutch trading Manhattan for the tiny island of Run. The signature visual is a **scroll-driven zoom**: starting from a satellite view of the Banda Sea, progressively zooming into the island of Run, then down to fort level.

## Narrative Arc (8 sections)

```text
Hero ──→ The Seed ──→ The Voyage ──→ The Banda Islands ──→ The Dutch Monopoly
  ──→ Run: The Last Holdout ──→ The Manhattan Trade ──→ Epilogue
```

1. **Hero** — Dark ocean surface, title fades in. "One seed. Ten thousand dead. And a trade that shaped the modern world."
2. **The Seed** — What nutmeg is, why Europeans were obsessed. A visual showing nutmeg's price-per-ounce vs gold. Animated spice route map.
3. **The Voyage** — Portuguese discovery of the Banda Islands (1512). Scroll-pan map tracing the route from Lisbon around Africa to the Banda Sea.
4. **The Banda Islands** — The signature zoom visual. Satellite view of the Banda Sea → zoom into the volcanic archipelago → zoom into Run island. Uses Leaflet with scroll-driven `flyTo` transitions (same pattern as the Persia/Parthian essays).
5. **The Dutch Monopoly** — VOC arrives, the Banda massacre of 1621. Sticky scroll with step-based visuals: population counter (15,000 → ~1,000), plantation grid, VOC profit chart.
6. **Run: The Last Holdout** — The English on Run island. A fort-level SVG illustration showing the tiny English settlement vs Dutch blockade.
7. **The Manhattan Trade** — Treaty of Breda, 1667. A split-screen "trade card": Manhattan on left, Run on right, with animated value comparison that flips over centuries.
8. **Epilogue** — The legacy: nutmeg is now $8/lb, Manhattan is worth $1.7 trillion. The absurdity of empire.

## Visual Design — Color Palette & Theme

- **Primary**: Warm spice tones — `hsl(25, 75%, 45%)` (nutmeg brown), `hsl(35, 90%, 55%)` (saffron gold)
- **Background**: Deep ocean — `hsl(210, 40%, 8%)` (midnight sea)
- **Accent**: VOC orange — `hsl(30, 85%, 50%)`, Dutch blue — `hsl(210, 60%, 40%)`
- **Typography**: Same Playfair Display + Source Sans 3 system

## Signature Visual: The Zoom

The Banda Islands section uses the existing `InteractiveMap` (Leaflet) component with **three scroll-driven stages** (same `StickyScroll` pattern as Parthian/Sassanid campaigns):

- **Step 0**: Wide view — Banda Sea in context of Southeast Asia (zoom ~5, center [-4.5, 130])
- **Step 1**: Mid zoom — The Banda archipelago, 10 tiny volcanic islands (zoom ~11, center [-4.525, 129.89])
- **Step 2**: Close zoom — Run island itself, with a fort marker and spotlight callout (zoom ~14)

Each step uses `flyTo` with `duration: 1.8` — exactly the existing pattern.

## Key Custom Visuals (new components)

1. **SpicePriceChart** — Animated bar/line chart showing nutmeg price vs gold per ounce (simple SVG, motion)
2. **BandaZoomMap** — Wrapper around `InteractiveMap` that switches empire territories off and uses custom island polygons + fort markers
3. **PopulationCounter** — Animated counter from 15,000 → 1,000 (reuse existing `AnimatedCounter` pattern)
4. **ManhattanTradeCard** — Split visual: two cards that flip/animate to show the trade's absurd value difference
5. **VOCProfitRibbon** — Similar to `ArmyRibbon` but showing profit margins

## File Structure

```text
src/pages/Nutmeg.tsx                          — Page component
src/hooks/useNutmegScrollSpy.ts               — Scroll spy (same pattern)
src/components/nutmeg/
  NutmegHero.tsx                              — Ocean-surface hero
  NutmegSectionNav.tsx                        — Left nav
  NutmegProgressTimeline.tsx                  — Right progress
  SeedSection.tsx                             — The spice backstory
  VoyageSection.tsx                           — Portuguese discovery
  BandaSection.tsx                            — The zoom visual (★ signature)
  MonopolySection.tsx                         — VOC & massacre
  RunSection.tsx                              — The English holdout
  ManhattanTradeSection.tsx                   — The swap
  NutmegEpilogue.tsx                          — Legacy & colophon
src/components/visuals/
  SpicePriceChart.tsx                         — Price comparison visual
  ManhattanTradeCard.tsx                      — Split trade visual
  BandaZoomMap.tsx                            — Leaflet zoom wrapper
  nutmegMapData.ts                            — Banda islands coordinates, cities, routes
```

## Integration

- Add route `/nutmeg` in `App.tsx`
- Add story card to `STORIES` array in `Home.tsx` with status `'coming-soon'` initially
- Add edition entry in `src/lib/editions.ts`
- Story card: color `hsl(25, 75%, 45%)`, era `1512`, sortYear `1512`, tags `['Zoom Map', 'Spice Trade', '1512–1667']`

## Implementation Order

1. Scaffold page, scroll spy, section nav, progress timeline (boilerplate from Napoleon pattern)
2. Build Hero section
3. Build narrative sections (Seed → Voyage → Monopoly → Run)
4. Build the signature Banda zoom map visual
5. Build Manhattan Trade card visual
6. Build Epilogue
7. Wire into Home page and router

This is a large essay (~15 new files). I'd build it incrementally, starting with the page scaffold and hero, then adding sections one at a time.

