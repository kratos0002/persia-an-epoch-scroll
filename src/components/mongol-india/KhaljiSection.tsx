import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BURNT = 'hsl(15, 75%, 50%)';

const ReformCard = ({ title, detail, delay }: { title: string; detail: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="bg-card/60 backdrop-blur-lg rounded-lg border border-[hsl(15,75%,50%,0.15)] p-5 md:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h4 className="font-display text-lg font-bold mb-2" style={{ color: BURNT }}>{title}</h4>
      <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(40, 25%, 75%)' }}>{detail}</p>
    </motion.div>
  );
};

export const KhaljiSection = () => (
  <section id="mi-khalji" className="relative py-24 md:py-32 px-6">
    <div className="max-w-4xl mx-auto">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: BURNT, opacity: 0.6 }}>
          1296 · The Shield
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(40, 25%, 90%)' }}>
          Alauddin Khalji's Military Machine
        </h2>
        <p className="font-body text-lg md:text-xl leading-relaxed mb-12" style={{ color: 'hsl(40, 25%, 75%)' }}>
          When Alauddin seized the throne in 1296, the Mongol threat was existential.
          His predecessors had barely survived wave after wave. Alauddin's response was
          not heroic speeches or divine appeals — it was <em className="italic" style={{ color: BURNT }}>systematic military reorganization</em> on
          a scale India had never seen.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
        <ReformCard
          title="Standing Army"
          detail="Abolished the feudal levy system. Paid soldiers directly from the treasury, creating India's first fully professional standing army. Soldiers answered to the Sultan, not to local lords."
          delay={0}
        />
        <ReformCard
          title="Price Controls"
          detail="Fixed prices of grain, cloth, horses, and cattle across the empire. Markets were monitored by spies. Purpose: keep army costs sustainable. A horse that once cost 100 silver tankhas now cost 25."
          delay={0.1}
        />
        <ReformCard
          title="Intelligence Network"
          detail="Created a network of mounted intelligence officers (barids) and secret spies (munhiyans) stationed across the northwest frontier. The Mongols could no longer approach Delhi without weeks of early warning."
          delay={0.2}
        />
        <ReformCard
          title="Frontier Fortification"
          detail="Rebuilt and garrisoned every fort along the northwest frontier — from the Khyber Pass to Multan to Dipalpur. Stationed permanent garrisons with enough supplies to withstand siege without resupply."
          delay={0.3}
        />
      </div>

      <RevealOnScroll delay={0.4}>
        <div className="text-center">
          <p className="font-display text-xl md:text-2xl font-semibold" style={{ color: BURNT }}>
            The result: the most militarized state in the medieval world —
            built for one purpose.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);
