

# Essay 7: Constantine — The City of Layers

## Concept

An archaeological dig through **Constantinople/Istanbul** — the city that has been Greek, Roman, Byzantine, Latin Crusader, Ottoman, and Turkish. The user scrolls **downward through strata of time**, each layer a civilization built on the bones of the last. The deeper you go, the older the world you uncover.

## The Radical Visualization: DigSection

The entire essay is built around a single new interaction paradigm: **vertical excavation**.

The viewport is a cross-section of earth. As the user scrolls:

```text
┌─────────────────────────────────────┐
│  SURFACE — Modern Istanbul (2024)   │  ← cars, minarets, bridges
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← asphalt/concrete layer
│  STRATUM 1 — Ottoman (1453–1922)    │  ← mosque domes, tulips, calligraphy
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ← rubble/mortar layer
│  STRATUM 2 — Latin Crusade (1204)   │  ← broken crosses, looted gold
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│  ← ash/debris layer
│  STRATUM 3 — Byzantine (330–1204)   │  ← gold mosaics, Hagia Sophia dome
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← stone/marble layer
│  STRATUM 4 — Roman / Constantine    │  ← columns, aqueducts, the founding
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ← clay/earth layer
│  STRATUM 5 — Greek Byzantion        │  ← pottery shards, fishing nets
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← bedrock
└─────────────────────────────────────┘
```

### Key mechanics

1. **Dirt layers** — between each stratum, a textured "earth" band scrolls past with CSS grain/noise. Small **artifact particles** (pottery shards, coins, bone fragments) drift upward as you dig through them — rendered as small SVGs with randomized positions and subtle rotation.

2. **Stratum reveal** — as each layer enters the viewport, its background transitions from opaque earth to a revealed scene. The "excavation" effect: a radial wipe from center outward, as if brushing away dirt. Built with CSS clip-path animation driven by scroll progress.

3. **Artifact popups** — clickable artifact icons embedded in each stratum. Click a coin and it expands into a detailed card with historical context. Click a mosaic fragment and it reconstructs into the full image.

4. **Depth gauge** — a fixed sidebar showing current depth in meters and years. As you scroll deeper, the years count backward: 2024 → 1453 → 1204 → 330 → 657 BCE. The gauge itself is styled like a soil core sample.

5. **Color shift** — each stratum has a distinct palette that bleeds into the UI. Ottoman is deep teal + white + red. Byzantine is gold + purple. Roman is marble white + terracotta. Greek is ocean blue + clay.

## Palette — Earth & Empire

```text
Surface:    hsl(200, 15%, 75%)   -- concrete gray
Ottoman:    hsl(175, 40%, 25%)   -- imperial teal
Crusader:   hsl(35, 50%, 45%)    -- tarnished gold
Byzantine:  hsl(270, 45%, 30%)   -- Tyrian purple
Roman:      hsl(15, 50%, 55%)    -- terracotta
Greek:      hsl(210, 50%, 40%)   -- Aegean blue
Earth:      hsl(25, 30%, 20%)    -- dark soil
Bone:       hsl(40, 25%, 80%)    -- artifact cream
```

## Narrative Arc — 9 Sections

| # | ID | Section | Stratum |
|---|-----|---------|---------|
| 1 | `surface` | Modern Istanbul | Skyline silhouette. 15M people. Two continents. "Dig here." |
| 2 | `ottoman` | The Conqueror's City | Mehmed II, 1453. The walls fall. Hagia Sophia becomes a mosque. Süleyman's golden age. Tulip period. |
| 3 | `crusade` | The Sack | 1204. Fellow Christians loot the richest city on earth. Bronzes melted, relics stolen. A wound the city never fully healed. |
| 4 | `byzantine-peak` | The Golden City | Justinian's Hagia Sophia. Greek fire. The walls that held for 800 years. Mosaics of gold. The richest city in the medieval world. |
| 5 | `iconoclasm` | The Broken Images | 726–843. Icons smashed, faces scraped from walls. You find mosaic fragments in the rubble — literally broken art in the dig layer. |
| 6 | `constantine` | The New Rome | 330 CE. Constantine's founding. A new capital for a Christian empire. The hippodrome, the forums, the stolen obelisk. |
| 7 | `roman-outpost` | Before the Name | Byzantium under Rome — a provincial city on the strait. Strategic but unremarkable. Septimius Severus burns it; it rebuilds. |
| 8 | `greek` | Byzantion | 657 BCE. Greek colonists from Megara. "The land of the blind" — they ignored this perfect harbor. Fishing village on the Golden Horn. |
| 9 | `bedrock` | "Every city is a dig" | Pull back. The layers compress. All civilizations visible at once, stacked. The thesis: every place is layers of the forgotten. |

## New Components

| Component | Purpose |
|-----------|---------|
| `DigSection.tsx` | The core stratum component — handles the excavation reveal animation (clip-path wipe), dirt texture, artifact particles |
| `DepthGauge.tsx` | Fixed sidebar showing depth in meters + year, styled as a soil core sample |
| `ArtifactParticles.tsx` | Floating SVG shards (coins, pottery, bone) that drift upward as you scroll through earth layers |
| `ArtifactCard.tsx` | Expandable card triggered by clicking an artifact — shows illustration + historical context |
| `StratumTransition.tsx` | The "earth band" between sections with grain texture, embedded artifact icons, and color transition |
| `constantinopleData.ts` | Artifact definitions, stratum colors, depth values, timeline data |

## File Structure

```text
src/
  pages/Constantinople.tsx
  hooks/useConstantinopleScrollSpy.ts
  components/constantinople/
    SurfaceSection.tsx
    OttomanSection.tsx
    CrusadeSection.tsx
    ByzantinePeakSection.tsx
    IconoclasmSection.tsx
    ConstantineSection.tsx
    RomanOutpostSection.tsx
    GreekSection.tsx
    BedrockEpilogue.tsx
    ConstantinopleProgressTimeline.tsx  (styled as depth gauge)
    ConstantinopleSectionNav.tsx
  visuals/
    DigSection.tsx
    DepthGauge.tsx
    ArtifactParticles.tsx
    ArtifactCard.tsx
    StratumTransition.tsx
    constantinopleData.ts
```

## What makes this radically different

- **Scroll direction = excavation** — the metaphor is physical, not just visual. You are digging.
- **Dirt particles and clip-path reveals** — nothing else on the site does this. Each section feels like brushing away earth.
- **Artifacts as interactive elements** — clickable objects embedded in the strata, not just text cards floating over maps.
- **Depth gauge instead of timeline** — meters below surface + years, fixed to the side like an actual archaeological instrument.
- **Color shifts per stratum** — the entire page palette changes as you descend, from modern gray through Ottoman teal and Byzantine purple to Greek ocean blue.

## Implementation Order

1. `constantinopleData.ts` — artifacts, strata, colors, depths
2. `DigSection.tsx` + `StratumTransition.tsx` — the core excavation mechanic
3. `ArtifactParticles.tsx` + `ArtifactCard.tsx` — floating debris + clickable artifacts
4. `DepthGauge.tsx` — fixed depth/year sidebar
5. `useConstantinopleScrollSpy.ts` + nav components
6. All 9 section components
7. `Constantinople.tsx` page
8. Update `App.tsx` with `/constantinople` route
9. Update `Home.tsx` with new story card

**Estimated new files: 20 · Modified files: 2**

