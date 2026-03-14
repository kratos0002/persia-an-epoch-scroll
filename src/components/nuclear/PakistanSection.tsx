import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { ResponseClock } from '@/components/visuals/ResponseClock';

const PAKISTAN_GREEN = 'hsl(150, 60%, 35%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

const steps = [
  /* Step 0 — Bhutto's decision */
  <div key="decision">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: PAKISTAN_GREEN }}>
      Nation Seven · May 28, 1998
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      <span style={{ color: PAKISTAN_GREEN }}>Chagai</span>
    </h2>
    <p className="font-body text-base leading-relaxed mb-5" style={{ color: STEEL }}>
      Zulfikar Ali Bhutto, Pakistan's president, made the decision in 1972 — two years before India's first test. Pakistan had just lost East Bengal in a catastrophic war. Half the country was gone. Bhutto gathered his scientists at Multan and delivered the line that would define Pakistan's nuclear ambition for decades:
    </p>
    <blockquote className="font-display text-lg md:text-xl italic leading-relaxed mb-2" style={{ color: LIGHT }}>
      "We will eat grass, even go hungry, but we will get one of our own."
    </blockquote>
    <p className="text-xs font-body" style={{ color: STEEL }}>— Zulfikar Ali Bhutto, 1972</p>
  </div>,

  /* Step 1 — A.Q. Khan steals centrifuge designs */
  <div key="theft">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      The man who made it happen was Abdul Qadeer Khan, a metallurgist who had worked at the URENCO enrichment facility in the Netherlands. Khan stole centrifuge designs — the technology to enrich uranium — and brought them home to Pakistan in 1975.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      He built a parallel enrichment program at Kahuta, outside Islamabad — a facility the Pakistani government denied for years. The centrifuge was the key: spin uranium hexafluoride fast enough, separate the isotopes, and you have weapons-grade material.
    </p>
  </div>,

  /* Step 2 — Geopolitics won, India triggers */
  <div key="trigger">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      Western intelligence agencies knew. The Americans, British, and Dutch all had evidence of Khan's theft and Pakistan's enrichment program. They did remarkably little. Pakistan was a Cold War ally — essential for funneling arms to the Afghan mujahideen fighting the Soviets. Nonproliferation lost to geopolitics.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      Then India tested five devices in May 1998 — Operation Shakti. Pakistan had seventeen days to decide what kind of country it would be.
    </p>
  </div>,

  /* Step 3 — Chagai test + Khan network */
  <div key="chagai">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      On May 28, 1998, Pakistan detonated five devices inside a granite mountain at Chagai, Balochistan. Two days later, it tested one more. The mountain turned white. Pakistan was nuclear — the seventh state to join the club, and the first Muslim-majority nation.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      A.Q. Khan would later be revealed as the most dangerous nuclear proliferator in history — selling centrifuge designs, uranium enrichment technology, and even bomb blueprints to Libya, Iran, and North Korea through a vast black-market network. Pakistan's bomb had been built through theft; now that theft was being franchised.
    </p>
  </div>,
];

export const PakistanSection = () => {
  return (
    <section id="pakistan" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <ResponseClock activeStep={activeStep} />}
        steps={steps}
        className="min-h-[320vh]"
      />
    </section>
  );
};
