import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { PersianPattern } from '@/components/visuals/PersianPattern';
import { ERA_COLORS } from '@/components/visuals/EraTransition';

const timelineEras = [
  { year: '550 BCE', label: 'Achaemenid', color: `hsl(${ERA_COLORS.achaemenid})`, width: '18%' },
  { year: '330 BCE', label: 'Hellenistic', color: `hsl(${ERA_COLORS.alexander})`, width: '8%' },
  { year: '247 BCE', label: 'Parthian', color: `hsl(${ERA_COLORS.parthian})`, width: '18%' },
  { year: '224 CE', label: 'Sassanid', color: `hsl(${ERA_COLORS.sassanid})`, width: '16%' },
  { year: '651 CE', label: 'Islamic', color: `hsl(${ERA_COLORS.islamic})`, width: '14%' },
  { year: '1219', label: 'Mongol', color: `hsl(${ERA_COLORS.mongol})`, width: '8%' },
  { year: '1501', label: 'Safavid', color: `hsl(${ERA_COLORS.safavid})`, width: '10%' },
  { year: '1905', label: 'Modern', color: `hsl(${ERA_COLORS.modern})`, width: '8%' },
];

const legacyPoints = [
  { title: 'Human Rights', text: 'The Cyrus Cylinder predates the Magna Carta by 2,100 years.' },
  { title: 'Infrastructure', text: 'Roads, postal systems, standardized currency — Rome copied what Persia invented.' },
  { title: 'Knowledge', text: 'Algebra, algorithms, the Canon of Medicine — built on Persian scholarship.' },
  { title: 'Art & Beauty', text: 'Isfahan. The Shahnameh. Persian gardens. The word "paradise" is Persian.' },
];

export const EpilogueSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="epilogue" ref={ref} style={{ '--era-primary': ERA_COLORS.epilogue } as React.CSSProperties}>
      <motion.div className="relative py-24 md:py-40 overflow-hidden" style={{ scale, opacity }}>
        <PersianPattern variant="star" opacity={0.03} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <RevealOnScroll className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-gradient-gold">
              2,500 Years
            </h2>
            <p className="text-foreground/60 text-xl font-body max-w-xl mx-auto">
              One civilization. An unbroken thread from Cyrus to today.
            </p>
          </RevealOnScroll>

          {/* Timeline bar */}
          <RevealOnScroll delay={0.15} className="mb-20">
            <div className="flex h-10 rounded-full overflow-hidden shadow-lg">
              {timelineEras.map((era) => (
                <div
                  key={era.label}
                  className="relative group cursor-default flex items-center justify-center"
                  style={{ width: era.width, background: era.color }}
                >
                  <span className="text-[9px] font-body text-white/80 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 whitespace-nowrap">
                    {era.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-foreground/30 font-body">
              <span>550 BCE</span>
              <span>Today</span>
            </div>
          </RevealOnScroll>

          {/* Legacy points */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {legacyPoints.map((point, i) => (
              <RevealOnScroll key={point.title} delay={0.1 * i}>
                <div className="p-6 rounded-lg bg-card/30 border border-[hsl(43,85%,55%,0.08)]">
                  <h3 className="font-display text-lg font-bold text-[hsl(43,85%,55%,0.8)] mb-2">{point.title}</h3>
                  <p className="text-foreground/50 font-body leading-relaxed">{point.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Final quote */}
          <RevealOnScroll delay={0.3} className="text-center">
            <blockquote className="font-display text-2xl md:text-3xl italic text-foreground/60 leading-relaxed mb-6 max-w-2xl mx-auto">
              "The wound is the place where the Light enters you."
            </blockquote>
            <p className="text-foreground/30 text-sm font-body tracking-wider uppercase">— Rumi, 13th century</p>
          </RevealOnScroll>

          {/* Footer credits */}
          <RevealOnScroll delay={0.4} className="mt-24 pt-8 border-t border-border/10">
            <div className="text-center space-y-3">
              <p className="text-xs text-foreground/25 font-body">An Epoch Lives Visual Essay</p>
              <p className="text-xs text-foreground/15 font-body">
                Images: Wikimedia Commons (Public Domain) · Maps: Leaflet + CartoDB · Data: Historical consensus
              </p>
              <p className="text-xs text-foreground/10 font-body">
                Sources: Encyclopædia Iranica, Cambridge History of Iran, UNESCO World Heritage
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </motion.div>
    </section>
  );
};
