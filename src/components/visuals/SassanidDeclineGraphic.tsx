import React, { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Full-bleed visual: the Taq Kasra arch silhouette — cracking, fragmenting.
 * Stats fade in around the arch showing the empire's internal decay.
 * Used for Islamic Conquest step 0: "Everything Changes".
 */

/** Seeded PRNG for stable crack layouts */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface CrackLine {
  d: string;
  delay: number;
  width: number;
}

export const SassanidDeclineGraphic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Generate crack lines across the arch
  const cracks = useMemo(() => {
    const rand = seeded(77);
    const result: CrackLine[] = [];

    // Major structural cracks
    const majorCracks = [
      'M390,120 Q395,145 388,175 Q382,200 378,230',
      'M510,115 Q515,148 520,180 Q525,210 530,245',
      'M445,80 Q450,100 448,125 Q445,150 440,180',
      'M470,95 Q475,120 480,150 Q482,175 488,200',
      'M420,100 Q418,130 415,160 Q410,190 405,220',
    ];

    majorCracks.forEach((d, i) => {
      result.push({
        d,
        delay: 0.8 + i * 0.4,
        width: 1.5 + rand() * 0.8,
      });
    });

    // Minor fracture lines branching off
    const minorCracks = [
      'M388,175 Q375,178 365,185',
      'M520,180 Q535,185 545,192',
      'M448,125 Q438,128 430,135',
      'M480,150 Q490,155 498,162',
      'M415,160 Q405,165 395,172',
      'M510,115 Q520,110 530,108',
      'M445,80 Q440,75 432,72',
    ];

    minorCracks.forEach((d, i) => {
      result.push({
        d,
        delay: 1.5 + i * 0.3,
        width: 0.6 + rand() * 0.5,
      });
    });

    return result;
  }, []);

  // Falling debris particles
  const debris = useMemo(() => {
    const rand = seeded(200);
    return Array.from({ length: 18 }, (_, i) => ({
      x: 350 + rand() * 200,
      y: 100 + rand() * 180,
      size: 1 + rand() * 2.5,
      delay: 2 + rand() * 3,
      duration: 3 + rand() * 4,
    }));
  }, []);

  const stats = [
    { value: '700', unit: 'years', label: 'of war with Rome', x: '12%', y: '25%' },
    { value: '4', unit: 'kings', label: 'in 4 years', x: '78%', y: '22%' },
    { value: '26', unit: 'plagues', label: 'in three centuries', x: '10%', y: '62%' },
    { value: '0', unit: 'allies', label: 'when it mattered', x: '80%', y: '65%' },
  ];

  return (
    <div
      ref={ref}
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
      style={{ background: 'hsl(220, 18%, 8%)' }}
    >
      {/* Atmospheric radial glow behind the arch */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, hsl(350, 30%, 12%, 0.4) 0%, transparent 65%)',
        }}
      />

      {/* SVG arch + cracks */}
      <svg
        viewBox="0 0 900 450"
        className="relative w-full max-w-[800px] max-h-[70vh]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="arch-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="arch-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(350, 20%, 35%)" />
            <stop offset="60%" stopColor="hsl(350, 15%, 25%)" />
            <stop offset="100%" stopColor="hsl(350, 10%, 18%)" />
          </linearGradient>
          <linearGradient id="crack-color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(25, 50%, 45%)" />
            <stop offset="100%" stopColor="hsl(350, 40%, 30%)" />
          </linearGradient>
        </defs>

        {/* Taq Kasra arch silhouette — parabolic vault */}
        <motion.path
          d="M300,380 L300,200 Q300,60 450,50 Q600,60 600,200 L600,380"
          fill="none"
          stroke="url(#arch-fade)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#arch-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />

        {/* Inner arch detail lines */}
        <motion.path
          d="M320,380 L320,210 Q320,80 450,68 Q580,80 580,210 L580,380"
          fill="none"
          stroke="hsl(350, 15%, 22%)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
        />

        {/* Brick texture lines (horizontal courses) */}
        {[140, 180, 220, 260, 300, 340].map((y, i) => {
          // Calculate arch width at this height
          const t = (y - 50) / (380 - 50);
          const halfWidth = 150 * (0.3 + t * 0.7);
          const x1 = 450 - halfWidth;
          const x2 = 450 + halfWidth;
          return (
            <motion.line
              key={`brick-${i}`}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="hsl(350, 12%, 18%)"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.3 } : {}}
              transition={{ delay: 1.5 + i * 0.15, duration: 0.8 }}
            />
          );
        })}

        {/* Ground line */}
        <motion.line
          x1="200"
          y1="380"
          x2="700"
          y2="380"
          stroke="hsl(350, 12%, 20%)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        />

        {/* Cracks appearing across the arch */}
        {cracks.map((crack, i) => (
          <motion.path
            key={`crack-${i}`}
            d={crack.d}
            fill="none"
            stroke="url(#crack-color)"
            strokeWidth={crack.width}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
            transition={{
              delay: crack.delay,
              duration: 0.8,
              ease: 'easeIn',
            }}
          />
        ))}

        {/* Falling debris */}
        {inView && debris.map((p, i) => (
          <motion.rect
            key={`debris-${i}`}
            x={p.x}
            y={p.y}
            width={p.size}
            height={p.size * 0.7}
            fill="hsl(350, 20%, 30%)"
            rx="0.5"
            initial={{ opacity: 0, y: p.y }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [p.y, p.y + 60 + p.size * 20],
              x: [p.x, p.x + (i % 2 === 0 ? 8 : -8)],
            }}
            transition={{
              delay: p.delay,
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeIn',
            }}
          />
        ))}
      </svg>

      {/* Stats positioned around the arch */}
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="absolute text-center"
          style={{ left: stat.x, top: stat.y }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5 + i * 0.5, duration: 1, ease: 'easeOut' }}
        >
          <div className="font-display text-2xl md:text-3xl font-bold text-[hsl(350,40%,55%)]">
            {stat.value}
          </div>
          <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[hsl(350,25%,45%,0.8)] mt-0.5">
            {stat.unit}
          </div>
          <div className="text-[10px] md:text-xs text-foreground/30 mt-1 font-body whitespace-nowrap">
            {stat.label}
          </div>
        </motion.div>
      ))}

      {/* Bottom label */}
      <motion.p
        className="absolute bottom-[8%] left-0 right-0 text-center font-body text-xs tracking-[0.25em] uppercase text-foreground/50"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 4.5, duration: 1.5 }}
      >
        Taq Kasra — last monument standing
      </motion.p>
    </div>
  );
};
