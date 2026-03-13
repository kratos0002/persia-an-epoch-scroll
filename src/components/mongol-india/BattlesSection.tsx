import React from 'react';
import { motion } from 'framer-motion';
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll';

const BURNT = 'hsl(15, 75%, 50%)';
const MONGOL_ORANGE = 'hsl(25, 70%, 50%)';

interface Battle {
  name: string;
  year: string;
  mongolForce: string;
  khaljiForce: string;
  result: string;
  detail: string;
  significance: string;
}

const BATTLES: Battle[] = [
  {
    name: 'Battle of Kili',
    year: '1299',
    mongolForce: '~200,000',
    khaljiForce: '~300,000',
    result: 'Decisive Delhi Victory',
    detail: 'Kutlugh Khwaja led the largest Mongol army ever sent against India. They camped at Kili, on the outskirts of Delhi itself. Alauddin\'s reformed army met them in open field battle — the first time any power had willingly faced a Mongol horde of this size and won.',
    significance: 'Broke the myth of Mongol invincibility in South Asia.',
  },
  {
    name: 'Battle of Amroha',
    year: '1305',
    mongolForce: '~40,000',
    khaljiForce: '~30,000',
    result: 'Total Mongol Defeat',
    detail: 'A Chagatai raiding force under Taraghai penetrated deep into the Doab. Khalji\'s general Malik Kafur intercepted them near Amroha. The Mongols were surrounded and annihilated — 8,000 prisoners taken, most executed.',
    significance: 'Proved Khalji\'s system worked even when the Sultan was absent.',
  },
  {
    name: 'Battle of Ravi',
    year: '1306',
    mongolForce: '~50,000',
    khaljiForce: '~30,000',
    result: 'Final Mongol Defeat',
    detail: 'The Chagatai Khanate sent one last major force under Kebek and Iqbalmand. They were crushed at the Ravi River by Khalji\'s frontier garrison commander. Thousands of Mongol prisoners were paraded through Delhi.',
    significance: 'The Mongols never launched another major invasion of India.',
  },
];

const BattlePanel = ({ battle }: { battle: Battle }) => (
  <div className="w-screen h-screen flex items-center justify-center px-6 md:px-16" style={{ background: 'hsl(220, 25%, 8%)' }}>
    <div className="max-w-2xl w-full">
      {/* Battle name */}
      <motion.p
        className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-3"
        style={{ color: MONGOL_ORANGE }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {battle.year}
      </motion.p>

      <motion.h3
        className="font-display text-4xl md:text-6xl font-bold mb-8"
        style={{ color: 'hsl(40, 25%, 90%)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {battle.name}
      </motion.h3>

      {/* Force comparison */}
      <div className="flex gap-6 mb-8">
        <div className="flex-1 bg-card/40 rounded-lg p-4 border border-[hsl(25,70%,50%,0.15)]">
          <p className="text-[10px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: MONGOL_ORANGE }}>Mongol Force</p>
          <p className="font-display text-2xl font-bold" style={{ color: MONGOL_ORANGE }}>{battle.mongolForce}</p>
        </div>
        <div className="flex-1 bg-card/40 rounded-lg p-4 border border-[hsl(15,75%,50%,0.15)]">
          <p className="text-[10px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: BURNT }}>Delhi Force</p>
          <p className="font-display text-2xl font-bold" style={{ color: BURNT }}>{battle.khaljiForce}</p>
        </div>
      </div>

      {/* Result badge */}
      <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ background: 'hsl(15, 75%, 50%, 0.15)', border: `1px solid ${BURNT}` }}>
        <p className="text-sm font-body font-semibold" style={{ color: BURNT }}>{battle.result}</p>
      </div>

      {/* Detail */}
      <p className="font-body text-base md:text-lg leading-relaxed mb-6" style={{ color: 'hsl(40, 25%, 75%)' }}>
        {battle.detail}
      </p>

      {/* Significance */}
      <p className="font-body text-sm italic" style={{ color: 'hsl(40, 25%, 55%)' }}>
        {battle.significance}
      </p>
    </div>
  </div>
);

export const BattlesSection = () => (
  <section id="mi-battles">
    <HorizontalScroll
      panels={BATTLES.map((b, i) => <BattlePanel key={i} battle={b} />)}
      dotColor={BURNT}
    />
  </section>
);
