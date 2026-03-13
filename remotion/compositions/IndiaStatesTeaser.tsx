import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import indiaMap from '@svg-maps/india';

/* ── Color Palette ───────────────────────────── */
const BG = 'hsl(220, 20%, 10%)';
const TEXT = 'hsl(40, 30%, 88%)';
const SAFFRON = 'hsl(40, 60%, 55%)';
const BLUE = 'hsl(210, 40%, 50%)';
const RED = 'hsl(0, 65%, 50%)';
const GREEN = 'hsl(150, 40%, 40%)';
const PURPLE = 'hsl(280, 35%, 45%)';
const ORANGE = 'hsl(25, 55%, 50%)';
const TEAL = 'hsl(200, 45%, 45%)';
const DIM = 'hsl(40, 25%, 60%)';

/* ── State color mapping by region ───────────── */
const STATE_COLORS: Record<string, string> = {
  jk: RED, hp: ORANGE, pb: ORANGE, hr: ORANGE, up: ORANGE,
  ut: SAFFRON, dl: ORANGE, rj: ORANGE, mp: ORANGE, ct: SAFFRON,
  br: ORANGE, jh: SAFFRON, wb: BLUE, or: BLUE, sk: PURPLE,
  gj: TEAL, mh: TEAL, ga: TEAL, dd: TEAL, dn: TEAL,
  ka: GREEN, kl: GREEN, tn: GREEN, ap: GREEN, tg: SAFFRON,
  py: GREEN, ld: GREEN, an: GREEN,
  as: PURPLE, ar: PURPLE, mn: PURPLE, ml: PURPLE,
  mz: PURPLE, nl: PURPLE, tr: PURPLE,
  ch: ORANGE,
};

/* ── Seeded PRNG ─────────────────────────────── */
function mkRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/* ── Generate Voronoi mosaic fragments (same as essay) ── */
const MOSAIC_PALETTE = [
  [30, 65, 55], [35, 60, 50], [25, 70, 48], [40, 55, 52], [20, 60, 45],
  [38, 75, 58], [28, 65, 52], [42, 70, 50], [15, 55, 48], [45, 60, 55],
  [210, 45, 50], [200, 40, 48], [215, 50, 45], [205, 35, 52],
  [150, 40, 42], [160, 35, 48], [170, 45, 40],
  [0, 55, 48], [350, 50, 45], [10, 60, 50],
  [280, 35, 45], [270, 40, 42],
];

interface MosaicFragment {
  path: string;
  color: string;
  opacity: number;
  yNorm: number; // 0-1 normalized y for stagger
}

function generateMosaicFragments(): MosaicFragment[] {
  const rng = mkRng(7);
  const COLS = 24;
  const ROWS = 28;
  const cellW = 612 / COLS;
  const cellH = 696 / ROWS;
  const points: { x: number; y: number }[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const jx = (rng() - 0.5) * cellW * 0.9;
      const jy = (rng() - 0.5) * cellH * 0.9;
      points.push({
        x: (col + 0.5) * cellW + jx,
        y: (row + 0.5) * cellH + jy,
      });
    }
  }

  return points.map((pt, i) => {
    const r = cellW * 0.45 + rng() * cellW * 0.15;
    const sides = 5 + Math.floor(rng() * 3);
    const angleOffset = rng() * Math.PI * 2;
    const verts: string[] = [];

    for (let s = 0; s < sides; s++) {
      const angle = angleOffset + (s / sides) * Math.PI * 2;
      const rr = r * (0.7 + rng() * 0.6);
      const vx = pt.x + Math.cos(angle) * rr;
      const vy = pt.y + Math.sin(angle) * rr;
      verts.push(`${vx.toFixed(1)},${vy.toFixed(1)}`);
    }

    const pal = MOSAIC_PALETTE[i % MOSAIC_PALETTE.length];
    const lShift = Math.floor((rng() - 0.5) * 12);
    const sShift = Math.floor((rng() - 0.5) * 10);

    return {
      path: `M${verts.join(' L')} Z`,
      color: `hsl(${pal[0]}, ${pal[1] + sShift}%, ${pal[2] + lShift}%)`,
      opacity: 0.7 + rng() * 0.25,
      yNorm: pt.y / 696,
    };
  });
}

const MOSAIC_FRAGMENTS = generateMosaicFragments();

/* ── Timeline events (450 frames / 15s) ──────── */
const EVENTS = [
  { year: '1947', label: 'Independence', frame: 120 },
  { year: '1948', label: 'Integration', frame: 165 },
  { year: '1956', label: 'Linguistic', frame: 210 },
  { year: '2000', label: 'New States', frame: 276 },
  { year: '2024', label: 'Present', frame: 336 },
];

/* ── Per-state stagger delays ────────────────── */
const stateDelays: Record<string, number> = {};
const sRng = mkRng(77);
indiaMap.locations.forEach((loc: { id: string }) => {
  stateDelays[loc.id] = sRng() * 60;
});

/* ── Main Composition ────────────────────────── */
export const IndiaStatesTeaser: React.FC<{ layout: 'desktop' | 'mobile' }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isMobile = layout === 'mobile';

  /* ── Layout ── */
  const mapScale = isMobile ? 1.3 : 1.2;
  const mapX = isMobile ? width * 0.5 - (612 * mapScale) / 2 : width * 0.48 - (612 * mapScale) / 2;
  const mapY = isMobile ? height * 0.28 - 40 : height * 0.5 - (696 * mapScale) / 2;

  const titleX = isMobile ? width * 0.5 : width * 0.22;
  const titleY = isMobile ? height * 0.10 : height * 0.28;

  /* ── Timing (450 frames / 15s) ──
   * 0-60:    Title "565" + mosaic map fades in with staggered Voronoi tiles
   * 60-180:  Hold mosaic (the colorful patchwork from the essay)
   * 160-240: Mosaic fades out, clean regional-color states emerge
   * 200-340: Counter 565 → 28, timeline progresses
   * 250-310: Tagline fades in
   * 350-380: Main content fades out
   * 370-420: End card fades in
   * 420-450: Hold end card
   */

  const titleOpacity = interpolate(frame, [0, 45], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = interpolate(frame, [0, 55], [1.08, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  // Counter 565 → 28
  const counterValue = Math.round(
    interpolate(frame, [0, 50, 200, 340], [565, 565, 565, 28], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Map container opacity
  const mapOpacity = interpolate(frame, [15, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Mosaic phase: colorful Voronoi patchwork visible, then fades out
  const mosaicOpacity = interpolate(frame, [15, 50, 160, 230], [0, 0.8, 0.8, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Clean state borders: subtle dark base under mosaic, then becomes primary
  const stateBaseOpacity = interpolate(frame, [15, 50], [0, 0.5], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Phase 2: Colored regions emerge as mosaic fades
  const colorPhase = interpolate(frame, [180, 260], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // End card
  const endCardOpacity = interpolate(frame, [370, 400], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mainFadeOut = interpolate(frame, [350, 380], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Timeline
  const timelineY = isMobile ? height * 0.82 : height * 0.93;
  const timelineX1 = isMobile ? width * 0.08 : width * 0.30;
  const timelineX2 = isMobile ? width * 0.92 : width * 0.92;
  const timelineProgress = interpolate(frame, [110, 340], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const timelineOpacity = interpolate(frame, [100, 120], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at ${isMobile ? '50% 42%' : '58% 50%'}, hsl(40, 25%, 12%, 0.35) 0%, transparent 55%)`,
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div style={{ opacity: mainFadeOut }}>
        {/* Title + Counter */}
        <div
          style={{
            position: 'absolute',
            left: titleX,
            top: titleY,
            transform: `translate(-50%, -50%) scale(${titleScale})`,
            opacity: titleOpacity,
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: isMobile ? 90 : 110,
              fontWeight: 900,
              color: SAFFRON,
              lineHeight: 1,
              textShadow: '0 0 60px hsl(40, 60%, 55%, 0.35)',
            }}
          >
            {counterValue}
          </div>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 10 : 12,
              letterSpacing: '0.35em',
              color: DIM,
              marginTop: 8,
              textTransform: 'uppercase',
            }}
          >
            {counterValue > 100 ? 'Princely States' : 'States & Territories'}
          </div>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 18 : 22,
              fontWeight: 700,
              color: TEXT,
              marginTop: 18,
              opacity: interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            The Mosaic Republic
          </div>
        </div>

        {/* ── INDIA MAP ── */}
        <svg
          viewBox={indiaMap.viewBox}
          style={{
            position: 'absolute',
            left: mapX,
            top: mapY,
            width: 612 * mapScale,
            height: 696 * mapScale,
            opacity: mapOpacity,
          }}
        >
          <defs>
            {/* Clip mosaic inside India silhouette */}
            <clipPath id="india-clip">
              {indiaMap.locations.map((loc: { id: string; path: string }) => (
                <path key={`clip-${loc.id}`} d={loc.path} />
              ))}
            </clipPath>
            <filter id="mosaic-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="hsl(35, 65%, 50%)" floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dark base silhouette (always visible beneath mosaic) */}
          {indiaMap.locations.map((loc: { id: string; path: string }) => (
            <path
              key={`base-${loc.id}`}
              d={loc.path}
              fill="hsl(25, 15%, 15%)"
              fillOpacity={stateBaseOpacity * 0.6}
              stroke="transparent"
              strokeWidth={0}
            />
          ))}

          {/* Voronoi mosaic fragments — clipped inside India */}
          <g clipPath="url(#india-clip)" opacity={mosaicOpacity}>
            {MOSAIC_FRAGMENTS.map((frag, i) => {
              // Staggered reveal: top-to-bottom wave
              const fragDelay = 15 + frag.yNorm * 40;
              const fragOpacity = interpolate(frame, [fragDelay, fragDelay + 15], [0, frag.opacity], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <path
                  key={`frag-${i}`}
                  d={frag.path}
                  fill={frag.color}
                  fillOpacity={fragOpacity}
                  stroke="hsl(30, 15%, 20%)"
                  strokeWidth={0.4}
                  strokeOpacity={fragOpacity * 0.6}
                />
              );
            })}
          </g>

          {/* Clean regional-color states (emerge as mosaic fades) */}
          {indiaMap.locations.map((loc: { id: string; name: string; path: string }) => {
            const delay = stateDelays[loc.id] || 0;
            const regionColor = STATE_COLORS[loc.id] || DIM;

            const colorDelay = 180 + delay * 1.2;
            const colorOp = interpolate(frame, [colorDelay, colorDelay + 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const finalOpacity = colorOp * colorPhase;
            if (finalOpacity <= 0) return null;

            return (
              <path
                key={loc.id}
                d={loc.path}
                fill={regionColor}
                fillOpacity={finalOpacity * 0.75}
                stroke="hsl(40, 20%, 25%)"
                strokeWidth={0.5}
                strokeOpacity={finalOpacity}
              />
            );
          })}
        </svg>

        {/* Tagline */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? '50%' : '22%',
            bottom: isMobile ? '14%' : '18%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: interpolate(frame, [250, 310], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * mainFadeOut,
            zIndex: 10,
          }}
        >
          <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 12 : 14, color: DIM, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            The largest peaceful integration
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 12 : 14, color: SAFFRON, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 6 }}>
            in human history.
          </div>
        </div>

        {/* Timeline bar */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, width, height, pointerEvents: 'none' }}
          opacity={timelineOpacity * mainFadeOut}
        >
          <line x1={timelineX1} y1={timelineY} x2={timelineX2} y2={timelineY} stroke="hsl(40, 12%, 18%)" strokeWidth="1" />
          <line
            x1={timelineX1}
            y1={timelineY}
            x2={timelineX1 + (timelineX2 - timelineX1) * timelineProgress}
            y2={timelineY}
            stroke={SAFFRON}
            strokeWidth="2.5"
          />
          {EVENTS.map((evt) => {
            const evtProgress = interpolate(frame, [evt.frame - 10, evt.frame + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const evtX = timelineX1 + ((evt.frame - 120) / 216) * (timelineX2 - timelineX1);
            return (
              <g key={evt.year} opacity={evtProgress}>
                <circle cx={evtX} cy={timelineY} r={3.5} fill={SAFFRON} />
                <text x={evtX} y={timelineY - 12} textAnchor="middle" fill={TEXT} fontSize={isMobile ? 9 : 10} fontFamily="Georgia, serif" fontWeight="700">{evt.year}</text>
                <text x={evtX} y={timelineY + 18} textAnchor="middle" fill={DIM} fontSize={isMobile ? 7.5 : 8.5} fontFamily="Georgia, serif">{evt.label}</text>
              </g>
            );
          })}
        </svg>
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
        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 34 : 48, fontWeight: 700, color: TEXT, textAlign: 'center', lineHeight: 1.3, maxWidth: '80%' }}>
          The Mosaic Republic
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 14 : 16, color: SAFFRON, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 14 }}>
          How 565 Became 28
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 11 : 13, color: TEXT, opacity: 0.35, letterSpacing: '0.15em', marginTop: 28, fontStyle: 'italic' }}>
          No map is final.
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 11 : 13, color: TEXT, opacity: 0.3, letterSpacing: '0.15em', marginTop: 24 }}>
          pastlives.site
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
