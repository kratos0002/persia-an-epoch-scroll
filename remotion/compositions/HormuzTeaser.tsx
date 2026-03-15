import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  staticFile,
} from 'remotion';

/* ── Palette (from the essay) ─────────────── */
const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 60%)';

/* ── Strait coastline paths (simplified SVG) ── */
// Iran coast (top) — viewed from above, west to east
const IRAN_COAST = 'M0,200 Q80,210 160,230 Q240,260 320,280 Q400,295 480,290 Q560,280 640,260 Q720,240 800,220 Q880,210 960,200';
// Oman/UAE coast (bottom)
const OMAN_COAST = 'M0,420 Q80,410 160,390 Q240,370 320,360 Q400,355 480,360 Q560,370 640,380 Q720,390 800,400 Q880,410 960,420';

/* ── Shipping lane paths (through the narrows) ── */
const INBOUND = 'M120,370 Q200,350 300,340 Q400,330 500,335 Q600,340 700,350 Q800,360 880,370';
const OUTBOUND = 'M880,250 Q800,260 700,270 Q600,280 500,285 Q400,280 300,270 Q200,260 120,250';

/* ── Empire timeline data ─────────────────── */
const EMPIRES = [
  { name: 'PERSIA', year: '550 BCE', frame: 195, color: AMBER },
  { name: 'PORTUGAL', year: '1507', frame: 225, color: TEAL },
  { name: 'BRITAIN', year: '1820', frame: 255, color: PARCHMENT },
  { name: 'TODAY', year: '2026', frame: 285, color: AMBER },
];

/* ── Main Composition ─────────────────────── */
export const HormuzTeaser: React.FC<{ layout: 'desktop' | 'mobile' }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isMobile = layout === 'mobile';

  /* ── Timing (450 frames / 15s at 30fps) ──
   * 0-60:     Satellite image fades in, dark vignette
   * 30-90:    "21 MILES" scales up from center
   * 70-120:   Subtitle: "The Strait of Hormuz"
   * 90-180:   Image fades to navy, strait SVG draws in
   * 130-200:  Shipping lanes animate through
   * 160-220:  Counter: 0 → 21M barrels/day
   * 180-310:  Empire names cascade on timeline
   * 300-370:  Tagline: "Every empire held this strait..."
   * 340-400:  Main fades out
   * 370-420:  End card: "The Throat of the World"
   * 420-450:  Hold
   */

  // ── Phase 1: Satellite image ──
  const imgOpacity = interpolate(frame, [0, 30, 90, 130], [0, 0.6, 0.6, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const imgScale = interpolate(frame, [0, 130], [1.05, 1.15], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── "21 MILES" ──
  const milesOpacity = interpolate(frame, [30, 55, 100, 130], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const milesScale = interpolate(frame, [30, 60], [0.7, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // ── Subtitle ──
  const subOpacity = interpolate(frame, [70, 90, 110, 130], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Strait SVG ──
  const straitOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const coastProgress = interpolate(frame, [100, 160], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // ── Shipping lanes ──
  const laneProgress = interpolate(frame, [140, 200], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  // Animated dash offset for flowing effect
  const dashFlow = interpolate(frame, [140, 450], [0, -800], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Barrel counter ──
  const barrelRaw = interpolate(frame, [160, 230], [0, 21], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const barrelValue = Math.round(barrelRaw);
  const counterOpacity = interpolate(frame, [155, 175, 310, 340], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── "21% of global oil" ──
  const percentOpacity = interpolate(frame, [220, 240, 310, 340], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Timeline ──
  const timelineOpacity = interpolate(frame, [180, 200, 320, 340], [0, 0.8, 0.8, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const timelineProgress = interpolate(frame, [185, 300], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Tagline ──
  const tagline1Opacity = interpolate(frame, [300, 325, 370, 390], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const tagline2Opacity = interpolate(frame, [315, 340, 370, 390], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Main fade out / End card ──
  const mainFadeOut = interpolate(frame, [370, 395], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const endCardOpacity = interpolate(frame, [385, 415], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Fortress image flash ──
  const fortressOpacity = interpolate(frame, [220, 245, 270, 295], [0, 0.3, 0.3, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Carrier image flash ──
  const carrierOpacity = interpolate(frame, [270, 290, 310, 330], [0, 0.3, 0.3, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Layout positions ──
  const straitSvgW = isMobile ? width * 0.95 : width * 0.6;
  const straitSvgH = straitSvgW * 0.65;
  const straitX = (width - straitSvgW) / 2;
  const straitY = isMobile ? height * 0.32 : height * 0.25;

  const timelineY = isMobile ? height * 0.78 : height * 0.82;
  const timelineX1 = isMobile ? width * 0.08 : width * 0.2;
  const timelineX2 = isMobile ? width * 0.92 : width * 0.8;

  // Water shimmer effect
  const shimmerX = interpolate(frame, [0, 450], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>

      {/* ── Background images ── */}
      {/* Satellite */}
      <div style={{
        position: 'absolute', inset: 0, opacity: imgOpacity, overflow: 'hidden',
      }}>
        <Img
          src={staticFile('images/strait-hormuz-satellite.jpg')}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: `scale(${imgScale})`,
            filter: 'brightness(0.5) contrast(1.2)',
          }}
        />
      </div>

      {/* Fortress (Portugal era flash) */}
      <div style={{
        position: 'absolute', inset: 0, opacity: fortressOpacity, overflow: 'hidden',
      }}>
        <Img
          src={staticFile('images/portuguese-fortress-hormuz.jpg')}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.35) contrast(1.1) sepia(0.3)',
          }}
        />
      </div>

      {/* Carrier (modern era flash) */}
      <div style={{
        position: 'absolute', inset: 0, opacity: carrierOpacity, overflow: 'hidden',
      }}>
        <Img
          src={staticFile('images/carrier-strait-hormuz.jpg')}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.3) contrast(1.2)',
          }}
        />
      </div>

      {/* Vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, transparent 30%, ${NAVY} 80%)`,
      }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{ opacity: mainFadeOut }}>

        {/* "21 MILES" — the hook */}
        <div style={{
          position: 'absolute',
          left: '50%', top: isMobile ? '18%' : '20%',
          transform: `translate(-50%, -50%) scale(${milesScale})`,
          opacity: milesOpacity,
          textAlign: 'center',
          zIndex: 10,
        }}>
          <div style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: isMobile ? 80 : 110,
            fontWeight: 900,
            color: PARCHMENT,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            21
          </div>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 14 : 18,
            letterSpacing: '0.5em',
            color: SMOKE,
            textTransform: 'uppercase',
            marginTop: 4,
          }}>
            Miles
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          position: 'absolute',
          left: '50%', top: isMobile ? '28%' : '32%',
          transform: 'translate(-50%, -50%)',
          opacity: subOpacity,
          textAlign: 'center',
          zIndex: 10,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 10 : 12,
            letterSpacing: '0.4em',
            color: TEAL,
            textTransform: 'uppercase',
          }}>
            The Strait of Hormuz
          </div>
        </div>

        {/* ── STRAIT SVG ── */}
        <svg
          viewBox="0 0 960 620"
          style={{
            position: 'absolute',
            left: straitX, top: straitY,
            width: straitSvgW, height: straitSvgH,
            opacity: straitOpacity,
          }}
        >
          {/* Water gradient */}
          <defs>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={TEAL} stopOpacity="0.05" />
              <stop offset="50%" stopColor={TEAL} stopOpacity="0.12" />
              <stop offset="100%" stopColor={TEAL} stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
              <stop offset={`${shimmerX - 10}%`} stopColor={TEAL} stopOpacity="0" />
              <stop offset={`${shimmerX}%`} stopColor={TEAL} stopOpacity="0.08" />
              <stop offset={`${shimmerX + 10}%`} stopColor={TEAL} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Water body between coasts */}
          <path
            d={`${IRAN_COAST} L960,620 L0,620 Z`}
            fill="url(#waterGrad)"
            opacity={coastProgress}
          />
          <rect x="0" y="0" width="960" height="620" fill="url(#shimmer)" opacity={coastProgress} />

          {/* Iran coast (north) */}
          <path
            d={IRAN_COAST}
            fill="none"
            stroke={SMOKE}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="2000"
            strokeDashoffset={2000 * (1 - coastProgress)}
            opacity={0.6}
          />
          {/* Iran label */}
          <text
            x={480} y={175}
            textAnchor="middle"
            fill={SMOKE}
            fontSize={isMobile ? 12 : 14}
            fontFamily="Georgia, serif"
            letterSpacing="0.4em"
            opacity={coastProgress * 0.4}
          >
            IRAN
          </text>

          {/* Oman coast (south) */}
          <path
            d={OMAN_COAST}
            fill="none"
            stroke={SMOKE}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="2000"
            strokeDashoffset={2000 * (1 - coastProgress)}
            opacity={0.6}
          />
          {/* Oman/UAE label */}
          <text
            x={480} y={460}
            textAnchor="middle"
            fill={SMOKE}
            fontSize={isMobile ? 12 : 14}
            fontFamily="Georgia, serif"
            letterSpacing="0.4em"
            opacity={coastProgress * 0.4}
          >
            OMAN
          </text>

          {/* Hormuz Island dot */}
          <circle
            cx={520} cy={275}
            r={4 * coastProgress}
            fill={TEAL}
            opacity={coastProgress * 0.8}
          />
          <text
            x={540} y={270}
            fill={TEAL}
            fontSize={9}
            fontFamily="Georgia, serif"
            opacity={coastProgress * 0.6}
          >
            Hormuz
          </text>

          {/* Inbound shipping lane */}
          <path
            d={INBOUND}
            fill="none"
            stroke={AMBER}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="12, 8"
            strokeDashoffset={dashFlow}
            opacity={laneProgress * 0.7}
          />

          {/* Outbound shipping lane */}
          <path
            d={OUTBOUND}
            fill="none"
            stroke={TEAL}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="12, 8"
            strokeDashoffset={-dashFlow}
            opacity={laneProgress * 0.7}
          />

          {/* Lane labels */}
          <text
            x={850} y={380}
            fill={AMBER}
            fontSize={8}
            fontFamily="Georgia, serif"
            letterSpacing="0.15em"
            opacity={laneProgress * 0.5}
          >
            INBOUND
          </text>
          <text
            x={60} y={245}
            fill={TEAL}
            fontSize={8}
            fontFamily="Georgia, serif"
            letterSpacing="0.15em"
            opacity={laneProgress * 0.5}
          >
            OUTBOUND
          </text>

          {/* Narrowest point markers */}
          <line
            x1={440} y1={280} x2={440} y2={355}
            stroke={PARCHMENT}
            strokeWidth={0.5}
            strokeDasharray="3, 3"
            opacity={laneProgress * 0.3}
          />
          <line
            x1={520} y1={280} x2={520} y2={355}
            stroke={PARCHMENT}
            strokeWidth={0.5}
            strokeDasharray="3, 3"
            opacity={laneProgress * 0.3}
          />
        </svg>

        {/* ── BARREL COUNTER ── */}
        <div style={{
          position: 'absolute',
          left: '50%', top: isMobile ? '20%' : '18%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          opacity: counterOpacity,
          zIndex: 10,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 64 : 80,
            fontWeight: 900,
            color: AMBER,
            lineHeight: 1,
          }}>
            {barrelValue}M
          </div>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 10 : 13,
            letterSpacing: '0.3em',
            color: SMOKE,
            textTransform: 'uppercase',
            marginTop: 6,
          }}>
            Barrels Per Day
          </div>
        </div>

        {/* "21% of global oil" */}
        <div style={{
          position: 'absolute',
          left: '50%', top: isMobile ? '27%' : '26%',
          transform: 'translate(-50%, -50%)',
          opacity: percentOpacity,
          zIndex: 10,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 12 : 15,
            letterSpacing: '0.25em',
            color: AMBER,
            textTransform: 'uppercase',
          }}>
            21% of Global Oil
          </div>
        </div>

        {/* ── EMPIRE TIMELINE ── */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, width, height, pointerEvents: 'none' }}
          opacity={timelineOpacity}
        >
          {/* Track */}
          <line
            x1={timelineX1} y1={timelineY}
            x2={timelineX2} y2={timelineY}
            stroke="hsl(215, 20%, 15%)"
            strokeWidth={1}
          />
          {/* Progress */}
          <line
            x1={timelineX1} y1={timelineY}
            x2={timelineX1 + (timelineX2 - timelineX1) * timelineProgress}
            y2={timelineY}
            stroke={AMBER}
            strokeWidth={2.5}
          />
          {EMPIRES.map((emp) => {
            const evtProgress = interpolate(frame, [emp.frame - 10, emp.frame + 10], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            const evtX = timelineX1 + ((emp.frame - 185) / 115) * (timelineX2 - timelineX1);
            const nameScale = interpolate(frame, [emp.frame - 5, emp.frame + 15], [0.8, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });
            return (
              <g key={emp.name} opacity={evtProgress}>
                <circle cx={evtX} cy={timelineY} r={4} fill={emp.color} />
                <text
                  x={evtX} y={timelineY - 18}
                  textAnchor="middle"
                  fill={emp.color}
                  fontSize={isMobile ? 13 : 16}
                  fontFamily="Georgia, serif"
                  fontWeight={700}
                  letterSpacing="0.15em"
                  transform={`scale(${nameScale})`}
                  style={{ transformOrigin: `${evtX}px ${timelineY - 18}px` }}
                >
                  {emp.name}
                </text>
                <text
                  x={evtX} y={timelineY + 22}
                  textAnchor="middle"
                  fill={SMOKE}
                  fontSize={isMobile ? 9 : 11}
                  fontFamily="Georgia, serif"
                >
                  {emp.year}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ── TAGLINE ── */}
        <div style={{
          position: 'absolute',
          left: '50%', bottom: isMobile ? '14%' : '12%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '85%',
          zIndex: 10,
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 15 : 19,
            color: SMOKE,
            lineHeight: 1.6,
            opacity: tagline1Opacity,
          }}>
            Every empire that ever ruled the East held this strait.
          </div>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 15 : 19,
            color: AMBER,
            lineHeight: 1.6,
            marginTop: 8,
            opacity: tagline2Opacity,
            fontWeight: 700,
          }}>
            Every one that lost it fell.
          </div>
        </div>

      </div>

      {/* ── END CARD ── */}
      <AbsoluteFill style={{
        opacity: endCardOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: isMobile ? 10 : 12,
          letterSpacing: '0.5em',
          color: TEAL,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          The Strait of Hormuz
        </div>
        <div style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: isMobile ? 38 : 52,
          fontWeight: 900,
          color: PARCHMENT,
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: '85%',
        }}>
          The Throat of the World
        </div>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: isMobile ? 11 : 14,
          color: SMOKE,
          letterSpacing: '0.2em',
          marginTop: 20,
          fontStyle: 'italic',
        }}>
          3,000 years. 21 miles. No alternative.
        </div>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: isMobile ? 10 : 13,
          color: PARCHMENT,
          opacity: 0.3,
          letterSpacing: '0.15em',
          marginTop: 30,
        }}>
          epochlives.site
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
