import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { TANKER_WAR_EVENTS } from '@/components/visuals/hormuzMapData';

const NAVY = 'hsl(215, 45%, 8%)';
const TEAL = 'hsl(195, 55%, 35%)';
const AMBER = 'hsl(35, 80%, 50%)';
const PARCHMENT = 'hsl(40, 35%, 88%)';
const SMOKE = 'hsl(210, 15%, 40%)';
const RED = 'hsl(0, 65%, 50%)';

/* Full-bleed visual: burning tanker silhouette */
const TankerFireVisual = ({ intensity }: { intensity: number }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <svg viewBox="0 0 800 400" className="w-full max-w-4xl px-8" fill="none" preserveAspectRatio="xMidYMid meet">
      {/* Water */}
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={i}
          d={`M0 ${280 + i * 14} Q200 ${270 + i * 14} 400 ${280 + i * 14} Q600 ${290 + i * 14} 800 ${280 + i * 14}`}
          stroke={TEAL}
          strokeWidth="0.5"
          opacity={0.06 + i * 0.01}
        />
      ))}

      {/* Tanker hull */}
      <path d="M150 240 L150 260 Q400 290 650 260 L650 240 Q400 220 150 240Z" fill="hsl(0, 0%, 10%)" stroke="hsl(0, 0%, 20%)" strokeWidth="0.5" />
      {/* Superstructure */}
      <rect x="550" y="195" width="80" height="45" rx="2" fill="hsl(0, 0%, 12%)" stroke="hsl(0, 0%, 20%)" strokeWidth="0.5" />
      <rect x="565" y="175" width="15" height="20" fill="hsl(0, 0%, 15%)" />

      {/* Fire / explosion glow */}
      <motion.ellipse
        cx="350" cy="200"
        rx={80 + intensity * 40}
        ry={50 + intensity * 30}
        fill={RED}
        opacity={0.03 + intensity * 0.08}
        animate={{ rx: [80 + intensity * 40, 90 + intensity * 40, 80 + intensity * 40] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.ellipse
        cx="350" cy="190"
        rx={40 + intensity * 25}
        ry={25 + intensity * 20}
        fill={AMBER}
        opacity={0.02 + intensity * 0.06}
        animate={{ ry: [25 + intensity * 20, 35 + intensity * 20, 25 + intensity * 20] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />

      {/* Smoke columns */}
      {intensity > 0.3 && [...Array(3)].map((_, i) => (
        <motion.circle
          key={i}
          cx={320 + i * 30}
          r={8 + intensity * 6}
          fill="hsl(0, 0%, 20%)"
          opacity={0.1 + intensity * 0.1}
          animate={{ cy: [180, 100, 50], opacity: [0.15, 0.08, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}
    </svg>
  </div>
);

export const TankerWarSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [fireIntensity, setFireIntensity] = useState(0);
  const [activeEvent, setActiveEvent] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setFireIntensity(Math.min(v * 2, 1));
      const eventIdx = Math.floor(v * TANKER_WAR_EVENTS.length) - 1;
      setActiveEvent(Math.min(eventIdx, TANKER_WAR_EVENTS.length - 1));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section id="tanker-war" ref={sectionRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: NAVY }}>
        <TankerFireVisual intensity={fireIntensity} />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, hsla(215, 45%, 8%, 0.5) 100%)' }} />
      </div>

      <div className="relative z-10" style={{ marginTop: '-500vh' }}>
        {/* Card 1 — Left intro */}
        <div className="h-screen flex items-center px-8 md:px-16">
          <motion.div
            className="max-w-sm p-6 rounded-xl backdrop-blur-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(0, 65%, 50%, 0.15)` }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: RED }}>
              1984–1988 — The Tanker War
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black leading-[0.95] mb-4" style={{ color: PARCHMENT }}>
              The strait <span style={{ color: RED }}>caught fire.</span>
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>
              During the Iran-Iraq War, both sides attacked oil tankers.
              Over <strong style={{ color: RED }}>546 ships</strong> were hit between 1981 and 1988.
            </p>
          </motion.div>
        </div>

        {/* Cards 2–4: Timeline events, alternating */}
        {TANKER_WAR_EVENTS.slice(0, 3).map((event, i) => (
          <div key={i} className={`h-screen flex items-center ${i % 2 === 0 ? 'justify-end' : ''} px-8 md:px-16`}>
            <motion.div
              className="max-w-sm p-6 rounded-xl backdrop-blur-md"
              style={{ background: 'hsla(215, 45%, 8%, 0.8)', border: `1px solid hsla(0, 65%, 50%, 0.12)` }}
              initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: RED, boxShadow: `0 0 10px ${RED}44` }} />
                <span className="font-display text-lg font-bold" style={{ color: RED }}>{event.year}</span>
                <span className="font-body text-sm font-semibold" style={{ color: PARCHMENT }}>{event.label}</span>
              </div>
              <p className="font-body text-sm leading-relaxed" style={{ color: SMOKE }}>{event.detail}</p>
            </motion.div>
          </div>
        ))}

        {/* Card 5 — Final events + conclusion */}
        <div className="h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-md p-8 rounded-xl backdrop-blur-md"
            style={{ background: 'hsla(215, 45%, 8%, 0.85)', border: `1px solid hsla(0, 65%, 50%, 0.1)` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8 }}
          >
            {TANKER_WAR_EVENTS.slice(3).map((event, i) => (
              <div key={i} className="mb-4 last:mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: RED }} />
                  <span className="font-display text-sm font-bold" style={{ color: RED }}>{event.year}</span>
                  <span className="font-body text-xs font-semibold" style={{ color: PARCHMENT }}>{event.label}</span>
                </div>
                <p className="font-body text-xs leading-relaxed pl-4" style={{ color: SMOKE }}>{event.detail}</p>
              </div>
            ))}
            <div className="pt-4" style={{ borderTop: `1px solid hsla(195, 55%, 35%, 0.15)` }}>
              <p className="font-display text-lg italic text-center" style={{ color: TEAL }}>
                "The strait doesn't just carry oil. It carries the world economy."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
