import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { IB, TRAVEL_COMPARISONS } from '@/components/visuals/battutaMapData';

/**
 * Comparative Scale section redesigned with route paths on a world outline
 * instead of bar charts. Each explorer's route is drawn as a colored line.
 */

// Simplified world coastline path
const WORLD_OUTLINE = "M 50,100 Q 60,80 80,75 L 100,72 Q 115,65 130,68 L 145,60 Q 155,55 165,60 L 175,58 Q 185,55 195,62 L 210,55 Q 220,50 235,55 L 250,48 Q 260,52 275,58 L 290,52 Q 310,48 330,55 L 350,52 Q 365,56 375,65 L 385,70 Q 380,82 370,90 L 355,95 Q 340,100 325,95 L 310,100 Q 295,105 280,98 L 265,105 Q 250,112 240,108 L 225,112 Q 210,118 195,110 L 175,115 Q 155,120 140,112 L 120,115 Q 100,120 80,110 L 65,108 Q 55,105 50,100 Z";

// Stylized route paths for each explorer
const EXPLORER_ROUTES = [
  {
    name: 'Ibn Battuta',
    path: "M 90,98 Q 110,85 130,78 L 155,65 Q 175,60 195,65 L 215,58 Q 235,55 260,60 L 275,55 Q 290,52 310,58 L 340,55 Q 350,60 345,70 L 330,80 Q 310,90 280,95 L 260,88 Q 240,82 220,90 L 200,85 Q 180,78 160,82 L 140,88 Q 120,95 100,100 L 85,105 Q 80,110 90,115 L 105,120",
    color: IB.SAFFRON,
    distance: 117000,
    years: '1325–1354',
  },
  {
    name: 'Zheng He',
    path: "M 320,65 Q 310,75 290,82 L 270,90 Q 250,95 230,100 L 210,105 Q 200,110 195,115",
    color: IB.LAPIS,
    distance: 50000,
    years: '1405–1433',
  },
  {
    name: 'Marco Polo',
    path: "M 140,72 Q 170,65 200,60 L 230,55 Q 260,52 290,55 L 320,58",
    color: IB.HENNA,
    distance: 24000,
    years: '1271–1295',
  },
];

export const ExplorerRoutes = () => (
  <section id="battuta-scale" className="relative py-24 px-6 battuta-vellum-grain battuta-foxing" style={{ background: IB.PARCHMENT }}>
    <div className="max-w-4xl mx-auto">
      <RevealOnScroll>
        <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: IB.HENNA }}>
          Quantitative Analysis
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-2 battuta-gilt" style={{ color: IB.INK }}>
          The Scale of the Achievement
        </h2>
        <p className="font-body text-sm text-center mb-16" style={{ color: IB.INK_LIGHT }}>
          Comparative travel distances of pre-modern explorers
        </p>
      </RevealOnScroll>

      {/* World map with routes */}
      <RevealOnScroll delay={0.1}>
        <div className="relative w-full max-w-3xl mx-auto mb-12">
          <svg viewBox="30 35 380 100" className="w-full" style={{ overflow: 'visible' }}>
            {/* World coastline */}
            <path d={WORLD_OUTLINE} fill={`${IB.PARCHMENT_DK}40`} stroke={IB.INK_LIGHT} strokeWidth={0.5} opacity={0.3} />

            {/* Explorer routes — drawn in reverse order so Battuta is on top */}
            {[...EXPLORER_ROUTES].reverse().map((explorer, i) => (
              <motion.path key={explorer.name}
                d={explorer.path}
                fill="none"
                stroke={explorer.color}
                strokeWidth={explorer.name === 'Ibn Battuta' ? 2.5 : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={explorer.name === 'Ibn Battuta' ? 0.9 : 0.5}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: (EXPLORER_ROUTES.length - 1 - i) * 0.6, ease: 'easeInOut' }}
              />
            ))}
          </svg>

          {/* Legend overlaid */}
          <div className="flex justify-center gap-8 mt-4">
            {EXPLORER_ROUTES.map(e => (
              <div key={e.name} className="flex items-center gap-2">
                <div className="w-6 h-0.5 rounded-full" style={{ background: e.color }} />
                <span className="font-body text-xs font-semibold" style={{ color: IB.INK }}>{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Circumference reference */}
      <RevealOnScroll delay={0.3}>
        <div className="flex justify-center mb-12">
          <svg width={200} height={200} viewBox="0 0 200 200">
            {[1, 2, 3].map(i => (
              <motion.circle key={i}
                cx={100} cy={100} r={30 * i}
                fill="none" stroke={IB.SAFFRON} strokeWidth={1}
                strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 - i * 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.4 }}
              />
            ))}
            <text x={100} y={96} textAnchor="middle" fontSize={9} fontFamily="'Cormorant Garamond', serif" fontWeight={700} fill={IB.INK}>
              3× Earth's
            </text>
            <text x={100} y={110} textAnchor="middle" fontSize={8} fontFamily="'Cormorant Garamond', serif" fill={IB.INK_LIGHT}>
              circumference
            </text>
          </svg>
        </div>
      </RevealOnScroll>

      {/* Counter row */}
      <RevealOnScroll delay={0.4}>
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {EXPLORER_ROUTES.map(e => (
            <div key={e.name} className="text-center py-6 px-4" style={{
              border: `1.5px solid ${e.color}40`,
              background: `${IB.PARCHMENT_DK}30`,
              borderRadius: 2,
            }}>
              <AnimatedCounter end={e.distance} suffix=" km" className="mb-1" />
              <p className="font-display text-sm font-bold" style={{ color: IB.INK }}>{e.name}</p>
              <p className="font-body text-[9px]" style={{ color: IB.INK_LIGHT }}>{e.years}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.5}>
        <p className="font-body text-sm italic text-center mt-12" style={{ color: IB.SAFFRON_DIM }}>
          Ibn Battuta covered approximately three times the circumference of the Earth — a distance not surpassed until the age of steam.
        </p>
      </RevealOnScroll>
    </div>
  </section>
);
