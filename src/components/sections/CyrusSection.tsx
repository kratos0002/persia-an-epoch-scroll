import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap, EmpireId } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const empireStages: { empire: EmpireId; cities: string[]; center: [number, number]; zoom: number }[] = [
  { empire: 'none', cities: ['Pasargadae', 'Ecbatana'], center: [32, 52], zoom: 6 },
  { empire: 'achaemenid', cities: ['Pasargadae', 'Ecbatana', 'Susa'], center: [33, 50], zoom: 5 },
  { empire: 'achaemenid', cities: ['Babylon', 'Susa', 'Ecbatana', 'Persepolis'], center: [32, 48], zoom: 4.5 },
  { empire: 'achaemenid', cities: ['Persepolis', 'Susa', 'Babylon', 'Sardis', 'Memphis'], center: [32, 46], zoom: 4 },
  { empire: 'none', cities: ['Pasargadae'], center: [30.2, 53.2], zoom: 8 },
];

export const CyrusSection = () => (
  <section id="cyrus" style={{ '--era-primary': ERA_COLORS.achaemenid } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep, progress) => {
        const stage = empireStages[Math.min(activeStep, empireStages.length - 1)];
        const zoomBoost = progress * 0.3;
        return activeStep < 4 ? (
          <InteractiveMap
            empire={stage.empire}
            showCities
            highlightCities={stage.cities}
            center={stage.center}
            zoom={stage.zoom + zoomBoost}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/images/tomb-of-cyrus.jpg"
              alt="Tomb of Cyrus at Pasargadae"
              className="max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        );
      }}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(43,85%,55%,0.6)] mb-4">550 BCE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gradient-gold">
            Cyrus the Great
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            A tribal king from a backwater province.
          </p>
          <p className="text-foreground/60 text-base leading-relaxed font-body">
            In a single generation, he would build the largest empire the world had ever seen.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(43,85%,55%,0.85)]">The Conquest Begins</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            First, he defeated the Medes — his own overlords.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Then Lydia. Then Babylon itself, taken without a battle. The gates simply opened.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(43,85%,55%,0.85)]">An Empire Unprecedented</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-6">
            From the Aegean to the Indus. 44% of the world's population under one rule.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <AnimatedCounter end={44} suffix="%" label="World population" />
            <AnimatedCounter end={5.5} suffix="M km²" label="Territory" />
          </div>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(43,85%,55%,0.85)]">The Cyrus Cylinder</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            The first declaration of human rights.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Conquered peoples kept their religions. Slaves were freed. Displaced nations returned home.
            25 centuries before the UN Charter, Cyrus wrote its prototype in clay.
          </p>
        </div>,
        <div key={4} id="pasargadae">
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(43,85%,55%,0.85)]">The Tomb at Pasargadae</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            "O man, I am Cyrus, who founded the empire of the Persians. Do not grudge me this patch of earth that covers my body."
          </p>
          <p className="text-foreground/50 text-sm font-body italic">
            — Inscription at the Tomb of Cyrus
          </p>
        </div>,
      ]}
    />
    <EraTransition
      fromColor={ERA_COLORS.achaemenid}
      toColor={ERA_COLORS.achaemenid}
      year="518 BCE"
      label="The Empire Matures"
    />
  </section>
);
