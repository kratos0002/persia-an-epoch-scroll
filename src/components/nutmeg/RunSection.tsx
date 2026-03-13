import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const OCEAN = 'hsl(210, 40%, 8%)';
const SPICE = 'hsl(25, 75%, 45%)';
const SAFFRON = 'hsl(35, 90%, 55%)';
const DUTCH_BLUE = 'hsl(210, 60%, 40%)';
const ENGLISH_RED = 'hsl(0, 65%, 48%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

/* Fort SVG illustration */
const FortIllustration = () => (
  <div className="my-12 rounded-xl overflow-hidden" style={{ background: 'hsl(210, 35%, 5%)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <svg viewBox="0 0 600 300" className="w-full">
      {/* Ocean */}
      <rect width="600" height="300" fill="hsl(210, 35%, 5%)" />

      {/* Island shape */}
      <motion.path
        d="M150,220 Q200,180 250,185 Q300,175 350,180 Q400,170 450,185 Q470,195 450,210 Q400,225 350,220 Q300,230 250,225 Q200,230 150,220 Z"
        fill="hsl(25, 35%, 20%)"
        stroke={SPICE}
        strokeWidth="1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* English fort — small rectangle */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <rect x="280" y="178" width="30" height="20" fill={ENGLISH_RED} opacity="0.7" rx="2" />
        {/* Flag */}
        <line x1="295" y1="178" x2="295" y2="165" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        <rect x="296" y="165" width="10" height="6" fill={ENGLISH_RED} rx="0.5" />
        <text x="295" y="160" textAnchor="middle" fill={ENGLISH_RED} fontSize="7" fontFamily="'Source Sans 3', system-ui" fontWeight="700">ENGLISH FORT</text>
      </motion.g>

      {/* Dutch ships surrounding */}
      {[
        { x: 100, y: 240 },
        { x: 180, y: 260 },
        { x: 420, y: 250 },
        { x: 500, y: 235 },
        { x: 300, y: 265 },
      ].map((ship, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 + i * 0.2, duration: 0.6 }}
        >
          {/* Ship hull */}
          <path
            d={`M${ship.x - 8},${ship.y} Q${ship.x},${ship.y + 5} ${ship.x + 8},${ship.y}`}
            fill={DUTCH_BLUE}
            opacity="0.6"
          />
          {/* Mast */}
          <line x1={ship.x} y1={ship.y} x2={ship.x} y2={ship.y - 12} stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          {/* Sail */}
          <path
            d={`M${ship.x},${ship.y - 12} L${ship.x + 6},${ship.y - 6} L${ship.x},${ship.y - 4} Z`}
            fill="rgba(255,255,255,0.2)"
          />
        </motion.g>
      ))}

      {/* Labels */}
      <motion.text
        x="300" y="140"
        textAnchor="middle"
        fill={SAFFRON}
        fontSize="10"
        fontFamily="'Playfair Display', serif"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        RUN ISLAND
      </motion.text>

      <motion.text
        x="300" y="290"
        textAnchor="middle"
        fill={DUTCH_BLUE}
        fontSize="7"
        fontFamily="'Source Sans 3', system-ui"
        letterSpacing="0.2em"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8 }}
      >
        DUTCH BLOCKADE — 5 WARSHIPS
      </motion.text>
    </svg>
  </div>
);

export const RunSection = () => {
  return (
    <section id="run-island" className="relative min-h-screen py-32 px-6" style={{ background: OCEAN }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: ENGLISH_RED }}>
            1616–1667 — Run: The Last Holdout
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            One island<br />
            <span style={{ color: ENGLISH_RED }}>refused to fall.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            In 1616, Nathaniel Courthope sailed to the Banda Islands with two ships
            and a handful of English sailors. The Bandanese chiefs of Run island,
            desperate for protection against the Dutch, signed a treaty making Run
            a possession of the English Crown.
          </p>
        </RevealOnScroll>

        <FortIllustration />

        <RevealOnScroll delay={0.6}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            Courthope and his men held Run for <strong style={{ color: SAFFRON }}>four years</strong> against
            a full Dutch blockade — outnumbered, outgunned, supplied only by Bandanese
            canoes that slipped past Dutch patrols at night.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.7}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            Courthope was killed in 1620. The Dutch eventually took Run.
            But the English never forgot their claim. For forty-seven years,
            diplomats argued over an island most Europeans couldn't find on a map.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-display text-2xl md:text-3xl italic text-center" style={{ color: SAFFRON }}>
            "The resolution came in the most unlikely trade in history."
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
