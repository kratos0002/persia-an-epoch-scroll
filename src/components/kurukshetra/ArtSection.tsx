import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { KurukshetraSectionShell } from './KurukshetraSectionShell';

interface ArtEntry {
  form: string;
  location: string;
  feature: string;
  description: string;
}

const ART_ENTRIES: ArtEntry[] = [
  {
    form: 'Bas-reliefs',
    location: 'Angkor Wat, Cambodia · 12th century',
    feature: 'Military hierarchy shown through parasols',
    description: 'The western gallery features a 600-yard bas-relief of the Battle of Kurukshetra. Commanders are shaded by 8–10 parasols, kings by 15–18. Warriors pull each other by the hair; chariots clash in dense chaos.',
  },
  {
    form: 'Stone Friezes',
    location: 'Hoysaleswara Temple, Halebidu · 12th century',
    feature: 'Intricate Chakra Vyuha in soapstone',
    description: 'Hoysala artisans carved the Chakra Vyuha into soapstone — Abhimanyu battling multiple generals at once, with specific jewellery, weaponry, and raised three-dimensional effects.',
  },
  {
    form: 'Mughal Miniatures',
    location: 'Razmnama · 1584–1586',
    feature: 'Syncretic style blending Persian and Indian art',
    description: 'Commissioned by Akbar, the Razmnama contains 169 full-page miniatures — "Arjuna Hits the Target," "The Fall of Bhishma" — combining Persian aesthetic with Indian narrative dynamism.',
  },
  {
    form: 'Kangra Miniatures',
    location: 'Himachal Pradesh · 19th century',
    feature: 'Delicate linework; devotional focus',
    description: 'Regional Pahari schools produced Mahabharata series on paper, focusing on emotional and pre-war scenes — the Gita Upadesha, the pre-war councils, the internal agony of Arjuna.',
  },
  {
    form: 'Tanjore / Mysore',
    location: 'Karnataka · 18th–19th century',
    feature: 'Gold foil and gesso for raised effects',
    description: 'South Indian traditions used gold leaf, gesso relief, and rich mineral pigments to create intensely devotional panels of Kurukshetra episodes, emphasizing Krishna\'s divine interventions.',
  },
];

export const ArtSection = () => (
  <KurukshetraSectionShell
    id="kuru-art"
    eyebrow="Visual Memory"
    title="The Relief Gallery"
    phase={1}
    variant="dust"
  >
    <p className="font-body text-base md:text-lg text-kuru-kohl/70 leading-relaxed mb-10 max-w-3xl">
      The drama of the 18-day war has been immortalised in temple stone and royal manuscripts across the world — from the sandstone corridors of Angkor Wat to the soapstone friezes of Halebidu, from the Mughal atelier to the Kangra valleys.
    </p>

    <div className="space-y-5">
      {ART_ENTRIES.map((entry, i) => (
        <ArtCard key={entry.form} entry={entry} index={i} />
      ))}
    </div>
  </KurukshetraSectionShell>
);

const ArtCard = ({ entry, index }: { entry: ArtEntry; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="border border-kuru-bronze/15 rounded-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      {/* Stone-texture header */}
      <div className="bg-kuru-clay/80 px-5 py-3 border-b border-kuru-bronze/15">
        <span className="font-display text-sm tracking-[0.15em] text-kuru-conch/90">{entry.form}</span>
        <span className="block font-body text-[11px] text-kuru-conch/50 mt-0.5">{entry.location}</span>
      </div>
      <div className="p-5 bg-kuru-dust/60">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-kuru-bronze mb-2">{entry.feature}</p>
        <p className="font-body text-sm text-kuru-kohl/70 leading-relaxed">{entry.description}</p>
      </div>
    </motion.div>
  );
};
