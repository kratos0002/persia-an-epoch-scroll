import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { DualWavefrontMap } from '@/components/visuals/DualWavefrontMap';

const WIRE = 'hsl(200, 60%, 55%)';
const AMBER = 'hsl(30, 85%, 50%)';
const PAPER = 'hsl(45, 30%, 88%)';

const steps = [
  <div key="telegraph">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: WIRE }}>
      The Telegraph Network
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Wire
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      By 1857, the East India Company had strung 4,000 miles of telegraph wire across India. 
      Calcutta to Delhi in minutes. Orders, warnings, troop movements — all traveling at the speed of electricity 
      along a <span style={{ color: WIRE }}>rigid, linear network</span> of stations and copper wire.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      The telegraph was the Company's nervous system. Fast, precise, and entirely visible.
    </p>
  </div>,
  <div key="social">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: AMBER }}>
      The Social Network
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      The Fire
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      But beneath the wire ran another network — older, denser, invisible to the British. 
      <span style={{ color: AMBER }}> Bazaars, regimental messes, village councils, Mughal courts</span>. 
      Information traveled by word of mouth, by chapati chains, by riders on horseback.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'hsl(220, 10%, 55%)' }}>
      This network was slow. But it was wide. And the British couldn't see it, couldn't tap it, couldn't cut it.
    </p>
  </div>,
  <div key="contrast">
    <p className="text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3" style={{ color: PAPER }}>
      The Thesis
    </p>
    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: PAPER }}>
      Speed vs. Reach
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
      The telegraph could outrun a horse. But it could only reach the stations. 
      The rebellion's social network reached every cantonment, every bazaar, every village square.
    </p>
    <p className="font-body text-sm leading-relaxed mt-3 font-semibold" style={{ color: AMBER }}>
      The signal was faster. The fire was wider. This is the story of their race.
    </p>
  </div>,
];

export const TwoNetworksSection = () => {
  return (
    <section id="two-networks" style={{ background: 'hsl(220, 25%, 8%)' }}>
      <StickyScroll
        graphic={(activeStep) => (
          <DualWavefrontMap
            activePhase={activeStep === 0 ? 1 : 0}
            showTelegraph={activeStep === 0 || activeStep === 2}
            showSocialNetwork={activeStep >= 1}
            showRebellion={false}
            className="w-full h-full"
          />
        )}
        steps={steps}
      />
    </section>
  );
};
