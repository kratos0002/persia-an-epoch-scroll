import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IndiaMap } from '@/components/visuals/IndiaMap';

export const LinguisticSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="linguistic" ref={ref} className="relative min-h-screen py-24 px-6" style={{ background: 'hsl(220, 18%, 9%)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(150, 45%, 50%)' }}>
            1953–1956
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4" style={{ color: 'hsl(40, 30%, 88%)' }}>
            Drawing by Tongue
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <p className="font-body text-lg leading-relaxed mb-6" style={{ color: 'hsl(40, 20%, 70%)' }}>
              Potti Sriramulu, a Gandhian activist, fasted unto death demanding a Telugu-speaking state. He died on December 15, 1952, after 58 days of fasting. Riots erupted across the Telugu-speaking regions.
            </p>
            <p className="font-body text-lg leading-relaxed mb-6" style={{ color: 'hsl(40, 20%, 70%)' }}>
              Within three days, Prime Minister Nehru — who had resisted linguistic states — announced the creation of Andhra Pradesh. It was the first state carved purely on linguistic lines.
            </p>
            <p className="font-body text-lg leading-relaxed mb-6" style={{ color: 'hsl(40, 20%, 70%)' }}>
              The dam had broken. The Fazl Ali Commission (States Reorganisation Commission) was appointed in 1953. In 1956, the States Reorganisation Act redrew India's entire map along linguistic lines: <strong style={{ color: 'hsl(40, 60%, 55%)' }}>14 states and 6 Union Territories</strong>.
            </p>

            {/* Key changes */}
            <div className="space-y-3 mt-8">
              {[
                'Andhra Pradesh carved from Madras (Telugu speakers)',
                'Kerala created from Travancore-Cochin + Malabar (Malayalam)',
                'Karnataka from Mysore + parts of Bombay/Hyderabad (Kannada)',
                'Multiple Part B & C states merged into larger linguistic units',
                'Rajasthan consolidated from 19+ princely states',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: 'hsl(150, 45%, 50%)' }} />
                  <p className="font-body text-sm" style={{ color: 'hsl(40, 20%, 62%)' }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="sticky top-24"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <IndiaMap era="linguistic" />
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {[
                { label: 'Hindi belt', color: 'hsl(25, 55%, 50%)' },
                { label: 'Dravidian', color: 'hsl(150, 40%, 40%)' },
                { label: 'Northeast', color: 'hsl(280, 35%, 45%)' },
                { label: 'Western', color: 'hsl(200, 45%, 45%)' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: item.color }} />
                  <span className="text-[10px] font-body" style={{ color: 'hsl(40, 20%, 55%)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sriramulu tribute */}
        <motion.div
          className="mt-16 border-t border-border/20 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p className="font-display text-lg italic max-w-lg mx-auto" style={{ color: 'hsl(40, 20%, 55%)' }}>
            "One man's death proved more powerful than any commission's report. The map of India was redrawn not by decree, but by the demands of its people."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
