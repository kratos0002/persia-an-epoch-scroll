import React from 'react';
import { motion } from 'framer-motion';
import { LogEntry } from './LogEntry';
import { VOCSeal } from './VOCSeal';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';
import { NM } from './nutmegTheme';

// Crossed-out names for the massacre manifest
const NAMES = [
  'Abdul Wahid', 'Hasan al-Bandani', 'Suleiman', 'Ali Bandaneira',
  'Ibrahim', 'Yusuf', 'Ahmad', 'Kasim', 'Mustafa', 'Hamza',
  'Fatimah', 'Siti', 'Khalid', 'Omar', 'Zainab', 'Rashid',
];

export const MonopolySection = () => {
  return (
    <LogEntry
      id="dutch-monopoly"
      entryNumber="Entry IV"
      date="April 1621 — Banda Neira"
      coordinates="Position: 4°31′S, 129°54′E"
      stainIntensity={0.6}
    >
      {/* VOC seal — cracked */}
      <div className="flex justify-center mb-8">
        <VOCSeal size={90} color={NM.VERMILION} cracked />
      </div>

      <motion.h2
        className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-8 text-center"
        style={{ color: NM.INK }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The VOC wanted<br />
        <span style={{ color: NM.BLOOD }}>total control.</span>
      </motion.h2>

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        In 1621, Governor-General Jan Pieterszoon Coen sailed to the Banda Islands
        with a fleet of warships and a plan. The Bandanese had been trading with the English.
        Coen's solution was annihilation.
      </motion.p>

      <motion.p
        className="font-body text-lg leading-relaxed mb-10"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        In what became known as the <strong style={{ color: NM.BLOOD }}>Banda Massacre</strong>,
        the VOC killed, enslaved, or deported almost the entire native population.
        Of approximately 15,000 Bandanese, barely 1,000 survived.
      </motion.p>

      {/* Crossed-out crew manifest */}
      <motion.div
        className="my-12 rounded-sm overflow-hidden"
        style={{
          background: NM.CREAM_DARK,
          border: `1px solid ${NM.BLOOD}22`,
          boxShadow: `inset 0 0 40px ${NM.BLOOD}08`,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="px-6 py-4 text-center" style={{ borderBottom: `1px solid ${NM.BLOOD}18` }}>
          <p className="text-[9px] tracking-[0.4em] uppercase font-body" style={{ color: NM.SMOKE }}>
            Register of Bandanese Inhabitants
          </p>
          <p className="font-display text-sm italic mt-1" style={{ color: NM.BLOOD }}>
            ~~Struck from the record — April 1621~~
          </p>
        </div>

        <div className="px-6 py-4 grid grid-cols-2 gap-x-8 gap-y-1">
          {NAMES.map((name, i) => (
            <motion.div
              key={name}
              className="relative font-body text-sm py-1"
              style={{ color: NM.INK }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
            >
              {name}
              <motion.div
                className="absolute left-0 right-0 top-1/2 h-[1.5px]"
                style={{ background: NM.BLOOD }}
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <div className="px-6 py-4 text-center" style={{ borderTop: `1px solid ${NM.BLOOD}18` }}>
          <div className="flex items-center justify-center gap-6">
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: NM.SMOKE }}>Before</p>
              <p className="font-display text-3xl font-black" style={{ color: NM.INK }}>
                <AnimatedCounter end={15000} duration={2000} />
              </p>
            </div>
            <motion.span
              className="font-display text-2xl"
              style={{ color: NM.BLOOD }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
            >
              →
            </motion.span>
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase font-body mb-1" style={{ color: NM.SMOKE }}>After</p>
              <motion.p
                className="font-display text-3xl font-black"
                style={{ color: NM.BLOOD }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2 }}
              >
                ~1,000
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Frantic margin note */}
      <motion.div
        className="text-center my-8"
        initial={{ opacity: 0, rotate: -1 }}
        whileInView={{ opacity: 1, rotate: -1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="font-body text-sm italic" style={{ color: NM.BLOOD, opacity: 0.6 }}>
          "God forgive what was done here."
        </p>
      </motion.div>

      <motion.p
        className="font-body text-lg leading-relaxed mb-6"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The VOC then replaced them with Dutch planters and enslaved labourers,
        creating the world's first corporate plantation system. They controlled production,
        set prices, and burned entire warehouses of nutmeg to keep supply artificially low.
      </motion.p>

      <motion.p
        className="font-body text-lg leading-relaxed mb-8"
        style={{ color: NM.INK }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        For decades, the monopoly held. The VOC became the richest corporation in history —
        worth, in today's terms, roughly <strong style={{ color: NM.VERMILION }}>$7.9 trillion</strong>.
        More than Apple, Amazon, and Google combined.
      </motion.p>

      <motion.p
        className="font-display text-2xl md:text-3xl italic text-center"
        style={{ color: NM.TIMBER }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        "There was one island they couldn't take."
      </motion.p>
    </LogEntry>
  );
};
