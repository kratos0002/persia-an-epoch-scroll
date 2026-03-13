import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { ParthianCampaignGraphic } from '@/components/visuals/ParthianCampaignGraphic';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

export const ParthianSection = () => (
  <section id="parthian" style={{ '--era-primary': ERA_COLORS.parthian } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => <ParthianCampaignGraphic activeStep={activeStep} />}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(350,60%,45%,0.7)] mb-4">247 BCE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[hsl(350,60%,55%)]">The Parthian Empire</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            From the ashes of Seleucid rule, a new dynasty.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            The Arsacids would endure nearly five centuries — the longest-ruling dynasty in Persian history.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(350,60%,50%,0.85)]">Rome's Nemesis</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Carrhae, 53 BCE. Seven Roman legions annihilated.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            20,000 dead. 10,000 captured. The golden eagles of Rome carried east in triumph.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            For 300 years, the Euphrates divided the world's two superpowers.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(350,60%,50%,0.85)]">The Silk Road</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Chinese silk. Indian spices. Roman gold.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            All passed through Parthian merchants. The empire grew fabulously wealthy — not through conquest, but commerce.
          </p>
        </div>,
      ]}
    />
    <EraTransition
      fromColor={ERA_COLORS.parthian}
      toColor={ERA_COLORS.sassanid}
      year="224 CE"
      label="A New Persian Renaissance"
    />
  </section>
);
