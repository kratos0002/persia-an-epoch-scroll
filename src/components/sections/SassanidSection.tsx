import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { SassanidCampaignGraphic } from '@/components/visuals/SassanidCampaignGraphic';
import { ERA_COLORS } from '@/components/visuals/EraTransition';
import { IslamicTransition } from '@/components/visuals/IslamicTransition';

export const SassanidSection = () => (
  <section id="sassanid" style={{ '--era-primary': ERA_COLORS.sassanid } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => <SassanidCampaignGraphic activeStep={activeStep} />}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(350,55%,45%,0.7)] mb-4">260 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[hsl(350,55%,55%)]">Shapur's Triumph</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            At Edessa, a Sassanid king did what no one in history had done.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            He captured a Roman emperor alive. Then he carved the humiliation into a cliff face — so the world would never forget.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(40,60%,55%,0.85)]">The Golden Peak</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            At Gundeshapur, they built the world's first teaching hospital. At Ctesiphon, the world's largest brick vault.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            Zoroastrianism was codified into scripture. Persian silverwork and textiles set the standard from Rome to China.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            Four centuries of civilization at its zenith.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4 text-[rgba(180,180,180,0.85)]">The Exhaustion</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Seven hundred years fighting Rome, then Byzantium.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            By 628, both empires were bled dry. Treasuries empty. Armies shattered. Plagues sweeping through what remained.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            When the Arabs arrived in 633, they found an empire already hollow.
          </p>
        </div>,
      ]}
    />
    <IslamicTransition />
  </section>
);
