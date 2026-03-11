import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { KnowledgeGraph } from '@/components/visuals/KnowledgeGraph';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';

export const TranslationSection = () => (
  <section id="translation" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="w-full h-full relative">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 50% 50%, hsl(${WISDOM_TEAL} / 0.06) 0%, hsl(var(--background)) 70%)`,
          }} />
          <KnowledgeGraph
            activePhase={Math.min(activeStep, 3)}
            progress={0}
          />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>830 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: `hsl(170, 45%, 50%)` }}>
            The Translation Movement
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body mb-4">
            Al-Ma'mun paid translators the weight of their finished books in gold.
          </p>
          <p className="text-foreground/60 text-base leading-relaxed font-body">
            This was not charity. It was the most ambitious intellectual project in human history.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(170, 45%, 50% / 0.85)` }}>
            Hunayn ibn Ishaq
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            He translated 116 works from Greek to Arabic. He invented an entire medical vocabulary.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            When a Greek term had no Arabic equivalent, he created one. Many are still used today.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(170, 45%, 50% / 0.85)` }}>
            Beyond Translation
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            They didn't just translate. They corrected Ptolemy. They extended Euclid. They argued with Aristotle.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            This wasn't preservation — it was acceleration. Every text became a launchpad.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(170, 45%, 50% / 0.85)` }}>
            The Network Grows
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            From Baghdad, knowledge radiated outward — to Córdoba, to Palermo, to Constantinople.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Each translated text spawned new discoveries. The graph of human knowledge was expanding exponentially.
          </p>
        </div>,
      ]}
    />
    <EraTransition fromColor={WISDOM_TEAL} toColor={WISDOM_TEAL} year="850 CE" label="The Scholars" />
  </section>
);
