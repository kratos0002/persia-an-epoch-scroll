import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';
import { IB } from '@/components/visuals/battutaMapData';
import { CompassRose } from './CompassRose';
import { RihlaQuote } from './RihlaQuote';

const SaffronDivider = () => (
  <svg className="w-full max-w-xs mx-auto" height="16" viewBox="0 0 300 16" preserveAspectRatio="xMidYMid meet" fill="none">
    <line x1="0" y1="8" x2="120" y2="8" stroke={IB.SAFFRON} strokeWidth={0.5} opacity={0.4} />
    <line x1="180" y1="8" x2="300" y2="8" stroke={IB.SAFFRON} strokeWidth={0.5} opacity={0.4} />
    <polygon points="150,2 158,8 150,14 142,8" fill="none" stroke={IB.SAFFRON} strokeWidth={1} opacity={0.5} />
    <circle cx={150} cy={8} r={2} fill={IB.SAFFRON} opacity={0.4} />
  </svg>
);

export const BattutaEpilogue = () => (
  <section id="battuta-epilogue" className="relative overflow-hidden" style={{ background: IB.PARCHMENT }}>
    <div className="relative mx-6 my-0">
      {/* Outer saffron border */}
      <div className="relative" style={{
        border: `3px solid ${IB.SAFFRON}`,
        boxShadow: `inset 0 0 0 5px ${IB.PARCHMENT}, inset 0 0 0 6.5px ${IB.HENNA}50, 0 4px 24px rgba(0,0,0,0.08)`,
        borderRadius: 3,
      }}>
        {/* Corner compass roses */}
        <div className="absolute -top-5 -left-5 z-10"><CompassRose size={40} color={IB.SAFFRON} opacity={0.5} /></div>
        <div className="absolute -top-5 -right-5 z-10"><CompassRose size={40} color={IB.SAFFRON} opacity={0.5} /></div>
        <div className="absolute -bottom-5 -left-5 z-10"><CompassRose size={40} color={IB.SAFFRON} opacity={0.5} /></div>
        <div className="absolute -bottom-5 -right-5 z-10"><CompassRose size={40} color={IB.SAFFRON} opacity={0.5} /></div>

        <div className="py-24 px-8 md:px-16" style={{ background: IB.PARCHMENT_DK }}>
          {/* Title */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <RevealOnScroll>
              <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6" style={{ color: IB.HENNA }}>
                خاتمة · Epilogue
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: IB.INK }}>
                The Man Who Walked
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-10" style={{ color: IB.HENNA }}>
                the World.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}><SaffronDivider /></RevealOnScroll>
          </div>

          {/* Stats */}
          <RevealOnScroll delay={0.2}>
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
              {[
                { number: '117,000', unit: 'km', label: 'traveled over 29 years' },
                { number: '44', unit: 'nations', label: 'in modern terms' },
                { number: '10+', unit: 'marriages', label: 'across three continents' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.unit}
                  className="text-center py-8 px-4 relative"
                  style={{
                    border: `2px solid ${IB.SAFFRON}`,
                    boxShadow: `inset 0 0 0 1px ${IB.HENNA}30`,
                    background: `linear-gradient(180deg, hsla(38, 35%, 88%, 0.8), hsla(34, 30%, 78%, 0.6))`,
                    borderRadius: 2,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 * i }}
                >
                  <div className="flex items-baseline justify-center gap-1.5 mb-2">
                    <span className="font-display text-4xl md:text-5xl font-bold" style={{ color: IB.HENNA }}>{stat.number}</span>
                    <span className="text-[9px] uppercase tracking-wider font-body font-semibold" style={{ color: IB.SAFFRON_DIM }}>{stat.unit}</span>
                  </div>
                  <p className="font-body text-xs" style={{ color: IB.INK_LIGHT }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Body */}
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll delay={0.2}>
              <p className="font-body text-base leading-[1.9] mb-6 text-center" style={{ color: IB.INK }}>
                The relative obscurity of Ibn Battuta in the Western canon compared to Marco Polo is often attributed
                to a Eurocentric lens. While Polo reported on lands that were fundamentally alien to Europe, Ibn Battuta
                reported on a world that was already integrated — a world the West would not fully encounter until the colonial era.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.25}>
              <p className="font-body text-base leading-[1.9] mb-6 text-center" style={{ color: IB.INK }}>
                In recent decades, scholarship has rehabilitated his reputation as a "world-minded" thinker whose
                narrative offers a counter-point to the traditional Western "Age of Discovery." He is now recognized as a
                precursor to global historians, providing the first eyewitness accounts of the political and social geography
                of the medieval tropics and the inner reaches of Asia.
              </p>
            </RevealOnScroll>

            {/* Closing quote */}
            <RevealOnScroll delay={0.3}>
              <div className="relative my-12">
                <SaffronDivider />
                <div className="my-8 py-8 px-6 text-center relative" style={{
                  background: `linear-gradient(135deg, ${IB.LEATHER}, ${IB.LEATHER_MID})`,
                  boxShadow: `0 4px 24px hsla(25,45%,22%,0.3), inset 0 0 0 1px ${IB.SAFFRON}40`,
                }}>
                  <div className="absolute inset-[3px]" style={{ border: `1px solid ${IB.SAFFRON}50` }} />
                  <p className="font-display text-xl md:text-2xl italic leading-relaxed relative z-10" style={{ color: IB.PARCHMENT }}>
                    "I set out alone, having neither a fellow-traveller in whose companionship I might find cheer,
                    nor caravan whose part I might join, but swayed by an overmastering impulse within me and a desire
                    long-cherished in my bosom to visit these illustrious sanctuaries."
                  </p>
                </div>
                <p className="text-center text-xs font-body mt-4" style={{ color: IB.SAFFRON_DIM }}>
                  — Ibn Battuta, <em>The Rihla</em>, on his departure from Tangier, 1325
                </p>
                <div className="mt-8"><SaffronDivider /></div>
              </div>
            </RevealOnScroll>

            <div className="mt-16">
              <EditionColophon essayId="battuta" variant="light" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="h-16" style={{ background: IB.PARCHMENT }} />
  </section>
);
