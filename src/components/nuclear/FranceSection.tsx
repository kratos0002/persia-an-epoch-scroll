import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { YieldTowers } from '@/components/visuals/YieldTowers';

const TRICOLOR = 'hsl(220, 60%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

const steps = [
  // Step 0 — The strategic dilemma
  <div key="frappe-intro">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: TRICOLOR }}>
      Nation Four · February 13, 1960
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      <span style={{ color: TRICOLOR }}>Force de Frappe</span>
    </h2>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      Charles de Gaulle's logic was simple and brutal: France could not depend on America to risk New York for Paris. The American nuclear umbrella might protect Western Europe in theory — but no French president could stake the nation's survival on the assumption that an American president would trade Washington for a European war.
    </p>
  </div>,

  // Step 1 — Scientific foundations
  <div key="frappe-science">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      France had actually started nuclear research during the war and had extraordinary scientific foundations. Frédéric Joliot-Curie — son-in-law of Marie Curie and a Nobel laureate in his own right — had led early French nuclear work and helped establish the Commissariat à l'énergie atomique in 1945.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      But the political will was de Gaulle's alone. He saw nuclear weapons not merely as a military instrument but as the ultimate guarantor of French sovereignty — proof that France remained a great power in a world otherwise divided between Washington and Moscow.
    </p>
  </div>,

  // Step 2 — Gerboise Bleue
  <div key="frappe-test">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      On February 13, 1960, France detonated "Gerboise Bleue" — a 70-kiloton plutonium device — in the Sahara Desert at Reggane, Algeria. It was more than three times the yield of Trinity. France had made its point: it would defend itself, by itself.
    </p>
    <p className="font-body text-base leading-relaxed italic mb-4" style={{ color: LIGHT }}>
      "Within ten years, we shall have the means to kill 80 million Russians. I truly believe that one does not light-heartedly attack people who are able to kill 80 million Russians."
    </p>
    <p className="font-body text-xs" style={{ color: STEEL }}>
      — Charles de Gaulle, 1964
    </p>
  </div>,

  // Step 3 — NATO withdrawal & independence
  <div key="frappe-nato">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      De Gaulle then withdrew France from NATO's integrated military command — not from the alliance itself, but from the structure that would have placed French forces under American control. France would be an ally, not a subordinate.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The <em className="italic" style={{ color: TRICOLOR }}>force de frappe</em> — the strike force — was the instrument of that independence. Where other nations sheltered under an American umbrella, France held its own.
    </p>
  </div>,
];

export const FranceSection = () => {
  return (
    <section id="france" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <YieldTowers activeStep={activeStep} />}
        steps={steps}
        className="min-h-[300vh]"
      />
    </section>
  );
};
