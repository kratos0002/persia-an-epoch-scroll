import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { SectionDivider } from '@/components/visuals/PersianPattern';

export const AlexanderSection = () => {
  const stages = [
    { empire: 'achaemenid' as const, cities: ['Persepolis', 'Susa', 'Babylon'], center: [32, 48] as [number, number], zoom: 4 },
    { empire: 'alexander' as const, cities: ['Athens', 'Sardis', 'Babylon'], center: [35, 38] as [number, number], zoom: 4 },
    { empire: 'alexander' as const, cities: ['Persepolis', 'Susa', 'Babylon'], center: [32, 48] as [number, number], zoom: 4.5 },
    { empire: 'alexander' as const, cities: ['Samarkand', 'Babylon', 'Memphis'], center: [33, 48] as [number, number], zoom: 3.5 },
  ];

  return (
    <section id="alexander">
      <StickyScroll
        graphic={(activeStep) => {
          const stage = stages[activeStep] || stages[0];
          return (
            <InteractiveMap
              empire={stage.empire}
              showCities
              highlightCities={stage.cities}
              center={stage.center}
              zoom={stage.zoom}
            />
          );
        }}
        steps={[
          <div key={0}>
            <p className="text-xs tracking-[0.3em] uppercase text-persian-purple/80 mb-3">334 BCE · The Fall</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gradient-blue">
              Alexander's Conquest
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed font-body">
              A 22-year-old Macedonian king crossed the Hellespont with 40,000 men.
              Within four years, the Achaemenid Empire — the largest the world
              had ever known — would cease to exist.
            </p>
          </div>,
          <div key={1}>
            <h3 className="font-display text-xl font-bold mb-3 text-persian-cream/80">The March East</h3>
            <p className="text-foreground/80 leading-relaxed font-body">
              After victories at Granicus and Issus, Alexander defeated Darius III
              at Gaugamela in 331 BCE — despite being outnumbered 5 to 1.
              Babylon surrendered. Susa opened its gates. The treasure of
              the Achaemenid dynasty was his.
            </p>
          </div>,
          <div key={2}>
            <h3 className="font-display text-xl font-bold mb-3 text-persian-cream/80">Persepolis Burns</h3>
            <p className="text-foreground/80 leading-relaxed font-body">
              In a night of drunken celebration — or calculated revenge for Xerxes'
              burning of Athens — Alexander set fire to Persepolis. The greatest
              palace complex on Earth was reduced to ruins. He reportedly wept
              the next morning.
            </p>
          </div>,
          <div key={3}>
            <h3 className="font-display text-xl font-bold mb-3 text-persian-cream/80">A New World Order</h3>
            <p className="text-foreground/80 leading-relaxed font-body">
              Alexander adopted Persian dress, married Roxana of Bactria, and
              demanded his men prostrate before him — a Persian custom. He became
              what he conquered. When he died at 32 in Babylon, his empire
              fractured into the Seleucid, Ptolemaic, and Antigonid kingdoms.
              Persia would need to rebuild.
            </p>
          </div>,
        ]}
      />
      <SectionDivider />
    </section>
  );
};
