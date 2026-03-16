import React from 'react';

/**
 * SVG ornamental border inspired by Indian miniature painting manuscripts.
 * Renders lotus-corner rosettes and vine-runner side borders.
 */
interface MiniatureBorderProps {
  children: React.ReactNode;
  className?: string;
}

/* Devanagari numerals for folio numbering */
const DEVANAGARI = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
export const toDevanagari = (n: number): string =>
  String(n).split('').map(d => DEVANAGARI[parseInt(d)] || d).join('');

/* Lotus rosette for corners */
const LotusRosette = ({ x, y, size = 18 }: { x: number; y: number; size?: number }) => {
  const petals = 8;
  const r = size / 2;
  return (
    <g transform={`translate(${x}, ${y})`}>
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals;
        return (
          <ellipse
            key={i}
            cx={0}
            cy={-r * 0.55}
            rx={r * 0.28}
            ry={r * 0.52}
            fill="hsl(8, 78%, 48%)"
            fillOpacity={0.7}
            stroke="hsl(43, 90%, 52%)"
            strokeWidth={0.5}
            transform={`rotate(${angle})`}
          />
        );
      })}
      <circle cx={0} cy={0} r={r * 0.22} fill="hsl(43, 90%, 52%)" />
    </g>
  );
};

export const MiniatureBorder = ({ children, className = '' }: MiniatureBorderProps) => {
  const borderColor = 'hsl(43, 90%, 52%)';
  const innerColor = 'hsl(8, 78%, 48%)';

  return (
    <div className={`relative ${className}`}>
      {/* SVG frame overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 400 600"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Outer gold rule */}
        <rect x={4} y={4} width={392} height={592} rx={2} stroke={borderColor} strokeWidth={1.5} opacity={0.6} />
        {/* Inner vermillion rule */}
        <rect x={12} y={12} width={376} height={576} rx={1} stroke={innerColor} strokeWidth={0.8} opacity={0.5} />
        {/* Decorative double line */}
        <rect x={16} y={16} width={368} height={568} rx={1} stroke={borderColor} strokeWidth={0.4} opacity={0.3} />

        {/* Corner rosettes */}
        <LotusRosette x={12} y={12} size={16} />
        <LotusRosette x={388} y={12} size={16} />
        <LotusRosette x={12} y={588} size={16} />
        <LotusRosette x={388} y={588} size={16} />

        {/* Top vine runner */}
        <path
          d="M 40 8 Q 100 -2 150 8 Q 200 18 250 8 Q 300 -2 360 8"
          stroke={borderColor}
          strokeWidth={0.6}
          opacity={0.35}
          fill="none"
        />
        {/* Bottom vine runner */}
        <path
          d="M 40 592 Q 100 602 150 592 Q 200 582 250 592 Q 300 602 360 592"
          stroke={borderColor}
          strokeWidth={0.6}
          opacity={0.35}
          fill="none"
        />

        {/* Side vine runners */}
        <path
          d="M 4 60 Q -4 150 4 250 Q 12 350 4 450 Q -4 520 4 540"
          stroke={borderColor}
          strokeWidth={0.5}
          opacity={0.25}
          fill="none"
        />
        <path
          d="M 396 60 Q 404 150 396 250 Q 388 350 396 450 Q 404 520 396 540"
          stroke={borderColor}
          strokeWidth={0.5}
          opacity={0.25}
          fill="none"
        />
      </svg>

      {/* Content with inner padding for the border */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};
