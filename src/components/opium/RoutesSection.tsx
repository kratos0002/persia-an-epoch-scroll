import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { OpiumSectionShell } from './OpiumSectionShell';
import { TradeTriangleMap } from './visuals/TradeTriangleMap';

export const RoutesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <OpiumSectionShell id="opium-routes" eyebrow="Monsoons, clippers & plausible deniability" title="Routes & Smuggling" variant="stained">
      <div ref={ref} className="space-y-10">
        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          The physical movement of goods was governed by monsoon winds and the strategic necessity of "plausible deniability." The EIC did not carry opium on its own ships — it sold at auction in Calcutta to "country traders," private merchant firms who handled the illegal last mile.
        </p>

        {/* Maritime chart map */}
        <TradeTriangleMap />

        <p className="max-w-3xl font-body text-lg leading-relaxed text-ledger-stain/80">
          At <strong className="text-ledger-wax font-semibold">Lintin Island</strong> in the Pearl River Delta, receiving ships served as "floating warehouses." Chinese smugglers operating "fast crabs" — rowing boats with 30–50 oars — ferried the drug inland, bribing naval officials along the way. This arrangement let the EIC claim it merely sold a "legal agricultural product" in Calcutta.
        </p>
      </div>
    </OpiumSectionShell>
  );
};
