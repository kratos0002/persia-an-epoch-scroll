

# Indian Miniature Painting Aesthetic for Ramayana Essay

## The Vision

Indian miniature paintings (Mughal, Rajput, Pahari schools) have a distinct visual language: **warm parchment grounds**, **flat jewel-toned fills**, **ornate borders with geometric/floral frames**, **gold leaf accents**, and **text panels that look like manuscript folios**. The goal is to make scrolling through this essay feel like leafing through an illustrated manuscript — each stop is a "folio" in a painted codex.

## What Changes

### 1. Color Palette Overhaul

Replace the current dark-mode earth tones with a **warm manuscript palette**:

```text
Current (dark mode)              →  New (miniature painting)
─────────────────────────────────────────────────────────────
EARTH: hsl(25, 30%, 10%)        →  PARCHMENT: hsl(38, 45%, 88%)
SAFFRON: hsl(25, 85%, 52%)      →  VERMILLION: hsl(8, 78%, 48%)
SANDSTONE: hsl(35, 40%, 85%)    →  INK: hsl(25, 40%, 15%)
GOLD: hsl(43, 80%, 55%)         →  GOLD_LEAF: hsl(43, 90%, 52%)
                                    ULTRAMARINE: hsl(220, 65%, 35%)
                                    MALACHITE: hsl(155, 50%, 32%)
                                    LAKE (pink): hsl(340, 55%, 52%)
```

All text flips to dark-on-light. The entire page becomes a warm, illuminated surface.

### 2. Map Tile Layer

Replace `dark_nolabels` with **Stamen Watercolor** tiles (`https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg`). These look hand-painted — earthy, textured, no modern cartographic lines. The route polyline switches from saffron-on-dark to **vermillion-on-parchment** with a gold glow underneath.

Alternatively, if Stamen Watercolor feels too loose, use a **desaturated warm vintage** tile: `https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png` with a CSS `filter: sepia(0.3) saturate(0.8) hue-rotate(-5deg)` overlay to warm it.

### 3. Left Panel → Manuscript Folio

The left panel transforms from a dark sidebar to a **painted manuscript page**:

```text
┌─ ornate border (SVG pattern) ────────────┐
│  ┌─ inner border (gold rule) ──────────┐ │
│  │                                     │ │
│  │  ╔═══════════════════════╗          │ │
│  │  ║  Sanskrit-style       ║  ← red   │ │
│  │  ║  chapter heading      ║    band   │ │
│  │  ╚═══════════════════════╝          │ │
│  │                                     │ │
│  │  [Miniature illustration frame]     │ │
│  │  ┌─────────────────────────┐        │ │
│  │  │                         │        │ │
│  │  │   image / placeholder   │        │ │
│  │  │                         │        │ │
│  │  └─────────────────────────┘        │ │
│  │                                     │ │
│  │  Body text in dark ink on parchment │ │
│  │                                     │ │
│  │  ┌── "Today" block ──────────┐      │ │
│  │  │  (styled as a marginal    │      │ │
│  │  │   note / gloss)           │      │ │
│  │  └───────────────────────────┘      │ │
│  │                                     │ │
│  └─────────────────────────────────────┘ │
│  folio number: "१३" (Devanagari)         │
└──────────────────────────────────────────┘
```

Key elements:
- **Outer border**: An SVG `<pattern>` with a simplified floral/geometric miniature border (lotus + vine motif, painted in vermillion + gold)
- **Inner frame**: A thin gold-leaf rule line
- **Title band**: A red/vermillion rectangle behind the title text, like a traditional manuscript rubric
- **Image frame**: Images get a painted border (gold inner + thin dark outer) resembling the way miniatures frame their scenes
- **"Today" note**: Styled as a marginal gloss — smaller text, slightly rotated, with a small pointing-hand (☞) glyph
- **Folio numbering**: Devanagari numerals at the bottom

### 4. Decorative Border Component

Create `src/components/ramayana/MiniatureBorder.tsx` — an SVG component that renders the ornate border frame. It uses:
- Corner rosettes (simplified lotus)
- Side runners (vine/scroll pattern)
- Colors from the new palette (vermillion, gold, malachite)
- Applied as a wrapper around the left panel content

### 5. Route Polyline Styling

The route on the map transforms to look hand-drawn:
- **Main line**: Vermillion, weight 3, no dash array (solid like a painted line)
- **Gold shadow**: A wider golden line underneath (weight 6, low opacity) — like gold leaf bleeding through
- **Past segments**: Fade to a muted brown, like dried ink

### 6. Marker Styling

Replace the current glowing circles with **miniature-style place markers**:
- Active: A small painted flag/pennant icon (SVG DivIcon) in vermillion with gold border
- Past: A small dot in faded ochre
- Active label: A scroll/cartouche shape (like a painted text banner) instead of the current glass-panel tooltip

### 7. Hero Section

The hero transforms from dark-mode minimalism to a **manuscript title page**:
- Warm parchment background with subtle paper grain texture (CSS noise)
- Title in a decorative frame
- A large ornamental motif (simplified lotus mandala SVG) behind the title
- "Essay XIII" rendered in Devanagari-style numerals

### 8. Progress Bar

Replace the thin saffron bar with a **lotus petal progress indicator**: small painted lotus petals that fill in as you progress, or simply a warm-toned bar with gold-leaf texture.

### 9. Typography

Add a Google Font that evokes manuscript calligraphy while remaining readable:
- **Titles**: Keep Playfair Display (it works well with this aesthetic)
- **Body**: Switch from Cormorant Garamond to **Spectral** or keep Cormorant — both work for manuscript feel
- **Accents/Labels**: Add **Tiro Devanagari** for occasional Devanagari script flourishes (stop numbers, section labels)

### 10. Map Overlay Texture

Add a semi-transparent paper-grain texture `<div>` over the map (pointer-events: none) so even the map feels like it's printed on aged paper. Uses a subtle CSS noise pattern or an SVG feTurbulence filter.

## Files to Change

| File | Change |
|------|--------|
| `src/components/visuals/ramayanaMapData.ts` | Update `RM` color tokens to miniature palette |
| `src/components/ramayana/RamayanaZoomDive.tsx` | New tile layer, warm panel styling, border frame, marker redesign, paper texture overlay |
| `src/components/ramayana/RamayanaHero.tsx` | Parchment background, ornamental mandala, manuscript title page |
| `src/components/ramayana/RamayanaEpilogue.tsx` | Match warm palette, manuscript styling |
| `src/components/ramayana/RamayanaProgressTimeline.tsx` | Warm colors, painted dot markers |
| `src/components/ramayana/RamayanaSectionNav.tsx` | Warm palette for drawer |
| `src/components/ramayana/MiniatureBorder.tsx` | **New** — SVG ornate border component |
| `src/pages/Ramayana.tsx` | Update page background to parchment |
| `src/index.css` | Add Leaflet overrides for warm-tile map, paper grain utility class |
| `index.html` | Add Tiro Devanagari font (Google Fonts) |

## Implementation Order

1. Update `RM` palette in `ramayanaMapData.ts`
2. Create `MiniatureBorder.tsx` SVG border component
3. Restyle `RamayanaZoomDive.tsx` — tile layer, panel, markers, paper overlay
4. Restyle `RamayanaHero.tsx` — manuscript title page
5. Update `RamayanaEpilogue.tsx`, `RamayanaProgressTimeline.tsx`, `RamayanaSectionNav.tsx`
6. Add CSS overrides + font in `index.html` and `index.css`

