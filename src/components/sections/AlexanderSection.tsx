import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { AlexanderCampaignGraphic } from '@/components/visuals/AlexanderCampaignGraphic';
import { EraWaypoint } from '@/components/visuals/EraWaypoint';
import { ERA_COLORS } from '@/data/eras';

export const AlexanderSection = () => (
  <section id="alexander" style={{ '--era-primary': ERA_COLORS.alexander } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => <AlexanderCampaignGraphic activeStep={activeStep} />}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(270,40%,50%,0.7)] mb-4">334 BCE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gradient-blue">
            Alexander's Conquest
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            Everything Cyrus built, everything Darius organised, everything Xerxes defended — all of it now stood in the path of a 22-year-old from Macedon.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            He had 40,000 men. Within four years, the largest empire the world had ever known would cease to exist.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(270,40%,50%,0.8)]">The March East</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Granicus. Issus. Then Gaugamela — outnumbered 5 to 1.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Babylon surrendered. Susa opened its gates. The treasure of the Achaemenid dynasty was his.
          </p>
        </div>,
        <div key={2}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(25,80%,55%,0.7)] mb-4">330 BCE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(25,80%,55%,0.9)]">Persepolis Burns</h3>
          <p className="text-foreground/70 leading-relaxed font-body">
            Some said revenge for Athens. Others said drunken impulse. Either way, 200 years of ceremony turned to ash in a single night.
          </p>
        </div>,
        <div key={3}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(270,40%,60%,0.7)] mb-4">323 BCE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(270,40%,60%,0.9)]">He Became What He Conquered</h3>
          <p className="text-foreground/70 leading-relaxed font-body">
            Persian dress. Persian wife. Persian customs. The conqueror vanished into what he had taken.
          </p>
        </div>,
      ]}
    />
    <EraWaypoint activeIndex={4} label="Persia Rises Again" year="247 BCE" />
  </section>
);
