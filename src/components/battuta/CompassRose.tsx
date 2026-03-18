import React from 'react';
import { IB } from '@/components/visuals/battutaMapData';

interface CompassRoseProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
  animated?: boolean;
}

export const CompassRose = ({
  size = 120,
  color = IB.SAFFRON,
  opacity = 0.08,
  className = '',
  animated = false,
}: CompassRoseProps) => {
  const r = size / 2;
  const points8 = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 45 * Math.PI) / 180 - Math.PI / 2;
    const outerR = i % 2 === 0 ? r * 0.9 : r * 0.5;
    return `${r + outerR * Math.cos(angle)},${r + outerR * Math.sin(angle)}`;
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ opacity }}
    >
      {animated ? (
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${r} ${r}`}
            to={`360 ${r} ${r}`}
            dur="120s"
            repeatCount="indefinite"
          />
          <polygon
            points={points8.join(' ')}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
          />
          {/* Inner ring */}
          <circle cx={r} cy={r} r={r * 0.3} fill="none" stroke={color} strokeWidth={0.8} />
          <circle cx={r} cy={r} r={r * 0.08} fill={color} />
          {/* Cardinal lines */}
          {[0, 90, 180, 270].map(deg => (
            <line
              key={deg}
              x1={r}
              y1={r}
              x2={r + r * 0.95 * Math.cos((deg - 90) * Math.PI / 180)}
              y2={r + r * 0.95 * Math.sin((deg - 90) * Math.PI / 180)}
              stroke={color}
              strokeWidth={0.5}
            />
          ))}
        </g>
      ) : (
        <g>
          <polygon
            points={points8.join(' ')}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
          />
          <circle cx={r} cy={r} r={r * 0.3} fill="none" stroke={color} strokeWidth={0.8} />
          <circle cx={r} cy={r} r={r * 0.08} fill={color} />
          {[0, 90, 180, 270].map(deg => (
            <line
              key={deg}
              x1={r}
              y1={r}
              x2={r + r * 0.95 * Math.cos((deg - 90) * Math.PI / 180)}
              y2={r + r * 0.95 * Math.sin((deg - 90) * Math.PI / 180)}
              stroke={color}
              strokeWidth={0.5}
            />
          ))}
        </g>
      )}
    </svg>
  );
};
