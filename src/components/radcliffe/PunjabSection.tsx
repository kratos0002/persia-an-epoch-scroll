import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { AdminParagraph, HumanVoice, Stamp, Redacted, DriftPanel } from './SeamSystem';
import { GURDASPUR_TEHSILS } from './radcliffeData';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

// ─── Geographically positioned, contiguous Punjab districts ───
// viewBox "0 0 500 450" — West to East, North to South
// Shared vertices ensure districts tessellate with no gaps
//
// Grid points (rows A-E, cols 1-5):
// A1(70,40)  A2(170,30)  A3(280,25)  A4(380,35)  A5(460,50)
// B1(50,130) B2(160,120) B3(265,115) B4(365,120) B5(455,135)
// C1(35,230) C2(150,225) C3(260,220) C4(360,225) C5(445,235)
// D1(45,330) D2(155,325) D3(255,320) D4(355,325) D5(430,335)
// E1(80,410) E2(200,400) E3(310,395) E4(400,390)

const DISTRICTS = [
  // ── WESTERN (Pakistan side) ──
  { id: 'rawalpindi', label: 'Rawalpindi', labelX: 105, labelY: 85,
    path: 'M70,40 L170,30 L160,120 L50,130 Z',
    majority: 'muslim', allocation: 'pakistan' },
  { id: 'gujranwala', label: 'Gujranwala', labelX: 210, labelY: 78,
    path: 'M170,30 L280,25 L265,115 L160,120 Z',
    majority: 'muslim', allocation: 'pakistan' },
  { id: 'lyallpur', label: 'Lyallpur', labelX: 90, labelY: 185,
    path: 'M50,130 L160,120 L150,225 L35,230 Z',
    majority: 'muslim', allocation: 'pakistan' },
  { id: 'lahore', label: 'Lahore', labelX: 205, labelY: 175,
    path: 'M160,120 L265,115 L260,220 L150,225 Z',
    majority: 'muslim', allocation: 'pakistan' },
  { id: 'montgomery', label: 'Montgomery', labelX: 130, labelY: 330,
    path: 'M35,230 L150,225 L260,220 L255,320 L155,325 L45,330 Z',
    majority: 'muslim', allocation: 'pakistan' },
  { id: 'multan', label: 'Multan', labelX: 140, labelY: 385,
    path: 'M45,330 L155,325 L255,320 L200,400 L80,410 Z',
    majority: 'muslim', allocation: 'pakistan' },

  // ── EASTERN (India side) ──
  { id: 'gurdaspur', label: 'Gurdaspur', labelX: 320, labelY: 78,
    path: 'M280,25 L380,35 L365,120 L265,115 Z',
    majority: 'marginal', allocation: 'split' },
  { id: 'amritsar', label: 'Amritsar', labelX: 310, labelY: 175,
    path: 'M265,115 L365,120 L360,225 L260,220 Z',
    majority: 'mixed', allocation: 'india' },
  { id: 'jullundur', label: 'Jullundur', labelX: 405, labelY: 175,
    path: 'M365,120 L460,50 L455,135 L445,235 L360,225 Z',
    majority: 'non-muslim', allocation: 'india' },
  { id: 'ferozepore', label: 'Ferozepore', labelX: 340, labelY: 290,
    path: 'M260,220 L360,225 L445,235 L430,335 L355,325 L255,320 Z',
    majority: 'muslim', allocation: 'india' },
];

// Five rivers of Punjab — flowing NE to SW
const RIVERS = [
  { name: 'Jhelum',  path: 'M90,25 Q85,100 80,180 Q78,260 85,340 Q90,380 95,420' },
  { name: 'Chenab',  path: 'M165,20 Q158,100 155,180 Q150,260 152,340 Q155,380 160,420' },
  { name: 'Ravi',    path: 'M275,18 Q268,100 262,180 Q258,260 256,340 Q254,380 252,420' },
  { name: 'Beas',    path: 'M370,28 Q363,100 358,180 Q355,260 354,340 Q355,380 358,420' },
  { name: 'Sutlej',  path: 'M455,45 Q448,130 442,220 Q438,300 435,340 Q432,380 428,420' },
];

// The Radcliffe Line cutting through Punjab
// Deviates west of center at Gurdaspur (giving 3 tehsils to India)
// and west at Ferozepore (reversing the draft)
const PUNJAB_RADCLIFFE_LINE = 'M272,25 L268,70 L265,115 L260,170 L260,220 L258,270 L255,320 L252,370';

// Key cities
const CITIES = [
  { name: 'Lahore', x: 250, y: 165, side: 'pakistan' as const },
  { name: 'Amritsar', x: 280, y: 165, side: 'india' as const },
  { name: 'Rawalpindi', x: 110, y: 70, side: 'pakistan' as const },
  { name: 'Ferozepore', x: 275, y: 270, side: 'india' as const },
];

const ALLOCATION_COLORS = {
  india: 'hsl(30 85% 55% / 0.25)',
  pakistan: 'hsl(150 45% 30% / 0.25)',
  split: 'hsl(42 65% 50% / 0.3)',
};

const STEPS = [
  { title: 'The Undivided Punjab', description: 'A single province of 34 million people, irrigated by the world\'s largest canal network. The Sikhs — 6 million strong — were so widely scattered across central Punjab that no boundary could keep them together. Any line would bisect their community.' },
  { title: 'Lahore & Amritsar', description: 'Two cities 25 miles apart. Lahore: two-thirds Muslim, yet Hindus and Sikhs owned 80% of its factories, 67% of its shops, and dominated its professional class. Amritsar: sacred city of the Sikhs, home to the Golden Temple. Awarding Lahore to Pakistan meant the economic displacement of the very communities who ran its economy — ethnic cleansing followed partition by days.' },
  { title: 'The Gurdaspur Corridor', description: 'Four tehsils. A marginal Muslim majority. Radcliffe awarded three to India — creating the only land access to Kashmir.' },
  { title: 'The Ferozepore Question', description: 'A draft map gave it to Pakistan. Then came the Bikaner lobbying, the "eliminate salient" message. The final award reversed the draft.' },
];

export const PunjabSection = ({ drift }: { drift: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setActiveStep(Math.min(Math.floor(v * STEPS.length), STEPS.length - 1));
    });
    return unsub;
  }, [scrollYProgress]);

  const highlightDistricts = activeStep === 1
    ? ['lahore', 'amritsar']
    : activeStep === 2
      ? ['gurdaspur']
      : activeStep === 3
        ? ['ferozepore']
        : [];

  const showBoundary = activeStep >= 1;

  return (
    <section ref={ref} className="relative min-h-[400vh] radcliffe-bg radcliffe-grain">
      <div className="sticky top-0 h-screen flex">
        {/* Left: Punjab SVG Map */}
        <DriftPanel side="left" drift={drift} className="w-1/2 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md">
            <Stamp>Punjab — Other Factors</Stamp>
            <svg viewBox="0 0 500 450" className="w-full mt-4">
              <defs>
                <filter id="punjab-glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Rivers — subtle blue curves */}
              {RIVERS.map(r => (
                <path
                  key={r.name}
                  d={r.path}
                  fill="none"
                  stroke="hsl(210 40% 65% / 0.25)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              ))}

              {/* Districts */}
              {DISTRICTS.map(d => {
                const isHighlighted = highlightDistricts.includes(d.id);
                const fill = showBoundary
                  ? ALLOCATION_COLORS[d.allocation as keyof typeof ALLOCATION_COLORS]
                  : 'hsl(215 30% 62% / 0.06)';
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
                      x={d.labelX}
                      y={d.labelY}
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
              {RIVERS.map(r => {
                const startX = parseInt(r.path.match(/M(\d+)/)?.[1] || '0');
                return (
                  <text
                    key={r.name + '-label'}
                    x={startX}
                    y={430}
                    fontSize="6"
                    fontFamily="'survey', ui-monospace, monospace"
                    fill="hsl(210 40% 55% / 0.4)"
                    textAnchor="middle"
                    fontStyle="italic"
                  >
                    {r.name}
                  </text>
                );
              })}

              {/* City markers */}
              {showBoundary && CITIES.map(c => (
                <g key={c.name}>
                  <circle cx={c.x} cy={c.y} r="3" fill="hsl(355 70% 45% / 0.7)" />
                  <text
                    x={c.x}
                    y={c.y - 7}
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
              {showBoundary && (
                <motion.path
                  d={PUNJAB_RADCLIFFE_LINE}
                  fill="none"
                  stroke="hsl(355 70% 45%)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#punjab-glow)"
                  pathLength="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                  style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
                />
              )}

              {/* Kashmir corridor arrow */}
              {activeStep === 2 && (
                <g>
                  <motion.path
                    d="M290,25 L310,8 L340,0"
                    fill="none"
                    stroke="hsl(42 65% 50%)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                  />
                  <text
                    x="355" y="5"
                    fontSize="7"
                    fontFamily="'survey', ui-monospace, monospace"
                    fill="hsl(42 65% 50% / 0.8)"
                    fontStyle="italic"
                  >
                    To Kashmir →
                  </text>
                </g>
              )}
            </svg>

            {/* Legend */}
            {showBoundary && (
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: ALLOCATION_COLORS.india }} />
                  <span className="font-survey text-[0.5rem] text-radcliffe-grid">India</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: ALLOCATION_COLORS.pakistan }} />
                  <span className="font-survey text-[0.5rem] text-radcliffe-grid">Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: ALLOCATION_COLORS.split }} />
                  <span className="font-survey text-[0.5rem] text-radcliffe-grid">Disputed</span>
                </div>
              </div>
            )}
          </div>
        </DriftPanel>

        {/* Right: Scrolling narrative */}
        <DriftPanel side="right" drift={drift} className="w-1/2 flex items-center justify-center p-8">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm"
          >
            <p className="font-survey text-[0.55rem] text-radcliffe-red uppercase tracking-[0.3em] mb-4">
              Decision {activeStep + 1} of {STEPS.length}
            </p>
            <h3 className="font-display text-2xl font-bold text-radcliffe-ink mb-4">{STEPS[activeStep].title}</h3>
            <p className="font-survey text-[0.8rem] text-radcliffe-ink/80 leading-relaxed">{STEPS[activeStep].description}</p>

            {/* Gurdaspur tehsil table */}
            {activeStep === 2 && (
              <div className="mt-6 border border-radcliffe-grid/20">
                <table className="w-full font-survey text-[0.7rem]">
                  <thead>
                    <tr className="border-b border-radcliffe-grid/20">
                      <th className="p-2 text-left text-radcliffe-grid uppercase tracking-widest text-[0.5rem]">Tehsil</th>
                      <th className="p-2 text-left text-radcliffe-grid uppercase tracking-widest text-[0.5rem]">Majority</th>
                      <th className="p-2 text-left text-radcliffe-grid uppercase tracking-widest text-[0.5rem]">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GURDASPUR_TEHSILS.map(t => (
                      <tr key={t.name} className="border-b border-radcliffe-grid/10">
                        <td className="p-2 text-radcliffe-ink">{t.name}</td>
                        <td className="p-2 text-radcliffe-ink/70">{t.majority}</td>
                        <td className={`p-2 font-bold ${t.allocation === 'India' ? 'text-radcliffe-saffron' : 'text-radcliffe-green'}`}>
                          {t.allocation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Ferozepore redacted document */}
            {activeStep === 3 && (
              <div className="mt-6 border-2 border-radcliffe-grid/20 bg-radcliffe-aged/50 p-4 relative">
                <div className="absolute top-2 right-2 radcliffe-stamp text-radcliffe-red border-radcliffe-red/50">
                  Classified
                </div>
                <p className="font-survey text-[0.7rem] text-radcliffe-ink/70 leading-relaxed mt-6">
                  George Abell sent a <Redacted>sketch map showing Ferozepore salient to Pakistan</Redacted> to Sir Evan Jenkins on August 8. The final award on August 17 <Redacted>reversed this allocation entirely</Redacted>.
                </p>
              </div>
            )}
          </motion.div>
        </DriftPanel>
      </div>
    </section>
  );
};
