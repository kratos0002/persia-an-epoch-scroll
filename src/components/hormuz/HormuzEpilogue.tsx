import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 60%)';

export const HormuzEpilogue = () => {
  return (
    <section id="hormuz-epilogue" className="relative py-32 px-6" style={{ background: NAVY }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: SMOKE }}>
            Epilogue
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-4" style={{ color: PARCHMENT }}>
            The geography hasn't changed.
          </h2>
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-12" style={{ color: TEAL }}>
            The throat remains.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="font-body text-lg leading-relaxed text-center mb-8" style={{ color: SMOKE }}>
            Dilmun traders sailed through it five thousand years ago.
            Portuguese cannons guarded it five hundred years ago.
            American carriers patrol it today. The powers change.
            The strait does not.
          </p>
        </RevealOnScroll>

        {/* The 21 miles — stark visual */}
        <RevealOnScroll delay={0.4}>
          <div className="text-center mb-20 py-10" style={{ borderTop: '1px solid hsla(195, 55%, 35%, 0.15)', borderBottom: '1px solid hsla(195, 55%, 35%, 0.15)' }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-4" style={{ color: SMOKE }}>
              The constant
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="w-20 h-px" style={{ background: TEAL }} />
              <p className="font-display text-6xl md:text-7xl font-black" style={{ color: AMBER }}>
                21
              </p>
              <div className="w-20 h-px" style={{ background: TEAL }} />
            </div>
            <p className="font-body text-sm mt-2" style={{ color: SMOKE }}>
              miles — the same width for 3,000 years
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <p className="font-body text-lg leading-relaxed text-center mb-8" style={{ color: SMOKE }}>
            Every attempt to bypass the strait — pipelines through Saudi Arabia,
            alternative routes through Oman — has failed to replace it.
            The economics of tanker shipping always circle back
            to the same narrow passage between Iran and Oman.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <p className="font-body text-lg leading-relaxed text-center mb-16" style={{ color: SMOKE }}>
            So the carriers keep rotating. The fast boats keep buzzing.
            And twenty-one million barrels keep flowing through
            twenty-one miles of water, every single day.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-display text-xl md:text-2xl italic text-center leading-relaxed mb-2" style={{ color: PARCHMENT }}>
            "Empires rise and fall. Straits endure."
          </p>
          <p className="text-center text-xs font-body mt-4 mb-16" style={{ color: SMOKE }}>
            — The lesson of Hormuz
          </p>
        </RevealOnScroll>

        <EditionColophon essayId="hormuz" variant="dark" />
      </div>
    </section>
  );
};
