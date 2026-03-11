import React from 'react';
import { cn } from '@/lib/utils';

interface PersianPatternProps {
  className?: string;
  variant?: 'star' | 'hexagonal' | 'border';
  color?: string;
  opacity?: number;
}

export const PersianPattern = ({ className, variant = 'star', color, opacity = 0.08 }: PersianPatternProps) => {
  if (variant === 'border') {
    return (
      <div className={cn("w-full flex items-center justify-center gap-4 py-8", className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-persian-gold/30 to-transparent" />
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-persian-gold/40">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-persian-gold/30 to-transparent" />
      </div>
    );
  }

  if (variant === 'hexagonal') {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="hex-pattern" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <polygon
                points="30,2 54,15 54,37 30,50 6,37 6,15"
                fill="none"
                stroke={color || "hsl(43,85%,55%)"}
                strokeWidth="0.5"
                opacity={opacity}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>
      </div>
    );
  }

  // Star pattern (default)
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="star-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M40 10L46 30L66 30L50 42L56 62L40 50L24 62L30 42L14 30L34 30Z"
              fill="none"
              stroke={color || "hsl(43,85%,55%)"}
              strokeWidth="0.5"
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#star-pattern)" />
      </svg>
    </div>
  );
};

export const SectionDivider = ({ className }: { className?: string }) => (
  <div className={cn("relative py-16 md:py-24 flex items-center justify-center", className)}>
    <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-persian-gold/20 to-transparent" />
    <div className="relative flex gap-2">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-1.5 h-1.5 rotate-45 bg-persian-gold/30"
        />
      ))}
    </div>
  </div>
);
