import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { KnowledgeGraph } from '@/components/visuals/KnowledgeGraph';
import { EraTransition } from '@/components/visuals/EraTransition';

export const DestructionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0, 0.25, 0]);

  return (
    <section id="destruction" ref={ref} style={{ '--era-primary': '0 70% 45%' } as React.CSSProperties}>
      {/* Red overlay */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background: 'radial-gradient(ellipse at 50% 50%, hsl(0, 70%, 35%) 0%, hsl(0, 70%, 20%) 100%)',
        }}
      />

      <div className="relative z-[2]">
        {/* Dramatic opening */}
        <div className="min-h-screen flex items-center justify-center px-6">
          <RevealOnScroll className="text-center max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body text-[hsl(0,70%,55%,0.6)]">
              FEBRUARY 1258
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-[hsl(0,70%,55%)]">
              The Tigris Ran Black
            </h2>
            <p className="text-foreground/80 text-xl font-body leading-relaxed mb-4">
              Hulagu Khan's Mongol army breached the walls of Baghdad.
            </p>
            <p className="text-foreground/60 text-lg font-body leading-relaxed">
              What followed was not just a massacre of people. It was a massacre of knowledge.
            </p>
          </RevealOnScroll>
        </div>

        {/* Shattered graph */}
        <div className="h-[60vh] relative">
          <KnowledgeGraph activePhase={3} progress={0} isDestroyed={true} />
        </div>

        {/* Data points */}
        <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
          <RevealOnScroll className="flex flex-wrap justify-center gap-12">
            <AnimatedCounter end={3000000} label="Books destroyed (estimated)" className="text-[hsl(0,70%,55%)]" />
            <AnimatedCounter end={90000} label="People killed" className="text-[hsl(0,70%,55%)]" />
          </RevealOnScroll>

          <RevealOnScroll className="max-w-2xl mx-auto text-center">
            <p className="text-foreground/70 text-xl font-body leading-relaxed mb-6">
              The Mongols threw the books into the Tigris. The water ran black with ink for six months.
            </p>
            <p className="text-foreground/60 text-lg font-body leading-relaxed">
              Scholars were drowned alongside their life's work. Astronomical instruments were melted for the metal. Irrigation canals — some a thousand years old — were destroyed. The population wouldn't recover for centuries.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <blockquote className="max-w-xl mx-auto border-l-2 border-[hsl(0,70%,45%)] pl-6 py-2">
              <p className="text-foreground/80 text-xl font-body italic leading-relaxed mb-3">
                "They swept through the city like hungry falcons attacking a flight of doves."
              </p>
              <p className="text-foreground/40 text-sm font-body">
                — Rashid al-Din, Persian historian
              </p>
            </blockquote>
          </RevealOnScroll>
        </div>
      </div>

      <EraTransition fromColor="0 70% 45%" toColor="170 40% 30%" label="What Survived" />
    </section>
  );
};
