import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Holdout {
  name: string;
  year: string;
  ruler: string;
  resolution: string;
  detail: string;
  color: string;
}

const holdouts: Holdout[] = [
  {
    name: 'Junagadh',
    year: 'Nov 1947',
    ruler: 'Nawab Mahabat Khan III',
    resolution: 'Plebiscite',
    detail: 'A Hindu-majority state with a Muslim ruler who acceded to Pakistan. India blockaded the state, the Nawab fled to Pakistan, and a plebiscite showed 99.95% voted for India. It was the simplest of the three.',
    color: 'hsl(0, 65%, 50%)',
  },
  {
    name: 'Hyderabad',
    year: 'Sep 1948',
    ruler: 'Nizam Osman Ali Khan',
    resolution: 'Operation Polo (Military Action)',
    detail: 'The largest and wealthiest princely state — the size of France, population 16 million. The Nizam wanted independence. The Razakars (a paramilitary) terrorized Hindus. On September 13, 1948, the Indian Army moved in. It was over in five days.',
    color: 'hsl(0, 70%, 48%)',
  },
  {
    name: 'Jammu & Kashmir',
    year: 'Oct 1947–',
    ruler: 'Maharaja Hari Singh',
    resolution: 'War + Accession + UN',
    detail: 'A Hindu ruler over a Muslim-majority population. Pakistani tribal militia invaded. The Maharaja signed the Instrument of Accession. Indian troops flew in. War followed. A UN ceasefire line divided Kashmir. It remains divided — the only holdout never fully resolved.',
    color: 'hsl(0, 75%, 45%)',
  },
];

export const HoldoutsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="holdouts" ref={ref} className="relative min-h-screen py-24 px-6" style={{ background: 'hsl(0, 10%, 9%)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(0, 60%, 55%)' }}>
            1947–1948
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4" style={{ color: 'hsl(40, 30%, 88%)' }}>
            The Three Holdouts
          </h2>
          <p className="font-body text-xl mb-16 max-w-2xl" style={{ color: 'hsl(40, 20%, 60%)' }}>
            Of 565 princely states, three refused to join. Each was resolved differently — plebiscite, military action, and war. One remains unresolved to this day.
          </p>
        </motion.div>

        <div className="space-y-12">
          {holdouts.map((h, i) => (
            <motion.div
              key={h.name}
              className="bg-card/30 border rounded-lg p-8 relative overflow-hidden"
              style={{ borderColor: h.color + '40' }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2 }}
            >
              {/* Pulsing indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: h.color }} />
                <span className="text-[9px] tracking-[0.15em] uppercase font-body font-semibold" style={{ color: h.color }}>
                  {h.resolution}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="font-display text-3xl font-black" style={{ color: h.color }}>{i + 1}</div>
                <div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: 'hsl(40, 30%, 88%)' }}>{h.name}</h3>
                  <p className="text-xs font-body" style={{ color: 'hsl(40, 20%, 55%)' }}>Ruler: {h.ruler} · {h.year}</p>
                </div>
              </div>

              <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 20%, 68%)' }}>
                {h.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
