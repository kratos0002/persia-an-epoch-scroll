import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { LEGACY_ITEMS } from '@/components/visuals/napoleonData';

const MIDNIGHT = 'hsl(225, 30%, 7%)';
const GOLD = 'hsl(43, 70%, 50%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';

export const NapoleonEpilogue = () => {
  return (
    <section id="napoleon-epilogue" className="relative min-h-screen py-32 px-6" style={{ background: MIDNIGHT }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: SMOKE }}>
            Epilogue
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-center mb-4" style={{ color: PARCHMENT }}>
            The Emperor fell.
          </h2>
          <h2 className="font-display text-4xl md:text-5xl font-black text-center mb-12" style={{ color: GOLD }}>
            The ideas didn't.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="font-body text-lg leading-relaxed text-center mb-16" style={{ color: SMOKE }}>
            Napoleon died on St. Helena in 1821, a prisoner of the British. 
            But what he built — and what he broke — reshaped the world permanently.
          </p>
        </RevealOnScroll>

        {/* Legacy items */}
        <div className="space-y-6">
          {LEGACY_ITEMS.map((item, i) => (
            <RevealOnScroll key={item.title} delay={0.1 * i}>
              <motion.div
                className="p-6 rounded-lg"
                style={{
                  background: 'hsl(225, 25%, 11%)',
                  borderLeft: `3px solid ${GOLD}`,
                }}
              >
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: GOLD }}>
                  {item.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
                  {item.desc}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.4}>
          <p className="font-display text-xl italic text-center mt-16" style={{ color: PARCHMENT }}>
            "I closed the gulf of anarchy and brought order out of chaos. 
            I rewarded merit regardless of birth. I governed for the greatest number."
          </p>
          <p className="text-center text-xs font-body mt-4" style={{ color: SMOKE }}>
            — Napoleon, dictated at St. Helena
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
