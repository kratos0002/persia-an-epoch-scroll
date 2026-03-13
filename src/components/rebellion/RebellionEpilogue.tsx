import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { DualWavefrontMap } from '@/components/visuals/DualWavefrontMap';
import { EditionColophon } from '@/components/scroll/EditionColophon';

const AMBER = 'hsl(30, 85%, 50%)';
const PAPER = 'hsl(45, 30%, 88%)';
const ASH = 'hsl(220, 10%, 45%)';

const steps = [
  <div key="memory">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: AMBER }}>
      Epilogue
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Fire Remembered
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The British called it a "mutiny" — a failure of military discipline, a local disturbance. 
      Indian historians would call it the <span style={{ color: AMBER }}>First War of Independence</span>.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      Both names reveal more about the namer than the named.
    </p>
  </div>,
  <div key="networks">
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Network That Mattered
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The rebellion succeeded where it did because the fire of revolt moved along 
      <span style={{ color: AMBER }}> social networks that the telegraph could not monitor or intercept</span>.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      The chapatis could not be decoded. The regimental bonds could not be tapped. 
      The bazaar whispers could not be intercepted by a machine that only understood copper and electricity.
    </p>
  </div>,
  <div key="lesson">
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Lesson
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      Technology is not power. Technology is a tool of power — and power flows through human relationships. 
      The telegraph was faster. The social network was deeper.
    </p>
    <p className="font-body text-sm leading-relaxed mt-4 font-semibold" style={{ color: AMBER }}>
      The signal won the war. The fire won the history.
    </p>
    <p className="font-body text-xs mt-6" style={{ color: ASH }}>
      — The Signal and the Fire
    </p>
  </div>,
];

export const RebellionEpilogue = () => {
  return (
    <section id="rebellion-epilogue" style={{ background: 'hsl(220, 25%, 8%)' }}>
      <StickyScroll
        graphic={() => (
          <DualWavefrontMap
            activePhase={4}
            showTelegraph={false}
            showRebellion={true}
            className="w-full h-full opacity-60"
          />
        )}
        steps={steps}
      />
      <div className="max-w-md mx-auto px-6 pb-16">
        <EditionColophon essayId="rebellion" variant="dark" />
      </div>
    </section>
  );
};
