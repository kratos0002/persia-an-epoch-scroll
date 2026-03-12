

# Persistent Sticky Map — India States Essay

## Current Problem
The IndiaMap renders inline within individual sections (Hero, Patel, Linguistic, Present, Epilogue). It appears, disappears, and reappears as you scroll — breaking the core promise of watching 565 states become 28 in real time.

## Design

The map becomes a **full-height sticky background** that lives for the entire essay. Narrative text scrolls over it in floating cards. The map's `era` prop is driven by `activeSection` from the scroll spy.

```text
┌──────────────────────────────────────────┐
│                                          │
│   ┌─────────────┐    ┌────────────────┐  │
│   │             │    │  Narrative     │  │
│   │   STICKY    │    │  card scrolls  │  │
│   │   INDIA     │    │  over the map  │  │
│   │   MAP       │    │               │  │
│   │  (changes   │    └────────────────┘  │
│   │   era as    │                        │
│   │   you       │    ┌────────────────┐  │
│   │   scroll)   │    │  Next section  │  │
│   │             │    │  card          │  │
│   └─────────────┘    └────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

## Changes

### 1. `IndiaStates.tsx` — Add sticky map layer
- Add a `position: fixed` full-viewport `IndiaMap` behind everything, driven by `activeSection` as its `era`
- Derive `highlightIds` from `activeSection` (e.g., holdouts highlights `jk`, `la`)
- Add a dynamic legend overlay that changes per era

### 2. All 10 section components — Convert to transparent overlay cards
Each section loses its opaque background and inline map instances. Instead:
- Semi-transparent card containers (`bg-black/60 backdrop-blur`) float on the right side (or bottom on mobile)
- Text content stays, but the section background becomes transparent so the sticky map shows through
- Remove all inline `<IndiaMap>` instances from Hero, Patel, Linguistic, Present, Epilogue
- Each section keeps its `id` for scroll spy targeting

### 3. `IndiaMap.tsx` — Remove AnimatePresence `mode="wait"`
- Change to smoother color transitions without full unmount/remount of paths
- Use a stable key per location (not `${era}-${location.id}`) so paths animate fill color rather than exit/enter

### 4. Mobile handling
- On mobile (<768px), the map stays sticky at ~40vh top, cards scroll below it
- Map opacity slightly reduced on mobile for readability

## Section → Era + Highlight mapping
| Section | Era | Highlights |
|---------|-----|------------|
| patchwork | patchwork | none |
| midnight | midnight | none |
| patel | patel | jk, la |
| holdouts | holdouts | jk, la |
| abcd | abcd | none |
| linguistic | linguistic | none |
| splits | splits | none |
| new-states | new-states | tg, jh, cg, uk |
| present | present | none |
| india-epilogue | present (cycling) | none |

## Files modified
- `src/pages/IndiaStates.tsx` — sticky map layer + era/highlight derivation
- `src/components/visuals/IndiaMap.tsx` — stable keys, smooth transitions
- `src/components/india/IndiaHero.tsx` — remove inline map, transparent bg
- `src/components/india/MidnightSection.tsx` — transparent card overlay
- `src/components/india/PatelSection.tsx` — remove inline map, card overlay
- `src/components/india/HoldoutsSection.tsx` — card overlay
- `src/components/india/AbcdSection.tsx` — card overlay
- `src/components/india/LinguisticSection.tsx` — remove inline map, card overlay
- `src/components/india/SplitsSection.tsx` — card overlay
- `src/components/india/NewStatesSection.tsx` — card overlay
- `src/components/india/PresentSection.tsx` — remove inline map, card overlay
- `src/components/india/IndiaEpilogue.tsx` — remove inline map, card overlay

**12 files modified, 0 new files**

