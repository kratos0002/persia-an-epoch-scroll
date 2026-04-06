import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AKSHAUHINI, ALLIANCES } from './kurukshetraData';

/* ── Minimal SVG glyphs for unit types ── */
const ChariotGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block">
    <circle cx="7" cy="18" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
    <path d="M11,18 L18,18 L20,8 L8,8 L6,14" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <line x1="14" y1="8" x2="16" y2="2" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const ElephantGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block">
    <path d="M6,20 L6,14 Q2,12 2,8 Q2,4 6,3 L8,3 Q10,3 10,5 L10,8 L14,8 L14,5 Q14,3 16,3 L18,3 Q22,4 22,8 Q22,12 18,14 L18,20" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7" cy="8" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

const CavalryGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block">
    <path d="M4,18 Q6,14 8,14 L12,14 Q14,14 14,12 L16,6 Q17,4 19,4 L21,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8,14 L8,20 M12,14 L12,20" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="19" cy="6" r="1" fill="currentColor" opacity="0.4" />
  </svg>
);

const InfantryGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block">
    <circle cx="12" cy="4" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="7" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
    <line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12,16 L8,22 M12,16 L16,22" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const UNIT_ROWS = [
  { label: 'Chariots', count: AKSHAUHINI.chariots, Glyph: ChariotGlyph, repeat: 6 },
  { label: 'War Elephants', count: AKSHAUHINI.elephants, Glyph: ElephantGlyph, repeat: 6 },
  { label: 'Cavalry', count: AKSHAUHINI.cavalry, Glyph: CavalryGlyph, repeat: 8 },
  { label: 'Infantry', count: AKSHAUHINI.infantry, Glyph: InfantryGlyph, repeat: 12 },
];

const pandavaAlliances = ALLIANCES.filter(a => a.faction === 'Pandava');
const kauravaAlliances = ALLIANCES.filter(a => a.faction === 'Kaurava');

export const AkshauhiniPyramid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="kuru-logistics" className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, hsl(25 20% 8%), hsl(20 15% 11%), hsl(25 20% 8%))' }}
    >
      <div className="kuru-grain absolute inset-0 pointer-events-none" />
      {/* Subtle bronze sheen at the top */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--kuru-gold) / 0.2), transparent)' }} />

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32">

        {/* ── Section title ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-kuru-conch/40 mb-3">
            Military Science
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-[0.04em] text-kuru-conch">
            The Bronze Tablet
          </h2>
          <div className="mx-auto mt-4 w-16 h-px bg-kuru-gold/30" />
        </motion.div>

        {/* ── Opposing Standards: 7 vs 11 ── */}
        <motion.div
          className="flex items-center justify-center gap-6 md:gap-16 mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {/* Pandava side */}
          <div className="text-right flex-1 max-w-[280px]">
            <span className="font-display text-7xl md:text-[8rem] leading-none font-bold text-kuru-gold">
              {AKSHAUHINI.pandava}
            </span>
            <p className="font-display text-[10px] md:text-xs tracking-[0.25em] uppercase text-kuru-conch/50 mt-2">
              Pandava Akshauhinis
            </p>
            <p className="font-body text-xs text-kuru-conch/30 mt-1">
              ≈ 1.53 million warriors
            </p>
          </div>

          {/* Divider — crossed spears */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <svg viewBox="0 0 40 80" className="w-6 md:w-8 h-auto text-kuru-conch/20">
              <line x1="8" y1="0" x2="32" y2="80" stroke="currentColor" strokeWidth="1.5" />
              <line x1="32" y1="0" x2="8" y2="80" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="20" cy="40" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="font-body text-[9px] tracking-[0.3em] text-kuru-conch/25 uppercase">vs</span>
          </div>

          {/* Kaurava side */}
          <div className="text-left flex-1 max-w-[280px]">
            <span className="font-display text-7xl md:text-[8rem] leading-none font-bold" style={{ color: 'hsl(355 70% 55%)' }}>
              {AKSHAUHINI.kaurava}
            </span>
            <p className="font-display text-[10px] md:text-xs tracking-[0.25em] uppercase text-kuru-conch/50 mt-2">
              Kaurava Akshauhinis
            </p>
            <p className="font-body text-xs text-kuru-conch/30 mt-1">
              ≈ 2.41 million warriors
            </p>
          </div>
        </motion.div>

        {/* ── One Akshauhini — unit inscription strip ── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-center font-display text-[10px] tracking-[0.4em] uppercase text-kuru-gold/60 mb-8">
            Composition of One Akshauhini
          </p>

          <div className="space-y-4">
            {UNIT_ROWS.map((unit, i) => (
              <motion.div
                key={unit.label}
                className="flex items-center gap-4 md:gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.6 }}
              >
                {/* Label */}
                <span className="font-display text-[10px] md:text-xs tracking-[0.2em] uppercase text-kuru-conch/60 w-28 md:w-36 text-right shrink-0">
                  {unit.label}
                </span>

                {/* Glyph strip */}
                <div className="flex-1 flex items-center gap-1.5 text-kuru-bronze/50 overflow-hidden">
                  {Array.from({ length: unit.repeat }).map((_, gi) => (
                    <motion.span
                      key={gi}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.12 + gi * 0.04, duration: 0.3 }}
                    >
                      <unit.Glyph />
                    </motion.span>
                  ))}
                  <span className="font-body text-[10px] text-kuru-bronze/30 ml-1">···</span>
                </div>

                {/* Count */}
                <span className="font-display text-sm md:text-base text-kuru-gold/70 tabular-nums shrink-0">
                  {unit.count.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Ratio footnote */}
          <p className="text-center font-body text-[10px] text-kuru-conch/35 mt-6 tracking-wide">
            Prescribed ratio — Chariots : Elephants : Cavalry : Infantry — 1 : 1 : 3 : 5
          </p>

          {/* Total line */}
          <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-kuru-gold/15">
            <span className="font-display text-[10px] tracking-[0.3em] uppercase text-kuru-conch/40">
              Total per Akshauhini
            </span>
            <span className="font-display text-lg text-kuru-gold/80 tabular-nums">
              {AKSHAUHINI.total.toLocaleString()}
            </span>
          </div>
        </motion.div>

        {/* ── Alliance Columns — War Council ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <p className="text-center font-display text-[10px] tracking-[0.4em] uppercase text-kuru-gold/60 mb-10">
            The Alliances
          </p>

          <div className="flex gap-0">
            {/* Pandava column */}
            <div className="flex-1 pr-6 md:pr-10 border-r border-kuru-gold/15">
              <p className="font-display text-[9px] tracking-[0.3em] uppercase text-kuru-gold/50 mb-6 text-right">
                Pandava
              </p>
              <div className="space-y-5">
                {pandavaAlliances.map((a, i) => (
                  <motion.div
                    key={a.kingdom}
                    className="text-right"
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
                  >
                    <span className="font-display text-base md:text-lg text-kuru-conch/80 tracking-wide">
                      {a.kingdom}
                    </span>
                    <span className="block font-body text-[11px] text-kuru-conch/35 mt-0.5">
                      {a.leader}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Kaurava column */}
            <div className="flex-1 pl-6 md:pl-10">
              <p className="font-display text-[9px] tracking-[0.3em] uppercase mb-6 text-left" style={{ color: 'hsl(355 70% 55% / 0.6)' }}>
                Kaurava
              </p>
              <div className="space-y-5">
                {kauravaAlliances.map((a, i) => (
                  <motion.div
                    key={a.kingdom}
                    className="text-left"
                    initial={{ opacity: 0, x: 15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
                  >
                    <span className="font-display text-base md:text-lg text-kuru-conch/80 tracking-wide">
                      {a.kingdom}
                    </span>
                    <span className="block font-body text-[11px] text-kuru-conch/35 mt-0.5">
                      {a.leader}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      {/* Bottom bronze sheen */}
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--kuru-gold) / 0.2), transparent)' }} />
    </section>
  );
};
