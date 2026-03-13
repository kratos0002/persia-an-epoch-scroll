import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { SpicePriceChart } from '@/components/visuals/SpicePriceChart';

const OCEAN = 'hsl(210, 40%, 8%)';
const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const SeedSection = () => {
  return (
    <section id="the-seed" className="relative min-h-screen flex items-center justify-center py-32 px-6" style={{ background: OCEAN }}>
      <div className="relative z-10 max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: SPICE }}>
            The Seed — Worth More Than Gold
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            A nut so valuable<br />
            <span style={{ color: SAFFRON }}>men killed for it.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            Nutmeg. A wrinkled brown seed the size of an olive. In medieval Europe, it was believed to cure the plague,
            ward off evil spirits, and ignite passion. Doctors prescribed it. Priests blessed it.
            Kings hoarded it.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <p className="font-body text-lg leading-relaxed mb-10" style={{ color: SMOKE }}>
            By the 1500s, a bag of nutmeg bought in the Banda Islands for a few pennies
            could be sold in London for <strong style={{ color: SAFFRON }}>60,000 percent profit</strong>.
            Ounce for ounce, it was more valuable than gold.
          </p>
        </RevealOnScroll>

        {/* Price comparison visual */}
        <RevealOnScroll delay={0.6}>
          <div className="my-12">
            <SpicePriceChart />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            And it grew in only one place on Earth: a chain of ten tiny volcanic islands
            in the Banda Sea, east of Java, at the end of the known world.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-display text-2xl md:text-3xl italic text-center" style={{ color: SPICE }}>
            "Whoever controlled those islands controlled the world's supply."
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
