import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

export const IslamicConquestSection = () => (
  <section id="islamic-conquest" style={{ '--era-primary': ERA_COLORS.islamic } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <InteractiveMap
          empire={activeStep < 2 ? 'sassanid' : 'islamic'}
          showCities
          highlightCities={
            activeStep === 0
              ? ['Susa', 'Persepolis', 'Ctesiphon']
              : activeStep === 1
              ? ['Ctesiphon', 'Susa', 'Ecbatana']
              : ['Isfahan', 'Baghdad', 'Samarkand', 'Merv']
          }
        />
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,45%,38%,0.7)] mb-4">633–654 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[hsl(160,45%,45%)]">The Islamic Conquest</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            Exhausted by decades of war with Byzantium.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            At al-Qadisiyyah in 636, Arab armies shattered Sassanid resistance.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,45%,40%,0.85)]">The Last King</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Yazdegerd III fled east. No allies came.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            In 651, murdered by a miller near Merv. The last Zoroastrian dynasty ended. But Persia's story was far from over.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,45%,40%,0.85)]">Not Erasure — Fusion</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Persians didn't vanish. They reshaped Islam itself.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            Persian became the language of philosophy, poetry, and mysticism.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            Within two centuries, Persians dominated the intellectual life of the Islamic world.
          </p>
        </div>,
      ]}
    />
    <EraTransition
      fromColor={ERA_COLORS.islamic}
      toColor={ERA_COLORS.goldenAge}
      year="800 CE"
      label="The Flowering"
    />
  </section>
);
