import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { InteractiveMap } from '@/components/visuals/InteractiveMap';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition, ERA_COLORS } from '@/components/visuals/EraTransition';

export const MongolSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.15, 0.15, 0]);

  return (
    <section id="mongol" ref={ref} style={{ '--era-primary': ERA_COLORS.mongol } as React.CSSProperties}>
      {/* Dramatic red overlay that fades in */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          opacity: overlayOpacity,
          background: 'radial-gradient(ellipse at center, hsl(25 70% 50% / 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Opening shock statement */}
      <div className="relative min-h-[70vh] flex items-center justify-center">
        <RevealOnScroll className="text-center max-w-3xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(25,70%,50%,0.6)] mb-4">1219 CE</p>
          <h2 className="font-display text-5xl md:text-7xl font-black mb-8">
            <span className="text-[hsl(25,70%,55%)]">Destruction</span>
          </h2>
          <p className="text-foreground/80 text-xl font-body leading-relaxed mb-4">
            Genghis Khan requested trade. The governor of Otrar beheaded his envoys.
          </p>
          <p className="text-foreground/50 text-lg font-body">
            What followed was the worst catastrophe in Persian history.
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <InteractiveMap
              empire="mongol"
              showCities
              highlightCities={['Merv', 'Samarkand', 'Baghdad', 'Isfahan']}
              className="aspect-[4/3] rounded-lg"
            />
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <AnimatedCounter end={90} suffix="%" label="Population lost in some cities" />
                <AnimatedCounter end={1.3} suffix="M" label="Killed in Merv alone" />
              </div>
              <p className="text-foreground/50 text-sm font-body italic">
                "They came, they sapped, they burnt, they slew, they plundered, and they departed."
              </p>
              <p className="text-foreground/30 text-xs font-body">— Ata-Malik Juvayni</p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-[hsl(25,70%,50%,0.85)] mb-4">
              The irrigation systems took 800 years to rebuild.
            </h3>
            <p className="text-foreground/50 text-lg font-body leading-relaxed">
              Some regions of Iran never recovered their pre-Mongol population levels until the 20th century.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      <EraTransition
        fromColor={ERA_COLORS.mongol}
        toColor={ERA_COLORS.safavid}
        year="1501 CE"
        label="Rebirth"
      />
    </section>
  );
};
