import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NATIONS, COALITION_PHASES, NationStatus } from './napoleonData';

const BLUE = 'hsl(220, 65%, 45%)';
const RED = 'hsl(0, 65%, 48%)';
const GOLD = 'hsl(43, 70%, 50%)';
const CONQUERED_BLUE = 'hsl(220, 55%, 35%)';
const SMOKE = 'hsl(220, 8%, 35%)';

const STATUS_META: Record<NationStatus, { color: string; label: string; glow: string }> = {
  france:    { color: BLUE,           label: 'France',    glow: '0 0 20px hsla(220,65%,45%,0.5)' },
  allied:    { color: GOLD,           label: 'Allied',    glow: '0 0 14px hsla(43,70%,50%,0.4)' },
  enemy:     { color: RED,            label: 'Enemy',     glow: '0 0 14px hsla(0,65%,48%,0.4)' },
  conquered: { color: CONQUERED_BLUE, label: 'Conquered', glow: '0 0 8px hsla(220,65%,30%,0.3)' },
  neutral:   { color: SMOKE,          label: 'Neutral',   glow: 'none' },
};

interface CoalitionBoardProps {
  phase: number;
}

export const CoalitionBoard = ({ phase }: CoalitionBoardProps) => {
  const clampedPhase = Math.max(0, Math.min(8, Math.round(phase)));
  const statuses = COALITION_PHASES[clampedPhase] || COALITION_PHASES[0];

  const franceScale = clampedPhase >= 4 && clampedPhase <= 5 ? 1.12 : clampedPhase >= 7 ? 0.92 : 1;

  // Count how many nations changed status from previous phase
  const prevStatuses = COALITION_PHASES[Math.max(0, clampedPhase - 1)] || COALITION_PHASES[0];
  const changedIds = useMemo(() => {
    const changed = new Set<string>();
    NATIONS.forEach(n => {
      if (statuses[n.id] !== prevStatuses[n.id]) changed.add(n.id);
    });
    return changed;
  }, [clampedPhase]);

  // Collect active legend statuses (only show what's on screen)
  const activeStatuses = useMemo(() => {
    const seen = new Set<NationStatus>();
    NATIONS.forEach(n => seen.add(statuses[n.id] || 'neutral'));
    return Array.from(seen).sort((a, b) => {
      const order: NationStatus[] = ['france', 'allied', 'enemy', 'conquered', 'neutral'];
      return order.indexOf(a) - order.indexOf(b);
    });
  }, [clampedPhase]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
      {/* Grid */}
      <div className="relative grid gap-2 sm:gap-3" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', maxWidth: '550px', width: '100%' }}>
        {NATIONS.map(nation => {
          const status = statuses[nation.id] || 'neutral';
          const meta = STATUS_META[status];
          const scale = nation.id === 'france' ? franceScale
            : status === 'conquered' ? 0.88
            : status === 'enemy' ? 1.02
            : 1;
          const isConquered = status === 'conquered';
          const justChanged = changedIds.has(nation.id);

          return (
            <motion.div
              key={nation.id}
              className="relative rounded-lg overflow-hidden flex flex-col items-center justify-center font-body"
              style={{
                gridColumn: nation.gridCol,
                gridRow: nation.gridRow,
                aspectRatio: '1',
              }}
              animate={{
                scale,
                opacity: status === 'neutral' ? 0.35 : 1,
                boxShadow: meta.glow,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Background fill */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{ background: `${meta.color}${status === 'neutral' ? '0a' : '20'}` }}
                transition={{ duration: 0.6 }}
              />

              {/* Border */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ border: `2px ${isConquered ? 'dashed' : 'solid'} transparent` }}
                animate={{
                  borderColor: meta.color,
                  opacity: isConquered ? 0.5 : 0.8,
                }}
                transition={{ duration: 0.6 }}
              />

              {/* Flash ring on status change */}
              {justChanged && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{ border: `3px solid ${meta.color}` }}
                  initial={{ opacity: 0.9, scale: 1.1 }}
                  animate={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 1.2 }}
                />
              )}

              {/* Flag stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                {nation.flagColors.map((fc, i) => (
                  <div key={i} className="flex-1" style={{ background: fc, opacity: 0.7 }} />
                ))}
              </div>

              {/* Country name — show full name, not just code */}
              <motion.span
                className="relative z-10 text-[9px] sm:text-[11px] font-semibold tracking-wide text-center leading-tight px-1"
                animate={{ color: meta.color }}
                transition={{ duration: 0.6 }}
              >
                {nation.id === 'france' ? 'France' : nation.shortName}
              </motion.span>
              <motion.span
                className="relative z-10 text-[7px] sm:text-[8px] mt-0.5 text-center leading-tight"
                animate={{ color: meta.color, opacity: status === 'neutral' ? 0.4 : 0.6 }}
                transition={{ duration: 0.6 }}
              >
                {nation.id === 'france' ? '' : nation.name}
              </motion.span>

              {/* Conquered: small FR watermark */}
              {isConquered && (
                <motion.div
                  className="absolute bottom-1 right-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-[7px] font-bold tracking-wider" style={{ color: BLUE }}>FR</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Phase label + Legend */}
      <div className="flex flex-col items-center gap-2 max-w-[550px] w-full">
        <AnimatePresence mode="wait">
          <motion.p
            className="text-[10px] tracking-[0.3em] uppercase font-body"
            style={{ color: SMOKE }}
            key={clampedPhase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
          >
            {PHASE_LABELS[clampedPhase]}
          </motion.p>
        </AnimatePresence>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {activeStatuses.map(status => (
            <div key={status} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{
                  background: STATUS_META[status].color,
                  border: status === 'conquered' ? `1px dashed ${STATUS_META[status].color}` : 'none',
                  opacity: status === 'neutral' ? 0.4 : 0.8,
                }}
              />
              <span className="text-[9px] font-body tracking-wide" style={{ color: STATUS_META[status].color, opacity: 0.7 }}>
                {STATUS_META[status].label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PHASE_LABELS: Record<number, string> = {
  0: 'Europe Before the Storm',
  1: 'The Revolution — 1789',
  2: 'First Coalition — 1792',
  3: 'Italian Campaigns — 1796',
  4: 'The Empire — 1804',
  5: 'Zenith: Tilsit — 1807',
  6: 'Spain & Russia Turn — 1808',
  7: 'Battle of Nations — 1813',
  8: 'Waterloo — 1815',
};
