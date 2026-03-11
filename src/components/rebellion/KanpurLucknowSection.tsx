import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { DualWavefrontMap } from '@/components/visuals/DualWavefrontMap';

const AMBER = 'hsl(30, 85%, 50%)';
const WIRE = 'hsl(200, 60%, 55%)';
const PAPER = 'hsl(45, 30%, 88%)';
const SCARLET = 'hsl(0, 70%, 48%)';

const steps = [
  <div key="kanpur">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: AMBER }}>
      June 5, 1857
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      Kanpur — Nana Sahib
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The rebellion spread south along the Ganges. At Kanpur, <span style={{ color: PAPER }}>Nana Sahib</span> — a Maratha prince dispossessed by the Doctrine of Lapse — 
      led the siege against the British entrenchment. The social network had reached him long before the telegraph could warn anyone.
    </p>
  </div>,
  <div key="lucknow">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: AMBER }}>
      June 30, 1857
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      Lucknow — The Siege
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      At Lucknow, the British Residency was besieged for <span style={{ color: SCARLET }}>87 days</span>. 
      The recently annexed kingdom of Awadh had particular grievance — their king had been deposed just a year before. 
      The fire burned hottest where the injustice was freshest.
    </p>
  </div>,
  <div key="wire-cut">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: SCARLET }}>
      Lines Down
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Wire Goes Dark
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      As the rebellion spread, the rebels <span style={{ color: SCARLET }}>cut the telegraph lines</span>. 
      Between Kanpur and Agra, between Lucknow and Allahabad — the wire went silent. 
      The Company's nervous system was severed.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3 font-semibold" style={{ color: AMBER }}>
      The fire burned where the wire couldn't reach. And now the wire couldn't reach at all.
    </p>
  </div>,
];

export const KanpurLucknowSection = () => {
  return (
    <section id="kanpur-lucknow" style={{ background: 'hsl(220, 25%, 8%)' }}>
      <StickyScroll
        graphic={(activeStep) => (
          <DualWavefrontMap
            activePhase={4}
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
