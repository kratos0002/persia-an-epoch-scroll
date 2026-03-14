export const STRAIT_STAGES = [
  { center: [27, 52] as [number, number], zoom: 5, label: 'The Persian Gulf' },
  { center: [26.5, 56.2] as [number, number], zoom: 8, label: 'Approaching the Strait' },
  { center: [26.56, 56.25] as [number, number], zoom: 11, label: 'The Strait of Hormuz' },
  { center: [26.56, 56.3] as [number, number], zoom: 13, label: 'Traffic Separation Scheme' },
];

// Tanker lane polylines (approximate shipping lanes through Hormuz)
export const INBOUND_LANE: [number, number][] = [
  [25.5, 57.2],
  [26.2, 56.6],
  [26.45, 56.35],
  [26.7, 56.0],
  [27.0, 55.5],
];

export const OUTBOUND_LANE: [number, number][] = [
  [27.0, 55.3],
  [26.6, 55.9],
  [26.35, 56.25],
  [26.1, 56.5],
  [25.4, 57.1],
];

export const GULF_CITIES = [
  { name: 'Bandar Abbas', coords: [27.18, 56.27] as [number, number], country: 'Iran' },
  { name: 'Muscat', coords: [23.59, 58.54] as [number, number], country: 'Oman' },
  { name: 'Dubai', coords: [25.2, 55.27] as [number, number], country: 'UAE' },
  { name: 'Hormuz Island', coords: [27.06, 56.46] as [number, number], country: 'Iran' },
  { name: 'Khasab', coords: [26.18, 56.25] as [number, number], country: 'Oman' },
];

export const CHOKEPOINTS = [
  {
    name: 'Strait of Hormuz',
    width: '21 miles',
    share: '21% of global oil',
    barrels: '21M barrels/day',
    coords: [26.56, 56.25] as [number, number],
    color: 'hsl(195, 55%, 35%)',
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

export const TANKER_WAR_EVENTS = [
  { year: 1984, label: 'Tanker War begins', detail: 'Iraq starts attacking Iranian oil tankers; Iran retaliates against Gulf shipping.' },
  { year: 1986, label: 'Operation Earnest Will', detail: 'US Navy begins escorting reflagged Kuwaiti tankers through the strait.' },
  { year: 1987, label: 'USS Stark attacked', detail: 'Iraqi jet fires two Exocet missiles at the USS Stark, killing 37 sailors.' },
  { year: 1988, label: 'Operation Praying Mantis', detail: 'Largest US naval engagement since WWII — retaliatory strike after USS Samuel B. Roberts hits an Iranian mine.' },
  { year: 1988, label: 'Iran Air Flight 655', detail: 'USS Vincennes shoots down Iranian civilian airliner, killing 290 passengers.' },
];

export const TRUCIAL_STATES = [
  { name: 'Abu Dhabi', coords: [24.45, 54.65] as [number, number] },
  { name: 'Dubai', coords: [25.2, 55.27] as [number, number] },
  { name: 'Sharjah', coords: [25.35, 55.4] as [number, number] },
  { name: 'Ajman', coords: [25.4, 55.45] as [number, number] },
  { name: 'Umm al-Quwain', coords: [25.56, 55.55] as [number, number] },
  { name: "Ras al-Khaimah", coords: [25.79, 55.94] as [number, number] },
  { name: 'Fujairah', coords: [25.12, 56.33] as [number, number] },
];
