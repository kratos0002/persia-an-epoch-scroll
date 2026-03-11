import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { SectionDivider } from '@/components/visuals/PersianPattern';

export const IslamicConquestSection = () => (
  <section id="islamic-conquest">
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
          <p className="text-xs tracking-[0.3em] uppercase text-persian-emerald/70 mb-3">633–654 CE · Transformation</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-persian-emerald/90">The Islamic Conquest</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body">
            Exhausted by decades of war with Byzantium, the Sassanid Empire faced a
            new force from the Arabian Peninsula. At the Battle of al-Qadisiyyah
            in 636, the Arab armies shattered Sassanid resistance.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-3 text-persian-emerald/80">The Last Sassanid King</h3>
          <p className="text-foreground/80 leading-relaxed font-body">
            Yazdegerd III fled east across his empire, seeking allies that never came.
            In 651, he was murdered by a miller near Merv. With him died the last
            Zoroastrian dynasty of Iran. But Persia's story was far from over.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-3 text-persian-emerald/80">Not Erasure — Fusion</h3>
          <p className="text-foreground/80 leading-relaxed font-body">
            Unlike other conquered peoples, Persians reshaped Islam itself.
            Persian became the language of Islamic philosophy, poetry, and
            mysticism. Persian administrative genius organized the new
            caliphates. Within two centuries, Persians would dominate the
            intellectual life of the Islamic world.
          </p>
        </div>,
      ]}
    />
    <SectionDivider />
  </section>
);
