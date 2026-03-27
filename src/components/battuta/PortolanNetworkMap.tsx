import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { IB } from '@/components/visuals/battutaMapData';

/**
 * Portolan-style geographic network map showing the Islamic institutional infrastructure.
 * Replaces the emoji radial diagram.
 */

const NETWORK_CITIES = [
  { x: 85, y: 138, label: 'Tangier', type: 'zawiya' },
  { x: 135, y: 108, label: 'Tunis', type: 'madrasa' },
  { x: 195, y: 100, label: 'Cairo', type: 'madrasa' },
  { x: 230, y: 95, label: 'Damascus', type: 'qadi' },
  { x: 215, y: 130, label: 'Mecca', type: 'hajj' },
  { x: 260, y: 105, label: 'Baghdad', type: 'madrasa' },
  { x: 290, y: 90, label: 'Tabriz', type: 'trade' },
  { x: 330, y: 110, label: 'Delhi', type: 'qadi' },
  { x: 310, y: 135, label: 'Calicut', type: 'trade' },
  { x: 350, y: 145, label: 'Malé', type: 'qadi' },
  { x: 155, y: 160, label: 'Kilwa', type: 'trade' },
  { x: 120, y: 148, label: 'Mogadishu', type: 'zawiya' },
];

const TYPE_GLYPHS: Record<string, { symbol: string; color: string }> = {
  madrasa: { symbol: '☽', color: IB.LAPIS },
  qadi: { symbol: '⚖', color: IB.SAFFRON },
  zawiya: { symbol: '◈', color: IB.EMERALD },
  trade: { symbol: '⛵', color: IB.MONSOON },
  hajj: { symbol: '✦', color: IB.HENNA },
};

// Connections: pairs of city indices
const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 5], [5, 6], [6, 7], [7, 8], [8, 9],
  [2, 4], [4, 3], [2, 11], [11, 10], [0, 11], [3, 7],
];

export const PortolanNetworkMap = () => (
  <div className="relative w-full max-w-2xl mx-auto">
    <svg viewBox="0 0 430 200" className="w-full" style={{ overflow: 'visible' }}>
      {/* Simplified coastline silhouette */}
      <path
        d="M 40,120 Q 70,100 110,105 L 140,100 Q 170,92 200,95 L 235,90 Q 260,85 280,92 L 300,88 Q 330,85 350,100 L 380,110 Q 390,125 370,140 L 340,145 Q 320,155 300,148 L 270,155 Q 240,165 210,158 L 180,162 Q 150,170 120,160 L 90,155 Q 60,145 40,120 Z"
        fill={`${IB.PARCHMENT_DK}30`}
        stroke={IB.INK_LIGHT}
        strokeWidth={0.6}
        opacity={0.3}
      />

      {/* Connection routes with animated dashes */}
      {CONNECTIONS.map(([a, b], i) => {
        const from = NETWORK_CITIES[a];
        const to = NETWORK_CITIES[b];
        return (
          <motion.line key={i}
            x1={from.x} y1={from.y} x2={to.x} y2={to.y}
            stroke={IB.SAFFRON} strokeWidth={0.8} strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          />
        );
      })}

      {/* Reach radius from Tangier */}
      {[60, 120, 180].map((r, i) => (
        <motion.circle key={i}
          cx={85} cy={138} r={0}
          fill="none" stroke={IB.SAFFRON} strokeWidth={0.5} strokeDasharray="3 3"
          initial={{ r: 0, opacity: 0 }}
          whileInView={{ r, opacity: 0.12 - i * 0.03 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + i * 0.3 }}
        />
      ))}

      {/* City nodes */}
      {NETWORK_CITIES.map((city, i) => {
        const glyph = TYPE_GLYPHS[city.type];
        return (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
          >
            {/* Glow */}
            <circle cx={city.x} cy={city.y} r={8} fill={glyph.color} opacity={0.1} />
            {/* Node */}
            <circle cx={city.x} cy={city.y} r={4} fill={glyph.color} opacity={0.7}
              stroke={IB.PARCHMENT} strokeWidth={1} />
            {/* Glyph */}
            <text x={city.x} y={city.y + 1} textAnchor="middle" dominantBaseline="central"
              fontSize={6} fill={IB.PARCHMENT}>
              {glyph.symbol}
            </text>
            {/* Label as marginalia */}
            <text x={city.x} y={city.y - 12} textAnchor="middle"
              fontSize={7} fontFamily="'Cormorant Garamond', serif" fontWeight={600}
              fontStyle="italic" fill={IB.INK} opacity={0.7}>
              {city.label}
            </text>
          </motion.g>
        );
      })}
    </svg>

    {/* Legend */}
    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
      {Object.entries(TYPE_GLYPHS).map(([type, { symbol, color }]) => (
        <div key={type} className="flex items-center gap-1.5">
          <span style={{ color, fontSize: 14 }}>{symbol}</span>
          <span className="font-body text-[10px] capitalize" style={{ color: IB.INK_LIGHT }}>{type}</span>
        </div>
      ))}
    </div>
  </div>
);
