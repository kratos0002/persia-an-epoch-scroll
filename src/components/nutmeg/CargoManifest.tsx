import React from 'react';
import { motion } from 'framer-motion';
import { NM } from './nutmegTheme';

interface CargoItem {
  good: string;
  origin: string;
  valuePerOz: string;
  note?: string;
}

const CARGO: CargoItem[] = [
  { good: 'Nutmeg', origin: 'Banda Islands', valuePerOz: '85 shillings', note: 'More precious than gold' },
  { good: 'Mace', origin: 'Banda Islands', valuePerOz: '105 shillings', note: 'Nutmeg aril — rarer still' },
  { good: 'Gold', origin: 'West Africa', valuePerOz: '20 shillings' },
  { good: 'Silver', origin: 'Potosí', valuePerOz: '3 shillings' },
  { good: 'Pepper', origin: 'Malabar Coast', valuePerOz: '6 shillings' },
];

export const CargoManifest = () => {
  return (
    <motion.div
      className="my-12 rounded-sm overflow-hidden"
      style={{
        background: NM.CREAM_DARK,
        border: `1px solid ${NM.TIMBER}33`,
        boxShadow: `inset 0 0 30px ${NM.TIMBER}08`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="px-6 py-4 text-center" style={{ borderBottom: `1px solid ${NM.TIMBER}22` }}>
        <p className="text-[9px] tracking-[0.4em] uppercase font-body" style={{ color: NM.SMOKE }}>
          Cargo Manifest — London Exchange
        </p>
        <p className="font-display text-sm italic mt-1" style={{ color: NM.TIMBER }}>
          Relative value per ounce — 16th century
        </p>
      </div>

      {/* Table */}
      <div className="px-4 py-3">
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 px-2 pb-2 mb-1"
          style={{ borderBottom: `2px solid ${NM.INK}18` }}
        >
          {['Commodity', 'Origin', 'Value / oz'].map(h => (
            <span
              key={h}
              className="text-[9px] tracking-[0.2em] uppercase font-body font-semibold"
              style={{ color: NM.SMOKE }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {CARGO.map((item, i) => (
          <motion.div
            key={item.good}
            className="grid grid-cols-[1fr_1fr_1fr] gap-2 px-2 py-2.5 items-baseline"
            style={{
              borderBottom: `1px solid ${NM.TIMBER}0d`,
              background: i === 0 ? `${NM.AMBER}08` : 'transparent',
            }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
          >
            <span
              className="font-display text-sm font-bold"
              style={{ color: i < 2 ? NM.AMBER : NM.INK }}
            >
              {item.good}
            </span>
            <span className="text-xs font-body italic" style={{ color: NM.SMOKE }}>
              {item.origin}
            </span>
            <span className="font-display text-sm font-bold" style={{ color: i < 2 ? NM.AMBER : NM.INK }}>
              {item.valuePerOz}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer annotation */}
      <div className="px-6 py-3 text-center" style={{ borderTop: `1px solid ${NM.TIMBER}15` }}>
        <p className="font-body text-xs italic" style={{ color: NM.SMOKE }}>
          Source-to-market markup on nutmeg: ~60,000% · "a fortune in every sack"
        </p>
      </div>
    </motion.div>
  );
};
