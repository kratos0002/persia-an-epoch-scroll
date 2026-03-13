import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const OCEAN = 'hsl(210, 40%, 8%)';
const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const DUTCH_BLUE = 'hsl(210, 60%, 40%)';

/* Simple spice route map — SVG */
const ROUTE_POINTS = [
  { x: 80, y: 120, label: 'Lisbon' },
  { x: 130, y: 220, label: 'W. Africa' },
  { x: 200, y: 310, label: 'Cape of Good Hope' },
  { x: 310, y: 210, label: 'Mozambique' },
  { x: 380, y: 155, label: 'Goa' },
  { x: 460, y: 165, label: 'Malacca' },
  { x: 520, y: 185, label: 'Banda Islands' },
];

export const VoyageSection = () => {
  const pathD = ROUTE_POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <section id="the-voyage" className="relative min-h-screen py-32 px-6" style={{ background: OCEAN }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: SPICE }}>
            1512 — The Voyage
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            18,000 miles<br />
            <span style={{ color: SAFFRON }}>for a handful of seeds.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            The Portuguese were first. In 1512, António de Abreu sailed from Malacca
            into the Banda Sea and found the Spice Islands — ten volcanic specks
            surrounded by deep blue water and the richest botanical treasure on earth.
          </p>
        </RevealOnScroll>

        {/* Route map */}
        <RevealOnScroll delay={0.5}>
          <div className="my-12 rounded-xl overflow-hidden" style={{ background: 'hsl(210, 35%, 5%)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <svg viewBox="0 0 600 360" className="w-full">
              {/* Grid lines */}
              {[100, 200, 300].map(y => (
                <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              ))}

              {/* Route glow */}
              <motion.path
                d={pathD}
                fill="none"
                stroke={SPICE}
                strokeWidth="6"
                opacity={0.15}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Route line */}
              <motion.path
                d={pathD}
                fill="none"
                stroke={SAFFRON}
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Stops */}
              {ROUTE_POINTS.map((pt, i) => {
                const isEnd = i === ROUTE_POINTS.length - 1;
                return (
                  <motion.g
                    key={pt.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i / ROUTE_POINTS.length) * 3, duration: 0.4 }}
                  >
                    <circle cx={pt.x} cy={pt.y} r={isEnd ? 6 : 3.5} fill={isEnd ? SAFFRON : SPICE} />
                    <text
                      x={pt.x} y={pt.y - 10}
                      textAnchor="middle"
                      fill={isEnd ? SAFFRON : 'rgba(255,255,255,0.6)'}
                      fontSize={isEnd ? '10' : '8'}
                      fontFamily="'Source Sans 3', system-ui, sans-serif"
                      fontWeight={isEnd ? '700' : '400'}
                    >
                      {pt.label}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            For eighty years, Portugal held a loose monopoly. But by the 1590s,
            a new power was rising in Europe — the Dutch Republic — and they wanted
            their share of the spice trade.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-body text-lg leading-relaxed" style={{ color: SMOKE }}>
            In 1602, they created the most powerful corporation in history:
            the <strong style={{ color: DUTCH_BLUE }}>Vereenigde Oostindische Compagnie</strong> — the VOC.
            It had the power to wage war, sign treaties, mint coins, and establish colonies.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
