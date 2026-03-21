export interface ShaktiPeeth {
  id: string;
  name: string;
  coords: [number, number];
  bodyPart: string;
  bodyCategory: 'head' | 'torso' | 'limb' | 'ornament' | 'abstract';
  shakti: string;
  bhairava: string;
  country: 'India' | 'Pakistan' | 'Bangladesh' | 'Nepal' | 'China' | 'Sri Lanka';
  regionCluster: 'Northwest' | 'Himalaya' | 'Bengal' | 'Gangetic' | 'Deccan' | 'South' | 'Cross-Border';
  status: 'active' | 'disputed' | 'ruins';
  manifestationType: 'cave' | 'flame' | 'stone' | 'spring' | 'city-temple' | 'hill' | 'river' | 'ruins';
  sourceTraditions: string[];
  currentSignificance: string;
  isDisputed: boolean;
  isCrossBorder: boolean;
  isAdiPeetha: boolean;
}

export const SH = {
  NIGHT: 'hsl(var(--shakti-night))',
  INK: 'hsl(var(--shakti-ink))',
  VERMILION: 'hsl(var(--shakti-vermilion))',
  GOLD: 'hsl(var(--shakti-gold))',
  LOTUS: 'hsl(var(--shakti-lotus))',
  ASH: 'hsl(var(--shakti-ash))',
  PLUM: 'hsl(var(--shakti-plum))',
  PANEL: 'hsl(var(--shakti-panel))',
  LINE: 'hsl(var(--shakti-line))',
  GLOW: 'hsl(var(--shakti-glow))',
  SMOKE: 'hsl(var(--shakti-smoke))',
} as const;

export const SHAKTI_SECTIONS = [
  { id: 'shakti-hero', label: 'Mythic opening' },
  { id: 'shakti-canon', label: 'Canon wheel' },
  { id: 'shakti-atlas', label: 'Sacred anatomy atlas' },
  { id: 'shakti-adi', label: 'Four Adi Peethas' },
  { id: 'shakti-bengal', label: 'Bengal bloom' },
  { id: 'shakti-cross-border', label: 'Cross-border sacred geography' },
  { id: 'shakti-presence', label: 'Presence without form' },
  { id: 'shakti-lost', label: 'Lost and disputed sites' },
  { id: 'shakti-pilgrimage', label: 'Pilgrimage constellations' },
  { id: 'shakti-epilogue', label: 'Motherland reassembled' },
] as const;

export const CANON_RINGS = [
  {
    count: 4,
    label: 'Adi core',
    texts: ['Kalika Purana', 'Shiva Purana'],
    description: 'The earliest compact grid of power points at the four directional poles of the goddess-field.',
  },
  {
    count: 18,
    label: 'Maha peethas',
    texts: ['Regional peetha traditions', 'Later tantric digests'],
    description: 'A devotional expansion where major shrines become a recognizable subcontinental circuit.',
  },
  {
    count: 51,
    label: 'Pithanirnaya',
    texts: ['Pithanirnaya', 'Mahapithanirupana'],
    description: 'The later codified list that becomes the dominant working canon for most modern devotees.',
  },
  {
    count: 52,
    label: 'Tantrachudamani',
    texts: ['Tantrachudamani'],
    description: 'The most cited expanded list: each site is paired with a body part, a Shakti form, and a Bhairava guardian.',
  },
  {
    count: 108,
    label: 'Expansive sacred field',
    texts: ['Devi Bhagavata Purana', 'Prithivi Chandrodaya'],
    description: 'The goddess diffuses beyond major bodily fragments into ornaments, minor shrines, and regional memory-sites.',
  },
] as const;

export const SHAKTI_PEETHS: ShaktiPeeth[] = [
  { id: 'hinglaj', name: 'Hinglaj', coords: [65.507, 25.516], bodyPart: 'Bramharandhra (head)', bodyCategory: 'head', shakti: 'Kottari', bhairava: 'Bhimalochana', country: 'Pakistan', regionCluster: 'Northwest', status: 'active', manifestationType: 'cave', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya', 'Kalika Purana'], currentSignificance: 'Remote cave sanctuary in Balochistan, still drawing large annual yatras and shared reverence as Nani Pir.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'sharkara', name: 'Sharkara (Karavipur)', coords: [67.001, 24.861], bodyPart: 'Eyes', bodyCategory: 'head', shakti: 'Mahishmardini', bhairava: 'Krodhish', country: 'Pakistan', regionCluster: 'Northwest', status: 'disputed', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'An unstable identification around Sindh traditions, often invoked more through textual memory than firm topography.', isDisputed: true, isCrossBorder: true, isAdiPeetha: false },
  { id: 'sugandha', name: 'Sugandha', coords: [90.353, 22.701], bodyPart: 'Nose', bodyCategory: 'head', shakti: 'Sunanda', bhairava: 'Trayambak', country: 'Bangladesh', regionCluster: 'Bengal', status: 'active', manifestationType: 'river', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'A renovated Bangladesh shrine tied to the Sugandha river belt and surviving peetha worship across the border.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'amarnath', name: 'Amarnath', coords: [75.501, 34.214], bodyPart: 'Throat', bodyCategory: 'torso', shakti: 'Mahamaya', bhairava: 'Trisandhyeshwar', country: 'India', regionCluster: 'Himalaya', status: 'active', manifestationType: 'cave', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A cave peetha layered into one of the most important Himalayan pilgrimage landscapes.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'jwalamukhi', name: 'Jwalamukhi', coords: [76.321, 31.88], bodyPart: 'Tongue', bodyCategory: 'head', shakti: 'Siddhida', bhairava: 'Unmatta', country: 'India', regionCluster: 'Himalaya', status: 'active', manifestationType: 'flame', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'The goddess appears as eternal flames rather than an idol, making it one of the strongest examples of presence without form.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'jalandhar', name: 'Jalandhar', coords: [75.576, 31.326], bodyPart: 'Left breast', bodyCategory: 'torso', shakti: 'Tripura Malini', bhairava: 'Bheeshana', country: 'India', regionCluster: 'Northwest', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'A foundational northwestern node in early tantric geographies.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'guhyeshwari', name: 'Guhyeshwari', coords: [85.348, 27.71], bodyPart: 'Both knees', bodyCategory: 'limb', shakti: 'Mahashira', bhairava: 'Kapala', country: 'Nepal', regionCluster: 'Himalaya', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'One of Kathmandu’s most charged tantric shrines, tightly linked to Pashupatinath and valley ritual life.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'manasa', name: 'Manasa (Mansarovar)', coords: [81.466, 30.683], bodyPart: 'Right hand', bodyCategory: 'limb', shakti: 'Dakshayani', bhairava: 'Amara', country: 'China', regionCluster: 'Himalaya', status: 'active', manifestationType: 'spring', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A trans-Himalayan power point where pilgrimage and geopolitics now overlap around Lake Mansarovar.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'gandaki', name: 'Gandaki (Muktinath)', coords: [83.871, 28.816], bodyPart: 'Temple / side of head', bodyCategory: 'head', shakti: 'Gandaki Chandi', bhairava: 'Chakrapani', country: 'Nepal', regionCluster: 'Himalaya', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A high-altitude convergence of Vaishnava, Buddhist, and Shakta routes.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'bahula', name: 'Bahula', coords: [87.978, 23.643], bodyPart: 'Left arm', bodyCategory: 'limb', shakti: 'Bahula', bhairava: 'Bhiruka', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'A key Bengal peetha where the regional density of the network becomes visually obvious.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'ujaani', name: 'Ujaani', coords: [87.95, 23.583], bodyPart: 'Right wrist', bodyCategory: 'limb', shakti: 'Mangal Chandika', bhairava: 'Kapilambar', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'Part of the tight Bardhaman-Birbhum concentration that helped Bengal dominate later canons.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'udaipur', name: 'Tripura Sundari (Udaipur)', coords: [91.48, 23.531], bodyPart: 'Right leg', bodyCategory: 'limb', shakti: 'Tripura Sundari', bhairava: 'Tripuresha', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A major northeast shrine with strong living ritual continuity.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'chattal', name: 'Chattal', coords: [91.783, 22.356], bodyPart: 'Right arm', bodyCategory: 'limb', shakti: 'Bhawani', bhairava: 'Chandrashekhar', country: 'Bangladesh', regionCluster: 'Bengal', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A hilltop Bangladesh peetha that keeps eastern sacred geography visibly transnational.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'trisrota', name: 'Trisrota', coords: [88.719, 26.524], bodyPart: 'Left leg', bodyCategory: 'limb', shakti: 'Bhraamari', bhairava: 'Ambar', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'river', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A northern Bengal node associated with riverine crossings and frontier sacred space.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'kamakhya', name: 'Kamakhya', coords: [91.705, 26.166], bodyPart: 'Yoni', bodyCategory: 'abstract', shakti: 'Kamakhya', bhairava: 'Umananda', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'spring', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya', 'Kalika Purana', 'Shiva Purana'], currentSignificance: 'The single most powerful living tantric center in the network, especially during Ambubachi.', isDisputed: false, isCrossBorder: false, isAdiPeetha: true },
  { id: 'yugaadya', name: 'Yugaadya', coords: [88.005, 23.666], bodyPart: 'Right great toe', bodyCategory: 'limb', shakti: 'Bhutadatri', bhairava: 'Ksheerakantaka', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'Another Bengal site showing how local goddess cults were folded into the body-map of Sati.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'kalighat', name: 'Kalighat', coords: [88.342, 22.522], bodyPart: 'Right toes', bodyCategory: 'limb', shakti: 'Kalika', bhairava: 'Nakuleesh', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya', 'Kalika Purana', 'Shiva Purana'], currentSignificance: 'Urban, fierce, and continuously alive: one of the best examples of a peetha embedded inside a modern megacity.', isDisputed: false, isCrossBorder: false, isAdiPeetha: true },
  { id: 'prayag', name: 'Prayag', coords: [81.846, 25.431], bodyPart: 'Finger', bodyCategory: 'limb', shakti: 'Lalita', bhairava: 'Bhava', country: 'India', regionCluster: 'Gangetic', status: 'active', manifestationType: 'river', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A Shakta layer placed onto one of the great confluence geographies of India.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'jayanti', name: 'Jayanti', coords: [91.868, 24.894], bodyPart: 'Left thigh', bodyCategory: 'limb', shakti: 'Jayanti', bhairava: 'Kramadeshwara', country: 'Bangladesh', regionCluster: 'Bengal', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A cross-border site reinforcing the Sylhet cluster in later peetha traditions.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'kireet', name: 'Kireet', coords: [88.271, 24.183], bodyPart: 'Crown', bodyCategory: 'ornament', shakti: 'Vimala', bhairava: 'Samvarta', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'The crown-site intensifies the regal vocabulary of the divine body.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'varanasi', name: 'Varanasi', coords: [83.01, 25.31], bodyPart: 'Earring', bodyCategory: 'ornament', shakti: 'Vishalakshi', bhairava: 'Kala Bhairav', country: 'India', regionCluster: 'Gangetic', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'The Shakta peetha inside the most famous Shiva city underscores the inseparability of Shakti and Bhairava.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'kanyashram', name: 'Kanyashram', coords: [77.541, 8.078], bodyPart: 'Back', bodyCategory: 'torso', shakti: 'Sarvani', bhairava: 'Nimish', country: 'India', regionCluster: 'South', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A southern ocean-edge power point that extends the body-map to the subcontinent’s tip.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'kurukshetra', name: 'Kurukshetra', coords: [76.878, 29.969], bodyPart: 'Ankle bone', bodyCategory: 'limb', shakti: 'Savitri', bhairava: 'Sthanu', country: 'India', regionCluster: 'Gangetic', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A peetha anchored in a terrain already saturated with epic memory.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'manibandh', name: 'Manibandh', coords: [74.552, 26.487], bodyPart: 'Wrists / bracelets', bodyCategory: 'ornament', shakti: 'Gayatri', bhairava: 'Sarvanand', country: 'India', regionCluster: 'Gangetic', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A Pushkar-linked peetha where ornament becomes a sacred locator.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'shri-shail-sylhet', name: 'Shri Shail (Sylhet tradition)', coords: [91.87, 24.9], bodyPart: 'Neck', bodyCategory: 'torso', shakti: 'Mahalaxmi', bhairava: 'Sambaranand', country: 'Bangladesh', regionCluster: 'Bengal', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A less globally known but regionally persistent Sylhet peetha entry.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'kankalitala', name: 'Kankalitala', coords: [87.737, 23.663], bodyPart: 'Bone', bodyCategory: 'torso', shakti: 'Devgarbha', bhairava: 'Ruru', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'river', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'One of the clearest Bengal examples of skeletal imagery entering the geography of devotion.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'kalmadhav', name: 'Kalmadhav', coords: [81.757, 22.674], bodyPart: 'Left buttock', bodyCategory: 'torso', shakti: 'Kali', bhairava: 'Asitang', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'An Amarkantak-linked entry showing the sacred body extending through central India.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'shondesh', name: 'Shondesh', coords: [81.758, 22.675], bodyPart: 'Right buttock', bodyCategory: 'torso', shakti: 'Narmada', bhairava: 'Bhadrasen', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'spring', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'Another Amarkantak memory-point, often discussed through regional overlap rather than singular monumental architecture.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'ramgiri', name: 'Ramgiri', coords: [80.865, 25.164], bodyPart: 'Right breast', bodyCategory: 'torso', shakti: 'Shivani', bhairava: 'Chanda', country: 'India', regionCluster: 'Gangetic', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A Chitrakoot-region site connecting the Shakta body-map to epic and forest geographies.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'vrindavan', name: 'Vrindavan', coords: [77.7, 27.575], bodyPart: 'Ringlets of hair', bodyCategory: 'ornament', shakti: 'Uma', bhairava: 'Bhutesh', country: 'India', regionCluster: 'Gangetic', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A striking insertion of Shakta memory within a strongly Vaishnava sacred city.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'shuchi', name: 'Shuchi (Suchindram)', coords: [77.466, 8.154], bodyPart: 'Upper teeth', bodyCategory: 'head', shakti: 'Narayani', bhairava: 'Samhara', country: 'India', regionCluster: 'South', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A southern temple complex where the body-part logic remains explicit in local memory.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'panchsagar', name: 'Panchsagar', coords: [78.164, 29.945], bodyPart: 'Lower teeth', bodyCategory: 'head', shakti: 'Varahi', bhairava: 'Maharudra', country: 'India', regionCluster: 'Himalaya', status: 'disputed', manifestationType: 'river', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'One of the tradition’s most elusive sites, surviving through competing claims rather than a single uncontested temple.', isDisputed: true, isCrossBorder: false, isAdiPeetha: false },
  { id: 'bhabanipur', name: 'Bhabanipur', coords: [89.373, 24.848], bodyPart: 'Left anklet', bodyCategory: 'ornament', shakti: 'Aparna', bhairava: 'Vaman', country: 'Bangladesh', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'A preserved Bangladesh peetha sustained through local committees and renewed cross-border attention.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'shri-parvat', name: 'Shri Parvat', coords: [77.58, 34.17], bodyPart: 'Right anklet', bodyCategory: 'ornament', shakti: 'Shri Sundari', bhairava: 'Sundaranand', country: 'India', regionCluster: 'Himalaya', status: 'disputed', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A debated Himalayan identification that illustrates how peetha memory slides across mountain geographies.', isDisputed: true, isCrossBorder: false, isAdiPeetha: false },
  { id: 'vibhash', name: 'Vibhash', coords: [87.925, 22.296], bodyPart: 'Left ankle', bodyCategory: 'limb', shakti: 'Kapalini', bhairava: 'Sarvanand', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'river', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'The Tamluk coast binds maritime Bengal into the peetha field.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'prabhas', name: 'Prabhas', coords: [70.401, 20.888], bodyPart: 'Stomach', bodyCategory: 'torso', shakti: 'Chandrabhaga', bhairava: 'Vakratund', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A peetha presence layered into the Somnath coast and western pilgrimage worlds.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'bhairavparvat', name: 'Bhairavparvat', coords: [75.784, 23.179], bodyPart: 'Upper lips', bodyCategory: 'head', shakti: 'Avanti', bhairava: 'Lambakarna', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'An Ujjain-linked site where Bhairava guardianship becomes especially visible.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'janasthana', name: 'Janasthana', coords: [73.789, 19.997], bodyPart: 'Chin', bodyCategory: 'head', shakti: 'Bhramari', bhairava: 'Vikritaksh', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A Nashik-region peetha extending the network into western Deccan sacred terrain.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'godavari-tat', name: 'Godavari Tat', coords: [81.78, 17.0], bodyPart: 'Cheeks', bodyCategory: 'head', shakti: 'Rakini', bhairava: 'Vatsnabh', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'river', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A riverbank peetha where water geography becomes the shrine’s strongest visual logic.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'ratnavali', name: 'Ratnavali', coords: [88.395, 22.896], bodyPart: 'Right shoulder', bodyCategory: 'limb', shakti: 'Kumari', bhairava: 'Shiva', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'One more Bengal shoulder-point in the dense deltaic sacred matrix.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'mithila', name: 'Mithila', coords: [85.925, 26.728], bodyPart: 'Left shoulder', bodyCategory: 'limb', shakti: 'Uma', bhairava: 'Mahodar', country: 'Nepal', regionCluster: 'Cross-Border', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A Janakpur-side peetha where shared Maithil culture outlives the India-Nepal border.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'nalhati', name: 'Nalhati', coords: [87.829, 24.297], bodyPart: 'Tubular bones', bodyCategory: 'torso', shakti: 'Kalika Devi', bhairava: 'Yogesh', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'Another Birbhum concentration point in the skeletal map of Sati.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'karnat', name: 'Karnat', coords: [76.246, 31.998], bodyPart: 'Both ears', bodyCategory: 'head', shakti: 'Jayadurga', bhairava: 'Abhiru', country: 'India', regionCluster: 'Himalaya', status: 'disputed', manifestationType: 'hill', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A debated Himalayan placement demonstrating how multiple regional claims coexist inside the canon.', isDisputed: true, isCrossBorder: false, isAdiPeetha: false },
  { id: 'bakreshwar', name: 'Bakreshwar', coords: [87.372, 23.883], bodyPart: 'Eyebrows', bodyCategory: 'head', shakti: 'Mahishmardini', bhairava: 'Vakranath', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'spring', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'Known for hot springs, Bakreshwar fuses geothermal presence with goddess geography.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'jessoreswari', name: 'Jessoreswari', coords: [89.084, 22.657], bodyPart: 'Palms / soles', bodyCategory: 'limb', shakti: 'Jashoreshwari', bhairava: 'Chanda', country: 'Bangladesh', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'A historic Bangladesh peetha revived in public memory through recent high-profile visits and restoration interest.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
  { id: 'attahas', name: 'Attahas', coords: [87.822, 23.857], bodyPart: 'Lips', bodyCategory: 'head', shakti: 'Phullara', bhairava: 'Vishvesh', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'The laughing-lips peetha deepens Birbhum’s dominance in later sacred mapping.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'sainthia', name: 'Sainthia', coords: [87.68, 23.949], bodyPart: 'Necklace', bodyCategory: 'ornament', shakti: 'Nandini', bhairava: 'Nandikeshwar', country: 'India', regionCluster: 'Bengal', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Pithanirnaya'], currentSignificance: 'A necklace-peetha where ornament and body become inseparable categories.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'biraja', name: 'Biraja', coords: [86.333, 20.85], bodyPart: 'Navel', bodyCategory: 'torso', shakti: 'Biraja', bhairava: 'Jagannath', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani', 'Kalika Purana', 'Shiva Purana'], currentSignificance: 'One of the primordial eastern power centers and central to Odisha’s Shakta memory.', isDisputed: false, isCrossBorder: false, isAdiPeetha: true },
  { id: 'kanchipuram', name: 'Kanchipuram', coords: [79.705, 12.838], bodyPart: 'Skeleton / navel', bodyCategory: 'abstract', shakti: 'Devagarbha', bhairava: 'Ruru', country: 'India', regionCluster: 'South', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Tantrachudamani'], currentSignificance: 'A southern scholastic and temple center where peetha logic overlays older goddess traditions.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'sharada-peeth', name: 'Sharada Peeth', coords: [74.198, 34.797], bodyPart: 'Right hand', bodyCategory: 'limb', shakti: 'Sharada', bhairava: '—', country: 'Pakistan', regionCluster: 'Cross-Border', status: 'ruins', manifestationType: 'ruins', sourceTraditions: ['Pithanirnaya', 'Later Kashmir traditions'], currentSignificance: 'Now a ruin near the Line of Control, it remains one of the most emotionally charged absent shrines in the network.', isDisputed: true, isCrossBorder: true, isAdiPeetha: false },
  { id: 'dantewada', name: 'Dantewada', coords: [81.349, 18.9], bodyPart: 'Teeth', bodyCategory: 'head', shakti: 'Danteshwari', bhairava: 'Kapalbhairav', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Later peetha traditions'], currentSignificance: 'A powerful Bastar shrine where tribal and Brahmanical goddess traditions visibly meet.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'ambaji', name: 'Ambaji', coords: [72.854, 24.331], bodyPart: 'Heart', bodyCategory: 'torso', shakti: 'Ambaji', bhairava: '—', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'stone', sourceTraditions: ['Later peetha traditions'], currentSignificance: 'The heart-peetha of western India, famed for worship centered on the sacred yantra rather than an anthropomorphic murti.', isDisputed: false, isCrossBorder: false, isAdiPeetha: false },
  { id: 'tara-tarini', name: 'Tara Tarini', coords: [84.794, 19.484], bodyPart: 'Breasts (regional tradition)', bodyCategory: 'torso', shakti: 'Tara Tarini', bhairava: 'Kshetrapal', country: 'India', regionCluster: 'Deccan', status: 'active', manifestationType: 'hill', sourceTraditions: ['Kalika Purana', 'Shiva Purana', 'Regional traditions'], currentSignificance: 'One of the core Adi Peethas in Odisha and a key origin point in four-peetha traditions.', isDisputed: false, isCrossBorder: false, isAdiPeetha: true },
  { id: 'nagapooshani', name: 'Nagapooshani Amman', coords: [79.945, 9.603], bodyPart: 'Anklets (regional tradition)', bodyCategory: 'ornament', shakti: 'Nagapooshani', bhairava: 'Nayanair', country: 'Sri Lanka', regionCluster: 'Cross-Border', status: 'active', manifestationType: 'city-temple', sourceTraditions: ['Sri Lankan Shakta traditions'], currentSignificance: 'A living Tamil shrine in Nainativu that keeps the peetha network alive beyond the Indian mainland.', isDisputed: false, isCrossBorder: true, isAdiPeetha: false },
];

export const ADI_PEETHAS = SHAKTI_PEETHS.filter((site) => site.isAdiPeetha);
export const BENGAL_CLUSTER = SHAKTI_PEETHS.filter((site) => site.regionCluster === 'Bengal');
export const CROSS_BORDER_SITES = SHAKTI_PEETHS.filter((site) => site.isCrossBorder);
export const LOST_AND_DISPUTED_SITES = SHAKTI_PEETHS.filter((site) => site.isDisputed || site.status === 'ruins');

export const PRESENCE_FORMS = [
  {
    key: 'flame',
    title: 'Flame instead of idol',
    site: 'Jwalamukhi',
    description: 'The goddess manifests as living blue flames emerging directly from the earth.',
  },
  {
    key: 'spring',
    title: 'Water, fissure, and menstruating earth',
    site: 'Kamakhya',
    description: 'At Kamakhya, the deity is encountered through a stone cleft and living subterranean water rather than a statue.',
  },
  {
    key: 'cave',
    title: 'Cave sanctuary',
    site: 'Hinglaj',
    description: 'Some of the most powerful peethas are entered as raw landscape — cave, rock, ascent, exposure.',
  },
  {
    key: 'stone',
    title: 'Yantra and unfigured power',
    site: 'Ambaji',
    description: 'The goddess may be present through a yantra, stone, or abstract energy-center rather than anthropomorphic form.',
  },
  {
    key: 'ruins',
    title: 'Ruins that still radiate',
    site: 'Sharada Peeth',
    description: 'Even when architecture collapses or access disappears, the sacred field survives in ritual memory.',
  },
] as const;

export const PILGRIMAGE_CIRCUITS = [
  {
    name: 'Himachal Shakti Trail',
    colorKey: 'gold',
    sites: ['jwalamukhi', 'karnat', 'amarnath', 'jalandhar', 'kurukshetra'],
    note: 'A northern arc of hill shrines, flames, and fierce Bhairava guardians.',
  },
  {
    name: 'Bengal Bloom Circuit',
    colorKey: 'vermilion',
    sites: ['kalighat', 'bahula', 'ujaani', 'kankalitala', 'bakreshwar', 'attahas', 'sainthia', 'nalhati', 'vibhash', 'ratnavali'],
    note: 'The densest devotional cluster: the goddess diffuses across delta, river, and village worlds.',
  },
  {
    name: 'Kamakhya Axis',
    colorKey: 'lotus',
    sites: ['kamakhya', 'udaipur', 'chattal', 'jayanti', 'sugandha'],
    note: 'The eastern tantric corridor, where the network flares brightest.',
  },
  {
    name: 'Cross-Border Memory Route',
    colorKey: 'line',
    sites: ['hinglaj', 'sharkara', 'sharada-peeth', 'guhyeshwari', 'mithila', 'nagapooshani', 'bhabanipur', 'jessoreswari'],
    note: 'A sacred geography that ignores today’s political edges even when pilgrims cannot.',
  },
] as const;