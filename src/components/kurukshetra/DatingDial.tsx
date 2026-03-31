import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { DATING_THEORIES } from './kurukshetraData';

/**
 * Historicity — "The Excavation Ledger"
 * Circular astronomical dating dial + archaeological sites
 */

const SITES = [
  { site: 'Jyotisar', location: 'Thanesar', sig: 'Delivery of the Bhagavad Gita under the ancient banyan tree' },
  { site: 'Abhimanyupur', location: 'Kurukshetra', sig: 'Site of the Chakra Vyuha; Abhimanyu\'s death' },
  { site: 'Bhishma Kund', location: 'Narkatari', sig: 'Where Bhishma lay on the bed of arrows' },
  { site: 'Bhagwanpura', location: 'Kurukshetra', sig: 'Overlap of Late Harappan and PGW cultures' },
  { site: 'Sanauli', location: 'Uttar Pradesh', sig: 'Copper-plated chariots dating to 2000 BCE' },
  { site: 'Sannihit Sarovar', location: 'Kurukshetra', sig: 'Meeting point of seven sacred Saraswati rivers' },
];

export const DatingDial = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const cx = 200, cy = 200, outerR = 170, innerR = 60;

  // Date range: 500 BCE to 6000 BCE
  const dateToAngle = (dateStr: string) => {
    // Parse rough numeric value
    const match = dateStr.match(/(\d+)/);
    if (!match) return 0;
    const val = parseInt(match[1]);
    // Map 500-6000 to 0-330 degrees
    const minDate = 500, maxDate = 6000;
    const clamped = Math.max(minDate, Math.min(maxDate, val));
    return ((clamped - minDate) / (maxDate - minDate)) * 300 + 30; // start at 30deg
  };

  return (
    <section id="kuru-historicity" className="relative bg-kuru-dust kuru-grain overflow-hidden">
      <div className="relative z-10 text-center pt-24 pb-8 px-6">
        <p className="kuru-chip inline-flex mb-4">Archaeo-Astronomy</p>
        <h2 className="font-display text-3xl md:text-5xl tracking-[0.06em] text-kuru-kohl">
          The Excavation Ledger
        </h2>
        <p className="font-body text-base md:text-lg text-kuru-kohl/60 mt-4 max-w-2xl mx-auto">
          The dating of the Kurukshetra War remains one of the most contested topics in Indology —
          theories range from 900 BCE to 5561 BCE.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 px-6">
          {/* LEFT: Circular dial */}
          <div className="lg:w-[55%] flex justify-center">
            <div className="relative">
              <svg viewBox="0 0 400 400" className="w-[min(80vw,500px)] h-[min(80vw,500px)] overflow-visible">
                {/* Outer ring */}
                <circle cx={cx} cy={cy} r={outerR} fill="none"
                  stroke="hsl(var(--kuru-patina) / 0.2)" strokeWidth={0.8} />
                <circle cx={cx} cy={cy} r={innerR} fill="none"
                  stroke="hsl(var(--kuru-patina) / 0.15)" strokeWidth={0.5} />

                {/* Tick marks */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
                  const r1 = outerR - 5;
                  const r2 = outerR + 3;
                  return (
                    <line key={`tick-${i}`}
                      x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1}
                      x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2}
                      stroke="hsl(var(--kuru-patina) / 0.15)" strokeWidth={0.5} />
                  );
                })}

                {/* Date labels around rim */}
                {['6000 BCE', '5000 BCE', '4000 BCE', '3000 BCE', '2000 BCE', '1000 BCE'].map((label, i) => {
                  const angle = dateToAngle(label) * (Math.PI / 180) - Math.PI / 2;
                  const lr = outerR + 18;
                  return (
                    <text key={label}
                      x={cx + Math.cos(angle) * lr} y={cy + Math.sin(angle) * lr}
                      textAnchor="middle" dominantBaseline="middle"
                      className="font-body" fontSize={8}
                      fill="hsl(var(--kuru-kohl) / 0.35)">
                      {label}
                    </text>
                  );
                })}

                {/* Theory spokes */}
                {DATING_THEORIES.map((t, i) => {
                  const angleDeg = dateToAngle(t.date);
                  const angleRad = angleDeg * (Math.PI / 180) - Math.PI / 2;
                  const dotR = outerR - 20;
                  const isActive = activeIndex === i;

                  return (
                    <motion.g key={t.researcher}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(null)}
                      className="cursor-pointer"
                    >
                      {/* Spoke line */}
                      <line
                        x1={cx + Math.cos(angleRad) * innerR}
                        y1={cy + Math.sin(angleRad) * innerR}
                        x2={cx + Math.cos(angleRad) * dotR}
                        y2={cy + Math.sin(angleRad) * dotR}
                        stroke={isActive ? 'hsl(var(--kuru-gold))' : 'hsl(var(--kuru-patina) / 0.3)'}
                        strokeWidth={isActive ? 1.5 : 0.5}
                        strokeDasharray={isActive ? 'none' : '3 2'}
                      />

                      {/* Dot */}
                      <circle
                        cx={cx + Math.cos(angleRad) * dotR}
                        cy={cy + Math.sin(angleRad) * dotR}
                        r={isActive ? 6 : 4}
                        fill={isActive ? 'hsl(var(--kuru-gold))' : 'hsl(var(--kuru-patina))'}
                      />

                      {/* Researcher label */}
                      <text
                        x={cx + Math.cos(angleRad) * (dotR - 15)}
                        y={cy + Math.sin(angleRad) * (dotR - 15)}
                        textAnchor="middle" dominantBaseline="middle"
                        className="font-display" fontSize={isActive ? 9 : 7}
                        fill={isActive ? 'hsl(var(--kuru-gold))' : 'hsl(var(--kuru-kohl) / 0.5)'}
                        letterSpacing="0.08em"
                      >
                        {t.date}
                      </text>
                    </motion.g>
                  );
                })}

                {/* Center label */}
                <text x={cx} y={cy - 8} textAnchor="middle" className="font-display" fontSize={9}
                  fill="hsl(var(--kuru-kohl) / 0.6)" letterSpacing="0.15em">
                  KURUKSHETRA
                </text>
                <text x={cx} y={cy + 8} textAnchor="middle" className="font-display" fontSize={7}
                  fill="hsl(var(--kuru-kohl) / 0.35)" letterSpacing="0.2em">
                  WAR DATE
                </text>
              </svg>

              {/* Active theory popup */}
              {activeIndex !== null && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-kuru-conch/90 backdrop-blur border border-kuru-patina/20 rounded-sm px-5 py-3 shadow-lg max-w-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="font-display text-sm text-kuru-kohl tracking-wide">
                    {DATING_THEORIES[activeIndex].researcher}
                  </span>
                  <span className="block font-display text-lg font-bold text-kuru-patina mt-0.5">
                    {DATING_THEORIES[activeIndex].date}
                  </span>
                  <p className="font-body text-xs text-kuru-kohl/60 mt-1">
                    {DATING_THEORIES[activeIndex].evidence}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT: Archaeological sites */}
          <div className="lg:w-[45%]">
            <h3 className="font-display text-sm tracking-[0.2em] uppercase text-kuru-patina mb-6">
              Key Archaeological Sites
            </h3>
            <div className="space-y-3">
              {SITES.map((s, i) => (
                <motion.div
                  key={s.site}
                  className="border-l-2 border-kuru-patina/25 pl-4 py-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <span className="font-display text-sm text-kuru-kohl">{s.site}</span>
                  <span className="font-body text-[10px] text-kuru-kohl/35 ml-2">{s.location}</span>
                  <p className="font-body text-xs text-kuru-kohl/55 mt-0.5 leading-relaxed">{s.sig}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
