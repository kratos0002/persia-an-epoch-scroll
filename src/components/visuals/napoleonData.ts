// ── Napoleon Data ─────────────────────────────────────────────
// Nation blocks, coalition phases, battle stats

export interface NationBlock {
  id: string;
  name: string;
  shortName: string;
  flagColors: string[]; // 1-3 colors for visual identity
  gridCol: number;
  gridRow: number;
}

export type NationStatus = 'allied' | 'enemy' | 'conquered' | 'neutral' | 'france';

export const NATIONS: NationBlock[] = [
  { id: 'britain',  name: 'Britain',        shortName: 'GB',  flagColors: ['hsl(0,65%,48%)', 'hsl(220,65%,45%)', 'hsl(0,0%,95%)'], gridCol: 1, gridRow: 1 },
  { id: 'holland',  name: 'Holland',        shortName: 'NL',  flagColors: ['hsl(20,80%,50%)', 'hsl(0,0%,95%)', 'hsl(220,65%,45%)'], gridCol: 2, gridRow: 1 },
  { id: 'prussia',  name: 'Prussia',        shortName: 'PR',  flagColors: ['hsl(0,0%,15%)', 'hsl(0,0%,95%)'],                      gridCol: 3, gridRow: 1 },
  { id: 'russia',   name: 'Russia',         shortName: 'RU',  flagColors: ['hsl(0,0%,95%)', 'hsl(220,65%,45%)', 'hsl(0,65%,48%)'], gridCol: 4, gridRow: 1 },
  { id: 'sweden',   name: 'Sweden',         shortName: 'SE',  flagColors: ['hsl(220,65%,45%)', 'hsl(50,80%,50%)'],                 gridCol: 5, gridRow: 1 },
  { id: 'france',   name: 'France',         shortName: 'FR',  flagColors: ['hsl(220,65%,45%)', 'hsl(0,0%,95%)', 'hsl(0,65%,48%)'], gridCol: 2, gridRow: 2 },
  { id: 'austria',  name: 'Austria',        shortName: 'AT',  flagColors: ['hsl(0,65%,48%)', 'hsl(0,0%,95%)'],                     gridCol: 3, gridRow: 2 },
  { id: 'ottoman',  name: 'Ottoman Empire', shortName: 'OT',  flagColors: ['hsl(0,65%,48%)', 'hsl(0,0%,95%)'],                     gridCol: 5, gridRow: 2 },
  { id: 'spain',    name: 'Spain',          shortName: 'ES',  flagColors: ['hsl(0,65%,48%)', 'hsl(45,85%,50%)'],                   gridCol: 1, gridRow: 3 },
  { id: 'portugal', name: 'Portugal',       shortName: 'PT',  flagColors: ['hsl(120,40%,35%)', 'hsl(0,65%,48%)'],                  gridCol: 1, gridRow: 2 },
  { id: 'italy',    name: 'Italian States', shortName: 'IT',  flagColors: ['hsl(120,40%,35%)', 'hsl(0,0%,95%)', 'hsl(0,65%,48%)'], gridCol: 2, gridRow: 3 },
  { id: 'naples',   name: 'Naples',         shortName: 'NA',  flagColors: ['hsl(0,0%,95%)', 'hsl(0,65%,48%)'],                     gridCol: 3, gridRow: 3 },
  { id: 'bavaria',  name: 'Bavaria',        shortName: 'BV',  flagColors: ['hsl(220,65%,45%)', 'hsl(0,0%,95%)'],                   gridCol: 4, gridRow: 2 },
  { id: 'poland',   name: 'Poland',         shortName: 'PL',  flagColors: ['hsl(0,0%,95%)', 'hsl(0,65%,48%)'],                     gridCol: 4, gridRow: 3 },
];

// Per-phase nation statuses
export const COALITION_PHASES: Record<number, Record<string, NationStatus>> = {
  0: { // Pre-revolution — old regime
    france: 'france', britain: 'neutral', austria: 'neutral', prussia: 'neutral',
    russia: 'neutral', spain: 'neutral', holland: 'neutral', italy: 'neutral',
    ottoman: 'neutral', sweden: 'neutral', portugal: 'neutral', naples: 'neutral',
    bavaria: 'neutral', poland: 'neutral',
  },
  1: { // Revolution — France shatters, reforms
    france: 'france', britain: 'neutral', austria: 'neutral', prussia: 'neutral',
    russia: 'neutral', spain: 'neutral', holland: 'neutral', italy: 'neutral',
    ottoman: 'neutral', sweden: 'neutral', portugal: 'neutral', naples: 'neutral',
    bavaria: 'neutral', poland: 'neutral',
  },
  2: { // First Coalition
    france: 'france', britain: 'enemy', austria: 'enemy', prussia: 'enemy',
    russia: 'neutral', spain: 'enemy', holland: 'enemy', italy: 'neutral',
    ottoman: 'neutral', sweden: 'neutral', portugal: 'enemy', naples: 'enemy',
    bavaria: 'neutral', poland: 'neutral',
  },
  3: { // Italian campaigns
    france: 'france', britain: 'enemy', austria: 'enemy', prussia: 'neutral',
    russia: 'neutral', spain: 'neutral', holland: 'conquered', italy: 'conquered',
    ottoman: 'neutral', sweden: 'neutral', portugal: 'neutral', naples: 'conquered',
    bavaria: 'neutral', poland: 'neutral',
  },
  4: { // Emperor — France expands
    france: 'france', britain: 'enemy', austria: 'enemy', prussia: 'neutral',
    russia: 'neutral', spain: 'allied', holland: 'conquered', italy: 'conquered',
    ottoman: 'neutral', sweden: 'neutral', portugal: 'neutral', naples: 'conquered',
    bavaria: 'allied', poland: 'allied',
  },
  5: { // Tilsit zenith
    france: 'france', britain: 'enemy', austria: 'neutral', prussia: 'neutral',
    russia: 'allied', spain: 'allied', holland: 'conquered', italy: 'conquered',
    ottoman: 'neutral', sweden: 'neutral', portugal: 'neutral', naples: 'conquered',
    bavaria: 'allied', poland: 'allied',
  },
  6: { // Spanish ulcer + Russia turns
    france: 'france', britain: 'enemy', austria: 'enemy', prussia: 'neutral',
    russia: 'enemy', spain: 'enemy', holland: 'conquered', italy: 'conquered',
    ottoman: 'neutral', sweden: 'enemy', portugal: 'enemy', naples: 'conquered',
    bavaria: 'allied', poland: 'allied',
  },
  7: { // Leipzig — all against France
    france: 'france', britain: 'enemy', austria: 'enemy', prussia: 'enemy',
    russia: 'enemy', spain: 'enemy', holland: 'enemy', italy: 'enemy',
    ottoman: 'neutral', sweden: 'enemy', portugal: 'enemy', naples: 'enemy',
    bavaria: 'enemy', poland: 'neutral',
  },
  8: { // Waterloo — France alone
    france: 'france', britain: 'enemy', austria: 'enemy', prussia: 'enemy',
    russia: 'enemy', spain: 'enemy', holland: 'enemy', italy: 'enemy',
    ottoman: 'neutral', sweden: 'enemy', portugal: 'enemy', naples: 'enemy',
    bavaria: 'enemy', poland: 'neutral',
  },
};

export interface BattleStat {
  name: string;
  year: number;
  french: number;
  coalition: number;
  result: 'victory' | 'defeat';
  casualties: { french: number; coalition: number };
}

export const KEY_BATTLES: BattleStat[] = [
  { name: 'Toulon',      year: 1793, french: 18000,  coalition: 15000,  result: 'victory', casualties: { french: 2000,  coalition: 4000 } },
  { name: 'Arcole',      year: 1796, french: 20000,  coalition: 24000,  result: 'victory', casualties: { french: 4500,  coalition: 7000 } },
  { name: 'Marengo',     year: 1800, french: 28000,  coalition: 31000,  result: 'victory', casualties: { french: 5800,  coalition: 9400 } },
  { name: 'Austerlitz',  year: 1805, french: 73000,  coalition: 85400,  result: 'victory', casualties: { french: 9000,  coalition: 36000 } },
  { name: 'Jena',        year: 1806, french: 54000,  coalition: 53000,  result: 'victory', casualties: { french: 5000,  coalition: 25000 } },
  { name: 'Wagram',      year: 1809, french: 154000, coalition: 136000, result: 'victory', casualties: { french: 34000, coalition: 40000 } },
  { name: 'Borodino',    year: 1812, french: 130000, coalition: 120000, result: 'victory', casualties: { french: 30000, coalition: 44000 } },
  { name: 'Leipzig',     year: 1813, french: 195000, coalition: 365000, result: 'defeat',  casualties: { french: 73000, coalition: 54000 } },
  { name: 'Waterloo',    year: 1815, french: 73000,  coalition: 118000, result: 'defeat',  casualties: { french: 41000, coalition: 24000 } },
];

export const MOSCOW_MARCH = {
  start: 685000,
  end: 120000,
  points: [
    { label: 'Kovno (Start)', size: 685000, x: 0 },
    { label: 'Vilna', size: 600000, x: 12 },
    { label: 'Vitebsk', size: 400000, x: 28 },
    { label: 'Smolensk', size: 340000, x: 42 },
    { label: 'Borodino', size: 300000, x: 65 },
    { label: 'Moscow', size: 270000, x: 80 },
    { label: 'Smolensk (return)', size: 180000, x: 60 },
    { label: 'Berezina', size: 150000, x: 30 },
    { label: 'Kovno (End)', size: 120000, x: 0 },
  ],
};

export const LEGACY_ITEMS = [
  { title: 'The Civil Code', desc: 'Adopted by 70+ nations. The foundation of modern civil law in Europe, Latin America, and beyond.' },
  { title: 'The Metric System', desc: 'Standardized measurement, now used by every country on Earth except three.' },
  { title: 'Modern Bureaucracy', desc: 'Prefectures, centralized administration, merit-based appointment — the modern state.' },
  { title: 'Nationalism', desc: 'By redrawing Europe, Napoleon awakened the very nationalism that destroyed his empire.' },
  { title: 'The End of Feudalism', desc: 'Wherever his armies marched, feudal privileges were abolished and would never fully return.' },
  { title: 'Public Education', desc: 'The lycée system — state-run secondary schools — became a model across Europe.' },
];
