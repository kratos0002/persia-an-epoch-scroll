import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { ScholarSpotlight } from '@/components/visuals/ScholarSpotlight';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';

export const ScholarsSection = () => (
  <section id="scholars" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => <ScholarSpotlight activeStep={activeStep} />}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>THE POLYMATHS</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: `hsl(${WISDOM_TEAL})` }}>
            al-Khwārizmī
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            Invented algebra. The word "algorithm" is a corruption of his name.
          </p>
          <p className="text-[hsl(43,85%,55%)] font-body text-sm italic">
            Every computer program on Earth runs on his idea.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-2xl font-bold mb-4" style={{ color: `hsl(200, 45%, 50%)` }}>
            al-Kindī
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            First to develop frequency analysis for breaking ciphers. The founder of cryptanalysis.
          </p>
          <p className="text-[hsl(43,85%,55%)] font-body text-sm italic">
            He cracked codes that wouldn't be officially solved for 600 more years.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-2xl font-bold mb-4" style={{ color: `hsl(30, 50%, 50%)` }}>
            Banū Mūsā Brothers
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Built programmable machines and self-operating musical instruments. Automata — in the 9th century.
          </p>
          <p className="text-[hsl(43,85%,55%)] font-body text-sm italic">
            Robots — 1,100 years before Boston Dynamics.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-2xl font-bold mb-4" style={{ color: `hsl(150, 45%, 45%)` }}>
            al-Rāzī
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            First to distinguish between smallpox and measles. Pioneered controlled experiments and clinical trials.
          </p>
          <p className="text-[hsl(43,85%,55%)] font-body text-sm italic">
            He ran the world's first hospital entrance exam — for doctors.
          </p>
        </div>,
        <div key={4}>
          <h3 className="font-display text-2xl font-bold mb-4" style={{ color: `hsl(215, 50%, 50%)` }}>
            Ibn al-Haytham
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Proved light enters the eye (not the reverse). Founded experimental optics and the scientific method.
          </p>
          <p className="text-[hsl(43,85%,55%)] font-body text-sm italic">
            The father of the scientific method — 600 years before Galileo.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={WISDOM_TEAL} toColor={WISDOM_TEAL} year="900 CE" label="What They Built" />
  </section>
);
