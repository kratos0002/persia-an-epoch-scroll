import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAVY = 'hsl(210, 50%, 40%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const DIM = 'hsl(200, 10%, 18%)';

// Real world geography projected from GeoJSON (equirectangular, 400x260 space)

// Non-empire context countries — drawn dim for world outline
const WORLD_CONTEXT = [
  // USA (continental)
  "M99.9 64.1 L103.3 65.8 L107.7 66.1 L110.8 67.9 L111.4 68.5 L113.1 70.7 L112.2 74 L115.3 73.5 L116.9 71.8 L120.5 70.2 L125 69.6 L127.3 67.1 L129.3 70.3 L125.3 72.8 L126.2 74.1 L123.7 75 L122.6 75.8 L121.7 77.1 L120.5 78.1 L119.7 80.3 L119.4 79.2 L119.9 81.3 L117.1 84.9 L114.1 88.1 L115 92.6 L114.8 96.6 L112.7 93.3 L111.2 89.9 L107.6 89.6 L105.6 90.7 L104.1 91.1 L100 90.7 L97.2 94.4 L95.5 94.8 L93.4 90.8 L89.7 90.6 L87.6 87.7 L80.4 87.3 L76.2 85.9 L73.9 84.2 L70.6 79.9 L68.7 76.2 L69.1 70.5 L68.5 65.5 L70.3 64.7 L83.8 64.7 L99.6 64.7 Z",
  // Alaska
  "M36.3 35.1 L40.9 36.1 L48.4 36.5 L52.2 49.6 L57 50.3 L61 54.6 L60.7 56 L55.8 52.4 L48 50 L43.2 50.1 L40.2 49 L37.4 50.9 L34.7 54 L29.8 56.2 L27 56.6 L32.5 54 L33 51.8 L30.7 51.2 L28.5 50 L24.6 48 L27.9 45.9 L29.5 44.1 L27.4 43.9 L24 41.9 L28.5 41 L24.6 38.2 L30.1 36.1 Z",
  // Brazil
  "M139.2 170.3 L143.4 164.8 L142.7 162 L141.3 160.2 L138.9 157.6 L139.3 154.2 L136.5 151.7 L136.1 148.4 L133.3 146.8 L131 143 L127.4 144.7 L124.7 143.4 L122.3 141.2 L122.7 138.1 L125.3 135.7 L126.1 130.2 L126.3 128.5 L129.2 128.5 L131.8 128.2 L132.2 126.7 L132.6 124.6 L136 123.4 L136.9 124.1 L137 127.6 L139.1 127.8 L141 127.3 L142.4 126.9 L144.1 127.2 L146.1 125.1 L146.8 130.1 L152.6 132.1 L157.8 133.8 L162.8 137.3 L160.9 144.7 L159 150.9 L157 157.9 L152.9 161.1 L148.7 165.5 L146.5 171.3 L143.4 174.3 L140.9 171.2 Z",
  // China
  "M334.7 63.7 L340.8 65.8 L340.5 69.8 L337.9 72.8 L335.3 74.7 L331.2 76.8 L328.1 77 L325.6 77.7 L325.5 80.1 L329.3 80.8 L326.9 84.2 L328 89.1 L327.9 92.5 L322.3 99.6 L318.1 101.3 L316 101.5 L312.7 99.6 L308.4 99.7 L306.8 101.4 L305.1 99.4 L304.2 95.4 L302.7 92.3 L299.8 91 L295.8 92.6 L293 92.8 L288.6 90.9 L284.2 88.8 L283.2 85.3 L279.3 80.5 L278 78.7 L279.7 75.9 L284.6 73.8 L286.5 69.6 L290.5 65.4 L293.8 65.9 L297.3 69.8 L301.7 73 L309.1 74.1 L315.3 73.3 L317.5 70.7 L322.4 69 L326.4 67.3 L322.2 66.4 L325.9 63.1 L326.9 59.7 L332.9 59.6 Z",
  // Russia (main)
  "M312.9 27.4 L320.5 28.9 L316.8 31.3 L322 31.7 L332.3 31.9 L336.9 35.1 L345.1 34.9 L357.8 33.7 L368.7 36.1 L375.2 37.4 L379.9 36.5 L390 43.4 L388.8 45.7 L384.3 47.6 L378.3 49.2 L372.3 51.1 L371.1 55.2 L367.3 59.4 L364.1 56.2 L369 50.9 L371.7 47.8 L363.7 51.1 L356.8 51.1 L344.3 57.2 L349.2 59.2 L346.3 67.3 L341 72.9 L337.9 73.5 L339.2 69.6 L342.5 65.4 L336.6 64.1 L332.9 59.6 L326.9 59.7 L325.9 63.1 L320.7 63 L314.5 64.3 L309.4 63.2 L304.4 60.6 L300.1 63.3 L293.7 64 L289.8 63.2 L285 61.5 L278.5 58.6 L274.8 56.4 L264.8 58 L263.3 60.7 L261.6 61.9 L253.6 61.1 L249.7 64.5 L251.3 67.9 L250.2 71.8 L250 75 L247 73.1 L242.3 71.9 L239.5 69.5 L240.3 67.2 L241.9 65 L239.5 62.8 L236.1 61.7 L234.2 60.3 L233.2 59.1 L233.6 58 L231.6 55.6 L229.3 53.7 L229.5 50.7 L233.3 46.2 L230.7 40.7 L232.8 37.3 L243.3 40.1 L235 41.2 L239.1 44.9 L242.7 43.6 L247 41 L249.4 39.7 L250.8 40 L257.8 39.2 L264.5 38.1 L272.3 39.2 L271 36.8 L273.8 32.6 L276.8 36.1 L276.4 41.8 L278.6 38.9 L277.2 34.7 L279.5 34.9 L286 34.3 L291.6 31.4 L298.1 29 L306.4 28.1 L310.5 27.2 Z",
  // Germany
  "M210.5 56.7 L211.5 58 L214.4 57.9 L214.9 59.4 L215.4 61 L215.1 61.8 L213.7 62.7 L213.2 63.9 L214 65.4 L213.7 66.7 L212.1 66.6 L210.4 66.6 L208.8 66.5 L208.5 64.6 L206.6 63.5 L206.3 60.9 L207.5 59.1 L208.4 58.3 L209 57.5 Z",
  // France
  "M203.8 62.8 L206 64 L207 64.4 L207.9 66.5 L207.1 66.9 L206.9 68.1 L207.5 69.6 L208 71.2 L204.8 72.1 L201.9 73.5 L198.4 72.6 L198.7 68.6 L195.3 66.1 L198.3 65.1 L201.4 63.2 L202.8 62.3 Z",
];

// Empire territories — highlighted in navy
const EMPIRE_TERRITORIES = [
  {
    id: 'canada',
    label: 'Canada',
    cx: 94, cy: 52,
    paths: [
      "M104.4 37.3 L107.8 40.4 L112.8 37.1 L114.1 40.5 L108.1 43 L104.2 46.1 L100.1 51.4 L106 54.2 L112 56.3 L115.6 61.7 L117.4 56.5 L117.1 51.6 L120.1 47 L124.7 48.5 L128.6 52.4 L134 52.4 L138.8 56.7 L141.2 60.5 L134.8 63.2 L127.7 64.6 L129.8 64.5 L131.9 68.3 L136.9 68.8 L130.2 71.8 L128.4 69.1 L126.1 67.7 L124.5 70 L119.2 71.3 L116.6 72.3 L113 74.4 L112.5 73.4 L111.8 68.9 L111.2 68 L110.4 67.5 L105.8 66 L101.2 65.2 L99.6 64.7 L83.8 64.7 L70.3 64.7 L64.9 61 L62.2 56.9 L59.2 52.1 L54.9 51.5 L51.2 42 L56.8 37.6 L63.7 37 L68.7 36.5 L73.4 37.5 L78.3 39.5 L86.2 39.5 L88.8 38.6 L96.1 39.6 L99.2 39.2 L98.3 35.1 L102.5 37.1 Z",
    ],
  },
  {
    id: 'india',
    label: 'India',
    cx: 281, cy: 100,
    paths: [
      "M282.2 82.7 L282.8 86.5 L284.5 91.6 L290 94.4 L292.9 93.4 L294.7 94.4 L296.8 93 L301.5 90.7 L302.4 93.1 L299.9 96.5 L298.2 99.7 L296.8 99.4 L296.9 96.5 L293.5 94.7 L293.6 97.7 L293.1 101.1 L288.6 105.6 L285.3 108.7 L284.3 113.9 L282.6 118.1 L280 114.9 L277.6 108.7 L275.1 102.3 L272 98.4 L274.1 94.7 L277.5 90 L278.2 85.4 Z",
    ],
  },
  {
    id: 'australia',
    label: 'Australia',
    cx: 342, cy: 165,
    paths: [
      "M351.5 148.4 L353.3 150.6 L354.2 154.4 L357 157.5 L359.1 159.9 L361.6 164.8 L361.9 169.3 L360.1 174.1 L358.4 178.6 L355.6 181 L353.1 180.5 L349.5 181.1 L346.8 177.6 L344.4 177 L344.6 175 L342.1 174.3 L338.6 172 L332 173.6 L329 175.3 L325.6 176 L322 175.8 L322.1 173.9 L321.4 169.3 L319.8 165.4 L320.6 165.1 L319.8 161.7 L320.6 160 L323.7 157.5 L325.9 156.6 L329 154.3 L330.7 152.8 L331.9 150.1 L333.2 148.8 L336.2 149.8 L337.4 147.5 L339.9 145.5 L341.9 146.1 L344.1 145.8 L343.6 148.3 L344.7 151.2 L347 153.2 L349.3 151.1 L349.5 147.3 L350 144.7 L351.1 146.4 Z",
    ],
  },
  {
    id: 'kenya',
    label: 'E. Africa',
    cx: 239, cy: 128,
    paths: [
      "M243.3 131.1 L242.9 133.3 L242 134.9 L239.9 134.9 L235.8 131.3 L236.6 128.4 L236.4 125.3 L237.3 122.7 L238.2 124.1 L240.6 125.2 L241.8 125.4 L243.5 124.8 Z",
    ],
  },
  {
    id: 'malaya',
    label: 'Malaya',
    cx: 307, cy: 124,
    paths: [
      "M306.7 121.7 L307.5 122.3 L308.1 121.8 L309.1 123.5 L309.1 125 L309.3 126.3 L310 127.8 L309.3 128.4 L307 126.3 L306.3 124.7 L305.8 122.9 L305.6 121.4 Z",
    ],
  },
];

// UK paths
const UK_PATHS = [
  "M196.8 51.8 L197.9 53.1 L197.8 55.5 L199.5 57.4 L201.8 59.7 L201.5 61.6 L197.4 62.7 L195.2 62.9 L195.5 61.7 L194.7 61.2 L195 59.5 L196.7 58.8 L196.2 57.2 L195 56 L194 55 L194.7 51.8 Z",
  "M194 57.3 L192.7 57.9 L192.2 57.2 L192.9 56.4 Z",
];

const UK_CENTER = { x: 197, y: 58 };

/* ── Shared: World base map ────────────────────────────── */

const WorldBase = ({ empireOpacity = 0.55 }: { empireOpacity?: number }) => (
  <motion.g>
    {/* Context countries — dim outlines */}
    {WORLD_CONTEXT.map((d, i) => (
      <path key={`ctx-${i}`} d={d} fill={`${STEEL}08`} stroke={DIM} strokeWidth={0.4} strokeLinejoin="round" />
    ))}

    {/* Empire territories — highlighted */}
    {EMPIRE_TERRITORIES.map((t) => (
      <motion.g key={t.id}>
        {t.paths.map((d, j) => (
          <motion.path
            key={`${t.id}-${j}`}
            d={d}
            fill={NAVY}
            stroke={NAVY}
            strokeWidth={0.3}
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: empireOpacity }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </motion.g>
    ))}

    {/* UK — always visible */}
    {UK_PATHS.map((d, i) => (
      <path key={`uk-${i}`} d={d} fill={NAVY} stroke={NAVY} strokeWidth={0.3} opacity={0.8} />
    ))}
  </motion.g>
);

/* ── Step 0: British Empire — Partner Status ─────────────────────────── */

const EmpirePartner = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
    <WorldBase empireOpacity={0.55} />

    {/* UK dot + label */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
      <circle cx={UK_CENTER.x} cy={UK_CENTER.y} r={4} fill={NAVY} />
      <circle cx={UK_CENTER.x} cy={UK_CENTER.y} r={8} fill="none" stroke={NAVY} strokeWidth={0.5} opacity={0.4} />
      <text x={UK_CENTER.x} y={UK_CENTER.y - 10} textAnchor="middle" fill={LIGHT} fontSize={5.5}
        fontFamily="var(--font-body)" fontWeight="600">
        UK
      </text>
    </motion.g>

    {/* Connection line: UK → USA (the nuclear partnership) */}
    <motion.line
      x1={UK_CENTER.x} y1={UK_CENTER.y} x2={119} y2={78}
      stroke={NAVY} strokeWidth={0.8} strokeDasharray="4 3"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.4 }}
      transition={{ delay: 0.8, duration: 1.2 }}
    />
    <motion.line
      x1={UK_CENTER.x} y1={UK_CENTER.y} x2={94} y2={52}
      stroke={NAVY} strokeWidth={0.5} strokeDasharray="3 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.25 }}
      transition={{ delay: 1, duration: 1.2 }}
    />

    {/* Territory labels */}
    {EMPIRE_TERRITORIES.map((t, i) => (
      <motion.text
        key={`label-${t.id}`}
        x={t.cx}
        y={t.cy + (t.id === 'malaya' ? 14 : t.id === 'kenya' ? -8 : -10)}
        textAnchor="middle"
        fill={LIGHT}
        fontSize={5}
        fontFamily="var(--font-body)"
        opacity={0.7}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 + i * 0.1 }}
      >
        {t.label}
      </motion.text>
    ))}

    {/* Quebec Agreement label */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
      <rect x={130} y={225} width={140} height={20} rx={2} fill={`${NAVY}20`}
        stroke={NAVY} strokeWidth={0.4}
      />
      <text x={200} y={238} textAnchor="middle" fill={NAVY} fontSize={6}
        fontFamily="var(--font-body)" letterSpacing={1}>
        QUEBEC AGREEMENT · 1943
      </text>
    </motion.g>

    {/* Partner badge near UK */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
      <text x={UK_CENTER.x + 14} y={UK_CENTER.y + 3} fill={LIGHT} fontSize={5} fontFamily="var(--font-body)">
        FULL PARTNER
      </text>
    </motion.g>
  </motion.g>
);

/* ── Step 1: McMahon Act — Lockout ─────────────────────────────────────── */

const McMahonLockout = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    <WorldBase empireOpacity={0.12} />

    {/* USA highlighted */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <path
        d="M99.9 64.1 L103.3 65.8 L107.7 66.1 L110.8 67.9 L111.4 68.5 L113.1 70.7 L112.2 74 L115.3 73.5 L116.9 71.8 L120.5 70.2 L125 69.6 L127.3 67.1 L129.3 70.3 L125.3 72.8 L126.2 74.1 L123.7 75 L122.6 75.8 L121.7 77.1 L120.5 78.1 L119.7 80.3 L119.4 79.2 L119.9 81.3 L117.1 84.9 L114.1 88.1 L115 92.6 L114.8 96.6 L112.7 93.3 L111.2 89.9 L107.6 89.6 L105.6 90.7 L104.1 91.1 L100 90.7 L97.2 94.4 L95.5 94.8 L93.4 90.8 L89.7 90.6 L87.6 87.7 L80.4 87.3 L76.2 85.9 L73.9 84.2 L70.6 79.9 L68.7 76.2 L69.1 70.5 L68.5 65.5 L70.3 64.7 L83.8 64.7 L99.6 64.7 Z"
        fill="hsl(215, 60%, 25%)" opacity={0.3} stroke="hsl(215, 60%, 45%)" strokeWidth={0.6}
      />
      <text x={95} y={80} textAnchor="middle" fill="hsl(215, 80%, 65%)"
        fontSize={8} fontFamily="var(--font-body)" fontWeight="700">
        USA
      </text>
    </motion.g>

    {/* UK dot — isolated */}
    <circle cx={UK_CENTER.x} cy={UK_CENTER.y} r={4} fill={NAVY} />
    <text x={UK_CENTER.x} y={UK_CENTER.y - 10} textAnchor="middle" fill={LIGHT}
      fontSize={5.5} fontFamily="var(--font-body)" fontWeight="600">
      UK
    </text>

    {/* Lock icon between UK and USA */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 180 }}
      style={{ transformOrigin: '160px 68px' }}
    >
      <rect x={152} y={70} width={16} height={13} rx={2}
        fill="hsl(0, 60%, 30%)" stroke="hsl(0, 60%, 50%)" strokeWidth={0.8}
      />
      <path d="M155,70 Q155,63 160,63 Q165,63 165,70"
        fill="none" stroke="hsl(0, 60%, 50%)" strokeWidth={1}
        strokeLinecap="round"
      />
      <circle cx={160} cy={76} r={2} fill="hsl(200, 25%, 8%)" />
    </motion.g>

    {/* McMahon Act label */}
    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
      <rect x={128} y={88} width={84} height={14} rx={2}
        fill="hsl(0, 40%, 12%)" stroke="hsl(0, 60%, 40%)" strokeWidth={0.5}
      />
      <text x={170} y={98} textAnchor="middle" fill="hsl(0, 60%, 60%)"
        fontSize={5.5} fontFamily="var(--font-body)" letterSpacing={0.8}>
        McMAHON ACT · 1946
      </text>
    </motion.g>

    {/* Crossed line — severed connection */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
      <line x1={130} y1={64} x2={190} y2={64}
        stroke="hsl(0, 60%, 50%)" strokeWidth={1}
        strokeDasharray="3 2"
      />
      <line x1={155} y1={60} x2={165} y2={68}
        stroke="hsl(0, 60%, 50%)" strokeWidth={1}
      />
      <line x1={165} y1={60} x2={155} y2={68}
        stroke="hsl(0, 60%, 50%)" strokeWidth={1}
      />
    </motion.g>

    {/* Bevin quote */}
    <motion.text
      x={200} y={238}
      textAnchor="middle" fill={STEEL}
      fontSize={6} fontFamily="var(--font-body)"
      fontStyle="italic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ delay: 1.6 }}
    >
      "We've got to have a bloody Union Jack on top of it."
    </motion.text>
  </motion.g>
);

/* ── Step 2: Hurricane Test — Mushroom cloud from ship ─────────────────── */

const HurricaneTest = () => (
  <motion.g>
    {/* Sea horizon */}
    <motion.rect
      x={0} y={180} width={400} height={80}
      fill="hsl(210, 40%, 12%)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />

    {/* Sea surface shimmer */}
    {[...Array(8)].map((_, i) => (
      <motion.line
        key={`wave-${i}`}
        x1={20 + i * 48} y1={182}
        x2={50 + i * 48} y2={184}
        stroke="hsl(210, 40%, 22%)"
        strokeWidth={0.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ delay: 0.3 + i * 0.1, duration: 3, repeat: Infinity }}
      />
    ))}

    {/* Sky */}
    <motion.rect
      x={0} y={0} width={400} height={180}
      fill="hsl(210, 30%, 7%)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    />

    {/* The frigate — HMS Plym */}
    <motion.g
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <path d="M150,182 L155,175 L245,175 L250,182 Z"
        fill="hsl(210, 20%, 25%)" stroke="hsl(210, 20%, 35%)" strokeWidth={0.5}
      />
      <rect x={175} y={167} width={50} height={8} rx={1} fill="hsl(210, 20%, 30%)" />
      <line x1={200} y1={148} x2={200} y2={167} stroke="hsl(210, 10%, 40%)" strokeWidth={0.7} />
      <motion.text x={200} y={192} textAnchor="middle"
        fill={STEEL} fontSize={5} fontFamily="var(--font-body)"
        initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.8 }}>
        HMS Plym · Monte Bello Islands
      </motion.text>
    </motion.g>

    {/* Flash at waterline */}
    <motion.circle
      cx={200} cy={175}
      fill="hsl(45, 100%, 90%)"
      initial={{ r: 0, opacity: 0 }}
      animate={{ r: 25, opacity: [0, 1, 0.3] }}
      transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
    />

    {/* Fireball */}
    <motion.circle
      cx={200} cy={165}
      fill={`${NAVY}35`} stroke={NAVY} strokeWidth={0.5}
      initial={{ r: 0 }}
      animate={{ r: 25 }}
      transition={{ delay: 1.4, duration: 0.9 }}
    />

    {/* Mushroom stem */}
    <motion.path
      d="M194,175 Q192,155 190,135 Q188,115 192,102 Q196,92 200,88 Q204,92 208,102 Q212,115 210,135 Q208,155 206,175"
      fill={`${NAVY}20`} stroke={NAVY} strokeWidth={0.6}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '200px 175px' }}
    />

    {/* Mushroom cap */}
    <motion.ellipse
      cx={200} cy={85}
      fill={`${NAVY}22`} stroke={NAVY} strokeWidth={0.7}
      initial={{ rx: 0, ry: 0, opacity: 0 }}
      animate={{ rx: 55, ry: 22, opacity: 1 }}
      transition={{ delay: 2.2, duration: 1, ease: 'easeOut' }}
    />

    {/* Inner cap */}
    <motion.ellipse
      cx={200} cy={88}
      fill={`hsl(210, 50%, 55%)30`}
      initial={{ rx: 0, ry: 0 }}
      animate={{ rx: 35, ry: 13 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    />

    {/* Shockwave rings */}
    {[1, 2, 3].map(i => (
      <motion.ellipse
        key={`shock-${i}`}
        cx={200} cy={180}
        fill="none" stroke="hsl(45, 80%, 80%)" strokeWidth={0.6}
        initial={{ rx: 8, ry: 2, opacity: 0.6 }}
        animate={{ rx: 190, ry: 12, opacity: 0 }}
        transition={{ duration: 3, delay: 1.3 + i * 0.7, repeat: Infinity, ease: 'easeOut' }}
      />
    ))}

    {/* Data label */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 0.8 }}
    >
      <text x={200} y={218} textAnchor="middle"
        fill={STEEL} fontSize={6.5} fontFamily="monospace" letterSpacing={2}>
        OPERATION HURRICANE
      </text>
      <text x={200} y={234} textAnchor="middle"
        fill={NAVY} fontSize={14} fontFamily="var(--font-display)" fontWeight="900">
        25 kilotons
      </text>
      <text x={200} y={248} textAnchor="middle"
        fill={STEEL} fontSize={6} fontFamily="var(--font-body)">
        October 3, 1952 · Monte Bello Islands, W. Australia
      </text>
    </motion.g>
  </motion.g>
);

/* ── Step 3: Fading Empire — Bomb as last card ─────────────────────────── */

const LastCard = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    {/* Context countries — dim */}
    {WORLD_CONTEXT.map((d, i) => (
      <path key={`ctx-${i}`} d={d} fill={`${STEEL}08`} stroke={DIM} strokeWidth={0.4} strokeLinejoin="round" />
    ))}

    {/* Empire territories fading out one by one */}
    {EMPIRE_TERRITORIES.map((t, i) => (
      <motion.g key={t.id}>
        {t.paths.map((d, j) => (
          <motion.path
            key={`${t.id}-${j}`}
            d={d}
            fill={NAVY}
            stroke={NAVY}
            strokeWidth={0.3}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1.8, delay: i * 0.4 }}
          />
        ))}
        <motion.text
          x={t.cx} y={t.cy - 8}
          textAnchor="middle"
          fill={STEEL}
          fontSize={5}
          fontFamily="var(--font-body)"
          fontStyle="italic"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.4, delay: i * 0.4 + 0.3 }}
        >
          {t.label}
        </motion.text>
      </motion.g>
    ))}

    {/* UK stays lit */}
    {UK_PATHS.map((d, i) => (
      <path key={`uk-stay-${i}`} d={d} fill={NAVY} stroke={NAVY} strokeWidth={0.3} opacity={0.8} />
    ))}
    <circle cx={UK_CENTER.x} cy={UK_CENTER.y} r={4} fill={NAVY} />
    <text x={UK_CENTER.x} y={UK_CENTER.y - 10} textAnchor="middle" fill={LIGHT}
      fontSize={5.5} fontFamily="var(--font-body)" fontWeight="600">
      UK
    </text>

    {/* Warhead icon */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${UK_CENTER.x}px ${UK_CENTER.y + 15}px` }}
    >
      <motion.path
        d={`M${UK_CENTER.x - 4},${UK_CENTER.y + 22} Q${UK_CENTER.x},${UK_CENTER.y + 12} ${UK_CENTER.x + 4},${UK_CENTER.y + 22} L${UK_CENTER.x + 3},${UK_CENTER.y + 30} Q${UK_CENTER.x},${UK_CENTER.y + 32} ${UK_CENTER.x - 3},${UK_CENTER.y + 30} Z`}
        fill={NAVY} opacity={0.9}
      />
      {[0, 1, 2].map(i => (
        <motion.circle
          key={`ring-${i}`}
          cx={UK_CENTER.x} cy={UK_CENTER.y + 24}
          r={6} fill="none" stroke={NAVY} strokeWidth={0.5}
          animate={{ r: [6, 18 + i * 8], opacity: [0.5, 0] }}
          transition={{ duration: 2.5, delay: 2.6 + i * 0.4, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </motion.g>

    {/* Permanent seat label */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.7 }}
    >
      <rect x={UK_CENTER.x - 55} y={UK_CENTER.y + 38} width={110} height={22} rx={3}
        fill={`${NAVY}18`} stroke={NAVY} strokeWidth={0.4}
      />
      <text x={UK_CENTER.x} y={UK_CENTER.y + 49} textAnchor="middle"
        fill={LIGHT} fontSize={5.5} fontFamily="var(--font-body)" letterSpacing={0.5}>
        PERMANENT SEAT PRESERVED
      </text>
      <text x={UK_CENTER.x} y={UK_CENTER.y + 57} textAnchor="middle"
        fill={STEEL} fontSize={5} fontFamily="var(--font-body)">
        UN Security Council · Nuclear Club
      </text>
    </motion.g>

    {/* Bottom epitaph */}
    <motion.text
      x={200} y={238}
      textAnchor="middle" fill={STEEL}
      fontSize={6.5} fontFamily="var(--font-body)" letterSpacing={2}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 3.2 }}
    >
      THE EMPIRE CRUMBLES — THE BOMB ENDURES
    </motion.text>
  </motion.g>
);

/* ── Main Component ───────────────────────────────────────────────────── */

interface Props {
  activeStep?: number;
}

export const EmpireFade = ({ activeStep = 0 }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{
          background: `radial-gradient(circle, ${
            activeStep >= 2 ? `${NAVY}40` : `${NAVY}20`
          } 0%, transparent 70%)`,
          width: activeStep >= 2 ? '100%' : '50%',
          height: activeStep >= 2 ? '100%' : '50%',
          opacity: activeStep >= 1 ? 0.6 : 0.3,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <svg viewBox="0 0 400 260" className="w-full max-w-[550px] h-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.g key="partner" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <EmpirePartner />
            </motion.g>
          )}
          {activeStep === 1 && (
            <motion.g key="lockout" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <McMahonLockout />
            </motion.g>
          )}
          {activeStep === 2 && (
            <motion.g key="hurricane" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <HurricaneTest />
            </motion.g>
          )}
          {activeStep === 3 && (
            <motion.g key="lastcard" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <LastCard />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Step label */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 text-center"
        key={activeStep}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] tracking-[0.3em] uppercase font-body" style={{ color: STEEL }}>
          {activeStep === 0 && 'Quebec Agreement · 1943 — Full Partners'}
          {activeStep === 1 && 'McMahon Act · 1946 — Locked Out'}
          {activeStep === 2 && 'Operation Hurricane · October 3, 1952'}
          {activeStep === 3 && 'Empire Fades — Nuclear Status Endures'}
        </p>
      </motion.div>
    </div>
  );
};
