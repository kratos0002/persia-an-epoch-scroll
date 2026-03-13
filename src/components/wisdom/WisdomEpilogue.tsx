import React, { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { KnowledgeGraph } from '@/components/visuals/KnowledgeGraph';
import { SiteFooter } from '@/components/site/SiteFooter';
import { EditionColophon } from '@/components/scroll/EditionColophon';

const WISDOM_TEAL = '170 40% 30%';

const survivals = [
  { title: 'The Translations Survived', text: 'Latin copies of Arabic translations of Greek texts were already in Europe. The knowledge couldn\'t be un-known.' },
  { title: 'The Methods Survived', text: 'The scientific method, peer review, clinical trials — all pioneered here — spread faster than any army could chase.' },
  { title: 'The Language Survived', text: 'Algebra, algorithm, alchemy, zero, zenith. Every time you use these words, you speak the legacy of the House of Wisdom.' },
  { title: 'The Idea Survived', text: 'That knowledge belongs to humanity. That translation is sacred. That truth can be found through observation.' },
];

export const WisdomEpilogue = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: graphRef, offset: ['start end', 'end center'] });
  const [reassembly, setReassembly] = useState(1); // starts destroyed

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      // Inverse: as user scrolls in, destruction decreases (1 → 0)
      setReassembly(Math.max(0, 1 - v * 1.5));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section id="wisdom-epilogue" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
      {/* Graph reassembly */}
      <div ref={graphRef} className="h-[80vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <KnowledgeGraph
            activePhase={3}
            progress={0}
            destructionProgress={reassembly}
          />
        </div>
      </div>

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

        <RevealOnScroll className="text-center pt-8">
          <p className="text-foreground/40 text-base font-body max-w-lg mx-auto leading-relaxed">
            The House of Wisdom stood for 400 years. Its destruction took 40 days. But the ideas it preserved and created shaped every century since — including ours.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <EditionColophon essayId="wisdom" variant="dark" />
          <p className="text-xs text-foreground/20 font-body text-center mt-4">
            Sources: Al-Khalili, <em>The House of Wisdom</em> (2011); Lyons, <em>The House of Wisdom</em> (2009); Freely, <em>Light from the East</em> (2011)
          </p>
        </RevealOnScroll>
      </div>

      <SiteFooter />
    </section>
  );
};
