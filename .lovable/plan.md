

# Essay 6: The Rise and Fall of Napoleon

## Concept

A scrollytelling essay at `/napoleon` about the full arc of Napoleon Bonaparte — from the chaos of the French Revolution through his imperial conquests to his final exile. The signature visual is a **Coalition Chessboard**: Europe rendered as a grid of nation-blocks that flip, realign, and shatter as coalitions form and reform against Napoleon.

## Palette — Tricolor Revolution

```text
Background:   hsl(225, 30%, 7%)    -- midnight blue-black
Blue:         hsl(220, 65%, 45%)   -- French republic/revolution
White:        hsl(0, 0%, 95%)      -- empire, order, clarity
Red:          hsl(0, 65%, 48%)     -- war, blood, defeat
Gold:         hsl(43, 70%, 50%)    -- imperial eagles, coronation
Smoke:        hsl(220, 8%, 35%)    -- battlefield gray
Parchment:    hsl(45, 30%, 88%)    -- text card backgrounds
```

Dark-mode essay. Sections shift their accent color between blue (revolutionary origins), gold (imperial zenith), and red (defeats and fall). The tricolor IS the narrative structure.

## Signature Visual: CoalitionBoard

New component: `CoalitionBoard.tsx` — a grid of European nation-blocks (France, Britain, Austria, Prussia, Russia, Spain, Holland, Italy, Ottoman, Sweden, etc.). Each block shows a flag-colored cell with the nation name. As the user scrolls through coalitions:

- **Allied to Napoleon**: Block glows gold, shifts toward France
- **Against Napoleon**: Block glows red, shifts away
- **Conquered/puppet**: Block absorbed into France (border dissolves)
- **Neutral**: Block grayed out

Props: `phase: number` (0–8, mapping to each coalition/event)

Phase 0: Pre-revolution Europe — all blocks static, old regime
Phase 1: Revolution — France block shatters, reforms in tricolor
Phase 2: First Coalition — Austria, Prussia, Britain glow red against blue France
Phase 3: Napoleon's Italian campaigns — Italy blocks flip gold
Phase 4: Emperor — France block expands, satellites appear
Phase 5: Zenith (Tilsit) — Russia flips gold briefly, most of Europe aligned
Phase 6: Spanish ulcer + Russia — Spain and Russia blocks burn red
Phase 7: Leipzig — all blocks turn red, France contracts
Phase 8: Waterloo — France block alone, surrounded, shrinks

## Narrative Arc — 10 Sections

| # | ID | Section | Visual |
|---|----|---------|--------|
| 1 | `hero` | "The Rise and Fall of Napoleon" | Tricolor bands animate in — blue rises from bottom, white holds center, red bleeds from top. Title emerges from the white band. |
| 2 | `revolution` | The Revolution | Dark, chaotic typography section. Dates tumble: 1789, 1792, 1793. The Terror. "From this chaos, a general." No board yet — pure tension. |
| 3 | `toulon` | The Whiff of Grapeshot | `CoalitionBoard` first appearance (Phase 1-2). France reforms in tricolor. First Coalition forms — Austria, Prussia, Britain turn red. A young artillery officer emerges. |
| 4 | `italy-egypt` | Italy & Egypt | Board Phase 3. Italy blocks flip gold. Napoleon's name grows larger with each victory. Egypt: ambition beyond Europe. |
| 5 | `emperor` | The Emperor | Board Phase 4. Coronation. France block expands. Satellite states appear. The Code Napoléon — a counter showing laws drafted. Gold accent section. |
| 6 | `austerlitz` | The Sun of Austerlitz | Board Phase 5. The zenith. Austerlitz, Jena, Tilsit. Russia briefly allied. Almost all of Europe gold or gray. Animated battle counter: 73,000 vs 85,000 → decisive victory. |
| 7 | `spanish-ulcer` | The Spanish Ulcer | Board Phase 6. Spain block ignites red — guerrilla war. The first crack. Peninsula War drags on. Gold starts fading. |
| 8 | `moscow` | Moscow | Full-bleed dark section. A single number: 685,000 march in. 120,000 walk out. Minard-inspired army width ribbon shrinks across the section. Red accent. The turning point. |
| 9 | `waterloo` | Leipzig to Waterloo | Board Phase 7-8. All blocks turn red. France alone. Exile to Elba. The Hundred Days. Waterloo. The board empties — France block alone, small, gray. |
| 10 | `epilogue` | "The Code Remains" | Board fades. But a list of Napoleonic legacies animates in: civil code, metric system, modern bureaucracy, nationalism. "The emperor fell. The ideas didn't." |

## New Components

| Component | Purpose |
|-----------|---------|
| `CoalitionBoard.tsx` | Animated grid of European nation-blocks showing alliance shifts per coalition phase |
| `ArmyRibbon.tsx` | Minard-inspired SVG ribbon showing army size shrinking (for Moscow section) |
| `napoleonData.ts` | Nation list, coalition compositions per phase, battle stats, timeline data |

## File Structure

```text
src/
  pages/Napoleon.tsx
  hooks/useNapoleonScrollSpy.ts
  components/napoleon/
    NapoleonHero.tsx
    RevolutionSection.tsx
    ToulonSection.tsx
    ItalyEgyptSection.tsx
    EmperorSection.tsx
    AusterlitzSection.tsx
    SpanishUlcerSection.tsx
    MoscowSection.tsx
    WaterlooSection.tsx
    NapoleonEpilogue.tsx
    NapoleonProgressTimeline.tsx
    NapoleonSectionNav.tsx
  visuals/
    CoalitionBoard.tsx
    ArmyRibbon.tsx
    napoleonData.ts
```

## Key Design Choices

- **Tricolor as narrative device** — section accent colors shift: blue (revolution) → gold (empire) → red (fall). The palette tells the story.
- **Coalition Chessboard is the recurring visual** — returns in 6 sections, each time with different alignments. The viewer watches Europe reorganize around one man, then close in on him.
- **Moscow as the visual gut-punch** — no chessboard, just the Minard ribbon: 685,000 → 120,000. Numbers do the work.
- **Legacy epilogue** — the board fades but the ideas persist. Civil code, metric system, nationalism. The man fell; the system didn't.

## Implementation Order

1. `napoleonData.ts` — nations, coalition phases, battle stats
2. `useNapoleonScrollSpy.ts` + nav/timeline components
3. `CoalitionBoard.tsx` — the signature nation-grid visual
4. `ArmyRibbon.tsx` — Minard-style army size ribbon for Moscow
5. All 10 section components
6. `Napoleon.tsx` page
7. Update `App.tsx` with `/napoleon` route
8. Update `Home.tsx` — replace Mongol "coming soon" with Napoleon as #6, or add as new entry

**Estimated new files: 17 · Modified files: 2**

