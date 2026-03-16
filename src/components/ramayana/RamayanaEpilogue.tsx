import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';
import { RM } from '@/components/visuals/ramayanaMapData';

/* ── Decorative SVG elements — miniature painting style ── */
const LotusCorner = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none">
    {Array.from({ length: 8 }).map((_, i) => (
      <ellipse
        key={i}
        cx={24}
        cy={14}
        rx={5}
        ry={10}
        fill={RM.VERMILLION}
        fillOpacity={0.6}
        stroke={RM.GOLD_LEAF}
        strokeWidth={0.5}
        transform={`rotate(${i * 45} 24 24)`}
      />
    ))}
    <circle cx={24} cy={24} r={4} fill={RM.GOLD_LEAF} />
  </svg>
);

const VineDivider = () => (
  <svg className="w-full" height="20" viewBox="0 0 600 20" preserveAspectRatio="xMidYMid meet" fill="none">
    <path
      d="M 100 10 Q 150 0 200 10 Q 250 20 300 10 Q 350 0 400 10 Q 450 20 500 10"
      stroke={RM.GOLD_LEAF}
      strokeWidth={1}
      opacity={0.5}
    />
    <circle cx={300} cy={10} r={3} fill={RM.VERMILLION} opacity={0.6} />
    <circle cx={200} cy={10} r={2} fill={RM.GOLD_LEAF} opacity={0.4} />
    <circle cx={400} cy={10} r={2} fill={RM.GOLD_LEAF} opacity={0.4} />
  </svg>
);

export const RamayanaEpilogue = () => {
  return (
    <section id="ramayana-epilogue" className="relative overflow-hidden" style={{ background: RM.PARCHMENT }}>
      {/* Paper grain */}
      <div className="absolute inset-0 ramayana-paper-grain pointer-events-none" />

      {/* ── Full-width manuscript border frame ── */}
      <div className="relative mx-6 my-0">
        {/* Outer gold + vermillion border */}
        <div
          className="relative"
          style={{
            border: `3px solid ${RM.GOLD_LEAF}`,
            boxShadow: `inset 0 0 0 5px ${RM.PARCHMENT}, inset 0 0 0 6.5px ${RM.VERMILLION}50, 0 4px 24px rgba(0,0,0,0.08)`,
            borderRadius: 3,
          }}
        >
          {/* Corner lotus rosettes */}
          <div className="absolute -top-6 -left-6 z-10"><LotusCorner /></div>
          <div className="absolute -top-6 -right-6 z-10"><LotusCorner /></div>
          <div className="absolute -bottom-6 -left-6 z-10"><LotusCorner /></div>
          <div className="absolute -bottom-6 -right-6 z-10"><LotusCorner /></div>

          {/* Inner content area with deep parchment */}
          <div className="py-24 px-8 md:px-16" style={{ background: 'hsl(35, 40%, 82%)' }}>

            {/* ── Opening title ── */}
            <div className="max-w-2xl mx-auto text-center mb-16">
              <RevealOnScroll>
                <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6" style={{ color: RM.VERMILLION }}>
                  उपसंहार · Epilogue
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: RM.INK }}>
                  The Story That Traveled
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.15}>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-10" style={{ color: RM.VERMILLION }}>
                  Further Than Rama.
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.25}>
                <VineDivider />
              </RevealOnScroll>
            </div>

            {/* ── Three stats in miniature painting frames ── */}
            <RevealOnScroll delay={0.2}>
              <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
                {[
                  { number: '2,500', unit: 'km', label: 'walked on foot' },
                  { number: '14', unit: 'years', label: 'in exile' },
                  { number: '21', unit: 'stops', label: 'every one a real place' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.unit}
                    className="text-center py-8 px-4 relative"
                    style={{
                      border: `2px solid ${RM.GOLD_LEAF}`,
                      boxShadow: `inset 0 0 0 1px ${RM.VERMILLION}30`,
                      background: `linear-gradient(180deg, hsla(38, 45%, 88%, 0.8), hsla(35, 40%, 82%, 0.6))`,
                      borderRadius: 2,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 * i }}
                  >
                    <div className="flex items-baseline justify-center gap-1.5 mb-2">
                      <span className="font-display text-4xl md:text-5xl font-bold" style={{ color: RM.VERMILLION }}>
                        {stat.number}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-body font-semibold" style={{ color: RM.GOLD_DIM }}>
                        {stat.unit}
                      </span>
                    </div>
                    <p className="font-body text-xs" style={{ color: RM.BURNT_UMBER }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>

            {/* ── Body prose ── */}
            <div className="max-w-2xl mx-auto">
              <RevealOnScroll delay={0.2}>
                <p className="font-body text-base leading-[1.9] mb-6 text-center" style={{ color: RM.INK }}>
                  The route you just traced is remembered differently in every region it passes through.
                  In Thailand, it is the <em>Ramakien</em>. In Indonesia, the <em>Kakawin Ramayana</em>.
                  In Cambodia, it adorns the walls of Angkor Wat. In Japan, fragments survive in Buddhist texts.
                  The story crossed every ocean the prince never did.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <p className="font-body text-base leading-[1.9] mb-6 text-center" style={{ color: RM.INK }}>
                  The geography matters because the story is not abstract. It is tied to rivers you can visit,
                  mountains you can climb, and a bridge whose remains you can see from space. Most of the
                  twenty-one stops still have temples. Some have been worshipped at for two thousand years
                  without interruption.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.35}>
                <p className="font-body text-base leading-[1.9] mb-12 text-center" style={{ color: RM.INK }}>
                  A prince walked south because his father gave his word. A wife was taken.
                  A war was fought. A bridge was built by an army of those who had nothing to gain.
                  And the story was told so many times, in so many languages, that it stopped being
                  one story and became the structure of stories itself.
                </p>
              </RevealOnScroll>

              {/* ── Closing quote — vermillion rubric band ── */}
              <RevealOnScroll delay={0.4}>
                <div className="relative my-12">
                  <VineDivider />
                  <div
                    className="my-8 py-8 px-6 text-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${RM.VERMILLION}, hsl(8, 70%, 38%))`,
                      boxShadow: `0 4px 24px hsla(8,78%,48%,0.25), inset 0 0 0 1px ${RM.GOLD_LEAF}40`,
                    }}
                  >
                    {/* Gold inner border */}
                    <div className="absolute inset-[3px]" style={{ border: `1px solid ${RM.GOLD_LEAF}50` }} />
                    <p className="font-display text-xl md:text-2xl italic leading-relaxed relative z-10" style={{ color: RM.PARCHMENT }}>
                      "As long as mountains stand and rivers flow upon the earth,<br />
                      so long will the story of the Ramayana be told among men."
                    </p>
                  </div>
                  <p className="text-center text-xs font-body mt-4" style={{ color: RM.GOLD_DIM }}>
                    — Valmiki, <em>Bala Kanda</em> 1.2.35
                  </p>
                  <div className="mt-8">
                    <VineDivider />
                  </div>
                </div>
              </RevealOnScroll>

              {/* ── Part 2 teaser — manuscript folio card ── */}
              <RevealOnScroll delay={0.5}>
                <div
                  className="p-10 text-center relative"
                  style={{
                    border: `3px solid ${RM.GOLD_LEAF}`,
                    boxShadow: `inset 0 0 0 4px ${RM.PARCHMENT}, inset 0 0 0 5.5px ${RM.VERMILLION}50, 0 4px 20px rgba(0,0,0,0.08)`,
                    background: RM.PARCHMENT,
                    borderRadius: 3,
                  }}
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-4" style={{ color: RM.MALACHITE }}>
                    ☞ Coming Next
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-3" style={{ color: RM.INK }}>
                    Part 2 — The Tellings
                  </h3>
                  <p className="font-body text-sm leading-relaxed mb-6" style={{ color: RM.BURNT_UMBER }}>
                    How one story crossed oceans and became a thousand traditions.
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="w-8 h-px" style={{ background: RM.GOLD_LEAF }} />
                    {['Thailand', 'Indonesia', 'Cambodia', 'Japan', 'Tibet'].map((country, i) => (
                      <React.Fragment key={country}>
                        <span className="text-[9px] tracking-[0.15em] uppercase font-body" style={{ color: RM.OCHRE }}>
                          {country}
                        </span>
                        {i < 4 && <span style={{ color: RM.GOLD_LEAF, fontSize: 8 }}>·</span>}
                      </React.Fragment>
                    ))}
                    <div className="w-8 h-px" style={{ background: RM.GOLD_LEAF }} />
                  </div>
                </div>
              </RevealOnScroll>

              <div className="mt-16">
                <EditionColophon essayId="ramayana" variant="light" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16" style={{ background: RM.PARCHMENT }} />
    </section>
  );
};
