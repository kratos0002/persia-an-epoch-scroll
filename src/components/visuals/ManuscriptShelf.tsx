import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Scroll {
  id: string;
  label: string;
  x: number;
  color: string;
  row: number;
  phase: number;
}

const SCROLLS: Scroll[] = [
  // Phase 1 — Greek (gold)
  { id: 'aristotle', label: 'Aristotle', x: 60, color: 'hsl(43, 85%, 55%)', row: 0, phase: 1 },
  { id: 'euclid', label: 'Euclid', x: 110, color: 'hsl(43, 85%, 60%)', row: 0, phase: 1 },
  { id: 'galen', label: 'Galen', x: 160, color: 'hsl(43, 75%, 50%)', row: 0, phase: 1 },
  { id: 'ptolemy', label: 'Ptolemy', x: 210, color: 'hsl(43, 85%, 55%)', row: 0, phase: 1 },
  { id: 'hippocrates', label: 'Hippocrates', x: 260, color: 'hsl(43, 80%, 52%)', row: 0, phase: 1 },
  { id: 'plato', label: 'Plato', x: 310, color: 'hsl(43, 85%, 58%)', row: 0, phase: 1 },
  // Phase 2 — Persian/Sanskrit (teal + amber)
  { id: 'avesta', label: 'Avesta', x: 60, color: 'hsl(170, 45%, 45%)', row: 1, phase: 2 },
  { id: 'shahnama', label: 'Shāhnāma', x: 110, color: 'hsl(170, 50%, 40%)', row: 1, phase: 2 },
  { id: 'arthashastra', label: 'Arthaśāstra', x: 160, color: 'hsl(30, 70%, 50%)', row: 1, phase: 2 },
  { id: 'siddhanta', label: 'Siddhānta', x: 210, color: 'hsl(30, 65%, 55%)', row: 1, phase: 2 },
  { id: 'panchatantra', label: 'Pañcatantra', x: 260, color: 'hsl(170, 40%, 42%)', row: 1, phase: 2 },
  { id: 'charaka', label: 'Charaka', x: 310, color: 'hsl(30, 75%, 48%)', row: 1, phase: 2 },
  // Phase 3 — Overflowing (mixed)
  { id: 'syriac1', label: 'Syriac texts', x: 60, color: 'hsl(215, 55%, 50%)', row: 2, phase: 3 },
  { id: 'nabataean', label: 'Nabataean', x: 110, color: 'hsl(215, 50%, 45%)', row: 2, phase: 3 },
  { id: 'chinese', label: 'Chinese paper', x: 160, color: 'hsl(0, 60%, 50%)', row: 2, phase: 3 },
  { id: 'coptic', label: 'Coptic', x: 210, color: 'hsl(280, 40%, 50%)', row: 2, phase: 3 },
  { id: 'pahlavi', label: 'Pahlavi', x: 260, color: 'hsl(170, 35%, 50%)', row: 2, phase: 3 },
  { id: 'overflow1', label: 'Overflow', x: 310, color: 'hsl(43, 85%, 55%)', row: 2, phase: 3 },
  // Extra overflow on ground
  { id: 'extra1', label: '', x: 80, color: 'hsl(43, 70%, 50%)', row: 3, phase: 3 },
  { id: 'extra2', label: '', x: 140, color: 'hsl(170, 40%, 40%)', row: 3, phase: 3 },
  { id: 'extra3', label: '', x: 200, color: 'hsl(30, 60%, 48%)', row: 3, phase: 3 },
  { id: 'extra4', label: '', x: 260, color: 'hsl(215, 45%, 45%)', row: 3, phase: 3 },
];

const SHELF_Y = [100, 200, 300, 410];
const BOOK_HEIGHT = 65;
const BOOK_WIDTH = 14;

// Pre-compute random values so they don't change on re-render
const SCROLL_RANDOMS = SCROLLS.map((s, i) => ({
  bookH: s.row === 3 ? 12 : BOOK_HEIGHT - ((i * 7 + 3) % 10),
  rotation: s.row === 3 ? -8 + ((i * 13 + 5) % 16) : 0,
}));

interface ManuscriptShelfProps {
  activeStep: number;
  className?: string;
}

export const ManuscriptShelf = ({ activeStep, className }: ManuscriptShelfProps) => {
  const visibleScrolls = useMemo(
    () => SCROLLS.filter(s => s.phase <= activeStep),
    [activeStep]
  );

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <svg viewBox="0 0 400 500" className="w-full h-full max-w-lg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="shelf-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(0 0% 0%)" floodOpacity="0.4" />
          </filter>
          <linearGradient id="shelf-wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(30, 30%, 22%)" />
            <stop offset="100%" stopColor="hsl(30, 25%, 15%)" />
          </linearGradient>
        </defs>

        {/* Shelves */}
        {[0, 1, 2].map(i => (
          <g key={`shelf-${i}`}>
            <rect
              x="30" y={SHELF_Y[i] + BOOK_HEIGHT + 2}
              width="340" height="8"
              rx="1"
              fill="url(#shelf-wood)"
              filter="url(#shelf-shadow)"
            />
            {/* Shelf edge highlight */}
            <rect
              x="30" y={SHELF_Y[i] + BOOK_HEIGHT + 2}
              width="340" height="1.5"
              rx="0.5"
              fill="hsl(30, 35%, 30%)"
              opacity="0.6"
            />
          </g>
        ))}

        {/* Side panels */}
        <rect x="25" y="90" width="5" height="300" rx="1" fill="url(#shelf-wood)" opacity="0.8" />
        <rect x="370" y="90" width="5" height="300" rx="1" fill="url(#shelf-wood)" opacity="0.8" />

        {/* Books / Scrolls */}
        <AnimatePresence initial={false}>
          {visibleScrolls.map((scroll) => {
            const scrollIndex = SCROLLS.indexOf(scroll);
            const y = SHELF_Y[scroll.row];
            const isOverflow = scroll.row === 3;
            const { bookH, rotation } = SCROLL_RANDOMS[scrollIndex];

            return (
              <motion.g
                key={scroll.id}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (scrollIndex % 6) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Book spine */}
                <rect
                  x={scroll.x - BOOK_WIDTH / 2}
                  y={isOverflow ? y : y + (BOOK_HEIGHT - bookH)}
                  width={BOOK_WIDTH}
                  height={isOverflow ? BOOK_WIDTH : bookH}
                  rx="1.5"
                  fill={scroll.color}
                  opacity={0.85}
                  transform={isOverflow ? `rotate(${rotation}, ${scroll.x}, ${y})` : undefined}
                />
                {/* Spine line detail */}
                {!isOverflow && (
                  <line
                    x1={scroll.x}
                    y1={y + (BOOK_HEIGHT - bookH) + 4}
                    x2={scroll.x}
                    y2={y + BOOK_HEIGHT - 4}
                    stroke="hsl(0 0% 0%)"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                )}
                {/* Label */}
                {scroll.label && !isOverflow && (
                  <text
                    x={scroll.x}
                    y={y + BOOK_HEIGHT + 20}
                    textAnchor="middle"
                    fill={scroll.color}
                    fontSize="10"
                    fontFamily="'Cormorant Garamond', serif"
                    fontWeight="600"
                    opacity="0.9"
                  >
                    {scroll.label}
                  </text>
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Empty shelf label when phase 0 */}
        {activeStep === 0 && (
          <motion.text
            x="200" y="250"
            textAnchor="middle"
            fill="hsl(170, 40%, 30%)"
            fontSize="12"
            fontFamily="'Cormorant Garamond', serif"
            opacity="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
          >
            The shelves are empty…
          </motion.text>
        )}
      </svg>
    </div>
  );
};
