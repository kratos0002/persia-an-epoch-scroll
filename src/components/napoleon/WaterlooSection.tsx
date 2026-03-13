import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';

const RED = 'hsl(0, 65%, 48%)';
const GOLD = 'hsl(43, 70%, 50%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';
const BLUE = 'hsl(220, 65%, 45%)';

/* ─── Geographic SVG Paths ─── */
// Geographically accurate outlines scaled to viewBox 0 0 600 500
// Projection: approx Mercator, centered on France, ~35°N–56°N, ~10°W–25°E

// France — recognizable hexagonal shape with Brittany, Normandy, Côte d'Azur, Pyrenees, Corsica
const FRANCE_PATH = 'M168,195 L175,180 L192,172 L210,168 L225,158 L238,148 L252,142 L270,140 L282,132 L290,125 L300,128 L312,135 L318,145 L328,150 L340,148 L348,155 L342,168 L348,178 L358,185 L365,198 L360,212 L352,225 L358,240 L365,255 L358,268 L345,278 L330,285 L315,290 L300,295 L285,300 L268,298 L252,305 L238,315 L225,318 L210,315 L198,308 L185,298 L175,288 L168,275 L158,262 L148,255 L140,248 L135,235 L130,222 L128,210 L132,198 L142,192 L155,188 L168,195 Z';

// Spain
const SPAIN_PATH = 'M130,315 L148,308 L165,305 L185,298 L198,308 L210,315 L225,318 L238,315 L252,305 L265,312 L272,325 L280,340 L275,358 L265,372 L248,380 L228,385 L205,388 L182,385 L160,378 L142,368 L128,355 L120,340 L122,325 L130,315 Z';

// Great Britain
const BRITAIN_PATH = 'M148,90 L158,82 L172,78 L182,85 L188,98 L192,112 L188,128 L182,140 L175,150 L168,158 L158,162 L148,155 L142,142 L138,128 L135,115 L138,100 L148,90 Z';
// Ireland
const IRELAND_PATH = 'M112,100 L122,92 L132,95 L138,105 L135,118 L128,128 L118,132 L108,125 L105,112 L108,102 L112,100 Z';

// Low Countries (Belgium + Netherlands)
const LOWCOUNTRIES_PATH = 'M252,142 L262,128 L278,122 L292,118 L300,125 L300,128 L290,125 L282,132 L270,140 L252,142 Z';

// German states
const GERMANY_PATH = 'M300,128 L292,118 L298,105 L312,95 L332,90 L355,88 L378,92 L395,100 L405,115 L408,132 L402,148 L392,162 L378,170 L365,175 L358,185 L348,178 L342,168 L348,155 L340,148 L328,150 L318,145 L312,135 L300,128 Z';

// Italy
const ITALY_PATH = 'M348,178 L358,185 L365,198 L372,205 L382,212 L390,225 L395,242 L398,260 L395,278 L388,295 L378,308 L365,318 L352,322 L342,315 L338,302 L342,288 L348,272 L352,258 L355,242 L352,225 L348,212 L342,198 L338,188 L342,180 L348,178 Z';

// Switzerland
const SWISS_PATH = 'M298,195 L312,188 L328,185 L338,188 L342,198 L335,208 L322,212 L308,210 L298,205 L298,195 Z';

// Austria
const AUSTRIA_PATH = 'M378,170 L392,162 L402,148 L415,155 L428,162 L440,172 L445,185 L438,198 L425,205 L410,208 L395,205 L382,212 L372,205 L365,198 L358,185 L365,175 L378,170 Z';

// Prussia / North Germany
const PRUSSIA_PATH = 'M355,88 L378,78 L405,72 L432,68 L458,72 L478,82 L488,95 L485,112 L475,125 L458,132 L438,135 L418,138 L405,132 L405,115 L395,100 L378,92 L355,88 Z';

// Russia (western edge)
const RUSSIA_PATH = 'M478,82 L498,72 L525,65 L548,68 L565,78 L572,95 L575,115 L572,138 L565,158 L555,175 L542,188 L525,195 L508,192 L495,182 L485,168 L478,152 L475,135 L475,125 L485,112 L488,95 L478,82 Z';

// Corsica
const CORSICA_PATH = 'M330,255 L335,248 L340,252 L338,262 L332,268 L328,262 L330,255 Z';

// All empire territories (France + conquered/satellite states) for the Elba visual
const EMPIRE_PATHS = [
  { path: FRANCE_PATH, label: 'France', delay: 0 },
  { path: LOWCOUNTRIES_PATH, label: 'Low Countries', delay: 0.1 },
  { path: ITALY_PATH, label: 'Italy', delay: 0.15 },
  { path: GERMANY_PATH, label: 'German States', delay: 0.2 },
  { path: SPAIN_PATH, label: 'Spain', delay: 0.25 },
  { path: SWISS_PATH, label: 'Switzerland', delay: 0.15 },
  { path: CORSICA_PATH, label: 'Corsica', delay: 0.1 },
];

// Neighbouring countries that stay dark (enemies/neutral at exile)
const NEIGHBOUR_PATHS = [
  { path: BRITAIN_PATH, label: 'Britain' },
  { path: IRELAND_PATH, label: 'Ireland' },
  { path: AUSTRIA_PATH, label: 'Austria' },
  { path: PRUSSIA_PATH, label: 'Prussia' },
  { path: RUSSIA_PATH, label: 'Russia' },
];

// Elba — small island off Tuscany coast (geographically ~between Corsica and Italian mainland)
const ELBA = { x: 345, y: 238 };

/* ─── Elba Exile Visual ─── */

const ElbaExileVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="relative max-w-[550px] w-full">
      <svg viewBox="0 0 600 430" className="w-full">
        <defs>
          <filter id="elba-pulse">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Sea */}
        <rect x="0" y="0" width="600" height="430" fill="hsl(220, 25%, 8%)" />

        {/* Neighbouring countries — dark, static */}
        {NEIGHBOUR_PATHS.map(c => (
          <path
            key={c.label}
            d={c.path}
            fill="hsl(225, 15%, 13%)"
            stroke="hsl(220, 12%, 22%)"
            strokeWidth="0.8"
          />
        ))}

        {/* Empire territories — start blue, fade out and collapse toward Elba */}
        {EMPIRE_PATHS.map((t, i) => (
          <motion.path
            key={`empire-${i}`}
            d={t.path}
            fill={BLUE}
            stroke={BLUE}
            strokeWidth="0.5"
            initial={{ opacity: 0.45, scale: 1 }}
            animate={{ opacity: [0.45, 0.25, 0] }}
            transition={{
              duration: 3,
              delay: 0.5 + t.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* France outline remains faintly after empire fades */}
        <motion.path
          d={FRANCE_PATH}
          fill="none"
          stroke="hsl(220, 30%, 25%)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.4] }}
          transition={{ duration: 3, delay: 2 }}
        />

        {/* "FRENCH EMPIRE" label fading */}
        <motion.text
          x="260" y="230"
          textAnchor="middle"
          fill={BLUE}
          fontSize="10"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="bold"
          letterSpacing="0.15em"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.8 }}
        >
          FRENCH EMPIRE
        </motion.text>

        {/* Elba island — tiny shape that appears */}
        <motion.circle
          cx={ELBA.x} cy={ELBA.y} r="14"
          fill={GOLD}
          filter="url(#elba-pulse)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.4, 0.6, 0.4] }}
          transition={{ duration: 4, delay: 2.5, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.circle
          cx={ELBA.x} cy={ELBA.y} r="3.5"
          fill={GOLD}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 3 }}
        />

        {/* Elba label */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.5 }}
        >
          <text
            x={ELBA.x + 18} y={ELBA.y - 4}
            textAnchor="start"
            fill={GOLD}
            fontSize="9"
            fontFamily="'Cormorant Garamond', serif"
            fontWeight="bold"
          >
            ELBA
          </text>
          <text
            x={ELBA.x + 18} y={ELBA.y + 8}
            textAnchor="start"
            fill={SMOKE}
            fontSize="6"
            fontFamily="'Cormorant Garamond', serif"
            fontStyle="italic"
          >
            Ruler of 12,000 souls
          </text>
        </motion.g>

        {/* Contrast text */}
        <motion.text
          x="300" y="410"
          textAnchor="middle"
          fill="hsl(220, 15%, 30%)"
          fontSize="7"
          fontFamily="'Cormorant Garamond', serif"
          letterSpacing="0.3em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 4, duration: 1 }}
        >
          FROM 70 MILLION SUBJECTS TO AN ISLAND OF 12,000
        </motion.text>
      </svg>
    </div>
  </div>
);

/* ─── Hundred Days March Visual ─── */

// City positions mapped onto the France SVG path coordinate system
const MARCH_STOPS = [
  { x: 352, y: 285, label: 'Golfe-Juan', troops: '1,000', detail: 'Lands with the Old Guard' },
  { x: 345, y: 272, label: 'Grasse', troops: '1,500', detail: 'Avoids royalist Provence' },
  { x: 330, y: 248, label: 'Gap', troops: '3,000', detail: 'Mountain route through Alps' },
  { x: 318, y: 218, label: 'Grenoble', troops: '7,000', detail: '"Soldiers! I am your Emperor!"' },
  { x: 295, y: 198, label: 'Lyon', troops: '14,000', detail: 'Marshal Ney defects to Napoleon' },
  { x: 248, y: 158, label: 'Paris', troops: '100,000+', detail: 'Louis XVIII flees. Empire restored.' },
];

const HundredDaysVisual = () => {
  const pathD = useMemo(() => {
    const points = MARCH_STOPS.map(s => `${s.x},${s.y}`);
    return `M${points.join(' L')}`;
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative max-w-[550px] w-full">
        <svg viewBox="0 0 600 430" className="w-full">
          <defs>
            <linearGradient id="march-gradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={SMOKE} />
              <stop offset="50%" stopColor={GOLD} />
              <stop offset="100%" stopColor={BLUE} />
            </linearGradient>
            <filter id="stop-glow">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Sea */}
          <rect x="0" y="0" width="600" height="430" fill="hsl(220, 25%, 8%)" />

          {/* Surrounding countries — very faint context */}
          {NEIGHBOUR_PATHS.map(c => (
            <path
              key={c.label}
              d={c.path}
              fill="hsl(225, 15%, 11%)"
              stroke="hsl(220, 12%, 18%)"
              strokeWidth="0.5"
            />
          ))}
          <path d={SPAIN_PATH} fill="hsl(225, 15%, 11%)" stroke="hsl(220, 12%, 18%)" strokeWidth="0.5" />
          <path d={ITALY_PATH} fill="hsl(225, 15%, 11%)" stroke="hsl(220, 12%, 18%)" strokeWidth="0.5" />
          <path d={GERMANY_PATH} fill="hsl(225, 15%, 11%)" stroke="hsl(220, 12%, 18%)" strokeWidth="0.5" />
          <path d={SWISS_PATH} fill="hsl(225, 15%, 11%)" stroke="hsl(220, 12%, 18%)" strokeWidth="0.5" />
          <path d={LOWCOUNTRIES_PATH} fill="hsl(225, 15%, 11%)" stroke="hsl(220, 12%, 18%)" strokeWidth="0.5" />
          <path d={BRITAIN_PATH} fill="hsl(225, 15%, 11%)" stroke="hsl(220, 12%, 18%)" strokeWidth="0.5" />

          {/* France — slightly brighter, the stage */}
          <path
            d={FRANCE_PATH}
            fill="hsl(225, 18%, 14%)"
            stroke="hsl(220, 20%, 28%)"
            strokeWidth="1"
          />
          <path d={CORSICA_PATH} fill="hsl(225, 18%, 14%)" stroke="hsl(220, 20%, 28%)" strokeWidth="0.8" />

          {/* Paris destination glow */}
          <motion.circle
            cx={248} cy={158} r="20"
            fill={BLUE}
            opacity={0.12}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ duration: 1.5, delay: 3.5 }}
          />

          {/* March route — animated draw */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#march-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Stops along the route */}
          {MARCH_STOPS.map((stop, i) => {
            const delay = 0.5 + (i / (MARCH_STOPS.length - 1)) * 3.5;
            const isLast = i === MARCH_STOPS.length - 1;
            const dotColor = isLast ? BLUE : GOLD;

            return (
              <motion.g
                key={stop.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.4 }}
              >
                {/* Glow */}
                <motion.circle
                  cx={stop.x} cy={stop.y}
                  r={isLast ? 8 : 5}
                  fill={dotColor}
                  filter="url(#stop-glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay, duration: 0.3 }}
                />
                {/* Dot */}
                <circle cx={stop.x} cy={stop.y} r={isLast ? 5 : 3} fill={dotColor} />

                {/* Label — alternate sides */}
                <text
                  x={i % 2 === 0 ? stop.x + 14 : stop.x - 14}
                  y={stop.y - 6}
                  textAnchor={i % 2 === 0 ? 'start' : 'end'}
                  fill={isLast ? BLUE : GOLD}
                  fontSize="7.5"
                  fontFamily="'Cormorant Garamond', serif"
                  fontWeight="bold"
                >
                  {stop.label}
                </text>

                {/* Troop count */}
                <text
                  x={i % 2 === 0 ? stop.x + 14 : stop.x - 14}
                  y={stop.y + 5}
                  textAnchor={i % 2 === 0 ? 'start' : 'end'}
                  fill={isLast ? BLUE : GOLD}
                  fontSize="9"
                  fontFamily="'Cormorant Garamond', serif"
                  fontWeight="bold"
                  opacity={0.9}
                >
                  {stop.troops}
                </text>

                {/* Detail */}
                <text
                  x={i % 2 === 0 ? stop.x + 14 : stop.x - 14}
                  y={stop.y + 16}
                  textAnchor={i % 2 === 0 ? 'start' : 'end'}
                  fill={SMOKE}
                  fontSize="5.5"
                  fontFamily="'Cormorant Garamond', serif"
                  fontStyle="italic"
                >
                  {stop.detail}
                </text>
              </motion.g>
            );
          })}

          {/* Title */}
          <motion.text
            x="300" y="415"
            textAnchor="middle"
            fill="hsl(220, 15%, 30%)"
            fontSize="7"
            fontFamily="'Cormorant Garamond', serif"
            letterSpacing="0.25em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 4 }}
          >
            THE MARCH TO PARIS — MARCH 1–20, 1815
          </motion.text>
        </svg>
      </div>
    </div>
  );
};

/* ─── Waterloo Battlefield Visual ─── */

// Wellington's ridge — jagged horizon silhouette
const RIDGE_PATH = 'M0,0 L30,-2 L60,-5 L90,-3 L120,-8 L150,-6 L180,-10 L210,-8 L240,-12 L270,-10 L300,-14 L330,-11 L360,-8 L390,-10 L420,-6 L450,-8 L480,-5 L510,-3 L540,-6 L570,-2 L600,0 L600,20 L0,20 Z';

const WATERLOO_EVENTS = [
  { time: '11:30', event: 'Attack begins', detail: 'Four hours late — the mud', color: PARCHMENT },
  { time: '15:00', event: "Ney's great charge", detail: '5,000 cavalry against the squares', color: GOLD },
  { time: '19:00', event: 'Prussians arrive', detail: "Blücher keeps his promise", color: 'hsl(30, 60%, 50%)' },
  { time: '20:30', event: 'The Guard breaks', detail: 'For the first time in history', color: RED },
];

const WaterlooVisual = () => {
  // Deterministic PRNG
  const { raindrops, soldiers } = useMemo(() => {
    let seed = 42;
    const next = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

    const rain = Array.from({ length: 70 }, () => ({
      x: next() * 600,
      y: -20 + next() * 240,
      length: 10 + next() * 18,
      delay: next() * 3,
      duration: 0.4 + next() * 0.4,
      opacity: 0.12 + next() * 0.18,
    }));

    // Soldier silhouettes on the ridge — small rectangles
    const soldierList = Array.from({ length: 45 }, (_, i) => ({
      x: 25 + (i * 12.5) + (next() - 0.5) * 6,
      h: 4 + next() * 5,
      opacity: 0.4 + next() * 0.4,
    }));

    return { raindrops: rain, soldiers: soldierList };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-[520px] w-full">
        {/* Top: atmospheric battlefield SVG */}
        <svg viewBox="0 0 600 280" className="w-full mb-6">
          <defs>
            <linearGradient id="waterloo-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(225, 30%, 5%)" />
              <stop offset="30%" stopColor="hsl(0, 15%, 7%)" />
              <stop offset="60%" stopColor="hsl(5, 40%, 12%)" />
              <stop offset="80%" stopColor="hsl(10, 60%, 20%)" />
              <stop offset="90%" stopColor="hsl(15, 70%, 26%)" />
              <stop offset="100%" stopColor="hsl(10, 40%, 10%)" />
            </linearGradient>
            <radialGradient id="sun-glow" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="hsl(15, 90%, 45%)" stopOpacity="0.7" />
              <stop offset="40%" stopColor="hsl(5, 65%, 30%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(20, 95%, 55%)" />
              <stop offset="100%" stopColor="hsl(5, 75%, 35%)" />
            </radialGradient>
            <filter id="smoke-blur">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Sky */}
          <rect width="600" height="280" fill="url(#waterloo-sky)" />

          {/* Sun glow behind ridge */}
          <circle cx="300" cy="195" r="100" fill="url(#sun-glow)" />
          <motion.circle
            cx="300" cy="195" r="22"
            fill="url(#sun-core)"
            animate={{ opacity: [0.85, 0.65, 0.85] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Rain */}
          {raindrops.map((r, i) => (
            <motion.line
              key={`rain-${i}`}
              x1={r.x} y1={r.y} x2={r.x - 2} y2={r.y + r.length}
              stroke="hsl(210, 25%, 50%)"
              strokeWidth="0.6"
              animate={{
                opacity: [0, r.opacity, 0],
                y1: [r.y, r.y + 100],
                y2: [r.y + r.length, r.y + r.length + 100],
              }}
              transition={{ duration: r.duration, delay: r.delay, repeat: Infinity, repeatDelay: 0.4 }}
            />
          ))}

          {/* Battlefield smoke along horizon */}
          {[60, 180, 300, 420, 540].map((cx, i) => (
            <motion.ellipse
              key={`smoke-${i}`}
              cx={cx} cy={200} rx={50} ry={15}
              fill="hsl(0, 8%, 18%)"
              filter="url(#smoke-blur)"
              animate={{ opacity: [0.15, 0.3, 0.15], cx: [cx, cx + 15, cx] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}

          {/* Ridge silhouette */}
          <g transform="translate(0, 195)">
            <path d={RIDGE_PATH} fill="hsl(225, 25%, 4%)" />
          </g>

          {/* Soldier silhouettes on the ridge */}
          {soldiers.map((s, i) => (
            <rect
              key={`soldier-${i}`}
              x={s.x} y={190 - s.h} width="2" height={s.h}
              fill="hsl(225, 20%, 4%)"
              opacity={s.opacity}
            />
          ))}

          {/* Ground below ridge */}
          <rect x="0" y="215" width="600" height="65" fill="hsl(225, 25%, 3%)" />

          {/* Caption in the dark ground */}
          <text
            x="300" y="255"
            textAnchor="middle"
            fill="hsl(220, 15%, 25%)"
            fontSize="7"
            fontFamily="'Cormorant Garamond', serif"
            letterSpacing="0.3em"
          >
            WATERLOO, BELGIUM — JUNE 18, 1815
          </text>
        </svg>

        {/* Bottom: Timeline as styled HTML for clarity */}
        <div className="space-y-4 mb-6">
          {WATERLOO_EVENTS.map((evt, i) => (
            <motion.div
              key={evt.time}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.4, duration: 0.5 }}
            >
              <span
                className="font-display text-lg font-bold shrink-0 w-14 text-right"
                style={{ color: evt.color }}
              >
                {evt.time}
              </span>
              <div
                className="w-2 h-2 rounded-full mt-2 shrink-0"
                style={{ background: evt.color }}
              />
              <div>
                <p className="font-display text-sm font-bold" style={{ color: evt.color }}>
                  {evt.event}
                </p>
                <p className="font-body text-xs" style={{ color: SMOKE }}>
                  {evt.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="text-center pt-4"
          style={{ borderTop: '1px solid hsl(0, 20%, 18%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <p
            className="font-display text-base italic"
            style={{ color: 'hsl(40, 40%, 55%)' }}
          >
            "La Garde meurt, elle ne se rend pas."
          </p>
          <p
            className="font-body text-[9px] tracking-[0.2em] mt-1"
            style={{ color: 'hsl(220, 15%, 35%)' }}
          >
            THE GUARD DIES, IT DOES NOT SURRENDER
          </p>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Composite Graphic ─── */

const WaterlooGraphic = ({ step }: { step: number }) => (
  <div className="relative w-full h-full">
    {/* Step 0: Coalition board — Battle of Nations */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step === 0 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <CoalitionBoard phase={7} />
    </motion.div>

    {/* Step 1: Elba exile — empire fades to a dot */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step === 1 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <ElbaExileVisual />
    </motion.div>

    {/* Step 2: Hundred Days march */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step === 2 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <HundredDaysVisual />
    </motion.div>

    {/* Step 3: Waterloo — the falling eagle */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step === 3 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <WaterlooVisual />
    </motion.div>
  </div>
);

const steps = [
  <div key="w1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: RED }}>
      October 1813
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Battle of Nations
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      At Leipzig, every nation in Europe turned against France at once.
      365,000 coalition troops against 195,000 French. Watch the board —
      every block turns red. Even Bavaria, his loyal ally, switched sides mid-battle.
    </p>
  </div>,
  <div key="w2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Exile to Elba
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Paris fell in March 1814. Napoleon abdicated and was exiled to Elba —
      a tiny island off the Italian coast. The Bourbons returned. Europe breathed.
      But Napoleon was watching, waiting,
      and the restored king was already making himself hated.
    </p>
  </div>,
  <div key="w3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Hundred Days
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      He escaped. He landed in southern France with 1,000 men.
      Every regiment sent to stop him joined him instead.
      In 20 days he was back in Paris. In 100 days he was at Waterloo.
    </p>
  </div>,
  <div key="w4">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: RED }}>
      June 18, 1815
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Waterloo
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Rain delayed his attack by hours. Blücher's Prussians arrived in time.
      Wellington held the line. By evening, the Grande Armée broke for the last time.
      The board is empty now. France stands alone — small, gray, finished.
    </p>
    <p className="font-display text-lg italic mt-4" style={{ color: RED }}>
      "The nearest run thing you ever saw in your life." — Wellington
    </p>
  </div>,
];

export const WaterlooSection = () => {
  return (
    <section id="waterloo" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={(step) => <WaterlooGraphic step={step} />}
        steps={steps}
      />
    </section>
  );
};
