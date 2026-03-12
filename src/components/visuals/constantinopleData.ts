export interface Artifact {
  id: string;
  name: string;
  description: string;
  era: string;
  type: 'coin' | 'pottery' | 'mosaic' | 'weapon' | 'inscription' | 'bone' | 'jewelry';
  x: number; // percentage position
  y: number;
}

export interface Stratum {
  id: string;
  label: string;
  year: string;
  depth: number; // meters below surface
  color: string; // HSL values only
  earthColor: string;
  description: string;
  artifacts: Artifact[];
}

export const STRATA: Stratum[] = [
  {
    id: 'surface',
    label: 'Modern Istanbul',
    year: '2024',
    depth: 0,
    color: '200 15% 75%',
    earthColor: '200 10% 55%',
    description: 'Skyline of 15 million. Two continents. One city.',
    artifacts: [],
  },
  {
    id: 'ottoman',
    label: "The Conqueror's City",
    year: '1453',
    depth: 3,
    color: '175 40% 25%',
    earthColor: '25 25% 28%',
    description: 'Mehmed II breaches the walls. Hagia Sophia becomes a mosque.',
    artifacts: [
      { id: 'ott-1', name: 'Ottoman Coin', description: 'Akçe minted under Mehmed II, 1453', era: 'Ottoman', type: 'coin', x: 25, y: 30 },
      { id: 'ott-2', name: 'Iznik Tile Fragment', description: 'Blue-and-white ceramic from Süleyman era mosque', era: 'Ottoman', type: 'pottery', x: 70, y: 60 },
    ],
  },
  {
    id: 'crusade',
    label: 'The Sack',
    year: '1204',
    depth: 6,
    color: '35 50% 45%',
    earthColor: '30 20% 25%',
    description: 'Fellow Christians loot the richest city on earth.',
    artifacts: [
      { id: 'cru-1', name: 'Melted Bronze', description: 'Fragment of a classical statue, melted by Crusaders for coin', era: 'Crusade', type: 'jewelry', x: 40, y: 45 },
      { id: 'cru-2', name: 'Venetian Crossbow Bolt', description: 'Iron bolt head, found in the sea walls', era: 'Crusade', type: 'weapon', x: 75, y: 25 },
    ],
  },
  {
    id: 'byzantine-peak',
    label: 'The Golden City',
    year: '537',
    depth: 10,
    color: '270 45% 30%',
    earthColor: '270 15% 22%',
    description: "Justinian's Hagia Sophia. The richest city in the medieval world.",
    artifacts: [
      { id: 'byz-1', name: 'Gold Mosaic Tessera', description: 'Glass-backed gold leaf tile from Hagia Sophia', era: 'Byzantine', type: 'mosaic', x: 55, y: 35 },
      { id: 'byz-2', name: 'Greek Fire Siphon', description: 'Bronze nozzle fragment from a naval fire weapon', era: 'Byzantine', type: 'weapon', x: 20, y: 70 },
    ],
  },
  {
    id: 'iconoclasm',
    label: 'The Broken Images',
    year: '726',
    depth: 13,
    color: '0 20% 35%',
    earthColor: '15 18% 22%',
    description: 'Icons smashed, faces scraped from walls. Mosaic fragments in the rubble.',
    artifacts: [
      { id: 'ico-1', name: 'Defaced Icon Fragment', description: 'Marble face with chisel marks across the eyes', era: 'Iconoclasm', type: 'mosaic', x: 35, y: 50 },
      { id: 'ico-2', name: 'Smashed Tessera', description: 'Colored glass mosaic pieces, deliberately broken', era: 'Iconoclasm', type: 'mosaic', x: 65, y: 30 },
    ],
  },
  {
    id: 'constantine',
    label: 'The New Rome',
    year: '330',
    depth: 16,
    color: '43 60% 45%',
    earthColor: '25 22% 20%',
    description: "Constantine's founding. A new capital for a Christian empire.",
    artifacts: [
      { id: 'con-1', name: 'Solidus of Constantine', description: 'Gold coin showing Constantine with Christian chi-rho', era: 'Constantine', type: 'coin', x: 30, y: 40 },
      { id: 'con-2', name: 'Hippodrome Column Base', description: 'Porphyry fragment from the central spine', era: 'Constantine', type: 'inscription', x: 60, y: 65 },
    ],
  },
  {
    id: 'roman-outpost',
    label: 'Before the Name',
    year: '196',
    depth: 19,
    color: '15 50% 55%',
    earthColor: '20 25% 18%',
    description: 'Byzantium under Rome — strategic but unremarkable. Severus burns it; it rebuilds.',
    artifacts: [
      { id: 'rom-1', name: 'Severan Denarius', description: 'Silver coin of Septimius Severus, worn from use', era: 'Roman', type: 'coin', x: 45, y: 35 },
      { id: 'rom-2', name: 'Amphora Handle', description: 'Stamped pottery handle from Roman wine trade', era: 'Roman', type: 'pottery', x: 80, y: 55 },
    ],
  },
  {
    id: 'greek',
    label: 'Byzantion',
    year: '657 BCE',
    depth: 22,
    color: '210 50% 40%',
    earthColor: '25 30% 16%',
    description: 'Greek colonists from Megara. A fishing village on the Golden Horn.',
    artifacts: [
      { id: 'grk-1', name: 'Black-Figure Pottery Shard', description: 'Attic-style pottery fragment showing a fishing scene', era: 'Greek', type: 'pottery', x: 35, y: 55 },
      { id: 'grk-2', name: 'Bronze Fishhook', description: 'Simple curved hook, the oldest artifact in the dig', era: 'Greek', type: 'jewelry', x: 70, y: 40 },
    ],
  },
  {
    id: 'bedrock',
    label: 'Every City is a Dig',
    year: 'Bedrock',
    depth: 25,
    color: '25 15% 25%',
    earthColor: '25 10% 12%',
    description: 'Pull back. All civilizations visible at once, stacked.',
    artifacts: [],
  },
];

export const CONSTANTINOPLE_SECTIONS = STRATA.map(s => ({
  id: s.id,
  label: s.label,
  year: s.year,
}));

// Particle shapes for floating debris
export const PARTICLE_SHAPES = [
  // Pottery shard
  'M0,0 L8,2 L10,8 L4,10 L0,6 Z',
  // Coin
  'M5,0 A5,5 0 1,1 5,10 A5,5 0 1,1 5,0',
  // Bone fragment
  'M0,3 Q2,0 5,1 Q8,2 10,5 Q8,8 5,9 Q2,8 0,5 Z',
  // Tile fragment
  'M0,0 L7,0 L9,4 L6,8 L0,6 Z',
  // Inscription chip
  'M2,0 L8,0 L10,3 L8,7 L2,7 L0,4 Z',
];
