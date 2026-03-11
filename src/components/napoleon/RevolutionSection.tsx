import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const MIDNIGHT = 'hsl(225, 30%, 7%)';
const BLUE = 'hsl(220, 65%, 45%)';
const RED = 'hsl(0, 65%, 48%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';

const DATES = ['1789', '1792', '1793', '1794'];

export const RevolutionSection = () => {
  return (
    <section id="revolution" className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden" style={{ background: MIDNIGHT }}>
      {/* Chaotic background dates */}
      <div className="absolute inset-0 overflow-hidden">
        {DATES.map((d, i) => (
          <motion.span
            key={d}
            className="absolute font-display font-black"
            style={{
              fontSize: `${120 + i * 40}px`,
              color: i === 2 ? RED : BLUE,
              opacity: 0.04,
              left: `${10 + i * 20}%`,
              top: `${15 + i * 18}%`,
              transform: `rotate(${-15 + i * 8}deg)`,
            }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 0.04, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.3 }}
          >
            {d}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6" style={{ color: BLUE }}>
            1789 — The World Breaks Open
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8" style={{ color: PARCHMENT }}>
            The Bastille falls.<br />
            The King loses his head.<br />
            <span style={{ color: RED }}>The Terror begins.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            In four years, France devoured its monarchy, its aristocracy, and finally its own revolutionaries. 
            The guillotine became the metronome of a nation reinventing itself through violence.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <p className="font-body text-lg leading-relaxed mb-8" style={{ color: SMOKE }}>
            By 1793, France was at war with all of Europe. The republic needed generals, not philosophers. 
            And from the siege of Toulon, a 24-year-old artillery captain emerged with a plan.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-display text-2xl md:text-3xl italic" style={{ color: BLUE }}>
            "From this chaos — a general."
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
