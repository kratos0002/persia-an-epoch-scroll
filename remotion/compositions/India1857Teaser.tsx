import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
  Sequence,
} from 'remotion';

/* ── Color Palette (from the essay) ──────────── */
const NAVY = 'hsl(220, 25%, 8%)';
const PAPER = 'hsl(45, 30%, 88%)';
const WIRE = 'hsl(200, 60%, 55%)';
const AMBER = 'hsl(30, 85%, 50%)';
const SCARLET = 'hsl(0, 70%, 48%)';

/* ── City Data ───────────────────────────────── */
interface City {
  name: string;
  date: string;
  /** Normalized position 0-1 within the "map" area */
  nx: number;
  ny: number;
  delay: number; // frames before this city ignites
}

const CITIES: City[] = [
  { name: 'Meerut', date: 'May 10', nx: 0.42, ny: 0.18, delay: 0 },
  { name: 'Delhi', date: 'May 11', nx: 0.36, ny: 0.22, delay: 8 },
  { name: 'Bareilly', date: 'May 31', nx: 0.52, ny: 0.24, delay: 18 },
  { name: 'Kanpur', date: 'Jun 5', nx: 0.50, ny: 0.42, delay: 28 },
  { name: 'Lucknow', date: 'Jun 30', nx: 0.56, ny: 0.38, delay: 36 },
  { name: 'Jhansi', date: 'Jun', nx: 0.38, ny: 0.48, delay: 40 },
  { name: 'Gwalior', date: 'Jun', nx: 0.34, ny: 0.44, delay: 44 },
  { name: 'Allahabad', date: 'Jun 6', nx: 0.60, ny: 0.46, delay: 32 },
];

/** Telegraph stations — the blue signal line */
const TELEGRAPH: { nx: number; ny: number }[] = [
  { nx: 0.85, ny: 0.82 }, // Calcutta
  { nx: 0.68, ny: 0.58 }, // Patna
  { nx: 0.62, ny: 0.50 }, // Benares
  { nx: 0.60, ny: 0.46 }, // Allahabad
  { nx: 0.50, ny: 0.42 }, // Kanpur
  { nx: 0.40, ny: 0.34 }, // Agra
  { nx: 0.36, ny: 0.22 }, // Delhi
];

/* ── Helpers ──────────────────────────────────── */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* ── Main Composition ────────────────────────── */
export const India1857Teaser: React.FC<{ layout: 'desktop' | 'mobile' }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isMobile = layout === 'mobile';

  // Map area dimensions
  const mapW = isMobile ? width * 0.9 : width * 0.55;
  const mapH = isMobile ? height * 0.45 : height * 0.75;
  const mapX = isMobile ? width * 0.05 : width * 0.42;
  const mapY = isMobile ? height * 0.28 : height * 0.12;

  /* ── Phase timing (in frames at 30fps) ───── */
  // 0-30: Title "1857" fades in
  // 15-45: Subtitle fades in
  // 30-120: Cities ignite one by one + telegraph spark travels
  // 120-150: End card with essay title + URL

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = interpolate(frame, [0, 25], [1.15, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });

  // Map elements fade in
  const mapOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });

  // Telegraph spark progress (0-1 along the line)
  const sparkPhaseStart = 35;
  const sparkPhaseEnd = 100;
  const sparkProgress = interpolate(frame, [sparkPhaseStart, sparkPhaseEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  // End card
  const endCardOpacity = interpolate(frame, [118, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mainFadeOut = interpolate(frame, [115, 130], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // India outline — simplified polygon points
  const indiaOutline = [
    [0.30, 0.05], [0.55, 0.05], [0.70, 0.15], [0.85, 0.30],
    [0.90, 0.55], [0.85, 0.75], [0.75, 0.85], [0.55, 0.95],
    [0.45, 0.90], [0.35, 0.80], [0.25, 0.65], [0.15, 0.50],
    [0.12, 0.35], [0.18, 0.18], [0.30, 0.05],
  ].map(([nx, ny]) => `${mapX + nx * mapW},${mapY + ny * mapH}`).join(' ');

  // Outline draw progress
  const outlineProgress = interpolate(frame, [28, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Telegraph line points
  const telegraphPoints = TELEGRAPH.map(t => ({
    x: mapX + t.nx * mapW,
    y: mapY + t.ny * mapH,
  }));

  // Spark position along telegraph
  const sparkIdx = sparkProgress * (telegraphPoints.length - 1);
  const sparkSegment = Math.min(Math.floor(sparkIdx), telegraphPoints.length - 2);
  const sparkT = sparkIdx - sparkSegment;
  const sparkX = telegraphPoints[sparkSegment].x + (telegraphPoints[sparkSegment + 1].x - telegraphPoints[sparkSegment].x) * sparkT;
  const sparkY = telegraphPoints[sparkSegment].y + (telegraphPoints[sparkSegment + 1].y - telegraphPoints[sparkSegment].y) * sparkT;

  // Title positioning
  const titleX = isMobile ? width * 0.5 : width * 0.2;
  const titleY = isMobile ? height * 0.12 : height * 0.35;

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at ${isMobile ? '50% 45%' : '60% 50%'}, hsl(30, 40%, 10%, 0.3) 0%, transparent 60%)`,
        }}
      />

      {/* ── MAIN CONTENT (fades out before end card) ── */}
      <div style={{ opacity: mainFadeOut }}>

        {/* Title: "1857" */}
        <div
          style={{
            position: 'absolute',
            left: titleX,
            top: titleY,
            transform: `translate(-50%, -50%) scale(${titleScale})`,
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 120 : 140,
              fontWeight: 900,
              color: AMBER,
              letterSpacing: '0.05em',
              lineHeight: 1,
              textShadow: `0 0 60px hsl(30, 85%, 50%, 0.3)`,
            }}
          >
            1857
          </div>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 14 : 16,
              letterSpacing: '0.35em',
              color: PAPER,
              opacity: subtitleOpacity,
              marginTop: 12,
              textTransform: 'uppercase',
            }}
          >
            The Signal and the Fire
          </div>
        </div>

        {/* ── MAP AREA ── */}
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width,
            height,
            opacity: mapOpacity,
          }}
        >
          <defs>
            <filter id="glow-amber">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-wire">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="spark-glow">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* India outline */}
          <polygon
            points={indiaOutline}
            fill="none"
            stroke="hsl(45, 20%, 25%)"
            strokeWidth="1.5"
            strokeDasharray={`${outlineProgress * 3000} 3000`}
            opacity={0.5}
          />
          <polygon
            points={indiaOutline}
            fill="hsl(30, 20%, 10%)"
            opacity={outlineProgress * 0.15}
          />

          {/* Telegraph line */}
          <polyline
            points={telegraphPoints.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={WIRE}
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity={interpolate(frame, [30, 40], [0, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />

          {/* Telegraph spark */}
          {frame >= sparkPhaseStart && frame <= sparkPhaseEnd + 10 && (
            <>
              <circle
                cx={sparkX}
                cy={sparkY}
                r={14}
                fill={WIRE}
                filter="url(#spark-glow)"
                opacity={0.6}
              />
              <circle cx={sparkX} cy={sparkY} r={4} fill="white" opacity={0.9} />
            </>
          )}

          {/* Cities igniting */}
          {CITIES.map((city) => {
            const cx = mapX + city.nx * mapW;
            const cy = mapY + city.ny * mapH;
            const igniteFrame = 40 + city.delay;
            const cityProgress = interpolate(frame, [igniteFrame, igniteFrame + 12], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            if (cityProgress <= 0) return null;

            const pulsePhase = Math.max(0, frame - igniteFrame - 12);
            const pulseR = 6 + (pulsePhase % 30) * 0.8;
            const pulseOpacity = 0.4 * (1 - (pulsePhase % 30) / 30);

            return (
              <g key={city.name}>
                {/* Pulse ring */}
                {cityProgress >= 1 && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={pulseR}
                    fill="none"
                    stroke={AMBER}
                    strokeWidth="1.5"
                    opacity={pulseOpacity}
                  />
                )}
                {/* Glow */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={12 * cityProgress}
                  fill={AMBER}
                  filter="url(#glow-amber)"
                  opacity={0.35 * cityProgress}
                />
                {/* Core dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={4 * cityProgress}
                  fill={AMBER}
                  opacity={cityProgress}
                />
                {/* City name */}
                <text
                  x={cx}
                  y={cy - 14}
                  textAnchor="middle"
                  fill={PAPER}
                  fontSize={isMobile ? 11 : 13}
                  fontFamily="Georgia, serif"
                  fontWeight="600"
                  opacity={cityProgress * 0.85}
                >
                  {city.name}
                </text>
                {/* Date */}
                <text
                  x={cx}
                  y={cy + 18}
                  textAnchor="middle"
                  fill={AMBER}
                  fontSize={isMobile ? 8 : 9}
                  fontFamily="Georgia, serif"
                  letterSpacing="0.1em"
                  opacity={cityProgress * 0.6}
                >
                  {city.date}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tagline (appears mid-video) */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? '50%' : '20%',
            bottom: isMobile ? '18%' : '15%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * mainFadeOut,
          }}
        >
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 13 : 15,
              color: PAPER,
              opacity: 0.5,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            The telegraph arrived first.
          </div>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 13 : 15,
              color: AMBER,
              opacity: 0.7,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: 6,
            }}
          >
            The fire followed.
          </div>
        </div>
      </div>

      {/* ── END CARD ── */}
      <AbsoluteFill
        style={{
          opacity: endCardOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 36 : 48,
            fontWeight: 700,
            color: PAPER,
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '80%',
          }}
        >
          The Signal and the Fire
        </div>
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 14 : 16,
            color: AMBER,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginTop: 16,
          }}
        >
          The 1857 Rebellion
        </div>
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 12 : 14,
            color: PAPER,
            opacity: 0.4,
            letterSpacing: '0.15em',
            marginTop: 32,
          }}
        >
          pastlives.site
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
