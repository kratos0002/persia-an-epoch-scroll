// ─── Radcliffe Line Essay Data ───

export const TIMELINE_EVENTS = [
  { day: 1, date: 'Jul 8', label: 'Radcliffe arrives in Delhi', type: 'milestone' as const },
  { day: 3, date: 'Jul 10', label: 'Briefed by Mountbatten', type: 'admin' as const },
  { day: 6, date: 'Jul 13', label: 'Reviews 1941 Census data', type: 'admin' as const, detail: 'The 1941 Census was six years old, conducted under wartime conditions that compromised accuracy. The 1943 Bengal famine had killed 2–3 million and caused massive displacement, rendering the figures largely obsolete. No aerial surveys existed. Maps from contesting parties were contradictory, "creatively" drawn to highlight their own claims.' },
  { day: 8, date: 'Jul 16', label: 'Bengal hearings begin (Calcutta)', type: 'hearing' as const, detail: 'Radcliffe did not attend hearings in person — not in Calcutta, not in Lahore. Verbatim transcripts were flown daily by air to his quarters. He made all decisions from written submissions, never visiting the territories he was dividing.' },
  { day: 10, date: 'Jul 18', label: 'Deadline: memoranda from parties', type: 'milestone' as const },
  { day: 13, date: 'Jul 21', label: 'Punjab hearings begin (Lahore)', type: 'hearing' as const },
  { day: 16, date: 'Jul 24', label: 'Bengal hearings conclude', type: 'hearing' as const },
  { day: 20, date: 'Jul 28', label: 'Retreats to Simla to draft', type: 'admin' as const, detail: 'The intense Indian heat was debilitating. Radcliffe retreated to the cooler hill station of Simla to draft his awards, working entirely from transcripts, census tables, and maps — a desk-based partition of a subcontinent he had never seen.' },
  { day: 23, date: 'Jul 31', label: 'Punjab hearings conclude', type: 'hearing' as const },
  { day: 26, date: 'Aug 3', label: 'Draft boundaries take shape', type: 'admin' as const },
  { day: 30, date: 'Aug 7', label: 'Ferozepore draft sent to Jenkins', type: 'milestone' as const, detail: 'George Abell, Mountbatten\'s Private Secretary, sent a sketch map to Governor Jenkins indicating the Ferozepore salient would go to Pakistan. This draft would be reversed in the final award.' },
  { day: 33, date: 'Aug 10', label: 'Bikaner lobbying; "eliminate salient"', type: 'milestone' as const, detail: 'The Maharaja of Bikaner warned Mountbatten that if the Ferozepore headworks were given to Pakistan, his state might be forced to join Pakistan for survival. Jenkins received the message to "eliminate salient" — a late change moving Ferozepore from Pakistan to India.' },
  { day: 35, date: 'Aug 12', label: 'Bengal Award submitted', type: 'award' as const },
  { day: 36, date: 'Aug 13', label: 'Punjab Award submitted', type: 'award' as const },
];

export const COMMISSION_MEMBERS = {
  punjab: {
    congress: [
      { name: 'Justice Mehr Chand Mahajan', role: 'Congress nominee' },
      { name: 'Justice Teja Singh', role: 'Congress nominee' },
    ],
    league: [
      { name: 'Justice Din Muhammad', role: 'Muslim League nominee' },
      { name: 'Justice Muhammad Munir', role: 'Muslim League nominee' },
    ],
  },
  bengal: {
    congress: [
      { name: 'Justice Bijan Kumar Mukherjee', role: 'Congress nominee' },
      { name: 'Justice C. C. Biswas', role: 'Congress nominee' },
    ],
    league: [
      { name: 'Justice Abu Saleh Mohamed Akram', role: 'Muslim League nominee' },
      { name: 'Justice S. A. Rahman', role: 'Muslim League nominee' },
    ],
  },
};

export const GURDASPUR_TEHSILS = [
  { name: 'Pathankot', majority: 'Non-Muslim', allocation: 'India' },
  { name: 'Gurdaspur', majority: 'Muslim (Marginal)', allocation: 'India' },
  { name: 'Batala', majority: 'Muslim (Marginal)', allocation: 'India' },
  { name: 'Shakargarh', majority: 'Muslim', allocation: 'Pakistan' },
];

export const DISPLACEMENT_DATA = [
  { category: 'Total Displaced', low: '10,000,000', high: '18,000,000' },
  { category: 'Death Toll', low: '200,000', high: '2,000,000' },
  { category: 'Punjab Displaced', low: '7,000,000', high: '8,000,000' },
  { category: 'Bengal Displaced', low: '3,000,000', high: '5,000,000' },
];

export const REFUGEE_NAMES = [
  'Amrit Kaur', 'Ghulam Mustafa', 'Prabha Devi', 'Abdul Rashid', 'Savitri Bai',
  'Mohammad Iqbal', 'Lakshmi Narayan', 'Fatima Begum', 'Harbans Singh', 'Naseem Akhtar',
  'Kamla Devi', 'Syed Ahmed', 'Rukmini Bai', 'Khurshid Anwar', 'Shakuntala',
  'Bashir Ahmad', 'Parvati Devi', 'Rafiq Ahmad', 'Sushila Bai', 'Hamid Khan',
  'Radha Rani', 'Yusuf Ali', 'Janaki Bai', 'Noor Mohammad', 'Meera Devi',
  'Akhtar Hussain', 'Kamini Devi', 'Asghar Ali', 'Leela Bai', 'Mazhar Abbas',
  'Shanti Devi', 'Liaquat Ali', 'Padma Bai', 'Saleem Raza', 'Sita Rani',
  'Zaheer Uddin', 'Uma Devi', 'Habib Rahman', 'Usha Rani', 'Qamar Jahan',
  'Vimla Devi', 'Waheed Ahmed', 'Manorama', 'Tariq Mahmood', 'Ganga Devi',
  'Nasir Khan', 'Kamala Rani', 'Irfan Ahmed', 'Sarojini', 'Majid Khan',
];

export const ENCLAVE_DETAILS = {
  total: 162,
  indianInBangladesh: 111,
  bangladeshInIndia: 51,
  counterEnclaves: 28,
  counterCounterEnclaves: 1, // Dahala Khagrabari
  dahagramAngarpota: {
    population: 20000,
    areaKm2: 18.68,
    corridorName: 'Tin Bigha Corridor',
    corridorDimensions: '178m × 85m',
    leaseYear: 1992,
    fullAccessYear: 2011,
  },
  landBoundaryAgreement: {
    year: 2015,
    exchangedEnclaves: 162,
    peopleAffected: 52000,
  },
};

export const SIR_CREEK_DATA = {
  lengthKm: 96,
  location: 'Rann of Kutch, Gujarat–Sindh border',
  indiaPosition: 'Mid-channel (thalweg principle, standard in international law)',
  pakistanPosition: 'Eastern bank (per 1914 Sindh government resolution)',
  disputedEezKm2: 30000,
  failedNegotiations: [
    { year: 1969, outcome: 'Rann of Kutch tribunal — did not address Sir Creek' },
    { year: 1989, outcome: 'Joint survey begins, no resolution' },
    { year: 2007, outcome: 'Pakistan proposes tribunal, India declines' },
    { year: 2012, outcome: 'Latest round — stalled, no progress since' },
  ],
};

export const BAGGE_AWARD = {
  year: 1950,
  adjudicator: 'Justice Algot Bagge (Swedish)',
};

export const BERUBARI_UNION = {
  areaKm2: 8.76,
  agreementYear: 1958,
  amendmentNumber: '9th',
  amendmentYear: 1960,
};

export const GURDASPUR_KASHMIR = {
  tehsils: [
    { name: 'Pathankot', muslimPct: 38.0, allocation: 'India' as const },
    { name: 'Gurdaspur', muslimPct: 51.14, allocation: 'India' as const },
    { name: 'Batala', muslimPct: 55.06, allocation: 'India' as const },
    { name: 'Shakargarh', muslimPct: 77.0, allocation: 'Pakistan' as const },
  ],
};

export const PERSPECTIVES_EXPANDED = [
  {
    id: 'indian',
    color: 'radcliffe-saffron',
    label: 'Indian',
    summary: 'Tragic but inevitable.',
    expanded: 'Indian historiography frames Partition as the price of independence — a British failure of administration rather than a fundamental error of principle. The focus falls on the violence of the transfer period, Mountbatten\'s acceleration of the timetable, and the tragedy of refugee displacement. Radcliffe is viewed as a well-meaning amateur handed an impossible task. The Gurdaspur award is seen as correctly accounting for irrigation and road infrastructure.',
  },
  {
    id: 'pakistani',
    color: 'radcliffe-green',
    label: 'Pakistani',
    summary: 'A conspiracy to cripple Pakistan at birth.',
    expanded: 'Pakistani historiography sees the Radcliffe Award as systematically biased against Pakistan. The Ferozepore reversal, the Gurdaspur award opening India\'s road to Kashmir, and the Chittagong Hill Tracts anomaly are cited as evidence of a Congress-Mountbatten conspiracy. Radcliffe\'s destruction of his papers is viewed not as personal anguish but as evidence disposal.',
  },
  {
    id: 'bangladeshi',
    color: 'radcliffe-teal',
    label: 'Bangladeshi',
    summary: 'A line through a single people.',
    expanded: 'Bangladeshi historiography emphasizes that the Radcliffe Line cut through a single linguistic and cultural nation — Bengali-speaking people divided not by their own choice but by a religious criterion imposed from Delhi and London. The enclave absurdities, the Chittagong Hill Tracts paradox, and the arbitrary Sylhet referendum all underscore a partition designed for Punjab\'s logic but imposed on Bengal\'s reality. The 1971 war is seen as the inevitable correction.',
  },
];

// ─── Memorial Places ───
// Named sites of partition — a curatorial selection of places the Radcliffe
// Line passed through or disturbed. Organized by region so the grid can be
// read as a small atlas rather than an alphabetical list. Each place carries
// a one-line note pointing to what happened there; the editorial framing in
// the NamedSection component makes clear this is not an enumeration.
//
// Sources: commonly cited partition scholarship (Butalia, Khan, Pandey,
// Chatterji, Guha) and the essay's own body copy. Verified against the
// locations already referenced in AftermathSection, LivingBorderSection,
// VoidSection, and the Punjab/Bengal sections.

export type MemorialPlace = {
  name: string;
  region: 'Punjab' | 'Bengal' | 'Sindh' | 'Kashmir' | 'Assam' | 'Delhi';
  note: string;
};

export const MEMORIAL_PLACES: MemorialPlace[] = [
  // ── Punjab ──
  {
    name: 'Thoha Khalsa',
    region: 'Punjab',
    note: 'Ninety Sikh women drowned themselves in the village well rather than face abduction. March 1947.',
  },
  {
    name: 'Lahore',
    region: 'Punjab',
    note: 'Two-thirds Muslim, yet Hindus and Sikhs owned eighty percent of its factories. They left in weeks.',
  },
  {
    name: 'Amritsar',
    region: 'Punjab',
    note: 'The city of the Golden Temple, twenty-five miles from Lahore. The line passed between them.',
  },
  {
    name: 'Gurdaspur',
    region: 'Punjab',
    note: 'Three tehsils with slim Muslim majorities awarded to India. The road to Kashmir ran through them.',
  },
  {
    name: 'Ferozepore',
    region: 'Punjab',
    note: 'The draft map gave it to Pakistan. The final award reversed that. Eight days changed its country.',
  },
  {
    name: 'Rawalpindi',
    region: 'Punjab',
    note: 'Sikh villages attacked before Partition was announced. The killing was already organized.',
  },
  {
    name: 'Sheikhupura',
    region: 'Punjab',
    note: 'Among the first mass killings after the Radcliffe Line was published. August 1947.',
  },
  {
    name: 'Malerkotla',
    region: 'Punjab',
    note: 'The exception. The only Punjabi princely state that did not burn, because one Nawab refused to let it.',
  },
  {
    name: 'Wagah',
    region: 'Punjab',
    note: 'A railway stop on the Grand Trunk Road that became a border crossing overnight.',
  },
  {
    name: 'Lahore Station',
    region: 'Punjab',
    note: 'Where the ghost trains arrived. Every passenger dead. The compartments drenched in blood.',
  },
  // ── Bengal ──
  {
    name: 'Calcutta',
    region: 'Bengal',
    note: 'Hindu-majority city awarded to India; economic capital of a Bengal that no longer existed.',
  },
  {
    name: 'Noakhali',
    region: 'Bengal',
    note: 'October 1946. The riots that Gandhi walked to. A rehearsal the Commission should have studied.',
  },
  {
    name: 'Murshidabad',
    region: 'Bengal',
    note: 'Seventy percent Muslim, awarded to India to keep the Ganges flowing into Calcutta.',
  },
  {
    name: 'Khulna',
    region: 'Bengal',
    note: 'Fifty-one percent Hindu, awarded to Pakistan as compensation for Murshidabad.',
  },
  {
    name: 'Nadia',
    region: 'Bengal',
    note: 'Split from Jessore by the line. Districts that had shared a census became two countries.',
  },
  {
    name: 'Malda',
    region: 'Bengal',
    note: 'Split from Dinajpur the same way. A family of districts unmade in a single paragraph.',
  },
  {
    name: 'Berubari',
    region: 'Bengal',
    note: 'Radcliffe\'s map placed it in India. His written description placed it in Pakistan. It took a constitutional amendment to decide.',
  },
  {
    name: 'Chittagong Hill Tracts',
    region: 'Bengal',
    note: 'Ninety-seven percent non-Muslim, awarded to Pakistan. The Chakma people learned their country by radio, two days late.',
  },
  {
    name: 'Dahagram–Angarpota',
    region: 'Bengal',
    note: 'The largest enclave. Bangladeshis marooned inside India for forty-five years until a corridor was leased.',
  },
  {
    name: 'Dahala Khagrabari',
    region: 'Bengal',
    note: 'India, inside Bangladesh, inside India, inside Bangladesh. The world\'s only third-order enclave. Dissolved 2015.',
  },
  // ── Sindh ──
  {
    name: 'Karachi',
    region: 'Sindh',
    note: 'Hindu merchants who had built the city\'s commerce left within weeks of the flag change.',
  },
  {
    name: 'Hyderabad, Sindh',
    region: 'Sindh',
    note: 'A city whose Hindu population had lived there for a thousand years. Most did not return.',
  },
  {
    name: 'Sir Creek',
    region: 'Sindh',
    note: 'A 96-kilometer tidal estuary Radcliffe did not demarcate at all. Still disputed.',
  },
  // ── Delhi ──
  {
    name: 'Old Delhi',
    region: 'Delhi',
    note: 'The Muslim neighbourhoods that emptied when the refugees from the Punjab arrived. Many did not fill again.',
  },
  {
    name: 'Purana Qila',
    region: 'Delhi',
    note: 'A Mughal fort that became a refugee camp. At its peak, it held 150,000 people waiting for a train.',
  },
  // ── Kashmir ──
  {
    name: 'Gurdaspur Corridor',
    region: 'Kashmir',
    note: 'Not a place, but an opening. Without these three tehsils, India had no road into Kashmir. October 1947 proved it mattered.',
  },
  // ── Assam ──
  {
    name: 'Sylhet',
    region: 'Assam',
    note: 'Referendum, July 1947. 56.56% voted for Pakistan. A district left Assam the way a chapter leaves a book.',
  },
  {
    name: 'Karimganj',
    region: 'Assam',
    note: 'Detached from Sylhet by the Bagge Award three years later. A second surgery to correct the first.',
  },
];

export const BENGAL_DECISIONS = [
  { area: 'Calcutta', detail: 'Hindu-majority city awarded to India; economic capital of all Bengal', type: 'india' as const },
  { area: 'Murshidabad', detail: '70% Muslim district awarded to India to preserve Ganges access', type: 'india' as const },
  { area: 'Khulna', detail: '51% Hindu district awarded to Pakistan as compensation', type: 'pakistan' as const },
  { area: 'Chittagong Hill Tracts', detail: '97% non-Muslim awarded to Pakistan; dependent on Chittagong port', type: 'pakistan' as const },
  { area: 'Sylhet', detail: '56.56% voted for Pakistan; Karimganj sub-division detached to India', type: 'split' as const },
];
