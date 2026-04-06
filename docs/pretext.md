# Pretext — Text Measurement Engine

**Package:** `@chenglou/pretext` (v0.0.3)
**Author:** Cheng Lou (React core team, react-motion, ReasonML, Midjourney)
**Size:** ~5KB gzipped, zero dependencies

## What It Does

Pretext calculates text height and line breaks **without touching the DOM**. It replaces expensive `getBoundingClientRect` / `offsetHeight` reflow calls with pure arithmetic, achieving 300–1,200x faster performance.

```
prepare() → measures text segments via canvas (one-time, ~0.1–1ms)
layout()  → pure math to get height/lineCount (~0.0002ms per call)
```

## Core API

### Quick Height Measurement

```ts
import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('Your text here', '16px Inter', { whiteSpace: 'normal' })
const { height, lineCount } = layout(prepared, maxWidth, lineHeight)
```

### Line-Level Control (for canvas/SVG rendering)

```ts
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const prepared = prepareWithSegments(text, '18px Georgia')
const { lines } = layoutWithLines(prepared, 320, 26)
// Each line: { text, width, start, end }
```

### Rich Inline (mixed fonts, chips, links)

```ts
import { prepareRichInline, walkRichInlineLineRanges } from '@chenglou/pretext/rich-inline'

const prepared = prepareRichInline([
  { text: 'Normal text ', font: '16px Inter' },
  { text: 'bold part', font: '16px Inter bold', break: 'never' },
  { text: ' chip', font: '14px monospace', extraWidth: 16 },
])
```

### Variable-Width Lines (text flowing around shapes)

```ts
import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext'

const prepared = prepareWithSegments(text, '16px Georgia')
let cursor = { segmentIndex: 0, graphemeIndex: 0 }
let y = 0

while (true) {
  // Narrow width where image is, full width elsewhere
  const width = y < imageBottom ? columnWidth - imageWidth : columnWidth
  const line = layoutNextLine(prepared, cursor, width)
  if (!line) break
  ctx.fillText(line.text, 0, y)
  cursor = line.end
  y += lineHeight
}
```

## Full Function Reference

| Function | Purpose |
|----------|---------|
| `prepare(text, font, opts?)` | Prepare text for layout (height-only) |
| `layout(prepared, maxWidth, lineHeight)` | Get `{ height, lineCount }` |
| `prepareWithSegments(text, font, opts?)` | Prepare with segment data for line APIs |
| `layoutWithLines(prepared, maxWidth, lineHeight)` | Get all lines with text content |
| `walkLineRanges(prepared, maxWidth, onLine)` | Iterate lines without allocating strings |
| `measureLineStats(prepared, maxWidth)` | Get `{ lineCount, maxLineWidth }` |
| `measureNaturalWidth(prepared)` | Shrink-wrap width |
| `layoutNextLine(prepared, cursor, maxWidth)` | Variable-width line iterator |
| `layoutNextLineRange(prepared, cursor, maxWidth)` | Variable-width iterator (no text strings) |
| `materializeLineRange(prepared, range)` | Convert LineRange to Line with text |
| `clearCache()` | Clear internal measurement caches |
| `setLocale(locale?)` | Set locale for word boundaries |

### Options

```ts
type PrepareOptions = {
  whiteSpace?: 'normal' | 'pre-wrap'
  wordBreak?: 'normal' | 'keep-all'
}
```

## Performance

| Scenario | DOM | Pretext | Speedup |
|----------|-----|---------|---------|
| 500 texts (Chrome) | 43.50ms | 0.09ms | 483x |
| 500 texts (Safari) | 149.00ms | 0.12ms | 1,242x |
| Single layout() | N/A | ~0.0002ms | Pure arithmetic |

## Gotchas

1. **No `system-ui`** — Use explicit font names (`'16px Inter'`, `'16px -apple-system'`). `system-ui` resolves differently per OS, making canvas measurements unreliable.
2. **Font must be loaded** — Call `prepare()` after web fonts load, or you get fallback metrics.
3. **Not a renderer** — Returns numbers only. You still render with DOM/Canvas/SVG.
4. **Limited CSS** — Supports `white-space`, `word-break`, `overflow-wrap`, `line-break`, `tab-size`. No `letter-spacing`, `text-indent`, or `word-spacing`.
5. **Early stage** — v0.0.3, API may change.

## How It Fits Our Stack

Pretext is **complementary** to Framer Motion, not a replacement. Use pretext to *calculate*, Framer Motion to *animate*.

### Use Cases for Epoch Lives

| Pattern | How | Where |
|---------|-----|-------|
| **StickyScroll step sizing** | Pre-calculate text block heights to size steps precisely instead of fixed `90vh` | All essays |
| **Smooth accordion/expand** | Know target height before animating, no layout thrash | Scholar spotlights, info panels |
| **Text flowing around shapes** | Variable-width `layoutNextLine` for text wrapping around SVG maps/diagrams | Radcliffe border, Punjab/Bengal maps |
| **Canvas text effects** | Get exact line breaks for custom rendered text | Hero sections, destruction effects |
| **Virtual scroll** | Pre-calculate heights for refugee name lists without rendering all DOM elements | VoidSection (2,400 name elements) |
| **Eliminate CLS** | Know final text height before paint | All text-heavy sections |

### Our Fonts (for `prepare()` calls)

```ts
// Display headings (Playfair Display)
prepare(text, '700 48px "Playfair Display"')

// Body text (Cormorant Garamond)
prepare(text, '400 16px "Cormorant Garamond"')

// Survey/admin text (the survey font used in Radcliffe)
prepare(text, '400 13px "survey-font-family"')
```

## Resources

- **GitHub:** github.com/chenglou/pretext
- **npm:** @chenglou/pretext
- **Official demos:** chenglou.me/pretext/
- **Community demos:** pretext.cool
