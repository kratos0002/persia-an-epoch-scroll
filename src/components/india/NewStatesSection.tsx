import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NEW_STATES = [
  {
    name: 'Chhattisgarh',
    year: 2000,
    from: 'Madhya Pradesh',
    detail: 'Carved from 16 Chhattisgarhi-speaking districts of Madhya Pradesh. Rich in minerals but among the poorest regions. A decades-long demand rooted in underdevelopment.',
    color: 'hsl(25, 55%, 50%)',
  },
  {
    name: 'Uttarakhand',
    year: 2000,
    from: 'Uttar Pradesh',
    detail: 'The hill districts of northwest UP had little in common with the Gangetic plains. The Uttarakhand movement turned violent in 1994 when police fired on protesters in Muzaffarnagar.',
    color: 'hsl(25, 50%, 48%)',
  },
  {
    name: 'Jharkhand',
    year: 2000,
    from: 'Bihar',
    detail: 'A tribal-majority region with massive mineral wealth but colonial-era exploitation. The Jharkhand movement was one of India\'s longest-running demands — starting in the 1930s.',
    color: 'hsl(25, 60%, 52%)',
  },
  {
    name: 'Telangana',
    year: 2014,
    from: 'Andhra Pradesh',
    detail: 'The newest state. Telangana was part of the Nizam\'s dominions, merged into Andhra Pradesh in 1956. A distinct identity and perceived neglect fueled a 60-year movement. K. Chandrashekar Rao\'s 11-day fast in 2009 reignited demands.',
    color: 'hsl(160, 40%, 45%)',
  },
  {
    name: 'J&K → 2 UTs',
    year: 2019,
    from: 'Jammu & Kashmir (State)',
    detail: 'On August 5, 2019, Article 370 was abrogated. Jammu & Kashmir was reorganized from a state into two Union Territories: J&K (with legislature) and Ladakh (without). The most politically charged reorganization since 1947.',
    color: 'hsl(210, 50%, 50%)',
  },
];

export const NewStatesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="new-states" ref={ref} className="relative min-h-screen py-24 px-6" style={{ background: 'hsl(220, 22%, 8%)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40, 50%, 55%)' }}>
            2000–2019
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4" style={{ color: 'hsl(40, 30%, 88%)' }}>
            The Last Redrawing
          </h2>
          <p className="font-body text-xl mb-12 max-w-2xl" style={{ color: 'hsl(40, 20%, 60%)' }}>
            Three states were born on November 1, 2000. One more in 2014. And in 2019, one state became two Union Territories in the most controversial reorganization since independence.
          </p>
        </motion.div>

        <div className="space-y-8">
          {NEW_STATES.map((state, i) => (
            <motion.div
              key={state.name}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <div className="bg-card/30 border border-border/30 rounded-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="shrink-0 text-center md:text-left">
                    <div className="font-display text-4xl font-black" style={{ color: state.color }}>{state.year}</div>
                    <div className="text-[9px] tracking-[0.15em] uppercase font-body mt-1" style={{ color: 'hsl(40, 20%, 50%)' }}>
                      from {state.from}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: 'hsl(40, 30%, 88%)' }}>{state.name}</h3>
                    <p className="font-body text-base leading-relaxed" style={{ color: 'hsl(40, 20%, 65%)' }}>{state.detail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
