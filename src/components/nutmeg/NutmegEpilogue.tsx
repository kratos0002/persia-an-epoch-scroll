import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';

const OCEAN = 'hsl(210, 40%, 8%)';
const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const NutmegEpilogue = () => {
  return (
    <section id="nutmeg-epilogue" className="relative py-32 px-6" style={{ background: OCEAN }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: SMOKE }}>
            Epilogue
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-4" style={{ color: PARCHMENT }}>
            The spice lost its value.
          </h2>
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-12" style={{ color: SAFFRON }}>
            The island kept its scars.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="font-body text-lg leading-relaxed text-center mb-8" style={{ color: SMOKE }}>
            In 1770, a French botanist named Pierre Poivre smuggled nutmeg seedlings
            out of the Banda Islands and planted them in Mauritius.
            The Dutch monopoly collapsed within a generation.
          </p>
        </RevealOnScroll>

        {/* The absurd comparison */}
        <RevealOnScroll delay={0.4}>
          <div className="text-center mb-20 py-10" style={{ borderTop: '1px solid hsl(25, 25%, 18%)', borderBottom: '1px solid hsl(25, 25%, 18%)' }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-4" style={{ color: SMOKE }}>
              Today
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div>
                <p className="font-display text-5xl md:text-6xl font-black" style={{ color: SAFFRON }}>
                  $8
                </p>
                <p className="font-body text-sm mt-1" style={{ color: SMOKE }}>
                  per pound of nutmeg
                </p>
              </div>
              <div className="font-display text-2xl" style={{ color: SMOKE }}>vs</div>
              <div>
                <p className="font-display text-5xl md:text-6xl font-black" style={{ color: 'hsl(210, 60%, 40%)' }}>
                  $1.7T
                </p>
                <p className="font-body text-sm mt-1" style={{ color: SMOKE }}>
                  value of Manhattan
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <p className="font-body text-lg leading-relaxed text-center mb-8" style={{ color: SMOKE }}>
            Run island today has no airport, no harbour, and fewer than 2,000 inhabitants.
            The Dutch fort is rubble. The nutmeg trees still grow,
            but nobody fights over them anymore.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <p className="font-body text-lg leading-relaxed text-center mb-16" style={{ color: SMOKE }}>
            Manhattan has 1.6 million people, the world's financial center,
            and real estate worth more than most countries.
            All because the Dutch thought nutmeg was the better deal.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-display text-xl md:text-2xl italic text-center leading-relaxed mb-2" style={{ color: PARCHMENT }}>
            "Empires are built on what people believe is valuable.
            They collapse when they're wrong."
          </p>
          <p className="text-center text-xs font-body mt-4 mb-16" style={{ color: SMOKE }}>
            — The lesson of nutmeg
          </p>
        </RevealOnScroll>

        <EditionColophon essayId="nutmeg" variant="dark" />
      </div>
    </section>
  );
};
