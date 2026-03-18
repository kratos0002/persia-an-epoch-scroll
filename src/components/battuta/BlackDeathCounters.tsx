import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { IB, BLACK_DEATH_CITIES } from '@/components/visuals/battutaMapData';

export const BlackDeathCounters = () => (
  <section id="battuta-plague-data" className="relative py-20 px-6" style={{ background: IB.LEATHER }}>
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }}
    />
    <div className="max-w-3xl mx-auto relative z-10">
      <RevealOnScroll>
        <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: 'hsl(0, 0%, 55%)' }}>
          Peak Daily Death Tolls · 1348
        </p>
        <h3 className="font-display text-3xl font-bold text-center mb-12" style={{ color: IB.PARCHMENT }}>
          The Great Mortality
        </h3>
      </RevealOnScroll>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {BLACK_DEATH_CITIES.map((city, i) => (
          <RevealOnScroll key={city.city} delay={0.1 * i}>
            <div className="text-center py-6 px-4" style={{
              border: `1px solid hsl(0, 0%, 30%)`,
              background: 'hsla(0, 0%, 15%, 0.3)',
              borderRadius: 2,
            }}>
              <AnimatedCounter
                end={city.dailyDead}
                suffix="/day"
                className="mb-2"
              />
              <p className="font-display text-sm font-bold" style={{ color: IB.PARCHMENT }}>{city.city}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);
