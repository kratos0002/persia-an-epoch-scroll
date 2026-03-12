import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  INDIA_OUTLINE,
  BRITISH_PROVINCES,
  PRINCELY_STATES,
  MODERN_STATES,
  INDIA_COLORS,
  type EraId,
} from './indiaStatesData';

interface IndiaMapProps {
  era: EraId;
  highlightIds?: string[];
  className?: string;
}

// Generate mosaic tiles to represent the 500+ tiny princely states
const generateMosaicTiles = (seed: number) => {
  const tiles: { x: number; y: number; w: number; h: number; hue: number }[] = [];
  // Fill the interior of India with small rectangles
  const startX = 100, endX = 400, startY = 100, endY = 480;
  let s = seed;
  for (let y = startY; y < endY; y += 18) {
    for (let x = startX; x < endX; x += 16) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      if (s % 3 !== 0) continue; // sparse
      const hue = 30 + (s % 30);
      const w = 8 + (s % 10);
      const h = 8 + ((s >> 4) % 10);
      tiles.push({ x: x + (s % 8), y: y + ((s >> 3) % 8), w, h, hue });
    }
  }
  return tiles;
};

const mosaicTiles = generateMosaicTiles(42);

// Linguistic era regions (1956)
const LINGUISTIC_REGIONS = [
  { id: 'andhra', name: 'Andhra Pradesh', path: 'M200,310 L290,290 L330,340 L310,400 L250,410 L200,370 Z', color: INDIA_COLORS.dravidian },
  { id: 'kerala-56', name: 'Kerala', path: 'M155,445 L185,430 L195,470 L180,505 L160,490 Z', color: INDIA_COLORS.dravidian },
  { id: 'mysore-56', name: 'Mysore', path: 'M120,370 L200,355 L235,390 L220,440 L160,450 L115,415 Z', color: INDIA_COLORS.dravidian },
  { id: 'madras-56', name: 'Madras', path: 'M200,415 L275,395 L305,440 L280,485 L235,495 L200,460 Z', color: INDIA_COLORS.dravidian },
  { id: 'bombay-56', name: 'Bombay', path: 'M60,210 L170,200 L200,280 L190,360 L100,370 L55,290 Z', color: INDIA_COLORS.western },
  { id: 'mp-56', name: 'Madhya Pradesh', path: 'M140,210 L280,195 L310,250 L300,310 L200,320 L145,275 Z', color: INDIA_COLORS.hindiBelt },
  { id: 'up-56', name: 'Uttar Pradesh', path: 'M200,115 L310,105 L340,160 L320,215 L260,225 L200,195 Z', color: INDIA_COLORS.hindiBelt },
  { id: 'rajasthan-56', name: 'Rajasthan', path: 'M90,110 L195,100 L210,170 L195,220 L120,230 L85,175 Z', color: INDIA_COLORS.hindiBelt },
  { id: 'punjab-56', name: 'Punjab', path: 'M145,60 L230,48 L260,85 L245,120 L190,130 L150,100 Z', color: INDIA_COLORS.hindiBelt },
  { id: 'bengal-56', name: 'West Bengal', path: 'M340,195 L390,185 L405,240 L395,290 L360,295 L335,255 Z', color: 'hsl(150, 35%, 45%)' },
  { id: 'bihar-56', name: 'Bihar', path: 'M290,185 L345,175 L365,215 L350,260 L310,265 L285,230 Z', color: INDIA_COLORS.hindiBelt },
  { id: 'orissa-56', name: 'Orissa', path: 'M300,265 L350,255 L375,300 L360,345 L315,350 L290,310 Z', color: 'hsl(150, 38%, 42%)' },
  { id: 'assam-56', name: 'Assam', path: 'M370,135 L460,120 L480,175 L465,230 L420,240 L380,200 Z', color: INDIA_COLORS.northeast },
  { id: 'jk-56', name: 'Jammu & Kashmir', path: 'M150,25 L260,12 L290,45 L270,80 L200,90 L155,65 Z', color: 'hsl(210, 45%, 50%)' },
];

export const IndiaMap: React.FC<IndiaMapProps> = ({ era, highlightIds = [], className = '' }) => {
  const regions = useMemo(() => {
    switch (era) {
      case 'patchwork':
      case 'midnight':
        return [...BRITISH_PROVINCES, ...PRINCELY_STATES];
      case 'patel':
      case 'holdouts':
        // Show provinces merging, holdouts in red
        return [
          ...BRITISH_PROVINCES.map(p => ({ ...p, color: INDIA_COLORS.partA })),
          ...PRINCELY_STATES.filter(s => ['hyderabad', 'kashmir', 'junagadh'].includes(s.id)).map(s => ({ ...s, color: INDIA_COLORS.holdout })),
        ];
      case 'abcd':
        return [
          ...BRITISH_PROVINCES.map(p => ({ ...p, color: INDIA_COLORS.partA, category: 'Part A' })),
          ...PRINCELY_STATES.filter(s => !['junagadh'].includes(s.id)).map(s => ({ ...s, color: INDIA_COLORS.partB, category: 'Part B' })),
        ];
      case 'linguistic':
        return LINGUISTIC_REGIONS.map(r => ({ ...r, category: 'linguistic' }));
      case 'splits':
      case 'new-states':
      case 'present':
      case 'india-epilogue':
        return MODERN_STATES;
      default:
        return [...BRITISH_PROVINCES, ...PRINCELY_STATES];
    }
  }, [era]);

  const showMosaic = era === 'patchwork' || era === 'midnight';

  return (
    <svg viewBox="0 0 500 560" className={`w-full h-full ${className}`} preserveAspectRatio="xMidYMid meet">
      {/* India outline */}
      <motion.path
        d={INDIA_OUTLINE}
        fill="none"
        stroke="hsl(40, 25%, 40%)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Mosaic tiles for princely states era */}
      <AnimatePresence>
        {showMosaic && mosaicTiles.map((tile, i) => (
          <motion.rect
            key={`tile-${i}`}
            x={tile.x}
            y={tile.y}
            width={tile.w}
            height={tile.h}
            fill={`hsl(${tile.hue}, 55%, 52%)`}
            stroke="hsl(40, 30%, 35%)"
            strokeWidth="0.3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: i * 0.002 }}
          />
        ))}
      </AnimatePresence>

      {/* Regions */}
      <AnimatePresence mode="wait">
        {regions.map((region, i) => {
          const isHighlighted = highlightIds.includes(region.id);
          return (
            <motion.path
              key={`${era}-${region.id}`}
              d={region.path}
              fill={region.color}
              fillOpacity={isHighlighted ? 0.9 : 0.65}
              stroke={isHighlighted ? 'hsl(0, 0%, 95%)' : 'hsl(40, 25%, 50%)'}
              strokeWidth={isHighlighted ? 2 : 0.8}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                fillOpacity: isHighlighted ? [0.9, 0.5, 0.9] : 0.65,
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.6,
                delay: i * 0.03,
                fillOpacity: isHighlighted ? { duration: 1.5, repeat: Infinity } : {},
              }}
            >
              <title>{region.name}</title>
            </motion.path>
          );
        })}
      </AnimatePresence>

      {/* Labels for modern states */}
      {(era === 'present' || era === 'india-epilogue') && MODERN_STATES.slice(0, 15).map((state) => {
        // Extract approximate center from path
        const nums = state.path.match(/\d+/g)?.map(Number) || [];
        const xs = nums.filter((_, i) => i % 2 === 0);
        const ys = nums.filter((_, i) => i % 2 === 1);
        const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
        const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
        return (
          <motion.text
            key={`label-${state.id}`}
            x={cx}
            y={cy}
            textAnchor="middle"
            fill="hsl(40, 30%, 90%)"
            fontSize="6"
            fontFamily="'Cormorant Garamond', serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.5 }}
          >
            {state.name.length > 12 ? state.name.slice(0, 10) + '…' : state.name}
          </motion.text>
        );
      })}
    </svg>
  );
};
