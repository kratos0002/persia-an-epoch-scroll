import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';

export const HarunSection = () => (
  <section id="harun" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">
      <RevealOnScroll className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>786 CE</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6" style={{ color: `hsl(${WISDOM_TEAL})` }}>
          The Collector
        </h2>
      </RevealOnScroll>

      <RevealOnScroll className="max-w-2xl mx-auto">
        <p className="text-foreground/70 text-xl font-body leading-relaxed mb-6">
          Harun al-Rashid didn't want gold from his conquests. He wanted books.
        </p>
        <p className="text-foreground/60 text-lg font-body leading-relaxed mb-6">
          After every military victory, his emissaries carried back not treasure but manuscripts — Greek, Persian, Sanskrit, Syriac. Every scroll was a weapon more powerful than any sword.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <blockquote className="max-w-xl mx-auto border-l-2 pl-6 py-2" style={{ borderColor: `hsl(43, 85%, 55%)` }}>
          <p className="text-foreground/80 text-xl font-body italic leading-relaxed mb-3">
            "He demanded one thing from the defeated Byzantines: manuscripts."
          </p>
          <p className="text-foreground/40 text-sm font-body">
            — The terms of treaty with Constantinople, c. 800 CE
          </p>
        </blockquote>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15} className="max-w-2xl mx-auto">
        <p className="text-foreground/60 text-lg font-body leading-relaxed">
          His son, al-Ma'mun, would take this obsession further. He would build an institution around it. A place where every piece of human knowledge — Greek, Indian, Persian — would be translated, debated, and extended.
        </p>
        <p className="text-foreground/50 text-lg font-body leading-relaxed mt-4">
          He called it <em className="text-[hsl(43,85%,55%)]">Bayt al-Hikma</em> — the House of Wisdom.
        </p>
      </RevealOnScroll>
    </div>

    <EraTransition fromColor={WISDOM_TEAL} toColor={WISDOM_TEAL} year="830 CE" label="The House of Wisdom" />
  </section>
);
