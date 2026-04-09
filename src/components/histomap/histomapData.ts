import { STORY_REGISTRY } from '@/lib/storyRegistry';

/* ─── Civilizations ─── */
export interface Civilization {
  id: string;
  name: string;
  color: string;        // HSL string
  colorMuted: string;   // desaturated version
}

export const CIVILIZATIONS: Civilization[] = [
  { id: 'egypt',       name: 'Egypt',                color: 'hsl(43, 75%, 55%)',  colorMuted: 'hsl(43, 20%, 55%)' },
  { id: 'mesopotamia', name: 'Mesopotamia',          color: 'hsl(30, 60%, 48%)',  colorMuted: 'hsl(30, 15%, 48%)' },
  { id: 'india',       name: 'India',                color: 'hsl(25, 80%, 52%)',  colorMuted: 'hsl(25, 20%, 52%)' },
  { id: 'persia',      name: 'Persia',               color: 'hsl(280, 45%, 45%)', colorMuted: 'hsl(280, 12%, 45%)' },
  { id: 'greece',      name: 'Greece',               color: 'hsl(170, 40%, 42%)', colorMuted: 'hsl(170, 12%, 42%)' },
  { id: 'rome',        name: 'Rome',                 color: 'hsl(0, 55%, 45%)',   colorMuted: 'hsl(0, 15%, 45%)' },
  { id: 'china',       name: 'China',                color: 'hsl(145, 50%, 38%)', colorMuted: 'hsl(145, 12%, 38%)' },
  { id: 'islamic',     name: 'Islamic Caliphates',   color: 'hsl(155, 55%, 40%)', colorMuted: 'hsl(155, 15%, 40%)' },
  { id: 'mongol',      name: 'Mongol Empire',        color: 'hsl(25, 50%, 38%)',  colorMuted: 'hsl(25, 12%, 38%)' },
  { id: 'ottoman',     name: 'Ottoman Empire',       color: 'hsl(355, 55%, 40%)', colorMuted: 'hsl(355, 15%, 40%)' },
  { id: 'european',    name: 'European Colonial',    color: 'hsl(220, 35%, 45%)', colorMuted: 'hsl(220, 10%, 45%)' },
  { id: 'japan',       name: 'Japan',                color: 'hsl(5, 70%, 50%)',   colorMuted: 'hsl(5, 18%, 50%)' },
  { id: 'british',     name: 'British Empire',       color: 'hsl(210, 45%, 48%)', colorMuted: 'hsl(210, 12%, 48%)' },
  { id: 'modern',      name: 'Modern Nation-States', color: 'hsl(200, 25%, 55%)', colorMuted: 'hsl(200, 8%, 55%)' },
];

export const CIV_IDS = CIVILIZATIONS.map(c => c.id);

/* ─── Time-series: relative "weight" per civilization per era ─── */
// Values are relative proportions (0–100 scale per row, though they needn't sum to 100 — D3 stack normalizes)
// ~50 data points spanning 3000 BCE to 2024 CE

export interface TimePoint {
  year: number;
  [civId: string]: number;
}

export const TIME_SERIES: TimePoint[] = [
  { year: -3000, egypt: 30, mesopotamia: 30, india: 10, persia: 2, greece: 2, rome: 0, china: 8, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -2500, egypt: 35, mesopotamia: 28, india: 12, persia: 3, greece: 3, rome: 0, china: 10, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -2000, egypt: 30, mesopotamia: 22, india: 15, persia: 4, greece: 5, rome: 0, china: 12, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -1500, egypt: 28, mesopotamia: 18, india: 18, persia: 5, greece: 6, rome: 0, china: 14, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -1200, egypt: 22, mesopotamia: 15, india: 16, persia: 5, greece: 8, rome: 2, china: 15, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -1000, egypt: 18, mesopotamia: 14, india: 15, persia: 6, greece: 10, rome: 3, china: 16, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -800,  egypt: 14, mesopotamia: 12, india: 14, persia: 8, greece: 14, rome: 4, china: 16, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -600,  egypt: 10, mesopotamia: 8,  india: 14, persia: 18, greece: 16, rome: 6, china: 15, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -500,  egypt: 6,  mesopotamia: 5,  india: 15, persia: 28, greece: 18, rome: 8, china: 14, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -400,  egypt: 5,  mesopotamia: 3,  india: 14, persia: 22, greece: 25, rome: 10, china: 14, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -330,  egypt: 4,  mesopotamia: 2,  india: 12, persia: 10, greece: 30, rome: 14, china: 16, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -250,  egypt: 4,  mesopotamia: 2,  india: 16, persia: 6,  greece: 20, rome: 22, china: 18, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -150,  egypt: 3,  mesopotamia: 2,  india: 14, persia: 5,  greece: 12, rome: 30, china: 20, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 0, british: 0, modern: 0 },
  { year: -50,   egypt: 3,  mesopotamia: 1,  india: 12, persia: 5,  greece: 6,  rome: 38, china: 22, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 2, british: 0, modern: 0 },
  { year: 0,     egypt: 3,  mesopotamia: 1,  india: 12, persia: 6,  greece: 4,  rome: 38, china: 22, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 2, british: 0, modern: 0 },
  { year: 100,   egypt: 2,  mesopotamia: 1,  india: 12, persia: 8,  greece: 3,  rome: 36, china: 22, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 3, british: 0, modern: 0 },
  { year: 200,   egypt: 2,  mesopotamia: 1,  india: 14, persia: 10, greece: 2,  rome: 32, china: 22, islamic: 0, mongol: 0, ottoman: 0, european: 0, japan: 3, british: 0, modern: 0 },
  { year: 300,   egypt: 2,  mesopotamia: 1,  india: 14, persia: 14, greece: 2,  rome: 26, china: 20, islamic: 0, mongol: 0, ottoman: 0, european: 2, japan: 3, british: 0, modern: 0 },
  { year: 400,   egypt: 2,  mesopotamia: 1,  india: 14, persia: 16, greece: 2,  rome: 20, china: 18, islamic: 0, mongol: 0, ottoman: 0, european: 3, japan: 4, british: 0, modern: 0 },
  { year: 500,   egypt: 2,  mesopotamia: 1,  india: 14, persia: 14, greece: 2,  rome: 8,  china: 18, islamic: 5, mongol: 0, ottoman: 0, european: 4, japan: 5, british: 0, modern: 0 },
  { year: 632,   egypt: 2,  mesopotamia: 1,  india: 12, persia: 12, greece: 2,  rome: 6,  china: 18, islamic: 12, mongol: 0, ottoman: 0, european: 4, japan: 5, british: 0, modern: 0 },
  { year: 700,   egypt: 2,  mesopotamia: 1,  india: 12, persia: 6,  greece: 2,  rome: 4,  china: 18, islamic: 22, mongol: 0, ottoman: 0, european: 4, japan: 5, british: 0, modern: 0 },
  { year: 800,   egypt: 2,  mesopotamia: 1,  india: 12, persia: 4,  greece: 2,  rome: 3,  china: 20, islamic: 28, mongol: 0, ottoman: 0, european: 5, japan: 5, british: 0, modern: 0 },
  { year: 900,   egypt: 2,  mesopotamia: 1,  india: 12, persia: 4,  greece: 2,  rome: 2,  china: 22, islamic: 26, mongol: 0, ottoman: 0, european: 6, japan: 5, british: 0, modern: 0 },
  { year: 1000,  egypt: 2,  mesopotamia: 1,  india: 12, persia: 4,  greece: 2,  rome: 2,  china: 22, islamic: 24, mongol: 0, ottoman: 2, european: 6, japan: 5, british: 0, modern: 0 },
  { year: 1100,  egypt: 2,  mesopotamia: 1,  india: 12, persia: 3,  greece: 2,  rome: 2,  china: 20, islamic: 22, mongol: 2, ottoman: 4, european: 8, japan: 5, british: 0, modern: 0 },
  { year: 1200,  egypt: 2,  mesopotamia: 1,  india: 10, persia: 2,  greece: 2,  rome: 2,  china: 18, islamic: 18, mongol: 12, ottoman: 5, european: 8, japan: 5, british: 0, modern: 0 },
  { year: 1250,  egypt: 2,  mesopotamia: 1,  india: 8,  persia: 2,  greece: 2,  rome: 2,  china: 14, islamic: 10, mongol: 28, ottoman: 6, european: 8, japan: 5, british: 0, modern: 0 },
  { year: 1300,  egypt: 2,  mesopotamia: 1,  india: 10, persia: 2,  greece: 2,  rome: 2,  china: 16, islamic: 8,  mongol: 22, ottoman: 8, european: 10, japan: 5, british: 0, modern: 0 },
  { year: 1350,  egypt: 2,  mesopotamia: 1,  india: 12, persia: 3,  greece: 2,  rome: 2,  china: 18, islamic: 6,  mongol: 14, ottoman: 10, european: 12, japan: 5, british: 0, modern: 0 },
  { year: 1400,  egypt: 2,  mesopotamia: 1,  india: 12, persia: 4,  greece: 2,  rome: 2,  china: 20, islamic: 4,  mongol: 6,  ottoman: 14, european: 14, japan: 5, british: 0, modern: 0 },
  { year: 1453,  egypt: 2,  mesopotamia: 1,  india: 12, persia: 4,  greece: 2,  rome: 1,  china: 18, islamic: 3,  mongol: 3,  ottoman: 18, european: 16, japan: 5, british: 2, modern: 0 },
  { year: 1500,  egypt: 2,  mesopotamia: 1,  india: 14, persia: 6,  greece: 2,  rome: 1,  china: 18, islamic: 2,  mongol: 2,  ottoman: 16, european: 18, japan: 5, british: 3, modern: 0 },
  { year: 1600,  egypt: 1,  mesopotamia: 1,  india: 16, persia: 6,  greece: 1,  rome: 1,  china: 16, islamic: 2,  mongol: 1,  ottoman: 14, european: 18, japan: 8, british: 6, modern: 0 },
  { year: 1700,  egypt: 1,  mesopotamia: 1,  india: 14, persia: 4,  greece: 1,  rome: 1,  china: 14, islamic: 2,  mongol: 1,  ottoman: 10, european: 20, japan: 8, british: 12, modern: 0 },
  { year: 1750,  egypt: 1,  mesopotamia: 1,  india: 12, persia: 3,  greece: 1,  rome: 1,  china: 14, islamic: 2,  mongol: 1,  ottoman: 8,  european: 20, japan: 6, british: 18, modern: 0 },
  { year: 1800,  egypt: 1,  mesopotamia: 1,  india: 8,  persia: 2,  greece: 1,  rome: 1,  china: 12, islamic: 2,  mongol: 1,  ottoman: 6,  european: 22, japan: 5, british: 24, modern: 0 },
  { year: 1850,  egypt: 1,  mesopotamia: 1,  india: 5,  persia: 2,  greece: 1,  rome: 1,  china: 10, islamic: 2,  mongol: 1,  ottoman: 5,  european: 22, japan: 6, british: 28, modern: 0 },
  { year: 1900,  egypt: 1,  mesopotamia: 1,  india: 4,  persia: 2,  greece: 1,  rome: 1,  china: 8,  islamic: 2,  mongol: 1,  ottoman: 4,  european: 22, japan: 10, british: 28, modern: 2 },
  { year: 1920,  egypt: 1,  mesopotamia: 1,  india: 4,  persia: 2,  greece: 1,  rome: 1,  china: 8,  islamic: 2,  mongol: 1,  ottoman: 2,  european: 20, japan: 12, british: 24, modern: 8 },
  { year: 1945,  egypt: 1,  mesopotamia: 1,  india: 4,  persia: 2,  greece: 1,  rome: 1,  china: 10, islamic: 2,  mongol: 1,  ottoman: 1,  european: 14, japan: 6,  british: 16, modern: 28 },
  { year: 1947,  egypt: 1,  mesopotamia: 1,  india: 6,  persia: 2,  greece: 1,  rome: 1,  china: 12, islamic: 2,  mongol: 1,  ottoman: 1,  european: 10, japan: 6,  british: 12, modern: 32 },
  { year: 1960,  egypt: 1,  mesopotamia: 1,  india: 6,  persia: 2,  greece: 1,  rome: 1,  china: 14, islamic: 3,  mongol: 1,  ottoman: 1,  european: 8,  japan: 8,  british: 6,  modern: 38 },
  { year: 1980,  egypt: 1,  mesopotamia: 1,  india: 6,  persia: 3,  greece: 1,  rome: 1,  china: 14, islamic: 4,  mongol: 1,  ottoman: 1,  european: 6,  japan: 12, british: 4,  modern: 38 },
  { year: 2000,  egypt: 1,  mesopotamia: 1,  india: 8,  persia: 2,  greece: 1,  rome: 1,  china: 18, islamic: 4,  mongol: 1,  ottoman: 1,  european: 5,  japan: 10, british: 3,  modern: 38 },
  { year: 2024,  egypt: 1,  mesopotamia: 1,  india: 10, persia: 2,  greece: 1,  rome: 1,  china: 20, islamic: 4,  mongol: 1,  ottoman: 1,  european: 4,  japan: 8,  british: 2,  modern: 40 },
];

/* ─── Essay windows — link each essay to time range + civilization streams ─── */
export interface EssayWindow {
  essayId: string;
  title: string;
  subtitle: string;
  startYear: number;
  endYear: number;
  civIds: string[];
  href: string;
  status: 'live' | 'coming-soon' | 'draft';
}

// Derive from story registry + manual mapping
const ESSAY_MAPPING: { essayId: string; startYear: number; endYear: number; civIds: string[] }[] = [
  { essayId: 'kurukshetra',    startYear: -3000, endYear: -2800, civIds: ['india'] },
  { essayId: 'hormuz',         startYear: -3000, endYear: 2024,  civIds: ['persia', 'islamic', 'ottoman', 'british'] },
  { essayId: 'constantinople', startYear: -657,  endYear: 2024,  civIds: ['greece', 'rome', 'ottoman'] },
  { essayId: 'persia',         startYear: -550,  endYear: 651,   civIds: ['persia'] },
  { essayId: 'buddhism',       startYear: -528,  endYear: 800,   civIds: ['india', 'china'] },
  { essayId: 'ramayana',       startYear: -500,  endYear: -400,  civIds: ['india'] },
  { essayId: 'shakti',         startYear: -200,  endYear: 200,   civIds: ['india'] },
  { essayId: 'wisdom',         startYear: 762,   endYear: 1258,  civIds: ['islamic'] },
  { essayId: 'mongol-india',   startYear: 1221,  endYear: 1327,  civIds: ['mongol', 'india'] },
  { essayId: 'battuta',        startYear: 1325,  endYear: 1354,  civIds: ['islamic'] },
  { essayId: 'nutmeg',         startYear: 1512,  endYear: 1667,  civIds: ['european'] },
  { essayId: 'samurai',        startYear: 1603,  endYear: 1877,  civIds: ['japan'] },
  { essayId: 'opium',          startYear: 1757,  endYear: 1842,  civIds: ['british', 'china'] },
  { essayId: 'napoleon',       startYear: 1789,  endYear: 1821,  civIds: ['european'] },
  { essayId: '1857',           startYear: 1857,  endYear: 1858,  civIds: ['british', 'india'] },
  { essayId: 'berlin',         startYear: 1884,  endYear: 1914,  civIds: ['european'] },
  { essayId: 'nuclear',        startYear: 1945,  endYear: 2017,  civIds: ['modern'] },
  { essayId: 'india-states',   startYear: 1947,  endYear: 2024,  civIds: ['india'] },
  { essayId: 'radcliffe-line', startYear: 1947,  endYear: 1948,  civIds: ['british', 'india'] },
];

export const ESSAY_WINDOWS: EssayWindow[] = ESSAY_MAPPING.map(m => {
  const story = STORY_REGISTRY.find(s => s.id === m.essayId);
  return {
    ...m,
    title: story?.title ?? m.essayId,
    subtitle: story?.subtitle ?? '',
    href: story?.href ?? `/${m.essayId}`,
    status: story?.status ?? 'draft',
  };
});

/* ─── Helpers ─── */
export const MIN_YEAR = -3000;
export const MAX_YEAR = 2024;
export const YEAR_SPAN = MAX_YEAR - MIN_YEAR;

/** Convert a year to a 0-1 progress value */
export function yearToProgress(year: number): number {
  return (year - MIN_YEAR) / YEAR_SPAN;
}

/** Convert 0-1 progress to a year */
export function progressToYear(progress: number): number {
  return MIN_YEAR + progress * YEAR_SPAN;
}

/** Format year for display */
export function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year === 0) return '1 CE';
  return `${year} CE`;
}
