import React from 'react';
import { motion } from 'framer-motion';

const BURNT = 'hsl(15, 75%, 50%)';
const GOLD = 'hsl(40, 60%, 55%)';
const DIM = 'hsl(40, 20%, 30%)';
const LIGHT = 'hsl(40, 25%, 80%)';

/* Step 0: feudal levy (scattered, disorganized)
   Step 1: standing army (organized grid)
   Step 2: price controls (price tags dropping)
   Step 3: intelligence network (web of nodes)
   Step 4: frontier forts (fort icons along border) */

const ScatteredLevy = ({ visible }: { visible: boolean }) => {
  // Randomish positions for scattered warriors
  const positions = [
    [120, 300], [250, 200], [380, 400], [150, 500], [450, 280],
    [300, 550], [500, 450], [180, 380], [420, 150], [350, 480],
    [80, 220], [520, 350], [200, 600], [460, 550], [100, 450],
  ];
  return (
    <g>
      {positions.map(([x, y], i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: [0.3, 0.7, 0.3], x: [(Math.sin(i) * 5), -(Math.sin(i) * 5)] } : {}}
          transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
        >
          <rect x={x} y={y} width={8} height={14} rx={1} fill={DIM} transform={`rotate(${(i * 23) % 40 - 20} ${x + 4} ${y + 7})`} />
          <circle cx={x + 4} cy={y - 3} r={3} fill={DIM} />
        </motion.g>
      ))}
      <text x={300} y={100} textAnchor="middle" fill={DIM} fontSize="14" fontFamily="'Cormorant Garamond', serif" letterSpacing="4">FEUDAL LEVY</text>
      <text x={300} y={125} textAnchor="middle" fill="hsl(40, 20%, 25%)" fontSize="11" fontFamily="'Cormorant Garamond', serif">Disorganized · Seasonal · Loyal to local lords</text>
    </g>
  );
};

const StandingArmy = ({ visible }: { visible: boolean }) => {
  const rows = 5, cols = 8;
  return (
    <g>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = 120 + col * 30;
        const y = 200 + row * 45;
        return (
          <motion.g key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.02, duration: 0.5 }}
          >
            <rect x={x} y={y} width={10} height={18} rx={1} fill={BURNT} />
            <circle cx={x + 5} cy={y - 4} r={4} fill={BURNT} />
          </motion.g>
        );
      })}
      {/* Treasury symbol at center */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={visible ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <rect x={245} y={140} width={60} height={40} rx={3} fill="none" stroke={GOLD} strokeWidth={2} />
        <text x={275} y={166} textAnchor="middle" fill={GOLD} fontSize="18">💰</text>
      </motion.g>
      <text x={300} y={100} textAnchor="middle" fill={BURNT} fontSize="14" fontFamily="'Cormorant Garamond', serif" letterSpacing="4">STANDING ARMY</text>
      <text x={300} y={125} textAnchor="middle" fill="hsl(15, 40%, 45%)" fontSize="11" fontFamily="'Cormorant Garamond', serif">Professional · Paid by treasury · Year-round</text>
    </g>
  );
};

const PriceControls = ({ visible }: { visible: boolean }) => {
  const items = [
    { label: 'Horse', before: 100, after: 25, x: 120, y: 250 },
    { label: 'Grain', before: 40, after: 7, x: 280, y: 250 },
    { label: 'Cloth', before: 60, after: 12, x: 440, y: 250 },
    { label: 'Cattle', before: 80, after: 20, x: 200, y: 420 },
    { label: 'Armor', before: 120, after: 30, x: 360, y: 420 },
  ];
  return (
    <g>
      <text x={300} y={100} textAnchor="middle" fill={BURNT} fontSize="14" fontFamily="'Cormorant Garamond', serif" letterSpacing="4">PRICE CONTROLS</text>
      <text x={300} y={130} textAnchor="middle" fill="hsl(15, 40%, 45%)" fontSize="11" fontFamily="'Cormorant Garamond', serif">Silver tankhas · Market price fixed by decree</text>
      {items.map((item, i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          {/* Item label */}
          <text x={item.x} y={item.y - 30} textAnchor="middle" fill={LIGHT} fontSize="13" fontFamily="'Cormorant Garamond', serif">{item.label}</text>
          {/* Before price — strikethrough */}
          <motion.text
            x={item.x - 20} y={item.y}
            textAnchor="middle" fill={DIM} fontSize="22" fontFamily="'Cormorant Garamond', serif"
            initial={{ opacity: 1 }}
            animate={visible ? { opacity: 0.3 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
          >
            {item.before}
          </motion.text>
          <motion.line
            x1={item.x - 35} y1={item.y - 5} x2={item.x - 5} y2={item.y - 5}
            stroke={BURNT} strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
          />
          {/* Arrow */}
          <text x={item.x} y={item.y} textAnchor="middle" fill={DIM} fontSize="14">→</text>
          {/* After price */}
          <motion.text
            x={item.x + 25} y={item.y}
            textAnchor="middle" fill={BURNT} fontSize="26" fontFamily="'Cormorant Garamond', serif" fontWeight="bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5, type: 'spring' }}
          >
            {item.after}
          </motion.text>
        </motion.g>
      ))}
    </g>
  );
};

const IntelligenceNetwork = ({ visible }: { visible: boolean }) => {
  const nodes = [
    { x: 100, y: 300, label: 'Khyber' }, { x: 200, y: 200, label: 'Multan' },
    { x: 350, y: 250, label: 'Lahore' }, { x: 480, y: 350, label: 'Delhi' },
    { x: 250, y: 400, label: 'Dipalpur' }, { x: 150, y: 450, label: 'Sindh' },
    { x: 400, y: 180, label: 'Panipat' }, { x: 320, y: 500, label: 'Ajmer' },
  ];
  const connections = [
    [0, 1], [0, 4], [1, 2], [1, 4], [2, 3], [2, 6], [3, 6], [3, 7], [4, 5], [4, 1], [5, 7], [6, 3],
  ];
  return (
    <g>
      <text x={300} y={100} textAnchor="middle" fill={BURNT} fontSize="14" fontFamily="'Cormorant Garamond', serif" letterSpacing="4">INTELLIGENCE NETWORK</text>
      <text x={300} y={130} textAnchor="middle" fill="hsl(15, 40%, 45%)" fontSize="11" fontFamily="'Cormorant Garamond', serif">Barids + Munhiyans · Three overlapping spy rings</text>
      {connections.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={BURNT} strokeWidth={1} strokeDasharray="4 3"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={visible ? { opacity: 0.4, pathLength: 1 } : {}}
          transition={{ delay: i * 0.08, duration: 0.6 }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4, type: 'spring' }}
        >
          <circle cx={node.x} cy={node.y} r={6} fill={i === 3 ? GOLD : BURNT} />
          <motion.circle
            cx={node.x} cy={node.y} r={14}
            fill="none" stroke={BURNT} strokeWidth={1}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
          <text x={node.x} y={node.y - 16} textAnchor="middle" fill={LIGHT} fontSize="10" fontFamily="'Cormorant Garamond', serif">{node.label}</text>
        </motion.g>
      ))}
    </g>
  );
};

const FrontierForts = ({ visible }: { visible: boolean }) => {
  const forts = [
    { x: 80, y: 200, label: 'Khyber Fort' },
    { x: 130, y: 300, label: 'Peshawar' },
    { x: 170, y: 400, label: 'Multan' },
    { x: 140, y: 500, label: 'Dipalpur' },
    { x: 230, y: 250, label: 'Lahore' },
  ];
  // Frontier line path
  const frontierPath = 'M60 150 Q90 250 120 350 Q140 450 130 550';
  return (
    <g>
      <text x={300} y={80} textAnchor="middle" fill={BURNT} fontSize="14" fontFamily="'Cormorant Garamond', serif" letterSpacing="4">FRONTIER FORTIFICATION</text>
      <text x={300} y={110} textAnchor="middle" fill="hsl(15, 40%, 45%)" fontSize="11" fontFamily="'Cormorant Garamond', serif">Permanent garrisons · Self-sufficient supply</text>

      {/* Frontier line */}
      <motion.path
        d={frontierPath}
        fill="none" stroke={BURNT} strokeWidth={3} strokeDasharray="12 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={visible ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ duration: 1.5 }}
      />

      {/* Delhi marker */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <circle cx={450} cy={380} r={10} fill={GOLD} opacity={0.8} />
        <text x={450} y={410} textAnchor="middle" fill={GOLD} fontSize="14" fontFamily="'Cormorant Garamond', serif" fontWeight="bold">DELHI</text>
      </motion.g>

      {/* Fort icons */}
      {forts.map((fort, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.2, duration: 0.5, type: 'spring' }}
        >
          {/* Fort shape: crenellated rectangle */}
          <rect x={fort.x - 12} y={fort.y - 8} width={24} height={16} rx={1} fill="none" stroke={BURNT} strokeWidth={2} />
          {/* Crenellations */}
          {[-8, -2, 4, 10].map((dx, j) => (
            <rect key={j} x={fort.x + dx - 4} y={fort.y - 14} width={4} height={6} fill={BURNT} />
          ))}
          <text x={fort.x} y={fort.y + 30} textAnchor="middle" fill={LIGHT} fontSize="9" fontFamily="'Cormorant Garamond', serif">{fort.label}</text>
          {/* Garrison glow */}
          <motion.circle
            cx={fort.x} cy={fort.y}
            r={20} fill={BURNT} opacity={0}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        </motion.g>
      ))}
    </g>
  );
};

export const KhaljiReformGraphic = ({ step }: { step: number }) => (
  <div className="w-full h-full flex items-center justify-center" style={{ background: 'hsl(220, 25%, 6%)' }}>
    <svg viewBox="0 0 600 650" className="w-full h-full max-w-2xl" preserveAspectRatio="xMidYMid meet">
      {/* Background subtle grid */}
      <defs>
        <pattern id="khalji-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0 L0 0 L0 30" fill="none" stroke="hsl(40, 15%, 15%)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="600" height="650" fill="url(#khalji-grid)" opacity="0.3" />

      {/* Render the active step visual */}
      <motion.g
        key={`step-${step}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {step === 0 && <ScatteredLevy visible />}
        {step === 1 && <StandingArmy visible />}
        {step === 2 && <PriceControls visible />}
        {step === 3 && <IntelligenceNetwork visible />}
        {step >= 4 && <FrontierForts visible />}
      </motion.g>
    </svg>
  </div>
);
