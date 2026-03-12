import React, { useMemo } from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { EraTransition } from '@/components/visuals/EraTransition';

const arabicWords = [
  { english: 'Algebra', arabic: 'al-jabr' },
  { english: 'Algorithm', arabic: 'al-Khwārizmī' },
  { english: 'Alchemy', arabic: 'al-kīmiyā' },
  { english: 'Almanac', arabic: 'al-manākh' },
  { english: 'Zenith', arabic: 'samt al-ra\'s' },
  { english: 'Zero', arabic: 'ṣifr' },
];

// Pre-defined static configs so references don't change
const STEP_CITIES = [
  ['Baghdad'],
  ['Baghdad', 'Toledo'],
  ['Baghdad', 'Toledo', 'Palermo', 'Cordoba'],
  ['Baghdad', 'Toledo', 'Palermo', 'Constantinople', 'Cordoba'],
] as const;

const STEP_ROUTES = [
  undefined,
  ['Baghdad', 'Toledo'],
  ['Baghdad', 'Palermo'],
  ['Baghdad', 'Constantinople', 'Toledo', 'Cordoba'],
] as const;

const STEP_ANNOTATIONS = [
  [{ name: 'Baghdad', label: 'Center of Knowledge', direction: 'top' as const }],
  [
    { name: 'Baghdad', label: 'Origin', direction: 'right' as const },
    { name: 'Toledo', label: '87 texts → Latin', direction: 'top' as const },
  ],
  [
    { name: 'Palermo', label: "Frederick II's court", direction: 'top' as const },
    { name: 'Cordoba', label: '400,000 volumes', direction: 'bottom' as const },
    { name: 'Toledo', label: 'Translation hub', direction: 'top' as const },
  ],
  [
    { name: 'Baghdad', label: 'Origin', direction: 'right' as const },
    { name: 'Constantinople', label: 'Bridge to Europe', direction: 'top' as const },
    { name: 'Toledo', label: 'Latin translation', direction: 'top' as const },
    { name: 'Cordoba', label: 'Library capital', direction: 'bottom' as const },
    { name: 'Palermo', label: 'Scholarly court', direction: 'right' as const },
  ],
];

const STEP_CENTERS: [number, number][] = [
  [33, 44],
  [37, 20],
  [36, 15],
  [35, 20],
];

const STEP_ZOOMS = [5, 4, 4, 4];

const RippleMap = ({ activeStep }: { activeStep: number }) => {
  const step = Math.min(activeStep, 3);
  return (
    <InteractiveMap
      empire="islamic"
      showCities={true}
      highlightCities={STEP_CITIES[step] as unknown as string[]}
      annotatedCities={STEP_ANNOTATIONS[step]}
      routeCities={STEP_ROUTES[step] as unknown as string[] | undefined}
      center={STEP_CENTERS[step]}
      zoom={STEP_ZOOMS[step]}
      animate={true}
      showTerritories={false}
    />
  );
};

export const RippleSection = () => (
  <section id="ripple" style={{ '--era-primary': '215 55% 45%' } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => <RippleMap activeStep={activeStep} />}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body text-[hsl(215,55%,50%,0.6)]">
            HOW KNOWLEDGE TRAVELED
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-[hsl(215,55%,55%)]">
            The Ripple
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body">
            Through Toledo, Sicily, and the Crusades, Arabic knowledge reignited Europe.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,55%,55%)]">Toledo</h3>
          <p className="text-foreground/80 leading-relaxed font-body">
            Gerard of Cremona translated 87 Arabic texts to Latin here — the largest single translation effort of the Middle Ages.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,55%,55%)]">Palermo</h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-3">
            Frederick II's court mixed Arab, Greek, and Latin scholars. His falconry book cited Ibn al-Haytham.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Córdoba's library held 400,000 volumes when the largest library in Christian Europe held 400.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4 text-[hsl(215,55%,55%)]">
            You're Speaking Arabic
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Every time you use these words, you speak the legacy:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {arabicWords.map(w => (
              <div key={w.english} className="px-3 py-2 rounded text-center" style={{
                background: `hsl(215, 55%, 45% / 0.08)`,
                border: `1px solid hsl(215, 55%, 45% / 0.12)`,
              }}>
                <p className="font-display text-sm font-bold text-[hsl(215,55%,55%)]">{w.english}</p>
                <p className="text-[hsl(43,85%,55%)] text-xs font-body italic">{w.arabic}</p>
              </div>
            ))}
          </div>
        </div>,
      ]}
    />
    <EraTransition fromColor="215 55% 45%" toColor="0 70% 45%" year="1258 CE" label="The Catastrophe" />
  </section>
);
