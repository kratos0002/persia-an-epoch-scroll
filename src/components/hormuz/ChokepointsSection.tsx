import React from 'react';
import { motion } from 'framer-motion';
import { ChokepointComparison } from '@/components/visuals/ChokepointComparison';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const ChokepointsSection = () => {
  return (
    <section id="chokepoints" className="relative" style={{ height: '250vh', background: NAVY }}>
      {/* Sticky visual */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background: minimal world outline dots */}
        <div className="absolute inset-0">
          {/* Subtle grid of dots suggesting a world map */}
          <svg viewBox="0 0 1000 500" className="w-full h-full opacity-[0.03]" fill={TEAL}>
            {[...Array(50)].map((_, i) => (
              <circle key={i} cx={Math.random() * 1000} cy={Math.random() * 500} r={1 + Math.random() * 2} />
            ))}
          </svg>
        </div>

        <motion.div
          className="relative z-10 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: TEAL }}>
            The World's Chokepoints
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-black leading-[0.95] mb-3 text-center" style={{ color: PARCHMENT }}>
            Five narrow passages.
          </h2>
          <h2 className="font-display text-3xl md:text-5xl font-black leading-[0.95] mb-10 text-center" style={{ color: TEAL }}>
            One global economy.
          </h2>

          <ChokepointComparison />
        </motion.div>
      </div>

      {/* Floating conclusion card */}
      <div className="relative z-10" style={{ marginTop: '-125vh' }}>
        <div className="h-screen" /> {/* spacer for scroll */}
        <div className="h-[125vh] flex items-center justify-center px-8">
          <motion.div
            className="max-w-md p-8 rounded-xl backdrop-blur-md text-center"
            style={{ background: 'hsla(215, 45%, 8%, 0.85)', border: `1px solid hsla(195, 55%, 35%, 0.1)` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
              Together, these five passages handle over <strong style={{ color: PARCHMENT }}>60% of global maritime trade</strong>.
              They were shaped by tectonic plates millions of years ago.
              Today they shape the fate of nations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
