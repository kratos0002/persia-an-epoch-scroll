import React from 'react';
import { RevealOnScroll } from '@/components/scroll/StickyScroll';
import { AnimatedCounter } from '@/components/visuals/AnimatedCounter';

const NAVY = 'hsl(220, 25%, 8%)';
const PAPER = 'hsl(45, 30%, 88%)';
const SCARLET = 'hsl(0, 70%, 48%)';
const GOLD = 'hsl(43, 60%, 50%)';
const ASH = 'hsl(220, 10%, 45%)';

export const AftermathSection = () => {
  return (
    <section id="aftermath" className="relative py-32 md:py-48 px-6" style={{ background: NAVY }}>
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-xs tracking-[0.3em] uppercase font-body font-semibold mb-8" style={{ color: SCARLET }}>
            1858
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-12" style={{ color: PAPER }}>
            The Transfer of Power
          </h2>
        </RevealOnScroll>

        <div className="space-y-8 font-body text-lg leading-relaxed" style={{ color: 'hsl(220, 10%, 65%)' }}>
          <RevealOnScroll delay={0.2}>
            <p>
              The rebellion was crushed by mid-1858. But it killed something larger than itself: 
              <span style={{ color: GOLD }}> the East India Company</span>.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <p>
              On <span style={{ color: PAPER }}>August 2, 1858</span>, the British Parliament passed the Government of India Act. 
              The Company — that peculiar hybrid of merchant house and sovereign power — was dissolved. 
              India would now be governed directly by the British Crown.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <div className="grid grid-cols-2 gap-8 py-12">
              <div className="text-center">
                <div className="font-display text-5xl md:text-6xl font-black" style={{ color: SCARLET }}>
                  <AnimatedCounter target={800000} duration={3} suffix="" />
                </div>
                <p className="text-sm mt-2" style={{ color: ASH }}>Estimated dead</p>
              </div>
              <div className="text-center">
                <div className="font-display text-5xl md:text-6xl font-black" style={{ color: GOLD }}>
                  <AnimatedCounter target={258} duration={2.5} suffix="" />
                </div>
                <p className="text-sm mt-2" style={{ color: ASH }}>Years of Company rule ended</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.5}>
            <p>
              Queen Victoria was proclaimed <span style={{ color: PAPER }}>Empress of India</span>. 
              The Company's private army became the British Indian Army. 
              The ratio of British to Indian soldiers was permanently increased. 
              And the telegraph network was massively expanded — because the British had learned 
              what happens when you can't communicate faster than discontent can spread.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
            <div className="border-l-2 pl-6 my-12" style={{ borderColor: SCARLET }}>
              <p className="font-display text-2xl md:text-3xl italic" style={{ color: PAPER }}>
                "The Company died because it could not imagine that the people it ruled had networks of their own."
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
