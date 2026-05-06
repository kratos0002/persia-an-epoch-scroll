import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { IB, NETWORK_NODES } from '@/components/visuals/battutaMapData';
import { PortolanNetworkMap } from './PortolanNetworkMap';
import { RhumbLinesCSS } from './RhumbLineBackground';
import { CompassRose } from './CompassRose';

/**
 * Islamic Network section — "The Commonwealth Chart"
 * Portolan-style geographic network map replacing the emoji radial diagram.
 */
export const IslamicNetwork = () => (
  <section id="battuta-commonwealth" className="relative py-24 px-6 battuta-vellum-grain battuta-foxing" style={{ background: IB.PARCHMENT }}>
    <RhumbLinesCSS color={IB.SAFFRON} opacity={0.025} position="30% 40%" />

    <div className="max-w-3xl mx-auto relative z-10">
      <RevealOnScroll>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px" style={{ background: IB.LAPIS }} />
          <CompassRose size={20} color={IB.LAPIS} opacity={0.5} />
          <div className="w-12 h-px" style={{ background: IB.LAPIS }} />
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4 text-center" style={{ color: IB.LAPIS }}>
          Why he could do it
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 battuta-gilt" style={{ color: IB.INK }}>
          The Islamic Commonwealth
        </h2>
        <p className="font-body text-base text-center max-w-xl mx-auto mb-12" style={{ color: IB.INK_LIGHT }}>
          The success of Ibn Battuta's travels was predicated on a functional network of Islamic institutions
          that transcended political borders — a shared infrastructure of law, language, and hospitality.
        </p>
      </RevealOnScroll>

      {/* Portolan network map */}
      <RevealOnScroll delay={0.15}>
        <PortolanNetworkMap />
      </RevealOnScroll>

      {/* Prose — single tight paragraph. The trade-networks elaboration was
          cut; the Portolan network map above already shows them visually. */}
      <div className="max-w-2xl mx-auto mt-16">
        <RevealOnScroll delay={0.2}>
          <p className="font-body text-base leading-[1.9]" style={{ color: IB.INK }}>
            A Maliki scholar from Morocco could travel to India and find a familiar courtly culture because of the
            shared language of Arabic, the standardized curriculum of the madrasas, and the Sufi zawiyas that gave
            free lodging to travelers as a religious duty. The profession of the qadi acted as a passport — rulers
            from the Maldives to the Delhi Sultanate actively recruited foreign scholars to provide prestige or a
            neutral legal framework.
          </p>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);
