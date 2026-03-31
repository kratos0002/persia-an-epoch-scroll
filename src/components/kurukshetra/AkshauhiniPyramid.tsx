import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AKSHAUHINI, ALLIANCES } from './kurukshetraData';
import { cn } from '@/lib/utils';

/* ── Unit tier for the pyramid ── */
const TIERS = [
  { label: 'Infantry', count: AKSHAUHINI.infantry, icon: '⚔', ratio: 5, color: 'var(--kuru-bronze)' },
  { label: 'Cavalry', count: AKSHAUHINI.cavalry, icon: '🐎', ratio: 3, color: 'var(--kuru-gold)' },
  { label: 'Elephants', count: AKSHAUHINI.elephants, icon: '🐘', ratio: 1, color: 'var(--kuru-red)' },
  { label: 'Chariots', count: AKSHAUHINI.chariots, icon: '☸', ratio: 1, color: 'var(--kuru-gold)' },
];

export const AkshauhiniPyramid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="kuru-logistics" className="relative bg-kuru-clay kuru-grain overflow-hidden">
      {/* Section header */}
      <div className="relative z-10 text-center pt-24 pb-8 px-6">
        <p className="kuru-chip inline-flex border-kuru-conch/20 text-kuru-conch/70 mb-4">Military Science</p>
        <h2 className="font-display text-3xl md:text-5xl tracking-[0.06em] text-kuru-conch">
          The Bronze Tablet
        </h2>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* LEFT: Akshauhini pyramid SVG */}
          <div className="lg:w-[55%] flex items-center justify-center px-6">
            <div className="w-full max-w-lg">
              <svg viewBox="0 0 500 400" className="w-full h-auto overflow-visible">
                {/* Pyramid tiers — bottom to top */}
                {TIERS.map((tier, i) => {
                  const tierIndex = TIERS.length - 1 - i; // reverse so infantry is at bottom
                  const w = 420 - tierIndex * 80;
                  const h = 70;
                  const x = 250 - w / 2;
                  const y = 50 + tierIndex * 85;

                  return (
                    <motion.g key={tier.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.2, duration: 0.8 }}
                    >
                      {/* Tier background */}
                      <rect x={x} y={y} width={w} height={h} rx={2}
                        fill={`hsl(${tier.color} / 0.12)`}
                        stroke={`hsl(${tier.color} / 0.3)`}
                        strokeWidth={0.8}
                      />

                      {/* Icon glyphs */}
                      {Array.from({ length: Math.min(tier.ratio * 3, 15) }).map((_, gi) => (
                        <text
                          key={gi}
                          x={x + 15 + gi * (w / (tier.ratio * 3 + 1))}
                          y={y + 35}
                          fontSize={tier.label === 'Infantry' ? 12 : 16}
                          textAnchor="middle"
                          opacity={0.4}
                        >
                          {tier.icon}
                        </text>
                      ))}

                      {/* Labels */}
                      <text x={x + w / 2} y={y + 55} textAnchor="middle"
                        className="font-display" fontSize={10}
                        fill="hsl(var(--kuru-conch))" opacity={0.7}
                        letterSpacing="0.15em"
                      >
                        {tier.label.toUpperCase()} · {tier.count.toLocaleString()}
                      </text>
                    </motion.g>
                  );
                })}

                {/* Ratio label */}
                <text x={250} y={400} textAnchor="middle" className="font-body" fontSize={11}
                  fill="hsl(var(--kuru-conch))" opacity={0.4}>
                  Ratio 1 : 1 : 3 : 5
                </text>
              </svg>

              {/* Army totals */}
              <motion.div
                className="flex justify-center gap-12 mt-8"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
              >
                <div className="text-center">
                  <span className="font-display text-3xl font-bold text-kuru-gold">{AKSHAUHINI.pandava}</span>
                  <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-kuru-conch/50 mt-1">
                    Pandava Akshauhinis
                  </span>
                  <span className="font-body text-xs text-kuru-conch/35">≈ 1.53 million</span>
                </div>
                <div className="text-center">
                  <span className="font-display text-3xl font-bold text-kuru-red">{AKSHAUHINI.kaurava}</span>
                  <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-kuru-conch/50 mt-1">
                    Kaurava Akshauhinis
                  </span>
                  <span className="font-body text-xs text-kuru-conch/35">≈ 2.41 million</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Alliance map / cards */}
          <div className="lg:w-[45%] px-6 lg:px-8">
            <h3 className="font-display text-sm tracking-[0.2em] uppercase text-kuru-bronze mb-6">
              Alliances & Participating Kingdoms
            </h3>
            <div className="space-y-3">
              {ALLIANCES.map((a, i) => (
                <motion.div
                  key={a.kingdom}
                  className={cn(
                    'flex items-start gap-3 rounded-sm border p-4',
                    a.faction === 'Pandava'
                      ? 'border-kuru-gold/20 bg-kuru-gold/[0.04]'
                      : 'border-kuru-red/20 bg-kuru-red/[0.04]'
                  )}
                  initial={{ opacity: 0, x: a.faction === 'Pandava' ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                >
                  <span className={cn(
                    'mt-1 h-2.5 w-2.5 rounded-full shrink-0',
                    a.faction === 'Pandava' ? 'bg-kuru-gold' : 'bg-kuru-red'
                  )} />
                  <div>
                    <span className="font-display text-sm text-kuru-conch tracking-wide">{a.kingdom}</span>
                    <span className="block font-body text-[11px] text-kuru-conch/45 mt-0.5">{a.leader}</span>
                  </div>
                  <span className={cn(
                    'ml-auto font-display text-[9px] uppercase tracking-[0.2em] mt-1',
                    a.faction === 'Pandava' ? 'text-kuru-gold/50' : 'text-kuru-red/50'
                  )}>
                    {a.faction}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
