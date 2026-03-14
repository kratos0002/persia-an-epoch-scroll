import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const AncientGulfSection = () => {
  return (
    <section id="ancient-gulf" className="relative min-h-screen flex items-center justify-center py-32 px-6" style={{ background: NAVY }}>
      <div className="relative z-10 max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: TEAL }}>
            ~3000 BCE — The Prize
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            The Gulf was always<br />
            <span style={{ color: AMBER }}>the prize.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            Five thousand years ago, the island of <strong style={{ color: AMBER }}>Dilmun</strong> — modern Bahrain —
            sat at the centre of the known world's richest trade network. Copper from Oman.
            Lapis lazuli from Afghanistan. Pearls from the Gulf's own oyster beds.
            Everything flowed through this shallow, warm sea.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <p className="font-body text-lg leading-relaxed mb-10" style={{ color: SMOKE }}>
            The Sumerians called Dilmun <em style={{ color: PARCHMENT }}>"the place where the sun rises"</em> —
            a paradise of fresh water in a salt sea. But paradise sat at the mouth of a funnel.
            Every ship entering or leaving the Gulf had to pass through the same narrow throat
            between the Arabian and Iranian coasts.
          </p>
        </RevealOnScroll>

        {/* Visual: trade routes */}
        <RevealOnScroll delay={0.6}>
          <div className="my-12 py-10 text-center rounded-xl" style={{
            background: 'hsl(215, 40%, 6%)',
            border: '1px solid hsla(195, 55%, 35%, 0.1)',
          }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6" style={{ color: SMOKE }}>
              Ancient Gulf Trade — at its peak
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div>
                <p className="font-display text-4xl md:text-5xl font-black" style={{ color: AMBER }}>
                  <AnimatedCounter end={5000} duration={2000} />
                </p>
                <p className="font-body text-sm mt-1" style={{ color: SMOKE }}>years of continuous trade</p>
              </div>
              <div className="w-px h-10 hidden md:block" style={{ background: 'hsla(195, 55%, 35%, 0.2)' }} />
              <div>
                <p className="font-display text-4xl md:text-5xl font-black" style={{ color: TEAL }}>
                  21
                </p>
                <p className="font-body text-sm mt-1" style={{ color: SMOKE }}>miles — width of the strait</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            Control the strait and you controlled the trade. The Persians understood this.
            The Achaemenids built ports on both shores. The Sassanids fortified the islands.
            When the Islamic conquests swept east, the first thing the caliphs secured
            was the Gulf — because whoever held it controlled the flow of goods
            between India, Arabia, and Mesopotamia.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-display text-2xl md:text-3xl italic text-center" style={{ color: TEAL }}>
            "Geography does not change. What changes is who controls it."
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
