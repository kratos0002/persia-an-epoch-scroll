import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { IB, NETWORK_NODES } from '@/components/visuals/battutaMapData';

export const IslamicNetwork = () => (
  <section id="battuta-commonwealth" className="relative py-24 px-6" style={{ background: IB.PARCHMENT }}>
    <div className="max-w-3xl mx-auto">
      <RevealOnScroll>
        <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: IB.LAPIS }}>
          Why One Man Could Travel 117,000 km
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: IB.INK }}>
          The Islamic Commonwealth
        </h2>
        <p className="font-body text-base text-center max-w-xl mx-auto mb-12" style={{ color: IB.INK_LIGHT }}>
          The success of Ibn Battuta's travels was predicated on a functional network of Islamic institutions
          that transcended political borders — a shared infrastructure of law, language, and hospitality.
        </p>
      </RevealOnScroll>

      {/* Network diagram — radial layout */}
      <RevealOnScroll delay={0.15}>
        <div className="relative mx-auto" style={{ width: 360, height: 360 }}>
          {/* Center node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: IB.SAFFRON, boxShadow: `0 0 30px ${IB.SAFFRON}40` }}>
            <span className="font-display text-xs font-bold text-center leading-tight" style={{ color: IB.LEATHER }}>
              Ibn<br />Battuta
            </span>
          </div>

          {/* Nodes around */}
          {NETWORK_NODES.map((node, i) => {
            const angle = (i * 60 - 90) * Math.PI / 180;
            const radius = 140;
            const x = 180 + radius * Math.cos(angle);
            const y = 180 + radius * Math.sin(angle);

            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center text-center"
                style={{ left: x - 40, top: y - 30, width: 80 }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                {/* Connecting line */}
                <svg className="absolute pointer-events-none" style={{
                  left: 40 - (x - 180), top: 30 - (y - 180), width: Math.abs(x - 180) + 2, height: Math.abs(y - 180) + 2,
                }}>
                </svg>

                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                  style={{ background: `${IB.LAPIS}20`, border: `1.5px solid ${IB.LAPIS}60` }}>
                  <span className="text-lg">{node.icon}</span>
                </div>
                <span className="font-display text-[10px] font-bold" style={{ color: IB.INK }}>{node.label}</span>
                <span className="font-body text-[8px] leading-tight mt-0.5" style={{ color: IB.INK_LIGHT }}>{node.detail}</span>
              </motion.div>
            );
          })}

          {/* SVG connecting lines */}
          <svg className="absolute inset-0 pointer-events-none" width="360" height="360">
            {NETWORK_NODES.map((_, i) => {
              const angle = (i * 60 - 90) * Math.PI / 180;
              const x = 180 + 140 * Math.cos(angle);
              const y = 180 + 140 * Math.sin(angle);
              return (
                <line key={i} x1={180} y1={180} x2={x} y2={y}
                  stroke={IB.LAPIS} strokeWidth={0.8} opacity={0.25} strokeDasharray="4 4" />
              );
            })}
          </svg>
        </div>
      </RevealOnScroll>

      {/* Prose */}
      <div className="max-w-2xl mx-auto mt-16">
        <RevealOnScroll delay={0.2}>
          <p className="font-body text-base leading-[1.9] mb-6" style={{ color: IB.INK }}>
            A Maliki scholar from Morocco could travel to India and find a familiar courtly culture because of the
            shared language of Arabic (for law and religion) and the standardized curriculum of the madrasas.
            The profession of the qadi acted as a passport — rulers from the Maldives to the Delhi Sultanate
            actively recruited foreign scholars to provide prestige or a neutral legal framework.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.25}>
          <p className="font-body text-base leading-[1.9] mb-6" style={{ color: IB.INK }}>
            Three primary trade networks converged in Ibn Battuta's lifetime: the Trans-Saharan routes connecting
            North Africa to West African gold, the Indian Ocean maritime trade driven by predictable monsoon winds,
            and the overland Silk Road through Central Asia. These networks moved not just goods but people and ideas.
            In every city, Ibn Battuta found lodgings provided by Sufi zawiyas, which offered hospitality to travelers
            as a religious duty.
          </p>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);
