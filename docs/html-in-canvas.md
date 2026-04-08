# html-in-canvas — Reference & Prototype Tracker

**Spec:** [WICG/html-in-canvas](https://github.com/WICG/html-in-canvas)
**Status:** WICG proposal. Experimental. Chromium-only, likely origin-trial. Not shipped in Firefox or Safari.
**Role in this project:** Prototype-only capability for compositing real DOM typography into canvas / WebGL surfaces. Every use must feature-detect and degrade to the current non-canvas path.

## What it does

Lets you render real HTML elements *inside* a `<canvas>` — keeping layout, styling, ligatures, bidi, screen-reader access, and `Ctrl-F` selection, while compositing the result into the same pixel surface as your 2D / WebGL drawing.

## API primitives

| API | Purpose |
|-----|---------|
| `<canvas layoutsubtree>` | Opt-in flag. Direct children participate in layout and hit-testing but are invisible until drawn. |
| `ctx.drawElementImage(el, x, y, w?, h?)` | Draws a canvas child into the 2D context. Returns a CSS transform matrix for DOM/draw sync. |
| `canvas` `paint` event + `requestPaint()` | Frame-like hook for when children's rendering has changed. |
| `captureElementImage(el)` | Transferable snapshot for use in `OffscreenCanvas` / workers. |
| `gl.texElementImage2D(..., el)` | WebGL texture upload. |
| `copyElementImageToTexture(el)` | WebGPU equivalent. |

## Hard constraints

- Elements must be **direct children** of the canvas. No Radix portals, no React Suspense fallbacks landing elsewhere.
- **CSS transforms on canvas children are ignored for rendering** (they still affect hit-testing and accessibility). Any Framer Motion transform-based animation needs to become a draw-time transform.
- **Overflow clips to the border box.** Drop-shadows / glows that escape their container get cut — bake them into the canvas 2D context instead.
- Spec is unstable. Wrap all usage in `src/lib/htmlCanvas.ts` so a signature change is a one-file migration.

## Why Epoch Lives cares

This project has three standing problems that html-in-canvas uniquely solves:

1. **Multilingual label shaping on maps.** Farsi / Arabic / Sanskrit / Devanagari / Japanese labels degrade under Maplibre's SDF rasterization. Real DOM in canvas keeps shaping, ligatures, and bidi perfect. Relevant to: Persia, House of Wisdom, Ibn Battuta, Hormuz, Shakti, Kurukshetra, Samurai essays.
2. **Remotion trailers that mix text with shader effects.** Today you pick pristine HTML text *or* canvas shader effects, not both. html-in-canvas lets title cards, quotes, and colophons live inside the same surface as displacement / heat / particles. Relevant to: `src/remotion/ChainReactionTrailer.tsx`, `src/remotion/WisdomTrailer.tsx`, the `../promo/` sibling project.
3. **Client-side "edition poster" export.** A downloadable keepsake PNG/PDF with real webfont typography. `html2canvas` fails on Radix, `backdrop-filter`, and webfont shaping. html-in-canvas is the first browser API that does this right, and it matches the living-document framing of the edition system (see `docs/edition-system.md`).

See `../CLAUDE.md` and `../.claude/skills/essay-visuals/SKILL.md` for when to reach for it.

## Fallback adapter pattern

**All usage must go through a feature-detect adapter.** Canonical location: `src/lib/htmlCanvas.ts` (create on first use).

```ts
// src/lib/htmlCanvas.ts
export function canUseHtmlInCanvas(): boolean {
  if (typeof window === 'undefined') return false;
  const proto = HTMLCanvasElement.prototype as unknown as {
    drawElementImage?: unknown;
  };
  return typeof proto.drawElementImage === 'function';
}

export function htmlCanvasFlagEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('htmlCanvas');
}

export function shouldUseHtmlInCanvas(): boolean {
  return canUseHtmlInCanvas() && htmlCanvasFlagEnabled();
}
```

Every call site:

```tsx
import { shouldUseHtmlInCanvas } from '@/lib/htmlCanvas';

return shouldUseHtmlInCanvas()
  ? <PrototypeHtmlInCanvasVersion />
  : <StableFallbackVersion />;
```

The non-canvas version is the production path. The prototype is a URL-flag-gated experiment you turn on with `?htmlCanvas=1` in Chromium Canary / nightly.

## Composing with Pretext

Pretext and html-in-canvas stack cleanly:

1. **Pretext at layout time** computes "this block is N lines at font F, W wide, H tall."
2. **Reserve a box** of exactly that size inside the canvas.
3. **html-in-canvas at paint time** composites the real DOM into that box with shaders / displacement / particles on top.

Pretext hands html-in-canvas precomputed layout boxes; html-in-canvas renders the glyphs with real ligatures. Result: no CLS, no font-swap reflow, no per-frame `measureText`, real multilingual shaping, real accessibility.

Typical flow for a Remotion title card:

```tsx
// 1. Measure at mount (once per composition)
const prepared = prepareRichInline([
  { text: 'The House of ', font: '700 72px "Playfair Display"' },
  { text: 'Wisdom', font: '700 italic 72px "Playfair Display"' },
]);
const { lines, height } = layoutWithLinesRich(prepared, 1800, 88);

// 2. Reserve a canvas box of the measured height

// 3. At paint time (prototype path only)
if (shouldUseHtmlInCanvas()) {
  ctx.drawElementImage(titleEl, x, y, 1800, height);
  // shader layer composites on top of the same canvas
} else {
  // fallback: render titleEl as normal DOM above the canvas layer
}
```

## Canonical prototype targets

Ordered by "would most validate the approach":

1. **`PortolanNetworkMap`** (Battuta) — portolan city labels that need small-caps + spaced letterforms + Arabic shaping. Smallest scope that exercises multilingual typography + map-overlay sync.
2. **`WisdomTrailer`** (Remotion) — Arabic calligraphy dissolving into ash particles during the Baghdad library destruction sequence. Validates Remotion + shader + DOM text.
3. **Edition poster export** — new `ExportPosterButton` on any essay epilogue that composites `EditionColophon` + hero art + a pull quote into a 4K canvas and downloads as PNG. Validates client-side poster export and matches the edition-system brand.
4. **`ScholarSpotlight`** (House of Wisdom) — scholar cards composited into the same canvas as the Greek→Arabic→Latin translation flow lines. Validates rich DOM node bodies in a dendrogram context.
5. **`SacredBodyAtlas`** (Shakti) — Sanskrit/English peetha labels anchored to an anatomical diagram. Validates Devanagari shaping + shape-anchored labels.

## Prototype status tracker

| Component | Flag | Status | Owner | Notes |
|-----------|------|--------|-------|-------|
| *(none yet)* | | | | Add an entry here when you start a prototype. |

Whenever you open a prototype branch for any target, add a row with: component path, URL flag, `exploring` / `working` / `abandoned`, your name, and a one-line learning.

## Caveats

- **Spec is unstable.** Method signatures may change. All access goes through `src/lib/htmlCanvas.ts`.
- **Chromium-first.** Safari and Firefox will lag, possibly for years.
- **No CSS transforms on children during draw.** Plan a thin animation adapter — Framer Motion transforms need to become canvas-draw transforms at render time.
- **Overflow clips to border box.** Bake glows / shadows into the canvas 2D context instead of relying on CSS `filter: drop-shadow`.
- **Accessibility needs attention.** The DOM tree exists but is invisible — verify focus order and tab stops still match the visual reading order, especially in scroll-synced diagrams.

## Rollout rule

No html-in-canvas code path may become the default until:

1. Firefox and Safari both ship the API, **or**
2. The project explicitly decides to drop non-Chromium support (unlikely).

Until then: prototype-only, feature-flagged, non-canvas fallback is the production truth.

## Resources

- Spec: https://github.com/WICG/html-in-canvas
- Companion Pretext reference: `docs/pretext.md`
- Active skill: `../.claude/skills/essay-visuals/SKILL.md`
- Agent router: `../CLAUDE.md`
