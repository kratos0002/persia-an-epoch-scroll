import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';

const GOLD = 'hsl(43, 70%, 50%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';

const steps = [
  <div key="e1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: GOLD }}>
      December 2, 1804
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Coronation
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      He took the crown from the Pope's hands and placed it on his own head. 
      No one would give Napoleon power — he would take it himself. 
      The Republic was dead. The Empire had begun.
    </p>
  </div>,
  <div key="e2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Empire Expands
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      France's borders pushed outward. Holland, the Rhineland, northern Italy — 
      absorbed directly or turned into satellite kingdoms ruled by Napoleon's brothers. 
      Watch the board: conquered states lose their borders.
    </p>
  </div>,
  <div key="e3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: GOLD }}>
      The Code Napoléon
    </h3>
    <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
      Not just a conqueror — a lawmaker. In 1804, he promulgated the Civil Code: 
      2,281 articles that abolished feudal privileges, established equality before the law, 
      and protected property rights. It would outlast every battlefield victory.
    </p>
    <div className="flex items-center gap-3">
      <span className="font-display text-3xl font-bold" style={{ color: GOLD }}>
        <AnimatedCounter end={2281} duration={2} />
      </span>
      <span className="text-xs font-body" style={{ color: SMOKE }}>articles of law</span>
    </div>
  </div>,
];

export const EmperorSection = () => {
  return (
    <section id="emperor" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={() => <CoalitionBoard phase={4} />}
        steps={steps}
      />
    </section>
  );
};
