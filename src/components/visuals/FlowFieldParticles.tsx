/**
 * FlowFieldParticles — ambient phase-aware particle layer.
 *
 * Canvas-based (not WebGL — particle counts ~150 are well within CPU budget
 * and the simpler authoring model is worth more than GPU headroom here).
 * Particles drift through a noise-driven flow field; each phase remaps the
 * field's primary direction, particle palette, density, and lifetime to
 * evoke a different ambient mood:
 *
 *   - 'desert'   — warm dust drifting east on a slow horizontal current
 *   - 'monsoon'  — long blue-grey wind streaks, fast diagonal flow
 *   - 'steppe'   — sparse cold motes, gentle vertical fall
 *   - 'plague'   — slow grey ash, low alpha, sparse — Black Death moment
 *   - 'sahara'   — dense ochre sandstorm, strong horizontal drive
 *
 * Used as an overlay inside ZoomDive's map panel. Pointer-events disabled.
 */
import React, { useEffect, useRef } from 'react';

export type FlowFieldMood = 'desert' | 'monsoon' | 'steppe' | 'plague' | 'sahara';

export interface FlowFieldParticlesProps {
  mood: FlowFieldMood;
  /** Override base particle count (default per-mood). */
  count?: number;
  /** 0–1, fades the whole layer. Default 0.65. */
  opacity?: number;
  /** Render-on-top z-index (default 4 — above paper, below grain). */
  zIndex?: number;
  className?: string;
}

interface MoodConfig {
  count: number;
  /** Primary flow direction in radians. Particles tend this way. */
  baseAngle: number;
  /** How strongly the noise field perturbs the base direction (0–1). */
  noiseAmount: number;
  /** Pixels per second base velocity. */
  speed: number;
  /** RGB tuples for particle palette. */
  palette: Array<[number, number, number]>;
  /** Per-particle min/max alpha. */
  alpha: [number, number];
  /** Particle radius in px. */
  radius: [number, number];
  /** Lifetime in seconds. */
  life: [number, number];
  /** Streak vs dot. 0 = dot, 1 = long streak. */
  streak: number;
}

const MOODS: Record<FlowFieldMood, MoodConfig> = {
  desert: {
    count: 120,
    baseAngle: Math.PI * 0.04, // east-southeast drift
    noiseAmount: 0.5,
    speed: 22,
    palette: [
      [212, 168, 110],
      [194, 142, 84],
      [232, 198, 142],
    ],
    alpha: [0.06, 0.22],
    radius: [0.6, 1.8],
    life: [4, 9],
    streak: 0.2,
  },
  monsoon: {
    count: 200,
    baseAngle: Math.PI * 0.85, // northwest, returning sailors
    noiseAmount: 0.3,
    speed: 65,
    palette: [
      [120, 155, 175],
      [98, 130, 158],
      [165, 195, 210],
    ],
    alpha: [0.08, 0.26],
    radius: [0.4, 1.2],
    life: [2, 5],
    streak: 0.85,
  },
  steppe: {
    count: 80,
    baseAngle: Math.PI * 0.5, // straight down, snow-like
    noiseAmount: 0.6,
    speed: 18,
    palette: [
      [220, 225, 230],
      [200, 210, 218],
      [240, 240, 245],
    ],
    alpha: [0.1, 0.32],
    radius: [0.5, 1.4],
    life: [5, 10],
    streak: 0.1,
  },
  plague: {
    count: 60,
    baseAngle: Math.PI * 0.55, // slow falling
    noiseAmount: 0.7,
    speed: 12,
    palette: [
      [80, 75, 70],
      [60, 58, 55],
      [110, 100, 92],
    ],
    alpha: [0.05, 0.18],
    radius: [0.6, 1.6],
    life: [6, 14],
    streak: 0.05,
  },
  sahara: {
    count: 240,
    baseAngle: Math.PI * 0.02, // strong easterly
    noiseAmount: 0.4,
    speed: 90,
    palette: [
      [200, 150, 90],
      [218, 175, 115],
      [180, 130, 70],
    ],
    alpha: [0.1, 0.32],
    radius: [0.6, 1.6],
    life: [2, 5],
    streak: 0.7,
  },
};

interface Particle {
  x: number;
  y: number;
  age: number;
  life: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: [number, number, number];
}

// ── Cheap value noise for the flow field. Single-octave is enough for ambient drift. ──
function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}
function vnoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  const ux = smoothstep(fx);
  const uy = smoothstep(fy);
  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
function pick<T>(arr: T[]): T {
  return arr[(Math.random() * arr.length) | 0];
}

function spawn(p: Particle, w: number, h: number, cfg: MoodConfig, fromEdge = false) {
  if (fromEdge) {
    // Spawn just off the upwind edge based on baseAngle
    const ax = Math.cos(cfg.baseAngle);
    const ay = Math.sin(cfg.baseAngle);
    if (Math.abs(ax) > Math.abs(ay)) {
      p.x = ax > 0 ? -10 : w + 10;
      p.y = Math.random() * h;
    } else {
      p.x = Math.random() * w;
      p.y = ay > 0 ? -10 : h + 10;
    }
  } else {
    p.x = Math.random() * w;
    p.y = Math.random() * h;
  }
  p.age = 0;
  p.life = rand(cfg.life[0], cfg.life[1]);
  p.r = rand(cfg.radius[0], cfg.radius[1]);
  p.alpha = rand(cfg.alpha[0], cfg.alpha[1]);
  p.color = pick(cfg.palette);
  p.vx = 0;
  p.vy = 0;
}

export const FlowFieldParticles: React.FC<FlowFieldParticlesProps> = ({
  mood,
  count,
  opacity = 0.65,
  zIndex = 4,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moodRef = useRef<FlowFieldMood>(mood);

  // Update moodRef so the running rAF reads the latest config without re-init
  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const initialMood = MOODS[moodRef.current];
    const N = count ?? initialMood.count;
    const particles: Particle[] = Array.from({ length: N }, () => {
      const p: Particle = {
        x: 0, y: 0, age: 0, life: 0, vx: 0, vy: 0,
        r: 1, alpha: 0.1, color: [200, 200, 200],
      };
      spawn(p, w, h, initialMood);
      p.age = Math.random() * p.life; // stagger initial ages
      return p;
    });

    let last = performance.now();
    let rafId = 0;
    const NOISE_SCALE = 0.0035;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const cfg = MOODS[moodRef.current];

      // Trail effect — fade the previous frame instead of clearing
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${cfg.streak > 0.4 ? 0.15 : 0.4})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      const baseDX = Math.cos(cfg.baseAngle);
      const baseDY = Math.sin(cfg.baseAngle);

      for (const p of particles) {
        p.age += dt;
        if (p.age > p.life || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          spawn(p, w, h, cfg, true);
          continue;
        }

        // Flow field: noise-perturbed angle around the base direction
        const n = vnoise(p.x * NOISE_SCALE, p.y * NOISE_SCALE);
        const angle = cfg.baseAngle + (n - 0.5) * Math.PI * cfg.noiseAmount;
        const speed = cfg.speed * (0.7 + n * 0.6);
        p.vx = lerp(p.vx, Math.cos(angle) * speed, 0.18);
        p.vy = lerp(p.vy, Math.sin(angle) * speed, 0.18);
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Lifecycle alpha — ease in and out
        const ageT = p.age / p.life;
        const lifeAlpha = ageT < 0.15 ? ageT / 0.15 : ageT > 0.8 ? (1 - ageT) / 0.2 : 1;
        const a = p.alpha * lifeAlpha;

        const [r, g, b] = p.color;
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;

        if (cfg.streak > 0.3) {
          // Draw as a short streak — line with rounded cap
          const len = p.r * (4 + cfg.streak * 12);
          const tx = p.x - (baseDX * len);
          const ty = p.y - (baseDY * len);
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.lineWidth = p.r;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        } else {
          // Soft dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        zIndex,
      }}
    />
  );
};
