import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { SeismicPulse } from '@/components/visuals/SeismicPulse';
import { NewspaperClip } from '@/components/nuclear/NewspaperClip';

const SAFFRON = 'hsl(25, 80%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 22%, 7%)';

const steps = [
  /* Step 0 — Nation Six · Nehru paradox */
  <div key="origin">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: SAFFRON }}>
      Nation Six · May 18, 1974
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      The <span style={{ color: SAFFRON }}>Smiling Buddha</span>
    </h2>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      India's relationship with nuclear weapons was paradoxical from the start. <span style={{ color: LIGHT }}>Jawaharlal Nehru</span>, the country's first prime minister, was one of the loudest voices for nuclear disarmament. He called atomic weapons "a sin against humanity." But he also established India's nuclear research program in <span style={{ color: LIGHT }}>1948 — just one year after independence</span> — understanding that peaceful nuclear energy and weapons capability were two sides of the same coin.
    </p>
  </div>,

  /* Step 1 — China catalyst */
  <div key="china-catalyst">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      The catalyst was China. When Beijing tested its bomb in 1964, India's security calculus changed overnight. China had already <span style={{ color: LIGHT }}>humiliated India in a border war in 1962</span>. Now it was nuclear.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      <span style={{ color: LIGHT }}>Homi Bhabha</span>, the father of India's nuclear program, began pushing for a weapons test. He didn't live to see it — he died in a plane crash in 1966 — but his successor, <span style={{ color: LIGHT }}>Raja Ramanna</span>, carried the program forward.
    </p>
  </div>,

  /* Step 2 — Smiling Buddha 1974 */
  <div key="smiling-buddha">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      On May 18, 1974, India detonated a <span style={{ color: LIGHT }}>12-kiloton</span> plutonium device in the Thar Desert at <span style={{ color: LIGHT }}>Pokhran, Rajasthan</span>. The official codename was "Smiling Buddha."
    </p>
    <p className="font-body text-base leading-relaxed italic mb-3" style={{ color: LIGHT }}>
      "Peaceful nuclear explosion"
    </p>
    <p className="font-body text-sm leading-relaxed" style={{ color: STEEL }}>
      — a euphemism so transparent that it fooled nobody. India had crossed the threshold. It would not announce it.
    </p>
  </div>,

  /* Step 3 — Operation Shakti 1998 + no-first-use paradox */
  <div key="shakti">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      India did not test again for 24 years. Then, in May 1998, Prime Minister Atal Bihari Vajpayee ordered <span style={{ color: LIGHT }}>Operation Shakti</span> — <span style={{ color: LIGHT }}>five underground tests</span> at Pokhran in two days, including a <span style={{ color: LIGHT }}>thermonuclear device</span>. India declared itself a nuclear weapons state.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The paradox endures: India has never signed the Nuclear Non-Proliferation Treaty, yet it has a <span style={{ color: LIGHT }}>no-first-use policy</span> and has never shared nuclear technology with another state. The country that preached disarmament became a nuclear power — and, by many measures, a more responsible one than several who signed the treaty.
    </p>
    <NewspaperClip
      paper="The Times of India"
      date="May 12, 1998"
      headline="INDIA IS NOW A NUCLEAR STATE"
      subheadline="Five underground tests at Pokhran — PM declares India a nuclear weapons power"
      delay={0.5}
    />
  </div>,
];

export const IndiaSection = () => {
  return (
    <section id="india" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <SeismicPulse activeStep={activeStep} />}
        steps={steps}
        className="min-h-[300vh]"
      />
    </section>
  );
};
