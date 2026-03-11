import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ConversionRow {
  rank: string;
  stipendKoku: number;
  bondValue: number;
}

interface BondCalculatorProps {
  className?: string;
  animate?: boolean;
}

const CONVERSIONS: ConversionRow[] = [
  { rank: 'Upper Samurai', stipendKoku: 600, bondValue: 210 },
  { rank: 'Mid Samurai', stipendKoku: 200, bondValue: 58 },
  { rank: 'Lower Samurai', stipendKoku: 40, bondValue: 8 },
  { rank: 'Foot Soldier', stipendKoku: 15, bondValue: 2.25 },
];

const INK = 'hsl(25, 20%, 12%)';
const VERMILLION = 'hsl(5, 75%, 50%)';
const FADED = 'hsl(30, 10%, 55%)';
const PAPER = 'hsl(40, 30%, 92%)';

const AnimatedNumber = ({ end, prefix = '', suffix = '', delay = 0 }: {
  end: number; prefix?: string; suffix?: string; delay?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const start = Date.now();
      const dur = 1200;
      const timer = setInterval(() => {
        const p = Math.min((Date.now() - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(end * eased);
        if (p >= 1) clearInterval(timer);
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, end, delay]);

  return (
    <span ref={ref}>
      {prefix}{val < 1 && end < 10 ? val.toFixed(1) : Math.floor(val).toLocaleString()}{suffix}
    </span>
  );
};

export const BondCalculator = ({ className, animate = true }: BondCalculatorProps) => {
  return (
    <div
      className={cn('w-full max-w-2xl mx-auto rounded-sm overflow-hidden', className)}
      style={{
        background: PAPER,
        border: '1px solid hsl(30, 15%, 80%)',
        boxShadow: '4px 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b" style={{ borderColor: 'hsl(30, 15%, 82%)' }}>
        <p className="font-display text-lg font-bold" style={{ color: INK }}>
          秩禄処分 — Chitsuroku Shobun
        </p>
        <p className="text-[10px] tracking-[0.2em] uppercase font-body mt-0.5" style={{ color: FADED }}>
          Stipend-to-Bond Conversion, 1876
        </p>
      </div>

      {/* Table header */}
      <div
        className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 px-6 py-2 text-[10px] tracking-[0.15em] uppercase font-body font-semibold"
        style={{ color: FADED, borderBottom: '1px solid hsl(30, 15%, 85%)' }}
      >
        <span>Rank</span>
        <span className="text-right w-20">Rice (石)</span>
        <span className="text-center w-8">→</span>
        <span className="text-right w-24">Bonds (¥)</span>
        <span className="text-right w-16">Loss</span>
      </div>

      {/* Rows */}
      {CONVERSIONS.map((row, i) => {
        const loss = Math.round((1 - row.bondValue / row.stipendKoku) * 100);
        return (
          <motion.div
            key={row.rank}
            className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 px-6 py-3 items-center"
            style={{ borderBottom: '1px solid hsl(30, 15%, 88%)' }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <span className="font-body text-sm font-semibold" style={{ color: INK }}>
              {row.rank}
            </span>
            <span className="font-display text-base font-bold text-right w-20 tabular-nums" style={{ color: INK }}>
              {animate ? <AnimatedNumber end={row.stipendKoku} delay={i * 150} /> : row.stipendKoku}
            </span>
            <span className="text-center w-8 font-body text-lg" style={{ color: FADED }}>→</span>
            <span className="font-display text-base font-bold text-right w-24 tabular-nums" style={{ color: INK }}>
              ¥{animate ? <AnimatedNumber end={row.bondValue} delay={i * 150 + 600} /> : row.bondValue}
            </span>
            <span
              className="font-display text-sm font-bold text-right w-16 tabular-nums"
              style={{ color: VERMILLION }}
            >
              −{animate ? <AnimatedNumber end={loss} suffix="%" delay={i * 150 + 1000} /> : `${loss}%`}
            </span>
          </motion.div>
        );
      })}

      {/* Footer */}
      <div className="px-6 py-4" style={{ borderTop: '1px solid hsl(30, 15%, 82%)' }}>
        <p className="font-body text-sm leading-relaxed" style={{ color: FADED }}>
          The bonds paid interest of 5–10% annually — but their face value was a fraction of the original stipend.
          Most samurai sold them immediately at steep discounts.
        </p>
      </div>
    </div>
  );
};
