import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import indiaMap from '@svg-maps/india';
import { INDIA_COLORS, type EraId } from './indiaStatesData';

interface IndiaMapProps {
  era: EraId;
  highlightIds?: string[];
  className?: string;
}

// Map modern state IDs to historical eras/categories
const ERA_COLORS: Record<EraId, Record<string, string>> = (() => {
  // Modern state categories
  const hindi = ['up', 'mp', 'rj', 'hr', 'hp', 'uk', 'br', 'jh', 'cg', 'dl'];
  const dravidian = ['tn', 'kl', 'ka', 'ap', 'tg'];
  const western = ['mh', 'gj', 'ga'];
  const eastern = ['wb', 'od'];
  const northeast = ['as', 'ar', 'mn', 'ml', 'mz', 'nl', 'tr', 'sk'];
  const uts = ['an', 'ch', 'dd', 'dn', 'dl', 'jk', 'la', 'ld', 'py'];
  const princely = ['rj', 'gj', 'mp', 'ka', 'kl', 'hp', 'jk', 'la'];
  const british = ['wb', 'br', 'up', 'mh', 'tn', 'as', 'od', 'pb'];

  const makeColorMap = (ids: string[], color: string) => {
    const map: Record<string, string> = {};
    ids.forEach(id => { map[id] = color; });
    return map;
  };

  // Patchwork: British provinces in blue, everything else in amber shades (princely)
  const patchwork: Record<string, string> = {};
  indiaMap.locations.forEach(loc => {
    if (british.includes(loc.id)) {
      patchwork[loc.id] = INDIA_COLORS.britishProvince;
    } else {
      // Vary amber/gold for princely states
      const hue = 30 + (loc.id.charCodeAt(0) % 20);
      const sat = 45 + (loc.id.charCodeAt(1) % 25);
      const lig = 45 + (loc.id.charCodeAt(0) % 15);
      patchwork[loc.id] = `hsl(${hue}, ${sat}%, ${lig}%)`;
    }
  });

  // Integration: most in one color, holdouts in red
  const patel: Record<string, string> = {};
  indiaMap.locations.forEach(loc => {
    if (['jk', 'la'].includes(loc.id)) {
      patel[loc.id] = INDIA_COLORS.holdout;
    } else {
      patel[loc.id] = 'hsl(210, 40%, 45%)';
    }
  });

  // ABCD classification
  const abcd: Record<string, string> = {};
  const partA = ['as', 'br', 'mh', 'mp', 'tn', 'od', 'pb', 'up', 'wb'];
  const partB = ['jk', 'la', 'hp', 'rj', 'ka', 'kl', 'tg', 'ap'];
  indiaMap.locations.forEach(loc => {
    if (partA.includes(loc.id)) abcd[loc.id] = INDIA_COLORS.partA;
    else if (partB.includes(loc.id)) abcd[loc.id] = INDIA_COLORS.partB;
    else if (['an', 'ld', 'dd', 'dn', 'py', 'ch'].includes(loc.id)) abcd[loc.id] = INDIA_COLORS.partD;
    else abcd[loc.id] = INDIA_COLORS.partC;
  });

  // Linguistic
  const linguistic: Record<string, string> = {};
  indiaMap.locations.forEach(loc => {
    if (hindi.includes(loc.id)) linguistic[loc.id] = INDIA_COLORS.hindiBelt;
    else if (dravidian.includes(loc.id)) linguistic[loc.id] = INDIA_COLORS.dravidian;
    else if (northeast.includes(loc.id)) linguistic[loc.id] = INDIA_COLORS.northeast;
    else if (western.includes(loc.id)) linguistic[loc.id] = INDIA_COLORS.western;
    else if (eastern.includes(loc.id)) linguistic[loc.id] = 'hsl(150, 35%, 45%)';
    else linguistic[loc.id] = 'hsl(220, 25%, 40%)';
  });

  // Modern - same as linguistic but with some tweaks
  const modern: Record<string, string> = { ...linguistic };
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
})();

// States to hide when showing pre-2000 eras (they didn't exist yet)
const ERA_HIDDEN: Record<string, string[]> = {
  patchwork: [],
  midnight: [],
  patel: [],
  holdouts: [],
  abcd: [],
  linguistic: ['tg', 'jh', 'cg', 'uk', 'la'], // Telangana, Jharkhand, Chhattisgarh, Uttarakhand, Ladakh didn't exist
  splits: ['la'], // Ladakh UT created 2019
};

export const IndiaMap: React.FC<IndiaMapProps> = ({ era, highlightIds = [], className = '' }) => {
  const colorMap = ERA_COLORS[era] || ERA_COLORS.present;
  const hiddenIds = ERA_HIDDEN[era] || [];
  const showMosaic = era === 'patchwork' || era === 'midnight';

  // For patchwork era, generate small tiles to represent 500+ tiny princely states
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
      {/* Mosaic tiles behind the map for patchwork era */}
      {showMosaic && mosaicTiles.map((tile, i) => (
        <motion.rect
          key={`tile-${i}`}
          x={tile.x}
          y={tile.y}
          width={tile.w}
          height={tile.h}
          fill={tile.color}
          fillOpacity={0.4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: i * 0.003 }}
        />
      ))}

      {/* Actual state paths */}
      <AnimatePresence mode="wait">
        {indiaMap.locations
          .filter(loc => !hiddenIds.includes(loc.id))
          .map((location, i) => {
            const isHighlighted = highlightIds.includes(location.id);
            const fill = colorMap[location.id] || 'hsl(220, 20%, 30%)';

            return (
              <motion.path
                key={`${era}-${location.id}`}
                d={location.path}
                fill={fill}
                fillOpacity={isHighlighted ? 0.9 : 0.65}
                stroke={isHighlighted ? 'hsl(0, 0%, 95%)' : 'hsl(40, 20%, 30%)'}
                strokeWidth={isHighlighted ? 1.5 : 0.5}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  fillOpacity: isHighlighted ? [0.9, 0.5, 0.9] : 0.65,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.01,
                  fillOpacity: isHighlighted ? { duration: 1.5, repeat: Infinity } : {},
                }}
              >
                <title>{location.name}</title>
              </motion.path>
            );
          })}
      </AnimatePresence>

      {/* State labels for present era */}
      {(era === 'present' || era === 'india-epilogue') && indiaMap.locations
        .filter(loc => !['an', 'ld', 'dd', 'dn', 'ch', 'py', 'la'].includes(loc.id))
        .map(location => {
          // Approximate center from path bounding box
          const nums = location.path.match(/-?\d+\.?\d*/g)?.map(Number) || [];
          if (nums.length < 4) return null;
          // Simple centroid from first few coordinates
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 2 }}
              style={{ pointerEvents: 'none' }}
            >
              {location.id.toUpperCase()}
            </motion.text>
          );
        })}
    </svg>
  );
};
