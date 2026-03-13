# Edition System

Essays on Epoch Lives are living documents. The edition system tracks how each essay evolves over time, giving readers a clear signal that the work is maintained and growing.

## How it works

A single config file (`src/lib/editions.ts`) holds the metadata for every essay — edition label, version, date, and a changelog. A shared component (`EditionColophon`) reads from this config and renders a colophon at the bottom of each essay's epilogue.

## Files

| File | Purpose |
|------|---------|
| `src/lib/editions.ts` | Central config — all essay metadata lives here |
| `src/components/scroll/EditionColophon.tsx` | Shared colophon component, rendered in every epilogue |

## Updating an essay

When you add content to an essay, update `src/lib/editions.ts`:

1. Bump the `version` string
2. Update `edition` if it's a major revision (e.g. "First Edition" → "Second Edition")
3. Update `lastUpdated` to the current month/year
4. Add a new entry to the top of `changelog`

### Example

Before:

```ts
persia: {
  edition: 'First Edition',
  version: '1.0',
  lastUpdated: 'March 2026',
  changelog: [
    { version: '1.0', date: 'March 2026', note: 'Initial essay — Achaemenid through Modern Iran' },
  ],
},
```

After adding a new section:

```ts
persia: {
  edition: 'Second Edition',
  version: '1.1',
  lastUpdated: 'June 2026',
  changelog: [
    { version: '1.1', date: 'June 2026', note: 'Added Safavid architecture gallery and revised Mongol timeline' },
    { version: '1.0', date: 'March 2026', note: 'Initial essay — Achaemenid through Modern Iran' },
  ],
},
```

That's it. The colophon in the Persia epilogue updates automatically.

## Versioning conventions

- **Patch** (1.0 → 1.0.1): Factual corrections, typo fixes, source additions
- **Minor** (1.0 → 1.1): New section, new visual, expanded content
- **Major / new edition** (1.x → 2.0): Significant restructure, new visual mechanic, major rewrite

## Colophon variants

The `EditionColophon` component accepts a `variant` prop:

- `dark` (default) — for essays with dark backgrounds (Persia, Rebellion, Buddhism, Napoleon, Constantinople, India States, Wisdom)
- `light` — for essays with light/paper backgrounds (Samurai)

## Essays covered

All 8 essays have the colophon integrated into their epilogue components:

| Essay | Epilogue file | Variant |
|-------|--------------|---------|
| Persia | `components/sections/EpilogueSection.tsx` | dark |
| House of Wisdom | `components/wisdom/WisdomEpilogue.tsx` | dark |
| Buddhism | `components/buddhism/BuddhismEpilogue.tsx` | dark |
| Samurai | `components/samurai/SamuraiEpilogue.tsx` | light |
| 1857 Rebellion | `components/rebellion/RebellionEpilogue.tsx` | dark |
| Napoleon | `components/napoleon/NapoleonEpilogue.tsx` | dark |
| Constantinople | `components/constantinople/BedrockEpilogue.tsx` | dark |
| India States | `components/india/IndiaEpilogue.tsx` | dark |
