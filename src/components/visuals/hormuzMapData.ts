/* ══════════════════════════════════════════════════════════════
   Hormuz Essay — All map data by era
   ══════════════════════════════════════════════════════════════ */

/* ── Palette (shared across sections) ── */
export const HZ = {
  NAVY:      'hsl(215, 45%, 8%)',
  TEAL:      'hsl(195, 55%, 35%)',
  AMBER:     'hsl(35, 80%, 50%)',
  PARCHMENT: 'hsl(40, 35%, 88%)',
  SMOKE:     'hsl(210, 15%, 60%)',
  RED:       'hsl(0, 65%, 50%)',
  BRIT_RED:  'hsl(0, 60%, 40%)',
  PORT_GREEN:'hsl(140, 40%, 30%)',
  PERSIAN_GOLD: 'hsl(43, 85%, 55%)',
  DEEP_BLUE: 'hsl(215, 40%, 6%)',
} as const;

/* ── Shipping lanes ── */
export const INBOUND_LANE: [number, number][] = [
  [25.5, 57.2], [26.2, 56.6], [26.45, 56.35], [26.7, 56.0], [27.0, 55.5],
];
export const OUTBOUND_LANE: [number, number][] = [
  [27.0, 55.3], [26.6, 55.9], [26.35, 56.25], [26.1, 56.5], [25.4, 57.1],
];

/* ── Gulf cities (modern) ── */
export const GULF_CITIES = [
  { name: 'Bandar Abbas', coords: [27.18, 56.27] as [number, number], country: 'Iran' },
  { name: 'Muscat', coords: [23.59, 58.54] as [number, number], country: 'Oman' },
  { name: 'Dubai', coords: [25.2, 55.27] as [number, number], country: 'UAE' },
  { name: 'Hormuz Island', coords: [27.06, 56.46] as [number, number], country: 'Iran' },
  { name: 'Khasab', coords: [26.18, 56.25] as [number, number], country: 'Oman' },
];

/* ── Ancient trade (Dilmun era, ~3000 BCE) ── */
export const ANCIENT_TRADE_ROUTES: [number, number][][] = [
  [[26.03, 50.55], [28.5, 46.0], [30.96, 46.1]],              // Dilmun → Ur
  [[26.03, 50.55], [24.0, 53.0], [23.0, 57.0]],              // Dilmun → Magan
  [[26.03, 50.55], [26.5, 56.3], [25.0, 62.0], [24.86, 67.0]], // Dilmun → Meluhha (via Hormuz)
];

export const ANCIENT_CITIES = [
  { name: 'Dilmun (Bahrain)', coords: [26.03, 50.55] as [number, number], color: HZ.AMBER },
  { name: 'Ur', coords: [30.96, 46.1] as [number, number], color: HZ.PARCHMENT },
  { name: 'Magan (Oman)', coords: [23.0, 57.0] as [number, number], color: HZ.PARCHMENT },
  { name: 'Meluhha (Indus)', coords: [24.86, 67.0] as [number, number], color: HZ.PARCHMENT },
  { name: 'Strait of Hormuz', coords: [26.56, 56.25] as [number, number], color: HZ.TEAL },
];

/* ── Persian Gulf era (550 BCE – 1500 CE) ── */
export const PERSIAN_ERA_CITIES = [
  { name: 'Persepolis', coords: [29.93, 52.89] as [number, number], color: HZ.PERSIAN_GOLD, era: 'achaemenid' },
  { name: 'Susa', coords: [32.19, 48.26] as [number, number], color: HZ.PERSIAN_GOLD, era: 'achaemenid' },
  { name: 'Ctesiphon', coords: [33.09, 44.58] as [number, number], color: HZ.PARCHMENT, era: 'sassanid' },
  { name: 'Siraf', coords: [27.67, 52.35] as [number, number], color: HZ.TEAL, era: 'islamic' },
  { name: 'Old Hormuz', coords: [27.1, 56.4] as [number, number], color: HZ.TEAL, era: 'islamic' },
  { name: 'New Hormuz (Island)', coords: [27.06, 56.46] as [number, number], color: HZ.AMBER, era: 'kingdom' },
  { name: 'Basra', coords: [30.51, 47.81] as [number, number], color: HZ.PARCHMENT, era: 'islamic' },
  { name: 'Muscat', coords: [23.59, 58.54] as [number, number], color: HZ.PARCHMENT, era: 'islamic' },
];

export const MONSOON_ROUTES: [number, number][][] = [
  [[27.06, 56.46], [23.0, 58.0], [19.0, 72.0], [13.0, 80.0]],   // Hormuz → India
  [[27.06, 56.46], [23.0, 58.0], [10.0, 61.0], [-6.0, 39.0]],   // Hormuz → East Africa
  [[13.0, 80.0], [7.0, 98.0], [1.0, 104.0], [22.0, 114.0]],     // India → China
];

/* ── Portugal era (1507–1622) ── */
export const PORTUGUESE_CITIES = [
  { name: 'Hormuz Island', coords: [27.06, 56.46] as [number, number], color: HZ.PORT_GREEN, role: 'fortress' },
  { name: 'Bandar Abbas', coords: [27.18, 56.27] as [number, number], color: HZ.PARCHMENT, role: 'coast' },
  { name: 'Goa', coords: [15.3, 73.95] as [number, number], color: HZ.PORT_GREEN, role: 'capital' },
  { name: 'Malacca', coords: [2.19, 102.25] as [number, number], color: HZ.PORT_GREEN, role: 'lock' },
  { name: 'Aden', coords: [12.8, 45.03] as [number, number], color: HZ.PORT_GREEN, role: 'lock' },
];

export const PORTUGUESE_ROUTE: [number, number][] = [
  [15.3, 73.95], [19.0, 72.0], [23.0, 58.0], [27.06, 56.46], // Goa → Hormuz
];

/* ── British era (1820–1971) ── */
export const TRUCIAL_STATES = [
  { name: 'Abu Dhabi', coords: [24.45, 54.65] as [number, number] },
  { name: 'Dubai', coords: [25.2, 55.27] as [number, number] },
  { name: 'Sharjah', coords: [25.35, 55.4] as [number, number] },
  { name: 'Ajman', coords: [25.4, 55.45] as [number, number] },
  { name: 'Umm al-Quwain', coords: [25.56, 55.55] as [number, number] },
  { name: "Ras al-Khaimah", coords: [25.79, 55.94] as [number, number] },
  { name: 'Fujairah', coords: [25.12, 56.33] as [number, number] },
];

export const OIL_DISCOVERIES = [
  { year: 1932, place: 'Bahrain', coords: [26.03, 50.55] as [number, number] },
  { year: 1938, place: 'Saudi Arabia', coords: [25.38, 49.98] as [number, number] },
  { year: 1938, place: 'Kuwait', coords: [29.31, 47.48] as [number, number] },
  { year: 1958, place: 'Abu Dhabi', coords: [24.45, 54.65] as [number, number] },
  { year: 1969, place: 'Dubai', coords: [25.2, 55.27] as [number, number] },
];

/* ── Tanker War (1980–1988) ── */
export const TANKER_STRIKES: { coords: [number, number]; label: string }[] = [
  { coords: [26.8, 56.0], label: 'Tanker hit' },
  { coords: [26.3, 55.5], label: 'Mine field' },
  { coords: [27.2, 56.4], label: 'USS Stark' },
  { coords: [26.0, 56.8], label: 'Praying Mantis' },
  { coords: [26.6, 55.8], label: 'Flight 655' },
];

export const TANKER_WAR_EVENTS = [
  { year: 1984, label: 'Tanker War begins', detail: 'Iraq starts attacking Iranian oil tankers; Iran retaliates against Gulf shipping.' },
  { year: 1986, label: 'Operation Earnest Will', detail: 'US Navy begins escorting reflagged Kuwaiti tankers through the strait.' },
  { year: 1987, label: 'USS Stark attacked', detail: 'Iraqi jet fires two Exocet missiles at the USS Stark, killing 37 sailors.' },
  { year: 1988, label: 'Operation Praying Mantis', detail: 'Largest US naval engagement since WWII — retaliatory strike after USS Samuel B. Roberts hits an Iranian mine.' },
  { year: 1988, label: 'Iran Air Flight 655', detail: 'USS Vincennes shoots down Iranian civilian airliner, killing 290 passengers.' },
];

/* ── Chokepoints comparison ── */
export const CHOKEPOINTS = [
  {
    name: 'Strait of Hormuz',
    width: '21 miles',
    share: '21% of global oil',
    barrels: '21M barrels/day',
    coords: [26.56, 56.25] as [number, number],
    color: HZ.TEAL,
  },
  {
    name: 'Strait of Malacca',
    width: '1.7 miles at narrowest',
    share: '25% of global trade',
    barrels: '16M barrels/day',
    coords: [2.5, 101.8] as [number, number],
    color: 'hsl(140, 50%, 40%)',
  },
  {
    name: 'Suez Canal',
    width: '205 meters',
    share: '12% of global trade',
    barrels: '5.5M barrels/day',
    coords: [30.45, 32.35] as [number, number],
    color: 'hsl(35, 80%, 50%)',
  },
  {
    name: 'Bab el-Mandeb',
    width: '18 miles',
    share: 'Red Sea gateway',
    barrels: '6.2M barrels/day',
    coords: [12.58, 43.33] as [number, number],
    color: 'hsl(0, 65%, 50%)',
  },
  {
    name: 'Panama Canal',
    width: '110 ft above sea level',
    share: '5% of global trade',
    barrels: '0.9M barrels/day',
    coords: [9.08, -79.68] as [number, number],
    color: 'hsl(220, 55%, 45%)',
  },
];

/* ── Strait map view presets ── */
export const STRAIT_STAGES = [
  { center: [27, 52] as [number, number], zoom: 5, label: 'The Persian Gulf' },
  { center: [26.5, 56.2] as [number, number], zoom: 8, label: 'Approaching the Strait' },
  { center: [26.56, 56.25] as [number, number], zoom: 11, label: 'The Strait of Hormuz' },
  { center: [26.56, 56.3] as [number, number], zoom: 13, label: 'Traffic Separation Scheme' },
];
