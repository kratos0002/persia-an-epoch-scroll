/* ── Ramayana Route Map Data ── */

export interface RamayanaMarker {
  coords: [number, number];
  label: string;
  detail?: string;
}

export interface RamayanaStage {
  id: string;
  center: [number, number];
  zoom: number;
  label: string;
  year: string;
  cardPosition: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center';
  routeUpTo: number; // draw route segments 0..N
  markers: RamayanaMarker[];
  narrative: {
    title: string;
    body: string;
    accent?: string;
  };
}

/* ── Colour tokens ── */
export const RM = {
  SAFFRON:   'hsl(25, 85%, 52%)',
  EARTH:     'hsl(25, 30%, 10%)',
  SANDSTONE: 'hsl(35, 40%, 85%)',
  FOREST:    'hsl(140, 35%, 30%)',
  OCEAN:     'hsl(210, 50%, 35%)',
  GOLD:      'hsl(43, 80%, 55%)',
} as const;

/* ── Route segments (ordered waypoints) ── */
export const ROUTE_SEGMENTS: [number, number][][] = [
  // 0: Ayodhya → Shringverpur
  [[26.80, 82.19], [25.39, 81.88]],
  // 1: Shringverpur → Chitrakoot
  [[25.39, 81.88], [25.20, 80.83]],
  // 2: Chitrakoot → Dandakaranya (central India)
  [[25.20, 80.83], [22.50, 79.50], [20.50, 79.00]],
  // 3: Dandakaranya → Panchavati (Nashik)
  [[20.50, 79.00], [19.98, 73.79]],
  // 4: Panchavati → Kishkindha (Hampi)
  [[19.98, 73.79], [18.50, 76.00], [15.34, 76.46]],
  // 5: Kishkindha → Rameshwaram
  [[15.34, 76.46], [12.50, 78.00], [9.29, 79.31]],
  // 6: Rameshwaram → Lanka
  [[9.29, 79.31], [8.50, 79.70], [7.87, 79.87], [7.29, 80.63]],
];

/* ── Full route as a flat list (for the return leg) ── */
export const FULL_ROUTE: [number, number][] = ROUTE_SEGMENTS.flat();

/* ── Zoom stages ── */
export const STAGES: RamayanaStage[] = [
  {
    id: 'ramayana-hero',
    center: [20.0, 79.0],
    zoom: 5,
    label: 'The Indian Subcontinent',
    year: '',
    cardPosition: 'center',
    routeUpTo: -1,
    markers: [],
    narrative: {
      title: 'The Exile Begins',
      body: 'A 2,500-kilometre journey from the northern plains to the southern sea. One prince, fourteen years, and a route that would become the most retold story in human history.',
    },
  },
  {
    id: 'ayodhya',
    center: [26.80, 82.19],
    zoom: 12,
    label: 'Ayodhya — The Departure',
    year: 'Year 0',
    cardPosition: 'bottom-left',
    routeUpTo: -1,
    markers: [{ coords: [26.80, 82.19], label: 'Ayodhya', detail: 'Capital of the Kosala Kingdom' }],
    narrative: {
      title: 'Ayodhya',
      body: 'Rama, crown prince of Kosala, is exiled for fourteen years on the eve of his coronation. He leaves with Sita and Lakshmana — walking south into the forest.',
      accent: 'The prince who left a throne and followed a river.',
    },
  },
  {
    id: 'shringverpur',
    center: [25.39, 81.88],
    zoom: 11,
    label: 'Shringverpur — The Crossing',
    year: 'Year 0',
    cardPosition: 'bottom-right',
    routeUpTo: 0,
    markers: [
      { coords: [25.39, 81.88], label: 'Shringverpur', detail: 'The boatman Guha ferries them across the Ganga' },
    ],
    narrative: {
      title: 'The River Crossing',
      body: 'At the banks of the Ganga, the boatman Guha refuses payment. He asks only to wash Rama\'s feet before carrying them across. The first of many who would help without being asked.',
    },
  },
  {
    id: 'chitrakoot',
    center: [25.20, 80.83],
    zoom: 11,
    label: 'Chitrakoot — The Forest Court',
    year: 'Year 1',
    cardPosition: 'bottom-left',
    routeUpTo: 1,
    markers: [
      { coords: [25.20, 80.83], label: 'Chitrakoot', detail: 'Bharata comes to beg Rama\'s return' },
    ],
    narrative: {
      title: 'The Forest Court',
      body: 'Bharata arrives with the entire court — begging Rama to return and rule. Rama refuses. Bharata carries his sandals back to Ayodhya and governs in their name for fourteen years.',
      accent: 'A kingdom ruled by a pair of sandals.',
    },
  },
  {
    id: 'dandakaranya',
    center: [20.50, 79.00],
    zoom: 8,
    label: 'Dandakaranya — The Deep Wilderness',
    year: 'Years 2–12',
    cardPosition: 'bottom-right',
    routeUpTo: 2,
    markers: [
      { coords: [20.50, 79.00], label: 'Dandakaranya', detail: 'A decade in the deep forest of central India' },
    ],
    narrative: {
      title: 'The Wilderness Years',
      body: 'For ten years, Rama, Sita, and Lakshmana live among sages in the vast Dandakaranya forest — a belt of wilderness stretching across central India. They move between hermitages. The forest is not empty; it is full of those who chose to leave the world.',
    },
  },
  {
    id: 'panchavati',
    center: [19.98, 73.79],
    zoom: 12,
    label: 'Panchavati — The Abduction',
    year: 'Year 13',
    cardPosition: 'top-right',
    routeUpTo: 3,
    markers: [
      { coords: [19.98, 73.79], label: 'Panchavati', detail: 'Sita is abducted by Ravana' },
    ],
    narrative: {
      title: 'The Turning Point',
      body: 'At Panchavati, near modern Nashik, the story breaks. Ravana, king of Lanka, abducts Sita — carrying her south across the sky. The exile becomes a rescue mission. The wanderer becomes a warrior.',
      accent: 'Everything that follows flows from this moment.',
    },
  },
  {
    id: 'kishkindha',
    center: [15.34, 76.46],
    zoom: 11,
    label: 'Kishkindha — The Alliance',
    year: 'Year 13',
    cardPosition: 'bottom-left',
    routeUpTo: 4,
    markers: [
      { coords: [15.34, 76.46], label: 'Kishkindha', detail: 'Alliance with Sugriva and Hanuman' },
    ],
    narrative: {
      title: 'The Alliance',
      body: 'In the rocky hills near modern Hampi, Rama meets Hanuman and forges an alliance with the vanara king Sugriva. Hanuman leaps across the sea to Lanka, finds Sita, and returns with proof. The army gathers.',
    },
  },
  {
    id: 'rameshwaram',
    center: [9.29, 79.31],
    zoom: 10,
    label: 'Rameshwaram — The Bridge',
    year: 'Year 14',
    cardPosition: 'bottom-right',
    routeUpTo: 5,
    markers: [
      { coords: [9.29, 79.31], label: 'Rameshwaram', detail: 'The bridge to Lanka is built' },
    ],
    narrative: {
      title: 'The Bridge',
      body: 'At the southern tip of India, Rama\'s army builds a bridge of stones across the strait to Lanka. NASA satellite images show a chain of limestone shoals between India and Sri Lanka — the Adam\'s Bridge — following almost exactly the path described in the epic.',
      accent: '48 km of coral and sandstone, 7,000 years old.',
    },
  },
  {
    id: 'lanka',
    center: [7.29, 80.63],
    zoom: 9,
    label: 'Lanka — The War',
    year: 'Year 14',
    cardPosition: 'center',
    routeUpTo: 6,
    markers: [
      { coords: [7.29, 80.63], label: 'Lanka', detail: 'The war with Ravana' },
    ],
    narrative: {
      title: 'Lanka',
      body: 'The war lasts days, not years. Ravana falls. Sita is freed. But the victory is bittersweet — the cost of what was lost and what was proven lingers. Rama turns north.',
      accent: 'The war ended. The questions didn\'t.',
    },
  },
  {
    id: 'ramayana-return',
    center: [20.0, 79.0],
    zoom: 5,
    label: 'The Return to Ayodhya',
    year: 'Year 14',
    cardPosition: 'center',
    routeUpTo: 6,
    markers: [
      { coords: [26.80, 82.19], label: 'Ayodhya', detail: 'The homecoming — Diwali' },
    ],
    narrative: {
      title: 'The Return',
      body: 'Rama returns to Ayodhya by air — in the Pushpaka Vimana. The city lights lamps to welcome him home. This is the origin of Diwali — the festival of lights. Fourteen years. 2,500 kilometres. The exile is over.',
      accent: 'A billion lamps, lit every year, for a homecoming that may never have happened.',
    },
  },
];

export const TOTAL_DISTANCE_KM = 2500;
