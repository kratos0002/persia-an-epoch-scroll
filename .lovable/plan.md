
# Shaktipeeths-Only Redesign Plan

## Goal
Keep the content and section architecture, but completely re-art-direct the **Shaktipeeths essay only** so it feels ceremonial, luminous, and world-class rather than “good content inside a dark UI.”

## What feels wrong now
From the current code:
- `ShaktiPeeths.tsx` is structurally fine, but the page reads as a **stack of similar dark sections**
- `ShaktiSectionShell` gives every section the same rhythm, so the essay lacks escalation
- `SacredBodyAtlas` is strong in concept, but the filter chips + side panel make it feel **dashboard-ish**
- `ShaktiHero` has the right idea, but not enough **mythic atmosphere / lighting / ritual drama**
- `ShaktiProgressTimeline` and `ShaktiSectionNav` are functional, but visually generic compared to the essay’s subject
- current palette tokens are usable, but the essay needs a much stronger **lighting system**, not just different colors

## Implementation priorities

### 0. Fix the build first
- Fix `useShaktiScrollSpy.ts` typing so `activeSection` is typed from the full `SHAKTI_SECTIONS` union, not inferred as only `"shakti-hero"`
- This is a small baseline fix before any visual work

### 1. Rebuild the page atmosphere
Refine the essay’s visual language into a true **ritual chamber**:
- darker indigo-black base
- deeper vignette at edges
- localized lamp-glow pools behind major visuals
- richer gold/vermilion bloom
- more tactile smoke / grain / yantra geometry
- section-to-section light shifts so the essay “breathes”

Files:
- `src/pages/ShaktiPeeths.tsx`
- `src/index.css`
- possibly `tailwind.config.ts` only if new tokens are needed

### 2. Replace the “one-shell-fits-all” section feeling
Keep `ShaktiSectionShell`, but make it more flexible:
- support section variants like `heroic`, `ceremonial`, `atlas`, `ghost`, `epilogue`
- vary heading treatment, border language, spacing, and background framing
- add transition beats between major modules so the essay feels composed, not stacked

File:
- `src/components/shakti/ShaktiSectionShell.tsx`

### 3. Redesign the Hero into a mythic opening
Upgrade `ShaktiHero` from “nice intro” to the essay’s signature moment:
- stronger Sati silhouette / fragment-fall choreography
- land emerging out of darkness
- ritual glow concentrated around the body-field
- fewer UI-like pills; more editorial / ceremonial framing
- stronger calligraphic / sacred framing around the title

File:
- `src/components/shakti/ShaktiHero.tsx`

### 4. Rework the atlas so it feels sacred, not analytical
`SacredBodyAtlas` should become the emotional centerpiece:
- make the map panel feel like a **consecrated object**, not a chart container
- redesign filters as ritual toggles / segmented beads instead of standard pills
- strengthen marker hierarchy and hover/selection glow
- redesign the detail panel to feel like a shrine-card / lit folio
- improve composition so the anatomy overlay and geography feel fused

File:
- `src/components/shakti/SacredBodyAtlas.tsx`

### 5. Give each section its own visual grammar
Do not redesign the whole essay into one persistent map. Instead:
- `CanonWheelSection`: more mandala-like, less diagrammatic
- `AdiPeethasSection`: stronger four-direction cosmogram treatment
- `BengalBloomSection`: denser, more blooming / spreading visual language
- `CrossBorderSection`: more dramatic sacred-network-first / border-second reveal
- `PresenceFormsSection`: more sensory, object-like, less card-grid feeling
- `LostSitesSection`: more ghosted / unstable / flickering memory aesthetic
- `PilgrimageConstellationsSection`: stronger celestial / circuit animation

Files:
- all `src/components/shakti/*Section.tsx`

### 6. Redesign navigation chrome to match the essay
The timeline and drawer should feel like part of the ritual system:
- progress dots become beads / embers / yantra nodes
- stronger gold glow and less generic UI framing
- nav drawer becomes more like an illuminated side-manuscript / ritual index

Files:
- `src/components/shakti/ShaktiProgressTimeline.tsx`
- `src/components/shakti/ShaktiSectionNav.tsx`

### 7. Fix the immersion breakers at the end
The current generic badge/comments/footer likely flatten the finale.
For this essay only:
- restyle `EditionBadge` usage to feel less generic
- make comments/footer sit on a softer, integrated endcap
- preserve functionality, but visually absorb them into the Shakti world

Files likely touched:
- `src/pages/ShaktiPeeths.tsx`
- possibly shared components only if they already support variants cleanly

## Design target
The finished essay should feel like:
- a **lamp-lit ritual atlas**
- a **myth being mapped onto land in real time**
- a **sacred cosmogram** with changing visual systems
- not an app page, not a dashboard, not a generic dark-mode essay

## Execution order
1. Fix `useShaktiScrollSpy.ts` typing
2. Rebuild Shakti-only atmosphere in `index.css` + page wrapper
3. Redesign `ShaktiHero`
4. Redesign `SacredBodyAtlas`
5. Add section variants via `ShaktiSectionShell`
6. Upgrade the remaining Shakti section visuals one by one
7. Restyle Shakti timeline/nav/endcap for immersion

## Success criteria
After the redesign:
- the essay feels visually distinct even at a glance
- the atlas reads as sacred and premium, not UI-heavy
- lighting and depth carry as much weight as color
- every section has a memorable visual identity
- the existing content remains intact, but the presentation finally matches its ambition
