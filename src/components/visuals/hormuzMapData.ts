/* ══════════════════════════════════════════════════════════════
   Hormuz Essay — All map data by era
   ══════════════════════════════════════════════════════════════ */

/* ── Palette (shared across sections) ── */
export const HZ = {
  NAVY:      'hsl(215, 45%, 8%)',
  TEAL:      'hsl(195, 55%, 35%)',
  AMBER:     'hsl(35, 80%, 50%)',
  PARCHMENT: 'hsl(40, 35%, 88%)',
  SMOKE:     'hsl(210, 15%, 60%)',
  RED:       'hsl(0, 65%, 50%)',
  BRIT_RED:  'hsl(0, 60%, 40%)',
  PORT_GREEN:'hsl(140, 40%, 30%)',
  PERSIAN_GOLD: 'hsl(43, 85%, 55%)',
  DEEP_BLUE: 'hsl(215, 40%, 6%)',
} as const;

/* ── Shipping lanes ── */
export const INBOUND_LANE: [number, number][] = [
  [25.5, 57.2], [26.2, 56.6], [26.45, 56.35], [26.7, 56.0], [27.0, 55.5],
];
export const OUTBOUND_LANE: [number, number][] = [
  [27.0, 55.3], [26.6, 55.9], [26.35, 56.25], [26.1, 56.5], [25.4, 57.1],
];

/* ── Gulf cities (modern) ── */
export const GULF_CITIES = [
  { name: 'Bandar Abbas', coords: [27.18, 56.27] as [number, number], country: 'Iran', detail: 'Iran\'s main port on the strait. Home to an Iranian naval base and the departure point of Iran Air Flight 655. Population: ~500,000.' },
  { name: 'Muscat', coords: [23.59, 58.54] as [number, number], country: 'Oman', detail: 'Capital of Oman, just outside the strait in the Gulf of Oman. Oman controls the Musandam Peninsula on the strait\'s southern shore.' },
  { name: 'Dubai', coords: [25.2, 55.27] as [number, number], country: 'UAE', detail: 'The Gulf\'s commercial hub. Once a pearl-diving village, now a global city — entirely dependent on the strait remaining open for trade.' },
  { name: 'Hormuz Island', coords: [27.06, 56.46] as [number, number], country: 'Iran', detail: 'The island that gave the strait its name. Today a small Iranian island known for its red soil. The ruins of the Portuguese fortress still stand.' },
  { name: 'Khasab', coords: [26.18, 56.25] as [number, number], country: 'Oman', detail: 'Omani port on the Musandam Peninsula — the tip of Arabia that juts into the strait. Oman\'s control of this coastline makes it a key player in strait security.' },
];

/* ── Ancient trade (Dilmun era, ~3000 BCE) ── */
export const ANCIENT_TRADE_ROUTES: [number, number][][] = [
  [[26.03, 50.55], [28.5, 46.0], [30.96, 46.1]],              // Dilmun → Ur
  [[26.03, 50.55], [24.0, 53.0], [23.0, 57.0]],              // Dilmun → Magan
  [[26.03, 50.55], [26.5, 56.3], [25.0, 62.0], [24.86, 67.0]], // Dilmun → Meluhha (via Hormuz)
];

export const ANCIENT_CITIES = [
  { name: 'Dilmun (Bahrain)', coords: [26.03, 50.55] as [number, number], color: HZ.AMBER, detail: 'The Gulf\'s first international trading hub. A small island that controlled trade between Mesopotamia and the Indus Valley for over 2,000 years. The Sumerians called it paradise.' },
  { name: 'Ur', coords: [30.96, 46.1] as [number, number], color: HZ.PARCHMENT, detail: 'Capital of the Sumerian empire (~2100 BCE). Ships from Dilmun docked here carrying copper, pearls, and lapis lazuli up the Euphrates.' },
  { name: 'Magan (Oman)', coords: [23.0, 57.0] as [number, number], color: HZ.PARCHMENT, detail: 'Ancient copper source. Magan\'s mines supplied bronze-age Mesopotamia — the raw material that built empires.' },
  { name: 'Meluhha (Indus)', coords: [24.86, 67.0] as [number, number], color: HZ.PARCHMENT, detail: 'The Indus Valley civilization. Carnelian beads, cotton, and ivory flowed west through the strait to reach Sumerian markets.' },
  { name: 'Strait of Hormuz', coords: [26.56, 56.25] as [number, number], color: HZ.TEAL, detail: '21 miles wide. Every ship moving between the Indian Ocean and the Persian Gulf passes through this narrow throat. It was true in 3000 BCE. It is true today.' },
];

/* ── Persian Gulf era (550 BCE – 1500 CE) ── */
export const PERSIAN_ERA_CITIES = [
  { name: 'Persepolis', coords: [29.93, 52.89] as [number, number], color: HZ.PERSIAN_GOLD, era: 'achaemenid', detail: 'Ceremonial capital of the Achaemenid Empire. Built by Darius I around 518 BCE. Burned by Alexander in 330 BCE — possibly to avenge Xerxes\' destruction of Athens.' },
  { name: 'Susa', coords: [32.19, 48.26] as [number, number], color: HZ.PERSIAN_GOLD, era: 'achaemenid', detail: 'Administrative capital of the Achaemenid Empire. Darius\'s winter palace and the starting point of the Royal Road — 1,600 miles to Sardis.' },
  { name: 'Ctesiphon', coords: [33.09, 44.58] as [number, number], color: HZ.PARCHMENT, era: 'sassanid', detail: 'Capital of the Sassanid Empire (224–651 CE). Its great arch, the Taq Kasra, was the largest single-span vault of the ancient world. The city controlled the head of the Gulf.' },
  { name: 'Siraf', coords: [27.67, 52.35] as [number, number], color: HZ.TEAL, era: 'islamic', detail: 'One of the wealthiest ports on earth from the 7th to 10th century. Chinese porcelain, African ivory, and Indian teak were found in its ruins. Destroyed by earthquake in 977 CE.' },
  { name: 'Old Hormuz', coords: [27.1, 56.4] as [number, number], color: HZ.TEAL, era: 'islamic', detail: 'When Siraf fell, trade shifted here — a mainland settlement near the strait\'s mouth. It thrived until the rulers moved to the island around 1300.' },
  { name: 'New Hormuz (Island)', coords: [27.06, 56.46] as [number, number], color: HZ.AMBER, era: 'kingdom', detail: 'A barren, waterless island at the mouth of the strait. Marco Polo called it "the greatest market in the world" in 1293. Its only resource was its position.' },
  { name: 'Basra', coords: [30.51, 47.81] as [number, number], color: HZ.PARCHMENT, era: 'islamic', detail: 'Founded in 636 CE after the Arab conquest. Gateway between Mesopotamia and the Gulf. One terminal of the monsoon trade network that stretched to Canton.' },
  { name: 'Muscat', coords: [23.59, 58.54] as [number, number], color: HZ.PARCHMENT, era: 'islamic', detail: 'Major port on the Gulf of Oman, just outside the strait. Controlled by various empires — Persian, Portuguese, Omani — always a waypoint for ships entering or leaving the Gulf.' },
];

export const MONSOON_ROUTES: [number, number][][] = [
  [[27.06, 56.46], [23.0, 58.0], [19.0, 72.0], [13.0, 80.0]],   // Hormuz → India
  [[27.06, 56.46], [23.0, 58.0], [10.0, 61.0], [-6.0, 39.0]],   // Hormuz → East Africa
  [[13.0, 80.0], [7.0, 98.0], [1.0, 104.0], [22.0, 114.0]],     // India → China
];

/** Monsoon network endpoints — the far reaches of Gulf trade */
export const MONSOON_ENDPOINTS = [
  { name: 'Canton (Guangzhou)', coords: [23.1, 113.3] as [number, number], color: HZ.TEAL, detail: 'The eastern terminus of the monsoon trade. Arab and Persian merchants maintained a permanent quarter here from the 8th century. Chinese porcelain flowed west; spices and aromatics flowed east.' },
  { name: 'Calicut', coords: [11.25, 75.77] as [number, number], color: HZ.TEAL, detail: 'India\'s "City of Spices." The monsoon pivot point — ships from the Gulf arrived with the northeast winds and waited for the southwest monsoon to carry them home.' },
  { name: 'Kilwa', coords: [-8.95, 39.52] as [number, number], color: HZ.TEAL, detail: 'East African port that traded gold, ivory, and enslaved people northward. Arab coins from the 9th century have been found in its ruins.' },
  { name: 'Palembang', coords: [-2.95, 104.75] as [number, number], color: HZ.TEAL, detail: 'Capital of the Srivijaya empire. Gateway between the Indian Ocean and the South China Sea — the eastern mirror of Hormuz.' },
];

/* ── Portugal era (1507–1622) ── */
export const PORTUGUESE_CITIES = [
  { name: 'Hormuz Island', coords: [27.06, 56.46] as [number, number], color: HZ.PORT_GREEN, role: 'fortress', detail: 'The Fort of Our Lady of the Conception. A massive stone fortress on a barren island — every ship entering the Gulf paid tribute here. Held by Portugal from 1507 to 1622.' },
  { name: 'Bandar Abbas', coords: [27.18, 56.27] as [number, number], color: HZ.PARCHMENT, role: 'coast', detail: '"The Port of Abbas." Named after Shah Abbas I, who expelled the Portuguese in 1622. Today it is Iran\'s largest port on the strait.' },
  { name: 'Goa', coords: [15.3, 73.95] as [number, number], color: HZ.PORT_GREEN, role: 'capital', detail: 'Capital of Portuguese India. Albuquerque seized it in 1510. From here, Portugal controlled Indian Ocean trade for over a century.' },
  { name: 'Malacca', coords: [2.19, 102.25] as [number, number], color: HZ.PORT_GREEN, role: 'lock', detail: 'Gateway to the Pacific. Albuquerque\'s second "lock" — captured in 1511. Controlled all trade between the Indian Ocean and the South China Sea.' },
  { name: 'Aden', coords: [12.8, 45.03] as [number, number], color: HZ.PORT_GREEN, role: 'lock', detail: 'The third lock — at the mouth of the Red Sea. Portugal attempted but never fully secured Aden, leaving the Red Sea route partially open to competitors.' },
];

export const PORTUGUESE_ROUTE: [number, number][] = [
  [15.3, 73.95], [19.0, 72.0], [23.0, 58.0], [27.06, 56.46], // Goa → Hormuz
];

/** Albuquerque's chain of control — three locks across the Indian Ocean */
export const THREE_LOCKS_ROUTE: [number, number][][] = [
  [[12.8, 45.03], [20.0, 52.0], [27.06, 56.46]],              // Aden → Hormuz
  [[27.06, 56.46], [23.0, 58.0], [19.0, 72.0], [8.0, 88.0], [2.19, 102.25]], // Hormuz → Malacca
];

/* ── British era (1820–1971) ── */
/** British India HQ — origin of the "invisible empire" */
export const BRITISH_INDIA_HQ = {
  name: 'Bombay (British India)', coords: [18.94, 72.84] as [number, number],
  detail: 'Headquarters of British India\'s Gulf operations. The Bombay Marine (later Royal Indian Navy) patrolled the Persian Gulf from here. Every treaty with the Trucial States was administered through Bombay.',
};

/** Treaty lines — invisible threads of control from British India to key sheikhdoms */
export const TREATY_ROUTES: [number, number][][] = [
  [[18.94, 72.84], [22.0, 64.0], [24.45, 54.65]],   // Bombay → Abu Dhabi
  [[18.94, 72.84], [22.0, 64.0], [25.2, 55.27]],     // Bombay → Dubai
  [[18.94, 72.84], [22.0, 64.0], [25.79, 55.94]],    // Bombay → Ras al-Khaimah
];

export const TRUCIAL_STATES = [
  { name: 'Abu Dhabi', coords: [24.45, 54.65] as [number, number], detail: 'Largest of the seven sheikhdoms. Sits atop nearly 10% of the world\'s proven oil reserves. Today the capital of the UAE.' },
  { name: 'Dubai', coords: [25.2, 55.27] as [number, number], detail: 'Once a creek-side pearl-diving settlement. Signed its first truce with Britain in 1820. Now a global financial and trade hub.' },
  { name: 'Sharjah', coords: [25.35, 55.4] as [number, number], detail: 'Cultural capital of the Gulf. The first Trucial State to allow an airport (1932) and a cinema. Now a UNESCO-recognized cultural city.' },
  { name: 'Ajman', coords: [25.4, 55.45] as [number, number], detail: 'Smallest of the seven emirates by area. A fishing and dhow-building community before the federation.' },
  { name: 'Umm al-Quwain', coords: [25.56, 55.55] as [number, number], detail: 'One of the least populated emirates. Known for its lagoons and archaeological sites dating back to the Umm an-Nar period (~2500 BCE).' },
  { name: "Ras al-Khaimah", coords: [25.79, 55.94] as [number, number], detail: 'Closest emirate to the Strait of Hormuz. The last Trucial State to join the UAE — it held out until February 1972.' },
  { name: 'Fujairah', coords: [25.12, 56.33] as [number, number], detail: 'The only emirate on the Gulf of Oman coast, outside the strait. Its port is a major oil bunkering hub — ships refuel here before or after transiting Hormuz.' },
];

export const OIL_DISCOVERIES = [
  { year: 1932, place: 'Bahrain', coords: [26.03, 50.55] as [number, number], detail: 'First oil discovery on the Arab side of the Gulf. Oil spurted from Well No. 1 on June 2, 1932 — ending the pearl economy overnight.' },
  { year: 1938, place: 'Saudi Arabia', coords: [25.38, 49.98] as [number, number], detail: 'The Dammam No. 7 well struck oil at depth. Saudi Arabia would become the world\'s largest oil exporter.' },
  { year: 1938, place: 'Kuwait', coords: [29.31, 47.48] as [number, number], detail: 'The Burgan oil field — the second largest in the world. Kuwait became one of the wealthiest nations per capita.' },
  { year: 1958, place: 'Abu Dhabi', coords: [24.45, 54.65] as [number, number], detail: 'Oil discovered offshore at Umm Shaif. Abu Dhabi transformed from a poor sheikhdom to a petro-state within a decade.' },
  { year: 1969, place: 'Dubai', coords: [25.2, 55.27] as [number, number], detail: 'Offshore Fateh oil field. Dubai used its oil revenues to diversify — investing in trade, tourism, and finance before the oil ran out.' },
];

/* ── Tanker War (1980–1988) ── */
export const TANKER_STRIKES: { coords: [number, number]; label: string; detail?: string }[] = [
  { coords: [26.8, 56.0], label: 'Tanker hit', detail: 'Between 1981 and 1988, 546 commercial ships were attacked in the Persian Gulf. Oil prices spiked globally and insurance rates increased tenfold.' },
  { coords: [26.3, 55.5], label: 'Mine field', detail: 'Iran laid mines throughout the shipping lanes. The USS Samuel B. Roberts struck one on April 14, 1988, nearly sinking the frigate.' },
  { coords: [27.2, 56.4], label: 'USS Stark', detail: 'On May 17, 1987, an Iraqi jet fired two Exocet missiles at the USS Stark, killing 37 American sailors. Iraq called it an accident.' },
  { coords: [26.0, 56.8], label: 'Praying Mantis', detail: 'Operation Praying Mantis (April 18, 1988). The largest US naval engagement since WWII. The US sank or damaged half of Iran\'s operational fleet in a single day.' },
  { coords: [26.6, 55.8], label: 'Flight 655', detail: 'On July 3, 1988, the USS Vincennes shot down Iran Air Flight 655 — a civilian Airbus with 290 people aboard, including 66 children. All killed.' },
];

export const TANKER_WAR_EVENTS = [
  { year: 1984, label: 'Tanker War begins', detail: 'Iraq starts attacking Iranian oil tankers; Iran retaliates against Gulf shipping.' },
  { year: 1986, label: 'Operation Earnest Will', detail: 'US Navy begins escorting reflagged Kuwaiti tankers through the strait.' },
  { year: 1987, label: 'USS Stark attacked', detail: 'Iraqi jet fires two Exocet missiles at the USS Stark, killing 37 sailors.' },
  { year: 1988, label: 'Operation Praying Mantis', detail: 'Largest US naval engagement since WWII — retaliatory strike after USS Samuel B. Roberts hits an Iranian mine.' },
  { year: 1988, label: 'Iran Air Flight 655', detail: 'USS Vincennes shoots down Iranian civilian airliner, killing 290 passengers.' },
];

/* ── Bypass pipelines (No Bypass section) ── */
export const EAST_WEST_PIPELINE: [number, number][] = [
  [25.93, 49.68],  // Abqaiq, eastern Saudi Arabia
  [25.5, 47.5],
  [24.8, 44.0],
  [24.2, 41.0],
  [24.09, 38.06],  // Yanbu, Red Sea coast
];

export const HABSHAN_FUJAIRAH_PIPELINE: [number, number][] = [
  [23.83, 54.0],   // Habshan, Abu Dhabi interior
  [24.2, 55.0],
  [24.8, 55.8],
  [25.12, 56.33],  // Fujairah, Gulf of Oman coast
];

export const BYPASS_LABELS = [
  { name: '5M bbl/day', coords: [24.8, 43.5] as [number, number], color: HZ.AMBER },
  { name: '1.5M bbl/day', coords: [24.5, 55.0] as [number, number], color: HZ.AMBER },
  { name: '21M bbl/day', coords: [26.56, 56.25] as [number, number], color: HZ.TEAL },
  { name: 'Yanbu', coords: [24.09, 38.06] as [number, number], color: HZ.SMOKE },
  { name: 'Abqaiq', coords: [25.93, 49.68] as [number, number], color: HZ.SMOKE },
  { name: 'Fujairah', coords: [25.12, 56.33] as [number, number], color: HZ.SMOKE },
  { name: 'Habshan', coords: [23.83, 54.0] as [number, number], color: HZ.SMOKE },
];

/* ── Chokepoints comparison ── */
export const CHOKEPOINTS = [
  {
    name: 'Strait of Hormuz',
    width: '21 miles',
    share: '21% of global oil',
    barrels: '21M barrels/day',
    coords: [26.56, 56.25] as [number, number],
    color: HZ.TEAL,
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

/* ── Strait map view presets ── */
export const STRAIT_STAGES = [
  { center: [27, 52] as [number, number], zoom: 5, label: 'The Persian Gulf' },
  { center: [26.5, 56.2] as [number, number], zoom: 8, label: 'Approaching the Strait' },
  { center: [26.56, 56.25] as [number, number], zoom: 11, label: 'The Strait of Hormuz' },
  { center: [26.56, 56.3] as [number, number], zoom: 13, label: 'Traffic Separation Scheme' },
];
