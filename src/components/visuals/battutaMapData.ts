/* ── Ibn Battuta Route Map Data ── */

export interface BattutaStop {
  coords: [number, number];
  label: string;
  date: string;
  detail?: string;
}

export interface BattutaPhase {
  id: string;
  label: string;
  dateRange: string;
  distance: string;
  color: string;
  stops: BattutaStop[];
}

/* ── Colour tokens — Leather, Ink, and Saffron palette ── */
export const IB = {
  /* page ground */
  PARCHMENT:    'hsl(38, 35%, 88%)',
  PARCHMENT_DK: 'hsl(34, 30%, 78%)',
  /* leather & binding */
  LEATHER:      'hsl(25, 45%, 22%)',
  LEATHER_MID:  'hsl(25, 40%, 30%)',
  /* inks */
  INK:          'hsl(30, 15%, 15%)',
  INK_LIGHT:    'hsl(30, 12%, 35%)',
  /* accents */
  SAFFRON:      'hsl(38, 80%, 55%)',
  SAFFRON_DIM:  'hsl(38, 55%, 42%)',
  LAPIS:        'hsl(215, 55%, 42%)',
  LAPIS_LIGHT:  'hsl(215, 45%, 55%)',
  HENNA:        'hsl(15, 60%, 45%)',
  MONSOON:      'hsl(195, 40%, 50%)',
  SAND:         'hsl(40, 30%, 72%)',
  EMERALD:      'hsl(155, 40%, 35%)',
  /* legacy aliases */
  GOLD:         'hsl(38, 80%, 55%)',
  DARK:         'hsl(25, 45%, 22%)',
} as const;

/* ── Seven travel phases ── */
export const PHASES: BattutaPhase[] = [
  {
    id: 'phase-1',
    label: 'North Africa to Mecca',
    dateRange: '1325–1326',
    distance: '~3,500 km',
    color: IB.SAFFRON,
    stops: [
      { coords: [35.759, -5.833], label: 'Tangier', date: 'June 1325', detail: 'Departure — set out alone on a donkey' },
      { coords: [34.878, -1.314], label: 'Tlemcen', date: '1325', detail: 'Busy trading city of the interior' },
      { coords: [36.806, 10.181], label: 'Tunis', date: '1325', detail: 'Stayed 2 months; appointed caravan qadi' },
      { coords: [32.887, 13.180], label: 'Tripoli', date: '1325', detail: 'Escaped a bandit attack near the city' },
      { coords: [31.200, 29.919], label: 'Alexandria', date: 'April 1326', detail: 'Witnessed the decaying Pharos Lighthouse' },
      { coords: [30.044, 31.235], label: 'Cairo', date: '1326', detail: '"Mother of Cities" — pop. 600,000' },
      { coords: [33.513, 36.276], label: 'Damascus', date: 'August 1326', detail: 'Joined the official Damascus Hajj caravan' },
      { coords: [24.468, 39.611], label: 'Medina', date: 'late 1326', detail: 'Visited the Prophet\'s Mosque' },
      { coords: [21.422, 39.826], label: 'Mecca', date: 'late 1326', detail: 'Completed first Hajj' },
    ],
  },
  {
    id: 'phase-2',
    label: 'Iraq, Persia & East Africa',
    dateRange: '1326–1332',
    distance: '~8,000 km',
    color: IB.LAPIS,
    stops: [
      { coords: [33.312, 44.366], label: 'Baghdad', date: 'June 1327', detail: 'Met Sultan Abu Sa\'id; city partially recovered' },
      { coords: [38.080, 46.291], label: 'Tabriz', date: '1327', detail: 'Major Silk Road hub under the Ilkhanate' },
      { coords: [23.614, 58.545], label: 'Muscat', date: '1329', detail: 'Visited Qalhat and the Omani coast' },
      { coords: [12.812, 45.028], label: 'Aden', date: '1329', detail: 'Strategic port — spices and Indian textiles' },
      { coords: [2.047, 45.318], label: 'Mogadishu', date: '1332', detail: 'Zenith of prosperity; high-quality fabric exports' },
      { coords: [-8.950, 39.516], label: 'Kilwa', date: '1332', detail: '"One of the most beautiful cities" — stone houses' },
    ],
  },
  {
    id: 'phase-3',
    label: 'Anatolia & the Golden Horde',
    dateRange: '1332–1334',
    distance: '~6,000 km',
    color: IB.HENNA,
    stops: [
      { coords: [37.872, 32.493], label: 'Konya', date: '1332', detail: 'Visited Rumi\'s tomb; met the fityan' },
      { coords: [42.015, 41.634], label: 'Sinope', date: '1332', detail: 'Black Sea port — crossed to Crimea' },
      { coords: [44.952, 34.102], label: 'Crimea', date: '1333', detail: 'Entered the territory of the Golden Horde' },
      { coords: [48.692, 44.481], label: 'Sarai Berke', date: '1333', detail: 'Capital of the Golden Horde — met Uzbeg Khan' },
      { coords: [41.008, 28.978], label: 'Constantinople', date: '1334', detail: 'Accompanied Princess Bayalun; awed by Hagia Sophia' },
    ],
  },
  {
    id: 'phase-4',
    label: 'The Delhi Sultanate',
    dateRange: '1334–1341',
    distance: '~4,500 km',
    color: IB.EMERALD,
    stops: [
      { coords: [39.768, 64.421], label: 'Balkh', date: '1334', detail: 'Crossed the Hindu Kush — "Hindu-slayer"' },
      { coords: [34.521, 69.172], label: 'Kabul', date: '1334', detail: 'On the road to Delhi' },
      { coords: [30.203, 71.454], label: 'Multan', date: '1334', detail: 'Entry into the Delhi Sultanate' },
      { coords: [28.613, 77.209], label: 'Delhi', date: '1334', detail: 'Appointed Qadi; 7 years of luxury and terror' },
      { coords: [19.877, 75.343], label: 'Daulatabad', date: '1341', detail: 'Visited the site of Tughluq\'s failed migration' },
      { coords: [11.258, 75.780], label: 'Calicut', date: '1341', detail: 'En route to China; hosted by the Zamorin' },
    ],
  },
  {
    id: 'phase-5',
    label: 'Maldives to China',
    dateRange: '1341–1346',
    distance: '~12,000 km',
    color: IB.MONSOON,
    stops: [
      { coords: [4.175, 73.509], label: 'Malé', date: '1342', detail: 'Served as qadi for nearly two years' },
      { coords: [7.293, 80.636], label: 'Sri Lanka', date: '1344', detail: 'Visited Adam\'s Peak' },
      { coords: [6.125, 100.470], label: 'Malay Peninsula', date: '1345', detail: 'Southeast Asian kingdoms' },
      { coords: [24.874, 118.675], label: 'Quanzhou', date: '1345', detail: 'Zaytun — major Chinese port' },
      { coords: [30.274, 120.155], label: 'Hangzhou', date: '1346', detail: '"The greatest city I have ever seen"' },
      { coords: [39.904, 116.391], label: 'Beijing', date: '1346', detail: 'Khan Baliq — debated visit' },
    ],
  },
  {
    id: 'phase-6',
    label: 'The Black Death Return',
    dateRange: '1346–1349',
    distance: '~8,000 km',
    color: 'hsl(0, 0%, 40%)',
    stops: [
      { coords: [24.874, 118.675], label: 'Quanzhou', date: '1346', detail: 'Began the long journey home' },
      { coords: [4.175, 73.509], label: 'Malé', date: '1347', detail: 'Passed through again on the return' },
      { coords: [21.422, 39.826], label: 'Mecca', date: '1348', detail: 'Final pilgrimage' },
      { coords: [30.044, 31.235], label: 'Cairo', date: '1348', detail: '24,000 dead per day at the plague\'s peak' },
      { coords: [33.513, 36.276], label: 'Damascus', date: '1348', detail: '2,400 dead per day; interfaith prayer' },
      { coords: [31.200, 29.919], label: 'Alexandria', date: '1349', detail: '1,080 dead per day; plague abating' },
      { coords: [35.759, -5.833], label: 'Tangier', date: '1349', detail: 'Mother dead of plague months earlier' },
    ],
  },
  {
    id: 'phase-7',
    label: 'Al-Andalus & Mali',
    dateRange: '1349–1354',
    distance: '~6,000 km',
    color: IB.SAND,
    stops: [
      { coords: [37.176, -3.588], label: 'Granada', date: '1350', detail: 'Defended against Christian invasion' },
      { coords: [34.033, -5.000], label: 'Fez', date: '1350', detail: 'Return to Morocco' },
      { coords: [31.716, -4.002], label: 'Sijilmasa', date: '1352', detail: 'Gateway to the Sahara' },
      { coords: [22.674, -5.722], label: 'Taghaza', date: '1352', detail: 'Salt mines in the deep desert' },
      { coords: [16.766, -3.002], label: 'Timbuktu', date: '1353', detail: 'Center of Saharan learning' },
      { coords: [12.650, -8.000], label: 'Mali (Capital)', date: '1353', detail: 'Met Mansa Suleyman; eyewitness to West African society' },
      { coords: [34.033, -5.000], label: 'Fez', date: '1354', detail: 'Final return — dictation of the Rihla begins' },
    ],
  },
];

/* ── All stops flattened ── */
export const ALL_STOPS: BattutaStop[] = PHASES.flatMap(p => p.stops);

/* ── Full route as coordinate array ── */
export const FULL_ROUTE: [number, number][] = PHASES.flatMap(p => p.stops.map(s => s.coords));

/* ── Phase route segments ── */
export function getPhaseRoute(phaseIndex: number): [number, number][] {
  return PHASES[phaseIndex]?.stops.map(s => s.coords) || [];
}

/* ── Cumulative route up to phase N ── */
export function getCumulativeRoute(upToPhase: number): [number, number][] {
  return PHASES.slice(0, upToPhase + 1).flatMap(p => p.stops.map(s => s.coords));
}

/* ── Black Death statistics ── */
export const BLACK_DEATH_CITIES = [
  { city: 'Cairo', dailyDead: 24000, coords: [30.044, 31.235] as [number, number] },
  { city: 'Damascus', dailyDead: 2400, coords: [33.513, 36.276] as [number, number] },
  { city: 'Alexandria', dailyDead: 1080, coords: [31.200, 29.919] as [number, number] },
  { city: 'Gaza', dailyDead: 1100, coords: [31.503, 34.466] as [number, number] },
];

/* ── Comparative travel statistics ── */
export const TRAVEL_COMPARISONS = [
  { explorer: 'Ibn Battuta', years: '1325–1354', distance: 117000, label: '~3× Earth\'s circumference' },
  { explorer: 'Zheng He', years: '1405–1433', distance: 50000, label: 'Indian Ocean voyages' },
  { explorer: 'Marco Polo', years: '1271–1295', distance: 24000, label: '~1/5 of Ibn Battuta' },
];

/* ── Islamic Commonwealth network nodes ── */
export const NETWORK_NODES = [
  { id: 'madrasa', label: 'Madrasas', detail: 'Standardized legal curriculum', icon: '📚' },
  { id: 'qadi', label: 'Qadi Courts', detail: 'Foreign judges as neutral arbitrators', icon: '⚖️' },
  { id: 'zawiya', label: 'Sufi Zawiyas', detail: 'Free lodging for travelers', icon: '🕌' },
  { id: 'arabic', label: 'Arabic Language', detail: 'Shared language of law & religion', icon: '✍️' },
  { id: 'trade', label: 'Trade Networks', detail: 'Trans-Saharan, Indian Ocean, Silk Road', icon: '🚢' },
  { id: 'hajj', label: 'Hajj Routes', detail: 'Annual pilgrimage infrastructure', icon: '🕋' },
];

/* ── Section definitions for scroll spy ── */
export const BATTUTA_SECTIONS = [
  { id: 'battuta-hero', label: 'The Odyssey', year: '' },
  { id: 'battuta-genesis', label: 'Tangier', year: '1304' },
  { id: 'phase-1', label: 'North Africa → Mecca', year: '1325' },
  { id: 'phase-2', label: 'Iraq, Persia & East Africa', year: '1327' },
  { id: 'phase-3', label: 'Anatolia & Golden Horde', year: '1332' },
  { id: 'phase-4', label: 'The Delhi Sultanate', year: '1334' },
  { id: 'phase-5', label: 'Maldives → China', year: '1341' },
  { id: 'phase-6', label: 'The Black Death', year: '1346' },
  { id: 'phase-7', label: 'Al-Andalus & Mali', year: '1349' },
  { id: 'battuta-commonwealth', label: 'The Commonwealth', year: '' },
  { id: 'battuta-scale', label: 'Comparative Scale', year: '' },
  { id: 'battuta-epilogue', label: 'Epilogue', year: '' },
];
