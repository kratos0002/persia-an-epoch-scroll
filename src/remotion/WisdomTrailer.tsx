import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';

/* ── Colors (from the essay) ─────────────────── */
const BG = 'hsl(220, 20%, 7%)';
const TEAL = 'hsl(170, 40%, 30%)';
const TEAL_BRIGHT = 'hsl(170, 45%, 50%)';
const GOLD = 'hsl(43, 85%, 55%)';
const GOLD_DIM = 'hsl(43, 75%, 50%)';
const TEXT = 'hsl(40, 25%, 90%)';
const DIM = 'hsl(170, 20%, 50%)';
const RED = 'hsl(0, 70%, 55%)';
const RED_DARK = 'hsl(0, 70%, 35%)';
const BLUE = 'hsl(200, 45%, 50%)';
const ORANGE = 'hsl(30, 50%, 50%)';
const CYAN = 'hsl(150, 45%, 45%)';
const PURPLE = 'hsl(215, 55%, 50%)';

/* ── Calligraphy strokes (simplified from essay) */
const CALLIGRAPHY_PATHS = [
  'M140,200 C160,160 200,140 240,150 C280,160 300,190 280,210',
  'M290,180 C310,160 340,155 360,170 C380,185 370,210 350,220',
  'M360,200 C380,180 410,175 430,190 C450,205 440,230 420,235',
  'M440,195 C460,175 490,180 500,200 C510,220 490,240 470,235',
  'M180,220 C200,240 230,250 260,240',
  'M320,225 C340,245 360,250 390,240',
];

/* ── Round City data ──────────────────────────── */
const WALLS = [
  { r: 160, width: 2.5 },
  { r: 120, width: 1.5 },
  { r: 80, width: 1.5 },
];

const GATES = [
  { angle: 0, name: 'Khorasan' },
  { angle: 90, name: 'Basra' },
  { angle: 180, name: 'Kufa' },
  { angle: 270, name: 'Syria' },
];

/* ── Scholars ─────────────────────────────────── */
const SCHOLARS = [
  { name: 'al-Khwārizmī', field: 'Algebra · Algorithms', icon: '∑', color: GOLD, year: '780–850' },
  { name: 'al-Kindī', field: 'Cryptanalysis · Philosophy', icon: '⌘', color: BLUE, year: '801–873' },
  { name: 'Banū Mūsā', field: 'Engineering · Automata', icon: '⚙', color: ORANGE, year: '803–873' },
  { name: 'al-Rāzī', field: 'Medicine · Chemistry', icon: '✦', color: CYAN, year: '854–925' },
  { name: 'Ibn al-Haytham', field: 'Optics · Scientific Method', icon: '◉', color: PURPLE, year: '965–1040' },
];

/* ── Knowledge graph ──────────────────────────── */
interface GraphNode {
  id: string;
  x: number;
  y: number;
  color: string;
  category: string;
  scatter: { dx: number; dy: number; rot: number };
}

const GRAPH_NODES: GraphNode[] = [
  // Greek sources (left)
  { id: 'Aristotle', x: 0.08, y: 0.25, color: GOLD, category: 'Greek', scatter: { dx: -120, dy: -80, rot: -15 } },
  { id: 'Euclid', x: 0.08, y: 0.45, color: GOLD, category: 'Greek', scatter: { dx: -100, dy: 60, rot: 10 } },
  { id: 'Galen', x: 0.08, y: 0.65, color: GOLD, category: 'Greek', scatter: { dx: -140, dy: 40, rot: -8 } },
  // Translators (center-left)
  { id: 'Hunayn', x: 0.32, y: 0.35, color: TEAL_BRIGHT, category: 'Translators', scatter: { dx: -60, dy: -100, rot: 12 } },
  { id: 'Thābit', x: 0.32, y: 0.55, color: TEAL_BRIGHT, category: 'Translators', scatter: { dx: 40, dy: 80, rot: -18 } },
  // Arabic scholars (center-right)
  { id: 'al-Khwārizmī', x: 0.58, y: 0.25, color: TEAL, category: 'Arabic', scatter: { dx: 80, dy: -90, rot: 15 } },
  { id: 'Ibn al-Haytham', x: 0.58, y: 0.45, color: TEAL, category: 'Arabic', scatter: { dx: -70, dy: 100, rot: -12 } },
  { id: 'al-Rāzī', x: 0.58, y: 0.65, color: TEAL, category: 'Arabic', scatter: { dx: 90, dy: -60, rot: 20 } },
  // European (right)
  { id: 'Fibonacci', x: 0.85, y: 0.30, color: PURPLE, category: 'European', scatter: { dx: 130, dy: -70, rot: -10 } },
  { id: 'Roger Bacon', x: 0.85, y: 0.50, color: PURPLE, category: 'European', scatter: { dx: 110, dy: 50, rot: 14 } },
  { id: 'Copernicus', x: 0.85, y: 0.70, color: PURPLE, category: 'European', scatter: { dx: 100, dy: 90, rot: -16 } },
];

const GRAPH_EDGES = [
  { from: 0, to: 3 }, { from: 1, to: 3 }, { from: 2, to: 4 },
  { from: 3, to: 5 }, { from: 3, to: 6 }, { from: 4, to: 7 },
  { from: 5, to: 8 }, { from: 6, to: 9 }, { from: 7, to: 10 },
];

/* ── Geometric pattern (from essay hero) ──────── */
const GeoPattern: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}>
    <defs>
      <pattern id="wisdom-geo-t" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="none" />
        <path d="M40,0 L80,40 L40,80 L0,40 Z" fill="none" stroke={TEAL} strokeWidth="0.5" opacity="0.4" />
        <circle cx="40" cy="40" r="3" fill={GOLD} opacity="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wisdom-geo-t)" />
  </svg>
);

/* ── Helper: eased interpolate ────────────────── */
const ease = (frame: number, inF: number, outF: number, from: number, to: number) =>
  interpolate(frame, [inF, outF], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

const clamp = (frame: number, inF: number, outF: number, from: number, to: number) =>
  interpolate(frame, [inF, outF], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/* ── Main Composition ─────────────────────────── */
export const WisdomTrailer: React.FC<{ layout: 'desktop' | 'mobile' }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isMobile = layout === 'mobile';

  const cx = width * 0.5;
  const cy = height * 0.5;

  /* ════════════════════════════════════════════════
   * ACT 1: OPENING — Calligraphy + Title (0–90)
   * ════════════════════════════════════════════════ */
  const calligraphyProgress = ease(frame, 5, 60, 0, 1);
  const titleOp = ease(frame, 35, 65, 0, 1);
  const titleY = ease(frame, 35, 65, 40, 0);
  const subtitleOp = ease(frame, 55, 80, 0, 1);
  const act1FadeOut = clamp(frame, 75, 95, 1, 0);

  /* ════════════════════════════════════════════════
   * ACT 2: ROUND CITY (90–240)
   * ════════════════════════════════════════════════ */
  const cityFadeIn = clamp(frame, 90, 110, 0, 1);
  const cityLabelOp = ease(frame, 95, 115, 0, 1);
  const wallProgress = (i: number) => ease(frame, 105 + i * 15, 140 + i * 15, 0, 1);
  const gateOp = ease(frame, 140, 165, 0, 1);
  const palaceOp = ease(frame, 155, 175, 0, 0.8);
  const populationOp = ease(frame, 185, 210, 0, 1);
  const populationCount = Math.round(interpolate(frame, [185, 220], [0, 1000000], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const cityFadeOut = clamp(frame, 225, 245, 1, 0);

  /* ════════════════════════════════════════════════
   * ACT 3: SCHOLARS (240–390)
   * ════════════════════════════════════════════════ */
  const scholarsLabelOp = ease(frame, 245, 265, 0, 1);
  const scholarsFadeOut = clamp(frame, 375, 395, 1, 0);

  /* ════════════════════════════════════════════════
   * ACT 4: KNOWLEDGE GRAPH (390–540)
   * ════════════════════════════════════════════════ */
  const graphFadeIn = clamp(frame, 390, 410, 0, 1);
  const graphLabelOp = ease(frame, 395, 415, 0, 1);
  const graphFadeOut = clamp(frame, 525, 545, 1, 0);

  /* ════════════════════════════════════════════════
   * ACT 5: DESTRUCTION (540–690)
   * ════════════════════════════════════════════════ */
  const destructFadeIn = clamp(frame, 540, 560, 0, 1);
  const destructProgress = ease(frame, 580, 660, 0, 1);
  const redOverlay = clamp(frame, 560, 620, 0, 0.35);
  const redFadeOut = clamp(frame, 650, 690, 0.35, 0);
  const destructFadeOut = clamp(frame, 675, 700, 1, 0);

  /* ════════════════════════════════════════════════
   * ACT 6: LEGACY / END CARD (690–900)
   * ════════════════════════════════════════════════ */
  const endFadeIn = ease(frame, 695, 730, 0, 1);
  const quoteOp = ease(frame, 730, 770, 0, 1);
  const siteOp = ease(frame, 790, 830, 0, 1);
  const reassembleProgress = ease(frame, 700, 780, 0, 1);

  const fontSize = (base: number) => isMobile ? base * 0.55 : base;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, hsl(170, 20%, 10%, 0.3) 0%, transparent 60%)`,
        }}
      />
      <GeoPattern opacity={0.025} />

      {/* ══ ACT 1: CALLIGRAPHY + TITLE ══════════ */}
      {frame < 100 && (
        <AbsoluteFill style={{ opacity: act1FadeOut }}>
          {/* Calligraphy SVG */}
          <svg
            viewBox="100 120 460 160"
            style={{
              position: 'absolute',
              left: isMobile ? '8%' : '25%',
              top: isMobile ? '28%' : '25%',
              width: isMobile ? '84%' : '50%',
              height: 'auto',
            }}
          >
            {CALLIGRAPHY_PATHS.map((d, i) => {
              const pathStart = i * 0.12;
              const pathEnd = pathStart + 0.4;
              const progress = interpolate(calligraphyProgress, [pathStart, pathEnd], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={GOLD}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray="300"
                  strokeDashoffset={300 * (1 - progress)}
                  opacity={0.9}
                />
              );
            })}
          </svg>

          {/* Title */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: isMobile ? '52%' : '50%',
              transform: `translate(-50%, ${titleY}px)`,
              textAlign: 'center',
              opacity: titleOp,
            }}
          >
            <div
              style={{
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontSize: fontSize(160),
                fontWeight: 900,
                color: TEXT,
                lineHeight: 0.95,
              }}
            >
              The Library
            </div>
            <div
              style={{
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontSize: fontSize(160),
                fontWeight: 900,
                fontStyle: 'italic',
                color: GOLD,
                lineHeight: 0.95,
              }}
            >
              That Lit the World
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: isMobile ? '72%' : '70%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: subtitleOp,
            }}
          >
            <div
              style={{
                fontFamily: 'Georgia, "Cormorant Garamond", serif',
                fontSize: fontSize(44),
                color: DIM,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              The House of Wisdom · 762–1258 CE
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══ ACT 2: ROUND CITY ═══════════════════ */}
      {frame >= 88 && frame < 250 && (
        <AbsoluteFill style={{ opacity: cityFadeIn * cityFadeOut }}>
          {/* Section label */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: isMobile ? '6%' : '8%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: cityLabelOp,
            }}
          >
            <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(28), letterSpacing: '0.3em', color: DIM, textTransform: 'uppercase' }}>
              762 CE
            </div>
            <div style={{ fontFamily: 'Georgia, "Playfair Display", serif', fontSize: fontSize(72), fontWeight: 700, color: TEAL_BRIGHT, marginTop: 10 }}>
              The Round City
            </div>
          </div>

          {/* Round City SVG */}
          <svg
            viewBox="-60 -60 520 520"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '75%' : '40%',
              height: 'auto',
            }}
          >
            <defs>
              <radialGradient id="rc-glow-t" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={GOLD} stopOpacity="0.12" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="-60" y="-60" width="520" height="520" fill="url(#rc-glow-t)" />

            {/* Walls */}
            {WALLS.map((wall, i) => {
              const circumference = 2 * Math.PI * wall.r;
              const progress = wallProgress(i);
              return (
                <circle
                  key={i}
                  cx="200" cy="200" r={wall.r}
                  fill="none"
                  stroke={TEAL}
                  strokeWidth={wall.width}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  opacity={0.5 + i * 0.15}
                />
              );
            })}

            {/* Gates */}
            {GATES.map((gate, i) => {
              const rad = (gate.angle * Math.PI) / 180;
              const x1 = 200 + Math.cos(rad) * 120;
              const y1 = 200 + Math.sin(rad) * 120;
              const x2 = 200 + Math.cos(rad) * 165;
              const y2 = 200 + Math.sin(rad) * 165;
              const lx = 200 + Math.cos(rad) * 200;
              const ly = 200 + Math.sin(rad) * 200;
              const anchor = gate.angle === 0 ? 'start' : gate.angle === 180 ? 'end' : 'middle';
              return (
                <g key={gate.angle} opacity={gateOp}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth={2} opacity={0.6} />
                  <text x={lx} y={ly + 4} textAnchor={anchor} fill={GOLD} fontSize="14" opacity="0.9" fontFamily="Georgia, 'Cormorant Garamond', serif" fontWeight="600">
                    {gate.name}
                  </text>
                </g>
              );
            })}

            {/* Palace */}
            <circle cx="200" cy="200" r="10" fill={GOLD} opacity={palaceOp} />
            <circle
              cx="200" cy="200" r="25"
              fill={GOLD}
              opacity={palaceOp * 0.12 * (0.8 + 0.2 * Math.sin(frame * 0.08))}
            />
          </svg>

          {/* Population counter */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: isMobile ? '10%' : '12%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: populationOp,
            }}
          >
            <div style={{ fontFamily: 'Georgia, "Playfair Display", serif', fontSize: fontSize(100), fontWeight: 900, color: TEAL_BRIGHT, lineHeight: 1 }}>
              {populationCount >= 1000000 ? '1,000,000+' : populationCount.toLocaleString()}
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(24), letterSpacing: '0.3em', color: DIM, textTransform: 'uppercase', marginTop: 8 }}>
              People · The World's Largest City
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══ ACT 3: SCHOLARS ═════════════════════ */}
      {frame >= 238 && frame < 400 && (
        <AbsoluteFill style={{ opacity: clamp(frame, 240, 260, 0, 1) * scholarsFadeOut }}>
          {/* Section label */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: isMobile ? '5%' : '7%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: scholarsLabelOp,
            }}
          >
            <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(28), letterSpacing: '0.3em', color: DIM, textTransform: 'uppercase' }}>
              850 CE
            </div>
            <div style={{ fontFamily: 'Georgia, "Playfair Display", serif', fontSize: fontSize(72), fontWeight: 700, color: TEAL_BRIGHT, marginTop: 10 }}>
              The Polymaths
            </div>
          </div>

          {/* Scholar cards — staggered reveal */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 28 : 48,
              alignItems: 'center',
            }}
          >
            {SCHOLARS.map((scholar, i) => {
              const revealStart = 260 + i * 22;
              const op = ease(frame, revealStart, revealStart + 18, 0, 1);
              const y = ease(frame, revealStart, revealStart + 18, 30, 0);
              return (
                <div
                  key={scholar.name}
                  style={{
                    textAlign: 'center',
                    opacity: op,
                    transform: `translateY(${y}px)`,
                    width: isMobile ? 'auto' : 280,
                  }}
                >
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(72), color: scholar.color, lineHeight: 1, marginBottom: 12, textShadow: `0 0 30px ${scholar.color}40` }}>
                    {scholar.icon}
                  </div>
                  <div style={{ fontFamily: 'Georgia, "Playfair Display", serif', fontSize: fontSize(32), fontWeight: 700, color: TEXT, lineHeight: 1.2 }}>
                    {scholar.name}
                  </div>
                  <div style={{ fontFamily: 'Georgia, "Cormorant Garamond", serif', fontSize: fontSize(20), color: scholar.color, marginTop: 6, letterSpacing: '0.05em' }}>
                    {scholar.field}
                  </div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(16), color: DIM, marginTop: 4, letterSpacing: '0.15em' }}>
                    {scholar.year}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: isMobile ? '8%' : '10%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: ease(frame, 350, 375, 0, 1),
            }}
          >
            <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(36), color: GOLD, fontStyle: 'italic' }}>
              10,000+ texts translated · 6 fields of science created
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ══ ACT 4: KNOWLEDGE GRAPH ══════════════ */}
      {frame >= 388 && frame < 700 && (() => {
        const isDestructPhase = frame >= 540;
        const dp = isDestructPhase ? destructProgress : 0;
        const baseOp = isDestructPhase
          ? destructFadeIn * destructFadeOut
          : graphFadeIn * graphFadeOut;

        // Graph area
        const gx = isMobile ? width * 0.05 : width * 0.12;
        const gy = isMobile ? height * 0.18 : height * 0.18;
        const gw = isMobile ? width * 0.9 : width * 0.76;
        const gh = isMobile ? height * 0.65 : height * 0.65;

        return (
          <AbsoluteFill style={{ opacity: baseOp }}>
            {/* Red destruction overlay */}
            {isDestructPhase && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(ellipse at 50% 50%, ${RED_DARK}, transparent 70%)`,
                  opacity: redOverlay - redFadeOut + 0.35,
                }}
              />
            )}

            {/* Section label */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: isMobile ? '4%' : '6%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
              }}
            >
              {!isDestructPhase ? (
                <>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(28), letterSpacing: '0.3em', color: DIM, textTransform: 'uppercase', opacity: graphLabelOp }}>
                    How Knowledge Traveled
                  </div>
                  <div style={{ fontFamily: 'Georgia, "Playfair Display", serif', fontSize: fontSize(60), fontWeight: 700, color: TEAL_BRIGHT, marginTop: 10, opacity: graphLabelOp }}>
                    The Transmission
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(28), letterSpacing: '0.3em', color: RED, textTransform: 'uppercase', opacity: destructFadeIn }}>
                    February 1258
                  </div>
                  <div style={{ fontFamily: 'Georgia, "Playfair Display", serif', fontSize: fontSize(60), fontWeight: 700, color: RED, marginTop: 10, opacity: destructFadeIn }}>
                    The Destruction
                  </div>
                </>
              )}
            </div>

            {/* Knowledge graph SVG */}
            <svg
              style={{ position: 'absolute', left: gx, top: gy, width: gw, height: gh }}
            >
              {/* Edges */}
              {GRAPH_EDGES.map((edge, i) => {
                const fromNode = GRAPH_NODES[edge.from];
                const toNode = GRAPH_NODES[edge.to];
                const edgeStart = 410 + i * 12;
                const edgeProgress = ease(frame, edgeStart, edgeStart + 25, 0, 1);

                const x1 = fromNode.x * gw + (isDestructPhase ? fromNode.scatter.dx * dp : 0);
                const y1 = fromNode.y * gh + (isDestructPhase ? fromNode.scatter.dy * dp : 0);
                const x2 = toNode.x * gw + (isDestructPhase ? toNode.scatter.dx * dp : 0);
                const y2 = toNode.y * gh + (isDestructPhase ? toNode.scatter.dy * dp : 0);

                const ex = x1 + (x2 - x1) * edgeProgress;
                const ey = y1 + (y2 - y1) * edgeProgress;

                const edgeColor = isDestructPhase && dp > 0.3 ? RED : TEAL_BRIGHT;
                const edgeOp = isDestructPhase ? Math.max(0.05, 1 - dp * 0.9) : edgeProgress * 0.5;

                return (
                  <line
                    key={`edge-${i}`}
                    x1={x1} y1={y1}
                    x2={frame < edgeStart + 25 ? ex : x2}
                    y2={frame < edgeStart + 25 ? ey : y2}
                    stroke={edgeColor}
                    strokeWidth={2}
                    opacity={edgeOp}
                    strokeDasharray="6 4"
                  />
                );
              })}

              {/* Nodes */}
              {GRAPH_NODES.map((node, i) => {
                const nodeStart = 405 + i * 10;
                const nodeScale = ease(frame, nodeStart, nodeStart + 15, 0, 1);
                const nx = node.x * gw + (isDestructPhase ? node.scatter.dx * dp : 0);
                const ny = node.y * gh + (isDestructPhase ? node.scatter.dy * dp : 0);
                const nodeOp = isDestructPhase ? Math.max(0.05, 1 - dp * 0.85) : nodeScale;
                const rot = isDestructPhase ? node.scatter.rot * dp : 0;

                return (
                  <g key={node.id} transform={`translate(${nx}, ${ny}) rotate(${rot})`} opacity={nodeOp}>
                    {/* Glow */}
                    <circle r={14 * nodeScale} fill={node.color} opacity={0.15 + 0.05 * Math.sin(frame * 0.06 + i)} />
                    {/* Core */}
                    <circle r={7 * nodeScale} fill={node.color} opacity={0.9} />
                    {/* Label */}
                    <text
                      y={22}
                      textAnchor="middle"
                      fill={TEXT}
                      fontSize={isMobile ? 9 : 13}
                      fontFamily="Georgia, 'Cormorant Garamond', serif"
                      fontWeight="600"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}

              {/* Phase labels */}
              {!isDestructPhase && ['Greek', 'Translators', 'Arabic', 'European'].map((label, i) => {
                const xs = [0.08, 0.32, 0.58, 0.85];
                const phaseOp = ease(frame, 400 + i * 25, 420 + i * 25, 0, 0.6);
                return (
                  <text
                    key={label}
                    x={xs[i] * gw}
                    y={-8}
                    textAnchor="middle"
                    fill={DIM}
                    fontSize={isMobile ? 9 : 12}
                    fontFamily="Georgia, serif"
                    letterSpacing="0.15em"
                    opacity={phaseOp}
                  >
                    {label.toUpperCase()}
                  </text>
                );
              })}
            </svg>

            {/* Destruction stats */}
            {isDestructPhase && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: isMobile ? '8%' : '10%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  opacity: ease(frame, 600, 640, 0, 1) * destructFadeOut,
                }}
              >
                <div style={{ fontFamily: 'Georgia, "Playfair Display", serif', fontSize: fontSize(80), fontWeight: 900, color: RED, lineHeight: 1 }}>
                  3,000,000
                </div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: fontSize(28), color: TEXT, opacity: 0.7, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8 }}>
                  Books Drowned in the Tigris
                </div>
              </div>
            )}
          </AbsoluteFill>
        );
      })()}

      {/* ══ ACT 6: END CARD ═════════════════════ */}
      {frame >= 688 && (
        <AbsoluteFill
          style={{
            opacity: endFadeIn,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Reassembled mini graph — subtle background */}
          <svg
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '85%' : '50%',
              height: 'auto',
              opacity: reassembleProgress * 0.15,
            }}
            viewBox="0 0 400 300"
          >
            {GRAPH_NODES.slice(0, 8).map((node, i) => {
              const nx = node.x * 400;
              const ny = node.y * 300;
              return (
                <circle
                  key={i}
                  cx={nx}
                  cy={ny}
                  r={5 * reassembleProgress}
                  fill={TEAL_BRIGHT}
                  opacity={reassembleProgress * 0.5}
                />
              );
            })}
            {GRAPH_EDGES.slice(0, 6).map((edge, i) => {
              const f = GRAPH_NODES[edge.from];
              const t = GRAPH_NODES[edge.to];
              return (
                <line
                  key={i}
                  x1={f.x * 400} y1={f.y * 300}
                  x2={t.x * 400} y2={t.y * 300}
                  stroke={TEAL_BRIGHT}
                  strokeWidth={1}
                  opacity={reassembleProgress * 0.3}
                />
              );
            })}
          </svg>

          {/* Quote */}
          <div
            style={{
              textAlign: 'center',
              maxWidth: isMobile ? '85%' : '70%',
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontSize: fontSize(64),
                fontWeight: 700,
                color: TEXT,
                lineHeight: 1.3,
                fontStyle: 'italic',
                opacity: quoteOp,
              }}
            >
              "But knowledge, once released,
              <br />
              cannot be un-known."
            </div>

            <div
              style={{
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontSize: fontSize(52),
                fontWeight: 700,
                color: GOLD,
                marginTop: 60,
                opacity: endFadeIn,
              }}
            >
              The Library That Lit the World
            </div>

            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: fontSize(24),
                letterSpacing: '0.3em',
                color: DIM,
                textTransform: 'uppercase',
                marginTop: 16,
                opacity: endFadeIn,
              }}
            >
              The House of Wisdom · 762–1258 CE
            </div>

            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: fontSize(28),
                color: TEXT,
                opacity: siteOp * 0.4,
                letterSpacing: '0.15em',
                marginTop: 50,
              }}
            >
              pastlives.site
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
