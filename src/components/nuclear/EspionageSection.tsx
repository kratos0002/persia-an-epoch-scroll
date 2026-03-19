import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { SpyNetwork } from '@/components/visuals/SpyNetwork';
import { NewspaperClip } from '@/components/nuclear/NewspaperClip';

const RED = 'hsl(0, 70%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

const steps = [
  <div key="fuchs">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: RED }}>
      Nation Two · August 29, 1949
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      <span style={{ color: RED }}>Espionage</span>
    </h2>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      <span style={{ color: LIGHT }}>Klaus Fuchs</span> was a German-born physicist who had fled to Britain, been interned as an enemy alien, then recruited to work on the British bomb project. When the British team joined the Manhattan Project, Fuchs went with them — and began passing every detail of the <span style={{ color: LIGHT }}>implosion design</span> to his Soviet handler.
    </p>
  </div>,

  <div key="hall">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      <span style={{ color: LIGHT }}>Ted Hall</span> was even more remarkable: the <span style={{ color: LIGHT }}>youngest scientist at Los Alamos, just nineteen</span> when he arrived. Hall independently decided that an American nuclear monopoly was too dangerous and volunteered his services to Soviet intelligence. He was never caught.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      <span style={{ color: LIGHT }}>The Rosenbergs</span> were the couriers, the human links in a chain that stretched from the desert of New Mexico to the laboratories of the Soviet Union.
    </p>
  </div>,

  <div key="rds-1">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      <span style={{ color: LIGHT }}>Igor Kurchatov</span>, the director of the Soviet bomb program, later admitted that the espionage saved them <span style={{ color: LIGHT }}>at least two years</span>. The first Soviet device — "<span style={{ color: LIGHT }}>RDS-1</span>," detonated on August 29, 1949 — was a <span style={{ color: LIGHT }}>near-exact copy</span> of the American "Fat Man" design. The Americans had expected a Soviet bomb by 1953 or 1954. They got it in <span style={{ color: LIGHT }}>1949</span>.
    </p>
    <p className="font-body text-base leading-relaxed italic" style={{ color: LIGHT }}>
      "The secret of the atomic bomb is how easy it is to make one once you know it can be done."
    </p>
    <p className="font-body text-xs mt-1" style={{ color: STEEL }}>— Leo Szilard</p>
  </div>,

  <div key="compression">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      The American monopoly lasted <span style={{ color: LIGHT }}>exactly four years</span>, <span style={{ color: LIGHT }}>three years less than anyone in Washington had predicted</span>. The chain reaction had begun — and it would never stop. Every subsequent proliferator would learn from the ones before, each shortening the timeline further.
    </p>
    <div className="mt-6 pt-4" style={{ borderTop: `1px solid hsl(0, 20%, 20%)` }}>
      <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-2" style={{ color: STEEL }}>RDS-1 — Yield</p>
      <p className="font-display text-4xl font-black" style={{ color: RED }}>22 kilotons</p>
    </div>
    <NewspaperClip
      paper="The New York Times"
      date="September 24, 1949"
      headline="TRUMAN SAYS RUSSIA SET OFF ATOM BLAST"
      subheadline="President's announcement stuns capital — Soviet test believed conducted in recent weeks"
      delay={0.5}
    />
  </div>,
];

export const EspionageSection = () => {
  return (
    <section id="espionage" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <SpyNetwork activeStep={activeStep} />}
        steps={steps}
        className="min-h-[300vh]"
      />
    </section>
  );
};
