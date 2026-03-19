import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { FissionFusionRace } from '@/components/visuals/FissionFusionRace';
import { NewspaperClip } from '@/components/nuclear/NewspaperClip';

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
      China's nuclear program began with Soviet help — and accelerated after Soviet help vanished. In the 1950s, Moscow provided China with a research reactor, uranium enrichment technology, and a sample bomb design. Then, in 1959, Khrushchev withdrew all Soviet nuclear assistance as the <span style={{ color: LIGHT }}>Sino-Soviet split</span> deepened. Soviet advisers packed up their blueprints and went home.
    </p>
  </div>,

  <div key="596">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      <span style={{ color: LIGHT }}>Mao Zedong</span> responded with characteristic defiance. The nuclear program — now codenamed "<span style={{ color: LIGHT }}>Project 596</span>," after the month of Soviet withdrawal — became a matter of national pride. China would build the bomb alone, even as the <span style={{ color: LIGHT }}>Great Leap Forward</span> was starving millions.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The scientists worked in conditions that would have been unthinkable at Los Alamos or Arzamas-16. They were underfunded, politically persecuted, and isolated. Yet they had the physics — and they had the will.
    </p>
  </div>,

  <div key="test">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      On October 16, 1964, China detonated a <span style={{ color: LIGHT }}>22-kiloton</span> uranium device at the <span style={{ color: LIGHT }}>Lop Nur</span> test site in Xinjiang. China was the fifth nuclear power — and the <span style={{ color: LIGHT }}>first to test in Asia</span>.
    </p>
    <p className="font-body text-base leading-relaxed italic" style={{ color: LIGHT }}>
      "The atom bomb is a paper tiger."
    </p>
    <p className="font-body text-xs mt-1" style={{ color: STEEL }}>— Mao Zedong, 1946 (before China had one)</p>
  </div>,

  <div key="fusion">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      What stunned the world was what came next. Just <span style={{ color: LIGHT }}>32 months</span> after its first fission test, China detonated a <span style={{ color: LIGHT }}>thermonuclear device</span> — a hydrogen bomb — in June 1967. This was the <span style={{ color: LIGHT }}>fastest fission-to-fusion sprint in history</span>, faster than the United States, the Soviet Union, or Britain.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The message was unmistakable: China was not just catching up. In some dimensions of nuclear science, it was leaping ahead.
    </p>
    <NewspaperClip
      image="/images/nuclear/headline-1964-china.jpg"
      paper="人民日报 (People's Daily)"
      date="October 17, 1964"
      headline="CHINA EXPLODES FIRST ATOMIC BOMB"
      delay={0.5}
    />
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
