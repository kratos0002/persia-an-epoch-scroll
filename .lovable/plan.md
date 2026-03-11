

# Essay 3: The Path That Split — The Spread of Buddhism

## Concept

A scrollytelling essay at `/buddhism` tracing Buddhism from Siddhartha's awakening in Lumbini (~528 BCE) through its geographic spread and doctrinal branching into Theravada, Mahayana, and Vajrayana. Two signature visuals alternate: a **branching tree** (SVG) for doctrinal splits and an **InteractiveMap** for geographic spread.

**Color palette — Saffron & Stone:**
```text
Primary:      hsl(30, 65%, 45%)   -- saffron/burnt orange
Accent:       hsl(43, 70%, 55%)   -- gold (statues, enlightenment)
Stone:        hsl(25, 15%, 40%)   -- warm gray-brown (monasteries)
Theravada:    hsl(35, 75%, 50%)   -- deep saffron
Mahayana:     hsl(350, 50%, 45%)  -- crimson/maroon
Vajrayana:    hsl(270, 45%, 45%)  -- deep purple
Zen:          hsl(150, 25%, 35%)  -- moss green
```

## Narrative Arc — 10 Sections

1. **Hero** — "The Path That Split"
2. **Awakening** — Siddhartha under the Bodhi tree (528 BCE). Four Noble Truths + Eightfold Path as a scroll-driven wheel that draws its spokes.
3. **Ashoka** — The emperor who made it global (268 BCE). Map: missionaries radiate from Pataliputra.
4. **The First Split** — Theravada vs Mahayana (1st century CE). Branching tree: single trunk divides.
5. **The Southern Path** — Theravada spreads to Sri Lanka, Myanmar, Thailand, Cambodia, Laos. Map with route lines. Doctrinal sidebar: "the elder's way."
6. **The Northern Path** — Mahayana spreads along the Silk Road to China, Korea, Japan. Map. Doctrinal sidebar: bodhisattva ideal, sutras.
7. **The Diamond Path** — Vajrayana emerges in Tibet, Mongolia, Bhutan. Tree grows a third branch. Doctrinal: tantric practices, the Dalai Lama lineage.
8. **The Branches Within** — Zen, Pure Land, Nichiren, Tibetan schools. Tree fully branched. Each sub-branch highlighted on scroll.
9. **Modern Buddhism** — Western adoption, mindfulness movement, current demographics. Map showing global presence.
10. **Epilogue** — "One teaching, a thousand forms."

## File Structure

```text
src/
  pages/
    Buddhism.tsx
  hooks/
    useBuddhismScrollSpy.ts
  components/
    buddhism/
      BuddhismHero.tsx
      AwakeningSection.tsx
      AshokaSection.tsx
      FirstSplitSection.tsx
      TheravadaSection.tsx
      MahayanaSection.tsx
      VajrayanaSection.tsx
      BranchesSection.tsx
      ModernBuddhismSection.tsx
      BuddhismEpilogue.tsx
      BuddhismProgressTimeline.tsx
      BuddhismSectionNav.tsx
    visuals/
      BranchingTree.tsx        -- NEW: signature SVG tree visual
      DharmaWheel.tsx          -- NEW: scroll-driven Eightfold Path wheel
      buddhismMapData.ts       -- NEW: cities, routes, territories for Buddhism
```

## Unique Visual Mechanics Per Section

| Section | Visual | Mechanic |
|---------|--------|----------|
| Hero | Lotus SVG | Petals unfold on scroll (stroke-dashoffset), title reveals |
| Awakening | DharmaWheel | 8-spoked wheel draws spokes one by one as user scrolls; each spoke labeled with a path |
| Ashoka | InteractiveMap | Missionary routes radiate from Pataliputra, cities highlight per step |
| First Split | BranchingTree | Single trunk, first fork draws (Theravada left, Mahayana right) |
| Southern Path | InteractiveMap | Route lines draw south: Sri Lanka → Myanmar → Thailand → Cambodia |
| Northern Path | InteractiveMap | Route lines draw along Silk Road: Gandhara → China → Korea → Japan |
| Diamond Path | BranchingTree | Third branch grows upward (Vajrayana), Tibet/Mongolia highlighted |
| Branches Within | BranchingTree | Full tree with sub-branches: Zen, Pure Land, Nichiren, Tibetan schools. Each highlights on scroll step |
| Modern | InteractiveMap | Global view, dots appear worldwide, animated counter for ~500M practitioners |
| Epilogue | BranchingTree | Full tree pulses gently, all branches lit |

## New Components

### `BranchingTree.tsx`
The signature visual. An SVG tree that grows as the user scrolls through the essay:
- Props: `activePhase: number`, `highlightBranch?: string`, `progress?: number`
- Phase 0: Trunk only (early Buddhism)
- Phase 1: First fork — Theravada (saffron, left) and Mahayana (crimson, right)
- Phase 2: Vajrayana branch grows (purple, upward from Mahayana)
- Phase 3: Sub-branches sprout — Zen (green), Pure Land (gold), Nichiren, Tibetan schools
- Each branch uses `stroke-dashoffset` animation. Nodes at branch tips labeled with school names.
- `highlightBranch` makes one branch glow and dims others.

### `DharmaWheel.tsx`
Scroll-driven 8-spoked wheel:
- Props: `activeStep: number`
- Each step reveals one spoke with its label (Right View, Right Intention, etc.)
- Center hub glows gold when all 8 are revealed
- Outer rim draws as a circle with `stroke-dashoffset`

### `buddhismMapData.ts`
New map data file with:
- Cities: Lumbini, Bodh Gaya, Sarnath, Pataliputra, Anuradhapura, Bagan, Ayutthaya, Angkor, Nalanda, Gandhara, Dunhuang, Chang'an, Nara, Kyoto, Lhasa, Ulaanbaatar
- Routes: Southern (India → Sri Lanka → SE Asia), Northern (India → Silk Road → China → Korea → Japan), Tibetan (India → Tibet → Mongolia)
- No territory polygons needed — routes are the story

## Map Integration

Reuse existing `InteractiveMap` component. Add a new `buddhism` empire ID to the map system, or more likely: pass custom `center`, `zoom`, `highlightCities` props without territory polygons (the routes will be overlaid via the tree/flow visual, keeping the map clean).

## Implementation Order

1. Create `useBuddhismScrollSpy.ts` + nav/timeline components
2. Create `BranchingTree.tsx` — the signature visual
3. Create `DharmaWheel.tsx` — the Eightfold Path wheel
4. Create `buddhismMapData.ts` — city/route data
5. Create all 10 section components
6. Create `Buddhism.tsx` page
7. Update `App.tsx` with `/buddhism` route
8. Update `Home.tsx` STORIES array — replace Mongol or Byzantium placeholder

## Estimated New Files: 16
## Estimated Modified Files: 2 (App.tsx, Home.tsx)

