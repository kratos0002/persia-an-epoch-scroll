

# Epoch Lives: The History of Persia
## A pudding.cool-style scrollytelling visual essay

### Concept
A 20+ section immersive scrollytelling page covering Persia from Cyrus the Great (~550 BCE) to Modern Iran (2020s). Each era uses a distinct interaction pattern — scroll-triggered reveals, animated maps, data visualizations, and immersive full-screen scenes — creating a cinematic journey through 2,500+ years of history.

---

### Scroll Engine & Architecture
- Custom scroll-progress tracker using IntersectionObserver + scroll position
- Sticky containers with layered content that transforms based on scroll %
- Smooth parallax system with configurable depth layers
- Progress indicator bar along the side showing your journey through time

---

### Sections (20+ eras, grouped by interaction style)

**Opening — Immersive Scene**
1. **Hero / Title Card** — Full-screen cinematic intro with animated Persian geometric patterns, title "The History of Persia: 2,500 Years of Civilization", fades into a timeline spine

**Act I: The Rise — Scroll-Triggered Reveals + Maps**
2. **Cyrus the Great (550 BCE)** — Animated map showing Achaemenid expansion from Persis outward, with sticky text panels revealing as territory grows
3. **Pasargadae & the Cyrus Cylinder** — Image placeholder section with parallax, highlighting the first declaration of human rights
4. **Darius I & Persepolis** — Split-screen: left shows architectural details (placeholder images), right scrolls through achievements (Royal Road, postal system, Daric currency)
5. **The Persian Wars (499-449 BCE)** — Data viz: timeline chart of battles (Marathon, Thermopylae, Salamis) with animated map showing Greek vs Persian forces

**Act II: Fall & Rebirth — Interactive Timeline + Charts**
6. **Alexander's Conquest (334-330 BCE)** — Animated map with Alexander's march path drawing itself, empire colors morphing from Achaemenid to Macedonian
7. **The Seleucids & Parthians** — Horizontal scroll timeline showing the transition period, with data chart of territorial control over time
8. **The Parthian Empire (247 BCE - 224 CE)** — Map showing Parthia vs Rome rivalry, with animated arrows showing trade routes (Silk Road)

**Act III: Golden Age — Immersive Scenes + Data Viz**
9. **The Sassanid Empire (224-651 CE)** — Full-screen scene transitions: Zoroastrian fire temples, art, architecture placeholders with scroll-morph effects
10. **Sassanid vs Rome/Byzantium** — Animated bar chart race showing territorial control shifts over centuries
11. **The Islamic Conquest (633-654 CE)** — Map animation showing the rapid expansion, with a "before/after" cultural comparison panel

**Act IV: Islamic Golden Age — Charts + Reveals**
12. **Persian Renaissance under Islam** — Scrolling gallery of contributions: algebra, medicine, poetry, astronomy — each revealed with animated counters/charts
13. **Ferdowsi & the Shahnameh (1010 CE)** — Literary timeline with quote reveals, parallax illustrated scenes (placeholder)
14. **The Mongol Invasion (1219-1221)** — Dramatic map animation of Mongol destruction path, with population data chart showing impact

**Act V: Empire Returns — Maps + Immersive**
15. **The Safavid Empire (1501-1736)** — Map showing unification, sticky section on Isfahan as "Half the World", architectural image placeholders
16. **Safavid Culture & Art** — Gallery-style scroll with Persian miniature placeholders, ceramic patterns built in CSS
17. **The Afsharid & Qajar Dynasties** — Compressed timeline with key events, transitional section

**Act VI: Modern Era — All Techniques Combined**
18. **Constitutional Revolution (1905-1911)** — Newspaper-style reveal with scroll-triggered "headlines"
19. **Pahlavi Dynasty & Modernization** — Before/after comparison panels, data charts (literacy, infrastructure, oil revenue)
20. **The 1979 Revolution** — Full-screen immersive scene with dramatic color palette shift, timeline of key events
21. **Modern Iran** — Data dashboard section: population, culture, global influence charts using Recharts
22. **Legacy & Epilogue** — Zoomed-out timeline showing all 2,500 years at once, animated final sequence connecting past to present

---

### Visual Design System
- **Color palette**: Deep Persian blues, golds, warm terracottas, transitioning between eras (ancient = warm gold/sandstone → medieval = deep blue/emerald → modern = muted contemporary tones)
- **Typography**: Elegant serif for headings, clean sans-serif for body, with Persian-inspired decorative dividers built in CSS
- **Persian geometric patterns**: CSS-generated motifs used as backgrounds, dividers, and decorative elements
- **Maps**: SVG-based animated maps of the Persian/Iranian region with territory overlays that animate on scroll
- **Charts**: Recharts-powered data visualizations (area charts for territory, bar charts for population, timeline charts for events)
- **Image placeholders**: Styled containers with era-appropriate color schemes, ready for real historical images/artwork

### Animations & Interactions
- Scroll-linked CSS transforms for parallax depth
- SVG path drawing animations for map routes and borders
- Number counters that animate when scrolled into view
- Sticky text panels that swap while background visuals transform
- Color palette transitions between eras using CSS custom properties
- Fade/scale/slide reveals using IntersectionObserver
- Progress bar showing chronological position (550 BCE → 2020s)

### Technical Approach
- No external animation libraries — pure CSS animations + IntersectionObserver + scroll events
- SVG maps with animated paths for empire territories
- Recharts for data visualizations
- CSS custom properties for era-based theming transitions
- Responsive design with mobile-optimized scroll interactions

