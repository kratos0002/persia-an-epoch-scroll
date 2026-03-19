import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring,
} from 'remotion';

const BUNKER = '#0d1117';
const GEIGER = '#2ecc71';
const STEEL = '#7a8a99';
const LIGHT = '#e0e0e0';

const NATIONS = [
  { name: 'USA', year: 1945, color: '#4a90d9', x: 0.24, y: 0.37 },
  { name: 'USSR', year: 1949, color: '#d94040', x: 0.62, y: 0.2 },
  { name: 'UK', year: 1952, color: '#4a7fb5', x: 0.49, y: 0.27 },
  { name: 'France', year: 1960, color: '#5a7fd9', x: 0.51, y: 0.32 },
  { name: 'China', year: 1964, color: '#b33a3a', x: 0.80, y: 0.38 },
  { name: 'Israel', year: 1966, color: '#7a8aaa', x: 0.56, y: 0.46 },
  { name: 'India', year: 1974, color: '#d98c3a', x: 0.71, y: 0.43 },
  { name: 'Pakistan', year: 1998, color: '#3daa6d', x: 0.69, y: 0.39 },
  { name: 'N. Korea', year: 2006, color: '#d9c33a', x: 0.81, y: 0.34 },
];

const CHAINS = [
  { from: 0, to: 1 }, // USA → USSR (espionage)
  { from: 0, to: 2 }, // USA → UK (partnership)
  { from: 1, to: 4 }, // USSR → China (Soviet help)
  { from: 3, to: 5 }, // France → Israel (Dimona)
  // India — independent program (no incoming chain)
  { from: 6, to: 7 }, // India → Pakistan (rivalry)
  { from: 7, to: 8 }, // Pakistan → N. Korea (Khan)
];

/* ── Title Card ────────────────────────────── */
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const essayLabel = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [30, 70], [80, 0], { extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [30, 70], [0, 1], { extrapolateRight: 'clamp' });
  const reactionOp = interpolate(frame, [50, 90], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleOp = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [140, 170], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BUNKER,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(${GEIGER}60 1px, transparent 1px),
            linear-gradient(90deg, ${GEIGER}60 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      <div style={{ textAlign: 'center', transform: `translateY(${titleY}px)` }}>
        <p
          style={{
            fontSize: 40,
            letterSpacing: '0.5em',
            color: STEEL,
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            opacity: essayLabel,
            marginBottom: 40,
          }}
        >
          ESSAY X
        </p>
        <h1
          style={{
            fontSize: 220,
            fontWeight: 900,
            color: LIGHT,
            fontFamily: 'Georgia, "Times New Roman", serif',
            lineHeight: 0.9,
            opacity: titleOp,
          }}
        >
          The Chain
        </h1>
        <h1
          style={{
            fontSize: 220,
            fontWeight: 900,
            fontStyle: 'italic',
            color: GEIGER,
            fontFamily: 'Georgia, "Times New Roman", serif',
            lineHeight: 0.9,
            opacity: reactionOp,
          }}
        >
          Reaction
        </h1>
        <p
          style={{
            fontSize: 48,
            color: STEEL,
            fontFamily: 'system-ui, sans-serif',
            marginTop: 60,
            opacity: subtitleOp,
            maxWidth: 2000,
          }}
        >
          How nine countries built the bomb — through espionage,
          ambition, desperation, and pride.
        </p>
      </div>
    </AbsoluteFill>
  );
};

/* ── Nation Reveal Dot ─────────────────────── */
const NationDot: React.FC<{
  nation: (typeof NATIONS)[0];
  revealFrame: number;
  width: number;
  height: number;
}> = ({ nation, revealFrame, width, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appeared = frame >= revealFrame;
  if (!appeared) return null;

  const localFrame = frame - revealFrame;
  const scale = spring({ frame: localFrame, fps, config: { stiffness: 200, damping: 20 } });
  const labelOp = interpolate(localFrame, [8, 20], [0, 1], { extrapolateRight: 'clamp' });

  const cx = nation.x * width;
  const cy = nation.y * height;

  return (
    <div
      style={{
        position: 'absolute',
        left: cx,
        top: cy,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      {/* Pulse ring */}
      <div
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: `2px solid ${nation.color}`,
          left: -40,
          top: -40,
          opacity: interpolate((localFrame % 60), [0, 60], [0.6, 0], { extrapolateRight: 'clamp' }),
          transform: `scale(${1 + (localFrame % 60) / 30})`,
        }}
      />
      {/* Dot */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: nation.color,
          position: 'absolute',
          left: -14,
          top: -14,
          boxShadow: `0 0 30px ${nation.color}60`,
        }}
      />
      {/* Label */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: labelOp,
          whiteSpace: 'nowrap',
        }}
      >
        <p
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: nation.color,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {nation.name}
        </p>
        <p style={{ fontSize: 26, color: STEEL, fontFamily: 'system-ui, sans-serif' }}>
          {nation.year}
        </p>
      </div>
    </div>
  );
};

/* ── Chain Line ────────────────────────────── */
const ChainLine: React.FC<{
  from: (typeof NATIONS)[0];
  to: (typeof NATIONS)[0];
  revealFrame: number;
  width: number;
  height: number;
}> = ({ from, to, revealFrame, width, height }) => {
  const frame = useCurrentFrame();
  if (frame < revealFrame) return null;

  const localFrame = frame - revealFrame;
  const progress = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const x1 = from.x * width;
  const y1 = from.y * height;
  const x2 = to.x * width;
  const y2 = to.y * height;

  const ex = x1 + (x2 - x1) * progress;
  const ey = y1 + (y2 - y1) * progress;

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={ex}
        y2={ey}
        stroke={GEIGER}
        strokeWidth={3}
        strokeDasharray="12 8"
        opacity={0.4}
      />
      {/* Glowing particle at tip */}
      {progress < 1 && (
        <circle cx={ex} cy={ey} r={8} fill={GEIGER} opacity={0.8} />
      )}
    </svg>
  );
};

/* ── Map Section ───────────────────────────── */
const MapSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [340, 370], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Stagger nations appearing every 35 frames (~1.2s each)
  const nationFrames = NATIONS.map((_, i) => 20 + i * 35);
  // Chain lines appear 15 frames after the destination nation
  const chainFrames = CHAINS.map((c) => nationFrames[c.to] + 5);

  return (
    <AbsoluteFill style={{ background: BUNKER, opacity: fadeIn * fadeOut }}>
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [10, 30], [0, 0.6], { extrapolateRight: 'clamp' }),
        }}
      >
        <p
          style={{
            fontSize: 36,
            letterSpacing: '0.4em',
            color: STEEL,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          THE CHAIN OF PROLIFERATION · 1945–2017
        </p>
      </div>

      {/* Chain lines */}
      {CHAINS.map((chain, i) => (
        <ChainLine
          key={`chain-${i}`}
          from={NATIONS[chain.from]}
          to={NATIONS[chain.to]}
          revealFrame={chainFrames[i]}
          width={width}
          height={height}
        />
      ))}

      {/* Nation dots */}
      {NATIONS.map((nation, i) => (
        <NationDot
          key={nation.name}
          nation={nation}
          revealFrame={nationFrames[i]}
          width={width}
          height={height}
        />
      ))}

      {/* Counter */}
      {(() => {
        const count = NATIONS.filter((_, i) => frame >= nationFrames[i]).length;
        return (
          <div
            style={{
              position: 'absolute',
              bottom: 100,
              right: 120,
              textAlign: 'right',
            }}
          >
            <p style={{ fontSize: 120, fontWeight: 900, color: GEIGER, fontFamily: 'Georgia, serif' }}>
              {count}
            </p>
            <p style={{ fontSize: 32, color: STEEL, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.2em' }}>
              NATIONS
            </p>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ── Closing Card ──────────────────────────── */
const ClosingCard: React.FC = () => {
  const frame = useCurrentFrame();

  const numberOp = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });
  const quoteOp = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BUNKER,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: 36,
            letterSpacing: '0.3em',
            color: STEEL,
            fontFamily: 'system-ui, sans-serif',
            marginBottom: 20,
            opacity: numberOp,
          }}
        >
          TOTAL ESTIMATED WARHEADS WORLDWIDE
        </p>
        <p
          style={{
            fontSize: 280,
            fontWeight: 900,
            color: GEIGER,
            fontFamily: 'Georgia, "Times New Roman", serif',
            lineHeight: 1,
            opacity: numberOp,
          }}
        >
          12,121
        </p>
        <p
          style={{
            fontSize: 44,
            color: STEEL,
            fontFamily: 'system-ui, sans-serif',
            marginTop: 40,
            opacity: textOp,
          }}
        >
          enough to destroy civilization several times over
        </p>
        <p
          style={{
            fontSize: 40,
            color: LIGHT,
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontStyle: 'italic',
            marginTop: 100,
            maxWidth: 2600,
            opacity: quoteOp,
          }}
        >
          "I know not with what weapons World War III will be fought,
          <br />
          but World War IV will be fought with sticks and stones."
        </p>
        <p
          style={{
            fontSize: 28,
            color: STEEL,
            fontFamily: 'system-ui, sans-serif',
            marginTop: 20,
            opacity: quoteOp,
          }}
        >
          — Albert Einstein
        </p>
      </div>
    </AbsoluteFill>
  );
};

/* ── Main Composition ──────────────────────── */
export const ChainReactionTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BUNKER }}>
      {/* Title card: frames 0–170 */}
      <Sequence from={0} durationInFrames={180}>
        <TitleCard />
      </Sequence>

      {/* Map section: frames 170–540 */}
      <Sequence from={170} durationInFrames={380}>
        <MapSection />
      </Sequence>

      {/* Closing card: frames 490–600 */}
      <Sequence from={490} durationInFrames={110}>
        <ClosingCard />
      </Sequence>
    </AbsoluteFill>
  );
};
