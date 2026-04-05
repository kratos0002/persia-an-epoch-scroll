

# Design Language: "The Severed Survey"

## Core Metaphor

The essay IS a **colonial survey document that is being torn in half in real time**. The reader holds a single sheet of administrative cartography — census tables, canal schematics, district maps, demographic ledgers — and as they scroll, **the page itself splits down the center**, dragging content apart, leaving a widening void between two halves that were once one.

This is not decoration. The UI literally bifurcates. Text columns pull apart. Map polygons cleave. Table rows separate into two drifting halves. The tear widens as the essay progresses — clean and surgical at the top (Radcliffe's appointment), ragged and bloody at the bottom (the refugee columns). By the epilogue, the two halves of the page are separated by a void filled with names.

```text
OPIUM TRADE       = Ledger that stains
RAMAYANA          = Miniature painting
CONSTANTINOPLE    = Archaeological dig
IBN BATTUTA       = Portolan atlas
KURUKSHETRA       = Sacred geometry that fractures
BERLIN CONFERENCE = Cartographer's table

RADCLIFFE LINE    = Survey document tearing in half
                    (unified sheet → clean cut → ragged tear → void of names)
```

## What Makes This Radical

1. **The page has a seam.** A single vertical hairline runs down the center of the viewport from the very first section. It begins as an innocent fold mark on a survey document. By the midpoint it is a red ink line. By the refugee section it is a **ragged tear** with frayed paper edges, and content on either side has drifted apart by 20-40px. The seam is the Radcliffe Line. The seam is the essay's spine.

2. **Dual-register typography.** The essay uses two simultaneous typographic voices: the **administrative voice** (the cold language of commissions, census data, legal mandates — set in a monospaced surveyor's type, justified, with paragraph numbers) and the **human voice** (eyewitness accounts, refugee testimony, the smell of burning villages — set in an italic serif, ragged-right, with no paragraph numbers). These two voices occupy opposite sides of the seam and increasingly diverge as the page tears.

3. **The 36-day countdown.** A persistent element tracks Radcliffe's 36 working days in India. It renders as a calendar strip — each day a small ruled square, like a pocket diary. Days fill in as the reader scrolls. The strip has a "paper quality" that degrades: crisp and white at Day 1, yellowed and creased by Day 20, stained and torn by Day 36.

---

## Visual System

### Palette: "Survey Ink and Blood"

```text
┌─────────────────────────────────────────────────────────┐
│  SURVEY CREAM    hsl(40, 35%, 93%)    base paper        │
│  GRID BLUE       hsl(215, 30%, 62%)   survey grid lines │
│  COMMISSION INK  hsl(220, 25%, 15%)   body text         │
│  BOUNDARY RED    hsl(355, 70%, 45%)   the line itself   │
│  STAMP VIOLET    hsl(270, 30%, 35%)   official seals    │
│  CANAL TEAL      hsl(185, 40%, 38%)   water/irrigation  │
│  CENSUS OCHRE    hsl(38, 50%, 55%)    demographic data  │
│  TELEGRAPH AMBER hsl(42, 65%, 50%)    communications    │
│  REFUGEE SOOT    hsl(25, 15%, 25%)    testimony/trauma  │
│  VOID            hsl(30, 5%, 8%)      the tear/absence  │
│  PARCHMENT AGED  hsl(38, 30%, 85%)    degraded paper    │
│  SIKH SAFFRON    hsl(30, 85%, 55%)    community marker  │
│  CRESCENT GREEN  hsl(150, 45%, 30%)   community marker  │
│  LOTUS PINK      hsl(340, 50%, 60%)   community marker  │
└─────────────────────────────────────────────────────────┘
```

The palette is **administrative**: the blue-grey grid of a survey sheet, the red ink of a boundary commission, the violet of an official stamp, the teal of canal schematics. It is NOT warm. It is NOT sacred. It is the color of bureaucracy applied to human lives. The only warmth comes from the Census Ochre (demographic data) and the amber of telegraph communications — and from the soot-dark testimony sections.

### Textures & Motifs

1. **Survey Grid**: The background is ruled paper — faint blue horizontal and vertical grid lines at ~1.5% opacity, like a topographic survey sheet. This grid is perfectly aligned in early sections and subtly skews/tears as the essay progresses.

2. **The Seam**: A single vertical line at viewport center. Starts as a fold mark (dotted, 0.5px, Grid Blue). Becomes a solid red line (Boundary Red) during the commission sections. Becomes a ragged SVG tear path during the violence sections. The tear has "paper fiber" edges — tiny jagged filaments rendered as thin SVG strokes.

3. **Stamp Marks**: Official decisions and legal citations are "stamped" — a translucent violet rectangle with rounded corners, rotated 2-3 degrees, containing small-caps text. Like a rubber stamp on a government document.

4. **Census Strips**: Demographic data rendered as horizontal population bars — thin colored strips (Saffron, Green, Pink) stacked proportionally, like the edge of a ream of colored paper. These strips literally split apart when a district is partitioned.

5. **Canal Schematic**: Irrigation data rendered as teal line diagrams — not decorative, but actual simplified canal network schematics showing headworks, distributaries, and the points where the line severs them.

6. **Redaction Marks**: Controversial or disputed facts (the Ferozepore interference, the burning of papers) presented with partial black-bar redactions that the reader can hover to reveal — invoking the aesthetics of declassified government documents.

### Typography

- **Administrative voice**: `IBM Plex Mono` or similar monospace — justified, with paragraph/section numbers in the margin, like a legal brief or commission report
- **Human voice**: `Cormorant Garamond Italic` — ragged-right, slightly smaller, no numbering — placed on the opposite side of the seam from administrative text
- **Data/Tables**: Styled as typed government forms — thin borders, small caps headers, typewriter-strike texture
- **The Line announcements**: `Playfair Display`, very wide letter-spacing, all-caps — used sparingly for section titles, as if hand-lettered on a survey map
- **Day numbers**: Rendered inside small ruled calendar squares with a handwritten quality

---

## Section Architecture

### Hero — "The Fold"
A full-viewport sheet of survey cream paper. A single vertical fold line (the seam) runs top to bottom. At the top, in small monospace: "BOUNDARY COMMISSION — CONFIDENTIAL." Title: "THE RADCLIFFE LINE" in wide-tracked Playfair across the fold. Subtitle: "36 Days to Sever a Subcontinent." Below, a faint map outline of undivided India — a single unified silhouette — with a hairline red line slowly drawing itself down the Punjab and Bengal borders. The 36-day calendar strip is visible at the top edge, all squares empty.

### The Architect — "The Blank Slate"
Radcliffe's biography and appointment. Rendered entirely in the administrative voice — monospaced paragraphs with section numbers (§1.1, §1.2...). A "personnel file" aesthetic: Radcliffe's qualifications listed as a typed dossier card, his portrait placeholder framed as a passport photo with a violet stamp. The seam is still just a fold mark. The key visual is a **before/after silhouette**: a unified India map on the left, a question mark on the right.

### The Commission — "The Deadlock"
The membership tables for Punjab and Bengal commissions. Rendered as two facing panels — Congress nominees on the left of the seam, Muslim League nominees on the right. As the reader scrolls, the panels subtly drift apart (3-5px) — the deadlock made spatial. The judges' names are styled as typed index cards pinned to a board. The seam transitions from fold to a thin ink line.

### The 36-Day Timeline — "The Countdown"
A sticky scrollytelling centerpiece. Left: a large **calendar visualization** — 36 days as a 6×6 grid of ruled squares, each filling with activity as the reader scrolls. Key dates (hearings, submissions, the award) are marked with red stamps. Right: scrolling event cards in the administrative voice. The calendar grid itself degrades — early days are crisp; later days are hastily scrawled; the final days are smudged and ink-stained.

### The Data Void — "Census and Cartography"
The informational constraints Radcliffe faced. A full-width **data comparison panel**: the 1941 census data shown as population bars, with visible "error margins" and "stale data" warnings stamped across them. An overlay showing the 1943 famine displacement as ghost-bars — translucent population that has moved or died since the census. A map showing the areas Radcliffe never visited — greyed out, with "NO AERIAL SURVEY" stamped across them.

### The Punjab Cut — "Other Factors"
The centerpiece section. A **large interactive SVG map of undivided Punjab** — the visual equivalent of the ZoomDive. Districts rendered as polygons, colored by demographic majority (Census Strips). As the reader scrolls through each contested decision:

- **Lahore/Amritsar**: The two cities pulse on the map. A split-screen comparison: demographic bars, economic data, the "stubborn geographical fact." The boundary red line draws between them.
- **Gurdaspur**: The four tehsils highlight individually. The Kashmir corridor materializes as a dotted line extending northward — showing what this decision enabled.
- **Ferozepore**: The "sketch map" appears as a redacted document overlay. The boundary flickers between two positions — the draft line and the final line — with a "CLASSIFIED" stamp. Hover reveals the Abell letter text.

Each decision triggers the **seam to widen** slightly and the census strips in the affected district to physically split apart on screen.

### The Bengal Cut — "The Deltaic Divide"
Same architecture as Punjab but with a river-system focus. The map is dominated by the **Ganges-Brahmaputra delta** rendered as teal canal schematics. Key decisions:

- **Calcutta**: The city pulses. Economic dependency lines radiate outward to the eastern hinterland — then are severed.
- **Murshidabad/Khulna swap**: Two districts flash and exchange sides of the seam with an animation.
- **CHT**: The 97% non-Muslim strip is highlighted, then absorbed into Pakistan's side — a "GEOGRAPHIC NECESSITY" stamp appears.
- **Sylhet**: A referendum result bar (56.56%) with the sub-division split visualized.

### The Void — "August 15-17"
The emotional core. The seam becomes a **full ragged tear** — 30-40px wide — with paper-fiber edges. Content on either side has drifted apart. In the void between the halves: **names**. Thousands of tiny, barely legible names scrolling upward through the tear — representing the displaced millions. The reader cannot read them all. That is the point.

Above the tear: the administrative voice describes radio broadcasts and flag confusions in cold monospace. Below: the human voice — italicized eyewitness accounts of ghost trains, refugee columns, Thoha Khalsa — rendered in Refugee Soot on aged parchment, as if handwritten testimony pasted into the margins.

A **refugee flow visualization**: animated dots (Saffron moving east, Green moving west) streaming across the map in opposite directions, crossing and colliding at the boundary line. The dot density increases as the reader scrolls until the map is nearly obscured.

### The Aftermath — "Burning the Papers"
Radcliffe's departure. The administrative voice recounts his actions in clipped, numbered paragraphs. On the right side of the seam: a redacted document — Radcliffe's notes — rendered as pages with heavy black-bar redactions, then slowly consumed by a paper-burn effect from the edges inward. The fee refusal rendered as a cancelled cheque with a violet "REFUSED" stamp.

### The Living Border — "Disputes and Enclaves"
Modern consequences. A clean, contemporary-styled data section (the archaeological/scholarly register). The 162 enclaves visualized as a **dot map** — tiny islands of color inside the wrong territory. The Sir Creek rendered as a disputed estuary schematic with two competing boundary interpretations overlaid. A small timeline showing the 2015 Land Boundary Agreement as a partial resolution.

### Epilogue — "The Persistence of the Line"
The final viewport. The page is fully torn — two halves separated by a wide void. In the void, the Radcliffe Line glows in Boundary Red — a single, thin, indelible line. Below it, small text: the current population of the India-Pakistan and India-Bangladesh borders. The survey grid is gone. The paper is stained. The seam is permanent.

---

## The Tear System (Technical Core)

CSS custom properties driven by scroll position:

```text
Section 1-2  → --seam-width: 1px;  --seam-type: fold;    --drift: 0px;
Section 3-4  → --seam-width: 2px;  --seam-type: ink;     --drift: 3px;
Section 5-6  → --seam-width: 4px;  --seam-type: cut;     --drift: 10px;
Section 7    → --seam-width: 30px; --seam-type: tear;    --drift: 20px;
Section 8-9  → --seam-width: 40px; --seam-type: void;    --drift: 30px;
```

The `--drift` value applies as opposing `translateX` to left and right content columns — left content shifts left, right content shifts right, creating the physical separation. The seam SVG path transitions from a straight line to an increasingly jagged tear profile.

---

## Emotional Arc

```text
FOLD           INK LINE        CUT            TEAR            VOID
──────         ──────          ──────         ──────          ──────
Appointment    Commission      Punjab/Bengal  Aug 15-17       Aftermath
                               Awards         Violence

Crisp paper    Drift begins    Census strips   Paper fibers    Names in
Single sheet   Deadlock        split apart     Ragged edges    the gap
Fold mark      visible         Red line draws  Refugee dots    Permanent
                                              stream across   scar
```

---

## Implementation Priority

1. **Palette + survey grid background + seam system** — the atmospheric and structural foundation
2. **Punjab interactive map** — the visual centerpiece (equivalent of ZoomDive)
3. **The Void / refugee flow** — the emotional peak
4. **36-day countdown calendar** — the persistent scroll-spine
5. **Bengal delta map** — the second major geographic visual
6. **Census strip splitting animations** — data visualization
7. **Redaction/stamp system** — the bureaucratic texture
8. **Enclave dot map + Sir Creek** — the living border
9. **Hero + Epilogue** — bookends

