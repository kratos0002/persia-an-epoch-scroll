import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { SurveillanceGraphic } from '@/components/visuals/SurveillanceGraphic';

const BURNT = 'hsl(15, 75%, 50%)';

export const PriceSection = () => (
  <section id="mi-price" className="relative py-24 md:py-32 px-6">
    <div className="max-w-3xl mx-auto">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: BURNT, opacity: 0.6 }}>
          1303–1316 · The Cost
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-8" style={{ color: 'hsl(40, 25%, 90%)' }}>
          The Price of Survival
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <p className="font-body text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'hsl(40, 25%, 75%)' }}>
          The methods that saved India from the Mongols created one of the most
          repressive regimes in medieval history. Khalji's price controls required
          a surveillance state to enforce. Markets were monitored by three
          overlapping spy networks. Merchants who cheated on prices had flesh
          cut from their bodies.
        </p>
      </RevealOnScroll>

      {/* Surveillance graphic */}
      <RevealOnScroll delay={0.2}>
        <SurveillanceGraphic />
      </RevealOnScroll>

      <RevealOnScroll delay={0.3}>
        <div className="bg-card/60 backdrop-blur-lg rounded-lg border border-[hsl(15,75%,50%,0.1)] p-6 md:p-8 mb-8">
          <div className="space-y-4">
            {[
              { policy: 'No social gatherings', detail: 'Nobles were banned from hosting feasts or meeting privately — any assembly could be a conspiracy.' },
              { policy: 'No alcohol', detail: 'Total prohibition. Wine was poured into the streets. The Sultan feared drunk nobles plotting.' },
              { policy: 'No intermarriage without permission', detail: 'Noble families could not intermarry without royal consent — preventing alliance-building.' },
              { policy: 'Total wealth surveillance', detail: 'Khalji\'s spies reported on what nobles ate, who they met, and how they spent their money.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="w-1 rounded-full flex-shrink-0" style={{ background: BURNT, opacity: 0.4 }} />
                <div>
                  <p className="font-display text-sm font-bold mb-1" style={{ color: BURNT }}>{item.policy}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(40, 25%, 70%)' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.4}>
        <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: 'hsl(40, 25%, 75%)' }}>
          Khalji died in 1316, likely poisoned by his own general, Malik Kafur.
          Within four years, his dynasty was overthrown. The totalitarian machine
          he built could not survive its creator. But the Mongols never came back.
        </p>
      </RevealOnScroll>
    </div>
  </section>
);
