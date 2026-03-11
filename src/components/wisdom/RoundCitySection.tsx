import React from 'react';
import { motion } from 'framer-motion';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { EraTransition } from '@/components/visuals/EraTransition';

const WISDOM_TEAL = '170 40% 30%';
const WISDOM_GOLD = '43 85% 55%';

const WALLS = [
  { r: 160, phase: 0 },
  { r: 120, phase: 1 },
  { r: 80, phase: 2 },
];

const GATES = [0, 90, 180, 270];
const GATE_NAMES = ['Khorasan', 'Basra', 'Kufa', 'Syria'];

const CityGraphic = (activeStep: number) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-80 h-80 md:w-[28rem] md:h-[28rem]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="rc-glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsl(${WISDOM_GOLD})`} stopOpacity={activeStep >= 3 ? 0.15 : 0.05} />
            <stop offset="100%" stopColor={`hsl(${WISDOM_GOLD})`} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#rc-glow2)" />

        {/* Walls — draw with stroke-dasharray */}
        {WALLS.map((wall, i) => {
          const circumference = 2 * Math.PI * wall.r;
          const visible = activeStep >= wall.phase;
          return (
            <motion.circle
              key={i}
              cx="200" cy="200" r={wall.r}
              fill="none"
              stroke={`hsl(${WISDOM_TEAL})`}
              strokeWidth={i === 0 ? 2.5 : 1.5}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: visible ? 0 : circumference }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: i * 0.2 }}
              opacity={0.5 + i * 0.15}
            />
          );
        })}

        {/* Gates — appear at step 1+ */}
        {GATES.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + Math.cos(rad) * 120;
          const y1 = 200 + Math.sin(rad) * 120;
          const x2 = 200 + Math.cos(rad) * 165;
          const y2 = 200 + Math.sin(rad) * 165;
          const lx = 200 + Math.cos(rad) * 185;
          const ly = 200 + Math.sin(rad) * 185;
          return (
            <motion.g
              key={angle}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep >= 1 ? 1 : 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`hsl(${WISDOM_GOLD})`} strokeWidth={2} opacity={0.6} />
              <text x={lx} y={ly + 4} textAnchor="middle" fill={`hsl(${WISDOM_GOLD})`} fontSize="8" opacity="0.5" fontFamily="'Cormorant Garamond', serif">
                {GATE_NAMES[i]}
              </text>
            </motion.g>
          );
        })}

        {/* Palace center — step 2+ */}
        <motion.circle
          cx="200" cy="200" r="10"
          fill={`hsl(${WISDOM_GOLD})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: activeStep >= 2 ? 0.7 : 0,
            scale: activeStep >= 2 ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Palace glow — step 2+ */}
        <motion.circle
          cx="200" cy="200" r="25"
          fill={`hsl(${WISDOM_GOLD})`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: activeStep >= 2 ? [0.06, 0.12, 0.06] : 0,
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Life pulse — step 3 */}
        {activeStep >= 3 && (
          <>
            <motion.circle
              cx="200" cy="200" r="160"
              fill="none"
              stroke={`hsl(${WISDOM_TEAL})`}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1], r: [160, 170, 160] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            {/* Population dots */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const dist = 40 + (i % 3) * 30;
              return (
                <motion.circle
                  key={`dot-${i}`}
                  cx={200 + Math.cos(angle) * dist}
                  cy={200 + Math.sin(angle) * dist}
                  r="1.5"
                  fill={`hsl(${WISDOM_GOLD})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
};

export const RoundCitySection = () => (
  <section id="round-city" style={{ '--era-primary': WISDOM_TEAL } as React.CSSProperties}>
    <StickyScroll
      graphic={(activeStep) => CityGraphic(activeStep)}
      steps={[
        <div key={0}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-body" style={{ color: `hsl(${WISDOM_TEAL} / 0.6)` }}>762 CE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: `hsl(${WISDOM_TEAL})` }}>
            The Round City
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-body">
            Caliph al-Mansur built Baghdad as a perfect circle — a city designed from scratch to be the center of the world.
          </p>
        </div>,
        <div key={1}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(${WISDOM_TEAL} / 0.85)` }}>
            Four Gates to the World
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-3">
            Each gate faced a province of the empire. Roads radiated outward like spokes of a wheel.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Khorasan Gate faced east — toward Persia, India, China. The knowledge would flow in through these doors.
          </p>
        </div>,
        <div key={2}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(${WISDOM_TEAL} / 0.85)` }}>
            The Palace at the Center
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-3">
            Three concentric walls. A mosque and palace at the center. 100,000 workers. Four years.
          </p>
          <p className="text-foreground/60 leading-relaxed font-body">
            Baghdad was not just a city — it was a statement.
          </p>
        </div>,
        <div key={3}>
          <h3 className="font-display text-xl font-bold mb-4" style={{ color: `hsl(${WISDOM_TEAL} / 0.85)` }}>
            The World's Largest City
          </h3>
          <p className="text-foreground/80 leading-relaxed font-body mb-4">
            Within a generation, it surpassed Constantinople.
          </p>
          <div className="flex gap-8">
            <AnimatedCounter end={1000000} suffix="+" label="Population" className="text-[hsl(170,45%,50%)]" />
            <AnimatedCounter end={100000} label="Workers" className="text-[hsl(170,45%,50%)]" />
          </div>
        </div>,
      ]}
    />
    <EraTransition fromColor={WISDOM_TEAL} toColor={WISDOM_TEAL} year="786 CE" label="The Collecting Begins" />
  </section>
);
