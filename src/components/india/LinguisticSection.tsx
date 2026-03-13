import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const LINGUISTIC_BULLETS = [
  { text: 'Andhra Pradesh carved from Madras (Telugu speakers)', color: 'hsl(150, 40%, 40%)' },
  { text: 'Kerala created from Travancore-Cochin + Malabar (Malayalam)', color: 'hsl(150, 40%, 40%)' },
  { text: 'Karnataka from Mysore + parts of Bombay/Hyderabad (Kannada)', color: 'hsl(150, 40%, 40%)' },
  { text: 'Multiple Part B & C states merged into larger linguistic units', color: 'hsl(25, 55%, 50%)' },
  { text: 'Rajasthan consolidated from 19+ princely states', color: 'hsl(25, 55%, 50%)' },
];

interface LinguisticSectionProps {
  onActiveBullet?: (index: number) => void;
}

const BulletTracker = ({ index, onActive, children }: { index: number; onActive: (i: number) => void; children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-35% 0px -35% 0px' });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return <div ref={ref}>{children}</div>;
};

export const LinguisticSection: React.FC<LinguisticSectionProps> = ({ onActiveBullet }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="linguistic" ref={ref} className="relative min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="md:ml-auto md:w-3/5">
          <motion.div
            className="rounded-xl p-8 backdrop-blur-md"
            style={{ background: 'hsla(220, 18%, 9%, 0.75)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: 'hsl(150, 45%, 50%)' }}>
              1953–1956
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(40, 30%, 88%)' }}>
              Drawing by Tongue
            </h2>

            <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'hsl(40, 20%, 70%)' }}>
              Potti Sriramulu, a Gandhian activist, fasted unto death demanding a Telugu-speaking state. He died on December 15, 1952, after 58 days of fasting. Riots erupted across the Telugu-speaking regions.
            </p>
            <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'hsl(40, 20%, 70%)' }}>
              Within three days, Prime Minister Nehru — who had resisted linguistic states — announced the creation of Andhra Pradesh. The dam had broken.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'hsl(40, 20%, 70%)' }}>
              The Fazl Ali Commission was appointed in 1953. In 1956, the States Reorganisation Act redrew India's entire map along linguistic lines: <strong style={{ color: 'hsl(40, 60%, 55%)' }}>14 states and 6 Union Territories</strong>.
            </p>

            <div className="space-y-3 mb-6">
              {LINGUISTIC_BULLETS.map((item, i) => (
                <BulletTracker key={i} index={i} onActive={(idx) => onActiveBullet?.(idx)}>
                  <motion.div
                    className="flex items-start gap-3 rounded-lg px-3 py-2 -mx-3 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: item.color }} />
                    <p className="font-body text-sm" style={{ color: 'hsl(40, 20%, 65%)' }}>{item.text}</p>
                  </motion.div>
                </BulletTracker>
              ))}
            </div>

            {/* Legend for background map */}
            <div className="flex flex-wrap gap-4">
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

            <motion.div
              className="mt-6 border-t border-border/20 pt-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <p className="font-display text-sm italic" style={{ color: 'hsl(40, 20%, 55%)' }}>
                "One man's death proved more powerful than any commission's report. The map of India was redrawn not by decree, but by the demands of its people."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
