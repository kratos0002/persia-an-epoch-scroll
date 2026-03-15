import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { ChokepointComparison } from '@/components/visuals/ChokepointComparison';
import { HZ } from '@/components/visuals/hormuzMapData';

export const ChokepointsSection = () => (
  <section id="chokepoints" className="relative py-32 md:py-48 px-6" style={{ background: HZ.NAVY }}>
    <div className="max-w-5xl mx-auto">
      <RevealOnScroll>
        <p className="text-[10px] tracking-[0.4em] uppercase font-body font-semibold mb-4 text-center" style={{ color: HZ.SMOKE }}>
          Comparative
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-black text-center mb-4" style={{ color: HZ.PARCHMENT }}>
          The World's Chokepoints
        </h2>
        <p className="font-body text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto mb-16" style={{ color: HZ.SMOKE }}>
          The global economy flows through five narrow passages — each shaped by tectonic plates millions of years ago, each fought over by empires for centuries. Hormuz carries more oil than any of them.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.3}>
        <ChokepointComparison />
      </RevealOnScroll>

      <RevealOnScroll delay={0.5}>
        <p className="font-body text-sm leading-relaxed text-center max-w-xl mx-auto mt-16" style={{ color: HZ.SMOKE }}>
          Together, these five passages carry the majority of the world's maritime trade. Close any one of them, and global supply chains convulse. Close Hormuz, and the world's energy supply drops by a fifth overnight. No chokepoint carries more consequence per mile of water.
        </p>
      </RevealOnScroll>
    </div>
  </section>
);
