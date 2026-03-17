/* ── Data for the Berlin Conference / Scramble for Africa essay ────── */

/* ── Palette: Ink, Vellum, and Red Wax ─────────────────────────────── */
export const BL = {
  VELLUM:      'hsl(42, 30%, 92%)',
  INK:         'hsl(220, 20%, 12%)',
  RED_WAX:     'hsl(0, 65%, 42%)',
  BRASS:       'hsl(38, 55%, 48%)',
  TERRITORY:   'hsl(35, 40%, 72%)',
  PRUSSIAN:    'hsl(210, 45%, 25%)',
  CONGO_GREEN: 'hsl(140, 30%, 28%)',
  GRID_BLUE:   'hsl(210, 35%, 60%)',
  MUTED:       'hsl(220, 12%, 55%)',
  PAPER_DARK:  'hsl(42, 25%, 85%)',
} as const;

/* ── Colonial Power Colors ──────────────────────────────────────────── */
export const POWER_COLORS: Record<string, string> = {
  britain:  'hsl(340, 55%, 65%)',   // British pink
  france:   'hsl(220, 60%, 55%)',   // French blue
  germany:  'hsl(30, 50%, 45%)',    // German brown
  belgium:  'hsl(140, 40%, 40%)',   // Belgian green
  portugal: 'hsl(25, 70%, 55%)',    // Portuguese orange
  italy:    'hsl(50, 60%, 55%)',    // Italian yellow
  spain:    'hsl(280, 35%, 50%)',   // Spanish purple
};

/* ── Conference Delegations ─────────────────────────────────────────── */
export interface Delegation {
  country: string;
  delegates: string[];
  seat: number; // position around table (0-13)
}

export const DELEGATIONS: Delegation[] = [
  { country: 'Germany', delegates: ['Otto von Bismarck (Chancellor)', 'Paul von Hatzfeldt', 'Clemens Busch', 'Heinrich von Kusserow'], seat: 0 },
  { country: 'Austria-Hungary', delegates: ['Imre Széchényi von Sárvár-Felsővidék'], seat: 1 },
  { country: 'Belgium', delegates: ['Gabriel August van der Straten-Ponthoz', 'Auguste Lambermont'], seat: 2 },
  { country: 'Denmark', delegates: ['Emil Vind'], seat: 3 },
  { country: 'Spain', delegates: ['Francisco Merry y Colom, Count of Benomar'], seat: 4 },
  { country: 'United States', delegates: ['John A. Kasson', 'Henry S. Sanford', 'Henry Morton Stanley'], seat: 5 },
  { country: 'France', delegates: ['Alphonse de Courcel'], seat: 6 },
  { country: 'United Kingdom', delegates: ['Sir Edward Baldwin Malet'], seat: 7 },
  { country: 'Italy', delegates: ['Edoardo de Launay'], seat: 8 },
  { country: 'Netherlands', delegates: ['Philip van der Hoeven'], seat: 9 },
  { country: 'Portugal', delegates: ['Marquess of Penafiel', 'Antônio de Serpa Pimentel'], seat: 10 },
  { country: 'Russia', delegates: ['Pyotr Kapnist'], seat: 11 },
  { country: 'Sweden–Norway', delegates: ['Gillis Bildt'], seat: 12 },
  { country: 'Ottoman Empire', delegates: ['Mehmed Said Pasha'], seat: 13 },
];

/* ── General Act Articles ───────────────────────────────────────────── */
export interface TreatyArticleData {
  number: number;
  title: string;
  text: string;
  annotation: string;
}

export const GENERAL_ACT_ARTICLES: TreatyArticleData[] = [
  {
    number: 1,
    title: 'Free Trade Zone',
    text: 'Establishment of a Free Trade Zone in the Congo Basin and its outlets.',
    annotation: 'Created a "free trade" zone that in practice meant unregulated European extraction.',
  },
  {
    number: 6,
    title: 'Protection of Natives',
    text: 'Obligation to "watch over the preservation of the native tribes" and improve their moral and material well-being.',
    annotation: 'A clause honored almost exclusively in the breach — the "civilizing mission" as legal fiction.',
  },
  {
    number: 9,
    title: 'Slave Trade Prohibition',
    text: 'Formal prohibition of the slave trade within the recognized territories.',
    annotation: 'Used as moral cover while forced labor systems replaced chattel slavery.',
  },
  {
    number: 34,
    title: 'Notification of Occupation',
    text: 'Requirement to notify other powers of any new coastal occupation or protectorate.',
    annotation: 'The trigger for the race: claim it or lose it.',
  },
  {
    number: 35,
    title: 'Effective Occupation',
    text: 'The Signatory Powers recognize the obligation to insure the establishment of authority in the regions occupied by them on the coasts of the African Continent sufficient to protect existing rights.',
    annotation: 'The most consequential clause — paper claims were no longer enough. You had to build forts, station troops, and impose administration.',
  },
];

/* ── Pre-Colonial Polities ──────────────────────────────────────────── */
export interface PreColonialPolity {
  name: string;
  population: string;
  governance: string;
  trade: string;
  region: string;
  lat: number;
  lng: number;
}

export const PRE_COLONIAL_POLITIES: PreColonialPolity[] = [
  { name: 'Sokoto Caliphate', population: '10–20 million', governance: 'Islamic Caliphate / Shura Council', trade: 'Textiles, Leather, Grain', region: 'West Africa', lat: 13.06, lng: 5.24 },
  { name: 'Ashanti Empire', population: '3–4 million', governance: 'Centralized Monarchy / National Assembly', trade: 'Gold, Kola Nuts', region: 'West Africa', lat: 6.69, lng: -1.62 },
  { name: 'Zulu Kingdom', population: '250,000–500,000', governance: 'Militarized Monarchy / Age-regiments', trade: 'Cattle, Land expansion', region: 'Southern Africa', lat: -28.53, lng: 30.90 },
  { name: 'Kingdom of Buganda', population: '1–2 million', governance: 'Centralized Monarchy / Professional Bureaucracy', trade: 'Ivory, Agriculture', region: 'East Africa', lat: 0.31, lng: 32.58 },
  { name: 'Ethiopian Empire', population: '5–7 million', governance: 'Feudal Imperial System', trade: 'Coffee, Gold, Grains', region: 'East Africa', lat: 9.03, lng: 38.75 },
  { name: 'Kingdom of Benin', population: '500,000–1 million', governance: 'Sacral Monarchy / Craft Guilds', trade: 'Ivory, Bronze, Palm Oil', region: 'West Africa', lat: 6.34, lng: 5.62 },
];

/* ── Partition Timeline Events ──────────────────────────────────────── */
export interface PartitionEvent {
  year: number;
  power: string;
  territory: string;
  description: string;
  lat: number;
  lng: number;
  radius: number; // km for L.circle
}

export const PARTITION_TIMELINE: PartitionEvent[] = [
  { year: 1830, power: 'france', territory: 'Algeria', description: 'France invades Algeria, beginning formal colonization of North Africa.', lat: 36.75, lng: 3.06, radius: 350 },
  { year: 1881, power: 'france', territory: 'Tunisia', description: 'France establishes a protectorate over Tunisia.', lat: 36.81, lng: 10.18, radius: 150 },
  { year: 1882, power: 'britain', territory: 'Egypt', description: 'Britain occupies Egypt to secure the Suez Canal.', lat: 30.04, lng: 31.24, radius: 350 },
  { year: 1884, power: 'germany', territory: 'South-West Africa', description: 'Germany declares a protectorate over Namibia.', lat: -22.57, lng: 17.08, radius: 400 },
  { year: 1884, power: 'germany', territory: 'Togoland & Kamerun', description: 'Germany claims Togoland and Kamerun in rapid succession.', lat: 7.37, lng: 3.60, radius: 250 },
  { year: 1885, power: 'belgium', territory: 'Congo Free State', description: 'Leopold II receives personal control of the Congo Basin.', lat: -4.32, lng: 15.32, radius: 500 },
  { year: 1885, power: 'germany', territory: 'German East Africa', description: 'Germany establishes control over Tanganyika.', lat: -6.80, lng: 39.28, radius: 350 },
  { year: 1885, power: 'italy', territory: 'Eritrea', description: 'Italy establishes the colony of Eritrea on the Red Sea coast.', lat: 15.34, lng: 38.93, radius: 150 },
  { year: 1890, power: 'britain', territory: 'Zanzibar & Uganda', description: 'Heligoland-Zanzibar Treaty: Britain gains Zanzibar, Germany gets Heligoland.', lat: -6.16, lng: 39.19, radius: 200 },
  { year: 1891, power: 'britain', territory: 'Nyasaland', description: 'Britain declares a protectorate over modern Malawi.', lat: -13.97, lng: 33.79, radius: 200 },
  { year: 1893, power: 'france', territory: 'French West Africa', description: 'France consolidates its West African territories into a federation.', lat: 14.69, lng: -17.44, radius: 500 },
  { year: 1895, power: 'france', territory: 'Madagascar', description: 'France conquers the Merina Kingdom.', lat: -18.88, lng: 47.51, radius: 300 },
  { year: 1896, power: 'italy', territory: 'Ethiopia (failed)', description: 'Italy defeated at Battle of Adwa — Ethiopia remains independent.', lat: 14.17, lng: 38.90, radius: 150 },
  { year: 1898, power: 'britain', territory: 'Sudan', description: 'Battle of Omdurman — Britain conquers Sudan as Anglo-Egyptian Condominium.', lat: 15.60, lng: 32.53, radius: 500 },
  { year: 1899, power: 'britain', territory: 'South Africa', description: 'Second Boer War begins — Britain seeks control of Transvaal gold.', lat: -26.20, lng: 28.04, radius: 300 },
  { year: 1905, power: 'germany', territory: 'Tanganyika', description: 'Maji Maji Rebellion crushed — 300,000 Africans die.', lat: -8.00, lng: 34.00, radius: 300 },
  { year: 1908, power: 'belgium', territory: 'Belgian Congo', description: 'Belgium annexes Congo from Leopold after international outcry.', lat: -2.50, lng: 23.50, radius: 500 },
  { year: 1911, power: 'italy', territory: 'Libya', description: 'Italy invades Ottoman Libya.', lat: 32.90, lng: 13.18, radius: 350 },
  { year: 1912, power: 'france', territory: 'Morocco', description: 'France establishes protectorate over Morocco after Agadir Crisis.', lat: 33.97, lng: -6.85, radius: 300 },
];

/* ── Ethnic Partition Statistics ─────────────────────────────────────── */
export interface SplitEthnicGroup {
  name: string;
  stateCount: number;
  states: string[];
  lat: number;
  lng: number;
}

export const SPLIT_ETHNIC_GROUPS: SplitEthnicGroup[] = [
  { name: 'Maasai', stateCount: 2, states: ['Kenya', 'Tanzania'], lat: -2.5, lng: 36.8 },
  { name: 'Somali', stateCount: 5, states: ['Somalia', 'Ethiopia', 'Kenya', 'Djibouti', 'Eritrea'], lat: 5.0, lng: 46.0 },
  { name: 'Ewe', stateCount: 2, states: ['Ghana', 'Togo'], lat: 6.6, lng: 1.0 },
  { name: 'Bakongo', stateCount: 3, states: ['DRC', 'Republic of Congo', 'Angola'], lat: -5.5, lng: 14.5 },
  { name: 'Tuareg', stateCount: 5, states: ['Mali', 'Niger', 'Algeria', 'Libya', 'Burkina Faso'], lat: 20.0, lng: 5.0 },
  { name: 'Hausa', stateCount: 2, states: ['Nigeria', 'Niger'], lat: 12.0, lng: 8.5 },
  { name: 'Yoruba', stateCount: 2, states: ['Nigeria', 'Benin'], lat: 7.5, lng: 3.9 },
  { name: 'Mandinka', stateCount: 6, states: ['Senegal', 'Gambia', 'Guinea-Bissau', 'Guinea', 'Mali', 'Ivory Coast'], lat: 12.5, lng: -12.0 },
  { name: 'Lunda', stateCount: 3, states: ['DRC', 'Angola', 'Zambia'], lat: -10.0, lng: 25.0 },
  { name: 'Chewa', stateCount: 3, states: ['Malawi', 'Mozambique', 'Zambia'], lat: -14.0, lng: 34.0 },
];

/* ── Border Topology ────────────────────────────────────────────────── */
export const BORDER_STATS = {
  geometric: 44,
  natural: 37,
  cultural: 19,
};

/* ── Modern Displacement Data ───────────────────────────────────────── */
export interface DisplacementData {
  country: string;
  idps: string;
  refugees: string;
  colonialMechanism: string;
  consequence: string;
  date: string;
}

export const DISPLACEMENT_DATA: DisplacementData[] = [
  {
    country: 'Sudan',
    idps: '11.6 million',
    refugees: '4.0 million',
    colonialMechanism: 'British "Southern Policy" (1930) — North and South treated as separate entities, South frozen in underdevelopment.',
    consequence: 'Two civil wars (1955–1972, 1983–2005), South Sudan secession (2011), ongoing Darfur crisis.',
    date: 'Dec 2024',
  },
  {
    country: 'Somalia',
    idps: '3.5 million',
    refugees: '900,000',
    colonialMechanism: 'Somali people split across five colonial jurisdictions (British, Italian, French, Ethiopian, Kenyan).',
    consequence: 'Pan-Somali irredentism, Ogaden War (1977), state collapse (1991), Al-Shabaab insurgency.',
    date: 'Mid-2024',
  },
  {
    country: 'South Sudan',
    idps: '2.0 million',
    refugees: '2.3 million',
    colonialMechanism: 'Closed Districts Ordinance (1922) prohibited Northern entry to the South.',
    consequence: 'Independence (2011) followed immediately by civil war (2013), ethnic militias.',
    date: 'Mid-2024',
  },
  {
    country: 'Ethiopia',
    idps: '3.3 million',
    refugees: '1.1 million',
    colonialMechanism: 'Treaty of Wichale (1889) split the Tigrayan people across the Italian-Ethiopian border.',
    consequence: '30-year Eritrean independence war, 1998–2000 border war, 2020–2022 Tigray conflict.',
    date: 'Dec 2024',
  },
  {
    country: 'DRC',
    idps: '7.0 million+',
    refugees: '1.0 million+',
    colonialMechanism: 'Leopold II\'s Congo Free State — extractive labor system for rubber and ivory.',
    consequence: 'Congo Wars (1996–2003, 5.4M dead), ongoing conflict over coltan, cobalt, gold.',
    date: '2024',
  },
];

/* ── Resistance Leaders ─────────────────────────────────────────────── */
export interface ResistanceLeader {
  name: string;
  polity: string;
  years: string;
  method: string;
  outcome: string;
}

export const RESISTANCE_LEADERS: ResistanceLeader[] = [
  { name: 'Samori Ture', polity: 'Wassoulou Empire', years: '1882–1898', method: 'Professional army of 35,000, scorched-earth tactics', outcome: 'Captured, died in exile in Gabon (1900)' },
  { name: 'Menelik II', polity: 'Ethiopian Empire', years: '1889–1913', method: 'Diplomatic arms deals, military modernization', outcome: 'Defeated Italy at Battle of Adwa (1896) — only African victory' },
  { name: 'Nana Olomu', polity: 'Itsekiri', years: '1884–1894', method: 'Trade monopoly resistance', outcome: 'Captured, exiled to Gold Coast and Sierra Leone' },
  { name: 'Lobengula', polity: 'Matabele Kingdom', years: '1888–1894', method: 'Diplomacy, then war', outcome: 'Defeated by British Maxim guns (1893)' },
];

/* ── Extraction Data ────────────────────────────────────────────────── */
export interface ExtractionEntry {
  territory: string;
  power: string;
  method: string;
  toll: string;
  period: string;
}

export const EXTRACTION_DATA: ExtractionEntry[] = [
  { territory: 'Congo Free State', power: 'Belgium (Leopold II)', method: 'Forced rubber collection, hand-cutting, hostage-taking', toll: '~10 million deaths (estimated)', period: '1885–1908' },
  { territory: 'German South-West Africa', power: 'Germany', method: 'Extermination order, concentration camps, forced labor', toll: '65,000 Herero (80%) + 10,000 Nama (50%)', period: '1904–1908' },
  { territory: 'Boer War camps', power: 'Britain', method: 'Concentration camps for civilians', toll: '14,000–20,000 Black Africans', period: '1899–1902' },
  { territory: 'French West/Central Africa', power: 'France', method: 'Prestations (forced labor corvée)', toll: 'Widespread famine, unknown toll', period: '1880s–1940s' },
];

/* ── Key Quotes ─────────────────────────────────────────────────────── */
export interface HistoricalQuote {
  text: string;
  speaker: string;
  context: string;
  year: string;
}

export const KEY_QUOTES: HistoricalQuote[] = [
  {
    text: 'Your map of Africa is really quite nice. But my map of Africa lies in Europe. Here is Russia, and here is France, and we\'re in the middle — that\'s my map of Africa.',
    speaker: 'Otto von Bismarck',
    context: 'To an explorer presenting a map of African territories',
    year: '~1884',
  },
  {
    text: 'We have been engaged in drawing lines upon maps where no white man\'s foot has ever trod; we have been giving away mountains and rivers and lakes to each other, only hindered by the small impediment that we never knew exactly where the mountains and rivers and lakes were.',
    speaker: 'Lord Salisbury',
    context: 'Reflecting on the diplomatic partition of Africa',
    year: '1890',
  },
  {
    text: 'I do not want to risk losing a fine chance to secure for ourselves a slice of this magnificent African cake.',
    speaker: 'King Leopold II',
    context: 'Private letter to his London envoy',
    year: '1877',
  },
];
