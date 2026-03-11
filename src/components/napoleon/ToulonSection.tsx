import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';

const BLUE = 'hsl(220, 65%, 45%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';

const steps = [
  <div key="t1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: BLUE }}>
      1793 — Toulon
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Whiff of Grapeshot
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      A royalist revolt held Toulon with British naval support. The republic's generals dithered. 
      A young Corsican captain named Bonaparte positioned his guns where no one expected — and blew the British fleet out of the harbor.
    </p>
  </div>,
  <div key="t2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The First Coalition Forms
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Austria, Prussia, Britain, Spain, Holland — all turned against revolutionary France. 
      The old monarchies saw the guillotine and knew: if France survived, no throne was safe.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: SMOKE }}>
      Watch the board — Europe reorganizes against one country for the first time.
    </p>
  </div>,
  <div key="t3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      France Fights Alone
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Surrounded on every border, the republic drafted a nation. The <em>levée en masse</em> — 
      the first modern mass conscription — turned every citizen into a soldier. The wars of kings became the wars of peoples.
    </p>
  </div>,
];

export const ToulonSection = () => {
  return (
    <section id="toulon" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={(step) => <CoalitionBoard phase={step === 0 ? 1 : 2} />}
        steps={steps}
      />
    </section>
  );
};
