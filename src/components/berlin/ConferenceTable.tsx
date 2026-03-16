import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BL, DELEGATIONS } from '@/components/visuals/berlinMapData';

export const ConferenceTable = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSeat, setHoveredSeat] = useState<number | null>(null);

  const cx = 300, cy = 220;
  const rx = 220, ry = 130;

  return (
    <section id="conference-room" ref={ref} className="relative py-24 px-6" style={{ background: BL.VELLUM }}>
      {/* Survey grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, ${BL.GRID_BLUE}06 1px, transparent 1px), linear-gradient(to bottom, ${BL.GRID_BLUE}06 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-3" style={{ color: BL.BRASS }}>
              Wilhelmstrasse 77
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: BL.INK }}>
              The Conference Room
            </h2>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: BL.INK }}>
              From November 15, 1884 to February 26, 1885, fourteen nations negotiated the terms of African colonization
              in Bismarck's official residence. A defining characteristic of the summit was the <strong style={{ color: BL.RED_WAX }}>total exclusion
              of African leaders or representatives</strong>.
            </p>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: BL.MUTED }}>
              No African polity was consulted. The sovereignty of existing kingdoms — the Sokoto Caliphate, the Ethiopian Empire,
              the Ashanti — was resolutely ignored. The presence of Henry Morton Stanley as an adviser to the American delegation
              provided a thin veneer of "scientific" legitimacy to Leopold's territorial claims in the Congo Basin.
            </p>
            <p className="font-body text-sm italic leading-relaxed" style={{ color: BL.MUTED }}>
              Hover over each seat to see the delegates who decided the fate of a continent.
            </p>
          </motion.div>

          {/* SVG Seating Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <svg viewBox="0 0 600 460" className="w-full">
              {/* Table */}
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={BL.TERRITORY} stroke={BL.BRASS} strokeWidth="2" />
              <text x={cx} y={cy - 10} textAnchor="middle" className="font-display text-sm font-bold" fill={BL.INK}>
                BERLIN CONFERENCE
              </text>
              <text x={cx} y={cy + 12} textAnchor="middle" className="font-body text-xs" fill={BL.MUTED}>
                1884–1885
              </text>

              {/* Delegation seats */}
              {DELEGATIONS.map((d, i) => {
                const angle = (i / 14) * Math.PI * 2 - Math.PI / 2;
                const sx = cx + (rx + 50) * Math.cos(angle);
                const sy = cy + (ry + 50) * Math.sin(angle);
                const isHovered = hoveredSeat === i;

                return (
                  <g
                    key={d.country}
                    onMouseEnter={() => setHoveredSeat(i)}
                    onMouseLeave={() => setHoveredSeat(null)}
                    className="cursor-pointer"
                  >
                    <circle cx={sx} cy={sy} r={isHovered ? 16 : 12} fill={isHovered ? BL.BRASS : BL.INK} opacity={isHovered ? 1 : 0.7} className="transition-all duration-300" />
                    <text x={sx} y={sy + 28} textAnchor="middle" className="font-body" fill={BL.INK} fontSize="8" fontWeight={isHovered ? 'bold' : 'normal'}>
                      {d.country.length > 12 ? d.country.slice(0, 10) + '…' : d.country}
                    </text>
                  </g>
                );
              })}

              {/* The Empty Chair — Africa */}
              <g>
                <rect x={cx - 20} y={cy + ry + 70} width="40" height="40" rx="4" fill="none" stroke={BL.RED_WAX} strokeWidth="2" strokeDasharray="4 3" />
                <text x={cx} y={cy + ry + 125} textAnchor="middle" className="font-display text-xs font-bold" fill={BL.RED_WAX}>
                  AFRICA
                </text>
                <text x={cx} y={cy + ry + 138} textAnchor="middle" className="font-body text-[8px]" fill={BL.RED_WAX} opacity="0.7">
                  (not invited)
                </text>
              </g>

              {/* Tooltip */}
              {hoveredSeat !== null && (
                <foreignObject x={10} y={380} width={580} height={80}>
                  <div className="p-3 rounded-lg" style={{ background: BL.INK, border: `1px solid ${BL.BRASS}44` }}>
                    <p className="font-display text-sm font-bold" style={{ color: BL.VELLUM }}>
                      {DELEGATIONS[hoveredSeat].country}
                    </p>
                    <p className="font-body text-xs mt-1" style={{ color: BL.GRID_BLUE }}>
                      {DELEGATIONS[hoveredSeat].delegates.join(' · ')}
                    </p>
                  </div>
                </foreignObject>
              )}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
