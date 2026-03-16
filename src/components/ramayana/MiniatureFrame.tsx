import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';

/*
 * MiniatureFrame — ornamental SVG border inspired by Indian miniature painting
 * hashiya (manuscript margin decoration). Uses a multi-stop gold gradient on
 * stylized floral corner pieces and thin edge lines.
 *
 * Variants:
 *   full         — all four corners + edge lines + optional shimmer
 *   corners-only — just the four corner ornaments
 *   top-bottom   — horizontal edge lines with corner accents
 */

interface MiniatureFrameProps {
  children: ReactNode;
  variant?: 'full' | 'corners-only' | 'top-bottom';
  className?: string;
  shimmer?: boolean;
  /** Padding inside the frame (default 0) */
  inset?: number;
}

/* ── Gold gradient stops ── */
const GOLD_STOPS = (
  <>
    <stop offset="0%" stopColor="#cfc09f" />
    <stop offset="25%" stopColor="#ffecb3" />
    <stop offset="50%" stopColor="#f0be79" />
    <stop offset="75%" stopColor="#8f653b" />
    <stop offset="100%" stopColor="#cfc09f" />
  </>
);

/*
 * Floral corner ornament — a stylized lotus/palmette motif.
 * Drawn in a 60x60 viewBox, positioned at each corner via transform.
 */
const CornerOrnament = ({ transform, opacity = 0.5 }: { transform: string; opacity?: number }) => (
  <g transform={transform} opacity={opacity}>
    {/* Central bloom */}
    <path
      d="M0,0 Q8,-14 0,-28 Q-8,-14 0,0Z"
      fill="none" stroke="url(#goldGrad)" strokeWidth="1"
    />
    <path
      d="M0,0 Q14,-8 28,0 Q14,8 0,0Z"
      fill="none" stroke="url(#goldGrad)" strokeWidth="1"
    />
    {/* Outer petals */}
    <path
      d="M0,0 Q12,-20 6,-32 Q-2,-18 0,0Z"
      fill="url(#goldGrad)" fillOpacity="0.08" stroke="url(#goldGrad)" strokeWidth="0.5"
    />
    <path
      d="M0,0 Q20,-12 32,-6 Q18,2 0,0Z"
      fill="url(#goldGrad)" fillOpacity="0.08" stroke="url(#goldGrad)" strokeWidth="0.5"
    />
    {/* Curling vine tendrils */}
    <path
      d="M0,-28 Q-6,-36 -2,-42 Q2,-36 6,-42"
      fill="none" stroke="url(#goldGrad)" strokeWidth="0.6" strokeLinecap="round"
    />
    <path
      d="M28,0 Q36,-6 42,-2 Q36,2 42,6"
      fill="none" stroke="url(#goldGrad)" strokeWidth="0.6" strokeLinecap="round"
    />
    {/* Center dot */}
    <circle r="2" fill="url(#goldGrad)" fillOpacity="0.4" />
  </g>
);

export const MiniatureFrame: React.FC<MiniatureFrameProps> = ({
  children,
  variant = 'full',
  className = '',
  shimmer = false,
  inset = 0,
}) => {
  const showEdges = variant === 'full' || variant === 'top-bottom';
  const showCorners = variant === 'full' || variant === 'corners-only';

  return (
    <div className={`relative ${className}`}>
      {/* The SVG frame — absolutely positioned over the content */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            {GOLD_STOPS}
          </linearGradient>
          <linearGradient id="goldGradH" x1="0%" y1="0%" x2="100%" y2="0%">
            {GOLD_STOPS}
          </linearGradient>
          <linearGradient id="goldGradV" x1="0%" y1="0%" x2="0%" y2="100%">
            {GOLD_STOPS}
          </linearGradient>
        </defs>

        {/* ── Edge lines ── */}
        {showEdges && (
          <>
            {/* Top edge */}
            <line x1="50" y1="16" x2="calc(100% - 50px)" y2="16"
              stroke="url(#goldGradH)" strokeWidth="0.5" opacity="0.35"
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
            {/* Bottom edge */}
            <line x1="50" y1="calc(100% - 16px)" x2="calc(100% - 50px)" y2="calc(100% - 16px)"
              stroke="url(#goldGradH)" strokeWidth="0.5" opacity="0.35"
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
            {variant === 'full' && (
              <>
                {/* Left edge */}
                <line x1="16" y1="50" x2="16" y2="calc(100% - 50px)"
                  stroke="url(#goldGradV)" strokeWidth="0.5" opacity="0.35"
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                />
                {/* Right edge */}
                <line x1="calc(100% - 16px)" y1="50" x2="calc(100% - 16px)" y2="calc(100% - 50px)"
                  stroke="url(#goldGradV)" strokeWidth="0.5" opacity="0.35"
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                />
              </>
            )}
          </>
        )}
      </svg>

      {/* ── Corner ornaments (positioned with CSS) ── */}
      {showCorners && (
        <>
          {/* Top-left */}
          <svg className="absolute top-2 left-2 w-14 h-14 pointer-events-none z-10" viewBox="-45 -45 90 90">
            <defs><linearGradient id="goldGradTL" x1="0%" y1="0%" x2="100%" y2="100%">{GOLD_STOPS}</linearGradient></defs>
            <CornerOrnament transform="rotate(135)" opacity={0.45} />
          </svg>
          {/* Top-right */}
          <svg className="absolute top-2 right-2 w-14 h-14 pointer-events-none z-10" viewBox="-45 -45 90 90">
            <defs><linearGradient id="goldGradTR" x1="0%" y1="0%" x2="100%" y2="100%">{GOLD_STOPS}</linearGradient></defs>
            <CornerOrnament transform="rotate(-135)" opacity={0.45} />
          </svg>
          {/* Bottom-left */}
          <svg className="absolute bottom-2 left-2 w-14 h-14 pointer-events-none z-10" viewBox="-45 -45 90 90">
            <defs><linearGradient id="goldGradBL" x1="0%" y1="0%" x2="100%" y2="100%">{GOLD_STOPS}</linearGradient></defs>
            <CornerOrnament transform="rotate(45)" opacity={0.45} />
          </svg>
          {/* Bottom-right */}
          <svg className="absolute bottom-2 right-2 w-14 h-14 pointer-events-none z-10" viewBox="-45 -45 90 90">
            <defs><linearGradient id="goldGradBR" x1="0%" y1="0%" x2="100%" y2="100%">{GOLD_STOPS}</linearGradient></defs>
            <CornerOrnament transform="rotate(-45)" opacity={0.45} />
          </svg>
        </>
      )}

      {/* ── Shimmer sweep ── */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute top-0 h-full w-[30%]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,236,179,0.04), transparent)',
            }}
            animate={{ left: ['-30%', '130%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
          />
        </motion.div>
      )}

      {/* ── Content ── */}
      <div style={{ padding: inset }}>
        {children}
      </div>
    </div>
  );
};
