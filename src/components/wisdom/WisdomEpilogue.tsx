import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { SiteFooter } from '@/components/site/SiteFooter';

const WISDOM_TEAL = '170 40% 30%';

const survivals = [
  { title: 'The Translations Survived', text: 'Latin copies of Arabic translations of Greek texts were already in Europe. The knowledge couldn\'t be un-known.' },
  { title: 'The Methods Survived', text: 'The scientific method, peer review, clinical trials — all pioneered here — spread faster than any army could chase.' },
  { title: 'The Language Survived', text: 'Algebra, algorithm, alchemy, zero, zenith. Every time you use these words, you speak the legacy of the House of Wisdom.' },
  { title: 'The Idea Survived', text: 'That knowledge belongs to humanity. That translation is sacred. That truth can be found through observation. These ideas shaped the Renaissance, the Enlightenment, and the modern world.' },
];

export const WisdomEpilogue = () => (
  <section id="wisdom-epilogue" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-20">
      <RevealOnScroll className="text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6" style={{ color: `hsl(${WISDOM_TEAL})` }}>
          But knowledge, once released, cannot be un-known.
        </h2>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-6">
        {survivals.map((s, i) => (
          <RevealOnScroll key={s.title} delay={0.08 * i}>
            <div className="p-6 rounded-lg" style={{
              background: `hsl(${WISDOM_TEAL} / 0.04)`,
              border: `1px solid hsl(${WISDOM_TEAL} / 0.1)`,
            }}>
              <h3 className="font-display text-lg font-bold mb-3" style={{ color: `hsl(${WISDOM_TEAL})` }}>{s.title}</h3>
              <p className="text-foreground/60 font-body text-sm leading-relaxed">{s.text}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Final thought */}
      <RevealOnScroll className="text-center pt-8">
        <p className="text-foreground/40 text-base font-body max-w-lg mx-auto leading-relaxed">
          The House of Wisdom stood for 400 years. Its destruction took 40 days. But the ideas it preserved and created shaped every century since — including ours.
        </p>
      </RevealOnScroll>

      {/* Credits */}
      <RevealOnScroll delay={0.2} className="text-center pt-12 border-t border-[hsl(170,40%,30%,0.1)]">
        <p className="text-xs tracking-[0.2em] uppercase text-foreground/30 font-body mb-2">An Epoch Lives Visual Essay</p>
        <p className="text-xs text-foreground/20 font-body">
          Sources: Al-Khalili, <em>The House of Wisdom</em> (2011); Lyons, <em>The House of Wisdom</em> (2009); Freely, <em>Light from the East</em> (2011)
        </p>
      </RevealOnScroll>
    </div>

    <SiteFooter />
  </section>
);
