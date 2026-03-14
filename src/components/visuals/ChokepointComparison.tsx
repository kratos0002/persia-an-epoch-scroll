import React from 'react';
import { motion } from 'framer-motion';
import { CHOKEPOINTS } from './hormuzMapData';

const NAVY = 'hsl(215, 45%, 8%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';

export const ChokepointComparison = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {CHOKEPOINTS.map((cp, i) => (
        <motion.div
          key={cp.name}
          className="rounded-xl p-5 text-center"
          style={{
            background: 'hsl(215, 40%, 6%)',
            border: `1px solid ${cp.color}22`,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
        >
          <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ background: cp.color, boxShadow: `0 0 12px ${cp.color}44` }} />
          <p className="font-display text-sm font-bold mb-1" style={{ color: PARCHMENT }}>{cp.name}</p>
          <p className="text-[10px] font-body mb-2" style={{ color: cp.color }}>{cp.width}</p>
          <div className="w-8 h-px mx-auto my-2" style={{ background: `${cp.color}33` }} />
          <p className="text-[10px] font-body font-semibold" style={{ color: PARCHMENT }}>{cp.share}</p>
          <p className="text-[10px] font-body mt-1" style={{ color: SMOKE }}>{cp.barrels}</p>
        </motion.div>
      ))}
    </div>
  );
};
