import React from 'react';
import { cn } from '@/lib/utils';

interface HistoricalImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  className?: string;
  aspectRatio?: string;
}

export const HistoricalImage = ({ src, alt, caption, credit, className, aspectRatio = '16/9' }: HistoricalImageProps) => (
  <figure className={cn("relative group", className)}>
    <div
      className="overflow-hidden rounded-lg border border-persian-gold/10"
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    {(caption || credit) && (
      <figcaption className="mt-2 text-sm font-body">
        {caption && <span className="text-foreground/60">{caption}</span>}
        {credit && <span className="text-muted-foreground/40 ml-1">— {credit}</span>}
      </figcaption>
    )}
  </figure>
);

interface HistoricalMapProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export const HistoricalMap = ({ src, alt, caption, className }: HistoricalMapProps) => (
  <figure className={cn("relative", className)}>
    <div className="overflow-hidden rounded-xl border border-border/30 bg-card/30">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-auto"
      />
    </div>
    {caption && (
      <figcaption className="mt-3 text-center text-sm text-muted-foreground/50 font-body italic">
        {caption}
      </figcaption>
    )}
  </figure>
);
