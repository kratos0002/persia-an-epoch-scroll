import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NEW_STATES = [
  { name: 'Chhattisgarh', year: 2000, from: 'Madhya Pradesh', detail: 'Carved from 16 Chhattisgarhi-speaking districts of Madhya Pradesh. Rich in minerals but among the poorest regions.', color: 'hsl(25, 55%, 50%)' },
  { name: 'Uttarakhand', year: 2000, from: 'Uttar Pradesh', detail: 'The hill districts of northwest UP had little in common with the Gangetic plains. The movement turned violent in 1994.', color: 'hsl(25, 50%, 48%)' },
  { name: 'Jharkhand', year: 2000, from: 'Bihar', detail: 'A tribal-majority region with massive mineral wealth. The Jharkhand movement started in the 1930s.', color: 'hsl(25, 60%, 52%)' },
  { name: 'Telangana', year: 2014, from: 'Andhra Pradesh', detail: 'The newest state. A distinct identity and perceived neglect fueled a 60-year movement.', color: 'hsl(160, 40%, 45%)' },
  { name: 'J&K → 2 UTs', year: 2019, from: 'Jammu & Kashmir', detail: 'Article 370 abrogated. Reorganized into two Union Territories: J&K and Ladakh. The most charged reorganization since 1947.', color: 'hsl(210, 50%, 50%)' },
];

export const NewStatesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="new-states" ref={ref} className="relative min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="md:ml-auto md:w-3/5">
          <motion.div
            className="rounded-xl p-8 backdrop-blur-md"
            style={{ background: 'hsla(220, 22%, 8%, 0.75)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40, 50%, 55%)' }}>
              2000–2019
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(40, 30%, 88%)' }}>
              The Last Redrawing
            </h2>
            <p className="font-body text-base mb-8" style={{ color: 'hsl(40, 20%, 60%)' }}>
              Three states were born on November 1, 2000. One more in 2014. And in 2019, one state became two Union Territories.
            </p>

            <div className="space-y-4">
              {NEW_STATES.map((state, i) => (
                <motion.div
                  key={state.name}
                  className="rounded-lg p-4 border border-border/20"
                  style={{ background: 'hsla(220, 18%, 12%, 0.5)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="font-display text-2xl font-black" style={{ color: state.color }}>{state.year}</div>
                      <div className="text-[9px] tracking-[0.12em] uppercase font-body mt-0.5" style={{ color: 'hsl(40, 20%, 50%)' }}>
                        from {state.from}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold mb-1" style={{ color: 'hsl(40, 30%, 88%)' }}>{state.name}</h3>
                      <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(40, 20%, 65%)' }}>{state.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
