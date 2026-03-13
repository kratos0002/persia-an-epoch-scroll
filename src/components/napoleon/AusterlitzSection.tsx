import React from 'react';
import { motion } from 'framer-motion';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { CoalitionBoard } from '@/components/visuals/CoalitionBoard';

const GOLD = 'hsl(43, 70%, 50%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 7%)';
const FRENCH_BLUE = 'hsl(220, 65%, 50%)';
const COALITION_RED = 'hsl(0, 55%, 50%)';
const FOG = 'hsl(220, 15%, 60%)';

// Animated tactical diagram of the Battle of Austerlitz
const AusterlitzBattleMap = () => {
  // Terrain features (Pratzen Heights is the key)
  const PRATZEN_Y = 230;

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg viewBox="0 0 600 500" className="w-full h-full max-w-[650px] max-h-[500px]">
        <defs>
          {/* Fog gradient */}
          <radialGradient id="fog-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="hsl(40, 60%, 55%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Sun glow */}
          <radialGradient id="sun-glow" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stopColor="hsl(43, 80%, 55%)" stopOpacity="0.4" />
            <stop offset="40%" stopColor="hsl(43, 70%, 50%)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="unit-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background terrain */}
        <rect width="600" height="500" fill="hsl(225, 25%, 9%)" />

        {/* Sun rising — the iconic moment */}
        <motion.circle
          cx="300" cy="30" r="80"
          fill="url(#sun-glow)"
          initial={{ opacity: 0, r: 40 }}
          animate={{ opacity: 1, r: 100 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.circle
          cx="300" cy="30" r="12"
          fill="hsl(43, 80%, 60%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />

        {/* Sun rays */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI + Math.PI / 16;
          const x2 = 300 + Math.cos(angle) * 140;
          const y2 = 30 + Math.sin(angle) * 140;
          return (
            <motion.line
              key={`ray-${i}`}
              x1="300" y1="30" x2={x2} y2={Math.max(y2, 30)}
              stroke="hsl(43, 70%, 50%)"
              strokeWidth="0.5"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 0.3, pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 + i * 0.1 }}
            />
          );
        })}

        {/* Fog layer — dissipates */}
        <motion.rect
          x="0" y="80" width="600" height="300"
          fill={FOG}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 3, delay: 0.5 }}
        />

        {/* Terrain: Pratzen Heights (central ridge) */}
        <motion.path
          d="M180,240 Q250,200 300,210 Q350,200 420,240 L420,260 Q350,240 300,250 Q250,240 180,260 Z"
          fill="hsl(35, 20%, 18%)"
          stroke="hsl(35, 25%, 28%)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.text
          x="300" y={PRATZEN_Y + 5}
          textAnchor="middle"
          fill="hsl(35, 30%, 40%)"
          fontSize="9"
          fontFamily="'Cormorant Garamond', serif"
          fontStyle="italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5 }}
        >
          Pratzen Heights
        </motion.text>

        {/* Terrain: Santon Hill (north) */}
        <motion.ellipse
          cx="150" cy="150" rx="40" ry="15"
          fill="hsl(35, 20%, 16%)"
          stroke="hsl(35, 25%, 25%)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5 }}
        />
        <motion.text
          x="150" y="155" textAnchor="middle" fill="hsl(35, 30%, 35%)" fontSize="7"
          fontFamily="'Cormorant Garamond', serif" fontStyle="italic"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}
        >
          Santon
        </motion.text>

        {/* Terrain: Frozen lakes (south) */}
        <motion.ellipse
          cx="350" cy="380" rx="60" ry="20"
          fill="hsl(210, 30%, 20%)"
          stroke="hsl(210, 25%, 30%)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        />
        <motion.text
          x="350" y="385" textAnchor="middle" fill="hsl(210, 25%, 40%)" fontSize="7"
          fontFamily="'Cormorant Garamond', serif" fontStyle="italic"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}
        >
          Satschan Pond
        </motion.text>

        {/* Village markers */}
        {[
          { x: 480, y: 150, name: 'Austerlitz' },
          { x: 130, y: 290, name: 'Telnitz' },
          { x: 200, y: 330, name: 'Sokolnitz' },
        ].map(v => (
          <g key={v.name}>
            <motion.rect
              x={v.x - 3} y={v.y - 3} width="6" height="6"
              fill="hsl(35, 25%, 35%)" rx="1"
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1 }}
            />
            <motion.text
              x={v.x + 8} y={v.y + 3}
              fill="hsl(35, 25%, 45%)" fontSize="7"
              fontFamily="'Cormorant Garamond', serif"
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}
            >
              {v.name}
            </motion.text>
          </g>
        ))}

        {/* ═══ PHASE 1: Coalition forces (positioned south/east) ═══ */}
        {/* Main allied army — drawn south toward Telnitz (the bait) */}
        <motion.g filter="url(#unit-glow)">
          {/* Allied southern column — the bulk, moving toward the bait */}
          <motion.rect
            x="200" y="310" width="80" height="20" rx="3"
            fill={COALITION_RED} fillOpacity="0.6"
            stroke={COALITION_RED} strokeWidth="1"
            initial={{ opacity: 0, x: 280 }}
            animate={{ opacity: 0.8, x: 200 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.text
            x="240" y="324" textAnchor="middle" fill="hsl(0, 0%, 90%)" fontSize="8" fontWeight="bold"
            initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 2 }}
          >
            45,000
          </motion.text>

          {/* Allied center — weakened as troops move south */}
          <motion.rect
            x="370" y="200" width="50" height="14" rx="3"
            fill={COALITION_RED} fillOpacity="0.4"
            stroke={COALITION_RED} strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5, delay: 1.8 }}
          />
          <motion.text
            x="395" y="211" textAnchor="middle" fill="hsl(0, 0%, 85%)" fontSize="7"
            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2.2 }}
          >
            15,000
          </motion.text>

          {/* Allied northern guard */}
          <motion.rect
            x="350" y="120" width="45" height="14" rx="3"
            fill={COALITION_RED} fillOpacity="0.5"
            stroke={COALITION_RED} strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 1.6 }}
          />
          <motion.text
            x="372" y="131" textAnchor="middle" fill="hsl(0, 0%, 85%)" fontSize="7"
            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2 }}
          >
            25,000
          </motion.text>
        </motion.g>

        {/* ═══ PHASE 2: French forces (positioned west) ═══ */}
        <motion.g filter="url(#unit-glow)">
          {/* French southern flank — thin line (the bait) */}
          <motion.rect
            x="100" y="300" width="40" height="12" rx="3"
            fill={FRENCH_BLUE} fillOpacity="0.5"
            stroke={FRENCH_BLUE} strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5, delay: 2 }}
          />
          <motion.text
            x="120" y="310" textAnchor="middle" fill="hsl(0, 0%, 90%)" fontSize="7"
            initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 2.5 }}
          >
            10,000
          </motion.text>

          {/* French CENTER — the main strike force, hidden behind Santon */}
          <motion.rect
            x="150" y="180" width="70" height="22" rx="3"
            fill={FRENCH_BLUE} fillOpacity="0.7"
            stroke={FRENCH_BLUE} strokeWidth="1.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1.5, delay: 2.2 }}
          />
          <motion.text
            x="185" y="195" textAnchor="middle" fill="hsl(0, 0%, 95%)" fontSize="8" fontWeight="bold"
            initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 2.7 }}
          >
            40,000
          </motion.text>

          {/* French northern guard */}
          <motion.rect
            x="130" y="130" width="40" height="12" rx="3"
            fill={FRENCH_BLUE} fillOpacity="0.5"
            stroke={FRENCH_BLUE} strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5, delay: 2.4 }}
          />
          <motion.text
            x="150" y="140" textAnchor="middle" fill="hsl(0, 0%, 90%)" fontSize="7"
            initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 2.9 }}
          >
            23,000
          </motion.text>
        </motion.g>

        {/* ═══ THE STRIKE — French center charges through Pratzen ═══ */}
        {/* Big arrow: French center → Pratzen Heights */}
        <motion.path
          d="M220,190 C260,200 280,210 320,215"
          fill="none"
          stroke={FRENCH_BLUE}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 3.2 }}
        />
        {/* Arrowhead */}
        <motion.polygon
          points="320,210 310,208 312,218"
          fill={FRENCH_BLUE}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 4.5 }}
        />

        {/* Secondary arrow: splits allied army in two */}
        <motion.path
          d="M320,220 C340,250 350,280 340,320"
          fill="none"
          stroke={FRENCH_BLUE}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 4.2 }}
        />

        {/* Northern pin arrow */}
        <motion.path
          d="M170,135 L340,125"
          fill="none"
          stroke={FRENCH_BLUE}
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1, delay: 3.5 }}
        />

        {/* ═══ STRIKE LABEL ═══ */}
        <motion.text
          x="300" y="190"
          textAnchor="middle"
          fill={GOLD}
          fontSize="8"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="bold"
          letterSpacing="0.1em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 4 }}
        >
          THE STRIKE
        </motion.text>

        {/* ═══ Rout indicator — allied army fleeing onto frozen lakes ═══ */}
        <motion.path
          d="M230,340 C260,360 300,370 340,375"
          fill="none"
          stroke={COALITION_RED}
          strokeWidth="1.5"
          strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 4.8 }}
        />
        <motion.text
          x="350" y="410"
          textAnchor="middle"
          fill="hsl(0, 40%, 45%)"
          fontSize="7"
          fontFamily="'Cormorant Garamond', serif"
          fontStyle="italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 5.5 }}
        >
          retreat across frozen lakes
        </motion.text>

        {/* ═══ Legend ═══ */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2 }}>
          <rect x="20" y="440" width="10" height="10" rx="2" fill={FRENCH_BLUE} fillOpacity="0.7" />
          <text x="35" y="449" fill="hsl(220, 15%, 55%)" fontSize="8" fontFamily="'Cormorant Garamond', serif">
            French
          </text>
          <rect x="90" y="440" width="10" height="10" rx="2" fill={COALITION_RED} fillOpacity="0.7" />
          <text x="105" y="449" fill="hsl(220, 15%, 55%)" fontSize="8" fontFamily="'Cormorant Garamond', serif">
            Russo-Austrian
          </text>
        </motion.g>

        {/* Title */}
        <motion.text
          x="300" y="475"
          textAnchor="middle"
          fill="hsl(220, 15%, 40%)"
          fontSize="9"
          fontFamily="'Cormorant Garamond', serif"
          letterSpacing="0.3em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        >
          BATTLE OF AUSTERLITZ — DECEMBER 2, 1805
        </motion.text>
      </svg>
    </div>
  );
};

// Jena: Prussia's army collapses — timeline of destruction
const COLLAPSE_EVENTS = [
  { day: 'Oct 14', event: 'Battle of Jena-Auerstedt', detail: 'Two French armies annihilate the Prussian force', severity: 1 },
  { day: 'Oct 17', event: 'Erfurt surrenders', detail: '14,000 troops lay down arms without a fight', severity: 0.7 },
  { day: 'Oct 25', event: 'Berlin falls', detail: 'Napoleon enters the Prussian capital', severity: 1 },
  { day: 'Oct 28', event: 'Hohenlohe surrenders', detail: '10,000 troops captured at Prenzlau', severity: 0.6 },
  { day: 'Nov 7', event: 'Blücher surrenders', detail: 'Last major Prussian force capitulates at Lübeck', severity: 0.8 },
  { day: 'Nov 8', event: 'Magdeburg falls', detail: '22,000 garrison surrenders — the strongest fortress in Europe', severity: 0.9 },
];

const PrussianCollapse = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="max-w-[500px] w-full">
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[9px] tracking-[0.4em] uppercase font-body mb-1" style={{ color: 'hsl(0, 50%, 45%)' }}>
          October–November 1806
        </p>
        <h4 className="font-display text-lg font-bold" style={{ color: PARCHMENT }}>
          The Prussian Collapse
        </h4>
        <p className="text-[10px] font-body mt-1" style={{ color: SMOKE }}>
          A century of military tradition — destroyed in 33 days
        </p>
      </motion.div>

      {/* Army strength bar — shrinking */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="flex justify-between mb-1">
          <span className="text-[9px] font-body" style={{ color: SMOKE }}>Prussian Army Strength</span>
          <motion.span
            className="text-[9px] font-body font-semibold"
            style={{ color: 'hsl(0, 55%, 50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            171,000 → 0
          </motion.span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'hsl(225, 20%, 15%)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(0, 0%, 20%), hsl(0, 0%, 40%))' }}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 3, delay: 0.5, ease: 'easeIn' }}
          />
        </div>
      </motion.div>

      {/* Timeline of collapse */}
      <div className="relative pl-4" style={{ borderLeft: '1px solid hsl(0, 40%, 25%)' }}>
        {COLLAPSE_EVENTS.map((evt, i) => (
          <motion.div
            key={evt.event}
            className="relative mb-3 pl-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.4, duration: 0.4 }}
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full"
              style={{
                background: `hsl(0, ${40 + evt.severity * 25}%, ${40 + evt.severity * 15}%)`,
                boxShadow: `0 0 ${4 + evt.severity * 4}px hsla(0, 55%, 50%, ${evt.severity * 0.5})`,
              }}
            />
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-[10px] font-body font-semibold shrink-0" style={{ color: 'hsl(0, 45%, 55%)' }}>
                {evt.day}
              </span>
              <span className="text-[11px] font-display font-bold" style={{ color: PARCHMENT }}>
                {evt.event}
              </span>
            </div>
            <p className="text-[10px] font-body" style={{ color: SMOKE }}>
              {evt.detail}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Punchline */}
      <motion.p
        className="text-center mt-4 font-display text-xs italic"
        style={{ color: 'hsl(0, 30%, 45%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 3.5 }}
      >
        "The Prussian army that Frederick built in a century, Napoleon destroyed before lunch."
      </motion.p>
    </div>
  </div>
);

const AusterlitzGraphic = ({ step }: { step: number }) => (
  <div className="relative w-full h-full">
    {/* Step 0: Tactical battle map */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step === 0 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <AusterlitzBattleMap />
    </motion.div>

    {/* Step 1: Prussian collapse timeline */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step === 1 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <PrussianCollapse />
    </motion.div>

    {/* Step 2: Coalition board at Tilsit zenith */}
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: step === 2 ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <CoalitionBoard phase={5} />
    </motion.div>
  </div>
);

const steps = [
  <div key="a1">
    <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-3" style={{ color: GOLD }}>
      December 2, 1805
    </p>
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      The Sun of Austerlitz
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Exactly one year after his coronation. The fog lifted and the Austerlitz sun revealed
      73,000 French soldiers facing 85,400 Allies. Napoleon had lured them into a trap.
    </p>
    <div className="flex gap-6 mt-4">
      <div>
        <span className="font-display text-xl font-bold" style={{ color: FRENCH_BLUE }}>73,000</span>
        <p className="text-[10px] font-body" style={{ color: SMOKE }}>French</p>
      </div>
      <div className="text-center font-display text-lg" style={{ color: SMOKE }}>vs</div>
      <div>
        <span className="font-display text-xl font-bold" style={{ color: COALITION_RED }}>85,400</span>
        <p className="text-[10px] font-body" style={{ color: SMOKE }}>Coalition</p>
      </div>
    </div>
  </div>,
  <div key="a2">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Jena & Auerstedt — 1806
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      Prussia declared war, expecting the army of Frederick the Great to hold.
      Napoleon destroyed it in a single afternoon. The Prussian state that had taken a century to build collapsed in one day.
    </p>
  </div>,
  <div key="a3">
    <h3 className="font-display text-2xl font-bold mb-3" style={{ color: PARCHMENT }}>
      Tilsit — The Zenith
    </h3>
    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
      On a raft in the middle of the Niemen River, Napoleon met Tsar Alexander I.
      They divided Europe between them. Almost every nation on the board is now gold or gray.
      This is the summit. From here, there is only the fall.
    </p>
  </div>,
];

export const AusterlitzSection = () => {
  return (
    <section id="austerlitz" style={{ background: MIDNIGHT }}>
      <StickyScroll
        graphic={(step) => <AusterlitzGraphic step={step} />}
        steps={steps}
      />
    </section>
  );
};
