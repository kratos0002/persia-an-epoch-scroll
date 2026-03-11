import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { DualWavefrontMap } from '@/components/visuals/DualWavefrontMap';

const SCARLET = 'hsl(0, 70%, 48%)';
const WIRE = 'hsl(200, 60%, 55%)';
const PAPER = 'hsl(45, 30%, 88%)';

const steps = [
  <div key="punjab">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: SCARLET }}>
      Late 1857
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      Reinforcements from Punjab
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The Punjab — recently conquered and garrisoned by loyal Sikh troops who had their own reasons to oppose the Mughal restoration — 
      became the staging ground for the British counterattack. Troops marched south toward Delhi.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      The <span style={{ color: WIRE }}>telegraph from Lahore</span> coordinated the advance. The wire was rebuilding.
    </p>
  </div>,
  <div key="delhi-siege">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: SCARLET }}>
      September 1857
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Siege of Delhi
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      After months of fighting on the Ridge above Delhi, British forces breached the walls. 
      The reconquest was brutal — house-to-house fighting, mass executions, the deliberate destruction of the Mughal court.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      Bahadur Shah Zafar was captured, his sons executed before his eyes. The last Mughal was exiled to Rangoon.
    </p>
  </div>,
  <div key="contraction">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: WIRE }}>
      1858
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Fire Contracts
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      One by one, the rebellion's strongholds fell. Kanpur was retaken. Lucknow was relieved. 
      Jhansi's Rani Lakshmibai died fighting at Gwalior. The <span style={{ color: SCARLET }}>wavefront contracted</span> as the 
      <span style={{ color: WIRE }}> telegraph network rebuilt</span> and coordinated the reconquest.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      The technology won the war. But it had not prevented the rebellion.
    </p>
  </div>,
];

export const ReconquestSection = () => {
  return (
    <section id="reconquest" style={{ background: 'hsl(220, 25%, 8%)' }}>
      <StickyScroll
        graphic={(activeStep) => (
          <DualWavefrontMap
            activePhase={activeStep <= 1 ? 5 : 6}
            showTelegraph={true}
            showRebellion={true}
            showReinforcements={true}
            className="w-full h-full"
          />
        )}
        steps={steps}
      />
    </section>
  );
};
