import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { EditionColophon } from '@/components/scroll/EditionColophon';
import { IB } from '@/components/visuals/battutaMapData';
import { PortolanCompassRose } from './PortolanCompassRose';
import { CompassRose } from './CompassRose';
import { RhumbLinesCSS } from './RhumbLineBackground';
import { Verdict } from '@/components/visuals/Verdict';

const SaffronDivider = () => (
  <svg className="w-full max-w-xs mx-auto" height="16" viewBox="0 0 300 16" preserveAspectRatio="xMidYMid meet" fill="none">
    <line x1="0" y1="8" x2="120" y2="8" stroke={IB.SAFFRON} strokeWidth={0.5} opacity={0.4} />
    <line x1="180" y1="8" x2="300" y2="8" stroke={IB.SAFFRON} strokeWidth={0.5} opacity={0.4} />
    <polygon points="150,2 158,8 150,14 142,8" fill="none" stroke={IB.SAFFRON} strokeWidth={1} opacity={0.5} />
    <circle cx={150} cy={8} r={2} fill={IB.SAFFRON} opacity={0.4} />
  </svg>
);

/**
 * Epilogue — "The Final Folio"
 * Atlas closing page with gilded cartouche stats, leather-bound quote panel,
 * stitching lines, and a medieval colophon.
 */
export const BattutaEpilogue = () => (
  <section id="battuta-epilogue" className="relative overflow-hidden" style={{ background: IB.PARCHMENT }}>
    <div className="relative mx-3 md:mx-6 my-0">
      {/* Outer leather binding frame */}
      <div className="relative" style={{
        border: `4px solid ${IB.LEATHER}`,
        boxShadow: `inset 0 0 0 3px ${IB.PARCHMENT}, inset 0 0 0 5px ${IB.SAFFRON}50, 0 8px 40px rgba(0,0,0,0.12)`,
        borderRadius: 3,
      }}>
        {/* Stitching lines on the binding */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-4 right-4 h-px" style={{ background: `repeating-linear-gradient(90deg, ${IB.SAFFRON}40 0 4px, transparent 4px 8px)` }} />
          <div className="absolute bottom-0 left-4 right-4 h-px" style={{ background: `repeating-linear-gradient(90deg, ${IB.SAFFRON}40 0 4px, transparent 4px 8px)` }} />
          <div className="absolute top-4 bottom-4 left-0 w-px" style={{ background: `repeating-linear-gradient(180deg, ${IB.SAFFRON}40 0 4px, transparent 4px 8px)` }} />
          <div className="absolute top-4 bottom-4 right-0 w-px" style={{ background: `repeating-linear-gradient(180deg, ${IB.SAFFRON}40 0 4px, transparent 4px 8px)` }} />
        </div>

        {/* Corner compass roses */}
        <div className="absolute -top-5 -left-5 z-10"><CompassRose size={40} color={IB.SAFFRON} opacity={0.5} /></div>
        <div className="absolute -top-5 -right-5 z-10"><CompassRose size={40} color={IB.SAFFRON} opacity={0.5} /></div>
        <div className="absolute -bottom-5 -left-5 z-10"><CompassRose size={40} color={IB.SAFFRON} opacity={0.5} /></div>
        <div className="absolute -bottom-5 -right-5 z-10"><CompassRose size={40} color={IB.SAFFRON} opacity={0.5} /></div>

        <div className="relative py-24 px-8 md:px-16 battuta-vellum-grain battuta-foxing" style={{ background: IB.PARCHMENT_DK }}>
          {/* Faint rhumb lines */}
          <RhumbLinesCSS color={IB.SAFFRON} opacity={0.02} position="50% 30%" />

          {/* Title */}
          <div className="max-w-2xl mx-auto text-center mb-16 relative z-10">
            <RevealOnScroll>
              <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6" style={{ color: IB.HENNA }}>
                خاتمة · Epilogue
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 battuta-gilt" style={{ color: IB.INK }}>
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

          {/* Stats cartouches removed — they duplicated the JourneyOverview
              reflection's stat row. The Epilogue should be verdict + voice,
              not another scoreboard. The 10+ marriages detail (the only new
              stat) is woven into the body prose below. */}

          {/* Body — single paragraph. The "scholarship has rehabilitated him"
              second paragraph was cut: it's academic prose that slows the
              close. The verdict carries the meaning more than the meta-history. */}
          <div className="max-w-2xl mx-auto relative z-10 mt-8">
            <RevealOnScroll delay={0.15}>
              <p className="font-body text-base leading-[1.9] mb-6 text-center" style={{ color: IB.INK }}>
                Polo reported on lands that were fundamentally alien to Europe;
                Ibn Battuta reported on a world that was already integrated — a world
                the West would not fully encounter until the colonial era. He married
                more than ten times across three continents, served as qadi from the
                Maldives to Delhi, and watched his own mother die of plague upon
                returning home.
              </p>
            </RevealOnScroll>

            {/* Verdict — full-bleed typography moment that lands the thesis */}
            <Verdict
              eyebrow="The Verdict"
              setup="Before steam. Before maps. Before nations."
              text="He saw the world whole."
              attribution="29 years · 117,000 km · 44 modern nations"
              accentColor={IB.SAFFRON}
              inkColor={IB.INK}
              fontSize={72}
              paddingY={96}
            />

            {/* Closing quote — leather-bound panel with stitching */}
            <RevealOnScroll delay={0.3}>
              <div className="relative my-12">
                <SaffronDivider />
                <div className="my-8 py-8 px-6 md:px-10 text-center relative" style={{
                  background: `linear-gradient(135deg, ${IB.LEATHER}, ${IB.LEATHER_MID})`,
                  boxShadow: `0 4px 24px hsla(25,45%,22%,0.3), inset 0 0 0 1px ${IB.SAFFRON}40`,
                }}>
                  {/* Stitching border */}
                  <div className="absolute inset-[6px]" style={{
                    border: `1px dashed ${IB.SAFFRON}30`,
                  }} />
                  <div className="absolute inset-[3px]" style={{ border: `1px solid ${IB.SAFFRON}20` }} />

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

            {/* Medieval colophon */}
            <RevealOnScroll delay={0.35}>
              <div className="text-center mt-12 mb-8 py-6 px-8" style={{
                border: `1px solid ${IB.SAFFRON}30`,
                background: `${IB.PARCHMENT}80`,
              }}>
                <p className="font-body text-xs italic leading-relaxed" style={{ color: IB.INK_LIGHT }}>
                  Dictated by the traveller Abu Abdullah Muhammad ibn Abdullah ibn Muhammad ibn Ibrahim al-Lawati al-Tanji,
                  known as Ibn Battuta, to the scribe Muhammad ibn Juzayy al-Kalbi,
                  in the court of Sultan Abu Inan Faris, in the city of Fez, in the year 755 AH (1355 CE).
                </p>
                <p className="font-body text-[10px] mt-3" style={{ color: IB.SAFFRON_DIM }}>
                  تحفة النظار في غرائب الأمصار وعجائب الأسفار
                </p>
              </div>
            </RevealOnScroll>

            <div className="mt-8">
              <EditionColophon essayId="battuta" variant="light" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="h-16" style={{ background: IB.PARCHMENT }} />
  </section>
);
