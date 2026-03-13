import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { ManhattanTradeCard } from '@/components/visuals/ManhattanTradeCard';

const OCEAN = 'hsl(210, 40%, 8%)';
const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const DUTCH_BLUE = 'hsl(210, 60%, 40%)';

export const ManhattanTradeSection = () => {
  return (
    <section id="manhattan-trade" className="relative min-h-screen py-32 px-6" style={{ background: OCEAN }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: SAFFRON }}>
            1667 — The Treaty of Breda
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            Manhattan<br />
            <span style={{ color: SAFFRON }}>for a nutmeg island.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            The Treaty of Breda, signed on 31 July 1667, ended the Second Anglo-Dutch War.
            Among its provisions was an extraordinary exchange: England would keep
            <strong style={{ color: PARCHMENT }}> New Amsterdam</strong> — a fur-trading outpost
            on the tip of a swampy island — and rename it New York.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <p className="font-body text-lg leading-relaxed mb-10" style={{ color: SMOKE }}>
            In return, the Dutch would get undisputed control of <strong style={{ color: SAFFRON }}>Run</strong> —
            and with it, the complete monopoly on the world's nutmeg supply.
            At the time, the Dutch considered it a magnificent deal.
          </p>
        </RevealOnScroll>

        {/* Trade card visual */}
        <RevealOnScroll delay={0.6}>
          <ManhattanTradeCard />
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-body text-lg leading-relaxed mt-10" style={{ color: SMOKE }}>
            Both sides walked away satisfied. The Dutch had their monopoly.
            The English had a harbour. Neither could have imagined how
            history would judge this exchange.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
