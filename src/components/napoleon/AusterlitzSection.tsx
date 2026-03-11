import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';

const GOLD = 'hsl(43, 70%, 50%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';

const steps = [
  <div key="a1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: GOLD }}>
      December 2, 1805
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Sun of Austerlitz
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Exactly one year after his coronation. The fog lifted and the Austerlitz sun revealed 
      73,000 French soldiers facing 85,400 Allies. Napoleon had lured them into a trap.
    </p>
    <div className="flex gap-6 mt-4">
      <div>
        <span className="font-display text-xl font-bold" style={{ color: GOLD }}>73,000</span>
        <p className="text-[10px] font-body" style={{ color: SMOKE }}>French</p>
      </div>
      <div className="text-center font-display text-lg" style={{ color: SMOKE }}>vs</div>
      <div>
        <span className="font-display text-xl font-bold" style={{ color: 'hsl(0, 65%, 48%)' }}>85,400</span>
        <p className="text-[10px] font-body" style={{ color: SMOKE }}>Coalition</p>
      </div>
    </div>
  </div>,
  <div key="a2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Jena & Auerstedt — 1806
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Prussia declared war, expecting the army of Frederick the Great to hold. 
      Napoleon destroyed it in a single afternoon. The Prussian state that had taken a century to build collapsed in one day.
    </p>
  </div>,
  <div key="a3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Tilsit — The Zenith
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      On a raft in the middle of the Niemen River, Napoleon met Tsar Alexander I. 
      They divided Europe between them. Almost every nation on the board is now gold or gray. 
      This is the summit. From here, there is only the fall.
    </p>
  </div>,
];

export const AusterlitzSection = () => {
  return (
    <section id="austerlitz" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={(step) => <CoalitionBoard phase={5} />}
        steps={steps}
      />
    </section>
  );
};
