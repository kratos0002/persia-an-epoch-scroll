import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BUNKER = 'hsl(200, 25%, 6%)';
const SHADOW = 'hsl(220, 20%, 55%)';
const GEIGER = 'hsl(140, 70%, 45%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const ShadowSection = () => {
  return (
    <section id="shadow" className="relative min-h-[120vh] py-32 px-6" style={{ background: BUNKER }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: SHADOW }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Ninth · Never Confirmed
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
            Israel — and those who tried
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Israel has never confirmed or denied possessing nuclear weapons. This policy — known as "nuclear ambiguity" or <em className="italic" style={{ color: LIGHT }}>amimut</em> — is itself a weapon. It allows Israel to benefit from nuclear deterrence without triggering a formal Middle Eastern arms race or international sanctions.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              What is known: In the late 1950s, Israel built a secret nuclear reactor at Dimona in the Negev Desert, with French assistance. When American U-2 spy planes photographed the facility in 1960, Israel told the Eisenhower administration it was a "textile plant." When that was no longer credible, they said it was a peaceful research reactor. It was neither.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              In 1986, Mordechai Vanunu, a former technician at Dimona, provided photographs and detailed descriptions of Israel's weapons program to the <em className="italic">Sunday Times</em>. His evidence suggested Israel had produced enough plutonium for 100 to 200 warheads. He was subsequently kidnapped by the Mossad in Rome, brought to Israel, tried in secret, and imprisoned for 18 years.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The most widely accepted estimate is that Israel possesses 80 to 90 nuclear warheads, with delivery systems including Jericho III ballistic missiles and submarine-launched cruise missiles aboard Dolphin-class submarines. Israel has never signed the NPT.
            </p>
          </RevealOnScroll>

          {/* Divider */}
          <RevealOnScroll>
            <div className="my-16 py-8 text-center" style={{ borderTop: `1px solid hsl(220, 15%, 15%)`, borderBottom: `1px solid hsl(220, 15%, 15%)` }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6" style={{ color: SHADOW }}>
                Those who tried — and stopped
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              <strong style={{ color: LIGHT }}>South Africa</strong> is the only nation to have built nuclear weapons and then voluntarily disarmed. Under the apartheid regime, South Africa assembled six gun-type uranium devices in the 1980s. In 1989, as apartheid ended, President F.W. de Klerk ordered all six dismantled — the decision driven partly by the realization that the weapons might soon be in the hands of a Black-majority government.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              <strong style={{ color: LIGHT }}>Libya</strong> pursued nuclear weapons for decades, importing centrifuge technology from A.Q. Khan's network. In 2003, after the U.S. invaded Iraq, Gaddafi renounced his WMD programs and opened his facilities to inspectors. Eight years later, NATO-backed rebels killed him. The lesson was not lost on North Korea.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              <strong style={{ color: LIGHT }}>Iraq</strong> had an advanced nuclear program destroyed by Israel in a 1981 airstrike on the Osirak reactor, then reconstituted secretly, then dismantled after the 1991 Gulf War revealed its scope. The 2003 invasion was justified by claims of resumed nuclear activity that proved unfounded.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              <strong style={{ color: LIGHT }}>Iran</strong> remains the most significant threshold state — enriching uranium to 60% purity as of 2024, a short technical step from weapons-grade 90%. Whether Iran crosses that threshold may define the next chapter of proliferation.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
