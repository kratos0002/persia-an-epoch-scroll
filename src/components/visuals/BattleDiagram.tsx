import React from 'react';
import { motion } from 'framer-motion';

const BURNT = 'hsl(15, 75%, 50%)';
const MONGOL_ORANGE = 'hsl(25, 70%, 50%)';
const SMOKE = 'hsl(40, 25%, 75%)';
const LIGHT = 'hsl(40, 25%, 85%)';

interface UnitBlock {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label?: string;
  moveX?: number;
  moveY?: number;
  scatter?: boolean;
}

interface BattleDiagramProps {
  battle: 'kili' | 'amroha' | 'ravi';
}

/* ─── KILI 1299 ─── */
const KiliBattle = () => {
  const mongols: UnitBlock[] = [
    { x: 100, y: 180, w: 120, h: 30, color: MONGOL_ORANGE, label: 'Mongol Vanguard', moveX: 80, scatter: true },
    { x: 80, y: 230, w: 160, h: 40, color: MONGOL_ORANGE, label: 'Main Horde (~200K)', moveX: 60, scatter: true },
    { x: 120, y: 290, w: 100, h: 25, color: MONGOL_ORANGE, label: 'Rear Guard', moveX: 40, scatter: true },
  ];
  const delhi: UnitBlock[] = [
    { x: 450, y: 160, w: 80, h: 25, color: BURNT, label: 'Cavalry Wing', moveX: -50 },
    { x: 420, y: 210, w: 140, h: 50, color: BURNT, label: 'Khalji\'s Main Force (~300K)', moveX: -70 },
    { x: 450, y: 280, w: 80, h: 25, color: BURNT, label: 'Cavalry Wing', moveX: -50 },
  ];

  return (
    <g>
      <text x={350} y={60} textAnchor="middle" fill={LIGHT} fontSize="11" fontFamily="'Cormorant Garamond', serif" letterSpacing="6">
        OUTSKIRTS OF DELHI
      </text>
      {/* Delhi marker */}
      <circle cx={600} cy={230} r={12} fill="none" stroke={BURNT} strokeWidth={1.5} strokeDasharray="3 2" />
      <text x={600} y={235} textAnchor="middle" fill={BURNT} fontSize="9" fontFamily="'Cormorant Garamond', serif">Delhi</text>

      {/* Movement arrows */}
      <motion.path d="M250 230 L380 230" fill="none" stroke={MONGOL_ORANGE} strokeWidth={2} markerEnd="url(#arrow-mongol)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }} />
      <motion.path d="M420 230 L300 230" fill="none" stroke={BURNT} strokeWidth={2} markerEnd="url(#arrow-delhi)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 1 }} />

      {/* Mongol units — scatter on impact */}
      {mongols.map((u, i) => (
        <motion.g key={`m${i}`}
          initial={{ x: 0 }}
          animate={{ x: u.moveX, opacity: u.scatter ? [1, 1, 0.3] : 1 }}
          transition={{ delay: 1.5, duration: 2 }}
        >
          <rect x={u.x} y={u.y} width={u.w} height={u.h} rx={2} fill={u.color} opacity={0.7} />
          {u.label && <text x={u.x + u.w / 2} y={u.y + u.h / 2 + 4} textAnchor="middle" fill="hsl(220, 20%, 10%)" fontSize="8" fontWeight="bold">{u.label}</text>}
        </motion.g>
      ))}

      {/* Delhi units */}
      {delhi.map((u, i) => (
        <motion.g key={`d${i}`}
          initial={{ x: 0 }}
          animate={{ x: u.moveX }}
          transition={{ delay: 1.2, duration: 1.5 }}
        >
          <rect x={u.x} y={u.y} width={u.w} height={u.h} rx={2} fill={u.color} opacity={0.7} />
          {u.label && <text x={u.x + u.w / 2} y={u.y + u.h / 2 + 4} textAnchor="middle" fill="hsl(220, 20%, 10%)" fontSize="7" fontWeight="bold">{u.label}</text>}
        </motion.g>
      ))}

      {/* Shatter lines */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.line key={i}
          x1={320} y1={180 + i * 25} x2={320 + (i % 2 ? 30 : -20)} y2={170 + i * 30}
          stroke={MONGOL_ORANGE} strokeWidth={1}
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }}
          transition={{ delay: 2 + i * 0.1, duration: 0.8 }}
        />
      ))}
    </g>
  );
};

/* ─── AMROHA 1305 ─── */
const AmrohaBattle = () => (
  <g>
    <text x={350} y={60} textAnchor="middle" fill={LIGHT} fontSize="11" fontFamily="'Cormorant Garamond', serif" letterSpacing="6">
      DOAB REGION
    </text>

    {/* Mongol column in center */}
    <motion.rect x={290} y={180} width={60} height={100} rx={3} fill={MONGOL_ORANGE} opacity={0.7}
      animate={{ opacity: [0.7, 0.7, 0.2] }}
      transition={{ delay: 2, duration: 1.5 }}
    />
    <text x={320} y={230} textAnchor="middle" fill="hsl(220, 20%, 10%)" fontSize="8" fontWeight="bold">Mongol Column</text>
    <text x={320} y={245} textAnchor="middle" fill="hsl(220, 20%, 10%)" fontSize="7">(~40K)</text>

    {/* Encircling Delhi forces */}
    {[
      { x: 160, y: 200, w: 80, h: 25, label: 'Malik Kafur', angle: 0, moveX: 40 },
      { x: 400, y: 200, w: 80, h: 25, label: 'Right Wing', angle: 0, moveX: -40 },
      { x: 280, y: 100, w: 70, h: 20, label: 'Flanking', angle: 0, moveY: 40 },
      { x: 280, y: 320, w: 70, h: 20, label: 'Rear Cut', angle: 0, moveY: -40 },
    ].map((u, i) => (
      <motion.g key={i}
        initial={{ x: 0, y: 0 }}
        animate={{ x: u.moveX || 0, y: u.moveY || 0 }}
        transition={{ delay: 1 + i * 0.2, duration: 1.5 }}
      >
        <rect x={u.x} y={u.y} width={u.w} height={u.h} rx={2} fill={BURNT} opacity={0.7} />
        <text x={u.x + u.w / 2} y={u.y + u.h / 2 + 4} textAnchor="middle" fill="hsl(220, 20%, 10%)" fontSize="7" fontWeight="bold">{u.label}</text>
      </motion.g>
    ))}

    {/* Encirclement arrows — curved */}
    {[
      'M200 210 Q300 140 340 180',
      'M440 210 Q340 140 310 180',
      'M310 110 Q350 160 320 180',
      'M310 340 Q350 280 320 280',
    ].map((d, i) => (
      <motion.path key={i} d={d} fill="none" stroke={BURNT} strokeWidth={1.5} strokeDasharray="4 3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.5 + i * 0.2, duration: 1.2 }}
      />
    ))}

    {/* Encirclement ring */}
    <motion.circle cx={320} cy={230} r={90} fill="none" stroke={BURNT} strokeWidth={1.5} strokeDasharray="6 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.5 }}
      transition={{ delay: 2, duration: 1.5 }}
    />
  </g>
);

/* ─── RAVI 1306 ─── */
const RaviBattle = () => (
  <g>
    <text x={350} y={60} textAnchor="middle" fill={LIGHT} fontSize="11" fontFamily="'Cormorant Garamond', serif" letterSpacing="6">
      RAVI RIVER
    </text>

    {/* River */}
    <motion.path
      d="M300 0 Q280 100 310 200 Q340 300 290 400 Q260 500 300 600"
      fill="none" stroke="hsl(200, 40%, 35%)" strokeWidth={30} strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 1 }}
    />
    <motion.path
      d="M300 0 Q280 100 310 200 Q340 300 290 400 Q260 500 300 600"
      fill="none" stroke="hsl(200, 50%, 45%)" strokeWidth={2} strokeDasharray="8 6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1 }}
    />

    {/* Mongol force — approaching from left, caught at river */}
    <motion.g
      initial={{ x: -60 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.5, duration: 1.5 }}
    >
      <rect x={140} y={200} width={100} height={80} rx={3} fill={MONGOL_ORANGE} opacity={0.7} />
      <text x={190} y={240} textAnchor="middle" fill="hsl(220, 20%, 10%)" fontSize="8" fontWeight="bold">Mongol Army</text>
      <text x={190} y={255} textAnchor="middle" fill="hsl(220, 20%, 10%)" fontSize="7">(~50K)</text>
    </motion.g>

    {/* Delhi garrison forces — on right bank, closing in */}
    {[
      { x: 370, y: 160, label: 'Garrison North' },
      { x: 370, y: 260, label: 'Main Force' },
      { x: 370, y: 340, label: 'Garrison South' },
    ].map((u, i) => (
      <motion.g key={i}
        initial={{ x: 40 }}
        animate={{ x: 0 }}
        transition={{ delay: 1 + i * 0.2, duration: 1 }}
      >
        <rect x={u.x} y={u.y} width={90} height={25} rx={2} fill={BURNT} opacity={0.7} />
        <text x={u.x + 45} y={u.y + 16} textAnchor="middle" fill="hsl(220, 20%, 10%)" fontSize="7" fontWeight="bold">{u.label}</text>
      </motion.g>
    ))}

    {/* Arrows showing Mongols trapped */}
    <motion.path d="M370 180 L260 210" fill="none" stroke={BURNT} strokeWidth={1.5} markerEnd="url(#arrow-delhi)"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.8 }} />
    <motion.path d="M370 270 L260 260" fill="none" stroke={BURNT} strokeWidth={1.5} markerEnd="url(#arrow-delhi)"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.7, duration: 0.8 }} />
    <motion.path d="M370 350 L260 280" fill="none" stroke={BURNT} strokeWidth={1.5} markerEnd="url(#arrow-delhi)"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.9, duration: 0.8 }} />

    {/* Trapped text */}
    <motion.text x={190} y={310} textAnchor="middle" fill={MONGOL_ORANGE} fontSize="10" fontFamily="'Cormorant Garamond', serif" fontStyle="italic"
      initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8] }}
      transition={{ delay: 2.5, duration: 0.8 }}
    >
      Trapped at the crossing
    </motion.text>
  </g>
);

export const BattleDiagram = ({ battle }: BattleDiagramProps) => (
  <svg viewBox="0 0 700 450" className="w-full max-w-xl mx-auto" preserveAspectRatio="xMidYMid meet">
    <defs>
      <marker id="arrow-mongol" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={MONGOL_ORANGE} />
      </marker>
      <marker id="arrow-delhi" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={BURNT} />
      </marker>
    </defs>

    {/* Terrain background */}
    <rect width="700" height="450" fill="hsl(220, 25%, 8%)" rx={8} />

    {battle === 'kili' && <KiliBattle />}
    {battle === 'amroha' && <AmrohaBattle />}
    {battle === 'ravi' && <RaviBattle />}

    {/* Legend */}
    <g transform="translate(520, 380)">
      <rect x={0} y={0} width={12} height={12} rx={1} fill={MONGOL_ORANGE} opacity={0.7} />
      <text x={18} y={10} fill={SMOKE} fontSize="9" fontFamily="'Cormorant Garamond', serif">Mongol</text>
      <rect x={80} y={0} width={12} height={12} rx={1} fill={BURNT} opacity={0.7} />
      <text x={98} y={10} fill={SMOKE} fontSize="9" fontFamily="'Cormorant Garamond', serif">Delhi</text>
    </g>
  </svg>
);
