import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Split {
  year: number;
  from: string;
  to: string[];
  reason: string;
  color: string;
}

const SPLITS: Split[] = [
  { year: 1960, from: 'Bombay', to: ['Gujarat', 'Maharashtra'], reason: 'Gujarati vs. Marathi speakers — the Samyukta Maharashtra movement', color: 'hsl(200, 45%, 50%)' },
  { year: 1963, from: 'Assam', to: ['Assam', 'Nagaland'], reason: 'Naga insurgency and demand for a separate tribal state', color: 'hsl(280, 35%, 50%)' },
  { year: 1966, from: 'Punjab', to: ['Punjab', 'Haryana', 'Himachal Pradesh'], reason: 'Punjabi Suba movement — Sikh-majority Punjab vs. Hindi-speaking Haryana', color: 'hsl(25, 55%, 55%)' },
  { year: 1971, from: 'Assam', to: ['Meghalaya'], reason: 'Khasi and Garo tribal demand for autonomy', color: 'hsl(280, 40%, 48%)' },
  { year: 1972, from: 'NE territories', to: ['Manipur', 'Tripura'], reason: 'Northeast frontier areas elevated to full statehood', color: 'hsl(280, 35%, 45%)' },
  { year: 1975, from: 'Protectorate', to: ['Sikkim'], reason: 'Referendum abolished monarchy; Sikkim merged as 22nd state', color: 'hsl(280, 30%, 50%)' },
  { year: 1987, from: 'Union Territory', to: ['Goa', 'Mizoram', 'Arunachal Pradesh'], reason: 'Former Portuguese territory and NE areas became states', color: 'hsl(200, 50%, 48%)' },
];

export const SplitsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="splits" ref={ref} className="relative min-h-screen py-24 px-6" style={{ background: 'hsl(220, 20%, 9%)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(280, 35%, 55%)' }}>
            1960–2000
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4" style={{ color: 'hsl(40, 30%, 88%)' }}>
            The Splitters
          </h2>
          <p className="font-body text-xl mb-12 max-w-2xl" style={{ color: 'hsl(40, 20%, 60%)' }}>
            Linguistic reorganisation was just the beginning. Over four decades, states were carved out for ethnic, tribal, linguistic, and political reasons. The count climbed from 14 to 25.
          </p>
        </motion.div>

        {/* Split visualization */}
        <div className="space-y-6">
          {SPLITS.map((split, i) => (
            <motion.div
              key={split.year + split.from}
              className="relative flex items-stretch gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              {/* Year */}
              <div className="w-16 shrink-0 text-right pt-3">
                <span className="font-display text-lg font-bold" style={{ color: split.color }}>{split.year}</span>
              </div>

              {/* Arrow/split viz */}
              <div className="flex flex-col items-center shrink-0 w-12">
                <div className="w-px flex-1" style={{ background: split.color + '40' }} />
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: split.color }}>
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke={split.color} strokeWidth="2">
                    <path d="M4,4 L12,8 L4,12" />
                  </svg>
                </div>
                <div className="w-px flex-1" style={{ background: split.color + '40' }} />
              </div>

              {/* Content */}
              <div className="flex-1 bg-card/20 border border-border/20 rounded-lg p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-display text-sm font-semibold px-2 py-0.5 rounded" style={{ background: split.color + '20', color: split.color }}>
                    {split.from}
                  </span>
                  <span style={{ color: 'hsl(40, 20%, 45%)' }}>→</span>
                  {split.to.map(name => (
                    <span key={name} className="font-display text-sm font-semibold px-2 py-0.5 rounded border" style={{ borderColor: split.color + '40', color: 'hsl(40, 30%, 80%)' }}>
                      {name}
                    </span>
                  ))}
                </div>
                <p className="font-body text-sm" style={{ color: 'hsl(40, 20%, 60%)' }}>{split.reason}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
