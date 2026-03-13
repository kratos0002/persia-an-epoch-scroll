import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BURNT = 'hsl(15, 75%, 50%)';
const GOLD = 'hsl(40, 60%, 55%)';

const factors = [
  {
    label: 'Hindu Kush & Indus',
    value: 5000,
    suffix: 'm',
    detail: 'The highest mountain passes in the world funneled Mongol armies into predictable chokepoints. The Khyber Pass — the only viable route for large forces — gave Delhi months of warning.',
    icon: '⛰️',
    barWidth: 95,
  },
  {
    label: 'Military Adaptation',
    value: 300,
    suffix: 'K',
    detail: 'Khalji\'s standing army was the largest professional military force in the medieval world. Unlike feudal levies, it could mobilize in days and fight year-round.',
    icon: '⚔️',
    barWidth: 80,
  },
  {
    label: 'Mongol Overextension',
    value: 4,
    suffix: ' fronts',
    detail: 'By the 1290s, the Mongol Empire had fractured into four khanates. The Chagatai Khanate that attacked India was simultaneously fighting the Ilkhanate and the Yuan Dynasty.',
    icon: '🗺️',
    barWidth: 60,
  },
  {
    label: 'Strategic Depth',
    value: 2000,
    suffix: ' km',
    detail: 'Delhi was not a frontier city — it was 2,000 km from the Khyber Pass. Unlike Baghdad (near the frontier), any Mongol force reaching Delhi had outrun its supply lines.',
    icon: '📏',
    barWidth: 75,
  },
];

const DistanceComparison = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="bg-card/60 backdrop-blur-lg rounded-lg border border-[hsl(15,75%,50%,0.1)] p-6 md:p-8">
      <p className="font-display text-sm font-semibold mb-4" style={{ color: GOLD }}>Distance from Frontier to Capital</p>
      {/* Baghdad comparison */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="font-body text-xs" style={{ color: 'hsl(40, 25%, 60%)' }}>Baghdad → Mongol Frontier</span>
          <span className="font-display text-sm font-bold" style={{ color: 'hsl(0, 60%, 50%)' }}>~200 km</span>
        </div>
        <div className="w-full h-3 rounded-full" style={{ background: 'hsl(220, 20%, 15%)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'hsl(0, 60%, 40%)' }}
            initial={{ width: 0 }}
            animate={inView ? { width: '10%' } : {}}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="font-body text-[10px] mt-1 italic" style={{ color: 'hsl(0, 40%, 45%)' }}>Fell in 1258</p>
      </div>
      {/* Delhi comparison */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-body text-xs" style={{ color: 'hsl(40, 25%, 60%)' }}>Delhi → Khyber Pass</span>
          <span className="font-display text-sm font-bold" style={{ color: BURNT }}>~2,000 km</span>
        </div>
        <div className="w-full h-3 rounded-full" style={{ background: 'hsl(220, 20%, 15%)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: BURNT }}
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
          />
        </div>
        <p className="font-body text-[10px] mt-1 italic" style={{ color: 'hsl(15, 40%, 50%)' }}>Held</p>
      </div>
    </div>
  );
};

export const WhySurvivedSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="mi-why" className="relative py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <p className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: BURNT, opacity: 0.6 }}>
            Analysis
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(40, 25%, 90%)' }}>
            Why India Survived
          </h2>
          <p className="font-body text-lg leading-relaxed mb-12 max-w-2xl" style={{ color: 'hsl(40, 25%, 70%)' }}>
            Persia fell. Baghdad fell. China fell. Russia fell. Why did the Delhi Sultanate hold?
            No single factor explains it — but four factors together made India the exception.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {factors.map((factor, i) => (
            <RevealOnScroll key={i} delay={i * 0.12}>
              <div className="bg-card/60 backdrop-blur-lg rounded-lg border border-[hsl(15,75%,50%,0.1)] p-6 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{factor.icon}</span>
                  <h3 className="font-display text-lg font-bold" style={{ color: 'hsl(40, 25%, 90%)' }}>
                    {factor.label}
                  </h3>
                </div>
                {/* Animated counter */}
                <div className="mb-3">
                  {inView && (
                    <AnimatedCounter
                      end={factor.value}
                      suffix={factor.suffix}
                      className="text-left"
                    />
                  )}
                </div>
                {/* Visual bar */}
                <div className="w-full h-1.5 rounded-full mb-4" style={{ background: 'hsl(220, 20%, 15%)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: BURNT }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${factor.barWidth}%` } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(40, 25%, 70%)' }}>
                  {factor.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Distance comparison visualization */}
        <RevealOnScroll delay={0.5}>
          <div className="max-w-xl mx-auto">
            <DistanceComparison />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
