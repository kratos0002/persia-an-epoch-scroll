import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';

const RED = 'hsl(0, 65%, 48%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';

const steps = [
  <div key="w1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: RED }}>
      October 1813
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Battle of Nations
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      At Leipzig, every nation in Europe turned against France at once. 
      365,000 coalition troops against 195,000 French. Watch the board — 
      every block turns red. Even Bavaria, his loyal ally, switched sides mid-battle.
    </p>
  </div>,
  <div key="w2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Exile to Elba
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Paris fell in March 1814. Napoleon abdicated and was exiled to Elba — 
      a tiny island off the Italian coast. The Bourbons returned. Europe breathed. 
      But Napoleon was watching, waiting, 
      and the restored king was already making himself hated.
    </p>
  </div>,
  <div key="w3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Hundred Days
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      He escaped. He landed in southern France with 1,000 men. 
      Every regiment sent to stop him joined him instead. 
      In 20 days he was back in Paris. In 100 days he was at Waterloo.
    </p>
  </div>,
  <div key="w4">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: RED }}>
      June 18, 1815
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Waterloo
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Rain delayed his attack by hours. Blücher's Prussians arrived in time. 
      Wellington held the line. By evening, the Grande Armée broke for the last time. 
      The board is empty now. France stands alone — small, gray, finished.
    </p>
    <p className="font-display text-lg italic mt-4" style={{ color: RED }}>
      "The nearest run thing you ever saw in your life." — Wellington
    </p>
  </div>,
];

export const WaterlooSection = () => {
  return (
    <section id="waterloo" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={(step) => <CoalitionBoard phase={step <= 0 ? 7 : 8} />}
        steps={steps}
      />
    </section>
  );
};
