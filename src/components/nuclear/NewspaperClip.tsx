import React from 'react';
import { motion } from 'framer-motion';

const STEEL = 'hsl(200, 10%, 50%)';

interface NewspaperClipProps {
  /** Path to a real newspaper image, or null for SVG-styled headline */
  image?: string;
  /** Newspaper name / masthead */
  paper: string;
  /** Date string */
  date: string;
  /** Main headline text */
  headline: string;
  /** Optional sub-headline */
  subheadline?: string;
  /** Delay before reveal */
  delay?: number;
}

export const NewspaperClip = ({
  image,
  paper,
  date,
  headline,
  subheadline,
  delay = 0,
}: NewspaperClipProps) => {
  return (
    <motion.div
      className="mt-8 mx-auto max-w-[260px]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {image ? (
        /* Real newspaper image */
        <div className="relative overflow-hidden rounded-sm" style={{ border: '1px solid hsl(200, 10%, 15%)' }}>
          <img
            src={image}
            alt={`${paper} — ${headline}`}
            className="w-full h-auto"
            style={{ filter: 'sepia(0.3) contrast(1.1) brightness(0.85)', mixBlendMode: 'luminosity' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(transparent 60%, hsl(200, 25%, 6%) 100%)' }}
          />
        </div>
      ) : (
        /* Stylized SVG newspaper fragment */
        <div
          className="px-5 py-4 rounded-sm"
          style={{
            background: 'hsl(40, 20%, 88%)',
            border: '1px solid hsl(35, 15%, 75%)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}
        >
          {/* Masthead */}
          <p
            className="text-center font-display text-[10px] tracking-[0.15em] uppercase mb-0.5"
            style={{ color: 'hsl(200, 15%, 25%)', borderBottom: '1px solid hsl(35, 15%, 70%)', paddingBottom: '3px' }}
          >
            {paper}
          </p>
          <p
            className="text-center font-body text-[7px] mb-2"
            style={{ color: 'hsl(200, 10%, 45%)' }}
          >
            {date}
          </p>

          {/* Headline */}
          <p
            className="text-center font-display text-[15px] md:text-[17px] font-black leading-tight mb-1"
            style={{ color: 'hsl(0, 0%, 8%)' }}
          >
            {headline}
          </p>

          {/* Sub-headline */}
          {subheadline && (
            <p
              className="text-center font-body text-[8px] leading-snug"
              style={{ color: 'hsl(200, 10%, 30%)' }}
            >
              {subheadline}
            </p>
          )}

          {/* Fake body text lines */}
          <div className="mt-2.5 space-y-[3px]">
            {[0.95, 1, 0.88, 0.92, 0.7].map((w, i) => (
              <div
                key={i}
                className="h-[2px] rounded-full mx-auto"
                style={{
                  width: `${w * 100}%`,
                  background: 'hsl(35, 10%, 70%)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Caption below */}
      <p
        className="text-center text-[9px] font-body mt-2 italic"
        style={{ color: STEEL, opacity: 0.5 }}
      >
        {paper} · {date}
      </p>
    </motion.div>
  );
};
