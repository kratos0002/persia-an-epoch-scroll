import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// The seam tear SVG path gets progressively jagged
const SEAM_PATHS = {
  fold: 'M0,0 L0,2000',
  ink: 'M0,0 L0,2000',
  cut: 'M0,0 L1,80 L-1,160 L2,240 L-1,320 L1,400 L0,480 L-2,560 L1,640 L0,720 L1,800 L-1,880 L0,960 L2,1040 L-1,1120 L0,1200 L1,1280 L-1,1360 L0,1440 L2,1520 L-1,1600 L0,1680 L1,1760 L-1,1840 L0,1920 L1,2000',
  tear: 'M0,0 L3,40 L-4,80 L6,120 L-3,160 L8,200 L-5,240 L4,280 L-7,320 L5,360 L-4,400 L9,440 L-6,480 L3,520 L-8,560 L7,600 L-3,640 L5,680 L-9,720 L6,760 L-4,800 L8,840 L-5,880 L3,920 L-7,960 L6,1000 L-4,1040 L9,1080 L-6,1120 L3,1160 L-8,1200 L7,1240 L-3,1280 L5,1320 L-9,1360 L6,1400 L-4,1440 L8,1480 L-5,1520 L3,1560 L-7,1600 L6,1640 L-4,1680 L9,1720 L-6,1760 L3,1800 L-8,1840 L7,1880 L-3,1920 L5,1960 L-4,2000',
};

type SeamType = 'fold' | 'ink' | 'cut' | 'tear' | 'void';

interface SeamConfig {
  width: number;
  type: SeamType;
  drift: number;
}

const SEAM_PROGRESSION: SeamConfig[] = [
  { width: 1, type: 'fold', drift: 0 },   // Hero
  { width: 1, type: 'fold', drift: 0 },   // Architect
  { width: 2, type: 'ink', drift: 3 },    // Commission
  { width: 2, type: 'ink', drift: 3 },    // Countdown
  { width: 4, type: 'cut', drift: 10 },   // Punjab
  { width: 4, type: 'cut', drift: 10 },   // Bengal
  { width: 30, type: 'tear', drift: 20 }, // Void — the tear widens
  { width: 40, type: 'void', drift: 30 }, // Void peak
  { width: 6, type: 'tear', drift: 8 },   // Named — stillness after the tear
  { width: 4, type: 'tear', drift: 5 },   // Aftermath — closing
  { width: 2, type: 'cut', drift: 0 },    // Living Border — healed scar
];

// Resolve the current seam stage from measured section offsets rather than
// by equal-division of scroll progress.
//
// Previously this hook did `Math.floor(v * SEAM_PROGRESSION.length)` against
// total page scroll. That assumes every section takes 1/N of the scroll
// range. VoidSection is `min-h-[250vh]` while everything else is ~100vh, so
// the mapping drifted: the `void` (40px) stage bled into the start of
// NamedSection, painting a black bar across "THE FEW WHO ARE NAMED".
//
// Now: each top-level section in RadcliffeLine.tsx is wrapped with
// `data-seam-stages="n"` (or "n,m" for sections that span multiple stages,
// currently just Void: tear → peak). We measure wrapper top/bottom at
// mount and on resize/layout changes, then on scroll we find which wrapper
// contains the reading eye (35% down the viewport) and read its stage.
// Multi-stage wrappers split by local progress.
export const useSeamProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [seamConfig, setSeamConfig] = useState<SeamConfig>(SEAM_PROGRESSION[0]);

  // Framer Motion's scroll progress is the trigger source. The original hook
  // drove the seam off this same motion value; we keep that path so scroll
  // updates reach us through the same plumbing that already works in the
  // real app (some hosts scroll body/documentElement, not window, and we
  // don't want to re-discover which one). Resolution logic below is the new
  // threshold-based math.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    type WrapperInfo = { top: number; bottom: number; stages: number[] };
    let infos: WrapperInfo[] = [];

    // Prefer the document's actual scrolling element — some apps put
    // `overflow-y: auto` on body, in which case `window.scrollY` may still
    // report the right value but reading through scrollingElement avoids
    // cross-host ambiguity.
    const getScrollTop = () =>
      document.scrollingElement?.scrollTop ?? window.scrollY ?? 0;

    const remeasure = () => {
      const scrollTop = getScrollTop();
      const wrappers = Array.from(
        container.querySelectorAll<HTMLElement>('[data-seam-stages]'),
      );
      const next: WrapperInfo[] = [];
      for (const w of wrappers) {
        const rect = w.getBoundingClientRect();
        const height = rect.height;
        if (height <= 0) continue;
        const top = rect.top + scrollTop;
        const stages = (w.dataset.seamStages ?? '')
          .split(',')
          .map(s => Number(s.trim()))
          .filter(n => Number.isFinite(n) && n >= 0 && n < SEAM_PROGRESSION.length);
        if (stages.length === 0) continue;
        next.push({ top, bottom: top + height, stages });
      }
      infos = next;
    };

    const resolveStage = () => {
      if (infos.length === 0) return;
      // "Reading eye" — 35% down the viewport. That's roughly where the
      // section heading sits when a reader has just scrolled into a new
      // section, and it's above the seam's visual midpoint so transitions
      // happen slightly before the user is staring at the seam itself.
      const eye = getScrollTop() + window.innerHeight * 0.35;

      for (const info of infos) {
        if (eye >= info.top && eye < info.bottom) {
          const local = (eye - info.top) / (info.bottom - info.top);
          const bucket = Math.min(
            Math.max(Math.floor(local * info.stages.length), 0),
            info.stages.length - 1,
          );
          const stageIdx = info.stages[bucket];
          setSeamConfig(SEAM_PROGRESSION[stageIdx]);
          return;
        }
      }

      // Eye is above the first wrapper (over-scroll at top) or below the
      // last (over-scroll at bottom / footer). Clamp to nearest edge stage.
      if (eye < infos[0].top) {
        setSeamConfig(SEAM_PROGRESSION[infos[0].stages[0]]);
      } else {
        const last = infos[infos.length - 1];
        setSeamConfig(SEAM_PROGRESSION[last.stages[last.stages.length - 1]]);
      }
    };

    let rafId = 0;
    const scheduleResolve = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        resolveStage();
      });
    };

    remeasure();
    resolveStage();

    // Primary trigger: Framer Motion's scroll progress. Whatever scroll
    // plumbing Framer Motion uses in the real browser is the same plumbing
    // that drove the old seam, so it will reach us too.
    const unsubProgress = scrollYProgress.on('change', scheduleResolve);

    const onResize = () => {
      remeasure();
      scheduleResolve();
    };
    window.addEventListener('resize', onResize);

    // Section heights can shift when images/fonts load or when reveals fire.
    // ResizeObserver on the container catches every layout change, so the
    // cached offsets stay honest.
    const ro = new ResizeObserver(() => {
      remeasure();
      scheduleResolve();
    });
    ro.observe(container);

    return () => {
      unsubProgress();
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  return { ref, seamConfig, scrollYProgress };
};

export const Seam = ({ config }: { config: SeamConfig }) => {
  const { type, width } = config;

  if (type === 'void') {
    return (
      <div
        className="pointer-events-none fixed left-1/2 top-0 z-30 h-screen -translate-x-1/2"
        style={{ width: `${width}px` }}
      >
        <div className="h-full w-full bg-radcliffe-void" />
        {/* Paper fiber edges */}
        <svg className="absolute inset-y-0 -left-[6px] w-[6px] h-full" preserveAspectRatio="none">
          <path d={SEAM_PATHS.tear} stroke="hsl(38 30% 75%)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="absolute inset-y-0 -right-[6px] w-[6px] h-full" preserveAspectRatio="none">
          <path d={SEAM_PATHS.tear} stroke="hsl(38 30% 75%)" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    );
  }

  const strokeColor = type === 'fold'
    ? 'hsl(215 30% 62% / 0.3)'
    : type === 'ink'
      ? 'hsl(355 70% 45% / 0.5)'
      : 'hsl(355 70% 45% / 0.8)';

  const strokeWidth = type === 'fold' ? 0.5 : type === 'ink' ? 1.5 : 2;
  const dashArray = type === 'fold' ? '4 6' : undefined;
  const path = type === 'cut' || type === 'tear' ? SEAM_PATHS[type] : SEAM_PATHS.fold;

  return (
    <div className="pointer-events-none fixed left-1/2 top-0 z-30 h-screen -translate-x-1/2 w-[20px]">
      <svg className="h-full w-full" viewBox="-10 0 20 2000" preserveAspectRatio="none">
        <path
          d={path}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

// Wrapper that applies drift to left/right halves
export const DriftPanel = ({
  children,
  side,
  drift,
  className = '',
}: {
  children: ReactNode;
  side: 'left' | 'right';
  drift: number;
  className?: string;
}) => (
  <div
    className={`transition-transform duration-700 ease-out ${className}`}
    style={{
      transform: `translateX(${side === 'left' ? -drift : drift}px)`,
    }}
  >
    {children}
  </div>
);

// Section paragraph with § numbering (administrative voice)
export const AdminParagraph = ({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) => (
  <div className="flex gap-4 mb-6">
    <span className="font-survey text-[0.65rem] text-radcliffe-grid shrink-0 pt-1 select-none">
      {number}
    </span>
    <p className="font-survey text-[0.82rem] leading-[1.8] text-radcliffe-ink/90 text-justify">
      {children}
    </p>
  </div>
);

// Human voice (testimony, italic serif)
export const HumanVoice = ({ children }: { children: ReactNode }) => (
  <p className="font-body italic text-lg leading-relaxed text-radcliffe-soot/90 text-left">
    {children}
  </p>
);

// Official stamp
export const Stamp = ({ children }: { children: ReactNode }) => (
  <span className="radcliffe-stamp">{children}</span>
);

// Redacted text
export const Redacted = ({ children }: { children: ReactNode }) => (
  <span className="radcliffe-redacted">{children}</span>
);

// Pencil underline — marks key phrases
export const Underline = ({ children }: { children: ReactNode }) => (
  <span className="relative inline">
    <span className="relative z-10">{children}</span>
    <span
      className="absolute left-0 right-0 bottom-[1px] h-[3px] z-0"
      style={{
        background: 'hsl(355 70% 45% / 0.2)',
        transform: 'rotate(-0.3deg)',
      }}
    />
  </span>
);

// Red ink — devastating facts
export const RedInk = ({ children }: { children: ReactNode }) => (
  <span className="text-radcliffe-red font-bold">{children}</span>
);

// Margin note — handwritten annotation
export const MarginNote = ({ children, side = 'right' }: { children: ReactNode; side?: 'left' | 'right' }) => (
  <span
    className={`absolute top-2 ${side === 'right' ? '-right-2 md:-right-16' : '-left-2 md:-left-16'} font-body italic text-[0.6rem] text-radcliffe-red/60 w-14 leading-tight hidden md:block`}
    style={{ transform: 'rotate(-2deg)' }}
  >
    {children}
  </span>
);
