import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const PatelSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const timeline = [
    { date: 'July 5, 1947', event: 'Patel creates the States Department with V.P. Menon as Secretary', color: 'hsl(40, 60%, 55%)' },
    { date: 'Aug 15, 1947', event: 'Independence Day: 552 of 565 states have signed Instruments of Accession', color: 'hsl(150, 50%, 45%)' },
    { date: 'The method', event: 'A mix of persuasion, pressure, charm, and implicit threat. "Your people want to join India."', color: 'hsl(40, 50%, 50%)' },
    { date: 'The argument', event: 'Defense, foreign affairs, and communications would be handled by India. Internal autonomy preserved — initially.', color: 'hsl(210, 45%, 50%)' },
  ];

  return (
    <section id="patel" ref={ref} className="relative min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="md:w-3/5">
          <motion.div
            className="rounded-xl p-8 backdrop-blur-md"
            style={{ background: 'hsla(220, 20%, 9%, 0.75)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(25, 55%, 55%)' }}>
              1947–1948
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(40, 30%, 88%)' }}>
              The Iron Man's Persuasion
            </h2>
            <p className="font-body text-base mb-8" style={{ color: 'hsl(40, 20%, 60%)' }}>
              Sardar Vallabhbhai Patel and V.P. Menon accomplished what many thought impossible: integrating 552 princely states into the Indian Union within a single year.
            </p>

            {/* Timeline */}
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative pl-8 border-l-2"
                  style={{ borderColor: item.color }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <p className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold mb-1" style={{ color: item.color }}>
                    {item.date}
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(40, 20%, 72%)' }}>
                    {item.event}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="border border-border/20 rounded-lg p-5 mt-6"
              style={{ background: 'hsla(220, 18%, 12%, 0.5)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="font-display text-4xl font-bold" style={{ color: 'hsl(40, 60%, 55%)' }}>552</div>
                <div>
                  <div className="font-display text-lg font-semibold" style={{ color: 'hsl(40, 30%, 85%)' }}>states acceded</div>
                  <div className="text-sm font-body" style={{ color: 'hsl(40, 20%, 55%)' }}>in less than one year</div>
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(40, 20%, 60%)' }}>
                Only three held out: Junagadh, Hyderabad, and Jammu & Kashmir. Each would be resolved by force or circumstance — none by choice.
              </p>
            </motion.div>

            {/* Legend for the background map */}
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: 'hsl(210, 45%, 50%)' }} />
                <span className="text-[10px] font-body" style={{ color: 'hsl(40, 20%, 55%)' }}>Acceded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: 'hsl(0, 65%, 50%)' }} />
                <span className="text-[10px] font-body" style={{ color: 'hsl(40, 20%, 55%)' }}>Holdout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
