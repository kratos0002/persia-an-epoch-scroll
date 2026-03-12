

# Homepage Redesign — Enchanting & Cinematic

## What stays
The hero headline text, font choices (Playfair Display + Cormorant Garamond), and parchment palette are beautiful. We keep all of that.

## What changes

### 1. Hero — Add life and drama
- **Animated grain texture** overlay (CSS noise filter, very subtle) for a filmic, old-document feel
- **Floating historical symbols** — small SVG glyphs (compass rose, quill, astrolabe, crescent, torii gate) that drift slowly across the background with parallax depth, fading in and out. 8-10 symbols, very low opacity, different speeds.
- **Staggered word-by-word reveal** on the headline instead of a single block fade — each word slides up with a slight delay, creating a cinematic typewriter feel
- **Scroll-driven parallax** — as user scrolls past hero, the text drifts up and the floating symbols accelerate slightly, creating depth
- **Animated ornamental divider** below the subtitle — an SVG line with small diamond nodes that draws itself on load

### 2. Story Cards — Full-bleed cinematic layout
Replace the current horizontal list cards with a **magazine-style alternating layout**:

- **Featured first card**: Full-width, tall (60vh), with the image as a parallax background and text overlaid in a frosted glass card. The image has a slow Ken Burns zoom effect.
- **Remaining cards**: Alternating left/right image-text pairs that are larger and more dramatic. Each card takes up significant vertical space. Images are taller (400px+), with a subtle parallax scroll offset.
- **Hover effect**: Image shifts slightly (translate), a colored accent line appears at the card edge matching the story's color, and the "Begin reading" text animates with an arrow slide.
- **Scroll reveal**: Cards don't just fade up — they slide in from their respective sides (left cards from left, right cards from right) with a scale-up on the image.
- **Number treatment**: Large, watermark-style numbers (like "01", "02") positioned behind each card at low opacity, adding editorial gravitas.

### 3. Connecting timeline spine
Between the hero and cards, and running down the left side of the stories section:
- A thin vertical **timeline line** with small dots at each story position
- As the user scrolls, the line fills with a warm gold color, and dots pulse as their story enters view
- Dates/era labels appear alongside the dots ("550 BCE", "762 CE", "1603", etc.)

### 4. Section transitions
- Between hero and stories: an **animated decorative border** — a horizontal line with small ornamental flourishes that draws itself as it enters view
- Between stories and newsletter: a subtle **gradient wipe** from parchment to a slightly darker warm tone

### 5. Newsletter section polish
- Add a subtle background pattern (the existing `pattern-persian` utility at very low opacity)
- Animate the form on scroll entry

### 6. Subtle background details
- CSS grain/noise texture on the entire page body (a tiny repeating SVG or CSS filter)
- Very faint horizontal ruling lines across the page like aged paper

## Technical approach

All changes are in `src/pages/Home.tsx` with a few new small utility components:
- **FloatingSymbols component** (inline in Home.tsx) — renders 8-10 motion.divs with randomized positions, speeds, and opacity cycles
- **TimelineSpine component** (inline) — a fixed-position SVG line with scroll-driven fill
- Uses existing framer-motion for all animations (useScroll, useTransform, motion components)
- No new dependencies needed

## Files modified
- `src/pages/Home.tsx` — complete redesign of layout and animation system

