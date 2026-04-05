import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll } from 'framer-motion';
import { HumanVoice, DriftPanel } from './SeamSystem';
import { REFUGEE_NAMES, DISPLACEMENT_DATA } from './radcliffeData';

// Generate a long list of names by repeating and shuffling
const generateNames = () => {
  const expanded: string[] = [];
  for (let i = 0; i < 40; i++) {
    expanded.push(...REFUGEE_NAMES);
  }
  return expanded;
};

export const VoidSection = ({ drift }: { drift: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [progress, setProgress] = useState(0);
  const names = useMemo(generateNames, []);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const dotCount = Math.floor(progress * 60);

  return (
    <section ref={ref} className="relative min-h-[350vh] overflow-hidden" style={{ background: 'hsl(30 5% 8%)' }}>
      <div className="sticky top-0 h-screen flex relative overflow-hidden">
        {/* Left: Administrative account */}
        <DriftPanel side="left" drift={drift + 10} className="w-[45%] flex items-center p-8 md:p-12 z-10">
          <div className="max-w-sm">
            <p className="font-survey text-[0.55rem] text-radcliffe-grid/50 uppercase tracking-[0.3em] mb-6">
              August 15–17, 1947
            </p>
            <h2 className="font-display text-3xl font-bold text-radcliffe-cream/90 uppercase tracking-wide mb-8">
              The Void
            </h2>

            {/* Displacement table */}
            <div className="border border-radcliffe-grid/15 mb-8">
              <table className="w-full font-survey text-[0.65rem]">
                <thead>
                  <tr className="border-b border-radcliffe-grid/15">
                    <th className="p-2 text-left text-radcliffe-grid/50 uppercase tracking-widest text-[0.5rem]">Category</th>
                    <th className="p-2 text-right text-radcliffe-grid/50 uppercase tracking-widest text-[0.5rem]">Low</th>
                    <th className="p-2 text-right text-radcliffe-grid/50 uppercase tracking-widest text-[0.5rem]">High</th>
                  </tr>
                </thead>
                <tbody>
                  {DISPLACEMENT_DATA.map(row => (
                    <tr key={row.category} className="border-b border-radcliffe-grid/10">
                      <td className="p-2 text-radcliffe-cream/70">{row.category}</td>
                      <td className="p-2 text-right text-radcliffe-cream/50">{row.low}</td>
                      <td className="p-2 text-right text-radcliffe-red/80 font-bold">{row.high}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="font-survey text-[0.7rem] text-radcliffe-grid/40 leading-relaxed">
              The line was not announced until August 17 — two days after independence. Millions did not know which nation they belonged to.
            </p>
          </div>
        </DriftPanel>

        {/* Center: THE VOID — Names scrolling */}
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2 overflow-hidden flex items-center justify-center z-20"
          style={{ width: `${Math.max(40, drift * 2)}px` }}
        >
          <div
            className="flex flex-col items-center gap-[2px] whitespace-nowrap"
            style={{
              animation: 'radcliffe-names-scroll 60s linear infinite',
            }}
          >
            {names.map((name, i) => (
              <span
                key={i}
                className="font-survey text-[5px] text-radcliffe-cream/20 leading-none select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Human voice / Testimony */}
        <DriftPanel side="right" drift={drift + 10} className="w-[45%] flex items-center p-8 md:p-12 ml-auto z-10">
          <div className="max-w-sm" style={{ background: 'hsl(38 30% 85% / 0.06)', padding: '2rem', borderLeft: '2px solid hsl(25 15% 25% / 0.3)' }}>
            <HumanVoice>
              "Ghost trains arrived at Lahore station. Every passenger had been murdered. The compartments were drenched in blood."
            </HumanVoice>
            <div className="h-8" />
            <HumanVoice>
              "In Thoha Khalsa, ninety Sikh women jumped into a well rather than face abduction. The village became a monument to what the line had unleashed."
            </HumanVoice>
            <div className="h-8" />
            <HumanVoice>
              "Refugee columns in the Punjab stretched over ten miles — up to 400,000 people moving on foot, frequently attacked at river crossings."
            </HumanVoice>
            <div className="h-8" />
            <p className="font-body italic text-sm text-radcliffe-cream/30">
              — From contemporary accounts by Ian Stephens, <em>The Statesman</em>
            </p>
          </div>
        </DriftPanel>

        {/* Refugee flow dots */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: dotCount }).map((_, i) => {
            const goingEast = i % 2 === 0;
            const y = 10 + ((i * 17) % 80);
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 3,
                  height: 3,
                  top: `${y}%`,
                  left: goingEast ? '10%' : '90%',
                  background: goingEast ? 'hsl(30 85% 55% / 0.6)' : 'hsl(150 45% 30% / 0.6)',
                  ['--flow-distance' as string]: goingEast ? '80vw' : '-80vw',
                  animation: `radcliffe-dot-flow ${3 + (i % 4)}s linear ${(i * 0.15) % 3}s infinite`,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
