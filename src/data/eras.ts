export interface Era {
  label: string;
  date: string;
  color: string;
  teaser: string;
}

export const ERAS: Era[] = [
  { label: 'Cyrus', date: '550 BCE', color: 'hsl(43, 90%, 62%)', teaser: 'The first empire' },
  { label: 'Darius', date: '522 BCE', color: 'hsl(43, 85%, 58%)', teaser: 'Roads, coins, order' },
  { label: 'Persian Wars', date: '499 BCE', color: 'hsl(358, 70%, 60%)', teaser: 'East meets West' },
  { label: 'Alexander', date: '334 BCE', color: 'hsl(260, 55%, 65%)', teaser: 'The conqueror' },
  { label: 'Parthians', date: '247 BCE', color: 'hsl(180, 45%, 55%)', teaser: "Rome's rival" },
  { label: 'Sassanids', date: '224 CE', color: 'hsl(30, 80%, 55%)', teaser: 'The second golden age' },
  { label: 'Islam', date: '651 CE', color: 'hsl(150, 50%, 50%)', teaser: 'Faith transforms an empire' },
  { label: 'Golden Age', date: '800 CE', color: 'hsl(43, 90%, 62%)', teaser: 'Poetry, science, art' },
  { label: 'Mongols', date: '1219 CE', color: 'hsl(358, 65%, 55%)', teaser: 'Fire and ruin' },
  { label: 'Safavids', date: '1501 CE', color: 'hsl(220, 70%, 62%)', teaser: 'Rebirth in blue tile' },
  { label: 'Modern Iran', date: '1906 CE', color: 'hsl(180, 40%, 55%)', teaser: 'Revolution after revolution' },
];

/** Bare HSL values for CSS custom property interpolation (e.g., hsl(${val} / 0.5)) */
export const ERA_COLORS = {
  achaemenid: '43 85% 55%',
  alexander: '270 40% 50%',
  parthian: '350 60% 45%',
  sassanid: '350 55% 40%',
  islamic: '160 45% 38%',
  goldenAge: '160 50% 35%',
  mongol: '25 70% 50%',
  safavid: '215 65% 45%',
  modern: '220 15% 50%',
  epilogue: '43 85% 55%',
} as const;
