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

export interface BattutaMarker {
  coords: [number, number]; // [lng, lat] for Leaflet
  label: string;
  detail?: string;
}

export interface BattutaStage {
  id: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
  pitch: number;    // 0–60° camera tilt
  bearing: number;  // compass rotation toward travel direction
  speed: number;    // flyTo duration multiplier (1 = default 1.2s)
  label: string;
  phase: string;
  phaseIndex: number;
  date: string;
  routeUpTo: number; // index into ALL_COORDS for progressive drawing
  markers: BattutaMarker[];
  narrative: {
    title: string;
    body: string;
    quote?: { text: string; attribution: string };
    accent?: string;
  };
}

/* ── Colour tokens — Leather, Ink, and Saffron palette ── */
export const IB = {
  PARCHMENT:    'hsl(38, 35%, 88%)',
  PARCHMENT_DK: 'hsl(34, 30%, 78%)',
  LEATHER:      'hsl(25, 45%, 22%)',
  LEATHER_MID:  'hsl(25, 40%, 30%)',
  INK:          'hsl(30, 15%, 15%)',
  INK_LIGHT:    'hsl(30, 12%, 35%)',
  SAFFRON:      'hsl(38, 80%, 55%)',
  SAFFRON_DIM:  'hsl(38, 55%, 42%)',
  LAPIS:        'hsl(215, 55%, 42%)',
  LAPIS_LIGHT:  'hsl(215, 45%, 55%)',
  HENNA:        'hsl(15, 60%, 45%)',
  MONSOON:      'hsl(195, 40%, 50%)',
  SAND:         'hsl(40, 30%, 72%)',
  EMERALD:      'hsl(155, 40%, 35%)',
  GOLD:         'hsl(38, 80%, 55%)',
  DARK:         'hsl(25, 45%, 22%)',
} as const;

/* ── Phase colours (index-matched) ── */
const PHASE_COLORS = [
  IB.SAFFRON,      // Phase 1
  IB.LAPIS,        // Phase 2
  IB.HENNA,        // Phase 3
  IB.EMERALD,      // Phase 4
  IB.MONSOON,      // Phase 5
  'hsl(0, 0%, 40%)', // Phase 6 — Black Death
  IB.SAND,         // Phase 7
];

/* ── Phase Arabic labels ── */
export const PHASE_ARABIC: Record<string, string> = {
  'North Africa to Mecca': 'من المغرب إلى مكة',
  'Iraq, Persia & East Africa': 'العراق وفارس وشرق أفريقيا',
  'Anatolia & the Golden Horde': 'الأناضول والقبيلة الذهبية',
  'The Delhi Sultanate': 'سلطنة دلهي',
  'Maldives to China': 'من المالديف إلى الصين',
  'The Black Death Return': 'عودة الموت الأسود',
  'Al-Andalus & Mali': 'الأندلس ومالي',
};

/* ── All coordinates (ordered) for progressive route drawing ── */
export const ALL_COORDS: [number, number][] = [
  // Phase 1
  [35.759, -5.833],   // 0  Tangier
  [34.878, -1.314],   // 1  Tlemcen
  [36.806, 10.181],   // 2  Tunis
  [32.887, 13.180],   // 3  Tripoli
  [31.200, 29.919],   // 4  Alexandria
  [30.044, 31.235],   // 5  Cairo
  [33.513, 36.276],   // 6  Damascus
  [24.468, 39.611],   // 7  Medina
  [21.422, 39.826],   // 8  Mecca
  // Phase 2
  [33.312, 44.366],   // 9  Baghdad
  [38.080, 46.291],   // 10 Tabriz
  [23.614, 58.545],   // 11 Muscat
  [12.812, 45.028],   // 12 Aden
  [2.047, 45.318],    // 13 Mogadishu
  [-8.950, 39.516],   // 14 Kilwa
  // Phase 3
  [37.872, 32.493],   // 15 Konya
  [42.015, 41.634],   // 16 Sinope
  [44.952, 34.102],   // 17 Crimea
  [48.692, 44.481],   // 18 Sarai Berke
  [41.008, 28.978],   // 19 Constantinople
  // Phase 4
  [39.768, 64.421],   // 20 Balkh
  [34.521, 69.172],   // 21 Kabul
  [30.203, 71.454],   // 22 Multan
  [28.613, 77.209],   // 23 Delhi
  [19.877, 75.343],   // 24 Daulatabad
  [11.258, 75.780],   // 25 Calicut
  // Phase 5
  [4.175, 73.509],    // 26 Malé
  [7.293, 80.636],    // 27 Sri Lanka
  [6.125, 100.470],   // 28 Malay Peninsula
  [24.874, 118.675],  // 29 Quanzhou
  [30.274, 120.155],  // 30 Hangzhou
  [39.904, 116.391],  // 31 Beijing
  // Phase 6
  [24.874, 118.675],  // 32 Quanzhou (return)
  [4.175, 73.509],    // 33 Malé (return)
  [21.422, 39.826],   // 34 Mecca (return)
  [30.044, 31.235],   // 35 Cairo (return)
  [33.513, 36.276],   // 36 Damascus (return)
  [31.200, 29.919],   // 37 Alexandria (return)
  [35.759, -5.833],   // 38 Tangier (return)
  // Phase 7
  [37.176, -3.588],   // 39 Granada
  [34.033, -5.000],   // 40 Fez
  [31.716, -4.002],   // 41 Sijilmasa
  [22.674, -5.722],   // 42 Taghaza
  [16.766, -3.002],   // 43 Timbuktu
  [12.650, -8.000],   // 44 Mali Capital
  [34.033, -5.000],   // 45 Fez (final)
];

/* ── Stage definitions for scroll-driven map ── */
export const STAGES: BattutaStage[] = [
  // ── OVERVIEW ──
  {
    id: 'battuta-overview',
    center: [25, 40],
    zoom: 3,
    label: 'The Rihla',
    phase: 'Overview',
    phaseIndex: -1,
    date: '1325–1354',
    routeUpTo: -1,
    markers: [{ coords: [-5.833, 35.759], label: 'Tangier', detail: 'Point of departure' }],
    narrative: {
      title: 'A Journey of 117,000 Kilometers',
      body: 'In June 1325, a 21-year-old Moroccan scholar named Abu Abdullah Muhammad ibn Battuta set out from Tangier on a donkey, intending to perform the Hajj. He would not return for 29 years — having traversed the entire known Islamic world and beyond, from the salt mines of the Sahara to the ports of Yuan Dynasty China.',
      quote: { text: 'I set out alone, having neither a fellow-traveller in whose companionship I might find cheer, nor caravan whose part I might join, but swayed by an overmastering impulse within me.', attribution: 'Ibn Battuta, The Rihla' },
    },
  },

  // ── PHASE 1: North Africa to Mecca ──
  {
    id: 'phase1-tangier',
    center: [35.759, -5.833],
    zoom: 8,
    label: 'Tangier',
    phase: 'North Africa to Mecca',
    phaseIndex: 0,
    date: 'June 1325',
    routeUpTo: 0,
    markers: [{ coords: [-5.833, 35.759], label: 'Tangier', detail: 'Departure' }],
    narrative: {
      title: 'Tangier — The Departure',
      body: 'Born into a family of Maliki legal scholars in the Marinid Sultanate, the young Ibn Battuta received a rigorous education in Quranic studies, hadith, and Islamic jurisprudence. At 21, he left Tangier with no companion — only an "overmastering impulse" to see the world beyond the Pillars of Hercules. His training as a qadi would become his passport to every court from Morocco to China.',
      accent: 'He departed on a donkey, carrying little more than his legal education and an insatiable curiosity.',
    },
  },
  {
    id: 'phase1-tlemcen',
    center: [34.878, -1.314],
    zoom: 7,
    label: 'Tlemcen',
    phase: 'North Africa to Mecca',
    phaseIndex: 0,
    date: '1325',
    routeUpTo: 1,
    markers: [{ coords: [-1.314, 34.878], label: 'Tlemcen', detail: 'Busy trading city' }],
    narrative: {
      title: 'Tlemcen — Into the Interior',
      body: 'Crossing into the Zayyanid territory, Ibn Battuta reached Tlemcen — a prosperous trading city that connected the caravan routes of the Sahara with Mediterranean commerce. Here he first experienced the Islamic hospitality network: zawiyas (Sufi lodges) that provided free food and shelter to traveling scholars.',
    },
  },
  {
    id: 'phase1-tunis',
    center: [36.806, 10.181],
    zoom: 7,
    label: 'Tunis',
    phase: 'North Africa to Mecca',
    phaseIndex: 0,
    date: '1325',
    routeUpTo: 2,
    markers: [{ coords: [10.181, 36.806], label: 'Tunis', detail: 'Appointed caravan qadi' }],
    narrative: {
      title: 'Tunis — The Caravan Judge',
      body: 'In Tunis, Ibn Battuta joined a large Hajj caravan and was appointed its qadi — responsible for settling disputes among the pilgrims. This was his first professional appointment, and it established the pattern that would repeat across the Islamic world: a Maliki scholar was always in demand. He stayed two months, studying and networking.',
    },
  },
  {
    id: 'phase1-alexandria',
    center: [31.200, 29.919],
    zoom: 7,
    label: 'Alexandria',
    phase: 'North Africa to Mecca',
    phaseIndex: 0,
    date: 'April 1326',
    routeUpTo: 4,
    markers: [{ coords: [29.919, 31.200], label: 'Alexandria', detail: 'Pharos Lighthouse' }],
    narrative: {
      title: 'Alexandria — The Decaying Pharos',
      body: 'Arriving at the great Mamluk port of Alexandria, Ibn Battuta witnessed one of the Seven Wonders of the Ancient World in its final decay — the Pharos Lighthouse, already partially collapsed. He noted the city\'s dual harbor: separate docks for Christian and Muslim merchant vessels, a physical manifestation of the medieval trade diplomacy.',
      accent: 'He met the Sufi mystic Burhan al-Din, who prophesied that his journey would eventually reach India, China, and West Africa.',
    },
  },
  {
    id: 'phase1-cairo',
    center: [30.044, 31.235],
    zoom: 7,
    label: 'Cairo',
    phase: 'North Africa to Mecca',
    phaseIndex: 0,
    date: '1326',
    routeUpTo: 5,
    markers: [{ coords: [31.235, 30.044], label: 'Cairo', detail: '"Mother of Cities"' }],
    narrative: {
      title: 'Cairo — Mother of Cities',
      body: 'Nothing in the Maghrib could have prepared him for Cairo. With a population approaching 600,000, it was the largest city in the Islamic world — a metropolis of mosques, madrasas, and caravanserais that dwarfed anything he had seen. The Mamluk Sultanate governed Egypt as a military state of extraordinary wealth and administrative sophistication.',
      quote: { text: 'I arrived at length at Cairo, mother of cities... She surges as the waves of the sea with her throngs of folk.', attribution: 'Ibn Battuta, The Rihla' },
    },
  },
  {
    id: 'phase1-damascus',
    center: [33.513, 36.276],
    zoom: 7,
    label: 'Damascus',
    phase: 'North Africa to Mecca',
    phaseIndex: 0,
    date: 'August 1326',
    routeUpTo: 6,
    markers: [{ coords: [36.276, 33.513], label: 'Damascus', detail: 'Hajj caravan assembly' }],
    narrative: {
      title: 'Damascus — The Grand Caravan',
      body: 'In Damascus, Ibn Battuta joined the massive official Hajj caravan — thousands of pilgrims, merchants, and soldiers assembling for the southward journey to Mecca. He studied with local scholars, collected certificates of learning, and marveled at the Umayyad Mosque. Damascus was the great assembly point where pilgrims from across the Levant converged.',
    },
  },
  {
    id: 'phase1-mecca',
    center: [21.422, 39.826],
    zoom: 7,
    label: 'Mecca',
    phase: 'North Africa to Mecca',
    phaseIndex: 0,
    date: 'Late 1326',
    routeUpTo: 8,
    markers: [{ coords: [39.826, 21.422], label: 'Mecca', detail: 'First Hajj completed' }],
    narrative: {
      title: 'Mecca — The First Pilgrimage',
      body: 'After passing through Medina to visit the Prophet\'s Mosque, Ibn Battuta completed his first Hajj in Mecca. For most pilgrims, this would have been the end of the journey — return home to the Maghrib, resume life as a local qadi. But Ibn Battuta stayed. He would perform the Hajj multiple times over the coming years, using Mecca as a base camp for increasingly ambitious expeditions.',
      accent: '~3,500 kilometers covered in the first phase — but the real journey was only beginning.',
    },
  },

  // ── PHASE 2: Iraq, Persia & East Africa ──
  {
    id: 'phase2-baghdad',
    center: [33.312, 44.366],
    zoom: 6,
    label: 'Baghdad',
    phase: 'Iraq, Persia & East Africa',
    phaseIndex: 1,
    date: 'June 1327',
    routeUpTo: 9,
    markers: [{ coords: [44.366, 33.312], label: 'Baghdad', detail: 'Met Sultan Abu Sa\'id' }],
    narrative: {
      title: 'Baghdad — The Recovering Capital',
      body: 'Venturing east into Ilkhanate territory, Ibn Battuta reached Baghdad — a city still recovering from the devastating Mongol sack of 1258 that had destroyed the Abbasid Caliphate. Yet he found it still grand, meeting Sultan Abu Sa\'id and observing the city\'s partial recovery. The great libraries were gone, but the commercial networks endured.',
    },
  },
  {
    id: 'phase2-tabriz',
    center: [38.080, 46.291],
    zoom: 6,
    label: 'Tabriz',
    phase: 'Iraq, Persia & East Africa',
    phaseIndex: 1,
    date: '1327',
    routeUpTo: 10,
    markers: [{ coords: [46.291, 38.080], label: 'Tabriz', detail: 'Major Silk Road hub' }],
    narrative: {
      title: 'Tabriz — The Silk Road Nexus',
      body: 'Tabriz was one of the great commercial cities of the medieval world — a Silk Road hub under the Ilkhanate where Persian, Turkic, and Mongol cultures intertwined. Its bazaar was legendary, handling goods from China to Europe. Ibn Battuta entered a world where Mongol administrative efficiency met Islamic commercial law.',
    },
  },
  {
    id: 'phase2-aden',
    center: [12.812, 45.028],
    zoom: 5,
    label: 'Aden',
    phase: 'Iraq, Persia & East Africa',
    phaseIndex: 1,
    date: '1329',
    routeUpTo: 12,
    markers: [{ coords: [45.028, 12.812], label: 'Aden', detail: 'Indian Ocean gateway' }],
    narrative: {
      title: 'Aden — Gateway to the Monsoon Routes',
      body: 'Turning south, Ibn Battuta reached Aden — the strategic port where the Red Sea meets the Indian Ocean. Here he first encountered the monsoon-driven maritime world: merchants waited months for the seasonal winds to shift, creating vibrant diasporic communities. Spices from India, silk from China, and gold from Africa all converged in this harbor.',
      accent: 'The Indian Ocean was not a barrier but a highway — predictable monsoon winds made it the most connected sea in the medieval world.',
    },
  },
  {
    id: 'phase2-mogadishu',
    center: [2.047, 45.318],
    zoom: 6,
    label: 'Mogadishu',
    phase: 'Iraq, Persia & East Africa',
    phaseIndex: 1,
    date: '1332',
    routeUpTo: 13,
    markers: [{ coords: [45.318, 2.047], label: 'Mogadishu', detail: 'Fabric exports' }],
    narrative: {
      title: 'Mogadishu — Swahili Prosperity',
      body: 'Sailing down the East African coast, Ibn Battuta arrived at Mogadishu at the zenith of its prosperity. He observed a Somali sultan who spoke Arabic but maintained local traditions — a vivid example of the cultural hybridity of the Swahili coast. The city exported high-quality textiles to Egypt and was a major node in the Indian Ocean trade network.',
    },
  },
  {
    id: 'phase2-kilwa',
    center: [-8.950, 39.516],
    zoom: 6,
    label: 'Kilwa',
    phase: 'Iraq, Persia & East Africa',
    phaseIndex: 1,
    date: '1332',
    routeUpTo: 14,
    markers: [{ coords: [39.516, -8.950], label: 'Kilwa', detail: '"Most beautiful city"' }],
    narrative: {
      title: 'Kilwa — Stone City of the South',
      body: 'At the southern extreme of his East African journey, Ibn Battuta reached Kilwa (in modern Tanzania), which he described as "one of the most beautiful cities in the world." Its stone houses and coral architecture impressed him deeply. The sultan was praised for his humility and piety. ~8,000 kilometers covered — the Islamic world extended far further than most Europeans imagined.',
    },
  },

  // ── PHASE 3: Anatolia & the Golden Horde ──
  {
    id: 'phase3-konya',
    center: [37.872, 32.493],
    zoom: 6,
    label: 'Konya',
    phase: 'Anatolia & the Golden Horde',
    phaseIndex: 2,
    date: '1332',
    routeUpTo: 15,
    markers: [{ coords: [32.493, 37.872], label: 'Konya', detail: 'Rumi\'s tomb' }],
    narrative: {
      title: 'Konya — The Fityan Brotherhoods',
      body: 'Crossing into Anatolia, Ibn Battuta discovered a network unique to the Turkmen beyliks: the fityan — youth brotherhoods of artisans who competed to host foreign travelers. In Konya, he visited the tomb of Jalal al-Din Rumi and was deeply moved. These brotherhoods provided the same hospitality infrastructure as the zawiyas of North Africa, but organized by trade guilds rather than Sufi orders.',
    },
  },
  {
    id: 'phase3-crimea',
    center: [44.952, 34.102],
    zoom: 5,
    label: 'Crimea',
    phase: 'Anatolia & the Golden Horde',
    phaseIndex: 2,
    date: '1333',
    routeUpTo: 17,
    markers: [{ coords: [34.102, 44.952], label: 'Crimea', detail: 'Golden Horde territory' }],
    narrative: {
      title: 'Crimea — Into the Steppe',
      body: 'Crossing the Black Sea from the port of Sinope, Ibn Battuta entered an entirely different world: the Eurasian steppe, domain of the Golden Horde. The Mongol successor state had embraced Islam under Uzbeg Khan, creating a fusion of nomadic steppe culture and Islamic legal tradition. Ibn Battuta traveled with the ordu — a mobile city of felt-covered wagons.',
    },
  },
  {
    id: 'phase3-sarai',
    center: [48.692, 44.481],
    zoom: 5,
    label: 'Sarai Berke',
    phase: 'Anatolia & the Golden Horde',
    phaseIndex: 2,
    date: '1333',
    routeUpTo: 18,
    markers: [{ coords: [44.481, 48.692], label: 'Sarai Berke', detail: 'Capital of the Golden Horde' }],
    narrative: {
      title: 'Sarai Berke — The Khan\'s Court',
      body: 'At the capital of the Golden Horde, Ibn Battuta met Uzbeg Khan in his great tent-palace. The Khan ruled over a vast territory from the Volga to the Urals, and his court was a cosmopolitan mixture of Mongol, Turkic, and Persian influences. Despite the steppe setting, Ibn Battuta found the same Islamic legal framework operating — a testament to the commonwealth\'s reach.',
    },
  },
  {
    id: 'phase3-constantinople',
    center: [41.008, 28.978],
    zoom: 7,
    label: 'Constantinople',
    phase: 'Anatolia & the Golden Horde',
    phaseIndex: 2,
    date: '1334',
    routeUpTo: 19,
    markers: [{ coords: [28.978, 41.008], label: 'Constantinople', detail: 'Hagia Sophia' }],
    narrative: {
      title: 'Constantinople — Beyond the Dar al-Islam',
      body: 'Accompanying Princess Bayalun (a Byzantine wife of Uzbeg Khan) on a visit to her father, Ibn Battuta entered Constantinople — the greatest Christian city in the world. His reaction to the Hagia Sophia was awe at its scale, though he noted with scholarly discomfort the "pagan" icons within. This was a rare excursion beyond the Islamic world, and his descriptions carry a palpable sense of cultural alienation.',
      accent: '~6,000 km in Phase 3 alone — from Konya to the frozen steppes of Russia and back.',
    },
  },

  // ── PHASE 4: The Delhi Sultanate ──
  {
    id: 'phase4-balkh',
    center: [39.768, 64.421],
    zoom: 5,
    label: 'Balkh',
    phase: 'The Delhi Sultanate',
    phaseIndex: 3,
    date: '1334',
    routeUpTo: 20,
    markers: [{ coords: [64.421, 39.768], label: 'Balkh', detail: 'Hindu Kush crossing' }],
    narrative: {
      title: 'Balkh — Across the Hindu Kush',
      body: 'The route to Delhi required crossing the Hindu Kush — mountain passes that Ibn Battuta called "Hindu-slayer" due to the high mortality of slave caravans in the extreme cold. He passed through the ruins of Balkh, once a great city of Khorasan, destroyed by the Mongols a century earlier. The devastation was still visible, a haunting reminder of the fragility of civilization.',
    },
  },
  {
    id: 'phase4-delhi',
    center: [28.613, 77.209],
    zoom: 6,
    label: 'Delhi',
    phase: 'The Delhi Sultanate',
    phaseIndex: 3,
    date: '1334–1341',
    routeUpTo: 23,
    markers: [{ coords: [77.209, 28.613], label: 'Delhi', detail: '7 years as Qadi' }],
    narrative: {
      title: 'Delhi — Seven Years of Luxury and Terror',
      body: 'Muhammad bin Tughluq appointed Ibn Battuta as the Qadi of Delhi — the highest judicial post in the sultanate. He received a massive salary and lived in luxury, but the Sultan was a man of "radical extremes": a brilliant philosopher who executed citizens daily for minor infractions. Ibn Battuta lived in constant fear, witnessing forced migrations, failed currency experiments, and arbitrary violence.',
      quote: { text: 'The sultan is far too free in shedding blood... every day there are people who are brought in chains, and are killed, and their wealth confiscated.', attribution: 'Ibn Battuta on Muhammad bin Tughluq' },
    },
  },
  {
    id: 'phase4-calicut',
    center: [11.258, 75.780],
    zoom: 6,
    label: 'Calicut',
    phase: 'The Delhi Sultanate',
    phaseIndex: 3,
    date: '1341',
    routeUpTo: 25,
    markers: [{ coords: [75.780, 11.258], label: 'Calicut', detail: 'Embassy shipwreck' }],
    narrative: {
      title: 'Calicut — The Failed Embassy',
      body: 'Sent as the Sultan\'s ambassador to Yuan Dynasty China, Ibn Battuta\'s mission collapsed in disaster. A storm destroyed the embassy\'s ships in the harbor of Calicut, drowning gifts worth a fortune. Fearing the Sultan\'s wrath for the loss, Ibn Battuta chose not to return to Delhi. Instead, he fled south — beginning an unplanned odyssey through the maritime world of Southeast Asia.',
      accent: '~4,500 km in Phase 4. The most dramatic and detailed section of the entire Rihla.',
    },
  },

  // ── PHASE 5: Maldives to China ──
  {
    id: 'phase5-male',
    center: [4.175, 73.509],
    zoom: 7,
    label: 'Malé',
    phase: 'Maldives to China',
    phaseIndex: 4,
    date: '1342',
    routeUpTo: 26,
    markers: [{ coords: [73.509, 4.175], label: 'Malé', detail: 'Qadi for 2 years' }],
    narrative: {
      title: 'Malé — Island Qadi',
      body: 'Fleeing south from the failed embassy, Ibn Battuta reached the Maldive Islands, where he was again appointed qadi. He married into the royal family, enforced Islamic law with zealous rigor, and became embroiled in political intrigues. His detailed descriptions of the coconut economy and coral architecture provide one of the only medieval accounts of Maldivian society.',
    },
  },
  {
    id: 'phase5-srilanka',
    center: [7.293, 80.636],
    zoom: 7,
    label: 'Sri Lanka',
    phase: 'Maldives to China',
    phaseIndex: 4,
    date: '1344',
    routeUpTo: 27,
    markers: [{ coords: [80.636, 7.293], label: 'Sri Lanka', detail: 'Adam\'s Peak' }],
    narrative: {
      title: 'Sri Lanka — Adam\'s Peak',
      body: 'Ibn Battuta visited the sacred footprint atop Adam\'s Peak — revered by Muslims as the footprint of Adam, by Buddhists as Buddha\'s, and by Hindus as Shiva\'s. This was the syncretic religious landscape of the Indian Ocean world, where multiple faiths coexisted around shared sacred geography.',
    },
  },
  {
    id: 'phase5-quanzhou',
    center: [24.874, 118.675],
    zoom: 6,
    label: 'Quanzhou',
    phase: 'Maldives to China',
    phaseIndex: 4,
    date: '1345',
    routeUpTo: 29,
    markers: [{ coords: [118.675, 24.874], label: 'Quanzhou', detail: 'Zaytun — Chinese port' }],
    narrative: {
      title: 'Quanzhou — The Eastern Extreme',
      body: 'Landing at Quanzhou (Zaytun), Ibn Battuta reached the eastern extreme of the Islamic world. He was impressed by China\'s safety and craftsmanship — its porcelain, silk, and paper currency — but deeply troubled by the dominance of "paganism." He stayed largely within the Muslim merchant quarters, a reminder that even the most cosmopolitan traveler had cultural limits.',
    },
  },
  {
    id: 'phase5-beijing',
    center: [39.904, 116.391],
    zoom: 5,
    label: 'Beijing',
    phase: 'Maldives to China',
    phaseIndex: 4,
    date: '1346',
    routeUpTo: 31,
    markers: [{ coords: [116.391, 39.904], label: 'Beijing', detail: 'Khan Baliq — debated visit' }],
    narrative: {
      title: 'Beijing — The Disputed Claim',
      body: 'Whether Ibn Battuta actually reached Beijing is one of the great scholarly debates. His descriptions of North China are far less detailed than his vivid accounts of India or Anatolia, suggesting he may have relied on reports from fellow merchants. Yet Tim Mackintosh-Smith argues the vagueness reflects genuine cultural alienation — a Muslim scholar adrift in a world entirely beyond his frame of reference.',
      accent: '~12,000 km in Phase 5 — the longest single phase, spanning from the Maldives to the theoretical northern extreme of Yuan China.',
    },
  },

  // ── PHASE 6: The Black Death Return ──
  {
    id: 'phase6-return',
    center: [20, 75],
    zoom: 3,
    label: 'The Long Return',
    phase: 'The Black Death Return',
    phaseIndex: 5,
    date: '1346–1347',
    routeUpTo: 33,
    markers: [{ coords: [73.509, 4.175], label: 'Malé', detail: 'Passing through again' }],
    narrative: {
      title: 'The Return — Sailing Westward',
      body: 'Turning homeward, Ibn Battuta retraced the monsoon routes — from Quanzhou through Southeast Asia, past the Maldives, and across the Indian Ocean. The journey home was less about discovery than about a man in his forties feeling the pull of his origins. But the world he was returning to had changed catastrophically.',
    },
  },
  {
    id: 'phase6-mecca',
    center: [21.422, 39.826],
    zoom: 6,
    label: 'Mecca',
    phase: 'The Black Death Return',
    phaseIndex: 5,
    date: '1348',
    routeUpTo: 34,
    markers: [{ coords: [39.826, 21.422], label: 'Mecca', detail: 'Final pilgrimage' }],
    narrative: {
      title: 'Mecca — The Final Hajj',
      body: 'Arriving in Arabia, Ibn Battuta performed what would be his final Hajj. The plague had already reached the Middle East, spreading along the same trade routes that had carried him east. The connected world that enabled his journey was now enabling the fastest pandemic transmission in human history.',
    },
  },
  {
    id: 'phase6-cairo-plague',
    center: [30.044, 31.235],
    zoom: 6,
    label: 'Cairo',
    phase: 'The Black Death Return',
    phaseIndex: 5,
    date: '1348',
    routeUpTo: 35,
    markers: [{ coords: [31.235, 30.044], label: 'Cairo', detail: '24,000 dead per day' }],
    narrative: {
      title: 'Cairo — The Great Mortality',
      body: 'The city that had awed him with 600,000 souls was now a charnel house. Ibn Battuta recorded that 24,000 people were dying daily at the plague\'s peak — a figure derived from funeral prayer counts. The streets had emptied. The infrastructure of the Islamic commonwealth — the caravanserais, the zawiyas, the madrasas — was collapsing under the weight of mass death.',
      quote: { text: 'Death has become so great, it has emptied the streets.', attribution: 'Ibn Battuta on plague-era Cairo' },
    },
  },
  {
    id: 'phase6-damascus-plague',
    center: [33.513, 36.276],
    zoom: 6,
    label: 'Damascus',
    phase: 'The Black Death Return',
    phaseIndex: 5,
    date: '1348',
    routeUpTo: 36,
    markers: [{ coords: [36.276, 33.513], label: 'Damascus', detail: '2,400 dead per day' }],
    narrative: {
      title: 'Damascus — The Interfaith Prayer',
      body: 'In Damascus, Ibn Battuta witnessed one of the most extraordinary moments of the pandemic: Muslims, Christians, and Jews gathered together in unified prayer, carrying their respective holy books. 2,400 people were dying daily. The plague dissolved the boundaries that normally separated the communities of the city.',
      quote: { text: 'The Jews came with their Book of the Law and the Christians with their Gospel... all of them weeping and supplicating and seeking the favour of God through His Books and His Prophets.', attribution: 'Ibn Battuta on Damascus, 1348' },
    },
  },
  {
    id: 'phase6-tangier-return',
    center: [35.759, -5.833],
    zoom: 7,
    label: 'Tangier',
    phase: 'The Black Death Return',
    phaseIndex: 5,
    date: '1349',
    routeUpTo: 38,
    markers: [{ coords: [-5.833, 35.759], label: 'Tangier', detail: 'Mother dead of plague' }],
    narrative: {
      title: 'Tangier — The Empty Homecoming',
      body: 'After 24 years away, Ibn Battuta returned to find that his mother had died of the plague just months before his arrival. The city he had left as a young man of 21 was diminished. The Black Death had struck Morocco too. He was 45 years old, a stranger in his own birthplace.',
      accent: '~8,000 km in Phase 6 — a journey home through a dying world.',
    },
  },

  // ── PHASE 7: Al-Andalus & Mali ──
  {
    id: 'phase7-granada',
    center: [37.176, -3.588],
    zoom: 7,
    label: 'Granada',
    phase: 'Al-Andalus & Mali',
    phaseIndex: 6,
    date: '1350',
    routeUpTo: 39,
    markers: [{ coords: [-3.588, 37.176], label: 'Granada', detail: 'Defended against Castile' }],
    narrative: {
      title: 'Granada — The Last Muslim Kingdom in Europe',
      body: 'Unable to settle, Ibn Battuta crossed the Strait of Gibraltar to Granada — the last Muslim kingdom on the Iberian Peninsula, defending against Christian Castile. He joined the volunteer corps defending the Nasrid sultanate, witnessing the military twilight of al-Andalus. The Alhambra was at the peak of its architectural splendor.',
    },
  },
  {
    id: 'phase7-sijilmasa',
    center: [31.716, -4.002],
    zoom: 6,
    label: 'Sijilmasa',
    phase: 'Al-Andalus & Mali',
    phaseIndex: 6,
    date: '1352',
    routeUpTo: 41,
    markers: [{ coords: [-4.002, 31.716], label: 'Sijilmasa', detail: 'Gateway to the Sahara' }],
    narrative: {
      title: 'Sijilmasa — Gateway to the Sahara',
      body: 'Returning to Morocco, Ibn Battuta prepared for his final great journey: the trans-Saharan crossing to the Mali Empire. Sijilmasa was the last oasis before the deep desert — the point where the Mediterranean world ended and the Saharan trade routes began. He purchased camels and provisions for the 1,600-kilometer crossing.',
    },
  },
  {
    id: 'phase7-taghaza',
    center: [22.674, -5.722],
    zoom: 5,
    label: 'Taghaza',
    phase: 'Al-Andalus & Mali',
    phaseIndex: 6,
    date: '1352',
    routeUpTo: 42,
    markers: [{ coords: [-5.722, 22.674], label: 'Taghaza', detail: 'Salt mines' }],
    narrative: {
      title: 'Taghaza — The Salt Mines',
      body: 'Deep in the Sahara, Ibn Battuta reached Taghaza — a settlement built entirely of salt blocks, inhabited by enslaved miners extracting the mineral that was worth its weight in gold in West Africa. The houses, the mosque — all were made of rock salt. It was one of the most desolate places he had ever seen, yet it powered a trade network spanning a continent.',
    },
  },
  {
    id: 'phase7-timbuktu',
    center: [16.766, -3.002],
    zoom: 6,
    label: 'Timbuktu',
    phase: 'Al-Andalus & Mali',
    phaseIndex: 6,
    date: '1353',
    routeUpTo: 43,
    markers: [{ coords: [-3.002, 16.766], label: 'Timbuktu', detail: 'Center of learning' }],
    narrative: {
      title: 'Timbuktu — City of Scholars',
      body: 'Reaching Timbuktu, Ibn Battuta found a city of madrasas and mosques on the edge of the Niger River — a center of Islamic scholarship that linked the Saharan trade routes to the agricultural wealth of the Niger basin. The city\'s mosques were built of mud-brick in a distinctive Sudano-Sahelian style unlike anything in the Mediterranean world.',
    },
  },
  {
    id: 'phase7-mali',
    center: [12.650, -8.000],
    zoom: 5,
    label: 'Mali Empire',
    phase: 'Al-Andalus & Mali',
    phaseIndex: 6,
    date: '1353',
    routeUpTo: 44,
    markers: [{ coords: [-8.000, 12.650], label: 'Mali (Capital)', detail: 'Mansa Suleyman' }],
    narrative: {
      title: 'Mali — Eyewitness to Empire',
      body: 'In the capital of the Mali Empire, Ibn Battuta met Mansa Suleyman and provided one of the only eyewitness accounts of West African society at its peak. He admired the security and Quranic devotion but was famously critical of customs that deviated from North African norms — the freedom of women, the matrilineal inheritance, the public nudity of servants. His account reveals both the Islamic world\'s vast reach and its internal cultural limits.',
      quote: { text: 'The Negroes are of all people the most submissive to their king... They are also very zealous in their attempts to learn the Quran by heart.', attribution: 'Ibn Battuta on the Mali Empire' },
    },
  },
  {
    id: 'phase7-fez-final',
    center: [34.033, -5.000],
    zoom: 7,
    label: 'Fez',
    phase: 'Al-Andalus & Mali',
    phaseIndex: 6,
    date: '1354',
    routeUpTo: 45,
    markers: [{ coords: [-5.000, 34.033], label: 'Fez', detail: 'Dictation of the Rihla begins' }],
    narrative: {
      title: 'Fez — The End of the Road',
      body: 'Returning to Fez at the order of Sultan Abu Inan Faris, Ibn Battuta\'s traveling days were over. The Sultan commissioned the young scribe Ibn Juzayy to record the traveler\'s memoirs. Over two years, the Rihla was dictated — a complex melding of personal memory, literary convention, and borrowed descriptions that would become one of the most comprehensive pre-modern surveys of the Eastern Hemisphere.',
      accent: '117,000 kilometers. 29 years. ~40 modern nations. The greatest journey of the pre-modern world was complete.',
    },
  },
];

/* ── Seven travel phases (kept for legacy components) ── */
export const PHASES: BattutaPhase[] = [
  {
    id: 'phase-1', label: 'North Africa to Mecca', dateRange: '1325–1326', distance: '~3,500 km', color: IB.SAFFRON,
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
    id: 'phase-2', label: 'Iraq, Persia & East Africa', dateRange: '1326–1332', distance: '~8,000 km', color: IB.LAPIS,
    stops: [
      { coords: [33.312, 44.366], label: 'Baghdad', date: 'June 1327' },
      { coords: [38.080, 46.291], label: 'Tabriz', date: '1327' },
      { coords: [23.614, 58.545], label: 'Muscat', date: '1329' },
      { coords: [12.812, 45.028], label: 'Aden', date: '1329' },
      { coords: [2.047, 45.318], label: 'Mogadishu', date: '1332' },
      { coords: [-8.950, 39.516], label: 'Kilwa', date: '1332' },
    ],
  },
  {
    id: 'phase-3', label: 'Anatolia & the Golden Horde', dateRange: '1332–1334', distance: '~6,000 km', color: IB.HENNA,
    stops: [
      { coords: [37.872, 32.493], label: 'Konya', date: '1332' },
      { coords: [42.015, 41.634], label: 'Sinope', date: '1332' },
      { coords: [44.952, 34.102], label: 'Crimea', date: '1333' },
      { coords: [48.692, 44.481], label: 'Sarai Berke', date: '1333' },
      { coords: [41.008, 28.978], label: 'Constantinople', date: '1334' },
    ],
  },
  {
    id: 'phase-4', label: 'The Delhi Sultanate', dateRange: '1334–1341', distance: '~4,500 km', color: IB.EMERALD,
    stops: [
      { coords: [39.768, 64.421], label: 'Balkh', date: '1334' },
      { coords: [34.521, 69.172], label: 'Kabul', date: '1334' },
      { coords: [30.203, 71.454], label: 'Multan', date: '1334' },
      { coords: [28.613, 77.209], label: 'Delhi', date: '1334' },
      { coords: [19.877, 75.343], label: 'Daulatabad', date: '1341' },
      { coords: [11.258, 75.780], label: 'Calicut', date: '1341' },
    ],
  },
  {
    id: 'phase-5', label: 'Maldives to China', dateRange: '1341–1346', distance: '~12,000 km', color: IB.MONSOON,
    stops: [
      { coords: [4.175, 73.509], label: 'Malé', date: '1342' },
      { coords: [7.293, 80.636], label: 'Sri Lanka', date: '1344' },
      { coords: [6.125, 100.470], label: 'Malay Peninsula', date: '1345' },
      { coords: [24.874, 118.675], label: 'Quanzhou', date: '1345' },
      { coords: [30.274, 120.155], label: 'Hangzhou', date: '1346' },
      { coords: [39.904, 116.391], label: 'Beijing', date: '1346' },
    ],
  },
  {
    id: 'phase-6', label: 'The Black Death Return', dateRange: '1346–1349', distance: '~8,000 km', color: 'hsl(0, 0%, 40%)',
    stops: [
      { coords: [24.874, 118.675], label: 'Quanzhou', date: '1346' },
      { coords: [4.175, 73.509], label: 'Malé', date: '1347' },
      { coords: [21.422, 39.826], label: 'Mecca', date: '1348' },
      { coords: [30.044, 31.235], label: 'Cairo', date: '1348' },
      { coords: [33.513, 36.276], label: 'Damascus', date: '1348' },
      { coords: [31.200, 29.919], label: 'Alexandria', date: '1349' },
      { coords: [35.759, -5.833], label: 'Tangier', date: '1349' },
    ],
  },
  {
    id: 'phase-7', label: 'Al-Andalus & Mali', dateRange: '1349–1354', distance: '~6,000 km', color: IB.SAND,
    stops: [
      { coords: [37.176, -3.588], label: 'Granada', date: '1350' },
      { coords: [34.033, -5.000], label: 'Fez', date: '1350' },
      { coords: [31.716, -4.002], label: 'Sijilmasa', date: '1352' },
      { coords: [22.674, -5.722], label: 'Taghaza', date: '1352' },
      { coords: [16.766, -3.002], label: 'Timbuktu', date: '1353' },
      { coords: [12.650, -8.000], label: 'Mali (Capital)', date: '1353' },
      { coords: [34.033, -5.000], label: 'Fez', date: '1354' },
    ],
  },
];

/* ── All stops flattened ── */
export const ALL_STOPS: BattutaStop[] = PHASES.flatMap(p => p.stops);
export const FULL_ROUTE: [number, number][] = PHASES.flatMap(p => p.stops.map(s => s.coords));

export function getPhaseRoute(phaseIndex: number): [number, number][] {
  return PHASES[phaseIndex]?.stops.map(s => s.coords) || [];
}
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
  { id: 'battuta-overview', label: 'Overview', year: '1325' },
  ...STAGES.filter(s => s.id !== 'battuta-overview').map(s => ({ id: s.id, label: s.label, year: s.date.split('–')[0] })),
  { id: 'battuta-commonwealth', label: 'The Commonwealth', year: '' },
  { id: 'battuta-scale', label: 'Comparative Scale', year: '' },
  { id: 'battuta-epilogue', label: 'Epilogue', year: '' },
];
