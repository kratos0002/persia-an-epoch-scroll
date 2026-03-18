import React from 'react';
import { IB } from '@/components/visuals/battutaMapData';

interface RihlaQuoteProps {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
}

export const RihlaQuote = ({ children, attribution, className = '' }: RihlaQuoteProps) => (
  <div className={`relative my-10 ${className}`}>
    <div
      className="py-8 px-8 relative"
      style={{
        borderLeft: `4px solid ${IB.SAFFRON}`,
        background: `linear-gradient(135deg, ${IB.LEATHER}15, transparent)`,
      }}
    >
      {/* Decorative quotation mark */}
      <span
        className="absolute -top-2 -left-1 font-display text-6xl leading-none select-none pointer-events-none"
        style={{ color: IB.SAFFRON, opacity: 0.2 }}
      >
        "
      </span>
      <p
        className="font-body text-base md:text-lg italic leading-[1.9] relative z-10"
        style={{ color: IB.INK }}
      >
        {children}
      </p>
      {attribution && (
        <p className="mt-4 text-xs font-body" style={{ color: IB.SAFFRON_DIM }}>
          — {attribution}
        </p>
      )}
    </div>
  </div>
);
