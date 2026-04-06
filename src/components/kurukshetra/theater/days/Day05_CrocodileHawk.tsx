import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DayShell, DayComponentProps } from './DayShell';
import { PHASE_ATMOSPHERE, DAY_HIGHLIGHTS } from '../theaterConstants';

const hi = DAY_HIGHLIGHTS[5];

/** Day 5 — "Crocodile and Hawk"
 *  Two living formations made of warrior dots clash at center.
 *  Makara (left, wide jaw) vs Shyen (right, diving hawk).
 *  Arrow volleys cross. Impact sparks at the collision zone.
 *  Neither breaks through — stalemate visualized. */
export const Day05_CrocodileHawk = (props: DayComponentProps) => {
  const atmo = PHASE_ATMOSPHERE[props.phase];

  // Makara (crocodile) — wide jaw shape opening left-to-right
  const makaraDots = useMemo(() => {
    const dots: { id: number; cx: number; cy: number; size: number; delay: number }[] = [];
    let id = 0;
    // Upper jaw
    for (let i = 0; i < 12; i++) {
      const t = i / 11;
      dots.push({ id: id++, cx: 5 + t * 38, cy: 38 - t * 12 + Math.sin(t * Math.PI) * 4, size: 0.7 + Math.random() * 0.4, delay: t * 0.8 });
    }
    // Lower jaw
    for (let i = 0; i < 12; i++) {
      const t = i / 11;
      dots.push({ id: id++, cx: 5 + t * 38, cy: 62 + t * 12 - Math.sin(t * Math.PI) * 4, size: 0.7 + Math.random() * 0.4, delay: t * 0.8 });
    }
    // Spine / body fill
    for (let i = 0; i < 18; i++) {
      const t = i / 17;
      dots.push({ id: id++, cx: 6 + t * 30, cy: 50 + (Math.random() - 0.5) * 8, size: 0.5 + Math.random() * 0.3, delay: 0.3 + t * 0.5 });
    }
    // Tail cluster
    for (let i = 0; i < 6; i++) {
      dots.push({ id: id++, cx: 3 + Math.random() * 5, cy: 47 + Math.random() * 6, size: 0.4 + Math.random() * 0.3, delay: 0.1 + Math.random() * 0.3 });
    }
    return dots;
  }, []);

  // Shyen (hawk) — diving V-shape from right
  const shyenDots = useMemo(() => {
    const dots: { id: number; cx: number; cy: number; size: number; delay: number }[] = [];
    let id = 0;
    // Left wing (sweeps up-left)
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      dots.push({ id: id++, cx: 95 - t * 30 - t * t * 8, cy: 50 - t * 18, size: 0.6 + Math.random() * 0.4, delay: t * 0.7 });
    }
    // Right wing (sweeps down-left)
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      dots.push({ id: id++, cx: 95 - t * 30 - t * t * 8, cy: 50 + t * 18, size: 0.6 + Math.random() * 0.4, delay: t * 0.7 });
    }
    // Spine (beak to tail)
    for (let i = 0; i < 14; i++) {
      const t = i / 13;
      dots.push({ id: id++, cx: 95 - t * 30, cy: 50 + (Math.random() - 0.5) * 5, size: 0.5 + Math.random() * 0.4, delay: 0.2 + t * 0.5 });
    }
    // Head cluster
    for (let i = 0; i < 5; i++) {
      dots.push({ id: id++, cx: 93 + Math.random() * 4, cy: 48 + Math.random() * 4, size: 0.5 + Math.random() * 0.3, delay: Math.random() * 0.2 });
    }
    return dots;
  }, []);

  // Arrow volleys — crossing between the two formations
  const arrows = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => {
      const fromLeft = i < 7;
      const yBase = 35 + (i % 7) * 5;
      return {
        id: i,
        x1: fromLeft ? 35 + Math.random() * 8 : 58 + Math.random() * 8,
        x2: fromLeft ? 55 + Math.random() * 8 : 38 - Math.random() * 8,
        y1: yBase + (Math.random() - 0.5) * 4,
        y2: yBase + (Math.random() - 0.5) * 6,
        delay: 1.8 + i * 0.25 + Math.random() * 0.3,
        fromLeft,
      };
    }),
  []);

  // Clash sparks — at the collision zone (center)
  const sparks = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 1.5 + Math.random() * 4;
      return {
        id: i,
        cx: 50 + (Math.random() - 0.5) * 6,
        cy: 50 + (Math.random() - 0.5) * 10,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        delay: 2.5 + Math.random() * 3,
        size: 0.3 + Math.random() * 0.4,
      };
    }),
  []);

  const gold = atmo.accent;
  const red = 'hsl(355 70% 55%)';

  return (
    <DayShell {...props}>
      {/* Subtle red wash pulsing */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at center, hsl(355 70% 40% / 0.08), transparent 70%)' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Full-screen SVG battle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">

          {/* Makara formation dots — gold/amber */}
          {makaraDots.map((d) => (
            <motion.circle
              key={`m-${d.id}`}
              cx={d.cx} cy={d.cy} r={d.size}
              fill={gold}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0.6], scale: 1 }}
              transition={{ delay: 0.3 + d.delay, duration: 0.4 }}
            />
          ))}

          {/* Makara jaw outline — faint structural lines */}
          <motion.path
            d="M5,50 Q15,32 25,28 Q35,24 43,26"
            fill="none" stroke={gold} strokeWidth={0.4} strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M5,50 Q15,68 25,72 Q35,76 43,74"
            fill="none" stroke={gold} strokeWidth={0.4} strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />

          {/* Shyen formation dots — slightly brighter gold */}
          {shyenDots.map((d) => (
            <motion.circle
              key={`s-${d.id}`}
              cx={d.cx} cy={d.cy} r={d.size}
              fill={gold}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0.6], scale: 1 }}
              transition={{ delay: 0.5 + d.delay, duration: 0.4 }}
            />
          ))}

          {/* Shyen wing outline */}
          <motion.path
            d="M97,50 Q85,40 75,33 Q65,28 57,30"
            fill="none" stroke={gold} strokeWidth={0.4} strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          <motion.path
            d="M97,50 Q85,60 75,67 Q65,72 57,70"
            fill="none" stroke={gold} strokeWidth={0.4} strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />

          {/* Arrow volleys — lines flying between formations */}
          {arrows.map((a) => (
            <motion.line
              key={`a-${a.id}`}
              x1={a.x1} y1={a.y1} x2={a.x1} y2={a.y1}
              stroke={a.fromLeft ? gold : red}
              strokeWidth={0.35}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{
                x1: [a.x1, a.x2],
                y1: [a.y1, a.y2],
                x2: [a.x1 + (a.fromLeft ? 3 : -3), a.x2 + (a.fromLeft ? 3 : -3)],
                y2: [a.y1, a.y2],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                delay: a.delay,
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 2 + Math.random() * 2,
                ease: 'easeIn',
              }}
            />
          ))}

          {/* Clash zone — impact sparks */}
          {sparks.map((s) => (
            <motion.circle
              key={`sp-${s.id}`}
              cx={s.cx} cy={s.cy} r={s.size}
              fill="hsl(42 90% 70%)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [s.cx, s.cx + s.dx],
                cy: [s.cy, s.cy + s.dy],
                opacity: [0, 0.8, 0],
                r: [s.size, s.size * 0.3],
              }}
              transition={{
                delay: s.delay,
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 2,
              }}
            />
          ))}

          {/* Clash zone — central tension line */}
          <motion.line
            x1={50} y1={30} x2={50} y2={70}
            stroke={red}
            strokeWidth={0.3}
            strokeDasharray="1 2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0.1, 0.25] }}
            transition={{ delay: 2, duration: 3, repeat: Infinity }}
          />

          {/* Formation labels */}
          <motion.text
            x={18} y={18}
            textAnchor="middle"
            fill={gold}
            fontSize="2.5"
            letterSpacing="0.25em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            MAKARA
          </motion.text>
          <motion.text
            x={18} y={22}
            textAnchor="middle"
            fill={atmo.textMuted}
            fontSize="1.5"
            letterSpacing="0.15em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            मकर
          </motion.text>

          <motion.text
            x={82} y={18}
            textAnchor="middle"
            fill={gold}
            fontSize="2.5"
            letterSpacing="0.25em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            SHYEN
          </motion.text>
          <motion.text
            x={82} y={22}
            textAnchor="middle"
            fill={atmo.textMuted}
            fontSize="1.5"
            letterSpacing="0.15em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            श्येन
          </motion.text>

          {/* VS at center top */}
          <motion.text
            x={50} y={16}
            textAnchor="middle"
            fill={atmo.textMuted}
            fontSize="1.8"
            letterSpacing="0.3em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            VS
          </motion.text>
        </svg>
      </div>

      {/* Text overlay — bottom center */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-center max-w-lg px-6">
        <motion.div
          className="flex items-baseline justify-center gap-3 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-display text-5xl md:text-7xl font-bold leading-none" style={{ color: atmo.accent }}>
            5
          </span>
          <span className="font-display text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ color: atmo.textMuted }}>
            Bhishma commands
          </span>
        </motion.div>

        <motion.h3
          className="font-display text-2xl md:text-4xl tracking-[0.04em] mb-3"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {hi.title}
        </motion.h3>

        <motion.p
          className="font-body text-sm md:text-base leading-relaxed"
          style={{ color: atmo.textPrimary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {hi.highlight}
        </motion.p>
      </div>
    </DayShell>
  );
};
