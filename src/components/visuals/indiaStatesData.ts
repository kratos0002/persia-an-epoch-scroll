// India States Formation — era definitions, section metadata, color mappings

export interface IndiaSection {
  id: string;
  label: string;
  year: string;
  stateCount: number;
  utCount: number;
}

export const INDIA_SECTIONS: IndiaSection[] = [
  { id: 'patchwork', label: 'The Patchwork', year: '1947', stateCount: 565, utCount: 0 },
  { id: 'midnight', label: "Midnight's Cartography", year: 'Aug 15, 1947', stateCount: 565, utCount: 0 },
  { id: 'patel', label: "The Iron Man's Persuasion", year: '1947–48', stateCount: 13, utCount: 0 },
  { id: 'holdouts', label: 'The Three Holdouts', year: '1947–48', stateCount: 13, utCount: 0 },
  { id: 'abcd', label: 'The Alphabet States', year: '1950', stateCount: 27, utCount: 1 },
  { id: 'linguistic', label: 'Drawing by Tongue', year: '1953–56', stateCount: 14, utCount: 6 },
  { id: 'splits', label: 'The Splitters', year: '1960–2000', stateCount: 25, utCount: 7 },
  { id: 'new-states', label: 'The Last Redrawing', year: '2000–2019', stateCount: 28, utCount: 8 },
  { id: 'present', label: '28 + 8', year: '2024', stateCount: 28, utCount: 8 },
  { id: 'india-epilogue', label: 'No Map Is Final', year: '', stateCount: 28, utCount: 8 },
];

export type EraId = 'patchwork' | 'midnight' | 'patel' | 'holdouts' | 'abcd' | 'linguistic' | 'splits' | 'new-states' | 'present' | 'india-epilogue';

// Color categories
export const INDIA_COLORS = {
  britishProvince: 'hsl(210, 40%, 50%)',
  princelyState: 'hsl(40, 60%, 55%)',
  princelyDark: 'hsl(40, 50%, 40%)',
  holdout: 'hsl(0, 65%, 50%)',
  hindiBelt: 'hsl(25, 55%, 50%)',
  dravidian: 'hsl(150, 40%, 40%)',
  northeast: 'hsl(280, 35%, 45%)',
  western: 'hsl(200, 45%, 45%)',
  background: 'hsl(220, 20%, 10%)',
  text: 'hsl(40, 30%, 85%)',
  border: 'hsl(40, 25%, 60%)',
  partA: 'hsl(210, 45%, 50%)',
  partB: 'hsl(40, 55%, 50%)',
  partC: 'hsl(150, 35%, 45%)',
  partD: 'hsl(280, 30%, 45%)',
  saffron: 'hsl(25, 80%, 50%)',
  green: 'hsl(150, 50%, 35%)',
  white: 'hsl(0, 0%, 95%)',
};

// Simplified SVG outline of India (viewBox 0 0 500 600)
export const INDIA_OUTLINE = "M250,10 C230,15 200,25 180,45 L160,60 L140,55 L120,70 L100,85 L80,90 L65,110 L55,135 L50,160 L45,190 L40,220 L50,250 L60,270 L55,290 L50,310 L55,330 L70,350 L80,370 L95,390 L110,410 L130,430 L150,445 L170,455 L190,470 L210,490 L230,510 L250,530 L260,540 L270,530 L280,510 L290,495 L300,480 L310,460 L320,440 L335,420 L350,395 L360,370 L370,345 L380,320 L390,295 L395,270 L400,245 L405,220 L400,195 L395,170 L385,145 L375,120 L360,100 L345,80 L325,65 L305,50 L285,35 L270,20 L250,10 Z";

// Simplified region paths for different eras
export interface RegionPath {
  id: string;
  name: string;
  path: string;
  color: string;
  category: string;
}

// 1947 - Major British Provinces
export const BRITISH_PROVINCES: RegionPath[] = [
  { id: 'madras', name: 'Madras', path: 'M180,380 L220,350 L280,360 L320,390 L310,430 L270,460 L230,470 L190,440 Z', color: INDIA_COLORS.britishProvince, category: 'province' },
  { id: 'bombay', name: 'Bombay', path: 'M80,240 L130,220 L170,250 L180,300 L160,340 L120,350 L80,320 L70,280 Z', color: INDIA_COLORS.britishProvince, category: 'province' },
  { id: 'bengal', name: 'Bengal', path: 'M340,220 L390,230 L400,270 L390,310 L360,320 L330,290 L320,250 Z', color: INDIA_COLORS.britishProvince, category: 'province' },
  { id: 'up', name: 'United Provinces', path: 'M200,170 L280,160 L310,190 L300,230 L250,240 L200,220 Z', color: INDIA_COLORS.britishProvince, category: 'province' },
  { id: 'punjab', name: 'Punjab', path: 'M150,80 L220,60 L260,80 L250,130 L200,140 L160,120 Z', color: INDIA_COLORS.britishProvince, category: 'province' },
  { id: 'cp', name: 'Central Provinces', path: 'M170,260 L250,250 L310,270 L300,320 L240,340 L180,320 Z', color: INDIA_COLORS.britishProvince, category: 'province' },
  { id: 'assam', name: 'Assam', path: 'M370,150 L410,140 L430,170 L420,200 L390,210 L370,190 Z', color: INDIA_COLORS.britishProvince, category: 'province' },
  { id: 'bihar', name: 'Bihar & Orissa', path: 'M290,230 L340,220 L360,260 L350,300 L310,310 L280,280 Z', color: INDIA_COLORS.britishProvince, category: 'province' },
];

// Major Princely States (shown individually - the rest shown as mosaic pattern)
export const PRINCELY_STATES: RegionPath[] = [
  { id: 'hyderabad', name: 'Hyderabad', path: 'M190,320 L250,310 L290,330 L280,370 L240,380 L200,360 Z', color: 'hsl(40, 65%, 55%)', category: 'princely' },
  { id: 'mysore', name: 'Mysore', path: 'M170,380 L210,370 L240,390 L230,420 L200,430 L170,410 Z', color: 'hsl(40, 55%, 50%)', category: 'princely' },
  { id: 'travancore', name: 'Travancore', path: 'M180,440 L210,430 L220,460 L210,490 L190,480 L175,460 Z', color: 'hsl(40, 60%, 48%)', category: 'princely' },
  { id: 'kashmir', name: 'Jammu & Kashmir', path: 'M160,30 L210,20 L250,30 L240,70 L200,80 L165,60 Z', color: 'hsl(40, 70%, 58%)', category: 'princely' },
  { id: 'rajputana', name: 'Rajputana', path: 'M110,130 L180,120 L200,160 L190,200 L140,210 L110,180 Z', color: 'hsl(38, 58%, 52%)', category: 'princely' },
  { id: 'baroda', name: 'Baroda', path: 'M90,210 L120,200 L135,225 L120,245 L95,240 Z', color: 'hsl(42, 62%, 50%)', category: 'princely' },
  { id: 'gwalior', name: 'Gwalior', path: 'M180,190 L220,180 L235,210 L220,235 L190,230 Z', color: 'hsl(36, 55%, 53%)', category: 'princely' },
  { id: 'indore', name: 'Indore', path: 'M145,230 L175,220 L185,245 L170,265 L148,255 Z', color: 'hsl(44, 60%, 51%)', category: 'princely' },
  { id: 'junagadh', name: 'Junagadh', path: 'M70,260 L90,250 L100,270 L90,285 L72,278 Z', color: INDIA_COLORS.holdout, category: 'holdout' },
];

// Modern states (2024) - simplified
export const MODERN_STATES: RegionPath[] = [
  { id: 'jk-modern', name: 'Jammu & Kashmir (UT)', path: 'M160,30 L210,20 L240,35 L235,60 L200,70 L168,55 Z', color: 'hsl(210, 45%, 50%)', category: 'ut' },
  { id: 'ladakh', name: 'Ladakh (UT)', path: 'M240,15 L280,10 L295,30 L280,50 L250,45 L240,30 Z', color: 'hsl(210, 40%, 55%)', category: 'ut' },
  { id: 'hp', name: 'Himachal Pradesh', path: 'M200,65 L235,58 L245,78 L230,95 L205,90 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'punjab-mod', name: 'Punjab', path: 'M160,75 L195,68 L205,92 L190,110 L162,100 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'haryana', name: 'Haryana', path: 'M190,105 L220,95 L235,118 L220,138 L195,130 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'delhi', name: 'Delhi (NCT)', path: 'M210,125 L225,120 L230,132 L220,140 L212,135 Z', color: 'hsl(210, 50%, 55%)', category: 'ut' },
  { id: 'up-mod', name: 'Uttar Pradesh', path: 'M225,130 L300,120 L320,165 L300,210 L260,220 L225,195 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'rajasthan', name: 'Rajasthan', path: 'M100,115 L185,105 L200,160 L190,210 L130,220 L95,180 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'gujarat', name: 'Gujarat', path: 'M60,210 L110,195 L130,230 L120,270 L80,280 L55,255 Z', color: INDIA_COLORS.western, category: 'west' },
  { id: 'mp', name: 'Madhya Pradesh', path: 'M145,215 L245,200 L270,240 L260,290 L195,300 L150,270 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'maharashtra', name: 'Maharashtra', path: 'M95,285 L190,275 L230,310 L220,360 L150,370 L90,340 Z', color: INDIA_COLORS.western, category: 'west' },
  { id: 'goa', name: 'Goa', path: 'M100,355 L115,348 L120,365 L110,375 L100,370 Z', color: 'hsl(200, 50%, 50%)', category: 'west' },
  { id: 'karnataka', name: 'Karnataka', path: 'M120,370 L190,355 L225,385 L215,430 L165,440 L120,410 Z', color: INDIA_COLORS.dravidian, category: 'dravidian' },
  { id: 'kerala', name: 'Kerala', path: 'M155,445 L180,435 L190,470 L175,500 L160,490 L150,465 Z', color: INDIA_COLORS.dravidian, category: 'dravidian' },
  { id: 'tn', name: 'Tamil Nadu', path: 'M195,420 L260,400 L290,430 L270,475 L230,490 L195,460 Z', color: INDIA_COLORS.dravidian, category: 'dravidian' },
  { id: 'ap', name: 'Andhra Pradesh', path: 'M200,350 L270,330 L310,360 L300,400 L255,410 L210,390 Z', color: INDIA_COLORS.dravidian, category: 'dravidian' },
  { id: 'telangana', name: 'Telangana', path: 'M200,310 L260,300 L285,325 L270,350 L225,355 L200,340 Z', color: 'hsl(160, 40%, 42%)', category: 'dravidian' },
  { id: 'odisha', name: 'Odisha', path: 'M290,290 L340,275 L365,310 L350,350 L310,355 L285,325 Z', color: INDIA_COLORS.dravidian, category: 'east' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', path: 'M260,260 L310,250 L330,280 L315,320 L275,325 L255,295 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'jharkhand', name: 'Jharkhand', path: 'M310,215 L355,205 L370,235 L355,265 L320,270 L305,245 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'wb', name: 'West Bengal', path: 'M345,200 L385,190 L400,235 L390,280 L360,290 L340,255 Z', color: 'hsl(150, 35%, 45%)', category: 'east' },
  { id: 'bihar-mod', name: 'Bihar', path: 'M300,190 L345,180 L360,210 L345,240 L310,245 L295,220 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'uttarakhand', name: 'Uttarakhand', path: 'M230,85 L270,75 L285,95 L275,118 L245,120 L228,105 Z', color: INDIA_COLORS.hindiBelt, category: 'hindi' },
  { id: 'sikkim', name: 'Sikkim', path: 'M360,175 L375,170 L380,185 L372,195 L360,192 Z', color: INDIA_COLORS.northeast, category: 'northeast' },
  { id: 'assam-mod', name: 'Assam', path: 'M385,155 L425,145 L440,175 L430,200 L395,205 L385,185 Z', color: INDIA_COLORS.northeast, category: 'northeast' },
  { id: 'arunachal', name: 'Arunachal Pradesh', path: 'M415,125 L460,115 L475,140 L460,160 L430,165 L415,148 Z', color: INDIA_COLORS.northeast, category: 'northeast' },
  { id: 'nagaland', name: 'Nagaland', path: 'M440,170 L465,162 L472,182 L462,198 L442,192 Z', color: INDIA_COLORS.northeast, category: 'northeast' },
  { id: 'manipur', name: 'Manipur', path: 'M445,198 L468,192 L475,210 L465,225 L447,218 Z', color: INDIA_COLORS.northeast, category: 'northeast' },
  { id: 'mizoram', name: 'Mizoram', path: 'M435,225 L458,218 L465,240 L455,258 L438,248 Z', color: INDIA_COLORS.northeast, category: 'northeast' },
  { id: 'tripura', name: 'Tripura', path: 'M415,225 L435,218 L440,240 L430,255 L418,245 Z', color: INDIA_COLORS.northeast, category: 'northeast' },
  { id: 'meghalaya', name: 'Meghalaya', path: 'M395,198 L425,192 L432,208 L420,220 L398,215 Z', color: INDIA_COLORS.northeast, category: 'northeast' },
];

// Timeline events for the ribbon
export interface TimelineEvent {
  year: number;
  label: string;
  section: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: 1947, label: 'Independence', section: 'patchwork' },
  { year: 1948, label: 'Integration', section: 'patel' },
  { year: 1950, label: 'Constitution', section: 'abcd' },
  { year: 1953, label: "Sriramulu's fast", section: 'linguistic' },
  { year: 1956, label: 'States Reorganisation', section: 'linguistic' },
  { year: 1960, label: 'Bombay split', section: 'splits' },
  { year: 1966, label: 'Punjab split', section: 'splits' },
  { year: 1971, label: 'Northeast states', section: 'splits' },
  { year: 1987, label: 'Goa statehood', section: 'splits' },
  { year: 2000, label: 'Three new states', section: 'new-states' },
  { year: 2014, label: 'Telangana', section: 'new-states' },
  { year: 2019, label: 'J&K reorganized', section: 'new-states' },
  { year: 2024, label: 'Present', section: 'present' },
];

// State counts per era for the counter
export const STATE_COUNTS: Record<string, { states: number; uts: number; label: string }> = {
  patchwork: { states: 565, uts: 0, label: '565 princely states + British provinces' },
  midnight: { states: 565, uts: 0, label: 'Partition divides the subcontinent' },
  patel: { states: 13, uts: 0, label: '552 states accede in one year' },
  holdouts: { states: 13, uts: 0, label: 'Three states hold out' },
  abcd: { states: 27, uts: 1, label: 'Part A, B, C, D classification' },
  linguistic: { states: 14, uts: 6, label: 'States Reorganisation Act, 1956' },
  splits: { states: 25, uts: 7, label: 'New states carved from old' },
  'new-states': { states: 28, uts: 8, label: 'Jharkhand, Chhattisgarh, Uttarakhand, Telangana' },
  present: { states: 28, uts: 8, label: '28 states, 8 Union Territories' },
  'india-epilogue': { states: 28, uts: 8, label: 'No map is final' },
};
