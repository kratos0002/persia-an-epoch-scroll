

# Essay 2: The House of Wisdom

## Concept

A self-contained scrollytelling essay at `/wisdom` about the Bayt al-Hikma in Baghdad (c. 762-1258 CE). The visual mechanic: **a living library** -- the reader scrolls through "shelves" of knowledge, watching ideas flow from Greek manuscripts to Arabic translations to European enlightenment. The dominant color is deep emerald/teal (`hsl(170, 40%, 30%)`) with gold accents for illuminated manuscripts.

The narrative arc:
1. Baghdad is founded (762 CE) -- the Round City
2. Harun al-Rashid begins collecting (786 CE)
3. Al-Ma'mun formalizes the House of Wisdom (830 CE)
4. The Translation Movement -- Greek, Persian, Indian texts
5. The Scholars -- al-Khwarizmi, al-Kindi, Hunayn ibn Ishaq, Banu Musa
6. What They Built -- algebra, algorithms, optics, medicine
7. The Ripple -- how this knowledge reached Europe
8. The Destruction -- Mongol siege of 1258, Tigris runs black with ink
9. Epilogue -- what survived, what we lost

## Visual Mechanic

Unlike the Persia essay (which is map-centric), this essay's primary visual is a **knowledge graph** -- an animated network of interconnected nodes representing texts, scholars, and disciplines. As the reader scrolls:
- Nodes appear and connect (Greek texts → translators → Arabic works → European scholars)
- The network grows denser during the Golden Age sections
- It shatters during the Mongol section

Secondary visuals: a Leaflet map of Baghdad + the Translation Movement's geographic reach, scroll-driven SVG calligraphy reveals, and animated counters for shocking data points.

## File Structure

```text
src/
  pages/
    HouseOfWisdom.tsx          -- Essay page (like Index.tsx for Persia)
  hooks/
    useWisdomScrollSpy.ts      -- Section definitions for this essay
  components/
    wisdom/
      WisdomHero.tsx           -- Hero with calligraphy reveal
      RoundCitySection.tsx     -- Baghdad founded, map of the Round City
      HarunSection.tsx         -- Harun al-Rashid, collecting begins
      TranslationSection.tsx   -- The Translation Movement (StickyScroll + map)
      ScholarsSection.tsx      -- Individual scholar profiles
      InventionsSection.tsx    -- What they built (algebra, optics, medicine)
      RippleSection.tsx        -- Knowledge reaching Europe
      DestructionSection.tsx   -- 1258 Mongol siege
      WisdomEpilogue.tsx       -- What survived
    visuals/
      KnowledgeGraph.tsx       -- Animated SVG network graph (the signature visual)
```

## Sections in Detail

### 1. Hero -- "The Library That Lit the World"
- Full-screen, deep teal/emerald background
- Arabic calligraphy بَيْت الْحِكْمَة fades in as SVG, then the English title reveals line-by-line on scroll
- Hook: "For 400 years, one building in Baghdad held more knowledge than all of Europe combined."
- Scroll indicator

### 2. The Round City (762 CE)
- RevealOnScroll text: Al-Mansur builds Baghdad as a perfect circle. The center of the world by design.
- Visual: Leaflet map zoomed on Baghdad showing the circular city layout
- Data point: "Population: 1,000,000+ — the world's largest city"

### 3. The Collector (786 CE)
- RevealOnScroll: Harun al-Rashid begins. Every military victory brings back not gold, but books.
- "He demanded one thing from the defeated Byzantines: manuscripts."

### 4. The Translation Movement (830 CE) -- StickyScroll
- **Sticky visual**: KnowledgeGraph showing nodes for Greek texts (Aristotle, Euclid, Galen, Ptolemy) connecting to translator nodes (Hunayn ibn Ishaq, Thabit ibn Qurra) connecting to Arabic works
- Step 1: "Al-Ma'mun paid translators the weight of their books in gold."
- Step 2: "Hunayn ibn Ishaq translated 116 works. He invented an entire medical vocabulary."
- Step 3: "They didn't just translate. They corrected Ptolemy. They extended Euclid. They argued with Aristotle."

### 5. The Scholars -- Individual profiles
- RevealOnScroll cards with the same border-left style as the Persia essay's Golden Age luminaries
- al-Khwarizmi (algebra, algorithms), al-Kindi (cryptanalysis, philosophy), Banu Musa brothers (automata, engineering), al-Razi (medicine, chemistry), Ibn al-Haytham (optics)
- Each with a "surprising fact" hook

### 6. What They Built -- Data visualization
- Animated counters: "Texts translated: 10,000+", "Fields invented: 4" (algebra, algorithms, optics, cryptanalysis)
- SVG scroll-driven visualization showing the flow: Greek → Arabic → Latin → European Renaissance

### 7. The Ripple
- RevealOnScroll: How the knowledge traveled -- through Toledo, Sicily, the Crusades
- "Every time you use the word 'algebra,' 'algorithm,' 'alchemy,' 'almanac,' or 'zenith' -- you're speaking Arabic."

### 8. The Destruction (1258 CE)
- Full-screen dramatic moment. Red overlay (like Mongol section in Persia essay).
- "The Tigris ran black with ink for six months."
- AnimatedCounter: "Books destroyed: estimated 3,000,000"
- "Scholars thrown into the river alongside their life's work."

### 9. Epilogue
- "But knowledge, once released, cannot be un-known."
- Credits, sources, methodology

## Color System

```text
Era color: hsl(170, 40%, 30%)  -- deep teal/emerald
Accent:    hsl(43, 85%, 55%)   -- gold (for illuminated manuscript feel)
Destruction: hsl(0, 70%, 45%)  -- crimson for Mongol section
```

## Routing & Home Page Updates

- Add route `/wisdom` in App.tsx
- Update STORIES array in Home.tsx: replace one placeholder (Byzantium) with House of Wisdom as story #2, status `'live'`, href `/wisdom`
- Tags: `['Visual Essay', 'Knowledge Graph', '762–1258 CE']`

## Reused Components

All existing infrastructure is reused directly:
- `StickyScroll`, `RevealOnScroll`, `ParallaxLayer` from scroll system
- `InteractiveMap` with a new city set (Baghdad, Toledo, Cordoba, Palermo, Constantinople)
- `EraTransition` between sections
- `AnimatedCounter` for data moments
- `HistoricalImage` for manuscript images
- `SiteHeader`/`SiteFooter` for consistent navigation
- A new `useWisdomScrollSpy` hook (same pattern as `useScrollSpy`) with this essay's sections
- A new `WisdomProgressTimeline` and `WisdomSectionNav` (or make existing ones configurable via props)

## New Component: KnowledgeGraph

The signature visual. An SVG-based animated network:
- Nodes = circles with labels (scholars, texts, disciplines)
- Edges = animated lines connecting them
- Accepts `activePhase: number` and `progress: number` props
- Phase 0: Greek texts appear (Aristotle, Euclid, Galen, Ptolemy) on the left
- Phase 1: Translator nodes appear in center, edges draw from left to center
- Phase 2: Arabic works appear on right, edges draw from center to right
- Phase 3: European nodes appear far right, edges draw through
- Uses framer-motion for node entrance and SVG `stroke-dashoffset` animation for edge drawing
- On destruction phase: nodes shake and fade, edges break

## Implementation Order

1. Create `useWisdomScrollSpy.ts` with section definitions
2. Create `KnowledgeGraph.tsx` -- the animated SVG network
3. Create all 9 section components
4. Create `HouseOfWisdom.tsx` page assembling everything
5. Update `App.tsx` with `/wisdom` route
6. Update `Home.tsx` STORIES array
7. Make SectionNav/ProgressTimeline accept configurable sections (or create essay-specific versions)

