import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { KnowledgeGraph } from '@/components/visuals/KnowledgeGraph';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition } from '@/components/visuals/EraTransition';

export const DestructionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const [dp, setDp] = useState(0);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0.3, 0.3, 0]);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      // Map scroll to destruction: starts at 25%, peaks at 75%
      setDp(Math.min(1, Math.max(0, (v - 0.25) / 0.5)));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section id="destruction" ref={sectionRef} style={{ '--era-primary': '0 70% 45%' } as React.CSSProperties}>
      {/* Red overlay driven by scroll */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background: 'radial-gradient(ellipse at 50% 50%, hsl(0, 70%, 35%) 0%, hsl(0, 70%, 20%) 100%)',
        }}
      />

      <div className="relative z-[2]">
        <StickyScroll
          graphic={(activeStep) => (
            <div className="w-full h-full relative">
              <div className="absolute inset-0" style={{
                background: `radial-gradient(ellipse at 50% 50%, hsl(0, 70%, 30% / ${0.05 + dp * 0.1}) 0%, transparent 70%)`,
              }} />
              <KnowledgeGraph
                activePhase={3}
                progress={0}
                destructionProgress={dp}
              />
            </div>
          )}
          steps={[
            <div key={0}>
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body text-[hsl(0,70%,55%,0.6)]">
                FEBRUARY 1258
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-[hsl(0,70%,55%)]">
                The Tigris Ran Black
              </h2>
              <p className="text-foreground/80 text-lg leading-relaxed font-body">
                Hulagu Khan's Mongol army breached the walls of Baghdad. The full knowledge graph is still intact — but not for long.
              </p>
            </div>,
            <div key={1}>
              <h3 className="font-display text-xl font-bold mb-4 text-[hsl(0,60%,50%)]">
                The Sacking Begins
              </h3>
              <p className="text-foreground/80 leading-relaxed font-body mb-3">
                What followed was not just a massacre of people. It was a massacre of knowledge.
              </p>
              <p className="text-foreground/60 leading-relaxed font-body">
                Watch the knowledge graph shatter as you scroll.
              </p>
            </div>,
            <div key={2}>
              <h3 className="font-display text-xl font-bold mb-4 text-[hsl(0,70%,50%)]">
                The Numbers
              </h3>
              <p className="text-foreground/80 leading-relaxed font-body mb-4">
                The Mongols threw the books into the Tigris. The water ran black with ink for six months.
              </p>
              <div className="flex gap-6">
                <AnimatedCounter end={3000000} label="Books destroyed" className="text-[hsl(0,70%,55%)]" />
                <AnimatedCounter end={90000} label="People killed" className="text-[hsl(0,70%,55%)]" />
              </div>
            </div>,
            <div key={3}>
              <blockquote className="border-l-2 border-[hsl(0,70%,45%)] pl-5 py-1">
                <p className="text-foreground/80 text-lg font-body italic leading-relaxed mb-3">
                  "They swept through the city like hungry falcons attacking a flight of doves."
                </p>
                <p className="text-foreground/40 text-sm font-body">
                  — Rashid al-Din, Persian historian
                </p>
              </blockquote>
              <p className="text-foreground/60 leading-relaxed font-body mt-4">
                Scholars were drowned alongside their life's work. Irrigation canals — some a thousand years old — were destroyed.
              </p>
            </div>,
          ]}
        />
      </div>

      <EraTransition fromColor="0 70% 45%" toColor="170 40% 30%" label="What Survived" />
    </section>
  );
};
