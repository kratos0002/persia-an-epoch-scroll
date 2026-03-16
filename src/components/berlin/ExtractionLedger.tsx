import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BL, EXTRACTION_DATA, type ExtractionEntry } from '@/components/visuals/berlinMapData';

const ExtractionRow = ({ entry, index }: { entry: ExtractionEntry; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="p-6 rounded-lg"
      style={{ background: 'hsl(220, 20%, 14%)', border: `1px solid ${BL.RED_WAX}22` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-lg font-bold" style={{ color: BL.VELLUM }}>
            {entry.territory}
          </h3>
          <p className="font-body text-xs mt-0.5" style={{ color: BL.GRID_BLUE }}>
            {entry.power} · {entry.period}
          </p>
        </div>
      </div>

      <p className="font-body text-sm leading-relaxed mb-3" style={{ color: 'hsl(220, 10%, 65%)' }}>
        <strong style={{ color: BL.RED_WAX }}>Method:</strong> {entry.method}
      </p>

      <div className="p-3 rounded" style={{ background: `${BL.RED_WAX}15` }}>
        <p className="font-mono text-sm font-bold" style={{ color: BL.RED_WAX }}>
          {entry.toll}
        </p>
      </div>
    </motion.div>
  );
};

export const ExtractionLedger = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="extraction" ref={ref} className="relative py-24 px-6" style={{ background: BL.INK }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: BL.RED_WAX }}>
            The human cost
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: BL.VELLUM }}>
            The Extraction
          </h2>
          <p className="font-body text-base leading-relaxed max-w-xl mx-auto" style={{ color: 'hsl(220, 10%, 55%)' }}>
            The primary motive of the colonial project was economic extraction.
            The methods employed to maximize "surplus" often resulted in atrocities
            that approximated or achieved the status of genocide.
          </p>
        </motion.div>

        <div className="space-y-4">
          {EXTRACTION_DATA.map((entry, i) => (
            <ExtractionRow key={entry.territory} entry={entry} index={i} />
          ))}
        </div>

        {/* Leopold quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 p-8 rounded-xl text-center"
          style={{ background: 'hsl(220, 20%, 10%)', border: `1px solid ${BL.RED_WAX}22` }}
        >
          <blockquote className="font-body text-base md:text-lg italic leading-relaxed mb-4" style={{ color: BL.VELLUM }}>
            "I do not want to risk losing a fine chance to secure for ourselves a slice of this magnificent African cake."
          </blockquote>
          <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: BL.BRASS }}>
            — King Leopold II, 1877
          </p>
        </motion.div>
      </div>
    </section>
  );
};
