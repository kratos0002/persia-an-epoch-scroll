import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';
import { RM } from '@/components/visuals/ramayanaMapData';

export const RamayanaEpilogue = () => {
  return (
    <section id="ramayana-epilogue" className="relative py-32 px-6" style={{ background: RM.EARTH }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-8" style={{ color: RM.SAFFRON, opacity: 0.5 }}>
            Epilogue
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: RM.SANDSTONE }}>
            The Story That Traveled
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <p className="font-body text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
            The route you just traced is remembered differently in every region it passes through.
            In Thailand, it is the <em>Ramakien</em>. In Indonesia, the <em>Kakawin Ramayana</em>.
            In Cambodia, it adorns the walls of Angkor Wat. In Japan, fragments survive in Buddhist texts.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="font-body text-base leading-relaxed mb-12" style={{ color: 'rgba(255,255,255,0.65)' }}>
            The geography matters because the story is not abstract. It is tied to rivers you can visit,
            mountains you can climb, and a bridge whose remains you can see from space.
            Part 1 traced the route. Part 2 will trace the tellings — how one story became a thousand.
          </p>
        </RevealOnScroll>

        {/* Part 2 teaser */}
        <RevealOnScroll delay={0.4}>
          <div className="rounded-xl p-8 text-center" style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid hsla(25,85%,52%,0.2)`,
          }}>
            <p className="text-[10px] tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: RM.SAFFRON, opacity: 0.5 }}>
              Coming Next
            </p>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: RM.SANDSTONE }}>
              Part 2 — The Tellings
            </h3>
            <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              How one story crossed oceans and became a thousand traditions.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-16">
          <EditionColophon essayId="ramayana" variant="dark" />
        </div>
      </div>
    </section>
  );
};
