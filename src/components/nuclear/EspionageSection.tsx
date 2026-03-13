import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';

const BUNKER = 'hsl(200, 25%, 6%)';
const GEIGER = 'hsl(140, 70%, 45%)';
const RED = 'hsl(0, 65%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';

export const EspionageSection = () => {
  return (
    <section id="espionage" className="relative min-h-[120vh] py-32 px-6" style={{ background: 'hsl(200, 22%, 7%)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-6"
            style={{ color: RED }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nation Two · August 29, 1949
          </motion.p>

          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-4"
            style={{ color: LIGHT }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ color: RED }}>Espionage</span>
          </motion.h2>

          <motion.p
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: STEEL }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            The Soviet Union
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              American intelligence estimated the Soviets were a decade away from the bomb. They were wrong by six years. The reason was not Soviet physics — though it was excellent — but Soviet intelligence.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Klaus Fuchs, a German-born British physicist, had worked at Los Alamos on the implosion design for Fat Man. He was also a Soviet spy. From 1944 to 1949, Fuchs passed detailed blueprints of the plutonium bomb to his Soviet handlers. The information was so precise that when the Soviets tested their first device — codenamed "Joe-1" by the Americans — it was virtually a copy of Fat Man.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              But Fuchs wasn't alone. Theodore Hall, just 19 years old and one of the youngest scientists at Los Alamos, independently volunteered secrets to the Soviets. The Rosenbergs, Julius and Ethel, ran a separate espionage ring funneling classified materials. The Manhattan Project, the most secret program in American history, was thoroughly penetrated.
            </p>
          </RevealOnScroll>

          {/* Timeline compression */}
          <RevealOnScroll>
            <div className="my-16 px-6 py-8 rounded-lg" style={{ background: 'hsl(0, 30%, 10%)', border: '1px solid hsl(0, 30%, 18%)' }}>
              <p className="text-[9px] tracking-[0.3em] uppercase font-body mb-6 text-center" style={{ color: RED }}>
                How espionage compressed the timeline
              </p>
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="text-center">
                  <p className="font-display text-3xl font-black" style={{ color: LIGHT }}>10</p>
                  <p className="text-xs font-body" style={{ color: STEEL }}>years estimated</p>
                </div>
                <motion.div
                  className="flex-1 mx-6 h-px relative"
                  style={{ background: 'hsl(0, 30%, 25%)' }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full"
                    style={{ background: RED }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  />
                </motion.div>
                <div className="text-center">
                  <p className="font-display text-3xl font-black" style={{ color: RED }}>4</p>
                  <p className="text-xs font-body" style={{ color: STEEL }}>years actual</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              Igor Kurchatov, the Soviet program's scientific director, later admitted the espionage saved them years of trial and error. But he also noted that Soviet physicists had independently solved many of the same problems — the stolen designs served as confirmation, accelerating what would have happened regardless.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="font-body text-lg leading-relaxed" style={{ color: STEEL }}>
              On August 29, 1949, the Soviets detonated "RDS-1" at the Semipalatinsk test site in Kazakhstan. When American B-29s detected radioactive debris in the atmosphere days later, the monopoly was over. The nuclear age had its second player, and the arms race had begun.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.blockquote
              className="font-display text-xl md:text-2xl italic text-center my-10 leading-relaxed"
              style={{ color: LIGHT }}
            >
              "The balance of power has been destroyed."
            </motion.blockquote>
            <p className="text-center text-xs font-body mb-6" style={{ color: STEEL }}>
              — Senator Arthur Vandenberg, upon learning of the Soviet test
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
