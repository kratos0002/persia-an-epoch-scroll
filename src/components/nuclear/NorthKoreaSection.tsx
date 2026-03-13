import React from 'react';
import { StickyScroll } from '@/components/scroll/StickyScroll';
import { SeismographChart } from '@/components/visuals/SeismographChart';

const HERMIT = 'hsl(45, 70%, 50%)';
const STEEL = 'hsl(200, 10%, 50%)';
const LIGHT = 'hsl(0, 0%, 88%)';
const BUNKER = 'hsl(200, 25%, 6%)';

const steps = [
  <div key="dynasty">
    <p className="text-[10px] tracking-[0.35em] uppercase font-body font-semibold mb-4" style={{ color: HERMIT }}>
      Nation Eight · October 9, 2006
    </p>
    <h2 className="font-display text-3xl md:text-4xl font-black mb-4" style={{ color: LIGHT }}>
      The Hermit's <span style={{ color: HERMIT }}>Bomb</span>
    </h2>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      North Korea's nuclear program is not about ideology. It is about dynasty survival. The Kim family — Kim Il-sung, Kim Jong-il, Kim Jong-un — watched what happened to leaders who gave up their weapons programs. Gaddafi surrendered his nuclear ambitions in 2003 and was killed by his own people in 2011. Saddam had no weapons of mass destruction and was hanged. The lesson was clear: nuclear weapons are life insurance for dictators.
    </p>
  </div>,

  <div key="withdrawal">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      North Korea joined the Nuclear Non-Proliferation Treaty in 1985, then violated it systematically for over a decade. In 2003, it became the only state ever to withdraw from the NPT. The international framework for preventing proliferation had a hole in it large enough to drive a nuclear warhead through.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The first test, in October 2006, was almost a failure — a yield of less than one kiloton, when the design had aimed for several. Seismographs around the world barely registered it. But it was enough.
    </p>
  </div>,

  <div key="escalation">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      The tests escalated: 2009, 2013, twice in 2016. Each was larger, more confident. The yield climbed from sub-kiloton to an estimated 20 kilotons. North Korea was learning — and each test taught it more.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      A.Q. Khan's network had provided the starting technology — centrifuge designs purchased from Pakistan's proliferation bazaar. But the weapons engineering was increasingly homegrown.
    </p>
  </div>,

  <div key="thermonuclear">
    <p className="font-body text-base leading-relaxed mb-4" style={{ color: STEEL }}>
      Then came September 3, 2017. The sixth test registered a magnitude 6.3 on seismographs worldwide — an estimated yield of 200-250 kilotons. It was almost certainly a thermonuclear device. North Korea had the hydrogen bomb.
    </p>
    <p className="font-body text-base leading-relaxed" style={{ color: STEEL }}>
      The seismic spike was so large that it triggered a secondary earthquake as the mountain above the test chamber partially collapsed. The world's poorest nuclear state had built its most powerful weapon.
    </p>
  </div>,
];

export const NorthKoreaSection = () => {
  return (
    <section id="north-korea" style={{ background: BUNKER }}>
      <StickyScroll
        graphic={(activeStep) => <SeismographChart activeStep={activeStep} />}
        steps={steps}
        className="min-h-[300vh]"
      />
    </section>
  );
};
