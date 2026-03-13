import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';

const MIDNIGHT = 'hsl(225, 30%, 7%)';
const GOLD = 'hsl(43, 70%, 50%)';
const PARCHMENT = 'hsl(45, 30%, 88%)';
const SMOKE = 'hsl(220, 8%, 35%)';

/* ─── Legacy Timeline Data ─── */

const LEGACY_TIMELINE = [
  { title: 'The Civil Code', year: 1804, still: true, stat: '70+ nations', desc: 'Foundation of modern civil law across Europe, Latin America, and beyond.' },
  { title: 'The Metric System', year: 1799, still: true, stat: 'Every nation but 3', desc: 'Standardized measurement, now used by virtually the entire world.' },
  { title: 'Public Education', year: 1802, still: true, stat: 'The lycée model', desc: 'State-run secondary schools became the template across Europe.' },
  { title: 'Modern Bureaucracy', year: 1800, still: true, stat: 'Prefectures endure', desc: 'Centralized administration, merit-based appointment — the modern state.' },
  { title: 'End of Feudalism', year: 1806, still: true, stat: 'Irreversible', desc: 'Wherever his armies marched, feudal privileges were abolished permanently.' },
  { title: 'Nationalism', year: 1807, still: true, stat: 'Double-edged', desc: 'By redrawing Europe, he awakened the very force that destroyed his empire.' },
];

const currentYear = 2026;
const timelineStart = 1795;
const timelineEnd = currentYear;
const timelineSpan = timelineEnd - timelineStart;

export const NapoleonEpilogue = () => {
  return (
    <section id="napoleon-epilogue" className="relative py-32 px-6" style={{ background: MIDNIGHT }}>
      <div className="max-w-2xl mx-auto">

        {/* ═══ St. Helena Painting ═══ */}
        <RevealOnScroll>
          <div className="relative max-w-xl mx-auto mb-6 overflow-hidden rounded-lg">
            <img
              src="/images/napoleon-st-helena.avif"
              alt="Napoleon in exile on St. Helena"
              className="w-full object-cover"
              style={{ filter: 'brightness(0.85) contrast(1.1) saturate(0.85)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, hsla(225, 30%, 7%, 0.6) 100%)',
              }}
            />
          </div>
          <p
            className="text-center text-[9px] font-body tracking-wider italic mb-16"
            style={{ color: 'hsl(40, 20%, 40%)', opacity: 0.6 }}
          >
            St. Helena, South Atlantic — 1,870 km from the nearest land
          </p>
        </RevealOnScroll>

        {/* ═══ The Opening ═══ */}
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: SMOKE }}>
            Epilogue
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-4" style={{ color: PARCHMENT }}>
            The Emperor fell.
          </h2>
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-12" style={{ color: GOLD }}>
            The ideas didn't.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="font-body text-lg leading-relaxed text-center mb-20" style={{ color: SMOKE }}>
            Napoleon died on St. Helena in 1821, a prisoner of the British,
            on a rock in the middle of the Atlantic.
            But what he built — and what he broke — reshaped the world permanently.
          </p>
        </RevealOnScroll>

        {/* ═══ Legacy Timeline ═══ */}
        <RevealOnScroll delay={0.2}>
          <div className="mb-6">
            <p className="text-[9px] tracking-[0.3em] uppercase font-body text-center mb-2" style={{ color: SMOKE }}>
              What survived him
            </p>
            {/* Year markers */}
            <div className="flex justify-between px-1 mb-1">
              {[1800, 1850, 1900, 1950, 2000].map(y => (
                <span key={y} className="text-[8px] font-body" style={{ color: 'hsl(220, 12%, 30%)' }}>{y}</span>
              ))}
            </div>
            {/* Base timeline bar */}
            <div className="relative h-px w-full mb-8" style={{ background: 'hsl(220, 15%, 20%)' }}>
              {/* Tick marks */}
              {[1800, 1850, 1900, 1950, 2000].map(y => (
                <div
                  key={y}
                  className="absolute top-0 w-px h-2"
                  style={{ left: `${((y - timelineStart) / timelineSpan) * 100}%`, background: 'hsl(220, 15%, 25%)' }}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="space-y-5 mb-20">
          {LEGACY_TIMELINE.map((item, i) => {
            const startPct = ((item.year - timelineStart) / timelineSpan) * 100;

            return (
              <RevealOnScroll key={item.title} delay={0.08 * i}>
                <div className="flex items-start gap-4">
                  {/* Year */}
                  <span className="font-display text-sm font-bold shrink-0 w-10 text-right" style={{ color: GOLD, opacity: 0.7 }}>
                    {item.year}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-base font-bold" style={{ color: GOLD }}>
                        {item.title}
                      </h3>
                      <span className="text-[9px] font-body px-2 py-0.5 rounded" style={{
                        color: GOLD,
                        background: 'hsl(43, 30%, 15%)',
                        border: '1px solid hsl(43, 25%, 22%)',
                      }}>
                        {item.stat}
                      </span>
                    </div>

                    {/* Duration bar */}
                    <div className="relative h-1.5 rounded-full mb-2" style={{ background: 'hsl(225, 20%, 12%)' }}>
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          left: `${startPct}%`,
                          background: `linear-gradient(90deg, ${GOLD}40, ${GOLD}90)`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${100 - startPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                      {/* Pulsing "still active" dot at end */}
                      {item.still && (
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                          style={{ right: -1, background: GOLD }}
                          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      )}
                    </div>

                    <p className="font-body text-xs leading-relaxed" style={{ color: SMOKE }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* ═══ The Closing Number ═══ */}
        <RevealOnScroll>
          <div className="text-center mb-20 py-10" style={{ borderTop: '1px solid hsl(43, 25%, 18%)', borderBottom: '1px solid hsl(43, 25%, 18%)' }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-4" style={{ color: SMOKE }}>
              Two centuries later
            </p>
            <p className="font-display text-5xl md:text-7xl font-black" style={{ color: GOLD }}>
              70+ nations
            </p>
            <p className="font-body text-base mt-2" style={{ color: PARCHMENT, opacity: 0.7 }}>
              still live under his law code
            </p>
          </div>
        </RevealOnScroll>

        {/* ═══ The Quote ═══ */}
        <RevealOnScroll delay={0.3}>
          <p className="font-display text-xl md:text-2xl italic text-center leading-relaxed" style={{ color: PARCHMENT }}>
            "I closed the gulf of anarchy and brought order out of chaos.
            I rewarded merit regardless of birth. I governed for the greatest number."
          </p>
          <p className="text-center text-xs font-body mt-4 mb-16" style={{ color: SMOKE }}>
            — Napoleon, dictated at St. Helena
          </p>
        </RevealOnScroll>

        <EditionColophon essayId="napoleon" variant="dark" />
      </div>
    </section>
  );
};
