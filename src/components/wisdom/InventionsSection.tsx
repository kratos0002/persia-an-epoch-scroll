import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { KnowledgeFlow } from '@/components/visuals/KnowledgeFlow';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';

export const InventionsSection = () => (
  <section id="inventions" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => (
        <div className="w-full h-full relative">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 50% 50%, hsl(${WISDOM_TEAL} / 0.05) 0%, transparent 70%)`,
          }} />
          <KnowledgeFlow activeStep={activeStep} />
        </div>
      )}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>THE LEGACY</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: `hsl(${WISDOM_TEAL})` }}>
            What They Built
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body">
            Not just translations. Entire fields of knowledge that didn't exist before.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(170, 45%, 45%)` }}>
            The Translation Machine
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            10,000+ texts translated. Greek, Persian, Sanskrit, Syriac — all rendered into Arabic.
          </p>
          <AnimatedCounter end={10000} suffix="+" label="Texts translated" className="text-[hsl(170,45%,50%)]" />
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(170, 55%, 40%)` }}>
            New Fields Born
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-3">
            Algebra. Algorithms. Optics. Cryptanalysis. Clinical medicine. Mechanical engineering.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Six fields invented or fundamentally transformed in one building.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(215, 55%, 50%)` }}>
            The Renaissance Pipeline
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Through Toledo, Palermo, and Constantinople, these ideas reached Europe and ignited the Renaissance.
          </p>
          <div className="flex gap-8">
            <AnimatedCounter end={400} suffix=" years" label="Of scholarship" className="text-[hsl(215,55%,55%)]" />
            <AnimatedCounter end={6} label="Fields created" className="text-[hsl(215,55%,55%)]" />
          </div>
        </div>,
      ]}
    />
    <EraTransition fromColor={WISDOM_TEAL} toColor="215 55% 45%" year="1100 CE" label="The Knowledge Travels" />
  </section>
);
