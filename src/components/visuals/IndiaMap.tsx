import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import indiaMap from '@svg-maps/india';
import { INDIA_COLORS, type EraId } from './indiaStatesData';

interface IndiaMapProps {
  era: EraId;
  highlightIds?: string[];
  activeNewState?: number;
  className?: string;
}

const hindi = ['up', 'mp', 'rj', 'hr', 'hp', 'ut', 'br', 'jh', 'ct', 'dl'];
const dravidian = ['tn', 'kl', 'ka', 'ap', 'tg'];
const western = ['mh', 'gj', 'ga'];
const eastern = ['wb', 'or'];
const northeast = ['as', 'ar', 'mn', 'ml', 'mz', 'nl', 'tr', 'sk'];
const uts = ['an', 'ch', 'dd', 'dn', 'dl', 'jk', 'ld', 'py'];
const princely = ['rj', 'gj', 'mp', 'ka', 'kl', 'hp', 'jk'];
const british = ['wb', 'br', 'up', 'mh', 'tn', 'as', 'or', 'pb'];

// Split pairs: child states carved from parent states (2000–2019)
const SPLIT_PAIRS = [
  { child: 'ct', parent: 'mp', color: 'hsl(25, 65%, 55%)' },   // Chhattisgarh from MP
  { child: 'ut', parent: 'up', color: 'hsl(25, 60%, 52%)' },   // Uttarakhand from UP
  { child: 'jh', parent: 'br', color: 'hsl(25, 70%, 58%)' },   // Jharkhand from Bihar
  { child: 'tg', parent: 'ap', color: 'hsl(160, 50%, 48%)' },  // Telangana from AP
  { child: 'jk', parent: 'jk', color: 'hsl(210, 55%, 55%)' },  // J&K → 2 UTs (self-split)
];

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
    ['jk', 'gj', 'tg'].includes(id) ? INDIA_COLORS.holdout : 'hsl(210, 40%, 45%)'
  );

  const partA = ['as', 'br', 'mh', 'mp', 'tn', 'or', 'pb', 'up', 'wb'];
  const partB = ['jk', 'hp', 'rj', 'ka', 'kl', 'tg', 'ap'];
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
  linguistic: ['tg', 'jh', 'ct', 'ut'],
  splits: [],
};

export const IndiaMap: React.FC<IndiaMapProps> = ({ era, highlightIds = [], activeNewState = -1, className = '' }) => {
  const colorMap = ERA_COLORS[era] || ERA_COLORS.present;
  const hiddenIds = ERA_HIDDEN[era] || [];
  const showMosaic = era === 'patchwork' || era === 'midnight';
  const isNewStatesEra = era === 'new-states';

  // Build a map of child→parent color for unrevealed splits
  const splitOverrides = useMemo(() => {
    if (!isNewStatesEra) return {};
    const overrides: Record<string, { fill: string; revealed: boolean }> = {};
    SPLIT_PAIRS.forEach((pair, i) => {
      const revealed = i <= activeNewState;
      overrides[pair.child] = {
        fill: revealed ? pair.color : (colorMap[pair.parent] || 'hsl(220, 20%, 30%)'),
        revealed,
      };
    });
    return overrides;
  }, [isNewStatesEra, activeNewState, colorMap]);

  const isSilhouette = era === 'patchwork';

  // Generate mosaic fragments: Voronoi-style irregular polygons for silhouette, simple rects for midnight
  const mosaicFragments = useMemo(() => {
    if (!showMosaic) return [];
    if (!isSilhouette) {
      // Midnight era: simple rect tiles (legacy behavior)
      const tiles: { path: string; color: string; opacity: number }[] = [];
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
        tiles.push({
          path: `M${x},${y} h${w} v${h} h${-w} Z`,
          color: `hsl(${hue}, ${sat}%, 52%)`,
          opacity: 0.4,
        });
      }
      return tiles;
    }

    // Silhouette era: generate ~565 Voronoi-like irregular polygons
    // 1. Scatter seed points with jitter across India bounding box
    let seed = 7;
    const nextRand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

    const COLS = 24;
    const ROWS = 28;
    const cellW = 612 / COLS;
    const cellH = 696 / ROWS;
    const points: { x: number; y: number }[] = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        // Jitter each grid point to create irregularity
        const jx = (nextRand() - 0.5) * cellW * 0.9;
        const jy = (nextRand() - 0.5) * cellH * 0.9;
        points.push({
          x: (col + 0.5) * cellW + jx,
          y: (row + 0.5) * cellH + jy,
        });
      }
    }

    // 2. For each point, create a small irregular polygon (simplified Voronoi cell)
    //    by finding nearby points and computing perpendicular bisector intersections
    //    Simplified: create irregular hexagon-ish shapes around each point
    const fragments: { path: string; color: string; opacity: number; delay: number }[] = [];
    const PALETTE = [
      // Warm princely state colors
      [30, 65, 55], [35, 60, 50], [25, 70, 48], [40, 55, 52], [20, 60, 45],
      // Saffron / gold
      [38, 75, 58], [28, 65, 52], [42, 70, 50], [15, 55, 48], [45, 60, 55],
      // Cool British province colors
      [210, 45, 50], [200, 40, 48], [215, 50, 45], [205, 35, 52],
      // Accent greens, teals
      [150, 40, 42], [160, 35, 48], [170, 45, 40],
      // Deep reds (holdout states)
      [0, 55, 48], [350, 50, 45], [10, 60, 50],
      // Purple northeast
      [280, 35, 45], [270, 40, 42],
    ];

    points.forEach((pt, i) => {
      const r = cellW * 0.45 + nextRand() * cellW * 0.15;
      const sides = 5 + Math.floor(nextRand() * 3); // 5-7 sided polygons
      const angleOffset = nextRand() * Math.PI * 2;

      const verts: string[] = [];
      for (let s = 0; s < sides; s++) {
        const angle = angleOffset + (s / sides) * Math.PI * 2;
        const rr = r * (0.7 + nextRand() * 0.6); // vary radius per vertex
        const vx = pt.x + Math.cos(angle) * rr;
        const vy = pt.y + Math.sin(angle) * rr;
        verts.push(`${vx.toFixed(1)},${vy.toFixed(1)}`);
      }

      const pal = PALETTE[i % PALETTE.length];
      // Vary lightness and saturation per cell
      const lShift = Math.floor((nextRand() - 0.5) * 12);
      const sShift = Math.floor((nextRand() - 0.5) * 10);

      fragments.push({
        path: `M${verts.join(' L')} Z`,
        color: `hsl(${pal[0]}, ${pal[1] + sShift}%, ${pal[2] + lShift}%)`,
        opacity: 0.7 + nextRand() * 0.25,
        delay: (pt.y / 696) * 1.5 + nextRand() * 0.3, // top-to-bottom wave
      });
    });

    return fragments;
  }, [showMosaic, isSilhouette]);

  return (
    <svg
      viewBox={indiaMap.viewBox}
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Silhouette mode: clip mosaic tiles inside India outline */}
      {isSilhouette && (
        <defs>
          <clipPath id="india-silhouette-clip">
            {indiaMap.locations.map(loc => (
              <path key={`clip-${loc.id}`} d={loc.path} />
            ))}
          </clipPath>
          <filter id="silhouette-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="hsl(35, 65%, 50%)" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      {/* Mosaic fragments — Voronoi cells in silhouette mode, rects in midnight */}
      {showMosaic && (
        <g clipPath={isSilhouette ? 'url(#india-silhouette-clip)' : undefined}>
          {mosaicFragments.map((frag, i) => (
            isSilhouette ? (
              <motion.path
                key={`frag-${i}`}
                d={frag.path}
                fill={frag.color}
                stroke="hsl(30, 15%, 20%)"
                strokeWidth={0.4}
                initial={{ fillOpacity: 0, strokeOpacity: 0 }}
                animate={{ fillOpacity: frag.opacity, strokeOpacity: 0.5 }}
                transition={{ duration: 0.6, delay: 'delay' in frag ? (frag.delay as number) : 0, ease: 'easeOut' }}
              />
            ) : (
              <path
                key={`frag-${i}`}
                d={frag.path}
                fill={frag.color}
                fillOpacity={frag.opacity}
              />
            )
          ))}
        </g>
      )}

      {indiaMap.locations
        .filter(loc => !hiddenIds.includes(loc.id))
        .map((location) => {
          const isHighlighted = highlightIds.includes(location.id);
          const hasHighlights = highlightIds.length > 0;
          const splitInfo = splitOverrides[location.id];

          // Silhouette mode: states rendered as subtle dark base beneath Voronoi fragments
          if (isSilhouette) {
            return (
              <motion.path
                key={location.id}
                d={location.path}
                fill="hsl(25, 15%, 15%)"
                fillOpacity={0.6}
                stroke="transparent"
                strokeWidth={0}
              >
                <title>{location.name}</title>
              </motion.path>
            );
          }

          // In new-states era, use split-aware coloring
          let fill = colorMap[location.id] || 'hsl(220, 20%, 30%)';
          let opacity = isHighlighted ? 0.95 : hasHighlights ? 0.25 : 0.65;
          let sw = isHighlighted ? 1.5 : 0.5;
          let strokeColor = isHighlighted ? 'hsl(0, 0%, 95%)' : 'hsl(40, 20%, 30%)';

          if (splitInfo) {
            fill = splitInfo.fill;
            if (splitInfo.revealed) {
              // Revealed child: bright with white border
              opacity = 0.95;
              sw = 2;
              strokeColor = 'hsl(0, 0%, 95%)';
            } else {
              // Unrevealed child: matches parent color, blends in
              opacity = 0.65;
              sw = 0;
              strokeColor = 'transparent';
            }
          } else if (isNewStatesEra && !splitInfo) {
            // Non-split states in new-states era: dim when any split is revealed
            if (activeNewState >= 0) {
              // Check if this is a parent of a revealed split
              const isRevealedParent = SPLIT_PAIRS.some((p, i) => p.parent === location.id && i <= activeNewState);
              opacity = isRevealedParent ? 0.5 : 0.25;
            }
          }

          return (
            <motion.path
              key={location.id}
              d={location.path}
              animate={{
                fill,
                fillOpacity: opacity,
                strokeWidth: sw,
                stroke: strokeColor,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <title>{location.name}</title>
            </motion.path>
          );
        })}

      {(era === 'present' || era === 'india-epilogue') && indiaMap.locations
        .filter(loc => !['an', 'ld', 'dd', 'dn', 'ch', 'py'].includes(loc.id))
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
