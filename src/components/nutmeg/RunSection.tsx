import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from './LogEntry';
import { NM } from './nutmegTheme';

/* Siege diagram — bird's eye tactical map */
const SiegeDiagram = () => (
  <motion.div
    className="my-12 rounded-sm overflow-hidden"
    style={{
      background: NM.CREAM_DARK,
      border: `1px solid ${NM.TIMBER}22`,
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <svg viewBox="0 0 600 340" className="w-full">
      <rect width="600" height="340" fill={NM.CREAM_DARK} />

      {/* Water area */}
      <rect width="600" height="340" fill={NM.TEAL} opacity="0.06" />

      {/* Rhumb lines for nautical feel */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        return (
          <line key={i} x1={300} y1={170} x2={300 + 400 * Math.cos(angle)} y2={170 + 400 * Math.sin(angle)}
            stroke={NM.TIMBER} strokeWidth={0.2} opacity={0.06} />
        );
      })}

      {/* Island shape */}
      <motion.path
        d="M180,180 Q220,145 270,150 Q320,140 370,148 Q420,138 450,155 Q465,170 450,185 Q420,200 370,195 Q320,205 270,198 Q220,205 180,195 Q170,188 180,180 Z"
        fill={NM.TIMBER}
        opacity={0.12}
        stroke={NM.TIMBER}
        strokeWidth="1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Hatching on island */}
      {Array.from({ length: 15 }).map((_, i) => (
        <line key={i} x1={200 + i * 18} y1={155} x2={195 + i * 18} y2={195}
          stroke={NM.TIMBER} strokeWidth={0.3} opacity={0.08} />
      ))}

      {/* English fort */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <rect x="300" y="155" width="24" height="18" fill="none" stroke={NM.ENGLISH_RED} strokeWidth="1.5" opacity="0.7" />
        {/* Bastions */}
        <rect x="296" y="151" width="6" height="6" fill={NM.ENGLISH_RED} opacity="0.5" />
        <rect x="322" y="151" width="6" height="6" fill={NM.ENGLISH_RED} opacity="0.5" />
        <rect x="296" y="169" width="6" height="6" fill={NM.ENGLISH_RED} opacity="0.5" />
        <rect x="322" y="169" width="6" height="6" fill={NM.ENGLISH_RED} opacity="0.5" />
        {/* Flag */}
        <line x1="312" y1="155" x2="312" y2="140" stroke={NM.INK} strokeWidth="0.8" />
        <rect x="313" y="140" width="10" height="6" fill={NM.ENGLISH_RED} opacity="0.6" rx="0.5" />
        <text x="312" y="135" textAnchor="middle" fill={NM.ENGLISH_RED} fontSize="7"
          fontFamily="'Playfair Display',serif" fontWeight="700" opacity="0.8">
          ENGLISH FORT
        </text>
      </motion.g>

      {/* Dutch ships — period style */}
      {[
        { x: 120, y: 220, label: '' },
        { x: 200, y: 250, label: '' },
        { x: 420, y: 240, label: '' },
        { x: 500, y: 210, label: '' },
        { x: 310, y: 260, label: '' },
      ].map((ship, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
        >
          {/* Hull */}
          <path d={`M${ship.x - 10},${ship.y} Q${ship.x},${ship.y + 5} ${ship.x + 10},${ship.y}`}
            fill="none" stroke={NM.DUTCH_BLUE} strokeWidth="1.2" opacity="0.6" />
          {/* Mast */}
          <line x1={ship.x} y1={ship.y} x2={ship.x} y2={ship.y - 14} stroke={NM.INK} strokeWidth="0.5" opacity="0.4" />
          {/* Sail */}
          <path d={`M${ship.x},${ship.y - 14} L${ship.x + 7},${ship.y - 7} L${ship.x},${ship.y - 4} Z`}
            fill={NM.DUTCH_BLUE} opacity="0.12" stroke={NM.DUTCH_BLUE} strokeWidth="0.3" />
          {/* Dutch flag dot */}
          <circle cx={ship.x} cy={ship.y - 16} r={1.5} fill={NM.VERMILION} opacity="0.5" />
        </motion.g>
      ))}

      {/* Blockade arc */}
      <motion.path
        d="M100,230 Q200,280 310,275 Q420,270 520,220"
        fill="none"
        stroke={NM.DUTCH_BLUE}
        strokeWidth="0.8"
        strokeDasharray="4 3"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
      />

      {/* Labels */}
      <text x="300" y="120" textAnchor="middle" fill={NM.AMBER} fontSize="11"
        fontFamily="'Playfair Display',serif" fontWeight="bold" opacity="0.7">
        RUN ISLAND
      </text>
      <text x="300" y="300" textAnchor="middle" fill={NM.DUTCH_BLUE} fontSize="7"
        fontFamily="'Source Sans 3',sans-serif" letterSpacing="0.25em" opacity="0.45">
        DUTCH BLOCKADE — 5 WARSHIPS
      </text>

      {/* Chart title */}
      <text x="300" y="20" textAnchor="middle" fill={NM.TIMBER} fontSize="8"
        fontFamily="'Source Sans 3',sans-serif" letterSpacing="0.3em" opacity="0.3">
        TACTICAL SURVEY — RUN ISLAND SIEGE, 1616
      </text>
    </svg>
  </motion.div>
);

export const RunSection = () => {
  return (
    <LogEntry
      id="run-island"
      entryNumber="Entry V"
      date="1616–1620 — Dispatches from Run"
      coordinates="Position: 4°32′S, 129°52′E"
      stainIntensity={0.4}
    >
      <motion.h2
        className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center"
        style={{ color: NM.INK }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        One island<br />
        <span style={{ color: NM.ENGLISH_RED }}>refused to fall.</span>
      </motion.h2>

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        In 1616, Nathaniel Courthope sailed to the Banda Islands with two ships
        and a handful of English sailors. The Bandanese chiefs of Run island,
        desperate for protection against the Dutch, signed a treaty making Run
        a possession of the English Crown.
      </motion.p>

      <SiegeDiagram />

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Courthope and his men held Run for <strong style={{ color: NM.AMBER }}>four years</strong> against
        a full Dutch blockade — outnumbered, outgunned, supplied only by Bandanese
        canoes that slipped past Dutch patrols at night.
      </motion.p>

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Courthope was killed in 1620. The Dutch eventually took Run.
        But the English never forgot their claim. For forty-seven years,
        diplomats argued over an island most Europeans couldn't find on a map.
      </motion.p>

      <motion.p
        className="font-display text-2xl md:text-3xl italic text-center"
        style={{ color: NM.TIMBER }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        "The resolution came in the most unlikely trade in history."
      </motion.p>
    </LogEntry>
  );
};
