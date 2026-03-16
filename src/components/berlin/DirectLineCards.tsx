import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BL, DISPLACEMENT_DATA, type DisplacementData } from '@/components/visuals/berlinMapData';

const DirectLineCard = ({ data, index }: { data: DisplacementData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${BL.BRASS}33` }}
    >
      {/* Header */}
      <div className="p-5" style={{ background: BL.PRUSSIAN }}>
        <h3 className="font-display text-xl font-bold" style={{ color: BL.VELLUM }}>
          {data.country}
        </h3>
        <div className="flex gap-4 mt-2">
          <div>
            <span className="text-[9px] tracking-[0.1em] uppercase font-body" style={{ color: BL.GRID_BLUE }}>IDPs</span>
            <p className="font-mono text-lg font-bold" style={{ color: BL.RED_WAX }}>{data.idps}</p>
          </div>
          <div>
            <span className="text-[9px] tracking-[0.1em] uppercase font-body" style={{ color: BL.GRID_BLUE }}>Refugees</span>
            <p className="font-mono text-lg font-bold" style={{ color: BL.BRASS }}>{data.refugees}</p>
          </div>
        </div>
        <span className="text-[9px] font-mono mt-1 block" style={{ color: BL.MUTED }}>{data.date}</span>
      </div>

      {/* Colonial mechanism → Consequence */}
      <div className="p-5" style={{ background: BL.VELLUM }}>
        <div className="mb-3">
          <span className="text-[9px] tracking-[0.1em] uppercase font-body font-semibold" style={{ color: BL.RED_WAX }}>
            Colonial Mechanism
          </span>
          <p className="font-body text-sm leading-relaxed mt-1" style={{ color: BL.INK }}>
            {data.colonialMechanism}
          </p>
        </div>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px" style={{ background: BL.BRASS }} />
          <span className="font-body text-xs" style={{ color: BL.BRASS }}>→</span>
          <div className="flex-1 h-px" style={{ background: BL.BRASS }} />
        </div>

        <div>
          <span className="text-[9px] tracking-[0.1em] uppercase font-body font-semibold" style={{ color: BL.BRASS }}>
            Consequence
          </span>
          <p className="font-body text-sm leading-relaxed mt-1" style={{ color: BL.MUTED }}>
            {data.consequence}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const DirectLineCards = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="direct-line" ref={ref} className="relative py-24 px-6" style={{ background: BL.PAPER_DARK }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE}05 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE}05 1px, transparent 1px)`,
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
            Berlin → Today
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: BL.INK }}>
            The Direct Line
          </h2>
          <p className="font-body text-base leading-relaxed max-w-2xl mx-auto" style={{ color: BL.MUTED }}>
            The current crises in these regions are not the result of "ancient hatreds" but predictable
            results of specific policy choices made in European chancelleries over a century ago.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DISPLACEMENT_DATA.map((data, i) => (
            <DirectLineCard key={data.country} data={data} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
