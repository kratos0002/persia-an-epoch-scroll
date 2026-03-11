import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { DualWavefrontMap } from '@/components/visuals/DualWavefrontMap';

const AMBER = 'hsl(30, 85%, 50%)';
const WIRE = 'hsl(200, 60%, 55%)';
const PAPER = 'hsl(45, 30%, 88%)';

const steps = [
  <div key="mutiny">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: AMBER }}>
      May 10, 1857
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Spark
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      At Meerut, 85 sepoys of the 3rd Light Cavalry had been court-martialed and imprisoned for refusing the greased cartridges. 
      That evening, their comrades broke them free. The officers were shot. The bungalows burned.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3 font-semibold" style={{ color: AMBER }}>
      The fire had started.
    </p>
  </div>,
  <div key="telegraph">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: WIRE }}>
      Hours later
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Warning
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The telegraph office at Meerut sent a desperate message toward Delhi: the sepoys had mutinied. 
      The signal raced along the wire at <span style={{ color: WIRE }}>186,000 miles per second</span>.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      But the sepoys were already marching. Through the night, toward the Mughal capital. 40 miles on horseback.
    </p>
  </div>,
];

export const MeerutSection = () => {
  return (
    <section id="meerut" style={{ background: 'hsl(220, 25%, 8%)' }}>
      <StickyScroll
        graphic={(activeStep) => (
          <DualWavefrontMap
            activePhase={2}
            showTelegraph={activeStep >= 1}
            showRebellion={true}
            className="w-full h-full"
          />
        )}
        steps={steps}
      />
    </section>
  );
};
