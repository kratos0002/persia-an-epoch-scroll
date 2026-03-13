

## New Essay: Nuclear Weapons — How Each Country Built the Bomb

### Essay Structure

**Title:** "The Chain Reaction"
**Subtitle:** "How Nine Countries Built the Bomb"
**Hook:** "The secret of the atom was unlocked once. Then it spread — through espionage, ambition, desperation, and pride — until nine nations held the power to end civilization."

**Visual Identity:** Dark teal/radiation-green palette. Think cold war bunker aesthetic — concrete, steel, Geiger counter green accents.

**Color tokens:**
- Background: `hsl(200, 25%, 6%)` (near-black with cold blue)
- Accent: `hsl(140, 70%, 45%)` (radiation green)
- Secondary: `hsl(45, 80%, 55%)` (uranium gold)

### Sections (10 sections)

1. **Hero** — "The Chain Reaction" — animated atom splitting visual (CSS/SVG, concentric rings fragmenting)
2. **Manhattan** — The United States, 1945. Trinity, Hiroshima. The physics, the race against Germany, Oppenheimer's "I am become death."
3. **Espionage** — The Soviet Union, 1949. Klaus Fuchs, the Rosenbergs, how Stalin's spies shortened the timeline by years.
4. **Empire's Last Card** — Britain, 1952. The fading empire's bid to stay at the table. Hurricane test, Christmas Island.
5. **Force de Frappe** — France, 1960. De Gaulle's insistence on sovereignty. Gerboise Bleue in the Sahara.
6. **The Dragon** — China, 1964. Mao's "paper tiger" logic. Project 596, built during famine.
7. **The Smiling Buddha** — India, 1974/1998. "Peaceful nuclear explosion," then Pokhran-II. The non-proliferation paradox.
8. **Chagai** — Pakistan, 1998. A.Q. Khan, centrifuge theft from the Netherlands, the rivalry with India. "We will eat grass."
9. **The Hermit's Bomb** — North Korea, 2006–2017. From plutonium to hydrogen. The world's most isolated nuclear state.
10. **The Ninth & The Shadow** — Israel's deliberate ambiguity. Vanunu, Dimona, "neither confirm nor deny." Plus: who tried and failed (South Africa, Libya, Iraq, Iran).
11. **Epilogue** — "The Chain Continues" — a counter showing current warhead counts, the nonproliferation regime, what comes next.

### Unique Visual Mechanic: **Countdown Clock**

A persistent timeline/progress element styled as a **nuclear countdown clock** — showing the year each nation tested, with a running count of "nations with the bomb" that increments as you scroll through each section.

### Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Nuclear.tsx` | Page component |
| `src/hooks/useNuclearScrollSpy.ts` | Scroll spy with sections |
| `src/components/nuclear/NuclearHero.tsx` | Animated atom-split hero |
| `src/components/nuclear/ManhattanSection.tsx` | USA section |
| `src/components/nuclear/EspionageSection.tsx` | Soviet Union |
| `src/components/nuclear/BritainSection.tsx` | UK |
| `src/components/nuclear/FranceSection.tsx` | France |
| `src/components/nuclear/ChinaSection.tsx` | China |
| `src/components/nuclear/IndiaSection.tsx` | India |
| `src/components/nuclear/PakistanSection.tsx` | Pakistan |
| `src/components/nuclear/NorthKoreaSection.tsx` | North Korea |
| `src/components/nuclear/ShadowSection.tsx` | Israel + who failed |
| `src/components/nuclear/NuclearEpilogue.tsx` | Epilogue + warhead counter |
| `src/components/nuclear/NuclearProgressTimeline.tsx` | Right-side countdown clock |
| `src/components/nuclear/NuclearSectionNav.tsx` | Left hamburger nav |
| `src/components/visuals/AtomSplit.tsx` | Hero animation (CSS rings) |
| `src/components/visuals/WarheadCounter.tsx` | Animated warhead count |

### Files to Modify

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/nuclear` route |
| `src/pages/Home.tsx` | Add story card (number 10) |
| `src/lib/editions.ts` | Add `nuclear` edition entry |

### Content Depth

Each section follows the established pattern: ~800-1200 words of narrative prose with:
- A key historical image or visual element
- Pull quotes from key figures (Oppenheimer, Bhutto, Mao, de Gaulle)
- Specific dates, yields, and technical details woven into story
- Transitions that connect each nation's program to the geopolitical chain reaction

This is Essay #10. Estimated ~20 new files, following exact patterns from Napoleon/Rebellion essays.

