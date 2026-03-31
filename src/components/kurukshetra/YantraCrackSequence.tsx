import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { DHARMA_RULES, DharmaRule } from './kurukshetraData';

/**
 * Dharma — "The Broken Rules"
 * Sticky yantra that cracks per rule violation as user scrolls.
 */

/* ── Crack path generator ── */
const generateCrackPath = (index: number, total: number): string => {
  const cx = 200, cy = 200;
  const angle = (index / total) * Math.PI * 2 + Math.PI / 6;
  const startR = 20;
  const endR = 180;

  const points: string[] = [];
  const steps = 8;
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const r = startR + (endR - startR) * t;
    const jitter = (Math.sin(index * 137.5 + s * 73.1) * 15) * t;
    const jitterY = (Math.cos(index * 91.3 + s * 53.7) * 12) * t;
    const x = cx + Math.cos(angle + jitter * 0.01) * r + jitter;
    const y = cy + Math.sin(angle + jitterY * 0.01) * r + jitterY;
    points.push(s === 0 ? `M${x},${y}` : `L${x},${y}`);
  }
  return points.join(' ');
};

/* ── Rule Card ── */
const RuleCard = ({ rule, index, onVisible }: { rule: DharmaRule; index: number; onVisible: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40%' });

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  return (
    <motion.div
      ref={ref}
      className="min-h-[50vh] flex items-center py-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-kuru-dust/80 backdrop-blur-sm border border-kuru-bronze/15 rounded-sm p-6 md:p-8 w-full">
        {/* The rule */}
        <p className="font-display text-lg md:text-xl text-kuru-gold/80 tracking-wide leading-relaxed">
          "{rule.rule}"
        </p>

        {/* Crack line through rule */}
        <motion.div
          className="h-[2px] bg-kuru-red/50 my-4 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
        />

        {/* Violation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p className="font-body text-base text-kuru-red/70 leading-relaxed">
            {rule.violation}
          </p>
          <div className="mt-3 flex items-center gap-3 text-[10px] font-display uppercase tracking-[0.25em] text-kuru-ash">
            <span>Day {rule.day}</span>
            <span className="h-px w-4 bg-kuru-ash/30" />
            <span>{rule.violator}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Main Component ── */
export const YantraCrackSequence = () => {
  const [crackedCount, setCrackedCount] = useState(0);
  const total = DHARMA_RULES.length;

  const crackPaths = useMemo(() =>
    DHARMA_RULES.map((_, i) => generateCrackPath(i, total)),
    [total]
  );

  // Build yantra geometry
  const cx = 200, cy = 200;

  return (
    <section id="kuru-dharma" className="relative bg-kuru-dust kuru-grain overflow-hidden">
      {/* Crack texture */}
      {crackedCount > 2 && (
        <div
          className="absolute inset-0 pointer-events-none kuru-cracks"
          style={{ opacity: (crackedCount / total) * 0.3 }}
        />
      )}

      {/* Section header */}
      <div className="relative z-10 text-center pt-24 pb-4 px-6">
        <p className="kuru-chip inline-flex mb-4">Dharma Yuddha → Kuta Yuddha</p>
        <h2 className="font-display text-3xl md:text-5xl tracking-[0.06em] text-kuru-kohl">
          The Broken Rules
        </h2>
        <p className="font-body text-base md:text-lg text-kuru-kohl/60 mt-4 max-w-2xl mx-auto">
          The war began with solemn agreements. One by one, every rule was broken.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row">
          {/* LEFT: sticky yantra */}
          <div className="hidden md:block md:w-[45%] lg:w-[50%]">
            <div className="sticky top-0 h-screen flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-[min(40vw,50vh)] h-[min(40vw,50vh)] overflow-visible">
                {/* Concentric squares */}
                {[160, 130, 100, 70, 40].map((s, i) => (
                  <rect key={`sq-${i}`}
                    x={cx - s} y={cy - s} width={s * 2} height={s * 2}
                    fill="none"
                    stroke={`hsl(var(--kuru-gold) / ${Math.max(0.05, 1 - crackedCount / total)})`}
                    strokeWidth={0.5}
                    transform={`rotate(${i % 2 ? 45 : 0}, ${cx}, ${cy})`}
                  />
                ))}

                {/* Triangles */}
                {[100, 70].map((r, i) => {
                  const up = [0, 120, 240].map(a => {
                    const rad = ((a - 90) * Math.PI) / 180;
                    return `${cx + Math.cos(rad) * r},${cy + Math.sin(rad) * r}`;
                  }).join(' ');
                  const down = [60, 180, 300].map(a => {
                    const rad = ((a - 90) * Math.PI) / 180;
                    return `${cx + Math.cos(rad) * r},${cy + Math.sin(rad) * r}`;
                  }).join(' ');
                  return (
                    <React.Fragment key={`tri-${i}`}>
                      <polygon points={up} fill="none"
                        stroke={`hsl(var(--kuru-gold) / ${Math.max(0.05, 0.8 - crackedCount / total * 0.8)})`}
                        strokeWidth={0.4} />
                      <polygon points={down} fill="none"
                        stroke={`hsl(var(--kuru-gold) / ${Math.max(0.05, 0.7 - crackedCount / total * 0.7)})`}
                        strokeWidth={0.35} />
                    </React.Fragment>
                  );
                })}

                {/* Center bindu */}
                <circle cx={cx} cy={cy} r={crackedCount >= total ? 1 : 6}
                  fill={`hsl(var(--kuru-gold) / ${Math.max(0.05, 1 - crackedCount / total)})`}
                />

                {/* Crack lines — appear as rules break */}
                {crackPaths.map((d, i) => (
                  <motion.path
                    key={`crack-${i}`}
                    d={d}
                    fill="none"
                    stroke="hsl(var(--kuru-red))"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={i < crackedCount
                      ? { pathLength: 1, opacity: 0.6 }
                      : { pathLength: 0, opacity: 0 }
                    }
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                ))}

                {/* Shatter fragments at the end */}
                {crackedCount >= total && (
                  <>
                    {[0, 60, 120, 180, 240, 300].map((a, i) => {
                      const rad = (a * Math.PI) / 180;
                      return (
                        <motion.path
                          key={`frag-${i}`}
                          d={`M${cx + Math.cos(rad) * 50},${cy + Math.sin(rad) * 50}
                              L${cx + Math.cos(rad + 0.2) * 80},${cy + Math.sin(rad + 0.2) * 80}
                              L${cx + Math.cos(rad - 0.15) * 75},${cy + Math.sin(rad - 0.15) * 75} Z`}
                          fill="none"
                          stroke="hsl(var(--kuru-red) / 0.3)"
                          strokeWidth={0.5}
                          initial={{ opacity: 0, x: 0, y: 0 }}
                          animate={{
                            opacity: [0, 0.5, 0.3],
                            x: Math.cos(rad) * 15,
                            y: Math.sin(rad) * 15,
                          }}
                          transition={{ duration: 2, delay: i * 0.1 }}
                        />
                      );
                    })}
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* RIGHT: scrolling rule cards */}
          <div className="w-full md:w-[55%] lg:w-[50%] px-4 md:px-8">
            {DHARMA_RULES.map((rule, i) => (
              <RuleCard
                key={i}
                rule={rule}
                index={i}
                onVisible={() => setCrackedCount(prev => Math.max(prev, i + 1))}
              />
            ))}

            {/* Epilogue note */}
            <div className="py-16 px-2">
              <p className="font-body text-sm text-kuru-kohl/50 italic max-w-lg">
                The ethical narrative suggests that while the Pandavas won the physical war, the moral erosion was so total that the victory was pyrrhic — heralding the Kali Yuga, an age of spiritual decline from which the world has never recovered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
