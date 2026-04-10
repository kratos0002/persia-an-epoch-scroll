import React, { useMemo } from 'react';
import { CIVILIZATIONS, CIV_IDS, getCivWeightsAtYear, formatYear } from './histomapData';

interface Props {
  year: number;
}

export default function StreamCrossSection({ year }: Props) {
  const segments = useMemo(() => {
    const weights = getCivWeightsAtYear(year);
    const total = CIV_IDS.reduce((sum, id) => sum + weights[id], 0);
    return CIV_IDS
      .map(id => ({
        id,
        civ: CIVILIZATIONS.find(c => c.id === id)!,
        weight: weights[id],
        pct: total > 0 ? (weights[id] / total) * 100 : 0,
      }))
      .filter(s => s.pct > 0.5)
      .sort((a, b) => b.pct - a.pct);
  }, [year]);

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-mono text-foreground/50 uppercase tracking-wider">
        Power Distribution · {formatYear(Math.round(year))}
      </h4>
      {/* Proportional bar */}
      <div className="flex h-6 rounded-md overflow-hidden border border-foreground/10">
        {segments.map(s => (
          <div
            key={s.id}
            className="h-full transition-all duration-500 relative group"
            style={{ width: `${s.pct}%`, background: s.civ.color }}
            title={`${s.civ.name}: ${Math.round(s.pct)}%`}
          >
            {s.pct > 8 && (
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-white/90 truncate px-0.5">
                {s.civ.name.split(' ')[0]}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Ranked list */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {segments.slice(0, 8).map(s => (
          <div key={s.id} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.civ.color }} />
            <span className="text-xs text-foreground/70 truncate">{s.civ.name}</span>
            <span className="text-xs font-mono text-foreground/40 ml-auto">{Math.round(s.pct)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
