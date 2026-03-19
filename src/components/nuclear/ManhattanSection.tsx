import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { TrinityFireball } from '@/components/visuals/TrinityFireball';
import { NewspaperClip } from '@/components/nuclear/NewspaperClip';

const GEIGER = 'hsl(140, 70%, 45%)';
const URANIUM = 'hsl(50, 90%, 55%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

const steps = [
  <div key="einstein">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: GEIGER }}>
      Nation One · July 16, 1945
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      <span style={{ color: URANIUM }}>Trinity</span>
    </h2>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      It began with a letter. In August 1939, <span style={{ color: LIGHT }}>Albert Einstein</span> — a pacifist who had fled Nazi Germany — signed a letter to President Roosevelt warning that Germany might develop an atomic bomb. The letter triggered a chain reaction of its own: the creation of the <span style={{ color: LIGHT }}>Manhattan Project</span>, the largest secret scientific endeavor in human history.
    </p>
  </div>,

  <div key="los-alamos">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      At its peak, the Manhattan Project employed over <span style={{ color: LIGHT }}>125,000 people</span> across thirty sites in the United States, Britain, and Canada. The total cost was nearly <span style={{ color: LIGHT }}>$2 billion</span> — roughly <span style={{ color: LIGHT }}>$30 billion</span> in today's money. Most of the workers had no idea what they were building.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The core work happened at <span style={{ color: LIGHT }}>Los Alamos, New Mexico</span>, where <span style={{ color: LIGHT }}>J. Robert Oppenheimer</span> assembled the greatest concentration of scientific talent ever gathered in one place. They were building a weapon that existed only in theory.
    </p>
  </div>,

  <div key="trinity">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      At <span style={{ color: LIGHT }}>5:29 a.m. on July 16, 1945</span>, the world's first nuclear device detonated in the New Mexico desert. The flash was visible <span style={{ color: LIGHT }}>200 miles away</span>. The mushroom cloud rose to <span style={{ color: LIGHT }}>40,000 feet</span>. The sand beneath the tower fused into a new mineral — <span style={{ color: LIGHT }}>trinitite</span>.
    </p>
    <p className="font-body text-base leading-relaxed italic" style={{ color: LIGHT }}>
      "Now I am become Death, the destroyer of worlds."
    </p>
    <p className="font-body text-xs mt-1" style={{ color: STEEL }}>
      — J. Robert Oppenheimer
    </p>
  </div>,

  <div key="aftermath">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      Three weeks later, "<span style={{ color: LIGHT }}>Little Boy</span>" destroyed <span style={{ color: LIGHT }}>Hiroshima</span>. Three days after that, "<span style={{ color: LIGHT }}>Fat Man</span>" destroyed <span style={{ color: LIGHT }}>Nagasaki</span>. Between them, the two bombs killed over <span style={{ color: LIGHT }}>200,000 people</span>. Japan surrendered. The atomic age had begun — and the United States was, for <span style={{ color: LIGHT }}>exactly four years</span>, the <span style={{ color: LIGHT }}>only nuclear power on Earth</span>.
    </p>
    <div className="mt-6 pt-4" style={{ borderTop: `1px solid hsl(140, 20%, 15%)` }}>
      <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-2" style={{ color: STEEL }}>Trinity Test — Yield</p>
      <p className="font-display text-4xl font-black" style={{ color: URANIUM }}>21 kilotons</p>
    </div>
    <NewspaperClip
      image="/images/nuclear/headline-1945-latimes.jpg"
      paper="Los Angeles Times"
      date="August 7, 1945"
      headline="ATOMIC BOMB HITS JAPAN"
      delay={0.5}
    />
  </div>,
];

export const ManhattanSection = () => {
  return (
    <section id="manhattan" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <TrinityFireball activeStep={activeStep} />}
        steps={steps}
        className="min-h-[300vh]"
      />
    </section>
  );
};
