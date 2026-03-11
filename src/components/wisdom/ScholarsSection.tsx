import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';

const scholars = [
  {
    name: 'al-Khwārizmī',
    field: 'Mathematics',
    years: 'c. 780–850',
    contribution: 'Invented algebra. The word "algorithm" is a corruption of his name.',
    hook: 'Every computer program on Earth runs on his idea.',
  },
  {
    name: 'al-Kindī',
    field: 'Philosophy & Cryptanalysis',
    years: 'c. 801–873',
    contribution: 'First to develop frequency analysis for breaking ciphers.',
    hook: 'He cracked codes that wouldn\'t be officially solved for 600 more years.',
  },
  {
    name: 'Banū Mūsā Brothers',
    field: 'Engineering & Automata',
    years: 'c. 803–873',
    contribution: 'Built programmable machines and self-operating musical instruments.',
    hook: 'Robots — in the 9th century.',
  },
  {
    name: 'al-Rāzī',
    field: 'Medicine & Chemistry',
    years: 'c. 854–925',
    contribution: 'First to distinguish between smallpox and measles. Pioneered clinical trials.',
    hook: 'He ran the world\'s first hospital entrance exam — for doctors.',
  },
  {
    name: 'Ibn al-Haytham',
    field: 'Optics & Scientific Method',
    years: 'c. 965–1040',
    contribution: 'Proved light enters the eye (not the reverse). Founded experimental optics.',
    hook: 'The father of the scientific method — 600 years before Galileo.',
  },
];

export const ScholarsSection = () => (
  <section id="scholars" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-8">
      <RevealOnScroll className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>
          THE POLYMATHS
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: `hsl(${WISDOM_TEAL})` }}>
          The Scholars
        </h2>
        <p className="text-foreground/50 text-lg font-body max-w-xl mx-auto">
          They worked in the same building. They argued. They collaborated. They changed everything.
        </p>
      </RevealOnScroll>

      {scholars.map((s, i) => (
        <RevealOnScroll key={s.name} delay={0.08 * i}>
          <div
            className="border-l-2 pl-6 py-5 rounded-r-lg transition-colors"
            style={{ borderColor: `hsl(${WISDOM_TEAL} / 0.4)` }}
          >
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="font-display text-xl font-bold" style={{ color: `hsl(${WISDOM_TEAL})` }}>
                {s.name}
              </h3>
              <span className="text-xs tracking-[0.12em] uppercase font-body text-foreground/40">
                {s.field} · {s.years}
              </span>
            </div>
            <p className="text-foreground/70 font-body text-base leading-relaxed mb-2">
              {s.contribution}
            </p>
            <p className="text-[hsl(43,85%,55%)] font-body text-sm italic">
              {s.hook}
            </p>
          </div>
        </RevealOnScroll>
      ))}
    </div>

    <EraTransition fromColor={WISDOM_TEAL} toColor={WISDOM_TEAL} year="900 CE" label="What They Built" />
  </section>
);
