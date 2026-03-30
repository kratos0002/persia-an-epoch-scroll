import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { KurukshetraSectionShell } from './KurukshetraSectionShell';
import { DATING_THEORIES } from './kurukshetraData';
import { cn } from '@/lib/utils';

const SpecimenCard = ({ theory, index }: { theory: typeof DATING_THEORIES[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="border border-kuru-patina/25 bg-kuru-conch/80 rounded-sm p-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      {/* Stratum depth indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-kuru-patina/40 to-kuru-patina/10 rounded-l-sm" />

      <span className="font-display text-xs tracking-[0.2em] uppercase text-kuru-patina">{theory.researcher}</span>
      <span className="block font-display text-xl font-bold text-kuru-kohl mt-1">{theory.date}</span>
      <p className="font-body text-sm text-kuru-kohl/60 mt-2 leading-relaxed">{theory.evidence}</p>
    </motion.div>
  );
};

export const HistoricitySection = () => (
  <KurukshetraSectionShell
    id="kuru-historicity"
    eyebrow="Archaeo-Astronomy"
    title="The Excavation Ledger"
    phase={1}
    variant="dust"
  >
    <p className="font-body text-base md:text-lg text-kuru-kohl/70 leading-relaxed mb-6 max-w-3xl">
      The dating of the Kurukshetra War remains one of the most contested topics in Indology. Theories range from 900 BCE to 5561 BCE, bifurcated between astronomical calculations and archaeological evidence from the Painted Grey Ware (PGW) culture of Northern India.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {DATING_THEORIES.map((t, i) => (
        <SpecimenCard key={t.researcher} theory={t} index={i} />
      ))}
    </div>

    {/* Key archaeological sites */}
    <div className="border border-kuru-patina/20 bg-kuru-conch/60 rounded-sm p-5">
      <h3 className="font-display text-sm tracking-[0.2em] uppercase text-kuru-patina mb-4">Key Geographic Correlations</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { site: 'Jyotisar', location: 'Thanesar, Kurukshetra', sig: 'Delivery of the Bhagavad Gita under the ancient banyan tree' },
          { site: 'Abhimanyupur (Amin)', location: 'Kurukshetra District', sig: 'Site of the Chakra Vyuha; Abhimanyu\'s death' },
          { site: 'Bhishma Kund', location: 'Narkatari', sig: 'Where Bhishma lay on the bed of arrows' },
          { site: 'Bhagwanpura', location: 'Kurukshetra', sig: 'Unique overlap of Late Harappan and PGW cultures' },
          { site: 'Raja Karan Ka Tila', location: 'Mirzapur Mound', sig: 'Linked to Karna; significant PGW settlement' },
          { site: 'Sannihit Sarovar', location: 'Kurukshetra', sig: 'Meeting point of seven sacred Saraswati rivers' },
        ].map((s) => (
          <div key={s.site} className="border-l-2 border-kuru-patina/20 pl-3 py-1">
            <span className="font-display text-sm text-kuru-kohl">{s.site}</span>
            <span className="block font-body text-[11px] text-kuru-kohl/40">{s.location}</span>
            <span className="block font-body text-xs text-kuru-kohl/55 mt-0.5">{s.sig}</span>
          </div>
        ))}
      </div>
    </div>
  </KurukshetraSectionShell>
);
