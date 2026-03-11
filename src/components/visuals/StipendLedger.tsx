import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface LedgerRow {
  privilege: string;
  japanese: string;
  value: string;
  struck: boolean;
}

interface StipendLedgerProps {
  rows: LedgerRow[];
  /** 0-1, controls how many rows are struck through */
  strikeProgress?: number;
  showSeal?: boolean;
  title?: string;
  className?: string;
}

const VERMILLION = 'hsl(5, 75%, 50%)';
const INK = 'hsl(25, 20%, 12%)';
const FADED = 'hsl(30, 10%, 60%)';
const PAPER = 'hsl(40, 30%, 92%)';

export const StipendLedger = ({
  rows,
  strikeProgress = 0,
  showSeal = false,
  title = '武士特権台帳',
  className,
}: StipendLedgerProps) => {
  // Calculate which rows should be struck based on progress
  const struckCount = Math.floor(strikeProgress * rows.length);

  return (
    <div
      className={cn(
        'relative w-full max-w-xl mx-auto rounded-sm overflow-hidden',
        className
      )}
      style={{
        background: PAPER,
        border: `1px solid hsl(30, 15%, 80%)`,
        boxShadow: '4px 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      {/* Ledger header */}
      <div
        className="px-6 py-4 border-b flex items-center justify-between"
        style={{ borderColor: 'hsl(30, 15%, 82%)' }}
      >
        <div>
          <p className="font-display text-lg font-bold" style={{ color: INK }}>
            {title}
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase font-body mt-0.5" style={{ color: FADED }}>
            Samurai Privilege Register
          </p>
        </div>
        {/* Decorative vertical text */}
        <div
          className="text-right font-display text-xs tracking-widest"
          style={{ color: FADED, writingMode: 'vertical-rl' }}
        >
          台帳
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y" style={{ borderColor: 'hsl(30, 15%, 85%)' }}>
        {rows.map((row, i) => {
          const isStruck = row.struck || i < struckCount;

          return (
            <div
              key={row.privilege}
              className="relative px-6 py-3 flex items-center justify-between gap-4"
              style={{ borderColor: 'hsl(30, 15%, 85%)' }}
            >
              {/* Privilege name */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="font-body text-sm font-semibold"
                    style={{ color: isStruck ? FADED : INK }}
                  >
                    {row.japanese}
                  </span>
                  <span
                    className="font-body text-sm"
                    style={{ color: isStruck ? FADED : INK }}
                  >
                    {row.privilege}
                  </span>
                </div>
              </div>

              {/* Value */}
              <div className="flex-shrink-0 text-right">
                <span
                  className="font-display text-base font-bold tabular-nums"
                  style={{ color: isStruck ? FADED : INK }}
                >
                  {row.value}
                </span>
              </div>

              {/* Strike-through line */}
              {isStruck && (
                <motion.div
                  className="absolute left-4 right-4 top-1/2 -translate-y-1/2"
                  style={{ height: '2px', background: VERMILLION }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom area */}
      <div className="px-6 py-3 flex justify-end" style={{ borderTop: '1px solid hsl(30, 15%, 85%)' }}>
        <p className="text-[10px] font-body" style={{ color: FADED }}>
          {struckCount}/{rows.length} privileges revoked
        </p>
      </div>

      {/* Vermillion seal stamp */}
      <AnimatePresence>
        {showSeal && (
          <motion.div
            className="absolute bottom-6 right-6 w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              border: `3px solid ${VERMILLION}`,
              color: VERMILLION,
            }}
            initial={{ scale: 3, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 0.85, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
          >
            <div className="text-center">
              <p className="font-display text-lg font-black leading-none">廃</p>
              <p className="text-[8px] font-body mt-0.5 tracking-wider">ABOLISHED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
