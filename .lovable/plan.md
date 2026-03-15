

# Redesign: New Essay Email Template

## Vision

The current email is a white-on-parchment card — clean but generic. It looks like a Substack notification, not like Epoch Lives. The site itself is dark, rich, gold-accented, and cinematic. The email should feel like an artifact from the site — dark ink background, gold typography, a dramatic hero image, and the kind of editorial gravity that makes someone stop scrolling their inbox.

## Design Direction

Flip from white/parchment to **dark mode** — matching the site's `#1A1510` ink background with `#D4A933` gold accents. The email should feel like opening a sealed letter from a historian, not a marketing blast.

## Layout (top to bottom)

```text
┌──────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓ gold bar (4px) ▓▓▓▓▓▓▓▓▓▓ │
│                                      │
│     ✦  EPOCH LIVES  ✦               │
│     turning points, felt             │
│                                      │
│  ┌────────────────────────────────┐  │
│  │                                │  │
│  │    HERO IMAGE (full width,     │  │
│  │    with dark gradient overlay  │  │
│  │    at bottom for text blend)   │  │
│  │                                │  │
│  └────────────────────────────────┘  │
│                                      │
│     ─── NEW ESSAY ───                │
│                                      │
│     THE THROAT OF THE WORLD          │
│     (large, gold, centered)          │
│                                      │
│     The strait that controls         │
│     the global economy               │
│     (cream italic subtitle)          │
│                                      │
│     ┃ "Twenty-one miles.             │
│     ┃  Twenty-one million barrels.   │
│     ┃  Every single day."            │
│     (gold left-border quote block)   │
│                                      │
│     ┌──────────────────────┐         │
│     │   READ THE ESSAY →   │         │
│     └──────────────────────┘         │
│     (gold button, dark text)         │
│                                      │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │
│                                      │
│  You're receiving this because...    │
│  — The editors                       │
│                                      │
│  Unsubscribe                         │
│                                      │
│ ▓▓▓▓▓▓▓▓ gold bar (4px) ▓▓▓▓▓▓▓▓▓▓ │
└──────────────────────────────────────┘
```

## Key Style Changes

- **Background**: Body `#0F0D0A` (deep warm black), container `#1A1510` (ink)
- **Title**: `#D4A933` gold, 34px, Cormorant Garamond bold
- **Subtitle**: `#C4B8A0` warm cream, italic
- **Hook quote**: `#E8DFD0` light cream text, gold left border, larger 18px
- **CTA button**: Solid gold `#D4A933` background, dark `#1A1510` text — reversed from current
- **Dividers**: Subtle gold at 15% opacity instead of beige
- **Footer**: Muted `#6B5E4E` text
- **"NEW ESSAY" label**: Gold text flanked by ornamental dashes `── NEW ESSAY ──` instead of a dark badge — more editorial

## Files to Change

| File | Action |
|------|--------|
| `supabase/functions/_shared/email-templates/new-essay.tsx` | Rewrite styles + minor layout restructure |
| `src/components/admin/EmailManager.tsx` | Update `PreviewPanel` to match new dark design |

Both the actual email template and the admin preview must match exactly.

After editing, the `send-transactional-email` edge function must be redeployed for changes to take effect.

