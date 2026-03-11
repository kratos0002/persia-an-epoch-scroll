import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { ManuscriptShelf } from '@/components/visuals/ManuscriptShelf';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';

export const HarunSection = () => (
  <section id="harun" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="w-full h-full relative">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 50% 50%, hsl(${WISDOM_TEAL} / 0.06) 0%, transparent 70%)`,
          }} />
          <ManuscriptShelf activeStep={activeStep} />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>786 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: `hsl(${WISDOM_TEAL})` }}>
            The Collector
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body">
            Harun al-Rashid didn't want gold from his conquests. He wanted books.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(43, 85%, 55%)` }}>
            From Byzantium
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-3">
            After every military victory, his emissaries carried back not treasure but manuscripts — Aristotle, Euclid, Galen, Ptolemy.
          </p>
          <p className="text-foreground/60 text-sm font-body italic">
            "He demanded one thing from the defeated Byzantines: manuscripts."
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(170, 45%, 45%)` }}>
            From Persia & India
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-3">
            Persian astronomical tables. Sanskrit mathematics. Syriac medical texts. Every scroll was a weapon more powerful than any sword.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            The translations flowed: Greek, Persian, Sanskrit, Syriac — all into Arabic.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(${WISDOM_TEAL} / 0.85)` }}>
            One Building Couldn't Hold It
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-3">
            His son, al-Ma'mun, would take this obsession further. He would build an institution around it.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            A place where every piece of human knowledge would be translated, debated, and extended. He called it <em className="text-[hsl(43,85%,55%)]">Bayt al-Hikma</em>.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={WISDOM_TEAL} toColor={WISDOM_TEAL} year="830 CE" label="The House of Wisdom" />
  </section>
);
