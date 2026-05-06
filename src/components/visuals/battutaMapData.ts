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
    image?: { src: string; alt: string; caption: string };
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

/* ── Stage definitions for scroll-driven 3D map ── */
export const STAGES: BattutaStage[] = [
  { id: 'battuta-overview', center: [25, 40], zoom: 3, pitch: 0, bearing: 0, speed: 1, label: 'The Rihla', phase: 'Overview', phaseIndex: -1, date: '1325–1354', routeUpTo: -1, markers: [{ coords: [-5.833, 35.759], label: 'Tangier', detail: 'Point of departure' }], narrative: { title: 'A Journey of 117,000 Kilometers', body: 'In June 1325, a 21-year-old Moroccan scholar named Abu Abdullah Muhammad ibn Battuta set out from Tangier on a donkey, intending to perform the Hajj. He would not return for 29 years — having traversed the entire known Islamic world and beyond, from the salt mines of the Sahara to the ports of Yuan Dynasty China.', quote: { text: 'I set out alone, having neither a fellow-traveller in whose companionship I might find cheer, nor caravan whose part I might join, but swayed by an overmastering impulse within me.', attribution: 'Ibn Battuta, The Rihla' } } },

  // Phase 1: North Africa to Mecca — heading east
  { id: 'phase1-tangier', center: [35.759, -5.833], zoom: 8, pitch: 50, bearing: 80, speed: 1, label: 'Tangier', phase: 'North Africa to Mecca', phaseIndex: 0, date: 'June 1325', routeUpTo: 0, markers: [{ coords: [-5.833, 35.759], label: 'Tangier', detail: 'Departure' }], narrative: { title: 'Tangier — The Departure', body: 'Born into a family of Maliki legal scholars in the Marinid Sultanate, the young Ibn Battuta received a rigorous education in Quranic studies, hadith, and Islamic jurisprudence. At 21, he left Tangier with no companion — only an "overmastering impulse" to see the world beyond the Pillars of Hercules.', accent: 'He departed on a donkey, carrying little more than his legal education and an insatiable curiosity.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Tanger_cor.jpg/960px-Tanger_cor.jpg', alt: 'Panoramic view of Tangier medina and harbor', caption: 'Tangier — the Maghrebi port city Ibn Battuta left in June 1325, never imagining he would not return for 24 years' } } },
  { id: 'phase1-tlemcen', center: [34.878, -1.314], zoom: 7, pitch: 50, bearing: 75, speed: 1, label: 'Tlemcen', phase: 'North Africa to Mecca', phaseIndex: 0, date: '1325', routeUpTo: 1, markers: [{ coords: [-1.314, 34.878], label: 'Tlemcen', detail: 'Busy trading city' }], narrative: { title: 'Tlemcen — Into the Interior', body: 'Crossing into the Zayyanid territory, Ibn Battuta reached Tlemcen — a prosperous trading city that connected the caravan routes of the Sahara with Mediterranean commerce. Here he first experienced the Islamic hospitality network: zawiyas (Sufi lodges) that provided free food and shelter to traveling scholars.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Vue_du_Mihrab%2C_Grande_Mosqu%C3%A9e%2C_Tlemcen_%28SNED%29_%28cropped%29.jpg/960px-Vue_du_Mihrab%2C_Grande_Mosqu%C3%A9e%2C_Tlemcen_%28SNED%29_%28cropped%29.jpg', alt: 'Mihrab of the Great Mosque of Tlemcen', caption: 'Great Mosque of Tlemcen — Almoravid mihrab in the trading city Ibn Battuta passed through in 1325' } } },
  { id: 'phase1-tunis', center: [36.806, 10.181], zoom: 7, pitch: 50, bearing: 70, speed: 1, label: 'Tunis', phase: 'North Africa to Mecca', phaseIndex: 0, date: '1325', routeUpTo: 2, markers: [{ coords: [10.181, 36.806], label: 'Tunis', detail: 'Appointed caravan qadi' }], narrative: { title: 'Tunis — The Caravan Judge', body: 'In Tunis, Ibn Battuta joined a large Hajj caravan and was appointed its qadi — responsible for settling disputes among the pilgrims. This was his first professional appointment, and it established the pattern that would repeat across the Islamic world: a Maliki scholar was always in demand.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Le_Minaret_de_Djamaa_Zitouna.JPG/960px-Le_Minaret_de_Djamaa_Zitouna.JPG', alt: 'Minaret of the Zitouna Mosque in Tunis', caption: 'Zitouna Mosque, Tunis — where Ibn Battuta joined the Hajj caravan as its qadi in 1325' } } },
  { id: 'phase1-alexandria', center: [31.200, 29.919], zoom: 7, pitch: 55, bearing: 120, speed: 1.2, label: 'Alexandria', phase: 'North Africa to Mecca', phaseIndex: 0, date: 'April 1326', routeUpTo: 4, markers: [{ coords: [29.919, 31.200], label: 'Alexandria', detail: 'Pharos Lighthouse' }], narrative: { title: 'Alexandria — The Decaying Pharos', body: 'Arriving at the great Mamluk port of Alexandria, Ibn Battuta witnessed one of the Seven Wonders of the Ancient World in its final decay — the Pharos Lighthouse, already partially collapsed. He noted the city\'s dual harbor: separate docks for Christian and Muslim merchant vessels.', accent: 'He met the Sufi mystic Burhan al-Din, who prophesied that his journey would eventually reach India, China, and West Africa.' } },
  { id: 'phase1-cairo', center: [30.044, 31.235], zoom: 7, pitch: 55, bearing: 170, speed: 0.8, label: 'Cairo', phase: 'North Africa to Mecca', phaseIndex: 0, date: '1326', routeUpTo: 5, markers: [{ coords: [31.235, 30.044], label: 'Cairo', detail: '"Mother of Cities"' }], narrative: { title: 'Cairo — Mother of Cities', body: 'Nothing in the Maghrib could have prepared him for Cairo. With a population approaching 600,000, it was the largest city in the Islamic world — a metropolis of mosques, madrasas, and caravanserais that dwarfed anything he had seen.', quote: { text: 'I arrived at length at Cairo, mother of cities... She surges as the waves of the sea with her throngs of folk.', attribution: 'Ibn Battuta, The Rihla' }, image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flickr_-_archer10_%28Dennis%29_-_Egypt-13A-061_%28cropped%29.jpg/960px-Flickr_-_archer10_%28Dennis%29_-_Egypt-13A-061_%28cropped%29.jpg', alt: 'Mosque-Madrasa of Sultan Hassan in Cairo', caption: 'Sultan Hassan Mosque-Madrasa, Cairo — Mamluk architecture at its peak in the city Ibn Battuta called the Mother of Cities' } } },
  { id: 'phase1-damascus', center: [33.513, 36.276], zoom: 7, pitch: 55, bearing: 40, speed: 1, label: 'Damascus', phase: 'North Africa to Mecca', phaseIndex: 0, date: 'August 1326', routeUpTo: 6, markers: [{ coords: [36.276, 33.513], label: 'Damascus', detail: 'Hajj caravan assembly' }], narrative: { title: 'Damascus — The Grand Caravan', body: 'In Damascus, Ibn Battuta joined the massive official Hajj caravan — thousands of pilgrims, merchants, and soldiers assembling for the southward journey to Mecca. He studied with local scholars, collected certificates of learning, and marveled at the Umayyad Mosque.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Umayyad_Mosque%2C_courtyard.JPG/960px-Umayyad_Mosque%2C_courtyard.JPG', alt: 'Courtyard of the Umayyad Mosque in Damascus', caption: 'Umayyad Mosque courtyard, Damascus — where Ibn Battuta studied before the great Hajj caravan departed in 1326' } } },
  { id: 'phase1-mecca', center: [21.422, 39.826], zoom: 7, pitch: 55, bearing: 170, speed: 1.2, label: 'Mecca', phase: 'North Africa to Mecca', phaseIndex: 0, date: 'Late 1326', routeUpTo: 8, markers: [{ coords: [39.826, 21.422], label: 'Mecca', detail: 'First Hajj completed' }], narrative: { title: 'Mecca — The First Pilgrimage', body: 'After passing through Medina to visit the Prophet\'s Mosque, Ibn Battuta completed his first Hajj in Mecca. For most pilgrims, this would have been the end of the journey — return home to the Maghrib, resume life as a local qadi. But Ibn Battuta stayed.', accent: '~3,500 kilometers covered in the first phase — but the real journey was only beginning.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Great_Mosque_of_Mecca1.jpg/960px-Great_Mosque_of_Mecca1.jpg', alt: 'The Great Mosque of Mecca and the Kaaba', caption: 'Masjid al-Haram, Mecca — site of the first Hajj that should have ended the journey but only began it' } } },

  // ── PIVOT — the moment the journey becomes the journey ─────────────────
  { id: 'phase1-mecca-pivot', center: [21.422, 39.826], zoom: 5, pitch: 30, bearing: 60, speed: 1.6, label: 'The Pivot', phase: 'North Africa to Mecca', phaseIndex: 0, date: 'Late 1326', routeUpTo: 8, markers: [], narrative: { title: 'He Stayed.', body: 'For most pilgrims, the Hajj was the journey. They returned to their towns, resumed their lives, served as local qadis or merchants until they died. Ibn Battuta was twenty-two years old. He had completed the most important journey of a Muslim life. He could have gone home a respected scholar.', accent: 'He kept walking. The journey would not stop for twenty-seven more years.' } },

  // Phase 2: Iraq, Persia & East Africa — heading east then south
  { id: 'phase2-baghdad', center: [33.312, 44.366], zoom: 6, pitch: 55, bearing: 75, speed: 1.3, label: 'Baghdad', phase: 'Iraq, Persia & East Africa', phaseIndex: 1, date: 'June 1327', routeUpTo: 9, markers: [{ coords: [44.366, 33.312], label: 'Baghdad', detail: 'Met Sultan Abu Sa\'id' }], narrative: { title: 'Baghdad — The Recovering Capital', body: 'Venturing east into Ilkhanate territory, Ibn Battuta reached Baghdad — a city still recovering from the devastating Mongol sack of 1258 that had destroyed the Abbasid Caliphate. Yet he found it still grand, meeting Sultan Abu Sa\'id and observing the city\'s partial recovery.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/%D8%A7%D9%84%D9%85%D8%AF%D8%B1%D8%B3%D8%A9_%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%86%D8%B5%D8%B1%D9%8A%D8%A9_%D9%81%D9%8A_%D8%A8%D8%BA%D8%AF%D8%A7%D8%AF.jpg/960px-%D8%A7%D9%84%D9%85%D8%AF%D8%B1%D8%B3%D8%A9_%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%86%D8%B5%D8%B1%D9%8A%D8%A9_%D9%81%D9%8A_%D8%A8%D8%BA%D8%AF%D8%A7%D8%AF.jpg', alt: 'Al-Mustansiriya Madrasa in Baghdad', caption: 'Al-Mustansiriya Madrasa, Baghdad — founded 1227, one of the great pre-modern universities, surviving the Mongol sack of 1258' } } },
  { id: 'phase2-tabriz', center: [38.080, 46.291], zoom: 6, pitch: 55, bearing: 30, speed: 1, label: 'Tabriz', phase: 'Iraq, Persia & East Africa', phaseIndex: 1, date: '1327', routeUpTo: 10, markers: [{ coords: [46.291, 38.080], label: 'Tabriz', detail: 'Major Silk Road hub' }], narrative: { title: 'Tabriz — The Silk Road Nexus', body: 'Tabriz was one of the great commercial cities of the medieval world — a Silk Road hub under the Ilkhanate where Persian, Turkic, and Mongol cultures intertwined. Its bazaar was legendary, handling goods from China to Europe.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Louvre_OA_7096%2C_Shahnama%2C_Alexander_on_the_throne%2C_1315-1335%2C_Tabriz.jpg/960px-Louvre_OA_7096%2C_Shahnama%2C_Alexander_on_the_throne%2C_1315-1335%2C_Tabriz.jpg', alt: 'Iskandar enthroned, folio from the Great Mongol Shahnameh, Tabriz, c.1335', caption: 'Great Mongol Shahnameh — Ilkhanid manuscript painted in Tabriz in the very years Ibn Battuta visited the Silk Road bazaar' } } },
  { id: 'phase2-aden', center: [12.812, 45.028], zoom: 5, pitch: 55, bearing: 180, speed: 1.5, label: 'Aden', phase: 'Iraq, Persia & East Africa', phaseIndex: 1, date: '1329', routeUpTo: 12, markers: [{ coords: [45.028, 12.812], label: 'Aden', detail: 'Indian Ocean gateway' }], narrative: { title: 'Aden — Gateway to the Monsoon Routes', body: 'Turning south, Ibn Battuta reached Aden — the strategic port where the Red Sea meets the Indian Ocean. Here he first encountered the monsoon-driven maritime world: merchants waited months for the seasonal winds to shift.', accent: 'The Indian Ocean was not a barrier but a highway — predictable monsoon winds made it the most connected sea in the medieval world.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ca._1572_view_of_Aden_and_3_other_ports.jpg/960px-Ca._1572_view_of_Aden_and_3_other_ports.jpg', alt: '1572 view of Aden harbor by Braun and Hogenberg', caption: 'Aden harbor (Braun & Hogenberg, 1572) — the monsoon-driven Indian Ocean port Ibn Battuta sailed through in 1329' } } },
  { id: 'phase2-mogadishu', center: [2.047, 45.318], zoom: 6, pitch: 55, bearing: 185, speed: 1, label: 'Mogadishu', phase: 'Iraq, Persia & East Africa', phaseIndex: 1, date: '1332', routeUpTo: 13, markers: [{ coords: [45.318, 2.047], label: 'Mogadishu', detail: 'Fabric exports' }], narrative: { title: 'Mogadishu — Swahili Prosperity', body: 'Sailing down the East African coast, Ibn Battuta arrived at Mogadishu at the zenith of its prosperity. He observed a Somali sultan who spoke Arabic but maintained local traditions — a vivid example of the cultural hybridity of the Swahili coast.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Fakr_Ud_Din_Mosque.jpg/960px-Fakr_Ud_Din_Mosque.jpg', alt: 'Fakhr ad-Din Mosque, Mogadishu, photographed in 1882', caption: 'Fakhr ad-Din Mosque, Mogadishu (built 1269) — the very 13th-century Swahili mosque Ibn Battuta would have prayed in' } } },
  { id: 'phase2-kilwa', center: [-8.950, 39.516], zoom: 6, pitch: 55, bearing: 210, speed: 1, label: 'Kilwa', phase: 'Iraq, Persia & East Africa', phaseIndex: 1, date: '1332', routeUpTo: 14, markers: [{ coords: [39.516, -8.950], label: 'Kilwa', detail: '"Most beautiful city"' }], narrative: { title: 'Kilwa — Stone City of the South', body: 'At the southern extreme of his East African journey, Ibn Battuta reached Kilwa (in modern Tanzania), which he described as "one of the most beautiful cities in the world." Its stone houses and coral architecture impressed him deeply.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Great_Mosque_Kilwa_Interior.jpg/960px-Great_Mosque_Kilwa_Interior.jpg', alt: 'Interior of the Great Mosque of Kilwa Kisiwani', caption: 'Great Mosque of Kilwa Kisiwani — coral-stone Swahili architecture in the city Ibn Battuta called one of the most beautiful in the world' } } },

  // Phase 3: Anatolia & the Golden Horde — heading north
  { id: 'phase3-konya', center: [37.872, 32.493], zoom: 6, pitch: 55, bearing: 320, speed: 1.5, label: 'Konya', phase: 'Anatolia & the Golden Horde', phaseIndex: 2, date: '1332', routeUpTo: 15, markers: [{ coords: [32.493, 37.872], label: 'Konya', detail: 'Rumi\'s tomb' }], narrative: { title: 'Konya — The Fityan Brotherhoods', body: 'Crossing into Anatolia, Ibn Battuta discovered a network unique to the Turkmen beyliks: the fityan — youth brotherhoods of artisans who competed to host foreign travelers. In Konya, he visited the tomb of Jalal al-Din Rumi and was deeply moved.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Mevlana_Museum_%28Green_Mausoleum%29_in_Konya_Turkey_By_Mardetanha_%2841%29.JPG/960px-Mevlana_Museum_%28Green_Mausoleum%29_in_Konya_Turkey_By_Mardetanha_%2841%29.JPG', alt: 'Green dome of the Mevlana mausoleum in Konya', caption: "Mevlana mausoleum, Konya — Rumi's tomb, which moved Ibn Battuta deeply when he visited in 1332" } } },
  { id: 'phase3-crimea', center: [44.952, 34.102], zoom: 5, pitch: 55, bearing: 10, speed: 1.3, label: 'Crimea', phase: 'Anatolia & the Golden Horde', phaseIndex: 2, date: '1333', routeUpTo: 17, markers: [{ coords: [34.102, 44.952], label: 'Crimea', detail: 'Golden Horde territory' }], narrative: { title: 'Crimea — Into the Steppe', body: 'Crossing the Black Sea from the port of Sinope, Ibn Battuta entered an entirely different world: the Eurasian steppe, domain of the Golden Horde. The Mongol successor state had embraced Islam under Uzbeg Khan, creating a fusion of nomadic steppe culture and Islamic legal tradition.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Stary_Krym_Meczet_Chana_Uzbeka.jpg/960px-Stary_Krym_Meczet_Chana_Uzbeka.jpg', alt: 'Ozbek Han Mosque in Staryi Krym (Old Crimea), built 1314', caption: 'Ozbek Han Mosque, Old Crimea — built 1314 by the very Khan whose Golden Horde realm Ibn Battuta entered in 1333' } } },
  { id: 'phase3-sarai', center: [48.692, 44.481], zoom: 5, pitch: 55, bearing: 50, speed: 1, label: 'Sarai Berke', phase: 'Anatolia & the Golden Horde', phaseIndex: 2, date: '1333', routeUpTo: 18, markers: [{ coords: [44.481, 48.692], label: 'Sarai Berke', detail: 'Capital of the Golden Horde' }], narrative: { title: 'Sarai Berke — The Khan\'s Court', body: 'At the capital of the Golden Horde, Ibn Battuta met Uzbeg Khan in his great tent-palace. The Khan ruled over a vast territory from the Volga to the Urals, and his court was a cosmopolitan mixture of Mongol, Turkic, and Persian influences.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Facial_Chronicle_-_b.07%2C_p.152_-_Oz_Beg_Khan_enthroned.jpg/960px-Facial_Chronicle_-_b.07%2C_p.152_-_Oz_Beg_Khan_enthroned.jpg', alt: 'Uzbeg Khan enthroned, Russian Facial Chronicle miniature', caption: "Uzbeg Khan enthroned — the Golden Horde ruler whom Ibn Battuta met in his great tent-palace at Sarai" } } },
  { id: 'phase3-constantinople', center: [41.008, 28.978], zoom: 7, pitch: 55, bearing: 230, speed: 1.2, label: 'Constantinople', phase: 'Anatolia & the Golden Horde', phaseIndex: 2, date: '1334', routeUpTo: 19, markers: [{ coords: [28.978, 41.008], label: 'Constantinople', detail: 'Hagia Sophia' }], narrative: { title: 'Constantinople — Beyond the Dar al-Islam', body: 'Accompanying Princess Bayalun on a visit to her father, Ibn Battuta entered Constantinople — the greatest Christian city in the world. His reaction to the Hagia Sophia was awe at its scale, though he noted with scholarly discomfort the "pagan" icons within.', accent: '~6,000 km in Phase 3 alone — from Konya to the frozen steppes of Russia and back.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/960px-Hagia_Sophia_Mars_2013.jpg', alt: 'Hagia Sophia exterior view', caption: 'Hagia Sophia — the great basilica that left Ibn Battuta in awe' } } },

  // Phase 4: The Delhi Sultanate — heading east
  { id: 'phase4-balkh', center: [39.768, 64.421], zoom: 5, pitch: 55, bearing: 80, speed: 1.5, label: 'Balkh', phase: 'The Delhi Sultanate', phaseIndex: 3, date: '1334', routeUpTo: 20, markers: [{ coords: [64.421, 39.768], label: 'Balkh', detail: 'Hindu Kush crossing' }], narrative: { title: 'Balkh — Across the Hindu Kush', body: 'The route to Delhi required crossing the Hindu Kush — mountain passes that Ibn Battuta called "Hindu-slayer" due to the high mortality of slave caravans in the extreme cold. He passed through the ruins of Balkh, once a great city of Khorasan, destroyed by the Mongols a century earlier.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Haj_piadeh_9_gonbad_-_panoramio.jpg/960px-Haj_piadeh_9_gonbad_-_panoramio.jpg', alt: 'Ruins of the Noh Gonbad (Haji Piyada) Mosque near Balkh', caption: 'Noh Gonbad Mosque, Balkh — 9th-century ruins of Khorasan that Ibn Battuta passed through after the Mongol devastation' } } },
  // Delhi gets two stages — he spent 7 years here (1334–1341), longer than
  // any other place in the journey. One stage was a betrayal of that weight.
  { id: 'phase4-delhi-appointment', center: [28.613, 77.209], zoom: 6, pitch: 55, bearing: 130, speed: 1.5, label: 'Delhi', phase: 'The Delhi Sultanate', phaseIndex: 3, date: '1334', routeUpTo: 23, markers: [{ coords: [77.209, 28.613], label: 'Delhi', detail: 'Appointed Qadi' }], narrative: { title: 'Delhi — The Appointment', body: 'Muhammad bin Tughluq appointed Ibn Battuta as the Qadi of Delhi — the highest judicial post in the largest Muslim sultanate of the medieval world. The salary was extravagant: 12,000 silver dinars a year, plus revenue from three villages. He was given an entourage, a library, a residence near the imperial palace.', accent: 'For a thirty-year-old Moroccan scholar, this was the pinnacle. He lasted seven years.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/960px-Qutb_Minar_2022.jpg', alt: 'Qutub Minar tower in Delhi', caption: 'Qutub Minar, Delhi — the great minaret already stood when Ibn Battuta served as Qadi of the Sultanate' } } },
  { id: 'phase4-delhi-madness', center: [28.613, 77.209], zoom: 7, pitch: 62, bearing: 100, speed: 1.4, label: 'The Sultan\'s Madness', phase: 'The Delhi Sultanate', phaseIndex: 3, date: '1334–1341', routeUpTo: 23, markers: [{ coords: [77.209, 28.613], label: 'Delhi', detail: 'The Sultan\'s court' }], narrative: { title: 'Delhi — The Sultan\'s Madness', body: 'Muhammad bin Tughluq was, by Ibn Battuta\'s own account, a brilliant philosopher. He read Aristotle and Avicenna; he debated Sufis and judges; he founded universities. He was also "of all men the fondest of making gifts and of shedding blood." Citizens were executed daily for trivial offenses. The Sultan once ordered the entire population of Delhi to march 1,400 km south to a new capital — those too sick or too old were left to die in the streets.', accent: 'When the Sultan offered Ibn Battuta a diplomatic mission to Yuan China, he accepted with relief. He was running for his life.', quote: { text: 'The sultan is far too free in shedding blood... every day there are people who are brought in chains, and are killed, and their wealth confiscated.', attribution: 'Ibn Battuta on Muhammad bin Tughluq' } } },
  { id: 'phase4-calicut', center: [11.258, 75.780], zoom: 6, pitch: 55, bearing: 190, speed: 1.2, label: 'Calicut', phase: 'The Delhi Sultanate', phaseIndex: 3, date: '1341', routeUpTo: 25, markers: [{ coords: [75.780, 11.258], label: 'Calicut', detail: 'Embassy shipwreck' }], narrative: { title: 'Calicut — The Failed Embassy', body: 'Sent as the Sultan\'s ambassador to Yuan Dynasty China, Ibn Battuta\'s mission collapsed in disaster. A storm destroyed the embassy\'s ships in the harbor of Calicut, drowning gifts worth a fortune. Fearing the Sultan\'s wrath, he fled south.', accent: '~4,500 km in Phase 4. The most dramatic and detailed section of the entire Rihla.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Calicut_1572.jpg/960px-Calicut_1572.jpg', alt: '1572 panoramic view of Calicut by Braun and Hogenberg', caption: 'Calicut harbor (Braun & Hogenberg, 1572) — the Malabar port where the Sultan\'s embassy ships were destroyed in 1341' } } },

  // Phase 5: Maldives to China — heading far east
  { id: 'phase5-male', center: [4.175, 73.509], zoom: 7, pitch: 55, bearing: 200, speed: 1, label: 'Malé', phase: 'Maldives to China', phaseIndex: 4, date: '1342', routeUpTo: 26, markers: [{ coords: [73.509, 4.175], label: 'Malé', detail: 'Qadi for 2 years' }], narrative: { title: 'Malé — Island Qadi', body: 'Fleeing south from the failed embassy, Ibn Battuta reached the Maldive Islands, where he was again appointed qadi. He married into the royal family, enforced Islamic law with zealous rigor, and became embroiled in political intrigues.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Friday_mosque_minaret_Male1981.jpg/960px-Friday_mosque_minaret_Male1981.jpg', alt: 'Minaret of the Malé Friday Mosque, 1981', caption: "Malé Friday Mosque minaret — the Maldives' coral-stone Islamic heritage where Ibn Battuta served as qadi" } } },
  { id: 'phase5-srilanka', center: [7.293, 80.636], zoom: 7, pitch: 55, bearing: 60, speed: 1, label: 'Sri Lanka', phase: 'Maldives to China', phaseIndex: 4, date: '1344', routeUpTo: 27, markers: [{ coords: [80.636, 7.293], label: 'Sri Lanka', detail: 'Adam\'s Peak' }], narrative: { title: 'Sri Lanka — Adam\'s Peak', body: 'Ibn Battuta visited the sacred footprint atop Adam\'s Peak — revered by Muslims as the footprint of Adam, by Buddhists as Buddha\'s, and by Hindus as Shiva\'s. This was the syncretic religious landscape of the Indian Ocean world.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sri_Pada_05.jpg/960px-Sri_Pada_05.jpg', alt: "Summit of Adam's Peak (Sri Pada), Sri Lanka", caption: "Adam's Peak summit — the sacred footprint Ibn Battuta climbed to in 1344" } } },
  { id: 'phase5-quanzhou', center: [24.874, 118.675], zoom: 6, pitch: 60, bearing: 55, speed: 1.8, label: 'Quanzhou', phase: 'Maldives to China', phaseIndex: 4, date: '1345', routeUpTo: 29, markers: [{ coords: [118.675, 24.874], label: 'Quanzhou', detail: 'Zaytun — Chinese port' }], narrative: { title: 'Quanzhou — The Eastern Extreme', body: 'Landing at Quanzhou (Zaytun), Ibn Battuta reached the eastern extreme of the Islamic world. He was impressed by China\'s safety and craftsmanship — its porcelain, silk, and paper currency — but deeply troubled by the dominance of "paganism."', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/20230129_Renshou_Pagoda_of_Kaiyuan_Temple.jpg/960px-20230129_Renshou_Pagoda_of_Kaiyuan_Temple.jpg', alt: 'Renshou Pagoda of Kaiyuan Temple, Quanzhou', caption: 'Renshou Pagoda of Kaiyuan Temple, Quanzhou — Song-era stone pagoda standing in the port of Zaytun when Ibn Battuta arrived in 1345' } } },
  { id: 'phase5-beijing', center: [39.904, 116.391], zoom: 5, pitch: 60, bearing: 350, speed: 1.5, label: 'Beijing', phase: 'Maldives to China', phaseIndex: 4, date: '1346 ?', routeUpTo: 31, markers: [{ coords: [116.391, 39.904], label: 'Beijing', detail: 'Khan Baliq — disputed' }], narrative: { title: 'Beijing — Khan Baliq', body: 'Ibn Battuta says he reached the Yuan capital — Khan Baliq, the city the Mongols had built atop old Beijing. He describes the Grand Canal, the great barges, the Khan returning from a hunt with elephants. But the descriptions are thin, the dates do not align with Yuan court records, and his account of North China lacks the dense, specific texture that defines the rest of the Rihla. Modern scholars are divided. Some take him at his word. Others believe he stitched the China chapters from merchants\' tales told in the port of Quanzhou — and never made it past the Yangtze.', accent: 'Or did he?', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/YuanEmperorAlbumKhubilaiPortrait.jpg/960px-YuanEmperorAlbumKhubilaiPortrait.jpg', alt: 'Portrait of Kublai Khan, Yuan dynasty, c.1294', caption: "Kublai Khan portrait (c.1294) — founder of the Yuan dynasty whose capital Khan Baliq Ibn Battuta claimed to have reached" } } },

  // Phase 6: The Black Death Return — heading west
  { id: 'phase6-return', center: [20, 75], zoom: 3, pitch: 40, bearing: 260, speed: 1.8, label: 'The Long Return', phase: 'The Black Death Return', phaseIndex: 5, date: '1346–1347', routeUpTo: 33, markers: [{ coords: [73.509, 4.175], label: 'Malé', detail: 'Passing through again' }], narrative: { title: 'The Return — Sailing Westward', body: 'Turning homeward, Ibn Battuta retraced the monsoon routes — from Quanzhou through Southeast Asia, past the Maldives, and across the Indian Ocean. The world he was returning to had changed catastrophically.' } },
  { id: 'phase6-mecca', center: [21.422, 39.826], zoom: 6, pitch: 50, bearing: 270, speed: 1.5, label: 'Mecca', phase: 'The Black Death Return', phaseIndex: 5, date: '1348', routeUpTo: 34, markers: [{ coords: [39.826, 21.422], label: 'Mecca', detail: 'Final pilgrimage' }], narrative: { title: 'Mecca — The Final Hajj', body: 'Arriving in Arabia, Ibn Battuta performed what would be his final Hajj. The plague had already reached the Middle East, spreading along the same trade routes that had carried him east.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/1018_of_%27%28The_Gallery_of_Geography%2C_a_pictorial_and_descriptive_tour_of_the_world.%29%27_%2811284997903%29.jpg/960px-1018_of_%27%28The_Gallery_of_Geography%2C_a_pictorial_and_descriptive_tour_of_the_world.%29%27_%2811284997903%29.jpg', alt: 'Engraving of the Masjid al-Haram in Mecca, 1884', caption: 'Masjid al-Haram, Mecca — site of the final Hajj Ibn Battuta would ever perform, in 1348' } } },
  { id: 'phase6-cairo-plague', center: [30.044, 31.235], zoom: 6, pitch: 50, bearing: 290, speed: 1, label: 'Cairo', phase: 'The Black Death Return', phaseIndex: 5, date: '1348', routeUpTo: 35, markers: [{ coords: [31.235, 30.044], label: 'Cairo', detail: '24,000 dead per day' }], narrative: { title: 'Cairo — The Great Mortality', body: 'The city that had awed him with 600,000 souls was now a charnel house. Ibn Battuta recorded that 24,000 people were dying daily at the plague\'s peak — a figure derived from funeral prayer counts.', quote: { text: 'Death has become so great, it has emptied the streets.', attribution: 'Ibn Battuta on plague-era Cairo' }, image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/%D8%A7%D9%84%D8%BA%D8%B1%D9%88%D8%A8_%D9%85%D9%86_%D8%A7%D8%B9%D9%84%D9%89_%D9%85%D8%A6%D8%B0%D9%86%D8%A9_%D9%85%D8%B3%D8%AC%D8%AF_%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A7%D9%86_%D9%82%D8%A7%D9%8A%D8%AA%D8%A8%D8%A7%D9%8A_%D8%B5%D8%AD%D8%B1%D8%A7%D8%A1_%D8%A7%D9%84%D9%85%D9%85%D8%A7%D9%84%D9%8A%D9%83.jpg/960px-%D8%A7%D9%84%D8%BA%D8%B1%D9%88%D8%A8_%D9%85%D9%86_%D8%A7%D8%B9%D9%84%D9%89_%D9%85%D8%A6%D8%B0%D9%86%D8%A9_%D9%85%D8%B3%D8%AC%D8%AF_%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A7%D9%86_%D9%82%D8%A7%D9%8A%D8%AA%D8%A8%D8%A7%D9%8A_%D8%B5%D8%AD%D8%B1%D8%A7%D8%A1_%D8%A7%D9%84%D9%85%D9%85%D8%A7%D9%84%D9%8A%D9%83.jpg', alt: 'Sunset over the Mamluk City of the Dead, Cairo', caption: "Cairo's City of the Dead at sunset — the Mamluk necropolis that swallowed 24,000 burials a day at the plague's peak in 1348" } } },
  { id: 'phase6-damascus-plague', center: [33.513, 36.276], zoom: 6, pitch: 50, bearing: 310, speed: 0.8, label: 'Damascus', phase: 'The Black Death Return', phaseIndex: 5, date: '1348', routeUpTo: 36, markers: [{ coords: [36.276, 33.513], label: 'Damascus', detail: '2,400 dead per day' }], narrative: { title: 'Damascus — The Interfaith Prayer', body: 'In Damascus, Ibn Battuta witnessed one of the most extraordinary moments of the pandemic: Muslims, Christians, and Jews gathered together in unified prayer, carrying their respective holy books.', quote: { text: 'The Jews came with their Book of the Law and the Christians with their Gospel... all of them weeping and supplicating and seeking the favour of God through His Books and His Prophets.', attribution: 'Ibn Battuta on Damascus, 1348' }, image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Umayyad_Mosque%2C_Damascus.jpg/960px-Umayyad_Mosque%2C_Damascus.jpg', alt: 'Umayyad Mosque in Damascus', caption: 'Umayyad Mosque, Damascus — where Muslims, Christians, and Jews gathered in unified prayer against the plague in 1348' } } },
  { id: 'phase6-tangier-return', center: [35.759, -5.833], zoom: 7, pitch: 50, bearing: 270, speed: 1.5, label: 'Tangier', phase: 'The Black Death Return', phaseIndex: 5, date: '1349', routeUpTo: 38, markers: [{ coords: [-5.833, 35.759], label: 'Tangier', detail: 'Mother dead of plague' }], narrative: { title: 'Tangier — The Empty Homecoming', body: 'After 24 years away, Ibn Battuta returned to find that his mother had died of the plague just months before his arrival. The city he had left as a young man of 21 was diminished. He was 45 years old, a stranger in his own birthplace.', accent: '~8,000 km in Phase 6 — a journey home through a dying world.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bab_Kasbah_Place_du_Tabor_Tangier_Marokko.jpg/960px-Bab_Kasbah_Place_du_Tabor_Tangier_Marokko.jpg', alt: 'Bab Kasbah and the fortress walls of Tangier', caption: 'Bab Kasbah, Tangier — the kasbah gate of the city Ibn Battuta returned to in 1349, his mother dead of plague' } } },

  // Phase 7: Al-Andalus & Mali — heading south
  { id: 'phase7-granada', center: [37.176, -3.588], zoom: 7, pitch: 50, bearing: 20, speed: 1, label: 'Granada', phase: 'Al-Andalus & Mali', phaseIndex: 6, date: '1350', routeUpTo: 39, markers: [{ coords: [-3.588, 37.176], label: 'Granada', detail: 'Defended against Castile' }], narrative: { title: 'Granada — The Last Muslim Kingdom in Europe', body: 'Unable to settle, Ibn Battuta crossed the Strait of Gibraltar to Granada — the last Muslim kingdom on the Iberian Peninsula, defending against Christian Castile. The Alhambra was at the peak of its architectural splendor.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Patio_de_los_Leones._Alhambra_de_Granada._Spain..JPG/960px-Patio_de_los_Leones._Alhambra_de_Granada._Spain..JPG', alt: 'Court of the Lions, Alhambra, Granada', caption: 'Court of the Lions, Alhambra — Nasrid Granada at its architectural peak when Ibn Battuta visited in 1350' } } },
  { id: 'phase7-sijilmasa', center: [31.716, -4.002], zoom: 6, pitch: 50, bearing: 180, speed: 1, label: 'Sijilmasa', phase: 'Al-Andalus & Mali', phaseIndex: 6, date: '1352', routeUpTo: 41, markers: [{ coords: [-4.002, 31.716], label: 'Sijilmasa', detail: 'Gateway to the Sahara' }], narrative: { title: 'Sijilmasa — Gateway to the Sahara', body: 'Returning to Morocco, Ibn Battuta prepared for his final great journey: the trans-Saharan crossing to the Mali Empire. Sijilmasa was the last oasis before the deep desert. He purchased camels and provisions for the 1,600-kilometer crossing.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/The_northern_gate_of_sijilmassa.jpg/960px-The_northern_gate_of_sijilmassa.jpg', alt: 'Northern gate of the ruined city of Sijilmasa', caption: 'Northern gate of Sijilmasa — the last oasis before the deep Sahara, where Ibn Battuta provisioned for the Mali crossing in 1352' } } },
  { id: 'phase7-taghaza', center: [22.674, -5.722], zoom: 5, pitch: 55, bearing: 190, speed: 1.5, label: 'Taghaza', phase: 'Al-Andalus & Mali', phaseIndex: 6, date: '1352', routeUpTo: 42, markers: [{ coords: [-5.722, 22.674], label: 'Taghaza', detail: 'Salt mines' }], narrative: { title: 'Taghaza — The Salt Mines', body: 'Deep in the Sahara, Ibn Battuta reached Taghaza — a settlement built entirely of salt blocks. The houses, the mosque — all were made of rock salt. It was one of the most desolate places he had ever seen, yet it powered a trade network spanning a continent.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Tombouctou-Arriv%C3%A9e_d%27une_caravane_de_sel_%28AOF%29.jpg/960px-Tombouctou-Arriv%C3%A9e_d%27une_caravane_de_sel_%28AOF%29.jpg', alt: 'Salt caravan from Taoudenni arriving in Timbuktu', caption: 'Saharan salt caravan arriving in Timbuktu — the same trade Ibn Battuta witnessed at the salt-block houses of Taghaza in 1352' } } },
  { id: 'phase7-timbuktu', center: [16.766, -3.002], zoom: 6, pitch: 55, bearing: 200, speed: 1, label: 'Timbuktu', phase: 'Al-Andalus & Mali', phaseIndex: 6, date: '1353', routeUpTo: 43, markers: [{ coords: [-3.002, 16.766], label: 'Timbuktu', detail: 'Center of learning' }], narrative: { title: 'Timbuktu — City of Scholars', body: 'Reaching Timbuktu, Ibn Battuta found a city of madrasas and mosques on the edge of the Niger River — a center of Islamic scholarship that linked the Saharan trade routes to the agricultural wealth of the Niger basin.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Djingareiber_cour.jpg/960px-Djingareiber_cour.jpg', alt: 'Courtyard of the Djinguereber Mosque in Timbuktu', caption: 'Djinguereber Mosque courtyard, Timbuktu — built in 1327, already standing when Ibn Battuta arrived in 1353' } } },
  { id: 'phase7-mali', center: [12.650, -8.000], zoom: 5, pitch: 55, bearing: 220, speed: 1, label: 'Mali Empire', phase: 'Al-Andalus & Mali', phaseIndex: 6, date: '1353', routeUpTo: 44, markers: [{ coords: [-8.000, 12.650], label: 'Mali (Capital)', detail: 'Mansa Suleyman' }], narrative: { title: 'Mali — Eyewitness to Empire', body: 'In the capital of the Mali Empire, Ibn Battuta met Mansa Suleyman and provided one of the only eyewitness accounts of West African society at its peak. He admired the security and Quranic devotion but was famously critical of customs that deviated from North African norms.', quote: { text: 'The Negroes are of all people the most submissive to their king... They are also very zealous in their attempts to learn the Quran by heart.', attribution: 'Ibn Battuta on the Mali Empire' }, image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg/960px-Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg', alt: 'Mansa Musa enthroned, detail from the Catalan Atlas, 1375', caption: 'Mansa Musa in the Catalan Atlas (1375) — brother of Mansa Suleyman, whose Mali court Ibn Battuta described firsthand in 1353' } } },
  { id: 'phase7-fez-final', center: [34.033, -5.000], zoom: 7, pitch: 45, bearing: 0, speed: 1.5, label: 'Fez', phase: 'Al-Andalus & Mali', phaseIndex: 6, date: '1354', routeUpTo: 45, markers: [{ coords: [-5.000, 34.033], label: 'Fez', detail: 'Dictation of the Rihla begins' }], narrative: { title: 'Fez — The End of the Road', body: 'Returning to Fez at the order of Sultan Abu Inan Faris, Ibn Battuta\'s traveling days were over. The Sultan commissioned the young scribe Ibn Juzayy to record the traveler\'s memoirs — one of the most comprehensive pre-modern surveys of the Eastern Hemisphere.', accent: '117,000 kilometers. 29 years. ~40 modern nations. The greatest journey of the pre-modern world was complete.', image: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bou_Inania_Madrasa_2011.jpg/960px-Bou_Inania_Madrasa_2011.jpg', alt: 'Courtyard of the Bou Inania Madrasa in Fez', caption: 'Bou Inania Madrasa, Fez — built 1350–55 by Sultan Abu Inan Faris, the very ruler who commissioned the Rihla' } } },
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
