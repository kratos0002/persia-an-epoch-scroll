import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap, EmpireId } from '@/components/visuals/InteractiveMap';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const stages: {
  empire: EmpireId;
  cities: string[];
  highlight: string[];
  center: [number, number];
  zoom: number;
  showTerritories?: boolean;
  routeCities?: string[];
  annotatedCities?: Array<{
    name: string;
    label: string;
    direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    offset?: [number, number];
  }>;
}[] = [
  // Step 0 — The hollow empire: Sassanid territory, war-scarred cities
  {
    empire: 'sassanid',
    cities: ['Ctesiphon', 'Susa', 'Ecbatana', 'Isfahan', 'Persepolis'],
    highlight: ['Ctesiphon'],
    center: [33, 50],
    zoom: 4.5,
    annotatedCities: [
      { name: 'Ctesiphon', label: 'Imperial Capital', direction: 'top', offset: [0, -18] },
    ],
  },
  // Step 1 — al-Qadisiyyah: route of Arab advance
  {
    empire: 'sassanid',
    cities: ['Ctesiphon', 'Susa', 'Persepolis', 'Ecbatana'],
    highlight: ['Ctesiphon', 'Susa'],
    center: [32, 47],
    zoom: 5,
    showTerritories: true,
    routeCities: ['Susa', 'Ctesiphon'],
    annotatedCities: [
      { name: 'Ctesiphon', label: 'Falls 637 CE', direction: 'top', offset: [0, -18] },
    ],
  },
  // Step 2 — The last king flees east
  {
    empire: 'sassanid',
    cities: ['Ctesiphon', 'Isfahan', 'Ecbatana', 'Merv'],
    highlight: ['Merv'],
    center: [34, 54],
    zoom: 4.5,
    showTerritories: false,
    routeCities: ['Ctesiphon', 'Isfahan', 'Ecbatana', 'Merv'],
    annotatedCities: [
      { name: 'Merv', label: 'End of the road — 651 CE', direction: 'top', offset: [0, -18] },
    ],
  },
  // Step 3 — Islamic territory emerges
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv', 'Ctesiphon', 'Susa'],
    highlight: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv'],
    center: [32, 48],
    zoom: 4,
    annotatedCities: [
      { name: 'Baghdad', label: 'New capital — 762 CE', direction: 'top', offset: [0, -18] },
    ],
  },
  // Step 4 — Fusion: Persian intellectual centers
  {
    empire: 'islamic',
    cities: ['Baghdad', 'Isfahan', 'Samarkand', 'Merv', 'Ctesiphon'],
    highlight: ['Baghdad', 'Isfahan', 'Samarkand'],
    center: [34, 52],
    zoom: 4.2,
  },
];

const CtesiphonInset = () => (
  <div className="pointer-events-none absolute right-[8%] bottom-[14%] z-[1200] w-[200px] sm:w-[220px] lg:w-[250px]">
    <div className="overflow-hidden rounded-2xl border border-[hsl(160,45%,38%,0.35)] bg-[rgba(7,12,22,0.88)] shadow-[0_18px_56px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="space-y-3 p-5">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[hsl(160,45%,50%,0.72)]">637 CE</p>
        <h4 className="font-display text-xl font-bold leading-tight text-[hsl(160,45%,55%)]">Ctesiphon Falls</h4>
        <p className="font-body text-sm leading-relaxed text-foreground/65">
          The Taq Kasra — world's largest brick vault — survived. Its conquerors had never seen anything like it.
        </p>
      </div>
    </div>
  </div>
);


const ShahnamehImage = () => (
  <div className="w-full h-full flex items-center justify-center bg-[hsl(220,18%,8%)]">
    <div className="relative max-h-[85vh] max-w-[72vw]">
      <img
        src="/images/shahnameh.jpg"
        alt="A page from Ferdowsi's Shahnameh — the epic that preserved Persian identity through the Islamic era"
        className="max-h-[80vh] max-w-[68vw] object-contain rounded-lg shadow-2xl"
      />
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-white/30">
          Ferdowsi's Shahnameh — 60,000 verses preserving Persian identity
        </p>
      </div>
    </div>
  </div>
);

export const IslamicConquestSection = () => (
  <section id="islamic-conquest" style={{ '--era-primary': ERA_COLORS.islamic } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => {
        // Step 4: full-screen Shahnameh image
        if (activeStep === 4) return <ShahnamehImage />;

        const stage = stages[Math.min(activeStep, stages.length - 1)];

        return (
          <div className="relative h-full w-full">
            <InteractiveMap
              empire={stage.empire}
              showCities
              highlightCities={stage.highlight}
              visibleCities={stage.cities}
              center={stage.center}
              zoom={stage.zoom}
              showTerritories={stage.showTerritories}
              routeCities={stage.routeCities}
              annotatedCities={stage.annotatedCities}
              spotlightCity={
                activeStep === 0 ? {
                  name: 'Ctesiphon',
                  eyebrow: '633 CE',
                  label: 'An Empire Hollow',
                  detail: 'Capital of the Sassanids • Treasury empty • Army broken',
                } : activeStep === 3 ? {
                  name: 'Baghdad',
                  eyebrow: '762 CE',
                  label: 'Built by Persians',
                  detail: 'Persian architect • Persian name • On a Sassanid village',
                } : undefined
              }
            />
            {activeStep === 1 && <CtesiphonInset />}
          </div>
        );
      }}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(350,55%,45%,0.7)] mb-4">633 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[hsl(350,55%,50%)]">Everything Changes</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            Seven hundred years of war with Rome had bled both empires dry.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            Plagues swept through what remained. The treasury was empty. Four kings in four years.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            When Arab armies crossed the frontier, they found an empire that had already defeated itself.
          </p>
        </div>,
        <div key={1}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,45%,38%,0.7)] mb-4">636–637 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,45%,45%,0.85)]">al-Qadisiyyah</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            The decisive battle lasted three days. The Sassanid general Rostam Farrokhzād was killed. The imperial banner was captured.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            Within months, Ctesiphon itself fell. Arab soldiers walked through the Taq Kasra — the largest vaulted hall in the world — stunned into silence.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            The royal carpet, 140 feet long and sewn with gems, was cut into pieces and divided among the soldiers.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4 text-[rgba(180,180,180,0.85)]">The Last King</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Yazdegerd III fled east — Ecbatana, then Isfahan, then into Khorasan. No allies came.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            In 651, he was murdered by a miller near Merv for the clothes on his back. He was thirty years old.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            The last Zoroastrian dynasty ended not in a great battle, but in a roadside killing — 1,100 years of Persian kingship extinguished in an instant.
          </p>
        </div>,
        <div key={3}>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,45%,38%,0.7)] mb-4">660–750 CE</p>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,45%,45%,0.85)]">Not Erasure — Absorption</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            The conquerors had an army and a faith. What they didn't have was a civilization.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            Persian bureaucrats ran the new caliphate. Persian architects built its mosques. Persian scholars translated its Greek inheritance into Arabic.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            The Abbasid Revolution of 750 — which overthrew the Umayyads — was organized from Khorasan, led by Persian converts.
          </p>
        </div>,
        <div key={4}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(160,45%,50%,0.85)]">The Quiet Conquest</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Persians didn't vanish. They reshaped Islam itself.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body mb-4">
            Persian became the language of philosophy, poetry, and mysticism. The new capital — Baghdad — was built on the ruins of a Sassanid village, by a Persian architect, with a Persian name.
          </p>
          <p className="text-foreground/50 leading-relaxed font-body">
            Within two centuries, Persians dominated the intellectual life of the entire Islamic world.
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
