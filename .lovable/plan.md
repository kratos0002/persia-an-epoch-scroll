

# Enhance Mongol India Essay: Add Visualizations and Rich Graphics

The essay structure is solid but sections are text-heavy without the immersive visuals that other essays (Napoleon, Persia) deliver. Here is the plan to bring each section to the visual standard.

## Section-by-Section Enhancements

### 1. Indus Section — Add a Pursuit Map
Add a `StickyScroll` with an SVG showing Genghis's chase route from Samarkand south to the Indus River. Three steps:
- Step 0: Route from Samarkand through Balkh (cities burning)
- Step 1: Crossing the Hindu Kush into the Punjab
- Step 2: The Indus cliff scene — a dramatic silhouette of the prince leaping

The SVG graphic draws the pursuit route progressively and animates city markers as "destroyed" (glow → dim).

### 2. Waves Section — Make the Map Visible
The SVG map exists but is nearly invisible. Fix:
- Increase terrain opacity and contrast (mountains should be visible ridgelines)
- Add city markers with labeled dots (glowing when active)
- Make invasion route arrows thicker, animated with `strokeDashoffset`, and color-coded by era
- Add a subtle grid/texture to the map background

### 3. Khalji Section — Add a Military Reform Infographic
Convert to `StickyScroll` with a custom SVG graphic on the left:
- Step 0: "Before" — scattered feudal levy icons (disorganized)
- Step 1: "Standing Army" — organized ranks with a central treasury symbol
- Step 2: "Price Controls" — price tags dropping (100→25)
- Step 3: "Intelligence Network" — web of connected nodes along the frontier
- Step 4: "Frontier Forts" — fort icons lighting up along the northwest border

### 4. Battles Section — Add Tactical Battle Diagrams
Each HorizontalScroll panel gets an SVG tactical map (similar to Austerlitz in Napoleon essay):
- **Kili (1299)**: Two force blocks facing off near Delhi, with the larger Mongol force shown breaking apart
- **Amroha (1305)**: Encirclement diagram — Khalji's forces surrounding the Mongol raiding column
- **Ravi (1306)**: River crossing ambush — Mongols caught at the river

Each diagram uses animated unit blocks (rectangles) with movement arrows, similar to `AusterlitzBattleMap`.

### 5. WhySurvived Section — Add Animated Visual Comparison
Add a comparison visualization:
- Four SVG "dials" or bar charts that animate when scrolled into view
- A small silhouette map showing the 2,000km distance from Khyber to Delhi vs Baghdad's proximity to the frontier
- Use `AnimatedCounter` properly (currently the values are static strings, not animated numbers)

### 6. Price Section — Add Surveillance State Graphic
Add an SVG showing three overlapping spy network circles over a city grid, with "watching eyes" at nodes. Animates as you scroll — the network tightens, representing the paranoid state Khalji built.

## Technical Approach

### New components to create:
- `src/components/visuals/PursuitMap.tsx` — SVG for Indus section
- `src/components/visuals/KhaljiReformGraphic.tsx` — StickyScroll graphic for Khalji section  
- `src/components/visuals/BattleDiagram.tsx` — Reusable tactical SVG for each battle (Kili, Amroha, Ravi)
- `src/components/visuals/SurveillanceGraphic.tsx` — SVG for Price section

### Files to modify:
- `IndusSection.tsx` — Wrap in StickyScroll with PursuitMap
- `WavesSection.tsx` — Fix SVG visibility (opacity, stroke width, city labels)
- `KhaljiSection.tsx` — Convert to StickyScroll with reform graphic
- `BattlesSection.tsx` — Add BattleDiagram to each panel
- `WhySurvivedSection.tsx` — Add comparison visualization, fix AnimatedCounter usage
- `PriceSection.tsx` — Add SurveillanceGraphic

### No new dependencies needed
All visuals use existing framer-motion + SVG patterns already established in the codebase.

