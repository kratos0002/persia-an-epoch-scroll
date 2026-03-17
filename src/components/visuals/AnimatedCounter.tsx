import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  label?: string;
  decimals?: number;
}

export const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
  label,
  decimals,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const hasDecimals = decimals !== undefined ? decimals > 0 : end % 1 !== 0;
  const decimalPlaces = decimals !== undefined ? decimals : hasDecimals ? 1 : 0;

  useEffect(() => {
    if (!inView) return;
    const start = 0;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = start + (end - start) * eased;
      setCount(hasDecimals ? parseFloat(val.toFixed(decimalPlaces)) : Math.floor(val));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration, hasDecimals, decimalPlaces]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
        {prefix}{hasDecimals ? count.toFixed(decimalPlaces) : count.toLocaleString()}{suffix}
      </div>
      {label && <div className="text-sm text-muted-foreground mt-1 font-body">{label}</div>}
    </div>
  );
};

/* Image placeholder with era-appropriate styling */
interface ImagePlaceholderProps {
  label: string;
  era?: 'ancient' | 'classical' | 'medieval' | 'early-modern' | 'modern';
  className?: string;
  aspectRatio?: string;
}

const eraGradients = {
  ancient: 'from-persian-gold/20 via-persian-terracotta/10 to-persian-sand/20',
  classical: 'from-persian-purple/20 via-persian-blue/10 to-persian-gold/15',
  medieval: 'from-persian-emerald/20 via-persian-blue/10 to-persian-ink/30',
  'early-modern': 'from-persian-blue/20 via-persian-crimson/10 to-persian-gold/15',
  modern: 'from-muted/30 via-persian-blue-deep/20 to-muted/30',
};

export const ImagePlaceholder = ({ label, era = 'ancient', className, aspectRatio = '16/9' }: ImagePlaceholderProps) => (
  <div
    className={cn(
      `bg-gradient-to-br ${eraGradients[era]} border border-persian-gold/10 rounded-lg flex items-center justify-center overflow-hidden relative`,
      className
    )}
    style={{ aspectRatio }}
  >
    <div className="absolute inset-0 pattern-persian opacity-30" />
    <span className="text-muted-foreground/50 text-sm font-body relative z-10 text-center px-4">{label}</span>
  </div>
);
