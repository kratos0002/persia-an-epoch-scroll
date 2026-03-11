import React from 'react';
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

const STEP_CITIES: Record<number, string[]> = {
  0: ['Baghdad'],
  1: ['Baghdad', 'Toledo'],
  2: ['Baghdad', 'Toledo', 'Palermo'],
  3: ['Baghdad', 'Toledo', 'Palermo', 'Constantinople', 'Cordoba'],
};

export const RippleSection = () => (
  <section id="ripple" style={{ '--era-primary': '215 55% 45%' } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <InteractiveMap
          empire="islamic"
          showCities={true}
          highlightCities={STEP_CITIES[Math.min(activeStep, 3)]}
          center={[35, 20]}
          zoom={4}
          animate={true}
        />
      )}
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
