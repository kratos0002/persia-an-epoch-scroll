import React from 'react';
import { motion } from 'framer-motion';
import { HorizontalScroll } from '@/components/scroll/HorizontalScroll';
import { BattleDiagram } from '@/components/visuals/BattleDiagram';

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
  diagram: 'kili' | 'amroha' | 'ravi';
}

const BATTLES: Battle[] = [
  {
    name: 'Battle of Kili',
    year: '1299',
    mongolForce: '~200,000',
    khaljiForce: '~300,000',
    result: 'Decisive Delhi Victory',
    detail: 'Kutlugh Khwaja led the largest Mongol army ever sent against India. They camped at Kili, on the outskirts of Delhi itself. Alauddin\'s reformed army met them in open field — the first time any power had faced a horde of this size and won.',
    significance: 'Broke the myth of Mongol invincibility in South Asia.',
    diagram: 'kili',
  },
  {
    name: 'Battle of Amroha',
    year: '1305',
    mongolForce: '~40,000',
    khaljiForce: '~30,000',
    result: 'Total Mongol Defeat',
    detail: 'A Chagatai raiding force under Taraghai penetrated deep into the Doab. Khalji\'s general Malik Kafur intercepted them near Amroha. The Mongols were surrounded and annihilated — 8,000 prisoners taken.',
    significance: 'Proved Khalji\'s system worked even without the Sultan present.',
    diagram: 'amroha',
  },
  {
    name: 'Battle of Ravi',
    year: '1306',
    mongolForce: '~50,000',
    khaljiForce: '~30,000',
    result: 'Final Mongol Defeat',
    detail: 'The Chagatai Khanate sent one last major force under Kebek. They were crushed at the Ravi River by Khalji\'s frontier garrison commander. Thousands of prisoners paraded through Delhi.',
    significance: 'The Mongols never launched another major invasion of India.',
    diagram: 'ravi',
  },
];

const BattlePanel = ({ battle }: { battle: Battle }) => (
  <div className="w-screen h-screen flex items-center justify-center px-6 md:px-16" style={{ background: 'hsl(220, 25%, 6%)' }}>
    <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Left: Tactical diagram */}
      <div className="order-2 lg:order-1">
        <BattleDiagram battle={battle.diagram} />
      </div>

      {/* Right: Text info */}
      <div className="order-1 lg:order-2">
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
          className="font-display text-3xl md:text-5xl font-bold mb-6"
          style={{ color: 'hsl(40, 25%, 90%)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {battle.name}
        </motion.h3>

        {/* Force comparison */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-card/40 rounded-lg p-3 border border-[hsl(25,70%,50%,0.15)]">
            <p className="text-[10px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: MONGOL_ORANGE }}>Mongol</p>
            <p className="font-display text-xl font-bold" style={{ color: MONGOL_ORANGE }}>{battle.mongolForce}</p>
          </div>
          <div className="flex-1 bg-card/40 rounded-lg p-3 border border-[hsl(15,75%,50%,0.15)]">
            <p className="text-[10px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: BURNT }}>Delhi</p>
            <p className="font-display text-xl font-bold" style={{ color: BURNT }}>{battle.khaljiForce}</p>
          </div>
        </div>

        {/* Result badge */}
        <div className="inline-block px-3 py-1.5 rounded-full mb-4" style={{ background: 'hsl(15, 75%, 50%, 0.15)', border: `1px solid ${BURNT}` }}>
          <p className="text-sm font-body font-semibold" style={{ color: BURNT }}>{battle.result}</p>
        </div>

        <p className="font-body text-sm md:text-base leading-relaxed mb-4" style={{ color: 'hsl(40, 25%, 75%)' }}>
          {battle.detail}
        </p>

        <p className="font-body text-xs italic" style={{ color: 'hsl(40, 25%, 55%)' }}>
          {battle.significance}
        </p>
      </div>
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
