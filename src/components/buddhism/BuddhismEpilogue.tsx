import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { BranchingTree } from '@/components/visuals/BranchingTree';
import { SiteFooter } from '@/components/site/SiteFooter';

const SAFFRON = '30 65% 45%';
const GOLD = '43 70% 55%';

export const BuddhismEpilogue = () => (
  <section id="buddhism-epilogue" className="relative">
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      {/* Pulsing tree */}
      <div className="w-full max-w-md h-80 mb-12">
        <BranchingTree activePhase={3} progress={1} />
      </div>

      <RevealOnScroll className="text-center max-w-2xl">
        <h2 className="font-display text-4xl md:text-5xl font-black mb-6" style={{ color: `hsl(${GOLD})` }}>
          One teaching,<br />a thousand forms.
        </h2>
        <p className="font-body text-lg leading-relaxed text-foreground/60 mb-8">
          A prince sat under a tree 2,500 years ago and asked why we suffer. His answer split into paths that reached every corner of Asia and, eventually, the world. Theravada preserved the letter. Mahayana expanded the spirit. Vajrayana accelerated the practice. Zen distilled it to silence.
        </p>
        <p className="font-body text-lg leading-relaxed text-foreground/60 mb-8">
          Each branch adapted to its soil — absorbing Shinto in Japan, Bon in Tibet, Confucianism in China, animism in Southeast Asia. And yet the root diagnosis remains: craving causes suffering, and awareness is the cure.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2} className="text-center max-w-lg mt-8">
        <p className="font-body text-sm italic text-foreground/30">
          "The finger pointing at the moon is not the moon."
        </p>
        <p className="font-body text-xs text-foreground/20 mt-2">
          — Traditional Zen saying
        </p>
      </RevealOnScroll>
    </div>

    <SiteFooter />
  </section>
);
