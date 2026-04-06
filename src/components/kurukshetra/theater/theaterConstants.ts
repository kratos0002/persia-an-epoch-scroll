import { WarPhase } from '../kurukshetraData';

/* ── Phase atmosphere tokens ── */
export interface PhaseAtmosphere {
  bg: string;           // Tailwind/inline gradient
  bgFrom: string;       // gradient start HSL
  bgTo: string;         // gradient end HSL
  accent: string;       // CSS color for highlights
  accentVar: string;    // CSS variable name
  textPrimary: string;  // main text color
  textMuted: string;    // secondary text color
  crackOpacity: number; // 0–1
  grainOpacity: number; // 0–1
  borderColor: string;  // divider/border
}

export const PHASE_ATMOSPHERE: Record<WarPhase, PhaseAtmosphere> = {
  1: {
    bg: 'linear-gradient(to bottom, hsl(35 28% 82%), hsl(32 25% 75%))',
    bgFrom: 'hsl(35 28% 82%)',
    bgTo: 'hsl(32 25% 75%)',
    accent: 'hsl(42 85% 58%)',
    accentVar: '--kuru-gold',
    textPrimary: 'hsl(25 18% 10%)',
    textMuted: 'hsl(25 18% 10% / 0.5)',
    crackOpacity: 0,
    grainOpacity: 0.4,
    borderColor: 'hsl(42 85% 58% / 0.2)',
  },
  2: {
    bg: 'linear-gradient(to bottom, hsl(25 20% 15%), hsl(20 18% 10%))',
    bgFrom: 'hsl(25 20% 15%)',
    bgTo: 'hsl(20 18% 10%)',
    accent: 'hsl(32 55% 42%)',
    accentVar: '--kuru-bronze',
    textPrimary: 'hsl(38 20% 95%)',
    textMuted: 'hsl(38 20% 95% / 0.45)',
    crackOpacity: 0.12,
    grainOpacity: 0.5,
    borderColor: 'hsl(32 55% 42% / 0.2)',
  },
  3: {
    bg: 'linear-gradient(to bottom, hsl(355 30% 8%), hsl(0 20% 6%))',
    bgFrom: 'hsl(355 30% 8%)',
    bgTo: 'hsl(0 20% 6%)',
    accent: 'hsl(355 70% 55%)',
    accentVar: '--kuru-red',
    textPrimary: 'hsl(38 20% 95%)',
    textMuted: 'hsl(38 20% 95% / 0.4)',
    crackOpacity: 0.25,
    grainOpacity: 0.6,
    borderColor: 'hsl(355 70% 55% / 0.2)',
  },
  4: {
    bg: 'linear-gradient(to bottom, hsl(30 5% 12%), hsl(0 0% 10%))',
    bgFrom: 'hsl(30 5% 12%)',
    bgTo: 'hsl(0 0% 10%)',
    accent: 'hsl(30 8% 55%)',
    accentVar: '--kuru-ash',
    textPrimary: 'hsl(38 20% 95% / 0.7)',
    textMuted: 'hsl(38 20% 95% / 0.3)',
    crackOpacity: 0.4,
    grainOpacity: 0.7,
    borderColor: 'hsl(30 8% 55% / 0.15)',
  },
};

/* ── Day highlights — one dramatic title + key sentence per day ── */
export const DAY_HIGHLIGHTS: Record<number, { title: string; highlight: string }> = {
  1:  { title: 'First Blood', highlight: 'The conches sounded at dawn. By dusk, Virata\'s son Uttara lay dead — the war\'s first prince to fall.' },
  2:  { title: 'The Duel of Love', highlight: 'Arjuna engaged Bhishma directly; the duel was fierce but inconclusive, the two bound by love and duty.' },
  3:  { title: 'The Crescent', highlight: 'The crescent moon enveloped the flanks. Bhima and Ghatotkacha attacked Duryodhana directly — the Kaurava prince fainted and was pulled from the field.' },
  4:  { title: 'Bhima\'s Vow Begins', highlight: 'Eight of Duryodhana\'s brothers fell to Bhima\'s mace.' },
  5:  { title: 'Crocodile and Hawk', highlight: 'Intense skirmishes yielded heavy casualties on both sides, but no decisive blow.' },
  6:  { title: 'The Field Was Drenched', highlight: 'The formations mirrored and inverted. Both sides traded staggering casualties.' },
  7:  { title: 'The Cost Revealed', highlight: 'Allied kings began to grasp the true cost of this war. Bhishma seemed unstoppable.' },
  8:  { title: 'Next Generation Falls', highlight: 'Arjuna\'s son Iravan was slain — the first of the next generation to die.' },
  9:  { title: 'Krishna\'s Rage', highlight: 'Krishna nearly seized his Sudarshana Chakra, breaking his own vow of non-combat. Arjuna stopped him.' },
  10: { title: 'The Grandsire Falls', highlight: 'Arjuna pierced the grandsire with a storm of arrows until the patriarch fell upon a bed of shafts, his body not touching the ground.' },
  11: { title: 'The Surgeon Takes Command', highlight: 'Drona assumed command with cold efficiency. Karna entered the battlefield for the first time.' },
  12: { title: 'The Garland of Vishnu', highlight: 'Krishna received the Vaishnavastra upon his own chest, where it transformed into a garland.' },
  13: { title: 'The Wheel That Would Not Open', highlight: 'Abhimanyu entered the Chakra Vyuha alone — knowing how to pierce it but not how to escape. Six warriors surrounded the boy and killed him.' },
  14: { title: 'Night Without End', highlight: 'Karna spent his one-use Vasavi Shakti to bring down Ghatotkacha. The weapon meant for Arjuna was gone.' },
  15: { title: 'The Half-Truth', highlight: '"Ashwatthama is dead." Yudhishthira murmured the caveat too softly to be heard. Drona laid down his weapons.' },
  16: { title: 'The Sun Rises', highlight: 'Karna defeated Nakula, Sahadeva, and Yudhishthira but spared each — honoring a promise to their mother.' },
  17: { title: 'The Sun Sets on Karna', highlight: 'When Karna\'s chariot wheel sank and he dismounted, Krishna told Arjuna: strike now. Remember Abhimanyu.' },
  18: { title: 'Ash & Silence', highlight: 'Bhima struck Duryodhana\'s thigh. The war was over. The Kali Yuga had begun.' },
};
