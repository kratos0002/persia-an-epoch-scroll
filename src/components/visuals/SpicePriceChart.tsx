import React from 'react';
import { motion } from 'framer-motion';

const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';
const GOLD_BAR = 'hsl(48, 80%, 50%)';
const SMOKE = 'hsl(210, 15%, 40%)';

const ITEMS = [
  { label: 'Nutmeg', value: 85, color: SAFFRON, sub: 'per ounce in London, c. 1550' },
  { label: 'Gold', value: 20, color: GOLD_BAR, sub: 'per ounce, same period' },
  { label: 'Silver', value: 3, color: 'hsl(210, 10%, 60%)', sub: 'per ounce' },
];

export const SpicePriceChart = () => {
  return (
    <div className="relative rounded-xl p-6" style={{ background: 'hsl(210, 35%, 6%)', border: '1px solid rgba(180,100,30,0.15)' }}>
      <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: SMOKE }}>
        Relative value per ounce — 16th century London
      </p>

      <div className="space-y-5">
        {ITEMS.map((item, i) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-display text-sm font-bold" style={{ color: item.color }}>{item.label}</span>
              <span className="text-[10px] font-body" style={{ color: SMOKE }}>{item.sub}</span>
            </div>
            <div className="relative h-5 rounded-full overflow-hidden" style={{ background: 'hsl(210, 30%, 10%)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${item.color}40, ${item.color})` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-body mt-5 text-center italic" style={{ color: SMOKE, opacity: 0.6 }}>
        Nutmeg's markup from source to market: ~60,000%
      </p>
    </div>
  );
};
