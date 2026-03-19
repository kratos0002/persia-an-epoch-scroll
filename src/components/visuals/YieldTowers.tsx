import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRICOLOR = 'hsl(220, 60%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

// ─── Step 0: US Nuclear Umbrella ───────────────────────────────────────────────
const UmbrellaVisual = () => (
  <svg viewBox="0 0 360 300" className="w-full h-auto max-w-[420px] mx-auto">
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
    { id: 'pierre', name: 'Pierre Curie', years: '1859–1906', x: 110, y: 90, nobel: '1903' },
    { id: 'marie', name: 'Marie Curie', years: '1867–1934', x: 250, y: 90, nobel: '1911' },
    { id: 'irene', name: 'Irène Joliot-Curie', years: '1897–1956', x: 180, y: 190, nobel: '1935' },
    { id: 'frederic', name: 'Frédéric Joliot-Curie', years: '1900–1958', x: 180, y: 275 },
    { id: 'cea', name: 'CEA', years: '1945', x: 180, y: 350 },
  ];

  return (
    <svg viewBox="0 0 360 400" className="w-full h-auto max-w-[520px] mx-auto">
      {/* Title */}
      <text x={180} y={30} textAnchor="middle" fill={STEEL} fontSize={7} fontFamily="var(--font-body)" letterSpacing={3}>
        FRENCH ATOMIC LINEAGE
      </text>

      {/* Vertical descent line — the spine */}
      <motion.line x1={180} y1={110} x2={180} y2={340} stroke={`${TRICOLOR}30`} strokeWidth={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />

      {/* Pierre → Irène */}
      <motion.line x1={110} y1={108} x2={180} y2={170} stroke={`${STEEL}40`} strokeWidth={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.4 }} />
      {/* Marie → Irène */}
      <motion.line x1={250} y1={108} x2={180} y2={170} stroke={`${STEEL}40`} strokeWidth={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isCEA = node.id === 'cea';
        const isFrederic = node.id === 'frederic';

        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.18 }}
          >
            {/* Name */}
            <text
              x={node.x}
              y={node.y - (isCEA ? 2 : 6)}
              textAnchor="middle"
              fill={isCEA || isFrederic ? TRICOLOR : LIGHT}
              fontSize={isCEA ? 16 : 12}
              fontFamily="var(--font-display)"
              fontWeight={isCEA || isFrederic ? 800 : 600}
            >
              {node.name}
            </text>

            {/* Years */}
            <text
              x={node.x}
              y={node.y + (isCEA ? 14 : 8)}
              textAnchor="middle"
              fill={STEEL}
              fontSize={7}
              fontFamily="var(--font-body)"
              opacity={0.7}
            >
              {node.years}
            </text>

            {/* Nobel indicator — subtle */}
            {'nobel' in node && node.nobel && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.12 }}
              >
                <text
                  x={node.x + (node.id === 'pierre' ? -52 : node.id === 'marie' ? 52 : 60)}
                  y={node.y + (node.id === 'irene' ? -2 : 0)}
                  textAnchor="middle"
                  fill="hsl(45, 60%, 55%)"
                  fontSize={6}
                  fontFamily="var(--font-body)"
                  opacity={0.5}
                >
                  Nobel {node.nobel}
                </text>
              </motion.g>
            )}

            {/* Subtle dot marker */}
            {!isCEA && (
              <circle cx={node.x} cy={node.y + 16} r={2} fill={isFrederic ? TRICOLOR : STEEL} opacity={0.4} />
            )}

            {/* CEA — thin rule above */}
            {isCEA && (
              <motion.line
                x1={node.x - 60} y1={node.y - 18}
                x2={node.x + 60} y2={node.y - 18}
                stroke={TRICOLOR} strokeWidth={0.5} opacity={0.3}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{ transformOrigin: `${node.x}px ${node.y - 18}px` }}
              />
            )}
          </motion.g>
        );
      })}

      {/* CEA subtitle */}
      <motion.text
        x={180} y={380}
        textAnchor="middle"
        fill={STEEL}
        fontSize={6.5}
        fontFamily="var(--font-body)"
        opacity={0.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.3 }}
      >
        Commissariat à l'énergie atomique
      </motion.text>

      {/* Bottom line */}
      <motion.text
        x={180} y={392}
        textAnchor="middle"
        fill={STEEL}
        fontSize={7}
        fontFamily="var(--font-body)"
        fontStyle="italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5 }}
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
    <svg viewBox="0 0 360 310" className="w-full h-auto max-w-[420px] mx-auto">
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
const MAX_HEIGHT = 300;

const YieldComparisonVisual = () => (
  <div className="w-full max-w-[540px] mx-auto flex flex-col items-center">
    <p className="text-[9px] tracking-[0.3em] uppercase font-body text-center mb-4" style={{ color: STEEL }}>
      First Test Yields — Kilotons
    </p>
    <svg viewBox="0 0 400 420" className="w-full h-auto">
      {TESTS.map((test, i) => {
        const barHeight = (test.yield / MAX_YIELD) * MAX_HEIGHT;
        const x = 30 + i * 90;
        const y = 370 - barHeight;
        const isFrance = test.nation === 'France';

        return (
          <motion.g key={test.nation}>
            <motion.g
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1.1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${x + 30}px 370px` }}
            >
              {/* Glow for France */}
              {isFrance && (
                <motion.ellipse
                  cx={x + 30} cy={y + 16}
                  rx={40} ry={24}
                  fill="none" stroke={TRICOLOR} strokeWidth={1.5}
                  animate={{ opacity: [0.4, 0.08, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
              )}
              {/* Stem */}
              <rect x={x + 22} y={y + 28} width={16} height={barHeight - 28}
                fill={test.color} opacity={isFrance ? 0.9 : 0.45} rx={2} />
              {/* Cloud cap */}
              <ellipse cx={x + 30} cy={y + 16} rx={28} ry={18}
                fill={test.color} opacity={isFrance ? 0.75 : 0.3} />
              <ellipse cx={x + 30} cy={y + 6} rx={20} ry={12}
                fill={test.color} opacity={isFrance ? 0.55 : 0.18} />
            </motion.g>

            <motion.text x={x + 30} y={y - 8} textAnchor="middle"
              fill={isFrance ? LIGHT : STEEL}
              fontSize={isFrance ? 14 : 10}
              fontFamily="var(--font-display)" fontWeight={700}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.18 }}
            >
              {test.yield} kt
            </motion.text>

            <text x={x + 30} y={388} textAnchor="middle"
              fill={test.color} fontSize={8} fontFamily="var(--font-body)" fontWeight={600}>
              {test.nation}
            </text>
            <text x={x + 30} y={400} textAnchor="middle"
              fill={STEEL} fontSize={6} fontFamily="var(--font-body)">
              {test.name}
            </text>
            <text x={x + 30} y={410} textAnchor="middle"
              fill={STEEL} fontSize={6} fontFamily="var(--font-body)">
              {test.year}
            </text>
          </motion.g>
        );
      })}

      <line x1={20} y1={370} x2={380} y2={370} stroke={STEEL} strokeWidth={0.4} opacity={0.25} />

    </svg>
  </div>
);

// ─── Public component ──────────────────────────────────────────────────────────
interface Props {
  activeStep: number;
}

export const YieldTowers = ({ activeStep }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {activeStep === 0 && (
          <motion.div key="umbrella" className="w-full flex items-center justify-center"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <UmbrellaVisual />
          </motion.div>
        )}
        {activeStep === 1 && (
          <motion.div key="curie" className="w-full flex items-center justify-center"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <CurieLineageVisual />
          </motion.div>
        )}
        {activeStep === 2 && (
          <motion.div key="gerboise" className="w-full flex items-center justify-center"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <GerboiseBleueVisual />
          </motion.div>
        )}
        {activeStep === 3 && (
          <motion.div key="comparison" className="w-full flex items-center justify-center"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <YieldComparisonVisual />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
