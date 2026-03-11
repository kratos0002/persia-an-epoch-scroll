import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';

const RED = 'hsl(0, 65%, 48%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';

const steps = [
  <div key="s1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: RED }}>
      1808 — The First Crack
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Spanish Ulcer
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Napoleon replaced Spain's king with his brother Joseph. The Spanish people responded 
      not with armies but with something Napoleon had never faced: guerrilla war. 
      Ambushes, sabotage, priests with muskets. An entire nation resisting.
    </p>
  </div>,
  <div key="s2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Peninsula Bleeds
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Watch Spain on the board — it burns red and stays red. For six years, 
      300,000 French troops were pinned down fighting an enemy they could defeat in battle 
      but never conquer. Wellington's British forces added professional steel to Spanish fury.
    </p>
  </div>,
  <div key="s3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Cracks Widen
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Austria tried again in 1809 — defeated at Wagram, but no longer easily. 
      Russia grew restless under the Continental System. Sweden turned hostile. 
      The gold is fading from the board. The red is spreading.
    </p>
  </div>,
];

export const SpanishUlcerSection = () => {
  return (
    <section id="spanish-ulcer" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={() => <CoalitionBoard phase={6} />}
        steps={steps}
      />
    </section>
  );
};
