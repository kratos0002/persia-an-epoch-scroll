import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { OilFlowGauge } from '@/components/visuals/OilFlowGauge';
import { StraitZoomMap } from '@/components/visuals/StraitZoomMap';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const BottleneckSection = () => {
  return (
    <section id="bottleneck" className="relative" style={{ background: NAVY }}>
      {/* Intro text */}
      <div className="min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <RevealOnScroll>
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: AMBER }}>
              Today — The 21-Mile Bottleneck
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
              One fifth of the<br />
              <span style={{ color: AMBER }}>world's oil.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
              Today, approximately <strong style={{ color: AMBER }}>21 million barrels of oil</strong> pass
              through the Strait of Hormuz every day — roughly one-fifth of global petroleum consumption.
              Liquefied natural gas, petrochemicals, and container shipping add to the flow.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.5}>
            <p className="font-body text-lg leading-relaxed mb-10" style={{ color: SMOKE }}>
              The strait is divided into two shipping lanes, each two miles wide,
              separated by a two-mile buffer zone. Every tanker, every carrier, every warship
              must thread through this six-mile corridor between Oman and Iran.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
            <div className="my-8">
              <OilFlowGauge />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.7}>
            <p className="font-body text-lg leading-relaxed" style={{ color: SMOKE }}>
              The US Fifth Fleet is permanently stationed in Bahrain. Aircraft carrier strike groups
              rotate through regularly. Iran's Revolutionary Guard Corps operates fast attack boats
              in the strait. Both sides know the stakes: close Hormuz, even briefly,
              and the global economy <strong style={{ color: TEAL }}>shudders</strong>.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* The zoom map */}
      <StraitZoomMap />
    </section>
  );
};
