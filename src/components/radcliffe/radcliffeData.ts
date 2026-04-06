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

export const BENGAL_DECISIONS = [
  { area: 'Calcutta', detail: 'Hindu-majority city awarded to India; economic capital of all Bengal', type: 'india' as const },
  { area: 'Murshidabad', detail: '70% Muslim district awarded to India to preserve Ganges access', type: 'india' as const },
  { area: 'Khulna', detail: '51% Hindu district awarded to Pakistan as compensation', type: 'pakistan' as const },
  { area: 'Chittagong Hill Tracts', detail: '97% non-Muslim awarded to Pakistan; dependent on Chittagong port', type: 'pakistan' as const },
  { area: 'Sylhet', detail: '56.56% voted for Pakistan; Karimganj sub-division detached to India', type: 'split' as const },
];
