import React from 'react';
import { CIVILIZATIONS } from './histomapData';

interface Props {
  civId: string | null;
  x: number;
  y: number;
}

export default function CivTooltip({ civId, x, y }: Props) {
  if (!civId) return null;
  const civ = CIVILIZATIONS.find(c => c.id === civId);
  if (!civ) return null;

  return (
    <div
      className="fixed z-[100] pointer-events-none bg-background/95 border border-foreground/20 rounded px-2 py-1 shadow-md"
      style={{ left: x + 12, top: y - 10 }}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full" style={{ background: civ.color }} />
        <span className="text-xs font-medium text-foreground">{civ.name}</span>
      </div>
    </div>
  );
}
