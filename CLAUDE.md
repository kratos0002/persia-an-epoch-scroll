# Epoch Lives — Agent Guide

This repo hosts **Epoch Lives** (pastlives.site) — scroll-driven long-form history essays. Stack: Vite + React 18 + TypeScript, Tailwind, shadcn/ui, Framer Motion, D3, Leaflet/Maplibre, Remotion, Supabase. There are 8 published essays, each assembled from its own folder under `src/components/<essay>/` with a shared scroll/section kit under `src/components/scroll/` and `src/components/sections/`.

This file is the router. Before building any essay visual, work the checklist below, then open the skill or the reference doc it points you at.

## Before building any essay visual, ask these 5 questions

1. **Does this visual render text I need to *measure* (height, line count, fit-in-slot)?** → Use **Pretext** via `src/hooks/usePretext.ts`. See `docs/pretext.md`.
2. **Does it mix canvas / shader effects with real typography (Remotion, particles, displacement, WebGL)?** → Consider the **html-in-canvas** prototype path. See `docs/html-in-canvas.md`. Prototype-only, behind a URL flag, with the current code path as fallback.
3. **Does it flow text around an irregular shape (map, diagram outline, formation)?** → Pretext `layoutNextLine` with a width-callback. See `docs/pretext.md`.
4. **Does it fit labels into fixed slots (timelines, progress bars, chart axes, node cards)?** → Use a `fitTextTo` util built on Pretext `walkLineRanges`. Template in the skill.
5. **Is it a Remotion composition with text?** → Precompute line layouts with Pretext at mount and store in a ref. Never call `ctx.measureText` per frame.

If any answer is yes, open `.claude/skills/essay-visuals/SKILL.md` (or invoke `/essay-visuals`).

## Capability stack

| Tool | Status | Use for | Reference |
|------|--------|---------|-----------|
| **Pretext** (`@chenglou/pretext`) | Production, ships today | Text measurement without DOM reflow, canvas line layout, shrink-wrap, variable-width flow | `docs/pretext.md` |
| **html-in-canvas** (WICG proposal) | Experimental, Chromium-only, prototype-only | Compositing real DOM text into canvas / WebGL surfaces (Remotion, shaders, poster export, multilingual map labels) | `docs/html-in-canvas.md` |

**The two compose:** Pretext hands html-in-canvas precomputed layout boxes; html-in-canvas renders the glyphs with real ligatures. See `docs/html-in-canvas.md` § Composing with Pretext.

## Hard rules

- **Always `await document.fonts.ready` before calling `prepare()`.** Otherwise you measure fallback metrics and re-layout when the webfont arrives.
- **Never pass `system-ui`** to Pretext font strings. Use explicit names: `'400 16px "Cormorant Garamond"'`, `'700 48px "Playfair Display"'`.
- **Always import Pretext through `src/hooks/usePretext.ts`**, not directly from `@chenglou/pretext`. The hook is the migration seam if the library goes 1.0 or the API shifts.
- **`html-in-canvas` is prototype-only** and must stay behind a URL flag (`?htmlCanvas=1`) with the existing code path as the fallback. No migrations to it as default while Safari and Firefox lack the API.
- **No gamification, streaks, badges, or FOMO patterns** in any visual. Epoch Lives is museum-curator voice. Content is the reward.

## Known anti-patterns to watch for (and fix if you touch them)

- **`src/components/radcliffe/VoidSection.tsx`** — uses `prepare()` for total height but then re-does word wrapping with `ctx.measureText` on every scroll frame (`:43-87`). Should use `walkLineRanges` / `layoutWithLines`. Also imports Pretext directly instead of through the hook.
- **`src/hooks/usePretext.ts` has zero consumers** as of this writing. If you're building a new text-measurement path, use the hook — don't add another direct import. If the hook is missing a primitive you need, extend the hook instead of working around it.
- **Webfont swap CLS on hero sections** is present on most `*Hero.tsx` — no hero currently reserves space for final Playfair/Cormorant metrics. Good incremental Pretext adoption target.

## Project map

| Area | Location |
|------|----------|
| Essay pages | `src/pages/*.tsx` |
| Essay-specific components | `src/components/<essay>/` |
| Shared scroll/section kit | `src/components/scroll/`, `src/components/sections/` |
| Reusable visuals library | `src/components/visuals/` |
| Remotion compositions | `src/remotion/` and `../promo/src/` (sibling project) |
| Edition metadata | `src/lib/editions.ts` |
| Pretext hook | `src/hooks/usePretext.ts` |
| Agent docs | this file + `.claude/skills/` + `docs/` |

## Pointers

- **Active skill:** `.claude/skills/essay-visuals/SKILL.md`
- **Pretext reference:** `docs/pretext.md`
- **html-in-canvas reference:** `docs/html-in-canvas.md`
- **Edition system:** `docs/edition-system.md`
- **Global preferences:** `~/.claude/CLAUDE.md` (user-level)
