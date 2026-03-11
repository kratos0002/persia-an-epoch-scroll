import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const stages = [
  { empire: 'achaemenid' as const, cities: ['Persepolis', 'Susa', 'Babylon'], center: [32, 48] as [number, number], zoom: 4 },
  { empire: 'alexander' as const, cities: ['Athens', 'Sardis', 'Babylon'], center: [35, 38] as [number, number], zoom: 4 },
  { empire: 'alexander' as const, cities: ['Persepolis', 'Susa', 'Babylon'], center: [32, 48] as [number, number], zoom: 4.5 },
  { empire: 'alexander' as const, cities: ['Samarkand', 'Babylon', 'Memphis'], center: [33, 48] as [number, number], zoom: 3.5 },
];

export const AlexanderSection = () => (
  <section id="alexander" style={{ '--era-primary': ERA_COLORS.alexander } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep, progress) => {
        const stage = stages[Math.min(activeStep, stages.length - 1)];
        return (
          <InteractiveMap
            empire={stage.empire}
            showCities
            highlightCities={stage.cities}
            center={stage.center}
            zoom={stage.zoom + progress * 0.2}
          />
        );
      }}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(270,40%,50%,0.7)] mb-4">334 BCE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gradient-blue">
            Alexander's Conquest
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            A 22-year-old with 40,000 men.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Within four years, the largest empire the world had ever known would cease to exist.
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
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(270,40%,50%,0.8)]">Persepolis Burns</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Drunken celebration — or calculated revenge for Athens.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            The greatest palace on Earth reduced to ruins. He reportedly wept the next morning.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(270,40%,50%,0.8)]">He Became What He Conquered</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Persian dress. Persian wife. Persian customs.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            When he died at 32 in Babylon, his empire fractured. Persia would need to rebuild.
          </p>
        </div>,
      ]}
    />
    <EraTransition
      fromColor={ERA_COLORS.alexander}
      toColor={ERA_COLORS.parthian}
      year="247 BCE"
      label="Persia Rises Again"
    />
  </section>
);
