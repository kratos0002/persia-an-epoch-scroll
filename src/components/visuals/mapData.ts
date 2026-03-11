import type { EmpireId } from './InteractiveMap';

/* ──────────────────────────── City data ──────────────────────────── */

export interface CityMarker {
  name: string;
  lat: number;
  lng: number;
  description: Record<string, string>; // keyed by EmpireId
}

export const CITIES: CityMarker[] = [
  {
    name: 'Persepolis',
    lat: 29.93, lng: 52.89,
    description: {
      achaemenid: 'Ceremonial capital of the Achaemenid Empire. Built by Darius I c. 515 BCE.',
      alexander: 'Burned by Alexander in 330 BCE — possibly to avenge Xerxes\' destruction of Athens.',
      sassanid: 'Ruins revered as "Throne of Jamshid" — symbol of ancient glory.',
      default: 'UNESCO World Heritage Site. The greatest architectural legacy of ancient Persia.',
    },
  },
  {
    name: 'Susa',
    lat: 32.19, lng: 48.26,
    description: {
      achaemenid: 'Administrative capital and winter residence. Home of the Apadana Palace.',
      alexander: 'Surrendered peacefully — Alexander seized 50,000 talents of gold.',
      islamic: 'Site of the Tomb of Daniel, venerated by Muslims, Christians, and Jews.',
      default: 'One of the oldest continuously inhabited cities in human history (~6,000 years).',
    },
  },
  {
    name: 'Babylon',
    lat: 32.54, lng: 44.42,
    description: {
      achaemenid: 'Conquered by Cyrus in 539 BCE. He freed the Jews and issued his famous decree.',
      alexander: 'Alexander made it his capital. He died here in 323 BCE, aged 32.',
      parthian: 'Declined under Parthian rule as Ctesiphon rose nearby.',
      default: 'Ancient Mesopotamian city. Site of the Hanging Gardens and Tower of Babel.',
    },
  },
  {
    name: 'Ecbatana',
    lat: 34.80, lng: 48.52,
    description: {
      achaemenid: 'Former Median capital, became the summer residence of Achaemenid kings.',
      parthian: 'Major Parthian stronghold controlling the Great Khorasan Road.',
      default: 'Modern-day Hamadan — one of the oldest cities in Iran.',
    },
  },
  {
    name: 'Pasargadae',
    lat: 30.20, lng: 53.17,
    description: {
      achaemenid: 'First capital of the Achaemenid Empire. Site of the Tomb of Cyrus the Great.',
      default: 'The simple limestone tomb still stands — inscription: "I am Cyrus, king of the world."',
    },
  },
  {
    name: 'Athens',
    lat: 37.97, lng: 23.72,
    description: {
      achaemenid: 'Target of Xerxes\' invasion. Sacked in 480 BCE, Acropolis burned.',
      alexander: 'Birthplace of Alexander\'s tutor Aristotle. Spiritual heart of Greek resistance.',
      default: 'Cradle of democracy. Eternal rival of Persia in the ancient world.',
    },
  },
  {
    name: 'Samarkand',
    lat: 39.65, lng: 66.96,
    description: {
      achaemenid: 'Eastern frontier province of Sogdia. Important Silk Road junction.',
      alexander: 'Captured in 329 BCE. Alexander married Roxana from nearby Bactria.',
      mongol: 'Destroyed by Genghis Khan in 1220. Later rebuilt as Timur\'s magnificent capital.',
      default: 'Crossroads of cultures — Persian, Turkic, Chinese, and Indian.',
    },
  },
  {
    name: 'Isfahan',
    lat: 32.65, lng: 51.68,
    description: {
      sassanid: 'Important military garrison guarding central Iran.',
      islamic: 'Flourishing center of learning under the Buyid dynasty.',
      safavid: '"Half the World" — Shah Abbas I\'s masterpiece capital. Naqsh-e Jahan Square.',
      modern: 'Iran\'s cultural jewel. Home to stunning Islamic architecture.',
      default: 'Persian proverb: "Isfahan is half the world."',
    },
  },
  {
    name: 'Tabriz',
    lat: 38.08, lng: 46.29,
    description: {
      mongol: 'Capital of the Ilkhanate. Center of Mongol-Persian cultural fusion.',
      safavid: 'First Safavid capital before Shah Abbas moved it to Isfahan.',
      modern: 'Birthplace of Iran\'s Constitutional Revolution (1906).',
      default: 'Historic trading hub on the Silk Road, at the crossroads of civilizations.',
    },
  },
  {
    name: 'Baghdad',
    lat: 33.31, lng: 44.37,
    description: {
      islamic: 'Founded 762 CE. Capital of the Abbasid Caliphate — world\'s largest city.',
      mongol: 'Sacked by Hulagu Khan in 1258. An estimated 200,000–1,000,000 killed.',
      default: 'The "Round City" — center of the Islamic Golden Age.',
    },
  },
  {
    name: 'Merv',
    lat: 37.66, lng: 62.19,
    description: {
      achaemenid: 'Eastern satrapy capital. Key node on the Royal Road.',
      parthian: 'Major Parthian city controlling eastern trade routes.',
      mongol: 'Mongols killed an estimated 1.3 million inhabitants in 1221.',
      default: 'Once the world\'s largest city. Now ruins in modern Turkmenistan.',
    },
  },
  {
    name: 'Ctesiphon',
    lat: 33.09, lng: 44.58,
    description: {
      parthian: 'Winter capital of the Parthian Empire. Grew to rival Rome.',
      sassanid: 'Imperial capital. The Taq Kasra arch — world\'s largest brick vault — still stands.',
      islamic: 'Fell to Arab armies in 637 CE. Its treasures were legendary.',
      default: 'Twin city of Seleucia on the Tigris. Capital for over 800 years.',
    },
  },
  {
    name: 'Sardis',
    lat: 38.48, lng: 28.04,
    description: {
      achaemenid: 'Capital of Lydia, conquered by Cyrus. Western terminus of the Royal Road.',
      alexander: 'Surrendered to Alexander without a fight in 334 BCE.',
      default: 'Where coinage was invented under King Croesus.',
    },
  },
  {
    name: 'Memphis',
    lat: 29.85, lng: 31.25,
    description: {
      achaemenid: 'Capital of the Egyptian satrapy after Cambyses\' conquest in 525 BCE.',
      alexander: 'Alexander was crowned Pharaoh here in 332 BCE.',
      default: 'Ancient Egyptian capital. Near the pyramids of Giza.',
    },
  },
  // Buddhism cities
  {
    name: 'Lumbini', lat: 27.47, lng: 83.28,
    description: { default: 'Birthplace of Siddhartha Gautama, ~563 BCE.' },
  },
  {
    name: 'Bodh Gaya', lat: 24.70, lng: 84.99,
    description: { default: 'Site of the Bodhi tree where Siddhartha attained enlightenment.' },
  },
  {
    name: 'Sarnath', lat: 25.38, lng: 83.02,
    description: { default: 'Where the Buddha delivered his first sermon — the Deer Park.' },
  },
  {
    name: 'Pataliputra', lat: 25.61, lng: 85.14,
    description: { default: 'Capital of the Maurya Empire under Ashoka; center of Buddhist missions.' },
  },
  {
    name: 'Nalanda', lat: 25.14, lng: 85.44,
    description: { default: 'The greatest Buddhist university, active for 700 years.' },
  },
  {
    name: 'Anuradhapura', lat: 8.35, lng: 80.39,
    description: { default: 'Ancient capital of Sri Lanka; Theravada Buddhism arrived here ~250 BCE.' },
  },
  {
    name: 'Bagan', lat: 21.17, lng: 94.86,
    description: { default: "Myanmar's city of 10,000 temples, heart of Theravada Buddhism." },
  },
  {
    name: 'Ayutthaya', lat: 14.35, lng: 100.57,
    description: { default: 'Former capital of Thailand, a major Theravada center.' },
  },
  {
    name: 'Angkor', lat: 13.41, lng: 103.87,
    description: { default: 'Khmer capital that transitioned from Hinduism to Theravada Buddhism.' },
  },
  {
    name: 'Gandhara', lat: 34.15, lng: 71.75,
    description: { default: 'Crossroads of Greek and Buddhist art; birthplace of the Buddha image.' },
  },
  {
    name: 'Dunhuang', lat: 40.14, lng: 94.66,
    description: { default: 'Gateway to China on the Silk Road; home of the Mogao Caves.' },
  },
  {
    name: "Chang'an", lat: 34.26, lng: 108.94,
    description: { default: 'Tang Dynasty capital; major center of Chinese Buddhism.' },
  },
  {
    name: 'Nara', lat: 34.69, lng: 135.80,
    description: { default: "Japan's first permanent capital; home of the Great Buddha at Tōdai-ji." },
  },
  {
    name: 'Kyoto', lat: 35.01, lng: 135.77,
    description: { default: 'Heart of Japanese Zen Buddhism; thousands of temples and gardens.' },
  },
  {
    name: 'Lhasa', lat: 29.65, lng: 91.10,
    description: { default: 'Seat of the Dalai Lama and center of Vajrayana Buddhism.' },
  },
  {
    name: 'Kandy', lat: 7.29, lng: 80.64,
    description: { default: "Home of the Temple of the Tooth, Sri Lanka's most sacred Buddhist relic." },
  },
  {
    name: 'Luang Prabang', lat: 19.89, lng: 102.13,
    description: { default: 'Ancient royal capital of Laos; a living Theravada monastery city.' },
  },
];

/* ──────────────────────── Territory coordinates ──────────────────── */
// Many more points for smooth, accurate borders

export const EMPIRE_TERRITORIES: Record<EmpireId, [number, number][][]> = {
  none: [],

  achaemenid: [
    // Main body: Anatolia → Iran → Central Asia
    [
      [39.5, 26], [39, 28], [38.5, 30], [38, 32], [37.5, 34], [37, 36],
      [36.5, 35], [36, 34], [35, 33], [34, 32], [33, 31.5], [32, 31],
      [31, 30.5], [30, 30], [29.5, 31], [29, 32], [28, 33], [27, 34],
      [26, 34.5], [25.5, 35], [25, 36], [24.5, 34], [24, 32], [23.5, 30],
      [23, 28], [24, 26], [25.5, 25], [27, 24.5], [29, 24], [31, 23.5],
      [33, 24], [35, 25], [37, 26], [38.5, 26],
    ],
    // Iranian Plateau + Central Asia
    [
      [37, 36], [38, 38], [39, 40], [39.5, 42], [40, 44],
      [40.5, 46], [40.5, 48], [40, 50], [39.5, 52], [39, 54],
      [38.5, 56], [38, 58], [37.5, 60], [37, 62], [36, 64],
      [35, 66], [34, 68], [33, 69], [32, 70], [31, 69.5],
      [30, 68], [29, 66], [28, 64], [27, 62], [26.5, 60],
      [26, 58], [25.5, 56], [25, 54], [25, 52], [25, 50],
      [25, 48], [25.5, 46], [26, 44], [26.5, 42], [27, 40],
      [27.5, 38], [28, 37], [29, 36], [30, 35.5], [31, 35],
      [32, 34.5], [33, 34], [34, 34.5], [35, 35], [36, 35.5],
    ],
    // Egypt
    [
      [31, 30], [31.5, 30], [32, 29.5], [32, 28], [31.5, 27],
      [31, 26], [30.5, 25], [30, 24.5], [29.5, 25], [29, 26],
      [28.5, 27], [28, 28], [27.5, 29], [27, 30], [26.5, 31],
      [26, 32], [26, 33], [27, 34], [28, 33], [29, 32],
      [30, 31], [30.5, 30.5],
    ],
  ],

  alexander: [
    // Massive unified territory: Greece → Egypt → Central Asia
    [
      [40, 22], [41, 24], [41, 26], [40.5, 28], [40, 30],
      [39.5, 32], [39, 34], [38.5, 36], [39, 38], [39.5, 40],
      [40, 42], [40.5, 44], [40.5, 46], [40.5, 48], [40, 50],
      [39.5, 52], [39, 54], [38.5, 56], [38, 58], [37.5, 60],
      [37, 62], [36, 64], [35, 66], [34, 68], [33, 70],
      [32, 72], [31, 72], [30, 71], [29, 69], [28, 67],
      [27, 64], [26, 61], [25.5, 58], [25, 55], [25, 52],
      [25, 49], [25, 46], [25.5, 44], [26, 42], [26, 40],
      [25.5, 38], [25, 36], [24.5, 34], [24, 32], [23.5, 30],
      [23, 28], [23.5, 26], [24, 24], [25, 23], [27, 22],
      [29, 21], [31, 20], [33, 20], [35, 21], [37, 22],
      [38.5, 22],
    ],
  ],

  parthian: [
    // Core Iran + Mesopotamia
    [
      [38, 38], [38.5, 40], [39, 42], [39, 44], [38.5, 46],
      [38, 48], [38, 50], [37.5, 52], [37.5, 54], [37, 56],
      [36.5, 58], [36, 60], [35, 61], [34, 61], [33, 60.5],
      [32, 60], [31, 59], [30, 58], [29, 57], [28, 55.5],
      [27, 54], [26.5, 52], [26, 50], [26, 48], [26, 46],
      [26.5, 44], [27, 43], [28, 42], [29, 41.5], [30, 41],
      [31, 40.5], [32, 40], [33, 39.5], [34, 39], [35, 38.5],
      [36, 38], [37, 38],
    ],
  ],

  sassanid: [
    [
      [37, 36], [38, 37], [38.5, 38], [39, 40], [39.5, 42],
      [39.5, 44], [39, 46], [38.5, 48], [38, 50], [38, 52],
      [37.5, 54], [37, 56], [36.5, 58], [36, 60], [35, 61],
      [34, 61.5], [33, 61], [32, 60.5], [31, 60], [30, 59],
      [29, 57.5], [28, 56], [27, 54], [26, 52], [25.5, 50],
      [25, 48], [25, 46], [25, 44], [25.5, 42], [26, 40],
      [27, 38.5], [28, 37.5], [29, 37], [30, 36.5], [31, 36],
      [32, 36], [33, 36], [34, 36], [35, 36], [36, 36],
    ],
  ],

  islamic: [
    // Vast: Spain → Central Asia (simplified, key shape)
    [
      [37, 20], [38, 24], [39, 28], [39.5, 32], [40, 36],
      [40.5, 40], [40.5, 44], [40, 48], [39.5, 52], [39, 56],
      [38, 60], [37, 64], [36, 68], [34, 70], [32, 71],
      [30, 70], [28, 68], [26, 64], [25, 60], [24.5, 56],
      [24, 52], [24, 48], [24, 44], [23.5, 40], [23, 36],
      [22.5, 32], [22, 28], [23, 24], [25, 22], [27, 21],
      [29, 20], [31, 19.5], [33, 19.5], [35, 20],
    ],
  ],

  mongol: [
    [
      [39, 38], [39.5, 40], [40, 42], [40.5, 44], [41, 46],
      [41, 48], [40.5, 50], [40, 52], [39.5, 54], [39, 56],
      [38.5, 58], [38, 60], [37, 62], [36, 63], [35, 63.5],
      [34, 63], [33, 62.5], [32, 62], [31, 61], [30, 59.5],
      [29, 58], [28, 56], [27, 54], [26.5, 52], [26, 50],
      [26, 48], [26, 46], [26.5, 44], [27, 42], [27.5, 40],
      [28, 38.5], [29, 37.5], [30, 37], [31, 36.5], [32, 36],
      [33, 36], [34, 36.5], [35, 37], [36, 37.5], [37, 38],
      [38, 38],
    ],
  ],

  safavid: [
    [
      [38, 40], [38.5, 42], [39, 44], [39.5, 46], [39.5, 48],
      [39.5, 50], [39, 52], [38.5, 54], [38, 56], [37.5, 58],
      [37, 60], [36, 61], [35, 61.5], [34, 61], [33, 60.5],
      [32, 60], [31, 59], [30, 58], [29, 57], [28, 55.5],
      [27, 54], [26, 52], [25.5, 50], [25, 48], [25, 46],
      [25, 44], [25.5, 42.5], [26, 41], [27, 40], [28, 39.5],
      [29, 39], [30, 39], [31, 39], [32, 39], [33, 39],
      [34, 39], [35, 39.5], [36, 40], [37, 40],
    ],
  ],

  modern: [
    // Actual Iran borders (simplified but accurate)
    [
      [39.78, 44.79], [39.4, 45.5], [39.2, 46], [38.8, 46.5],
      [38.4, 47.1], [38.1, 48.5], [37.6, 49], [37.3, 49.1],
      [37, 49.5], [36.8, 50.5], [36.5, 51.5], [36.7, 52.5],
      [37, 53.5], [37.3, 54.5], [37.5, 55.5], [37.2, 56],
      [36.8, 56.5], [36.5, 57], [36.2, 58], [36, 59],
      [35.5, 59.5], [34.8, 60.5], [33.7, 60.2], [33, 60.6],
      [32.5, 60.8], [31.5, 61.7], [30.5, 61.5], [29.8, 61.3],
      [29, 61], [28.5, 60.5], [27.5, 60.3], [27, 59.5],
      [26.5, 58.5], [26, 57.5], [25.5, 57], [25.3, 56],
      [25.5, 55], [26, 54], [26.5, 53.5], [27, 52.5],
      [27.5, 51.5], [28, 51], [29, 50.5], [29.5, 50],
      [30, 49.5], [30.5, 49], [31, 48.5], [31.5, 48],
      [32, 47.5], [32.5, 47], [33, 46.5], [33.5, 46],
      [34, 45.5], [34.5, 45.5], [35, 45.5], [35.5, 45.5],
      [36, 45], [36.5, 44.5], [37, 44.3], [37.5, 44.5],
      [38, 44.5], [38.5, 44.5], [39, 44.5], [39.5, 44.8],
    ],
  ],
};

/* ─────────────────────── Visual styles per era ─────────────────── */

export const EMPIRE_STYLES: Record<EmpireId, { color: string; fillColor: string; fillOpacity: number; glowColor: string }> = {
  none:       { color: 'transparent', fillColor: 'transparent', fillOpacity: 0, glowColor: 'transparent' },
  achaemenid: { color: '#D4A843', fillColor: '#D4A843', fillOpacity: 0.22, glowColor: 'rgba(212,168,67,0.5)' },
  alexander:  { color: '#8B5CF6', fillColor: '#7C3AED', fillOpacity: 0.22, glowColor: 'rgba(139,92,246,0.5)' },
  parthian:   { color: '#DC2626', fillColor: '#B91C1C', fillOpacity: 0.22, glowColor: 'rgba(220,38,38,0.5)' },
  sassanid:   { color: '#C53030', fillColor: '#9B2C2C', fillOpacity: 0.22, glowColor: 'rgba(197,48,48,0.5)' },
  islamic:    { color: '#059669', fillColor: '#047857', fillOpacity: 0.22, glowColor: 'rgba(5,150,105,0.5)' },
  mongol:     { color: '#EA580C', fillColor: '#C2410C', fillOpacity: 0.22, glowColor: 'rgba(234,88,12,0.5)' },
  safavid:    { color: '#2563EB', fillColor: '#1D4ED8', fillOpacity: 0.22, glowColor: 'rgba(37,99,235,0.5)' },
  modern:     { color: '#6366F1', fillColor: '#4F46E5', fillOpacity: 0.18, glowColor: 'rgba(99,102,241,0.5)' },
};

/* ─────────────────────── Default centers ─────────────────────── */

export const EMPIRE_CENTERS: Record<EmpireId, { center: [number, number]; zoom: number }> = {
  none:       { center: [32, 52], zoom: 5 },
  achaemenid: { center: [32, 48], zoom: 4 },
  alexander:  { center: [33, 48], zoom: 3.8 },
  parthian:   { center: [33, 50], zoom: 4.5 },
  sassanid:   { center: [33, 50], zoom: 4.5 },
  islamic:    { center: [32, 46], zoom: 3.8 },
  mongol:     { center: [34, 50], zoom: 4.2 },
  safavid:    { center: [33, 50], zoom: 4.5 },
  modern:     { center: [32, 53], zoom: 5.2 },
};
