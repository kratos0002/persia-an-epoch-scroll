import storyPersia from '@/assets/story-persia.jpg';
import storyOpium from '@/assets/story-opium.jpg';
import storyKurukshetra from '@/assets/story-kurukshetra.jpg';
import storyWisdom from '@/assets/story-wisdom.jpg';
import storyMongol from '@/assets/story-mongol.jpg';
import storyBuddhism from '@/assets/story-buddhism.jpg';
import storySamurai from '@/assets/story-samurai.jpg';
import story1857 from '@/assets/story-1857.jpg';
import storyNapoleon from '@/assets/story-napoleon.jpg';
import storyConstantinople from '@/assets/story-constantinople.jpg';
import storyIndia from '@/assets/story-india.jpg';
import storyNuclear from '@/assets/story-nuclear.jpg';
import storyNutmeg from '@/assets/story-nutmeg.jpg';
import storyHormuz from '@/assets/story-hormuz.jpg';
import storyRamayana from '@/assets/story-ramayana.jpg';
import storyBerlin from '@/assets/story-berlin.jpg';
import storyBattuta from '@/assets/story-battuta.jpg';
import storyShakti from '@/assets/story-shakti.jpg';

export type StoryStatus = 'live' | 'coming-soon' | 'draft';

export interface StoryDefinition {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  hook: string;
  image: string;
  tags: string[];
  status: StoryStatus;
  href: string;
  color: string;
  era: string;
  sortYear: number;
  kind?: 'history' | 'epic';
}

export const STORY_REGISTRY: StoryDefinition[] = [
  {
    id: 'persia', number: 1, title: 'The Immortal Empire', subtitle: 'The History of Persia',
    hook: 'What if one civilization shaped more of the modern world than Rome, Greece, and Egypt combined?',
    image: storyPersia, tags: ['Visual Essay', 'Scrollytelling', '2,500 years'],
    status: 'live', href: '/persia', color: 'hsl(43, 85%, 55%)', era: '550 BCE', sortYear: -550,
  },
  {
    id: 'wisdom', number: 2, title: 'The Library That Lit the World', subtitle: 'The House of Wisdom',
    hook: 'For 400 years, one building in Baghdad held more knowledge than all of Europe combined.',
    image: storyWisdom, tags: ['Visual Essay', 'Knowledge Graph', '762–1258 CE'],
    status: 'live', href: '/wisdom', color: 'hsl(170, 40%, 38%)', era: '762 CE', sortYear: 762,
  },
  {
    id: 'buddhism', number: 3, title: 'The Path That Split', subtitle: 'The Spread of Buddhism',
    hook: 'One man sat under a tree and asked why we suffer. His answer split into a thousand traditions that reached every corner of Asia.',
    image: storyBuddhism, tags: ['Visual Essay', 'Branching Tree', '528 BCE–Today'],
    status: 'live', href: '/buddhism', color: 'hsl(30, 65%, 45%)', era: '528 BCE', sortYear: -528,
  },
  {
    id: 'samurai', number: 4, title: 'Stipends, Bonds & the Death of a Class', subtitle: 'The End of the Samurai',
    hook: 'The samurai class was not destroyed by war but by accounting: stipends converted to bonds, domains merged into prefectures, privilege replaced by institutions.',
    image: storySamurai, tags: ['Ledger Visual', 'Ink & Paper', '1603–1877'],
    status: 'live', href: '/samurai', color: 'hsl(5, 75%, 50%)', era: '1603', sortYear: 1603,
  },
  {
    id: '1857', number: 5, title: 'The Signal and the Fire', subtitle: 'The 1857 Rebellion',
    hook: 'Two signals raced across North India. The telegraph carried British orders at the speed of electricity. The rebellion spread at the speed of a horse.',
    image: story1857, tags: ['Dual Wavefront', 'Map Visual', '1857–1858'],
    status: 'live', href: '/1857', color: 'hsl(30, 85%, 50%)', era: '1857', sortYear: 1857,
  },
  {
    id: 'napoleon', number: 6, title: 'The Rise and Fall of Napoleon', subtitle: 'Revolution to Legacy',
    hook: 'One man reorganized Europe. Then Europe closed in. From revolutionary chaos to imperial zenith to final exile — and the ideas that outlasted the emperor.',
    image: storyNapoleon, tags: ['Coalition Board', 'Tricolor', '1789–1821'],
    status: 'live', href: '/napoleon', color: 'hsl(220, 65%, 45%)', era: '1789', sortYear: 1789,
  },
  {
    id: 'constantinople', number: 7, title: 'The City of Layers', subtitle: 'Constantinople',
    hook: '2,700 years of civilization stacked in 25 meters of earth. Greek, Roman, Byzantine, Crusader, Ottoman — each built on the bones of the last. Scroll down to dig.',
    image: storyConstantinople, tags: ['Archaeological Dig', 'Excavation', '657 BCE–2024'],
    status: 'live', href: '/constantinople', color: 'hsl(270, 45%, 30%)', era: '657 BCE', sortYear: -657,
  },
  {
    id: 'india-states', number: 8, title: 'The Mosaic Republic', subtitle: 'How 565 Became 28',
    hook: 'On the eve of independence, India was 565 princely states and 17 British provinces. What followed was the largest peaceful political integration in history — and a map that is still being redrawn.',
    image: storyIndia, tags: ['Living Map', 'SVG Morphing', '1947–2024'],
    status: 'live', href: '/india-states', color: 'hsl(40, 60%, 55%)', era: '1947', sortYear: 1947,
  },
  {
    id: 'mongol-india', number: 9, title: 'The Wall That Held', subtitle: 'Mongol Invasions of India',
    hook: 'They conquered Persia, Baghdad, China, Russia. Nothing stopped them. Then they turned toward India — and something held.',
    image: storyMongol, tags: ['Horizontal Scroll', 'Pan Map', '1221–1327'],
    status: 'live', href: '/mongol-india', color: 'hsl(15, 75%, 50%)', era: '1221', sortYear: 1221,
  },
  {
    id: 'nuclear', number: 10, title: 'The Chain Reaction', subtitle: 'How Nine Countries Built the Bomb',
    hook: 'The secret of the atom was unlocked once. Then it spread — through espionage, ambition, desperation, and pride — until nine nations held the power to end civilization.',
    image: storyNuclear, tags: ['Countdown Clock', 'Warhead Counter', '1945–2017'],
    status: 'live', href: '/nuclear', color: 'hsl(140, 70%, 45%)', era: '1945', sortYear: 1945,
  },
  {
    id: 'nutmeg', number: 11, title: 'The Spice That Built Empires', subtitle: 'The Nutmeg Wars',
    hook: 'One seed drove centuries of colonial warfare — and ended with the Dutch trading Manhattan for a tiny volcanic island most people have never heard of.',
    image: storyNutmeg, tags: ['Zoom Map', 'Spice Trade', '1512–1667'],
    status: 'coming-soon', href: '/nutmeg', color: 'hsl(25, 75%, 45%)', era: '1512', sortYear: 1512,
  },
  {
    id: 'hormuz', number: 12, title: 'The Throat of the World', subtitle: 'The Strait of Hormuz',
    hook: 'Every empire that ever ruled the East held this strait. Every one that lost it fell. A 3,000-year story of the world\'s most contested waterway.',
    image: storyHormuz, tags: ['Zoom Map', 'Chokepoints', '3000 BCE–Today'],
    status: 'coming-soon', href: '/hormuz', color: 'hsl(195, 55%, 35%)', era: '3000 BCE', sortYear: -3000,
  },
  {
    id: 'ramayana', number: 13, title: "The Exile's Road", subtitle: 'Tracing the Ramayana',
    hook: 'A 2,500-kilometre journey from the northern plains to the southern sea. One prince, fourteen years, and a route that became the most retold story in human history.',
    image: storyRamayana, tags: ['Sacred Epic', 'Route Map', '~500 BCE'],
    status: 'coming-soon', href: '/ramayana', color: 'hsl(25, 85%, 52%)', era: '~500 BCE', sortYear: -500, kind: 'epic',
  },
  {
    id: 'berlin', number: 14, title: 'The Architecture of Partition', subtitle: 'The Scramble for Africa',
    hook: 'Fourteen nations sat around a table in Berlin. No African was invited. They drew lines on a map of a continent they had never surveyed — and those lines still draw blood today.',
    image: storyBerlin, tags: ['Conference Table', 'Partition Map', '1884–1914'],
    status: 'coming-soon', href: '/berlin', color: 'hsl(0, 65%, 42%)', era: '1884', sortYear: 1884,
  },
  {
    id: 'battuta', number: 15, title: 'The Global Odyssey', subtitle: 'Ibn Battuta',
    hook: 'One man walked 117,000 kilometres across 44 modern nations in 29 years. His journey revealed a 14th-century world more connected than Europe would know for centuries.',
    image: storyBattuta, tags: ['Route Map', 'Islamic World', '1325–1354'],
    status: 'coming-soon', href: '/ibn-battuta', color: 'hsl(38, 80%, 55%)', era: '1325', sortYear: 1325,
  },
  {
    id: 'shakti', number: 16, title: 'The Goddess as Geography', subtitle: 'The 52 Shaktipeeths',
    hook: 'A sacred atlas where the body of Sati becomes the subcontinent itself — 52 sites, competing canons, cross-border memory, and a living map of feminine power.',
    image: storyShakti, tags: ['Sacred Atlas', 'Mandala Map', 'Mythic Geography'],
    status: 'coming-soon', href: '/shaktipeeths', color: 'hsl(var(--shakti-vermilion))', era: 'Sacred geography', sortYear: -200, kind: 'epic',
  },
  {
    id: 'opium', number: 17, title: 'The Mercantilist Pivot', subtitle: 'The Opium Trade Triangle',
    hook: 'The most profitable drug trade in history, dressed up as bookkeeping. Tea flowed east, silver drained west, and opium bridged the gap — until a single commissioner set 20,283 chests on fire.',
    image: storyOpium, tags: ['Ledger Noir', 'Trade Triangle', '1757–1842'],
    status: 'coming-soon', href: '/opium-trade', color: 'hsl(40, 75%, 31%)', era: '1757', sortYear: 1757,
  },
  {
    id: 'kurukshetra', number: 18, title: 'The Fractured Yantra', subtitle: 'The Kurukshetra War',
    hook: 'Eighteen days. Four million warriors. A sacred geometry of war that cracked open an age — and the design language cracks with it.',
    image: storyKurukshetra, tags: ['Fractured Yantra', 'Sacred Geometry', '~3000 BCE'],
    status: 'coming-soon', href: '/kurukshetra', color: 'hsl(32, 55%, 42%)', era: '~3000 BCE', sortYear: -3000, kind: 'epic',
  },
];

export const STORY_ADMIN_LIST = STORY_REGISTRY.map(({ id, title, status }) => ({
  id,
  title,
  defaultStatus: status,
}));
