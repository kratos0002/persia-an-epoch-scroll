import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { IB, BLACK_DEATH_CITIES } from '@/components/visuals/battutaMapData';
import { CompassRose } from './CompassRose';
import { RhumbLinesCSS } from './RhumbLineBackground';

/**
 * Black Death section — "The Great Mortality"
 *
 * Earlier version used a dark cochineal-stained background that broke the
 * essay's parchment palette. Rebuilt in parchment tone: gravity comes from
 * restraint, not contrast. The mourning accent is desaturated sepia-grey,
 * not red. The plague's body count is the headline; tally marks are gone.
 */

// Desaturated mourning accent — sepia-grey, not cochineal red
const MOURNING = 'hsl(20, 18%, 32%)';
const MOURNING_DIM = 'hsl(20, 14%, 48%)';

interface CityProps {
  city: string;
  dailyDead: number;
}

const PlagueCity: React.FC<{ data: CityProps; index: number }> = ({ data, index }) => (
  <motion.div
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {/* Eyebrow city name */}
    <p
      className="text-[10px] tracking-[0.32em] uppercase font-body font-semibold mb-3"
      style={{ color: MOURNING_DIM, opacity: 0.85 }}
    >
      {data.city}
    </p>

    {/* The number — the headline */}
    <span
      className="font-display font-bold leading-none battuta-gilt"
      style={{
        color: MOURNING,
        fontSize: 'clamp(40px, 5vw, 64px)',
        letterSpacing: '-0.018em',
      }}
    >
      {data.dailyDead.toLocaleString()}
    </span>

    {/* Unit */}
    <p
      className="font-body italic mt-1.5"
      style={{ color: IB.INK_LIGHT, opacity: 0.7, fontSize: 13 }}
    >
      deaths per day, at peak
    </p>
  </motion.div>
);

export const BlackDeathCounters = () => (
  <section
    id="battuta-plague-data"
    className="relative py-24 px-6 overflow-hidden battuta-vellum-grain battuta-foxing"
    style={{ background: IB.PARCHMENT }}
  >
    {/* Restrained sepia rhumb-lines background */}
    <RhumbLinesCSS color={MOURNING} opacity={0.025} position="50% 50%" />

    <div className="max-w-4xl mx-auto relative z-10">
      {/* Section header — same compass-rose flourish pattern as other sections */}
      <RevealOnScroll>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: MOURNING_DIM, opacity: 0.5 }} />
          <CompassRose size={20} color={MOURNING} opacity={0.55} />
          <div className="w-12 h-px" style={{ background: MOURNING_DIM, opacity: 0.5 }} />
        </div>
        <p
          className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center"
          style={{ color: MOURNING_DIM }}
        >
          الموت الأسود · The Great Mortality · 1348
        </p>
        <h3
          className="font-display text-4xl md:text-5xl font-bold text-center mb-5 battuta-gilt"
          style={{ color: IB.INK, letterSpacing: '-0.012em', lineHeight: 1.05 }}
        >
          The World He Returned To
        </h3>
        <p
          className="font-body italic text-center mx-auto"
          style={{
            color: IB.INK_LIGHT,
            opacity: 0.8,
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: 580,
          }}
        >
          The same trade routes that had carried him east now carried the Black Death west.
          By the time Ibn Battuta reached Cairo on his return, the Mamluk capital was a charnel house.
        </p>
      </RevealOnScroll>

      {/* The death numbers — clean stat row, not tally marks */}
      <RevealOnScroll delay={0.15}>
        <div className="mt-20">
          <p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold text-center mb-10"
            style={{ color: MOURNING_DIM, opacity: 0.85 }}
          >
            Peak daily death tolls, summer 1348
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {BLACK_DEATH_CITIES.map((city, i) => (
              <PlagueCity key={city.city} data={city} index={i} />
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Pull quote — Ibn Battuta's own words on what he saw */}
      <RevealOnScroll delay={0.3}>
        <div className="mt-24 mx-auto" style={{ maxWidth: 640 }}>
          <div className="flex items-center gap-3 mb-6 opacity-50">
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${MOURNING})` }} />
            <span style={{ color: MOURNING, fontSize: 14 }}>✦</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${MOURNING})` }} />
          </div>
          <blockquote
            className="font-display italic text-center"
            style={{
              color: IB.INK,
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              lineHeight: 1.45,
              letterSpacing: '-0.005em',
            }}
          >
            “I arrived at Cairo and was told that during the plague the number of deaths
            there had risen to twenty-one thousand a day. In Damascus they had appointed
            men to count the numbers of dead, and the count had reached two thousand four
            hundred a day.”
          </blockquote>
          <p
            className="font-body text-center mt-6"
            style={{ color: MOURNING_DIM, fontSize: 12, letterSpacing: '0.04em' }}
          >
            — Ibn Battuta, passing through plague-ravaged cities, 1348
          </p>
        </div>
      </RevealOnScroll>

      {/* Population loss bar removed — third stat block in a row. The
          quote above already lands the magnitude. */}
    </div>
  </section>
);
