import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ReliefEntry {
  form: string;
  location: string;
  period: string;
  feature: string;
  description: string;
  imageUrl: string; // Wikimedia Commons
  bgTone: string;
}

const RELIEFS: ReliefEntry[] = [
  {
    form: 'Bas-relief',
    location: 'Angkor Wat, Cambodia',
    period: '12th century',
    feature: 'Military hierarchy shown through parasols',
    description: 'The western gallery features a 600-yard bas-relief of the Battle of Kurukshetra. Commanders are shaded by 8–10 parasols, kings by 15–18. Warriors pull each other by the hair; chariots clash in dense chaos.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Awatoceanofmilk01.JPG/1280px-Awatoceanofmilk01.JPG',
    bgTone: 'hsl(30 15% 70%)',
  },
  {
    form: 'Stone Frieze',
    location: 'Hoysaleswara Temple, Halebidu',
    period: '12th century',
    feature: 'Intricate Chakra Vyuha carved in soapstone',
    description: 'Hoysala artisans carved battle scenes from the Mahabharata into soapstone — Abhimanyu battling multiple generals at once, with specific jewellery, weaponry, and raised three-dimensional effects.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Halebidu3.JPG/1280px-Halebidu3.JPG',
    bgTone: 'hsl(20 10% 55%)',
  },
  {
    form: 'Mughal Miniature',
    location: 'Razmnama (Book of War)',
    period: '1584–1586',
    feature: 'Syncretic style blending Persian and Indian art',
    description: 'Commissioned by Emperor Akbar, the Razmnama contains 169 full-page miniatures — combining Persian aesthetic principles with the dynamic narrative style of Indian storytelling.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Razmnama_-_Bhishma_on_bed_of_arrows.jpg/800px-Razmnama_-_Bhishma_on_bed_of_arrows.jpg',
    bgTone: 'hsl(35 30% 75%)',
  },
  {
    form: 'Kangra Miniature',
    location: 'Himachal Pradesh',
    period: '19th century',
    feature: 'Delicate linework; devotional focus',
    description: 'Regional Pahari schools produced Mahabharata series on paper, focusing on emotional and pre-war scenes — the Gita Upadesha, the pre-war councils, the internal agony of Arjuna.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Krishna_Arjuna_Gita.jpg/800px-Krishna_Arjuna_Gita.jpg',
    bgTone: 'hsl(40 25% 80%)',
  },
];

const ReliefSlide = ({ entry, index }: { entry: ReliefEntry; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-[70vh] flex items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Image — full width background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${entry.imageUrl})` }}
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${isEven
          ? 'bg-gradient-to-r from-kuru-kohl/90 via-kuru-kohl/60 to-transparent'
          : 'bg-gradient-to-l from-kuru-kohl/90 via-kuru-kohl/60 to-transparent'
        }`} />
        {/* Grain */}
        <div className="absolute inset-0 kuru-grain opacity-30" />
      </div>

      {/* Text overlay */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 w-full flex ${isEven ? 'justify-start' : 'justify-end'}`}>
        <motion.div
          className="max-w-md bg-kuru-kohl/40 backdrop-blur-md border border-kuru-conch/10 rounded-sm p-6 md:p-8"
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-kuru-bronze">
            {entry.form} · {entry.period}
          </span>
          <h3 className="font-display text-xl md:text-2xl tracking-[0.06em] text-kuru-conch mt-2">
            {entry.location}
          </h3>
          <p className="font-display text-xs tracking-[0.15em] uppercase text-kuru-gold/50 mt-2">
            {entry.feature}
          </p>
          <p className="font-body text-sm text-kuru-conch/70 mt-4 leading-relaxed">
            {entry.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ReliefGallery = () => (
  <section id="kuru-art" className="relative bg-kuru-kohl overflow-hidden">
    {/* Section header */}
    <div className="relative z-10 text-center pt-24 pb-12 px-6">
      <p className="kuru-chip inline-flex border-kuru-conch/20 text-kuru-conch/60 mb-4">Visual Memory</p>
      <h2 className="font-display text-3xl md:text-5xl tracking-[0.06em] text-kuru-conch">
        The Relief Gallery
      </h2>
      <p className="font-body text-base text-kuru-conch/40 mt-4 max-w-xl mx-auto">
        The drama of the 18-day war has been immortalised in temple stone and royal manuscripts across the world.
      </p>
    </div>

    {RELIEFS.map((entry, i) => (
      <ReliefSlide key={entry.form} entry={entry} index={i} />
    ))}
  </section>
);
