

# Essay 5: The Signal and the Fire — The 1857 Rebellion

## Concept

A scrollytelling essay at `/1857` about two competing signals racing across North India: the telegraph carrying British orders at the speed of electricity, and the rebellion spreading at the speed of a horse along social networks the British couldn't see. The signature visual is a **map with two wavefronts** — one geometric and fast (telegraph), one organic and wide (rebellion).

## Palette — Colonial Ink & Flame

```text
Background:   hsl(220, 25%, 8%)   -- deep imperial navy
Paper:        hsl(45, 30%, 88%)   -- parchment cream (text cards)
Scarlet:      hsl(0, 70%, 48%)    -- red coat scarlet (British)
Amber:        hsl(30, 85%, 50%)   -- flame/saffron (rebellion)
Wire:         hsl(200, 60%, 55%)  -- electric blue (telegraph)
Ash:          hsl(220, 10%, 45%)  -- faded administrative gray
Gold:         hsl(43, 60%, 50%)   -- Company gold
```

Dark-mode essay. The navy background evokes colonial administration; the contrast between electric blue (telegraph) and amber/flame (rebellion) is the visual thesis.

## Signature Visual: DualWavefrontMap

New component: `DualWavefrontMap.tsx` — built on raw Leaflet (same pattern as `InteractiveMap`). A map of North India (~centered on Delhi/Kanpur corridor) showing:

- **Telegraph line**: A polyline along the actual telegraph route (Calcutta → Allahabad → Kanpur → Delhi). At each scroll step, the line extends further with an electric blue glow. Stations appear as small square nodes.
- **Rebellion wavefront**: Concentric, irregular circles expanding from Meerut, then Kanpur, then Lucknow. Rendered as animated GeoJSON polygons with amber fill, opacity pulsing. The spread is organic — following rivers, roads, cantonment towns.
- **Key mechanic**: At certain scroll steps, both signals race toward the same city (e.g., Delhi). The telegraph arrives first — but the rebellion arrives wider. The map makes visible which network "won" at each location.

Props: `activePhase: number`, `progress: number`, `showTelegraph: boolean`, `showRebellion: boolean`

Phase 0: Empty map, just North India
Phase 1: Telegraph line draws from Calcutta westward
Phase 2: Rebellion erupts at Meerut, wavefront begins
Phase 3: Both race toward Delhi — telegraph arrives first
Phase 4: Rebellion spreads to Kanpur, Lucknow — wider than telegraph reach
Phase 5: British reinforcement routes appear
Phase 6: Rebellion wavefront contracts, telegraph network solidifies

## Narrative Arc — 9 Sections

| # | ID | Section | Visual |
|---|----|---------|--------|
| 1 | `hero` | "The Signal and the Fire" | Split-screen: telegraph spark (left, blue) vs flame (right, amber). Title draws between them. |
| 2 | `cartridges` | The Greased Cartridge | No map — dark section with large typography. The Enfield rifle, the rumor, the insult to both Hindu and Muslim soldiers. Sets the fuse. |
| 3 | `two-networks` | Two Networks | `StickyScroll` with map. Step 1: Telegraph infrastructure overlaid (geometric grid). Step 2: Social network overlaid (bazaars, regiments, villages — organic web). The contrast is the thesis. |
| 4 | `meerut` | Meerut — The Spark | Map: rebellion wavefront erupts from Meerut (May 10, 1857). Amber circle expands. Telegraph sends warning toward Delhi — blue line races ahead. |
| 5 | `race-to-delhi` | The Race to Delhi | Map: both signals converge on Delhi. Telegraph arrives hours before the sepoys. But the British can't act on the warning. Delhi falls. The signal was faster; the fire was stronger. |
| 6 | `kanpur-lucknow` | Kanpur & Lucknow | Map: rebellion wavefront splits — south to Kanpur (Nana Sahib), east to Lucknow (siege). Telegraph lines cut. Blue lines go dark. The fire burns where the wire can't reach. |
| 7 | `reconquest` | The Reconquest | Map: British reinforcement routes appear (from Punjab, from sea). Telegraph network rebuilds. Rebellion wavefront slowly contracts. Counter-animation. |
| 8 | `aftermath` | The Transfer of Power | No map — full-bleed dark section. The Company dies. The Crown takes over. Large date: 1858. Counter: ~800,000 dead. |
| 9 | `epilogue` | "The fire remembered" | Map returns: all rebellion cities glow amber. Telegraph lines fade. The network that mattered was human. |

## New Components

| Component | Purpose |
|-----------|---------|
| `DualWavefrontMap.tsx` | Leaflet map with telegraph polylines + rebellion wavefront polygons |
| `TelegraphLine.tsx` | SVG/CSS animated telegraph wire with spark effect for hero |
| `rebellionMapData.ts` | Cities, telegraph stations, rebellion spread coordinates, routes |

## File Structure

```text
src/
  pages/Rebellion1857.tsx
  hooks/useRebellionScrollSpy.ts
  components/rebellion/
    RebellionHero.tsx
    CartridgeSection.tsx
    TwoNetworksSection.tsx
    MeerutSection.tsx
    RaceToDelhi.tsx
    KanpurLucknowSection.tsx
    ReconquestSection.tsx
    AftermathSection.tsx
    RebellionEpilogue.tsx
    RebellionProgressTimeline.tsx
    RebellionSectionNav.tsx
  visuals/
    DualWavefrontMap.tsx
    TelegraphLine.tsx
    rebellionMapData.ts
```

## Map Data (`rebellionMapData.ts`)

**Telegraph stations** (with coordinates): Calcutta, Benares, Allahabad, Kanpur, Agra, Delhi — connected as a linear polyline.

**Rebellion cities** (with outbreak dates for sequencing): Meerut (May 10), Delhi (May 11), Kanpur (June 5), Lucknow (June 30), Jhansi (June), Gwalior (June) — used to time the wavefront expansion.

**Wavefront polygons**: Pre-computed concentric irregular shapes centered on outbreak cities, expanding per phase.

**British reinforcement routes**: Punjab → Delhi, Calcutta → Allahabad (by river/rail).

## Implementation Order

1. `rebellionMapData.ts` — coordinates, stations, wavefront data
2. `useRebellionScrollSpy.ts` + nav/timeline components
3. `DualWavefrontMap.tsx` — the signature dual-wavefront Leaflet map
4. `TelegraphLine.tsx` — hero visual (animated wire + spark)
5. All 9 section components
6. `Rebellion1857.tsx` page
7. Update `App.tsx` with `/1857` route
8. Update `Home.tsx` — replace Mongol "coming soon" with this essay, or add as #5

**Estimated new files: 16 · Modified files: 2**

