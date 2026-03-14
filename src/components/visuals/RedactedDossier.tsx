import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SHADOW = 'hsl(220, 15%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const REDACT = 'hsl(220, 10%, 20%)';
const RED_STAMP = 'hsl(0, 60%, 45%)';
const PANEL_BG = 'hsl(220, 15%, 8%)';
const PANEL_BORDER = 'hsl(220, 10%, 18%)';

interface Props {
  activeStep: number;
}

/* ─── Step 0: Heavily redacted dossier ─────────────────────────── */
const Step0 = () => (
  <motion.div
    key="step0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-sm mx-auto p-5 rounded border"
    style={{ background: PANEL_BG, borderColor: PANEL_BORDER }}
  >
    {/* Header row */}
    <div className="flex items-center justify-between mb-5">
      <p className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold" style={{ color: SHADOW }}>
        Intelligence Assessment
      </p>
      <motion.div
        className="px-2 py-0.5 rounded text-[8px] font-body font-bold tracking-wider"
        style={{ border: `1px solid ${RED_STAMP}`, color: RED_STAMP }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        CLASSIFIED
      </motion.div>
    </div>

    {/* SVG document with heavy redaction */}
    <svg viewBox="0 0 280 220" className="w-full" style={{ fontFamily: 'monospace' }}>
      {/* Document lines — mostly blacked out */}
      {[
        { y: 18, w: 240, redacted: false, text: 'SUBJECT: State of Israel — Nuclear Capability' },
        { y: 36, w: 240, redacted: true },
        { y: 54, w: 200, redacted: true },
        { y: 72, w: 180, redacted: true },
        { y: 90, w: 240, redacted: true },
        { y: 108, w: 220, redacted: true },
        { y: 126, w: 240, redacted: true },
        { y: 144, w: 160, redacted: true },
        { y: 162, w: 200, redacted: true },
        { y: 180, w: 240, redacted: true },
        { y: 198, w: 140, redacted: true },
      ].map((line, i) =>
        line.redacted ? (
          <rect key={i} x="20" y={line.y - 10} width={line.w} height={10} rx={1} fill={REDACT} />
        ) : (
          <text key={i} x="20" y={line.y} fontSize="7" fill={STEEL}>
            {line.text}
          </text>
        )
      )}

      {/* Question marks scattered */}
      {[
        { x: 130, y: 50 },
        { x: 70, y: 105 },
        { x: 190, y: 130 },
        { x: 110, y: 165 },
      ].map((pos, i) => (
        <motion.text
          key={i}
          x={pos.x}
          y={pos.y}
          fontSize="18"
          fill={SHADOW}
          textAnchor="middle"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, delay: i * 0.7, repeat: Infinity }}
        >
          ?
        </motion.text>
      ))}

      {/* CLASSIFIED diagonal stamp */}
      <motion.text
        x="140"
        y="120"
        fontSize="28"
        fill="none"
        stroke={RED_STAMP}
        strokeWidth="1.5"
        textAnchor="middle"
        transform="rotate(-30, 140, 120)"
        opacity={0.35}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        CLASSIFIED
      </motion.text>
    </svg>
  </motion.div>
);

/* ─── Step 1: Dimona blueprint ─────────────────────────────────── */
const Step1 = () => (
  <motion.div
    key="step1"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-sm mx-auto p-5 rounded border"
    style={{ background: PANEL_BG, borderColor: PANEL_BORDER }}
  >
    <p className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold mb-4" style={{ color: SHADOW }}>
      Facility Blueprint · Negev Desert, 1958
    </p>

    <svg viewBox="0 0 280 230" className="w-full">
      {/* Grid background — blueprint style */}
      <defs>
        <pattern id="grid-s1" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke={SHADOW} strokeWidth="0.2" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="280" height="230" fill="url(#grid-s1)" />

      {/* Main reactor dome */}
      <motion.ellipse
        cx="140" cy="130" rx="55" ry="40"
        fill="none" stroke={SHADOW} strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      {/* Dome top */}
      <motion.path
        d="M 85 130 Q 140 80 195 130"
        fill="none" stroke={SHADOW} strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
      />
      {/* Core circle */}
      <motion.circle
        cx="140" cy="135" r="18"
        fill="none" stroke={STEEL} strokeWidth="1" strokeDasharray="4 2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
      <motion.circle
        cx="140" cy="135" r="6"
        fill={SHADOW} opacity={0.6}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Cooling tower left */}
      <motion.path
        d="M 60 170 L 75 100 L 90 170 Z"
        fill="none" stroke={STEEL} strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      {/* Cooling tower right */}
      <motion.path
        d="M 190 170 L 205 100 L 220 170 Z"
        fill="none" stroke={STEEL} strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />

      {/* Struck-through label */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <text x="140" y="26" fontSize="8" fill={STEEL} textAnchor="middle">
          NAHAL SOREQ TEXTILE PLANT
        </text>
        {/* Strikethrough */}
        <motion.line
          x1="55" y1="23" x2="225" y2="23"
          stroke={RED_STAMP} strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        />
      </motion.g>

      {/* Revealed label */}
      <motion.text
        x="140" y="42"
        fontSize="8" fill={LIGHT} textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        NUCLEAR REACTOR COMPLEX
      </motion.text>

      {/* Dimension annotations */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <line x1="85" y1="185" x2="195" y2="185" stroke={SHADOW} strokeWidth="0.5" />
        <text x="140" y="196" fontSize="7" fill={SHADOW} textAnchor="middle">110m diameter</text>
      </motion.g>
    </svg>
  </motion.div>
);

/* ─── Step 2: 1973 Yom Kippur crisis map ───────────────────────── */
const Step2 = () => (
  <motion.div
    key="step2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-sm mx-auto p-5 rounded border"
    style={{ background: PANEL_BG, borderColor: PANEL_BORDER }}
  >
    <div className="flex items-center justify-between mb-4">
      <p className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold" style={{ color: SHADOW }}>
        October 1973 · Yom Kippur War
      </p>
      <motion.div
        className="text-[8px] font-body font-bold px-1.5 py-0.5 rounded"
        style={{ background: 'hsl(0, 60%, 15%)', color: RED_STAMP, border: `1px solid ${RED_STAMP}` }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        NUCLEAR ALERT
      </motion.div>
    </div>

    <svg viewBox="0 0 280 220" className="w-full">
      {/* Israel territory — simplified polygon */}
      <motion.polygon
        points="130,60 155,55 175,80 180,120 165,155 140,165 120,155 110,120 115,80"
        fill="hsl(220, 15%, 12%)"
        stroke={SHADOW}
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <text x="145" y="112" fontSize="7" fill={LIGHT} textAnchor="middle" fontWeight="bold">ISRAEL</text>

      {/* Egypt — south west */}
      <motion.rect
        x="20" y="130" width="85" height="70" rx="4"
        fill="hsl(30, 20%, 10%)" stroke="hsl(30, 50%, 40%)" strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <text x="62" y="170" fontSize="7" fill="hsl(30, 50%, 60%)" textAnchor="middle">EGYPT</text>

      {/* Syria — north east */}
      <motion.rect
        x="185" y="20" width="80" height="60" rx="4"
        fill="hsl(40, 20%, 10%)" stroke="hsl(40, 50%, 40%)" strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      <text x="225" y="55" fontSize="7" fill="hsl(40, 50%, 60%)" textAnchor="middle">SYRIA</text>

      {/* Egyptian arrow — west front */}
      {[0, 1, 2].map(i => (
        <motion.path
          key={`egy-${i}`}
          d={`M ${70 + i * 14} 130 L ${108 + i * 6} ${155 - i * 6}`}
          fill="none" stroke={RED_STAMP} strokeWidth="1.5"
          markerEnd="url(#arrow-r)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.7 + i * 0.1 }}
        />
      ))}

      {/* Syrian arrow — north front */}
      {[0, 1, 2].map(i => (
        <motion.path
          key={`syr-${i}`}
          d={`M ${190 + i * 12} 80 L ${168 - i * 4} ${100 + i * 8}`}
          fill="none" stroke={RED_STAMP} strokeWidth="1.5"
          markerEnd="url(#arrow-r)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.9 + i * 0.1 }}
        />
      ))}

      {/* Arrow marker */}
      <defs>
        <marker id="arrow-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill={RED_STAMP} />
        </marker>
      </defs>

      {/* Jericho missile icons on Israel — 2 warhead symbols */}
      {[{ x: 128, y: 90 }, { x: 148, y: 90 }].map((pos, i) => (
        <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 + i * 0.2 }} style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}>
          {/* Warhead shape */}
          <polygon points={`${pos.x},${pos.y - 10} ${pos.x - 5},${pos.y + 4} ${pos.x + 5},${pos.y + 4}`}
            fill={LIGHT} opacity={0.9} />
          <rect x={pos.x - 3} y={pos.y + 4} width={6} height={5} fill={STEEL} />
          <motion.circle cx={pos.x} cy={pos.y - 8} r="3"
            fill="none" stroke={RED_STAMP} strokeWidth="0.8"
            animate={{ r: [3, 7, 3], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5 }} />
        </motion.g>
      ))}

      {/* Caption */}
      <motion.text x="140" y="210" fontSize="7" fill={SHADOW} textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        Dayan orders Jericho missiles armed · Oct 8–9, 1973
      </motion.text>
    </svg>
  </motion.div>
);

/* ─── Step 3: Partially un-redacted dossier (Vanunu) ───────────── */
const Step3 = () => (
  <motion.div
    key="step3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-sm mx-auto p-5 rounded border"
    style={{ background: PANEL_BG, borderColor: PANEL_BORDER }}
  >
    <div className="flex items-center justify-between mb-4">
      <p className="text-[9px] tracking-[0.25em] uppercase font-body font-semibold" style={{ color: SHADOW }}>
        Sunday Times · October 5, 1986
      </p>
      <div className="text-[8px] font-body font-bold px-1.5 py-0.5 rounded"
        style={{ background: 'hsl(220, 15%, 13%)', color: SHADOW, border: `1px solid ${SHADOW}` }}>
        PARTIAL RELEASE
      </div>
    </div>

    <svg viewBox="0 0 280 240" className="w-full" style={{ fontFamily: 'monospace' }}>

      {/* Headline — revealed */}
      <motion.text x="140" y="18" fontSize="8.5" fill={LIGHT} textAnchor="middle" fontWeight="bold"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        ISRAEL'S SECRET NUCLEAR ARSENAL EXPOSED
      </motion.text>

      {/* Vanunu portrait placeholder — square with stylised face lines */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <rect x="18" y="28" width="52" height="62" rx="2"
          fill="hsl(220, 12%, 13%)" stroke={SHADOW} strokeWidth="1" />
        {/* simple face outline */}
        <circle cx="44" cy="52" r="14" fill="none" stroke={STEEL} strokeWidth="0.8" />
        <circle cx="39" cy="50" r="1.5" fill={STEEL} />
        <circle cx="49" cy="50" r="1.5" fill={STEEL} />
        <path d="M 39 58 Q 44 62 49 58" fill="none" stroke={STEEL} strokeWidth="0.8" />
        <text x="44" y="84" fontSize="6" fill={SHADOW} textAnchor="middle">VANUNU</text>
      </motion.g>

      {/* Document lines — mix of revealed and still-redacted */}
      {[
        { y: 36, text: 'Dimona reactor: weapons-grade plutonium confirmed.', redacted: false },
        { y: 50, text: null, redacted: true, x: 80, w: 185 },
        { y: 64, text: 'Stockpile: 80–200 warheads (lower estimate confirmed).', redacted: false },
        { y: 78, text: null, redacted: true, x: 80, w: 185 },
        { y: 92, text: null, redacted: true, x: 80, w: 120 },
        { y: 106, text: 'Jericho missile delivery system operational.', redacted: false },
        { y: 120, text: null, redacted: true, x: 80, w: 185 },
        { y: 134, text: null, redacted: true, x: 80, w: 100 },
      ].map((line, i) =>
        line.redacted ? (
          <motion.rect
            key={i}
            x={line.x ?? 80} y={line.y - 9}
            width={line.w ?? 185} height={9} rx={1}
            fill={REDACT}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.07 }}
          />
        ) : (
          <motion.text
            key={i}
            x="80" y={line.y}
            fontSize="6.5" fill={STEEL}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.07 }}
          >
            {line.text}
          </motion.text>
        )
      )}

      {/* amimut label */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <rect x="18" y="158" width="244" height="36" rx="3"
          fill="hsl(220, 15%, 11%)" stroke={SHADOW} strokeWidth="0.5" />
        <text x="140" y="172" fontSize="7.5" fill={SHADOW} textAnchor="middle" fontStyle="italic">
          AMIMUT (אמימות) — nuclear ambiguity
        </text>
        <text x="140" y="186" fontSize="6.5" fill={STEEL} textAnchor="middle">
          Neither confirm. Neither deny. The silence is the weapon.
        </text>
      </motion.g>

      {/* MOSSAD kidnap note — still redacted stripe */}
      <motion.rect
        x="18" y="202" width="244" height="10" rx={1}
        fill={REDACT}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />
      <motion.text
        x="140" y="220" fontSize="6.5" fill={SHADOW} textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
        Vanunu abducted by Mossad, Rome · imprisoned 18 years
      </motion.text>
    </svg>
  </motion.div>
);

/* ─── Public export ─────────────────────────────────────────────── */
export const RedactedDossier = ({ activeStep = 0 }: Props) => {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {activeStep === 0 && <Step0 />}
        {activeStep === 1 && <Step1 />}
        {activeStep === 2 && <Step2 />}
        {activeStep === 3 && <Step3 />}
      </AnimatePresence>
    </div>
  );
};
