import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';
import { RM } from '@/components/visuals/ramayanaMapData';

export const RamayanaEpilogue = () => {
  return (
    <section id="ramayana-epilogue" className="relative py-32 px-6" style={{ background: RM.PARCHMENT }}>
      {/* Paper grain */}
      <div className="absolute inset-0 ramayana-paper-grain pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-8" style={{ color: RM.VERMILLION, opacity: 0.6 }}>
            Epilogue
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: RM.INK }}>
            The Story That Traveled
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <p className="font-body text-base leading-relaxed mb-6" style={{ color: `${RM.INK}cc` }}>
            The route you just traced is remembered differently in every region it passes through.
            In Thailand, it is the <em>Ramakien</em>. In Indonesia, the <em>Kakawin Ramayana</em>.
            In Cambodia, it adorns the walls of Angkor Wat. In Japan, fragments survive in Buddhist texts.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="font-body text-base leading-relaxed mb-12" style={{ color: `${RM.INK}cc` }}>
            The geography matters because the story is not abstract. It is tied to rivers you can visit,
            mountains you can climb, and a bridge whose remains you can see from space.
            Part 1 traced the route. Part 2 will trace the tellings — how one story became a thousand.
          </p>
        </RevealOnScroll>

        {/* Part 2 teaser */}
        <RevealOnScroll delay={0.4}>
          <div className="p-8 text-center" style={{
            background: 'hsla(38, 40%, 82%, 0.4)',
            border: `2px solid ${RM.GOLD_LEAF}40`,
          }}>
            <p className="text-[10px] tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: RM.VERMILLION, opacity: 0.6 }}>
              Coming Next
            </p>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: RM.INK }}>
              Part 2 — The Tellings
            </h3>
            <p className="font-body text-sm" style={{ color: RM.BURNT_UMBER, opacity: 0.7 }}>
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
