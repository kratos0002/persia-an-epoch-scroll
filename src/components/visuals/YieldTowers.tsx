import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRICOLOR = 'hsl(220, 60%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

// ─── Step 0: US Nuclear Umbrella ───────────────────────────────────────────────
const UmbrellaVisual = () => (
  <svg viewBox="0 0 360 300" className="w-full h-auto max-w-[420px]">
    {/* Background sky */}
    <rect width={360} height={300} fill={BUNKER} />

    {/* Umbrella canopy */}
    <motion.path
      d="M180 60 Q90 80 60 160 Q120 140 180 150 Q240 140 300 160 Q270 80 180 60Z"
      fill="hsl(210, 50%, 30%)"
      stroke="hsl(210, 50%, 50%)"
      strokeWidth={1.5}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '180px 60px' }}
    />

    {/* Stripes on umbrella */}
    {[0.25, 0.5, 0.75].map((t, i) => {
      const x = 60 + t * 240;
      return (
        <motion.line
          key={i}
          x1={x}
          y1={62 + i * 6}
          x2={180 + (x - 180) * 0.4}
          y2={150}
          stroke="hsl(210, 50%, 50%)"
          strokeWidth={0.8}
          strokeDasharray="3 3"
          opacity={0.4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        />
      );
    })}

    {/* Umbrella handle */}
    <motion.line
      x1={180} y1={150}
      x2={180} y2={220}
      stroke="hsl(210, 50%, 50%)"
      strokeWidth={2}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      style={{ transformOrigin: '180px 150px' }}
    />
    <motion.path
      d="M180 220 Q165 232 172 240"
      fill="none"
      stroke="hsl(210, 50%, 50%)"
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    />

    {/* "USA" label on umbrella */}
    <motion.text
      x={180} y={115}
      textAnchor="middle"
      fill={LIGHT}
      fontSize={11}
      fontFamily="var(--font-display)"
      fontWeight={700}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      USA
    </motion.text>
    <motion.text
      x={180} y={128}
      textAnchor="middle"
      fill="hsl(210, 50%, 70%)"
      fontSize={7}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      Nuclear Umbrella
    </motion.text>

    {/* Europe protected underneath */}
    <motion.rect
      x={130} y={228}
      width={100} height={28}
      rx={4}
      fill="hsl(220, 30%, 15%)"
      stroke={TRICOLOR}
      strokeWidth={1}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    />
    <motion.text
      x={180} y={244}
      textAnchor="middle"
      fill={TRICOLOR}
      fontSize={8}
      fontFamily="var(--font-body)"
      fontWeight={600}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0 }}
    >
      Western Europe
    </motion.text>
    <motion.text
      x={180} y={254}
      textAnchor="middle"
      fill={STEEL}
      fontSize={6.5}
      fontFamily="var(--font-body)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0 }}
    >
      (incl. France)
    </motion.text>

    {/* Question mark — can we trust it? */}
    <motion.text
      x={298} y={178}
      textAnchor="middle"
      fill={LIGHT}
      fontSize={42}
      fontFamily="var(--font-display)"
      fontWeight={900}
      opacity={0.15}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ delay: 1.1 }}
    >
      ?
    </motion.text>

    {/* Doubt arrow from Europe toward umbrella */}
    <motion.text
      x={180} y={286}
      textAnchor="middle"
      fill={STEEL}
      fontSize={6.5}
      fontFamily="var(--font-body)"
      fontStyle="italic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      Would America risk New York for Paris?
    </motion.text>
  </svg>
);

// ─── Step 1: Curie Family Tree / French atomic lineage ─────────────────────────
const CurieLineageVisual = () => {
  const nodes = [
    { id: 'pierre', label: 'Pierre Curie', sub: '1859–1906', x: 100, y: 60 },
    { id: 'marie', label: 'Marie Curie', sub: '1867–1934', x: 260, y: 60 },
    { id: 'irene', label: 'Irène Joliot-Curie', sub: '1897–1956', x: 180, y: 140 },
    { id: 'frederic', label: 'Frédéric Joliot-Curie', sub: '1900–1958', x: 180, y: 210 },
    { id: 'ceg', label: 'CEA · 1945', sub: 'Commissariat à l\'énergie atomique', x: 180, y: 272 },
  ];

  return (
    <svg viewBox="0 0 360 310" className="w-full h-auto max-w-[420px]">
      <rect width={360} height={310} fill={BUNKER} />

      {/* Title */}
      <text
        x={180} y={28}
        textAnchor="middle"
        fill={STEEL}
        fontSize={7}
        fontFamily="var(--font-body)"
        letterSpacing={3}
        textTransform="uppercase"
      >
        FRENCH ATOMIC LINEAGE
      </text>

      {/* Connection lines */}
      {/* Pierre + Marie → Irène */}
      <motion.line x1={100} y1={78} x2={180} y2={132} stroke={STEEL} strokeWidth={0.8} strokeDasharray="3 2" opacity={0.4}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.4 }} transition={{ duration: 0.6, delay: 0.3 }} />
      <motion.line x1={260} y1={78} x2={180} y2={132} stroke={STEEL} strokeWidth={0.8} strokeDasharray="3 2" opacity={0.4}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.4 }} transition={{ duration: 0.6, delay: 0.4 }} />
      {/* Irène → Frédéric */}
      <motion.line x1={180} y1={158} x2={180} y2={202} stroke={TRICOLOR} strokeWidth={1} strokeDasharray="3 2" opacity={0.5}
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 0.5 }} transition={{ duration: 0.5, delay: 0.7 }}
        style={{ transformOrigin: '180px 158px' }} />
      {/* Frédéric → CEA */}
      <motion.line x1={180} y1={226} x2={180} y2={260} stroke={TRICOLOR} strokeWidth={1.5} opacity={0.7}
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 0.7 }} transition={{ duration: 0.4, delay: 0.9 }}
        style={{ transformOrigin: '180px 226px' }} />

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isCEA = node.id === 'ceg';
        const isJoliot = node.id === 'frederic';
        return (
          <motion.g key={node.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <ellipse
              cx={node.x} cy={node.y}
              rx={isCEA ? 80 : 55} ry={isCEA ? 14 : 12}
              fill={isCEA ? TRICOLOR : isJoliot ? 'hsl(220, 40%, 20%)' : 'hsl(200, 20%, 14%)'}
              stroke={isCEA ? TRICOLOR : isJoliot ? TRICOLOR : STEEL}
              strokeWidth={isCEA ? 0 : 0.8}
              opacity={isCEA ? 0.9 : 1}
            />
            <text
              x={node.x} y={node.y - 3}
              textAnchor="middle"
              fill={isCEA ? BUNKER : isJoliot ? TRICOLOR : LIGHT}
              fontSize={isCEA ? 7.5 : 8}
              fontFamily="var(--font-display)"
              fontWeight={isCEA || isJoliot ? 700 : 600}
            >
              {node.label}
            </text>
            <text
              x={node.x} y={node.y + 8}
              textAnchor="middle"
              fill={isCEA ? 'hsl(220, 40%, 30%)' : STEEL}
              fontSize={5.5}
              fontFamily="var(--font-body)"
            >
              {node.sub}
            </text>
          </motion.g>
        );
      })}

      {/* Nobel badges */}
      {[
        { x: 37, y: 60, label: 'Nobel\n1903' },
        { x: 316, y: 60, label: 'Nobel\n1911' },
        { x: 315, y: 140, label: 'Nobel\n1935' },
      ].map((badge, i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.1 }}>
          <circle cx={badge.x} cy={badge.y} r={11} fill="hsl(45, 70%, 30%)" opacity={0.7} />
          <text x={badge.x} y={badge.y - 3} textAnchor="middle" fill="hsl(45, 80%, 70%)" fontSize={4.5} fontFamily="var(--font-body)" fontWeight={700}>Nobel</text>
          <text x={badge.x} y={badge.y + 5} textAnchor="middle" fill="hsl(45, 80%, 70%)" fontSize={4.5} fontFamily="var(--font-body)">{badge.label.split('\n')[1]}</text>
        </motion.g>
      ))}

      {/* De Gaulle's political will label */}
      <motion.text
        x={180} y={298}
        textAnchor="middle"
        fill={STEEL}
        fontSize={6.5}
        fontFamily="var(--font-body)"
        fontStyle="italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Science built it. De Gaulle willed it into being.
      </motion.text>
    </svg>
  );
};

// ─── Step 2: Gerboise Bleue — mushroom cloud + 70kt yield comparison ───────────
const GerboiseBleueVisual = () => {
  // Trinity = 21kt, Gerboise = 70kt → ~3.3x
  const TRINITY_H = 70;
  const GERBOISE_H = TRINITY_H * (70 / 21); // proportional, capped
  const cappedGerboise = Math.min(GERBOISE_H, 200);

  return (
    <svg viewBox="0 0 360 310" className="w-full h-auto max-w-[420px]">
      <rect width={360} height={310} fill={BUNKER} />

      {/* Desert ground */}
      <motion.rect
        x={0} y={255} width={360} height={55}
        fill="hsl(35, 30%, 12%)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
      />
      {/* Sand texture lines */}
      {[0, 1, 2].map(i => (
        <line key={i} x1={20 + i * 60} y1={262} x2={80 + i * 60} y2={266}
          stroke="hsl(35, 25%, 22%)" strokeWidth={0.5} opacity={0.5} />
      ))}

      {/* Baseline */}
      <line x1={30} y1={255} x2={330} y2={255} stroke={STEEL} strokeWidth={0.4} opacity={0.2} />

      {/* Trinity cloud (small, muted) */}
      {(() => {
        const x = 90; const baseY = 255; const h = TRINITY_H;
        return (
          <motion.g
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${x}px ${baseY}px` }}
          >
            <rect x={x - 6} y={baseY - h + 18} width={12} height={h - 18} fill="hsl(140, 40%, 30%)" opacity={0.5} rx={2} />
            <ellipse cx={x} cy={baseY - h + 10} rx={18} ry={12} fill="hsl(140, 40%, 30%)" opacity={0.35} />
            <ellipse cx={x} cy={baseY - h + 4} rx={13} ry={9} fill="hsl(140, 40%, 30%)" opacity={0.2} />
            <text x={x} y={baseY - h - 6} textAnchor="middle" fill={STEEL} fontSize={8} fontFamily="var(--font-display)" fontWeight={700}>21 kt</text>
            <text x={x} y={baseY + 10} textAnchor="middle" fill={STEEL} fontSize={6} fontFamily="var(--font-body)">Trinity</text>
            <text x={x} y={baseY + 20} textAnchor="middle" fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)">USA · 1945</text>
          </motion.g>
        );
      })()}

      {/* Gerboise Bleue cloud (large, glowing) */}
      {(() => {
        const x = 240; const baseY = 255; const h = cappedGerboise;
        return (
          <motion.g
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${x}px ${baseY}px` }}
          >
            {/* Glow ring */}
            <motion.ellipse cx={x} cy={baseY - h + 14} rx={50} ry={32}
              fill="none" stroke={TRICOLOR} strokeWidth={1.5}
              animate={{ opacity: [0.3, 0.08, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            {/* Stem */}
            <rect x={x - 9} y={baseY - h + 28} width={18} height={h - 28}
              fill={TRICOLOR} opacity={0.85} rx={2} />
            {/* Cloud layers */}
            <ellipse cx={x} cy={baseY - h + 18} rx={38} ry={22} fill={TRICOLOR} opacity={0.65} />
            <ellipse cx={x} cy={baseY - h + 8} rx={28} ry={16} fill={TRICOLOR} opacity={0.5} />
            <ellipse cx={x} cy={baseY - h} rx={20} ry={12} fill={LIGHT} opacity={0.2} />

            {/* Yield label */}
            <text x={x} y={baseY - h - 10} textAnchor="middle" fill={LIGHT} fontSize={13} fontFamily="var(--font-display)" fontWeight={900}>70 kt</text>
            <text x={x} y={baseY + 10} textAnchor="middle" fill={TRICOLOR} fontSize={7} fontFamily="var(--font-body)" fontWeight={700}>Gerboise Bleue</text>
            <text x={x} y={baseY + 20} textAnchor="middle" fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)">Sahara · 1960</text>
          </motion.g>
        );
      })()}

      {/* 3× comparison arrow */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <line x1={108} y1={185} x2={198} y2={185} stroke={STEEL} strokeWidth={0.6} strokeDasharray="3 2" opacity={0.4} />
        <text x={153} y={180} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-display)" fontWeight={700}>3× Trinity</text>
      </motion.g>

      {/* Sahara label */}
      <motion.text
        x={180} y={298}
        textAnchor="middle"
        fill={STEEL}
        fontSize={6.5}
        fontFamily="var(--font-body)"
        fontStyle="italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Reggane, Algeria — 13 February 1960
      </motion.text>
    </svg>
  );
};

// ─── Step 3: Yield tower comparison — France among the five ───────────────────
const TESTS = [
  { nation: 'USA', name: 'Trinity', yield: 21, year: '1945', color: 'hsl(140, 70%, 45%)' },
  { nation: 'USSR', name: 'RDS-1', yield: 22, year: '1949', color: 'hsl(0, 70%, 50%)' },
  { nation: 'UK', name: 'Hurricane', yield: 25, year: '1952', color: 'hsl(210, 50%, 40%)' },
  { nation: 'France', name: 'Gerboise Bleue', yield: 70, year: '1960', color: TRICOLOR },
];

const MAX_YIELD = 70;
const MAX_HEIGHT = 180;

const YieldComparisonVisual = () => (
  <div className="w-full max-w-[420px] mx-auto">
    <p className="text-[9px] tracking-[0.3em] uppercase font-body text-center mb-4" style={{ color: STEEL }}>
      First Test Yields — Kilotons
    </p>
    <svg viewBox="0 0 360 280" className="w-full h-auto">
      {TESTS.map((test, i) => {
        const barHeight = (test.yield / MAX_YIELD) * MAX_HEIGHT;
        const x = 40 + i * 76;
        const y = 230 - barHeight;
        const isFrance = test.nation === 'France';

        return (
          <motion.g key={test.nation}>
            <motion.g
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1.1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${x + 24}px 230px` }}
            >
              {/* Glow for France */}
              {isFrance && (
                <motion.ellipse
                  cx={x + 24} cy={y + 12}
                  rx={32} ry={20}
                  fill="none" stroke={TRICOLOR} strokeWidth={1.5}
                  animate={{ opacity: [0.4, 0.08, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
              )}
              {/* Stem */}
              <rect x={x + 17} y={y + 22} width={14} height={barHeight - 22}
                fill={test.color} opacity={isFrance ? 0.9 : 0.45} rx={2} />
              {/* Cloud cap */}
              <ellipse cx={x + 24} cy={y + 12} rx={22} ry={14}
                fill={test.color} opacity={isFrance ? 0.75 : 0.3} />
              <ellipse cx={x + 24} cy={y + 5} rx={15} ry={9}
                fill={test.color} opacity={isFrance ? 0.55 : 0.18} />
            </motion.g>

            <motion.text x={x + 24} y={y - 5} textAnchor="middle"
              fill={isFrance ? LIGHT : STEEL}
              fontSize={isFrance ? 11 : 8}
              fontFamily="var(--font-display)" fontWeight={700}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.18 }}
            >
              {test.yield} kt
            </motion.text>

            <text x={x + 24} y={245} textAnchor="middle"
              fill={test.color} fontSize={6.5} fontFamily="var(--font-body)" fontWeight={600}>
              {test.nation}
            </text>
            <text x={x + 24} y={255} textAnchor="middle"
              fill={STEEL} fontSize={5} fontFamily="var(--font-body)">
              {test.name}
            </text>
            <text x={x + 24} y={263} textAnchor="middle"
              fill={STEEL} fontSize={5} fontFamily="var(--font-body)">
              {test.year}
            </text>
          </motion.g>
        );
      })}

      <line x1={30} y1={230} x2={326} y2={230} stroke={STEEL} strokeWidth={0.4} opacity={0.25} />

      {/* Independent deterrent callout */}
      <motion.text x={180} y={276} textAnchor="middle"
        fill={TRICOLOR} fontSize={7} fontFamily="var(--font-body)" fontStyle="italic"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
      >
        France — an independent deterrent, outside NATO command
      </motion.text>
    </svg>
  </div>
);

// ─── Public component ──────────────────────────────────────────────────────────
interface Props {
  activeStep: number;
}

export const YieldTowers = ({ activeStep }: Props) => {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {activeStep === 0 && (
          <motion.div key="umbrella" className="w-full"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <UmbrellaVisual />
          </motion.div>
        )}
        {activeStep === 1 && (
          <motion.div key="curie" className="w-full"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <CurieLineageVisual />
          </motion.div>
        )}
        {activeStep === 2 && (
          <motion.div key="gerboise" className="w-full"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <GerboiseBleueVisual />
          </motion.div>
        )}
        {activeStep === 3 && (
          <motion.div key="comparison" className="w-full"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <YieldComparisonVisual />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
