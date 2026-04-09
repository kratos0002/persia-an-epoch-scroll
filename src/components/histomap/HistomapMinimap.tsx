import React, { useCallback, useRef } from 'react';
import * as d3 from 'd3';
import { CIVILIZATIONS, CIV_IDS, TIME_SERIES, MIN_YEAR, MAX_YEAR } from './histomapData';

interface Props {
  viewportTop: number;  // 0-1
  viewportHeight: number; // 0-1 fraction of total visible
  onJump: (progress: number) => void;
}

const MINI_W = 48;
const MINI_H = 200;

export default function HistomapMinimap({ viewportTop, viewportHeight, onJump }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = (e.clientY - rect.top) / rect.height;
    onJump(Math.max(0, Math.min(1, y)));
  }, [onJump]);

  // Simple colored bars as minimap
  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 rounded-md overflow-hidden border border-foreground/20 bg-background/80 backdrop-blur-sm cursor-pointer shadow-lg"
      style={{ width: MINI_W, height: MINI_H }}
      onClick={handleClick}
    >
      {/* Simplified stream blocks */}
      <div className="absolute inset-0 flex">
        {CIV_IDS.slice(0, 6).map((civId, i) => {
          const civ = CIVILIZATIONS.find(c => c.id === civId)!;
          return (
            <div
              key={civId}
              className="flex-1 h-full opacity-30"
              style={{ background: civ.color }}
            />
          );
        })}
      </div>

      {/* Viewport indicator */}
      <div
        className="absolute left-0 right-0 border border-amber-400 bg-amber-400/15 rounded-sm"
        style={{
          top: `${viewportTop * 100}%`,
          height: `${Math.max(viewportHeight * 100, 5)}%`,
        }}
      />

      {/* Labels */}
      <span className="absolute top-1 left-1 text-[7px] font-mono text-foreground/40">3000 BCE</span>
      <span className="absolute bottom-1 left-1 text-[7px] font-mono text-foreground/40">2024</span>
    </div>
  );
}
