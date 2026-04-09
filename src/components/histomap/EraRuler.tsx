import React, { useMemo } from 'react';
import { formatYear, ESSAY_WINDOWS, MIN_YEAR, MAX_YEAR, yearToProgress } from './histomapData';

interface Props {
  totalHeight: number;
  currentYear: number;
}

// Major ticks every 500 years, minor every 100
const MAJOR_INTERVAL = 500;
const MINOR_INTERVAL = 100;

export default function EraRuler({ totalHeight, currentYear }: Props) {
  const ticks = useMemo(() => {
    const result: { year: number; y: number; major: boolean }[] = [];
    for (let yr = Math.ceil(MIN_YEAR / MINOR_INTERVAL) * MINOR_INTERVAL; yr <= MAX_YEAR; yr += MINOR_INTERVAL) {
      const progress = yearToProgress(yr);
      result.push({
        year: yr,
        y: progress * totalHeight,
        major: yr % MAJOR_INTERVAL === 0,
      });
    }
    return result;
  }, [totalHeight]);

  const essayDots = useMemo(() => {
    return ESSAY_WINDOWS.map(ew => {
      const midYear = (ew.startYear + ew.endYear) / 2;
      return {
        essayId: ew.essayId,
        y: yearToProgress(midYear) * totalHeight,
        status: ew.status,
        title: ew.title,
      };
    });
  }, [totalHeight]);

  return (
    <div className="relative h-full" style={{ width: 60 }}>
      {/* Vertical line */}
      <div className="absolute left-[30px] top-0 bottom-0 w-px bg-foreground/20" />

      {ticks.map(tick => (
        <div
          key={tick.year}
          className="absolute left-0 flex items-center"
          style={{ top: tick.y, transform: 'translateY(-50%)' }}
        >
          {tick.major ? (
            <>
              <span className="text-[9px] font-mono text-foreground/50 w-[26px] text-right pr-1 select-none">
                {formatYear(tick.year)}
              </span>
              <div className="w-[8px] h-px bg-foreground/40" />
            </>
          ) : (
            <>
              <span className="w-[26px]" />
              <div className="w-[4px] h-px bg-foreground/15" />
            </>
          )}
        </div>
      ))}

      {/* Essay dots */}
      {essayDots.map(dot => (
        <div
          key={dot.essayId}
          className="absolute"
          style={{ top: dot.y, left: 37, transform: 'translateY(-50%)' }}
          title={dot.title}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              dot.status === 'live' ? 'bg-amber-400' : 'bg-foreground/25'
            }`}
          />
        </div>
      ))}
    </div>
  );
}
