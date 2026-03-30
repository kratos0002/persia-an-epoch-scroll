import React, { useMemo } from 'react';
import { WarPhase } from './kurukshetraData';

interface YantraGridProps {
  phase: WarPhase;
  className?: string;
}

/** Background sacred geometry grid that degrades with phase */
export const YantraGrid = ({ phase, className = '' }: YantraGridProps) => {
  const crack = phase === 1 ? 0 : phase === 2 ? 0.3 : phase === 3 ? 0.7 : 1;
  const opacity = phase === 1 ? 0.08 : phase === 2 ? 0.06 : phase === 3 ? 0.04 : 0.02;

  const jitter = (seed: number) => {
    if (crack === 0) return 0;
    return (Math.sin(seed * 1337.7) * crack * 3);
  };

  const lines = useMemo(() => {
    const result: React.ReactNode[] = [];
    const cx = 50, cy = 50;

    // Concentric squares
    [40, 30, 20, 10].forEach((s, i) => {
      const j = jitter(i);
      result.push(
        <rect
          key={`sq-${i}`}
          x={cx - s + j}
          y={cy - s + jitter(i + 10)}
          width={s * 2}
          height={s * 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.3}
          transform={`rotate(${45 * (i % 2) + jitter(i + 5) * 2}, ${cx}, ${cy})`}
          strokeDasharray={crack > 0.5 ? `${8 - crack * 4} ${crack * 3}` : 'none'}
        />
      );
    });

    // Diagonal lines from center
    for (let angle = 0; angle < 360; angle += 45) {
      const rad = (angle * Math.PI) / 180;
      const j = jitter(angle);
      result.push(
        <line
          key={`ray-${angle}`}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(rad) * 45 + j}
          y2={cy + Math.sin(rad) * 45 + jitter(angle + 100)}
          stroke="currentColor"
          strokeWidth={0.2}
          strokeDasharray={crack > 0.3 ? `${6 - crack * 3} ${crack * 2}` : 'none'}
        />
      );
    }

    // Inner triangles
    const triR = 18;
    const tri = [0, 120, 240].map(a => {
      const rad = ((a - 90) * Math.PI) / 180;
      return `${cx + Math.cos(rad) * triR + jitter(a)},${cy + Math.sin(rad) * triR + jitter(a + 50)}`;
    }).join(' ');
    const triInv = [60, 180, 300].map(a => {
      const rad = ((a - 90) * Math.PI) / 180;
      return `${cx + Math.cos(rad) * triR + jitter(a + 200)},${cy + Math.sin(rad) * triR + jitter(a + 250)}`;
    }).join(' ');

    result.push(
      <polygon key="tri-up" points={tri} fill="none" stroke="currentColor" strokeWidth={0.25} />,
      <polygon key="tri-down" points={triInv} fill="none" stroke="currentColor" strokeWidth={0.25} />
    );

    // Central bindu
    result.push(
      <circle key="bindu" cx={cx + jitter(999)} cy={cy + jitter(998)} r={crack > 0.7 ? 0.5 : 1.5} fill="currentColor" opacity={1 - crack * 0.8} />
    );

    return result;
  }, [crack]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-kuru-gold" preserveAspectRatio="xMidYMid slice">
        <g>
          {lines}
        </g>
      </svg>
    </div>
  );
};
