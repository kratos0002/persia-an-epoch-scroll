

# Essay 4: Stipends, Bonds, and the Death of a Class

## Concept

A scrollytelling essay at `/samurai` about the bureaucratic dismantling of the samurai class — not through battle but through accounting. Wide scope: Edo → Meiji. The visual language is radically different from previous essays: no maps, no trees, no knowledge graphs. This is **ink & paper** — ledgers, documents, numbers, crossed-out lines.

## Palette — Ink & Paper

```text
Background:   hsl(40, 25%, 95%)   -- aged washi paper
Ink:          hsl(25, 20%, 12%)   -- sumi ink, near-black
Vermillion:   hsl(5, 75%, 50%)    -- hanko seal red, for accents/stamps
Faded:        hsl(30, 10%, 60%)   -- washed-out brush strokes
Gold:         hsl(43, 60%, 45%)   -- imperial chrysanthemum
Ash:          hsl(25, 8%, 75%)    -- dissolution, loss
```

Light-mode essay. White/cream background. Dark text. A stark departure from the dark-bg essays before it.

## Signature Visual: The Ledger

New component: `StipendLedger.tsx` — a scroll-driven SVG/HTML table that looks like an Edo-period account book. Rows represent samurai privileges (stipend, sword rights, tax exemption, domain governance, hereditary rank). As the user scrolls through the Meiji sections, each row gets a vermillion strike-through and the numbers animate down to zero. This is the essay's recurring visual, returning in multiple sections with different data.

## Narrative Arc — 9 Sections

| # | Section | Visual Mechanic |
|---|---------|----------------|
| 1 | **Hero** — "Stipends, Bonds, and the Death of a Class" | Brush-stroke title draws on scroll (stroke-dashoffset), paper texture bg |
| 2 | **The Frozen Society** — Tokugawa class system | `ClassPyramid.tsx` — stacked horizontal bars: Emperor/Shogun/Daimyo/Samurai/Peasant/Merchant. Static, rigid, locked. Scroll reveals each tier. |
| 3 | **The Stipend Economy** — How samurai were paid | `StipendLedger.tsx` — first appearance. Shows rice stipend values by rank, hereditary nature, the economics of doing nothing. Numbers animate in. |
| 4 | **The Black Ships** — Perry, crisis, bakumatsu | No complex visual — full-bleed dark section with a single stark image placeholder and large date typography. Tension break. |
| 5 | **The Restoration** — Meiji begins (1868) | `ClassPyramid.tsx` returns — bars start to shake, blur. The old hierarchy destabilizes. |
| 6 | **Abolition by Memo** — Haitorei, conscription, domain dissolution | `StipendLedger.tsx` returns — rows get vermillion strike-throughs one by one. Sword rights: ~~struck~~. Tax privileges: ~~struck~~. Domain governance: ~~struck~~. The core visual payoff. |
| 7 | **The Bond Conversion** — Stipends → government bonds | `BondCalculator.tsx` — animated conversion table. Left column: rice stipends. Arrow. Right column: bond values (much less). Percentage loss counters tick up. A visual gut-punch of declining value. |
| 8 | **Satsuma** — The last stand (1877) | Dark section. Counter: 30,000 rebels vs. 300,000 conscript army. The numbers tell the story. Minimal visual, maximum typography. |
| 9 | **Epilogue** — "The class didn't fall. It was filed away." | `StipendLedger.tsx` final form — all rows struck, all numbers zero. A vermillion seal stamps the document. Fade to paper. |

## New Components

| Component | Type | Purpose |
|-----------|------|---------|
| `StipendLedger.tsx` | SVG/HTML hybrid | Scroll-driven account book with animating rows and vermillion strike-throughs |
| `ClassPyramid.tsx` | SVG | Horizontal stacked bars showing Tokugawa social hierarchy, with destabilize animation |
| `BondCalculator.tsx` | HTML table + motion | Side-by-side conversion showing stipend → bond value loss with animated counters |
| `BrushTitle.tsx` | SVG | Reusable brush-stroke text that draws via stroke-dashoffset (hero + section headers) |

## File Structure

```text
src/
  pages/Samurai.tsx
  hooks/useSamuraiScrollSpy.ts
  components/samurai/
    SamuraiHero.tsx
    FrozenSocietySection.tsx
    StipendEconomySection.tsx
    BlackShipsSection.tsx
    RestorationSection.tsx
    AbolitionSection.tsx
    BondConversionSection.tsx
    SatsumaSection.tsx
    SamuraiEpilogue.tsx
    SamuraiProgressTimeline.tsx
    SamuraiSectionNav.tsx
  visuals/
    StipendLedger.tsx
    ClassPyramid.tsx
    BondCalculator.tsx
    BrushTitle.tsx
```

## Key Design Differences from Previous Essays

- **Light background** — cream/washi paper, not dark. First light-mode essay.
- **No maps** — this story is domestic, institutional. Geography isn't the point.
- **Typography-heavy** — large date stamps, vermillion annotations, brush-drawn headers.
- **The visual is a document** — not a landscape, not a diagram. The bureaucracy itself is the visual.
- **Recurring visual that degrades** — the StipendLedger returns 3 times, each time with more struck-through rows. The viewer watches a class die row by row.

## Implementation Order

1. Create `useSamuraiScrollSpy.ts` + nav/timeline components
2. Create `BrushTitle.tsx` — reusable stroke-draw SVG text
3. Create `ClassPyramid.tsx` — Tokugawa hierarchy visual
4. Create `StipendLedger.tsx` — the signature ledger
5. Create `BondCalculator.tsx` — conversion table
6. Create all 9 section components
7. Create `Samurai.tsx` page
8. Update `App.tsx` with `/samurai` route
9. Update `Home.tsx` STORIES array with the new card

**Estimated new files: 18 · Modified files: 2**

