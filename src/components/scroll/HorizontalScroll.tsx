import React, { ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface HorizontalScrollProps {
  panels: ReactNode[];
  className?: string;
  /** Optional dot indicator color (CSS value) */
  dotColor?: string;
}

/**
 * Scroll-jacked horizontal pan: vertical scrolling drives
 * a horizontal camera movement across full-viewport panels.
 * Falls back to vertical stack on mobile.
 */
export const HorizontalScroll = ({
  panels,
  className,
  dotColor = 'hsl(var(--primary))',
}: HorizontalScrollProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active panel index
  const [activePanel, setActivePanel] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      const idx = Math.min(
        Math.floor(v * panels.length),
        panels.length - 1
      );
      setActivePanel(idx);
    });
    return unsub;
  }, [scrollYProgress, panels.length]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(panels.length - 1) * 100}%`]
  );

  // Mobile: vertical stack
  if (isMobile) {
    return (
      <div className={cn('flex flex-col', className)}>
        {panels.map((panel, i) => (
          <div key={i} className="min-h-screen flex items-center justify-center">
            {panel}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: `${panels.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x, width: `${panels.length * 100}vw` }}
        >
          {panels.map((panel, i) => (
            <div
              key={i}
              className="w-screen h-screen flex-shrink-0 flex items-center justify-center"
            >
              {panel}
            </div>
          ))}
        </motion.div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {panels.map((_, i) => (
            <div
              key={i}
              className={cn(
                'rounded-full transition-all duration-500',
                i === activePanel
                  ? 'w-3 h-3 shadow-[0_0_10px_var(--dot-color)]'
                  : 'w-2 h-2 opacity-30'
              )}
              style={{
                background: dotColor,
                ['--dot-color' as string]: dotColor,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
