import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { TIMELINE_EVENTS } from './radcliffeData';
import { AdminParagraph, Stamp } from './SeamSystem';

const DAY_COLORS: Record<string, string> = {
  milestone: 'hsl(355 70% 45%)',
  hearing: 'hsl(185 40% 38%)',
  admin: 'hsl(215 30% 62%)',
  award: 'hsl(270 30% 35%)',
};

export const CountdownSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [filledDays, setFilledDays] = useState(0);
  const [activeEvent, setActiveEvent] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setFilledDays(Math.floor(v * 36));
      const eIdx = Math.min(Math.floor(v * TIMELINE_EVENTS.length), TIMELINE_EVENTS.length - 1);
      setActiveEvent(eIdx);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="relative min-h-[400vh] radcliffe-bg radcliffe-grain">
      <div className="sticky top-0 h-screen flex">
        {/* Left: Calendar */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div>
            <p className="font-survey text-[0.55rem] text-radcliffe-grid uppercase tracking-[0.3em] mb-6">
              Radcliffe's Working Days in India
            </p>
            <div className="grid grid-cols-6 gap-[4px]">
              {Array.from({ length: 36 }).map((_, i) => {
                const event = TIMELINE_EVENTS.find(e => e.day === i + 1);
                const filled = i < filledDays;
                const isAward = event?.type === 'award' && filled;
                // Paper degradation
                const brightness = filled ? Math.max(85 - (i * 0.8), 70) : 93;
                const saturation = filled ? Math.min(35 + (i * 1.2), 55) : 35;

                return (
                  <div
                    key={i}
                    className="w-[36px] h-[36px] border flex items-center justify-center relative transition-all duration-500"
                    style={{
                      borderColor: filled ? 'hsl(215 30% 62% / 0.3)' : 'hsl(215 30% 62% / 0.12)',
                      background: filled
                        ? `hsl(40 ${saturation}% ${brightness}%)`
                        : 'hsl(40 35% 93% / 0.5)',
                    }}
                  >
                    <span className="font-survey text-[0.55rem] text-radcliffe-ink/50">{i + 1}</span>
                    {event && filled && (
                      <div
                        className="absolute inset-1 rounded-sm opacity-30"
                        style={{ background: DAY_COLORS[event.type] }}
                      />
                    )}
                    {isAward && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-radcliffe-red" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex gap-4 flex-wrap">
              {Object.entries(DAY_COLORS).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm opacity-60" style={{ background: color }} />
                  <span className="font-survey text-[0.5rem] text-radcliffe-grid uppercase tracking-wider">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint — visible at start, fades as days fill */}
        {filledDays < 4 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
            animate={{ opacity: filledDays < 2 ? 0.7 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-survey text-[0.55rem] text-radcliffe-grid/40 uppercase tracking-[0.3em] mb-2">
              Keep scrolling
            </p>
            <motion.svg
              width="16" height="16" viewBox="0 0 16 16"
              className="text-radcliffe-grid/30"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path d="M2 5 L8 11 L14 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        )}

        {/* Right: Event cards */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-sm"
          >
            <div className="border border-radcliffe-grid/20 bg-radcliffe-cream p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-survey text-[0.6rem] text-radcliffe-grid uppercase tracking-widest">
                  Day {TIMELINE_EVENTS[activeEvent].day}
                </span>
                <span className="font-survey text-[0.6rem] text-radcliffe-ink/50">
                  {TIMELINE_EVENTS[activeEvent].date}, 1947
                </span>
              </div>
              <p className="font-survey text-sm text-radcliffe-ink leading-relaxed">
                {TIMELINE_EVENTS[activeEvent].label}
              </p>
              {'detail' in TIMELINE_EVENTS[activeEvent] && (
                <p className="font-survey text-[0.7rem] text-radcliffe-ink/60 leading-relaxed mt-3">
                  {(TIMELINE_EVENTS[activeEvent] as any).detail}
                </p>
              )}
              <div className="mt-4">
                <div
                  className="inline-block px-2 py-0.5 rounded-sm text-[0.5rem] font-survey uppercase tracking-widest text-white/80"
                  style={{ background: DAY_COLORS[TIMELINE_EVENTS[activeEvent].type] }}
                >
                  {TIMELINE_EVENTS[activeEvent].type}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
