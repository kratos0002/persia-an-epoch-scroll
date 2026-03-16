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

/* ── Palette — Indian miniature painting ─── */
const PARCHMENT = 'hsl(38, 45%, 88%)';
const PARCHMENT_DK = 'hsl(35, 40%, 82%)';
const INK = 'hsl(25, 40%, 15%)';
const VERMILLION = 'hsl(8, 78%, 48%)';
const GOLD = 'hsl(43, 90%, 52%)';
const OCHRE = 'hsl(32, 60%, 50%)';
const DEEP = 'hsl(20, 35%, 10%)';

/* ── Simplified route path (SVG) — Ayodhya to Lanka ── */
const ROUTE_PATH =
  'M 580,120 L 530,155 L 528,158 L 490,180 L 485,175 ' + // Ayodhya → Chitrakoot
  'Q 440,200 380,260 ' + // → Dandakaranya
  'L 320,290 L 260,320 ' + // → Panchavati → Lepakshi
  'Q 280,340 290,355 ' + // → Kishkindha
  'Q 270,400 240,460 ' + // → south march
  'L 200,500 L 190,510 ' + // → Rameshwaram
  'Q 180,520 175,535 ' + // → Dhanushkodi
  'L 195,570 L 210,590 L 230,620'; // → Lanka

/* ── Key location dots along route ── */
const LOCATIONS = [
  { x: 580, y: 120, label: 'Ayodhya' },
  { x: 490, y: 180, label: 'Chitrakoot' },
  { x: 380, y: 260, label: 'Dandakaranya' },
  { x: 260, y: 320, label: 'Panchavati' },
  { x: 290, y: 355, label: 'Kishkindha' },
  { x: 200, y: 500, label: 'Rameshwaram' },
  { x: 230, y: 620, label: 'Lanka' },
];

/* ── Paintings — 4 key moments ── */
const PAINTINGS = [
  { src: 'images/ramayana/rama-exile-forest.jpg', label: 'The Exile' },
  { src: 'images/ramayana/jatayu-fights-ravana.jpg', label: 'The Fall of Jatayu' },
  { src: 'images/ramayana/siege-of-lanka.jpg', label: 'The Siege of Lanka' },
  { src: 'images/ramayana/rama-coronation.jpg', label: 'The Return' },
];

/* ── Main Composition ─────────────────────── */
export const RamayanaTeaser: React.FC<{ layout: 'desktop' | 'mobile' }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isMobile = layout === 'mobile';

  /* ── Timing (600 frames / 20s at 30fps) ──
   * 0-60:     Title card — "The Exile's Road" on parchment
   * 40-80:    Subtitle + stats fade in
   * 70-120:   Transition to painting 1
   * 100-180:  Painting 1 (exile) with slow Ken Burns
   * 160-240:  Painting 2 (Jatayu) crossfade
   * 220-300:  Painting 3 (siege of Lanka) crossfade
   * 280-360:  Painting 4 (coronation) crossfade
   * 340-400:  Fade to parchment, route map draws in
   * 380-500:  Route animates, location dots appear
   * 460-520:  Stats: 2,500 km / 14 years / 21 stops
   * 500-560:  End card: title + tagline
   * 560-600:  Hold
   */

  // ── Title card ──
  const titleOpacity = interpolate(frame, [0, 20, 60, 85], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 25], [20, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const subtitleOpacity = interpolate(frame, [40, 60, 70, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Painting phases ──
  const paintingTimings = [
    { start: 80, peak: 130, end: 190 },
    { start: 170, peak: 210, end: 260 },
    { start: 240, peak: 280, end: 330 },
    { start: 310, peak: 345, end: 385 },
  ];

  // ── Map phase ──
  const mapBgOpacity = interpolate(frame, [340, 380], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const routeProgress = interpolate(frame, [380, 480], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  // ── Stats ──
  const statsOpacity = interpolate(frame, [460, 480, 520, 540], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── End card ──
  const endCardOpacity = interpolate(frame, [520, 545], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // ── Gold border decoration ──
  const borderPad = isMobile ? 16 : 24;

  return (
    <AbsoluteFill style={{ background: PARCHMENT }}>
      {/* Paper grain texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04, zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }} />

      {/* Gold manuscript border */}
      <div style={{
        position: 'absolute',
        top: borderPad, left: borderPad,
        right: borderPad, bottom: borderPad,
        border: `3px solid ${GOLD}`,
        boxShadow: `inset 0 0 0 5px ${PARCHMENT}, inset 0 0 0 6.5px ${VERMILLION}50`,
        borderRadius: 3,
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* ── TITLE CARD ── */}
      <AbsoluteFill style={{
        opacity: titleOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
      }}>
        <div style={{
          fontFamily: "'Tiro Devanagari', Georgia, serif",
          fontSize: isMobile ? 22 : 28,
          color: VERMILLION,
          opacity: 0.6,
          marginBottom: 12,
          transform: `translateY(${titleY}px)`,
        }}>
          रामायण
        </div>
        <div style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: isMobile ? 44 : 64,
          fontWeight: 900,
          color: INK,
          textAlign: 'center',
          lineHeight: 1.1,
          maxWidth: '85%',
          transform: `translateY(${titleY}px)`,
        }}>
          The Exile's Road
        </div>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: isMobile ? 13 : 16,
          color: OCHRE,
          letterSpacing: '0.2em',
          marginTop: 16,
          opacity: subtitleOpacity,
        }}>
          Tracing the Ramayana
        </div>
      </AbsoluteFill>

      {/* ── PAINTINGS — Ken Burns crossfade ── */}
      {PAINTINGS.map((painting, i) => {
        const t = paintingTimings[i];
        const opacity = interpolate(
          frame,
          [t.start, t.start + 25, t.end - 30, t.end],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        // Slow zoom
        const scale = interpolate(frame, [t.start, t.end], [1.0, 1.12], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        // Caption
        const capIn = t.start + 25;
        const capOut = t.end - 15;
        const capMid = (capIn + capOut) / 2;
        const capOpacity = interpolate(
          frame,
          [capIn, capIn + 15, capMid, capOut],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <AbsoluteFill key={painting.src} style={{ opacity, zIndex: 4 }}>
            <Img
              src={staticFile(painting.src)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${scale})`,
              }}
            />
            {/* Dark gradient at bottom for caption */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '30%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
            }} />
            {/* Painting label */}
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '10%' : '8%',
              left: '50%', transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: capOpacity,
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? 9 : 11,
                letterSpacing: '0.35em',
                color: GOLD,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                {`${['I', 'II', 'III', 'IV'][i]} of IV`}
              </div>
              <div style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: isMobile ? 24 : 32,
                fontWeight: 700,
                color: PARCHMENT,
              }}>
                {painting.label}
              </div>
            </div>
          </AbsoluteFill>
        );
      })}

      {/* ── MAP PHASE — route draws on parchment ── */}
      <AbsoluteFill style={{ opacity: mapBgOpacity, zIndex: 6, background: PARCHMENT }}>
        {/* Paper grain */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />

        {/* Gold border again */}
        <div style={{
          position: 'absolute',
          top: borderPad, left: borderPad,
          right: borderPad, bottom: borderPad,
          border: `3px solid ${GOLD}`,
          boxShadow: `inset 0 0 0 5px ${PARCHMENT}, inset 0 0 0 6.5px ${VERMILLION}50`,
          borderRadius: 3,
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* SVG route map */}
        <svg
          viewBox={isMobile ? '100 50 500 700' : '50 20 750 700'}
          style={{
            position: 'absolute',
            top: '5%', left: '50%',
            transform: 'translateX(-50%)',
            width: isMobile ? '90%' : '60%',
            height: '70%',
          }}
        >
          {/* Ghost route (faint) */}
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke={VERMILLION}
            strokeWidth={1.5}
            opacity={0.12}
            strokeDasharray="4 6"
            strokeLinecap="round"
          />

          {/* Animated route — drawn progressively */}
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke={VERMILLION}
            strokeWidth={3}
            opacity={0.85}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1200}
            strokeDashoffset={1200 * (1 - routeProgress)}
          />
          {/* Glow */}
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke={GOLD}
            strokeWidth={7}
            opacity={0.15}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1200}
            strokeDashoffset={1200 * (1 - routeProgress)}
          />

          {/* Location dots — appear as route reaches them */}
          {LOCATIONS.map((loc, i) => {
            const dotProgress = interpolate(
              routeProgress,
              [(i / (LOCATIONS.length - 1)) - 0.05, (i / (LOCATIONS.length - 1)) + 0.05],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            return (
              <g key={loc.label} opacity={dotProgress}>
                <circle cx={loc.x} cy={loc.y} r={5} fill={VERMILLION} stroke={GOLD} strokeWidth={2} />
                <text
                  x={loc.x + 12}
                  y={loc.y + 4}
                  fill={INK}
                  fontSize={isMobile ? 14 : 16}
                  fontFamily="Georgia, serif"
                  fontWeight={600}
                >
                  {loc.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ── STATS ── */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '12%' : '10%',
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex',
          gap: isMobile ? 30 : 60,
          opacity: statsOpacity,
          textAlign: 'center',
        }}>
          {[
            { n: '2,500', u: 'km' },
            { n: '14', u: 'years' },
            { n: '21', u: 'stops' },
          ].map((s) => (
            <div key={s.u}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? 32 : 44,
                fontWeight: 900,
                color: VERMILLION,
                lineHeight: 1,
              }}>
                {s.n}
              </div>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? 9 : 11,
                letterSpacing: '0.2em',
                color: OCHRE,
                textTransform: 'uppercase',
                marginTop: 4,
              }}>
                {s.u}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* ── END CARD ── */}
      <AbsoluteFill style={{
        opacity: endCardOpacity,
        background: DEEP,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 8,
      }}>
        {/* Gold border on end card */}
        <div style={{
          position: 'absolute',
          top: borderPad, left: borderPad,
          right: borderPad, bottom: borderPad,
          border: `2px solid ${GOLD}`,
          borderRadius: 3,
          pointerEvents: 'none',
        }} />

        <div style={{
          fontFamily: "'Tiro Devanagari', Georgia, serif",
          fontSize: isMobile ? 18 : 22,
          color: VERMILLION,
          opacity: 0.6,
          marginBottom: 12,
        }}>
          रामायण
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
          The Exile's Road
        </div>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: isMobile ? 11 : 14,
          color: OCHRE,
          letterSpacing: '0.2em',
          marginTop: 16,
          fontStyle: 'italic',
        }}>
          2,500 km. 14 years. Every place a temple.
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
