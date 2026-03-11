export interface BuddhismCity {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export const BUDDHISM_CITIES: BuddhismCity[] = [
  { name: 'Lumbini', lat: 27.47, lng: 83.28, description: 'Birthplace of Siddhartha Gautama, ~563 BCE.' },
  { name: 'Bodh Gaya', lat: 24.70, lng: 84.99, description: 'Site of the Bodhi tree where Siddhartha attained enlightenment.' },
  { name: 'Sarnath', lat: 25.38, lng: 83.02, description: 'Where the Buddha delivered his first sermon — the Deer Park.' },
  { name: 'Pataliputra', lat: 25.61, lng: 85.14, description: 'Capital of the Maurya Empire under Ashoka; center of Buddhist missions.' },
  { name: 'Nalanda', lat: 25.14, lng: 85.44, description: 'The greatest Buddhist university, active for 700 years.' },
  { name: 'Anuradhapura', lat: 8.35, lng: 80.39, description: 'Ancient capital of Sri Lanka; Theravada Buddhism arrived here ~250 BCE.' },
  { name: 'Bagan', lat: 21.17, lng: 94.86, description: 'Myanmar\'s city of 10,000 temples, heart of Theravada Buddhism.' },
  { name: 'Ayutthaya', lat: 14.35, lng: 100.57, description: 'Former capital of Thailand, a major Theravada center.' },
  { name: 'Angkor', lat: 13.41, lng: 103.87, description: 'Khmer capital that transitioned from Hinduism to Theravada Buddhism.' },
  { name: 'Gandhara', lat: 34.15, lng: 71.75, description: 'Crossroads of Greek and Buddhist art; birthplace of the Buddha image.' },
  { name: 'Dunhuang', lat: 40.14, lng: 94.66, description: 'Gateway to China on the Silk Road; home of the Mogao Caves.' },
  { name: "Chang'an", lat: 34.26, lng: 108.94, description: 'Tang Dynasty capital; major center of Chinese Buddhism.' },
  { name: 'Nara', lat: 34.69, lng: 135.80, description: 'Japan\'s first permanent capital; home of the Great Buddha at Tōdai-ji.' },
  { name: 'Kyoto', lat: 35.01, lng: 135.77, description: 'Heart of Japanese Zen Buddhism; thousands of temples and gardens.' },
  { name: 'Lhasa', lat: 29.65, lng: 91.10, description: 'Seat of the Dalai Lama and center of Vajrayana Buddhism.' },
  { name: 'Ulaanbaatar', lat: 47.92, lng: 106.91, description: 'Capital of Mongolia; Vajrayana Buddhism arrived via Tibet.' },
  { name: 'Kandy', lat: 7.29, lng: 80.64, description: 'Home of the Temple of the Tooth, Sri Lanka\'s most sacred Buddhist relic.' },
  { name: 'Luang Prabang', lat: 19.89, lng: 102.13, description: 'Ancient royal capital of Laos; a living Theravada monastery city.' },
];

export interface BuddhismRoute {
  id: string;
  name: string;
  color: string;
  points: [number, number][];
}

export const BUDDHISM_ROUTES: BuddhismRoute[] = [
  {
    id: 'southern',
    name: 'Southern Path (Theravada)',
    color: 'hsl(35, 75%, 50%)',
    points: [
      [25.61, 85.14], // Pataliputra
      [20.0, 83.0],
      [13.0, 80.2],
      [8.35, 80.39],  // Anuradhapura
      [7.29, 80.64],  // Kandy
    ],
  },
  {
    id: 'southern-sea',
    name: 'Southern Sea Route',
    color: 'hsl(35, 75%, 50%)',
    points: [
      [8.35, 80.39],   // Anuradhapura
      [10.0, 88.0],
      [16.0, 96.0],
      [21.17, 94.86],  // Bagan
      [19.89, 102.13], // Luang Prabang
      [14.35, 100.57], // Ayutthaya
      [13.41, 103.87], // Angkor
    ],
  },
  {
    id: 'northern',
    name: 'Northern Path (Mahayana)',
    color: 'hsl(350, 50%, 45%)',
    points: [
      [25.14, 85.44],  // Nalanda
      [28.0, 80.0],
      [34.15, 71.75],  // Gandhara
      [37.0, 75.0],
      [39.0, 84.0],
      [40.14, 94.66],  // Dunhuang
      [36.0, 103.0],
      [34.26, 108.94], // Chang'an
    ],
  },
  {
    id: 'northern-east',
    name: 'Northern Path East',
    color: 'hsl(350, 50%, 45%)',
    points: [
      [34.26, 108.94], // Chang'an
      [36.0, 120.0],
      [37.5, 127.0],   // Korea
      [35.0, 132.0],
      [34.69, 135.80], // Nara
      [35.01, 135.77], // Kyoto
    ],
  },
  {
    id: 'tibetan',
    name: 'Diamond Path (Vajrayana)',
    color: 'hsl(270, 45%, 45%)',
    points: [
      [25.14, 85.44],  // Nalanda
      [27.5, 86.5],
      [28.5, 88.0],
      [29.65, 91.10],  // Lhasa
      [35.0, 95.0],
      [42.0, 100.0],
      [47.92, 106.91], // Ulaanbaatar
    ],
  },
];

export const BUDDHISM_MAP_CENTERS = {
  india: { center: [25.0, 83.0] as [number, number], zoom: 5 },
  ashoka: { center: [22.0, 82.0] as [number, number], zoom: 4 },
  southern: { center: [14.0, 92.0] as [number, number], zoom: 4 },
  northern: { center: [34.0, 95.0] as [number, number], zoom: 4 },
  tibetan: { center: [35.0, 92.0] as [number, number], zoom: 4 },
  global: { center: [30.0, 95.0] as [number, number], zoom: 3 },
};
