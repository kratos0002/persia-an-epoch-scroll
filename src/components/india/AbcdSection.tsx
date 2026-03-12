import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PARTS = [
  { label: 'Part A', count: 9, desc: 'Former British provinces with elected governors', color: 'hsl(210, 45%, 50%)', states: 'Assam, Bihar, Bombay, Madhya Pradesh, Madras, Orissa, Punjab (East), United Provinces, West Bengal' },
  { label: 'Part B', count: 8, desc: 'Former princely states or groups of states with rajpramukhs', color: 'hsl(40, 55%, 50%)', states: 'Hyderabad, Jammu & Kashmir, Madhya Bharat, Mysore, PEPSU, Rajasthan, Saurashtra, Travancore-Cochin' },
  { label: 'Part C', count: 10, desc: 'Chief Commissioner\'s provinces and smaller princely states', color: 'hsl(150, 35%, 45%)', states: 'Ajmer, Bhopal, Bilaspur, Coorg, Delhi, Himachal Pradesh, Cutch, Manipur, Tripura, Vindhya Pradesh' },
  { label: 'Part D', count: 1, desc: 'Andaman and Nicobar Islands — directly administered territory', color: 'hsl(280, 30%, 45%)', states: 'Andaman & Nicobar Islands' },
];

export const AbcdSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="abcd" ref={ref} className="relative min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="md:w-3/5">
          <motion.div
            className="rounded-xl p-8 backdrop-blur-md"
            style={{ background: 'hsla(220, 20%, 10%, 0.75)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(210, 45%, 55%)' }}>
              January 26, 1950
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(40, 30%, 88%)' }}>
              The Alphabet States
            </h2>
            <p className="font-body text-base mb-8" style={{ color: 'hsl(40, 20%, 60%)' }}>
              The Constitution created an awkward classification: Part A, B, C, and D states. A messy interim arrangement everyone knew wouldn't last.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PARTS.map((part, i) => (
                <motion.div
                  key={part.label}
                  className="rounded-lg p-4 relative overflow-hidden border border-border/20"
                  style={{ background: 'hsla(220, 18%, 12%, 0.5)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: part.color }} />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display text-2xl font-black" style={{ color: part.color }}>{part.label}</span>
                    <span className="text-xs font-body px-2 py-0.5 rounded-full border" style={{ color: part.color, borderColor: part.color + '40' }}>
                      {part.count} {part.count === 1 ? 'territory' : 'states'}
                    </span>
                  </div>
                  <p className="font-body text-xs mb-2 leading-relaxed" style={{ color: 'hsl(40, 20%, 65%)' }}>{part.desc}</p>
                  <p className="font-body text-[10px] leading-relaxed" style={{ color: 'hsl(40, 15%, 50%)' }}>{part.states}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="font-body text-sm text-center mt-6"
              style={{ color: 'hsl(40, 20%, 55%)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              Total: <strong style={{ color: 'hsl(40, 60%, 55%)' }}>27 states + 1 territory</strong>. But the classification was administrative, not cultural. The people demanded states drawn by language.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
