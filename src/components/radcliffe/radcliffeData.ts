// ─── Radcliffe Line Essay Data ───

export const TIMELINE_EVENTS = [
  { day: 1, date: 'Jul 8', label: 'Radcliffe arrives in Delhi', type: 'milestone' as const },
  { day: 3, date: 'Jul 10', label: 'Briefed by Mountbatten', type: 'admin' as const },
  { day: 6, date: 'Jul 13', label: 'Reviews 1941 Census data', type: 'admin' as const },
  { day: 8, date: 'Jul 16', label: 'Bengal hearings begin (Calcutta)', type: 'hearing' as const },
  { day: 10, date: 'Jul 18', label: 'Deadline: memoranda from parties', type: 'milestone' as const },
  { day: 13, date: 'Jul 21', label: 'Punjab hearings begin (Lahore)', type: 'hearing' as const },
  { day: 16, date: 'Jul 24', label: 'Bengal hearings conclude', type: 'hearing' as const },
  { day: 20, date: 'Jul 28', label: 'Retreats to Simla to draft', type: 'admin' as const },
  { day: 23, date: 'Jul 31', label: 'Punjab hearings conclude', type: 'hearing' as const },
  { day: 26, date: 'Aug 3', label: 'Draft boundaries take shape', type: 'admin' as const },
  { day: 30, date: 'Aug 7', label: 'Ferozepore draft sent to Jenkins', type: 'milestone' as const },
  { day: 33, date: 'Aug 10', label: 'Bikaner lobbying; "eliminate salient"', type: 'milestone' as const },
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

export const BENGAL_DECISIONS = [
  { area: 'Calcutta', detail: 'Hindu-majority city awarded to India; economic capital of all Bengal', type: 'india' as const },
  { area: 'Murshidabad', detail: '70% Muslim district awarded to India to preserve Ganges access', type: 'india' as const },
  { area: 'Khulna', detail: '51% Hindu district awarded to Pakistan as compensation', type: 'pakistan' as const },
  { area: 'Chittagong Hill Tracts', detail: '97% non-Muslim awarded to Pakistan; dependent on Chittagong port', type: 'pakistan' as const },
  { area: 'Sylhet', detail: '56.56% voted for Pakistan; Karimganj sub-division detached to India', type: 'split' as const },
];
