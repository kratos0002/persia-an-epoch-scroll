import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const RED = 'hsl(0, 65%, 50%)';
const PORT_GREEN = 'hsl(140, 40%, 35%)';

/* Full-bleed fortress SVG — the visual backbone */
const FortressVisual = () => (
  <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
    {/* Water */}
    {[...Array(12)].map((_, i) => (
      <motion.path
        key={i}
        d={`M0 ${350 + i * 12} Q${200 + i * 15} ${340 + i * 12} 400 ${350 + i * 12} Q${600 - i * 10} ${360 + i * 12} 800 ${350 + i * 12}`}
        stroke={TEAL}
        strokeWidth="0.5"
        opacity={0.08 + i * 0.015}
        fill="none"
      />
    ))}

    {/* Island */}
    <ellipse cx="400" cy="300" rx="220" ry="35" fill="hsl(30, 20%, 15%)" opacity="0.6" />

    {/* Main fortress walls */}
    <rect x="220" y="140" width="360" height="150" rx="3" stroke={PORT_GREEN} strokeWidth="2" opacity="0.6" />
    {/* Inner courtyard */}
    <rect x="280" y="170" width="240" height="90" rx="2" stroke={PORT_GREEN} strokeWidth="1" opacity="0.3" />

    {/* Corner towers */}
    {[
      [200, 120, 50, 175],
      [550, 120, 50, 175],
    ].map(([x, y, w, h], i) => (
      <g key={i}>
        <rect x={x} y={y} width={w} height={h} rx="3" stroke={PORT_GREEN} strokeWidth="2" opacity="0.6" />
        {/* Battlements */}
        {[...Array(4)].map((_, j) => (
          <rect key={j} x={x + 5 + j * 12} y={y - 8} width={6} height={8} fill={PORT_GREEN} opacity="0.3" />
        ))}
      </g>
    ))}

    {/* Gate arch */}
    <path d="M370 290 L370 230 Q400 195 430 230 L430 290" stroke={AMBER} strokeWidth="1.5" opacity="0.6" />

    {/* Portuguese flag */}
    <line x1="400" y1="140" x2="400" y2="75" stroke={PARCHMENT} strokeWidth="1" opacity="0.6" />
    <rect x="402" y="75" width="35" height="25" fill={PORT_GREEN} opacity="0.4" />
    <rect x="402" y="88" width="35" height="12" fill={RED} opacity="0.4" />

    {/* Cannons pointing outward */}
    {[
      [210, 180, 170, 175, 'left'],
      [610, 180, 650, 175, 'right'],
      [210, 240, 170, 235, 'left'],
      [610, 240, 650, 235, 'right'],
    ].map(([cx, cy, tx, ty], i) => (
      <g key={i}>
        <circle cx={cx as number} cy={cy as number} r="4" fill={SMOKE} opacity="0.5" />
        <line x1={cx as number} y1={cy as number} x2={tx as number} y2={ty as number} stroke={SMOKE} strokeWidth="2" opacity="0.4" />
      </g>
    ))}

    {/* Dhows in water */}
    {[
      [120, 380],
      [650, 370],
      [300, 410],
    ].map(([x, y], i) => (
      <g key={i} opacity={0.25}>
        <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke={PARCHMENT} strokeWidth="1" />
        <path d={`M${x} ${y} L${x} ${y - 15} L${x + 12} ${y - 5}`} stroke={PARCHMENT} strokeWidth="0.5" fill="none" />
      </g>
    ))}
  </svg>
);

export const PortugalSection = () => {
  return (
    <section id="portugal-seizes" className="relative" style={{ height: '400vh' }}>
      {/* Sticky full-bleed fortress visual */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-0 flex items-center justify-center px-12">
          <FortressVisual />
        </div>
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, hsla(215, 45%, 8%, 0.6) 100%)' }} />
      </div>

      {/* Floating narrative cards */}
      <div className="relative z-10" style={{ marginTop: '-400vh' }}>
        {/* Card 1 — Left */}
        <div className="h-screen flex items-center px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(140, 40%, 35%, 0.15)` }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: PORT_GREEN }}>
              1507 — Portugal Seizes the Throat
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black leading-[0.95] mb-4" style={{ color: PARCHMENT }}>
              Albuquerque's <span style={{ color: RED }}>chokepoint strategy.</span>
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
              <strong style={{ color: PARCHMENT }}>Afonso de Albuquerque</strong> sailed into the strait
              with six ships and a radical idea: you don't need to conquer territory —
              you need to control the <em>passages</em>.
            </p>
          </motion.div>
        </div>

        {/* Card 2 — Right */}
        <div className="h-screen flex items-center justify-end px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(140, 40%, 35%, 0.15)` }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm leading-relaxed mb-4" style={{ color: SMOKE }}>
              He identified three chokepoints controlling all trade between Europe, Africa, and Asia:
              <strong style={{ color: RED }}> Hormuz</strong>,{' '}
              <strong style={{ color: RED }}>Goa</strong>, and{' '}
              <strong style={{ color: RED }}>Malacca</strong>.
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
              The fortress was built on a barren, waterless island — deliberately.
              It needed no farmland, only cannons pointed at passing ships.
              Any vessel entering the Gulf had to pay tribute or be sunk.
            </p>
          </motion.div>
        </div>

        {/* Card 3 — Left */}
        <div className="h-screen flex items-center px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(140, 40%, 35%, 0.15)` }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
              Portugal held Hormuz for over a century — from 1507 to 1622, when a joint
              <strong style={{ color: PARCHMENT }}> Safavid-English</strong> force finally expelled them.
              The lesson was permanent: whoever controls the narrow places controls the wealth.
            </p>
          </motion.div>
        </div>

        {/* Card 4 — Center quote */}
        <div className="h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-md p-8 rounded-xl backdrop-blur-md text-center"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(140, 40%, 35%, 0.1)` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-xl md:text-2xl italic leading-relaxed mb-2" style={{ color: PORT_GREEN }}>
              "Give me Hormuz, Goa, and Malacca, and the world is yours."
            </p>
            <p className="text-xs font-body" style={{ color: SMOKE }}>
              — Attributed to Afonso de Albuquerque
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
