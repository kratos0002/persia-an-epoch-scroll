import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { IndiaMap } from '@/components/visuals/IndiaMap';
import type { EraId } from '@/components/visuals/indiaStatesData';

const ERAS: { id: EraId; label: string; year: string }[] = [
  { id: 'patchwork', label: '565 States', year: '1947' },
  { id: 'patel', label: 'Integration', year: '1948' },
  { id: 'abcd', label: 'A/B/C/D', year: '1950' },
  { id: 'linguistic', label: 'Linguistic', year: '1956' },
  { id: 'splits', label: 'Splits', year: '1960–87' },
  { id: 'present', label: '28 + 8', year: '2024' },
];

export const IndiaEpilogue: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [currentEra, setCurrentEra] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setCurrentEra(prev => (prev + 1) % ERAS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section id="india-epilogue" ref={ref} className="relative min-h-screen py-24 px-6 flex items-center" style={{ background: 'hsl(220, 22%, 7%)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="font-display text-4xl md:text-6xl font-bold mb-6"
          style={{ color: 'hsl(40, 30%, 88%)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          No Map Is Final
        </motion.h2>

        <motion.p
          className="font-body text-xl max-w-xl mx-auto mb-12"
          style={{ color: 'hsl(40, 20%, 60%)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Every border on this map was negotiated, demanded, fought for, or imposed.
          Nations are not given — they are made, one line at a time.
        </motion.p>

        {/* Cycling map */}
        <motion.div
          className="max-w-sm mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <IndiaMap era={ERAS[currentEra].id} />
          <motion.div
            key={currentEra}
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="font-display text-lg font-semibold" style={{ color: 'hsl(40, 60%, 55%)' }}>
              {ERAS[currentEra].year}
            </span>
            <span className="font-body text-sm ml-3" style={{ color: 'hsl(40, 20%, 55%)' }}>
              {ERAS[currentEra].label}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-border/20 pt-8 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <p className="font-display text-lg italic max-w-lg mx-auto mb-6" style={{ color: 'hsl(40, 20%, 55%)' }}>
            "India is not a nation but a continent — and its map is still being written."
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body font-semibold transition-colors"
            style={{ color: 'hsl(40, 30%, 50%)' }}
          >
            ← Back to all essays
          </a>
        </motion.div>
      </div>
    </section>
  );
};
