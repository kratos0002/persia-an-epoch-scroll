import React from 'react';
import { motion } from 'framer-motion';

const SAFFRON = 'hsl(35, 90%, 55%)';
const DUTCH_BLUE = 'hsl(210, 60%, 40%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const BLOOD = 'hsl(0, 55%, 50%)';

interface CardProps {
  title: string;
  thenValue: string;
  nowValue: string;
  color: string;
  detail: string;
  delay: number;
}

const TradeCard = ({ title, thenValue, nowValue, color, detail, delay }: CardProps) => (
  <motion.div
    className="flex-1 rounded-xl p-6 text-center"
    style={{ background: 'hsl(210, 35%, 6%)', border: `1px solid ${color}22` }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-3" style={{ color: SMOKE }}>
      {detail}
    </p>
    <h3 className="font-display text-2xl md:text-3xl font-black mb-4" style={{ color }}>
      {title}
    </h3>

    <div className="space-y-4">
      <div>
        <p className="text-[8px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: SMOKE }}>Value in 1667</p>
        <p className="font-display text-lg font-bold" style={{ color: PARCHMENT }}>{thenValue}</p>
      </div>

      <motion.div
        className="mx-auto w-8 h-px"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5, duration: 0.5 }}
      />

      <div>
        <p className="text-[8px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: SMOKE }}>Value today</p>
        <motion.p
          className="font-display text-2xl md:text-4xl font-black"
          style={{ color }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.8, duration: 0.5 }}
        >
          {nowValue}
        </motion.p>
      </div>
    </div>
  </motion.div>
);

export const ManhattanTradeCard = () => {
  return (
    <div className="rounded-xl p-5" style={{ background: 'hsl(210, 35%, 5%)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: SMOKE }}>
        The Exchange — Treaty of Breda, 1667
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <TradeCard
          title="Manhattan"
          detail="England received"
          thenValue="Fur trading post"
          nowValue="$1.7 Trillion"
          color={DUTCH_BLUE}
          delay={0.3}
        />

        <div className="flex items-center justify-center py-2">
          <motion.div
            className="font-display text-3xl"
            style={{ color: SAFFRON }}
            initial={{ opacity: 0, rotate: -90 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            ⇄
          </motion.div>
        </div>

        <TradeCard
          title="Run Island"
          detail="Netherlands received"
          thenValue="Nutmeg monopoly"
          nowValue="$0"
          color={SAFFRON}
          delay={0.5}
        />
      </div>

      <motion.p
        className="text-center font-display text-sm italic mt-6"
        style={{ color: SMOKE }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      >
        The worst trade deal in history — or the best, depending on which side you were on.
      </motion.p>
    </div>
  );
};
