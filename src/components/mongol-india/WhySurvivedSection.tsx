import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BURNT = 'hsl(15, 75%, 50%)';

const factors = [
  {
    label: 'Hindu Kush & Indus',
    value: '5,000m',
    detail: 'The highest mountain passes in the world funneled Mongol armies into predictable chokepoints. The Khyber Pass — the only viable route for large forces — gave Delhi months of warning.',
    icon: '⛰️',
  },
  {
    label: 'Military Adaptation',
    value: '300K',
    detail: 'Khalji\'s standing army was the largest professional military force in the medieval world. Unlike feudal levies, it could mobilize in days and fight year-round.',
    icon: '⚔️',
  },
  {
    label: 'Mongol Overextension',
    value: '4 fronts',
    detail: 'By the 1290s, the Mongol Empire had fractured into four khanates. The Chagatai Khanate that attacked India was simultaneously fighting the Ilkhanate and the Yuan Dynasty.',
    icon: '🗺️',
  },
  {
    label: 'Strategic Depth',
    value: '2,000 km',
    detail: 'Delhi was not a frontier city — it was 2,000 km from the Khyber Pass. Unlike Baghdad (near the frontier), any Mongol force reaching Delhi had outrun its supply lines.',
    icon: '📏',
  },
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {factors.map((factor, i) => (
            <RevealOnScroll key={i} delay={i * 0.12}>
              <div className="bg-card/60 backdrop-blur-lg rounded-lg border border-[hsl(15,75%,50%,0.1)] p-6 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{factor.icon}</span>
                  <h3 className="font-display text-lg font-bold" style={{ color: 'hsl(40, 25%, 90%)' }}>
                    {factor.label}
                  </h3>
                </div>
                <div className="mb-4">
                  {inView && (
                    <span className="font-display text-3xl md:text-4xl font-black" style={{ color: BURNT }}>
                      {factor.value}
                    </span>
                  )}
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(40, 25%, 70%)' }}>
                  {factor.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
