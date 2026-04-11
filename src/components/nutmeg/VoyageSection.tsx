import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from './LogEntry';
import { NM } from './nutmegTheme';

const ROUTE_POINTS = [
  { x: 80, y: 120, label: 'Lisbon', date: 'March 1512' },
  { x: 130, y: 220, label: 'W. Africa', date: 'April' },
  { x: 200, y: 310, label: 'Cape of Good Hope', date: 'June' },
  { x: 310, y: 210, label: 'Mozambique', date: 'August' },
  { x: 380, y: 155, label: 'Goa', date: 'September' },
  { x: 460, y: 165, label: 'Malacca', date: 'November' },
  { x: 520, y: 185, label: 'Banda Islands', date: 'December' },
];

export const VoyageSection = () => {
  const pathD = ROUTE_POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <LogEntry
      id="the-voyage"
      entryNumber="Entry II"
      date="12 November 1512"
      coordinates="Position: 4°31′S, 129°54′E"
      stainIntensity={0.05}
    >
      <motion.h2
        className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center"
        style={{ color: NM.INK }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        18,000 miles<br />
        <span style={{ color: NM.TEAL }}>for a handful of seeds.</span>
      </motion.h2>

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        The Portuguese were first. In 1512, António de Abreu sailed from Malacca
        into the Banda Sea and found the Spice Islands — ten volcanic specks
        surrounded by deep blue water and the richest botanical treasure on earth.
      </motion.p>

      {/* Portolan-style chart */}
      <motion.div
        className="my-12 rounded-sm overflow-hidden"
        style={{
          background: NM.CREAM_DARK,
          border: `1px solid ${NM.TIMBER}22`,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <svg viewBox="0 0 600 380" className="w-full">
          {/* Parchment background */}
          <rect width="600" height="380" fill={NM.CREAM_DARK} />

          {/* Rhumb lines radiating from compass center */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={300}
                y1={190}
                x2={300 + 400 * Math.cos(angle)}
                y2={190 + 400 * Math.sin(angle)}
                stroke={NM.TIMBER}
                strokeWidth={i % 4 === 0 ? 0.5 : 0.2}
                opacity={0.08}
              />
            );
          })}

          {/* Compass rose center */}
          <circle cx={300} cy={190} r={8} fill="none" stroke={NM.TIMBER} strokeWidth={0.5} opacity={0.15} />
          <circle cx={300} cy={190} r={2} fill={NM.TIMBER} opacity={0.15} />

          {/* Grid / latitude lines */}
          {[100, 150, 200, 250, 300, 350].map(y => (
            <line key={y} x1="30" y1={y} x2="570" y2={y} stroke={NM.TIMBER} strokeWidth="0.3" opacity="0.06" />
          ))}

          {/* Simplified coastline hints */}
          <path
            d="M60,110 Q75,130 70,160 Q65,190 80,220 Q100,260 130,290 Q160,310 200,315 Q230,310 250,295"
            fill="none"
            stroke={NM.TIMBER}
            strokeWidth="1"
            opacity="0.15"
          />
          <path
            d="M250,295 Q280,260 310,240 Q340,220 360,190 Q375,170 380,155"
            fill="none"
            stroke={NM.TIMBER}
            strokeWidth="1"
            opacity="0.15"
          />

          {/* Route glow */}
          <motion.path
            d={pathD}
            fill="none"
            stroke={NM.TEAL}
            strokeWidth="5"
            opacity={0.12}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Route — dashed ink line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke={NM.TEAL}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Stops with date annotations */}
          {ROUTE_POINTS.map((pt, i) => {
            const isEnd = i === ROUTE_POINTS.length - 1;
            return (
              <motion.g
                key={pt.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i / ROUTE_POINTS.length) * 3, duration: 0.4 }}
              >
                <circle cx={pt.x} cy={pt.y} r={isEnd ? 5 : 3} fill={isEnd ? NM.AMBER : NM.TEAL} opacity={isEnd ? 1 : 0.7} />
                <text
                  x={pt.x}
                  y={pt.y - 14}
                  textAnchor="middle"
                  fill={isEnd ? NM.AMBER : NM.INK}
                  fontSize={isEnd ? '10' : '8'}
                  fontFamily="'Playfair Display', serif"
                  fontWeight={isEnd ? '700' : '400'}
                  opacity={isEnd ? 1 : 0.7}
                >
                  {pt.label}
                </text>
                <text
                  x={pt.x}
                  y={pt.y - 5}
                  textAnchor="middle"
                  fill={NM.SMOKE}
                  fontSize="6"
                  fontFamily="'Source Sans 3', sans-serif"
                  fontStyle="italic"
                >
                  {pt.date}
                </text>
              </motion.g>
            );
          })}

          {/* Chart title */}
          <text x="300" y="25" textAnchor="middle" fill={NM.TIMBER} fontSize="9" fontFamily="'Source Sans 3', sans-serif" letterSpacing="0.3em" opacity="0.4">
            CARTA NAUTICA — ROTA DAS ESPECIARIAS
          </text>
        </svg>
      </motion.div>

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        For eighty years, Portugal held a loose monopoly. But by the 1590s,
        a new power was rising in Europe — the Dutch Republic — and they wanted
        their share of the spice trade.
      </motion.p>

      <motion.p
        className="font-body text-lg leading-relaxed"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        In 1602, they created the most powerful corporation in history:
        the <strong style={{ color: NM.VERMILION }}>Vereenigde Oostindische Compagnie</strong> — the VOC.
        It had the power to wage war, sign treaties, mint coins, and establish colonies.
      </motion.p>
    </LogEntry>
  );
};
