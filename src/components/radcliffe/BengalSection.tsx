import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { DriftPanel, Stamp, AdminParagraph } from './SeamSystem';
import { BENGAL_DECISIONS } from './radcliffeData';

// ─── Contiguous Bengal districts ───
// viewBox "0 0 500 500"
// Geography: Ganges flows west→east, Brahmaputra flows north→south
// They merge in central Bengal, creating the world's largest delta
//
// Layout (West to East, North to South):
//   NW: Birbhum/Murshidabad   NE: Sylhet/Mymensingh
//   W: Calcutta/24 Parganas   Center: Jessore/Khulna   E: Dacca/Comilla
//   SW: Coast                 SE: Chittagong/CHT

const BENGAL_DISTRICTS = [
  // ── WESTERN BENGAL (India side) ──
  { id: 'west-north', label: 'Birbhum', labelX: 75, labelY: 120,
    path: 'M30,50 L140,45 L145,105 L135,170 L30,175 Z',
    allocation: 'india' },
  { id: 'murshidabad', label: 'Murshidabad', labelX: 185, labelY: 110,
    path: 'M140,45 L240,40 L235,105 L230,170 L135,170 L145,105 Z',
    allocation: 'india' },
  { id: 'calcutta-region', label: 'Calcutta', labelX: 85, labelY: 260,
    path: 'M30,175 L135,170 L130,260 L125,340 L30,345 Z',
    allocation: 'india' },
  { id: 'nadia', label: 'Nadia', labelX: 180, labelY: 235,
    path: 'M135,170 L230,170 L225,260 L130,260 Z',
    allocation: 'india' },

  // ── EASTERN BENGAL (Pakistan/East Pakistan side) ──
  { id: 'rajshahi', label: 'Rajshahi', labelX: 310, labelY: 85,
    path: 'M240,40 L370,35 L365,105 L360,170 L230,170 L235,105 Z',
    allocation: 'pakistan' },
  { id: 'sylhet', label: 'Sylhet', labelX: 425, labelY: 85,
    path: 'M370,35 L480,45 L475,110 L470,170 L360,170 L365,105 Z',
    allocation: 'split' },
  { id: 'dacca', label: 'Dacca', labelX: 320, labelY: 225,
    path: 'M230,170 L360,170 L355,260 L350,290 L225,260 Z',
    allocation: 'pakistan' },
  { id: 'mymensingh', label: 'Mymensingh', labelX: 430, labelY: 225,
    path: 'M360,170 L470,170 L465,260 L355,260 Z',
    allocation: 'pakistan' },
  { id: 'khulna', label: 'Khulna', labelX: 215, labelY: 340,
    path: 'M130,260 L225,260 L350,290 L340,370 L240,400 L125,340 Z',
    allocation: 'pakistan' },
  { id: 'chittagong', label: 'Chittagong', labelX: 400, labelY: 340,
    path: 'M355,260 L465,260 L460,370 L450,440 L340,370 L350,290 Z',
    allocation: 'pakistan' },
  { id: 'cht', label: 'CHT', labelX: 475, labelY: 360,
    path: 'M465,260 L495,265 L490,440 L450,440 L460,370 Z',
    allocation: 'pakistan' },

  // ── SOUTHERN (coast/Sundarbans) ──
  { id: 'sundarbans', label: 'Sundarbans', labelX: 200, labelY: 445,
    path: 'M30,345 L125,340 L240,400 L340,370 L450,440 L490,440 L490,480 L30,480 Z',
    allocation: 'pakistan' },
];

// Major rivers
const BENGAL_RIVERS = [
  { name: 'Ganges', path: 'M20,160 Q80,155 140,165 Q200,175 240,180 Q280,185 320,200 Q360,220 390,250' },
  { name: 'Brahmaputra', path: 'M420,30 Q415,80 405,130 Q395,170 385,210 Q375,250 370,280' },
  { name: 'Padma', path: 'M320,200 Q340,230 350,260 Q355,280 340,310 Q320,350 300,390' },
  { name: 'Meghna', path: 'M430,170 Q425,210 420,250 Q415,290 410,330 Q405,370 400,410' },
];

// The Radcliffe Line through Bengal — roughly north-south, west of Dacca
const BENGAL_RADCLIFFE_LINE = 'M237,40 L233,105 L228,170 L225,260 L240,310 L250,360 L260,420';

// Key cities
const BENGAL_CITIES = [
  { name: 'Calcutta', x: 95, y: 290, side: 'india' as const },
  { name: 'Dacca', x: 340, y: 220, side: 'pakistan' as const },
  { name: 'Chittagong', x: 430, y: 330, side: 'pakistan' as const },
];

const BENGAL_ALLOCATION_COLORS = {
  india: 'hsl(30 85% 55% / 0.25)',
  pakistan: 'hsl(150 45% 30% / 0.25)',
  split: 'hsl(42 65% 50% / 0.3)',
};

// Which districts to highlight per step
const STEP_HIGHLIGHTS: Record<number, string[]> = {
  0: ['calcutta-region'],
  1: ['murshidabad'],
  2: ['khulna'],
  3: ['cht'],
  4: ['sylhet'],
};

export const BengalSection = ({ drift }: { drift: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setActiveIdx(Math.min(Math.floor(v * BENGAL_DECISIONS.length), BENGAL_DECISIONS.length - 1));
    });
    return unsub;
  }, [scrollYProgress]);

  const decision = BENGAL_DECISIONS[activeIdx];
  const highlighted = STEP_HIGHLIGHTS[activeIdx] || [];

  return (
    <section ref={ref} className="relative min-h-[400vh] radcliffe-bg radcliffe-grain">
      <div className="sticky top-0 h-screen flex">
        {/* Left: Bengal map */}
        <DriftPanel side="left" drift={drift} className="w-1/2 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md">
            <Stamp>Bengal — The Deltaic Divide</Stamp>
            <svg viewBox="0 0 500 490" className="w-full mt-4">
              <defs>
                <filter id="bengal-glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Rivers */}
              {BENGAL_RIVERS.map(r => (
                <path
                  key={r.name}
                  d={r.path}
                  fill="none"
                  stroke="hsl(185 40% 50% / 0.3)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}

              {/* Districts */}
              {BENGAL_DISTRICTS.map(d => {
                const isHighlighted = highlighted.includes(d.id);
                const fill = BENGAL_ALLOCATION_COLORS[d.allocation as keyof typeof BENGAL_ALLOCATION_COLORS];
                return (
                  <g key={d.id}>
                    <motion.path
                      d={d.path}
                      fill={fill}
                      stroke={isHighlighted ? 'hsl(355 70% 45%)' : 'hsl(215 30% 62% / 0.25)'}
                      strokeWidth={isHighlighted ? 2.5 : 0.7}
                      strokeLinejoin="round"
                      animate={{ opacity: isHighlighted ? [0.6, 1, 0.6] : 1 }}
                      transition={isHighlighted ? { repeat: Infinity, duration: 1.5 } : {}}
                    />
                    <text
                      x={d.labelX} y={d.labelY}
                      fontSize="8"
                      fontFamily="'survey', ui-monospace, monospace"
                      fill="hsl(215 20% 35% / 0.6)"
                      textAnchor="middle"
                      fontWeight={isHighlighted ? '600' : '400'}
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}

              {/* River labels */}
              <text x="60" y="152" fontSize="6" fontFamily="'survey', ui-monospace, monospace" fill="hsl(185 40% 45% / 0.5)" fontStyle="italic">Ganges</text>
              <text x="432" y="55" fontSize="6" fontFamily="'survey', ui-monospace, monospace" fill="hsl(185 40% 45% / 0.5)" fontStyle="italic">Brahmaputra</text>

              {/* City markers */}
              {BENGAL_CITIES.map(c => (
                <g key={c.name}>
                  <circle cx={c.x} cy={c.y} r="3" fill="hsl(355 70% 45% / 0.7)" />
                  <text
                    x={c.x} y={c.y - 7}
                    fontSize="7"
                    fontFamily="'survey', ui-monospace, monospace"
                    fill="hsl(355 70% 45% / 0.8)"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {c.name}
                  </text>
                </g>
              ))}

              {/* Radcliffe Line */}
              <motion.path
                d={BENGAL_RADCLIFFE_LINE}
                fill="none"
                stroke="hsl(355 70% 45%)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#bengal-glow)"
                pathLength="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
              />

              {/* Bay of Bengal label */}
              <text x="250" y="475" fontSize="9" fontFamily="'survey', ui-monospace, monospace" fill="hsl(185 40% 50% / 0.3)" textAnchor="middle" letterSpacing="0.3em">BAY OF BENGAL</text>
            </svg>

            {/* Legend */}
            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: BENGAL_ALLOCATION_COLORS.india }} />
                <span className="font-survey text-[0.5rem] text-radcliffe-grid">India</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: BENGAL_ALLOCATION_COLORS.pakistan }} />
                <span className="font-survey text-[0.5rem] text-radcliffe-grid">East Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: BENGAL_ALLOCATION_COLORS.split }} />
                <span className="font-survey text-[0.5rem] text-radcliffe-grid">Referendum</span>
              </div>
            </div>
          </div>
        </DriftPanel>

        {/* Right: Decision cards */}
        <DriftPanel side="right" drift={drift} className="w-1/2 flex items-center justify-center p-8">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm"
          >
            <p className="font-survey text-[0.55rem] text-radcliffe-teal uppercase tracking-[0.3em] mb-4">
              Bengal Decision {activeIdx + 1} of {BENGAL_DECISIONS.length}
            </p>
            <h3 className="font-display text-2xl font-bold text-radcliffe-ink mb-4">{decision.area}</h3>
            <p className="font-survey text-[0.8rem] text-radcliffe-ink/80 leading-relaxed mb-4">{decision.detail}</p>
            <div className={`inline-block px-3 py-1 rounded-sm font-survey text-[0.55rem] uppercase tracking-widest font-bold ${
              decision.type === 'india' ? 'bg-radcliffe-saffron/20 text-radcliffe-saffron' :
              decision.type === 'pakistan' ? 'bg-radcliffe-green/20 text-radcliffe-green' :
              'bg-radcliffe-amber/20 text-radcliffe-amber'
            }`}>
              Awarded to {decision.type === 'split' ? 'Split' : decision.type === 'india' ? 'India' : 'Pakistan'}
            </div>

            {/* Murshidabad-Khulna swap highlight */}
            {(activeIdx === 1 || activeIdx === 2) && (
              <div className="mt-6 border border-radcliffe-grid/20 p-3">
                <p className="font-survey text-[0.6rem] text-radcliffe-violet uppercase tracking-widest mb-2">
                  The "Swap"
                </p>
                <p className="font-survey text-[0.7rem] text-radcliffe-ink/70">
                  Murshidabad (70% Muslim) → India. Khulna (51% Hindu) → Pakistan. "Other factors" overriding demography.
                </p>
              </div>
            )}

            {/* District splits */}
            {activeIdx === 1 && (
              <div className="mt-4 border border-radcliffe-grid/20 p-3">
                <p className="font-survey text-[0.6rem] text-radcliffe-teal uppercase tracking-widest mb-2">
                  District Splits
                </p>
                <p className="font-survey text-[0.7rem] text-radcliffe-ink/70">
                  Nadia was split from Jessore; Malda from Dinajpur. Communities that had shared markets, waterways, and family ties for centuries found themselves in different nations overnight.
                </p>
              </div>
            )}

            {/* CHT stamp */}
            {activeIdx === 3 && (
              <div className="mt-4">
                <span className="radcliffe-stamp">Geographic Necessity</span>
              </div>
            )}
          </motion.div>
        </DriftPanel>
      </div>
    </section>
  );
};
