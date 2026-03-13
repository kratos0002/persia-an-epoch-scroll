import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { RedactedDossier } from '@/components/visuals/RedactedDossier';

const SHADOW = 'hsl(220, 15%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const ShadowSection = () => {
  return (
    <section id="shadow" className="relative min-h-[120vh] py-32 px-6" style={{ background: 'hsl(220, 18%, 7%)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: SHADOW }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Undeclared · ≈1966
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            The <span style={{ color: SHADOW }}>Shadow</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Israel
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Israel has never confirmed or denied possessing nuclear weapons. It has never conducted a confirmed nuclear test. It has never signed the Nuclear Non-Proliferation Treaty. And yet it is universally believed to possess between 80 and 90 nuclear warheads, making it one of the world's most significant nuclear powers.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The program began in the late 1950s with French assistance. France helped Israel build the Dimona reactor in the Negev desert — a facility Israel insisted was a "textile plant." The Americans suspected the truth from the beginning but chose not to press the issue.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              By 1966 or 1967, most intelligence assessments concluded that Israel had assembled its first nuclear device. During the 1973 Yom Kippur War, when Egyptian and Syrian armies were advancing on two fronts and Israel's survival seemed genuinely threatened, Defense Minister Moshe Dayan reportedly ordered nuclear warheads to be armed and loaded onto Jericho missiles.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              In 1986, Mordechai Vanunu, a former technician at Dimona, provided photographs and technical details to the British press, confirming what everyone suspected. He was subsequently kidnapped by Mossad in Rome and imprisoned for eighteen years.
            </p>
          </RevealOnScroll>
        </div>

        {/* Redacted Dossier Visual */}
        <RedactedDossier />

        <div className="max-w-xl mx-auto">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Israel's policy of "nuclear ambiguity" — <em className="italic" style={{ color: LIGHT }}>amimut</em> — is itself a strategic weapon. By neither confirming nor denying, Israel avoids triggering the diplomatic consequences of open declaration while maintaining the deterrent effect. It is the most successful nuclear bluff — or non-bluff — in history.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
