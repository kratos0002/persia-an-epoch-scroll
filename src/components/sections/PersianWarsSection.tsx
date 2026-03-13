import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { PersianWarsBattleExplorer } from '@/components/visuals/PersianWarsBattleExplorer';
import { EraWaypoint } from '@/components/visuals/EraWaypoint';
import { ERA_COLORS } from '@/data/eras';

export const PersianWarsSection = () => (
  <section id="persian-wars" style={{ '--era-primary': ERA_COLORS.achaemenid } as React.CSSProperties}>
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.3em] uppercase text-[hsl(43,85%,55%,0.6)] mb-4">499–449 BCE</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
          The Persian Wars
        </h2>
        <p className="text-foreground/80 text-xl leading-relaxed font-body mb-4 max-w-2xl">
          The clash that defined Western civilization's founding myth.
        </p>
        <p className="text-foreground/50 text-lg font-body max-w-2xl">
          But the story the Greeks told wasn't the whole story.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.12}>
        <PersianWarsBattleExplorer />
      </RevealOnScroll>
    </div>

    <EraWaypoint activeIndex={3} label="The Conqueror Arrives" year="334 BCE" />
  </section>
);
