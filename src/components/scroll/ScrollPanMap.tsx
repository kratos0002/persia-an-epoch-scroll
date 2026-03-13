import React, { ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScrollPanMapProps {
  /** Width of the map canvas relative to the viewport (e.g. 3 = 300vw) */
  mapWidthMultiplier?: number;
  /** Render the map content — receives panProgress (0-1) */
  children: (panProgress: number) => ReactNode;
  /** Overlay text cards that fade in/out at evenly-spaced progress bands */
  overlaySteps: ReactNode[];
  className?: string;
  /** How many viewports of scroll runway to create */
  scrollRunway?: number;
}

/**
 * Geographic horizontal pan driven by vertical scroll.
 * The map canvas pans from left to right as the user scrolls.
 * Overlay text cards appear/disappear at progress intervals.
 */
export const ScrollPanMap = ({
  mapWidthMultiplier = 3,
  children,
  overlaySteps,
  className,
  scrollRunway,
}: ScrollPanMapProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const runway = scrollRunway ?? Math.max(overlaySteps.length + 1, 4);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(mapWidthMultiplier - 1) * 100}%`]
  );

  // Calculate which overlay step is active
  const bandWidth = 1 / overlaySteps.length;
  const activeStep = Math.min(
    Math.floor(progress / bandWidth),
    overlaySteps.length - 1
  );

  // Mobile fallback: show steps vertically with map snapshots
  if (isMobile) {
    return (
      <div className={cn('flex flex-col', className)}>
        {overlaySteps.map((step, i) => {
          const stepProgress = (i + 0.5) / overlaySteps.length;
          return (
            <div key={i} className="relative min-h-screen flex items-center">
              <div className="absolute inset-0 overflow-hidden">
                {children(stepProgress)}
              </div>
              <div className="relative z-10 p-6">
                {step}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: `${runway * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Panning map canvas */}
        <motion.div
          className="h-full"
          style={{
            x,
            width: `${mapWidthMultiplier * 100}vw`,
          }}
        >
          {children(progress)}
        </motion.div>

        {/* Overlay text cards */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              className="absolute bottom-16 left-[5vw] md:left-[8vw] pointer-events-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {overlaySteps[activeStep]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden z-20">
          <motion.div
            className="h-full bg-white/40 origin-left"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </div>
  );
};
