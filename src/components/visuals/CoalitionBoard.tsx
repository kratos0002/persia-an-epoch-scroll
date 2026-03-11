import React from 'react';
import { motion } from 'framer-motion';
import { NATIONS, COALITION_PHASES, NationStatus } from './napoleonData';

const BLUE = 'hsl(220, 65%, 45%)';
const RED = 'hsl(0, 65%, 48%)';
const GOLD = 'hsl(43, 70%, 50%)';
const SMOKE = 'hsl(220, 8%, 35%)';
const MIDNIGHT = 'hsl(225, 30%, 12%)';

function getStatusColor(status: NationStatus): string {
  switch (status) {
    case 'france':    return BLUE;
    case 'allied':    return GOLD;
    case 'enemy':     return RED;
    case 'conquered': return 'hsl(220, 65%, 30%)';
    case 'neutral':   return SMOKE;
  }
}

function getStatusGlow(status: NationStatus): string {
  switch (status) {
    case 'france':    return '0 0 20px hsla(220,65%,45%,0.5)';
    case 'allied':    return '0 0 14px hsla(43,70%,50%,0.4)';
    case 'enemy':     return '0 0 14px hsla(0,65%,48%,0.4)';
    case 'conquered': return '0 0 8px hsla(220,65%,30%,0.3)';
    case 'neutral':   return 'none';
  }
}

function getScale(status: NationStatus, id: string): number {
  if (id === 'france') {
    // France grows during empire phases
    return 1;
  }
  if (status === 'conquered') return 0.85;
  if (status === 'enemy') return 1.02;
  return 1;
}

interface CoalitionBoardProps {
  phase: number;
}

export const CoalitionBoard = ({ phase }: CoalitionBoardProps) => {
  const clampedPhase = Math.max(0, Math.min(8, Math.round(phase)));
  const statuses = COALITION_PHASES[clampedPhase] || COALITION_PHASES[0];

  // France gets bigger at phase 4-5
  const franceScale = clampedPhase >= 4 && clampedPhase <= 5 ? 1.15 : clampedPhase >= 7 ? 0.9 : 1;

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative grid gap-2 sm:gap-3" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', maxWidth: '600px', width: '100%' }}>
        {NATIONS.map(nation => {
          const status = statuses[nation.id] || 'neutral';
          const color = getStatusColor(status);
          const glow = getStatusGlow(status);
          const scale = nation.id === 'france' ? franceScale : getScale(status, nation.id);
          const isConquered = status === 'conquered';

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
                opacity: status === 'neutral' ? 0.4 : 1,
                boxShadow: glow,
                borderColor: color,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Background */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{ background: `${color}22` }}
                transition={{ duration: 0.6 }}
              />

              {/* Border */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ border: `2px solid` }}
                animate={{
                  borderColor: color,
                  borderStyle: isConquered ? 'dashed' : 'solid',
                  opacity: isConquered ? 0.5 : 0.8,
                }}
                transition={{ duration: 0.6 }}
              />

              {/* Flag stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                {nation.flagColors.map((fc, i) => (
                  <div key={i} className="flex-1" style={{ background: fc, opacity: 0.7 }} />
                ))}
              </div>

              {/* Name */}
              <motion.span
                className="relative z-10 text-[10px] sm:text-xs font-semibold tracking-wide text-center leading-tight px-1"
                animate={{ color }}
                transition={{ duration: 0.6 }}
              >
                {nation.shortName}
              </motion.span>
              <motion.span
                className="relative z-10 text-[7px] sm:text-[9px] opacity-60 mt-0.5 text-center leading-tight hidden sm:block"
                animate={{ color }}
                transition={{ duration: 0.6 }}
              >
                {nation.name}
              </motion.span>

              {/* Conquered overlay */}
              {isConquered && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-[8px] font-bold tracking-widest uppercase" style={{ color: BLUE, opacity: 0.6 }}>
                    FR
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Phase label */}
        <div className="col-span-5 text-center mt-2">
          <motion.p
            className="text-[10px] tracking-[0.3em] uppercase font-body"
            style={{ color: SMOKE }}
            key={clampedPhase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            {PHASE_LABELS[clampedPhase]}
          </motion.p>
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
