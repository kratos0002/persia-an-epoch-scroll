import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';

/* ── Color Palette (from the essay) ──────────── */
const BG = 'hsl(30, 15%, 8%)';
const TEXT = 'hsl(40, 30%, 90%)';
const SAFFRON = 'hsl(30, 65%, 45%)';
const GOLD = 'hsl(43, 70%, 55%)';
const THERAVADA = 'hsl(35, 75%, 50%)';
const MAHAYANA = 'hsl(350, 50%, 45%)';
const VAJRAYANA = 'hsl(270, 45%, 45%)';
const ZEN = 'hsl(150, 25%, 35%)';
const DIM = 'hsl(35, 20%, 55%)';

/* ── Seeded PRNG ─────────────────────────────── */
function mkRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/* ── Bodhi Tree geometry ─────────────────────── */
// Trunk + main branches as SVG paths
const TRUNK = 'M300,580 Q298,480 300,400 Q302,350 300,300';
const BRANCHES = [
  // Main branches spreading outward
  { path: 'M300,400 Q250,350 200,310 Q170,290 150,260', color: SAFFRON, delay: 0 },
  { path: 'M300,400 Q350,350 400,310 Q430,290 450,260', color: SAFFRON, delay: 4 },
  { path: 'M300,340 Q240,300 190,250 Q160,220 140,180', color: THERAVADA, delay: 12 },
  { path: 'M300,340 Q360,300 410,250 Q440,220 460,180', color: MAHAYANA, delay: 16 },
  { path: 'M300,300 Q260,260 220,210 Q190,180 170,140', color: THERAVADA, delay: 24 },
  { path: 'M300,300 Q340,260 380,210 Q410,180 430,140', color: VAJRAYANA, delay: 28 },
  // Smaller branches
  { path: 'M200,310 Q180,280 160,250', color: THERAVADA, delay: 20 },
  { path: 'M400,310 Q420,280 440,250', color: MAHAYANA, delay: 22 },
  { path: 'M190,250 Q170,210 150,170', color: THERAVADA, delay: 30 },
  { path: 'M410,250 Q430,210 450,170', color: ZEN, delay: 34 },
  { path: 'M300,300 Q300,250 300,200 Q300,160 300,120', color: GOLD, delay: 20 },
  // Top canopy branches
  { path: 'M220,210 Q200,170 190,130', color: THERAVADA, delay: 36 },
  { path: 'M380,210 Q400,170 410,130', color: VAJRAYANA, delay: 38 },
];

/* ── Leaf clusters (circles at branch tips) ──── */
interface Leaf {
  cx: number;
  cy: number;
  r: number;
  color: string;
  delay: number;
}

function generateLeaves(): Leaf[] {
  const rng = mkRng(42);
  const leaves: Leaf[] = [];
  // Canopy area: cluster of circles around the top of the tree
  const centers = [
    { x: 150, y: 170, color: THERAVADA },
    { x: 190, y: 130, color: THERAVADA },
    { x: 140, y: 210, color: THERAVADA },
    { x: 170, y: 140, color: THERAVADA },
    { x: 300, y: 110, color: GOLD },
    { x: 300, y: 140, color: GOLD },
    { x: 430, y: 140, color: VAJRAYANA },
    { x: 450, y: 170, color: VAJRAYANA },
    { x: 460, y: 200, color: ZEN },
    { x: 410, y: 130, color: VAJRAYANA },
    { x: 440, y: 250, color: MAHAYANA },
    { x: 160, y: 250, color: THERAVADA },
    { x: 260, y: 150, color: SAFFRON },
    { x: 340, y: 150, color: SAFFRON },
    { x: 230, y: 180, color: THERAVADA },
    { x: 370, y: 180, color: MAHAYANA },
  ];

  centers.forEach((c, i) => {
    // 3-5 leaf circles per center
    const count = 3 + Math.floor(rng() * 3);
    for (let j = 0; j < count; j++) {
      leaves.push({
        cx: c.x + (rng() - 0.5) * 40,
        cy: c.y + (rng() - 0.5) * 30,
        r: 8 + rng() * 18,
        color: c.color,
        delay: i * 2 + j * 1.5,
      });
    }
  });
  return leaves;
}

const LEAVES = generateLeaves();

/* ── Roots ───────────────────────────────────── */
const ROOTS = [
  'M300,580 Q280,600 260,620 Q240,635 220,640',
  'M300,580 Q320,600 340,620 Q360,635 380,640',
  'M300,580 Q290,610 280,630',
  'M300,580 Q310,610 320,630',
  'M300,580 Q270,595 250,610',
  'M300,580 Q330,595 350,610',
];

/* ── Timeline events ─────────────────────────── */
const EVENTS = [
  { year: '528 BCE', label: 'Awakening', frame: 100 },
  { year: '268 BCE', label: 'Ashoka', frame: 150 },
  { year: '100 CE', label: 'First Split', frame: 195 },
  { year: '700 CE', label: 'Vajrayana', frame: 245 },
  { year: 'Today', label: '500M+', frame: 310 },
];

/* ── Lotus petal path generator ──────────────── */
function lotusPetal(cx: number, cy: number, angle: number, size: number): string {
  const rad = (angle * Math.PI) / 180;
  const tipX = cx + Math.cos(rad) * size;
  const tipY = cy + Math.sin(rad) * size;
  const perpRad = rad + Math.PI / 2;
  const width = size * 0.35;
  const cp1x = cx + Math.cos(rad) * size * 0.5 + Math.cos(perpRad) * width;
  const cp1y = cy + Math.sin(rad) * size * 0.5 + Math.sin(perpRad) * width;
  const cp2x = cx + Math.cos(rad) * size * 0.5 - Math.cos(perpRad) * width;
  const cp2y = cy + Math.sin(rad) * size * 0.5 - Math.sin(perpRad) * width;
  return `M${cx},${cy} Q${cp1x},${cp1y} ${tipX},${tipY} Q${cp2x},${cp2y} ${cx},${cy}`;
}

/* ── Main Composition ────────────────────────── */
export const BuddhismTeaser: React.FC<{ layout: 'desktop' | 'mobile' }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isMobile = layout === 'mobile';

  /* ── Timing (450 frames / 15s at 30fps) ──
   * 0-60:    Lotus blooms at center + title fades in
   * 40-90:   Lotus fades, tree trunk draws up from bottom
   * 80-200:  Branches grow outward, leaves appear
   * 180-300: Branches colored by tradition, counter rises
   * 280-340: Tagline appears
   * 350-380: Main fades out
   * 370-420: End card
   * 420-450: Hold
   */

  // Lotus
  const lotusCx = width * 0.5;
  const lotusCy = isMobile ? height * 0.18 : height * 0.25;
  const lotusSize = isMobile ? 50 : 60;
  const lotusOpacity = interpolate(frame, [0, 30, 55, 75], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const lotusPetalProgress = interpolate(frame, [5, 45], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const lotusCenterScale = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Title
  const titleOpacity = interpolate(frame, [10, 45], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = interpolate(frame, [10, 50], [1.06, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  // Tree area
  const treeW = isMobile ? width * 0.85 : width * 0.5;
  const treeH = isMobile ? height * 0.55 : height * 0.7;
  const treeX = (width - treeW) / 2;
  const treeY = isMobile ? height * 0.22 : height * 0.12;

  // Trunk draw
  const trunkProgress = interpolate(frame, [50, 100], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const treeOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Roots draw
  const rootsProgress = interpolate(frame, [55, 95], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Counter: 1 → 500M
  const counterRaw = interpolate(frame, [180, 330], [1, 500], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const counterRounded = Math.round(counterRaw);
  const counterValue = counterRaw < 2 ? '1' : `${counterRounded}M+`;
  const counterLabel = counterRaw < 2 ? 'Teacher' : 'Followers Worldwide';
  const counterOpacity = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // End card
  const endCardOpacity = interpolate(frame, [370, 400], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mainFadeOut = interpolate(frame, [350, 380], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Timeline
  const timelineY = isMobile ? height * 0.88 : height * 0.93;
  const timelineX1 = isMobile ? width * 0.06 : width * 0.25;
  const timelineX2 = isMobile ? width * 0.94 : width * 0.75;
  const timelineProgress = interpolate(frame, [90, 330], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const timelineOpacity = interpolate(frame, [85, 100], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const titleX = width * 0.5;
  const titleY = isMobile ? height * 0.09 : height * 0.10;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% ${isMobile ? '35%' : '45%'}, hsl(30, 20%, 12%, 0.4) 0%, transparent 55%)`,
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div style={{ opacity: mainFadeOut }}>

        {/* Title */}
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
              fontSize: isMobile ? 38 : 48,
              fontWeight: 900,
              color: GOLD,
              lineHeight: 1.1,
            }}
          >
            The Path That Split
          </div>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 10 : 12,
              letterSpacing: '0.3em',
              color: DIM,
              marginTop: 10,
              textTransform: 'uppercase',
              opacity: interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            2,500 Years of Buddhism
          </div>
        </div>

        {/* Counter */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? width * 0.5 : width * 0.5,
            top: isMobile ? height * 0.16 : height * 0.19,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            opacity: counterOpacity * mainFadeOut,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 50 : 64,
              fontWeight: 900,
              color: GOLD,
              lineHeight: 1,
            }}
          >
            {counterValue}
          </div>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 9 : 11,
              letterSpacing: '0.3em',
              color: DIM,
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            {counterLabel}
          </div>
        </div>

        {/* ── BODHI TREE ── */}
        <svg
          viewBox="0 0 600 660"
          style={{
            position: 'absolute',
            left: treeX,
            top: treeY,
            width: treeW,
            height: treeH,
            opacity: treeOpacity,
          }}
        >
          {/* Roots */}
          {ROOTS.map((rPath, i) => (
            <path
              key={`root-${i}`}
              d={rPath}
              fill="none"
              stroke={SAFFRON}
              strokeWidth={2.5 - i * 0.2}
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={200 * (1 - rootsProgress)}
              opacity={0.4}
            />
          ))}

          {/* Trunk */}
          <path
            d={TRUNK}
            fill="none"
            stroke={SAFFRON}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset={400 * (1 - trunkProgress)}
            opacity={0.8}
          />

          {/* Branches */}
          {BRANCHES.map((branch, i) => {
            const branchStart = 80 + branch.delay * 3;
            const branchEnd = branchStart + 40;
            const progress = interpolate(frame, [branchStart, branchEnd], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });

            return (
              <path
                key={`branch-${i}`}
                d={branch.path}
                fill="none"
                stroke={branch.color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="300"
                strokeDashoffset={300 * (1 - progress)}
                opacity={progress * 0.7}
              />
            );
          })}

          {/* Leaf clusters */}
          {LEAVES.map((leaf, i) => {
            const leafStart = 120 + leaf.delay * 3;
            const leafScale = interpolate(frame, [leafStart, leafStart + 20], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });
            if (leafScale <= 0) return null;

            return (
              <circle
                key={`leaf-${i}`}
                cx={leaf.cx}
                cy={leaf.cy}
                r={leaf.r * leafScale}
                fill={leaf.color}
                fillOpacity={0.15 + leafScale * 0.15}
              />
            );
          })}

          {/* Lotus at center-top (early phase only) */}
          <g opacity={lotusOpacity} transform={`translate(300, ${isMobile ? 100 : 130})`}>
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const petalDelay = i * 0.15;
              const petalProg = interpolate(lotusPetalProgress, [petalDelay, petalDelay + 0.4], [0, 1], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              });
              return (
                <path
                  key={`petal-${i}`}
                  d={lotusPetal(0, 0, -90 + angle, lotusSize)}
                  fill={GOLD}
                  fillOpacity={petalProg * 0.5}
                  stroke={GOLD}
                  strokeWidth={1}
                  strokeOpacity={petalProg * 0.6}
                />
              );
            })}
            <circle r={8 * lotusCenterScale} fill={GOLD} fillOpacity={0.7} />
          </g>
        </svg>

        {/* Tagline */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: isMobile ? '10%' : '14%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: interpolate(frame, [280, 330], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * mainFadeOut,
            zIndex: 10,
          }}
        >
          <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 11 : 14, color: DIM, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            One awakening under a tree.
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 11 : 14, color: GOLD, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>
            A thousand traditions.
          </div>
        </div>

        {/* Timeline bar */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, width, height, pointerEvents: 'none' }}
          opacity={timelineOpacity * mainFadeOut}
        >
          <line x1={timelineX1} y1={timelineY} x2={timelineX2} y2={timelineY} stroke="hsl(30, 12%, 18%)" strokeWidth="1" />
          <line
            x1={timelineX1}
            y1={timelineY}
            x2={timelineX1 + (timelineX2 - timelineX1) * timelineProgress}
            y2={timelineY}
            stroke={GOLD}
            strokeWidth="2.5"
          />
          {EVENTS.map((evt) => {
            const evtProgress = interpolate(frame, [evt.frame - 10, evt.frame + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const evtX = timelineX1 + ((evt.frame - 100) / 210) * (timelineX2 - timelineX1);
            return (
              <g key={evt.year} opacity={evtProgress}>
                <circle cx={evtX} cy={timelineY} r={3.5} fill={GOLD} />
                <text x={evtX} y={timelineY - 12} textAnchor="middle" fill={TEXT} fontSize={isMobile ? 8 : 10} fontFamily="Georgia, serif" fontWeight="700">{evt.year}</text>
                <text x={evtX} y={timelineY + 18} textAnchor="middle" fill={DIM} fontSize={isMobile ? 7 : 8.5} fontFamily="Georgia, serif">{evt.label}</text>
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
          The Path That Split
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 13 : 16, color: GOLD, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 14 }}>
          2,500 Years of Buddhism
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 10 : 13, color: TEXT, opacity: 0.35, letterSpacing: '0.15em', marginTop: 28, fontStyle: 'italic' }}>
          The finger pointing at the moon is not the moon.
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 10 : 13, color: TEXT, opacity: 0.3, letterSpacing: '0.15em', marginTop: 24 }}>
          pastlives.site
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
