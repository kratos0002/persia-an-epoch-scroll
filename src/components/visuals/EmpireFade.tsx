import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAVY = 'hsl(210, 50%, 40%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';
const DIM = 'hsl(200, 10%, 18%)';

/* ── Step 0: British Empire — Partner Status ─────────────────────────── */

// Simplified empire territories in partner relationship
const EMPIRE_TERRITORIES = [
  { id: 'canada',    d: 'M60,70 L90,65 L95,80 L85,90 L65,88 Z', label: 'Canada' },
  { id: 'india',     d: 'M265,155 L278,148 L285,158 L282,175 L270,178 L260,170 Z', label: 'India' },
  { id: 'australia', d: 'M310,210 L335,205 L342,218 L335,230 L315,228 Z', label: 'Australia' },
  { id: 'africa',    d: 'M210,185 L225,180 L232,195 L228,212 L212,215 L205,200 Z', label: 'E. Africa' },
  { id: 'malaya',    d: 'M295,185 L305,180 L310,192 L302,200 L293,195 Z', label: 'Malaya' },
];

const WorldOutline = () => (
  <motion.g opacity={0.12} stroke={STEEL} strokeWidth={0.5} fill="none">
    {/* Americas */}
    <path d="M45,65 Q65,55 80,70 L88,92 Q82,115 75,138 L65,162 Q58,180 62,200 L52,222 Q46,232 50,242" />
    {/* Europe */}
    <path d="M172,72 Q182,60 198,66 L203,77 Q198,88 192,92" />
    {/* Africa */}
    <path d="M192,130 Q202,120 212,126 L222,148 Q228,172 222,198 L212,220 Q200,232 196,226 L190,200 Q185,170 192,130" />
    {/* Asia broad */}
    <path d="M228,58 Q262,48 295,54 L315,65 Q335,77 342,93 L346,112 Q340,133 328,142 L308,148 Q288,142 268,148 L248,153 Q238,148 232,132 L228,108 Q226,88 228,58" />
    {/* Australia */}
    <path d="M308,202 Q325,197 342,202 L347,212 Q342,224 332,228 L316,224 Q308,218 308,202" />
  </motion.g>
);

const EmpirePartner = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
    <WorldOutline />

    {/* Empire territories - lit in navy */}
    {EMPIRE_TERRITORIES.map((t, i) => (
      <motion.g key={t.id}>
        <motion.path
          d={t.d}
          fill={NAVY}
          opacity={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }}
        />
      </motion.g>
    ))}

    {/* Britain dot */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
      <circle cx={183} cy={80} r={5} fill={NAVY} />
      <circle cx={183} cy={80} r={9} fill="none" stroke={NAVY} strokeWidth={0.6}
        opacity={0.4}
      />
      <text x={183} y={72} textAnchor="middle" fill={LIGHT} fontSize={5.5}
        fontFamily="var(--font-body)" fontWeight="600">
        UK
      </text>
    </motion.g>

    {/* Connection lines from UK to territories */}
    {[
      [183, 80, 77, 77],   // Canada
      [183, 80, 272, 163], // India
      [183, 80, 326, 217], // Australia
    ].map(([x1, y1, x2, y2], i) => (
      <motion.line
        key={`link-${i}`}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={NAVY} strokeWidth={0.4} strokeDasharray="3 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ delay: 1 + i * 0.2, duration: 1.2 }}
      />
    ))}

    {/* Quebec Agreement label */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
      <rect x={130} y={340} width={140} height={20} rx={2} fill={`${NAVY}20`}
        stroke={NAVY} strokeWidth={0.4}
      />
      <text x={200} y={354} textAnchor="middle" fill={NAVY} fontSize={6}
        fontFamily="var(--font-body)" letterSpacing={1}>
        QUEBEC AGREEMENT · 1943
      </text>
    </motion.g>

    {/* Partner badge near UK */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
      <text x={198} y={80} fill={LIGHT} fontSize={5} fontFamily="var(--font-body)">
        FULL PARTNER
      </text>
    </motion.g>
  </motion.g>
);

/* ── Step 1: McMahon Act — Lockout ─────────────────────────────────────── */

const McMahonLockout = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
    <WorldOutline />

    {/* Faded territories — still exist but dim */}
    {EMPIRE_TERRITORIES.map((t) => (
      <motion.path
        key={t.id}
        d={t.d}
        fill={NAVY}
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1 }}
      />
    ))}

    {/* USA highlighted */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <rect x={38} y={85} width={102} height={82} rx={4}
        fill="hsl(215, 60%, 25%)" opacity={0.25}
        stroke="hsl(215, 60%, 45%)" strokeWidth={0.6}
      />
      <text x={89} y={128} textAnchor="middle" fill="hsl(215, 80%, 65%)"
        fontSize={8} fontFamily="var(--font-body)" fontWeight="700">
        USA
      </text>
    </motion.g>

    {/* Britain dot — isolated */}
    <motion.circle cx={183} cy={80} r={5} fill={NAVY} />
    <text x={183} y={72} textAnchor="middle" fill={LIGHT} fontSize={5.5}
      fontFamily="var(--font-body)" fontWeight="600">
      UK
    </text>

    {/* Lock icon between UK and USA */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 180 }}
      style={{ transformOrigin: '140px 110px' }}
    >
      {/* Lock body */}
      <rect x={130} y={113} width={20} height={16} rx={2}
        fill="hsl(0, 60%, 30%)" stroke="hsl(0, 60%, 50%)" strokeWidth={0.8}
      />
      {/* Lock shackle */}
      <path d="M134,113 Q134,104 140,104 Q146,104 146,113"
        fill="none" stroke="hsl(0, 60%, 50%)" strokeWidth={1.2}
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx={140} cy={120} r={2.5} fill="hsl(200, 25%, 8%)" />
      <rect x={139} y={120} width={2} height={4} rx={0.5} fill="hsl(200, 25%, 8%)" />
    </motion.g>

    {/* McMahon Act label */}
    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
      <rect x={108} y={140} width={84} height={14} rx={2}
        fill="hsl(0, 40%, 12%)" stroke="hsl(0, 60%, 40%)" strokeWidth={0.5}
      />
      <text x={150} y={150} textAnchor="middle" fill="hsl(0, 60%, 60%)"
        fontSize={5.5} fontFamily="var(--font-body)" letterSpacing={0.8}>
        McMAHON ACT · 1946
      </text>
    </motion.g>

    {/* Crossed line — severed connection */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
      <line x1={155} y1={90} x2={183} y2={90}
        stroke="hsl(0, 60%, 50%)" strokeWidth={1.5}
        strokeDasharray="3 2"
      />
      <line x1={161} y1={86} x2={177} y2={94}
        stroke="hsl(0, 60%, 50%)" strokeWidth={1}
      />
      <line x1={177} y1={86} x2={161} y2={94}
        stroke="hsl(0, 60%, 50%)" strokeWidth={1}
      />
    </motion.g>

    {/* Bevin quote hint */}
    <motion.text
      x={200} y={360}
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
      x={0} y={270} width={400} height={130}
      fill="hsl(210, 40%, 12%)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />

    {/* Sea surface shimmer */}
    {[...Array(8)].map((_, i) => (
      <motion.line
        key={`wave-${i}`}
        x1={20 + i * 48}
        y1={272}
        x2={50 + i * 48}
        y2={274}
        stroke="hsl(210, 40%, 22%)"
        strokeWidth={0.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ delay: 0.3 + i * 0.1, duration: 3, repeat: Infinity }}
      />
    ))}

    {/* Sky gradient overlay */}
    <motion.rect
      x={0} y={0} width={400} height={270}
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
      {/* Hull */}
      <path d="M150,272 L155,264 L245,264 L250,272 Z"
        fill="hsl(210, 20%, 25%)" stroke="hsl(210, 20%, 35%)" strokeWidth={0.5}
      />
      {/* Superstructure */}
      <rect x={175} y={255} width={50} height={9} rx={1}
        fill="hsl(210, 20%, 30%)"
      />
      {/* Mast */}
      <line x1={200} y1={230} x2={200} y2={255}
        stroke="hsl(210, 10%, 40%)" strokeWidth={0.7}
      />
      {/* Ship label */}
      <motion.text x={200} y={282} textAnchor="middle"
        fill={STEEL} fontSize={5} fontFamily="var(--font-body)"
        initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.8 }}>
        HMS Plym · Monte Bello Islands
      </motion.text>
    </motion.g>

    {/* Flash at waterline */}
    <motion.circle
      cx={200} cy={265}
      fill="hsl(45, 100%, 90%)"
      initial={{ r: 0, opacity: 0 }}
      animate={{ r: 25, opacity: [0, 1, 0.3] }}
      transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
    />

    {/* Fireball */}
    <motion.circle
      cx={200} cy={255}
      fill={`${NAVY}35`}
      stroke={NAVY}
      strokeWidth={0.5}
      initial={{ r: 0 }}
      animate={{ r: 30 }}
      transition={{ delay: 1.4, duration: 0.9 }}
    />

    {/* Mushroom stem */}
    <motion.path
      d="M192,265 Q190,240 188,215 Q186,190 190,175 Q195,162 200,158 Q205,162 210,175 Q214,190 212,215 Q210,240 208,265"
      fill={`${NAVY}20`}
      stroke={NAVY}
      strokeWidth={0.6}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '200px 265px' }}
    />

    {/* Mushroom cap */}
    <motion.ellipse
      cx={200} cy={152}
      fill={`${NAVY}22`}
      stroke={NAVY}
      strokeWidth={0.7}
      initial={{ rx: 0, ry: 0, opacity: 0 }}
      animate={{ rx: 60, ry: 25, opacity: 1 }}
      transition={{ delay: 2.2, duration: 1, ease: 'easeOut' }}
    />

    {/* Inner cap */}
    <motion.ellipse
      cx={200} cy={155}
      fill={`hsl(210, 50%, 55%)30`}
      initial={{ rx: 0, ry: 0 }}
      animate={{ rx: 38, ry: 15 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    />

    {/* Shockwave ring along sea surface */}
    {[1, 2, 3].map(i => (
      <motion.ellipse
        key={`shock-${i}`}
        cx={200} cy={270}
        fill="none"
        stroke="hsl(45, 80%, 80%)"
        strokeWidth={0.6}
        initial={{ rx: 8, ry: 2, opacity: 0.6 }}
        animate={{ rx: 190, ry: 14, opacity: 0 }}
        transition={{
          duration: 3,
          delay: 1.3 + i * 0.7,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    ))}

    {/* Data label */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 0.8 }}
    >
      <text x={200} y={330} textAnchor="middle"
        fill={STEEL} fontSize={6.5} fontFamily="monospace" letterSpacing={2}>
        OPERATION HURRICANE
      </text>
      <text x={200} y={344} textAnchor="middle"
        fill={NAVY} fontSize={14} fontFamily="var(--font-display)" fontWeight="900">
        25 kilotons
      </text>
      <text x={200} y={358} textAnchor="middle"
        fill={STEEL} fontSize={6} fontFamily="var(--font-body)">
        October 3, 1952 · Monte Bello Islands, W. Australia
      </text>
    </motion.g>
  </motion.g>
);

/* ── Step 3: Fading Empire — Bomb as last card ─────────────────────────── */

const LastCard = () => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <WorldOutline />

    {/* Empire territories fading out one by one */}
    {EMPIRE_TERRITORIES.map((t, i) => (
      <motion.g key={t.id}>
        <motion.path
          d={t.d}
          fill={NAVY}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.8, delay: i * 0.4 }}
        />
        <motion.text
          x={t.d.split(' ')[0].replace('M', '').split(',')[0]}
          y={Number(t.d.split(' ')[0].replace('M', '').split(',')[1]) - 4}
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

    {/* Britain stays lit */}
    <motion.circle cx={183} cy={80} r={5} fill={NAVY} />
    <motion.text x={183} y={72} textAnchor="middle" fill={LIGHT}
      fontSize={5.5} fontFamily="var(--font-body)" fontWeight="600">
      UK
    </motion.text>

    {/* Warhead icon — prominent and glowing */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '183px 97px' }}
    >
      {/* Warhead body */}
      <motion.path
        d="M178,110 Q183,98 188,110 L187,120 Q183,123 179,120 Z"
        fill={NAVY}
        opacity={0.9}
      />
      {/* Warhead tip */}
      <motion.path
        d="M180,110 Q183,103 186,110"
        fill={LIGHT}
        opacity={0.6}
      />
      {/* Fins */}
      <path d="M179,118 L174,124 L179,122 Z" fill={NAVY} opacity={0.7} />
      <path d="M187,118 L192,124 L187,122 Z" fill={NAVY} opacity={0.7} />

      {/* Radiation rings */}
      {[0, 1, 2].map(i => (
        <motion.circle
          key={`ring-${i}`}
          cx={183}
          cy={112}
          r={8}
          fill="none"
          stroke={NAVY}
          strokeWidth={0.5}
          animate={{ r: [8, 24 + i * 10], opacity: [0.5, 0] }}
          transition={{
            duration: 2.5,
            delay: 2.6 + i * 0.4,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.g>

    {/* Permanent seat label */}
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.7 }}
    >
      <rect x={82} y={130} width={122} height={22} rx={3}
        fill={`${NAVY}18`} stroke={NAVY} strokeWidth={0.4}
      />
      <text x={143} y={141} textAnchor="middle"
        fill={LIGHT} fontSize={5.5} fontFamily="var(--font-body)" letterSpacing={0.5}>
        PERMANENT SEAT PRESERVED
      </text>
      <text x={143} y={150} textAnchor="middle"
        fill={STEEL} fontSize={5} fontFamily="var(--font-body)">
        UN Security Council · Nuclear Club
      </text>
    </motion.g>

    {/* Bottom epitaph */}
    <motion.text
      x={200} y={362}
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
      {/* Background glow — shifts with step */}
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

      <svg viewBox="0 0 400 380" className="w-full max-w-[550px] h-auto relative z-10">
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
