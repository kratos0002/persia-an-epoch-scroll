import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface QanatAnimationProps {
  /** 0 = intact water network, 1 = fully destroyed */
  destructionProgress: number;
  className?: string;
}

/** Seeded pseudo-random for stable layouts across renders */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Channel {
  id: number;
  d: string;
  length: number;
  width: number;
  delay: number;
  /** 0-1: how early this channel breaks (0 = first to go) */
  breakpoint: number;
}

/**
 * Abstract water-channel network. Luminous blue lines branch across
 * a dark ground, then drain, fragment, and turn to dust/amber as
 * destructionProgress increases. No labels, no literalism — pure mood.
 */
export const QanatAnimation = ({ destructionProgress: dp, className }: QanatAnimationProps) => {
  const channels = useMemo(() => {
    const rand = seeded(42);
    const result: Channel[] = [];

    // Main trunk line
    result.push({
      id: 0,
      d: 'M80,300 Q200,295 350,285 Q500,275 650,260 Q750,252 820,245',
      length: 780,
      width: 2.5,
      delay: 0,
      breakpoint: 0.7, // trunk is last to go
    });

    // Secondary branches
    const branches = [
      'M200,295 Q220,240 260,200 Q280,175 310,160',
      'M350,285 Q370,230 400,190 Q420,165 450,150',
      'M500,275 Q520,225 560,185 Q585,165 620,148',
      'M650,260 Q670,215 700,180 Q720,160 750,145',
      'M280,290 Q300,250 340,220 Q360,200 380,185',
      'M570,270 Q585,235 610,205 Q630,185 655,170',
    ];

    branches.forEach((d, i) => {
      result.push({
        id: i + 1,
        d,
        length: 180 + rand() * 60,
        width: 1.2 + rand() * 0.8,
        delay: rand() * 1.5,
        breakpoint: 0.15 + rand() * 0.5, // branches break earlier
      });
    });

    // Tertiary capillaries
    const capillaries = [
      'M260,200 Q270,180 290,165',
      'M400,190 Q410,172 430,158',
      'M560,185 Q575,168 595,155',
      'M340,220 Q355,200 375,188',
      'M610,205 Q625,188 645,175',
      'M700,180 Q712,165 730,153',
      'M220,240 Q235,220 255,208',
      'M520,225 Q535,210 555,198',
    ];

    capillaries.forEach((d, i) => {
      result.push({
        id: i + 10,
        d,
        length: 60 + rand() * 40,
        width: 0.5 + rand() * 0.5,
        delay: rand() * 2,
        breakpoint: 0.05 + rand() * 0.35, // capillaries die first
      });
    });

    return result;
  }, []);

  // Endpoint "field" dots at branch tips
  const fieldDots = useMemo(() => [
    { cx: 310, cy: 158, r: 4 },
    { cx: 450, cy: 148, r: 5 },
    { cx: 620, cy: 146, r: 4.5 },
    { cx: 750, cy: 143, r: 4 },
    { cx: 380, cy: 183, r: 3.5 },
    { cx: 655, cy: 168, r: 3.5 },
  ], []);

  const waterColor = `hsl(200, ${Math.max(0, 55 - dp * 55)}%, ${Math.max(20, 55 - dp * 30)}%)`;
  const deadColor = `hsl(25, ${Math.min(40, dp * 50)}%, ${20 + dp * 8}%)`;

  return (
    <div className={className} style={{ background: 'hsl(220, 18%, 8%)' }}>
      <svg viewBox="0 0 900 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Glow filter for living water */}
          <filter id="qanat-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Subtle ground texture gradient */}
          <radialGradient id="qanat-bg" cx="50%" cy="65%" r="55%">
            <stop offset="0%" stopColor="hsl(220, 15%, 12%)" />
            <stop offset="100%" stopColor="hsl(220, 18%, 8%)" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="900" height="450" fill="url(#qanat-bg)" />

        {/* Faint surface line (ground level) */}
        <line
          x1="0" y1="140" x2="900" y2="140"
          stroke="hsl(220, 10%, 18%)"
          strokeWidth="0.5"
          strokeDasharray="8 12"
          opacity={0.4}
        />

        {/* Channel network */}
        {channels.map(ch => {
          // Each channel breaks at its own threshold
          const chDp = Math.min(1, Math.max(0, (dp - ch.breakpoint) / (1 - ch.breakpoint)));
          const alive = 1 - chDp;
          const strokeColor = chDp > 0.5 ? deadColor : waterColor;

          return (
            <g key={ch.id}>
              {/* Glow layer (fades with destruction) */}
              <motion.path
                d={ch.d}
                fill="none"
                stroke="hsl(200, 60%, 50%)"
                strokeWidth={ch.width * 3}
                strokeLinecap="round"
                filter="url(#qanat-glow)"
                animate={{ opacity: alive * 0.15 }}
                transition={{ duration: 0.6 }}
              />
              {/* Main stroke */}
              <motion.path
                d={ch.d}
                fill="none"
                strokeLinecap="round"
                strokeWidth={ch.width}
                animate={{
                  stroke: strokeColor,
                  strokeDashoffset: chDp * ch.length,
                  opacity: Math.max(0.08, alive * 0.9 + 0.1),
                }}
                strokeDasharray={ch.length}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              {/* Flowing particles (only when alive) */}
              {alive > 0.3 && (
                <motion.circle
                  r={ch.width * 0.8}
                  fill="hsl(200, 70%, 65%)"
                  animate={{
                    opacity: [alive * 0.6, alive * 0.2, alive * 0.6],
                    offsetDistance: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 3 + ch.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ offsetPath: `path("${ch.d}")` }}
                />
              )}
            </g>
          );
        })}

        {/* Field endpoint dots — green circles that turn brown */}
        {fieldDots.map((dot, i) => {
          const dotDp = Math.min(1, Math.max(0, (dp - 0.1 - i * 0.08) / 0.5));
          return (
            <motion.circle
              key={`field-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              animate={{
                fill: dotDp > 0.5
                  ? `hsl(30, ${20 - dotDp * 15}%, ${25 + dotDp * 5}%)`
                  : `hsl(160, ${45 - dotDp * 40}%, ${35 - dotDp * 10}%)`,
                opacity: Math.max(0.15, 1 - dotDp * 0.7),
              }}
              transition={{ duration: 0.6 }}
            />
          );
        })}

        {/* Dust particles that appear as destruction progresses */}
        {dp > 0.3 && Array.from({ length: 12 }, (_, i) => {
          const rand = seeded(i + 100);
          const x = 100 + rand() * 700;
          const y = 160 + rand() * 250;
          return (
            <motion.circle
              key={`dust-${i}`}
              cx={x}
              cy={y}
              r={1 + rand() * 1.5}
              fill="hsl(30, 30%, 40%)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: Math.min(0.4, (dp - 0.3) * 0.8),
                y: [y, y - 8 - rand() * 15],
              }}
              transition={{
                duration: 3 + rand() * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: rand() * 2,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};
