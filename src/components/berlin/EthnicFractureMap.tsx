import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BL, SPLIT_ETHNIC_GROUPS, BORDER_STATS, type SplitEthnicGroup } from '@/components/visuals/berlinMapData';

export const EthnicFractureMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedGroup, setSelectedGroup] = useState<SplitEthnicGroup | null>(null);

  return (
    <section id="ethnic-fracture" ref={ref} className="relative py-24 px-6" style={{ background: BL.VELLUM }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE}06 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE}06 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: BL.RED_WAX }}>
            Michalopoulos & Papaioannou (2016)
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: BL.INK }}>
            The Ethnic Fracture
          </h2>
          <p className="font-body text-base leading-relaxed max-w-2xl mx-auto" style={{ color: BL.MUTED }}>
            Colonial borders partitioned <strong style={{ color: BL.RED_WAX }}>177 ethnic groups</strong> across
            multiple states. Conflict likelihood in partitioned homelands is <strong>8% higher</strong> and
            conflict intensity <strong>40% higher</strong> than in non-partitioned homelands.
          </p>
        </motion.div>

        {/* Border topology stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12"
        >
          {[
            { label: 'Geometric', value: BORDER_STATS.geometric, desc: 'Straight lines / arcs' },
            { label: 'Natural', value: BORDER_STATS.natural, desc: 'Rivers, mountains' },
            { label: 'Cultural', value: BORDER_STATS.cultural, desc: 'Colonial inventions' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center p-4 rounded-lg" style={{ background: BL.PAPER_DARK }}>
              <div className="font-display text-3xl font-black" style={{ color: BL.RED_WAX }}>{stat.value}%</div>
              <div className="font-body text-xs font-semibold mt-1" style={{ color: BL.INK }}>{stat.label}</div>
              <div className="font-body text-[10px] mt-0.5" style={{ color: BL.MUTED }}>{stat.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* Split ethnic groups interactive list */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {SPLIT_ETHNIC_GROUPS.map((group, i) => (
            <motion.button
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
              onClick={() => setSelectedGroup(selectedGroup?.name === group.name ? null : group)}
              className="p-3 rounded-lg text-left transition-all"
              style={{
                background: selectedGroup?.name === group.name ? BL.INK : BL.PAPER_DARK,
                border: `1px solid ${group.stateCount >= 3 ? BL.RED_WAX : BL.BRASS}33`,
              }}
            >
              <div className="font-display text-sm font-bold" style={{ color: selectedGroup?.name === group.name ? BL.VELLUM : BL.INK }}>
                {group.name}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: group.stateCount }).map((_, j) => (
                  <span key={j} className="w-2 h-2 rounded-full" style={{ background: group.stateCount >= 3 ? BL.RED_WAX : BL.BRASS }} />
                ))}
                <span className="text-[10px] font-mono ml-1" style={{ color: selectedGroup?.name === group.name ? BL.GRID_BLUE : BL.MUTED }}>
                  {group.stateCount} states
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail panel for selected group */}
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-6 rounded-xl"
            style={{ background: BL.INK }}
          >
            <h3 className="font-display text-lg font-bold" style={{ color: BL.VELLUM }}>
              The {selectedGroup.name}
            </h3>
            <p className="font-body text-sm mt-2" style={{ color: BL.GRID_BLUE }}>
              Split across {selectedGroup.stateCount} modern states: {selectedGroup.states.join(', ')}.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
