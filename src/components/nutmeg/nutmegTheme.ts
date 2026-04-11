// Captain's Log — "Salt, Spice & Gunpowder" palette
export const NM = {
  CREAM:       'hsl(38, 30%, 85%)',     // Logbook page background — aged vellum
  CREAM_DARK:  'hsl(38, 25%, 78%)',     // Slightly darker cream for depth
  TIMBER:      'hsl(28, 35%, 22%)',     // Binding spine, structural borders
  INK:         'hsl(215, 25%, 18%)',    // Body text — iron gall ink
  AMBER:       'hsl(30, 80%, 48%)',     // Highlights, spice references
  VERMILION:   'hsl(10, 75%, 45%)',     // Dutch elements, VOC seal
  TEAL:        'hsl(195, 45%, 35%)',    // Ocean, charts, route lines
  SMOKE:       'hsl(210, 10%, 55%)',    // Secondary text, annotations
  BLOOD:       'hsl(0, 55%, 30%)',      // Massacre section stain
  ENGLISH_RED: 'hsl(0, 65%, 48%)',     // English elements
  DUTCH_BLUE:  'hsl(210, 60%, 40%)',   // Dutch elements
  GOLD:        'hsl(42, 70%, 55%)',     // Embossed accents
  SPINE_LIGHT: 'hsl(28, 30%, 28%)',    // Clean leather
  SPINE_DARK:  'hsl(15, 25%, 14%)',    // Stained leather
} as const;

// Section-based staining intensity (0 = clean, 1 = heavily stained)
export const SECTION_STAIN: Record<string, number> = {
  'nutmeg-hero': 0,
  'the-seed': 0,
  'the-voyage': 0.05,
  'banda-islands': 0.1,
  'dutch-monopoly': 0.6,
  'run-island': 0.4,
  'manhattan-trade': 0.2,
  'nutmeg-epilogue': 0.8,
};
