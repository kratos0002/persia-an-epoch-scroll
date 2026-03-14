import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { ChokepointComparison } from '@/components/visuals/ChokepointComparison';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const ChokepointsSection = () => {
  return (
    <section id="chokepoints" className="relative min-h-screen py-32 px-6" style={{ background: NAVY }}>
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: TEAL }}>
            The World's Chokepoints
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-4 text-center" style={{ color: PARCHMENT }}>
            Five narrow passages.
          </h2>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-12 text-center" style={{ color: TEAL }}>
            One global economy.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-12 max-w-2xl mx-auto text-center" style={{ color: SMOKE }}>
            Hormuz is not alone. The modern global economy depends on five maritime chokepoints —
            narrow passages where geography concentrates all traffic into a single killzone.
            Block any one of them, and supply chains shatter.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <ChokepointComparison />
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-body text-lg leading-relaxed mt-12 max-w-2xl mx-auto text-center" style={{ color: SMOKE }}>
            Together, these five passages handle over <strong style={{ color: PARCHMENT }}>60% of global maritime trade</strong>.
            They were shaped by tectonic plates millions of years ago.
            Today they shape the fate of nations.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
