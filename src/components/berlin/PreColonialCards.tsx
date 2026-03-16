import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BL, PRE_COLONIAL_POLITIES, type PreColonialPolity } from '@/components/visuals/berlinMapData';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';

const PolityCard = ({ polity, index }: { polity: PreColonialPolity; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-xl"
      style={{
        background: 'hsl(25, 35%, 92%)',
        border: '1px solid hsl(30, 30%, 82%)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-lg font-bold" style={{ color: 'hsl(25, 40%, 18%)' }}>
          {polity.name}
        </h3>
        <span className="text-[9px] tracking-[0.12em] uppercase font-body font-semibold px-2 py-0.5 rounded-full"
          style={{ background: 'hsl(30, 40%, 82%)', color: 'hsl(25, 30%, 35%)' }}>
          {polity.region}
        </span>
      </div>

      <p className="font-body text-sm mb-2" style={{ color: 'hsl(25, 30%, 35%)' }}>
        <strong>Population:</strong> {polity.population}
      </p>
      <p className="font-body text-sm mb-2" style={{ color: 'hsl(25, 30%, 35%)' }}>
        <strong>Governance:</strong> {polity.governance}
      </p>
      <p className="font-body text-sm" style={{ color: 'hsl(25, 30%, 45%)' }}>
        <strong>Trade:</strong> {polity.trade}
      </p>
    </motion.div>
  );
};

export const PreColonialCards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pre-colonial" ref={ref} className="relative py-24 px-6" style={{ background: 'hsl(30, 30%, 90%)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: 'hsl(25, 60%, 45%)' }}>
            The continent they ignored
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'hsl(25, 40%, 18%)' }}>
            Pre-Colonial Africa
          </h2>
          <p className="font-body text-base leading-relaxed max-w-2xl mx-auto" style={{ color: 'hsl(25, 20%, 40%)' }}>
            Contrary to the colonial narrative of a "dark continent," 19th-century Africa was home to a diverse
            array of political systems with complex administrative structures, professional militaries, and
            integrated trade networks spanning thousands of years.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRE_COLONIAL_POLITIES.map((polity, i) => (
            <PolityCard key={polity.name} polity={polity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
