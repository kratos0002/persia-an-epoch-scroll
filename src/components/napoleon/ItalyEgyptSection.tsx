import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';

const GOLD = 'hsl(43, 70%, 50%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';

const steps = [
  <div key="i1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: GOLD }}>
      1796 — Northern Italy
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Italian Campaigns
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Given command of a starving, demoralized army, Bonaparte turned it into the most dangerous force in Europe. 
      In 11 months he fought 67 actions, won 18 pitched battles, and knocked Austria out of Italy.
    </p>
  </div>,
  <div key="i2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Italy Falls into Orbit
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Watch the board — the Italian states flip gold. Not conquered exactly, but reorganized, 
      renamed, reformed into sister republics loyal to France. A pattern that would repeat across Europe.
    </p>
  </div>,
  <div key="i3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Egypt — Ambition Beyond Europe
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      With Britain unreachable by land, Napoleon sailed to Egypt — to cut Britain's route to India, 
      to walk where Caesar walked, to bring 167 scholars to study the Sphinx. 
      The campaign failed militarily. But Napoleon returned to France as a legend.
    </p>
  </div>,
];

export const ItalyEgyptSection = () => {
  return (
    <section id="italy-egypt" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={(step) => <CoalitionBoard phase={step === 0 ? 2 : 3} />}
        steps={steps}
      />
    </section>
  );
};
