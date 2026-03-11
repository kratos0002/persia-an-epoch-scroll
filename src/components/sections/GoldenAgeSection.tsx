import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { HistoricalImage } from '@/components/visuals/HistoricalImage';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

const luminaries = [
  { name: 'Ibn Sina (Avicenna)', field: 'Medicine', years: '980–1037', contribution: 'The Canon of Medicine — the standard medical text for 600 years across Europe and Asia.' },
  { name: 'Omar Khayyam', field: 'Mathematics & Poetry', years: '1048–1131', contribution: 'Solved cubic equations. Reformed the calendar to be more accurate than the Gregorian. Wrote the Rubaiyat.' },
  { name: 'Al-Khwarizmi', field: 'Mathematics', years: '780–850', contribution: 'Invented algebra. His name gave us the word "algorithm."' },
  { name: 'Ferdowsi', field: 'Literature', years: '940–1020', contribution: 'The Shahnameh — 50,000 couplets preserving Persian identity through language.' },
  { name: 'Rumi', field: 'Poetry & Mysticism', years: '1207–1273', contribution: 'Best-selling poet in America. 800 years after his death.' },
];

export const GoldenAgeSection = () => (
  <section id="golden-age" style={{ '--era-primary': ERA_COLORS.goldenAge } as React.CSSProperties}>
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.3em] uppercase text-[hsl(160,50%,40%,0.6)] mb-4">800–1200 CE</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          <span className="text-[hsl(160,50%,45%)]">The Islamic Golden Age</span>
        </h2>
        <p className="text-foreground/80 text-xl leading-relaxed font-body mb-4 max-w-2xl">
          While Europe slept in the Dark Ages, Persians lit the world.
        </p>
        <p className="text-foreground/50 text-lg font-body max-w-2xl">
          They didn't just preserve Greek knowledge. They transformed it.
        </p>
      </RevealOnScroll>

      {/* Luminaries */}
      <div className="mt-20 space-y-12">
        {luminaries.map((person, i) => (
          <RevealOnScroll key={person.name} delay={0.08 * i}>
            <div className="border-l-2 border-[hsl(160,50%,40%,0.3)] pl-6 py-2">
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="font-display text-xl font-bold text-[hsl(160,50%,45%,0.9)]">{person.name}</h3>
                <span className="text-xs tracking-wider uppercase text-foreground/30 font-body">{person.field}</span>
              </div>
              <p className="text-foreground/40 text-sm font-body mb-2">{person.years}</p>
              <p className="text-foreground/70 text-lg font-body leading-relaxed">{person.contribution}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.3} className="mt-16">
        <HistoricalImage
          src="/images/shahnameh.jpg"
          alt="Page from the Shahnameh"
          caption="An illuminated page from Ferdowsi's Shahnameh, the Persian Book of Kings"
        />
      </RevealOnScroll>
    </div>

    <EraTransition
      fromColor={ERA_COLORS.goldenAge}
      toColor={ERA_COLORS.mongol}
      year="1219 CE"
      label="The Catastrophe"
    />
  </section>
);
