import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import indiaMap from '@svg-maps/india';
import { INDIA_COLORS, type EraId } from './indiaStatesData';

interface IndiaMapProps {
  era: EraId;
  highlightIds?: string[];
  className?: string;
}

const hindi = ['up', 'mp', 'rj', 'hr', 'hp', 'uk', 'br', 'jh', 'cg', 'dl'];
const dravidian = ['tn', 'kl', 'ka', 'ap', 'tg'];
const western = ['mh', 'gj', 'ga'];
const eastern = ['wb', 'od'];
const northeast = ['as', 'ar', 'mn', 'ml', 'mz', 'nl', 'tr', 'sk'];
const uts = ['an', 'ch', 'dd', 'dn', 'dl', 'jk', 'la', 'ld', 'py'];
const princely = ['rj', 'gj', 'mp', 'ka', 'kl', 'hp', 'jk', 'la'];
const british = ['wb', 'br', 'up', 'mh', 'tn', 'as', 'od', 'pb'];

function buildEraColors(): Record<EraId, Record<string, string>> {
  const makeMap = (fn: (id: string) => string) => {
    const map: Record<string, string> = {};
    indiaMap.locations.forEach(loc => { map[loc.id] = fn(loc.id); });
    return map;
  };

  const patchwork = makeMap(id => {
    if (british.includes(id)) return INDIA_COLORS.britishProvince;
    const hue = 30 + (id.charCodeAt(0) % 20);
    const sat = 45 + (id.charCodeAt(1) % 25);
    const lig = 45 + (id.charCodeAt(0) % 15);
    return `hsl(${hue}, ${sat}%, ${lig}%)`;
  });

  const patel = makeMap(id =>
    ['jk', 'la'].includes(id) ? INDIA_COLORS.holdout : 'hsl(210, 40%, 45%)'
  );

  const partA = ['as', 'br', 'mh', 'mp', 'tn', 'od', 'pb', 'up', 'wb'];
  const partB = ['jk', 'la', 'hp', 'rj', 'ka', 'kl', 'tg', 'ap'];
  const abcd = makeMap(id => {
    if (partA.includes(id)) return INDIA_COLORS.partA;
    if (partB.includes(id)) return INDIA_COLORS.partB;
    if (['an', 'ld', 'dd', 'dn', 'py', 'ch'].includes(id)) return INDIA_COLORS.partD;
    return INDIA_COLORS.partC;
  });

  const linguistic = makeMap(id => {
    if (hindi.includes(id)) return INDIA_COLORS.hindiBelt;
    if (dravidian.includes(id)) return INDIA_COLORS.dravidian;
    if (northeast.includes(id)) return INDIA_COLORS.northeast;
    if (western.includes(id)) return INDIA_COLORS.western;
    if (eastern.includes(id)) return 'hsl(150, 35%, 45%)';
    return 'hsl(220, 25%, 40%)';
  });

  const modern = { ...linguistic };
  modern['tg'] = 'hsl(160, 40%, 42%)';
  modern['jk'] = 'hsl(210, 45%, 50%)';
  modern['la'] = 'hsl(210, 40%, 55%)';
  uts.forEach(id => { if (!modern[id]) modern[id] = 'hsl(210, 40%, 50%)'; });

  return {
    patchwork,
    midnight: patchwork,
    patel,
    holdouts: patel,
    abcd,
    linguistic,
    splits: modern,
    'new-states': modern,
    present: modern,
    'india-epilogue': modern,
  };
}

const ERA_COLORS = buildEraColors();

const ERA_HIDDEN: Record<string, string[]> = {
  patchwork: [],
  midnight: [],
  patel: [],
  holdouts: [],
  abcd: [],
  linguistic: ['tg', 'jh', 'cg', 'uk', 'la'],
  splits: ['la'],
};

export const IndiaMap: React.FC<IndiaMapProps> = ({ era, highlightIds = [], className = '' }) => {
  const colorMap = ERA_COLORS[era] || ERA_COLORS.present;
  const hiddenIds = ERA_HIDDEN[era] || [];
  const showMosaic = era === 'patchwork' || era === 'midnight';

  const mosaicTiles = useMemo(() => {
    if (!showMosaic) return [];
    const tiles: { x: number; y: number; w: number; h: number; color: string }[] = [];
    let seed = 42;
    for (let i = 0; i < 200; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const x = 100 + (seed % 400);
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const y = 80 + (seed % 550);
      const hue = 30 + (seed % 25);
      const sat = 45 + ((seed >> 4) % 25);
      const w = 4 + (seed % 6);
      const h = 4 + ((seed >> 3) % 6);
      tiles.push({ x, y, w, h, color: `hsl(${hue}, ${sat}%, 52%)` });
    }
    return tiles;
  }, [showMosaic]);

  return (
    <svg
      viewBox={indiaMap.viewBox}
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {showMosaic && mosaicTiles.map((tile, i) => (
        <rect
          key={`tile-${i}`}
          x={tile.x}
          y={tile.y}
          width={tile.w}
          height={tile.h}
          fill={tile.color}
          fillOpacity={0.4}
        />
      ))}

      {indiaMap.locations
        .filter(loc => !hiddenIds.includes(loc.id))
        .map((location) => {
          const isHighlighted = highlightIds.includes(location.id);
          const fill = colorMap[location.id] || 'hsl(220, 20%, 30%)';

          return (
            <motion.path
              key={location.id}
              d={location.path}
              animate={{
                fill,
                fillOpacity: isHighlighted ? 0.9 : 0.65,
                strokeWidth: isHighlighted ? 1.5 : 0.5,
                stroke: isHighlighted ? 'hsl(0, 0%, 95%)' : 'hsl(40, 20%, 30%)',
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <title>{location.name}</title>
            </motion.path>
          );
        })}

      {(era === 'present' || era === 'india-epilogue') && indiaMap.locations
        .filter(loc => !['an', 'ld', 'dd', 'dn', 'ch', 'py', 'la'].includes(loc.id))
        .map(location => {
          const nums = location.path.match(/-?\d+\.?\d*/g)?.map(Number) || [];
          if (nums.length < 4) return null;
          const pairs: [number, number][] = [];
          for (let i = 0; i < Math.min(nums.length - 1, 20); i += 2) {
            pairs.push([nums[i], nums[i + 1]]);
          }
          const cx = pairs.reduce((s, p) => s + p[0], 0) / pairs.length;
          const cy = pairs.reduce((s, p) => s + p[1], 0) / pairs.length;

          return (
            <motion.text
              key={`label-${location.id}`}
              x={cx}
              y={cy}
              textAnchor="middle"
              fill="hsl(40, 30%, 90%)"
              fontSize="5"
              fontFamily="'Cormorant Garamond', serif"
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
              style={{ pointerEvents: 'none' }}
            >
              {location.id.toUpperCase()}
            </motion.text>
          );
        })}
    </svg>
  );
};
