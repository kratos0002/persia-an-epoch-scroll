import React from 'react';
import { IB } from '@/components/visuals/battutaMapData';

/**
 * Full-section SVG overlay of faint rhumb lines radiating from 2-3 anchor points.
 * Use as an absolute-positioned background layer.
 */
export const RhumbLineBackground = ({
  color = IB.SAFFRON,
  opacity = 0.04,
  anchors = [
    { x: '20%', y: '30%' },
    { x: '80%', y: '70%' },
  ],
}: {
  color?: string;
  opacity?: number;
  anchors?: { x: string; y: string }[];
}) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" style={{ opacity }}>
    {anchors.map((anchor, ai) => (
      <g key={ai}>
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i * 22.5) * Math.PI / 180;
          const len = 2000;
          return (
            <line key={`${ai}-${i}`}
              x1={anchor.x} y1={anchor.y}
              x2={`calc(${anchor.x} + ${Math.cos(angle) * len}px)`}
              y2={`calc(${anchor.y} + ${Math.sin(angle) * len}px)`}
              stroke={color} strokeWidth={0.5}
            />
          );
        })}
      </g>
    ))}
  </svg>
);

/**
 * Simpler CSS-based rhumb lines using conic-gradient — more performant.
 */
export const RhumbLinesCSS = ({
  color = IB.SAFFRON,
  opacity = 0.035,
  position = 'center',
}: {
  color?: string;
  opacity?: number;
  position?: string;
}) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity }}>
    <div className="absolute" style={{
      width: '200%',
      height: '200%',
      top: '-50%',
      left: '-50%',
      backgroundImage: `repeating-conic-gradient(from 0deg at ${position}, ${color} 0deg 0.3deg, transparent 0.3deg 11.25deg)`,
    }} />
  </div>
);
