import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { IB, BLACK_DEATH_CITIES } from '@/components/visuals/battutaMapData';
import { PlagueSpreadMap, InkTallyMarks } from './PlagueSpreadMap';
import { RhumbLinesCSS } from './RhumbLineBackground';
import { CompassRose } from './CompassRose';

/**
 * Black Death section — "The Cochineal Page"
 * Tonal break with cochineal-stained vellum, ink tally marks, and plague spread map.
 */
export const BlackDeathCounters = () => (
  <section id="battuta-plague-data" className="relative py-24 px-6 overflow-hidden battuta-cochineal-bg">
    {/* Vellum grain on dark */}
    <div className="absolute inset-0 battuta-vellum-grain opacity-50" />
    {/* Rhumb lines in cochineal */}
    <RhumbLinesCSS color="hsl(350, 55%, 45%)" opacity={0.025} position="50% 50%" />
    {/* Foxing spots */}
    <div className="absolute inset-0 battuta-foxing opacity-40" />

    <div className="max-w-3xl mx-auto relative z-10">
      <RevealOnScroll>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: 'hsl(350, 55%, 50%)' }} />
          <CompassRose size={20} color="hsl(350, 55%, 50%)" opacity={0.5} />
          <div className="w-12 h-px" style={{ background: 'hsl(350, 55%, 50%)' }} />
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center"
          style={{ color: 'hsl(350, 55%, 60%)' }}>
          الموت الأسود · The Great Mortality · 1348
        </p>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ color: 'hsl(38, 35%, 85%)' }}>
          The Cochineal Page
        </h3>
        <p className="font-body text-sm text-center max-w-lg mx-auto mb-12"
          style={{ color: 'hsl(38, 35%, 70%)' }}>
          Ibn Battuta returned home through a world being devoured by plague — the same trade routes
          that had carried him east now carried the Black Death west.
        </p>
      </RevealOnScroll>

      {/* Plague spread map */}
      <RevealOnScroll delay={0.1}>
        <PlagueSpreadMap />
      </RevealOnScroll>

      {/* Tally mark counters */}
      <RevealOnScroll delay={0.2}>
        <p className="text-[9px] tracking-[0.3em] uppercase font-body font-semibold text-center mt-16 mb-8"
          style={{ color: 'hsl(350, 55%, 55%)' }}>
          Peak Daily Death Tolls
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {BLACK_DEATH_CITIES.map((city, i) => (
            <InkTallyMarks
              key={city.city}
              count={Math.min(city.dailyDead, 40)} // cap visual tallies
              label={`${city.city} — ${city.dailyDead.toLocaleString()}/day`}
            />
          ))}
        </div>
      </RevealOnScroll>

      {/* Marginalia — Ibn Battuta's plague observations */}
      <RevealOnScroll delay={0.3}>
        <div className="mt-16 max-w-lg mx-auto">
          <div className="pl-6" style={{ borderLeft: `2px solid hsl(350, 55%, 40%)` }}>
            <p className="font-body text-sm italic leading-[1.9]" style={{ color: 'hsl(38, 35%, 75%)' }}>
              "I arrived at Cairo and was told that during the plague the number of deaths there had risen
              to twenty-one thousand a day... In Damascus they had appointed men to count the numbers of dead,
              and the count had reached two thousand four hundred a day."
            </p>
            <p className="font-body text-xs mt-3" style={{ color: 'hsl(350, 55%, 55%)' }}>
              — Ibn Battuta, passing through plague-ravaged cities, 1348
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Population shrink bar */}
      <RevealOnScroll delay={0.4}>
        <div className="mt-12 max-w-md mx-auto">
          <p className="font-body text-[9px] uppercase tracking-[0.25em] text-center mb-3"
            style={{ color: 'hsl(38, 35%, 60%)' }}>
            Estimated Population of the Islamic World
          </p>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs" style={{ color: 'hsl(38, 35%, 70%)' }}>Before</span>
            <div className="flex-1 h-5 relative" style={{ background: 'hsl(25, 30%, 25%)', borderRadius: 2 }}>
              <motion.div className="h-full" style={{ background: 'hsl(350, 55%, 40%)', borderRadius: 2 }}
                initial={{ width: '100%' }}
                whileInView={{ width: '65%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </div>
            <span className="font-body text-xs" style={{ color: 'hsl(350, 55%, 55%)' }}>−30–40%</span>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);
