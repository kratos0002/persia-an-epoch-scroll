/* ── Ramayana Route Map Data ── */

export interface RamayanaMarker {
  coords: [number, number];
  label: string;
  detail?: string;
}

export interface RamayanaToday {
  name: string;
  detail: string;
  coordinates: string;
}

export interface RamayanaImage {
  src: string;
  alt: string;
  caption: string;
}

export interface RamayanaStage {
  id: string;
  center: [number, number];
  zoom: number;
  label: string;
  phase: string;
  year: string;
  routeUpTo: number;
  markers: RamayanaMarker[];
  narrative: {
    title: string;
    body: string;
    accent?: string;
  };
  today?: RamayanaToday;
  image?: RamayanaImage;
}

/* ── Colour tokens — Indian miniature painting palette ── */
export const RM = {
  /* page ground */
  PARCHMENT:    'hsl(38, 45%, 88%)',
  PARCHMENT_DK: 'hsl(34, 38%, 78%)',
  /* inks & accents */
  VERMILLION:   'hsl(8, 78%, 48%)',
  INK:          'hsl(25, 40%, 15%)',
  GOLD_LEAF:    'hsl(43, 90%, 52%)',
  GOLD_DIM:     'hsl(40, 55%, 40%)',
  ULTRAMARINE:  'hsl(220, 65%, 35%)',
  MALACHITE:    'hsl(155, 50%, 32%)',
  LAKE:         'hsl(340, 55%, 52%)',
  OCHRE:        'hsl(32, 60%, 50%)',
  BURNT_UMBER:  'hsl(20, 40%, 30%)',
  /* legacy aliases (ease migration) */
  SAFFRON:      'hsl(8, 78%, 48%)',
  EARTH:        'hsl(38, 45%, 88%)',
  SANDSTONE:    'hsl(25, 40%, 15%)',
  GOLD:         'hsl(43, 90%, 52%)',
  DIMMED:       'hsl(32, 30%, 55%)',
} as const;

/* ── Phase labels ── */
export const PHASES = [
  'The Departure',
  'The Wilderness',
  'The Search',
  'The War Path',
  'Lanka',
  'The Return',
] as const;

/* ── Route segments (ordered waypoints) ── */
export const ROUTE_SEGMENTS: [number, number][][] = [
  // 0: Ayodhya → Shringverpur
  [[26.80, 82.19], [25.39, 81.88]],
  // 1: Shringverpur → Prayagraj
  [[25.39, 81.88], [25.43, 81.85]],
  // 2: Prayagraj → Chitrakoot
  [[25.43, 81.85], [25.20, 80.83]],
  // 3: Chitrakoot → Atri Ashram
  [[25.20, 80.83], [25.15, 80.70]],
  // 4: Atri Ashram → Dandakaranya
  [[25.15, 80.70], [23.00, 80.00], [20.50, 79.00]],
  // 5: Dandakaranya → Agastya Ashram
  [[20.50, 79.00], [20.10, 76.50]],
  // 6: Agastya Ashram → Panchavati
  [[20.10, 76.50], [19.98, 73.79]],
  // 7: Panchavati → Lepakshi
  [[19.98, 73.79], [18.00, 76.50], [15.48, 77.61]],
  // 8: Lepakshi → Shabari / Pampa Sarovar
  [[15.48, 77.61], [15.35, 76.50]],
  // 9: Shabari → Kishkindha
  [[15.35, 76.50], [15.34, 76.46]],
  // 10: Kishkindha → Kodikkarai
  [[15.34, 76.46], [12.50, 78.00], [10.28, 79.86]],
  // 11: Kodikkarai → Rameshwaram
  [[10.28, 79.86], [9.29, 79.31]],
  // 12: Rameshwaram → Dhanushkodi
  [[9.29, 79.31], [9.17, 79.43]],
  // 13: Dhanushkodi → Ashok Vatika (Sita Eliya)
  [[9.17, 79.43], [8.50, 79.70], [6.97, 80.72]],
  // 14: Ashok Vatika → Ravana Ella
  [[6.97, 80.72], [6.86, 81.05]],
  // 15: Ravana Ella → Ussangoda
  [[6.86, 81.05], [6.10, 80.98]],
  // 16: Ussangoda → Lanka (war site — Sigiriya region)
  [[6.10, 80.98], [7.29, 80.63]],
  // 17: Lanka → Divurumpola
  [[7.29, 80.63], [6.96, 80.77]],
  // 18: Divurumpola → Return (Ayodhya by air)
  [[6.96, 80.77], [26.80, 82.19]],
];

export const FULL_ROUTE: [number, number][] = ROUTE_SEGMENTS.flat();

/* ── Zoom stages ── */
export const STAGES: RamayanaStage[] = [
  {
    id: 'ramayana-hero',
    center: [20.0, 79.0],
    zoom: 5,
    label: 'The Indian Subcontinent',
    phase: 'The Departure',
    year: '',
    routeUpTo: -1,
    markers: [],
    narrative: {
      title: 'The Route',
      body: 'A 2,500-kilometre journey from the northern plains to the southern sea. One prince, fourteen years, and a route that would become the most retold story in human history. Every stop on this route is a real place. Most of them still have temples.',
    },
  },
  {
    id: 'ayodhya',
    center: [26.80, 82.19],
    zoom: 8,
    label: 'Ayodhya — The Departure',
    phase: 'The Departure',
    year: 'Year 0',
    routeUpTo: -1,
    markers: [{ coords: [26.80, 82.19], label: 'Ayodhya', detail: 'Capital of Kosala' }],
    narrative: {
      title: 'Ayodhya',
      body: 'Rama, crown prince of Kosala, is exiled for fourteen years on the eve of his coronation. His father Dasharatha, bound by a promise to Queen Kaikeyi, cannot stop it. Rama leaves willingly — with Sita and Lakshmana — walking south into the forest. The city weeps. Dasharatha dies of grief within days.',
      accent: 'The prince who left a throne because his father had given his word.',
    },
    today: {
      name: 'Ram Mandir & Sarayu Ghats',
      detail: 'The Ram Janmabhoomi temple, consecrated in January 2024 after a decades-long legal battle, stands at what tradition holds as Rama\'s birthplace. The Sarayu River, where the city\'s ghats descend to the water, still flows past the old city walls.',
      coordinates: '26.80°N, 82.19°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Sarayu Ghats at Ayodhya',
      caption: 'The ghats of Ayodhya on the banks of the Sarayu',
    },
  },
  {
    id: 'shringverpur',
    center: [25.39, 81.88],
    zoom: 8,
    label: 'Shringverpur — The Crossing',
    phase: 'The Departure',
    year: 'Year 0',
    routeUpTo: 0,
    markers: [{ coords: [25.39, 81.88], label: 'Shringverpur', detail: 'The Ganga crossing' }],
    narrative: {
      title: 'The River Crossing',
      body: 'At the banks of the Ganga, the Nishada king Guha — a tribal chief, not a Brahmin, not a Kshatriya — offers his boat. He refuses payment. He asks only to wash Rama\'s feet before carrying them across. It is the epic\'s first lesson: devotion does not require caste. The boatman becomes a king in the story\'s memory.',
      accent: 'The first of many who would help without being asked.',
    },
    today: {
      name: 'Ancient Hydraulic Tank (ASI Site)',
      detail: 'The Archaeological Survey of India has identified remains of a sophisticated hydraulic water system at Shringverpur dating to the Kushan period (1st–3rd century CE). The site, on the northern bank of the Ganga near Prayagraj, preserves what may be the oldest known artificial water tank in the Gangetic plain.',
      coordinates: '25.39°N, 81.88°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'The Ganga at Shringverpur',
      caption: 'The crossing point on the Ganga where Guha ferried the exiles',
    },
  },
  {
    id: 'prayagraj',
    center: [25.43, 81.85],
    zoom: 8,
    label: 'Prayagraj — The Confluence',
    phase: 'The Departure',
    year: 'Year 0',
    routeUpTo: 1,
    markers: [{ coords: [25.43, 81.85], label: 'Prayagraj', detail: 'Bharadwaj\'s Ashram' }],
    narrative: {
      title: 'The Confluence',
      body: 'At the Sangam — where the Ganga, Yamuna, and mythical Saraswati meet — Rama visits the ashram of sage Bharadwaj. The sage hosts the exiles for a night and directs them south toward Chitrakoot. This is the first of many hermitages that will punctuate the route: a network of forest universities stretching across the subcontinent.',
    },
    today: {
      name: 'Triveni Sangam & Bharadwaj Ashram',
      detail: 'The Sangam remains one of Hinduism\'s holiest sites — millions gather here every twelve years for the Kumbh Mela. Northern Black Polished Ware (NBPW) pottery shards dating to the 7th century BCE have been found in excavations nearby, confirming habitation during the period the epic describes.',
      coordinates: '25.43°N, 81.85°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'The Triveni Sangam at Prayagraj',
      caption: 'The confluence of the Ganga, Yamuna, and mythical Saraswati',
    },
  },
  {
    id: 'chitrakoot',
    center: [25.20, 80.83],
    zoom: 8,
    label: 'Chitrakoot — The Forest Court',
    phase: 'The Departure',
    year: 'Year 1',
    routeUpTo: 2,
    markers: [{ coords: [25.20, 80.83], label: 'Chitrakoot', detail: 'Bharat Milap' }],
    narrative: {
      title: 'The Forest Court',
      body: 'Bharata arrives with the entire court of Ayodhya — army, elephants, ministers — to beg Rama to return and rule. Their father is dead. The throne is empty. Rama refuses. He will honour the exile to the letter. Bharata, devastated, carries Rama\'s sandals back to Ayodhya and places them on the throne. For fourteen years, Bharata governs in their name — never sitting on the seat himself.',
      accent: 'A kingdom ruled by a pair of sandals. A brother who governed but never ruled.',
    },
    today: {
      name: 'Ramghat & Kamadgiri Hill',
      detail: 'Chitrakoot remains a major pilgrimage site. Ramghat, on the Mandakini River, is where the Bharat Milap (the meeting of the brothers) is commemorated annually. Kamadgiri hill is circumambulated by devotees — the 5km parikrama path is lined with temples. The town sits at the UP-MP border in the Vindhya foothills.',
      coordinates: '25.20°N, 80.83°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Kamadgiri hill at Chitrakoot',
      caption: 'The sacred hill of Kamadgiri, circumambulated by pilgrims',
    },
  },
  {
    id: 'atri-ashram',
    center: [25.15, 80.70],
    zoom: 8,
    label: 'Atri Ashram — Anasuya\'s Blessing',
    phase: 'The Departure',
    year: 'Year 1',
    routeUpTo: 3,
    markers: [{ coords: [25.15, 80.70], label: 'Atri Ashram', detail: 'Sati Anasuya\'s gifts' }],
    narrative: {
      title: 'Anasuya\'s Blessing',
      body: 'Near Chitrakoot, Rama and Sita visit the ashram of the sage Atri and his wife Anasuya — one of the epic\'s great women. Anasuya gifts Sita celestial garments and cosmetics that will never fade. More importantly, she counsels Sita on the meaning of devotion — not as servitude, but as chosen loyalty. It is one of the Ramayana\'s quiet, powerful scenes between two women in the forest.',
    },
    today: {
      name: 'Sati Anasuya Temple & Mandakini Falls',
      detail: 'A small temple dedicated to Anasuya sits near a waterfall on the Mandakini River, about 16km from Chitrakoot. The surrounding forest — part of the Chitrakoot wildlife area — remains dense and relatively undisturbed. The falls are locally called Sati Anasuya Waterfall.',
      coordinates: '25.15°N, 80.70°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Mandakini waterfall near Atri Ashram',
      caption: 'The waterfall near Sati Anasuya\'s ashram',
    },
  },
  {
    id: 'dandakaranya',
    center: [20.50, 79.00],
    zoom: 7,
    label: 'Dandakaranya — The Deep Wilderness',
    phase: 'The Wilderness',
    year: 'Years 2–12',
    routeUpTo: 4,
    markers: [{ coords: [20.50, 79.00], label: 'Dandakaranya', detail: 'A decade in the deep forest' }],
    narrative: {
      title: 'The Wilderness Years',
      body: 'For ten years — the longest and least told stretch of the exile — Rama, Sita, and Lakshmana live among sages in the vast Dandakaranya forest. This is not a single clearing but a belt of wilderness stretching across central India, from the Vindhyas to the Deccan. They move between hermitages. They fight rakshasas who terrorise the sages. The forest is not empty; it is full of those who chose to leave the world. The exiles become protectors.',
    },
    today: {
      name: 'Bastar & Central Indian Tribal Belt',
      detail: 'The historical Dandakaranya corresponds roughly to the modern-day forests of Chhattisgarh, eastern Maharashtra, and northern Telangana — one of the largest contiguous forest belts in India. The region is home to Gond, Muria, and other Adivasi communities whose oral traditions contain their own Ramayana variants. The Dandakaranya Project (1950s–60s) resettled East Bengali refugees here.',
      coordinates: '20.50°N, 79.00°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Dense forest of central India',
      caption: 'The Dandakaranya — central India\'s ancient wilderness belt',
    },
  },
  {
    id: 'agastya-ashram',
    center: [20.10, 76.50],
    zoom: 8,
    label: 'Agastya Ashram — The Weapons',
    phase: 'The Wilderness',
    year: 'Year 12',
    routeUpTo: 5,
    markers: [{ coords: [20.10, 76.50], label: 'Agastya Ashram', detail: 'Divine weapons granted' }],
    narrative: {
      title: 'The Sage Who Crossed the Vindhyas',
      body: 'Sage Agastya — the legendary figure who is said to have carried Vedic culture from north to south India — gives Rama the Brahmastra and other divine weapons. This is not a casual gift. Agastya knows what is coming. The weapons will be needed against Ravana. The sage is arming a prince for a war that has not yet begun, against an enemy Rama has not yet met.',
      accent: 'The sage armed a prince for a war that hadn\'t started.',
    },
    today: {
      name: 'Agastya Ashram Archaeological Site',
      detail: 'Multiple sites across the Nashik-Aurangabad region claim association with Agastya. The most prominent is near the source of the Godavari River. Agastya\'s cultural significance extends far beyond the Ramayana — he is credited with bringing Sanskrit learning to South India and is a founding figure in Tamil Siddha medicine.',
      coordinates: '20.10°N, 76.50°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Ancient ashram ruins in western Deccan',
      caption: 'The Deccan plateau — where Agastya\'s ashram traditions survive',
    },
  },
  {
    id: 'panchavati',
    center: [19.98, 73.79],
    zoom: 8,
    label: 'Panchavati — The Abduction',
    phase: 'The Wilderness',
    year: 'Year 13',
    routeUpTo: 6,
    markers: [{ coords: [19.98, 73.79], label: 'Panchavati', detail: 'Sita abducted' }],
    narrative: {
      title: 'The Turning Point',
      body: 'At Panchavati — "the place of five banyan trees" — near the source of the Godavari, the story breaks. Shurpanakha, Ravana\'s sister, is humiliated. Ravana sends the golden deer as a lure. Lakshmana leaves Sita alone — against his judgment — because she demands it. Ravana, disguised as an ascetic, abducts Sita and carries her south across the sky. Thirteen years of wandering collapse into a single afternoon. The exile becomes a rescue mission. The wanderer becomes a warrior.',
      accent: 'Everything that follows flows from this moment.',
    },
    today: {
      name: 'Kalaram Temple, Sita Gufa & Tapovan',
      detail: 'Nashik\'s Panchavati quarter contains several Ramayana-associated sites: the black-stone Kalaram Temple (where Ambedkar staged a historic 1930 satyagraha for Dalit temple entry), Sita Gufa (a small cave where Sita is said to have meditated), and Tapovan on the Godavari bank. The Godavari\'s source at Trimbakeshwar is 30km away.',
      coordinates: '19.98°N, 73.79°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Godavari river at Panchavati, Nashik',
      caption: 'The Godavari at Panchavati — where the exile became a war',
    },
  },
  {
    id: 'lepakshi',
    center: [15.48, 77.61],
    zoom: 8,
    label: 'Lepakshi — The Fall of Jatayu',
    phase: 'The Search',
    year: 'Year 13',
    routeUpTo: 7,
    markers: [{ coords: [15.48, 77.61], label: 'Lepakshi', detail: 'Jatayu falls' }],
    narrative: {
      title: 'The Fall of Jatayu',
      body: 'The great vulture Jatayu — old friend of Rama\'s father — spots Ravana carrying Sita through the sky and attacks. An aged bird against a demon king in an aerial chariot. Jatayu fights until his wings are cut. He falls. When Rama finds him dying on the ground, Jatayu gasps out the direction Ravana flew — south. "Le, pakshi" — "Rise, bird" — Rama says, giving the place its name. Jatayu dies. Rama performs his last rites — as a son would for a father.',
      accent: '"Le, pakshi." Rise, bird.',
    },
    today: {
      name: 'Jatayu Earth Centre & Virabhadra Temple',
      detail: 'Lepakshi in Andhra Pradesh has the stunning 16th-century Virabhadra Temple with its famous hanging pillar and Veerabhadra frescoes — a Vijayanagara masterpiece. Kerala\'s Jatayu Earth Centre (Chadayamangalam) claims the alternative site, featuring a 200-foot Jatayu sculpture — the world\'s largest bird sculpture — atop a hill.',
      coordinates: '15.48°N, 77.61°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Virabhadra Temple at Lepakshi',
      caption: 'The 16th-century Virabhadra Temple at Lepakshi, Andhra Pradesh',
    },
  },
  {
    id: 'shabari',
    center: [15.35, 76.50],
    zoom: 8,
    label: 'Shabari — The Tasted Berries',
    phase: 'The Search',
    year: 'Year 13',
    routeUpTo: 8,
    markers: [{ coords: [15.35, 76.50], label: 'Pampa Sarovar', detail: 'Shabari\'s offering' }],
    narrative: {
      title: 'The Tasted Berries',
      body: 'At Pampa Sarovar, Rama meets Shabari — an old tribal woman who has waited years for his arrival, as her guru prophesied. She offers him berries. She has tasted each one first, to ensure only the sweet ones reach him. By orthodox rules, the fruit is polluted. Rama eats them all. This scene — a low-caste woman feeding a prince pre-tasted fruit — has become one of the most radical moments in Hindu devotional literature. It says: love is the only purity that matters.',
      accent: 'She tasted each berry first. He ate them all.',
    },
    today: {
      name: 'Pampa Sarovar & Shabari Temple',
      detail: 'Pampa Sarovar, near Hampi in Karnataka, is a small sacred lake associated with the Shabari episode. A Shabari temple stands nearby. The lake is significant in the Ramayana because it is here that Rama\'s grief for Sita is at its deepest — and it is here that his search begins to find allies.',
      coordinates: '15.35°N, 76.50°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Pampa Sarovar lake',
      caption: 'Pampa Sarovar — where Shabari offered the tasted berries',
    },
  },
  {
    id: 'kishkindha',
    center: [15.34, 76.46],
    zoom: 8,
    label: 'Kishkindha — The Alliance',
    phase: 'The Search',
    year: 'Year 13',
    routeUpTo: 9,
    markers: [{ coords: [15.34, 76.46], label: 'Kishkindha', detail: 'Hanuman & Sugriva' }],
    narrative: {
      title: 'The Alliance',
      body: 'In the boulder-strewn landscape near modern Hampi, Rama meets Hanuman — the epic\'s most beloved figure. Hanuman introduces him to Sugriva, the exiled vanara king. Rama helps Sugriva reclaim his throne; Sugriva pledges his army. Hanuman leaps across the sea to Lanka alone, finds Sita in the Ashok Vatika, shows her Rama\'s ring as proof, and sets Lanka\'s tail on fire before returning. The alliance transforms Rama from a wandering exile into a commander.',
    },
    today: {
      name: 'Anjanadri Hill, Sugriva\'s Cave & Hampi Ruins',
      detail: 'Hampi — the UNESCO World Heritage Site of the Vijayanagara Empire — is traditionally identified as Kishkindha. Anjanadri Hill, a short climb from the ruins, is believed to be Hanuman\'s birthplace. Sugriva\'s Cave is a natural rock formation near the Tungabhadra River. The landscape of massive granite boulders matches the Ramayana\'s description remarkably.',
      coordinates: '15.34°N, 76.46°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Boulder landscape of Hampi / Kishkindha',
      caption: 'The granite boulders of Hampi — the landscape of Kishkindha',
    },
  },
  {
    id: 'kodikkarai',
    center: [10.28, 79.86],
    zoom: 8,
    label: 'Kodikkarai — The March South',
    phase: 'The War Path',
    year: 'Year 14',
    routeUpTo: 10,
    markers: [{ coords: [10.28, 79.86], label: 'Kodikkarai', detail: 'Army reaches the coast' }],
    narrative: {
      title: 'The March South',
      body: 'Sugriva\'s army marches south through the Tamil country, following the eastern coast. At Kodikkarai — Point Calimere — they first sight the open sea. For a land army, the sea is the final barrier. Lanka is visible on clear days as a smudge on the southern horizon. The question now is not whether to fight, but how to cross.',
    },
    today: {
      name: 'Point Calimere Wildlife Sanctuary',
      detail: 'Kodikkarai (Point Calimere) is a wetland sanctuary on the Tamil Nadu coast where the Palk Strait begins to narrow. It hosts over 100,000 migratory flamingos annually. The area\'s salt marshes and tidal flats have been navigated by fishermen for millennia — the same fishermen whose boats still cross to Sri Lanka\'s northern shores.',
      coordinates: '10.28°N, 79.86°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Coastal wetlands at Kodikkarai',
      caption: 'Point Calimere — where the army first sighted the sea',
    },
  },
  {
    id: 'rameshwaram',
    center: [9.29, 79.31],
    zoom: 8,
    label: 'Rameshwaram — The Prayer',
    phase: 'The War Path',
    year: 'Year 14',
    routeUpTo: 11,
    markers: [{ coords: [9.29, 79.31], label: 'Rameshwaram', detail: 'Shiva Lingam & bridge' }],
    narrative: {
      title: 'The Prayer Before War',
      body: 'Before crossing to Lanka, Rama does something unexpected: he prays to Shiva. He establishes a Shiva Lingam on the shore — a Vishnu avatar worshipping Shiva. The theological implications reverberate through centuries of Hindu thought. Then Nala, the vanara engineer, begins building the bridge. Stones that should sink are made to float by writing Rama\'s name on them — or so the story goes. The army crosses.',
      accent: 'A Vishnu avatar who prayed to Shiva. Stones that floated because they bore a name.',
    },
    today: {
      name: 'Ramanathaswamy Temple',
      detail: 'The Ramanathaswamy Temple, one of the twelve Jyotirlingas, has the longest corridor of any Hindu temple in India (1,220m). Its 22 sacred wells (theerthams) are said to have been created by Rama. The temple was expanded significantly by the Setupati rulers (17th–18th century). Pilgrims still bathe in sequence at all 22 wells.',
      coordinates: '9.29°N, 79.31°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Ramanathaswamy Temple corridor',
      caption: 'The 1,220-metre corridor of Ramanathaswamy Temple',
    },
  },
  {
    id: 'dhanushkodi',
    center: [9.17, 79.43],
    zoom: 8,
    label: 'Dhanushkodi — The Bridge',
    phase: 'The War Path',
    year: 'Year 14',
    routeUpTo: 12,
    markers: [{ coords: [9.17, 79.43], label: 'Dhanushkodi', detail: 'Start of Adam\'s Bridge' }],
    narrative: {
      title: 'The Ghost Town at the Edge',
      body: 'Dhanushkodi sits at the tip of Pamban Island — the last point of India before the shallow strait. It is named for the moment Rama broke his bow-tip ("dhanus-kodi") to mark the bridge\'s starting point. The bridge stretches 48 kilometres across the Palk Strait — a chain of limestone shoals, sand banks, and coral reefs that satellite imagery shows connecting India to Sri Lanka almost exactly as the epic describes.',
      accent: '48 km of coral and sandstone. NASA sees it from space.',
    },
    today: {
      name: 'Dhanushkodi Ghost Town',
      detail: 'The town was destroyed by the 1964 Rameswaram cyclone that killed over 1,800 people. It was never rebuilt. Today it is a ghost town — roofless church walls, a half-buried railway station, and sand dunes covering what was once a busy port. The road to Dhanushkodi reopened in 2020. On clear days, Sri Lanka is visible across the strait.',
      coordinates: '9.17°N, 79.43°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Ruins at Dhanushkodi',
      caption: 'Dhanushkodi — the ghost town destroyed by the 1964 cyclone',
    },
  },
  {
    id: 'ashok-vatika',
    center: [6.97, 80.72],
    zoom: 8,
    label: 'Ashok Vatika — Sita\'s Captivity',
    phase: 'Lanka',
    year: 'Year 13–14',
    routeUpTo: 13,
    markers: [{ coords: [6.97, 80.72], label: 'Sita Eliya', detail: 'Ashok Vatika — Sita held captive' }],
    narrative: {
      title: 'The Garden of Captivity',
      body: 'Sita is held in the Ashok Vatika — Ravana\'s pleasure garden — for months. She refuses Ravana\'s advances absolutely. She will not eat his food. She sits beneath an Ashoka tree, holding a blade of grass between herself and Ravana whenever he approaches — a barrier of will, not of walls. When Hanuman finds her here, she almost doesn\'t believe him. He shows her Rama\'s signet ring. She gives him her hair ornament — the Chudamani — to carry back as proof.',
      accent: 'A blade of grass between herself and a demon king. That was enough.',
    },
    today: {
      name: 'Sita Amman Temple & Hakgala Gardens',
      detail: 'Sita Eliya, near Nuwara Eliya in Sri Lanka\'s hill country, has the small but deeply revered Sita Amman Temple. Nearby Hakgala Botanical Gardens is traditionally identified as the Ashok Vatika. Giant footprint impressions in rock near the temple are attributed to Hanuman. The site is maintained by both Hindu and Buddhist communities — a rarity.',
      coordinates: '6.97°N, 80.72°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Sita Amman Temple at Sita Eliya',
      caption: 'Sita Amman Temple — the traditional site of Ashok Vatika',
    },
  },
  {
    id: 'ravana-ella',
    center: [6.86, 81.05],
    zoom: 8,
    label: 'Ravana Ella — The King\'s Caves',
    phase: 'Lanka',
    year: 'Year 14',
    routeUpTo: 14,
    markers: [{ coords: [6.86, 81.05], label: 'Ravana Ella', detail: 'Ravana\'s caves and falls' }],
    narrative: {
      title: 'The Other Side of the Story',
      body: 'In Sri Lankan tradition, Ravana is not a villain. He is a learned king — a master of the veena, a devotee of Shiva, a scholar of the Vedas, an innovator who built flying machines and advanced irrigation. The caves near Ella and the falls that bear his name are part of a counter-narrative: what if Ravana was a great ruler defending his kingdom from invasion? Every war has two stories. The Ramayana is honest enough to let the other side be magnificent.',
    },
    today: {
      name: 'Ravana Falls & Cave Systems',
      detail: 'Ravana Ella Falls, near the town of Ella in Sri Lanka\'s Badulla District, drops 25m through lush jungle. The cave systems nearby — Ravana Ella Cave extends over 40m into the rock — are associated with Ravana\'s hiding places. Local Sinhalese Buddhist tradition honours Ravana as one of the great kings of Lanka, distinct from the Hindu telling.',
      coordinates: '6.86°N, 81.05°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Ravana Falls near Ella, Sri Lanka',
      caption: 'Ravana Ella Falls — named for Lanka\'s legendary king',
    },
  },
  {
    id: 'ussangoda',
    center: [6.10, 80.98],
    zoom: 8,
    label: 'Ussangoda — The Scorched Earth',
    phase: 'Lanka',
    year: 'Year 14',
    routeUpTo: 15,
    markers: [{ coords: [6.10, 80.98], label: 'Ussangoda', detail: 'Where Hanuman scorched Lanka' }],
    narrative: {
      title: 'The Scorched Earth',
      body: 'When Hanuman set his burning tail to Lanka, the fire — according to Sri Lankan tradition — left permanent scars. Ussangoda, on Sri Lanka\'s southern coast, is a barren plateau of red, oxidised soil where almost nothing grows. Geologists attribute the colour to serpentinite and laterite. Locals say it is the fire of Hanuman, still burning beneath the surface. The ground is warm to the touch in places.',
      accent: 'Red soil. Warm to the touch. The geologists have an explanation. The locals have a better one.',
    },
    today: {
      name: 'Ussangoda National Park',
      detail: 'Ussangoda National Park is one of Sri Lanka\'s smallest parks — a windswept coastal plateau where the reddish-brown earth contrasts sharply with the surrounding green. The soil contains high levels of nickel and chromium (serpentinite rock), which prevents most vegetation. Sea turtles nest on the adjacent beach. The site has no Buddhist or Hindu temple — only the land itself.',
      coordinates: '6.10°N, 80.98°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Red soil plateau of Ussangoda',
      caption: 'Ussangoda — the scorched plateau where nothing grows',
    },
  },
  {
    id: 'lanka-war',
    center: [7.29, 80.63],
    zoom: 7,
    label: 'Lanka — The War',
    phase: 'Lanka',
    year: 'Year 14',
    routeUpTo: 16,
    markers: [{ coords: [7.29, 80.63], label: 'Lanka', detail: 'The war with Ravana' }],
    narrative: {
      title: 'The War',
      body: 'The war lasts days, not years. It is not a siege but a sequence of single combats and mass charges. Indrajit, Ravana\'s son, nearly kills Lakshmana with the Shakti weapon. Hanuman flies to the Himalayas and brings back an entire mountain — Dronagiri — because he cannot identify the healing herb. Kumbhakarna, Ravana\'s giant brother, wakes from his six-month sleep and wades into battle like a force of nature. And finally, Rama faces Ravana. Ten heads. Twenty arms. A king who would not bend. Ravana falls. Rama weeps.',
      accent: 'He wept for the enemy he killed. That is the Ramayana.',
    },
    today: {
      name: 'Sigiriya & Rumassala',
      detail: 'Multiple Sri Lankan sites are associated with the war. Sigiriya\'s rock fortress is sometimes identified with Ravana\'s citadel. Rumassala hill in Galle — covered in medicinal plants found nowhere else in Sri Lanka — is said to be a fragment of the Dronagiri mountain that Hanuman dropped. The botanical anomaly is real: the hill hosts plants with no local genetic relatives.',
      coordinates: '7.29°N, 80.63°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Sigiriya rock fortress',
      caption: 'Sigiriya — one of the sites associated with Ravana\'s Lanka',
    },
  },
  {
    id: 'divurumpola',
    center: [6.96, 80.77],
    zoom: 8,
    label: 'Divurumpola — The Trial by Fire',
    phase: 'Lanka',
    year: 'Year 14',
    routeUpTo: 17,
    markers: [{ coords: [6.96, 80.77], label: 'Divurumpola', detail: 'Sita\'s Agni Pariksha' }],
    narrative: {
      title: 'The Trial by Fire',
      body: 'After the war, Rama asks Sita to prove her purity through Agni Pariksha — a trial by fire. She walks into the flames. She emerges unscathed. The fire god Agni himself testifies to her virtue. This scene is the Ramayana\'s most debated moment. Defenders say Rama was testing public perception, not Sita. Critics say no test should have been needed. The epic does not resolve the tension. It presents it. Twenty-five centuries of commentary have not settled the argument.',
      accent: 'She walked into the fire. The fire refused to burn her. The argument has not ended.',
    },
    today: {
      name: 'Divurumpola Buddhist Temple',
      detail: 'Divurumpola, near Nuwara Eliya in Sri Lanka, has a Buddhist temple that marks the site of Sita\'s fire ordeal. The name "Divurumpola" derives from "oath" (divura) in Sinhala. It is one of the rare sites where a Hindu narrative is commemorated within a Buddhist sacred space — reflecting Sri Lanka\'s layered religious geography.',
      coordinates: '6.96°N, 80.77°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Divurumpola temple site',
      caption: 'Divurumpola — where tradition places the trial by fire',
    },
  },
  {
    id: 'ramayana-return',
    center: [20.0, 79.0],
    zoom: 5,
    label: 'The Return to Ayodhya',
    phase: 'The Return',
    year: 'Year 14',
    routeUpTo: 18,
    markers: [{ coords: [26.80, 82.19], label: 'Ayodhya', detail: 'The homecoming — Diwali' }],
    narrative: {
      title: 'The Return',
      body: 'Rama returns to Ayodhya by air — in the Pushpaka Vimana, Ravana\'s flying chariot, now his by right of conquest. As the Vimana crosses the subcontinent, Rama points out each place to Sita — every forest, every river crossing, every hermitage where they stayed. The entire exile replayed in reverse from the sky. The city of Ayodhya lights lamps to welcome him home. Rows of earthen diyas line every rooftop, every window, every street. This is the origin of Diwali — the festival of lights.',
      accent: 'A billion lamps, lit every year, for a homecoming that may never have happened. That is what a story can do.',
    },
    today: {
      name: 'Diwali — The Festival of Lights',
      detail: 'Diwali is celebrated by over a billion people across India, Nepal, Sri Lanka, and the global diaspora. In 2023, Ayodhya set a Guinness World Record by lighting over 2.2 million diyas along the Sarayu River ghats. The festival\'s identification with Rama\'s return is strongest in North India; in South India, it commemorates Krishna\'s defeat of Narakasura.',
      coordinates: '26.80°N, 82.19°E',
    },
    image: {
      src: '/placeholder.svg',
      alt: 'Diwali lamps on the Sarayu',
      caption: 'Millions of diyas on the Sarayu — Ayodhya\'s Diwali',
    },
  },
];

export const TOTAL_DISTANCE_KM = 2500;
