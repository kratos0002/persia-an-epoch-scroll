import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { DualWavefrontMap } from '@/components/visuals/DualWavefrontMap';

const AMBER = 'hsl(30, 85%, 50%)';
const WIRE = 'hsl(200, 60%, 55%)';
const PAPER = 'hsl(45, 30%, 88%)';
const SCARLET = 'hsl(0, 70%, 48%)';

const steps = [
  <div key="signal-arrives">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: WIRE }}>
      May 11, 1857 — Dawn
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Signal Arrives First
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The telegraph warning reached Delhi before the rebels. The British knew they were coming. 
      The wire had won the race — <span style={{ color: WIRE }}>hours ahead of the horsemen</span>.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      But knowing and acting are different things.
    </p>
  </div>,
  <div key="fire-arrives">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: AMBER }}>
      May 11, 1857 — Morning
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Fire Arrives Wider
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The sepoys rode into Delhi and were welcomed. The garrison's own troops joined them. 
      The social network had already prepared Delhi — the bazaar whispers, the regimental bonds, the shared grievance.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3 font-semibold" style={{ color: AMBER }}>
      The telegraph told the British what was happening. The social network made it happen.
    </p>
  </div>,
  <div key="bahadur-shah">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: SCARLET }}>
      The Red Fort
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Last Mughal
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The rebels marched to the Red Fort and proclaimed 82-year-old <span style={{ color: PAPER }}>Bahadur Shah Zafar II</span> as Emperor of Hindustan. 
      A reluctant figurehead for a rebellion that needed a symbol older than the Company.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      Delhi had fallen. The signal was faster. The fire was stronger.
    </p>
  </div>,
];

export const RaceToDelhi = () => {
  return (
    <section id="race-to-delhi" style={{ background: 'hsl(220, 25%, 8%)' }}>
      <StickyScroll
        graphic={(activeStep) => (
          <DualWavefrontMap
            activePhase={3}
            showTelegraph={true}
            showRebellion={true}
            className="w-full h-full"
          />
        )}
        steps={steps}
      />
    </section>
  );
};
