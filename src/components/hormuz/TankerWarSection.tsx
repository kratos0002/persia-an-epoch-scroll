import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { TANKER_WAR_EVENTS } from '@/components/visuals/hormuzMapData';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const RED = 'hsl(0, 65%, 50%)';

export const TankerWarSection = () => {
  return (
    <section id="tanker-war" className="relative min-h-screen py-32 px-6" style={{ background: NAVY }}>
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6 text-center" style={{ color: RED }}>
            1984–1988 — The Tanker War
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center" style={{ color: PARCHMENT }}>
            The strait<br />
            <span style={{ color: RED }}>caught fire.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="font-body text-lg leading-relaxed mb-6" style={{ color: SMOKE }}>
            During the Iran-Iraq War, both sides attacked oil tankers in the Gulf.
            Iraq hit Iranian oil exports to choke their economy.
            Iran retaliated by attacking ships carrying Iraqi oil from Kuwait and Saudi Arabia.
            Over <strong style={{ color: RED }}>546 ships</strong> were attacked between 1981 and 1988.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <p className="font-body text-lg leading-relaxed mb-10" style={{ color: SMOKE }}>
            The world couldn't afford to lose the strait. The US Navy launched{' '}
            <strong style={{ color: PARCHMENT }}>Operation Earnest Will</strong> — reflagging
            Kuwaiti tankers with American flags so that any attack on them would be an attack
            on the United States.
          </p>
        </RevealOnScroll>

        {/* Tanker War timeline */}
        <RevealOnScroll delay={0.6}>
          <div className="my-12 py-8 rounded-xl" style={{
            background: 'hsl(215, 40%, 6%)',
            border: '1px solid hsla(0, 65%, 50%, 0.15)',
          }}>
            <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: SMOKE }}>
              Key Incidents
            </p>
            <div className="flex flex-col gap-4 px-6">
              {TANKER_WAR_EVENTS.map((event, i) => (
                <motion.div
                  key={i}
                  className="relative pl-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.12 }}
                >
                  {/* Timeline line */}
                  {i < TANKER_WAR_EVENTS.length - 1 && (
                    <div className="absolute left-[11px] top-6 w-px h-full" style={{ background: 'hsla(0, 65%, 50%, 0.2)' }} />
                  )}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'hsla(0, 65%, 50%, 0.15)', border: `1px solid ${RED}` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: RED }} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-display text-sm font-bold" style={{ color: RED }}>{event.year}</span>
                      <span className="font-body text-sm font-semibold" style={{ color: PARCHMENT }}>{event.label}</span>
                    </div>
                    <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>{event.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="font-body text-lg leading-relaxed mb-8" style={{ color: SMOKE }}>
            The Tanker War ended with the Iran-Iraq ceasefire in 1988. But it proved
            a permanent truth: the Strait of Hormuz isn't just a geographical feature —
            it's a <strong style={{ color: RED }}>trigger point</strong> for global conflict.
            Any disruption here sends shockwaves through every economy on Earth.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.9}>
          <p className="font-display text-2xl md:text-3xl italic text-center" style={{ color: TEAL }}>
            "The strait doesn't just carry oil. It carries the world economy."
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
