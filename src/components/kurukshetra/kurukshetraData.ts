/* ── Kurukshetra War — data spine ── */

export const KURUKSHETRA_SECTIONS = [
  { id: 'kuru-hero', label: 'The Bindu', year: '' },
  { id: 'kuru-gita', label: 'The Still Point', year: '' },
  { id: 'kuru-logistics', label: 'The Bronze Tablet', year: '' },
  { id: 'kuru-phase1', label: 'Bhishma (Days 1–10)', year: 'Phase I' },
  { id: 'kuru-phase2', label: 'Drona (Days 11–15)', year: 'Phase II' },
  { id: 'kuru-phase3', label: 'Karna (Days 16–17)', year: 'Phase III' },
  { id: 'kuru-phase4', label: 'Shalya & End (Day 18)', year: 'Phase IV' },
  { id: 'kuru-astras', label: 'Celestial Arsenal', year: '' },
  { id: 'kuru-dharma', label: 'Broken Rules', year: '' },
  { id: 'kuru-historicity', label: 'Excavation Ledger', year: '' },
  { id: 'kuru-art', label: 'Relief Gallery', year: '' },
  { id: 'kuru-epilogue', label: 'Ash & Memory', year: '' },
] as const;

export type KurukshetraSectionId = (typeof KURUKSHETRA_SECTIONS)[number]['id'];

/* ── Phase mapping for degradation system ── */
export type WarPhase = 1 | 2 | 3 | 4;

export const SECTION_PHASE: Record<string, WarPhase> = {
  'kuru-hero': 1,
  'kuru-gita': 1,
  'kuru-logistics': 1,
  'kuru-phase1': 1,
  'kuru-phase2': 2,
  'kuru-phase3': 3,
  'kuru-phase4': 4,
  'kuru-astras': 3,
  'kuru-dharma': 3,
  'kuru-historicity': 1,
  'kuru-art': 1,
  'kuru-epilogue': 4,
};

/* ── Day journal data ── */
export interface DayEntry {
  day: number;
  senapati: string;
  vyuhaKaurava: string;
  vyuhaPandava: string;
  casualties: string[];
  narrative: string;
  phase: WarPhase;
}

export const DAY_JOURNAL: DayEntry[] = [
  { day: 1, senapati: 'Bhishma', vyuhaKaurava: 'Sarvatomukhi', vyuhaPandava: 'Vajra', phase: 1,
    casualties: ['Uttara (P)', 'Sweta (P)'],
    narrative: 'The conches sounded at dawn. Bhishma deployed the all-facing Sarvatomukhi formation; the Pandavas answered with the Vajra, the thunderbolt. By dusk, Virata\'s son Uttara lay dead — the war\'s first prince to fall. The Pandavas suffered heavy losses, shaken by Bhishma\'s ferocity.' },
  { day: 2, senapati: 'Bhishma', vyuhaKaurava: 'Garuda', vyuhaPandava: 'Krauncha', phase: 1,
    casualties: [],
    narrative: 'The Pandavas regrouped into the Krauncha, the heron formation — a narrow spear aimed at Bhishma\'s Garuda eagle. Arjuna engaged Bhishma directly; the duel was fierce but inconclusive, the two bound by love and duty.' },
  { day: 3, senapati: 'Bhishma', vyuhaKaurava: 'Garuda', vyuhaPandava: 'Ardha Chandra', phase: 1,
    casualties: [],
    narrative: 'The Pandavas deployed the Ardha Chandra — the crescent moon — designed to envelop from the flanks. Bhima and the giant Ghatotkacha attacked Duryodhana directly; the Kaurava prince fainted and was pulled from the field by his charioteer.' },
  { day: 4, senapati: 'Bhishma', vyuhaKaurava: 'Mandala', vyuhaPandava: 'Sringataka', phase: 1,
    casualties: ['8 Kaurava brothers (K)'],
    narrative: 'Bhima began fulfilling his terrible vow. Eight of Duryodhana\'s brothers fell to his mace. The Mandala — the circular fortress — could not hold against Bhima\'s wrath, and the Pandava horn formation pierced deep into the Kaurava center.' },
  { day: 5, senapati: 'Bhishma', vyuhaKaurava: 'Makara', vyuhaPandava: 'Shyen', phase: 1,
    casualties: [],
    narrative: 'Bhishma deployed the Makara, the crocodile — wide-jawed and patient. The Pandavas answered with the Shyen, the hawk, striking from above. Intense skirmishes yielded heavy casualties on both sides, but no decisive blow.' },
  { day: 6, senapati: 'Bhishma', vyuhaKaurava: 'Krauncha', vyuhaPandava: 'Makara', phase: 1,
    casualties: [],
    narrative: 'The formations mirrored and inverted. Both sides traded staggering casualties. Drona fought Drupada; Bhima clashed with Duryodhana. The field was drenched.' },
  { day: 7, senapati: 'Bhishma', vyuhaKaurava: 'Mandala', vyuhaPandava: 'Vajra', phase: 1,
    casualties: ['Sankha (P)'],
    narrative: 'Drona killed Sankha, another son of Virata. The Pandava alliance strained as allied kings began to grasp the true cost of this war. Bhishma seemed unstoppable.' },
  { day: 8, senapati: 'Bhishma', vyuhaKaurava: 'Kurma', vyuhaPandava: 'Trishula', phase: 1,
    casualties: ['Iravan (P)', '5 Shakuni brothers (K)'],
    narrative: 'The Kurma (tortoise) held firm against the Pandava trident. Bhima killed 17 more sons of Dhritarashtra. Arjuna\'s son Iravan was slain by the Rakshasa Alambusha — the first of the next generation to die.' },
  { day: 9, senapati: 'Bhishma', vyuhaKaurava: 'Sarvatobhadra', vyuhaPandava: 'Nakshatramandala', phase: 1,
    casualties: [],
    narrative: 'Realizing Bhishma would bleed the Pandava army white, Krishna nearly seized his Sudarshana Chakra, breaking his own vow of non-combat. Arjuna fell at his feet and stopped him. It was the moment the Pandavas understood: Bhishma must fall, or they would.' },
  { day: 10, senapati: 'Bhishma', vyuhaKaurava: 'Asura', vyuhaPandava: 'Deva', phase: 1,
    casualties: ['Bhishma (K – fallen)'],
    narrative: 'The fall of Bhishma. Using Shikhandi — whom Bhishma had sworn never to strike — as a living shield, Arjuna pierced the grandsire with a storm of arrows until the patriarch fell upon a bed of shafts, his body not touching the ground. The first commander was down. The first phase of the war was over.' },
  { day: 11, senapati: 'Drona', vyuhaKaurava: 'Shakata', vyuhaPandava: 'Krauncha', phase: 2,
    casualties: [],
    narrative: 'Drona assumed command with cold efficiency. Karna entered the battlefield for the first time. Drona\'s objective was surgical: capture Yudhishthira alive to force a surrender. Arjuna became the shield that stood between Drona and his king.' },
  { day: 12, senapati: 'Drona', vyuhaKaurava: 'Garuda', vyuhaPandava: 'Ardha Chandra', phase: 2,
    casualties: ['Bhagadatta (K)'],
    narrative: 'Arjuna defeated Bhagadatta, the ancient King of Pragjyotisha, who rode the legendary elephant Supratika and unleashed the Vaishnavastra — a weapon so potent that only Krishna could neutralize it, receiving the missile upon his own chest where it transformed into a garland.' },
  { day: 13, senapati: 'Drona', vyuhaKaurava: 'Chakra', vyuhaPandava: '—', phase: 2,
    casualties: ['Abhimanyu (P)'],
    narrative: 'The day the war broke. Drona deployed the Chakra Vyuha — the spinning wheel formation, an impenetrable labyrinth of rotating concentric rings. Only Arjuna knew how to breach and exit it, but he was lured away. Abhimanyu, his sixteen-year-old son, entered alone — knowing how to pierce the formation but not how to escape. Inside, six great warriors — Drona, Karna, Kripa, Ashwatthama, Kritavarma, and Shakuni — surrounded the boy and killed him in flagrant violation of every rule of war. The yantra cracked.' },
  { day: 14, senapati: 'Drona', vyuhaKaurava: 'Chakrashakatam', vyuhaPandava: 'Khadga Sarp', phase: 2,
    casualties: ['Jayadratha (K)', 'Ghatotkacha (P)'],
    narrative: 'Arjuna swore to kill Jayadratha — who had blocked the gate of the Chakra Vyuha — before sunset, or immolate himself. The battle raged into the night. Krishna used a solar illusion to lure Jayadratha into the open. In the darkness, Ghatotkacha rampaged through the Kaurava ranks until Karna was forced to spend his one-use Vasavi Shakti — the infallible spear of Indra — to bring him down. The weapon that should have killed Arjuna was gone.' },
  { day: 15, senapati: 'Drona', vyuhaKaurava: 'Padma', vyuhaPandava: 'Vajra', phase: 2,
    casualties: ['Drona (K)', 'Virata (P)', 'Drupada (P)'],
    narrative: 'The fall of Drona. The Pandavas spread a half-truth: "Ashwatthama is dead" — referring to an elephant, not Drona\'s son. Yudhishthira, who had never lied, murmured the caveat too softly to be heard. Drona, shattered by grief, laid down his weapons and sat in meditation on the battlefield. Dhrishtadyumna beheaded him. Two great kings — Virata and Drupada — also fell. The war had consumed its teachers.' },
  { day: 16, senapati: 'Karna', vyuhaKaurava: 'Surya', vyuhaPandava: 'Mahisha', phase: 3,
    casualties: [],
    narrative: 'Karna took command and fought like the sun itself — brilliant and consuming. He defeated the Pandava brothers Nakula, Sahadeva, and Yudhishthira in combat but spared each one, honoring a secret promise to their mother Kunti that she would always have five sons. The irony was total: the greatest Kaurava warrior was a Pandava by blood.' },
  { day: 17, senapati: 'Karna', vyuhaKaurava: 'Surya', vyuhaPandava: 'Mahisha', phase: 3,
    casualties: ['Karna (K)', 'Duhshasana (K)'],
    narrative: 'Bhima seized Duhshasana — who had dragged Draupadi by her hair in the court — and tore open his chest, drinking his blood to fulfil a vow sworn thirteen years earlier. Then came the final duel. Arjuna and Karna — the two greatest archers the world had known — met at last. When Karna\'s chariot wheel sank into the earth and he dismounted to free it, Krishna told Arjuna: strike now. Remember Abhimanyu. Remember every rule they broke. The arrow flew. Karna fell.' },
  { day: 18, senapati: 'Shalya', vyuhaKaurava: 'Sarvatobhadra', vyuhaPandava: 'Krauncha', phase: 4,
    casualties: ['Shalya (K)', 'Shakuni (K)', 'Duryodhana (K – fallen)'],
    narrative: 'The collapse. Shalya, King of Madra, commanded for half a day before Yudhishthira killed him — the first and only kill by the Dharma King. Sahadeva cut down Shakuni, the architect of the dice game. By afternoon, the Kaurava army disintegrated. Duryodhana fled to a lake to hide beneath the waters. The Pandavas found him, taunted him out, and Bhima challenged him to a mace duel. He struck Duryodhana\'s thigh — a forbidden blow in mace combat — but justified by every violation the Kauravas had committed. Duryodhana lay dying on the field. The war was over. The Kali Yuga had begun.' },
];

/* ── Vyuha formation geometry types ── */
export interface VyuhaShape {
  name: string;
  sanskrit: string;
  meaning: string;
  paths: string[]; // SVG path data
}

export const VYUHA_SHAPES: Record<string, VyuhaShape> = {
  Vajra: { name: 'Vajra', sanskrit: 'वज्र', meaning: 'Thunderbolt',
    paths: [
      'M50,10 L90,50 L50,90 L10,50 Z', // diamond
      'M50,25 L75,50 L50,75 L25,50 Z', // inner diamond
      'M50,40 L60,50 L50,60 L40,50 Z', // core
    ] },
  Krauncha: { name: 'Krauncha', sanskrit: 'क्रौञ्च', meaning: 'Heron',
    paths: [
      'M50,10 L70,40 L90,90 L50,70 L10,90 L30,40 Z', // wedge/V
      'M50,25 L62,45 L50,60 L38,45 Z',
    ] },
  'Ardha Chandra': { name: 'Ardha Chandra', sanskrit: 'अर्धचन्द्र', meaning: 'Crescent Moon',
    paths: [
      'M10,80 Q50,10 90,80', // arc
      'M20,70 Q50,25 80,70',
    ] },
  Chakra: { name: 'Chakra', sanskrit: 'चक्र', meaning: 'Wheel',
    paths: [
      // concentric circles approximated as polygons
      'M50,10 L73,20 L90,43 L90,57 L73,80 L50,90 L27,80 L10,57 L10,43 L27,20 Z',
      'M50,25 L65,30 L75,45 L75,55 L65,70 L50,75 L35,70 L25,55 L25,45 L35,30 Z',
      'M50,40 L57,42 L62,48 L62,52 L57,58 L50,60 L43,58 L38,52 L38,48 L43,42 Z',
    ] },
  Garuda: { name: 'Garuda', sanskrit: 'गरुड', meaning: 'Eagle',
    paths: [
      'M50,15 L85,45 L95,85 L50,65 L5,85 L15,45 Z', // eagle V
      'M50,30 L70,48 L50,58 L30,48 Z',
    ] },
  Padma: { name: 'Padma', sanskrit: 'पद्म', meaning: 'Lotus',
    paths: [
      // 8 petals
      'M50,10 Q60,30 50,40 Q40,30 50,10',
      'M78,22 Q65,38 55,40 Q62,28 78,22',
      'M90,50 Q70,55 60,50 Q70,45 90,50',
      'M78,78 Q65,62 55,60 Q62,72 78,78',
      'M50,90 Q40,70 50,60 Q60,70 50,90',
      'M22,78 Q35,62 45,60 Q38,72 22,78',
      'M10,50 Q30,45 40,50 Q30,55 10,50',
      'M22,22 Q35,38 45,40 Q38,28 22,22',
    ] },
  Sarvatobhadra: { name: 'Sarvatobhadra', sanskrit: 'सर्वतोभद्र', meaning: 'Omnidirectional',
    paths: [
      'M20,20 L80,20 L80,80 L20,80 Z',
      'M35,35 L65,35 L65,65 L35,65 Z',
      'M45,45 L55,45 L55,55 L45,55 Z',
      'M50,20 L50,80', 'M20,50 L80,50', // cross lines
    ] },
  Makara: { name: 'Makara', sanskrit: 'मकर', meaning: 'Crocodile',
    paths: [
      'M10,50 L30,30 L50,45 L70,30 L90,50', // upper jaw
      'M10,50 L30,65 L50,55 L70,65 L90,50', // lower jaw
      'M50,45 L50,55', // spine
      'M30,30 Q40,20 50,25 Q60,20 70,30', // crest
    ] },
  Shyen: { name: 'Shyen', sanskrit: 'श्येन', meaning: 'Hawk',
    paths: [
      'M50,15 L50,75', // spine
      'M50,30 L10,55 L20,50 L50,40', // left wing
      'M50,30 L90,55 L80,50 L50,40', // right wing
      'M40,75 L50,90 L60,75', // tail
    ] },
  Mandala: { name: 'Mandala', sanskrit: 'मण्डल', meaning: 'Circular Fortress',
    paths: [
      'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10', // outer circle
      'M50,25 A25,25 0 1,1 50,75 A25,25 0 1,1 50,25', // inner circle
      'M50,10 L50,90', 'M10,50 L90,50', // cross
      'M21,21 L79,79', 'M79,21 L21,79', // diagonals
    ] },
  Sringataka: { name: 'Sringataka', sanskrit: 'शृङ्गाटक', meaning: 'Horn',
    paths: [
      'M50,10 L80,80 L20,80 Z', // main triangle
      'M50,30 L68,72 L32,72 Z', // inner triangle
      'M50,10 L50,80', // center line
    ] },
  Kurma: { name: 'Kurma', sanskrit: 'कूर्म', meaning: 'Tortoise',
    paths: [
      'M50,20 Q80,30 85,50 Q80,70 50,80 Q20,70 15,50 Q20,30 50,20', // shell
      'M50,30 Q70,38 72,50 Q70,62 50,70 Q30,62 28,50 Q30,38 50,30', // inner shell
      'M30,50 L20,45', 'M70,50 L80,45', // front legs
      'M35,68 L25,75', 'M65,68 L75,75', // rear legs
    ] },
  Trishula: { name: 'Trishula', sanskrit: 'त्रिशूल', meaning: 'Trident',
    paths: [
      'M50,90 L50,30', // shaft
      'M50,30 L50,10', // center prong
      'M50,30 L30,15', // left prong
      'M50,30 L70,15', // right prong
      'M35,35 L65,35', // crossbar
    ] },
};

/* ── Astra data ── */
export interface AstraInfo {
  name: string;
  sanskrit: string;
  deity: string;
  effect: string;
  petalCount: number; // for mandala burst
  color: string; // CSS variable
}

export const ASTRAS: AstraInfo[] = [
  { name: 'Brahmastra', sanskrit: 'ब्रह्मास्त्र', deity: 'Brahma', effect: 'Supreme weapon; destroys entire armies', petalCount: 12, color: 'var(--kuru-gold)' },
  { name: 'Agneyastra', sanskrit: 'आग्नेयास्त्र', deity: 'Agni', effect: 'Unleashes inextinguishable fire', petalCount: 8, color: 'var(--kuru-red)' },
  { name: 'Varunastra', sanskrit: 'वरुणास्त्र', deity: 'Varuna', effect: 'Torrents of water; counters Agneyastra', petalCount: 6, color: 'var(--kuru-indigo)' },
  { name: 'Indrastra', sanskrit: 'ऐन्द्रास्त्र', deity: 'Indra', effect: 'Produces thousands of arrow duplicates', petalCount: 10, color: 'var(--kuru-bronze)' },
  { name: 'Vasavi Shakti', sanskrit: 'वासवी शक्ति', deity: 'Indra', effect: 'Infallible single-use divine spear', petalCount: 7, color: 'var(--kuru-gold)' },
  { name: 'Narayanastra', sanskrit: 'नारायणास्त्र', deity: 'Vishnu', effect: 'Massive missile of fire; surrender is the only defense', petalCount: 16, color: 'var(--kuru-gold)' },
  { name: 'Pashupatastra', sanskrit: 'पाशुपतास्त्र', deity: 'Shiva', effect: 'Most destructive weapon; capable of destroying all creation', petalCount: 24, color: 'var(--kuru-indigo)' },
  { name: 'Prasvapastra', sanskrit: 'प्रस्वापास्त्र', deity: 'Vasus', effect: 'Induces sleep in the enemy ranks', petalCount: 5, color: 'var(--kuru-ash)' },
];

/* ── Dharma rules that break ── */
export interface DharmaRule {
  rule: string;
  violation: string;
  day: number;
  violator: string;
}

export const DHARMA_RULES: DharmaRule[] = [
  { rule: 'Equals must fight equals — chariot versus chariot, foot versus foot', violation: 'Six warriors surrounded Abhimanyu, a boy on foot, attacking from all sides', day: 13, violator: 'Drona, Karna, Kripa, et al.' },
  { rule: 'No warrior may be struck while unarmed or dismounted', violation: 'Karna was killed while dismounted, trying to free his chariot wheel', day: 17, violator: 'Arjuna (Krishna\'s counsel)' },
  { rule: 'Fighting must cease at sunset', violation: 'Battle continued through the night on Day 14', day: 14, violator: 'Both sides' },
  { rule: 'No deception may be used to gain advantage', violation: '"Ashwatthama is dead" — a deliberate half-truth to disarm Drona', day: 15, violator: 'Yudhishthira, Krishna' },
  { rule: 'Non-combatants and those who surrender must be spared', violation: 'Ashwatthama massacred the sleeping Pandava camp, killing women and children', day: 18, violator: 'Ashwatthama' },
  { rule: 'Blows below the waist are forbidden in mace combat', violation: 'Bhima shattered Duryodhana\'s thigh with his mace', day: 18, violator: 'Bhima (Krishna\'s signal)' },
];

/* ── Historicity dating theories ── */
export interface DatingTheory {
  researcher: string;
  date: string;
  evidence: string;
}

export const DATING_THEORIES: DatingTheory[] = [
  { researcher: 'B.B. Lal', date: '900–1000 BCE', evidence: 'PGW pottery; flood evidence at Hastinapur' },
  { researcher: 'S.R. Rao', date: '1900–1700 BCE', evidence: 'Submerged Dwarka excavations; marine archaeology' },
  { researcher: 'B.N. Narahari Achar', date: '3067 BCE', evidence: 'Planetary simulations (Saturn/Jupiter at Vishaka)' },
  { researcher: 'S. Balakrishna', date: '2559 BCE', evidence: '13-day eclipse pairs analysis' },
  { researcher: 'Nilesh Oak', date: '5561 BCE', evidence: 'Arundhati-Vasistha star observation' },
  { researcher: 'Traditional Puranic', date: '3138–3102 BCE', evidence: 'Kali Yuga commencement; royal genealogies' },
];

/* ── Day tier classification ── */
export type DayTier = 'pivotal' | 'notable' | 'condensed';

export const DAY_TIERS: Record<number, DayTier> = {
  1: 'notable', 2: 'condensed', 3: 'condensed', 4: 'condensed', 5: 'condensed',
  6: 'notable', 7: 'condensed', 8: 'condensed', 9: 'notable',
  10: 'pivotal', 11: 'condensed', 12: 'condensed',
  13: 'pivotal', 14: 'pivotal', 15: 'notable',
  16: 'condensed', 17: 'pivotal', 18: 'pivotal',
};

/* ── Phase definitions ── */
export interface PhaseDef {
  id: WarPhase;
  name: string;
  days: [number, number];
  commander: string;
  devanagari: string;
  subtitle: string;
}

export const PHASE_DEFS: PhaseDef[] = [
  { id: 1, name: 'Golden Order', days: [1, 5], commander: 'Bhishma', devanagari: 'प्रथम', subtitle: 'The war begins with honor intact' },
  { id: 2, name: 'Fracture', days: [6, 10], commander: 'Bhishma', devanagari: 'द्वितीय', subtitle: 'The grandsire falls; the cracks appear' },
  { id: 3, name: 'Blood & Fire', days: [11, 14], commander: 'Drona', devanagari: 'तृतीय', subtitle: 'Every rule broken, every vow tested' },
  { id: 4, name: 'Ash', days: [15, 18], commander: 'Drona → Karna → Shalya', devanagari: 'चतुर्थ', subtitle: 'The age ends in ash and silence' },
];

/* ── Akshauhini breakdown ── */
export const AKSHAUHINI = {
  chariots: 21870,
  elephants: 21870,
  cavalry: 65610,
  infantry: 109350,
  total: 218700,
  pandava: 7,
  kaurava: 11,
};

/* ── Alliance data ── */
export interface Alliance {
  kingdom: string;
  faction: 'Pandava' | 'Kaurava';
  leader: string;
}

export const ALLIANCES: Alliance[] = [
  { kingdom: 'Panchala', faction: 'Pandava', leader: 'Drupada, Dhrishtadyumna, Shikhandi' },
  { kingdom: 'Matsya', faction: 'Pandava', leader: 'Virata, Uttara' },
  { kingdom: 'Vrishni (Yadava)', faction: 'Pandava', leader: 'Krishna (guide), Satyaki' },
  { kingdom: 'Gandhara', faction: 'Kaurava', leader: 'Shakuni' },
  { kingdom: 'Anga', faction: 'Kaurava', leader: 'Karna' },
  { kingdom: 'Madra', faction: 'Kaurava', leader: 'Shalya' },
  { kingdom: 'Pragjyotisha', faction: 'Kaurava', leader: 'Bhagadatta' },
  { kingdom: 'Sindhu', faction: 'Kaurava', leader: 'Jayadratha' },
  { kingdom: 'Kamboja', faction: 'Kaurava', leader: 'Sudakshina' },
];
