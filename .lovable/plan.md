

# Nuclear Essay Visual Overhaul

## Problem
Every section is the same: centered header → `RevealOnScroll` paragraphs → maybe a small bar chart. No section has a distinctive visual identity. Compared to Napoleon (CoalitionBoard, battle maps, army ribbons) or Rebellion (Leaflet wavefront maps), this essay is visually flat.

## Approach
Give each of the 9 nations (plus Shadow and Epilogue) a unique, section-specific animated visual. Convert several sections to use `StickyScroll` (text scrolls alongside a pinned graphic) for the most visual-heavy stories. Lighter sections get embedded SVG/canvas visuals that animate on scroll.

## Section-by-Section Visual Plan

### 1. Manhattan (USA) — `StickyScroll` with "Trinity Fireball" graphic
- Sticky SVG: animated expanding fireball + shockwave rings. Steps progress from Einstein's letter → Los Alamos → Trinity flash → Hiroshima/Nagasaki yield comparison.
- The fireball grows with each step; final step shows concentric blast radii over a schematic city grid.

### 2. Espionage (USSR) — `StickyScroll` with "Spy Network" graphic
- Sticky SVG: a schematic showing documents flowing from Los Alamos (left) to Moscow (right) through spy nodes (Fuchs, Hall, Rosenbergs).
- Steps reveal each spy node, animate dashed "intelligence flow" lines, and compress a "10 years → 4 years" timeline bar.

### 3. Britain — Embedded "Empire Fade" visual
- SVG world map silhouette showing British Empire territories fading out one by one (India, Palestine, Suez), while a single nuclear warhead icon stays lit. Reinforces the "last card" narrative.
- Animated on scroll-in-view.

### 4. France — Embedded "Yield Comparison" towers
- Replace flat bar chart with vertical "mushroom cloud" tower comparison — four animated columns rising to different heights (Trinity 21kt, RDS-1 22kt, Hurricane 25kt, Gerboise Bleue 70kt). France's tower dramatically taller with a tricolor glow.

### 5. China — `StickyScroll` with "Fission-to-Fusion Race" graphic
- Sticky visual: a countdown/race track showing USA, USSR, UK, and China as horizontal runners. China's lane is highlighted in red, showing the fastest sprint from fission to fusion.
- Steps cover Sino-Soviet split, Project 596, Lop Nur test, thermonuclear breakthrough.

### 6. India — Embedded "Seismic Pulse" visual
- SVG showing a stylized cross-section of the Thar Desert with an underground detonation. Animated seismic waves radiate outward. A "Smiling Buddha" codename label with the Indian tricolor saffron accent.
- Second pulse for 1998 Shakti tests.

### 7. Pakistan — Embedded "Response Clock" visual
- Central animated countdown clock face showing "17 days" between India's test and Pakistan's response. Clock hand sweeps, then the Chagai mountain silhouette goes white.
- Below: animated A.Q. Khan proliferation network — lines radiating from Pakistan to Libya, Iran, North Korea.

### 8. North Korea — `StickyScroll` with "Escalating Yields" seismograph
- Sticky visual: a seismograph-style line chart. Each test (2006→2017) triggers a progressively larger spike. The 2017 spike is massive, filling the screen.
- Steps narrate dynasty survival logic, NPT withdrawal, test series.

### 9. Shadow (Israel) — Embedded "Redacted Dossier" visual
- SVG styled as a classified document with redacted black bars. As user scrolls, bars partially lift to reveal facts (Dimona, Vanunu, 80-90 warheads). Some bars never fully lift.
- Below the Israel section: "Those who tried" gets small flag icons for South Africa, Libya, Iraq, Iran — each with a status line (dismantled, abandoned, destroyed, threshold).

## New Visual Components to Create
1. `TrinityFireball.tsx` — expanding SVG fireball + blast radii
2. `SpyNetwork.tsx` — document-flow network diagram
3. `EmpireFade.tsx` — world map with fading territories
4. `YieldTowers.tsx` — vertical mushroom cloud comparison
5. `FissionFusionRace.tsx` — horizontal race track
6. `SeismicPulse.tsx` — underground detonation cross-section
7. `ResponseClock.tsx` — 17-day countdown + proliferation network
8. `SeismographChart.tsx` — escalating test yields
9. `RedactedDossier.tsx` — classified document with lifting bars

## Implementation Order
1. Create all 9 visual components (pure SVG + framer-motion, no external deps)
2. Refactor Manhattan, Espionage, China, North Korea to use `StickyScroll` layout
3. Embed remaining visuals into their respective sections
4. Update section backgrounds with subtle per-nation tinting for better visual differentiation

## Technical Notes
- All visuals are pure SVG + framer-motion (no images, no external libraries needed)
- `StickyScroll` is already battle-tested from Napoleon/Rebellion essays
- Each nation gets a distinct accent color (already defined in each section)
- Mobile: `StickyScroll` graphic sits above text on small screens (existing behavior)

