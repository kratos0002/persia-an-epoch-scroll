import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';

const arabicWords = [
  { english: 'Algebra', arabic: 'al-jabr', meaning: 'the reunion of broken parts' },
  { english: 'Algorithm', arabic: 'al-Khwārizmī', meaning: "the scholar's name" },
  { english: 'Alchemy', arabic: 'al-kīmiyā', meaning: 'the art of transformation' },
  { english: 'Almanac', arabic: 'al-manākh', meaning: 'the climate' },
  { english: 'Zenith', arabic: 'samt al-ra\'s', meaning: 'direction of the head' },
  { english: 'Zero', arabic: 'ṣifr', meaning: 'empty' },
];

const routes = [
  { city: 'Toledo', desc: 'Gerard of Cremona translated 87 Arabic texts to Latin here — the largest single translation effort of the Middle Ages.' },
  { city: 'Palermo', desc: 'Frederick II\'s court mixed Arab, Greek, and Latin scholars. His falconry book cited Ibn al-Haytham.' },
  { city: 'Córdoba', desc: 'The library held 400,000 volumes when the largest library in Christian Europe held 400.' },
];

export const RippleSection = () => (
  <section id="ripple" style={{ '--era-primary': '215 55% 45%' } as React.CSSProperties}>
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-20">
      <RevealOnScroll className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body text-[hsl(215,55%,50%,0.6)]">
          HOW KNOWLEDGE TRAVELED
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-[hsl(215,55%,55%)]">
          The Ripple
        </h2>
        <p className="text-foreground/50 text-lg font-body max-w-xl mx-auto">
          Through Toledo, Sicily, and the Crusades, Arabic knowledge reignited Europe.
        </p>
      </RevealOnScroll>

      {/* Routes */}
      <div className="space-y-6">
        {routes.map((r, i) => (
          <RevealOnScroll key={r.city} delay={0.1 * i}>
            <div className="flex gap-5 items-start">
              <div className="w-2 h-2 rounded-full bg-[hsl(215,55%,50%)] mt-2.5 shrink-0" />
              <div>
                <h3 className="font-display text-xl font-bold text-[hsl(215,55%,55%)] mb-1">{r.city}</h3>
                <p className="text-foreground/60 font-body text-base leading-relaxed">{r.desc}</p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Arabic words */}
      <RevealOnScroll delay={0.2}>
        <div className="text-center mb-8">
          <p className="text-foreground/80 text-xl font-body leading-relaxed max-w-lg mx-auto">
            Every time you use these words, you're speaking Arabic.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {arabicWords.map(w => (
            <div key={w.english} className="p-4 rounded-lg text-center" style={{
              background: `hsl(215, 55%, 45% / 0.06)`,
              border: `1px solid hsl(215, 55%, 45% / 0.1)`,
            }}>
              <p className="font-display text-lg font-bold text-[hsl(215,55%,55%)]">{w.english}</p>
              <p className="text-[hsl(43,85%,55%)] text-sm font-body italic">{w.arabic}</p>
              <p className="text-foreground/40 text-xs font-body mt-1">{w.meaning}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>

    <EraTransition fromColor="215 55% 45%" toColor="0 70% 45%" year="1258 CE" label="The Catastrophe" />
  </section>
);
