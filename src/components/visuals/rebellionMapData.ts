/* ── Data for the 1857 Rebellion dual-wavefront map ──────── */

export interface TelegraphStation {
  name: string;
  lat: number;
  lng: number;
  /** Index along the line — lower = further east (Calcutta end) */
  order: number;
}

export interface RebellionCity {
  name: string;
  lat: number;
  lng: number;
  /** Phase at which this city's rebellion erupts */
  phase: number;
  date: string;
  description: string;
}

export interface ReinforcementRoute {
  name: string;
  coords: [number, number][];
}

/* ── Telegraph line: Calcutta → Delhi ────────────────────── */

export const TELEGRAPH_STATIONS: TelegraphStation[] = [
  { name: 'Calcutta', lat: 22.57, lng: 88.36, order: 0 },
  { name: 'Patna', lat: 25.61, lng: 85.14, order: 1 },
  { name: 'Benares', lat: 25.32, lng: 83.01, order: 2 },
  { name: 'Allahabad', lat: 25.43, lng: 81.85, order: 3 },
  { name: 'Kanpur', lat: 26.45, lng: 80.35, order: 4 },
  { name: 'Agra', lat: 27.18, lng: 78.02, order: 5 },
  { name: 'Delhi', lat: 28.65, lng: 77.23, order: 6 },
];

export const TELEGRAPH_LINE: [number, number][] = TELEGRAPH_STATIONS.map(s => [s.lat, s.lng]);

/* ── Rebellion cities ────────────────────────────────────── */

export const REBELLION_CITIES: RebellionCity[] = [
  { name: 'Meerut', lat: 28.98, lng: 77.71, phase: 2, date: 'May 10, 1857', description: 'The 3rd Light Cavalry mutinied after 85 sepoys were imprisoned for refusing greased cartridges.' },
  { name: 'Delhi', lat: 28.65, lng: 77.23, phase: 3, date: 'May 11, 1857', description: 'Sepoys from Meerut marched overnight to Delhi. The Mughal emperor Bahadur Shah II was proclaimed leader.' },
  { name: 'Kanpur', lat: 26.45, lng: 80.35, phase: 4, date: 'June 5, 1857', description: 'Nana Sahib led the rebellion here. The siege of the British entrenchment ended in massacre.' },
  { name: 'Lucknow', lat: 26.85, lng: 80.95, phase: 4, date: 'June 30, 1857', description: 'The Residency was besieged for 87 days. The siege became a symbol of both British endurance and Indian resistance.' },
  { name: 'Jhansi', lat: 25.45, lng: 78.57, phase: 4, date: 'June 1857', description: 'Rani Lakshmibai led one of the fiercest resistances against British reconquest.' },
  { name: 'Gwalior', lat: 26.22, lng: 78.18, phase: 4, date: 'June 1857', description: 'Fell to the rebels and became a major stronghold before British recapture.' },
  { name: 'Bareilly', lat: 28.37, lng: 79.42, phase: 4, date: 'May 31, 1857', description: 'Khan Bahadur Khan declared independence and governed the city during the rebellion.' },
  { name: 'Allahabad', lat: 25.43, lng: 81.85, phase: 4, date: 'June 6, 1857', description: 'Strategic junction of Ganges and Yamuna. Briefly fell before becoming a British staging point.' },
];

/* ── Wavefront polygons (irregular concentric shapes per phase) ── */

/** Returns rebellion wavefront polygons for a given phase */
export function getWavefrontPolygons(phase: number): [number, number][][] {
  const polygons: [number, number][][] = [];

  if (phase >= 2) {
    // Meerut initial eruption
    polygons.push([
      [29.4, 77.1], [29.5, 77.9], [29.2, 78.3],
      [28.6, 78.2], [28.5, 77.4], [28.8, 77.0],
    ]);
  }

  if (phase >= 3) {
    // Spread to Delhi corridor
    polygons.push([
      [29.6, 76.4], [29.7, 78.0], [29.3, 78.6],
      [28.2, 78.4], [27.9, 77.8], [28.0, 76.8],
      [28.5, 76.2], [29.2, 76.3],
    ]);
  }

  if (phase >= 4) {
    // Wide spread: Kanpur, Lucknow, Jhansi, Bareilly
    polygons.push([
      [29.8, 76.0], [30.0, 78.2], [29.5, 79.5],
      [28.0, 80.0], [26.2, 81.5], [25.0, 81.0],
      [25.0, 79.5], [25.2, 78.0], [26.0, 77.0],
      [27.5, 76.0], [28.8, 75.8],
    ]);
  }

  if (phase >= 5) {
    // Slightly contracted — reconquest pressure from edges
    polygons.push([
      [29.5, 76.5], [29.6, 78.0], [29.0, 79.0],
      [27.5, 79.8], [26.5, 80.5], [25.5, 80.0],
      [25.5, 78.5], [26.0, 77.5], [27.0, 76.8],
      [28.5, 76.3],
    ]);
  }

  if (phase >= 6) {
    // Final contraction — small pockets remain
    polygons.push([
      [29.0, 76.8], [29.2, 77.6], [28.8, 78.0],
      [28.2, 77.8], [28.0, 77.2], [28.5, 76.7],
    ]);
    polygons.push([
      [26.8, 80.2], [27.0, 81.0], [26.5, 81.2],
      [26.2, 80.5],
    ]);
  }

  return polygons;
}

/* ── British reinforcement routes ────────────────────────── */

export const REINFORCEMENT_ROUTES: ReinforcementRoute[] = [
  {
    name: 'Punjab → Delhi',
    coords: [
      [31.52, 74.35], // Lahore
      [30.73, 76.78], // Ambala
      [29.95, 76.88], // Karnal
      [28.65, 77.23], // Delhi
    ],
  },
  {
    name: 'Calcutta → Allahabad',
    coords: [
      [22.57, 88.36], // Calcutta
      [25.61, 85.14], // Patna
      [25.32, 83.01], // Benares
      [25.43, 81.85], // Allahabad
    ],
  },
];

/* ── Social network nodes (bazaars, regiments, villages) ── */

export interface SocialNode {
  name: string;
  lat: number;
  lng: number;
  type: 'bazaar' | 'regiment' | 'village' | 'court';
}

export const SOCIAL_NETWORK_NODES: SocialNode[] = [
  { name: 'Meerut Cantonment', lat: 28.98, lng: 77.71, type: 'regiment' },
  { name: 'Delhi Bazaar', lat: 28.66, lng: 77.24, type: 'bazaar' },
  { name: 'Lucknow Court', lat: 26.85, lng: 80.95, type: 'court' },
  { name: 'Kanpur Bazaar', lat: 26.45, lng: 80.35, type: 'bazaar' },
  { name: 'Barrackpore', lat: 22.76, lng: 88.37, type: 'regiment' },
  { name: 'Ambala Cantonment', lat: 30.38, lng: 76.77, type: 'regiment' },
  { name: 'Bareilly Bazaar', lat: 28.37, lng: 79.42, type: 'bazaar' },
  { name: 'Jhansi Fort', lat: 25.45, lng: 78.57, type: 'court' },
  { name: 'Gwalior Fort', lat: 26.22, lng: 78.18, type: 'court' },
  { name: 'Faizabad', lat: 26.78, lng: 82.15, type: 'village' },
  { name: 'Banda', lat: 25.48, lng: 80.33, type: 'village' },
  { name: 'Mathura', lat: 27.49, lng: 77.67, type: 'bazaar' },
  { name: 'Mainpuri', lat: 27.23, lng: 79.02, type: 'village' },
  { name: 'Shahjahanpur', lat: 27.88, lng: 79.91, type: 'village' },
];
