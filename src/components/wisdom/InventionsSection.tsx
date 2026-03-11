import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';

const inventions = [
  { title: 'Algebra', desc: 'al-Khwārizmī\'s al-Jabr gave the world systematic equation solving', icon: '∑' },
  { title: 'Algorithms', desc: 'Step-by-step procedures — the foundation of computer science', icon: '⟨⟩' },
  { title: 'Optics', desc: 'Ibn al-Haytham proved how light and vision work experimentally', icon: '◉' },
  { title: 'Cryptanalysis', desc: 'al-Kindī invented frequency analysis to break substitution ciphers', icon: '⌘' },
  { title: 'Clinical Medicine', desc: 'al-Rāzī pioneered controlled experiments and clinical observation', icon: '✦' },
  { title: 'Mechanical Engineering', desc: 'The Banū Mūsā built self-operating machines and hydraulic automata', icon: '⚙' },
];

export const InventionsSection = () => (
  <section id="inventions" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <div className="max-w-5xl mx-auto px-6 py-24 space-y-20">
      <RevealOnScroll className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>
          THE LEGACY
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: `hsl(${WISDOM_TEAL})` }}>
          What They Built
        </h2>
        <p className="text-foreground/50 text-lg font-body max-w-xl mx-auto">
          Not just translations. Entire fields of knowledge that didn't exist before.
        </p>
      </RevealOnScroll>

      {/* Counters */}
      <RevealOnScroll className="flex flex-wrap justify-center gap-12">
        <AnimatedCounter end={10000} suffix="+" label="Texts translated" className="text-[hsl(170,45%,50%)]" />
        <AnimatedCounter end={6} label="Fields invented or transformed" className="text-[hsl(170,45%,50%)]" />
        <AnimatedCounter end={400} suffix=" years" label="Of continuous scholarship" className="text-[hsl(170,45%,50%)]" />
      </RevealOnScroll>

      {/* Inventions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {inventions.map((inv, i) => (
          <RevealOnScroll key={inv.title} delay={0.06 * i}>
            <div className="p-5 rounded-lg border transition-colors" style={{
              background: `hsl(${WISDOM_TEAL} / 0.04)`,
              borderColor: `hsl(${WISDOM_TEAL} / 0.1)`,
            }}>
              <span className="text-2xl mb-3 block" style={{ color: `hsl(${WISDOM_TEAL})` }}>{inv.icon}</span>
              <h3 className="font-display text-lg font-bold mb-2" style={{ color: `hsl(${WISDOM_TEAL})` }}>{inv.title}</h3>
              <p className="text-foreground/60 text-sm font-body leading-relaxed">{inv.desc}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>

    <EraTransition fromColor={WISDOM_TEAL} toColor="215 55% 45%" year="1100 CE" label="The Knowledge Travels" />
  </section>
);
