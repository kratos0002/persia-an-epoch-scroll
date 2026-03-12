import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const PresentSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="present" ref={ref} className="relative min-h-screen py-24 px-6 flex items-center">
      <div className="max-w-4xl mx-auto">
        <div className="md:w-3/5 md:mx-auto">
          <motion.div
            className="rounded-xl p-8 backdrop-blur-md text-center"
            style={{ background: 'hsla(220, 20%, 10%, 0.75)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(40, 50%, 55%)' }}>
              2024
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4" style={{ color: 'hsl(40, 30%, 88%)' }}>
              28 + 8
            </h2>
            <p className="font-body text-base mb-8" style={{ color: 'hsl(40, 20%, 60%)' }}>
              Twenty-eight states. Eight Union Territories. One republic — assembled from a patchwork of 565 princely states and 17 British provinces over 77 years of negotiation, protest, war, and legislation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { n: '28', label: 'States', color: 'hsl(40, 60%, 55%)' },
                { n: '8', label: 'Union Territories', color: 'hsl(210, 50%, 55%)' },
                { n: '22', label: 'Scheduled Languages', color: 'hsl(150, 40%, 50%)' },
                { n: '1.4B', label: 'People', color: 'hsl(25, 55%, 55%)' },
              ].map(item => (
                <div key={item.label} className="rounded-lg p-3 border border-border/20" style={{ background: 'hsla(220, 18%, 12%, 0.5)' }}>
                  <div className="font-display text-2xl font-bold" style={{ color: item.color }}>{item.n}</div>
                  <div className="text-[10px] tracking-[0.12em] uppercase font-body mt-1" style={{ color: 'hsl(40, 20%, 50%)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
