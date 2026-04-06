import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { DriftPanel } from './SeamSystem';
import { REFUGEE_NAMES, DISPLACEMENT_DATA } from './radcliffeData';

// Build a single continuous text block from refugee names
const NAMES_TEXT = Array.from({ length: 40 }, () => REFUGEE_NAMES.join(' · ')).join(' · ');
const NAMES_FONT = '400 5px ui-monospace, monospace';
const NAMES_LINE_HEIGHT = 7;

// Canvas-rendered name scroll powered by pretext
const NameCanvas: React.FC<{ width: number; height: number; progress: number }> = ({ width, height, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Estimate total text height by word-wrapping manually
  const totalHeight = React.useMemo(() => {
    if (width <= 0 || typeof document === 'undefined') return 5000;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 5000;
    ctx.font = NAMES_FONT;
    const words = NAMES_TEXT.split(' ');
    let lines = 1, line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > width && line) { lines++; line = word; }
      else { line = test; }
    }
    return lines * NAMES_LINE_HEIGHT;
  }, [width]);

  // Paint visible window of names onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width <= 0 || totalHeight <= 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);
    ctx.font = NAMES_FONT;
    ctx.fillStyle = 'hsla(30, 30%, 90%, 0.2)';
    ctx.textBaseline = 'top';

    // Scroll offset loops through total text height
    const scrollOffset = (progress * totalHeight * 2) % totalHeight;

    // Manually word-wrap and paint only visible lines
    const words = NAMES_TEXT.split(' ');
    let y = -scrollOffset;
    let line = '';

    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      const measured = ctx.measureText(test).width;

      if (measured > width && line) {
        if (y + NAMES_LINE_HEIGHT > 0 && y < height) {
          ctx.fillText(line, 0, y);
        }
        line = word;
        y += NAMES_LINE_HEIGHT;
        // Stop once past the viewport
        if (y > height + NAMES_LINE_HEIGHT) break;
      } else {
        line = test;
      }
    }
    // Paint last line
    if (line && y + NAMES_LINE_HEIGHT > 0 && y < height) {
      ctx.fillText(line, 0, y);
    }

    // Wrap around: if we ran out of text, restart from top
    if (y < height) {
      let y2 = y + NAMES_LINE_HEIGHT;
      let line2 = '';
      for (const word of words) {
        const test = line2 ? `${line2} ${word}` : word;
        const measured = ctx.measureText(test).width;
        if (measured > width && line2) {
          if (y2 + NAMES_LINE_HEIGHT > 0 && y2 < height) {
            ctx.fillText(line2, 0, y2);
          }
          line2 = word;
          y2 += NAMES_LINE_HEIGHT;
          if (y2 > height) break;
        } else {
          line2 = test;
        }
      }
    }
  }, [width, height, progress, totalHeight]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height, display: 'block' }}
    />
  );
};

export const VoidSection = ({ drift }: { drift: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const dotCount = Math.floor(progress * 60);

  return (
    <>
    {/* Content warning */}
    <div className="py-4 text-center radcliffe-bg">
      <p className="font-survey text-[0.6rem] text-radcliffe-grid/50 uppercase tracking-[0.25em]">
        The following section contains accounts of communal violence
      </p>
    </div>
    <section ref={ref} className="relative min-h-[250vh]" style={{ background: 'hsl(30 5% 8%)' }}>
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

            <div className="space-y-3 font-survey text-[0.7rem] text-radcliffe-grid/40 leading-relaxed">
              <p>
                The awards were not published until <span className="text-radcliffe-red/70 font-bold">August 17</span> — two days after independence. For 72 hours, villages along the line did not know which flag to fly.
              </p>
              <p>
                In the Chittagong Hill Tracts, Chakma leaders hoisted the Indian tricolour on August 15. Two days later, they learned by radio that they belonged to Pakistan. Many areas had no radios at all.
              </p>
              <p>
                No physical boundary markers existed for weeks. Local officials improvised. Land grabs and preemptive "cleansing" of villages occurred along the entire line before authority could be established.
              </p>
            </div>
          </div>
        </DriftPanel>

        {/* Center: THE VOID — Names scrolling (canvas-rendered via pretext) */}
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2 overflow-hidden z-20"
          style={{ width: `${Math.max(40, drift * 2)}px` }}
        >
          <NameCanvas
            width={Math.max(40, drift * 2)}
            height={typeof window !== 'undefined' ? window.innerHeight : 900}
            progress={progress}
          />
        </div>

        {/* Right: Human voice / Testimony */}
        <DriftPanel side="right" drift={drift + 10} className="w-[45%] flex items-center p-8 md:p-12 ml-auto z-10">
          <div className="max-w-sm" style={{ background: 'hsl(38 30% 85% / 0.06)', padding: '2rem', borderLeft: '2px solid hsl(40 35% 70% / 0.3)' }}>
            <p className="font-body italic text-lg leading-relaxed text-radcliffe-cream/85 text-left">
              "Ghost trains arrived at Lahore station. Every passenger had been murdered. The compartments were drenched in blood."
            </p>
            <div className="h-8" />
            <p className="font-body italic text-lg leading-relaxed text-radcliffe-cream/85 text-left">
              "In Thoha Khalsa, ninety Sikh women jumped into a well rather than face abduction. The village became a monument to what the line had unleashed."
            </p>
            <div className="h-8" />
            <p className="font-body italic text-lg leading-relaxed text-radcliffe-cream/85 text-left">
              "Refugee columns in the Punjab stretched over ten miles — up to 400,000 people moving on foot, frequently attacked at river crossings."
            </p>
            <div className="h-8" />
            <p className="font-body italic text-lg leading-relaxed text-radcliffe-cream/85 text-left">
              "We celebrated independence on August 15 with the Indian flag. On August 17, soldiers came and told us we were now Pakistan."
            </p>
            <p className="font-body italic text-sm text-radcliffe-cream/40 mt-2">
              — Chakma community account, Chittagong Hill Tracts
            </p>
            <div className="h-8" />
            <p className="font-body italic text-sm text-radcliffe-cream/50">
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
    </>
  );
};
