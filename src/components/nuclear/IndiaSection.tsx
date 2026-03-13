import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BUNKER = 'hsl(200, 25%, 6%)';
const SAFFRON = 'hsl(25, 80%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const IndiaSection = () => {
  return (
    <section id="india" className="relative min-h-[120vh] py-32 px-6" style={{ background: 'hsl(200, 22%, 7%)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: SAFFRON }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nation Six · May 18, 1974
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            The <span style={{ color: SAFFRON }}>Smiling Buddha</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            India
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              India's relationship with nuclear weapons was paradoxical from the start. Jawaharlal Nehru, the country's first prime minister, was one of the loudest voices for nuclear disarmament. He called atomic weapons "a sin against humanity." But he also established India's nuclear research program in 1948 — just one year after independence — understanding that peaceful nuclear energy and weapons capability were two sides of the same coin.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The catalyst was China. When Beijing tested its bomb in 1964, India's security calculus changed overnight. China had already humiliated India in a border war in 1962. Now it was nuclear. Homi Bhabha, the father of India's nuclear program, began pushing for a weapons test. He didn't live to see it — he died in a plane crash in 1966 — but his successor, Raja Ramanna, carried the program forward.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              On May 18, 1974, India detonated a 12-kiloton plutonium device in the Thar Desert at Pokhran, Rajasthan. The official codename was "Smiling Buddha." The official designation was "peaceful nuclear explosion" — a euphemism so transparent that it fooled nobody. India used a Canadian-supplied research reactor and American heavy water, both provided under agreements for peaceful use only. The nonproliferation regime was exposed as a gentleman's agreement with no enforcement.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              India did not test again for 24 years. Then, in May 1998, Prime Minister Atal Bihari Vajpayee ordered Operation Shakti — five underground tests at Pokhran in two days, including a thermonuclear device. India declared itself a nuclear weapons state.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              The paradox endures: India has never signed the Nuclear Non-Proliferation Treaty, yet it has a no-first-use policy and has never shared nuclear technology with another state. The country that preached disarmament became a nuclear power — and, by many measures, a more responsible one than several who signed the treaty.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
