import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { AdminParagraph, HumanVoice, Stamp, Redacted, DriftPanel } from './SeamSystem';
import { GURDASPUR_TEHSILS } from './radcliffeData';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

// Simplified Punjab map district polygons (viewBox 0 0 500 500)
const DISTRICTS = [
  { id: 'lahore', path: 'M220,180 L260,170 L280,200 L270,240 L230,250 L210,220 Z', label: 'Lahore', majority: 'muslim', allocation: 'pakistan' },
  { id: 'amritsar', path: 'M170,160 L220,150 L230,180 L210,220 L170,210 L160,185 Z', majority: 'mixed', label: 'Amritsar', allocation: 'india' },
  { id: 'gurdaspur', path: 'M140,100 L190,90 L200,130 L180,160 L140,155 L130,130 Z', label: 'Gurdaspur', majority: 'marginal', allocation: 'split' },
  { id: 'ferozepore', path: 'M150,220 L200,230 L210,270 L190,310 L150,300 L140,260 Z', label: 'Ferozepore', majority: 'muslim', allocation: 'india' },
  { id: 'montgomery', path: 'M260,250 L310,240 L330,280 L310,320 L260,310 L250,280 Z', label: 'Montgomery', majority: 'muslim', allocation: 'pakistan' },
  { id: 'lyallpur', path: 'M290,170 L340,160 L360,200 L340,240 L300,235 L280,200 Z', label: 'Lyallpur', majority: 'muslim', allocation: 'pakistan' },
  { id: 'rawalpindi', path: 'M200,50 L260,40 L280,80 L260,120 L220,125 L190,90 Z', label: 'Rawalpindi', majority: 'muslim', allocation: 'pakistan' },
  { id: 'jullundur', path: 'M120,160 L165,155 L170,195 L150,225 L110,215 L105,185 Z', label: 'Jullundur', majority: 'non-muslim', allocation: 'india' },
];

const ALLOCATION_COLORS = {
  india: 'hsl(30 85% 55% / 0.3)',
  pakistan: 'hsl(150 45% 30% / 0.3)',
  split: 'hsl(42 65% 50% / 0.3)',
};

const STEPS = [
  { title: 'The Undivided Punjab', description: 'A single province of 34 million people, irrigated by the world\'s largest canal network.' },
  { title: 'Lahore & Amritsar', description: 'Two cities 25 miles apart. Lahore: two-thirds Muslim. Amritsar: sacred city of the Sikhs. Hindus and Sikhs owned 80% of Lahore\'s factories.' },
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
    <section ref={ref} className="relative min-h-[300vh] radcliffe-bg radcliffe-grain overflow-hidden">
      <div className="sticky top-0 h-screen flex">
        {/* Left: Punjab SVG Map */}
        <DriftPanel side="left" drift={drift} className="w-1/2 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md">
            <Stamp>Punjab — Other Factors</Stamp>
            <svg viewBox="60 20 340 330" className="w-full mt-4">
              {/* Districts */}
              {DISTRICTS.map(d => {
                const isHighlighted = highlightDistricts.includes(d.id);
                const fill = showBoundary ? ALLOCATION_COLORS[d.allocation as keyof typeof ALLOCATION_COLORS] : 'hsl(215 30% 62% / 0.08)';
                return (
                  <g key={d.id}>
                    <motion.path
                      d={d.path}
                      fill={fill}
                      stroke={isHighlighted ? 'hsl(355 70% 45%)' : 'hsl(215 30% 62% / 0.3)'}
                      strokeWidth={isHighlighted ? 2.5 : 0.8}
                      animate={{
                        opacity: isHighlighted ? [0.6, 1, 0.6] : 1,
                      }}
                      transition={isHighlighted ? { repeat: Infinity, duration: 1.5 } : {}}
                    />
                    <text
                      x={d.path.split(' ')[0].replace('M', '')}
                      y={d.path.split(' ')[0].replace('M', '').split(',')[1]}
                      className="font-survey text-[6px] fill-radcliffe-ink/50"
                      textAnchor="middle"
                      dy="30"
                      dx="30"
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}
              {/* Radcliffe Line */}
              {showBoundary && (
                <motion.path
                  d="M140,60 L155,120 L160,160 L165,200 L155,250 L160,300 L170,340"
                  fill="none"
                  stroke="hsl(355 70% 45%)"
                  strokeWidth="2"
                  strokeDasharray="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
              )}
              {/* Kashmir corridor */}
              {activeStep === 2 && (
                <motion.path
                  d="M150,105 L130,60 L120,30 L100,10"
                  fill="none"
                  stroke="hsl(42 65% 50%)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
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
