import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { IB, TRAVEL_COMPARISONS } from '@/components/visuals/battutaMapData';

export const ComparativeScale = () => {
  const maxDist = Math.max(...TRAVEL_COMPARISONS.map(c => c.distance));

  return (
    <section id="battuta-scale" className="relative py-24 px-6" style={{ background: IB.PARCHMENT }}>
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: IB.HENNA }}>
            Quantitative Analysis
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: IB.INK }}>
            The Scale of the Achievement
          </h2>
          <p className="font-body text-sm text-center mb-12" style={{ color: IB.INK_LIGHT }}>
            Comparative travel distances of pre-modern explorers
          </p>
        </RevealOnScroll>

        {/* Counter row */}
        <RevealOnScroll delay={0.1}>
          <div className="grid grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <AnimatedCounter end={117000} suffix=" km" label="Ibn Battuta" />
            </div>
            <div className="text-center">
              <AnimatedCounter end={50000} suffix=" km" label="Zheng He" />
            </div>
            <div className="text-center">
              <AnimatedCounter end={24000} suffix=" km" label="Marco Polo" />
            </div>
          </div>
        </RevealOnScroll>

        {/* Bar comparison */}
        <RevealOnScroll delay={0.2}>
          <div className="space-y-4">
            {TRAVEL_COMPARISONS.map((comp, i) => (
              <div key={comp.explorer} className="flex items-center gap-4">
                <div className="w-28 text-right">
                  <span className="font-display text-sm font-bold" style={{ color: IB.INK }}>{comp.explorer}</span>
                  <br />
                  <span className="text-[9px] font-body" style={{ color: IB.INK_LIGHT }}>{comp.years}</span>
                </div>
                <div className="flex-1 h-6 relative" style={{ background: `${IB.PARCHMENT_DK}60`, borderRadius: 2 }}>
                  <motion.div
                    className="h-full"
                    style={{
                      background: i === 0 ? IB.SAFFRON : i === 1 ? IB.LAPIS : IB.HENNA,
                      borderRadius: 2,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(comp.distance / maxDist) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 * i, ease: 'easeOut' }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-body font-semibold" style={{ color: IB.INK }}>
                    {comp.distance.toLocaleString()} km
                  </span>
                </div>
              </div>
            ))}

            {/* Earth's circumference reference */}
            <div className="flex items-center gap-4 mt-2">
              <div className="w-28 text-right">
                <span className="font-body text-xs italic" style={{ color: IB.INK_LIGHT }}>Earth's circumference</span>
              </div>
              <div className="flex-1 h-px relative">
                <div className="absolute top-0 h-px w-full" style={{ background: `${IB.EMERALD}60` }}>
                  <div className="absolute -top-2 text-[8px] font-body" style={{ color: IB.EMERALD, left: `${(40075 / maxDist) * 100}%` }}>
                    40,075 km ↑
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-sm italic text-center mt-12" style={{ color: IB.SAFFRON_DIM }}>
            Ibn Battuta covered approximately three times the circumference of the Earth — a distance not surpassed until the age of steam.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
