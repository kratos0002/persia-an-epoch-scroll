'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GEIGER = 'hsl(140, 70%, 45%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const DIM = 'hsl(200, 10%, 18%)';

/* ── Nation colors (matching STOCKPILES in the epilogue) ── */
const NATION_COLORS: Record<string, string> = {
  USA: 'hsl(220, 60%, 50%)',
  USSR: 'hsl(0, 65%, 50%)',
  UK: 'hsl(210, 50%, 40%)',
  France: 'hsl(220, 50%, 55%)',
  China: 'hsl(0, 70%, 45%)',
  India: 'hsl(25, 80%, 50%)',
  Pakistan: 'hsl(150, 60%, 35%)',
  Israel: 'hsl(220, 20%, 55%)',
  DPRK: 'hsl(45, 80%, 55%)',
};

/* ── World outline paths (equirectangular, 400x260) ── */
const WORLD_CONTEXT = [
  // USA continental
  "M99.9 64.1 L103.3 65.8 L107.7 66.1 L110.8 67.9 L111.4 68.5 L113.1 70.7 L112.2 74 L115.3 73.5 L116.9 71.8 L120.5 70.2 L125 69.6 L127.3 67.1 L129.3 70.3 L125.3 72.8 L126.2 74.1 L123.7 75 L122.6 75.8 L121.7 77.1 L120.5 78.1 L119.7 80.3 L119.4 79.2 L119.9 81.3 L117.1 84.9 L114.1 88.1 L115 92.6 L114.8 96.6 L112.7 93.3 L111.2 89.9 L107.6 89.6 L105.6 90.7 L104.1 91.1 L100 90.7 L97.2 94.4 L95.5 94.8 L93.4 90.8 L89.7 90.6 L87.6 87.7 L80.4 87.3 L76.2 85.9 L73.9 84.2 L70.6 79.9 L68.7 76.2 L69.1 70.5 L68.5 65.5 L70.3 64.7 L83.8 64.7 L99.6 64.7 Z",
  // Alaska
  "M36.3 35.1 L40.9 36.1 L48.4 36.5 L52.2 49.6 L57 50.3 L61 54.6 L60.7 56 L55.8 52.4 L48 50 L43.2 50.1 L40.2 49 L37.4 50.9 L34.7 54 L29.8 56.2 L27 56.6 L32.5 54 L33 51.8 L30.7 51.2 L28.5 50 L24.6 48 L27.9 45.9 L29.5 44.1 L27.4 43.9 L24 41.9 L28.5 41 L24.6 38.2 L30.1 36.1 Z",
  // Brazil
  "M139.2 170.3 L143.4 164.8 L142.7 162 L141.3 160.2 L138.9 157.6 L139.3 154.2 L136.5 151.7 L136.1 148.4 L133.3 146.8 L131 143 L127.4 144.7 L124.7 143.4 L122.3 141.2 L122.7 138.1 L125.3 135.7 L126.1 130.2 L126.3 128.5 L129.2 128.5 L131.8 128.2 L132.2 126.7 L132.6 124.6 L136 123.4 L136.9 124.1 L137 127.6 L139.1 127.8 L141 127.3 L142.4 126.9 L144.1 127.2 L146.1 125.1 L146.8 130.1 L152.6 132.1 L157.8 133.8 L162.8 137.3 L160.9 144.7 L159 150.9 L157 157.9 L152.9 161.1 L148.7 165.5 L146.5 171.3 L143.4 174.3 L140.9 171.2 Z",
  // China
  "M334.7 63.7 L340.8 65.8 L340.5 69.8 L337.9 72.8 L335.3 74.7 L331.2 76.8 L328.1 77 L325.6 77.7 L325.5 80.1 L329.3 80.8 L326.9 84.2 L328 89.1 L327.9 92.5 L322.3 99.6 L318.1 101.3 L316 101.5 L312.7 99.6 L308.4 99.7 L306.8 101.4 L305.1 99.4 L304.2 95.4 L302.7 92.3 L299.8 91 L295.8 92.6 L293 92.8 L288.6 90.9 L284.2 88.8 L283.2 85.3 L279.3 80.5 L278 78.7 L279.7 75.9 L284.6 73.8 L286.5 69.6 L290.5 65.4 L293.8 65.9 L297.3 69.8 L301.7 73 L309.1 74.1 L315.3 73.3 L317.5 70.7 L322.4 69 L326.4 67.3 L322.2 66.4 L325.9 63.1 L326.9 59.7 L332.9 59.6 Z",
  // Russia main
  "M312.9 27.4 L320.5 28.9 L316.8 31.3 L322 31.7 L332.3 31.9 L336.9 35.1 L345.1 34.9 L357.8 33.7 L368.7 36.1 L375.2 37.4 L379.9 36.5 L390 43.4 L388.8 45.7 L384.3 47.6 L378.3 49.2 L372.3 51.1 L371.1 55.2 L367.3 59.4 L364.1 56.2 L369 50.9 L371.7 47.8 L363.7 51.1 L356.8 51.1 L344.3 57.2 L349.2 59.2 L346.3 67.3 L341 72.9 L337.9 73.5 L339.2 69.6 L342.5 65.4 L336.6 64.1 L332.9 59.6 L326.9 59.7 L325.9 63.1 L320.7 63 L314.5 64.3 L309.4 63.2 L304.4 60.6 L300.1 63.3 L293.7 64 L289.8 63.2 L285 61.5 L278.5 58.6 L274.8 56.4 L264.8 58 L263.3 60.7 L261.6 61.9 L253.6 61.1 L249.7 64.5 L251.3 67.9 L250.2 71.8 L250 75 L247 73.1 L242.3 71.9 L239.5 69.5 L240.3 67.2 L241.9 65 L239.5 62.8 L236.1 61.7 L234.2 60.3 L233.2 59.1 L233.6 58 L231.6 55.6 L229.3 53.7 L229.5 50.7 L233.3 46.2 L230.7 40.7 L232.8 37.3 L243.3 40.1 L235 41.2 L239.1 44.9 L242.7 43.6 L247 41 L249.4 39.7 L250.8 40 L257.8 39.2 L264.5 38.1 L272.3 39.2 L271 36.8 L273.8 32.6 L276.8 36.1 L276.4 41.8 L278.6 38.9 L277.2 34.7 L279.5 34.9 L286 34.3 L291.6 31.4 L298.1 29 L306.4 28.1 L310.5 27.2 Z",
  // Germany
  "M210.5 56.7 L211.5 58 L214.4 57.9 L214.9 59.4 L215.4 61 L215.1 61.8 L213.7 62.7 L213.2 63.9 L214 65.4 L213.7 66.7 L212.1 66.6 L210.4 66.6 L208.8 66.5 L208.5 64.6 L206.6 63.5 L206.3 60.9 L207.5 59.1 L208.4 58.3 L209 57.5 Z",
  // France
  "M203.8 62.8 L206 64 L207 64.4 L207.9 66.5 L207.1 66.9 L206.9 68.1 L207.5 69.6 L208 71.2 L204.8 72.1 L201.9 73.5 L198.4 72.6 L198.7 68.6 L195.3 66.1 L198.3 65.1 L201.4 63.2 L202.8 62.3 Z",
  // UK
  "M196.8 51.8 L197.9 53.1 L197.8 55.5 L199.5 57.4 L201.8 59.7 L201.5 61.6 L197.4 62.7 L195.2 62.9 L195.5 61.7 L194.7 61.2 L195 59.5 L196.7 58.8 L196.2 57.2 L195 56 L194 55 L194.7 51.8 Z",
  // India
  "M282.2 82.7 L282.8 86.5 L284.5 91.6 L290 94.4 L292.9 93.4 L294.7 94.4 L296.8 93 L301.5 90.7 L302.4 93.1 L299.9 96.5 L298.2 99.7 L296.8 99.4 L296.9 96.5 L293.5 94.7 L293.6 97.7 L293.1 101.1 L288.6 105.6 L285.3 108.7 L284.3 113.9 L282.6 118.1 L280 114.9 L277.6 108.7 L275.1 102.3 L272 98.4 L274.1 94.7 L277.5 90 L278.2 85.4 Z",
  // Canada
  "M104.4 37.3 L107.8 40.4 L112.8 37.1 L114.1 40.5 L108.1 43 L104.2 46.1 L100.1 51.4 L106 54.2 L112 56.3 L115.6 61.7 L117.4 56.5 L117.1 51.6 L120.1 47 L124.7 48.5 L128.6 52.4 L134 52.4 L138.8 56.7 L141.2 60.5 L134.8 63.2 L127.7 64.6 L129.8 64.5 L131.9 68.3 L136.9 68.8 L130.2 71.8 L128.4 69.1 L126.1 67.7 L124.5 70 L119.2 71.3 L116.6 72.3 L113 74.4 L112.5 73.4 L111.8 68.9 L111.2 68 L110.4 67.5 L105.8 66 L101.2 65.2 L99.6 64.7 L83.8 64.7 L70.3 64.7 L64.9 61 L62.2 56.9 L59.2 52.1 L54.9 51.5 L51.2 42 L56.8 37.6 L63.7 37 L68.7 36.5 L73.4 37.5 L78.3 39.5 L86.2 39.5 L88.8 38.6 L96.1 39.6 L99.2 39.2 L98.3 35.1 L102.5 37.1 Z",
  // Australia
  "M351.5 148.4 L353.3 150.6 L354.2 154.4 L357 157.5 L359.1 159.9 L361.6 164.8 L361.9 169.3 L360.1 174.1 L358.4 178.6 L355.6 181 L353.1 180.5 L349.5 181.1 L346.8 177.6 L344.4 177 L344.6 175 L342.1 174.3 L338.6 172 L332 173.6 L329 175.3 L325.6 176 L322 175.8 L322.1 173.9 L321.4 169.3 L319.8 165.4 L320.6 165.1 L319.8 161.7 L320.6 160 L323.7 157.5 L325.9 156.6 L329 154.3 L330.7 152.8 L331.9 150.1 L333.2 148.8 L336.2 149.8 L337.4 147.5 L339.9 145.5 L341.9 146.1 L344.1 145.8 L343.6 148.3 L344.7 151.2 L347 153.2 L349.3 151.1 L349.5 147.3 L350 144.7 L351.1 146.4 Z",
  // Kenya (Africa outline)
  "M243.3 131.1 L242.9 133.3 L242 134.9 L239.9 134.9 L235.8 131.3 L236.6 128.4 L236.4 125.3 L237.3 122.7 L238.2 124.1 L240.6 125.2 L241.8 125.4 L243.5 124.8 Z",
];

/* ── Nuclear nations ── */
interface Nation {
  id: string;
  code: string;
  year: number;
  x: number;
  y: number;
  labelAnchor: 'start' | 'end' | 'middle';
  labelDx: number;
  labelDy: number;
}

const NATIONS: Nation[] = [
  { id: 'USA',     code: 'USA',  year: 1945, x: 95,  y: 78,  labelAnchor: 'end',    labelDx: -5,  labelDy: 1 },
  { id: 'USSR',    code: 'USSR', year: 1949, x: 250, y: 42,  labelAnchor: 'start',  labelDx: 5,   labelDy: 1 },
  { id: 'UK',      code: 'UK',   year: 1952, x: 197, y: 58,  labelAnchor: 'end',    labelDx: -5,  labelDy: -2 },
  { id: 'France',  code: 'FRA',  year: 1960, x: 202, y: 67,  labelAnchor: 'end',    labelDx: -5,  labelDy: 4 },
  { id: 'China',   code: 'CHN',  year: 1964, x: 320, y: 82,  labelAnchor: 'start',  labelDx: 5,   labelDy: 1 },
  { id: 'Israel',  code: 'ISR',  year: 1966, x: 226, y: 99,  labelAnchor: 'start',  labelDx: 5,   labelDy: 1 },
  { id: 'India',   code: 'IND',  year: 1974, x: 282, y: 92,  labelAnchor: 'start',  labelDx: 5,   labelDy: -2 },
  { id: 'Pakistan',code: 'PAK',  year: 1998, x: 275, y: 85,  labelAnchor: 'end',    labelDx: -5,  labelDy: -2 },
  { id: 'DPRK',    code: 'DPRK', year: 2006, x: 322, y: 72,  labelAnchor: 'start',  labelDx: 5,   labelDy: -2 },
];

/* ── Proliferation chain connections ── */
interface ChainLink {
  from: string;
  to: string;
  label: string;
  order: number; // chronological order for stagger
}

const CHAIN: ChainLink[] = [
  { from: 'USA',     to: 'USSR',    label: 'espionage',    order: 0 },
  { from: 'USA',     to: 'UK',      label: 'partnership',  order: 1 },
  { from: 'USSR',    to: 'China',   label: 'Soviet help',  order: 3 },
  { from: 'France',  to: 'Israel',  label: 'assistance',   order: 4 },
  // India — independent program (China was catalyst, not source)
  { from: 'India',   to: 'Pakistan',label: 'rivalry',      order: 5 },
  { from: 'Pakistan',to: 'DPRK',    label: 'Khan network', order: 6 },
];

/* ── Helpers ── */
function getNation(id: string): Nation {
  return NATIONS.find(n => n.id === id)!;
}

/** Compute a curved path between two nation dots */
function chainPath(from: Nation, to: Nation): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  // perpendicular offset for curve
  const dist = Math.sqrt(dx * dx + dy * dy);
  const curvature = Math.min(dist * 0.2, 20);
  const mx = (from.x + to.x) / 2 - (dy / dist) * curvature;
  const my = (from.y + to.y) / 2 + (dx / dist) * curvature;
  return `M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}`;
}

/* ── Chain line component ── */
const ChainLine = ({ link, inView }: { link: ChainLink; inView: boolean }) => {
  const from = getNation(link.from);
  const to = getNation(link.to);
  const d = chainPath(from, to);
  const baseDelay = 0.8 + link.order * 0.5;

  return (
    <g>
      {/* The chain line */}
      <motion.path
        d={d}
        fill="none"
        stroke={GEIGER}
        strokeWidth={0.8}
        strokeDasharray="3 2"
        opacity={0}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
        transition={{ duration: 1.2, delay: baseDelay, ease: 'easeOut' }}
      />

      {/* Animated particle flowing along the line */}
      <circle r={1.2} fill={GEIGER} opacity={0}>
        {inView && (
          <>
            <animateMotion
              path={d}
              dur="3s"
              begin={`${baseDelay + 1.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0.7;0"
              keyTimes="0;0.1;0.85;1"
              dur="3s"
              begin={`${baseDelay + 1.2}s`}
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      {/* Second particle offset for denser flow */}
      <circle r={0.8} fill={GEIGER} opacity={0}>
        {inView && (
          <>
            <animateMotion
              path={d}
              dur="3s"
              begin={`${baseDelay + 2.7}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.5;0.5;0"
              keyTimes="0;0.1;0.85;1"
              dur="3s"
              begin={`${baseDelay + 2.7}s`}
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      {/* Small arrowhead at midpoint */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ delay: baseDelay + 0.8, duration: 0.4 }}
      >
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 - 3}
          textAnchor="middle"
          fill={STEEL}
          fontSize={3.5}
          fontFamily="var(--font-body)"
          letterSpacing={0.3}
        >
          {link.label}
        </text>
      </motion.g>
    </g>
  );
};

/* ── Nation dot component ── */
const NationDot = ({ nation, inView, index }: { nation: Nation; inView: boolean; index: number }) => {
  const color = NATION_COLORS[nation.id];
  const delay = 0.3 + index * 0.15;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformOrigin: `${nation.x}px ${nation.y}px` }}
    >
      {/* Outer pulse ring */}
      <circle cx={nation.x} cy={nation.y} r={4} fill="none" stroke={color} strokeWidth={0.4} opacity={0.2}>
        {inView && (
          <animate
            attributeName="r"
            values="3;6;3"
            dur="4s"
            begin={`${delay + 0.5}s`}
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Main dot */}
      <circle cx={nation.x} cy={nation.y} r={2.5} fill={color} opacity={0.85} />

      {/* Inner bright core */}
      <circle cx={nation.x} cy={nation.y} r={1} fill={LIGHT} opacity={0.6} />

      {/* Label: code + year */}
      <text
        x={nation.x + nation.labelDx}
        y={nation.y + nation.labelDy - 3}
        textAnchor={nation.labelAnchor}
        fill={color}
        fontSize={4.5}
        fontFamily="var(--font-display)"
        fontWeight={700}
        letterSpacing={0.5}
      >
        {nation.code}
      </text>
      <text
        x={nation.x + nation.labelDx}
        y={nation.y + nation.labelDy + 2}
        textAnchor={nation.labelAnchor}
        fill={STEEL}
        fontSize={3.5}
        fontFamily="var(--font-body)"
        letterSpacing={0.3}
      >
        {nation.id === 'Israel' ? `~${nation.year}` : nation.year}
      </text>
    </motion.g>
  );
};

/* ── Main component ── */
export const ProliferationMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="w-full flex flex-col items-center py-8">
      <svg
        viewBox="0 0 400 310"
        className="w-full max-w-[720px] h-auto"
        role="img"
        aria-label="Map showing the chain of nuclear proliferation between nine nations from 1945 to 2006"
      >
        {/* Background */}
        <rect width={400} height={260} fill="transparent" />

        {/* Title */}
        <motion.text
          x={200}
          y={16}
          textAnchor="middle"
          fill={STEEL}
          fontSize={7}
          fontFamily="var(--font-display)"
          fontWeight={700}
          letterSpacing={2.5}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.8 }}
        >
          THE CHAIN OF PROLIFERATION
        </motion.text>

        {/* Subtitle */}
        <motion.text
          x={200}
          y={24}
          textAnchor="middle"
          fill={STEEL}
          fontSize={4}
          fontFamily="var(--font-body)"
          letterSpacing={0.5}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          How each nation acquired the bomb, 1945 - 2006
        </motion.text>

        {/* World outline — very dim */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          {WORLD_CONTEXT.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={STEEL}
              strokeWidth={0.5}
              opacity={0.08}
            />
          ))}
        </motion.g>

        {/* Chain lines — animate in chronological order */}
        {CHAIN.map(link => (
          <ChainLine key={`${link.from}-${link.to}`} link={link} inView={inView} />
        ))}

        {/* France independent marker — no incoming line, just a subtle note */}
        <motion.text
          x={202}
          y={76}
          textAnchor="middle"
          fill={STEEL}
          fontSize={3}
          fontFamily="var(--font-body)"
          fontStyle="italic"
          letterSpacing={0.2}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.35 } : {}}
          transition={{ delay: 2.3, duration: 0.6 }}
        >
          independent program
        </motion.text>

        {/* Nation dots — appear with stagger */}
        {NATIONS.map((nation, i) => (
          <NationDot key={nation.id} nation={nation} inView={inView} index={i} />
        ))}

        {/* ── Timeline at bottom ── */}
        <motion.line
          x1={30} y1={262} x2={370} y2={262}
          stroke={DIM} strokeWidth={0.8}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Year endpoints */}
        <motion.text x={30} y={258} fill={STEEL} fontSize={5} fontFamily="var(--font-body)" opacity={0.4}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.4 } : {}} transition={{ delay: 0.8 }}>
          1945
        </motion.text>
        <motion.text x={370} y={258} textAnchor="end" fill={STEEL} fontSize={5} fontFamily="var(--font-body)" opacity={0.4}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.4 } : {}} transition={{ delay: 0.8 }}>
          2017
        </motion.text>

        {/* Nation ticks with names */}
        {NATIONS.map((nation, i) => {
          const minYear = 1945;
          const maxYear = 2017;
          const tx = 30 + ((nation.year - minYear) / (maxYear - minYear)) * 340;
          const color = NATION_COLORS[nation.id];
          return (
            <motion.g
              key={`tick-${nation.id}`}
              initial={{ opacity: 0, y: 5 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 + i * 0.12, duration: 0.4 }}
            >
              {/* Tick mark */}
              <line x1={tx} y1={258} x2={tx} y2={266} stroke={color} strokeWidth={1.5} opacity={0.7} />
              {/* Dot */}
              <circle cx={tx} cy={262} r={2.5} fill={color} opacity={0.8} />
              {/* Country code */}
              <text
                x={tx}
                y={276}
                textAnchor="middle"
                fill={color}
                fontSize={5.5}
                fontFamily="var(--font-display)"
                fontWeight={700}
              >
                {nation.code}
              </text>
              {/* Year */}
              <text
                x={tx}
                y={284}
                textAnchor="middle"
                fill={STEEL}
                fontSize={4.5}
                fontFamily="var(--font-body)"
                opacity={0.6}
              >
                {nation.year === 1966 ? `~${nation.year}` : nation.year}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};
