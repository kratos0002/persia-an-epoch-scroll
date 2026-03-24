export const OPIUM_SECTIONS = [
  { id: 'opium-hero', label: 'The Deficit' },
  { id: 'opium-silver-drain', label: 'Silver Drain' },
  { id: 'opium-commutation', label: 'Commutation Act' },
  { id: 'opium-factories', label: 'Opium Factories' },
  { id: 'opium-routes', label: 'Routes & Smuggling' },
  { id: 'opium-reversal', label: 'The Reversal' },
  { id: 'opium-lin-zexu', label: 'Lin Zexu' },
  { id: 'opium-treaty', label: 'Treaty of Nanking' },
  { id: 'opium-epilogue', label: 'Epilogue' },
] as const;

export type OpiumSectionId = (typeof OPIUM_SECTIONS)[number]['id'];

/* ── Silver flow data ── */
export const SILVER_FLOW_DATA = [
  { period: '1550–1640', tons: 40000, carrier: 'Spanish Empire', driver: 'Early Ming/Qing silverization' },
  { period: '1700–1750', tons: null, carrier: 'British EIC / Dutch VOC', driver: 'Tea/Silk demand emergence' },
  { period: '1785–1810', tons: null, carrier: 'British EIC / US Free Traders', driver: 'Post-Commutation Act surge' },
  { period: '1821–1830', tons: null, carrier: 'British EIC', driver: 'Peak legal tea trade', value: '£19,000,000' },
] as const;

/* ── Tea/opium trade stats ── */
export const TRADE_TIMELINE = [
  { year: 1760, tea: 2_000_000, opium: 500, silverDir: 'Britain → China', system: 'Early Canton System' },
  { year: 1785, tea: 15_000_000, opium: 1_000, silverDir: 'Britain → China', system: 'Post-Commutation Act' },
  { year: 1819, tea: 30_000_000, opium: 5_000, silverDir: 'Flow Reverses', system: 'Rise of Country Traders' },
  { year: 1830, tea: 35_000_000, opium: 20_000, silverDir: 'China → India', system: 'Lintin Depot Period' },
  { year: 1839, tea: 40_000_000, opium: 40_000, silverDir: 'China → India', system: 'Pre-War Crisis' },
  { year: 1842, tea: 45_000_000, opium: 50_000, silverDir: 'China → Britain/India', system: 'Treaty Port Era' },
] as const;

/* ── Commutation Act comparison ── */
export const COMMUTATION_DATA = {
  before: { teaImports: 54, foreignImports: 134, taxRate: 119 },
  after: { teaImports: 228, foreignImports: 38, taxRate: 12.5, revenue: '£1,850,000' },
} as const;

/* ── Factory process steps ── */
export const FACTORY_STEPS = [
  { step: 1, name: 'Examining Hall', desc: 'Each earthen pan tested for purity and water content. Adulterated opium rejected.' },
  { step: 2, name: 'Mixing Room', desc: 'Thousands of pans emptied into stone vats and stirred with "blind rakes" for homogeneous paste.' },
  { step: 3, name: 'Balling Room', desc: 'Skilled workers form opium into precisely one-kilo balls, coated in Lewa and wrapped in dried poppy petals.' },
  { step: 4, name: 'Drying & Stacking', desc: 'Balls placed in earthenware cups in ventilated drying rooms. "Stacking boys" constantly turn and air to prevent mildew.' },
  { step: 5, name: 'Packing', desc: 'Forty balls packed into timber chests of Nepal fir, each weighing approximately 140 lbs (~70 kg). Shipped down the Ganges to Calcutta.' },
] as const;

/* ── Trade triangle nodes ── */
export const TRIANGLE_NODES = [
  { id: 'london', label: 'London', coords: [-0.1, 51.5] as [number, number], commodity: 'Silver → Tea' },
  { id: 'calcutta', label: 'Calcutta', coords: [88.3, 22.5] as [number, number], commodity: 'Opium → Silver' },
  { id: 'canton', label: 'Canton', coords: [113.2, 23.1] as [number, number], commodity: 'Tea → Opium' },
  { id: 'lintin', label: 'Lintin Island', coords: [113.7, 22.4] as [number, number], commodity: 'Smuggling hub' },
] as const;

/* ── Humen destruction stats ── */
export const HUMEN_DATA = {
  chests: 20_283,
  startDate: 'June 3, 1839',
  endDate: 'June 25, 1839',
  method: 'Stone pits filled with sea water, mixed with salt and quicklime',
} as const;

/* ── Treaty of Nanking terms ── */
export const TREATY_TERMS = [
  { term: 'Cession of Hong Kong', detail: 'Deep-water port and secure naval base for Britain.' },
  { term: 'Five Treaty Ports', detail: 'Canton, Amoy, Fuchow, Ningpo, and Shanghai opened to foreign trade.' },
  { term: 'Indemnity', detail: '21 million silver dollars to compensate Britain for destroyed opium and war costs.' },
  { term: 'End of Cohong Monopoly', detail: 'Chinese merchants no longer controlled all foreign trade.' },
  { term: 'Most Favoured Nation', detail: 'Any concession to another power automatically extended to Britain.' },
] as const;

/* ── Silver flow direction by era ── */
export const SILVER_DIRECTION = [
  { period: '1757–1810', context: 'Britain pays for tea with bullion', dir: 'Europe/America → China' },
  { period: '1810–1820', context: 'Opium growth offsets tea costs', dir: 'Approaching Parity' },
  { period: '1820–1839', context: 'Opium demand drains Qing reserves', dir: 'China → India/Britain' },
  { period: '1842–1850', context: 'Post-war indemnities and trade', dir: 'Aggressive Outflow' },
] as const;
