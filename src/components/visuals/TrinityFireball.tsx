import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GEIGER = 'hsl(140, 70%, 45%)';
const URANIUM = 'hsl(50, 90%, 55%)';
const FLASH = 'hsl(45, 100%, 85%)';
const ORANGE = 'hsl(25, 95%, 55%)';
const STEEL = 'hsl(200, 10%, 50%)';
const DIM = 'hsl(200, 10%, 30%)';
const RED = 'hsl(0, 70%, 50%)';

/* ── Step 0: Einstein's Letter ─────────────── */

const EinsteinLetter = () => (
  <motion.g
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* Paper */}
    <rect x={100} y={40} width={200} height={280} rx={2} fill="hsl(40, 30%, 90%)" stroke="hsl(35, 20%, 75%)" strokeWidth={0.5} />

    {/* Fold line */}
    <line x1={100} y1={140} x2={300} y2={140} stroke="hsl(35, 15%, 80%)" strokeWidth={0.3} strokeDasharray="2 2" />

    {/* Header date */}
    <motion.text x={120} y={68} fill="hsl(25, 20%, 30%)" fontSize={7} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      Albert Einstein
    </motion.text>
    <motion.text x={120} y={80} fill="hsl(25, 15%, 50%)" fontSize={5.5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      Old Grove Rd., Nassau Point, Peconic, Long Island
    </motion.text>
    <motion.text x={120} y={95} fill="hsl(25, 15%, 50%)" fontSize={5.5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      August 2nd, 1939
    </motion.text>

    {/* Addressee */}
    <motion.text x={120} y={115} fill="hsl(25, 20%, 30%)" fontSize={5.5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
      F.D. Roosevelt
    </motion.text>
    <motion.text x={120} y={124} fill="hsl(25, 15%, 50%)" fontSize={5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
      President of the United States
    </motion.text>

    {/* Body lines (simulated typed text) */}
    {[148, 158, 168, 178, 188, 198, 208, 218, 228].map((y, i) => {
      const widths = [170, 175, 160, 172, 168, 155, 175, 140, 90];
      return (
        <motion.rect
          key={y}
          x={120}
          y={y}
          width={widths[i]}
          height={2.5}
          rx={1}
          fill="hsl(25, 10%, 65%)"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.5 }}
          transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
          style={{ transformOrigin: `120px ${y}px` }}
        />
      );
    })}

    {/* Key phrase highlighted */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
      <rect x={118} y={155} width={178} height={14} rx={1} fill={`${URANIUM}20`} />
      <text x={120} y={164} fill="hsl(25, 30%, 25%)" fontSize={5.5} fontFamily="Georgia, serif" fontStyle="italic">
        "...extremely powerful bombs of a new type..."
      </text>
    </motion.g>

    {/* Signature scrawl */}
    <motion.path
      d="M120 270 Q130 260 140 268 Q150 275 160 265 Q165 260 175 268"
      fill="none"
      stroke="hsl(220, 40%, 25%)"
      strokeWidth={1.2}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
    />
    <motion.text x={120} y={285} fill="hsl(25, 15%, 50%)" fontSize={5} fontFamily="Georgia, serif"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
      A. Einstein
    </motion.text>

    {/* CONFIDENTIAL stamp */}
    <motion.g
      initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
      animate={{ opacity: 0.7, scale: 1, rotate: -12 }}
      transition={{ delay: 2.5, duration: 0.3, type: 'spring' }}
      style={{ transformOrigin: '255px 80px' }}
    >
      <rect x={220} y={60} width={75} height={22} rx={2} fill="none" stroke={RED} strokeWidth={1.5} />
      <text x={230} y={75} fill={RED} fontSize={8} fontFamily="monospace" fontWeight="bold" letterSpacing={2}>
        SECRET
      </text>
    </motion.g>
  </motion.g>
);


/* ── Step 1: Manhattan Project Sites Map ───── */

// Simplified but accurate continental US outline path (viewBox 0 0 400 300)
const US_OUTLINE = "M39 82 L42 80 L48 78 L50 75 L53 73 L55 74 L57 72 L60 68 L64 65 L67 64 L69 62 L73 60 L76 61 L78 60 L80 58 L82 56 L85 55 L88 56 L91 55 L95 53 L98 52 L101 53 L104 54 L106 56 L110 57 L113 55 L117 54 L121 55 L125 55 L129 54 L132 53 L135 52 L137 50 L140 48 L143 47 L147 46 L151 47 L154 49 L156 51 L158 54 L159 58 L161 60 L164 58 L168 57 L172 58 L175 60 L178 62 L181 61 L184 59 L187 57 L190 56 L194 55 L198 56 L201 58 L204 57 L208 56 L211 57 L214 58 L217 57 L220 55 L224 54 L228 53 L232 54 L235 56 L238 58 L240 60 L243 62 L247 64 L250 67 L252 70 L254 73 L257 75 L260 77 L263 78 L266 77 L270 76 L273 77 L276 79 L279 82 L281 85 L283 87 L286 88 L289 87 L292 86 L295 87 L298 89 L300 92 L302 95 L304 97 L306 100 L307 103 L308 106 L310 108 L312 110 L314 113 L315 116 L316 119 L317 122 L318 124 L320 126 L322 128 L323 131 L324 134 L325 137 L324 140 L323 143 L321 146 L319 148 L317 150 L316 152 L318 155 L320 158 L318 161 L316 163 L313 165 L310 167 L307 168 L305 170 L303 173 L300 175 L297 176 L294 177 L292 179 L290 181 L288 184 L286 186 L284 188 L282 189 L280 190 L278 192 L275 193 L272 193 L269 194 L266 196 L263 198 L260 200 L257 201 L254 200 L252 198 L250 196 L247 195 L244 196 L241 198 L238 199 L235 198 L232 196 L230 194 L228 192 L225 191 L222 192 L219 194 L216 196 L213 198 L210 199 L207 198 L204 197 L202 199 L200 201 L198 204 L196 207 L194 210 L190 212 L186 213 L182 212 L178 211 L174 212 L170 214 L166 216 L162 218 L158 219 L155 218 L152 216 L149 215 L146 216 L142 218 L138 219 L134 219 L130 218 L127 216 L124 215 L121 216 L118 218 L114 220 L110 221 L106 220 L102 218 L99 216 L96 215 L93 216 L89 218 L85 219 L81 218 L78 216 L75 214 L72 212 L69 210 L66 208 L63 206 L60 204 L57 203 L54 204 L51 206 L48 208 L44 208 L40 206 L37 204 L34 201 L32 198 L30 195 L28 192 L27 189 L26 186 L25 183 L24 180 L23 176 L22 172 L22 168 L23 164 L24 160 L25 157 L26 153 L27 150 L26 146 L25 142 L25 138 L26 134 L27 130 L28 126 L29 122 L30 118 L31 114 L32 110 L33 106 L34 102 L35 98 L36 94 L37 90 L38 86 Z";

// Site positions mapped to the US outline coordinate system
const SITES = [
  { x: 105, y: 185, label: 'Los Alamos, NM', main: true },
  { x: 274, y: 155, label: 'Oak Ridge, TN', main: true },
  { x: 68, y: 72, label: 'Hanford, WA', main: true },
  { x: 222, y: 120, label: 'Chicago', main: false },
  { x: 110, y: 198, label: 'Alamogordo', main: false },
  { x: 195, y: 108, label: 'Ames, IA', main: false },
  { x: 252, y: 138, label: 'Dayton, OH', main: false },
  { x: 296, y: 102, label: 'Rochester, NY', main: false },
  { x: 316, y: 110, label: 'MIT', main: false },
  { x: 270, y: 162, label: 'Morgantown', main: false },
  { x: 200, y: 148, label: 'St. Louis', main: false },
  { x: 128, y: 148, label: 'Denver', main: false },
  { x: 38, y: 130, label: 'Berkeley, CA', main: false },
];

const ManhattanMap = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
    {/* Offset the map group to center it in the 400x400 viewBox */}
    <g transform="translate(30, 50)">
      {/* US outline — accurate simplified path */}
      <motion.path
        d={US_OUTLINE}
        fill={`${GEIGER}06`}
        stroke={DIM}
        strokeWidth={1}
        strokeLinejoin="round"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* State-like internal lines for texture */}
      {[
        'M160 60 L160 220',  // rough central meridian
        'M100 100 L100 210', // mountain line
        'M220 55 L220 200',  // mississippi-ish
        'M280 80 L280 190',  // appalachian-ish
      ].map((d, i) => (
        <motion.path
          key={`grid-${i}`}
          d={d}
          fill="none"
          stroke={DIM}
          strokeWidth={0.2}
          strokeDasharray="2 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 + i * 0.1 }}
        />
      ))}

      {/* Connection lines between major sites */}
      {[
        [105, 185, 274, 155],
        [105, 185, 68, 72],
        [68, 72, 274, 155],
        [222, 120, 105, 185],
        [222, 120, 274, 155],
        [222, 120, 68, 72],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={`conn-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={GEIGER}
          strokeWidth={0.5}
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ delay: 1.2 + i * 0.15, duration: 0.8 }}
        />
      ))}

      {/* Sites */}
      {SITES.map((site, i) => (
        <motion.g
          key={site.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.06, type: 'spring', stiffness: 200 }}
        >
          <circle cx={site.x} cy={site.y} r={site.main ? 4 : 2} fill={site.main ? GEIGER : STEEL} />
          {site.main && (
            <motion.circle
              cx={site.x} cy={site.y} r={8}
              fill="none" stroke={GEIGER} strokeWidth={0.6}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 0.15, 0.6], r: [8, 14, 8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {site.main && (
            <text
              x={site.x + 8}
              y={site.y + 3}
              fill={FLASH}
              fontSize={7}
              fontFamily="var(--font-body)"
              fontWeight="600"
              textAnchor="start"
            >
              {site.label}
            </text>
          )}
        </motion.g>
      ))}
    </g>

    {/* Stats bar at bottom */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <line x1={40} y1={320} x2={360} y2={320} stroke={DIM} strokeWidth={0.3} />

      <text x={90} y={342} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        SITES
      </text>
      <text x={90} y={360} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        30+
      </text>

      <text x={200} y={342} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        PERSONNEL
      </text>
      <text x={200} y={360} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        125,000
      </text>

      <text x={310} y={342} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        COST (1945)
      </text>
      <text x={310} y={360} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        $2B
      </text>
    </motion.g>
  </motion.g>
);


/* ── Step 2: Trinity Detonation ────────────── */

const TrinityBlast = () => (
  <motion.g>
    {/* Desert horizon line */}
    <motion.line
      x1={0} y1={280} x2={400} y2={280}
      stroke={DIM}
      strokeWidth={0.5}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay: 0.5 }}
    />

    {/* Desert floor texture */}
    {[...Array(40)].map((_, i) => (
      <motion.line
        key={`sand-${i}`}
        x1={i * 10 + Math.random() * 5}
        y1={280}
        x2={i * 10 + 3 + Math.random() * 4}
        y2={282 + Math.random() * 3}
        stroke="hsl(35, 20%, 20%)"
        strokeWidth={0.3}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.6 + i * 0.02 }}
      />
    ))}

    {/* Mushroom cloud silhouette */}
    <motion.path
      d="M200 280 L195 260 Q180 220 160 200 Q140 180 145 155 Q148 135 165 120 Q180 105 200 100 Q220 105 235 120 Q252 135 255 155 Q260 180 240 200 Q220 220 205 260 Z"
      fill={`${URANIUM}15`}
      stroke={URANIUM}
      strokeWidth={0.8}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '200px 280px' }}
    />

    {/* Mushroom cap */}
    <motion.ellipse
      cx={200} cy={105}
      fill={`${ORANGE}25`}
      stroke={ORANGE}
      strokeWidth={0.6}
      initial={{ rx: 0, ry: 0, opacity: 0 }}
      animate={{ rx: 70, ry: 30, opacity: 1 }}
      transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
    />

    {/* Inner cap glow */}
    <motion.ellipse
      cx={200} cy={108}
      fill={`${URANIUM}20`}
      initial={{ rx: 0, ry: 0 }}
      animate={{ rx: 45, ry: 18 }}
      transition={{ delay: 1.4, duration: 0.8 }}
    />

    {/* Core flash */}
    <motion.circle
      cx={200} cy={270}
      fill={FLASH}
      initial={{ r: 0, opacity: 0 }}
      animate={{ r: 20, opacity: [0, 1, 0.6] }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />

    {/* Fireball glow */}
    <motion.circle
      cx={200} cy={270}
      fill={`${URANIUM}30`}
      initial={{ r: 0 }}
      animate={{ r: 40 }}
      transition={{ delay: 0.3, duration: 1.2 }}
    />

    {/* Expanding shockwave rings along ground */}
    {[1, 2, 3].map(i => (
      <motion.ellipse
        key={`ground-shock-${i}`}
        cx={200} cy={280}
        fill="none"
        stroke={FLASH}
        strokeWidth={0.8}
        initial={{ rx: 10, ry: 3, opacity: 0.7 }}
        animate={{ rx: 200, ry: 20, opacity: 0 }}
        transition={{
          duration: 3.5,
          delay: 0.5 + i * 0.8,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    ))}

    {/* Debris particles */}
    {[...Array(20)].map((_, i) => {
      const angle = (i / 20) * Math.PI;
      const distance = 30 + Math.random() * 60;
      return (
        <motion.circle
          key={`debris-${i}`}
          cx={200}
          cy={275}
          r={1}
          fill={i % 3 === 0 ? URANIUM : ORANGE}
          initial={{ cx: 200, cy: 275, opacity: 0 }}
          animate={{
            cx: 200 + Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1),
            cy: 275 - Math.sin(angle) * distance,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: 0.3 + Math.random() * 0.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      );
    })}

    {/* Timestamp */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <text x={200} y={330} fill={STEEL} fontSize={7} fontFamily="monospace" textAnchor="middle" letterSpacing={2}>
        05:29:45 MWT
      </text>
      <text x={200} y={342} fill={DIM} fontSize={5} fontFamily="var(--font-body)" textAnchor="middle">
        Jornada del Muerto desert, New Mexico
      </text>
    </motion.g>
  </motion.g>
);


/* ── Step 3: Blast Radii + City Comparison ─── */

const BLAST_RADII = [
  { label: 'Fireball', radius: 0.08, color: URANIUM, distance: '200m' },
  { label: 'Total destruction', radius: 0.22, color: ORANGE, distance: '500m' },
  { label: 'Severe damage', radius: 0.38, color: 'hsl(15, 80%, 40%)', distance: '1.2km' },
  { label: 'Thermal radiation', radius: 0.58, color: 'hsl(0, 50%, 30%)', distance: '2km' },
];

// Center the radii diagram higher to leave room for the legend below
const CX = 170;
const CY = 155;
const SCALE = 150;

const BlastRadii = () => (
  <motion.g>
    {/* Subtle grid */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ duration: 0.8 }}>
      {[...Array(20)].map((_, i) => (
        <React.Fragment key={i}>
          <line x1={i * 20} y1={0} x2={i * 20} y2={400} stroke={STEEL} strokeWidth={0.3} />
          <line x1={0} y1={i * 20} x2={400} y2={i * 20} stroke={STEEL} strokeWidth={0.3} />
        </React.Fragment>
      ))}
    </motion.g>

    {/* Radii circles — no inline labels */}
    {BLAST_RADII.slice().reverse().map((ring, i) => (
      <motion.circle
        key={ring.label}
        cx={CX} cy={CY}
        fill={`${ring.color}10`}
        stroke={ring.color}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        initial={{ r: 0, opacity: 0 }}
        animate={{ r: ring.radius * SCALE, opacity: 1 }}
        transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
      />
    ))}

    {/* Ground zero marker */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
      <line x1={CX - 3} y1={CY - 3} x2={CX + 3} y2={CY + 3} stroke={FLASH} strokeWidth={1} />
      <line x1={CX + 3} y1={CY - 3} x2={CX - 3} y2={CY + 3} stroke={FLASH} strokeWidth={1} />
      <text x={CX} y={CY + 14} fill={STEEL} fontSize={5} fontFamily="monospace" textAnchor="middle">
        GROUND ZERO
      </text>
    </motion.g>

    {/* Legend — clean vertical list on the right */}
    <motion.g
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {BLAST_RADII.map((ring, i) => {
        const ly = 85 + i * 38;
        return (
          <motion.g
            key={ring.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.2 }}
          >
            {/* Color swatch */}
            <rect x={295} y={ly - 5} width={10} height={10} rx={2} fill={ring.color} opacity={0.8} />
            {/* Label */}
            <text x={312} y={ly + 1} fill={FLASH} fontSize={7} fontFamily="var(--font-body)" fontWeight="600">
              {ring.label}
            </text>
            {/* Distance */}
            <text x={312} y={ly + 11} fill={STEEL} fontSize={6} fontFamily="monospace">
              {ring.distance}
            </text>
          </motion.g>
        );
      })}
    </motion.g>

    {/* Divider */}
    <motion.line
      x1={40} y1={290} x2={360} y2={290}
      stroke={DIM} strokeWidth={0.3}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    />

    {/* City comparisons at bottom — side by side */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      {/* Hiroshima */}
      <text x={120} y={315} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        HIROSHIMA · AUG 6
      </text>
      <text x={120} y={338} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        ~15 kt
      </text>
      <text x={120} y={354} fill={RED} fontSize={6.5} fontFamily="var(--font-body)" textAnchor="middle">
        ~80,000 killed
      </text>

      {/* Divider dot */}
      <circle cx={200} cy={335} r={1.5} fill={DIM} />

      {/* Nagasaki */}
      <text x={280} y={315} fill={STEEL} fontSize={5.5} fontFamily="var(--font-body)" textAnchor="middle" letterSpacing={1}>
        NAGASAKI · AUG 9
      </text>
      <text x={280} y={338} fill={URANIUM} fontSize={16} fontFamily="var(--font-display)" fontWeight="900" textAnchor="middle">
        ~21 kt
      </text>
      <text x={280} y={354} fill={RED} fontSize={6.5} fontFamily="var(--font-body)" textAnchor="middle">
        ~40,000 killed
      </text>
    </motion.g>
  </motion.g>
);


/* ── Main Component ────────────────────────── */

interface Props {
  activeStep: number;
}

export const TrinityFireball = ({ activeStep }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle, ${activeStep >= 2 ? URANIUM : GEIGER}30 0%, transparent 70%)`,
        }}
        animate={{
          width: activeStep >= 2 ? '100%' : '30%',
          height: activeStep >= 2 ? '100%' : '30%',
          opacity: activeStep >= 1 ? 0.5 : 0.2,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <svg viewBox="0 0 400 400" className="w-full max-w-[550px] h-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.g key="letter" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <EinsteinLetter />
            </motion.g>
          )}
          {activeStep === 1 && (
            <motion.g key="map" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <ManhattanMap />
            </motion.g>
          )}
          {activeStep === 2 && (
            <motion.g key="blast" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <TrinityBlast />
            </motion.g>
          )}
          {activeStep === 3 && (
            <motion.g key="radii" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <BlastRadii />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Step label */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: STEEL }}>
          {activeStep === 0 && 'August 2, 1939 — Einstein\'s Letter'}
          {activeStep === 1 && 'The Manhattan Project — 30 Sites Across America'}
          {activeStep === 2 && 'July 16, 1945 — 05:29:45 MWT'}
          {activeStep === 3 && 'Blast Radii — 21 Kilotons'}
        </p>
      </motion.div>
    </div>
  );
};
