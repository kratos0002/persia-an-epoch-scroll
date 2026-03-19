import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { WarheadCounter } from '@/components/visuals/WarheadCounter';
import { ProliferationMap } from '@/components/visuals/ProliferationMap';
import { EditionColophon } from '@/components/scroll/EditionColophon';

const BUNKER = 'hsl(200, 25%, 6%)';
const GEIGER = 'hsl(140, 70%, 45%)';
const URANIUM = 'hsl(45, 80%, 55%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

const STOCKPILES = [
  { nation: 'Russia', count: 5580, color: 'hsl(0, 65%, 50%)' },
  { nation: 'United States', count: 5044, color: 'hsl(220, 60%, 50%)' },
  { nation: 'China', count: 500, color: 'hsl(0, 70%, 45%)' },
  { nation: 'France', count: 290, color: 'hsl(220, 50%, 55%)' },
  { nation: 'United Kingdom', count: 225, color: 'hsl(210, 50%, 40%)' },
  { nation: 'Pakistan', count: 170, color: 'hsl(150, 60%, 35%)' },
  { nation: 'India', count: 172, color: 'hsl(25, 80%, 50%)' },
  { nation: 'Israel (est.)', count: 90, color: 'hsl(220, 20%, 55%)' },
  { nation: 'North Korea (est.)', count: 50, color: 'hsl(45, 80%, 55%)' },
];

export const NuclearEpilogue = () => {
  return (
    <section id="nuclear-epilogue" className="relative py-32 px-6" style={{ background: BUNKER }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: STEEL }}>
            Epilogue
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-4" style={{ color: LIGHT }}>
            The Chain
          </h2>
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-12" style={{ color: GEIGER }}>
            Continues
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="font-body text-lg leading-relaxed text-center mb-20" style={{ color: STEEL }}>
            As of 2025, nine nations possess approximately 12,121 nuclear warheads.
            That number is falling — down from a Cold War peak of over 60,000 — but the
            technology continues to spread, the weapons grow more precise, and the
            treaties designed to contain them are fraying.
          </p>
        </RevealOnScroll>

        {/* Warhead stockpile grid */}
        <RevealOnScroll>
          <div className="mb-20">
            <p className="text-[9px] tracking-[0.3em] uppercase font-body text-center mb-8" style={{ color: STEEL }}>
              Estimated nuclear warheads by country · 2025
            </p>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 md:gap-8">
              {STOCKPILES.map((s) => (
                <WarheadCounter key={s.nation} nation={s.nation} count={s.count} color={s.color} />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Proliferation chain map */}
        <RevealOnScroll>
          <div className="mb-20 -mx-6 md:-mx-12">
            <ProliferationMap />
          </div>
        </RevealOnScroll>

        {/* Total */}
        <RevealOnScroll>
          <div className="text-center mb-20 py-10" style={{ borderTop: `1px solid hsl(140, 20%, 12%)`, borderBottom: `1px solid hsl(140, 20%, 12%)` }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-4" style={{ color: STEEL }}>
              Total estimated warheads worldwide
            </p>
            <p className="font-display text-5xl md:text-7xl font-black" style={{ color: GEIGER }}>
              12,121
            </p>
            <p className="font-body text-base mt-2" style={{ color: STEEL, opacity: 0.7 }}>
              enough to destroy civilization several times over
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="font-body text-lg leading-relaxed mb-8" style={{ color: STEEL }}>
            The chain reaction that began in a New Mexico desert in 1945 has not stopped.
            It spread through espionage to Moscow, through imperial pride to London and Paris,
            through revolutionary defiance to Beijing, through regional rivalry to New Delhi
            and Islamabad, through dynastic survival to Pyongyang, and through existential
            fear to a facility in the Negev that no one will confirm exists.
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <p className="font-body text-lg leading-relaxed mb-16" style={{ color: STEEL }}>
            Each nation had its own reasons. Each believed the bomb would make it safer.
            And each, by building it, made the next nation's decision a little easier to justify —
            because the logic of deterrence is a chain, and chains only run in one direction.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <motion.blockquote
            className="font-display text-xl md:text-2xl italic text-center leading-relaxed mb-4"
            style={{ color: LIGHT }}
          >
            "I know not with what weapons World War III will be fought,
            but World War IV will be fought with sticks and stones."
          </motion.blockquote>
          <p className="text-center text-xs font-body mb-16" style={{ color: STEEL }}>
            — Albert Einstein
          </p>
        </RevealOnScroll>

        <EditionColophon essayId="nuclear" variant="dark" />
      </div>
    </section>
  );
};
