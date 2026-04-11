import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { NM } from './nutmegTheme';

interface LogEntryProps {
  id: string;
  entryNumber?: string;
  date?: string;
  coordinates?: string;
  stainIntensity?: number; // 0-1
  children: ReactNode;
  className?: string;
}

export const LogEntry = ({ id, entryNumber, date, coordinates, stainIntensity = 0, children, className = '' }: LogEntryProps) => {
  // Mix cream with blood/brown based on stain intensity
  const bgColor = stainIntensity > 0.3
    ? `color-mix(in hsl, ${NM.CREAM} ${Math.round((1 - stainIntensity * 0.3) * 100)}%, ${NM.BLOOD})`
    : NM.CREAM;

  return (
    <section
      id={id}
      className={`relative min-h-screen py-24 md:py-32 px-6 md:pl-16 ${className}`}
      style={{
        background: stainIntensity > 0.3
          ? `linear-gradient(180deg, ${NM.CREAM} 0%, hsl(38, 25%, ${85 - stainIntensity * 12}%) 50%, ${NM.CREAM} 100%)`
          : NM.CREAM,
      }}
    >
      {/* Paper grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Water stain overlays */}
      {stainIntensity > 0.1 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute"
            style={{
              width: `${200 + stainIntensity * 300}px`,
              height: `${200 + stainIntensity * 300}px`,
              right: `${10 - stainIntensity * 5}%`,
              top: '20%',
              borderRadius: '50%',
              background: stainIntensity > 0.4
                ? `radial-gradient(circle, ${NM.BLOOD}${Math.round(stainIntensity * 15).toString(16).padStart(2, '0')} 0%, transparent 70%)`
                : `radial-gradient(circle, ${NM.AMBER}${Math.round(stainIntensity * 12).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            }}
          />
        </div>
      )}

      {/* Entry header */}
      {(entryNumber || date) && (
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-block pb-3 mb-4"
            style={{ borderBottom: `1px solid ${NM.TIMBER}33` }}
          >
            {entryNumber && (
              <span
                className="text-[10px] tracking-[0.4em] uppercase font-body font-semibold block mb-1"
                style={{ color: NM.SMOKE }}
              >
                {entryNumber}
              </span>
            )}
            {date && (
              <span
                className="font-display text-sm font-bold block"
                style={{ color: NM.TIMBER }}
              >
                {date}
              </span>
            )}
            {coordinates && (
              <span
                className="text-[10px] font-mono tracking-wider block mt-1"
                style={{ color: NM.TEAL }}
              >
                {coordinates}
              </span>
            )}
          </div>
        </motion.div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto">
        {children}
      </div>

      {/* Ruled lines (faint) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.04 }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-full"
            style={{
              height: '1px',
              marginTop: '28px',
              background: NM.INK,
            }}
          />
        ))}
      </div>
    </section>
  );
};
