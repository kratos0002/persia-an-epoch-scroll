import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { FissionFusionRace } from '@/components/visuals/FissionFusionRace';

const DRAGON_RED = 'hsl(0, 70%, 45%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

const steps = [
  <div key="split">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: DRAGON_RED }}>
      Nation Five · October 16, 1964
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      The <span style={{ color: DRAGON_RED }}>Dragon</span>
    </h2>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      China's nuclear program began with Soviet help — and accelerated after Soviet help vanished. In the 1950s, Moscow provided China with a research reactor, uranium enrichment technology, and a sample bomb design. Then, in 1959, Khrushchev withdrew all Soviet nuclear assistance as the Sino-Soviet split deepened. Soviet advisers packed up their blueprints and went home.
    </p>
  </div>,

  <div key="596">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      Mao Zedong responded with characteristic defiance. The nuclear program — now codenamed "Project 596," after the month of Soviet withdrawal — became a matter of national pride. China would build the bomb alone, even as the Great Leap Forward was starving millions.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The scientists worked in conditions that would have been unthinkable at Los Alamos or Arzamas-16. They were underfunded, politically persecuted, and isolated. Yet they had the physics — and they had the will.
    </p>
  </div>,

  <div key="test">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      On October 16, 1964, China detonated a 22-kiloton uranium device at the Lop Nur test site in Xinjiang. China was the fifth nuclear power — and the first to test in Asia.
    </p>
    <p className="font-body text-base leading-relaxed italic" style={{ color: LIGHT }}>
      "The atom bomb is a paper tiger."
    </p>
    <p className="font-body text-xs mt-1" style={{ color: STEEL }}>— Mao Zedong, 1946 (before China had one)</p>
  </div>,

  <div key="fusion">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      What stunned the world was what came next. Just 32 months after its first fission test, China detonated a thermonuclear device — a hydrogen bomb — in June 1967. This was the fastest fission-to-fusion sprint in history, faster than the United States, the Soviet Union, or Britain.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The message was unmistakable: China was not just catching up. In some dimensions of nuclear science, it was leaping ahead.
    </p>
  </div>,
];

export const ChinaSection = () => {
  return (
    <section id="china" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <FissionFusionRace activeStep={activeStep} />}
        steps={steps}
        className="min-h-[300vh]"
      />
    </section>
  );
};
